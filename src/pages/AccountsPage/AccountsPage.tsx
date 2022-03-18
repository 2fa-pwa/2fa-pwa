import { ActionType, IListAction } from "react-declarative";

import ListPage from "../ListPage";
import { observer } from "mobx-react-lite";

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
          {/* <ListPage/> */}
        </>
    );
};

export default observer(AccountsPage);
