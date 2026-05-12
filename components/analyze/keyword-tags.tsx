export function KeywordTags({ keywords }: { keywords: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <span
          className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700"
          key={keyword}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}
