export {test} from './test';
import {application, Module, Styles} from '@ijstech/components';
import module1 from '@scom/dapp-sample/module1';
import mainTheme from './index.css';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

export default class MainLauncher extends Module{
    init(){
        super.init();
        console.dir(module1)
    }
    render(): void {
        return <i-panel>
            <i-button caption="Button 1"></i-button>
        </i-panel>
    }   
}