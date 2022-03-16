import AccountsPage from '../pages/AccountsPage';
import { ISwitchItem } from 'react-declarative';
import ScannerPage from '../pages/ScannerPage';

export const routes: ISwitchItem[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => <AccountsPage />,
    },
    {
        path: '/scanner',
        component: () => <ScannerPage />,
    },
];

export default routes;
