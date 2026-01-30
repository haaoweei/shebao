import { NextRequest, NextResponse } from 'next/server';
import { parseCitiesExcel, parseSalariesExcel } from '@/utils/excelParser';
import { insertCities, insertSalaries } from '@/utils/database';

// 清空工资数据
async function clearSalariesData() {
  const { supabase } = await import('@/lib/supabase');
  const { error } = await supabase.from('salaries').delete().neq('id', 0);
  if (error) throw error;
}

// 清空城市数据
async function clearCitiesData() {
  const { supabase } = await import('@/lib/supabase');
  const { error } = await supabase.from('cities').delete().neq('id', 0);
  if (error) throw error;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'cities' or 'salaries'

    if (!file) {
      return NextResponse.json({ error: '请选择文件' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();

    if (type === 'cities') {
      const cities = parseCitiesExcel(buffer);
      await clearCitiesData();
      await insertCities(cities);
      return NextResponse.json({ message: `成功导入 ${cities.length} 条城市数据` });
    } else if (type === 'salaries') {
      const salaries = parseSalariesExcel(buffer);
      await clearSalariesData();
      await insertSalaries(salaries);
      return NextResponse.json({ message: `成功导入 ${salaries.length} 条工资数据` });
    } else {
      return NextResponse.json({ error: '无效的数据类型' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || '上传失败' }, { status: 500 });
  }
}
