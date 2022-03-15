import { useRef, useState } from 'react';

export const VideoPage = () => {
    const videoRef = useRef(null) 
    const [cameraData, setCameraData] = useState(null)
    
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
