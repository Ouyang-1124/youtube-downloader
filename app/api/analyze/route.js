import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: '缺少视频URL' },
        { status: 400 }
      );
    }

    // 验证YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: '无效的YouTube URL' },
        { status: 400 }
      );
    }

    // 获取视频信息
    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;

    // 格式化数据
    const formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const formatNumber = (num) => {
      return new Intl.NumberFormat('zh-CN').format(num);
    };

    const formatFileSize = (formats) => {
      // 尝试获取最高质量视频的文件大小估算
      const videoFormat = formats.filter(f => f.hasVideo && f.hasAudio)[0];
      if (videoFormat && videoFormat.contentLength) {
        const sizeInMB = (parseInt(videoFormat.contentLength) / (1024 * 1024)).toFixed(1);
        return `约 ${sizeInMB} MB`;
      }
      return '大小未知';
    };

    const formatDate = (publishDate) => {
      try {
        const date = new Date(publishDate);
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      } catch {
        return '日期未知';
      }
    };

    // 构建返回数据
    const videoInfo = {
      title: videoDetails.title || '标题未知',
      description: videoDetails.description || '暂无描述',
      thumbnail: videoDetails.thumbnails?.[videoDetails.thumbnails.length - 1]?.url || '',
      uploadDate: formatDate(videoDetails.publishDate),
      fileSize: formatFileSize(info.formats),
      duration: formatDuration(parseInt(videoDetails.lengthSeconds) || 0),
      viewCount: formatNumber(parseInt(videoDetails.viewCount) || 0),
      author: videoDetails.author?.name || '作者未知',
      url: url,
    };

    return NextResponse.json(videoInfo);

  } catch (error) {
    console.error('分析视频错误:', error);
    
    let errorMessage = '解析视频失败';
    if (error.message.includes('Video unavailable')) {
      errorMessage = '视频不可用或已被删除';
    } else if (error.message.includes('private')) {
      errorMessage = '视频为私有，无法访问';
    } else if (error.message.includes('blocked')) {
      errorMessage = '视频在当前地区不可用';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// 处理OPTIONS请求（CORS预检）
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}