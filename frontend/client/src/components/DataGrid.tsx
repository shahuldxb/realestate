import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  type?: "text" | "number" | "date" | "currency" | "status" | "percent" | "badge";
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
  hidden?: boolean;
}

interface DataGridProps {
  columns: Column[];
  data: any[];
  total?: number;
  loading?: boolean;
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onCreate?: () => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  onRefresh?: () => void;
  idField?: string;
  pageSize?: number;
  actions?: boolean;
  extraActions?: (row: any) => React.ReactNode;
  emptyMessage?: string;
  headerExtra?: React.ReactNode;
}

type SortDir = "asc" | "desc" | null;

const statusColors: Record<string, string> = {
  "Active": "bg-emerald-100 text-emerald-800",
  "In-Progress": "bg-blue-100 text-blue-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Completed": "bg-emerald-100 text-emerald-800",
  "Planning": "bg-amber-100 text-amber-800",
  "Pending": "bg-amber-100 text-amber-800",
  "Open": "bg-sky-100 text-sky-800",
  "Closed": "bg-gray-100 text-gray-700",
  "New": "bg-indigo-100 text-indigo-800",
  "Qualified": "bg-violet-100 text-violet-800",
  "Contacted": "bg-cyan-100 text-cyan-800",
  "Converted": "bg-emerald-100 text-emerald-800",
  "Sold": "bg-emerald-100 text-emerald-800",
  "Available": "bg-sky-100 text-sky-800",
  "Leased": "bg-amber-100 text-amber-800",
  "Awarded": "bg-emerald-100 text-emerald-800",
  "Approved": "bg-emerald-100 text-emerald-800",
  "Paid": "bg-emerald-100 text-emerald-800",
  "Sent": "bg-blue-100 text-blue-800",
  "Overdue": "bg-red-100 text-red-800",
  "Scheduled": "bg-blue-100 text-blue-800",
  "Not Started": "bg-gray-100 text-gray-700",
  "Mitigated": "bg-emerald-100 text-emerald-800",
  "Under Negotiation": "bg-amber-100 text-amber-800",
  "Acquired": "bg-emerald-100 text-emerald-800",
  "Identified": "bg-sky-100 text-sky-800",
  "Under Contract": "bg-blue-100 text-blue-800",
  "Under Review": "bg-amber-100 text-amber-800",
  "Proposal": "bg-violet-100 text-violet-800",
  "Negotiation": "bg-amber-100 text-amber-800",
  "Qualification": "bg-sky-100 text-sky-800",
  "Received": "bg-emerald-100 text-emerald-800",
  "Ordered": "bg-blue-100 text-blue-800",
  "High": "bg-red-100 text-red-800",
  "Medium": "bg-amber-100 text-amber-800",
  "Low": "bg-sky-100 text-sky-800",
  "Good": "bg-emerald-100 text-emerald-800",
  "Fair": "bg-amber-100 text-amber-800",
  "Poor": "bg-red-100 text-red-800",
  "Present": "bg-emerald-100 text-emerald-800",
  "Absent": "bg-red-100 text-red-800",
  "Full-time": "bg-blue-100 text-blue-800",
  "Part-time": "bg-amber-100 text-amber-800",
  "Inward": "bg-emerald-100 text-emerald-800",
  "Outward": "bg-amber-100 text-amber-800",
  // Teller & Cheque statuses
  "Voided": "bg-red-100 text-red-800",
  "Reversed": "bg-orange-100 text-orange-800",
  "On Hand": "bg-sky-100 text-sky-800",
  "Deposited": "bg-blue-100 text-blue-800",
  "Cleared": "bg-emerald-100 text-emerald-800",
  "Bounced": "bg-red-100 text-red-800",
  "Replaced": "bg-teal-100 text-teal-800",
  "Cancelled": "bg-gray-100 text-gray-700",
  "Returned to Tenant": "bg-amber-100 text-amber-800",
  "Fully Cleared": "bg-emerald-100 text-emerald-800",
  "Partially Cleared": "bg-amber-100 text-amber-800",
  "Recovered": "bg-emerald-100 text-emerald-800",
  "Legal": "bg-red-100 text-red-800",
  "Written Off": "bg-gray-100 text-gray-700",
  "Insufficient Funds": "bg-red-100 text-red-800",
  "Account Closed": "bg-gray-100 text-gray-700",
  "Signature Mismatch": "bg-amber-100 text-amber-800",
  "Stop Payment": "bg-orange-100 text-orange-800",
  "Cash": "bg-emerald-100 text-emerald-800",
  "Cheque": "bg-blue-100 text-blue-800",
  "Credit Card": "bg-violet-100 text-violet-800",
  "Debit Card": "bg-indigo-100 text-indigo-800",
  "Bank Transfer": "bg-cyan-100 text-cyan-800",
  "Online": "bg-sky-100 text-sky-800",
  "Rent": "bg-blue-100 text-blue-800",
  "Security Deposit": "bg-amber-100 text-amber-800",
  "Maintenance Fee": "bg-teal-100 text-teal-800",
  "Penalty": "bg-red-100 text-red-800",
  "Warning Sent": "bg-amber-100 text-amber-800",
  "Legal Notice": "bg-orange-100 text-orange-800",
  "Police Case": "bg-red-100 text-red-800",
  "Court Case": "bg-red-100 text-red-800",
  "None": "bg-gray-100 text-gray-700",
};

