import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const meal = getMeal(params.name);

  if (!meal) {
    notFound();
  }

  return {
    title: `${meal.title} - NextLevel Food`,
    description: meal.summary,
    image: meal.image,
  };
}

export default function MealDetailsPage({
  params,
}: {
  params: { name: string };
}) {
  const meal = getMeal(params.name);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            alt={`image of ${meal.title.toLowerCase()}`}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        />
      </main>
    </>
  );
}
