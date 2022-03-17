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
            const twofactor = import("node-2fa");
            // const newSecret = twofactor.generateSecret({ name: "My Awesome App", account: "johndoe" });
            // const newToken = twofactor.generateToken("XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W");
            // twofactor.verifyToken("XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W", "630618");
        }
    };
    
};

export default CapturerService;
   