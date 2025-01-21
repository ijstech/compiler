module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/pluginTypes",
    "/src"
  ],
  maxWorkers: "50%",
  snapshotSerializers: ["@tact-lang/ton-jest/serializers"],
};
