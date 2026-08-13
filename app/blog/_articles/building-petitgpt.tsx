import type { ReactNode } from "react";

const repository = "https://github.com/yangqi0/petitgpt";
const revision = "c00dabba8105ad5cf5d2297a0edc0cd0c3fc90a5";
const source = `${repository}/blob/${revision}`;

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noreferrer">
      {children}
    </a>
  );
}

function CodeBlock({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="article-code-block">
      <p className="article-code-label">{label}</p>
      <pre aria-label={label} tabIndex={0}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function BuildingPetitGptArticle() {
  return (
    <>
      <p className="article-lede">
        I built PetitGPT as an end-to-end language-model training laboratory that
        I could inspect at every layer: tokenizer, data mixtures, decoder
        architecture, pretraining, instruction tuning, distillation, preference
        optimization, online RL, evaluation, and regression tests. The goal was
        not to hide the system behind a high-level training framework, but to
        understand where model quality actually depends on implementation and
        data contracts.
      </p>

      <p>
        The result is a compact PyTorch stack designed around a single RTX 4090.
        Its current default architecture is a 16-layer, 133.13M-parameter decoder
        with a 2,048-token context, a 32k byte-level BPE tokenizer, RMSNorm,
        SwiGLU, corrected half-split rotary embeddings, causal scaled-dot-product
        attention, tied embeddings, and explicit chat boundaries. Around that model is the rest
        of the machinery needed to turn raw text into experiments I can explain:
        shard builders, mixture controls, assistant-only supervision, generated
        data verification, DPO, GRPO/RLVR, checkpoint sampling, and 84 focused
        correctness tests.
      </p>

      <nav className="article-toc" aria-label="On this page">
        <p className="article-toc-title">On this page</p>
        <ol>
          <li><a href="#system-card">The system in 30 seconds</a></li>
          <li><a href="#pipeline">Why build the whole stack?</a></li>
          <li><a href="#architecture">Architecture and development history</a></li>
          <li><a href="#data">Tokenizer and data contracts</a></li>
          <li><a href="#training">Pretraining, SFT, and evaluation</a></li>
          <li><a href="#distillation">Distillation as a verifier problem</a></li>
          <li><a href="#rope">The RoPE invariant that exposed a real bug</a></li>
          <li><a href="#discipline">From experiment to engineering system</a></li>
          <li><a href="#next">The next controlled campaign</a></li>
        </ol>
      </nav>

      <h2 id="system-card">The system in 30 seconds</h2>

      <dl className="article-facts">
        <div>
          <dt>Current architecture</dt>
          <dd>133,128,960 parameters</dd>
        </div>
        <div>
          <dt>Decoder shape</dt>
          <dd>16 layers · 768 width · 12 heads</dd>
        </div>
        <div>
          <dt>Feed-forward path</dt>
          <dd>SwiGLU · width 1,920</dd>
        </div>
        <div>
          <dt>Attention and position</dt>
          <dd>Causal SDPA · half-split RoPE</dd>
        </div>
        <div>
          <dt>Normalization and weights</dt>
          <dd>RMSNorm · tied embeddings</dd>
        </div>
        <div>
          <dt>Context and vocabulary</dt>
          <dd>2,048 tokens · 32k BPE</dd>
        </div>
        <div>
          <dt>Post-training contract</dt>
          <dd>BOS · supervised assistant EOS</dd>
        </div>
        <div>
          <dt>Development constraint</dt>
          <dd>One RTX 4090</dd>
        </div>
      </dl>

      <p>
        PetitGPT is a decoder-only Transformer written directly in PyTorch. Each
        block applies pre-normalization, a bias-free fused QKV projection,
        causal SDPA, and a SwiGLU feed-forward network. The current feed-forward
        width is 1,920, and the input embedding and language-model head share one
        weight matrix. I chose familiar components deliberately: the research
        value comes from owning their interactions, not from inventing a novel
        block and changing every variable at once.
      </p>

      <p>
        The stack reaches beyond pretraining. Supervised fine-tuning masks system
        and user tokens while learning from assistant spans. Targeted
        distillation turns teacher completions into executable training examples.
        Native DPO compares chosen and rejected responses against a frozen
        reference policy, while GRPO supports grouped rollouts, relative
        advantages, clipped updates, KL regularization, and verifiable rewards.
        A Muon optimizer path, sparse MoE variant, and KV-cache decoding provide
        additional systems and research surfaces without changing the compact
        core.
      </p>

      <p>
        “On a single RTX 4090” describes the development and training environment,
        not a throughput benchmark. A one-GPU budget shaped the system: explicit
        mixtures, sequence packing, checkpoint selection, evaluation cadence,
        and wasted examples all matter when every experiment competes for the
        same finite resource. That constraint kept the project small enough to
        understand end to end and large enough for mistakes to produce real
        downstream consequences.
      </p>

      <h2 id="pipeline">Why build the whole stack?</h2>

      <p>
        A Transformer block is only one part of a language model. The model sees
        whatever the tokenizer and data pipeline encode; the optimizer learns
        only from positions that survive masking; a distillation run learns the
        verifier&apos;s acceptance policy; and a checkpoint looks good or bad according
        to the evaluation harness. Owning the whole route from raw documents to
        measured behavior made those dependencies visible.
      </p>

      <figure className="article-flow-figure">
        <ol className="article-flow">
          <li><strong>Corpus</strong><span>clean, mix, and allocate token quotas</span></li>
          <li><strong>32k BPE</strong><span>encode documents and special boundaries</span></li>
          <li><strong>Pretrain</strong><span>optimize next-token prediction</span></li>
          <li><strong>SFT</strong><span>supervise assistant spans and answer endings</span></li>
          <li><strong>Distill</strong><span>teacher → extract → verify → train</span></li>
          <li><strong>Align</strong><span>DPO comparisons and GRPO rewards</span></li>
        </ol>
        <figcaption>
          Figure 1. PetitGPT&apos;s end-to-end path. Each arrow is an engineering
          contract: representation, boundaries, supervision, verification, or
          evaluation can change what the next stage learns.
        </figcaption>
      </figure>

      <p>
        I treated those transitions as explicit gates. Shard checks ask whether
        token IDs are in range and mixture quotas were met. Chat-template tests
        ask whether prompt positions are ignored and answer endings are learned.
        Code verification asks whether a candidate has the required structure
        and passes executable tests. Generation panels ask whether a lower scalar
        loss corresponds to more useful behavior. This division makes failures
        local: when an output is wrong, I can inspect the representation that
        entered each stage rather than treating training as one opaque process.
      </p>

      <p>
        It also changes how I describe progress. An implementation establishes
        that an algorithm exists; a focused unit test establishes a local
        property; a training run establishes that the pieces operate together;
        and a fixed held-out comparison establishes an empirical improvement.
        I use these as distinct evidence levels; matched held-out comparisons
        define the next campaign rather than the implementation work already
        completed.
      </p>

      <h2 id="architecture">A compact architecture I can reason about</h2>

      <p>
        The current configuration uses 16 decoder blocks, width 768, 12 attention
        heads, and SwiGLU width 1,920. Queries and keys receive rotary position
        embeddings before causal attention. PyTorch&apos;s scaled-dot-product
        attention supplies the causal kernel, while RMSNorm and pre-normalized
        residual branches keep the data flow simple. The model supports partial
        rotary dimensions and cached autoregressive decoding, and applies
        depth-scaled initialization to residual output projections.
      </p>

      <p>
        Tying the token embedding and output head is especially valuable at this
        scale. A separate 32,000 × 768 output matrix would add another 24.58M
        parameters. Sharing it leaves more of the budget for the decoder while
        preserving a direct relationship between the representation used to read
        a token and the representation used to predict one. The exact current
        count follows from the architecture rather than a rounded directory name.
      </p>

      <div className="article-table-wrap" tabIndex={0} role="region" aria-label="Current PetitGPT parameter count">
        <table>
          <caption>Parameter accounting for the current 16-layer configuration</caption>
          <thead>
            <tr><th scope="col">Component</th><th scope="col">Calculation</th><th scope="col">Parameters</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Tied embedding / LM head</th><td>32,000 × 768</td><td>24,576,000</td></tr>
            <tr><th scope="row">Attention per layer</th><td>QKV + output projection</td><td>2,359,296</td></tr>
            <tr><th scope="row">SwiGLU per layer</th><td>3 × 768 × 1,920</td><td>4,423,680</td></tr>
            <tr><th scope="row">Two RMSNorms per layer</th><td>2 × 768</td><td>1,536</td></tr>
            <tr><th scope="row">16 blocks + final norm + embedding</th><td>16 × 6,784,512 + 768 + 24,576,000</td><td><strong>133,128,960</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h3>Why this parameter budget?</h3>

      <p>
        A model in this range is large enough to make architecture, data quality,
        and post-training choices visible, but small enough that I can still run
        the complete workflow myself. That changes the kind of engineering I can
        do. I can inspect generated samples frequently, rebuild a data mixture,
        add an invariant test, or repeat a short stage without coordinating a
        cluster. Iteration speed is part of the research design: the faster I can
        connect a behavioral failure to a concrete contract, the less likely I am
        to compensate for a systems bug by tuning the optimizer.
      </p>

      <p>
        The move from the earlier 12-layer shape to 16 layers keeps the total
        budget in the same broad class while redistributing it. Narrowing the
        SwiGLU path from 3,072 to 1,920 offsets the parameters introduced by four
        additional blocks. That gives the current design more sequential
        transformations without paying for a wider feed-forward path at every
        layer. This is the architectural basis for the next controlled campaign.
      </p>

      <p>
        Sequence length also belongs in the budget. Attention and activation
        memory grow with the number of tokens even when the parameter count stays
        fixed. A 2,048-token context is a practical compromise for documents,
        conversations, and short programs on one GPU. The training path uses bf16
        and gradient accumulation so the effective update batch can exceed the
        number of sequences that fit in one forward pass. Those controls make the
        hardware constraint explicit instead of changing the model definition to
        disguise it.
      </p>

      <p>
        The implementation is intentionally readable. The attention, rotary
        transform, MLP, residual path, weight tying, generation loop, and cache
        behavior are visible in
        {" "}<SourceLink href={`${source}/src/model.py`}>src/model.py</SourceLink>.
        Writing the model at this level gave me nowhere to hide assumptions about
        tensor layout, causality, initialization, or state reuse. That mattered
        most when a positional-encoding error later passed ordinary execution
        checks but failed the mathematics of a rotation.
      </p>

      <h3>Generation is a second execution path</h3>

      <p>
        Autoregressive generation exercises the model differently from
        teacher-forced training. During training, every position arrives in one
        tensor and causal masking controls visibility. During generation, the
        model repeatedly appends one token, applies sampling controls, decides
        when to stop, and ideally reuses the keys and values computed for the
        prefix. A bug in that path can leave training loss untouched while
        changing every interactive sample.
      </p>

      <p>
        PetitGPT therefore implements both full-prefix decoding and a KV-cache
        path. The cache stores attention state for completed positions so each new
        step computes only the new query, key, and value instead of replaying the
        entire context. Focused tests run the same prefix through both paths and
        compare the resulting logits. That equivalence test turns a performance
        optimization into a behavior-preserving transformation—the standard I
        want before using it inside more expensive rollout loops.
      </p>

      <p>
        The generation interface also keeps temperature, top-k sampling, maximum
        length, and EOS stopping explicit. Fixed evaluation panels record those
        settings because two checkpoints sampled under different decoding
        policies are not a clean comparison. Reproducibility lives at the
        boundary between the mathematical model and the code that actually asks
        it for an answer.
      </p>

      <aside className="article-callout" aria-labelledby="development-history">
        <p className="article-callout-label" id="development-history">Development history</p>
        <p>
          Earlier training iterations used 12 layers, feed-forward width 3,072,
          and 137,841,408 parameters. Those runs were useful for building and
          debugging the tokenizer, pretraining, SFT, and distillation stack. The
          current 16-layer architecture incorporates corrected RoPE and explicit
          chat-boundary contracts for the next full training campaign; historical
          measurements below are used only as evidence from that development
          process.
        </p>
      </aside>

      <h2 id="data">The data pipeline is part of the model</h2>

      <h3>Tokenizer boundaries stay explicit</h3>

      <p>
        PetitGPT uses a 32,000-token byte-level BPE tokenizer with NFKC
        normalization. Four fixed IDs represent padding, unknown text, BOS, and
        EOS: 0, 1, 2, and 3. The tokenizer JSON does not automatically attach a
        post-processor. Instead, the shard builder and chat encoder own document
        and conversation boundaries. That prevents a library default from
        silently inserting a token twice and makes each boundary decision visible
        in the code that defines the training objective.
      </p>

      <p>
        Byte-level BPE gives complete byte coverage while retaining subword
        compression for common text and code fragments. The useful engineering
        work is around it: freeze the special-token map, verify round trips, check
        that every emitted ID lies inside the vocabulary, and keep the same
        tokenizer artifact attached to every dataset and checkpoint. The
        construction path is documented in
        {" "}<SourceLink href={`${source}/tokenizer/tokenizer_training/train_tokenizer.py`}>
          the tokenizer training script
        </SourceLink>, and its runtime contract has dedicated regression tests.
      </p>

      <h3>Mixtures are measured in tokens, not filenames</h3>

      <p>
        The base pretraining corpus contained 7,000,001,348 content tokens. Its
        recorded allocation was 56% educational web text, 20% Python and code,
        10% OpenWebMath, 8% Wikipedia-style text, 5% proof and algebra material,
        and 1% CosmoMath. A separate continued-pretraining mix contained
        600,000,112 content tokens, with 62% educational web text, 10% raw Python,
        15% educational Python, and 13% Wikipedia-style text. Keeping those
        manifests separate prevents the continuation mix from being mistaken for
        the composition of the original run.
      </p>

      <p>
        Token quotas matter because document counts can be misleading: a source
        with long examples can dominate optimization even when it contributes
        fewer rows. The shard builder therefore allocates content-token budgets,
        tracks validation material by source, and rejects non-integer or
        out-of-vocabulary IDs before writing compact uint16 arrays. One retained
        audit sampled 1,228,800 IDs across train and validation shards without an
        out-of-range value. The checks and binary layout live in
        {" "}<SourceLink href={`${source}/pretrain/build_pretrain_shards.py`}>
          build_pretrain_shards.py
        </SourceLink>.
      </p>

      <p>
        This part of the project changed how I think about model architecture.
        The effective model is not just a stack of blocks; it is the blocks plus
        the distribution of tokens presented to them, the separators between
        documents, and the objective applied to each position. A precise model
        config paired with an ambiguous data manifest is still an ambiguous
        experiment.
      </p>

      <h2 id="training">Training with more than one instrument</h2>

      <p>
        The earlier 12-layer campaign exercised the complete base-pretraining and
        continued-pretraining path on the single-4090 setup. One retained
        continuation configuration used bf16, sequences of length 2,048, a
        micro-batch of ten sequences, and four-step gradient accumulation. That
        corresponds to 40 sequences, or 81,920 token positions, per optimizer
        step. AdamW handled optimization, while periodic validation, fixed
        prompts, and checkpointed samples provided different views of progress.
      </p>

      <p>
        The most useful observation was not one loss value. Across hundreds of
        retained sample snapshots, generation moved from repetition and fragments
        toward fluent stories, explanations, and code. Reliability lagged behind:
        locally polished outputs could still invent historical facts or give
        incorrect mathematical definitions. The development lesson was clear.
        Cross-entropy measures the objective it is given; it does not certify
        factuality, instruction following, or executable correctness.
      </p>

      <p>
        I therefore used loss as one signal, not the whole dashboard. A
        small fixed generation panel made qualitative changes comparable across
        checkpoints, while code tasks eventually received executable tests. The
        early canary was intentionally tiny and served as a smoke detector, not a
        benchmark. For a controlled run, checkpoint selection should combine a
        frozen validation objective, fixed decoding settings, a broader
        decontaminated evaluation set, and side-by-side generation panels.
      </p>

      <p>
        The surviving continuation metrics also taught a provenance lesson:
        resumed segments with different learning rates can share step numbers
        inside one log. The data is still useful for understanding the run, but a
        future ledger should assign an immutable run ID to every record and keep
        the exact config, code revision, tokenizer, dataset manifest, hardware,
        and checkpoint together. That turns a folder of outputs into an
        experiment another engineer can reproduce.
      </p>

      <h3>SFT is a boundary-aware objective</h3>

      <p>
        Supervised fine-tuning changed more than the corpus. The SFT pipeline
        renders system, user, and assistant turns, then assigns labels only to
        assistant content. System text, user text, and role prefixes receive the
        ignore index. The current encoder begins the sequence with BOS and keeps
        the EOS after each assistant response inside the supervised span.
      </p>

      <CodeBlock label="Current assistant-only supervision contract">
{`input:   [BOS] System: ... User: ... Assistant: answer [EOS]
labels:   [-100]  -100 ...  -100 ...  -100 ... answer [EOS]
loss:     cross_entropy(logits, labels, ignore_index=-100)`}
      </CodeBlock>

      <p>
        That last token captures a subtle contract: seeing EOS in encoded data is
        not the same as supervising EOS. If the answer-ending token is masked,
        the model never receives a direct target for when to stop. Earlier
        post-training iterations exposed this distinction; the current encoder
        and tests now require a leading BOS, masked prompt positions, supervised
        assistant tokens, and supervised answer-ending EOS. The span construction
        is visible in
        {" "}<SourceLink href={`${source}/sft/train_sft.py`}>sft/train_sft.py</SourceLink>.
      </p>

      <p>
        The configured SFT mix targeted 22M tokens split approximately 52% general
        instruction data and 48% code instruction data, with per-source caps,
        prompt filters, response-length limits, and AST requirements where
        appropriate. Historical SFT runs and sample panels demonstrate that the
        end-to-end stage operated and supplied the initialization for targeted
        distillation. I use them as development evidence, while leaving numerical
        pre/post capability comparisons to the next fixed evaluation protocol.
      </p>

      <h2 id="distillation">Targeted distillation became a verifier problem</h2>

      <p>
        I added targeted distillation to concentrate training on short Python
        functions with deterministic behavior. A teacher response was not useful
        merely because it looked like code. It had to be extracted without
        damaging whitespace, parsed, checked for the expected function shape,
        executed against tests under a timeout, and only then serialized as a
        training example.
      </p>

      <figure className="article-flow-figure">
        <ol className="article-flow article-flow-compact">
          <li><strong>Teacher</strong><span>generate a candidate solution</span></li>
          <li><strong>Extract</strong><span>preserve the Python code block</span></li>
          <li><strong>AST</strong><span>check syntax, entry point, and structure</span></li>
          <li><strong>Execute</strong><span>run deterministic tests with a timeout</span></li>
          <li><strong>Filter</strong><span>retain only accepted examples</span></li>
          <li><strong>Train</strong><span>mix verified code with general data</span></li>
        </ol>
        <figcaption>
          Figure 2. In targeted code distillation, preprocessing and verification
          determine what the optimizer eventually sees.
        </figcaption>
      </figure>

      <p>
        One small bug made the point vividly. A prose normalizer collapsed every
        run of spaces and tabs to one space. Reusing it on a fenced Python block
        destroyed indentation before <code>ast.parse</code> saw the candidate, so
        valid programs could become invalid inside the data pipeline.
      </p>

      <CodeBlock label="Code-safe normalization preserves semantics">
{`def normalize_text(s):
    s = re.sub(r"[ \\t]+", " ", s)   # useful for prose

def normalize_code_text(s):
    s = re.sub(r"\\r\\n?", "\\n", s) # normalize line endings only
    return s.strip()                    # preserve indentation`}
      </CodeBlock>

      <p>
        Separating prose and code normalization fixed the representation before
        verification. The broader lesson is more important than the patch:
        generated-data quality is a property of the entire acceptance pipeline,
        not only the teacher model. For the breadth of PetitGPT, the key idea is
        that the verifier defines the dataset.
        {" "}<SourceLink href={`${source}/distill/code_utils.py`}>
          The current code-safe path
        </SourceLink>{" "}
        preserves that contract.
      </p>

      <h2 id="rope">The RoPE bug that ordinary training did not expose</h2>

      <p>
        The strongest debugging lesson came from rotary position embeddings.
        RoPE has two common coordinate conventions. An interleaved convention
        rotates adjacent coordinate pairs. The LLaMA/GPT-NeoX half-split
        convention pairs coordinate <em>i</em> with <em>i + d/2</em>. Both are
        valid. What matters is that the helper which rotates the vector agrees
        with the layout used to build the sine and cosine cache.
      </p>

      <p>
        An earlier PetitGPT implementation accidentally mixed the two. Its cache
        duplicated frequencies with <code>cat([freqs, freqs])</code>, which encodes
        a half-split layout. Its rotation helper sliced even and odd coordinates,
        which performs an adjacent-pair rotation. Combining those operations does
        not produce consistent two-dimensional rotation blocks.
      </p>

      <p>
        The error was quiet. Tensor shapes were correct. Outputs and gradients
        were finite. Position zero behaved like the identity because its sine
        terms vanish. Training cross-entropy could still fall because the network
        could optimize around a deterministic transformation. Conventional smoke
        tests proved that the program executed, but none asked whether the map
        retained the structure that makes rotary embeddings rotary.
      </p>

      <div
        className="article-equation"
        role="img"
        aria-label="A correct rotary map preserves vector norm and makes a rotated query-key dot product depend only on relative position"
      >
        <span>‖R<sub>t</sub>x‖₂ = ‖x‖₂</span>
        <span>⟨R<sub>t</sub>q, R<sub>s</sub>k⟩ = ⟨q, R<sub>s−t</sub>k⟩</span>
      </div>

      <p>
        Mathematical invariants exposed the mismatch immediately. A valid
        block-diagonal rotation preserves the Euclidean norm. Applying rotations
        at two positions to a query and key also makes their dot product depend
        on relative displacement, not on the two absolute positions separately.
        The mixed implementation violated both properties. Those tests were
        stronger than another shape assertion because they stated what the layer
        had to mean.
      </p>

      <p>
        I corrected the helper to use the same half-split convention as the
        cache: split the final dimension into two halves and concatenate
        <code>-x₂</code> with <code>x₁</code>. The change is only a few lines, but
        it restores the intended rotation geometry.
      </p>

      <CodeBlock label="Correct half-split rotation">
{`half = x.shape[-1] // 2
x1 = x[..., :half]
x2 = x[..., half:]
return torch.cat((-x2, x1), dim=-1)`}
      </CodeBlock>

      <p>
        The regression suite now checks norm preservation, relative-position
        invariance, identity at position zero, agreement with an independent
        reference calculation, and partial-dimension rotation. The correction
        itself is preserved in the
        {" "}<SourceLink href={`${repository}/commit/f95d51f44226a320b5019e1576b4830eec6e4a61`}>
          RoPE fix commit
        </SourceLink>, while the invariants live in
        {" "}<SourceLink href={`${source}/tests/test_model.py`}>tests/test_model.py</SourceLink>.
      </p>

      <p>
        Because the correction changes the representation itself, I treat the
        earlier training runs as development evidence rather than as measurements
        of the corrected architecture. The durable result is the testing pattern:
        for mathematically structured components, test invariants rather than
        only shapes and execution. A tiny deterministic counterexample can reveal
        an error that thousands of ordinary training steps do not make obvious.
      </p>

      <h2 id="discipline">From experiment to engineering system</h2>

      <p>
        The current stack implements DPO and GRPO/RLVR directly in PyTorch. DPO
        computes masked sequence log-probabilities for chosen and rejected answers
        under both policy and frozen reference models, then applies the preference
        objective. GRPO generates groups of completions, normalizes rewards within
        each group, applies a clipped surrogate objective, and controls drift with
        a KL term. For code tasks, the executable verifier can act as a binary or
        partial reward.
      </p>

      <p>
        Muon provides an alternative optimizer path for suitable matrix
        parameters, the sparse MoE variant adds routed experts and load-balancing
        behavior, and KV-cache decoding avoids recomputing the entire prefix at
        every generation step. Focused tests exercise their algorithmic and local
        correctness properties; controlled performance comparisons belong to the
        next experimental cycle.
      </p>

      <h3>Eighty-four tests encode the contracts</h3>

      <p>
        At revision <code>{revision.slice(0, 7)}</code>, all 84 CPU tests passed.
        CI runs them on Python 3.10 and 3.12. The tests cover causal attention,
        model shapes, parameter tying, RoPE
        invariants, cached-versus-full decoding equivalence, optimizer grouping,
        tokenizer IDs and round trips, BOS/EOS chat masking, MoE routing, DPO loss
        behavior, GRPO advantage and reward behavior, rollout alignment, and
        deterministic split logic.
      </p>

      <div className="article-table-wrap" tabIndex={0} role="region" aria-label="PetitGPT correctness contracts">
        <table>
          <caption>Examples of contracts protected by the current test suite</caption>
          <thead>
            <tr><th scope="col">Boundary</th><th scope="col">Protected property</th><th scope="col">Failure it prevents</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Attention</th><td>Causality and rotary invariants</td><td>Future-token leakage or invalid geometry</td></tr>
            <tr><th scope="row">Generation</th><td>Cached and full decoding agree</td><td>Fast-path behavior drift</td></tr>
            <tr><th scope="row">Tokenizer / chat</th><td>Stable IDs, round trips, supervised EOS</td><td>Silent boundary or masking changes</td></tr>
            <tr><th scope="row">MoE</th><td>Routing shapes and balancing behavior</td><td>Incorrect expert assignment</td></tr>
            <tr><th scope="row">DPO / GRPO</th><td>Masking, limits, advantages, rewards, KL</td><td>Plausible-looking but wrong objectives</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        This suite marks the transition from a collection of experiments to a
        system whose important assumptions are executable. That makes training
        and evaluation more interpretable: when a result changes, I can separate
        a planned experimental variable from drift in coordinate layout, token
        boundaries, cache behavior, or loss masking.
      </p>

      <h2 id="next">The next controlled training campaign</h2>

      <p>
        The next full run will train the corrected 16-layer configuration under a
        frozen experiment identity: exact code revision, resolved model config,
        tokenizer, and dataset manifest. Fixed decoding settings and a defined
        evaluation suite will support matched pre/post comparisons for SFT and
        targeted distillation, with the same principle applied if DPO or GRPO is
        run. I will also record single-GPU wall time, throughput, and peak VRAM
        under declared measurement windows.
      </p>

      <p>
        Building PetitGPT changed the way I think about LLM engineering. The
        difficult part was not writing a Transformer block; it was maintaining
        contracts across model geometry, tokenization, supervision, generated
        data, verification, evaluation, and checkpoint lineage. PetitGPT now
        embodies a disciplined end-to-end LLM engineering system in which the
        assumptions that determine behavior are explicit in implementation,
        tests, data contracts, and experimental protocol.
      </p>

      <p className="article-source-note">
        Source: <SourceLink href={repository}>PetitGPT repository</SourceLink>,
        referenced at revision <code>{revision.slice(0, 7)}</code>.
      </p>
    </>
  );
}
