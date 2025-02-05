import { youtubeInfoApi } from "@/api/youtube";
import { useQuery } from "@tanstack/react-query";

export function useGetYoutubeInfoLink(Link: string) {
  console.log('use LInke', Link);
  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(Link),
    queryKey: ["youtubeLink", Link],
    enabled: Boolean(Link),
  });

  const playTime = youtubeInfo?.contentDetails?.duration;
  const title = youtubeInfo?.snippet?.title;
  const channelTitle = youtubeInfo?.snippet?.channelTitle;
  const thumbNail = youtubeInfo?.snippet?.thumbnails;

  return { playTime, title, channelTitle, thumbNail, youtubeInfoLoading };
}
