-- Initial schema for admin CMS and public content

create extension if not exists "pgcrypto";

-- Helpers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Admins table
create table if not exists public.admins (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sections table
create table if not exists public.sections (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  icon text,
  color text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  section_id uuid references public.sections(id) on delete cascade,
  title text not null,
  slug text unique not null,
  description text,
  details text,
  tags text[],
  contact_phone text,
  contact_whatsapp text,
  address text,
  is_active boolean default true,
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ads table
create table if not exists public.ads (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text,
  image_url text,
  link_url text,
  start_at timestamp with time zone,
  end_at timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Announcements table
create table if not exists public.announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ad requests table
create table if not exists public.ad_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  title text not null,
  body text,
  link_url text,
  image_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Updated at triggers
create trigger sections_updated_at
before update on public.sections
for each row execute procedure public.set_updated_at();

create trigger services_updated_at
before update on public.services
for each row execute procedure public.set_updated_at();

create trigger ads_updated_at
before update on public.ads
for each row execute procedure public.set_updated_at();

create trigger announcements_updated_at
before update on public.announcements
for each row execute procedure public.set_updated_at();

create trigger ad_requests_updated_at
before update on public.ad_requests
for each row execute procedure public.set_updated_at();

-- RLS
alter table public.admins enable row level security;
alter table public.sections enable row level security;
alter table public.services enable row level security;
alter table public.ads enable row level security;
alter table public.announcements enable row level security;
alter table public.ad_requests enable row level security;

-- Policies: admins
create policy "Admins can read their row"
on public.admins
for select
using (auth.uid() = id);

create policy "Admins can manage admins"
on public.admins
for all
using (exists (select 1 from public.admins where id = auth.uid()))
with check (exists (select 1 from public.admins where id = auth.uid()));

-- Policies: sections
create policy "Sections are viewable when active or by admin"
on public.sections
for select
using (
  is_active
  or exists (select 1 from public.admins where id = auth.uid())
);

create policy "Sections are manageable by admins"
on public.sections
for all
using (exists (select 1 from public.admins where id = auth.uid()))
with check (exists (select 1 from public.admins where id = auth.uid()));

-- Policies: services
create policy "Services are viewable when active or by admin"
on public.services
for select
using (
  is_active
  or exists (select 1 from public.admins where id = auth.uid())
);

create policy "Services are manageable by admins"
on public.services
for all
using (exists (select 1 from public.admins where id = auth.uid()))
with check (exists (select 1 from public.admins where id = auth.uid()));

-- Policies: ads
create policy "Ads are viewable when active and within range or by admin"
on public.ads
for select
using (
  (
    is_active
    and (start_at is null or start_at <= timezone('utc'::text, now()))
    and (end_at is null or end_at >= timezone('utc'::text, now()))
  )
  or exists (select 1 from public.admins where id = auth.uid())
);

create policy "Ads are manageable by admins"
on public.ads
for all
using (exists (select 1 from public.admins where id = auth.uid()))
with check (exists (select 1 from public.admins where id = auth.uid()));

-- Policies: announcements
create policy "Announcements are viewable when active or by admin"
on public.announcements
for select
using (
  is_active
  or exists (select 1 from public.admins where id = auth.uid())
);

create policy "Announcements are manageable by admins"
on public.announcements
for all
using (exists (select 1 from public.admins where id = auth.uid()))
with check (exists (select 1 from public.admins where id = auth.uid()));

-- Policies: ad requests
create policy "Ad requests are insertable by everyone"
on public.ad_requests
for insert
with check (true);

create policy "Ad requests are viewable by admins"
on public.ad_requests
for select
using (exists (select 1 from public.admins where id = auth.uid()));

create policy "Ad requests are manageable by admins"
on public.ad_requests
for update
using (exists (select 1 from public.admins where id = auth.uid()))
with check (exists (select 1 from public.admins where id = auth.uid()));

create policy "Ad requests are deletable by admins"
on public.ad_requests
for delete
using (exists (select 1 from public.admins where id = auth.uid()));

-- Seed data
insert into public.sections (title, slug, description, icon, color, sort_order)
values
  ('الخدمات الحكومية', 'government', 'الدوائر والخدمات الرسمية في المدينة.', 'Landmark', 'bg-amber-100 text-amber-700', 1),
  ('الخدمات الصحية', 'health', 'عيادات وصيدليات ومراكز طبية.', 'HeartPulse', 'bg-emerald-100 text-emerald-700', 2),
  ('الجمال والعناية', 'beauty', 'صالونات ومراكز تجميل.', 'Sparkles', 'bg-pink-100 text-pink-700', 3),
  ('التعليم', 'education', 'دورات ومدارس ومراكز تدريب.', 'GraduationCap', 'bg-indigo-100 text-indigo-700', 4),
  ('النقل', 'transportation', 'خدمات تنقل داخل وخارج المدينة.', 'Bus', 'bg-sky-100 text-sky-700', 5),
  ('المنزل والأسرة', 'home', 'مستلزمات المنزل والخدمات الأسرية.', 'Home', 'bg-purple-100 text-purple-700', 6);

insert into public.services (section_id, title, slug, description, details, tags, contact_phone, contact_whatsapp, address, is_featured, sort_order)
select id, title, slug || '-service-1', 'خدمة مميزة داخل القسم.', 'تفاصيل الخدمة المميزة مع مزايا رمضان.', array['رمضان','خدمة'], '01000000001', '01000000001', 'الجمالية - الدقهلية', true, 1
from public.sections
limit 6;

insert into public.services (section_id, title, slug, description, details, tags, contact_phone, contact_whatsapp, address, is_featured, sort_order)
select id, title || ' المتقدم', slug || '-service-2', 'خدمة إضافية متاحة للحجز.', 'تفاصيل إضافية للمستخدمين.', array['عرض','خصم'], '01000000002', '01000000002', 'الجمالية - الدقهلية', false, 2
from public.sections
limit 4;

insert into public.ads (title, body, image_url, link_url, start_at, end_at)
values
  ('عرض رمضان', 'خصومات على خدمات العيادات طوال الشهر.', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'https://facebook.com', timezone('utc'::text, now()) - interval '1 day', timezone('utc'::text, now()) + interval '30 days'),
  ('إعلان محلي', 'خصم خاص للأسر في الجمالية.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 'https://facebook.com', timezone('utc'::text, now()) - interval '1 day', timezone('utc'::text, now()) + interval '15 days'),
  ('خدمات جديدة', 'اكتشف مزودي الخدمة الجدد.', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'https://facebook.com', timezone('utc'::text, now()) - interval '1 day', timezone('utc'::text, now()) + interval '20 days');

insert into public.announcements (title, body, is_active)
values
  ('إعلان رمضان', 'نرحب بجميع الزوار ونقدم لكم أفضل الخدمات الرمضانية.', true),
  ('تنويه', 'تابعونا يوميًا لعروض جديدة.', true);
