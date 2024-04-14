export interface DataHomePageI {
  navbar: Navbar;
  heros: Hero[];
  banner_info: BannerInfo;
  characteristics: Characteristics[];
  technical_skills: TechnicalSkills[];
  projects: Projects[];
  optimized: Optimized;
  payment_plans: PaymentPlan[];
  pages: Pages;
  footer: Footer[];
  rotation_time: string;
}

export interface BannerInfo {
  text: string;
  text_bold: string;
  text_button: string;
}

export interface TechnicalSkills {
  _id?: string;
  icon: any;
  skill: string;
}

interface Project {
  _id?: string;
  name: string;
  link: string;
  cover: string;
}

export interface Projects {
  _id?: string;
  name_project: string;
  list_projects: Project[];
}

export interface Footer {
  [key: string]: string | Link[] | undefined;
  title_1?: string;
  text?: string;
  title_2?: string;
  links?: Link[];
  title_3?: string;
  title_4?: string;
  text_2?: string;
}

export interface Link {
  _id?: string;
  name: string;
  link: string;
}

export interface Hero {
  hero_id: number;
  texts: Texts;
  image: string;
  video?: string;
}

//LO AGERGUÉ DE PUERBA, MODIFICARLO DE ACUERDO A LA BD
export interface HeroHeader {
  hero_id: number;
  texts: Texts; //Title
  image: string;
}

export interface Texts {
  text_1: string;
  text_2?: string;
  text_3?: string;
  text_button: string;
}

export interface Navbar {
  logo: string;
  links: Link[];
}

export interface Optimized {
  img: string;
  title_main: string;
  title_1: string;
  title_2: string;
  icon_1: string;
  icon_2: string;
  text_1: string;
  text_2: string;
}

export interface Pages {
  sublinks: Sublink[];
  content: PagesContent[];
}

export interface PagesContent {
  image: string;
  title: string;
}

export interface Sublink {
  name: string;
  section: number;
}

export interface Characteristics {
  _id?: string;
  icon?: string;
  quantity: string;
  text: string;
  isVisibled: boolean;
}

export interface PaymentPlanBenefit {
  _id: string;
  name: string;
}

export interface PaymentPlan {
  color: string;
  title_1: string;
  text_title_1: string;
  price: string;
  span_1: string;
  text_1: string;
  link: string;
  benefits: PaymentPlanBenefit[];
}
