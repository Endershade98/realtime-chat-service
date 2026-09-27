#!/bin/sh

echo "Waiting for postgres..."

sleep 5

echo "Running prisma migrations..."

npx prisma migrate deploy

echo "Generating prisma client..."

npx prisma generate

echo "Starting server..."

node src/presentation/http/server.js