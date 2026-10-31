/*
# Create gallery_photos table and storage bucket

## Overview
This migration creates the database table and storage infrastructure
for the portfolio gallery feature. Users can upload their own photos
to replace the placeholder images, and export/download photos from the
gallery.

## New Tables
- `gallery_photos`
  - `id` (uuid, primary key)
  - `title` (text, name of the photo)
  - `description` (text, optional description)
  - `category` (text, category label for filtering)
  - `storage_path` (text, path to file in storage bucket)
  - `image_url` (text, public URL of the stored image)
  - `file_name` (text, original file name)
  - `file_size` (bigint, file size in bytes)
  - `mime_type` (text, MIME type of the file)
  - `sort_order` (integer, display ordering, defaults to 0)
  - `created_at` (timestamptz, creation timestamp)
  - `updated_at` (timestamptz, last update timestamp)

## Storage
- Creates a public storage bucket `gallery` for image uploads.
- Policies allow public read and anon/authenticated upload/update/delete.

## Security
- RLS enabled on `gallery_photos`.
- CRUD granted to `anon` + `authenticated` (single-tenant, no auth).
- All policies use `TO anon, authenticated` so the anon-key client can
  operate without sign-in.
- Storage bucket is public for read; write/delete allowed for all.

## Notes
1. This is a single-tenant demo app with no sign-in, so all data is
   intentionally public/shared.
2. The storage bucket allows image MIME types only, up to 10MB.
3. The `image_url` column stores the public URL for easy frontend display.
*/

CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'General',
  storage_path text NOT NULL,
  image_url text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL DEFAULT 'image/jpeg',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON gallery_photos TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_gallery_photos" ON gallery_photos;
CREATE POLICY "anon_select_gallery_photos"
ON gallery_photos FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_gallery_photos" ON gallery_photos;
CREATE POLICY "anon_insert_gallery_photos"
ON gallery_photos FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_gallery_photos" ON gallery_photos;
CREATE POLICY "anon_update_gallery_photos"
ON gallery_photos FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_gallery_photos" ON gallery_photos;
CREATE POLICY "anon_delete_gallery_photos"
ON gallery_photos FOR DELETE
TO anon, authenticated USING (true);

-- Create the gallery storage bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, anyone can upload/update/delete
DROP POLICY IF EXISTS "gallery_public_read" ON storage.objects;
CREATE POLICY "gallery_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "gallery_public_insert" ON storage.objects;
CREATE POLICY "gallery_public_insert"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "gallery_public_update" ON storage.objects;
CREATE POLICY "gallery_public_update"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'gallery')
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "gallery_public_delete" ON storage.objects;
CREATE POLICY "gallery_public_delete"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'gallery');
