export function CircuitLines() {
  return (
    <div className="circuit-lines" aria-hidden="true">
      <svg
        viewBox="0 0 800 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet"
      >
        <path
          className="circuit-lines__path circuit-lines__path--a"
          d="M0 120 H280 V220 H520 V160 H800"
        />
        <path
          className="circuit-lines__path circuit-lines__path--b"
          d="M800 380 H560 V480 H240 V420 H0"
        />
        <path
          className="circuit-lines__path circuit-lines__path--c"
          d="M120 0 V180 H420 V320 H680 V600"
        />
        <path
          className="circuit-lines__path circuit-lines__path--extend circuit-lines__path--d"
          d="M680 600 V700"
        />
        <path
          className="circuit-lines__path circuit-lines__path--extend circuit-lines__path--e"
          d="M420 320 V430 H300 V540"
        />
        <path
          className="circuit-lines__path circuit-lines__path--extend circuit-lines__path--f"
          d="M240 420 V510 H160 V640"
        />
        <circle className="circuit-lines__node" cx="280" cy="120" r="3" />
        <circle className="circuit-lines__node" cx="520" cy="220" r="3" />
        <circle className="circuit-lines__node" cx="560" cy="480" r="3" />
        <circle className="circuit-lines__node" cx="420" cy="320" r="3" />
        <circle className="circuit-lines__node circuit-lines__node--extend" cx="680" cy="650" r="2.5" />
        <circle className="circuit-lines__node circuit-lines__node--extend" cx="300" cy="540" r="2.5" />
      </svg>
    </div>
  );
}
