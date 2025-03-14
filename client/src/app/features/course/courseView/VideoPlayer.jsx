function VideoPlayer({ videoUrl }) {
  return (
    <section>
      <video src={videoUrl} controlsList="nodownload noplaybackrate"
        controls></video>
    </section>
  )
}

export default VideoPlayer
