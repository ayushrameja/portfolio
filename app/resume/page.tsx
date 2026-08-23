import type { Metadata } from "next";
import { createPageMetadata } from "@/utils/metadata";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = createPageMetadata({
  title: "Résumé | Ayush Rameja",
  description: "View or download Ayush Rameja's senior full-stack engineering résumé.",
  path: "/resume",
});

export default function ResumePage() {
  return <ResumeContent />;
}
