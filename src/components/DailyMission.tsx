
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, RefreshCw, Users, Heart, Brain, X, Target, MessageCircle } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { userTypeMissions, defaultCategories } from '@/types/reflection';

interface DailyMissionProps {
  onComplete: () => void;
  onFailed: () => void;
  isCompleted: boolean;
  isFailed: boolean;
  userType?: string;
}

// 확장된 미션 리스트
const allMissions = [
  // 사람과의 관계
  {
    id: 1,
    title: "처음 보는 사람에게 먼저 인사하기",
    description: "오늘 하루 중 처음 만나는 사람에게 먼저 인사를 건네보세요.",
    category: "사람과의 관계",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 12,
    title: "모르는 사람에게 길 물어보기",
    description: "타인에게 도움을 요청하는 연습을 해보세요.",
    category: "사람과의 관계",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 10,
    title: "평소 말 안 하는 동료와 대화하기",
    description: "용기를 내어 먼저 말을 걸어보세요.",
    category: "사람과의 관계",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 16,
    title: "엘리베이터에서 먼저 층수 물어보기",
    description: "작은 친절로 하루를 시작해보세요.",
    category: "사람과의 관계",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 17,
    title: "카페에서 직원에게 추천 메뉴 물어보기",
    description: "새로운 선택을 위해 도움을 요청해보세요.",
    category: "사람과의 관계",
    icon: Users,
    color: "bg-orange-100 text-orange-800"
  },

  // 생각의 변화
  {
    id: 2,
    title: "내 의견과 반대되는 입장 끝까지 듣기",
    description: "다른 의견을 가진 사람의 말을 중간에 끊지 말고 끝까지 들어보세요.",
    category: "생각의 변화",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 8,
    title: "평소와 반대 의견으로 토론해보기",
    description: "내 입장과 반대되는 관점에서 생각해보는 연습을 해보세요.",
    category: "생각의 변화",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 5,
    title: "오늘 하루 계획을 완전히 바꿔보기",
    description: "예상치 못한 상황에 유연하게 대응하는 연습을 해보세요.",
    category: "생각의 변화",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 18,
    title: "평소 싫어하는 음식 하나 시도해보기",
    description: "고정관념을 깨고 새로운 경험을 해보세요.",
    category: "생각의 변화",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 19,
    title: "평소와 다른 뉴스나 콘텐츠 보기",
    description: "다양한 관점을 접해보세요.",
    category: "생각의 변화",
    icon: Brain,
    color: "bg-pink-100 text-pink-800"
  },

  // 감정 조절
  {
    id: 3,
    title: "하루 동안 '모른다'는 말 3번 하기",
    description: "완벽해야 한다는 압박에서 벗어나 솔직하게 모르는 것을 인정해보세요.",
    category: "감정 조절",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 6,
    title: "화가 날 때 5분 기다리고 반응하기",
    description: "즉각적인 반응 대신 잠시 멈추고 생각할 시간을 가져보세요.",
    category: "감정 조절",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 9,
    title: "스트레스 받는 상황에서 심호흡 3번 하기",
    description: "긴장되는 순간에 의식적으로 호흡을 조절해보세요.",
    category: "감정 조절",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 11,
    title: "오늘 하루 혼자 점심 먹기",
    description: "혼자만의 시간을 가지며 자신과 대화해보세요.",
    category: "감정 조절",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 20,
    title: "짜증나는 상황에서 감사한 점 3가지 찾기",
    description: "부정적인 상황에서도 긍정적인 면을 찾아보세요.",
    category: "감정 조절",
    icon: Heart,
    color: "bg-purple-100 text-purple-800"
  },

  // 새로운 도전
  {
    id: 4,
    title: "평소와 다른 길로 출근하기",
    description: "익숙한 길 대신 새로운 길을 선택해보세요.",
    category: "새로운 도전",
    icon: Target,
    color: "bg-green-100 text-green-800"
  },
  {
    id: 7,
    title: "평소 안 가던 카페에서 일하기",
    description: "새로운 환경에서 적응하는 능력을 키워보세요.",
    category: "새로운 도전",
    icon: Target,
    color: "bg-green-100 text-green-800"
  },
  {
    id: 21,
    title: "새로운 앱이나 도구 하나 배워보기",
    description: "기술적 도전을 통해 성장해보세요.",
    category: "새로운 도전",
    icon: Target,
    color: "bg-green-100 text-green-800"
  },
  {
    id: 22,
    title: "평소 안 듣던 장르의 음악 듣기",
    description: "새로운 취향을 발견해보세요.",
    category: "새로운 도전",
    icon: Target,
    color: "bg-green-100 text-green-800"
  },

  // 소통 방식
  {
    id: 23,
    title: "오늘 하루 칭찬 3번 하기",
    description: "다른 사람의 좋은 점을 찾아 표현해보세요.",
    category: "소통 방식",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 24,
    title: "평소보다 더 적극적으로 질문하기",
    description: "궁금한 것을 주저하지 말고 물어보세요.",
    category: "소통 방식",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 25,
    title: "이메일 대신 직접 대화로 소통하기",
    description: "면대면 소통의 힘을 경험해보세요.",
    category: "소통 방식",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-800"
  }
];

