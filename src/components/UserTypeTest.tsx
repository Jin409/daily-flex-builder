
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Compass, Zap, Users, Brain, Anchor } from 'lucide-react';

interface UserTypeTestProps {
  open: boolean;
  onClose: () => void;
  onComplete: (userType: string) => void;
}

const questions = [
  {
    question: "새로운 환경에 적응할 때 당신은?",
    options: [
      { text: "흥미롭게 탐험한다", type: "explorer" },
      { text: "도전으로 받아들인다", type: "challenger" },
      { text: "다른 사람들과 함께 적응한다", type: "social" },
      { text: "체계적으로 분석한다", type: "thinker" },
      { text: "천천히 안정적으로 적응한다", type: "steady" }
    ]
  },
  {
    question: "스트레스를 받을 때 당신의 반응은?",
    options: [
      { text: "새로운 활동으로 전환한다", type: "explorer" },
      { text: "정면으로 맞서 해결한다", type: "challenger" },
      { text: "주변 사람들과 이야기한다", type: "social" },
      { text: "원인을 분석하고 계획을 세운다", type: "thinker" },
      { text: "차분히 시간을 두고 해결한다", type: "steady" }
    ]
  },
  {
    question: "변화에 대한 당신의 태도는?",
    options: [
      { text: "변화는 모험이다", type: "explorer" },
      { text: "변화는 성장의 기회다", type: "challenger" },
      { text: "변화는 함께할 때 의미있다", type: "social" },
      { text: "변화는 신중히 검토해야 한다", type: "thinker" },
      { text: "변화는 점진적으로 받아들인다", type: "steady" }
    ]
  }
];

const userTypes = {
  explorer: { 
    name: "탐험가", 
    icon: Compass, 
    description: "새로운 경험을 통해 성장하는 당신" 
  },
  challenger: { 
    name: "도전자", 
    icon: Zap, 
    description: "어려운 과제를 통해 성장하는 당신" 
  },
  social: { 
    name: "소통가", 
    icon: Users, 
    description: "관계를 통해 성장하는 당신" 
  },
  thinker: { 
    name: "분석가", 
    icon: Brain, 
    description: "깊은 사고를 통해 성장하는 당신" 
  },
  steady: { 
    name: "안정가", 
    icon: Anchor, 
    description: "꾸준함을 통해 성장하는 당신" 
  }
};

const UserTypeTest: React.FC<UserTypeTestProps> = ({ open, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 계산
      const typeCount = newAnswers.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const resultType = Object.keys(typeCount).reduce((a, b) => 
        typeCount[a] > typeCount[b] ? a : b
      );
      
      setResult(resultType);
    }
  };

  const handleComplete = () => {
    if (result) {
      onComplete(result);
      onClose();
      // 리셋
      setCurrentQuestion(0);
      setAnswers([]);
      setResult(null);
    }
  };

  const progress = ((currentQuestion + (result ? 1 : 0)) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">유연성 유형 진단</DialogTitle>
          <DialogDescription className="text-center">
            당신만의 맞춤 미션을 위한 간단한 테스트
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          
          {!result ? (
            <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 text-center">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 hover:bg-orange-100"
                      onClick={() => handleAnswer(option.type)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {React.createElement(userTypes[result as keyof typeof userTypes].icon, {
                    className: "w-16 h-16 mx-auto text-orange-600 mb-2"
                  })}
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                  {userTypes[result as keyof typeof userTypes].name}
                </h3>
                <p className="text-gray-700 mb-4">
                  {userTypes[result as keyof typeof userTypes].description}
                </p>
                <Button
                  onClick={handleComplete}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  맞춤 미션 시작하기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeTest;
