
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SparklesIcon, LogIn, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-money-blue text-white p-1.5 rounded">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-semibold text-money-slate ml-2">MoneyLens</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link to="/login" className="text-money-blue">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button asChild className="bg-money-blue hover:bg-money-blue/90">
              <Link to="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-money-slate">
                Understand Your Finances with <span className="text-money-blue">Document Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                MoneyLens helps you make sense of your financial documents, track expenses, and gain valuable insights—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild className="bg-money-blue hover:bg-money-blue/90 h-12 px-8 text-lg">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-8 text-lg">
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -left-4 -top-4 w-full h-full rounded-xl bg-money-blue/20 transform rotate-3"></div>
                <div className="absolute -right-4 -bottom-4 w-full h-full rounded-xl bg-money-teal/20 transform -rotate-3"></div>
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2940&auto=format&fit=crop" 
                    alt="Financial Dashboard" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-money-slate">Powerful Features</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              MoneyLens combines document intelligence with powerful financial tools to give you complete control
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-money-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-money-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Document Processing</h3>
              <p className="text-muted-foreground">
                Automatically extract and organize information from invoices, receipts, statements and more.
              </p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-money-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-money-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-muted-foreground">
                AI-powered categorization of expenses with insightful visualizations and reports.
              </p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-money-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-money-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Financial Coach</h3>
              <p className="text-muted-foreground">
                Get personalized financial advice and insights based on your spending habits.
              </p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-money-success/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-money-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Budgeting</h3>
              <p className="text-muted-foreground">
                AI-suggested budgets based on your income and spending patterns.
              </p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-money-error/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Receipt className="h-6 w-6 text-money-error" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bill Splitting</h3>
              <p className="text-muted-foreground">
                Easily split expenses with friends and family by scanning receipts.
              </p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-money-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-money-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Blackbox</h3>
              <p className="text-muted-foreground">
                Securely store your most sensitive financial information with encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-money-slate text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="bg-white text-money-blue p-1.5 rounded">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <span className="font-heading text-xl font-semibold ml-2">MoneyLens</span>
              </div>
              <p className="text-white/70 mt-2">Financial document intelligence platform</p>
            </div>
            
            <div className="flex gap-8">
              <div>
                <h4 className="font-medium mb-3">Product</h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Legal</h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">© 2025 MoneyLens. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { BarChart3, FileText, MessageSquare, PieChart, Receipt, Shield } from "lucide-react";
