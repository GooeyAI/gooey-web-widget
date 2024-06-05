import SvgIcon from "src/components/shared/SvgIcon";

const IconGoogleSlides = (props: any) => {
  const size = props?.size || 12;
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 242424 333334"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        image-rendering="optimizeQuality"
        fill-rule="evenodd"
        clip-rule="evenodd"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient
            id="c"
            gradientUnits="userSpaceOnUse"
            x1="200291"
            y1="94137"
            x2="200291"
            y2="173145"
          >
            <stop offset="0" stop-color="#bf360c" />
            <stop offset="1" stop-color="#bf360c" />
          </linearGradient>
          <mask id="b">
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="200291"
              y1="91174.4"
              x2="200291"
              y2="176107"
            >
              <stop offset="0" stop-opacity=".02" stop-color="#fff" />
              <stop offset="1" stop-opacity=".2" stop-color="#fff" />
            </linearGradient>
            <path fill="url(#a)" d="M158007 84111h84568v99059h-84568z" />
          </mask>
        </defs>
        <g fill-rule="nonzero">
          <path
            d="M151516 0H22726C10228 0 0 10228 0 22726v287880c0 12494 10228 22728 22726 22728h196971c12494 0 22728-10234 22728-22728V90909l-53037-37880L151516 1z"
            fill="#f4b300"
          />
          <path
            d="M170452 151515H71970c-6252 0-11363 5113-11363 11363v98483c0 6251 5112 11363 11363 11363h98482c6252 0 11363-5112 11363-11363v-98483c0-6250-5111-11363-11363-11363zm-3792 87118H75756v-53027h90904v53027z"
            fill="#f0f0f0"
          />
          <path
            mask="url(#b)"
            fill="url(#c)"
            d="M158158 84261l84266 84242V90909z"
          />
          <path
            d="M151516 0v68181c0 12557 10167 22728 22726 22728h68182L151515 0z"
            fill="#f9da80"
          />
          <path
            fill="#fff"
            fill-opacity=".102"
            d="M151516 0v1893l89008 89016h1900z"
          />
          <path
            d="M22726 0C10228 0 0 10228 0 22726v1893C0 12121 10228 1893 22726 1893h128790V0H22726z"
            fill="#fff"
            fill-opacity=".2"
          />
          <path
            d="M219697 331433H22726C10228 331433 0 321209 0 308705v1900c0 12494 10228 22728 22726 22728h196971c12494 0 22728-10234 22728-22728v-1900c0 12504-10233 22728-22728 22728z"
            fill="#bf360c"
            fill-opacity=".2"
          />
          <path
            d="M174243 90909c-12559 0-22726-10171-22726-22728v1893c0 12557 10167 22728 22726 22728h68182v-1893h-68182z"
            fill="#bf360c"
            fill-opacity=".102"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default IconGoogleSlides;
