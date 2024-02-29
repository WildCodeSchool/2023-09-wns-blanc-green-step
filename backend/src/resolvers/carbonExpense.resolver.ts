import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CarbonExpense } from "../entities/carbonExpense.entity";
import * as CarbonExpenseService from "../services/carbonExpense.service";
import { CreateCarbonExpenseType } from "../types/addExpense/CreateCarboneExpenseType";
import { UpdateCarbonExpenseType } from "../types/addExpense/UpdateCarbonExpenseType";
import { DeleteCarboneExpenseResult } from "../services/carbonExpense.service";
import { User } from "../entities/user.entity";

@Resolver(CarbonExpense)
export class CarbonExpenseResolver {
  @Query(() => [CarbonExpense])
  async getCarbonExpenses(): Promise<CarbonExpense[] | string> {
    return CarbonExpenseService.findAll();
  }

  @Query(() => [CarbonExpense])
  async searchExpenseByTerms(@Arg("terms", { nullable: true }) terms: string): Promise<CarbonExpense[] | string> {
    try {
      return await CarbonExpenseService.getExpensesByTerms(terms);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // Renvoie l'erreur en tant que string
      } else {
        throw new Error("Une erreur inatendue s'est produite.")
      }
    }
  }

  @Authorized()
  @Mutation(() => CarbonExpense)
  createCarbonExpense(@Arg("expense") carbonExpense: CreateCarbonExpenseType, @Ctx("user") user: User): Promise<CarbonExpense> {
    return CarbonExpenseService.create({...carbonExpense, user})
  }

  @Mutation(() => CarbonExpense)
  updateCarbonExpense(@Arg("expense") carbonExpense: UpdateCarbonExpenseType): Promise<CarbonExpense | string | undefined> {
    return CarbonExpenseService.updateCarbonExpense(carbonExpense.id, {...carbonExpense} as unknown as CarbonExpense)
  }

  @Mutation(() => String)
  async DeleteCarboneExpense(@Arg("id") id: number): Promise<string | undefined> {
    const result: DeleteCarboneExpenseResult = await CarbonExpenseService.DeleteCarboneExpense(id);
    return result.message;
  }
}
