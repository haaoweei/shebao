// 城市社保标准
export interface City {
  id?: number;
  city_name: string;
  year: string;
  base_min: number;
  base_max: number;
  rate: number;
}

// 员工工资
export interface Salary {
  id?: number;
  employee_id: string;
  employee_name: string;
  month: string;
  salary_amount: number;
}

// 计算结果
export interface Result {
  id?: number;
  employee_name: string;
  avg_salary: number;
  contribution_base: number;
  company_fee: number;
}
