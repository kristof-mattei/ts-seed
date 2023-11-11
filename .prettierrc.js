// eslint-disable-next-line no-undef
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  printWidth: 200,
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  useTabs: false,
  tabWidth: 4,
  trailingComma: "all",
  overrides: [
    {
      files: ["*.yml", "*.yaml"],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: "*.js",
      options: {
        tabWidth: 2,
        parser: "babel",
      },
    },
    {
      files: "*.json",
      options: {
        tabWidth: 2,
        parser: "json",
      },
    },
    {
      files: "*.ts",
      options: {
        parser: "typescript",
      },
    },
  ],
};
