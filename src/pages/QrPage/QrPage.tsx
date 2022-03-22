import { Breadcrumbs, FieldType, IOption, One, TypedField } from "react-declarative";

import IAuthToken from "../../model/IAuthToken";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";

const fields: TypedField<IAuthToken>[] = [
    {
    type : FieldType.Text,
    readonly: true,
    title : "Secret",
    name : "secret",
    defaultValue : '',
    
    },
    {
      type : FieldType.Text,
      title : "Issuer",
      name : "issuer",
      defaultValue : '',   
      },
  ];
  
const actions: IOption[] = [
  {
    action: 'rename',
    label: 'Change issuer'
  },
  
];

interface IQrPageProps {
  id: string;
}

export const QrPage = ({
  id,
}: IQrPageProps) => {
  return (
    <p>{id}</p>
  );
};

export default observer<IQrPageProps>(QrPage);
