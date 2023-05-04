import {Button, Module, Panel} from '@ijstech/components';
import { hello } from './hello';

class DemoForm extends Module{
    button1: Button;
    panel1: Panel;
    hello(){
        hello();
    };
    render(){
        return <i-panel>
            <i-button 
                caption="Hello" 
                onClick={this.hello} 
                top={10}
            ></i-button>
        </i-panel>
    };
    render1(){
        return 
        <i-panel>
            <i-button 
                caption="Hello" 
                onClick={this.hello} 
                top={10}
            ></i-button>
        </i-panel>
    };
    render2(){
        return (
        <i-panel>
            <i-button 
                caption="Hello" 
                onClick={this.hello} 
                top={10}
            ></i-button>
        </i-panel>)
    };
};