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
        <>
            {ioc.videoService.state === "resolved" && (
                <AutoSizer
                    widthRequest={() => window.innerWidth - 20}
                    heightRequest={() => window.innerHeight - 100}
                >
                    {({ width, height }) => (
                        <Canvas height={height} width={width} />
                    )}
                </AutoSizer>
            )}
        </>
    );
};

export default observer(ScannerPage);
