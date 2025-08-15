export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <input
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-center text-white w-full py-1 px-2"
          placeholder="Search..."
        />
        <button className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm">
          Log in
        </button>
        <button className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm">
          Sign up
        </button>
      </div>
    </div>
  );
}
