import { useEffect, useState } from "react";
import { fetchDashboard } from "@/lib/api";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FolderKanban,
  Building2,
  Users,
  UserPlus,
  DollarSign,
  Gavel,
  ShoppingCart,
  Megaphone,
  Headset,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const result = await fetchDashboard();
      setData(result);
    } catch (err: any) {
      toast.error("Failed to load dashboard: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const stats = data?.stats || {};

  const formatCurrency = (val: number) => {
    if (val >= 1_000_000) return `AED ${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `AED ${(val / 1_000).toFixed(0)}K`;
    return `AED ${val}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-[var(--font-heading)]">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Real Estate & Construction ERP Overview</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>
      <Separator />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Projects" value={stats.total_projects || 0} icon={<FolderKanban className="h-5 w-5" />} description={`${stats.active_projects || 0} active`} />
        <StatCard title="Properties" value={stats.total_properties || 0} icon={<Building2 className="h-5 w-5" />} description={`${stats.available_properties || 0} available`} />
        <StatCard title="Customers" value={stats.total_customers || 0} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Open Leads" value={stats.open_leads || 0} icon={<UserPlus className="h-5 w-5" />} description={`${stats.total_leads || 0} total`} />
        <StatCard title="Total Revenue" value={formatCurrency(stats.total_revenue || 0)} icon={<DollarSign className="h-5 w-5" />} />
        <StatCard title="Total Budget" value={formatCurrency(stats.total_budget || 0)} icon={<DollarSign className="h-5 w-5" />} />
        <StatCard title="Active Leases" value={stats.active_leases || 0} icon={<KeyRound className="h-5 w-5" />} />
        <StatCard title="Open Tickets" value={stats.open_tickets || 0} icon={<Headset className="h-5 w-5" />} />
        <StatCard title="Total Sales" value={stats.total_sales || 0} icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard title="Active Campaigns" value={stats.active_campaigns || 0} icon={<Megaphone className="h-5 w-5" />} />
        <StatCard title="Pending Bids" value={stats.pending_bids || 0} icon={<Gavel className="h-5 w-5" />} />
        <StatCard title="Employees" value={stats.total_employees || 0} icon={<Users className="h-5 w-5" />} />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-[var(--font-heading)]">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.recent_projects || []).map((p: any) => (
                <div key={p.project_id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{p.project_name}</p>
                    <p className="text-xs text-muted-foreground">{p.project_type} • {p.city}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {p.estimated_budget ? formatCurrency(p.estimated_budget) : "—"}
                    </span>
                    <Badge variant="secondary" className={`text-xs ${
                      p.status === "In-Progress" ? "bg-blue-100 text-blue-800" :
                      p.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>{p.status}</Badge>
                  </div>
                </div>
              ))}
              {(!data?.recent_projects || data.recent_projects.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No projects yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-[var(--font-heading)]">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.recent_leads || []).map((l: any) => (
                <div key={l.lead_id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{l.lead_name}</p>
                    <p className="text-xs text-muted-foreground">{l.interest_type} • {l.source}</p>
                  </div>
                  <Badge variant="secondary" className={`text-xs ${
                    l.status === "New" ? "bg-indigo-100 text-indigo-800" :
                    l.status === "Qualified" ? "bg-violet-100 text-violet-800" :
                    l.status === "Converted" ? "bg-emerald-100 text-emerald-800" :
                    "bg-sky-100 text-sky-800"
                  }`}>{l.status}</Badge>
                </div>
              ))}
              {(!data?.recent_leads || data.recent_leads.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
