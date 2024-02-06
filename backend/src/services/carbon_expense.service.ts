import { CarbonExpense } from '../entities/carbon_expense.entity';


export const findAll = (): Promise<CarbonExpense[]> => {
  return CarbonExpense.find();
};