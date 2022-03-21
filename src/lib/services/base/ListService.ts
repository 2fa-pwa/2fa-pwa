import { CC_LOCALSTORAGE_KEY } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import { generateToken } from 'node-2fa';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

const storageManager = new class {
    getData = (): IAuthToken[] => {
        return JSON.parse(localStorage.getItem(CC_LOCALSTORAGE_KEY) || '[]') as IAuthToken[];
    };
    setData = (data: IAuthToken[]) => {
        localStorage.setItem(CC_LOCALSTORAGE_KEY, JSON.stringify(data));
    };
};

export class ListService {

    authMap = new Map<string, IAuthToken>(storageManager.getData().map((item) => [uuid(), item]))
    
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
        );
        storageManager.setData([
            ...storageManager.getData(),
            { secret, issuer },
        ]);
    };

    generateToken = (secret: string) => {
        const { token } = generateToken(secret) || {};
        return token!;
    };

};

export default ListService;
