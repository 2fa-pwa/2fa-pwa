import { makeAutoObservable, runInAction } from 'mobx';

export class VideoService {

    state = 'pending'

    mediaStream: MediaStream | null = null;

    constructor() {
        makeAutoObservable(this);
    };

    initCapture = async (height: number, width: number) => {
        try {
            const currentStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: {min: 0, max: width}, 
                    height: {min: 0, max: height},
                },
                audio: false,
            });
            runInAction(() => {
                this.state = "resolved"
                this.mediaStream = currentStream;
            })
        } catch {
            runInAction(() => this.state = "rejected")
        }
    };

    disposeCapture = () => {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track) => track.stop())
            this.mediaStream = null;
            this.state = "pending";
        }
    }
}

export default VideoService;
