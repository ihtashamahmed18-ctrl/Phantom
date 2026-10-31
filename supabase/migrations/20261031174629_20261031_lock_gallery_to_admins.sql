/*
# Lock gallery management to administrators

1. Overview
- Keeps gallery photos readable by signed-in regular users.
- Restricts gallery photo creation, editing, and deletion to users whose immutable Supabase app metadata role is `admin`.
- Restricts gallery storage uploads, updates, and deletions to administrators.

2. Existing Objects Modified
- `gallery_photos`: existing CRUD grants and policies are replaced with read-for-authenticated and write-for-admin rules.
- `storage.objects` in the `gallery` bucket: existing write policies are replaced with admin-only rules.
- `storage.buckets.gallery`: changes the bucket to private so uploaded files are not permanently public by URL.

3. Security
- Authorization is derived from `auth.jwt() -> 'app_metadata'`, which users cannot edit themselves.
- No client-provided role, email, or URL is trusted for authorization.
- Anonymous users receive no gallery database or storage access.

4. Important Notes
- Static gallery assets bundled with the website remain available to signed-in viewers.
- Uploaded gallery records should be displayed through signed URLs when they are added to the public gallery view.
- The admin panel must use a session whose app metadata includes `role: admin`.
*/

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON gallery_photos FROM anon;
GRANT SELECT ON gallery_photos TO authenticated;
GRANT INSERT, UPDATE, DELETE ON gallery_photos TO authenticated;

DROP POLICY IF EXISTS "anon_select_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "anon_insert_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "anon_update_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "anon_delete_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "authenticated_select_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "admin_insert_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "admin_update_gallery_photos" ON gallery_photos;
DROP POLICY IF EXISTS "admin_delete_gallery_photos" ON gallery_photos;

CREATE POLICY "authenticated_select_gallery_photos"
ON gallery_photos FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "admin_insert_gallery_photos"
ON gallery_photos FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_update_gallery_photos"
ON gallery_photos FOR UPDATE
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_delete_gallery_photos"
ON gallery_photos FOR DELETE
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

UPDATE storage.buckets
SET public = false
WHERE id = 'gallery';

DROP POLICY IF EXISTS "gallery_public_read" ON storage.objects;
DROP POLICY IF EXISTS "gallery_public_insert" ON storage.objects;
DROP POLICY IF EXISTS "gallery_public_update" ON storage.objects;
DROP POLICY IF EXISTS "gallery_public_delete" ON storage.objects;
DROP POLICY IF EXISTS "gallery_authenticated_read" ON storage.objects;
DROP POLICY IF EXISTS "gallery_admin_insert" ON storage.objects;
DROP POLICY IF EXISTS "gallery_admin_update" ON storage.objects;
DROP POLICY IF EXISTS "gallery_admin_delete" ON storage.objects;

CREATE POLICY "gallery_authenticated_read"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'gallery');

CREATE POLICY "gallery_admin_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallery'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "gallery_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'gallery'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
  bucket_id = 'gallery'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "gallery_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallery'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);