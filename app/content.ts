export const links = {
  email: "mailto:qiyang0730@gmail.com",
  github: "https://github.com/yangqi0",
  linkedIn: "https://www.linkedin.com/in/yangqi-ai/",
  petitGpt: "https://github.com/yangqi0/petitgpt",
  petitGptModel: "https://huggingface.co/yqi0/petitgpt",
  petitGptArticle: "/blog/building-petitgpt",
  scholar:
    "https://scholar.google.com/citations?user=OahUJg0AAAAJ&hl=en",
} as const;

export const primaryNavigation = [
  { href: "/blog", label: "Blog" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#research", label: "Research" },
] as const;

export const mobileNavigation = [
  ...primaryNavigation,
  { href: "/#contact", label: "Contact" },
] as const;

export const focusAreas = [
  "Efficient ML architectures",
  "LLM training & post-training",
  "Tensor methods",
  "Mathematical ML foundations",
] as const;

type ProjectMetric = {
  label: string;
  value: string;
  detail: string;
};

type ProjectLink = {
  label: "Repository" | "Technical write-up" | "Model weights" | "Demo" | "arXiv paper";
  href: string;
  external: boolean;
};

export type Project = {
  index: string;
  context: string;
  title: string;
  subtitle: string;
  links?: readonly ProjectLink[];
  summary: string;
  points: readonly string[];
  metrics?: readonly ProjectMetric[];
};

export const projects: readonly Project[] = [
  {
    index: "01",
    context: "Independent ML systems",
    title: "PetitGPT",
    subtitle: "A 124.6M Language Model Trained from Scratch",
    links: [
      {
        label: "Technical write-up",
        href: links.petitGptArticle,
        external: false,
      },
      { label: "Repository", href: links.petitGpt, external: true },
      { label: "Model weights", href: links.petitGptModel, external: true },
    ],
    summary:
      "A released language model pretrained on approximately 13B token positions using one RTX 4090, with a custom tokenizer, instruction tuning, reproducible evaluation, and native PyTorch inference.",
    points: [
      "Built a 30-layer, 124.6M-parameter decoder with grouped-query attention, RMSNorm, SwiGLU, and tied embeddings; pretraining reached reference validation loss 2.4702.",
      "Reached 57.74% ARC-Easy and 28.16% ARC-Challenge accuracy, ahead of two evaluated SmolLM 135M instruct baselines under the same protocol; results were lower on PIQA and HellaSwag.",
      "Published the weights, tokenizer, training recipes, evaluation protocols, loss curves, and success/failure cases; studied adaptation and capability retention through SFT, DPO, response distillation, and LoRA.",
    ],
    metrics: [
      { label: "Model size", value: "124.6M", detail: "released parameters" },
      { label: "Pretraining", value: "13B", detail: "token positions" },
      { label: "Training hardware", value: "1×", detail: "RTX 4090" },
    ],
  },
  {
    index: "02",
    context: "Huawei · Efficient tensor learning",
    title: "Efficient Tensor Approximation",
    subtitle: "Alternating CNN",
    summary:
      "A neural architecture for compressing high-dimensional CSI tensor data through efficient approximation of low-rank tensor structure.",
    points: [
      "Developed a neural architecture for high-dimensional CSI tensor data compression.",
      "Designed the approach to efficiently approximate low-rank tensor structure.",
      "Achieved normalized reconstruction error below 0.01 and reduced training time by approximately 25% relative to a 3D-CNN baseline.",
    ],
    metrics: [
      {
        label: "Normalized reconstruction error",
        value: "< 0.01",
        detail: "achieved",
      },
      {
        label: "Training time",
        value: "≈25% lower",
        detail: "relative to 3D-CNN baseline",
      },
      { label: "Reference", value: "3D-CNN", detail: "baseline" },
    ],
  },
  {
    index: "03",
    context: "Huawei · Learning theory",
    title: "Correlated Spiked Tensor Models",
    subtitle: "High-dimensional recovery",
    links: [
      {
        label: "arXiv paper",
        href: "https://arxiv.org/abs/2503.03356",
        external: true,
      },
    ],
    summary:
      "Theory and algorithms for recovering multiple correlated spikes in high-dimensional tensor models.",
    points: [
      "Studied detection phase transitions and local-optimization accuracy using random matrix theory and high-dimensional optimization.",
      "Derived statistical guarantees for correlated latent components.",
      "Derived an asymptotically unbiased estimator of signal strength.",
    ],
  },
];

export type RecentExperience = {
  dates: string;
  location: string;
  role: string;
  organization: string;
  points: readonly string[];
};

export const recentExperience = [
  {
    dates: "Nov 2023 – Dec 2024",
    location: "Paris, France",
    role: "Research Scientist",
    organization: "Huawei Paris Research Center",
    points: [
      "Developed an efficient neural architecture for low-rank CSI tensor approximation, achieving normalized reconstruction error below 0.01 and reducing training time by approximately 25% relative to a 3D-CNN baseline.",
      "Developed theory and algorithms for correlated multi-spiked tensor recovery, including phase-transition analysis, statistical guarantees, and an asymptotically unbiased signal-strength estimator.",
    ],
  },
  {
    dates: "Jan 2025 – Present",
    location: "Lille, France",
    role: "Independent Researcher",
    organization: "Independent AI/ML Projects",
    points: [
      "Trained and released PetitGPT, a 30-layer, 124.6M-parameter language model, from tokenizer training through approximately 13B pretraining positions on one RTX 4090.",
      "Built instruction-tuning and checkpoint-interpolation workflows, evaluated post-training trade-offs, and published native inference, benchmark protocols, training curves, and reproducibility documentation.",
    ],
  },
] as const satisfies readonly RecentExperience[];

export const earlierExperience = [
  {
    organization: "Inria and École Polytechnique",
    role: "Researcher",
    dates: "Nov 2019 – Oct 2023",
  },
  {
    organization: "University of Chicago, Department of Mathematics",
    role: "L.E. Dickson Instructor",
    dates: "Sep 2018 – Aug 2019",
  },
  {
    organization: "University of Chicago, Department of Statistics",
    role: "Postdoctoral Researcher",
    dates: "Oct 2016 – Aug 2018",
  },
  {
    organization: "CNRS / Université Grenoble Alpes / GIPSA-lab",
    role: "Postdoctoral Researcher",
    dates: "Oct 2013 – Sep 2016",
  },
] as const;

export const skills = [
  {
    category: "Machine Learning",
    items:
      "Deep learning, transformer language models, pretraining, supervised fine-tuning, distillation, DPO, LLM evaluation, experiment design",
  },
  {
    category: "Programming / Frameworks",
    items: "Python, PyTorch, NumPy, scikit-learn, TensorFlow",
  },
  {
    category: "Mathematical / Applied Research",
    items:
      "Probability, statistics, optimization, tensor methods, signal processing, optimal control",
  },
] as const;

export const researchAreas = [
  {
    title: "High-dimensional statistics & tensor recovery",
    description:
      "Statistical recovery, phase transitions, and optimization in structured high-dimensional models.",
  },
  {
    title: "Tropical methods for data analysis",
    description:
      "Geometric approaches to regression, principal component analysis, and data analysis.",
  },
  {
    title: "Optimization & optimal control",
    description:
      "Mathematical and computational methods for optimization and controlled dynamical systems.",
  },
] as const;

export const education = [
  {
    degree: "Ph.D. in Mathematics",
    institution: "Texas A&M University",
    year: "2013",
  },
  {
    degree: "Master's Degree in Mathematics",
    institution: "Peking University",
    year: "2007",
  },
] as const;
