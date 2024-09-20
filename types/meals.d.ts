export interface Meal {
  id?: string;
  title: string;
  image: string;
  summary: string;
  creator: string;
  slug: string;
}

export interface MealInput {
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface MealData extends MealInput {
  id: string;
  image: string;
  slug: string;
}
