import { useEffect, useRef } from 'react';

import ioc from '../../lib/ioc';
import { observer } from 'mobx-react-lite';

export const Canvas = ({
    height = 100,
    width = 100,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const { current: canvas } = canvasRef;
        if (canvas) {
            return ioc.scannerPageService.beginDraw(canvas);
        } else {
            return () => null;
        }
    }, [width, height, ioc.scannerPageService.isReversed]); 
        
    return (
        <canvas
            height={height}
            width={width}
            ref={canvasRef}
        />
    );
}

  export default observer(Canvas);