function formatCurrency(val: any): string {
  if (val == null) return "—";
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
}

function formatDate(val: any): string {
  if (!val) return "—";
  try {
    const d = new Date(val);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return String(val);
  }
}

function formatPercent(val: any): string {
  if (val == null) return "—";
  return `${Number(val).toFixed(1)}%`;
}

export default function DataGrid({
  columns,
  data,
  total,
  loading = false,
  title,
  searchPlaceholder = "Search...",
  onSearch,
  onCreate,
  onEdit,
  onDelete,
  onView,
  onRefresh,
  idField = "id",
  pageSize: initialPageSize = 15,
  actions = true,
  extraActions,
  emptyMessage = "No records found.",
  headerExtra,
}: DataGridProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const visibleColumns = useMemo(() => columns.filter((c) => !c.hidden), [columns]);

  const filteredData = useMemo(() => {
    let result = [...data];
    if (search && !onSearch) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    }
    if (sortKey && sortDir) {
      result.sort((a, b) => {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        const cmp = String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, sortKey, sortDir, onSearch]);

  const pagedData = useMemo(() => {
    const start = page * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = useCallback((key: string) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
        return key;
      }
      setSortDir("asc");
      return key;
    });
  }, []);

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearch(val);
      setPage(0);
      if (onSearch) onSearch(val);
    },
    [onSearch]
  );

  const renderCell = (col: Column, row: any) => {
    const val = row[col.key];
    if (col.render) return col.render(val, row);
    switch (col.type) {
      case "currency":
        return <span className="font-mono text-sm">{formatCurrency(val)}</span>;
      case "date":
        return <span className="text-sm">{formatDate(val)}</span>;
      case "percent":
        return <span className="font-mono text-sm">{formatPercent(val)}</span>;
      case "status":
      case "badge":
        if (!val) return <span className="text-muted-foreground">—</span>;
        return (
          <Badge variant="secondary" className={`text-xs font-medium ${statusColors[val] || "bg-gray-100 text-gray-700"}`}>
            {val}
          </Badge>
        );
      case "number":
        return <span className="font-mono text-sm">{val != null ? Number(val).toLocaleString() : "—"}</span>;
      default:
        return <span className="text-sm">{val != null ? String(val) : "—"}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          {title && <h2 className="text-xl font-bold font-[var(--font-heading)]">{title}</h2>}
          {total != null && (
            <Badge variant="secondary" className="text-xs">{total} records</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 w-64 h-9 text-sm"
            />
          </div>
          {headerExtra}
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          )}
          {onCreate && (
            <Button size="sm" onClick={onCreate} className="gap-1.5">
              <Plus className="h-4 w-4" /> Add New
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {visibleColumns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground ${col.sortable !== false ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable !== false && (
                        <span className="inline-flex flex-col">
                          {sortKey === col.key && sortDir === "asc" ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : sortKey === col.key && sortDir === "desc" ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 opacity-30" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                {actions && (onEdit || onDelete || onView || extraActions) && (
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-28">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + (actions ? 1 : 0)} className="h-32 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <RefreshCw className="h-4 w-4 animate-spin" /> Loading...
                    </div>
                  </TableCell>
                </TableRow>
              ) : pagedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + (actions ? 1 : 0)} className="h-32 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                pagedData.map((row, idx) => (
                  <TableRow key={row[idField] ?? idx} className="hover:bg-muted/30 transition-colors">
                    {visibleColumns.map((col) => (
                      <TableCell key={col.key} className="py-2.5">
                        {renderCell(col, row)}
                      </TableCell>
                    ))}
                    {actions && (onEdit || onDelete || onView || extraActions) && (
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-1">
                          {onView && (
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onView(row)}>
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(row)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => onDelete(row)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {extraActions && extraActions(row)}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(0); }}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length}
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
