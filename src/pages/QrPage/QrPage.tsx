import { Breadcrumbs, FieldType, IOption, One, TypedField } from "react-declarative";

import IAuthToken from "../../model/IAuthToken";
import QRCode from "react-qr-code";
import { Box, Stack } from "@mui/material";
import ioc from "../../lib/ioc";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const fields: TypedField<IAuthToken>[] = [
  {
    type: FieldType.Text,
    disabled: true,
    title: "Secret",
    name: "secret",
    defaultValue: '',

  },
  {
    type: FieldType.Text,
    title: "Issuer",
    name: "issuer",
    defaultValue: '',
  },
];

interface IQrPageProps {
  id: string;
}

const actions: IOption[] = [
  {
    action: 'action-remove',
    label: 'Remove item',
  },
];

export const QrPage = ({
  id,
}: IQrPageProps) => {

  const [data, setData] = useState<IAuthToken | null>(ioc.listService.getItem(id));

  const handleSave = () => {
    if(data)
    ioc.listService.setItem(id, data)
  }

  const handleChange = (newData: any) => {
    setData(newData);
  };

  const handleAction = (name: string) => {
    if (name === 'action-remove') {
      ioc.listService.removeAuthItem(id)
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Breadcrumbs
          title='Accounts'
          subtitle={data?.issuer}
          actions={actions}
          onAction={handleAction}
          onSave={handleSave}
        />
        <One
          fields={fields}
          handler={data}
          onChange={handleChange}
        />
        {!!data && (
          <Box 
            sx={{
              padding: '15px',
              background: 'white',
            }}
          >
            <QRCode value={data.href}/>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default observer(QrPage);

