
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { SparklesIcon } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-bg flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-money-blue text-white p-2 rounded mr-2">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-money-slate">MoneyLens</h1>
          </div>
          
          <LoginForm />
        </div>
      </div>
      
      {/* Right side - Image and benefits */}
      <div className="hidden lg:flex flex-1 bg-money-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff5a42?q=80&w=2942&auto=format&fit=crop')] bg-cover opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 className="font-heading text-4xl font-semibold mb-6">Understand your finances like never before</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-white/10 rounded-full p-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xl mb-1">Document Intelligence</h3>
                <p className="text-white/70">Upload any financial document and let our AI make sense of it automatically</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-white/10 rounded-full p-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xl mb-1">Expense Classification</h3>
                <p className="text-white/70">Automatically categorize and track your expenses to discover spending patterns</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-white/10 rounded-full p-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xl mb-1">Budget Planning</h3>
                <p className="text-white/70">Get AI-powered budget recommendations based on your actual spending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
