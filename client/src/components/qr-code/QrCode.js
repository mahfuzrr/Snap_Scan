import { Html5Qrcode } from 'html5-qrcode';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ResultBar from './ResultBar';
import TakeInput from './TakeInput';

export default function QrCode() {
    const [imgURL, setImgUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isFromCamera, setIsFromCamera] = useState(true);
    const [cameraMode, setCameraMode] = useState(null);
    const [result, setResult] = useState(null);
    const [rdr, setRdr] = useState(null);

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setImgUrl(url);
            const html5QrCode = new Html5Qrcode('reader');
            html5QrCode
                .scanFile(e.target.files[0], true)
                .then((decodedText) => {
                    console.log(decodedText);
                    setResult(decodedText);
                })
                .catch((err) => {
                    toast.error(err, {
                        position: 'top-right',
                        duration: 900,
                    });
                });
        }
    };

    const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
        const minEdgePercentage = 0.8; // 70%
        const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
        return {
            width: qrboxSize,
            height: qrboxSize,
        };
    };

    const handleCameraStart = () => {
        Html5Qrcode.getCameras().then((devices) => {
            if (devices && devices?.length) {
                setIsOpen(true);
            }
        });
        let cameraMode1 = 'user';
        if (cameraMode === 'user') cameraMode1 = 'environment';
        else cameraMode1 = 'user';
        setCameraMode(cameraMode1);
        const html5QrCode = new Html5Qrcode('reader');
        setRdr(html5QrCode);
        const config = { fps: 10, qrbox: qrboxFunction };
        html5QrCode.start({ facingMode: cameraMode1 }, config, (text) => {
            setResult(text);
        });
    };

    const handleCloseCamera = () => {
        rdr?.stop().then(() => {
            setIsOpen(false);
            setRdr(null);
        });
    };

    return (
        <div
            id="full-body"
            className="pt-4 pl-4 pr-4 pb-24 md:pb-12 md:ml-60 bg-bodybg min-h-screen"
        >
            <div className="p-4 flex flex-col">
                <Toaster />

                <h4 className="mt-1 text-center font-semibold text-lg">
                    <i className="fa-solid fa-cloud-arrow-up mr-2" /> Upload or capture photo of QR
                    Code
                </h4>
                {/* output and camera */}
                <div className="w-full flex flex-col justify-center items-center">
                    <div
                        id="reader"
                        className={`w-full md:w-1/3 m-auto ${isFromCamera ? 'visible' : 'hidden'}`}
                    />
                    {isOpen && (
                        <button
                            type="button"
                            className="mt-2 bg-white px-5 py-1 text-sm font-semibold border border-gray"
                            onClick={handleCameraStart}
                        >
                            <i className="fa-solid fa-camera-rotate" /> Switch Camera
                        </button>
                    )}
                </div>
                {result && (
                    <ResultBar
                        result={result}
                        setResult={setResult}
                        setImgUrl={setImgUrl}
                        handleCloseCamera={handleCloseCamera}
                    />
                )}

                <div className="flex flex-col items-center mt-8 md:mt-20">
                    {isFromCamera ? (
                        <div className="flex justify-center w-full md:w-1/2">
                            <button
                                type="button"
                                className="bg-white px-7 py-2 border border-gray rounded-sm text-sm active:bg-[#FCFCFC]"
                                onClick={handleCameraStart}
                            >
                                <i className="fa-solid fa-camera mr-2" /> Open Camera
                            </button>
                        </div>
                    ) : (
                        <TakeInput imgURL={imgURL} handleUpload={handleUpload} />
                    )}

                    <span>Or</span>
                    <span
                        role="presentation"
                        className="underline decoration-2 decoration-solid cursor-pointer decoration-[#0ea5e9] text-sm"
                        onClick={() => {
                            if (isFromCamera) {
                                handleCloseCamera();
                            }
                            setIsFromCamera(!isFromCamera);
                        }}
                    >
                        {!isFromCamera ? 'Scan using Camera' : 'Scan from file'}
                    </span>
                </div>
            </div>
        </div>
    );
}
