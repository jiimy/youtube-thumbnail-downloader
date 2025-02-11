'use client';
import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image';
import s from './youtubevideo.module.scss';
import { useGetYoutubeInfoLink } from '@/hooks/useGetYoutubeInfo';

const YoutubeVideo = ({ videoId, onTimeUpdate }: { videoId: string; onTimeUpdate?: (time: number) => void; }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const { playTime } = useGetYoutubeInfoLink(videoId);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      mute: 1,
      modestbranding: 1,
      loop: 1,
      fs: 0,
    },
  };
  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const player = playerRef.current;
        const currentTime = player.getCurrentTime();
        onTimeUpdate?.(currentTime);
      }
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onReady = (event: any) => {
    const player = event.target;
    playerRef.current = player;

    startInterval();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (playerRef.current) {
      const player = playerRef.current;
      player.playVideo();
    }
  };

  useEffect(() => {
    return () => stopInterval(); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const playTimeConvert = (time: any) => {
    // Match ISO 8601 duration format (PT#H#M#S)
    const match = time?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) return "Invalid format";

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    const timeString = [
      hours > 0 ? hours : null,
      hours > 0 || minutes > 0 ? String(minutes).padStart(2, "0") : "0",
      String(seconds).padStart(2, "0")
    ]
      .filter((part) => part !== null)
      .join(":");

    return timeString;
  }

  return (
    <div className={classNames([s.youtube_wrap], {})}>
      {!isPlaying ? (
        <>
          <span className={s.time}>{playTimeConvert(playTime)}</span>
          <div className={s.youtube_thumbnail} onClick={handlePlay}>
            <Image src={thumbnailUrl} alt="YouTube Thumbnail" fill />
          </div>
        </>
      ) : (
        <>
          <YouTube
            videoId={videoId}
            opts={videoOptions}
            onReady={onReady}
          />
        </>
      )}
    </div>
  );
};

export default YoutubeVideo;
