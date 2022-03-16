import { AutoSizer, FieldType, One, TypedField } from 'react-declarative';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Canvas from './Canvas';
import Stack from '@mui/material/Stack';
import VideoPage from './VideoPage';
import ioc from "../../lib/ioc";
import { observer } from 'mobx-react-lite';

export const ScannerPage = () => {

    useEffect(() => {
        ioc.videoService.initCapture()
    }, []);

    return (
        <Box sx={{ height: 'calc(100vw - 400px)' }}>
            {ioc.videoService.state === "resolved" && (
                <AutoSizer>
                    {({ width, height }) => (
                        <Canvas height={height} width={width} />
                    )}
                </AutoSizer>
            )}
        </Box>
    );
};

export default observer(ScannerPage);
