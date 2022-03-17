import {} from "node-2fa";

import ListService from "./ListService";
import QrScanner from 'qr-scanner';
import RouterService from "./RouterService";
import TYPES from "../../types";
import VideoService from "./VideoService";
import { autorun } from 'mobx';
import { inject } from "react-declarative";

const BLOB_INTERVAL = 1_000;

export class CapturerService {

    videoService = inject<VideoService>(TYPES.videoService);
    routerService = inject<RouterService>(TYPES.routerService);

    urlState = '';
    secret: string | null = '';
    issuer: string | null = '';
    interval: NodeJS.Timeout | null = null;
    
    constructor() {
        autorun(() => {
            const state = this.videoService.state;
            const pathname = this.routerService.location?.pathname;
            if (state === 'resolved' && pathname === '/scanner') {
                this.interval = setInterval(() => this.processBlob(), BLOB_INTERVAL);
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
            console.log(frame)
            
            const canvas = document.createElement("canvas");
            canvas.width = 500;
            canvas.height = 500;
            const ctx = canvas.getContext("2d");
            
            if (ctx) {
                ctx.drawImage(frame, 0, 0, 500, 500);
                canvas.toBlob(async (blob) => {
                  // Blob передается на сканирование Qr кода
                  frame.close();
                }, 'image/jpeg');
            }
            
            QrScanner.scanImage(frame)
            .then(result => this.urlState = result)
            .catch(error => console.log(error || 'No QR code found.'));
            if(this.urlState !== null && this.urlState !== '') {
                const url = new URL(this.urlState) 
                this.secret = url.searchParams.get("secret")
                this.issuer = url.searchParams.get("issuer")
            }            
            console.log(this.secret)
            console.log(this.issuer)
        }
                
    };
    
};

export default CapturerService;
   