/** Filter historical Codex recovery trees out of Prettier so they commit as-is. */
module.exports = {
  "*.{js,jsx,ts,tsx,json,css,md}": (filenames) => {
    const kept = filenames.filter(
      (f) => !f.replace(/\\/g, "/").includes(".codex-internal/"),
    );
    if (kept.length === 0) {
      return [];
    }
    const quoted = kept.map((f) => `"${f}"`).join(" ");
    return [`prettier --write --ignore-path .prettierignore ${quoted}`];
  },
};
