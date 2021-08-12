module.exports = {
    "preset": "ts-jest",
    roots: [
        "<rootDir>/test"
    ],
    testMatch: [
        "**/*.@(spec|test).ts"
    ],
    
    // tries to publish the contracts to the pact broker
    globalTeardown: "./test/pact/publish.pact.ts"
}