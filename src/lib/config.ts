import { provide } from 'react-declarative';

import AlertService from './services/base/AlertService';
import RouterService from './services/base/RouterService';
import ScannerPageService from './services/view/ScannerPageService';

import TYPES from './types';

provide(TYPES.alertService, () => new AlertService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.scannerPageService, () => new ScannerPageService());
