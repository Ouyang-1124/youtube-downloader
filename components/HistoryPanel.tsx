'use client'

import { DownloadRecord } from '@/app/page'

interface HistoryPanelProps {
  history: DownloadRecord[]
  onClearHistory: () => void
}

export default function HistoryPanel({ history, onClearHistory }: HistoryPanelProps) {
  const handleClearHistory = () => {
    if (confirm('确定要清空所有历史记录吗？此操作不可撤销。')) {
      onClearHistory()
    }
  }

  if (history.length === 0) {
    return (
      <div className="card animate-fadeIn">
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无下载记录</h3>
          <p className="mt-1 text-sm text-gray-500">
            您还没有下载过任何视频
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-fadeIn">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            下载历史记录
          </h3>
          <button
            onClick={handleClearHistory}
            className="text-sm text-red-600 hover:text-red-800 hover:underline"
          >
            清空记录
          </button>
        </div>

        <div className="space-y-3">
          {history.map((record) => (
            <div
              key={record.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {record.title}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status === 'completed' ? '成功' : '失败'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>下载时间: {record.downloadDate}</p>
                    <p>文件大小: {record.fileSize}</p>
                    <p className="truncate">视频链接: {record.url}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {record.status === 'completed' ? (
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 统计信息 */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-green-600">
                {history.filter(r => r.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-500">成功下载</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-600">
                {history.filter(r => r.status === 'failed').length}
              </p>
              <p className="text-sm text-gray-500">下载失败</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}