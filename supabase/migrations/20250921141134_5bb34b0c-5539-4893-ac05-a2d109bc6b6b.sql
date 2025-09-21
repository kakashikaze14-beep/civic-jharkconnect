-- Just add the missing columns, trigger already exists
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium';
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS images text[];
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS latitude double precision;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS longitude double precision;

-- Add municipality field to profiles for municipal users  
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS municipality text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;