import { useEffect, useState } from "react";

function LoadingUpload() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-background-500 text-text">
      {/* Loader Animation */}
      <div className="relative w-16 h-16 bg-primary-500 rotate-[45deg] animate-loader">
        <div className="absolute inset-0 bg-white/70 animate-layerTr"></div>
      </div>

      {/* Uploading Text */}
      <h2 className="mt-6 text-xl font-semibold">Uploading Your Content...</h2>
      <p className="text-sm text-gray-400">Please wait while we process your upload.</p>

      {/* Progress Bar */}
      <div className="w-64 h-2 mt-6 bg-background-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Percentage */}
      <span className="mt-2 text-sm font-medium">{progress}%</span>
    </div>
  );
}

export default LoadingUpload;
