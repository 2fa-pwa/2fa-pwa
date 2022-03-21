import { CC_LOCALSTORAGE_KEY } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import { generateToken } from 'node-2fa';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

const storageManager = new class {
    getContent = () => localStorage.getItem(CC_LOCALSTORAGE_KEY) || '[]';
    getData = (): IAuthToken[] => {
        return JSON.parse(this.getContent()) as IAuthToken[];
    };
    setData = (data: IAuthToken[]) => {
        localStorage.setItem(CC_LOCALSTORAGE_KEY, JSON.stringify(data, null, 2));
    };
};

export class ListService {

    authMap = new Map<string, IAuthToken>(storageManager.getData().map((item) => [uuid(), item]))
    
    constructor() {
        makeAutoObservable(this);       
    };
    
    get authList() {
        return [...this.authMap.entries()];
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

    removeAuthItem = (id: string) => {
        this.authMap.delete(id)
    };

    exportItemList = (fileName = '2fa-pwa.json') => {
        const blob = new Blob([storageManager.getContent()], { type: 'application/json;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        [a.href, a.download] = [url, fileName];
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a));
        window.URL.revokeObjectURL(url);
    };

    imporItemList = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async ({target}: any) => {
            try {
                const file = target.files[0];
                const name = file.name;
                const extension = name.split('.').pop().toLowerCase();
                // if (extension === 'js') {
                //     const reader = new FileReader();
                //     reader.onload = () => resolve(reader.result);
                //     reader.readAsText(file);
                // } else {
                //     alert('Invalid extension .' + extension);
                // }   
            } catch {
                console.log('error')
            }
          
        };
        input.click();
    };
   
};

export default ListService;
