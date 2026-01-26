export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#e5e5e5] border-t-[#1a1a1a]" />
    </div>
  );
}
