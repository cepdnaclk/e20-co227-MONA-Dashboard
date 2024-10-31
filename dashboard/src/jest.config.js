module.exports = {
  extensionsToTreatAsEsm: [".ts", ".tsx"], // if you're using TypeScript
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    axios: "<rootDir>/node_modules/axios/dist/axios.js",
  },
};
