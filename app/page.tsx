'use client'

import { useState, useEffect } from 'react'
import VideoAnalyzer from '@/components/VideoAnalyzer'
import VideoInfoDisplay from '@/components/VideoInfoDisplay'
import DownloadProgress from '@/components/DownloadProgress'
import HistoryPanel from '@/components/HistoryPanel'

export interface VideoInfo {
  title: string
  description: string
  thumbnail: string
  uploadDate: string
  fileSize: string
  duration: string
  viewCount: string
  author: string
  url: string
}

export interface DownloadRecord {
  id: string
  title: string
  url: string
  downloadDate: string
  status: 'completed' | 'failed'
  fileSize: string
}

export default function Home() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloadHistory, setDownloadHistory] = useState<DownloadRecord[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('downloadHistory')
    if (savedHistory) {
      setDownloadHistory(JSON.parse(savedHistory))
    }
  }, [])

  // 保存历史记录
  const saveToHistory = (record: DownloadRecord) => {
    const newHistory = [record, ...downloadHistory].slice(0, 10) // 保持最近10条记录
    setDownloadHistory(newHistory)
    localStorage.setItem('downloadHistory', JSON.stringify(newHistory))
  }

  // 解析视频信息（使用模拟数据用于演示）
  const handleAnalyzeVideo = async (url: string) => {
    setIsAnalyzing(true)
    setVideoInfo(null)
    
    try {
      // 动态导入模拟数据模块
      const { parseVideoInfo, isValidYouTubeURL } = await import('../lib/mockData')
      
      if (!isValidYouTubeURL(url)) {
        throw new Error('无效的YouTube URL')
      }
      
      const data = await parseVideoInfo(url)
      setVideoInfo(data)
    } catch (error) {
      console.error('解析视频出错:', error)
      alert('解析视频失败，请检查URL是否正确')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // 下载视频（模拟下载用于演示）
  const handleDownloadVideo = async () => {
    if (!videoInfo) return
    
    setIsDownloading(true)
    setDownloadProgress(0)
    
    try {
      // 模拟下载进度
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 300)
      
      // 模拟下载时间
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 完成下载
      clearInterval(progressInterval)
      setDownloadProgress(100)
      
      // 保存到历史记录
      const record: DownloadRecord = {
        id: Date.now().toString(),
        title: videoInfo.title,
        url: videoInfo.url,
        downloadDate: new Date().toLocaleString('zh-CN'),
        status: 'completed',
        fileSize: videoInfo.fileSize
      }
      saveToHistory(record)
      
      alert('演示下载完成！在真实环境中，视频文件会下载到您的设备。')
    } catch (error) {
      console.error('下载出错:', error)
      alert('下载失败，请稍后重试')
      
      // 保存失败记录
      if (videoInfo) {
        const record: DownloadRecord = {
          id: Date.now().toString(),
          title: videoInfo.title,
          url: videoInfo.url,
          downloadDate: new Date().toLocaleString('zh-CN'),
          status: 'failed',
          fileSize: videoInfo.fileSize
        }
        saveToHistory(record)
      }
    } finally {
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 页面标题 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          YY的YouTube视频下载
        </h1>
        <p className="text-gray-600 text-lg">
          简单易用的YouTube视频下载工具
        </p>
      </div>

      {/* 视频分析器 */}
      <VideoAnalyzer 
        onAnalyze={handleAnalyzeVideo}
        isAnalyzing={isAnalyzing}
      />

      {/* 视频信息展示 */}
      {videoInfo && (
        <VideoInfoDisplay 
          videoInfo={videoInfo}
          onDownload={handleDownloadVideo}
          isDownloading={isDownloading}
        />
      )}

      {/* 下载进度 */}
      {isDownloading && (
        <DownloadProgress progress={downloadProgress} />
      )}

      {/* 历史记录按钮 */}
      <div className="text-center">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="btn-secondary"
        >
          {showHistory ? '隐藏历史记录' : '查看历史记录'}
          <span className="ml-2">
            {downloadHistory.length > 0 && `(${downloadHistory.length})`}
          </span>
        </button>
      </div>

      {/* 历史记录面板 */}
      {showHistory && (
        <HistoryPanel 
          history={downloadHistory}
          onClearHistory={() => {
            setDownloadHistory([])
            localStorage.removeItem('downloadHistory')
          }}
        />
      )}
    </div>
  )
}