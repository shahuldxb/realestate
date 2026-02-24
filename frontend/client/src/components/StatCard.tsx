import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export default function StatCard({ title, value, icon, description, trend, className = "" }: StatCardProps) {
  return (
    <Card className={`${className}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold font-[var(--font-heading)] tracking-tight">{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {trend && (
              <p className={`text-xs font-medium ${trend.positive ? "text-emerald-600" : "text-red-600"}`}>
                {trend.positive ? "+" : ""}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
