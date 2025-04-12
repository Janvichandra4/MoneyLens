
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, BarChart3, AlertTriangle, CheckCircle2, RefreshCcw } from "lucide-react";

interface Activity {
  id: string;
  type: "document" | "insight" | "alert" | "action" | "achievement";
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "document",
    title: "Bank Statement Processed",
    description: "Your monthly bank statement was successfully processed",
    time: "2 hours ago",
    icon: FileText,
    iconColor: "text-money-blue",
    iconBg: "bg-money-blue/10",
  },
  {
    id: "2",
    type: "insight",
    title: "Spending Pattern Detected",
    description: "Your food expenses have increased by 15% this month",
    time: "8 hours ago",
    icon: BarChart3,
    iconColor: "text-money-teal",
    iconBg: "bg-money-teal/10",
  },
  {
    id: "3",
    type: "alert",
    title: "Unusual Transaction",
    description: "Large transaction of $248.99 at Tech Store",
    time: "Yesterday",
    icon: AlertTriangle,
    iconColor: "text-money-warning",
    iconBg: "bg-money-warning/10",
  },
  {
    id: "4",
    type: "achievement",
    title: "Budget Goal Reached",
    description: "You've stayed under your entertainment budget this month!",
    time: "2 days ago",
    icon: CheckCircle2,
    iconColor: "text-money-success",
    iconBg: "bg-money-success/10",
  },
  {
    id: "5",
    type: "action",
    title: "Bill Payment Reminder",
    description: "Your electricity bill of $87.45 is due in 3 days",
    time: "3 days ago",
    icon: RefreshCcw,
    iconColor: "text-money-error",
    iconBg: "bg-money-error/10",
  },
];

const ActivityFeed = () => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedActivities = showAll ? activities : activities.slice(0, 3);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Badge variant="outline" className="font-normal">
          {activities.length} activities
        </Badge>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4 animate-staggered">
          {displayedActivities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className={`${activity.iconBg} rounded-full p-2 h-fit`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-money-slate">{activity.title}</h3>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}

          {activities.length > 3 && (
            <Button
              variant="ghost"
              className="w-full text-money-blue hover:text-money-blue/80 hover:bg-money-blue/5 mt-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : "View all activities"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
