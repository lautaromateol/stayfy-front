const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-stone-400 dark:bg-gray-900 h-full">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-indigo-600 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 text-lg mb-8">The page you are looking for doesn't exist.</p>
                <img
                    src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697176826/7893954_txx9is.png" // Replace with your image path
                    alt="Error 404"
                    className="w-64 h-64 mx-auto mb-6"
                />
                <p className="text-gray-600 text-lg">Oops! Something went wrong.</p>
            </div>
        </div>
    );
};

export default NotFound;
