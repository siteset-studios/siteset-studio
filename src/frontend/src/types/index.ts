export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  demoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface ProblemSolution {
  problem: string;
  solution: string;
}
