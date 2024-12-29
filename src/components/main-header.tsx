import Link from "next/link";

export function MainHeader() {
  return (
    <header className="flex items-center w-full bg-background">
      <div className="max-w-[1280px] w-full mx-auto flex items-center px-5">
        <Link href="/" className="flex items-center py-5 space-x-2">
          <span className="inline-block font-bold">dding-glog</span>
        </Link>
      </div>
    </header>
  );
}
