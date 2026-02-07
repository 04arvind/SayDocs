import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center">
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-white mb-4">SayDocs</h3>
            <p className="text-gray-400 text-sm lg:text-base">Transform your speech into professional documents effortlessly.</p>
          </div>
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Contact</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center">
          <p className="text-gray-400 text-sm lg:text-base">&copy; 2025 SayDocs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
