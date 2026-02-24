import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface DetailField {
  key: string;
  label: string;
  type?: "text" | "currency" | "date" | "status" | "percent" | "number";
}

interface DetailViewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any> | null;
  fields: DetailField[];
}

const statusColors: Record<string, string> = {
  "Active": "bg-emerald-100 text-emerald-800",
  "In-Progress": "bg-blue-100 text-blue-800",
  "Completed": "bg-emerald-100 text-emerald-800",
  "Planning": "bg-amber-100 text-amber-800",
  "Pending": "bg-amber-100 text-amber-800",
  "Open": "bg-sky-100 text-sky-800",
  "Closed": "bg-gray-100 text-gray-700",
};

function formatValue(val: any, type?: string): React.ReactNode {
  if (val == null || val === "") return <span className="text-muted-foreground">—</span>;
  switch (type) {
    case "currency":
      return <span className="font-mono">{new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", minimumFractionDigits: 0 }).format(Number(val))}</span>;
    case "date":
      try {
        return new Date(val).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      } catch {
        return String(val);
      }
    case "status":
      return <Badge variant="secondary" className={`text-xs ${statusColors[val] || "bg-gray-100 text-gray-700"}`}>{val}</Badge>;
    case "percent":
      return <span className="font-mono">{Number(val).toFixed(1)}%</span>;
    case "number":
      return <span className="font-mono">{Number(val).toLocaleString()}</span>;
    default:
      return String(val);
  }
}

export default function DetailView({ open, onClose, title, data, fields }: DetailViewProps) {
  if (!data) return null;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-[480px] sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle className="font-[var(--font-heading)]">{title}</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4 pr-4">
            {fields.map((f) => (
              <div key={f.key} className="grid grid-cols-[140px_1fr] gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-0.5">{f.label}</span>
                <span className="text-sm">{formatValue(data[f.key], f.type)}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
