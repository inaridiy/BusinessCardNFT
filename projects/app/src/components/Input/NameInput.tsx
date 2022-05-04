import { BsFillPersonFill } from "react-icons/bs";
export const NameInput: React.FC<JSX.IntrinsicElements["input"]> = (props) => {
  return (
    <div className="w-full max-w-xs form-control">
      <label className="label">Name</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="VitalikButerin"
          className="w-full max-w-xs input input-bordered"
          {...props}
        />
        <div className="btn btn-square">
          <BsFillPersonFill size="1.8rem" />
        </div>
      </div>
    </div>
  );
};
