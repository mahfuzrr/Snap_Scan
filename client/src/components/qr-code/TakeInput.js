export default function TakeInput({ imgURL, handleUpload }) {
    return (
        <div className="bg-white w-full md:w-1/4 py-6 rounded-sm drop-shadow-md">
            <div className="flex items-center w-full justify-center">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center w-4/5 justify-center border-2 border-primary border-dashed rounded-sm cursor-pointer bg-dropbox dark:bg-gray-700 dark:border-white"
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
                            <span className="bg-primary px-6 py-1 mt-2 rounded-sm drop-shadow-sm text-sm text-white">
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
    );
}
