import { useRef, useState } from 'react';

export const VideoPage = () => {
    const videoRef = useRef(null) 

    
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }). then (stream =>{
            let video: any | null = videoRef.current
            video.srcObject = stream
            video.play()
            // const track = stream.getVideoTracks()[0];
            // let Capture = new ImageCapture(track);
        }).catch(console.error)
    }
    

    return (
        <div>
            <video ref={videoRef}></video>
            <button onClick={getVideo}>get video</button>
        </div>       
    )
}

  export default VideoPage;


//   export const createVideo = (stream: MediaStream) => {
//     const video = document.createElement('video');
//     video.style.objectFit = 'cover';
//     video.srcObject = stream;
//     video.style.position = 'fixed';
//     video.style.left = -${window.screen.width}px;
//     video.play();
//     return video;
// };

// document.body.appendChild(video);

// const drawImage = () => {
//     context.clearRect(0, 0, width, height);
//     context.drawImage(video, 0, 0, width, height);
//   };

//   const onPlay = () => {
//         drawImage();
//         setTimeout(() => onPlay());
//     };
//     onPlay();

//     const context = canvas.getContext('2d');