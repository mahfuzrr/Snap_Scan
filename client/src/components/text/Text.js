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

export default function Text() {
    const [lang, setLang] = useState('eng');
    const [imageDataURL, setImageDataURL] = useState(null);
    const [blobData, setBlobData] = useState(null);
    const [imgURL, setImgUrl] = useState('');
    const [front, setFront] = useState(true);
    const [cameraOn, setCameraOn] = useState(false);
    const [resultText, setResultText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCaptureControl, setShowCaptureControl] = useState(false);
    const [isFromCamera, setIsFromCamera] = useState(false);
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

    const initializeMedia = async (isFrontCameraOn = true) => {
        setImageDataURL(null);
        // Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();

        // The device has a camera
        if (videoInputs) {
            navigator.mediaDevices
                .getUserMedia({
                    video: isFrontCameraOn ? { facingMode: 'user' } : { facingMode: 'environment' },
                    audio: false,
                })
                .then((stream) => {
                    // player.current.style.transform = 'scaleX(-1)';
                    player.current.srcObject = stream;
                    player.current.play();
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
                setShowCaptureControl(true);
                setIsFromCamera(true);
                setCameraOn(false);
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
            setFront(!front);
            initializeMedia(!front);
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
        console.log(reqObejct);
        setIsLoading(true);
        const result = await axios.post(
            'https://snap-scan-server.onrender.com/api/get-ocr-text',
            reqObejct
        );
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

                <h4 className="mt-1 text-center font-semibold text-lg">
                    <i className="fa-solid fa-cloud-arrow-up mr-2" /> Upload or capture photo of
                    your text
                </h4>
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
                {isFromCamera && imageDataURL && !showCaptureControl ? (
                    <img
                        src={imageDataURL}
                        alt="from-camera"
                        className="w-full md:w-96 px-2 mt-2"
                    />
                ) : (
                    <TakeImageInput
                        imgURL={imgURL}
                        handleUpload={handleUpload}
                        initializeMedia={initializeMedia}
                    />
                )}
            </div>

            {/* output and camera */}
            <div
                className={`w-full mt-10 md:mt-0 md:ml-10 ${
                    cameraOn || (imageDataURL && showCaptureControl) ? 'visible' : 'hidden'
                }`}
            >
                <div
                    className={`absolute w-full min-h-screen top-20 left-0 ${
                        cameraOn ? 'z-10' : 'z-0'
                    }`}
                >
                    <div
                        className={`w-full relative px-6 ${
                            isFromCamera && !showCaptureControl ? 'hidden' : 'visible'
                        }`}
                    >
                        <img
                            src={imageDataURL}
                            id="img"
                            alt="capture"
                            className={`block m-auto z-20 ring-4 rounded-sm ${
                                imageDataURL ? 'visible' : 'hidden'
                            }`}
                        />
                        <div
                            className={`w-36 flex flex-row justify-center absolute bottom-2 right-1/2 md:right-1/2 z-30 ${
                                imageDataURL && showCaptureControl ? 'visible' : 'hidden'
                            }`}
                        >
                            <button
                                type="button"
                                className="rounded-full active:scale-95 bg-test px-3 py-2"
                                onClick={() => {
                                    setBlobData(null);
                                    setImageDataURL('');
                                    setShowCaptureControl(false);
                                }}
                            >
                                <i className="fa-solid fa-circle-xmark text-white" />
                            </button>
                            <button
                                type="button"
                                className="rounded-full active:scale-95 bg-green px-3 py-2 ml-2"
                                onClick={() => setShowCaptureControl(false)}
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
                        <video id="video" ref={player} className="m-auto block px-5 md:px-0" />
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

            <StartButton
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                setImgUrl={setImgUrl}
                setImageDataURL={setImageDataURL}
                show={imgURL || imageDataURL}
            />
            {isLoading && (
                <p className="mt-2 md:ml-16 md:pl-8 text-[12px] font-semibold text-center md:text-left">
                    Please wait, it can take quite few times
                </p>
            )}

            {resultText && <Output resultText={resultText} />}
        </div>
    );
}
