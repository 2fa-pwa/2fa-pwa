import * as React from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ioc from '../../lib/ioc';
import { observer } from "mobx-react-lite";

export const ListPage = () => {

  const { authList } = ioc.listService;
  const adding = () => {
    ioc.listService.addAuthItem("111", "123")
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {authList.map(({ issuer, secret }, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={issuer} secondary={secret} />
            </ListItem>
          ))}
        </List>
      </nav>
      <Fab 
          onClick={adding}
          color="primary" 
          aria-label="add" 
          size="medium"
          sx={{
              position: 'fixed',
              top: 60,
              right: 60,
          }}
      >
                add
      </Fab>
    </Box>
  );
};

export default observer(ListPage);
