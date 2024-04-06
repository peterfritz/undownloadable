import { FaHandPointUp } from "react-icons/fa6";

const Caught = () => (
  <main className="h-full w-full bg-neutral-800 p-3">
    <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center gap-7 p-3 text-center">
      <div className="mx-auto flex h-56 w-56 flex-col items-center justify-center rounded-full border-4 border-neutral-100 bg-red-500 text-neutral-100">
        <FaHandPointUp className="origin-bottom animate-shake text-8xl" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-red-500">
          Piracy is a crime, and you have been caught!
        </h1>
        <p className="text-neutral-200">You should be ashamed of yourself.</p>
      </div>
      <a href="/">
        <button className="rounded-md border-none bg-red-500 px-5 py-2 text-neutral-100 transition-colors duration-150 ease-in-out hover:bg-red-700">
          I promise I won&apos;t do it again
        </button>
      </a>
    </div>
  </main>
);

export default Caught;
