import { supabase } from "@/lib/supabaseClient";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('mapa')
    let res: PostgrestSingleResponse<{ [x: string]: any; }[]>;

    if (id == 'undefined' || id == null) {
        res = await supabase.from('Mapas').select()
    } else {
        res = await supabase.from('Mapas').select().eq('id', id)
    }

    return new Response(JSON.stringify(res.data))
}