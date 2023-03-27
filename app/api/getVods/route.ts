import { supabase } from "@/lib/supabaseClient";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const mapa = searchParams.get('mapa')
    let res: PostgrestSingleResponse<{ [x: string]: any; }[]>;

    if (mapa == 'undefined' || mapa == null) {
        res = await supabase.from('VODS').select()
    } else {
        res = await supabase.from('VODS').select().eq('mapa', mapa)
    }

    return new Response(JSON.stringify(res.data))
}

export async function POST(request: Request) {
    var string = new TextDecoder().decode((await request.body?.getReader().read()).value);
    let vod = JSON.parse(string).data

    const { error } = await supabase
    .from('VODS')
    .insert([
    { mapa: vod.mapa , link: vod.link, fecha: vod.fecha },
    ])

    if (error) {
        return new Response(JSON.stringify({ ok: false }))
    }

    return new Response(JSON.stringify({ ok: true }))
}