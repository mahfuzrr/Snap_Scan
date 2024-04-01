export default function Bug() {
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
                If you find any issue with data, please explain us the problems.
            </p>
            <div className="bg-white drop-shadow-md px-2 py-10 rounded-md md:w-1/2 mx-auto mt-10">
                <form className="flex flex-col px-2 md:px-0 md:w-4/5 mx-auto">
                    <input
                        type="text"
                        className="border-2 border-gray focus:border-primary transition ease px-4 py-2 rounded focus:outline-none"
                        placeholder="Your Name"
                    />
                    <input
                        type="email"
                        className="mt-4 border-2 border-gray focus:border-primary transition ease px-4 py-2 rounded focus:outline-none"
                        placeholder="Your email"
                    />
                    <textarea
                        className="mt-4 border-2 border-gray focus:border-primary px-4 py-2 rounded transition ease focus:outline-none"
                        rows="3"
                        placeholder="Message"
                    />
                    <button
                        type="submit"
                        className="bg-primary mt-4 text-white p-2 font-semibold rounded drop-shadow-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
