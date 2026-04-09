const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://gpfouzawbqkmhepsblyd.supabase.co';
const supabaseKey = 'sb_publishable_Rh6xKttMnmCqqkOjxqU48g_xjFMT6BR';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;