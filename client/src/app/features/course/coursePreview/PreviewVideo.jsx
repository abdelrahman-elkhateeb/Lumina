import Heading from "../../ui/Heading";

function PreviewVideo({ previewVideo }) {

  return (
    <section className="">
      <Heading img="/public/assets/spaceMan(1).svg" title={"video preview :"} />
      <div className="flex-1 w-full shadow-lg rounded-2xl overflow-hidden">
        {/* <ReactPlayer url={previewVideo} className="w-full rounded-2xl" /> */}
        <video
          src={previewVideo}
          controlsList="nodownload noplaybackrate"
          controls
          className="w-full rounded-2xl"
        ></video>
      </div>
    </section>
  )
}

export default PreviewVideo;

// import { useState } from 'react';
// import ReactPlayer from 'react-player';
// import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// function PreviewVideo({ previewVideo }) {
//   const [playing, setPlaying] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const togglePlay = () => setPlaying(!playing);
//   const toggleMute = () => setMuted(!muted);

//   const handleProgress = (state) => {
//     setProgress(state.played * 100);
//   };

//   return (
//     <div className="relative flex-1 w-full shadow-lg rounded-2xl overflow-hidden">
//       <ReactPlayer
//         url={previewVideo}
//         playing={playing}
//         muted={muted}
//         onProgress={handleProgress}
//         width="100%"
//         height="100%"
//         className="rounded-2xl"
//       />

//       {/* Custom Controls */}
//       <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 p-3 rounded-lg">

//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="text-white p-2 rounded-full hover:bg-gray-700 transition">
//           {playing ? <Pause size={20} /> : <Play size={20} />}
//         </button>

//         {/* Progress Bar */}
//         <div className="flex-1 mx-3 h-2 bg-gray-300 rounded-full overflow-hidden">
//           <div
//             style={{ width: `${progress}%` }}
//             className="h-full bg-site-accent transition-all duration-200"
//           />
//         </div>

//         {/* Mute/Unmute Button */}
//         <button
//           onClick={toggleMute}
//           className="text-white p-2 rounded-full hover:bg-gray-700 transition">
//           {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PreviewVideo;
