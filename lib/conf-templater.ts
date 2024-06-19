import {generateMissingFolder, getFilesRecursively, getOutURI, writeModifiedToOut} from "./file";
import {checkMinArgs, getArg} from "./args";
import {readFileSync} from "fs";

checkMinArgs()


const src = getArg(["-s", "--src"]);
const out = getArg(["-o", "--out"]);
const env = getArg(["-e", "--env"]);

const srcFiles = getFilesRecursively(src);
const outFiles = getOutURI(srcFiles, src, out);
const envVar = JSON.parse(readFileSync(env, 'utf8'));

outFiles.forEach(x => generateMissingFolder(x));

for (let i = 0; i < srcFiles.length; i++) {
    writeModifiedToOut(srcFiles[i], outFiles[i], envVar);
}
