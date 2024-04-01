export default function About() {
    return (
        <div id="about-body" className="pt-4 pl-4 pr-4 pb-12 md:ml-60 bg-bodybg min-h-screen">
            <div className="w-full bg-test">
                <span className="absolute right-16 md:right-24 top-7 cursor-pointer">
                    <i className="fa-solid fa-sun shadow-md rounded-full" />
                </span>
            </div>

            <div className="mt-24 px-6 py-4 bg-white md:w-1/2 md:mx-auto drop-shadow-lg rounded-md">
                <span className="flex inline-block justify-end">
                    <i className="fa-solid fa-circle-info" />
                </span>
                <div>
                    <p className="font-semibold">OCR Tool:</p>
                    <p className="text-sm text-justify">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ipsa
                        possimus ratione unde laborum. Nemo nisi minima, omnis, eius voluptatibus
                        quisquam quas vero beatae in natus delectus iure quam excepturi fuga
                        consequatur ipsum, ipsam voluptas quo recusandae accusamus quae tenetur.
                        Similique exercitationem eaque tenetur eum vitae ut placeat, cupiditate rem.
                    </p>
                    <p className="font-semibold mt-3">Developed By</p>
                    <p className="text-sm font-base">Mahfuzur Rahman</p>
                </div>
            </div>
        </div>
    );
}
