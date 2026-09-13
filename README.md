# Aishwary Exim & Logistics

Full-stack website and content-management system for Aishwary Exim & Logistics.

## Structure

- `frontend/` — React 19 and Vite public website
- `backend/` — Laravel 13 API and administration CMS

## Local setup

### Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
npm install
npm run build
php artisan serve --host=127.0.0.1 --port=8000
```

Create the first CMS administrator when needed:

```bash
php artisan admin:create
```

Optional sample certificate documents, all visibly marked as non-legal samples:

```bash
php artisan db:seed --class=DummyCertificationsSeeder
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev -- --host 127.0.0.1
```

Set `VITE_API_BASE_URL` in `frontend/.env` to the public Laravel API URL, including `/api/v1`.

## Verification

```bash
cd backend && php artisan test
cd frontend && npm run lint && npm run build
```

See `backend/DEPLOYMENT.md` and `backend/HANDOVER.md` for additional operational guidance.
