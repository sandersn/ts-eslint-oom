import { readdirSync } from 'fs';
import { join } from 'path';
import { ESLint } from "eslint";
import { clearProgramCache } from "@typescript-eslint/typescript-estree";
const cwd = process.cwd();
for (const dirPath of readdirSync('../../DefinitelyTyped/types')) {
    const dir = join('../../DefinitelyTyped/types', dirPath);
    process.chdir(dir);
    const eslint = new ESLint({
        rulePaths: ["../../node_modules/@definitelytyped/dtslint/dist/rules/"],
    });
    const esfiles = ["index.d.ts"];
    const formatter = await eslint.loadFormatter("stylish");
    const eresults = await eslint.lintFiles(esfiles);
    console.log(formatter.format(eresults), process.memoryUsage().heapUsed)
    clearProgramCache();
    process.chdir(cwd);
}
