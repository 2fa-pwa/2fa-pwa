import { useEffect, useState } from 'react';

import { CC_TOKEN_LIFETIME } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import MatListItem from '@mui/material/ListItem';
import MatListItemText from '@mui/material/ListItemText';
import { generateToken } from 'node-2fa';
import ioc from '../../../lib/ioc';

interface IListItemProps {
    authItem: IAuthToken;
}

export const ListItem = ({
    authItem,
}: IListItemProps) => {    

    const token = ioc.listService.generateToken(authItem.secret)

    // const handler = async (token: string | undefined) => {
    //     await ioc.listService.generateToken(authItem.secret)
    //     console.log('heheheh')
    //     const interval = setTimeout(handler, 3000)
    // }
    
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        timeLeft > 0 && setTimeLeft(() => setTimeLeft(timeLeft - 1), 1000);
      }, [timeLeft]);
    
    return  (
        <MatListItem>
            <MatListItemText primary={authItem.issuer} secondary={token} />
        </MatListItem>
    );
}

export default ListItem;