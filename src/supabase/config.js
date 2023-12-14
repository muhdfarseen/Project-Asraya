import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rtdhczyjpazzivukdrvj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0ZGhjenlqcGF6eml2dWtkcnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NDEwMzcsImV4cCI6MjAwNjExNzAzN30.RPI_2ya4cSw_ZRzcfgrbCxqfyHlhIVUI1L3eItJPQ2U';

export const supabase = createClient(supabaseUrl, supabaseKey);
 