#!/usr/bin/env bash

. .env

pnpm supabase gen types --lang=typescript --project-id $SUPABASE_PROJECT_ID --schema public > ./lib/types/supabase.d.ts
