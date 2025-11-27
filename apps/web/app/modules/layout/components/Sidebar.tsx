export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800/50 border-r border-gray-700/50 backdrop-blur-xl hidden md:flex flex-col">
      <div className="p-6 border-b border-gray-700/50">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Valkyrie
        </h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <a href="/" className="flex items-center px-4 py-3 bg-purple-600/10 text-purple-400 rounded-lg border border-purple-600/20">
          <span className="mr-3">🏠</span>
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors">
          <span className="mr-3">📊</span>
          Analytics
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors">
          <span className="mr-3">⚙️</span>
          Settings
        </a>
      </nav>

      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@valkyrie.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
