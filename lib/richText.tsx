import { Fragment, type ReactNode } from "react";

const BOLD_LEAD_RE = /^\*\*(.+?)\*\*(.*)$/;

export function renderRichLine(line: string): ReactNode {
  const m = BOLD_LEAD_RE.exec(line);
  if (!m) return line;
  return (
    <Fragment>
      <strong>{m[1]}</strong>
      {m[2]}
    </Fragment>
  );
}
