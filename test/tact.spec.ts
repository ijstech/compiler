import 'mocha'
import * as Tact from '../src/tactCompile';
import * as Types from '../src/types';
import { Storage } from '../cli/src/storage';
import * as assert from 'assert'

const RootPath = process.cwd();

describe('Tact', async function () {
  this.timeout(600000);
  let storage: Types.IStorage;

  before(() => {
    storage = new Storage(RootPath);
  });

  it('examples', async () => {
    const result = await Tact.compileTactContract(storage, {
      "projects": [
        {
          "name": "echo",
          "path": "test/tact-test/contracts/echo.tact",
          "output": "test/tact-test/src"
        },
        {
          "name": "payouts",
          "path": "test/tact-test/contracts/payouts.tact",
          "output": "test/tact-test/src"
        },
      ]
    });

    if (result) {
      for (const key in result) {
        await storage.writeFile(key, result[key]);
      }
    }

    const echoPkg = await storage.readFile('test/tact-test/src/echo_Echo.pkg');
    const payoutsPkg = await storage.readFile('test/tact-test/src/payouts_Payouts.pkg');

    assert.strictEqual(!!(await storage.readFile('test/tact-test/src/echo_Echo.abi')), true);
    assert.strictEqual(!!(await storage.readFile('test/tact-test/src/echo_Echo.code.boc')), true);
    assert.strictEqual(!!(await storage.readFile('test/tact-test/src/echo_Echo.fc')), true);
    assert.strictEqual(!!(await storage.readFile('test/tact-test/src/echo_Echo.fif')), true);
    assert.strictEqual(!!(await storage.readFile('test/tact-test/src/echo_Echo.md')), true);
    assert.strictEqual(!!(echoPkg), true);
    assert.strictEqual(!!(await storage.readFile('test/tact-test/src/echo_Echo.ts')), true);

    const expectedEchoPkg = await storage.readFile('test/tact-test/expected/echo_Echo.pkg');
    assert.deepStrictEqual(echoPkg, expectedEchoPkg);
    const expectedPayoutsPkg = await storage.readFile('test/tact-test/expected/payouts_Payouts.pkg');
    assert.deepStrictEqual(payoutsPkg, expectedPayoutsPkg);
  });
});