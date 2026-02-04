export const LINKS = {
  email: "ayushrameja@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayushrameja/",
  github: "https://github.com/ayushrameja",
  autodesk: "https://www.autodesk.com",
} as const;

export const RESUME = {
  driveId: "1KH4dnH50ocYFxv0Cut7gqMltRDHgC088",
  get previewUrl() {
    return `https://drive.google.com/file/d/${this.driveId}/preview`;
  },
  get downloadUrl() {
    return `https://drive.google.com/uc?export=download&id=${this.driveId}`;
  },
} as const;

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ayush.im";
