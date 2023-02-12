# Laravel (9.19) Inertia (1.0.0) React (18.2.0) Stack with Bootstrap (5.2.3) Quickstart Guide

1. Download the repository files as zip and unzip it in the correct directory on your machine
2. Create `.env` file
3. Paste contents from `.env.example` file into `.env`
4. Add DB credentials
5. Run `composer install`
6. Run `php artisan key:generate`
7. Run `php artisan migrate`
8. Run `npm install` 
9. Run `npm run dev`
10. Open second terminal and run `php artisan serve`

# Expose guide:
1. Go to expose.dev
2. Create an account
3. Follow the first 3 (!) instructions on https://expose.dev/dashboard
4. Start your project with `npm run dev` and `php artisan serve` in seperate terminals
5. Open a third terminal and run `expose share http://127.0.0.1:8000`
6. Use the https url provided by expose within your React native app to access the Laravel Api endpoints
