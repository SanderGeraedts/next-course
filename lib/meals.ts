import { MealData, MealInput } from "@/types/meals";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  return db.prepare("SELECT * FROM meals").all() as MealData[];
}

export function getMeal(slug: string) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as MealData;
}

export async function saveMeal(meal: MealInput) {
  const ext = meal.image.name.split(".").pop();
  const filename = `${slugify(meal.title, {
    lower: true,
  })}-${new Date().toISOString().replace(/:/g, "-")}.${ext}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);

  const buffer = await meal.image.arrayBuffer();

  stream.write(Buffer.from(buffer), (error) => {
    if (error) {
      console.log(error);

      throw new Error("Saving image failed");
    }
  });

  const stmt = db.prepare(
    "INSERT INTO meals (title, image, summary, instructions, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    meal.title,
    `/images/${filename}`,
    meal.summary,
    xss(meal.instructions),
    meal.creator,
    meal.creator_email,
    slugify(meal.title, { lower: true })
  );
}
