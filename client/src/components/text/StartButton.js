import cancelSvg from '../../assets/cancel.svg';

export default function StartButton({ isLoading, handleSubmit, setImgUrl, setImageDataURL, show }) {
    return (
        <div className="flex justify-center md:justify-start md:ml-10 mt-5 px-0 md:px-14">
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
            {show && (
                <button
                    type="button"
                    className="bg-warn px-3 py-2 rounded-sm text-white text-sm font-semibold flex justify-between items-center ml-3 transition-all ease-in active:scale-90"
                    onClick={() => {
                        setImgUrl('');
                        setImageDataURL(null);
                    }}
                >
                    <img src={cancelSvg} alt="cancel" className="w-4 h-4 mr-1" /> Cancel
                </button>
            )}
        </div>
    );
}
