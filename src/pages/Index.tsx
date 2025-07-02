import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Lightbulb, Star, BookOpen, BarChart2, Compass, Users } from 'lucide-react';
import DailyMission from '@/components/DailyMission';
import ReflectionDialog from '@/components/ReflectionDialog';
import StatsPanel from '@/components/StatsPanel';
import { useToast } from '@/hooks/use-toast';
import UserTypeTest from '@/components/UserTypeTest';
import { useNavigate } from 'react-router-dom';
import GroupManagement from '@/components/GroupManagement';

const flexibilityLevels = [
  { level: 1, character: "👶", description: "시작" },
  { level: 2, character: "🚶‍♀️", description: "첫걸음" },
  { level: 3, character: "🏃‍♂️", description: "달리기" },
  { level: 4, character: "🦸‍♀️", description: "영웅" },
  { level: 5, character: "🧗‍♂️", description: "마스터" },
];

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
  const [showGroupModal, setShowGroupModal] = useState(false);

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

  // 그룹 참여/생성 핸들러(임시)
  const handleJoinGroup = (groupId: string) => {
    alert(`그룹(${groupId})에 참여했습니다!`);
    setShowGroupModal(false);
  };
  const handleCreateGroup = (groupName: string) => {
    alert(`새 그룹(${groupName})이 생성되었습니다!`);
    setShowGroupModal(false);
  };

  useEffect(() => {
    setShowUserTypeTest(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent">
            Re:try
          </h1>
          <p className="text-gray-600 text-lg">
            매일 조금씩, 더 유연한 나로 성장하기
          </p>
          <div className="flex flex-row justify-center items-center gap-4 mt-6 max-w-xl mx-auto">
            <Button
              onClick={() => navigate('/reflections')}
              className="flex flex-row items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-base rounded-xl shadow-sm min-w-[160px] justify-center"
            >
              <BookOpen className="w-5 h-5 mr-1" />
              성장 기록 확인하기
            </Button>
            <Button
              onClick={() => navigate('/report')}
              className="flex flex-row items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base rounded-xl shadow-sm min-w-[160px] justify-center"
            >
              <BarChart2 className="w-5 h-5 mr-1" />
              성장 레포트 보기
            </Button>
            <Button
              onClick={() => setShowUserTypeTest(true)}
              className="flex flex-row items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold text-base rounded-xl shadow-sm min-w-[160px] justify-center"
            >
              <Compass className="w-5 h-5 mr-1" />
              성향 진단
            </Button>
            <Button
              onClick={() => setShowGroupModal(true)}
              className="flex flex-row items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-base rounded-xl shadow-sm min-w-[160px] justify-center border border-gray-300"
            >
              <Users className="w-5 h-5 mr-1" />
              그룹
            </Button>
          </div>
        </div>

        {/* 메인 대시보드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 유저 프로필 & 레벨 */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-5xl">{flexibilityLevels[currentLevel-1]?.character || "👶"}</span>
              </div>
              <CardTitle className="text-xl">유연성 레벨 {currentLevel}</CardTitle>
              <CardDescription>다음 레벨까지 {experienceToNextLevel - experience}XP</CardDescription>
              <div className="mt-2 text-base font-semibold text-pink-600">{flexibilityLevels[currentLevel-1]?.description}</div>
              <div className="flex justify-center gap-1 mt-2">
                {flexibilityLevels.map((level, idx) => (
                  <span key={level.level} className={`text-lg ${idx < currentLevel ? 'opacity-100' : 'opacity-30'}`}>{level.character}</span>
                ))}
              </div>
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
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-500" />
                <CardTitle>오늘의 유연성 미션</CardTitle>
                {todayCompleted && (
                  <Badge variant="secondary" className="ml-auto bg-pink-100 text-pink-800">
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
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-pink-400" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-pink-600">오늘의 인사이트</h3>
                <p className="opacity-90 text-gray-700">
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

        {/* 그룹 관리 모달 */}
        <GroupManagement
          open={showGroupModal}
          onClose={() => setShowGroupModal(false)}
          onJoinGroup={handleJoinGroup}
          onCreateGroup={handleCreateGroup}
        />
      </div>
    </div>
  );
};

export default Index;
