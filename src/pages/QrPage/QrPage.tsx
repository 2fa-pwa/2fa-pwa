import { Breadcrumbs, FieldType, IOption, One, TypedField } from "react-declarative";

import IAuthToken from "../../model/IAuthToken";
import { Stack } from "@mui/material";
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

export const QrPage = ({
  id,
}: {
  id: string;
}) => {

  const [data, setData] = useState<IAuthToken | null>(ioc.listService.getItem(id));

  const handleSave = () => {
    if(data)
    ioc.listService.setItem(id, data)

    
  }

  const handleChange = (newData: any) => {
    setData(newData);
  };

  return (
    <>
      <Stack spacing={2}>
        <Breadcrumbs
          onSave={handleSave}
        />
        <One
          fields={fields}
          handler={data}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default observer(QrPage);

