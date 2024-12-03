
export default function DashboardHeader() {
  return (
    <header className="w-full h-36 bg-white shadow-sm relative"> 
    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center"> {/* Centered the content */}
      <div className="flex items-center gap-8"> 
        <h1 className="text-5xl font-bold text-blue-600">MO Bank</h1> 
        <h2 className="text-5xl font-bold text-gray-600">Dashboard</h2> 
      </div>
    </div>
  </header>
  )
}
