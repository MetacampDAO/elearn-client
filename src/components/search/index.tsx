import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [certificateId, setCertificateId] = useState<string>();
    return (
        <div className="flex flex-col md:pt-6 px-4 md:px-20">
            <h3>Modify managers permissions</h3>
            <p>Click on individual users' permission cells to toggle on and off</p>
            <div className="w-full md:w-7/12 flex items-center mt-6">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Specify certificate ID..."
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        required
                    />
                </div>
                <Link to={`/certificate/${certificateId}`} className="w-1/4 text-center md:w-1/6 inline-block items-center rounded-lg bg-sky-300 py-2.5 px-3 ml-2 text-sm font-semibold text-slate-900 hover:bg-sky-200 active:bg-sky-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50">
                    <a >
                        Search
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Search;
