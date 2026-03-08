import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function isSupabaseConfigured(): boolean {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || key === "your-supabase-anon-key") return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
        return false;
    }
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Only check auth if Supabase is configured
    if (isSupabaseConfigured()) {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            redirect("/login");
        }
    }

    return (
        <div className="pt-20">
            <div className="container-wide py-8">{children}</div>
        </div>
    );
}
