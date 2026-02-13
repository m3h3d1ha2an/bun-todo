#!/usr/bin/env bash

set -e

MAX_LENGTH=30   # safe limit for project name

# ---------- Generate random fallback ----------
generate_random_name() {
  if command -v openssl >/dev/null 2>&1; then
    echo "app$(openssl rand -hex 3)"
  else
    echo "app$(date +%s | tail -c 6)"
  fi
}

# ---------- Extract project name ----------
PROJECT_NAME=""
if [ -f package.json ]; then
  if command -v jq >/dev/null 2>&1; then
    PROJECT_NAME=$(jq -r '.name // empty' package.json)
  else
    PROJECT_NAME=$(grep '"name"' package.json 2>/dev/null | head -1 | sed -E 's/.*"name": *"([^"]+)".*/\1/')
  fi
fi

# ---------- Fallback if missing ----------
if [ -z "$PROJECT_NAME" ] || [ "$PROJECT_NAME" = "null" ]; then
  PROJECT_NAME=$(generate_random_name)
fi

# ---------- Compress if too long ----------
if [ ${#PROJECT_NAME} -gt $MAX_LENGTH ]; then
  SHORT_NAME=""
  IFS='-' read -ra PARTS <<< "$PROJECT_NAME"
  for part in "${PARTS[@]}"; do
    FIRST_LETTER=$(echo "$part" | cut -c1)
    if [ -n "$FIRST_LETTER" ]; then
      SHORT_NAME="${SHORT_NAME}${FIRST_LETTER}"
    fi
  done
  PROJECT_NAME="$SHORT_NAME"
fi

# ---------- Remove non-alphanumeric chars ----------
PROJECT_NAME=$(echo "$PROJECT_NAME" | tr -cd 'a-zA-Z0-9')

# ---------- Final fallback ----------
if [ -z "$PROJECT_NAME" ]; then
  PROJECT_NAME=$(generate_random_name)
fi

DB_USER="$PROJECT_NAME"
DB_NAME="${PROJECT_NAME}DB"

# ---------- Generate secure password ----------
if command -v openssl >/dev/null 2>&1; then
  DB_PASS=$(openssl rand -hex 16)
else
  DB_PASS=$(head -c 32 /dev/urandom | tr -dc a-z0-9 | head -c 32)
fi

# ---------- Create docker-compose.yaml ----------
if [ ! -f docker-compose.yaml ]; then
  cat <<EOF > docker-compose.yaml
services:
  postgres:
    image: postgres:18-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: "${DB_USER}"
      POSTGRES_PASSWORD: "${DB_PASS}"
      POSTGRES_DB: "${DB_NAME}"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
EOF
  echo "docker-compose.yaml created."
else
  echo "docker-compose.yaml already exists. Skipping."
fi

# ---------- Create or update .env with host DATABASE_URL ----------
touch .env

# Host URL for apps running on the host machine
DATABASE_URL="postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"

# Only append if DATABASE_URL is not already present
if ! grep -qE "^DATABASE_URL=" .env; then
  echo "DATABASE_URL=\"$DATABASE_URL\"" >> .env
  echo "Added DATABASE_URL to .env"
else
  echo "DATABASE_URL already exists in .env, skipping"
fi

echo ""
echo "Setup complete."
echo "Host DATABASE_URL: ${DATABASE_URL}"
echo "Run: docker compose up -d"