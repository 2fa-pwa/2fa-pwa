import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ioc from '../../lib/ioc';
import { observer } from "mobx-react-lite";

export const ListPage = () => {
const secret = ioc.capturerService.secret
const issuer = ioc.capturerService.issuer
ioc.listService.addAuthItem(secret, issuer)
  
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem >
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem >
            <ListItemText primary="Item 2" />
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default observer(ListPage);
