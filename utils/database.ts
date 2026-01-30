import { supabase } from '@/lib/supabase';
import { City, Salary, Result } from '@/types';

// 批量插入城市数据
export async function insertCities(cities: City[]): Promise<void> {
  const { error } = await supabase.from('cities').insert(cities);
  if (error) throw error;
}

// 批量插入工资数据
export async function insertSalaries(salaries: Salary[]): Promise<void> {
  const { error } = await supabase.from('salaries').insert(salaries);
  if (error) throw error;
}

// 获取所有工资数据
export async function getSalaries(): Promise<Salary[]> {
  const { data, error } = await supabase.from('salaries').select('*');
  if (error) throw error;
  return data || [];
}

// 根据城市名获取城市标准
export async function getCityByName(cityName: string): Promise<City | null> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('city_name', cityName)
    .single();
  if (error) return null;
  return data;
}

// 保存计算结果
export async function saveResults(results: Result[]): Promise<void> {
  const { error } = await supabase.from('results').insert(results);
  if (error) throw error;
}

// 获取所有计算结果
export async function getResults(): Promise<Result[]> {
  const { data, error } = await supabase.from('results').select('*').order('id', { ascending: true });
  if (error) throw error;
  return data || [];
}

// 清空结果表
export async function clearResults(): Promise<void> {
  const { error } = await supabase.from('results').delete().neq('id', 0);
  if (error) throw error;
}
