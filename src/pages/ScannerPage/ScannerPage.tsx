import { observer } from 'mobx-react-lite';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ioc from "../../lib/ioc";

export const ScannerPage = () => {

    const handleClick = () => {
        ioc.scannerPageService.takePicture();
    };

    return (
        <Stack gap={1}>
            <span>canvas, обернутый в AutoSizer так, чтобы занимал весь экран</span>
            <span>через сервисы обрабатываем <b>navigator.mediaDevices.getUserMedia(constraints)"</b></span>
            <span>делаем фото раз в секунду через <b>ImageCapture()</b></span>
            <span>сканируем через какой-нибудь <b>qr code сканнер в npm</b></span>
            <span>парсим ссылку через <b>URLSearchParams()</b></span>
            <span>сохраняем в сервис, дублируем в <b>localStorage</b></span>
            <Button variant="contained" onClick={handleClick}>
                ioc.scannerPageService.takePicture()
            </Button>
        </Stack>
    );
};

export default observer(ScannerPage);
