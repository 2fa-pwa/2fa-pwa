import { AutoSizer, FieldType, One, TypedField } from 'react-declarative';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Canvas from './Canvas';
import Stack from '@mui/material/Stack';
import VideoPage from './VideoPage';
import ioc from "../../lib/ioc";
import { observer } from 'mobx-react-lite';

export const ScannerPage = () => {

    const handleClick = () => {
        ioc.scannerPageService.takePicture();
    };
    const handleClickPermission = () => {
        ioc.scannerPageService.getPermission();
    };
    
    return (
        <>
        {/* <VideoPage/> */}
        <Stack gap={1}>
            <span>canvas, обернутый в AutoSizer так, чтобы занимал весь экран</span>
            <span>через сервисы обрабатываем <b>navigator.mediaDevices.getUserMedia(constraints)"</b></span>
            <span>делаем фото раз в секунду через <b>ImageCapture()</b></span>
            <span>сканируем через какой-нибудь <b>qr code сканнер в npm</b></span>
            <span>парсим ссылку через <b>URLSearchParams()</b></span>
            <span>сохраняем в сервис, дублируем в <b>localStorage</b></span>
            <Button variant="contained" onClick={handleClickPermission}>
                ioc.scannerPageService.takePicture()
            </Button>
            
        </Stack>
        <div style={{width: 700, height: 500, marginBottom: 20}}>
            <AutoSizer>
                {({ width, height }) => {
                    
                    return (
                        <Canvas height={height} width={width}/>
                    );
                }}
            </AutoSizer>
        </div>
        </>
        
    );
};

export default observer(ScannerPage);
