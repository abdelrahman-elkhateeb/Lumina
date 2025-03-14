function VideoPlayer({ videoUrl }) {
  return (
    <section>
      <video src={videoUrl} className="w-full" controlsList="nodownload noplaybackrate"
        controls></video>
    </section>
  )
}

export default VideoPlayer
