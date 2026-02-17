const { spawn } = require("child_process");
const c = spawn("notion-mcp-server", [], {
  stdio: ["pipe", "pipe", "inherit"]
});
let b = "";
process.stdin.on("data", d => {
  b += d;
  const l = b.split("\n");
  b = l.pop();
  l.forEach(x => {
    if (x.trim()) {
      try {
        const m = JSON.parse(x);
        if (m.method === "tools/call" && m.params && m.params.arguments) {
          delete m.params.arguments["Notion-Version"];
        }
        c.stdin.write(JSON.stringify(m) + "\n");
      } catch (e) {
        c.stdin.write(x + "\n");
      }
    }
  });
});
c.stdout.on("data", d => process.stdout.write(d));
c.on("close", x => process.exit(x));
process.stdin.on("end", () => c.stdin.end());
