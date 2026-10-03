#!/bin/sh

echo "Waiting test database..."

sleep 5

echo "Applying test migrations..."

DATABASE_URL=$TEST_DATABASE_URL npx prisma migrate deploy

echo "Running tests..."

DATABASE_URL=$TEST_DATABASE_URL npx jest --runInBand

echo "Tests completed."