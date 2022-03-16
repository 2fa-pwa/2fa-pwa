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
        element: () => <AccountsPage />,
    },
    {
        path: '/scanner',
        element: () => <ScannerPage />,
    },
];

export default routes;
