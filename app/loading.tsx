import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6">
      <PageSkeleton />
    </main>
  );
}
