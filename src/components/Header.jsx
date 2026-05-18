export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#F0FDF4]/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="flex items-center justify-center h-14 px-4">
        <span className="mr-2 text-xl"></span>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: '#333333' }}>
          Elaborate
        </h1>
      </div>
    </header>
  );
}
