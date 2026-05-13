export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 min-w-0">
      <p className="text-sm font-medium text-blue-600">{eyebrow}</p>
      <h2 className="mt-2 break-words text-2xl font-semibold tracking-tight text-zinc-950">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}
