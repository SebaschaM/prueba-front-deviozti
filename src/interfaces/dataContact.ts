export interface DataContactPageI {
  hero: HeroContact;
  contact: CardContact;
  form: FormContact[];
}

//Body Section

export interface HeroContact {
  image: string;
  title: string;
  description: string;
}

export interface CardContact {
  title: string;
  cards: Cards[];
}

export interface Cards {
  _id?: string;
  icon: string;
  link: string;
  type_link: string;
}

export interface FormContact {
  _id?: string;
  label: string;
  form_field: FormFieldContact;
}

export interface FormFieldContact {
  inputType: "text" | "number" | "email" | "select";
  placeHolder: string;
}
