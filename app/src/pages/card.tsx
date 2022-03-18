import type { NextPage } from "next";
import { useRouter } from "next/router";

const Card: NextPage = () => {
  const {
    query: { theme: _theme, type: _type },
  } = useRouter();
  const dataTheme = String(_theme) || "lofi";
  const type = String(_type);
  return (
    <div
      data-theme={dataTheme}
      className="h-full flex justify-center items-center bg-base-200 text-base-content p-4"
    >
      <div className="card w-96 bg-base-100 shadow-xl artboard phone-1">
        <figure>
          <img
            src="https://api.lorem.space/image/shoes?w=400&h=225"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
