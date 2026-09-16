import Image from "next/image";
import type { ReactNode } from "react";

const repository = "https://github.com/yangqi0/petitgpt";
const revision = "ee2d959055af7bdc3f3dc3e79e6806161946efc8";
const source = `${repository}/blob/${revision}`;
const report = `${source}/docs/petitgpt-v1/TECHNICAL_REPORT.md`;
const model = "https://huggingface.co/yqi0/petitgpt";

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} rel="noreferrer">{children}</a>;
}

export default function BuildingPetitGptArticle() {
  return (
    <>
      <p className="article-lede">
        I trained and released PetitGPT, a 124.6M-parameter language model built
        from scratch on a single RTX 4090. The project now includes a custom
        tokenizer, approximately 13 billion pretraining token positions,
        instruction tuning, published benchmark results, and downloadable weights.
      </p>
      <p>
        Building the full pipeline gave me a way to study how architecture, data,
        optimization, and evaluation interact under a small compute budget. The
        released model reaches 57.74% accuracy on ARC-Easy and 28.16% on
        ARC-Challenge. Its pretraining validation loss reaches 2.4702. The
        experiments also show how improvements in reference prediction or a narrow
        instruction task can coexist with weaker performance elsewhere.
      </p>
      <p>
        This article describes the <strong>research-v1 release</strong> and the
        selected <strong>alpha075</strong> checkpoint. The{" "}
        <SourceLink href={report}>technical report</SourceLink> contains the full
        measurements and protocols; the{" "}
        <SourceLink href={model}>Hugging Face repository</SourceLink> contains the
        model and native inference bundle.
      </p>

      <nav className="article-toc" aria-label="On this page">
        <p className="article-toc-title">On this page</p>
        <ol>
          <li><a href="#system-card">The released model</a></li>
          <li><a href="#architecture">A deeper, narrower decoder</a></li>
          <li><a href="#pretraining">What improved during pretraining</a></li>
          <li><a href="#posttraining">Instruction tuning and the selected blend</a></li>
          <li><a href="#benchmarks">Results under a shared evaluation protocol</a></li>
          <li><a href="#generation">What generation still gets wrong</a></li>
          <li><a href="#release">Making the experiment inspectable</a></li>
          <li><a href="#next">What I would investigate next</a></li>
        </ol>
      </nav>

      <h2 id="system-card">The released model</h2>
      <dl className="article-facts">
        <div><dt>Parameters</dt><dd>124,635,456 unique parameters</dd></div>
        <div><dt>Decoder</dt><dd>30 layers · width 576</dd></div>
        <div><dt>Attention</dt><dd>9 query heads · 3 key/value heads</dd></div>
        <div><dt>Feed-forward network</dt><dd>SwiGLU · width 1,536</dd></div>
        <div><dt>Context and tokenizer</dt><dd>2,048 tokens · 32k byte-level BPE</dd></div>
        <div><dt>Pretraining</dt><dd>Approximately 13B token positions</dd></div>
        <div><dt>Hardware</dt><dd>One NVIDIA RTX 4090</dd></div>
        <div><dt>Release</dt><dd>alpha075 · native PyTorch CUDA inference</dd></div>
      </dl>

      <h2 id="architecture">A deeper, narrower decoder</h2>
      <p>
        The released architecture uses 30 Transformer blocks with a hidden width
        of 576. Each block combines RMSNorm, grouped-query attention, rotary
        position embeddings, and a SwiGLU feed-forward network. There are nine
        query heads and three key/value heads, each with dimension 64. Input
        embeddings and the output head share one weight matrix.
      </p>
      <p>
        This distributes the parameter budget across more layers while keeping
        individual layers compact. Grouped-query attention shares keys and values
        across query heads, and tied embeddings avoid a second 32,000 × 576
        vocabulary matrix. The exact parameter count is 124,635,456, with the shared
        matrix counted once.
      </p>
      <p>
        The tokenizer is a custom 32,000-token byte-level BPE model with seven
        control tokens. It applies no text normalizer. Chat boundaries are inserted
        by token ID, so a literal special-token spelling inside user content is
        treated as ordinary text. These choices keep source text and conversation
        structure distinct throughout training and inference. Architecture and
        tokenizer details are in the{" "}
        <SourceLink href={`${report}#3-model-and-tokenizer`}>model specification</SourceLink>.
      </p>

      <h2 id="pretraining">What improved during pretraining</h2>
      <p>
        Pretraining ran for 49,590 optimizer updates at a 2,048-token sequence
        length. Micro-batches of eight sequences with 16 accumulation steps gave
        an effective batch of 128 sequences. A Muon/AdamW optimizer combination
        and one warmup–stable–decay learning-rate schedule spanned both data stages.
      </p>
      <p>
        Stage A selected about 10B serialized tokens from FineWeb-Edu, DCLM-Edu,
        FineWiki English, and Python-Edu. Stage B selected about 3B more, adding
        structured tutorials, PES2O, and StackExchange while retaining the earlier
        source families. The optimizer actually processed 12,999,720,960 input
        positions; selected, packed, and processed token counts are reconciled
        separately in the report.
      </p>
      <figure className="article-chart">
        <a href="/images/petitgpt/pretraining_validation.png">
          <Image
            src="/images/petitgpt/pretraining_validation.png"
            width={2160}
            height={936}
            alt="Reference validation loss falls across Stage A and Stage B, ending at 2.4702. A second panel enlarges Stage B."
            sizes="(max-width: 1024px) 100vw, 960px"
            unoptimized
          />
        </a>
        <figcaption>
          Ten recorded validation measurements, without smoothing. Lines connect
          observations within each stage; the right panel has a different vertical
          scale. <SourceLink href={`${source}/docs/petitgpt-v1/tables/PRETRAIN_VALIDATION_CURVE.csv`}>Source data</SourceLink>.
        </figcaption>
      </figure>
      <p>
        Reference validation loss fell from <strong>2.7486 at the end of Stage A</strong>{" "}
        to <strong>2.4702 at the end of Stage B</strong>, with final perplexity
        11.83. All seven reference source families improved. The largest absolute
        drops were in structured tutorials (0.6189), StackExchange (0.4710), and
        PES2O (0.3282), the three families added in Stage B.
      </p>
      <p>
        This is a measured improvement over the course of training. Data mixture,
        additional token exposure, and the learning-rate schedule changed together,
        so the experiment does not isolate their individual contributions. The
        useful result is that the same reference validation tracked progress across
        both stages, including the new source families. See the{" "}
        <SourceLink href={`${report}#44-observed-results`}>pretraining results</SourceLink>{" "}
        for the per-source measurements and logged timing windows.
      </p>

      <h2 id="posttraining">Instruction tuning and the selected blend</h2>
      <p>
        I used two post-training stages. <strong>P2</strong> fine-tuned the base on
        12,000 concise instruction conversations for 750 updates, supervising every
        assistant turn and its ending token. <strong>P3</strong> adapted it to
        copying, field lookup, set membership, and JSON tasks, with replay examples
        from the earlier instruction data.
      </p>
      <figure className="article-flow-figure">
        <ol className="article-flow">
          <li><strong>Tokenizer</strong><span>32k byte-level BPE</span></li>
          <li><strong>Pretrain A/B</strong><span>approximately 13B positions</span></li>
          <li><strong>P2</strong><span>concise instruction SFT</span></li>
          <li><strong>P3</strong><span>basic tasks with replay</span></li>
          <li><strong>Blend</strong><span>P2 + 0.75 × (P3 step 320 − P2)</span></li>
          <li><strong>Export</strong><span>native weights and inference</span></li>
        </ol>
        <figcaption>
          The ancestry of the released weights. Later DPO, response-distillation,
          LoRA, and unified Base-SFT experiments are separate research branches.
        </figcaption>
      </figure>
      <p>
        P3 increased passes on the 512-item procedural development battery from
        4 under P2 to 484 at step 320. At the same time, loss on the original P2
        validation conversations rose from 1.322110 to 1.400923. The model became
        better at the procedural tasks while assigning less probability to the
        earlier reference answers.
      </p>
      <p>
        I then evaluated fixed weight blends between P2 and P3 step 320. The
        released <strong>alpha075</strong> uses 75% of the displacement toward P3.
        It reached <strong>487/512 procedural passes</strong> and a validation
        loss of <strong>1.365311</strong>, recovering some of P2&apos;s reference
        likelihood. The 0.50 blend preserved more reference likelihood but reached
        only 445/512 passes, below the study&apos;s 90% development target.
      </p>
      <figure className="article-chart">
        <a href="/images/petitgpt/posttraining_tradeoff.png">
          <Image
            src="/images/petitgpt/posttraining_tradeoff.png"
            width={1980}
            height={1044}
            alt="Five post-training snapshots compare reference loss and procedural passes. The 0.75 blend clears the 90% target while recovering some reference likelihood."
            sizes="(max-width: 1024px) 100vw, 960px"
            unoptimized
          />
        </a>
        <figcaption>
          Lower reference loss is leftward; more procedural passes are upward.
          P3 step 640 is a comparison point, not a parent of the blend.{" "}
          <SourceLink href={`${source}/docs/petitgpt-v1/tables/POSTTRAINING_TRADEOFF.csv`}>Source data</SourceLink>.
        </figcaption>
      </figure>
      <p>
        Alpha075 was a useful working reference for this trade-off. The development
        battery contains correlated, repeatedly inspected items, and another strict
        generation diagnostic fell from 20/100 for P3 step 320 to 16/100 for the
        blend. I therefore keep these scores separate from general assistant quality
        and from the later public benchmark campaign. The{" "}
        <SourceLink href={`${report}#5-post-training-and-the-selected-weights`}>post-training analysis</SourceLink>{" "}
        records both the gains and the losses.
      </p>

      <h2 id="benchmarks">Results under a shared evaluation protocol</h2>
      <p>
        I evaluated the released weights alongside SmolLM-135M-Instruct and
        SmolLM2-135M-Instruct. All numbers below were measured in this project on
        pinned revisions, using the same task rows and numerical protocol for
        each model.
      </p>
      <div className="article-table-wrap" tabIndex={0} role="region" aria-label="Zero-shot benchmark accuracy">
        <table>
          <caption>Zero-shot candidate-likelihood accuracy (%)</caption>
          <thead><tr><th scope="col">Model</th><th scope="col">ARC-Easy</th><th scope="col">ARC-Challenge</th><th scope="col">PIQA</th><th scope="col">HellaSwag</th></tr></thead>
          <tbody>
            <tr><th scope="row">PetitGPT alpha075</th><td><strong>57.74</strong></td><td><strong>28.16</strong></td><td>63.49</td><td>31.28</td></tr>
            <tr><th scope="row">SmolLM-135M-Instruct</th><td>49.24</td><td>25.43</td><td><strong>67.08</strong></td><td>34.60</td></tr>
            <tr><th scope="row">SmolLM2-135M-Instruct</th><td>54.00</td><td>25.94</td><td>66.70</td><td><strong>35.02</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        PetitGPT leads both comparators on the two ARC tasks and trails them on
        PIQA and HellaSwag. Scoring uses raw completion prompts, each model&apos;s
        own tokenizer, FP32 computation, and no chat template or answer generation.
        The models differ in training data, compute, and architecture; no
        significance test or contamination audit was performed. These results
        describe performance under the{" "}
        <SourceLink href={`${report}#81-public-multiple-choice-likelihood-frozen-fp32`}>recorded protocol</SourceLink>.
      </p>
      <p>
        I also ran <strong>IFEval</strong>, a generation-based instruction-following
        evaluation with 541 prompts and 834 instructions. Prompt-level strict
        accuracy was <strong>17.19%</strong> for PetitGPT, 10.35% for SmolLM, and
        21.63% for SmolLM2. Each model used its native chat formatting, greedy
        generation, and a 1,280-new-token cap, with programmatic scoring and no
        reviewing language model. The separate{" "}
        <SourceLink href={`${report}#84-ifeval-instruction-following`}>IFEval results</SourceLink>{" "}
        show substantial instruction-following limitations for all three models.
      </p>

      <h2 id="generation">What generation still gets wrong</h2>
      <p>
        Multiple-choice accuracy measures how a model ranks candidate answers.
        Free-form generation also requires producing the right facts, preserving
        source content, following constraints, and completing an implementation.
        I kept those questions separate in a versioned review of 189 prompts per
        model, with actual outputs retained for inspection.
      </p>
      <p>
        The Python results make the distinction concrete: PetitGPT produced the
        requested function interface on <strong>42 of 46 prompts</strong>, while
        <strong> none passed the whole-answer review</strong>. In one example,
        <code>count_matches_regex</code> returned the matches rather than their
        count. In another, <code>average_or_default</code> had the expected
        signature but never used its <code>default</code> argument. The published
        cases also include successful summarization and dialogue responses.
      </p>
      <p>
        These are small, reused diagnostics with model-assisted judgments and
        explicitly recorded owner clarifications. The 0/46 figure is a whole-answer
        review outcome, not training accuracy or a uniform unit-test pass rate.
        The <SourceLink href={`${report}#85-qualitative-cases-successes-and-failures`}>success and failure cases</SourceLink>{" "}
        make the scoring boundaries visible instead of leaving the reader with
        only an aggregate number.
      </p>
      <p>
        Later adaptation experiments brought some local gains alongside losses in
        other capabilities. DPO, response distillation, and LoRA did not produce
        a replacement that met the recorded retention criteria. The released
        weights remain the P2/P3 blend. Those experiments are documented in the{" "}
        <SourceLink href={`${report}#7-main-experiments-organized-by-question`}>research results</SourceLink>.
      </p>

      <h2 id="release">Making the experiment inspectable</h2>
      <p>
        The release includes the weights, tokenizer, configuration, native PyTorch
        inference code, source snapshots, and a public training workflow. It also
        includes machine-readable result tables, the plotting data behind both
        figures, evaluation protocols, and selected generated answers. Readers can
        inspect the measurements and the training path behind the selected model.
      </p>
      <p>
        Export validation checked all 213 named state entries and 60 rotary buffers.
        Eight source/export fixture pairs matched within their respective numerical
        profiles, including generated tokens and stopping behavior. This establishes
        parity in the measured environment. The released CLI requires CUDA and
        supports native BF16 and FP32 profiles; a Transformers loading path is not
        implemented.
      </p>
      <p>
        The public new-run workflow accepts separately supplied data and creates
        new runs. It checks tokenizer identity, packed shard inventories, assistant
        supervision counts, and deterministic update plans. Original data and
        private evaluation populations are not included, so following the recipe
        with new inputs does not reproduce the published scores automatically.
      </p>
      <ul>
        <li><SourceLink href={model}>Download the model and tokenizer</SourceLink></li>
        <li><SourceLink href={`${source}/docs/petitgpt-v1/RUN_GUIDE.md`}>Run native inference</SourceLink></li>
        <li><SourceLink href={`${source}/TRAINING_AND_REPRODUCIBILITY.md`}>Train and evaluate a new model</SourceLink></li>
        <li><SourceLink href={report}>Read the technical report and evidence tables</SourceLink></li>
      </ul>

      <h2 id="next">What I would investigate next</h2>
      <p>
        The project has progressed from a training stack to a released model with
        measured results. I can now trace improvements through pretraining, compare
        post-training checkpoints on common diagnostics, and show what the model
        actually generates. That provides a much firmer starting point for the
        next experiment.
      </p>
      <p>
        My next priorities would be fresh evaluation data fixed before candidate
        selection, repeated runs for the most promising comparisons, and controlled
        instruction-data scaling. The central question remains how to improve
        useful generation while preserving capabilities already learned.
      </p>
      <p>
        Source: <SourceLink href={report}>PetitGPT research-v1 technical report</SourceLink>{" "}
        and its accompanying tables, figures, and examples. This article summarizes
        the released results; the report preserves the full measurement scope.
      </p>
    </>
  );
}
