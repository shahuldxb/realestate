import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "datetime" | "textarea" | "select" | "email" | "tel" | "currency";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: any;
  hidden?: boolean;
  readOnly?: boolean;
  width?: "full" | "half";
}

interface CrudFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  fields: FieldDef[];
  initialData?: Record<string, any> | null;
  title: string;
  loading?: boolean;
}

export default function CrudForm({
  open,
  onClose,
  onSubmit,
  fields,
  initialData,
  title,
  loading = false,
}: CrudFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      const init: Record<string, any> = {};
      fields.forEach((f) => {
        if (initialData && initialData[f.name] != null) {
          let val = initialData[f.name];
          if (f.type === "date" && val) {
            val = String(val).split("T")[0];
          }
          init[f.name] = val;
        } else if (f.defaultValue != null) {
          init[f.name] = f.defaultValue;
        } else {
          init[f.name] = "";
        }
      });
      setFormData(init);
    }
  }, [open, initialData, fields]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Clean up empty strings to null
      const cleaned: Record<string, any> = {};
      for (const [k, v] of Object.entries(formData)) {
        const field = fields.find((f) => f.name === k);
        if (field?.hidden) continue;
        if (v === "" || v === undefined) {
          cleaned[k] = null;
        } else if (field?.type === "number" || field?.type === "currency") {
          cleaned[k] = v === null ? null : Number(v);
        } else {
          cleaned[k] = v;
        }
      }
      await onSubmit(cleaned);
    } finally {
      setSubmitting(false);
    }
  };

  const visibleFields = fields.filter((f) => !f.hidden);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-[var(--font-heading)] text-lg">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid grid-cols-2 gap-4 py-2">
              {visibleFields.map((field) => (
                <div key={field.name} className={field.width === "full" || field.type === "textarea" ? "col-span-2" : ""}>
                  <Label htmlFor={field.name} className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    {field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      rows={3}
                      className="text-sm"
                    />
                  ) : field.type === "select" ? (
                    <Select
                      value={String(formData[field.name] ?? "")}
                      onValueChange={(v) => handleChange(field.name, v)}
                      disabled={field.readOnly}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type === "currency" ? "number" : field.type === "datetime" ? "datetime-local" : field.type || "text"}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      required={field.required}
                      step={field.type === "currency" || field.type === "number" ? "any" : undefined}
                      className="h-9 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting || loading}>
              {submitting && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
              {initialData ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
