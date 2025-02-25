'use client';
import { useState } from 'react';
import YoutubeVideo from '../youtubeVideo/YoutubeVideo';
import s from './list.module.scss';
import DownloadModal from '../portalModal/downloadModal/DownloadModal';
import { useSearchParams } from 'next/navigation';

type YoutubeItemProps = {
  link: string;
}

const YoutubeItem = ({ link }: YoutubeItemProps) => {
  const searchParams = useSearchParams(); 
  const [videoTime, setVideoTime] = useState(0);
  const [modal, setModal] = useState(false);

  const handleTimeUpdate = (time: number) => {
    setVideoTime(time);
  };

  const onClick = (link: string) => {
    setModal(true);
  }

  return (
    <div className='flex'>
      <div className={s.item}>
        <YoutubeVideo videoId={link} onTimeUpdate={handleTimeUpdate} />
      </div>
      {link !== undefined &&
        <button onClick={() => onClick(link)}>썸네일 다운로드</button>
      }
      {modal &&
        <DownloadModal setOnModal={() => setModal(false)} link={link} />
      }
    </div>
  );
};

export default YoutubeItem;