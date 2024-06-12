import { ILike, DeleteResult } from "typeorm"; //Ilike n'est pas snesible à la casse contrairement à Like.
import { CarbonExpense } from "../entities/carbonExpense.entity";
import { User } from "../entities/user.entity";
import { ActivityType } from "../entities/activityType.entity";
import { UpdateCarbonExpenseType } from "../types/addExpense/UpdateCarbonExpenseType";

export function findCarbonExpenseById(
  id: number
): Promise<CarbonExpense | null> {
  return CarbonExpense.findOne({
    where: { id: id },
  });
}

export async function findAll(): Promise<CarbonExpense[] | string> {
  const allExpenses = await CarbonExpense.find();
  if (allExpenses.length === 0) {
    throw new Error("Aucunes dépenses à votre acitf");
  } else {
    return allExpenses;
  }
}

export async function findCarbonExpenseByUserId(
  userId: number
): Promise<CarbonExpense[]> {
  const userExpenses = await CarbonExpense.find({
    relations: {
      activityType: true,
    },
    where: {
      user: {
        id: userId,
      },
    },
  });

  return userExpenses;
}

export async function getExpensesByTerms(
  terms: string = ""
): Promise<CarbonExpense[] | string> {
  try {
    // Vérifier si des termes de recherche sont fournis
    const expenses = terms
      ? await CarbonExpense.find({ where: { title: ILike(`%${terms}%`) } })
      : await CarbonExpense.find();

    // Vérifier si des catégories ont été trouvées
    if (expenses.length > 0) {
      return expenses;
    } else {
      throw new Error(`Aucune dépense trouvée avec la recherche : ${terms}`);
    }
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant la recherche
    throw new Error(
      error instanceof Error
        ? error.message
        : "Une erreur inattendue s'est produite."
    );
  }
}

export async function create(carbonExpenseData: {
  title: string,
  date: Date,
  emission: number,
  activityType: number,
  user: User

}): Promise<CarbonExpense> {
  const carbonExpense = new CarbonExpense();

  carbonExpense.title = carbonExpenseData.title;
  carbonExpense.date = carbonExpenseData.date;
  carbonExpense.emission = carbonExpenseData.emission;

  carbonExpense.activityType = {
    id: carbonExpenseData.activityType,
  } as ActivityType;

  carbonExpense.user = carbonExpenseData.user;

  return await carbonExpense.save();
}

export async function updateCarbonExpense(
  carbonExpense: UpdateCarbonExpenseType,
): Promise<CarbonExpense | undefined | string> {
  const carbonExpenseToUpdate = await findCarbonExpenseById(carbonExpense.id);
  if (!carbonExpenseToUpdate) {
    throw new Error("Dépense non trouvée ou inexistante");
  }

  if (carbonExpenseToUpdate) {
    carbonExpenseToUpdate.title = carbonExpense.title;
    carbonExpenseToUpdate.date = carbonExpense.date;
    carbonExpenseToUpdate.emission = carbonExpense.emission;
    carbonExpenseToUpdate.activityType = {
      id : carbonExpense.activityType,
    } as ActivityType;

    return carbonExpenseToUpdate.save();
  }
}

export interface DeleteCarboneExpenseResult {
  isSuccess: boolean;
  message?: string;
}

export async function DeleteCarboneExpense(
  id: number
): Promise<DeleteCarboneExpenseResult> {
  try {
    const carbonExpenseToDelete = await CarbonExpense.delete(id);

    if (!carbonExpenseToDelete) {
      return { isSuccess: false, message: "La dépense n'existe pas." };
      console.log;
    }

    const result: DeleteResult = await CarbonExpense.delete({ id: id });
    return {
      isSuccess: true,
      message: "La dépense a été supprimée avec succès.",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "Une erreur inattendue s'est produite.",
    };
  }
}
