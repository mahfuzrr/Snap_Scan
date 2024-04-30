import copy from 'copy-to-clipboard';
import { useState } from 'react';

export default function Output({ resultText }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copy(resultText);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    return (
        <div
            id="text-output"
            className="md:w-3/4 bg-white p-4 mt-16 md:ml-24 border-2 border-bord h-auto drop-shadow-sm"
        >
            <p
                className="p-0 flex justify-end cursor-pointer"
                role="presentation"
                onClick={handleCopy}
            >
                {/* <i className="fa-solid fa-download" /> */}
                {!copied ? (
                    <i className="fa-regular fa-copy" />
                ) : (
                    <i className="fa-solid fa-check  text-[#20bf6b]" />
                )}
            </p>
            <p className="text-secondary font-medium">Text:</p>
            <p>{resultText}</p>
        </div>
    );
}
