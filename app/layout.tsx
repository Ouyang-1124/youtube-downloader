import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YY的YouTube视频下载',
  description: '简单易用的YouTube视频下载工具，支持视频信息解析和下载进度显示',
  keywords: ['YouTube', '视频下载', '在线工具'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}