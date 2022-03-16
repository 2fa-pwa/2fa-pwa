import RouterService from "./RouterService";
import TYPES from "../../types";
import VideoService from "./VideoService";
import { autorun } from 'mobx';
import { inject } from "react-declarative";

const BLOB_INTERVAL = 1_000;

export class CapturerService {

    videoService = inject<VideoService>(TYPES.videoService);
    routerService = inject<RouterService>(TYPES.routerService);

    constructor() {
        let interval: NodeJS.Timeout;
        autorun(() => {
            const state = this.videoService.state;
            const pathname = this.routerService.location?.pathname;
            if (state === 'resolved' && pathname === '/scanner') {
                interval = setInterval(() => this.processBlob(), BLOB_INTERVAL);
            }
        }); 
        autorun(() => {
            const state = this.videoService.state;
            const pathname = this.routerService.location?.pathname;
            if (state !== 'resolved' || pathname !== '/scanner') {
                clearInterval(interval);
            }
        }); 
    };

    processBlob = () => {
        console.log('кадр')
    };
    
};

export default CapturerService;
