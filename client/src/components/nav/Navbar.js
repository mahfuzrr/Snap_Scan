/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ocrLogo from '../../assets/ocr-tool.svg';

export default function Navbar() {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.pathname);
    }, []);

    return (
        <nav
            id="Sidebar"
            className="fixed bottom-0 md:top-0 md:left-0 z-40 md:w-60 w-full bg-nav md:h-screen"
        >
            <div className="h-full py-4 overflow-y-auto bg-nav">
                <Link to="/" className="md:flex md:items-center pl-3 mb-5 ml-6 hidden">
                    <img src={ocrLogo} className="w-6 mr-2 sm:h-7" alt="Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        <span className="text-primary">Snap</span>Scan
                    </span>
                </Link>

                <ul className="md:space-y-2 mt-0 md:pr-4 md:mt-12 flex justify-center align-center md:flex-col">
                    <li className="text-center rounded-lg flex items-center group/item ">
                        <p
                            className={`w-1 bg-primary py-4 invisible md:group-hover/item:visible ${
                                url === '/' && 'md:visible'
                            } rounded-r-sm`}
                        />
                        <Link
                            to="/"
                            className={`hover:bg-primary ${
                                url === '/' && 'bg-primary text-white'
                            } transition ease-in w-full flex flex-col md:flex-row hover:text-white rounded-sm ml-4 items-center py-2 px-3 text-base font-medium text-navcol dark:text-white dark:hover:bg-gray-700`}
                        >
                            <i className="fa-solid fa-camera" />
                            <span className="ml-6 md:inline hidden">Text</span>
                        </Link>
                    </li>

                    <li className="text-center rounded-lg flex items-center group/item ">
                        <p
                            className={`w-1 bg-primary py-4 invisible md:group-hover/item:visible ${
                                url === '/qr-code' && 'md:visible'
                            } rounded-r-sm`}
                        />
                        <Link
                            to="/qr-code"
                            className={`hover:bg-primary ${
                                url === '/qr-code' && 'bg-primary text-white'
                            } transition ease-in w-full flex flex-col md:flex-row hover:text-white rounded-sm ml-4 items-center py-2 px-3 text-base font-medium text-navcol dark:text-white dark:hover:bg-gray-700`}
                        >
                            <i className="fa-solid fa-qrcode" />
                            <span className="ml-6 md:inline hidden">QR Code</span>
                        </Link>
                    </li>

                    <li className="text-center rounded-lg flex items-center group/item ">
                        <p
                            className={`w-1 bg-primary py-4 invisible md:group-hover/item:visible ${
                                url === '/how-works' && 'md:visible'
                            } rounded-r-sm`}
                        />
                        <Link
                            to="/how-works"
                            className={`hover:bg-primary ${
                                url === '/how-works' && 'bg-primary text-white'
                            } transition ease-in w-full flex flex-col md:flex-row hover:text-white rounded-sm ml-4 items-center py-2 px-3 text-base font-medium text-navcol dark:text-white dark:hover:bg-gray-700`}
                        >
                            <i className="fa-solid fa-gear" />
                            <span className="ml-6 md:inline hidden">How it works</span>
                        </Link>
                    </li>

                    <li className="text-center rounded-lg flex items-center group/item ">
                        <p
                            className={`w-1 bg-primary py-4 invisible md:group-hover/item:visible ${
                                url === '/report' && 'md:visible'
                            } rounded-r-sm`}
                        />
                        <Link
                            to="/report"
                            className={`hover:bg-primary ${
                                url === '/report' && 'bg-primary text-white'
                            } transition ease-in w-full flex flex-col md:flex-row hover:text-white rounded-sm ml-4 items-center py-2 px-3 text-base font-medium text-navcol dark:text-white dark:hover:bg-gray-700`}
                        >
                            <i className="fa-solid fa-flag" />
                            <span className="ml-6 md:inline hidden">Report Bugs</span>
                        </Link>
                    </li>

                    <li className="text-center flex items-center group/item ">
                        <p
                            className={`w-1 bg-primary py-4 invisible md:group-hover/item:visible ${
                                url === '/about' && 'md:visible'
                            } rounded-r-sm`}
                        />
                        <Link
                            to="/about"
                            className={`hover:bg-primary ${
                                url === '/about' && 'bg-primary text-white'
                            } transition ease-in w-full flex flex-col md:flex-row hover:text-white rounded-sm ml-4 items-center py-2 px-3 text-base font-medium text-navcol dark:text-white dark:hover:bg-gray-700`}
                        >
                            <i className="fa-solid fa-circle-info" />
                            <span className="ml-6 md:inline hidden">About</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
