import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import jharkhandBg from "@/assets/jharkhand-gov-bg.jpg";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${jharkhandBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Government of Jharkhand
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Civic Issue Reporting & Resolution System
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-2">
            <Button
              asChild
              variant={isActive("/") ? "secondary" : "outline"}
              className={`${
                isActive("/")
                  ? "bg-white text-primary hover:bg-white/90"
                  : "border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              asChild
              variant={isActive("/about") ? "secondary" : "outline"}
              className={`${
                isActive("/about")
                  ? "bg-white text-primary hover:bg-white/90"
                  : "border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <Link to="/about">About Us</Link>
            </Button>
            <Button
              asChild
              variant={isActive("/help") ? "secondary" : "outline"}
              className={`${
                isActive("/help")
                  ? "bg-white text-primary hover:bg-white/90"
                  : "border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <Link to="/help">Help</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;