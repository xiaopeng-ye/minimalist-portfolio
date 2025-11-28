import type { PortfolioConfig } from "@/types/portfolio";

// Portfolio configuration - imported at build time
// This is a static export, so the config is embedded into the bundle
const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Xiaopeng Ye",
    firstName: "Xiaopeng",
    lastName: "Ye",
    title: "Fullstack Developer",
    bio: "Fullstack Developer crafting digital experiences at the intersection of design, technology, and user experience.",
    location: "Spain",
    availability: "Available for work",
    currentRole: {
      title: "Full-Stack Developer",
      company: "Huawei",
      startYear: 2023,
    },
  },
  skills: [
    { name: "Python", iconType: "dashboard", iconSlug: "python" },
    { name: "TypeScript", iconType: "dashboard", iconSlug: "typescript" },
    { name: "Go", iconType: "dashboard", iconSlug: "go" },
    { name: "React", iconType: "dashboard", iconSlug: "reactjs" },
    { name: "Next.js", iconType: "dashboard", iconSlug: "nextjs" },
    { name: "Tailwind CSS", iconType: "dashboard", iconSlug: "tailwind" },
    { name: "D3.js", iconType: "simple", iconSlug: "d3" },
    { name: "FastAPI", iconType: "simple", iconSlug: "fastapi" },
    { name: "RAG", iconType: "dashboard", iconSlug: "openai" },
    { name: "LangChain", iconType: "simple", iconSlug: "langchain" },
    { name: "Docker", iconType: "dashboard", iconSlug: "docker" },
    { name: "Kubernetes", iconType: "dashboard", iconSlug: "kubernetes" },
    { name: "Terraform", iconType: "dashboard", iconSlug: "terraform" },
    { name: "Ansible", iconType: "dashboard", iconSlug: "ansible" },
    { name: "AWS", iconType: "dashboard", iconSlug: "aws" },
    { name: "PostgreSQL", iconType: "dashboard", iconSlug: "postgresql" },
    { name: "MongoDB", iconType: "dashboard", iconSlug: "mongodb" },
    { name: "Prometheus", iconType: "dashboard", iconSlug: "prometheus" },
    { name: "Grafana", iconType: "dashboard", iconSlug: "grafana" },
  ],
  experience: [
    {
      year: "2023 - Present",
      role: "Cloud Engineer & Full-Stack Developer",
      company: "Huawei",
      description: "Architected full-stack AI solutions using RAG systems with LLMs and Vector Databases, reducing information retrieval time by 70%. Engineered complete LLMOps lifecycle with Docker and Kubernetes, implementing monitoring with Prometheus, Grafana, and Langfuse. Designed secure hybrid cloud architectures and automated CI/CD pipelines for cloud-native deployments.",
      technologies: [
        { name: "Python", iconType: "dashboard", iconSlug: "python" },
        { name: "RAG", iconType: "dashboard", iconSlug: "openai" },
        { name: "LangChain", iconType: "dashboard", iconSlug: "langchain" },
        { name: "Docker", iconType: "dashboard", iconSlug: "docker" },
        { name: "Kubernetes", iconType: "dashboard", iconSlug: "kubernetes" },
        { name: "Prometheus", iconType: "dashboard", iconSlug: "prometheus" },
        { name: "Grafana", iconType: "dashboard", iconSlug: "grafana" },
      ],
    },
    {
      year: "2022 - 2023",
      role: "Frontend Developer",
      company: "Collisio Technologies",
      description: "Led frontend development of a real estate crowdfunding platform with React, Redux, and Tailwind CSS, serving hundreds of active investors. Engineered interactive dashboards using D3.js to visualize complex financial data. Established CI/CD pipeline for frontend application, improving development velocity.",
      technologies: [
        { name: "React", iconType: "dashboard", iconSlug: "reactjs" },
        { name: "TypeScript", iconType: "dashboard", iconSlug: "typescript" },
        { name: "Next.js", iconType: "dashboard", iconSlug: "nextjs" },
        { name: "Redux", iconType: "simple", iconSlug: "redux" },
        { name: "Tailwind CSS", iconType: "dashboard", iconSlug: "tailwind" },
        { name: "D3.js", iconType: "simple", iconSlug: "d3" },
      ],
    },
    {
      year: "2021",
      role: "Data Scientist Intern",
      company: "Inetum",
      description: "Conducted exploratory data analysis and trained NLP models for customer feedback analysis. Visualized data insights using Python libraries such as Pandas and Matplotlib.",
      technologies: [
        { name: "Python", iconType: "dashboard", iconSlug: "python" },
        { name: "Pandas", iconType: "dashboard", iconSlug: "python" },
        { name: "NLP", iconType: "dashboard", iconSlug: "openai" },
      ],
    },
    {
      year: "2021",
      role: "Research Intern",
      company: "IMDEA Software Institute",
      description: "Research internship focused on software engineering and programming languages.",
      technologies: [
        { name: "Research", iconType: "simple", iconSlug: "googlesearchconsole" },
      ],
    },
  ],
  // thoughts: [
  //   {
  //     title: "The Future of Web Development",
  //     excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
  //     date: "Dec 2024",
  //     readTime: "5 min",
  //   },
  //   {
  //     title: "Design Systems at Scale",
  //     excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
  //     date: "Nov 2024",
  //     readTime: "8 min",
  //   },
  //   {
  //     title: "Performance-First Development",
  //     excerpt: "Why performance should be a first-class citizen in your development workflow.",
  //     date: "Oct 2024",
  //     readTime: "6 min",
  //   },
  //   {
  //     title: "The Art of Code Review",
  //     excerpt: "Building better software through thoughtful and constructive code reviews.",
  //     date: "Sep 2024",
  //     readTime: "4 min",
  //   },
  // ],
  contact: {
    email: "xiaopengye@kkcloud.org",
  },
  social: [
    {
      name: "MacOS Portfolio",
      handle: "macos.kkcloud.org",
      url: "https://macos.kkcloud.org",
    },
    {
      name: "GitHub",
      handle: "@xiaopeng-ye",
      url: "https://github.com/xiaopeng-ye",
    },
    {
      name: "LinkedIn",
      handle: "xiao-peng-ye",
      url: "https://www.linkedin.com/in/xiao-peng-ye/",
    },
  ],
  siteMetadata: {
    title: "Xiaopeng Ye - Full-Stack Developer",
    description: "A versatile Software Engineer with a passion for building data-driven solutions, bridging the gap from cloud infrastructure to sophisticated frontend applications.",
    applicationName: "Xiaopeng Ye's Portfolio",
    themeColor: "#ffffff",
    backgroundColor: "#ffffff",
  },
};

/**
 * Get portfolio configuration
 * Since this is a static export, the config is embedded into the bundle
 */
export function getPortfolioConfig(): PortfolioConfig {
  return portfolioConfig;
}

/**
 * Get specific section from portfolio config
 */
export function getPersonalInfo() {
  return getPortfolioConfig().personal;
}

export function getSkills() {
  return getPortfolioConfig().skills;
}

export function getExperience() {
  return getPortfolioConfig().experience;
}

export function getThoughts() {
  return getPortfolioConfig().thoughts;
}

export function getContact() {
  return getPortfolioConfig().contact;
}

export function getSocial() {
  return getPortfolioConfig().social;
}

export function getSiteMetadata() {
  return getPortfolioConfig().siteMetadata;
}
