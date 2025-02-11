'use client';
import Link from 'next/link';
import { useState } from 'react';
import YoutubeVideo from '../youtubeVideo/YoutubeVideo';
import s from './list.module.scss';

type YoutubeItemProps = {
  link: string;
}

const YoutubeItem = ({ link }: YoutubeItemProps) => {
  const [videoTime, setVideoTime] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setVideoTime(time);
  };

  return (
    <div className='flex'>
      <div className={s.item}>
        <YoutubeVideo videoId={link} onTimeUpdate={handleTimeUpdate} />
      </div>
      {link !== undefined &&
        <Link href={`/thumbnail/${link}`}>썸네일 다운로드</Link>
      }
    </div>
  );
};

export default YoutubeItem;