import { Query, Resolver } from "type-graphql";
import { CarbonExpense } from "../entities/carbon_expense.entity";
import * as CarbonExpenseService from "../services/carbon_expense.service";

@Resolver(CarbonExpense)
export class CarbonExpenseResolver {
  @Query(() => [CarbonExpense])
  async getCarbonExpenses(): Promise<CarbonExpense[]> {
    return CarbonExpenseService.findAll();
  }
}
