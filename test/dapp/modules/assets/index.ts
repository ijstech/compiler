import {application} from '@ijstech/components';
const moduleDir = application.currentModuleDir;

function fullPath(path: string): string{
    return `${moduleDir}/${path}`
};
export default {
    img: {
        network: {
            bsc: `${moduleDir}/img/network/bsc.svg`,
            eth: `${moduleDir}/img/network/eth.svg`,
        }
    },
    fullPath
};