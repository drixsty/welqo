module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type must be one of these
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only
        "style", // Formatting, missing semi colons, etc
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvement
        "test", // Adding missing tests
        "chore", // Changes to build process or auxiliary tools
        "ci", // CI/CD changes
        "revert", // Revert to a commit
        "wip", // Work in progress (never on main)
      ],
    ],
    // Scope must reference an app or package
    "scope-enum": [
      2,
      "always",
      [
        "api",
        "web-storefront",
        "web-dashboard",
        "mobile-dashboard",
        "mobile-tenant",
        "types",
        "ui",
        "ui-native",
        "beds24-client",
        "stripe-client",
        "config",
        "infra",
        "ci",
        "docs",
        "deps",
        "release",
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 200],
  },
};
