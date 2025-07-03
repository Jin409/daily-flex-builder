
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react';
import GoalRegistrationModal from './GoalRegistrationModal';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  missions: Mission[];
  completedMissions: number;
  totalMissions: number;
  isActive: boolean;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  category: string;
}

interface GoalManagerProps {
  open: boolean;
  onClose: () => void;
  onSelectGoal: (goal: Goal) => void;
}

const mockGoals: Goal[] = [
  {
    id: 'goal1',
    title: '일상에서 새로운 것들 도전하기',
    description: '매일 작은 변화를 통해 새로운 경험을 쌓아가세요',
    category: '새로운 도전',
    completedMissions: 2,
    totalMissions: 5,
    isActive: true,
    missions: [
      { id: 'm1', title: '안 가던 길로 가보기', description: '평소 다니던 길 대신 새로운 길을 선택해보세요', isCompleted: true, category: '새로운 도전' },
      { id: 'm2', title: '모르는 사람한테 말 걸기', description: '용기를 내어 모르는 사람에게 먼저 말을 걸어보세요', isCompleted: true, category: '사람과의 관계' },
      { id: 'm3', title: '새로운 음식 주문하기', description: '평소 먹지 않던 음식에 도전해보세요', isCompleted: false, category: '새로운 도전' },
      { id: 'm4', title: '새로운 취미 활동 시작하기', description: '관심있던 취미 하나를 실제로 시작해보세요', isCompleted: false, category: '새로운 도전' },
      { id: 'm5', title: '다른 사람에게 도움 요청하기', description: '혼자 해결하기 어려운 일을 다른 사람에게 도움 요청해보세요', isCompleted: false, category: '사람과의 관계' }
    ]
  },
  {
    id: 'goal2',
    title: '대인관계 유연성 키우기',
    description: '다양한 사람들과 소통하며 관계 능력을 향상시키세요',
    category: '관계 개선',
    completedMissions: 1,
    totalMissions: 4,
    isActive: false,
    missions: [
      { id: 'm6', title: '의견이 다른 사람과 대화하기', description: '나와 다른 의견을 가진 사람과 열린 마음으로 대화해보세요', isCompleted: true, category: '사람과의 관계' },
      { id: 'm7', title: '새로운 모임에 참여하기', description: '평소 참여하지 않던 모임이나 활동에 참여해보세요', isCompleted: false, category: '사람과의 관계' },
      { id: 'm8', title: '먼저 사과하기', description: '갈등 상황에서 먼저 사과하거나 화해의 손길을 내밀어보세요', isCompleted: false, category: '감정 조절' },
      { id: 'm9', title: '칭찬과 격려 표현하기', description: '주변 사람들에게 진심 어린 칭찬과 격려를 표현해보세요', isCompleted: false, category: '소통 방식' }
    ]
  },
  {
    id: 'goal3',
    title: '감정 조절 능력 향상하기',
    description: '스트레스와 부정적 감정을 건강하게 관리하는 방법을 익혀보세요',
    category: '감정 관리',
    completedMissions: 0,
    totalMissions: 4,
    isActive: false,
    missions: [
      { id: 'm10', title: '화날 때 10초 세기', description: '화가 날 때 즉시 반응하지 말고 10초간 심호흡하며 마음을 가라앉혀보세요', isCompleted: false, category: '감정 조절' },
      { id: 'm11', title: '부정적 생각을 긍정적으로 바꾸기', description: '부정적인 생각이 들 때 의식적으로 긍정적인 면을 찾아보세요', isCompleted: false, category: '생각의 변화' },
      { id: 'm12', title: '스트레스 해소 활동 하기', description: '자신만의 건강한 스트레스 해소 방법을 실천해보세요', isCompleted: false, category: '감정 조절' },
      { id: 'm13', title: '감정 일기 쓰기', description: '하루의 감정 변화를 기록하고 돌아보는 시간을 가져보세요', isCompleted: false, category: '감정 조절' }
    ]
  }
];

const GoalManager: React.FC<GoalManagerProps> = ({ open, onClose, onSelectGoal }) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleGoalSelect = (goal: Goal) => {
    const updatedGoals = goals.map(g => ({
      ...g,
      isActive: g.id === goal.id
    }));
    setGoals(updatedGoals);
    onSelectGoal(goal);
    onClose();
  };

  const handleSaveNewGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  const getProgressPercentage = (goal: Goal) => {
    return (goal.completedMissions / goal.totalMissions) * 100;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              목표 관리
            </DialogTitle>
            <DialogDescription className="text-center">
              달성하고 싶은 목표를 선택하고 단계별 미션을 수행해보세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* 새 목표 등록 버튼 */}
            <Button 
              onClick={() => setShowRegistrationModal(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              새 목표 등록하기
            </Button>

            {goals.map((goal) => (
              <Card 
                key={goal.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  goal.isActive ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedGoal(selectedGoal?.id === goal.id ? null : goal)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      {goal.isActive && (
                        <Badge className="bg-orange-100 text-orange-800">활성</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {goal.completedMissions}/{goal.totalMissions}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                  <Progress value={getProgressPercentage(goal)} className="mt-2" />
                </CardHeader>
                
                {selectedGoal?.id === goal.id && (
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">하위 미션들:</h4>
                      {goal.missions.map((mission) => (
                        <div key={mission.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          {mission.isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${mission.isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                              {mission.title}
                            </p>
                            <p className="text-xs text-gray-600">{mission.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {mission.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleGoalSelect(goal)}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      {goal.isActive ? '활성 목표' : '이 목표 선택하기'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <GoalRegistrationModal
        open={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSave={handleSaveNewGoal}
      />
    </>
  );
};

export default GoalManager;
