
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
import { Badge } from "@/components/ui/badge";
import { Compass, Zap, Users, Brain, Anchor, ArrowRight, Edit, ChevronRight } from 'lucide-react';

interface UserTypeTestProps {
  open: boolean;
  onClose: () => void;
  onComplete: (currentType: string, targetType: string) => void;
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
    description: "새로운 경험을 통해 성장하는 당신",
    traits: "호기심이 많고 모험을 즐기며 새로운 것을 시도하는 것을 좋아합니다",
    color: "text-blue-600"
  },
  challenger: { 
    name: "도전자", 
    icon: Zap, 
    description: "어려운 과제를 통해 성장하는 당신",
    traits: "목표지향적이고 어려움을 극복하는 것에서 만족감을 얻습니다",
    color: "text-orange-600"
  },
  social: { 
    name: "소통가", 
    icon: Users, 
    description: "관계를 통해 성장하는 당신",
    traits: "사람들과의 관계를 중시하고 협력을 통해 시너지를 만듭니다",
    color: "text-green-600"
  },
  thinker: { 
    name: "분석가", 
    icon: Brain, 
    description: "깊은 사고를 통해 성장하는 당신",
    traits: "논리적이고 체계적으로 접근하며 깊이 있게 생각합니다",
    color: "text-purple-600"
  },
  steady: { 
    name: "안정가", 
    icon: Anchor, 
    description: "꾸준함을 통해 성장하는 당신",
    traits: "안정성을 추구하고 꾸준한 노력으로 목표를 달성합니다",
    color: "text-indigo-600"
  }
};

const UserTypeTest: React.FC<UserTypeTestProps> = ({ open, onClose, onComplete }) => {
  const [step, setStep] = useState<'current' | 'target' | 'result' | 'type-select'>('current');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [targetAnswers, setTargetAnswers] = useState<string[]>([]);
  const [currentType, setCurrentType] = useState<string>('');
  const [targetType, setTargetType] = useState<string>('');
  const [selectingType, setSelectingType] = useState<'current' | 'target'>('current');

  const calculateType = (answers: string[]) => {
    const typeCount = answers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(typeCount).reduce((a, b) => 
      typeCount[a] > typeCount[b] ? a : b
    );
  };

  const handleAnswer = (type: string) => {
    if (step === 'current') {
      const newAnswers = [...currentAnswers, type];
      setCurrentAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const resultType = calculateType(newAnswers);
        setCurrentType(resultType);
        setStep('target');
        setCurrentQuestion(0);
      }
    } else if (step === 'target') {
      const newAnswers = [...targetAnswers, type];
      setTargetAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const resultType = calculateType(newAnswers);
        setTargetType(resultType);
        setStep('result');
      }
    }
  };

  const handleComplete = () => {
    if (currentType && targetType) {
      onComplete(currentType, targetType);
      onClose();
      // 리셋
      setStep('current');
      setCurrentQuestion(0);
      setCurrentAnswers([]);
      setTargetAnswers([]);
      setCurrentType('');
      setTargetType('');
    }
  };

  const handleTypeSelect = (typeKey: string) => {
    if (selectingType === 'current') {
      setCurrentType(typeKey);
    } else {
      setTargetType(typeKey);
    }
    setStep('result');
  };

  const handleEditType = (typeToEdit: 'current' | 'target') => {
    setSelectingType(typeToEdit);
    setStep('type-select');
  };

  const getProgress = () => {
    if (step === 'current') {
      return (currentQuestion / questions.length) * 50;
    } else if (step === 'target') {
      return 50 + (currentQuestion / questions.length) * 50;
    }
    return 100;
  };

  const getStepTitle = () => {
    if (step === 'current') return '현재 나의 성향';
    if (step === 'target') return '되고 싶은 모습';
    if (step === 'type-select') return `${selectingType === 'current' ? '현재' : '목표'} 성향 선택`;
    return '진단 완료';
  };

  const getStepDescription = () => {
    if (step === 'current') return '현재 당신의 성향을 파악해보세요';
    if (step === 'target') return '어떤 모습으로 성장하고 싶으신가요?';
    if (step === 'type-select') return '원하는 성향을 직접 선택해보세요';
    return '맞춤형 미션으로 목표를 달성해보세요';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">유연성 유형 진단</DialogTitle>
          <DialogDescription className="text-center">
            {getStepDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${step === 'current' ? 'bg-orange-500' : step === 'target' ? 'bg-orange-300' : 'bg-green-500'}`}></div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div className={`w-3 h-3 rounded-full ${step === 'target' ? 'bg-orange-500' : step === 'result' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div className={`w-3 h-3 rounded-full ${step === 'result' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
            <h3 className="font-medium text-orange-700 mb-2">{getStepTitle()}</h3>
            <Progress value={getProgress()} className="w-full" />
          </div>
          
          {step === 'type-select' ? (
            <div className="space-y-2">
              {Object.entries(userTypes).map(([typeKey, typeInfo]) => (
                <Card key={typeKey} className="cursor-pointer hover:bg-orange-50" onClick={() => handleTypeSelect(typeKey)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {React.createElement(typeInfo.icon, {
                        className: `w-6 h-6 ${typeInfo.color}`
                      })}
                      <div className="flex-1">
                        <h4 className="font-medium">{typeInfo.name}</h4>
                        <p className="text-sm text-gray-600">{typeInfo.traits}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : step === 'result' ? (
            <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="mb-2">
                        {React.createElement(userTypes[currentType as keyof typeof userTypes].icon, {
                          className: "w-12 h-12 mx-auto text-orange-600 mb-1"
                        })}
                      </div>
                      <h4 className="font-bold text-orange-800 mb-1">현재</h4>
                      <p className="text-sm font-medium">
                        {userTypes[currentType as keyof typeof userTypes].name}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditType('current')}
                        className="mt-1 text-xs text-orange-600 hover:text-orange-700"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        수정
                      </Button>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    
                    <div className="text-center">
                      <div className="mb-2">
                        {React.createElement(userTypes[targetType as keyof typeof userTypes].icon, {
                          className: "w-12 h-12 mx-auto text-pink-600 mb-1"
                        })}
                      </div>
                      <h4 className="font-bold text-pink-800 mb-1">목표</h4>
                      <p className="text-sm font-medium">
                        {userTypes[targetType as keyof typeof userTypes].name}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditType('target')}
                        className="mt-1 text-xs text-pink-600 hover:text-pink-700"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        수정
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>현재:</strong> {userTypes[currentType as keyof typeof userTypes].traits}
                    </p>
                    <p>
                      <strong>목표:</strong> {userTypes[targetType as keyof typeof userTypes].traits}
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={handleComplete}
                  className="mt-6 bg-orange-600 hover:bg-orange-700"
                >
                  맞춤 미션 시작하기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className={`border-0 ${step === 'current' ? 'bg-gradient-to-r from-orange-50 to-yellow-50' : 'bg-gradient-to-r from-pink-50 to-purple-50'}`}>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Badge className={`${step === 'current' ? 'bg-orange-100 text-orange-800' : 'bg-pink-100 text-pink-800'} mb-2`}>
                    {step === 'current' ? '1단계: 현재 성향' : '2단계: 목표 성향'}
                  </Badge>
                </div>
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeTest;
