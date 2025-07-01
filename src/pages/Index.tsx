
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Lightbulb, Star, Calendar } from 'lucide-react';
import DailyMission from '@/components/DailyMission';
import ReflectionDialog from '@/components/ReflectionDialog';
import StatsPanel from '@/components/StatsPanel';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [experience, setExperience] = useState(45);
  const [completedMissions, setCompletedMissions] = useState(12);
  const [streak, setStreak] = useState(3);
  const [showReflection, setShowReflection] = useState(false);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const { toast } = useToast();

  const experienceToNextLevel = 100;
  const progressPercentage = (experience / experienceToNextLevel) * 100;

  const handleMissionComplete = () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      setShowReflection(true);
      toast({
        title: "미션 완료! 🎉",
        description: "오늘의 유연성 미션을 완료했습니다. 회고를 작성해보세요.",
      });
    }
  };

  const handleReflectionSubmit = (reflection: string) => {
    setExperience(prev => Math.min(prev + 15, experienceToNextLevel));
    setCompletedMissions(prev => prev + 1);
    setStreak(prev => prev + 1);
    
    toast({
      title: "성장 기록 완료! ✨",
      description: "회고를 통해 더 깊은 성장을 이루었습니다.",
    });

    // 레벨업 체크
    if (experience + 15 >= experienceToNextLevel) {
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
        setExperience(0);
        toast({
          title: "레벨 업! 🚀",
          description: `축하합니다! 유연성 레벨 ${currentLevel + 1}에 도달했습니다.`,
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Re:try
          </h1>
          <p className="text-gray-600 text-lg">
            매일 조금씩, 더 유연한 나로 성장하기
          </p>
        </div>

        {/* 메인 대시보드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 유저 프로필 & 레벨 */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-xl">유연성 레벨 {currentLevel}</CardTitle>
              <CardDescription>다음 레벨까지 {experienceToNextLevel - experience}XP</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="mb-4" />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{completedMissions}</div>
                  <div className="text-sm text-gray-600">완료한 미션</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{streak}</div>
                  <div className="text-sm text-gray-600">연속 달성일</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 오늘의 미션 */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-600" />
                <CardTitle>오늘의 유연성 미션</CardTitle>
                {todayCompleted && (
                  <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-800">
                    완료
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <DailyMission 
                onComplete={handleMissionComplete}
                isCompleted={todayCompleted}
              />
            </CardContent>
          </Card>
        </div>

        {/* 통계 및 성장 기록 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">나의 성장 여정</h2>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/reflections'}
              className="bg-white/80 hover:bg-white border-orange-200 text-orange-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              성장 기록 보기
            </Button>
          </div>
          <StatsPanel />
        </div>

        {/* 격려 메시지 */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-semibold mb-1">오늘의 인사이트</h3>
                <p className="opacity-90">
                  작은 변화가 큰 성장을 만듭니다. 오늘도 한 걸음 더 나아가세요! 💪
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 회고 다이얼로그 */}
        <ReflectionDialog 
          open={showReflection}
          onClose={() => setShowReflection(false)}
          onSubmit={handleReflectionSubmit}
        />
      </div>
    </div>
  );
};

export default Index;
