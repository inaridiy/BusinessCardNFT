export const Avatar = () => {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="345"
      height="345"
      className="w-full h-full"
    >
      <mask
        id="mask__marble"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="80"
        height="80"
      >
        <rect width="80" height="80" fill="white"></rect>
      </mask>
      <g mask="url(#mask__marble)">
        <rect width="80" height="80" rx="2" fill="#C20D90"></rect>
        <path
          filter="url(#prefix__filter0_f)"
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill="#92A1C6"
          transform="translate(0 0) rotate(-288 40 40) scale(1.2)"
        ></path>
        <path
          filter="url(#prefix__filter0_f)"
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill="#146A7C"
          transform="translate(0 0) rotate(72 40 40) scale(1.2)"
          style={{ mixBlendMode: "overlay" }}
        ></path>
      </g>
      <defs>
        <filter
          id="prefix__filter0_f"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="7"
            result="effect1_foregroundBlur"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
