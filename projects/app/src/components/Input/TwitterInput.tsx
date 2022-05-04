import { BsTwitter } from "react-icons/bs";

export const TwitterInput: React.VFC<JSX.IntrinsicElements["input"]> = (
  props
) => {
  return (
    <div className="w-full max-w-xs form-control">
      <label className="label">Twitter</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="@VitalikButerin"
          className="w-full max-w-xs input input-bordered"
          {...props}
        />
        <div className="bg-twitter border-twitter btn btn-square">
          <BsTwitter size="1.8rem" />
        </div>
      </div>
    </div>
  );
};
