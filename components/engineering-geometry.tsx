/** Loose plates resolve into an aligned equipment frame as the visitor scrolls. */
export default function EngineeringGeometry({
  variant,
}: {
  variant: "hero" | "services" | "finished";
}) {
  return (
    <svg
      className={`engineering-geometry geometry-${variant}`}
      viewBox="0 0 560 360"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`steel-${variant}`}
          x1="0"
          y1="0"
          x2="560"
          y2="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e6edf2" stopOpacity=".24" />
          <stop offset=".5" stopColor="#9cabb8" stopOpacity=".02" />
          <stop offset="1" stopColor="#e6edf2" stopOpacity=".19" />
        </linearGradient>
      </defs>
      <g className="geometry-guides" stroke="currentColor" strokeWidth="1">
        <path
          className="geometry-line"
          pathLength="1"
          d="M25 70H535M25 290H535M100 25V335M460 25V335"
        />
        <path
          className="geometry-line"
          pathLength="1"
          d="M75 95V70H100M460 70H485V95M485 265V290H460M100 290H75V265"
        />
        <path
          className="geometry-line"
          pathLength="1"
          d="M100 315H460M100 308V322M460 308V322"
        />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g className={`geometry-plate plate-${i}`} key={i}>
          <rect
            x={100 + i * 90}
            y="95"
            width="90"
            height="170"
            fill={`url(#steel-${variant})`}
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d={`M${112 + i * 90} 107h66v146h-66z`}
            stroke="currentColor"
            strokeOpacity=".3"
            strokeWidth=".5"
          />
        </g>
      ))}
      <path
        className="geometry-seam geometry-line"
        pathLength="1"
        d="M100 180H460M190 95V265M280 95V265M370 95V265"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <g className="geometry-nodes" fill="currentColor">
        {[100, 190, 280, 370, 460].map((x) => (
          <circle key={x} cx={x} cy="180" r="3" />
        ))}
      </g>
    </svg>
  );
}
