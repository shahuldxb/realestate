import axios from "axios";

// In production, use the Render backend URL; in dev, use the Vite proxy
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Generic CRUD functions
export async function fetchList(endpoint: string, params?: Record<string, any>) {
  const { data } = await api.get(endpoint, { params });
  return data;
}

export async function fetchOne(endpoint: string, id: number | string) {
  const { data } = await api.get(`${endpoint}/${id}`);
  return data;
}

export async function createRecord(endpoint: string, payload: Record<string, any>) {
  const { data } = await api.post(endpoint, payload);
  return data;
}

export async function updateRecord(endpoint: string, id: number | string, payload: Record<string, any>) {
  const { data } = await api.put(`${endpoint}/${id}`, payload);
  return data;
}

export async function deleteRecord(endpoint: string, id: number | string) {
  const { data } = await api.delete(`${endpoint}/${id}`);
  return data;
}

export async function fetchDashboard() {
  const { data } = await api.get("/dashboard");
  return data;
}

export async function fetchSchema(tableName: string) {
  const { data } = await api.get(`/schema/${tableName}`);
  return data;
}

export async function aiChat(message: string, module?: string) {
  const { data } = await api.post("/ai/chat", { message, module });
  return data;
}

export async function aiExecuteMutation(query: string) {
  const { data } = await api.post("/ai/execute-mutation", { query });
  return data;
}

export default api;
