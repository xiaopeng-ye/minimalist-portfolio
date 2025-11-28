// Portfolio configuration type definitions

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  location: string;
  availability: string;
  currentRole: {
    title: string;
    company: string;
    startYear: number;
  };
}

export interface TechSkill {
  name: string;
  iconType?: "simple" | "dashboard";
  iconSlug?: string;
}

export interface WorkExperience {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: TechSkill[];
}

export interface ThoughtPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
}

export interface ContactInfo {
  email: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  applicationName: string;
  themeColor: string;
  backgroundColor: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  skills: TechSkill[];
  experience: WorkExperience[];
  thoughts?: ThoughtPost[];
  contact: ContactInfo;
  social: SocialLink[];
  siteMetadata: SiteMetadata;
}
