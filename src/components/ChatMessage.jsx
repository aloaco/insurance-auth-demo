export default function ChatMessage({ message, isSystem }) {
  return (
    <div
      className={`mb-4 flex animate-fade-in ${
        isSystem ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`max-w-[85%] px-[18px] py-[14px] text-[15px] leading-[1.5] ${
          isSystem
            ? 'rounded-[4px_20px_20px_20px] bg-[#f5f5f5] text-[#1a1a1a]'
            : 'rounded-[20px_20px_4px_20px] bg-[#1a1a1a] text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
