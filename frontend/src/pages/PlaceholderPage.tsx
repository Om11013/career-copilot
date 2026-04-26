export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center text-zinc-500">
      <h2 className="mb-4 text-2xl font-semibold text-zinc-900">{title}</h2>
      <p className="max-w-md">
        This feature is currently under development. Please check back later.
      </p>
    </div>
  );
}
