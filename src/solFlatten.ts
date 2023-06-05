import Path from './path';
import * as Types from './types';

export async function flatten(sources: Types.ISource, file: string): Promise<string>{
    let license = '';
    let result = '';
    let processedFiles: string[] = [];
    async function flattenDependencies(sources: Types.ISource, file: string): Promise<string>{
        let source = sources[file];
        let result = '';
        if (source){
            let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
            let licenseRegex = /\/\/\s+SPDX-License-Identifier:.*/gm;
            let importMatch;
            processedFiles.push(file); 
            while ((importMatch = importRegex.exec(source.content))) {
                const importPath = importMatch[1] || importMatch[2];
                let importFilePath;
                if (importPath.startsWith('.')) {
                    importFilePath = Path.resolve(Path.dirname(file), importPath);
                }
                else {
                    importFilePath = importPath;
                };
                if (!processedFiles.includes(importFilePath)) {                  
                    processedFiles.push(importFilePath);  
                    result += await flattenDependencies(sources, importFilePath);
                };
            };
            result += source.content.replace(licenseRegex, '');;
        };
        return result;
    };
    let source = sources[file];
    if (source){
        let licenseRegex = /\/\/\s+SPDX-License-Identifier:.*/gm;
        let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
        const licenseMatch = licenseRegex.exec(source.content);
        if (licenseMatch)
            license = licenseMatch[0];
        result = license + '\n' + await flattenDependencies(sources, file);
        result = result.replace(importRegex, '');
    };
    return result;
};