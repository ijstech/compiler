import {Module} from '@ijstech/components';
import {hello} from './hello';
export default class Hello extends Module{
    buttonClick(){
        alert(hello());
    };
    render(){
        return <i-panel>
            <i-button onClick={this.buttonClick}></i-button>
        </i-panel>
    }
}