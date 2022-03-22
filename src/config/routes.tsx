import AccountsPage from '../pages/AccountsPage';
import { ISwitchItem } from 'react-declarative';
import QrPage from '../pages/QrPage';
import ScannerPage from '../pages/ScannerPage';

export const routes: ISwitchItem[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        element: AccountsPage,
    },
    {
        path: '/scanner',
        element: ScannerPage,
    },
    {
        path: '/qr/:id',
        element: QrPage,
    },
];

export default routes;
