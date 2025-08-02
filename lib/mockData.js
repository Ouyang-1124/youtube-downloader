// 模拟视频数据，用于演示网站功能
export const mockVideoData = {
  title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
  description: "The official video for "Never Gonna Give You Up" by Rick Astley...",
  thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  uploadDate: "2009-10-25",
  fileSize: "约 25.6 MB",
  duration: "3:33",
  viewCount: "1,234,567,890",
  author: "Rick Astley",
  url: ""
};

// 模拟解析函数
export function parseVideoInfo(url) {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve({
        ...mockVideoData,
        url: url
      });
    }, 2000);
  });
}

// 检查是否为有效的YouTube URL
export function isValidYouTubeURL(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
}