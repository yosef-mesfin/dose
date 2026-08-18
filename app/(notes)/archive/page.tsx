import NoteLists from '@/components/notes/note-lists';

export default async function Archive({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll p-2">
      <div className="flex-1 mt-6">
        <NoteLists isArchived={true} isTrashed={false} query={q} />
      </div>
    </div>
  );
}
