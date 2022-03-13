import { ISwitchItem } from 'react-declarative';

import AccountsPage from '../pages/AccountsPage';
import ScannerPage from '../pages/ScannerPage';

export const routes: ISwitchItem[] = [
    {
        path: '/',
        component: () => <AccountsPage />,
    },
    {
        path: '/scanner',
        component: () => <ScannerPage />,
    },
];

export default routes;
