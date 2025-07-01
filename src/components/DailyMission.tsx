
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
    difficulty: "쉬움",
    icon: Users,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 2,
    title: "내 의견과 반대되는 입장 끝까지 듣기",
    description: "다른 의견을 가진 사람의 말을 중간에 끊지 말고 끝까지 들어보세요.",
    category: "인지적 유연성",
    difficulty: "보통",
    icon: Brain,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 3,
    title: "하루 동안 '모른다'는 말 3번 하기",
    description: "완벽해야 한다는 압박에서 벗어나 솔직하게 모르는 것을 인정해보세요.",
    category: "감정적 유연성",
    difficulty: "어려움",
    icon: Heart,
    color: "bg-green-100 text-green-800"
  }
];

const DailyMission: React.FC<DailyMissionProps> = ({ onComplete, isCompleted }) => {
  const [currentMission] = useState(missions[0]);
  const [showNewMission, setShowNewMission] = useState(false);

  const handleMissionComplete = () => {
    onComplete();
  };

  const IconComponent = currentMission.icon;

  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={currentMission.color}>
                  {currentMission.category}
                </Badge>
                <Badge variant="outline">
                  {currentMission.difficulty}
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
                      : 'bg-blue-600 hover:bg-blue-700'
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
                    className="hover:bg-gray-50"
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
          {missions.slice(1).map((mission) => {
            const MissionIcon = mission.icon;
            return (
              <Card key={mission.id} className="border hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      <MissionIcon className="w-4 h-4 text-gray-600" />
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
        </div>
      )}
    </div>
  );
};

export default DailyMission;
