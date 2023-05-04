import {Module, Panel} from '@ijstech/components';
import { hello } from './hello';

class DemoForm extends Module{
    panel1: Panel;
    hello(){
        hello();
    };
    renameMethod(){
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