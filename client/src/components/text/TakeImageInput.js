export default function TakeImageInput({ imgURL, handleUpload, initializeMedia }) {
    return (
        <div className="w-full mt-8 flex flex-col items-center md:flex-row">
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

            <span className="before:block before:absolute before:-inset-1 mt-5 md:mt-0 md:ml-10 before:-skew-y-3 px-3 before:bg-another relative inline-block">
                <span className="relative flex items-center justify-center font-bold text-white">
                    OR
                </span>
            </span>
            <div className="mt-5 md:mt-0 md:ml-10">
                <button
                    type="button"
                    className="bg-primary px-6 py-2.5 text-white rounded-sm drop-shadow-sm"
                    onClick={initializeMedia}
                >
                    <i className="fa-solid fa-camera mr-2" /> Open Camera
                </button>
            </div>
        </div>
    );
}
