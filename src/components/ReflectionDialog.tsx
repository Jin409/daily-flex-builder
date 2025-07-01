
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
import { Heart, ArrowRight, Lightbulb } from 'lucide-react';

interface ReflectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reflection: string) => void;
}

const reflectionPrompts = [
  {
    icon: Heart,
    question: "미션을 시작하기 전에 어떤 감정이었나요?",
    placeholder: "예: 긴장했고, 망설여졌어요...",
    type: "before"
  },
  {
    icon: Heart,
    question: "미션을 완료한 후 어떤 감정인가요?",
    placeholder: "예: 생각보다 별거 아니었고, 뿌듯해요...",
    type: "after"
  },
  {
    icon: Lightbulb,
    question: "이 경험을 통해 어떤 것을 깨달았나요?",
    placeholder: "예: 막상 해보니 별거 아니었어요. 다음엔 더 자신있게 할 수 있을 것 같아요...",
    type: "insight"
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
    const fullReflection = `시작 전 감정: ${reflections[0]}\n\n완료 후 감정: ${reflections[1]}\n\n깨달은 점: ${reflections[2]}`;
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
            <div className="p-2 rounded-full bg-orange-100">
              <IconComponent className="w-5 h-5 text-orange-600" />
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
                  index <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* 감정 변화 시각화 */}
          {currentStep === 1 && reflections[0] && (
            <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50 p-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-orange-100 px-3 py-1 rounded-full">
                  시작 전: {reflections[0].slice(0, 20)}...
                </div>
                <ArrowRight className="w-4 h-4 text-orange-600" />
                <div className="text-orange-600 font-medium">완료 후는?</div>
              </div>
            </Card>
          )}

          <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
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
                className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                이전
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!reflections[currentStep].trim()}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
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
