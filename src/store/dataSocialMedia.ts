import { atom } from "jotai";
import { DataSocialMedia } from "../interfaces/dataSocialMedia";

export const dataSocialMediaAtom = atom<DataSocialMedia[]>(
  [] as DataSocialMedia[]
);
