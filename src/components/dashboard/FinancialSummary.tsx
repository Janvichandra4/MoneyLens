
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart, 
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Sample data for demonstration
const expenseData = [
  { name: "Jan", amount: 2400 },
  { name: "Feb", amount: 1398 },
  { name: "Mar", amount: 9800 },
  { name: "Apr", amount: 3908 },
  { name: "May", amount: 4800 },
  { name: "Jun", amount: 3800 },
];

const incomeData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 10000 },
  { name: "Apr", amount: 5000 },
  { name: "May", amount: 6000 },
  { name: "Jun", amount: 7000 },
];

const categoryData = [
  { name: "Housing", value: 35 },
  { name: "Food", value: 25 },
  { name: "Transport", value: 15 },
  { name: "Utilities", value: 10 },
  { name: "Entertainment", value: 15 },
];

const COLORS = ["#1E3A8A", "#0D9488", "#F59E0B", "#EF4444", "#8B5CF6"];

const FinancialSummary = () => {
  const [mounted, setMounted] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Delay the animation slightly to ensure the component is mounted
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Calculate totals for income and expenses
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalIncome - totalExpense;
  const isPositiveNet = netIncome >= 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Income & Expense Summary */}
      <Card className="lg:col-span-2 shadow-sm animate-fade-in">
        <CardHeader>
          <CardTitle>Income vs. Expenses</CardTitle>
          <CardDescription>Your financial flow over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="h-[300px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[...incomeData.map(item => ({ 
                      name: item.name, 
                      income: animateChart ? item.amount : 0, 
                      expense: animateChart ? expenseData.find(e => e.name === item.name)?.amount || 0 : 0
                    }))]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#888' }} />
                    <YAxis 
                      tick={{ fill: '#888' }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelStyle={{ color: '#333' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      name="Income"
                      stroke="#1E3A8A" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expense" 
                      name="Expenses"
                      stroke="#EF4444" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            
            <TabsContent value="table">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full financial-data">
                  <thead className="bg-muted text-money-slate">
                    <tr>
                      <th className="text-left p-3">Month</th>
                      <th className="text-right p-3">Income</th>
                      <th className="text-right p-3">Expenses</th>
                      <th className="text-right p-3">Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((item, index) => {
                      const expense = expenseData[index]?.amount || 0;
                      const net = item.amount - expense;
                      return (
                        <tr key={item.name} className="border-b last:border-b-0">
                          <td className="p-3 text-left">{item.name}</td>
                          <td className="p-3 text-right">{formatCurrency(item.amount)}</td>
                          <td className="p-3 text-right">{formatCurrency(expense)}</td>
                          <td className={`p-3 text-right ${net >= 0 ? 'text-money-success' : 'text-money-error'}`}>
                            {formatCurrency(net)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Financial Stats */}
      <div className="space-y-6">
        {/* Total Income */}
        <Card className="shadow-sm animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold financial-data">{formatCurrency(totalIncome)}</span>
              <div className="bg-money-success/10 text-money-success rounded-full p-1">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card className="shadow-sm animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold financial-data">{formatCurrency(totalExpense)}</span>
              <div className="bg-money-error/10 text-money-error rounded-full p-1">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
          </CardContent>
        </Card>

        {/* Net Income */}
        <Card className="shadow-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold financial-data ${
                isPositiveNet ? 'text-money-success' : 'text-money-error'
              }`}>
                {formatCurrency(netIncome)}
              </span>
              <div className={`rounded-full p-1 ${
                isPositiveNet ? 'bg-money-success/10 text-money-success' : 'bg-money-error/10 text-money-error'
              }`}>
                {isPositiveNet ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="shadow-sm animate-fade-in" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={animateChart ? 0 : 9999}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialSummary;
