-- DROP DATABASE IF EXISTS "myshop-fullstack";

CREATE DATABASE "myshop-fullstack";
\c "myshop-fullstack";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public."products" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" VARCHAR(255) NOT NULL,
  "image" VARCHAR(255) NOT NULL,
  "price" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public."users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "auth_method" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()

);

