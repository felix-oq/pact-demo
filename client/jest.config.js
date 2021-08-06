module.exports = {
    "preset": "ts-jest",
    roots: [
        "<rootDir>/test"
    ],
    testMatch: [
        "**/*.@(spec|test).ts"
    ],
    setupFilesAfterEnv: [
        // tries to publish the contracts to the pact broker
        "./test/pact/publish.pact.ts"
    ]
}