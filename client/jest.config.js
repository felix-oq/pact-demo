module.exports = {
    "roots": [
        "<rootDir>/test"
    ],
    "testMatch": [
        "**/*.@(spec|test).ts"
    ],
    "transform": {
        "(spec|test).ts$": "ts-jest"
    },
}