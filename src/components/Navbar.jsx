import { Mic, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          <div className="flex items-center space-x-2">
            <Mic className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" />
            <span className="text-xl lg:text-2xl font-bold text-white">SayDocs</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">How It Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Pricing</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base">Sign In</button>
            <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base">Sign Up</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <Menu className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/90 backdrop-blur-md rounded-lg mt-2 p-4 space-y-4">
            <a href="#how-it-works" className="block text-gray-300 hover:text-white text-sm lg:text-base">How It Works</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white text-sm lg:text-base">Pricing</a>
            <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm lg:text-base">Sign In</button>
            <button className="block w-full bg-transparent border border-white/30 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm lg:text-base">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
