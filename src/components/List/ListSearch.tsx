'use client';
import { downloadApi, downloadMultiApi, youtubeInfoApi, youtubeSearchApi, youtubeSearchProfileApi } from '@/api/youtube';
import Image from 'next/image';
import React from 'react';
import s from './list.module.scss';
import YoutubeItem from './YoutubeItem';
import Loading from '../loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
// 검색 유형 = '동영상 검색', | '썸네일 검색'에따라 리스트의 ui가 달라짐.

type ListProps = {
  link: string;
  modalLink?: string;
}

const ListSearch = ({ link, modalLink }: ListProps) => {
  const params = useSearchParams();
  const type = params.get('type');

  console.log('cc', type, link);

  const { data, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: Boolean(link) && type === 'thumbnail' || Boolean(modalLink)
  });

  // 유튜브 검색 api
  const { data: youtubeList, isSuccess: listSuccess, isLoading: youtubeListLoading } = useQuery({
    queryFn: () => youtubeSearchApi(link),
    queryKey: ['youtubeList', link],
    enabled: Boolean(link) && type === 'video'
  })

  const { data: youtubeProfile, isSuccess: youtubeProfileS, isLoading: youtubeProfileLoading } = useQuery({
    queryFn: () => youtubeSearchProfileApi(link),
    queryKey: ['youtubeProfile', link],
    enabled: Boolean(link) && type === 'video'
  })

  return (
    <div>
      {(youtubeInfoLoading || youtubeListLoading || youtubeProfileLoading) && <Loading />}
      {listSuccess && youtubeProfileS &&
        <>
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
        </>
      }
      {data &&
        <>
          <div className={s.title}>
            <h1>{data.snippet?.title} - {data.snippet?.channelTitle}</h1>
          </div>
          <button
            className={s.download_btn}
            onClick={() => {
              const urls = Object.values(data.snippet?.thumbnails).map((thumb: any) => thumb.url);
              const keys = Object.keys(data.snippet?.thumbnails);
              downloadMultiApi(urls, keys);
            }}
          >
            모든 썸네일 다운로드
          </button>
          <div className={s.thumnail_list}>
            {Object.entries(data?.snippet?.thumbnails).map(([key, value]) => {
              const thumbnail = value as { url: string; width: number; height: number };
              return (
                <div key={key} className="mb-12">
                  <div className="flex gap-16">
                    <div className={s.img_wrap}>
                      <Image src={thumbnail.url} alt={key} width={thumbnail.width} height={thumbnail.height} />
                    </div>
                    <div className="text-left">
                      <p> {thumbnail.width} * {thumbnail.height} {key}</p>
                      <button className={s.download_btn} onClick={() => downloadApi(thumbnail.url, key)}>다운로드 받기</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>}
    </div>
  );
};

export default ListSearch;