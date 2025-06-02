
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  AlertTriangle, 
  Bot, 
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'Emergency', path: '/emergency', icon: AlertTriangle },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-red-600 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="text-2xl font-bold text-red-600">CIVI-SHIELD</div>
            <span className="text-lg">🇮🇳</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 ${
                  isActive(item.path) 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Emergency Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              onClick={() => navigate('/emergency')}
            >
              🚨 Emergency
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full justify-start flex items-center space-x-2 ${
                    isActive(item.path) 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold mt-4"
                onClick={() => {
                  navigate('/emergency');
                  setIsMobileMenuOpen(false);
                }}
              >
                🚨 Emergency
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
