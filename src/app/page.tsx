import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/maintenance-icon.jpg"
            alt="Logo"
            width="200"
            height="200"
          />
          <div className="text-4xl sm:text-6xl font-bold">
            Welcome to Equipmaint
          </div>
        </div>
      </main>
      <footer className="row-start-3 text-sm text-center text-gray-500">
        &copy; 2025 Equipmaint. All rights reserved.
      </footer>
    </div>
  );
}
