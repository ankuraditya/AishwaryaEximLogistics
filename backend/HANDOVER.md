# Application handover

## Components

- React and Vite public website
- Laravel REST API and administration API
- MySQL content and enquiry database
- Public and private media storage

## Routine administration

Administrators can manage website settings, media, categories, subcategories, products, gallery items, blog posts and enquiry statuses through authenticated API endpoints. Access is controlled by role and permission.

## Release verification

Run these commands before every release:

```text
vendor/bin/pint --test
php artisan test
php artisan migrate:status
npm run lint
npm run build
```

## Operational requirements

- Monitor application errors, failed queue jobs, disk usage, certificate expiry and `/api/v1/health`.
- Back up the database, public media and private uploads using encrypted restricted storage.
- Apply dependency updates first in staging and rerun the complete quality gate.
- Never publish unverified contact details, certifications, export destinations, MOQ values or testimonials.

## Client acceptance

Final acceptance requires written approval of business content, branding, product data, legal text, enquiry delivery, responsive presentation and production-domain behavior.
