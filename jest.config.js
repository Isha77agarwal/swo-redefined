// eslint-disable-next-line no-undef
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/repositories",
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/repositories",
    ],
    coverageThreshold: {
        global: {
            lines: 80,
        }
    }
};
