export const LINKS = {
  email: "wave@ayush.im",
  phone: "+919660853303",
  phoneDisplay: "+91-9660853303",
  website: "https://ayush.im",
  linkedin: "https://www.linkedin.com/in/ayushrameja",
  github: "https://github.com/ayushrameja",
  quarks: "https://www.qtsolv.com/",
} as const;

export const RESUME = {
  previewUrl: "/files/ayush-rameja-resume.pdf",
  downloadUrl: "/files/ayush-rameja-resume.pdf",
} as const;

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || LINKS.website;
