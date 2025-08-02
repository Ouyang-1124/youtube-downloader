'use client'

interface DownloadProgressProps {
  progress: number
}

export default function DownloadProgress({ progress }: DownloadProgressProps) {
  return (
    <div className="card animate-fadeIn">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            下载进度
          </h3>
          <p className="text-gray-600">
            正在下载视频，请稍候...
          </p>
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              下载进度
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 状态显示 */}
        <div className="text-center">
          {progress < 30 && (
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">正在连接服务器...</span>
            </div>
          )}
          {progress >= 30 && progress < 70 && (
            <div className="flex items-center justify-center space-x-2 text-yellow-600">
              <div className="animate-bounce h-4 w-4 bg-yellow-600 rounded-full"></div>
              <span className="text-sm">正在下载视频数据...</span>
            </div>
          )}
          {progress >= 70 && progress < 100 && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <div className="animate-pulse h-4 w-4 bg-green-600 rounded-full"></div>
              <span className="text-sm">即将完成下载...</span>
            </div>
          )}
          {progress >= 100 && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">下载完成！</span>
            </div>
          )}
        </div>

        {/* 下载提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-700">
              <p>下载提示：</p>
              <ul className="mt-1 space-y-1">
                <li>• 下载时间取决于视频大小和网络速度</li>
                <li>• 请保持页面开启，不要关闭浏览器</li>
                <li>• 下载完成后文件将自动保存到下载文件夹</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}