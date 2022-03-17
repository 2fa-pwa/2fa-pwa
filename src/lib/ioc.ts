import "./config";

import AlertService from './services/base/AlertService';
import CapturerService from "./services/base/CapturerService";
import ListService from "./services/base/ListService";
import RouterService from './services/base/RouterService';
import ScannerPageService from './services/view/ScannerPageService';
import TYPES from './types';
import VideoService from "./services/base/VideoService";
import { inject } from 'react-declarative';

export const ioc = {
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    scannerPageService: inject<ScannerPageService>(TYPES.scannerPageService),
    videoService: inject<VideoService>(TYPES.videoService),
    capturerService: inject<CapturerService>(TYPES.capturerService),
    listService: inject<ListService>(TYPES.listService),
};

(window as any).ioc = ioc;

export default ioc;
