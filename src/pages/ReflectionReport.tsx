
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockReflections } from '@/types/reflection';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { ko } from 'date-fns/locale';

const ReflectionReport = () => {
  const navigate = useNavigate();
  
  const thisWeek = {
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 })
  };

  const myReflections = mockReflections.filter(r => r.isOwner);
  const thisWeekReflections = myReflections.filter(r => 
    isWithinInterval(r.date, thisWeek)
  );
  
  const completedCount = myReflections.filter(r => r.status === 'completed').length;
  const attemptedCount = myReflections.filter(r => r.status === 'failed').length;
  const totalCount = myReflections.length;

  const categoryStats = myReflections.reduce((acc, reflection) => {
    const category = reflection.category;
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    acc[category].total++;
    if (reflection.status === 'completed') {
      acc[category].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              성장 레포트
            </h1>
            <p className="text-gray-600">
              나의 유연성 여정을 한눈에 확인해보세요
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* 전체 통계 */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                전체 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{totalCount}</div>
                  <div className="text-sm text-gray-600">총 실천 횟수</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                  <div className="text-sm text-gray-600">완료한 미션</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{attemptedCount}</div>
                  <div className="text-sm text-gray-600">시도한 미션</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 이번 주 활동 */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                이번 주 활동
              </CardTitle>
              <CardDescription>
                {format(thisWeek.start, 'MM월 dd일', { locale: ko })} - {format(thisWeek.end, 'MM월 dd일', { locale: ko })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {thisWeekReflections.length > 0 ? (
                <div className="space-y-3">
                  {thisWeekReflections.map((reflection) => (
                    <div key={reflection.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">{reflection.title}</h4>
                        <p className="text-sm text-gray-600">{reflection.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          reflection.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : reflection.status === 'failed'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {reflection.status === 'completed' ? '완료' : reflection.status === 'failed' ? '시도함' : '진행중'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(reflection.date, 'MM/dd')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  이번 주에는 아직 실천한 미션이 없습니다.
                </div>
              )}
            </CardContent>
          </Card>

          {/* 카테고리별 성과 */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                카테고리별 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryStats).map(([category, stats]) => {
                  const rate = Math.round((stats.completed / stats.total) * 100);
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category}</span>
                        <span className="text-sm text-gray-600">
                          {stats.completed}/{stats.total}
                        </span>
                      </div>
                      <Progress value={rate} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 성장 키워드 */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                성장 키워드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.keys(categoryStats).map((category) => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                다양한 영역에서 꾸준히 성장하고 계시네요! 
                {completedCount >= 5 ? ' 정말 대단해요! 🎉' : ' 조금씩 나아가고 있어요! 💪'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReflectionReport;
