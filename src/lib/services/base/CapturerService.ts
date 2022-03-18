import {} from "node-2fa";

import ListService from "./ListService";
import QrScanner from 'qr-scanner';
import RouterService from "./RouterService";
import TYPES from "../../types";
import VideoService from "./VideoService";
import { autorun } from 'mobx';
import { inject } from "react-declarative";

const BLOB_INTERVAL = 3_000;

export class CapturerService {

    videoService = inject<VideoService>(TYPES.videoService);
    routerService = inject<RouterService>(TYPES.routerService);
    listService = inject<ListService>(TYPES.listService);

    interval: NodeJS.Timeout | null = null;
    
    constructor() {
        autorun(() => {
            const state = this.videoService.state;
            const pathname = this.routerService.location?.pathname;
            if (state === 'resolved' && pathname === '/scanner') {
                const handler = async () => {
                    await this.processBlob()
                    this.interval = setTimeout(handler, BLOB_INTERVAL);
                };
                handler();
            }
        }); 
        autorun(() => {
            const state = this.videoService.state;
            const pathname = this.routerService.location?.pathname;
            if (state !== 'resolved' || pathname !== '/scanner') {
                this.interval && clearInterval(this.interval);
            }
        }); 
    };

    processBlob = async () => {
        console.log('кадр')
        const { mediaStream } = this.videoService;
        
        if(mediaStream) {
            const track = mediaStream.getVideoTracks()[0];
            const capturer = new ImageCapture(track);
            const frame: ImageBitmap = await capturer.grabFrame();
            
            console.log('capturer ')
            console.log(frame);
            
            try { 
                const result = await QrScanner.scanImage(frame);
                const url = new URL(result) 
                const secret = url.searchParams.get("secret")!;
                const issuer = url.searchParams.get("issuer")!;
                this.interval && clearTimeout(this.interval);
                this.listService.addAuthItem(secret, issuer);
            } catch {
                console.log('no image found')
            }        
            
        }
                
    };
    
};

export default CapturerService;
   