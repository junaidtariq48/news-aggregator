#!/bin/bash

# Wait for DB
echo "Waiting for DB..."
until php artisan migrate:status > /dev/null 2>&1; do
  sleep 2
done

# Migrate
php artisan migrate --force

# Run the news fetch command once at startup
php artisan news:fetch-guardian
php artisan news:fetch-newsapi
php artisan news:fetch-nytimes

echo "🚀 Starting Laravel scheduler..."
# Run scheduler continuously
php artisan schedule:work &

echo "🚀 Starting Laravel server..."
# Start Laravel server
php artisan serve --host=0.0.0.0 --port=8000
