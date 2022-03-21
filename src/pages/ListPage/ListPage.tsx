import * as React from 'react';

import { Breadcrumbs, IOption } from 'react-declarative';
import { ListSubheader, Paper } from '@mui/material';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from './components/ListItem';
import MatListItem from '@mui/material/ListItem';
import MatListItemText from '@mui/material/ListItemText';
import ioc from '../../lib/ioc';
import { observer } from "mobx-react-lite";

const actions: IOption[] = [
  {
    action: 'expot action',
    label: 'Export tokens'
  },
  {
    action: 'import action',
    label: 'Import tokens'
  }
];

export const ListPage = () => {

  const { authList } = ioc.listService;

  return (
    <Box>
      <Breadcrumbs
        
        actions={actions}
        onAction={ioc.listService.exportItemList}
      />
      
      <Paper sx={{
        height: 'calc(100vh - 145px)',

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
          {authList.map(([id, item], idx) => (
            <ListItem key={idx} authItem={item} authId={id} />
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
    </Box>
  );
};

export default observer(ListPage);
