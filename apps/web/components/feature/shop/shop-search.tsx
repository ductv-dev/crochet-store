"use client";

import { Input } from "@workspace/ui/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";

export const ShopSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const debouncedSearch = useDebounce(search, 500);

    // Sync local state with URL params
    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        if (urlSearch !== search) {
            setSearch(urlSearch);
        }
    }, [searchParams]);

    // Update URL when local state changes (debounced)
    useEffect(() => {
        if (debouncedSearch === (searchParams.get("search") || "")) return;

        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }
        params.set("page", "1"); // Reset page
        router.push(`/shop?${params.toString()}`);
    }, [debouncedSearch, router]); // Removed searchParams from dependency to avoid loop

    return (
        <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};
