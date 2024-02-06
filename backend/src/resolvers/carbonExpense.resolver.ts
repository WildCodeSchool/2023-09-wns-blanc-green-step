import { Query, Resolver } from "type-graphql";
import { CarbonExpense } from "../entities/carbonExpense.entity";
import * as CarbonExpenseService from "../services/carbonExpense.service";

@Resolver(CarbonExpense)
export class CarbonExpenseResolver {
  @Query(() => [CarbonExpense])
  async getCarbonExpenses(): Promise<CarbonExpense[]> {
    return CarbonExpenseService.findAll();
  }
}
