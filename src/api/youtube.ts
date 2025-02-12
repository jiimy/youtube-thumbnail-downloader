import axios from "axios";

// 유튜브 info
export async function youtubeInfoApi(id: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data.items.length > 0) {
      return response.data.items[0];
    } else {
      console.error("No video found");
    }
  } catch (err) {
    console.error("테스트 실패", err);
  }
}

// 유튜브 정보 추출
export async function fetchVideoInfo(id: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`;

  try {
    const response = await axios.get(url);
    if (response.data.items.length > 0) {
      return response.data.items[0];
    } else {
      console.error("No video found");
    }
  } catch (err) {
    console.error("유튜브 정보 추출 실패", err);
  }
}

// 유튜브 채널 정보 추출
// export async function fetchChannelInfo(id: string) {
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
//     );
//     return response.data.items[0];
//   } catch (err) {
//     console.error(err);
//   }
// }

// 비디오의 채널 프로필 이미지 가져오기
// export async function getChannelProfileImage(videoId: string) {
//   const videoInfo = await fetchVideoInfo(videoId);
//   if (videoInfo) {
//     const channelId = videoInfo.snippet.channelId;
//     const channelInfo = await fetchChannelInfo(channelId);
//     if (channelInfo) {
//       return channelInfo.snippet.thumbnails.default.url;
//     }
//   }
//   return null;
// }

// 외부 파일 다운로드
export async function downloadApi(url: string, key: string) {
  console.log("url", url);
  try {
    // 서버에서 이미지를 받아오기
    const response = await axios.get(
      `/api/thumbnail/?url=${encodeURIComponent(url)}&key=${key}`,
      {
        responseType: "blob"
      }
    );

    const blob = response.data;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${key}-size.jpg`; // 다운로드할 파일명
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("이미지 다운로드 실패:", error);
    alert("이미지 다운로드에 실패했습니다.");
  }
}

// 여러개 한번에 
export async function downloadMultiApi(urls: string[], keys: string[]) {
  console.log("urls", urls);
  try {
    // 각 URL에 대한 axios 요청을 생성
    const requests = urls.map((url, index) =>
      axios.get(`/api/thumbnail/?url=${encodeURIComponent(url)}&key=${keys[index]}`, {
        responseType: "blob"
      })
    );

    // 모든 요청을 병렬로 처리
    const responses = await Promise.all(requests);

    // 각 파일을 다운로드
    responses.forEach((response, index) => {
      const blob = response.data;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${keys[index]}-size.jpg`; // 각 파일마다 고유한 파일명
      link.click();
      URL.revokeObjectURL(link.href);
    });
  } catch (error) {
    console.error("이미지 다운로드 실패:", error);
    alert("이미지 다운로드에 실패했습니다.");
  }
}
