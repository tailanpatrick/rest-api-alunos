// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ynmpgcgwwrvvjrlbkvwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlubXBnY2d3d3J2dmpybGJrdndpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODA2OTIzNCwiZXhwIjoyMDUzNjQ1MjM0fQ.xHX-LTdgnsPy3uZcp77TRdhdNHwE8_UU9jL46V4llpw';

export const supabase = createClient(supabaseUrl, supabaseKey);
