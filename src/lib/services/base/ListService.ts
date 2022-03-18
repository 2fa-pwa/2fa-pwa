import CapturerService from './CapturerService';
import TYPES from '../../types';
import { inject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

interface IAuthtoken {
    secret: string | null,
    issuer: string | null
}

export class ListService {

    authMap = new Map<string, IAuthtoken>()

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

}

export default ListService;