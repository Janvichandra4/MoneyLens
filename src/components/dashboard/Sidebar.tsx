
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, ChevronRight, Home, Upload, 
  PieChart, BarChart3, MessageSquare, 
  Receipt, SparklesIcon, Shield, User, Settings, LogOut 
} from "lucide-react";

interface SidebarNavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isCollapsed: boolean;
}

const SidebarNavItem = ({ href, icon: Icon, title, isCollapsed }: SidebarNavItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 group",
        isActive ? 
          "bg-money-blue text-white" : 
          "text-muted-foreground hover:bg-money-blue/10 hover:text-money-blue"
      )}
    >
      <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
      {!isCollapsed && <span className="font-medium">{title}</span>}
      {isCollapsed && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-money-slate text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {title}
        </div>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-white transition-all duration-300 relative",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo area */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-money-blue text-white p-1 rounded">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <span className="font-heading font-semibold text-money-slate">MoneyLens</span>
          </div>
        )}
        {isCollapsed && (
          <div className="bg-money-blue text-white p-1 rounded">
            <SparklesIcon className="h-5 w-5" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn("absolute -right-3 top-7 h-6 w-6 rounded-full border bg-white shadow-sm z-10", isCollapsed && "left-full")}
        >
          {isCollapsed ? 
            <ChevronRight className="h-3 w-3" /> : 
            <ChevronLeft className="h-3 w-3" />
          }
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="flex flex-col gap-1">
          <SidebarNavItem href="/dashboard" icon={Home} title="Dashboard" isCollapsed={isCollapsed} />
          <SidebarNavItem href="/upload" icon={Upload} title="Upload Documents" isCollapsed={isCollapsed} />
          <SidebarNavItem href="/expenses" icon={PieChart} title="Expenses" isCollapsed={isCollapsed} />
          <SidebarNavItem href="/budgeting" icon={BarChart3} title="Budgeting" isCollapsed={isCollapsed} />
          <SidebarNavItem href="/coach" icon={MessageSquare} title="AI Coach" isCollapsed={isCollapsed} />
          <SidebarNavItem href="/split" icon={Receipt} title="Bill Splitting" isCollapsed={isCollapsed} />
          <SidebarNavItem href="/blackbox" icon={Shield} title="Financial Blackbox" isCollapsed={isCollapsed} />
        </nav>
      </div>

      {/* User menu */}
      <div className="border-t p-3">
        <div className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer hover:bg-secondary transition-all",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 rounded-full bg-money-blue/20 text-money-blue flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <div className="mt-1 flex gap-1">
            <Button variant="ghost" size="sm" className="flex-1 justify-start text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
