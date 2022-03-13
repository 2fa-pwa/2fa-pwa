import { makeAutoObservable } from 'mobx';

import { inject } from 'react-declarative';

import AlertService from '../base/AlertService';
import RouterService from '../base/RouterService';

import TYPES from '../../types';

export class ScannerPageService {

    alertService = inject<AlertService>(TYPES.alertService);
    routerService = inject<RouterService>(TYPES.routerService);

    constructor() {
        makeAutoObservable(this);
    }

    takePicture = () => {
        this.alertService.notify('....cluck');
        this.routerService.push('/');
    };

};

export default ScannerPageService;
