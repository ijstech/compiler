type encodeType = "utf-8" | "base64";
/**
 100644 - file (blob)
 100755 - executable (blob)
 040000 - subdirectory (tree)
 160000 - submodule (commit)
 120000 - a blob that specifies the path of a symlink.
 */
type treeMode = "100644" | "100755" | "040000" | "160000" | "120000";
type treeType = "blob" | "tree" | "commit";

export interface IGitTree {
	path: string;
	mode: treeMode;
	type: treeType;
	sha: string | null;
}

export interface IFile {
	path: string;
	content: string;
}

export class GitHubAPI {
	private owner: string;
	private repo: string;
	private _headers: any;

	constructor(owner: string, repo: string, authToken: string) {
		this.owner = owner;
		this.repo = repo;
		this._headers = {
			"Accept": `application/vnd.github+json`,
			'Authorization': `token ${authToken}`
		};
	}

	async getFileTree(commitSHA: string, recursive: boolean = false): Promise<any> {
		let queryString = recursive ? "?recursive=1" : "";
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${commitSHA}${queryString}`, {
				method: 'GET',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async getFile(path: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
				method: 'GET',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				if (res.content && res.encoding === 'base64') {
					res.content = this.decodeBase64(res.content);
				}
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async createFile(path: string, content: string, message: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
				body: JSON.stringify({
					content,
					message
				}),
				headers: this._headers,
				method: 'PUT'
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async updateFile(path: string, commitSHA: string, content: string, message: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
				body: JSON.stringify({
					content,
					message,
					sha: commitSHA
				}),
				method: 'PUT',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async deleteFile(path: string, commitSHA: string, message: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
				body: JSON.stringify({
					message,
					sha: commitSHA
				}),
				method: 'DELETE',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	private async createBlob(content: string, encoding: encodeType = "utf-8"): Promise<any> {
		if (encoding === 'base64') {
			content = this.encodeBase64(content);
		}
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/blobs`, {
				body: JSON.stringify({
					content,
					encoding
				}),
				method: 'POST',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	private async createTree(tree: IGitTree[], baseTreeSHA?: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const data = baseTreeSHA ? { base_tree: baseTreeSHA, tree } : { tree };
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees`, {
				body: JSON.stringify(data),
				method: 'POST',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	private async createCommit(message: string, treeSHA: string, parents?: string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/commits`, {
				body: JSON.stringify({
					message,
					tree: treeSHA,
					parents: parents
				}),
				method: 'POST',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	private async getReference(branch: string): Promise<any> {
		const ref = `heads/${branch}`;
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/ref/${ref}`, {
				method: 'GET',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	private async updateReference(branch: string, refSHA: string): Promise<any> {
		const ref = `heads/${branch}`;
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/refs/${ref}`, {
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({
					sha: refSHA
				})
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async getCommitList(branch?: string, size: number = 1): Promise<any> {
		let queryString = branch ? `&sha=${branch}` : "";
		if (size > 30) size = 30;
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/commits?per_page=${size}${queryString}`, {
				method: 'GET',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async handleCommit(
		branch: string,
		commitSHA: string,
		modifiedFiles: IFile[],
		deletedFilePaths: string[],
		commitMsg: string
	): Promise<any> {
		try {
			const repoTree = await this.getFileTree(commitSHA, true);
			const handledFilePaths: string[] = deletedFilePaths || [];
			const treeList: IGitTree[] = [];
	
			for (const file of modifiedFiles) {
				// Create a blob
				const blob = await this.createBlob(file.content, "base64");
				treeList.push({
					path: file.path,
					mode: "100644",
					type: "blob",
					sha: blob.sha
				});
				handledFilePaths.push(file.path);
			}
	
			for (const tree of repoTree.tree) {
				if (
					handledFilePaths.includes(tree.path) || 
					tree.type != 'blob'
				) continue;
				treeList.push(tree);
			}
			
			// Create tree
			const tree = await this.createTree(treeList);
			
			// Get ref
			const ref = await this.getReference(branch);
	
			// Create a Commit
			const parentSHA = ref.object.sha;
			const commit = await this.createCommit(commitMsg, tree.sha, [parentSHA]);
			
			// Update Reference
			const newRef = await this.updateReference(branch, commit.sha);
		} catch (err) {
			console.error(err);
		}
	}

	private async createUserRepository(repoName: string, isPrivate: boolean = false, description?: string, homepage?: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/user/repos`, {
				body: JSON.stringify({
					name: repoName,
					description: description || "",
					homepage: homepage || "",
					private: isPrivate,
					auto_init: true
				}),
				method: 'POST',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	private async createOrgsRepository(org: string, repoName: string, isPrivate: boolean = false, description?: string, homepage?: string): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/orgs/${org}/repos`, {
				body: JSON.stringify({
					name: repoName,
					description: description || "",
					homepage: homepage || "",
					private: isPrivate,
					auto_init: true
				}),
				method: 'POST',
				headers: this._headers
			}).then(res => res.json()).then(res => {
				resolve(res);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	async createRepository(repoName: string, isPrivate: boolean = false, org?: string, description?: string, homepage?: string): Promise<any> {
		if (!org)
			return this.createUserRepository(repoName, isPrivate, description, homepage);
		else
			return this.createOrgsRepository(org, repoName, isPrivate,description, homepage);
	}

	encodeBase64(data: string) {
		return btoa(data);
	}

	decodeBase64(data: string) {
		return atob(data);
	}
}