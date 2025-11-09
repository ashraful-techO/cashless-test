const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-9xl text-primary">404</p>
        <p className="text-xl font-medium">Page Not Found</p>
        <p className="mt-2">
          Oops! the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
