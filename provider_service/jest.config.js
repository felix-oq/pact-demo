module.exports = {
    preset: "ts-jest",
    roots: [
        "<rootDir>/test"
    ],
    testMatch: [
        "**/*.@(spec|test).ts"
    ],
    testTimeout: 30000
}