'use client';

import { ReactNode } from 'react';

interface SkillTrackCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function SkillTrackCard({ title, description, icon }: SkillTrackCardProps) {
  return (
    <a href="#" className="block w-full bg-white rounded-2xl shadow-sm p-5 border border-gray-50 mb-4 active:scale-[0.98] transition-transform">
      <div className="flex items-start gap-4">
        <div className="bg-light-bg text-gray-700 p-3 rounded-xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </a>
  );
}
