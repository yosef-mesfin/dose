import NoteLists from '@/components/notes/note-lists';

export default function Archive({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll p-2">
      <div className="flex-1 mt-6">
        <NoteLists isArchived={true} isTrashed={false} query={searchParams.q} />
      </div>
    </div>
  );
}
