// eslint-disable-next-line no-undef
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/repositories",
        "<rootDir>/.github",
        "<rootDir>/dist"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/src/repositories",
        "<rootDir>/tests",
        "<rootDir>/.github",
    ],
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
};
