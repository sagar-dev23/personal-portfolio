import { Button, Label } from "../components/shared.jsx";
import { FlowLine } from "../components/Flow.jsx";

export default function NotFound() {
  return (
    <section className="page-hero notfound" aria-labelledby="nf-title">
      <div className="wrap">
        <Label>error 404</Label>
        <h1 id="nf-title" className="h1">This page didn't make it through the workflow<span className="dot">.</span></h1>
        <FlowLine nodes={[{ label: "Request", kind: "trigger" }, { label: "Router", kind: "logic" }, { label: "Page", kind: "app", note: "not found" }]} label="Request that ended in a 404" />
        <div className="hero-actions">
          <Button href="/">Back to the homepage</Button>
          <Button href="/work" variant="ghost">See my work</Button>
        </div>
      </div>
    </section>
  );
}
