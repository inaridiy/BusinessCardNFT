import ColorHash from "color-hash";
import { SHA256 } from "crypto-js";

const svgBase = (
  color1: string,
  color2: string,
  color3: string,
  transform1: string,
  transform2: string
) => {
  return `<svg viewBox="0 0 80 80" fill="none"
  xmlns="http://www.w3.org/2000/svg" width="345" height="345">
  <mask id="mask__marble" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
    <rect width="80" height="80" fill="white"></rect>
  </mask>
  <g mask="url(#mask__marble)">
    <rect width="80" height="80" fill="${color1}"></rect>
    <path filter="url(#prefix__filter0_f)" d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="${color2}" transform="${transform1}"></path>
    <path filter="url(#prefix__filter0_f)" d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" fill="${color3}" transform="${transform2}" style="mix-blend-mode: overlay;"></path>
  </g>
  <defs>
    <filter id="prefix__filter0_f" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
      <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur"></feGaussianBlur>
    </filter>
  </defs>
</svg>`;
};

const generateTransform = (value: any) => {
  const hash = SHA256(String(value));
  console.log(hash.toString().slice(0, 8));
};

export const generator = (value: any) => {
  const colorHash = new ColorHash({ lightness: 0.6 });
  const [c1, c2, c3] = [
    colorHash.hex(String(value) + "1"),
    colorHash.hex(String(value) + "2"),
    colorHash.hex(String(value) + "3"),
  ];
  generateTransform(value);
  return svgBase(c1, c2, c3, "", "");
};
