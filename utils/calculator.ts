import { Salary, City, Result } from '@/types';

// 计算社保缴费
export async function calculateSocialSecurity(
  salaries: Salary[],
  city: City
): Promise<Result[]> {
  // 按员工姓名分组，计算平均工资
  const employeeMap = new Map<string, number[]>();

  salaries.forEach((salary) => {
    const name = salary.employee_name;
    if (!employeeMap.has(name)) {
      employeeMap.set(name, []);
    }
    employeeMap.get(name)!.push(salary.salary_amount);
  });

  // 计算每位员工的平均工资和缴费金额
  const results: Result[] = [];

  for (const [employeeName, salaryList] of employeeMap.entries()) {
    // 计算年度月平均工资
    const avgSalary = salaryList.reduce((sum, salary) => sum + salary, 0) / salaryList.length;

    // 确定缴费基数
    let contributionBase: number;
    if (avgSalary < city.base_min) {
      contributionBase = city.base_min;
    } else if (avgSalary > city.base_max) {
      contributionBase = city.base_max;
    } else {
      contributionBase = avgSalary;
    }

    // 计算公司应缴金额
    const companyFee = contributionBase * city.rate;

    results.push({
      employee_name: employeeName,
      avg_salary: Number(avgSalary.toFixed(2)),
      contribution_base: Number(contributionBase.toFixed(2)),
      company_fee: Number(companyFee.toFixed(2)),
    });
  }

  return results;
}
