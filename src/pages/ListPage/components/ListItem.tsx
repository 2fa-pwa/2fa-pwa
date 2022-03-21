import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { CC_TOKEN_LIFETIME } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import MatListItem from '@mui/material/ListItem';
import MatListItemText from '@mui/material/ListItemText';
import ioc from '../../../lib/ioc';
import { useConfirm } from 'react-declarative';

interface IListItemProps {
    authItem: IAuthToken;
}

export interface IToken {
    token: string
    date: Date
    durationTokenMs: number
}

export const ListItem = ({
    authItem,
}: IListItemProps) => {    

    const pickConfirm = useConfirm();
    
    const [countdown, setCountdown] = useState(CC_TOKEN_LIFETIME);
    const [token, setToken] = useState(ioc.listService.generateToken(authItem.secret));

    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentCountdown = countdown - 1;
            if (currentCountdown === 0) {
                currentCountdown = CC_TOKEN_LIFETIME;
                setToken(ioc.listService.generateToken(authItem.secret))
            }
            setCountdown(currentCountdown)
        }, 1_000);
        return () => clearTimeout(timeout);
    }, [countdown]);
   
    const handleClick = () => pickConfirm({
        title: 'Confirmation',
        msg: `Are you sure to remove "${authItem.issuer}"?`
    }).then((confirmed) => {
        if (confirmed) {
            console.log('here');
        }
    });
    
    return  (
        <MatListItem onClick={handleClick}>
            <MatListItemText primary={authItem.issuer} secondary={token} />
            <Box>
                {countdown}
            </Box>
        </MatListItem>
    );
}

export default ListItem;
