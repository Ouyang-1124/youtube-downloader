'use client'

import { useState } from 'react'

interface VideoAnalyzerProps {
  onAnalyze: (url: string) => void
  isAnalyzing: boolean
}

export default function VideoAnalyzer({ onAnalyze, isAnalyzing }: VideoAnalyzerProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      alert('请输入YouTube视频URL')
      return
    }
    
    // 验证URL格式
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (!youtubeRegex.test(url)) {
      alert('请输入有效的YouTube视频URL')
      return
    }
    
    onAnalyze(url.trim())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const exampleUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ'
  ]

  return (
    <div className="card">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            视频链接解析
          </h2>
          <p className="text-gray-600">
            输入YouTube视频链接，获取详细的视频信息
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube视频URL
            </label>
            <input
              id="video-url"
              type="url"
              value={url}
              onChange={handleInputChange}
              placeholder="请输入YouTube视频链接，例如：https://www.youtube.com/watch?v=..."
              className="input-field"
              disabled={isAnalyzing}
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !url.trim()}
            className={`w-full ${
              isAnalyzing || !url.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'btn-primary'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>解析中...</span>
              </div>
            ) : (
              '解析视频'
            )}
          </button>
        </form>

        {/* 示例URL */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-2">示例链接格式：</p>
          <div className="space-y-2">
            {exampleUrls.map((exampleUrl, index) => (
              <button
                key={index}
                onClick={() => setUrl(exampleUrl)}
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                disabled={isAnalyzing}
              >
                {exampleUrl}
              </button>
            ))}
          </div>
        </div>

        {/* 使用说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">使用说明：</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 支持 youtube.com 和 youtu.be 两种链接格式</li>
            <li>• 可解析视频标题、描述、封面图等详细信息</li>
            <li>• 解析成功后可下载视频到本地</li>
            <li>• 请确保视频链接有效且可访问</li>
          </ul>
        </div>
      </div>
    </div>
  )
}