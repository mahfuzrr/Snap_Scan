/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/media-has-caption */
import axios from 'axios';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import camera from '../../assets/cam.svg';
import rotate from '../../assets/rotate.svg';
import ConvertBase64 from '../../utils/ConvertBase64';
import Output from './Output';
import StartButton from './StartButton';
import TakeImageInput from './TakeImageInput';

export default function Equation() {
    const [lang, setLang] = useState('eng');
    const [imageDataURL, setImageDataURL] = useState(null);
    const [blobData, setBlobData] = useState(null);
    const [imgURL, setImgUrl] = useState('');
    const [cameraNumber, setCameraNumber] = useState(0);
    const [cameraOn, setCameraOn] = useState(false);
    const [resultText, setResultText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const player = useRef();

    const getListOfVideoInputs = async () => {
        // Get the details of audio and video output of the device
        const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
        // Filter video outputs (for devices with multiple cameras)
        return enumerateDevices.filter((device) => device.kind === 'videoinput');
    };

    const handleClose = async () => {
        const videoEl = document.getElementById('video');
        const stream = videoEl.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoEl.srcObject = null;
        setCameraOn(false);
    };

    const initializeMedia = async () => {
        setImageDataURL(null);

        // if (!('mediaDevices' in navigator)) {
        //     navigator.mediaDevices = {};
        // }

        // if (!('getUserMedia' in navigator.mediaDevices)) {
        //     navigator.mediaDevices.getUserMedia = function (constraints) {
        //         const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        //         if (!getUserMedia) {
        //             return Promise.reject(new Error('getUserMedia Not Implemented'));
        //         }

        //         return new Promise((resolve, reject) => {
        //             getUserMedia.call(navigator, constraints, resolve, reject);
        //         });
        //     };
        // }

        // Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();

        // The device has a camera
        if (videoInputs.length) {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: false,
                })
                .then((stream) => {
                    player.current.style.transform = 'scaleX(-1)';
                    player.current.srcObject = stream;
                    setCameraOn(true);
                })
                .catch((error) => {
                    toast.error(error?.message, {
                        duration: 900,
                        position: 'top-right',
                    });
                });
        } else {
            toast.error('Does not support any camera!', {
                duration: 900,
                position: 'top-right',
            });
        }
    };

    const takePhoto = () => {
        const imageCapture = new ImageCapture(player.current.srcObject.getVideoTracks()[0]);
        imageCapture
            .takePhoto()
            .then((blob) => {
                setBlobData(blob);
                // console.log(blob);
                const url = window.URL.createObjectURL(blob);
                setImageDataURL(url);
                handleClose();
                // window.URL.revokeObjectURL(url);
            })
            .catch((error) =>
                toast.error(error?.message, {
                    duration: 900,
                    position: 'top-right',
                })
            );
    };

    const switchCamera = async () => {
        // eslint-disable-next-line no-undef
        const listOfVideoInputs = await getListOfVideoInputs();

        // The device has more than one camera
        if (listOfVideoInputs.length > 1) {
            if (player.current.srcObject) {
                player.current.srcObject.getVideoTracks().forEach((track) => {
                    track.stop();
                });
            }

            // switch to second camera
            if (cameraNumber === 0) {
                setCameraNumber(1);
            }
            // switch to first camera
            else if (cameraNumber === 1) {
                setCameraNumber(0);
            }

            // Restart based on camera input
            initializeMedia();
        } else if (listOfVideoInputs.length === 1) {
            toast.error('Device has only one camera!', { duration: 900, position: 'top-right' });
        } else {
            toast.error('Does not support any camera!', {
                duration: 900,
                position: 'top-right',
            });
        }
    };

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImgUrl(url);
            setBlobData(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const base64 = await ConvertBase64(blobData);
        const reqObejct = {
            lang,
            base64,
        };
        setIsLoading(true);
        const result = await axios.post('http://localhost:5000/api/get-ocr-text', reqObejct);
        setResultText(result?.data?.message);
        setIsLoading(false);
    };

    return (
        <div
            id="full-body"
            className="pt-4 pl-4 pr-4 pb-24 md:pb-12 md:ml-60 bg-bodybg min-h-screen"
        >
            <div className="p-4 flex flex-col">
                <Toaster />
                <div className="w-full bg-test">
                    <span className="absolute right-16 md:right-24 top-7 cursor-pointer">
                        <i className="fa-solid fa-sun shadow-md rounded-full" />
                    </span>
                </div>

                <p className="mt-2 text-center font-semibold text-lg">
                    Upload or capture photo of your text
                </p>
                {/* language option */}
                <div className="text-center md:text-left md:ml-16 mt-6">
                    <p className="p-0 text-md">Select Language</p>
                    <select
                        className="cursor-pointer border border-gray px-4 py-1 text-sm font-semibold shadow-sm round-sm mt-2"
                        name="language"
                        id="lang"
                        onChange={(e) => setLang(e.target.value)}
                        value={lang}
                    >
                        <option value="eng">English</option>
                        <option value="ben">Bangla</option>
                    </select>
                </div>
                {/* take input */}
                <TakeImageInput
                    imgURL={imgURL}
                    handleUpload={handleUpload}
                    initializeMedia={initializeMedia}
                />
            </div>

            {/* output and camera */}
            <div
                className={`w-full mt-10 md:mt-0 md:ml-10 ${
                    cameraOn || imageDataURL ? 'visible' : 'hidden'
                }`}
            >
                <div
                    className={`absolute w-full min-h-screen top-20 left-0 ${
                        cameraOn || imageDataURL ? 'z-10' : 'z-0'
                    }`}
                >
                    <div className="w-full relative">
                        <img
                            src={imageDataURL}
                            id="img"
                            alt="capture"
                            className={`block m-auto z-20 ring-4 rounded-sm ${
                                imageDataURL ? 'visible' : 'hidden'
                            }`}
                        />
                        <div
                            className={`w-36 flex flex-row justify-center absolute bottom-2 right-2/5 md:right-1/2 z-30 ${
                                imageDataURL ? 'visible' : 'hidden'
                            }`}
                        >
                            <button
                                type="button"
                                className="rounded-full active:scale-95 bg-test px-3 py-2"
                            >
                                <i className="fa-solid fa-circle-xmark text-white" />
                            </button>
                            <button
                                type="button"
                                className="rounded-full active:scale-95 bg-green px-3 py-2 ml-2"
                            >
                                <i className="fa-solid fa-circle-check text-white" />
                            </button>
                        </div>
                    </div>

                    <div
                        className={`relative w-full ${
                            cameraOn && imageDataURL === null ? 'visible' : 'hidden'
                        }`}
                    >
                        <video
                            id="video"
                            ref={player}
                            width="700"
                            height="0"
                            className="m-auto block"
                            autoPlay
                        />
                        <div className="w-5/12 absolute m-auto left-0 right-0 bottom-2 mb-1 md:mb-0 md:bottom-10 flex justify-center align-middle">
                            <button
                                type="button"
                                className="rounded-full active:scale-95 bg-gray p-3"
                                onClick={takePhoto}
                            >
                                <img src={camera} className="w-4" alt="camera" />
                            </button>
                            <button
                                type="button"
                                className="ml-4 rounded-full active:scale-95 bg-gray p-3"
                                onClick={switchCamera}
                            >
                                <img src={rotate} className="w-4" alt="rotate" />
                            </button>
                            <button
                                type="button"
                                className="ml-4 rounded-full active:scale-95 bg-gray px-3"
                                onClick={handleClose}
                            >
                                <i className="fa-solid fa-circle-xmark" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* start button */}
            <StartButton isLoading={isLoading} handleSubmit={handleSubmit} />

            <Output resultText={resultText} />
        </div>
    );
}
