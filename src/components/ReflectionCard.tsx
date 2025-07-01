
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Brain, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReflectionEntry, categoryConfig } from '@/types/reflection';

interface ReflectionCardProps {
  reflection: ReflectionEntry;
}

const iconMap = {
  'Users': Users,
  'Brain': Brain,
  'Heart': Heart
};

const ReflectionCard = ({ reflection }: ReflectionCardProps) => {
  const config = categoryConfig[reflection.category];
  const IconComponent = iconMap[config.icon as keyof typeof iconMap];
  
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-pink-100">
              <IconComponent className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-800">{reflection.title}</CardTitle>
              <CardDescription className="text-sm">
                {format(reflection.date, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={config.color}>
            {reflection.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">
          {reflection.reflection}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReflectionCard;
