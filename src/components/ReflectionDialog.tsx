
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Lightbulb, TrendingUp } from 'lucide-react';

interface ReflectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reflection: string) => void;
}

const reflectionPrompts = [
  {
    icon: Heart,
    question: "이 미션을 수행하면서 어떤 감정을 느꼈나요?",
    placeholder: "예: 처음엔 긴장했지만 점차 편안해졌어요..."
  },
  {
    icon: Lightbulb,
    question: "오늘의 경험에서 새롭게 깨달은 점이 있나요?",
    placeholder: "예: 생각보다 사람들이 친근하게 반응해주었어요..."
  },
  {
    icon: TrendingUp,
    question: "앞으로 이런 상황에서 어떻게 행동하고 싶나요?",
    placeholder: "예: 더 자연스럽게 대화를 이어가고 싶어요..."
  }
];

const ReflectionDialog: React.FC<ReflectionDialogProps> = ({ open, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState<string[]>(['', '', '']);

  const handleNext = () => {
    if (currentStep < reflectionPrompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const fullReflection = reflections.join('\n\n');
    onSubmit(fullReflection);
    onClose();
    // 리셋
    setCurrentStep(0);
    setReflections(['', '', '']);
  };

  const updateReflection = (value: string) => {
    const newReflections = [...reflections];
    newReflections[currentStep] = value;
    setReflections(newReflections);
  };

  const currentPrompt = reflectionPrompts[currentStep];
  const IconComponent = currentPrompt.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-green-100">
              <IconComponent className="w-5 h-5 text-green-600" />
            </div>
            성장 기록하기
          </DialogTitle>
          <DialogDescription>
            오늘의 경험을 기록하고 더 깊은 성장을 이루어보세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 진행 표시기 */}
          <div className="flex gap-2">
            {reflectionPrompts.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-4">
              <Label className="text-base font-medium text-gray-800 block mb-3">
                {currentPrompt.question}
              </Label>
              <Textarea
                value={reflections[currentStep]}
                onChange={(e) => updateReflection(e.target.value)}
                placeholder={currentPrompt.placeholder}
                className="min-h-[100px] border-0 bg-white/80"
              />
            </CardContent>
          </Card>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                이전
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!reflections[currentStep].trim()}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {currentStep === reflectionPrompts.length - 1 ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReflectionDialog;
