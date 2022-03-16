import { makeAutoObservable, runInAction } from 'mobx';

export class VideoService {

    state = 'pending'

    mediaStream: MediaStream | null = null;

    constructor() {
        makeAutoObservable(this);
    };

    initCapture = async () => {
        try {
            const currentStream = await navigator.mediaDevices.getUserMedia({
                video: true,
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
}

export default VideoService;
