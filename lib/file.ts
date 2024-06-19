import {exists, existsSync, readdirSync, readFile, statSync, writeFile} from "node:fs";
import {mkdirSync} from "fs";
import {stripVTControlCharacters} from "node:util";

const join = (path: string, name: string) => path + "/" + name;

const isDirectory = (path: string) => statSync(path).isDirectory();
const getDirectories = (path: string) =>
  readdirSync(path)
  .map((name) => join(path, name))
  .filter(isDirectory);

const isFile = (path: string) => statSync(path).isFile();
const getFiles = (path: string) =>
  readdirSync(path)
  .map((name) => join(path, name))
  .filter(isFile);

const getFilesRecursively = (path: string) : string[] => {
    let dirs = getDirectories(path);
    let files : string[] = dirs
    .map((dir) => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
    return files.concat(getFiles(path));
};
function getOutURI(uri: string[], src: string, out: string) : string[] {
    return uri.map(x => x.replace(src, out));
}

function generateMissingFolder(path: string) {
    const splittedPath = path.split('/');
    let constructionPath = "";

    let i = 0;
    if(splittedPath[0] == '') {
        i = 1;
        constructionPath += "/";
    }
    for (; i < splittedPath.length - 1; i++) {
        constructionPath += (splittedPath[i] + '/');
        if(!existsSync(constructionPath)) {
            mkdirSync(constructionPath);
        }
    }
}

function writeModifiedToOut(srcFile: string, outFile: string, envVar: Record<string, string>) {
    readFile(srcFile, 'utf8', (err, data) => {
        let content = data;
        Object.entries(envVar).forEach(x => {
            content = content.replace(new RegExp(String.raw`\$\{${x[0]}\}`, "g"), x[1]);
        });
        writeFile(outFile, content, () => console.log('Successfully written to ' + outFile));
    });
}

export {join, isDirectory, getDirectories, isFile, getFiles, getFilesRecursively, getOutURI, generateMissingFolder, writeModifiedToOut};
