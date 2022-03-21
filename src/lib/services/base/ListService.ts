import AlertService from './AlertService';
import { CC_LOCALSTORAGE_KEY } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import TYPES from '../../types';
import { generateToken } from 'node-2fa';
import { inject } from 'react-declarative';
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
    alertService = inject<AlertService>(TYPES.alertService);

    isSaved = true;

    constructor() {
        makeAutoObservable(this);
    };

    get authList() {
        return [...this.authMap.entries()];
    };

    setIsSaved = (isSaved: boolean) => this.isSaved = isSaved;

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
        this.setIsSaved(false);
    };

    generateToken = (secret: string) => {
        const { token } = generateToken(secret) || {};
        return token!;
    };

    removeAuthItem = (id: string) => {
        this.authMap.delete(id);
        storageManager.setData(this.authList.map(([_, item]) => item));
        this.setIsSaved(false);
    };

    readItemListFromPlainArray = (data: any[]) => {
        try {
            if (Array.isArray(data) && data.length) {
                const temp: IAuthToken[] = [];
                for (const item of data) {
                    const { secret, issuer } = item || {};
                    if (secret && issuer) {
                        temp.push({ secret, issuer });
                    } else {
                        throw new Error('invalid object');
                    }
                }
                storageManager.setData(temp);
                this.authMap.clear();
                for (const item of temp) {
                    this.authMap.set(uuid(), item);
                }
                this.alertService.notify('Import complete');
                storageManager.setData(temp);
                this.setIsSaved(true);
            } else {
                throw new Error('item list is not array')
            }
        } catch (e) {
            this.alertService.notify('Invalid json object');
        }
    };

    exportItemList = (fileName = '2fa-pwa.json') => {
        const blob = new Blob([storageManager.getContent()], { type: 'application/json;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        [a.href, a.download] = [url, fileName];
        document.body.appendChild(a);
        a.addEventListener('click', () => {
            setTimeout(() => document.body.removeChild(a));
            this.alertService.notify('Export complete');
            this.setIsSaved(true);
        }, {
            once: true,
        });
        a.click();
        window.URL.revokeObjectURL(url);
    };

    imporItemList = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async ({ target }: any) => {
            try {
                const file = target.files[0];
                const name = file.name;
                const extension = name.split('.').pop().toLowerCase();
                if (extension === 'json') {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const { result } = reader;
                        const itemList = JSON.parse((result || '').toString());
                        this.readItemListFromPlainArray(itemList);
                    };
                    reader.readAsText(file);
                } else {
                    this.alertService.notify('Invalid extension .' + extension);
                }
                document.body.removeChild(input);
            } catch (e) {
                console.error(e);
                this.alertService.notify('Sorry, something goes wrong');
            }

        };
        document.body.appendChild(input);
        input.click();
    };

};

export default ListService;
