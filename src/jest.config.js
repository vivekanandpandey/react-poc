module.exports = {
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coverageReporters": ["html", "text", "lcov"],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    },
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/reportWebVitals.ts", // Exclude reportWebVitals.ts
      "!**/node_modules/**" // Exclude node_modules
    ],
}
