import spinnerImage from "../../../public/images/spinning-loading.gif";

const Spinner = () => {
  return (
    <div className="relative min-h-screen bg-gray-300">
      <img
        src={spinnerImage}
        alt="Loading..."
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
      />
    </div>
  );
};

export { Spinner };
