
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Settings, TrendingUp, Target, Heart, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DailyMission from '@/components/DailyMission';
import UserTypeTest from '@/components/UserTypeTest';
import GroupManagement from '@/components/GroupManagement';
import { mockReflections, defaultCategories } from '@/types/reflection';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { ko } from 'date-fns/locale';

const Index = () => {
  const navigate = useNavigate();
  const [showUserTypeTest, setShowUserTypeTest] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
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

  const handleCompleteUserTypeTest = (currentType: string, targetType: string) => {
    alert(`현재 유형: ${currentType}, 목표 유형: ${targetType}로 설정되었습니다!`);
  };

  const handleMissionComplete = () => {
    setMissionCompleted(true);
    setMissionFailed(false);
  };

  const handleMissionFailed = () => {
    setMissionFailed(true);
    setMissionCompleted(false);
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

        {/* 성장 기록 확인 버튼 - 더 강조되도록 위치 변경 */}
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

        {/* 이번 주 실천 현황 요약 */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              이번 주 실천 현황
            </CardTitle>
            <CardDescription>
              {format(thisWeek.start, 'MM월 dd일', { locale: ko })} - {format(thisWeek.end, 'MM월 dd일', { locale: ko })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {defaultCategories.map(category => {
                const categoryReflections = thisWeekReflections.filter(reflection => reflection.category === category.name);
                const completedCount = categoryReflections.filter(reflection => reflection.status === 'completed').length;
                return (
                  <div key={category.id} className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{completedCount}</div>
                    <div className="text-sm text-gray-500">{category.name}</div>
                  </div>
                );
              })}
            </div>
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
    </div>
  );
};

export default Index;
