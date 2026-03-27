import fs from "node:fs";

const file = process.argv[2];

if (!file) {
  console.error("Usage: node scripts/validate-commit-msg.mjs <commit-msg-file>");
  process.exit(2);
}

const message = fs.readFileSync(file, "utf8").trim();
const firstLine = message.split("\n")[0]?.trim() ?? "";

const allowedTypes = ["feat", "fix", "docs", "test", "refactor", "chore"];
const pattern = new RegExp(
  `^(?:${allowedTypes.join("|")})(\\([a-z0-9._-]+\\))?: [a-z0-9].*[^.]$`,
);

if (!firstLine) {
  console.error("Commit message is empty.");
  process.exit(1);
}

if (!pattern.test(firstLine)) {
  console.error("Invalid commit message.");
  console.error('Expected: "type(scope): summary"');
  console.error(`Allowed types: ${allowedTypes.join(", ")}`);
  console.error('Example: "feat(vk): add long poll reconnect guard"');
  process.exit(1);
}
