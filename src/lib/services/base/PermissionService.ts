import { makeAutoObservable, runInAction } from 'mobx';

export class PermissionService {

    state = "pending"

    constructor() {
        makeAutoObservable(this);
    };

    notify = async () => {
        try {  
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            }) 
            runInAction(() => {
                this.state = "ok"
            });
        } catch (e) {
            runInAction(() => {
                this.state = "error"
            });
        }       
    };
    
    close = () => {
        runInAction(() => {
            this.state = "denied"
        });
    }

};

export default PermissionService;
