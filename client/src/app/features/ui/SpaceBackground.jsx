function SpaceBackground() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    duration: `${Math.random() * 10 + 5}s`, // Random duration between 5s - 15s
  }));

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="w-[2px] h-[2px] bg-white absolute opacity-60 animate-falling"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.duration
          }}
        ></div>
      ))}
    </div>
  );
}

export default SpaceBackground;
