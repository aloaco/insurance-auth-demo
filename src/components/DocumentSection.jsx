export default function DocumentSection({
  title,
  content,
  placeholder,
  isEditable,
  isFilled,
  isHighlighted,
  isCurrentField
}) {
  const borderClass = isCurrentField
    ? 'border-2 border-[#7c3aed]'
    : isFilled
      ? 'border-2 border-[#22c55e]'
      : isEditable
        ? 'border-2 border-[#fca5a5]'
        : 'border border-[#e5e5e5]';

  const titleClass = isCurrentField
    ? 'text-[#7c3aed]'
    : isFilled
      ? 'text-[#166534]'
      : isEditable
        ? 'text-[#dc2626]'
        : 'text-[#666]';

  const contentClass = isFilled || content ? 'text-[#1a1a1a]' : 'text-[#999]';

  return (
    <div
      className={`mb-5 rounded-xl bg-white px-5 py-4 transition-all duration-300 ${borderClass} ${
        isHighlighted ? 'shadow-[0_0_0_2px_rgba(124,58,237,0.2)]' : ''
      }`}
    >
      <div
        className={`mb-2 flex items-center gap-2 text-[11px] font-normal uppercase tracking-[0.5px] ${titleClass}`}
      >
        {title}
        {isFilled && (
          <span className="text-[10px] font-normal text-[#22c55e]">✓ Complete</span>
        )}
        {isCurrentField && !isFilled && (
          <span className="rounded-full border border-[#7c3aed] bg-white px-2 py-[2px] text-[10px] text-[#7c3aed]">
            Current
          </span>
        )}
        {isEditable && !isFilled && !isCurrentField && (
          <span className="text-[10px] font-normal text-[#dc2626]">Required</span>
        )}
      </div>
      <div className={`whitespace-pre-wrap text-[14px] leading-[1.6] ${contentClass}`}>
        {content || placeholder || 'No content'}
      </div>
    </div>
  );
}
