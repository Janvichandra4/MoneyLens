
import DashboardLayout from "@/layouts/DashboardLayout";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, FileUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Get current user name - would come from authentication context in real app
  const userName = "John";
  
  return (
    <DashboardLayout
      title="Welcome back, John"
      subtitle="Here's what's happening with your finances today"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Financial Summary */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-money-slate">Financial Overview</h2>
            <FinancialSummary />
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-money-slate">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/upload">
                <Card className="bg-gradient-to-br from-money-blue to-money-blue/90 text-white hover:shadow-md transition-shadow cursor-pointer animate-fade-in">
                  <CardHeader className="pb-2">
                    <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                      <FileUp className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">Upload Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-white/80 pb-2">
                    Upload new financial documents for processing
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-white/90 hover:text-white p-0">
                      Get Started <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link to="/expenses">  
                <Card className="bg-gradient-to-br from-money-teal to-money-teal/90 text-white hover:shadow-md transition-shadow cursor-pointer animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <CardHeader className="pb-2">
                    <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">Track Expenses</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-white/80 pb-2">
                    Classify and analyze your spending patterns
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-white/90 hover:text-white p-0">
                      Analyze Now <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link to="/coach">
                <Card className="bg-gradient-to-br from-money-gold to-money-gold/90 text-white hover:shadow-md transition-shadow cursor-pointer animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <CardHeader className="pb-2">
                    <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">Financial Coach</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-white/80 pb-2">
                    Get personalized financial advice and insights
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-white/90 hover:text-white p-0">
                      Chat Now <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
