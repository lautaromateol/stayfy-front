const NoPermissions = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-400 dark:bg-gray-900 h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">403 - Access Denied</h1>
          <p className="text-gray-600 text-lg mb-8">You do not have permission to access this page.</p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/error-403-4190274-3468591.png"
            alt="Error 403"
            className="w-90 h-64 mx-auto mb-6"
          />
          <p className="text-gray-600 text-lg">Oops! Something went wrong.</p>
        </div>
      </div>
    );
  };
  
  export default NoPermissions;  
