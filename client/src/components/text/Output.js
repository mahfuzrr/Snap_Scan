export default function Output({ resultText }) {
    return (
        <div
            id="text-output"
            className="md:w-3/4 bg-white p-4 mt-16 md:ml-24 border-2 border-bord h-auto drop-shadow-sm"
        >
            <p className="p-0 flex justify-end cursor-pointer">
                <i className="fa-solid fa-download" />
            </p>
            <p className="text-secondary font-medium">Text:</p>
            <p>{resultText}</p>
        </div>
    );
}
