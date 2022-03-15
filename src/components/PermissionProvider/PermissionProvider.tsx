import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import Typography from '@mui/material/Typography';
import ioc from '../../lib/ioc';
import { observer } from 'mobx-react-lite';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IPermissionProviderProps {
    children: React.ReactChild;
}

export const PermissionProvider = ({
    children,
}: IPermissionProviderProps) => {
    return (
        <>
            {ioc.permissionService.state === 'error' ? (
                <Modal
                    open={ioc.permissionService.state === 'error'}
                    onClose={ioc.permissionService.close}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Permission denied!
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                do smth
                            </Typography>
                        </Box>
                </Modal>
            ): null}
            {children}
        </>
    );
};

export default observer(PermissionProvider);
