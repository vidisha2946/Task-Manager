import React from 'react';
import navImage from './nav.png';

const Navbar = ({ progress }) => {
    return (
        <nav className="p-4 shadow-lg bg-cover bg-no-repeat" style={{ backgroundImage: `url(${navImage})`, height: '100px' }}>
            <div className="flex justify-between items-center h-full">
                <h1 className="text-purple-800 p-3 text-2xl font-serif font-bold">Task Manager</h1>
                <div className="w-1/2 mx-4">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block text-purple-800 uppercase px-2 py-1 leading-none bg-white rounded-full shadow-sm">
                                    Progress
                                </span>
                            </div>
                            <div>
                                <span className="text-xs font-semibold inline-block text-purple-800">
                                    {progress}% Completed
                                </span>
                            </div>
                        </div>
                        <div className="flex h-2 mb-4 bg-indigo-300 rounded">
                            <div
                                className={`h-full rounded ${progress >= 100 ? 'bg-indigo-600' : 'bg-indigo-700'}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
