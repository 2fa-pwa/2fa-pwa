import { observer } from 'mobx-react-lite';
import { Scaffold, Switch } from 'react-declarative';

import options from '../../config/navbar';
import routes from '../../config/routes';

import ioc from '../../lib/ioc';

export const App = () => {

  const handleMenuClick = (path: string) => ioc.routerService.push(path);

  return (
    <Scaffold onOptionClick={handleMenuClick} title="InfoLink CRM" options={options}>
      <Switch
        Loading={() => <p>Checking permissions (mock)</p>}
        NotFound={() => <p>Not found(</p>}
        history={ioc.routerService}
        items={routes}
      />
    </Scaffold>
  );
}

export default observer(App);
