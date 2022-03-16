import AlertService from '../base/AlertService';
import PermissionService from '../base/PermissionService';
import RouterService from '../base/RouterService';
import TYPES from '../../types';
import VideoService from '../base/VideoService';
import { inject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';

export class ScannerPageService {

    alertService = inject<AlertService>(TYPES.alertService);
    routerService = inject<RouterService>(TYPES.routerService);
    permissoinService = inject<PermissionService>(TYPES.permissionService)
    videoService = inject<VideoService>(TYPES.videoService);

    constructor() {
        makeAutoObservable(this);
    }

    takePicture = () => {
        this.alertService.notify('hahah');
        this.routerService.push('/');
    };

    getPermission = () => {
        this.permissoinService.notify()
    };
    
    beginDraw = (canvas: HTMLCanvasElement) => {
        const { mediaStream } = this.videoService;
        const { height, width } = canvas;
        const context = canvas.getContext('2d');
        if (mediaStream && context) {

            const video = document.createElement('video');
            video.srcObject = mediaStream;
            video.play();

            let drawLoop: number | null = null;

            const drawImage = () => {
                context.clearRect(0, 0, width, height);
                context.drawImage(video, 0, 0, width, height);
                drawLoop = requestAnimationFrame(drawImage);
            };
            
            drawImage();

            return () => {
                if (drawLoop !== null) {
                    cancelAnimationFrame(drawLoop);
                }
                video.srcObject = null;
            }
        } else {
            throw new Error('ScannerPageService empty mediastream');
        }
    }

};

export default ScannerPageService;
