
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, RefreshCw, Users, Heart, Brain } from 'lucide-react';

interface DailyMissionProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const missions = [
  {
    id: 1,
    title: "처음 보는 사람에게 먼저 인사하기",
    description: "오늘 하루 중 처음 만나는 사람에게 먼저 인사를 건네보세요.",
    category: "사회적 유연성",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 2,
    title: "내 의견과 반대되는 입장 끝까지 듣기",
    description: "다른 의견을 가진 사람의 말을 중간에 끊지 말고 끝까지 들어보세요.",
    category: "인지적 유연성",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 3,
    title: "하루 동안 '모른다'는 말 3번 하기",
    description: "완벽해야 한다는 압박에서 벗어나 솔직하게 모르는 것을 인정해보세요.",
    category: "감정적 유연성",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 4,
    title: "평소와 다른 길로 출근하기",
    description: "익숙한 길 대신 새로운 길을 선택해보세요.",
    category: "사회적 유연성",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 5,
    title: "오늘 하루 계획을 완전히 바꿔보기",
    description: "예상치 못한 상황에 유연하게 대응하는 연습을 해보세요.",
    category: "인지적 유연성",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 6,
    title: "화가 날 때 5분 기다리고 반응하기",
    description: "즉각적인 반응 대신 잠시 멈추고 생각할 시간을 가져보세요.",
    category: "감정적 유연성",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 7,
    title: "평소 안 가던 카페에서 일하기",
    description: "새로운 환경에서 적응하는 능력을 키워보세요.",
    category: "사회적 유연성",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 8,
    title: "평소와 반대 의견으로 토론해보기",
    description: "내 입장과 반대되는 관점에서 생각해보는 연습을 해보세요.",
    category: "인지적 유연성",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 9,
    title: "스트레스 받는 상황에서 심호흡 3번 하기",
    description: "긴장되는 순간에 의식적으로 호흡을 조절해보세요.",
    category: "감정적 유연성",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 10,
    title: "평소 말 안 하는 동료와 대화하기",
    description: "용기를 내어 먼저 말을 걸어보세요.",
    category: "사회적 유연성",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 11,
    title: "오늘 하루 혼자 점심 먹기",
    description: "혼자만의 시간을 가지며 자신과 대화해보세요.",
    category: "감정적 유연성",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 12,
    title: "모르는 사람에게 길 물어보기",
    description: "타인에게 도움을 요청하는 연습을 해보세요.",
    category: "사회적 유연성",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  }
];

const DailyMission: React.FC<DailyMissionProps> = ({ onComplete, isCompleted }) => {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [showNewMission, setShowNewMission] = useState(false);

  const currentMission = missions[currentMissionIndex];

  const handleMissionComplete = () => {
    onComplete();
  };

  const handleNewMission = () => {
    const nextIndex = (currentMissionIndex + 1) % missions.length;
    setCurrentMissionIndex(nextIndex);
    setShowNewMission(false);
  };

  const IconComponent = currentMission.icon;

  const getAlternativeMissions = () => {
    const start = (currentMissionIndex + 1) % missions.length;
    const alternatives = [];
    for (let i = 0; i < 4; i++) {
      alternatives.push(missions[(start + i) % missions.length]);
    }
    return alternatives;
  };

  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <IconComponent className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={currentMission.color}>
                  {currentMission.category}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {currentMission.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentMission.description}
              </p>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleMissionComplete}
                  disabled={isCompleted}
                  className={`${
                    isCompleted 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-orange-600 hover:bg-orange-700'
                  } transition-all duration-200`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      완료됨
                    </>
                  ) : (
                    '미션 완료'
                  )}
                </Button>
                
                {!isCompleted && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewMission(!showNewMission)}
                    className="hover:bg-orange-50 border-orange-200 text-orange-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    다른 미션
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showNewMission && !isCompleted && (
        <div className="grid grid-cols-1 gap-3">
          {getAlternativeMissions().map((mission) => {
            const MissionIcon = mission.icon;
            return (
              <Card 
                key={mission.id} 
                className="border hover:shadow-md transition-shadow cursor-pointer hover:border-orange-200"
                onClick={() => {
                  setCurrentMissionIndex(missions.findIndex(m => m.id === mission.id));
                  setShowNewMission(false);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100">
                      <MissionIcon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={mission.color}>
                          {mission.category}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-800">{mission.title}</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button 
            variant="ghost" 
            onClick={handleNewMission}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            더 많은 미션 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default DailyMission;
