import AlertService from '../base/AlertService';
import PermissionService from '../base/PermissionService';
import RouterService from '../base/RouterService';
import TYPES from '../../types';
import { inject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';

export class ScannerPageService {

    alertService = inject<AlertService>(TYPES.alertService);
    routerService = inject<RouterService>(TYPES.routerService);
    permissoinService = inject<PermissionService>(TYPES.permissionService)

    constructor() {
        makeAutoObservable(this);
    }

    takePicture = () => {
        this.alertService.notify('hahah');
        this.routerService.push('/');
    };

    getPermission = () => {
        this.permissoinService.notify()
    }

};

export default ScannerPageService;
