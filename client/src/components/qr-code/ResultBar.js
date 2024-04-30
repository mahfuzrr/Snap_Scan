import copy from 'copy-to-clipboard';
import { useState } from 'react';

export default function ResultBar({ result, setResult, setImgUrl, handleCloseCamera }) {
    const [open, setOpen] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copy(result);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <div className={`w-full relative z-10 ${open ? 'visible' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />

            <div className="w-full md:w-1/3 fixed top-1/3 left-0 md:left-2/3 bottom-0 md:right-0 md:top-0 md:min-h-screen bg-white rounded-tl-[30px] rounded-tr-[30px] md:rounded-none">
                <div className="p-5">
                    <h4 className="text-center mt-0 md:mt-8 font-semibold text-[20px]">
                        <span className="before:block before:absolute before:-inset-1 mt-5 md:mt-0 md:ml-10 before:-skew-y-1 px-3 before:bg-another relative inline-block">
                            <span className="relative flex items-center justify-center font-bold text-white">
                                Decoded Result
                            </span>
                        </span>
                    </h4>
                    <div className="mt-10 bg-[#f3f4f6] bg-gradient-to-r shadow-sm py-4 px-5 rounded-sm relative">
                        <span
                            role="presentation"
                            className={`absolute top-0 right-2 cursor-pointer border ${
                                !copied ? 'border-primary' : 'border-[#20bf6b]'
                            } px-2 text-base mt-1 bg-white active:opacity-70 active:scale-95 rounded-sm`}
                            onClick={handleCopy}
                        >
                            {!copied ? (
                                <i className="fa-solid fa-copy text-primary" />
                            ) : (
                                <i className="fa-solid fa-check  text-[#20bf6b]" />
                            )}
                        </span>
                        <p className="mt-4">{result}</p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="fixed top-2 right-2 md:right-1/3 md:top-0 w-10">
                    <button
                        type="button"
                        className="relative w-full flex justify-center rounded-sm py-2 text-gray-300 hover:text-white focus:outline-none transition-all ease-in duration-200 focus:ring-2 focus:ring-white hover:bg-another"
                        onClick={() => {
                            setOpen(false);
                            setResult(null);
                            setImgUrl('');
                            handleCloseCamera();
                        }}
                    >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
