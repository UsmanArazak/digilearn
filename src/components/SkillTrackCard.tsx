'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface SkillTrackCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
}

export default function SkillTrackCard({ title, description, icon, href = '#' }: SkillTrackCardProps) {
  return (
    <Link
      href={href}
      className="block w-full bg-white rounded-2xl shadow-sm p-5 border border-accent/40 border-l-4 mb-4 active:scale-[0.98] transition-transform hover:shadow-md hover:border-accent/70"
    >
      <div className="flex items-start gap-4">
        <div className="bg-accent/20 text-gray-900 p-3 rounded-xl flex-shrink-0 border border-accent/40">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
