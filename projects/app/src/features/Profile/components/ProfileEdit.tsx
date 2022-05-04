import { GithubInput, NameInput, TwitterInput } from "@/components/Input";
import { ModalBase } from "@/components/Modal";
import { useDefaultForm } from "@/hooks";
import { useProfileEditModal } from "../store/profileData";
import { profileFormType } from "../types/profileFormType";

export const ProfileEdit = () => {
  const [open, setOpen] = useProfileEditModal();
  const { register } = useDefaultForm<profileFormType>({
    default: { name: "", twitter: "", github: "" },
  });
  return (
    <ModalBase
      pos="auto"
      className="relative modal-box"
      open={open}
      onChange={setOpen}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <button className="btn-sm btn btn-outline">Save</button>
      </div>

      <form>
        <NameInput {...register("name")} />
        <TwitterInput {...register("twitter")} />
        <GithubInput {...register("github")} />
      </form>
    </ModalBase>
  );
};
