import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const version = String(pkg.version ?? "").trim();
const pattern = /^\d{4}\.\d{1,2}\.\d+(?:-beta\.\d+)?$/;

if (!pattern.test(version)) {
  console.error(`Invalid package version: ${version}`);
  console.error("Expected YYYY.M.K or YYYY.M.K-beta.N");
  process.exit(1);
}

const ref = process.env.GITHUB_REF?.trim();
if (ref && ref.startsWith("refs/tags/")) {
  const tag = ref.slice("refs/tags/".length);
  const tagPattern = /^v\d{4}\.\d{1,2}\.\d+(?:-beta\.\d+)?$/;
  if (!tagPattern.test(tag)) {
    console.error(`Invalid release tag: ${tag}`);
    console.error("Expected vYYYY.M.K or vYYYY.M.K-beta.N");
    process.exit(1);
  }
  const expectedTag = `v${version}`;
  if (tag !== expectedTag) {
    console.error(`Tag/version mismatch: package.json=${version} tag=${tag}`);
    console.error(`Expected tag ${expectedTag}`);
    process.exit(1);
  }
}

console.log(`Version schema OK: ${version}`);
