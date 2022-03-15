import { ActionType, IListAction, ListTyped } from "react-declarative";

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
            <p>Список аккаунтов, кнопка добавления аккаунта</p>
            
        </>
    );
};

export default observer(AccountsPage);
