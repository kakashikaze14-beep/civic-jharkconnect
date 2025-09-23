-- Create citizens table for phone-based authentication
CREATE TABLE public.citizens (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admins table for admin authentication
CREATE TABLE public.admins (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create municipality users table
CREATE TABLE public.municipality_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    municipality TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create issues table for civic issue reporting
CREATE TABLE public.issues (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    citizen_name TEXT NOT NULL,
    citizen_phone TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    images TEXT[] DEFAULT '{}',
    address TEXT,
    municipality TEXT,
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    status TEXT DEFAULT 'Reported' CHECK (status IN ('Reported', 'In-progress', 'Resolved', 'Spam/Fraud')),
    ai_flags JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.municipality_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for citizens
CREATE POLICY "Citizens can view their own record" 
ON public.citizens 
FOR SELECT 
USING (true);

CREATE POLICY "Citizens can insert their own record" 
ON public.citizens 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for admins
CREATE POLICY "Admins can view all records" 
ON public.admins 
FOR ALL 
USING (true);

-- Create RLS policies for municipality users
CREATE POLICY "Municipality users can view all records" 
ON public.municipality_users 
FOR ALL 
USING (true);

-- Create RLS policies for issues
CREATE POLICY "Everyone can view all issues" 
ON public.issues 
FOR SELECT 
USING (true);

CREATE POLICY "Citizens can insert issues" 
ON public.issues 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins and municipality users can update issues" 
ON public.issues 
FOR UPDATE 
USING (true);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_issues_updated_at
    BEFORE UPDATE ON public.issues
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_citizens_phone ON public.citizens (phone);
CREATE INDEX idx_admins_user_id ON public.admins (user_id);
CREATE INDEX idx_municipality_users_user_id ON public.municipality_users (user_id);
CREATE INDEX idx_issues_municipality ON public.issues (municipality);
CREATE INDEX idx_issues_status ON public.issues (status);
CREATE INDEX idx_issues_category ON public.issues (category);