import { useState, createElement } from "react";
import { Link, useLocation } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
} from "lucide-react";
import { navModules, groups, dashboardItem, aiAssistantItem } from "@/lib/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const toggleModule = (key: string) => {
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location === path || location.startsWith(path + "/");
  };

  const isModuleActive = (moduleKey: string) => {
    const mod = navModules.find((m) => m.key === moduleKey);
    if (!mod) return false;
    return mod.subItems.some((s) => isActive(s.path));
  };

  // Auto-expand the active module
  const activeModuleKey = navModules.find((m) => m.subItems.some((s) => isActive(s.path)))?.key;
  if (activeModuleKey && !expandedModules[activeModuleKey] && expandedModules[activeModuleKey] === undefined) {
    // Will be set on first render
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-200 shrink-0 ${
          collapsed ? "w-[52px]" : "w-[250px]"
        }`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-3 border-b border-sidebar-border shrink-0">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
                <Building2 className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-sm block leading-tight" style={{ fontFamily: "var(--font-heading)" }}>RE-ERP</span>
                <span className="text-[10px] text-sidebar-foreground/50 block leading-none">BMS Platform</span>
              </div>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center mx-auto">
              <Building2 className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 overflow-hidden">
          <nav className="px-1.5 py-1.5">
            {/* Dashboard */}
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={dashboardItem.path}>
                    <div className={`flex items-center justify-center h-8 w-full rounded-md mb-0.5 transition-colors ${
                      isActive(dashboardItem.path)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}>
                      {createElement(dashboardItem.icon, { className: "h-4 w-4" })}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">{dashboardItem.label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link href={dashboardItem.path}>
                <div className={`flex items-center gap-2 h-8 px-2 rounded-md text-[13px] mb-0.5 transition-colors ${
                  isActive(dashboardItem.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}>
                  {createElement(dashboardItem.icon, { className: "h-4 w-4 shrink-0" })}
                  <span className="truncate">{dashboardItem.label}</span>
                </div>
              </Link>
            )}

            {/* Module Groups */}
            {groups.map((group) => {
              const modules = navModules.filter((m) => m.group === group);
              if (modules.length === 0) return null;
              return (
                <div key={group}>
                  {!collapsed && (
                    <div className="px-2 pt-4 pb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-foreground/35">
                        {group}
                      </span>
                    </div>
                  )}
                  {collapsed && <div className="my-2 mx-2 border-t border-sidebar-border/50" />}

                  {modules.map((mod) => {
                    const modActive = isModuleActive(mod.key);
                    const isExpanded = expandedModules[mod.key] ?? modActive;

                    if (collapsed) {
                      return (
                        <Tooltip key={mod.key} delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Link href={mod.subItems[0].path}>
                              <div className={`flex items-center justify-center h-8 w-full rounded-md mb-0.5 transition-colors ${
                                modActive
                                  ? "bg-sidebar-primary/15 text-sidebar-primary"
                                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              }`}>
                                {createElement(mod.icon, { className: "h-4 w-4" })}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="text-xs">
                            <div className="font-medium mb-1">{mod.label}</div>
                            <div className="space-y-0.5">
                              {mod.subItems.map((sub) => (
                                <div key={sub.path} className="text-muted-foreground">{sub.label}</div>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return (
                      <div key={mod.key}>
                        {/* Module Header - clickable to expand/collapse */}
                        <button
                          onClick={() => toggleModule(mod.key)}
                          className={`flex items-center gap-2 h-8 px-2 rounded-md text-[13px] w-full mb-0.5 transition-colors ${
                            modActive
                              ? "bg-sidebar-primary/10 text-sidebar-primary font-medium"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          {createElement(mod.icon, { className: "h-4 w-4 shrink-0" })}
                          <span className="truncate flex-1 text-left">{mod.label}</span>
                          <ChevronRight className={`h-3 w-3 shrink-0 transition-transform duration-200 opacity-50 ${
                            isExpanded ? "rotate-90" : ""
                          }`} />
                        </button>

                        {/* Sub-items */}
                        {isExpanded && (
                          <div className="ml-3 pl-3 border-l border-sidebar-border/40 space-y-0.5 mb-1">
                            {mod.subItems.map((sub) => (
                              <Link key={sub.path} href={sub.path}>
                                <div className={`flex items-center gap-2 h-7 px-2 rounded-md text-[12px] transition-colors ${
                                  isActive(sub.path)
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                    : "text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }`}>
                                  {createElement(sub.icon, { className: "h-3.5 w-3.5 shrink-0" })}
                                  <span className="truncate">{sub.label}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer: AI + Collapse */}
        <div className="border-t border-sidebar-border p-1.5 space-y-0.5">
          {collapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={aiAssistantItem.path}>
                  <div className={`flex items-center justify-center h-8 w-full rounded-md transition-colors ${
                    isActive(aiAssistantItem.path)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}>
                    {createElement(aiAssistantItem.icon, { className: "h-4 w-4" })}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">{aiAssistantItem.label}</TooltipContent>
            </Tooltip>
          ) : (
            <Link href={aiAssistantItem.path}>
              <div className={`flex items-center gap-2 h-8 px-2 rounded-md text-[13px] transition-colors ${
                isActive(aiAssistantItem.path)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}>
                {createElement(aiAssistantItem.icon, { className: "h-4 w-4 shrink-0" })}
                <span className="truncate">{aiAssistantItem.label}</span>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-7 text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}
