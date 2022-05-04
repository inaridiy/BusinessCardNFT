import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const profileEditModal = atom({
  key: "profile-edit-modal",
  default: false,
});

export const useProfileEditModal = () => useRecoilState(profileEditModal);
export const useSetProfileEditModal = () => useSetRecoilState(profileEditModal);
