import { atom, useRecoilState, useSetRecoilState } from "recoil";
export type ShareData = {
  title: string;
  text: string;
  url: string;
};

export const shareDataState = atom<ShareData | null>({
  key: "share-data",
  default: null,
});

export const useShareData = () => useRecoilState(shareDataState);
export const useSetShareData = () => useSetRecoilState(shareDataState);
