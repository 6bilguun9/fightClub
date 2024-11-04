import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jvpzdppupsoesmvzbbra.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cHpkcHB1cHNvZXNtdnpiYnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzY0ODUsImV4cCI6MjA0NjI1MjQ4NX0.GoTlNB8EzbVxOYVSu_nwegfRcDUJ9nT8XiKJKLRqZS4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
