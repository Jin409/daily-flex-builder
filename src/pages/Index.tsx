
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Lightbulb, Star, Calendar, Users, Settings } from 'lucide-react';
import DailyMission from '@/components/DailyMission';
import ReflectionDialog from '@/components/ReflectionDialog';
import StatsPanel from '@/components/StatsPanel';
import UserTypeTest from '@/components/UserTypeTest';
import GroupManagement from '@/components/GroupManagement';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/reflection';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [experience, setExperience] = useState(45);
  const [completedMissions, setCompletedMissions] = useState(12);
  const [streak, setStreak] = useState(3);
  const [showReflection, setShowReflection] = useState(false);
  const [showUserTypeTest, setShowUserTypeTest] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  const experienceToNextLevel = 100;
  const progressPercentage = (experience / experienceToNextLevel) * 100;

  // 첫 방문시 유형 테스트 표시
  useEffect(() => {
    const hasCompletedTest = localStorage.getItem('userTypeCompleted');
    if (!hasCompletedTest) {
      setShowUserTypeTest(true);
    } else {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    }
  }, []);

  const handleMissionComplete = () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      setMissionFailed(false);
      setShowReflection(true);
      toast({
        title: "미션 완료! 🎉",
        description: "오늘의 유연성 미션을 완료했습니다. 회고를 작성해보세요.",
      });
    }
  };

  const handleMissionFailed = () => {
    setMissionFailed(true);
    setTodayCompleted(false);
    setShowReflection(true);
    toast({
      title: "괜찮아요! 💪",
      description: "시도 자체가 성장입니다. 경험을 기록해보세요.",
    });
  };

  const handleReflectionSubmit = (reflection: string) => {
    // 실패해도 경험치는 절반 정도 획득
    const expGain = missionFailed ? 8 : 15;
    setExperience(prev => Math.min(prev + expGain, experienceToNextLevel));
    setCompletedMissions(prev => prev + 1);
    if (!missionFailed) {
      setStreak(prev => prev + 1);
    }
    
    toast({
      title: missionFailed ? "경험 기록 완료! 🌱" : "성장 기록 완료! ✨",
      description: missionFailed 
        ? "시도하신 것만으로도 충분히 의미있습니다!" 
        : "회고를 통해 더 깊은 성장을 이루었습니다.",
    });

    // 레벨업 체크
    if (experience + expGain >= experienceToNextLevel) {
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

  const handleUserTypeComplete = (userType: string) => {
    const profile: UserProfile = {
      id: '1',
      name: '사용자',
      userType: userType as UserProfile['userType'],
      customCategories: []
    };
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('userTypeCompleted', 'true');
    
    toast({
      title: "유형 진단 완료! 🎯",
      description: "맞춤형 미션을 제공해드릴게요!",
    });
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
              {userProfile && (
                <Badge variant="outline" className="mx-auto mt-2 bg-orange-100 text-orange-800">
                  {userProfile.userType === 'explorer' && '탐험가'}
                  {userProfile.userType === 'challenger' && '도전자'}
                  {userProfile.userType === 'social' && '소통가'}
                  {userProfile.userType === 'thinker' && '분석가'}
                  {userProfile.userType === 'steady' && '안정가'}
                </Badge>
              )}
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
              
              {/* 설정 버튼들 */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUserTypeTest(true)}
                  className="flex-1 text-xs"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  유형 재진단
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGroupManagement(true)}
                  className="flex-1 text-xs"
                >
                  <Users className="w-3 h-3 mr-1" />
                  가족/그룹
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 오늘의 미션 */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-600" />
                <CardTitle>오늘의 유연성 미션</CardTitle>
                {(todayCompleted || missionFailed) && (
                  <Badge variant="secondary" className={`ml-auto ${
                    missionFailed 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {missionFailed ? '시도함' : '완료'}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <DailyMission 
                onComplete={handleMissionComplete}
                onFailed={handleMissionFailed}
                isCompleted={todayCompleted}
                isFailed={missionFailed}
                userType={userProfile?.userType}
              />
            </CardContent>
          </Card>
        </div>

        {/* 성장 기록 보기 버튼 - 더 눈에 띄게 배치 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-orange-100 to-pink-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">나의 성장 여정</h3>
                  <p className="text-gray-600">지금까지의 성장 기록을 확인해보세요</p>
                </div>
              </div>
              <Button
                onClick={() => window.location.href = '/reflections'}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg font-medium shadow-lg"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                성장 기록 보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 통계 */}
        <div className="mb-8">
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
                  {missionFailed 
                    ? "완벽하지 않아도 괜찮아요. 시도하는 것 자체가 성장입니다! 💪"
                    : "작은 변화가 큰 성장을 만듭니다. 오늘도 한 걸음 더 나아가세요! 💪"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 다이얼로그들 */}
        <ReflectionDialog 
          open={showReflection}
          onClose={() => setShowReflection(false)}
          onSubmit={handleReflectionSubmit}
          isFailed={missionFailed}
        />

        <UserTypeTest
          open={showUserTypeTest}
          onClose={() => setShowUserTypeTest(false)}
          onComplete={handleUserTypeComplete}
        />

        <GroupManagement
          open={showGroupManagement}
          onClose={() => setShowGroupManagement(false)}
          onJoinGroup={() => {}}
          onCreateGroup={() => {}}
        />
      </div>
    </div>
  );
};

export default Index;
