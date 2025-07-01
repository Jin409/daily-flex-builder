
import React from 'react';
import ReflectionCard from './ReflectionCard';
import { ReflectionEntry } from '@/types/reflection';

interface ReflectionListProps {
  reflections: ReflectionEntry[];
}

const ReflectionList = ({ reflections }: ReflectionListProps) => {
  return (
    <div className="space-y-4">
      {reflections.map((reflection) => (
        <ReflectionCard key={reflection.id} reflection={reflection} />
      ))}
    </div>
  );
};

export default ReflectionList;
