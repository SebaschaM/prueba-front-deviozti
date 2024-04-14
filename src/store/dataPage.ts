import { atom } from "jotai";
import { DataHomePageI } from "../interfaces/dataHome";
import { DataAboutPageI } from "../interfaces/dataAbout";
import { DataContactPageI } from "../interfaces/dataContact";

export const dataHomePageAtom = atom<DataHomePageI>({} as DataHomePageI);
export const dataAboutPageAtom = atom<DataAboutPageI>({} as DataAboutPageI);
export const dataContactPageAtom = atom<DataContactPageI>(
  {} as DataContactPageI
);
