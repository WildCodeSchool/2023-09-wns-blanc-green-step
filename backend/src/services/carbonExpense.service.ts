import { CarbonExpense } from "../entities/carbonExpense.entity";

export const findAll = (): Promise<CarbonExpense[]> => {
  return CarbonExpense.find();
};
