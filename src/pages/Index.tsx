
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Settings, TrendingUp, Target, Heart, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DailyMission from '@/components/DailyMission';
import UserTypeTest from '@/components/UserTypeTest';
import GroupManagement from '@/components/GroupManagement';
import ReflectionDialog from '@/components/ReflectionDialog';
import { mockReflections, defaultCategories } from '@/types/reflection';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { ko } from 'date-fns/locale';

const Index = () => {
  const navigate = useNavigate();
  const [showUserTypeTest, setShowUserTypeTest] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showReflectionDialog, setShowReflectionDialog] = useState(false);
  const [reflectionType, setReflectionType] = useState<'completed' | 'failed'>('completed');
  const [recentReflections, setRecentReflections] = useState(mockReflections.slice(0, 3));
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);

  useEffect(() => {
    // 최신 회고록 업데이트 (mockReflections가 변경될 때마다)
    setRecentReflections(mockReflections.slice(0, 3));
  }, [mockReflections]);

  const today = new Date();
  const thisWeek = {
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 })
  };

  const thisWeekReflections = mockReflections.filter(reflection =>
    isWithinInterval(reflection.date, thisWeek)
  );

  // 주간 활동 데이터 생성
  const weeklyData = [
    { day: '월', completed: 1, category: '사회적 유연성' },
    { day: '화', completed: 1, category: '인지적 유연성' },
    { day: '수', completed: 1, category: '감정적 유연성' },
    { day: '목', completed: 0, category: null },
    { day: '금', completed: 1, category: '사회적 유연성' },
    { day: '토', completed: 0, category: null },
    { day: '일', completed: 0, category: null },
  ];

  const categoryData = [
    { name: '사회적 유연성', value: 8, color: '#3B82F6' },
    { name: '인지적 유연성', value: 3, color: '#8B5CF6' },
    { name: '감정적 유연성', value: 1, color: '#10B981' },
  ];

  // 유연성 레벨 데이터
  const flexibilityLevels = [
    { level: 1, character: "🧸", description: "시작" },
    { level: 2, character: "🚶‍♀️", description: "첫걸음" },
    { level: 3, character: "🏃‍♂️", description: "달리기" },
    { level: 4, character: "🦸‍♀️", description: "영웅" },
    { level: 5, character: "🧗‍♂️", description: "마스터" },
  ];

  const currentLevel = 3;

  const handleCompleteUserTypeTest = (currentType: string, targetType: string) => {
    alert(`현재 유형: ${currentType}, 목표 유형: ${targetType}로 설정되었습니다!`);
  };

  const handleMissionComplete = () => {
    setMissionCompleted(true);
    setMissionFailed(false);
    setReflectionType('completed');
    setShowReflectionDialog(true);
  };

  const handleMissionFailed = () => {
    setMissionFailed(true);
    setMissionCompleted(false);
    setReflectionType('failed');
    setShowReflectionDialog(true);
  };

  const handleMissionCancel = () => {
    setMissionCompleted(false);
    setMissionFailed(false);
  };

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
  };

  const handleCreateGroup = (groupName: string) => {
    console.log('Creating group:', groupName);
  };

  const handleReflectionSubmit = (reflection: string) => {
    console.log('Reflection submitted:', reflection);
    // TODO: 실제 회고 저장 로직
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              오늘의 유연성
            </h1>
            <p className="text-gray-600">
              더 나은 나를 위한 작은 실천
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowGroupManagement(true)}>
              <Users className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowUserTypeTest(true)}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 성장 기록 확인 버튼 */}
        <div className="mb-8 text-center">
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => navigate('/reflections')}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Calendar className="w-5 h-5 mr-2" />
              성장 기록 확인하기
            </Button>
            <Button
              onClick={() => navigate('/report')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <BarChart className="w-5 h-5 mr-2" />
              성장 레포트 보기
            </Button>
          </div>
        </div>

        {/* 유연성 레벨 & 주간 활동 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 유연성 레벨 */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg">유연성 레벨</CardTitle>
              </div>
              <CardDescription>현재 성장 단계</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{flexibilityLevels[currentLevel - 1].character}</div>
                <div className="text-xl font-bold text-purple-600">레벨 {currentLevel}</div>
                <div className="text-sm text-gray-600">{flexibilityLevels[currentLevel - 1].description}</div>
              </div>
              <div className="flex justify-center gap-2">
                {flexibilityLevels.map((level, idx) => (
                  <div
                    key={level.level}
                    className={`text-lg ${idx < currentLevel ? 'opacity-100' : 'opacity-30'}`}
                  >
                    {level.character}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 주간 활동 */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">이번 주 활동</CardTitle>
              </div>
              <CardDescription>요일별 미션 완료 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end gap-2 px-2 py-4">
                {weeklyData.map((day, idx) => {
                  const cat = categoryData.find(c => c.name === day.category);
                  return (
                    <div key={day.day} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full shadow-md transition-all duration-200 ${day.completed ? '' : 'opacity-40'}`}
                        style={{ 
                          backgroundColor: day.completed && cat ? cat.color : '#e5e7eb', 
                          border: day.completed ? '2px solid #fff' : '2px dashed #d1d5db' 
                        }}
                      />
                      <span className="text-xs text-gray-700 mt-1 font-medium">{day.day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{weeklyData.filter(d => d.completed).length}/7</div>
                <div className="text-sm text-gray-600">이번 주 완료일</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오늘의 미션 제안 */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              오늘의 미션
            </CardTitle>
            <CardDescription>
              새로운 도전을 통해 유연성을 키워보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DailyMission 
              onComplete={handleMissionComplete}
              onFailed={handleMissionFailed}
              onCancel={handleMissionCancel}
              isCompleted={missionCompleted}
              isFailed={missionFailed}
            />
          </CardContent>
        </Card>
      </div>

      {/* 사용자 유형 테스트 다이얼로그 */}
      <UserTypeTest open={showUserTypeTest} onClose={() => setShowUserTypeTest(false)} onComplete={handleCompleteUserTypeTest} />

      {/* 그룹 관리 다이얼로그 */}
      <GroupManagement 
        open={showGroupManagement} 
        onClose={() => setShowGroupManagement(false)} 
        onJoinGroup={handleJoinGroup}
        onCreateGroup={handleCreateGroup}
      />

      {/* 회고 다이얼로그 */}
      <ReflectionDialog
        open={showReflectionDialog}
        onClose={() => setShowReflectionDialog(false)}
        onSubmit={handleReflectionSubmit}
        isFailed={reflectionType === 'failed'}
      />
    </div>
  );
};

export default Index;
