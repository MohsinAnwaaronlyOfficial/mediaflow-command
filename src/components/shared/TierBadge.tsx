const tierClass: Record<string, string> = {
  T1: 'badge-t1',
  T2: 'badge-t2',
  T3: 'badge-t3',
  T4: 'badge-t4',
};

export default function TierBadge({ tier }: { tier: string }) {
  return (
    <span className={`${tierClass[tier] || tierClass.T4} rounded-full px-2.5 py-0.5 text-[10px] font-bold`}>
      {tier}
    </span>
  );
}
