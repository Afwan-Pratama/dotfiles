import AstalIO from "gi://AstalIO?version=0.1";
import GLib from "gi://GLib";
import { exit, programPath } from "system";

async function execAsync(cmd) {
  return new Promise((resolve, reject) => {
    AstalIO.Process.exec_asyncv(cmd, (_, res) => {
      try {
        resolve(AstalIO.Process.exec_asyncv_finish(res));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const currentDir = GLib.path_get_dirname(programPath);

const entry = `${currentDir}/app.ts`;
const outfile = `${GLib.get_user_runtime_dir()}/epikshell.js`;

//bundle js
try {
  //GLib.setenv("NODE_ENV", "production", true);
  //await execAsync([
  //  "bun",
  //  "build",
  //  entry,
  //  "--outfile",
  //  outfile,
  //  "--external",
  //  "gi://*",
  //  "--external",
  //  "system",
  //  "--define",
  //  `SRC=${currentDir}`,
  //  "--target",
  //  "bun",
  //]);

  await execAsync([
    "esbuild",
    "--bundle",
    entry,
    `--outfile=${outfile}`,
    "--sourcemap=inline",
    "--format=esm",
    "--external:gi://*",
    "--external:system",
    "--platform=node",
    "--loader:.js=ts",
    `--define:SRC="${currentDir}"`,
  ]);
} catch (error) {
  console.error(error);
  exit(0);
}

await import(`file://${outfile}`).catch(console.error);
