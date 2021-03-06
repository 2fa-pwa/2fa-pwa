import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { CC_TOKEN_LIFETIME } from '../../../config/config';
import IAuthToken from '../../../model/IAuthToken';
import MatListItem from '@mui/material/ListItem';
import MatListItemText from '@mui/material/ListItemText';
import ioc from '../../../lib/ioc';

interface IListItemProps {
    authItem: IAuthToken;
    authId: string;
}

export const ListItem = ({
    authItem,
    authId,
}: IListItemProps) => {
    
    const [countdown, setCountdown] = useState(CC_TOKEN_LIFETIME - new Date().getSeconds() % CC_TOKEN_LIFETIME);
    const [token, setToken] = useState(ioc.listService.generateToken(authItem.secret));

    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentCountdown = Math.max(countdown - 1, 0);
            if (currentCountdown === 0) {
                currentCountdown = CC_TOKEN_LIFETIME;
                setToken(ioc.listService.generateToken(authItem.secret))
            }
            setCountdown(currentCountdown)
        }, 1_000);
        return () => clearTimeout(timeout);
    }, [countdown]);
    
    const handleClick = () => {
        ioc.routerService.push(`/qr/${authId}`);
    };
    
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
