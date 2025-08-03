FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www

# Install dependencies and cron
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip \
    git \
    nano \
    libzip-dev \
    cron \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Copy entrypoint script
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set file ownership
RUN chown -R www-data:www-data /var/www

# Expose port
EXPOSE 8000

# Run entrypoint
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
