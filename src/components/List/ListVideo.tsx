import Image from 'next/image';
import React from 'react';
import s from './list.module.scss';
import YoutubeItem from './YoutubeItem';
import { useQuery } from '@tanstack/react-query';
import { youtubeSearchApi, youtubeSearchProfileApi } from '@/api/youtube';

type ListProps = {
  link: string,
}

const ListVideo = ({link}: ListProps) => {

  // 유튜브 검색 api
  const { data: youtubeList, isSuccess: listSuccess, isLoading: youtubeListLoading } = useQuery({
    queryFn: () => youtubeSearchApi(link),
    queryKey: ['youtubeList', link],
    enabled: Boolean(link)
  })

  const { data: youtubeProfile, isSuccess: youtubeProfileS, isLoading: youtubeProfileLoading } = useQuery({
    queryFn: () => youtubeSearchProfileApi(link),
    queryKey: ['youtubeProfile', link],
    enabled: Boolean(link)
  })

  return (
    <div>
      <div className={s.title}>
        <div className={s.img_wrap}>
          <Image
            src={youtubeProfile[0]?.snippet?.thumbnails?.high?.url}
            alt="thumbnail"
            width={160}
            height={160}
          />
        </div>
        <span>
          {youtubeProfile[0]?.snippet?.channelTitle}
        </span>
      </div>
      {youtubeList?.map((item: any, i: number) => {
        if (item?.id?.videoId !== undefined) {
          return <YoutubeItem link={item?.id?.videoId} key={i} />
        }
      })}
    </div>
  );
};

export default ListVideo;