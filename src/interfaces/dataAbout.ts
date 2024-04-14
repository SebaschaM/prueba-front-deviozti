export interface DataAboutPageI {
  hero: HeroAbout;
  fundamentals: FundamentalsAbout[];
  companies: CompaniesAbout[];
  organizational_precepts: OrganizationalPreceptsAbout[];
  rotation_time: string;
}

export interface HeroAbout {
  image: string;
  title: string;
  description: string;
}

export interface FundamentalsAbout {
  _id?: string;
  title: string;
  description: string;
  image: string;
}

export interface CompaniesAbout {
  _id?: string;
  icon: string;
  name: string;
}

export interface OrganizationalPreceptsAbout {
  _id?: string;
  icon?: string;
  title: string;
  description: string;
}
