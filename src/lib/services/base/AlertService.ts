import { makeAutoObservable } from 'mobx';
import randomString from '../../../utils/randomString';

interface IAlert {
    key: string;
    message: string;
    
}

export class AlertService {

    alerts: IAlert[] = [];

    get current() {
        const [alert = null] = this.alerts;
        return alert;
    };

    constructor() {
        makeAutoObservable(this);
    };

    hideCurrent = () => {
        if (this.alerts.length > 0) {
            this.alerts.shift();
        }
    };
    
    notify = (message: string) => {
        this.hideCurrent();
        this.alerts.push({
            key: randomString(),
            message,
            
        });
        
    };

};

export default AlertService;
