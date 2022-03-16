import AlertService from '../base/AlertService';
import RouterService from '../base/RouterService';
import TYPES from '../../types';
import VideoService from '../base/VideoService';
import { inject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';

export class ScannerPageService {

    alertService = inject<AlertService>(TYPES.alertService);
    routerService = inject<RouterService>(TYPES.routerService);
    videoService = inject<VideoService>(TYPES.videoService);

    isReversed = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleReverse = () => this.isReversed = !this.isReversed;

    takePicture = () => {
        this.alertService.notify('hahah');
        this.routerService.push('/');
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

            /**
             * отзеркаливание при смене стэйта isReversed
             */
            if (this.isReversed && !canvas.classList.contains('reversed')) {
                context.translate(width, 0);
                context.scale(-1, 1);
                canvas.classList.add('reversed')
            } else if (!this.isReversed && canvas.classList.contains('reversed')) {
                context.translate(width, 0);
                context.scale(-1, 1);
                canvas.classList.remove('reversed');
            }

            const drawImage = () => {
                // context.clearRect(0, 0, width, height);
                context.drawImage(video, 0, 0, width, height);
                drawLoop = requestAnimationFrame(drawImage);
            };
            
            drawImage();

            return () => {
                if (drawLoop !== null) {
                    cancelAnimationFrame(drawLoop);
                }
                // video.srcObject = null;    // из-за этой строчки всплывала ошибка, которая ни на что не влияла
            }
        } else {
            throw new Error('ScannerPageService empty mediastream');
        }
    }

};

export default ScannerPageService;
