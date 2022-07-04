import {Module} from '@ijstech/components';
export default class Hello extends Module{
    buttonClick(){
        //button click event handler
    };
    render(){
        return <i-panel>
            <i-button onClick={this.buttonClick}></i-button>
        </i-panel>
    }
}