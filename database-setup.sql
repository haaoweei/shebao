-- ============================================
-- 五险一金计算器 - Supabase 数据库初始化脚本
-- ============================================
-- 使用方法：
-- 1. 登录 Supabase 控制台
-- 2. 进入 SQL Editor
-- 3. 复制本文件内容并执行
-- ============================================

-- 创建城市社保标准表
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  city_name TEXT NOT NULL,
  year TEXT NOT NULL,
  base_min INT NOT NULL,
  base_max INT NOT NULL,
  rate FLOAT NOT NULL
);

-- 创建员工工资表
CREATE TABLE IF NOT EXISTS salaries (
  id SERIAL PRIMARY KEY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  month TEXT NOT NULL,
  salary_amount INT NOT NULL
);

-- 创建计算结果表
CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  employee_name TEXT NOT NULL,
  avg_salary FLOAT NOT NULL,
  contribution_base FLOAT NOT NULL,
  company_fee FLOAT NOT NULL
);

-- ============================================
-- 插入示例数据（可选）
-- ============================================

-- 插入佛山城市社保标准示例数据
INSERT INTO cities (city_name, year, base_min, base_max, rate)
VALUES ('佛山', '2024', 3958, 21000, 0.15)
ON CONFLICT DO NOTHING;

-- 插入员工工资示例数据
INSERT INTO salaries (employee_id, employee_name, month, salary_amount) VALUES
  ('0001', '张三', '202401', 5000),
  ('0001', '张三', '202402', 5200),
  ('0001', '张三', '202403', 5000),
  ('0001', '张三', '202404', 4800),
  ('0002', '李四', '202401', 8000),
  ('0002', '李四', '202402', 8200),
  ('0002', '李四', '202403', 8000),
  ('0002', '李四', '202404', 8500)
ON CONFLICT DO NOTHING;

-- ============================================
-- 验证数据
-- ============================================

-- 查看城市数据
-- SELECT * FROM cities;

-- 查看工资数据
-- SELECT * FROM salaries;

-- 查看计算结果（执行计算后）
-- SELECT * FROM results;
