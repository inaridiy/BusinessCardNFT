import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero bg-base-100">
        <div className="hero-content">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              <img src="https://api.lorem.space/image/face?hash=47449" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
