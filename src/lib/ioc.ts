import { inject } from 'react-declarative';

import TYPES from './types';

import "./config";

import AlertService from './services/base/AlertService';
import RouterService from './services/base/RouterService';
import ScannerPageService from './services/view/ScannerPageService';

export const ioc = {
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    scannerPageService: inject<ScannerPageService>(TYPES.scannerPageService),
};

(window as any).ioc = ioc;

export default ioc;
