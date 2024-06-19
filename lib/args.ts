import {help} from "./help";

export function checkMinArgs() {
    if (process.argv.indexOf("-h") > -1) {
        help(0);
    }

    if (process.argv.length < 4) {
        help();
    }
}

export function getArg(name: string[]): string {
    const index = name
    .map((x) => process.argv.indexOf(x))
    .filter((x) => x > -1)?.[0];

    if (!index) {
        help();
    }

    return process.argv[index + 1];
}
