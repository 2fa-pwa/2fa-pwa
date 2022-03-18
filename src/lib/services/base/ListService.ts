import { autorun, makeAutoObservable } from 'mobx';

import { CC_TOKEN_LIFETIME } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import { generateToken } from 'node-2fa';
import { v4 as uuid } from 'uuid';

export class ListService {

    authMap = new Map<string, IAuthToken>([
        ["123", {
            issuer: 'Mock',
            secret: 'ITRRF5A3O3CY4EMF3PY7ZTJ4O4'
        }]
    ])
    
    interval: NodeJS.Timeout | null = null;
    
    constructor() {
        makeAutoObservable(this);
        // autorun(() => {
        //     const handler = async () => {
        //         this.generateToken('ITRRF5A3O3CY4EMF3PY7ZTJ4O4')
        //         this.interval = setTimeout(handler, 5000);
        //     };
        //     handler(); 
        // })       
    };
    
    get authList() {
        return [...this.authMap.values()];
    };
    
    
    addAuthItem = (secret: string, issuer: string) => {
        this.authMap.set(
            uuid(), 
            {
                secret,
                issuer,
            }
        )
    };

    generateToken = (secret: string) => {
        const { token } = generateToken(secret) || {};
        console.log(secret)
        console.log('TEST TOKEN');
        console.log({token});
        return token;
    }

}

export default ListService;