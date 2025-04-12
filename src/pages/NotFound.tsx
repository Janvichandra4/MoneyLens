
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SparklesIcon, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-bg">
      <div className="text-center max-w-md px-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-money-blue text-white p-2 rounded mr-2">
            <SparklesIcon className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-3xl font-semibold text-money-slate">MoneyLens</h1>
        </div>
        
        <h2 className="text-5xl font-bold text-money-blue mb-4">404</h2>
        <p className="text-xl text-money-slate mb-8">Oops! We couldn't find the page you're looking for.</p>
        
        <Button asChild className="bg-money-blue hover:bg-money-blue/90">
          <Link to="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
