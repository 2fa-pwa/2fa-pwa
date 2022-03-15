import { useEffect, useRef } from 'react';

// const imageCapture;
// const onTakePhotoButtonClick = () => {
//     imageCapture.takePhoto()
//     .then(blob => createImageBitmap(blob))
//     .then(imageBitmap => {
//       const canvas = document.querySelector('#takePhotoCanvas');
//       drawCanvas(canvas, imageBitmap);
//     })
//     .catch(error => console.log(error));
//   }

export const Canvas = ({
    height = 100,
    width = 100,
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const rootElement = rootRef.current!;
        if (rootElement.childNodes.length) {
            rootElement.removeChild(rootElement.lastChild!);
        }
        const canvasElement = document.createElement('canvas');
        canvasElement.height = height;
        canvasElement.width = width;
        rootElement.appendChild(canvasElement)       
        // const ctx = canvasElement.getContext('2d');
        
    }, [height, width]); 
    
    
    

    return (
        <div ref={rootRef} style={{border: '1px solid grey'}}></div>         
    )
}

  export default Canvas;

