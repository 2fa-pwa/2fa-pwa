import { Scaffold, Switch } from 'react-declarative';

import Container from '@mui/material/Container';
import ioc from '../../lib/ioc';
import { observer } from 'mobx-react-lite';
import options from '../../config/navbar';
import routes from '../../config/routes';

export const App = () => {

  const handleMenuClick = (path: string) => ioc.routerService.push(path);

  return (
    <Scaffold onOptionClick={handleMenuClick} title="InfoLink CRM" options={options}>
      <Container>
        <Switch
          Loading={() => <p>Checking permissions (mock)</p>}
          NotFound={() => <p>Not found(</p>}
          history={ioc.routerService}
          items={routes}
        />
      </Container>
    </Scaffold>
  );
}

export default observer(App);
