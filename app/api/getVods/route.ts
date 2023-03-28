import { supabase } from "@/lib/supabaseClient";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const mapa = searchParams.get('mapa')
    let res: PostgrestSingleResponse<{ [x: string]: any; }[]>;

    if (mapa == 'undefined' || mapa == null) {
        res = await supabase.from('VODS').select().order('fecha', { ascending: false })
    } else {
        res = await supabase.from('VODS').select().eq('mapa', mapa).order('fecha', { ascending: false })
    }

    return new Response(JSON.stringify(res.data))
}

export async function POST(request: Request) {
    if (request.body != null) {
        var string = new TextDecoder().decode((await request.body.getReader().read()).value);
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
}

export async function DELETE(request: Request) {
    if (request.body != null) {
        var string = new TextDecoder().decode((await request.body.getReader().read()).value);
        let id = JSON.parse(string).id
    
        const { error } = await supabase
        .from('VODS')
        .delete()
        .eq('id', id)
    
        return new Response(JSON.stringify({ ok: true }))
    }
    return new Response(JSON.stringify({ ok: false }))
}