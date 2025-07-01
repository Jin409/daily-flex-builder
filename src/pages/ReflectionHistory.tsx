
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, List, Heart, Brain, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ReflectionEntry {
  id: string;
  date: Date;
  category: '사회적 유연성' | '인지적 유연성' | '감정적 유연성';
  title: string;
  reflection: string;
}

const mockReflections: ReflectionEntry[] = [
  {
    id: '1',
    date: new Date(2025, 0, 29),
    category: '사회적 유연성',
    title: '처음 보는 사람에게 먼저 인사하기',
    reflection: '처음엔 긴장했지만 점차 편안해졌어요. 생각보다 사람들이 친근하게 반응해주었어요. 더 자연스럽게 대화를 이어가고 싶어요.'
  },
  {
    id: '2',
    date: new Date(2025, 0, 28),
    category: '인지적 유연성',
    title: '내 의견과 반대되는 입장 끝까지 듣기',
    reflection: '평소라면 중간에 반박했을 텐데, 끝까지 들어보니 새로운 관점을 발견했어요. 다양한 시각을 받아들이는 것이 생각보다 어렵지 않았어요.'
  },
  {
    id: '3',
    date: new Date(2025, 0, 27),
    category: '감정적 유연성',
    title: '하루 동안 모른다는 말 3번 하기',
    reflection: '완벽해야 한다는 압박에서 조금 벗어날 수 있었어요. 모르는 것을 인정하니 오히려 더 많이 배울 수 있었습니다.'
  }
];

const categoryConfig = {
  '사회적 유연성': {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Users,
    dotColor: '#3B82F6'
  },
  '인지적 유연성': {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Brain,
    dotColor: '#8B5CF6'
  },
  '감정적 유연성': {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: Heart,
    dotColor: '#10B981'
  }
};

const ReflectionHistory = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState('list');

  const getReflectionsForDate = (date: Date) => {
    return mockReflections.filter(reflection => 
      reflection.date.toDateString() === date.toDateString()
    );
  };

  const getDatesWithReflections = () => {
    return mockReflections.map(reflection => reflection.date);
  };

  const renderCalendarDay = (date: Date) => {
    const reflections = getReflectionsForDate(date);
    if (reflections.length === 0) return null;

    const reflection = reflections[0];
    const config = categoryConfig[reflection.category];
    
    return (
      <div className="relative">
        <div 
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: config.dotColor }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              성장 기록
            </h1>
            <p className="text-gray-600">
              지금까지의 유연성 여정을 돌아보세요
            </p>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              목록으로 보기
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              달력으로 보기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {mockReflections.map((reflection) => {
              const config = categoryConfig[reflection.category];
              const IconComponent = config.icon;
              
              return (
                <Card key={reflection.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
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
            })}
          </TabsContent>

          <TabsContent value="calendar" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                  modifiers={{
                    hasReflection: getDatesWithReflections()
                  }}
                  modifiersStyles={{
                    hasReflection: { 
                      fontWeight: 'bold',
                      position: 'relative'
                    }
                  }}
                  components={{
                    Day: ({ date, ...props }) => (
                      <div className="relative">
                        <button {...props} />
                        {renderCalendarDay(date)}
                      </div>
                    )
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
                    const reflections = getReflectionsForDate(selectedDate);
                    if (reflections.length === 0) {
                      return (
                        <div className="text-center py-8 text-gray-500">
                          <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>이 날에는 기록된 회고가 없습니다</p>
                        </div>
                      );
                    }
                    
                    return reflections.map((reflection) => {
                      const config = categoryConfig[reflection.category];
                      const IconComponent = config.icon;
                      
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReflectionHistory;
