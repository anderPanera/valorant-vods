import { createClient } from '@supabase/supabase-js'

const baseurl = process.env.BASE_URL
const apikey = process.env.API_KEY

export const supabase = createClient(baseurl, apikey)