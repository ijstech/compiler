import {Module} from '@ijstech/components';
import { hello } from './hello';

class DemoForm extends Module{
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
    renderDesktop(){
        return <i-panel>
            <i-button
                id="button1"
                caption="Hello"
                onClick={this.hello}
                top={10}
            >
            </i-button>
        </i-panel>
    };
};