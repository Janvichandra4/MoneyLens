
import { Link } from "react-router-dom";
import SignupForm from "@/components/auth/SignupForm";
import { SparklesIcon } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-bg flex">
      {/* Left side - Image and benefits */}
      <div className="hidden lg:flex flex-1 bg-money-teal relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2940&auto=format&fit=crop')] bg-cover opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 className="font-heading text-4xl font-semibold mb-6">Take control of your financial documents</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-white/10 rounded-full p-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xl mb-1">Secure Storage</h3>
                <p className="text-white/70">Keep your financial documents secure with bank-level encryption</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-white/10 rounded-full p-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xl mb-1">Smart Organization</h3>
                <p className="text-white/70">AI automatically organizes your documents by type, date, and relevance</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-white/10 rounded-full p-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xl mb-1">Financial AI Coach</h3>
                <p className="text-white/70">Get personalized financial insights and recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-money-teal text-white p-2 rounded mr-2">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-money-slate">MoneyLens</h1>
          </div>
          
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
