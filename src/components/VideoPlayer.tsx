import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, autoplay = false }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        autoplay,
        controls: true,
        responsive: true,
        fluid: true,
        poster,
        liveui: true,
        sources: [{
          src,
          type: 'application/x-mpegURL'
        }]
      }, () => {
        console.log('player is ready');
      });
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.src({ src, type: 'application/x-mpegURL' });
    }
  }, [src, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <div ref={videoRef} />
    </div>
  );
};
