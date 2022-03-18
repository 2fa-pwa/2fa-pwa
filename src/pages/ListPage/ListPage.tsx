import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from './components/ListItem';
import { ListSubheader } from '@mui/material';
import ioc from '../../lib/ioc';
import { observer } from "mobx-react-lite";

export const ListPage = () => {

  const { authList } = ioc.listService;
 
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List 
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              QR list
            </ListSubheader>
          }>
          {authList.map((item, idx) => (
            <ListItem key={idx} authItem={item} />
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default observer(ListPage);
