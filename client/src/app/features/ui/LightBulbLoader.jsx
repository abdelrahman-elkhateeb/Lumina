const LightBulbLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background w-full overflow-hidden">
      <svg
        width="150"
        height="150"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bulb Base */}
        <rect x="90" y="140" width="20" height="30" fill="#555" />
        <rect x="85" y="160" width="30" height="10" fill="#777" />

        {/* Light Bulb (Flicker Effect) */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="yellow"
          className="animate-flicker"
        />

        {/* Glow Effect */}
        <circle
          cx="100"
          cy="100"
          r="50"
          fill="yellow"
          className="opacity-10"
        />
      </svg>

      {/* Animated Text */}
      <p className="text-white text-xl mt-4 opacity-0 animate-fadeIn">
        Learn Brighter
      </p>
    </div>
  );
};

export default LightBulbLoader;