const iconMap = {
  'Users': Users,
  'Brain': Brain,
  'Heart': Heart,
  'Target': Target,
  'MessageCircle': MessageCircle
};

const DailyMission: React.FC<DailyMissionProps> = ({ 
  onComplete, 
  onFailed, 
  isCompleted, 
  isFailed, 
  userType 
}) => {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [showNewMission, setShowNewMission] = useState(false);
  const [customMission, setCustomMission] = useState("");
  const [customCategory, setCustomCategory] = useState("사람과의 관계");
  const [missionList, setMissionList] = useState(allMissions);

  const currentMission = missionList[currentMissionIndex];

  // 사용자 유형에 따른 맞춤 미션 추천
  useEffect(() => {
    if (userType && userTypeMissions[userType as keyof typeof userTypeMissions]) {
      const customMissions = userTypeMissions[userType as keyof typeof userTypeMissions];
      const recommendedMissions = customMissions.map((title, index) => ({
        id: 1000 + index,
        title,
        description: "맞춤형 추천 미션입니다.",
        category: "맞춤 추천",
        icon: Target,
        color: "bg-indigo-100 text-indigo-800"
      }));
      setMissionList([...recommendedMissions, ...allMissions]);
    }
  }, [userType]);

  const handleMissionComplete = () => {
    onComplete();
  };

  const handleMissionFailed = () => {
    onFailed();
  };

  const handleNewMission = () => {
    const nextIndex = (currentMissionIndex + 1) % missionList.length;
    setCurrentMissionIndex(nextIndex);
    setShowNewMission(false);
  };

  const IconComponent = iconMap[currentMission.icon.name as keyof typeof iconMap] || currentMission.icon;

  const getAlternativeMissions = () => {
    const start = (currentMissionIndex + 1) % missionList.length;
    const alternatives = [];
    for (let i = 0; i < 6; i++) {
      alternatives.push(missionList[(start + i) % missionList.length]);
    }
    return alternatives;
  };

  const categoryMap = {
    "사람과의 관계": { icon: Users, color: "bg-orange-100 text-orange-800" },
    "생각의 변화": { icon: Brain, color: "bg-pink-100 text-pink-800" },
    "감정 조절": { icon: Heart, color: "bg-purple-100 text-purple-800" },
    "새로운 도전": { icon: Target, color: "bg-green-100 text-green-800" },
    "소통 방식": { icon: MessageCircle, color: "bg-blue-100 text-blue-800" },
  };

  const handleAddCustomMission = () => {
    if (!customMission.trim()) return;
    const { icon, color } = categoryMap[customCategory as keyof typeof categoryMap] || categoryMap["사람과의 관계"];
    const newMission = {
      id: missionList.length + 1,
      title: customMission,
      description: "직접 등록한 미션입니다.",
      category: customCategory,
      icon,
      color
    };
    setMissionList([...missionList, newMission]);
    setCurrentMissionIndex(missionList.length);
    setCustomMission("");
    setCustomCategory("사람과의 관계");
    setShowNewMission(false);
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
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={handleMissionComplete}
                  disabled={isCompleted || isFailed}
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

                <Button 
                  onClick={handleMissionFailed}
                  disabled={isCompleted || isFailed}
                  variant="outline"
                  className={`${
                    isFailed 
                      ? 'bg-yellow-100 border-yellow-300 text-yellow-800' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } transition-all duration-200`}
                >
                  {isFailed ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      시도했음
                    </>
                  ) : (
                    '시도했지만 실패'
                  )}
                </Button>
                
                {!isCompleted && !isFailed && (
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

      {showNewMission && !isCompleted && !isFailed && (
        <div className="grid grid-cols-1 gap-3">
          {getAlternativeMissions().map((mission) => {
            const MissionIcon = iconMap[mission.icon.name as keyof typeof iconMap] || mission.icon;
            return (
              <Card 
                key={mission.id} 
                className="border hover:shadow-md transition-shadow cursor-pointer hover:border-orange-200"
                onClick={() => {
                  setCurrentMissionIndex(missionList.findIndex(m => m.id === mission.id));
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

      {/* 커스텀 미션 추가 */}
      <div className="flex gap-2 items-center mt-4">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
          placeholder="직접 미션을 입력해보세요!"
          value={customMission}
          onChange={e => setCustomMission(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAddCustomMission(); }}
        />
        <div className="w-48">
          <Select value={customCategory} onValueChange={setCustomCategory}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {defaultCategories.map(category => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddCustomMission} className="bg-orange-600 hover:bg-orange-700 text-white">
          미션 추가
        </Button>
      </div>
    </div>
  );
};

export default DailyMission;
