export default function Work() {
    return (
        <div
            id="work-body"
            className="pt-4 pl-0 md:pl-4 pr-0 md:pr-4 pb-12 ml-0 md:ml-60 bg-bodybg min-h-screen"
        >
            <p className="mt-8 text-center w-full md:w-3/4 pl-10 font-bold text-2xl">
                <i className="fa-solid fa-gears mr-2 text-[#5B78FF]" />
                How OCR works ?
            </p>

            <div className="flex flex-col mb-12 md:mb-0 md:flex-row mx-auto mt-16 w-full xl:w-4/5">
                <div className="w-1/2 md:mx-0 mx-auto">
                    <div className="relative mb-2">
                        <div
                            className="visible md:hidden absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: 'calc(100% - 2rem - 1rem); top: 50%; transform: translate(-50%, -50%)',
                            }}
                        >
                            <div className="w-full bg-gray rounded items-center align-middle align-center flex-1">
                                <div
                                    className="w-0 bg-secondary py-1 rounded"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                        <div className="w-10 h-10 mx-auto bg-white dark:bg-gray drop-shadow-lg rounded-full text-lg text-white flex items-center">
                            <span className="text-center text-black w-full font-bold">1</span>
                        </div>
                    </div>

                    <div className="p-4 w-56 mx-auto bg-white dark:bg-gray drop-shadow-lg rounded-sm mt-4">
                        <div className="w-full flex flex-col justify-center align-center px-2 py-10 rounded-sm">
                            <p className="text-center">
                                <i className="fa-solid fa-file text-primary text-3xl" />
                            </p>
                            <p className="text-center font-semibold text-lg mt-1.5">Upload Image</p>
                            <p className="text-center text-xs mt-1">
                                Upload or capture the image your input image
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 md:mx-0 mx-auto md:mt-0 mt-10">
                    <div className="relative mb-2">
                        <div
                            className="absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: 'calc(100% - 2rem - 1rem); top: 50%; transform: translate(-50%, -50%)',
                            }}
                        >
                            <div className="w-full bg-gray rounded items-center align-middle align-center flex-1">
                                <div
                                    className="w-0 bg-secondary py-1 rounded"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        <div className="w-10 h-10 mx-auto bg-secondary drop-shadow-lg rounded-full text-lg text-white flex items-center">
                            <span className="text-center text-white w-full font-bold">2</span>
                        </div>
                    </div>

                    <div className="p-4 w-56 mx-auto bg-white dark:bg-gray drop-shadow-lg rounded-sm mt-4">
                        <div className="w-full flex flex-col justify-center align-center px-2 py-8 rounded-sm">
                            <p className="text-center">
                                <i className="fa-solid fa-file text-primary text-3xl" />
                            </p>
                            <p className="text-center font-semibold text-lg mt-1.5">Process</p>
                            <p className="text-center text-xs mt-1">
                                Machine learning algorithm process the image and identify the
                                content
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 md:mx-0 mx-auto md:mt-0 mt-10">
                    <div className="relative mb-2">
                        <div
                            className="absolute flex align-center items-center align-middle content-center"
                            style={{
                                width: 'calc(100% - 2rem - 1rem); top: 50%; transform: translate(-50%, -50%)',
                            }}
                        >
                            <div className="w-full bg-gray rounded items-center align-middle align-center flex-1">
                                <div
                                    className="w-0 bg-secondary py-1 rounded"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        <div className="w-10 h-10 mx-auto bg-white dark:bg-gray drop-shadow-lg rounded-full text-lg text-white flex items-center">
                            <span className="text-center text-black w-full font-bold">3</span>
                        </div>
                    </div>

                    <div className="p-4 w-56 mx-auto bg-white dark:bg-gray drop-shadow-lg rounded-sm mt-4">
                        <div className="w-full flex flex-col justify-center align-center px-2 py-12 rounded-sm">
                            <p className="text-center">
                                <i className="fa-solid fa-file text-primary text-3xl" />
                            </p>
                            <p className="text-center font-semibold text-lg mt-1.5">Output</p>
                            <p className="text-center text-xs mt-1">Show the output to the users</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
