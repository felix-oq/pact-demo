module.exports = {
    preset: "ts-jest",
    roots: [
        "<rootDir>/test"
    ],
    testMatch: [
        "**/*.@(spec|test).ts"
    ],
    testTimeout: 30000,
    
    // tries to publish the contracts to the pact broker
    globalTeardown: "./test/pact/publish.pact.ts"
}