import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Small glyph per node kind, drawn as SVG so it matches the line weight of the diagrams.
export function KindIcon({ kind }) {
  const p = {
    trigger: <><circle cx="8" cy="8" r="5.5" /><circle cx="8" cy="8" r="1.6" className="fill" /></>,
    logic: <path d="M8 2.2 13.8 8 8 13.8 2.2 8Z" />,
    ai: <path d="M8 1.8v3.4M8 10.8v3.4M1.8 8h3.4M10.8 8h3.4M4 4l1.6 1.6M10.4 10.4 12 12M12 4l-1.6 1.6M5.6 10.4 4 12" />,
    app: <><rect x="2.5" y="2.5" width="11" height="11" rx="2.5" /><path d="M2.5 6.5h11" /></>,
    output: <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />,
  }[kind] || <circle cx="8" cy="8" r="5" />;
  return <svg className={`kind-icon kind-${kind}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">{p}</svg>;
}

// Linear workflow: nodes joined by wires, with a "packet" travelling along them.
// Horizontal on wide screens, vertical on phones (pure CSS).
export function FlowLine({ nodes, label, dark = false, compact = false, wrap = false }) {
  return (
    <figure className={`flow ${dark ? "is-dark" : ""} ${compact ? "is-compact" : ""} ${wrap ? "is-wrap" : ""} reveal`} aria-label={label || "Workflow"}>
      <ol className="flow-track" style={{ "--n": nodes.length }}>
        {nodes.map((node, i) => {
          const n = typeof node === "string" ? { label: node } : node;
          return (
            <li key={n.label + i} className={`flow-node kind-${n.kind || "app"}`} style={{ "--i": i }}>
              <span className="flow-card">
                <KindIcon kind={n.kind || (i === 0 ? "trigger" : i === nodes.length - 1 ? "output" : "app")} />
                <span className="flow-text">
                  <span className="flow-label">{n.label}</span>
                  {n.note && <span className="flow-note">{n.note}</span>}
                </span>
              </span>
              {i < nodes.length - 1 && <span className="flow-wire" aria-hidden="true"><span className="flow-packet" /></span>}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

// A small n8n-style canvas. Nodes can be dragged (mouse, pen or touch) and the
// wires follow; packets keep flowing along the wires.
// Each node has a wide-screen position (x, y) and a phone position (mx, my), both in
// % of the canvas, applied through CSS variables so the server-rendered layout is
// already right. Once a node is dragged, its position is held in state instead.
export function NodeCanvas({ nodes, edges, caption }) {
  const wrap = useRef(null);
  const [pos, setPos] = useState(() => nodes.map(() => null));
  const [size, setSize] = useState(null);
  const [paths, setPaths] = useState([]);
  const drag = useRef(null);

  useIso(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useIso(() => {
    const el = wrap.current;
    if (!el || !size) return;
    const boxes = [...el.querySelectorAll(".nc-node")].map(n => ({ x: n.offsetLeft, y: n.offsetTop, w: n.offsetWidth, h: n.offsetHeight }));
    setPaths(edges.map(([a, b]) => {
      const A = boxes[a], B = boxes[b];
      if (!A || !B) return "";
      const x1 = A.x + A.w, y1 = A.y + A.h / 2, x2 = B.x, y2 = B.y + B.h / 2;
      const dx = Math.max(40, Math.abs(x2 - x1) * 0.5);
      return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
    }));
  }, [pos, size, edges]);

  const down = i => e => {
    const r = wrap.current.getBoundingClientRect();
    const node = e.currentTarget;
    node.setPointerCapture(e.pointerId);
    drag.current = { i, ox: e.clientX - r.left - node.offsetLeft, oy: e.clientY - r.top - node.offsetTop };
    e.currentTarget.classList.add("is-dragging");
  };
  const move = i => e => {
    if (!drag.current || drag.current.i !== i) return;
    const r = wrap.current.getBoundingClientRect();
    const node = e.currentTarget;
    const x = Math.min(Math.max(0, e.clientX - r.left - drag.current.ox), r.width - node.offsetWidth);
    const y = Math.min(Math.max(0, e.clientY - r.top - drag.current.oy), r.height - node.offsetHeight);
    setPos(p => p.map((q, k) => (k === i ? { x: (x / r.width) * 100, y: (y / r.height) * 100 } : q)));
  };
  const up = e => { drag.current = null; e.currentTarget.classList.remove("is-dragging"); };

  return (
    <figure className="nc">
      <div className="nc-canvas" ref={wrap}>
        <svg className="nc-wires" width="100%" height="100%" aria-hidden="true">
          {paths.map((d, k) => d && (
            <g key={k}>
              <path id={`nc-w${k}`} d={d} className="nc-wire" />
              <circle r="3.5" className="nc-packet">
                <animateMotion dur={`${2.4 + (k % 3) * 0.5}s`} repeatCount="indefinite" begin={`${k * 0.45}s`}>
                  <mpath href={`#nc-w${k}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>
        {nodes.map((n, i) => (
          <div
            key={n.label}
            className={`nc-node kind-${n.kind}`}
            style={pos[i] ? { left: `${pos[i].x}%`, top: `${pos[i].y}%` } : { "--x": `${n.x}%`, "--y": `${n.y}%`, "--mx": `${n.mx ?? n.x}%`, "--my": `${n.my ?? n.y}%` }}
            onPointerDown={down(i)}
            onPointerMove={move(i)}
            onPointerUp={up}
            onPointerCancel={up}
          >
            <KindIcon kind={n.kind} />
            <span className="nc-text"><span className="nc-label">{n.label}</span><span className="nc-note">{n.note}</span></span>
          </div>
        ))}
      </div>
      {caption && <figcaption className="nc-caption">{caption}</figcaption>}
    </figure>
  );
}
