"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditorRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to homepage where the unified studio now resides
    router.replace("/");
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-zinc-50 text-zinc-900">
      <div className="flex flex-col gap-4 max-w-sm">
        <h1 className="text-xl font-bold">Redirecting...</h1>
        <p className="text-xs text-zinc-500">
          We are redirecting you to the unified PixelCode studio on the homepage.
        </p>
      </div>
    </div>
  );
}
