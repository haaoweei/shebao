'use client';

import { useEffect, useState } from 'react';
import { Result } from '@/types';

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/calculate');
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('获取结果失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 返回链接 */}
        <Link href="/" className="inline-block text-blue-600 hover:text-blue-800 mb-8">
          ← 返回主页
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">计算结果</h1>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-600">加载中...</div>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-600">暂无计算结果，请先上传数据并执行计算</div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">序号</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">员工姓名</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">年度月平均工资</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">社保缴费基数</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">公司应缴金额</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={result.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{result.employee_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">¥{result.avg_salary.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">¥{result.contribution_base.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">¥{result.company_fee.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 总计 */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end">
                <span className="text-lg font-semibold text-gray-800">
                  合计: ¥{results.reduce((sum, r) => sum + r.company_fee, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
