import { ActionType, IListAction, ListTyped } from "react-declarative";

import { observer } from "mobx-react-lite";
import ListPage from "../ListPage";

const actions: IListAction[] = [
    {
      type: ActionType.Add,
    },
    {
      type: ActionType.Menu,
      options: [
        {
          label: 'Create new person',
          // icon: Add,
        }
      ]
    },
];

export const AccountsPage = () => {
    return (
        <>
          <ListPage/>
            
        </>
    );
};

export default observer(AccountsPage);
