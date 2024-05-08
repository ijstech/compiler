import {Module, Panel} from '@ijstech/components';
import ScomTable from '@scom/scom-table';

class DemoForm extends Module{
    table1: ScomTable;
    render(){
        return <i-panel>
            <i-button 
                caption="Hello"
                top={10}
            ></i-button>
        </i-panel>
    }
};