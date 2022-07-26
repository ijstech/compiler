let samples: { [fileName: string]: string } = {}
samples['package.json'] = `{
    "name": "demo1",
    "main": "src/index.tsx"
}`
samples['src/index.tsx'] = `//index.tsx
import {Module, Button} from '@ijstech/components';
import {hello} from './lib/hello';

export default class Test extends Module{
  private btnHello: Button;
  handleButtonClick(){
    this.btnHello.caption = hello();
  }
  render(){
    return <i-panel>
      <i-button id="btnHello" caption="hello" onClick={this.handleButtonClick}></i-button>
    </i-panel>
  }
}`
samples['src/lib/hello.ts'] = `//hello.ts
export function hello(){
  return 'hello world!';
}`
export default samples
