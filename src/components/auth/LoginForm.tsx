
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a placeholder for actual authentication logic
    setTimeout(() => {
      // Simulate login success (would be replaced with actual auth logic)
      toast({
        title: "Success!",
        description: "You've successfully logged in.",
        variant: "default",
      });
      setIsLoading(false);
      
      // In a real app, we'd redirect to the dashboard after successful login
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-money-slate mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to continue to MoneyLens</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-money-blue hover:text-money-blue/80 transition-colors">
              Forgot password?
            </Link>
          </div>
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
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={() => setRememberMe(!rememberMe)} 
          />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-money-blue hover:bg-money-blue/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      
      <div className="relative flex items-center justify-center">
        <div className="border-t w-full border-gray-200"></div>
        <span className="bg-white px-2 text-sm text-muted-foreground absolute">or continue with</span>
      </div>
      
      <GoogleSignInButton />
      
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-money-blue font-medium hover:text-money-blue/80 transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
