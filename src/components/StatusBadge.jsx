import { HugeiconsIcon } from '@hugeicons/react';
import {
  CancelCircleIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  PhoneCheckIcon
} from '@hugeicons/core-free-icons';

const STATUS_CONFIG = {
  Approved: {
    label: 'Approved',
    textClass: 'text-[#1f6a3a]',
    Icon: CheckmarkCircle01Icon
  },
  Pending: {
    label: 'Pending',
    textClass: 'text-[#8b5a1f]',
    Icon: Clock01Icon
  },
  'Needs Peer-to-Peer': {
    label: 'Peer-to-Peer',
    textClass: 'text-[#5531c5]',
    Icon: PhoneCheckIcon
  },
  Denied: {
    label: 'Denied',
    textClass: 'text-[#9b2c2c]',
    Icon: CancelCircleIcon
  }
};

export default function StatusBadge({ status }) {
  const { label, textClass, Icon } = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white text-[12px] font-normal tracking-[0.2px] ${textClass}`}
    >
      {Icon && (
        <HugeiconsIcon
          icon={Icon}
          size={14}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
