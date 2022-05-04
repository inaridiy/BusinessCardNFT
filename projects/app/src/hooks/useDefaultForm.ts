import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";

export const useDefaultForm = <T>(
  props: UseFormProps<T> & {
    default: T;
  }
): UseFormReturn<T> => {
  return useForm({ ...props });
};
