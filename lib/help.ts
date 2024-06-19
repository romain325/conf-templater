export function help(out: number = 1) {
    console.log("Conf templater v1");
    console.log("Usage:");
    console.log(
      "conf-templater --src(-s) conf/ --env(-e) var.json --out(-o) /tmp/conf",
    );
    process.exit(out);
}
