
import { useEffect, useState } from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const [strength, setStrength] = useState<number>(0);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0;
      
      // Length check
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;
      
      // Character variety check
      if (/[A-Z]/.test(password)) score += 1; // Has uppercase
      if (/[a-z]/.test(password)) score += 1; // Has lowercase
      if (/[0-9]/.test(password)) score += 1; // Has number
      if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
      
      return Math.min(Math.floor(score * (100/6)), 100);
    };
    
    const strengthPercent = calculateStrength();
    setStrength(strengthPercent);
    
    if (strengthPercent < 33) {
      setLabel("Weak");
    } else if (strengthPercent < 66) {
      setLabel("Medium");
    } else {
      setLabel("Strong");
    }
  }, [password]);

  const getColor = () => {
    if (strength < 33) return "bg-money-error";
    if (strength < 66) return "bg-money-warning";
    return "bg-money-success";
  };

  return (
    <div className="space-y-1 mt-1">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ease-out ${getColor()}`} 
          style={{ width: `${strength}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={`font-medium ${
          strength < 33 ? "text-money-error" : 
          strength < 66 ? "text-money-warning" : 
          "text-money-success"
        }`}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
