import { useState } from 'react';

export default function Bug() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const reqObejct = {
            name,
            email,
            message,
        };
        console.log(reqObejct);
    };
    return (
        <div id="bug-body" className="pt-4 pl-4 pr-4 pb-12 md:ml-60 bg-bodybg min-h-screen">
            <div className="w-full bg-test">
                <span className="absolute right-16 md:right-24 top-7 cursor-pointer">
                    <i className="fa-solid fa-sun shadow-md rounded-full" />
                </span>
            </div>

            <p className="mt-16 text-center font-semibold text-2xl">
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
                    <button
                        type="submit"
                        className="bg-primary mt-4 text-white p-2 font-semibold rounded-sm drop-shadow-lg active:scale-95"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
