import "./config";

import AlertService from './services/base/AlertService';
import PermissionService from './services/base/PermissionService';
import RouterService from './services/base/RouterService';
import ScannerPageService from './services/view/ScannerPageService';
import TYPES from './types';
import VideoService from "./services/base/VideoService";
import { inject } from 'react-declarative';

export const ioc = {
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    scannerPageService: inject<ScannerPageService>(TYPES.scannerPageService),
    permissionService: inject<PermissionService>(TYPES.permissionService),
    videoService: inject<VideoService>(TYPES.videoService),
};

(window as any).ioc = ioc;

export default ioc;
