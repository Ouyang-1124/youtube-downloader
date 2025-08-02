'use client'

import Image from 'next/image'
import { VideoInfo } from '@/app/page'

interface VideoInfoDisplayProps {
  videoInfo: VideoInfo
  onDownload: () => void
  isDownloading: boolean
}

export default function VideoInfoDisplay({ 
  videoInfo, 
  onDownload, 
  isDownloading 
}: VideoInfoDisplayProps) {
  const infoFields = [
    { label: '视频标题', value: videoInfo.title, type: 'text' },
    { label: '频道作者', value: videoInfo.author, type: 'text' },
    { label: '上传日期', value: videoInfo.uploadDate, type: 'text' },
    { label: '视频时长', value: videoInfo.duration, type: 'text' },
    { label: '观看次数', value: videoInfo.viewCount, type: 'text' },
    { label: '文件大小', value: videoInfo.fileSize, type: 'text' },
    { label: '视频描述', value: videoInfo.description, type: 'description' },
  ]

  return (
    <div className="card animate-fadeIn">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            视频信息
          </h2>
          <p className="text-gray-600">
            解析成功！以下是视频的详细信息
          </p>
        </div>

        {/* 视频封面 */}
        <div className="flex justify-center">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              width={480}
              height={360}
              className="max-w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200"></div>
          </div>
        </div>

        {/* 视频信息表格 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody className="divide-y divide-gray-200">
              {infoFields.map((field, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 bg-gray-50 border-r border-gray-200 w-1/4">
                    {field.label}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {field.type === 'description' ? (
                      <div className="max-h-32 overflow-y-auto">
                        <p className="whitespace-pre-wrap break-words">
                          {field.value || '暂无描述'}
                        </p>
                      </div>
                    ) : (
                      <span className="break-words">
                        {field.value || '暂无信息'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 下载按钮 */}
        <div className="text-center space-y-4">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className={`${
              isDownloading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'btn-primary'
            } text-lg px-8 py-4`}
          >
            {isDownloading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>下载中...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>下载视频</span>
              </div>
            )}
          </button>
          
          <p className="text-sm text-gray-500">
            点击下载按钮开始下载视频到本地
          </p>
        </div>

        {/* 免责声明 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">重要提示：</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 请遵守YouTube服务条款和相关版权法律</li>
            <li>• 下载的视频仅供个人学习和欣赏使用</li>
            <li>• 请勿用于商业用途或二次分发</li>
            <li>• 尊重原创作者的版权和知识产权</li>
          </ul>
        </div>
      </div>
    </div>
  )
}