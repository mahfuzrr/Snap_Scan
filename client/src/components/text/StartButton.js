export default function StartButton({ isLoading, handleSubmit }) {
    return (
        <div className="md:ml-10 mt-5 px-12 md:px-14">
            <button
                type="button"
                className={`px-3 py-2 text-sm font-semibold shadow-md rounded-sm bg-primary text-white transition-all ease-in active:scale-90
                    ${isLoading && 'opacity-60'}`}
                onClick={handleSubmit}
                disabled={isLoading}
            >
                <i className={`fa-solid fa-gear ${isLoading && 'animate-spin'}`} />
                {!isLoading ? ' Start OCR' : ' Loading...'}
            </button>
        </div>
    );
}
