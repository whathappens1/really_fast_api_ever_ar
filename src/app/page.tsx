"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);
      // once deployed, prefix this with your cloudflare worker url
      // i.e.: https://<name>.<account-name>.workers.dev/api/search?q=${input}

      const res = await fetch(`/api/search?q=${input}`);
      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };
      setSearchResults(data);
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy" dir="rtl">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">البحث السريع ⚡</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          واجهة برمجة تطبيقات عالية الأداء تم إنشاؤها باستخدام Hono وNext.js
          وCloudflare.
          <br /> اكتب استعلامًا أدناه واحصل على نتائجك بالميلي ثانية.{" "}
        </p>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="إبحث عن الدول..."
              className="placeholder:text-zinc-500 pr-1"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>لا توجد نتائج.</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading="النتائج">
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />

                  <p className="p-2 text-xs text-zinc-500">
                    تم العثور على {searchResults.results.length} في{" "}
                    {searchResults?.duration.toFixed(0)}{' '}جزء من الثانية 
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
