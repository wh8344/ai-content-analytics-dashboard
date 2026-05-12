import { CheckCircle2 } from "lucide-react";

export function SuggestionList({ suggestions }: { suggestions: string[] }) {
  return (
    <ul className="space-y-3">
      {suggestions.map((suggestion) => (
        <li className="flex gap-3 text-sm text-zinc-700" key={suggestion}>
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <span>{suggestion}</span>
        </li>
      ))}
    </ul>
  );
}
