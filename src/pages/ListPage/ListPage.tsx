import * as React from 'react';

import { ListSubheader, Paper } from '@mui/material';

import List from '@mui/material/List';
import ListItem from './components/ListItem';
import MatListItem from '@mui/material/ListItem';
import MatListItemText from '@mui/material/ListItemText';
import ioc from '../../lib/ioc';
import { observer } from "mobx-react-lite";

export const ListPage = () => {

  const { authList } = ioc.listService;

  return (
    <Paper sx={{
      height: 'calc(100vh - 80px)',
      
    }}>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            QR list
          </ListSubheader>
        }
        sx={{
          '& > .MuiListItem-root:nth-child(2n + 1)': {
            background: '#0001',
          }
        }}
      >
        {authList.map((item, idx) => (
          <ListItem key={idx} authItem={item} />
        ))}
        {authList.length === 0 && (
          <MatListItem>
            <MatListItemText
              primary="Nothing found"
              secondary="You should scan a new token on Scanner page"
            />
          </MatListItem>
        )}
      </List>
    </Paper >
  );
};

export default observer(ListPage);
