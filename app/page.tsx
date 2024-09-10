import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-white text-center text-3xl font-bold my-3">
        Time to get started!
      </h1>
      <ul className="flex flex-col content-center text-lg font-semibold">
        <li className="text-center">
          <Link className="text-yellow-100" href="/meals">
            Meals
          </Link>
        </li>
        <li className="text-center">
          <Link className="text-yellow-100" href="/community">
            Community
          </Link>
        </li>
      </ul>
    </main>
  );
}
