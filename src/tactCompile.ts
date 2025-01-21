import * as Types from './types';
import {
  build as buildTact,
  VirtualFileSystem
} from './lib/tact-compiler';

class OverwritableVirtualFileSystem implements VirtualFileSystem {
  root: string;
  overwrites: Map<string, Buffer> = new Map(); // It will be used to store build output files
  files: Map<string, Buffer> = new Map(); // Simulate a file system

  constructor(root: string = '/') {
    this.root = this.normalizePath(root);
  }

  private normalizePath(path: string): string {
    return path.replace(/\\/g, '/').replace(/\/+$/, '');
  }

  private resolvePath(...pathSegments: string[]): string {
    const pathParts = this.root.split('/');
    for (const pathSegment of pathSegments) {
      const normalizedSegment = this.normalizePath(pathSegment);
      const parts = normalizedSegment.split('/');
      for (const part of parts) {
        if (part === '..') {
          if (pathParts.length > 0) {
            pathParts.pop();
          }
        } else if (part !== '.' && part !== '') {
          pathParts.push(part);
        }
      }
    }
    return pathParts.join('/');
  }

  resolve(...path: string[]): string {
    return this.resolvePath(...path);
  }

  readFile(path: string): Buffer {
    const resolvedPath = this.resolvePath(path);
    return this.overwrites.get(resolvedPath) ?? this.files.get(resolvedPath) ?? Buffer.from('');
  }

  writeFile(path: string, content: string): void {
    const resolvedPath = this.resolvePath(path);
    const bufferContent =
      typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;
    this.overwrites.set(resolvedPath, bufferContent);
  }

  writeContractFile(path: string, content: string | Buffer): void {
    const resolvedPath = this.resolvePath(path);
    const bufferContent =
      typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;
    this.files.set(resolvedPath, bufferContent);
  }

  exists(path: string): boolean {
    const resolvedPath = this.resolvePath(path);
    return this.files.has(resolvedPath) || this.overwrites.has(resolvedPath);;
  }
}

async function compileTactContract(storage: Types.IStorage, config: any) {
  try {
    const { projects } = config;
    const projectConfig = projects[0];
    const filesToProcess = [projectConfig.path];

    const fs = new OverwritableVirtualFileSystem(`/`);

    while (filesToProcess.length !== 0) {
      const fileToProcess = filesToProcess.pop();
      const fileContent = await storage.readFile(fileToProcess!);
      if (fileContent) {
        fs.writeContractFile(fileToProcess!, fileContent as string);
      }
    }

    // let ctx = new CompilerContext();
    // const stdlib = createVirtualFileSystem('@stdlib', stdLibFiles);
    // const entryFile = projectConfig.path;
    // if (projectConfig?.options?.external) {
    //   ctx = featureEnable(ctx, 'external');
    // }
    // ctx = precompile(ctx, fs, stdlib, entryFile);

    const response = await buildTact({
      config: projectConfig,
      project: fs,
      stdlib: '@stdlib',
      // logger: new TactLogger(LogLevel.DEBUG),
    });

    if (!response.ok) {
      throw new Error('Error while building');
    }

    // fs.overwrites.forEach((value, key) => {
    //   const filePath = key.startsWith('/') ? key.slice(1) : key;
    //   let fileContent = value.toString();

    //   if (key.includes('.boc')) {
    //     fileContent = Buffer.from(value).toString('base64');
    //   }

    //   storage.writeFile(filePath, fileContent);
    // });

    return fs.overwrites;
  } catch (error) {
    console.error('Compilation failed:', error);
  }
}

export {
  compileTactContract
};