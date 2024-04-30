import axios from 'axios';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast, { Toaster } from 'react-hot-toast';

export default function Bug() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const recaptchaRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqObejct = {
            name,
            email,
            message,
        };
        const captchaValue = recaptchaRef.current.getValue();
        if (!captchaValue) {
            toast.error('Please verify the reCAPTCHA!', {
                position: 'top-right',
            });
            return;
        }

        setIsLoading(true);

        const captchaValidate = await axios.post(
            'https://snap-scan-server.onrender.com/api/verify-captcha',
            {
                captchaValue,
            }
        );

        if (captchaValidate?.data?.message?.success) {
            const data = await axios.post(
                'https://snap-scan-server.onrender.com/api/report-bug',
                reqObejct
            );
            if (data?.data?.success) {
                toast.success(data?.data?.message, {
                    position: 'top-right',
                });
            } else if (!data?.data?.success) {
                toast.error(data?.data?.message, {
                    position: 'top-right',
                });
            }
            setName('');
            setEmail('');
            setMessage('');
        } else {
            toast.error('Captcha validation is wrong!', {
                position: 'top-right',
            });
        }

        setIsLoading(false);
    };
    return (
        <div id="bug-body" className="pt-4 pl-4 pr-4 pb-12 md:ml-60 bg-bodybg min-h-screen">
            <Toaster />

            <p className="mt-6 text-center font-semibold text-2xl">
                <i className="fa-solid fa-bug text-md text-red" /> Report Bugs
            </p>
            <p className="mt-2 text-center text-md">
                If you find any issue with data, please explain the problem.
            </p>
            <div className="bg-white drop-shadow-md px-2 py-10 rounded-sm md:w-1/2 mx-auto mt-10">
                <form
                    className="flex flex-col px-2 md:px-0 md:w-4/5 mx-auto"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="border-2 border-gray focus:border-primary transition ease px-4 py-2 rounded-sm focus:outline-none"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="mt-4 border-2 border-gray focus:border-primary transition ease px-4 py-2 rounded-sm focus:outline-none"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        className="mt-4 border-2 border-gray focus:border-primary px-4 py-2 rounded-sm transition ease focus:outline-none"
                        rows="3"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <ReCAPTCHA
                        className="mt-5"
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_SITE_KEY}
                    />
                    <button
                        type="submit"
                        className={`bg-primary mt-4 text-white p-2 font-semibold rounded-sm drop-shadow-lg active:scale-95 ${
                            isLoading && 'opacity-60 cursor-not-allowed'
                        }`}
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
