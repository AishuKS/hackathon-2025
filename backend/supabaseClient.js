// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hlukoxhmbcnfiqlhcrqt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsdWtveGhtYmNuZmlxbGhjcnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzA0MjMsImV4cCI6MjA1OTQ0NjQyM30.slShPhkFFI_7eFZxdAoGEb3F7x1b345vp-2rAospVqc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = { supabase };

