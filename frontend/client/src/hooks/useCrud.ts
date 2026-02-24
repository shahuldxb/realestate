import { useState, useEffect, useCallback } from "react";
import { fetchList, createRecord, updateRecord, deleteRecord } from "@/lib/api";
import { toast } from "sonner";

interface UseCrudOptions {
  endpoint: string;
  idField?: string;
  entityName?: string;
  autoLoad?: boolean;
}

export default function useCrud({ endpoint, idField = "id", entityName = "Record", autoLoad = true }: UseCrudOptions) {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteItem, setDeleteItem] = useState<any | null>(null);
  const [viewItem, setViewItem] = useState<any | null>(null);

  const load = useCallback(async (params?: Record<string, any>) => {
    setLoading(true);
    try {
      const result = await fetchList(endpoint, params);
      // Handle both array and {data, total} response formats
      if (Array.isArray(result)) {
        setData(result);
        setTotal(result.length);
      } else {
        setData(result.data || []);
        setTotal(result.total || 0);
      }
    } catch (err: any) {
      toast.error(`Failed to load ${entityName}s: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint, entityName]);

  useEffect(() => {
    if (autoLoad) load();
  }, [autoLoad, load]);

  const handleCreate = useCallback(() => {
    setEditItem(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((row: any) => {
    setEditItem(row);
    setFormOpen(true);
  }, []);

  const handleView = useCallback((row: any) => {
    setViewItem(row);
  }, []);

  const handleDeleteClick = useCallback((row: any) => {
    setDeleteItem(row);
  }, []);

  const handleSubmit = useCallback(async (formData: Record<string, any>) => {
    try {
      if (editItem) {
        await updateRecord(endpoint, editItem[idField], formData);
        toast.success(`${entityName} updated successfully`);
      } else {
        await createRecord(endpoint, formData);
        toast.success(`${entityName} created successfully`);
      }
      setFormOpen(false);
      setEditItem(null);
      await load();
    } catch (err: any) {
      toast.error(`Failed to save ${entityName}: ${err.message}`);
      throw err;
    }
  }, [editItem, endpoint, idField, entityName, load]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteItem) return;
    try {
      await deleteRecord(endpoint, deleteItem[idField]);
      toast.success(`${entityName} deleted successfully`);
      setDeleteItem(null);
      await load();
    } catch (err: any) {
      toast.error(`Failed to delete ${entityName}: ${err.message}`);
    }
  }, [deleteItem, endpoint, idField, entityName, load]);

  return {
    data,
    total,
    loading,
    formOpen,
    setFormOpen,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    viewItem,
    setViewItem,
    load,
    handleCreate,
    handleEdit,
    handleView,
    handleDeleteClick,
    handleSubmit,
    handleDeleteConfirm,
  };
}
