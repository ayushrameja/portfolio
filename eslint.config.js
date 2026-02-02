import next from "eslint-config-next/core-web-vitals";

const config = [
  ...next,
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default config;
