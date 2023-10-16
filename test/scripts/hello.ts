import {test1} from "./test1";
import {test2} from './lib/test2';

export function hello(): string{
    let bitInt = BigInt(1);
    return "Hello World " + BigInt.toString();
}