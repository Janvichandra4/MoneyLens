
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ title = "Dashboard", subtitle = "Welcome back to MoneyLens" }: HeaderProps) => {
  return (
    <header className="bg-white p-6 border-b">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-semibold text-money-slate">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-full md:w-[240px]"
            />
          </div>
          
          <div className="relative">
            <Button variant="outline" size="icon" className="relative h-10 w-10">
              <Bell className="h-5 w-5" />
              <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center translate-x-1 -translate-y-1 bg-money-error">
                <span className="text-[10px]">3</span>
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
