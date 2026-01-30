import * as XLSX from 'xlsx';
import { City, Salary } from '@/types';

// 解析城市数据 Excel
export function parseCitiesExcel(buffer: ArrayBuffer): City[] {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

  return jsonData.map((row, index) => ({
    city_name: row['城市名称'] || row['city_name'],
    year: String(row['年度'] || row['year']),
    base_min: Number(row['基数下限'] || row['base_min']),
    base_max: Number(row['基数上限'] || row['base_max']),
    rate: Number(row['缴纳比例'] || row['rate']),
  }));
}

// 解析员工工资 Excel
export function parseSalariesExcel(buffer: ArrayBuffer): Salary[] {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

  return jsonData.map((row) => ({
    employee_id: String(row['员工工号'] || row['employee_id']),
    employee_name: row['员工姓名'] || row['employee_name'],
    month: String(row['月份'] || row['month']),
    salary_amount: Number(row['工资金额'] || row['salary_amount']),
  }));
}
