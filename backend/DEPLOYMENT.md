# Production deployment

Use this checklist only after the domain, server, database, mail service and backup destination have been approved.

1. Copy `.env.production.example` to `.env` on the server and replace every blank or example value.
2. Point the web-server document root to Laravel's `public` directory. Deny access to dotfiles, `.env`, storage internals and repository metadata.
3. Install production dependencies with `composer install --no-dev --optimize-autoloader`.
4. Run `php artisan migrate --force` and `php artisan storage:link`.
5. Run `php artisan config:cache`, `php artisan route:cache` and `php artisan view:cache`.
6. Run a supervised queue worker with automatic restart and configure the scheduler to execute `php artisan schedule:run` every minute.
7. Build the React application from its production environment and deploy `dist` with SPA fallback to `index.html`.
8. Enable HTTPS, HTTP-to-HTTPS redirection, compression and long-lived immutable caching for hashed assets.
9. Schedule encrypted database and uploaded-media backups. Test a restoration before launch.
10. Verify `/api/v1/health`, public catalogue routes, admin authentication, settings, media upload and all three enquiry types.

Never commit production credentials or copy guessed business information into the CMS.
