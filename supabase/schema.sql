-- Schema for البوابة الجمالية الدقهلية

-- Ensure extensions
create extension if not exists "pgcrypto";

-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('admin', 'editor', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  category text check (category in ('transportation', 'government', 'health', 'beauty', 'education')),
  title text not null,
  description text,
  contact_info jsonb,
  location text,
  price_range text,
  rating numeric(3,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles(id)
);

-- Posts table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  type text check (type in ('news', 'article', 'facebook_post', 'blog')),
  facebook_post_id text unique,
  cover_image text,
  author_id uuid references public.profiles(id),
  views integer default 0,
  likes integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments table
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id),
  content text not null,
  parent_id uuid references public.comments(id),
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Service reviews table
create table if not exists public.service_reviews (
  id uuid default gen_random_uuid() primary key,
  service_id uuid references public.services(id) on delete cascade,
  user_id uuid references public.profiles(id),
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site settings table (contact & integrations)
create table if not exists public.site_settings (
  id uuid default gen_random_uuid() primary key,
  site_name text default 'البوابة الجمالية الدقهلية',
  facebook_page_id text,
  facebook_access_token text,
  contact_email text,
  phone_number text,
  address text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed settings row if none exists
insert into public.site_settings (site_name)
select 'البوابة الجمالية الدقهلية'
where not exists (select 1 from public.site_settings);

-- Auto create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
