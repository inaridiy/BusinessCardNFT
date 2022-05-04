import { BsGithub } from "react-icons/bs";

export const GithubInput: React.VFC<JSX.IntrinsicElements["input"]> = (
  props
) => {
  return (
    <div className="w-full max-w-xs form-control">
      <label className="label">Github</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="@VitalikButerin"
          className="w-full max-w-xs input input-bordered"
          {...props}
        />
        <div className="bg-github border-github btn btn-square">
          <BsGithub size="1.8rem" />
        </div>
      </div>
    </div>
  );
};
