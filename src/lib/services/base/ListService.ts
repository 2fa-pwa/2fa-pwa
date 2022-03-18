import { generateToken } from 'node-2fa';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

interface IAuthtoken {
    secret: string | null,
    issuer: string | null
}

export class ListService {

    authMap = new Map<string, IAuthtoken>([
        ["123", {
            issuer: 'Mock',
            secret: 'ITRRF5A3O3CY4EMF3PY7ZTJ4O4'
        }]
    ])

    constructor() {
        makeAutoObservable(this);
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
        console.log({token});
    }

}

export default ListService;