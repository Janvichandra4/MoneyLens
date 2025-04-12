
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Mail, Lock, User, Loader2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

type FormStep = "personal" | "security" | "goals";

const SignupForm = () => {
  const [formStep, setFormStep] = useState<FormStep>("personal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [financialGoal, setFinancialGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleNextStep = () => {
    if (formStep === "personal") {
      if (!name || !validateEmail(email)) {
        toast({
          title: "Invalid input",
          description: "Please provide a valid name and email.",
          variant: "destructive",
        });
        return;
      }
      setFormStep("security");
    } else if (formStep === "security") {
      if (!validatePassword(password) || password !== confirmPassword) {
        toast({
          title: "Invalid password",
          description: "Please ensure your password is at least 8 characters long and passwords match.",
          variant: "destructive",
        });
        return;
      }
      setFormStep("goals");
    }
  };

  const handlePrevStep = () => {
    if (formStep === "security") setFormStep("personal");
    if (formStep === "goals") setFormStep("security");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Placeholder for actual signup logic
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to MoneyLens. Let's start managing your finances.",
        variant: "default",
      });
      setIsLoading(false);
      
      // In a real app, would redirect to dashboard or onboarding
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-money-slate mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join MoneyLens to manage your financial documents</p>
      </div>

      <div className="flex justify-between mb-6">
        <div className={`flex-1 text-center ${formStep === "personal" ? "text-money-blue" : "text-gray-400"}`}>
          <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
            formStep === "personal" ? "bg-money-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <User className="h-4 w-4" />
          </div>
          <span className="text-xs">Personal</span>
        </div>
        <div className="flex-grow border-t border-gray-200 mt-4 mx-2"></div>
        <div className={`flex-1 text-center ${formStep === "security" ? "text-money-blue" : "text-gray-400"}`}>
          <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
            formStep === "security" ? "bg-money-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <Lock className="h-4 w-4" />
          </div>
          <span className="text-xs">Security</span>
        </div>
        <div className="flex-grow border-t border-gray-200 mt-4 mx-2"></div>
        <div className={`flex-1 text-center ${formStep === "goals" ? "text-money-blue" : "text-gray-400"}`}>
          <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
            formStep === "goals" ? "bg-money-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <Check className="h-4 w-4" />
          </div>
          <span className="text-xs">Goals</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formStep === "personal" && (
          <div className="space-y-4 animate-slide-up">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={handleNextStep}
              className="w-full bg-money-blue hover:bg-money-blue/90 text-white"
            >
              Continue to Security
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {formStep === "security" && (
          <div className="space-y-4 animate-slide-up">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              {password && <PasswordStrengthMeter password={password} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-money-error text-sm">Passwords do not match</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button 
                type="button" 
                onClick={handlePrevStep}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="button" 
                onClick={handleNextStep}
                className="flex-1 bg-money-blue hover:bg-money-blue/90 text-white"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {formStep === "goals" && (
          <div className="space-y-4 animate-slide-up">
            <div className="space-y-2">
              <Label htmlFor="financialGoal">What's your main financial goal?</Label>
              <select
                id="financialGoal"
                value={financialGoal}
                onChange={(e) => setFinancialGoal(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>Select a goal</option>
                <option value="budget">Better budgeting</option>
                <option value="expenses">Track expenses</option>
                <option value="taxes">Tax optimization</option>
                <option value="savings">Increase savings</option>
                <option value="investment">Investment tracking</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                type="button" 
                onClick={handlePrevStep}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-money-blue hover:bg-money-blue/90 text-white"
                disabled={isLoading || !financialGoal}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
      
      {formStep === "personal" && (
        <>
          <div className="relative flex items-center justify-center">
            <div className="border-t w-full border-gray-200"></div>
            <span className="bg-white px-2 text-sm text-muted-foreground absolute">or create with</span>
          </div>
          
          <GoogleSignInButton />
          
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-money-blue font-medium hover:text-money-blue/80 transition-colors">
              Sign in
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default SignupForm;
