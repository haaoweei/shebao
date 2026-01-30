import { NextRequest, NextResponse } from 'next/server';
import { getSalaries, getCityByName, clearResults, saveResults, getResults } from '@/utils/database';
import { calculateSocialSecurity } from '@/utils/calculator';

export async function POST(request: NextRequest) {
  try {
    // 获取所有工资数据
    const salaries = await getSalaries();
    if (salaries.length === 0) {
      return NextResponse.json({ error: '没有工资数据，请先上传工资数据' }, { status: 400 });
    }

    // 获取佛山城市标准
    const city = await getCityByName('佛山');
    if (!city) {
      return NextResponse.json({ error: '未找到佛山城市标准，请先上传城市数据' }, { status: 400 });
    }

    // 清空旧结果
    await clearResults();

    // 计算社保缴费
    const results = await calculateSocialSecurity(salaries, city);

    // 保存结果
    await saveResults(results);

    return NextResponse.json({
      message: `计算完成，共 ${results.length} 位员工`,
      count: results.length
    });
  } catch (error: any) {
    console.error('Calculation error:', error);
    return NextResponse.json({ error: error.message || '计算失败' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const results = await getResults();
    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '获取结果失败' }, { status: 500 });
  }
}
