import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to Tailwind React Example
        </h2>
        <p className="text-gray-600">
          This is a simple React app with Tailwind CSS styling. Modify and add
          components as needed.
        </p>
      </div>
    </main>
  );
}
