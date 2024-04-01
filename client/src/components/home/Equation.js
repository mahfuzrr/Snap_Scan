/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */

import { useRef, useState } from 'react';
import camera from '../../assets/cam.svg';
import rotate from '../../assets/rotate.svg';

export default function Equation() {
    const [imageDataURL, setImageDataURL] = useState(null);
    const [imgURL, setImgUrl] = useState('');
    const [cameraNumber, setCameraNumber] = useState(0);
    const [cameraOn, setCameraOn] = useState(false);
    const player = useRef();
    const canvasRef = useRef();

    const getListOfVideoInputs = async () => {
        // Get the details of audio and video output of the device
        const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
        // Filter video outputs (for devices with multiple cameras)
        return enumerateDevices.filter((device) => device.kind === 'videoinput');
    };

    const initializeMedia = async () => {
        setImageDataURL(null);

        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia Not Implemented'));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        // Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();

        // console.log(videoInputs);

        // The device has a camera
        if (videoInputs.length) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        deviceId: {
                            exact: videoInputs[cameraNumber].deviceId,
                        },
                    },
                })
                .then((stream) => {
                    // console.log(play);
                    player.current.srcObject = stream;
                    setCameraOn(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('The device does not have a camera');
        }
    };

    const capturePicture = () => {
        // canvasRef.current.width = player.current.videoWidth;
        // canvasRef.current.height = player.current.videoHeight;

        const contex = canvasRef.current.getContext('2d');
        contex.drawImage(player.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        player.current.srcObject.getVideoTracks().forEach((track) => {
            track.stop();
        });

        console.log(canvasRef.current.toDataURL());
        setImageDataURL(canvasRef.current.toDataURL());
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
            console.log('The device has only one camera');
        } else {
            console.log('The device does not have a camera');
        }
    };

    const canvas = <canvas ref={canvasRef} width="500" height="0" />;

    const handleUpload = (e) => {};

    return (
        <div
            id="full-body"
            className="pt-4 pl-4 pr-4 pb-24 md:pb-12 md:ml-60 bg-bodybg min-h-screen"
        >
            <div className="p-4 flex flex-col">
                <div className="w-full bg-test">
                    <span className="absolute right-16 md:right-24 top-7 cursor-pointer">
                        <i className="fa-solid fa-sun shadow-md rounded-full" />
                    </span>
                </div>

                <p className="mt-10 text-center font-semibold text-lg">
                    Upload or capture photo of your equation
                </p>
                <div className="w-full mt-10 flex flex-col items-center md:flex-row">
                    <div className="bg-white w-4/5 md:w-1/4 py-6 rounded-md drop-shadow-lg md:ml-20">
                        <div className="flex items-center w-full justify-center">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-4/5 justify-center border-2 border-primary border-dashed rounded-lg cursor-pointer bg-dropbox dark:bg-gray-700 dark:border-white"
                            >
                                {imgURL ? (
                                    <img className="w-full" src={imgURL} alt="input-img" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <i className="fa-solid fa-image mb-1 text-3xl text-primary dark:text-white" />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            Drag and Drop image
                                        </p>
                                        <p className="flex justify-center items-center text-xs font-semibold">
                                            <span className="w-7 py-px bg-gray inline-block rounded-md mr-1" />{' '}
                                            OR{' '}
                                            <span className="ml-1 w-7 py-px bg-gray inline-block rounded-md" />
                                        </p>
                                        <span className="bg-primary px-6 py-1 mt-2 rounded-sm drop-shadow-lg text-sm text-white">
                                            Browse
                                        </span>
                                    </div>
                                )}
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleUpload}
                                />
                            </label>
                        </div>
                    </div>

                    <span className="before:block before:absolute before:-inset-1 mt-10 md:mt-0 md:ml-10 before:-skew-y-3 px-3 before:bg-another relative inline-block">
                        <span className="relative flex items-center justify-center font-bold text-white">
                            OR
                        </span>
                    </span>

                    <div className="mt-10 md:mt-0 md:ml-10">
                        <div
                            className={`absolute w-full min-h-screen top-20 left-0 z-10 ${
                                cameraOn ? 'visible' : 'hidden'
                            }`}
                        >
                            {imageDataURL ? (
                                <img src={imageDataURL} alt="test" />
                            ) : (
                                <div className="pt-4 pl-4 pr-4 pb-24 relative md:pb-12 md:ml-58">
                                    <video
                                        ref={player}
                                        width="600"
                                        height="0"
                                        className="m-auto block"
                                        autoPlay
                                    />
                                    <div className="w-5/12 absolute m-auto left-0 right-0 bottom-24 mb-1 md:mb-0 md:bottom-16 flex justify-center align-middle">
                                        <button
                                            type="button"
                                            className="rounded-full active:scale-95 bg-gray p-3"
                                            onClick={capturePicture}
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
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="bg-primary px-6 py-2.5 text-white rounded drop-shadow-lg"
                            onClick={initializeMedia}
                        >
                            <i className="fa-solid fa-camera mr-2" /> Open Camera
                        </button>
                    </div>
                </div>
            </div>

            <div
                id="equation-output"
                className="md:w-2/4 bg-white p-4 mt-16 md:ml-24 border-2 border-bord h-auto drop-shadow-sm"
            >
                <p className="text-secondary font-medium">Equation:</p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima vitae
                    laboriosam eos ipsam sit deleniti repellat doloremque atque cum nihil.
                </p>
            </div>

            <div
                id="solution-output"
                className="md:w-2/4 bg-white p-4 mt-8 md:ml-24 border-2 border-bord h-auto drop-shadow-sm"
            >
                <p className="text-secondary font-medium">Solution:</p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima vitae
                    laboriosam eos ipsam sit deleniti repellat doloremque atque cum nihil. Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, veritatis
                    eligendi. Fugit inventore tempore nesciunt quam? Vero at eaque, suscipit
                    doloribus consequuntur vel natus ullam dolores itaque placeat totam provident
                    rem alias voluptatum. Dicta ad delectus molestiae non, eius, suscipit natus vero
                    perferendis reiciendis aliquam officiis ex dolorem! Impedit dolores optio unde
                    vitae soluta, itaque, officia nobis, aliquam earum debitis facere eaque eius
                    recusandae vero repellat distinctio laudantium beatae ea veniam? Adipisci sunt
                    quisquam dolores nisi aperiam explicabo voluptatibus dignissimos fugit maiores!
                    Repellendus asperiores obcaecati eveniet consequatur adipisci, totam officia
                    dolorum maxime reiciendis exercitationem consequuntur ut molestiae. Dolores
                    quasi architecto sed fugit quos hic enim consequuntur eaque pariatur laborum
                    laudantium voluptas obcaecati, vitae officia, porro dicta, officiis provident.
                    Illo vel dolorum quae, temporibus reiciendis at ab similique quaerat voluptate!
                    Repudiandae nisi qui aliquid consectetur, praesentium neque magni itaque omnis
                    maiores inventore modi nulla animi quas molestiae ipsam quasi molestias
                    cupiditate quam nobis numquam odio. Earum harum aliquid porro perspiciatis!
                    Esse, asperiores enim sequi natus minus fuga, cum quidem voluptates quod eaque
                    aspernatur accusamus libero, aperiam tenetur maiores sit maxime voluptatum
                    blanditiis ipsum fugiat dolore. Vitae facilis natus eius. Voluptatem culpa ab
                    officiis voluptates, magni autem rerum? Necessitatibus placeat provident
                    asperiores?
                </p>
            </div>
        </div>
    );
}
