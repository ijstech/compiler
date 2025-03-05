import * as Types from './types';
import {
  build,
  VirtualFileSystem,
  Config,
  Project
} from '@ijstech/tact';

class OverwritableVirtualFileSystem implements VirtualFileSystem {
  root: string;
  overwrites: Map<string, Buffer|null> = new Map();
  files: Map<string, Buffer|null> = new Map();

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

  cleanup() {
    for (let [key, value] of this.overwrites) {
      this.overwrites.delete(key);
    }
    this.overwrites = new Map();
    for (let [key, value] of this.files) {
      this.files.delete(key);
    }
    this.files = new Map();
  }
}

let fs: OverwritableVirtualFileSystem|undefined;

function getFs() {
  if (!fs) {
    fs = new OverwritableVirtualFileSystem(`/`);
  }
  return fs;
}

async function buildTact(storage: Types.IStorage, projectConfig: Project) {
  if (!projectConfig) throw new Error('Error while building');

  const filesToProcess = [projectConfig.path];
  const fs = getFs();

  while (filesToProcess.length !== 0) {
    const fileToProcess = filesToProcess.pop();
    const fileContent = await storage.readFile(fileToProcess!);
    if (fileContent) {
      fs.writeContractFile(fileToProcess!, fileContent as string);
    }
  }

  try {
    const response = await build({
      config: projectConfig,
      project: fs,
      stdlib: '@stdlib'
    });

    if (!response.ok) {
      throw new Error('Error while building');
    }

    let output: Record<string, string> = {};

    for (let [key, value] of fs.overwrites) {
      if (key.startsWith('/')) key = key.substring(1);
      output[key] = value ? value.toString() : '';
    }

    return output;
  } catch (error) {
    return null;
  } finally {
    fs.cleanup();
  }
}

async function compileTactContract(storage: Types.IStorage, config: Config) {
  try {
    let result: Record<string, string> = {};
    const { projects } = config;
    for (const project of projects) {
      const built = await buildTact(storage, project);
      if (built) result = { ...result, ...built };
    }
    return result;
  } catch (error) {
    console.error('Compilation failed:', error);
    return {};
  } finally {
    fs?.cleanup();
    fs = undefined;
  }
}

export {
  compileTactContract
};