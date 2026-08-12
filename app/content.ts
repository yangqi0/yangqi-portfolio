export const links = {
  cv: "/Yang_Qi_Resume.pdf",
  email: "mailto:qiyang0730@gmail.com",
  github: "https://github.com/yangqi0",
  linkedIn: "https://www.linkedin.com/in/yang-qi-a92a404b/",
  petitGpt: "https://github.com/yangqi0/petitgpt",
  scholar:
    "https://scholar.google.com/citations?user=OahUJg0AAAAJ&hl=en",
} as const;

export const primaryNavigation = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#research", label: "Research" },
] as const;

export const mobileNavigation = [
  ...primaryNavigation,
  { href: "#contact", label: "Contact" },
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
  label: "Repository" | "Technical write-up" | "Demo" | "arXiv paper";
  href: string;
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
    title: "petitGPT",
    subtitle: "Language Model Training from Scratch",
    links: [{ label: "Repository", href: links.petitGpt }],
    summary:
      "A from-scratch PyTorch implementation spanning model architecture, pretraining, post-training, and evaluation; the model was pretrained on a single RTX 4090.",
    points: [
      "Built and pretrained a ~137M-parameter, 16-layer LLaMA-style decoder with RoPE, RMSNorm, and SwiGLU.",
      "Developed the post-training pipeline: supervised fine-tuning, targeted response distillation for Python function generation, DPO, and evaluation.",
      "Built a code-data verification pipeline with Python AST and structural checks, time-bounded unit tests using allowlisted built-ins, and teacher-assisted repair followed by reverification.",
    ],
    metrics: [
      { label: "Model size", value: "~137M", detail: "parameters" },
      { label: "Architecture", value: "16", detail: "decoder layers" },
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
      { label: "arXiv paper", href: "https://arxiv.org/abs/2503.03356" },
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
      "Built petitGPT, a ~137M-parameter LLaMA-style decoder pretrained from scratch in PyTorch on a single RTX 4090.",
      "Implemented post-training and evaluation spanning supervised fine-tuning, targeted response distillation for Python function generation, DPO, and code-data verification.",
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
