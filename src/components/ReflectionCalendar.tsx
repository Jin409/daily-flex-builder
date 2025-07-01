
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Users, Brain, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReflectionEntry, categoryConfig } from '@/types/reflection';

interface ReflectionCalendarProps {
  reflections: ReflectionEntry[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const iconMap = {
  'Users': Users,
  'Brain': Brain,
  'Heart': Heart
};

const ReflectionCalendar = ({ reflections, selectedDate, onSelectDate }: ReflectionCalendarProps) => {
  const getReflectionsForDate = (date: Date) => {
    return reflections.filter(reflection => 
      reflection.date.toDateString() === date.toDateString()
    );
  };

  const getDatesWithReflections = () => {
    return reflections.map(reflection => reflection.date);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 달력 */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-orange-600" />
            성장 달력
          </CardTitle>
          <CardDescription>
            날짜를 클릭하여 해당일의 회고를 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md border-0"
            modifiers={{
              hasReflection: getDatesWithReflections()
            }}
            modifiersStyles={{
              hasReflection: { 
                fontWeight: 'bold',
                backgroundColor: '#FFF7ED',
                color: '#EA580C'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* 선택된 날짜의 회고 */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedDate ? format(selectedDate, 'MM월 dd일', { locale: ko }) : '날짜를 선택하세요'}
          </CardTitle>
          <CardDescription>선택한 날짜의 성장 기록</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            (() => {
              const dayReflections = getReflectionsForDate(selectedDate);
              if (dayReflections.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>이 날에는 기록된 회고가 없습니다</p>
                  </div>
                );
              }
              
              return dayReflections.map((reflection) => {
                const config = categoryConfig[reflection.category];
                const IconComponent = iconMap[config.icon as keyof typeof iconMap];
                
                return (
                  <div key={reflection.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-pink-100">
                        <IconComponent className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{reflection.title}</h3>
                        <Badge variant="outline" className={`${config.color} mt-1`}>
                          {reflection.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {reflection.reflection}
                      </p>
                    </div>
                  </div>
                );
              });
            })()
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>날짜를 선택해주세요</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReflectionCalendar;
