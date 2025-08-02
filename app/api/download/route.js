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

    // 选择最佳格式（带音频和视频的最高质量）
    const format = ytdl.chooseFormat(info.formats, { 
      quality: 'highestvideo',
      filter: 'audioandvideo'
    });

    if (!format) {
      return NextResponse.json(
        { error: '找不到合适的视频格式' },
        { status: 400 }
      );
    }

    // 创建视频流
    const videoStream = ytdl(url, { format: format });
    
    // 创建ReadableStream来处理视频数据
    const stream = new ReadableStream({
      start(controller) {
        videoStream.on('data', (chunk) => {
          controller.enqueue(chunk);
        });

        videoStream.on('end', () => {
          controller.close();
        });

        videoStream.on('error', (error) => {
          console.error('视频流错误:', error);
          controller.error(error);
        });
      }
    });

    // 返回视频流响应
    return new Response(stream, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(videoDetails.title)}.mp4"`,
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('下载视频错误:', error);
    
    let errorMessage = '下载视频失败';
    if (error.message.includes('Video unavailable')) {
      errorMessage = '视频不可用或已被删除';
    } else if (error.message.includes('private')) {
      errorMessage = '视频为私有，无法下载';
    } else if (error.message.includes('blocked')) {
      errorMessage = '视频在当前地区不可用';
    } else if (error.message.includes('timeout')) {
      errorMessage = '下载超时，请稍后重试';
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