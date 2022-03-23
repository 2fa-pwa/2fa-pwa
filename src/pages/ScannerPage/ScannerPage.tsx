import { AutoSizer } from 'react-declarative';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import Canvas from './Canvas';
import Fab from '@mui/material/Fab';
import ioc from "../../lib/ioc";
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const ScannerPage = () => {

    useEffect(() => {
        ioc.videoService.initCapture( window.innerHeight - 100, window.innerWidth - 20);
        return () => {
            ioc.videoService.disposeCapture();
        };
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
            <Fab 
                onClick={ioc.scannerPageService.toggleReverse}
                color="primary" 
                aria-label="add" 
                size="medium"
                sx={{
                    position: 'fixed',
                    bottom: 60,
                    right: 60,
                }}
            >
                <CameraFrontIcon />
            </Fab>
        </>
    );
};

export default observer(ScannerPage);
