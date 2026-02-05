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

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.service_reviews enable row level security;
alter table public.site_settings enable row level security;

-- Profiles policies
create policy "Profiles are viewable by owner"
on public.profiles
for select
using (auth.uid() = id);

create policy "Profiles are insertable by owner"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id);

-- Services policies
create policy "Services are viewable by everyone"
on public.services
for select
using (true);

create policy "Services are insertable by owner"
on public.services
for insert
with check (auth.uid() = user_id);

create policy "Services are updatable by owner or admin"
on public.services
for update
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Services are deletable by owner or admin"
on public.services
for delete
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Posts policies
create policy "Posts are viewable when published or by owner/admin"
on public.posts
for select
using (
  is_published
  or auth.uid() = author_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Posts are insertable by owner"
on public.posts
for insert
with check (auth.uid() = author_id);

create policy "Posts are updatable by owner or admin"
on public.posts
for update
using (
  auth.uid() = author_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Posts are deletable by owner or admin"
on public.posts
for delete
using (
  auth.uid() = author_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Comments policies
create policy "Comments are viewable when approved or by owner/admin"
on public.comments
for select
using (
  is_approved
  or auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Comments are insertable by owner"
on public.comments
for insert
with check (auth.uid() = user_id);

create policy "Comments are updatable by owner or admin"
on public.comments
for update
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Comments are deletable by owner or admin"
on public.comments
for delete
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Service reviews policies
create policy "Service reviews are viewable by everyone"
on public.service_reviews
for select
using (true);

create policy "Service reviews are insertable by owner"
on public.service_reviews
for insert
with check (auth.uid() = user_id);

create policy "Service reviews are updatable by owner or admin"
on public.service_reviews
for update
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Service reviews are deletable by owner or admin"
on public.service_reviews
for delete
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Site settings policies
create policy "Site settings are viewable by admins"
on public.site_settings
for select
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Site settings are insertable by admins"
on public.site_settings
for insert
with check (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "Site settings are updatable by admins"
on public.site_settings
for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

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
