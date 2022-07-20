import {Module} from '@ijstech/components';
import { hello } from './hello';

class DemoForm extends Module{
    hello(){
        hello();
    }
    render(){
        return <i-panel>
            <i-button caption="Hello"></i-button>
        </i-panel>
    }
}