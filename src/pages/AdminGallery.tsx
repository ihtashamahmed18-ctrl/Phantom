import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Image as ImageIcon, Loader2, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

type AdminPhoto = {
  id: string;
  title: string;
  category: string;
  storage_path: string;
  image_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
};

export default function AdminGallery() {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [photos, setPhotos] = useState<AdminPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadPhotos = useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('id, title, category, storage_path, image_url, file_name, file_size, mime_type, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      setMessage('Gallery records could not be loaded.');
      setLoading(false);
      return;
    }

    setPhotos((data ?? []) as AdminPhoto[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const requireAdmin = async (): Promise<boolean> => {
    const { data } = await supabase.auth.getSession();
    const currentSession = data.session;

    if (!currentSession) {
      navigate('/sign-in', { state: { from: '/admin/dashboard' } });
      return false;
    }

    if (currentSession.user.app_metadata?.role !== 'admin') {
      setMessage('This action is available only to the admin account.');
      return false;
    }

    return true;
  };

  const handleBulkUpload = async (files: FileList | null) => {
    if (!files?.length || !(await requireAdmin())) return;
    setUploading(true);
    setMessage(null);

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
          throw new Error('invalid-file');
        }

        const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const storagePath = `admin/${crypto.randomUUID()}.${extension}`;
        const { error: storageError } = await supabase.storage
          .from('gallery')
          .upload(storagePath, file, { cacheControl: '31536000', upsert: false, contentType: file.type });

        if (storageError) throw storageError;

        const { error: recordError } = await supabase.from('gallery_photos').insert({
          title: file.name.replace(/\.[^.]+$/, ''),
          description: null,
          category: 'New Work',
          storage_path: storagePath,
          image_url: '',
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          sort_order: 0,
        });

        if (recordError) throw recordError;
      }

      setMessage(`${files.length} photo${files.length === 1 ? '' : 's'} added to the gallery.`);
      await loadPhotos();
    } catch {
      setMessage('Some photos could not be added. Please check the file type and size.');
    } finally {
      setUploading(false);
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(photos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lts-gallery-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPhoto = async (photo: AdminPhoto) => {
    if (!(await requireAdmin())) return;

    const { data, error } = await supabase.storage.from('gallery').createSignedUrl(photo.storage_path, 60);
    if (error || !data?.signedUrl) {
      setMessage('This photo could not be prepared for download.');
      return;
    }

    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = photo.file_name;
    link.target = '_blank';
    link.click();
  };

  return (
    <>
      <section className="bg-ink-950 pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">{username || 'Dashboard access'}</span>
          <h1 className="mt-4 font-serif text-5xl text-cream-50 lg:text-7xl">Gallery Management</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-100/60">Bulk upload new work, review managed photos, and export gallery records.</p>
        </div>
      </section>

      <section className="bg-cream-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-4 border border-ink-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex cursor-pointer items-center justify-center gap-3 bg-ink-800 px-6 py-3 text-sm font-semibold tracking-wide text-cream-50 transition-colors hover:bg-ink-700">
              {uploading ? <Loader2 size={17} className="animate-spin" /> : <Upload size={17} />}
              {uploading ? 'Uploading...' : 'Bulk Upload Photos'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" onChange={(event) => handleBulkUpload(event.target.files)} disabled={uploading} />
            </label>
            <button onClick={exportData} className="inline-flex items-center justify-center gap-3 border border-ink-300 px-6 py-3 text-sm font-semibold tracking-wide text-ink-700 transition-colors hover:border-gold-500 hover:text-gold-700">
              <Download size={17} /> Export Gallery Data
            </button>
          </div>

          {message && <p className="mt-5 border border-gold-200 bg-gold-50 p-4 text-sm text-ink-600">{message}</p>}

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-ink-400" /></div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <article key={photo.id} className="border border-ink-200 bg-white p-4">
                  <div className="flex aspect-[4/3] items-center justify-center bg-ink-50 text-ink-300"><ImageIcon size={38} /></div>
                  <p className="mt-4 text-xs uppercase tracking-wide text-gold-600">{photo.category}</p>
                  <h2 className="mt-1 font-serif text-xl text-ink-800">{photo.title}</h2>
                  <button onClick={() => downloadPhoto(photo)} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-gold-700"><Download size={15} /> Download photo</button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
