-- One-time bootstrap. Paste this into the Supabase Studio SQL Editor and run it.
-- It creates a SECURITY DEFINER function the migrate.ts script can call via
-- `supabase.rpc('exec_sql', { query: '...' })` to run arbitrary DDL.
--
-- Only the service-role key can call it (we revoke from anon/authenticated).

create or replace function public.exec_sql(query text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  execute query;
end;
$$;

revoke all on function public.exec_sql(text) from public, anon, authenticated;
grant execute on function public.exec_sql(text) to service_role;
