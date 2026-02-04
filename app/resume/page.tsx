import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
  title: "Resume | Ayush Rameja",
  description: "View and download Ayush Rameja's resume.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
