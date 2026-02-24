# ============================================================
# Stage 1: Build the React frontend
# ============================================================
FROM node:22-slim AS frontend-build

WORKDIR /frontend

# Copy frontend files
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY frontend/ ./
RUN pnpm run build

# ============================================================
# Stage 2: Python backend + serve frontend static files
# ============================================================
FROM python:3.11-slim

# Install ODBC Driver 17 for SQL Server
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl apt-transport-https gnupg2 unixodbc-dev gcc g++ && \
    curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend into backend's static_frontend directory
COPY --from=frontend-build /frontend/dist/public ./static_frontend

# Render sets PORT dynamically; default to 10000 if not set
ENV PORT=10000
EXPOSE ${PORT}

# Use shell form so $PORT is expanded at runtime
CMD gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120
