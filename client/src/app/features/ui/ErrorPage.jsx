const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background w-full overflow-hidden">
      <svg
        width="150"
        height="150"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        {/* Bulb Base */}
        <rect x="90" y="140" width="20" height="30" fill="#555" />
        <rect x="85" y="160" width="30" height="10" fill="#777" />

        {/* Dimmed Light Bulb (No Power) */}
        <circle cx="100" cy="100" r="40" fill="#888" className="opacity-50" />

        {/* Crack (Broken Effect) */}
        <path
          d="M90 70 L110 85 L95 100 L105 115 L90 130"
          stroke="black"
          strokeWidth="3"
          fill="none"
        />

        {/* Weak Glow (Barely Visible) */}
        <circle cx="100" cy="100" r="50" fill="#888" className="opacity-5" />
      </svg>

      {/* Error Message */}
      <p className="text-white text-2xl mt-4 font-bold">
        Oops! No Power...
      </p>
      <p className="text-gray-400 text-lg mt-2">
        Looks like something went wrong. Try refreshing the page.
      </p>
    </div>
  );
};

export default ErrorPage;
