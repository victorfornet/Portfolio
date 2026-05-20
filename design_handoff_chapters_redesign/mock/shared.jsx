/* global React */
const { Fragment } = React;

// chapter marker (label + roman numeral)
function Marker({ num, label, dark }) {
  return (
    <div className="marker">
      <span className="marker__num">{num}</span>
      <span className="marker__dot" />
      <span>{label}</span>
    </div>
  );
}

// status chip
function Chip({ children, done }) {
  return (
    <span className={"chip" + (done ? " chip--done" : "")}>
      <span className="chip__dot" />
      {children}
    </span>
  );
}

// inline stat pill — `<Pill><b>5.6M</b> ARR</Pill>`
function Pill({ children, ghost, dot }) {
  return (
    <span className={"pill" + (ghost ? " pill--ghost" : "")}>
      {dot && <span className="pill__dot" />}
      {children}
    </span>
  );
}

// scene illustration (pixel art)
function Scene({ src, alt, tag, style }) {
  return (
    <div className="scene" style={style}>
      <img className="pixelated" src={src} alt={alt} />
      {tag && <span className="scene__tag">{tag}</span>}
    </div>
  );
}

// Direction A "stood out" dossier card
function Standout({ idx, lead, children }) {
  return (
    <div className="standout">
      <div className="standout__idx">{idx}</div>
      <div>
        <p className="standout__lead">{lead}</p>
        <p className="standout__body">{children}</p>
      </div>
    </div>
  );
}

// Direction B side-margin annotation
function Annot({ idx, lead, children }) {
  return (
    <div className="annot">
      <div className="annot__rule">{idx}</div>
      <div>
        <p className="annot__lead">{lead}</p>
        <p className="annot__body">{children}</p>
      </div>
    </div>
  );
}

// megastat (huge serif number)
function Megastat({ num, label }) {
  return (
    <div className="megastat">
      <div className="megastat__num">{num}</div>
      <div className="megastat__label">{label}</div>
    </div>
  );
}

// link with the project's underline style
function Lnk({ children, href, dark }) {
  return (
    <a href={href || "#"} target="_blank" rel="noreferrer">{children}</a>
  );
}

// Project card — matches the portfolio's existing dark-card style.
// Used in Direction B Chapter IV (side projects).
function ProjectCard({ name, status, done, summary, stack = [], foot }) {
  return (
    <article className="proj" style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 18,
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minHeight: 0,
    }}>
      <div className="proj__top" style={{ marginBottom: -2 }}>
        <div className="proj__icon">
          <span className="proj__icon-dot" style={done ? { background: "#9aa6b8", boxShadow: "0 0 0 4px rgba(154,166,184,0.18)" } : {}} />
        </div>
        <span className="proj__status">{status}</span>
      </div>
      <h3 className="proj__name">{name}</h3>
      <p className="proj__sum">{summary}</p>
      {stack.length > 0 && (
        <div className="proj__stack">
          {stack.map((s) => <span key={s} className="stack">{s}</span>)}
        </div>
      )}
      <div className="proj__more" style={{ marginTop: "auto" }}>Read more ↓</div>
    </article>
  );
}

Object.assign(window, {
  Marker, Chip, Pill, Scene, Standout, Annot, Megastat, Lnk, ProjectCard,
});
