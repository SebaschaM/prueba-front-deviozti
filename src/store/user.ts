import { atom } from "jotai";

interface UserAtomI {
  name: string;
  email: string;
  token: string;
}

export const userAtom = atom<UserAtomI>({
  name: "",
  email: "",
  token: "",
});
