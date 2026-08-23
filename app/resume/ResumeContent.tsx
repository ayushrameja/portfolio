import Link from "next/link";

import { RESUME_PATH } from "@/constants/links";

export default function ResumeContent() {
  return (
    <main className="resume-viewer" data-palette="paper">
      <header className="resume-viewer__header">
        <div>
          <Link className="text-link" href="/">← Back</Link>
          <div>
            <p className="eyebrow">Résumé</p>
            <h1>Ayush Rameja</h1>
          </div>
        </div>
        <div className="resume-viewer__actions">
          <a className="site-button site-button--secondary" href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <a className="site-button site-button--primary" href={RESUME_PATH} download>
            Download PDF
          </a>
        </div>
      </header>

      <object
        className="resume-viewer__document"
        data={`${RESUME_PATH}#view=FitH`}
        type="application/pdf"
        aria-label="Ayush Rameja résumé PDF"
      >
        <div className="resume-viewer__fallback">
          <p>This browser cannot display the embedded résumé.</p>
          <a className="site-button site-button--primary" href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
            Open the PDF
          </a>
        </div>
      </object>
      <p className="resume-viewer__browser-fallback">
        PDF not visible? <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">Open it in a new tab.</a>
      </p>
    </main>
  );
}
