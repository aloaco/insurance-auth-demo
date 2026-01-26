import {
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconPhoneCall
} from '@tabler/icons-react';

const STATUS_CONFIG = {
  Approved: {
    label: 'Approved',
    textClass: 'text-[#1f6a3a]',
    Icon: IconCircleCheck
  },
  Pending: {
    label: 'Pending',
    textClass: 'text-[#8b5a1f]',
    Icon: IconClock
  },
  'Needs Peer-to-Peer': {
    label: 'Peer-to-Peer',
    textClass: 'text-[#5531c5]',
    Icon: IconPhoneCall
  },
  Denied: {
    label: 'Denied',
    textClass: 'text-[#9b2c2c]',
    Icon: IconCircleX
  }
};

export default function StatusBadge({ status }) {
  const { label, textClass, Icon } = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white text-[12px] font-normal tracking-[0.2px] ${textClass}`}
    >
      {Icon && <Icon size={14} stroke={1.8} aria-hidden="true" />}
      {label}
    </span>
  );
}
