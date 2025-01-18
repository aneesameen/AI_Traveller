import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
                <p className="mt-4 text-primary font-semibold text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
