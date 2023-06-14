import {AppServer} from '@ijstech/node';
import Path from 'path';

let app = new AppServer({
    schedule: {
        domains: {
            'localhost': [{
                packagePath: Path.resolve(__dirname, '..')
            }]
        }
    }
});
app.start();
