'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [message, setMessage] = useState('');

  // 上传城市数据
  const handleUploadCities = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'cities');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('上传失败');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // 上传工资数据
  const handleUploadSalaries = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'salaries');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('上传失败');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // 执行计算
  const handleCalculate = async () => {
    setCalculating(true);
    setMessage('');

    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('计算失败');
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 返回链接 */}
        <Link href="/" className="inline-block text-blue-600 hover:text-blue-800 mb-8">
          ← 返回主页
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">数据上传与计算</h1>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('成功') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        {/* 操作卡片 */}
        <div className="space-y-6">
          {/* 上传城市数据 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. 上传城市社保标准</h2>
            <p className="text-gray-600 mb-4">
              上传包含城市社保标准的 Excel 文件（城市名称、年度、基数下限、基数上限、缴纳比例）
            </p>
            <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
              {uploading ? '上传中...' : '选择文件'}
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleUploadCities}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* 上传工资数据 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. 上传员工工资数据</h2>
            <p className="text-gray-600 mb-4">
              上传包含员工工资的 Excel 文件（员工工号、员工姓名、月份、工资金额）
            </p>
            <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
              {uploading ? '上传中...' : '选择文件'}
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleUploadSalaries}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* 执行计算 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. 执行计算</h2>
            <p className="text-gray-600 mb-4">
              根据上传的数据计算每位员工的社保缴费基数和公司应缴金额
            </p>
            <button
              onClick={handleCalculate}
              disabled={calculating}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {calculating ? '计算中...' : '执行计算'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 添加 Link 导入
import Link from 'next/link';
