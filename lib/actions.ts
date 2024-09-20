"use server";
import { MealInput } from "@/types/meals";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function isInvalidEmail(email: string) {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isInvalidText(text: string) {
  return !text || !text.trim();
}

export async function shareMeal(
  prevState: { message?: string },
  formData: FormData
) {
  const meal: MealInput = {
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image-picker") as File,
  };

  if (!meal.image) {
    throw new Error("No image provided");
  }

  if (
    isInvalidText(meal.creator) ||
    isInvalidEmail(meal.creator_email) ||
    isInvalidText(meal.title) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");

  redirect("/meals");
}
