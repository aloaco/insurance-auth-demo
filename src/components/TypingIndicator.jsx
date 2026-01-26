export default function TypingIndicator() {
  return (
    <div className="mb-4 flex justify-start">
      <div className="flex items-center gap-[5px] rounded-[4px_20px_20px_20px] bg-[#f5f5f5] px-[18px] py-[14px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[7px] w-[7px] animate-typing-bounce rounded-full bg-[#1a1a1a]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
