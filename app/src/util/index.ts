export const stopPropagation = (e: React.MouseEvent<HTMLElement>) =>
  e.stopPropagation();

export const inputHandler =
  (cb: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value);

export const closeModal = (e: React.MouseEvent<HTMLElement>) => {
  window.location.href = "#";
  e.stopPropagation();
};
