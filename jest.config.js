module.exports = {
    collectCoverageFrom: ["/../**/*.{js,jsx,mjs}"],
    testMatch: ["<rootDir>/../**/__tests__/**/*.{js,jsx,mjs}", "<rootDir>/../**/?(*.)(spec|test).{js,jsx,mjs}"],
    transform: {
      "^.+\\.(js|jsx|mjs)$": "<rootDir>/jest-transform.js"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
  };
  