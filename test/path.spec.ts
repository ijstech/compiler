import 'mocha'
import * as assert from 'assert'
import {Path} from '../src';

describe('Path', async function () {
    it('resolve', async()=>{
        let result = Path.resolve('a', 'b', 'c');
        assert.strictEqual(result, 'a/b/c');
        result = Path.resolve('a', 'b', '../c');
        assert.strictEqual(result, 'a/c');
        result = Path.resolve('a', 'b', '/c');
        assert.strictEqual(result, '/c');
        result = Path.resolve('a', 'b', 'c', '..');
        assert.strictEqual(result, 'a/b');
        result = Path.resolve('a', 'b', 'c', '../..');
        assert.strictEqual(result, 'a');
        result = Path.resolve('a', 'b', 'c', '../../..');
        assert.strictEqual(result, '');
        result = Path.resolve('a', 'b', 'c', '../../../..');
        assert.strictEqual(result, '');
        result = Path.resolve('a/b/c', 'd');
        assert.strictEqual(result, 'a/b/c/d');
        result = Path.resolve('a/b/c', '../d');
        assert.strictEqual(result, 'a/b/d');
        result = Path.resolve('a/../b/c', 'd');
        assert.strictEqual(result, 'b/c/d');
    });
    it('dirname', async()=>{
        let result = Path.dirname('a/b/c');
        assert.strictEqual(result, 'a/b');
        result = Path.dirname('a/b/c/');
        assert.strictEqual(result, 'a/b');
        result = Path.dirname('/a/b/c');
        assert.strictEqual(result, '/a/b');
    });
})