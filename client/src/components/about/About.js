import { Link } from 'react-router-dom';
import aboutBg from '../../assets/about-bg.jpg';

export default function About() {
    return (
        <div
            id="about-body"
            className="pt-4 pl-4 pr-4 pb-12 md:ml-60 bg-bodybg min-h-screen mb-10 md:mb-0"
        >
            {/* <div className="w-full bg-test">
                <span className="absolute right-16 md:right-24 top-7 cursor-pointer">
                    <i className="fa-solid fa-sun shadow-md rounded-full" />
                </span>
            </div> */}
            <div className="w-full md:flex md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2">
                    <img src={aboutBg} alt="about" className="pointer-events-none select-none " />
                </div>
                <div className="w-full md:w-1/2 md:ml-6">
                    <p className="bg-primary text-white w-40 text-center rounded-tl-lg rounded-br-lg py-3 text-[18px] shadow-sm font-mono">
                        SnapScan
                    </p>
                    <p className="mt-6 text-justify">
                        SnapScan is a web application for extracting text from an image and other QR
                        code solutions. You can upload or capture an image to extract the text from
                        that image. Output will be depended of your image quality. More high
                        quality, More accuracy.Scan any QR code and it will give the extracted
                        output. It will also generate QR code for you
                    </p>
                    <p className="mt-8 text-sm">
                        © Developed By{' '}
                        <Link
                            to="https://linkedin.com/in/maahfuz"
                            className="underline decoration-solid decoration-2 decoration-[#6366f1]"
                            target="_blank"
                        >
                            Mahfuzur Rahman
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
