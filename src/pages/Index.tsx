import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Lightbulb, Star, BookOpen, BarChart2, Compass } from 'lucide-react';
import DailyMission from '@/components/DailyMission';
import ReflectionDialog from '@/components/ReflectionDialog';
import StatsPanel from '@/components/StatsPanel';
import { useToast } from '@/hooks/use-toast';
import UserTypeTest from '@/components/UserTypeTest';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [experience, setExperience] = useState(45);
  const [completedMissions, setCompletedMissions] = useState(12);
  const [streak, setStreak] = useState(3);
  const [showReflection, setShowReflection] = useState(false);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [showUserTypeTest, setShowUserTypeTest] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [targetType, setTargetType] = useState<string | null>(null);
  const [isFailed, setIsFailed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleMissionFailed = () => {
    setIsFailed(true);
    toast({
      title: '시도 완료!',
      description: '오늘의 미션을 시도해보셨군요. 내일은 더 잘할 수 있어요!',
    });
  };

  const handleMissionCancel = () => {
    setTodayCompleted(false);
    setIsFailed(false);
    toast({
      title: '미션 상태가 초기화되었습니다.',
      description: '다시 도전해보세요!',
    });
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

  // 성향 진단 완료 핸들러
  const handleCompleteUserTypeTest = (currentType: string, targetType: string) => {
    setUserType(currentType);
    setTargetType(targetType);
  };

  useEffect(() => {
    setShowUserTypeTest(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Re:try
          </h1>
          <p className="text-gray-600 text-lg">
            매일 조금씩, 더 유연한 나로 성장하기
          </p>
          <div className="flex flex-row justify-center items-center gap-4 mt-6 max-w-xl mx-auto">
            <Button
              variant="outline"
              onClick={() => navigate('/reflections')}
              className="flex flex-row items-center gap-2 px-6 py-3 border-2 border-orange-400 text-orange-700 hover:bg-orange-50 font-semibold text-base rounded-xl shadow-sm min-w-[140px] justify-center"
            >
              <BookOpen className="w-5 h-5 mr-1" />
              성장 기록
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/report')}
              className="flex flex-row items-center gap-2 px-6 py-3 border-2 border-pink-400 text-pink-700 hover:bg-pink-50 font-semibold text-base rounded-xl shadow-sm min-w-[140px] justify-center"
            >
              <BarChart2 className="w-5 h-5 mr-1" />
              성장 리포트
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowUserTypeTest(true)}
              className="flex flex-row items-center gap-2 px-6 py-3 border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-semibold text-base rounded-xl shadow-sm min-w-[140px] justify-center"
            >
              <Compass className="w-5 h-5 mr-1" />
              성향 진단
            </Button>
          </div>
        </div>

        {/* 메인 대시보드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 유저 프로필 & 레벨 */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Star className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-xl">유연성 레벨 {currentLevel}</CardTitle>
              <CardDescription>다음 레벨까지 {experienceToNextLevel - experience}XP</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="mb-4" />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{completedMissions}</div>
                  <div className="text-sm text-gray-600">완료한 미션</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{streak}</div>
                  <div className="text-sm text-gray-600">연속 달성일</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 오늘의 미션 */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                <CardTitle>오늘의 유연성 미션</CardTitle>
                {todayCompleted && (
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                    완료
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <DailyMission 
                onComplete={handleMissionComplete}
                onFailed={handleMissionFailed}
                onCancel={handleMissionCancel}
                isCompleted={todayCompleted}
                isFailed={isFailed}
                userType={userType || undefined}
                targetType={targetType || undefined}
              />
            </CardContent>
          </Card>
        </div>

        {/* 통계 및 성장 기록 */}
        <StatsPanel />

        {/* 격려 메시지 */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-pink-400 text-white">
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

        {/* 성향 진단 다이얼로그 */}
        <UserTypeTest 
          open={showUserTypeTest}
          onClose={() => setShowUserTypeTest(false)}
          onComplete={handleCompleteUserTypeTest}
        />
      </div>
    </div>
  );
};

export default Index;
