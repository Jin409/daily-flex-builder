
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
import { Heart, ArrowRight, Lightbulb, AlertCircle } from 'lucide-react';

interface ReflectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reflection: string) => void;
  isFailed?: boolean;
}

const getReflectionPrompts = (isFailed: boolean) => [
  {
    icon: Heart,
    question: isFailed 
      ? "미션을 시작하기 전에 어떤 감정이었나요?"
      : "미션을 시작하기 전에 어떤 감정이었나요?",
    placeholder: isFailed
      ? "예: 걱정되고, 두려웠어요..."
      : "예: 긴장했고, 망설여졌어요...",
    type: "before"
  },
  {
    icon: isFailed ? AlertCircle : Heart,
    question: isFailed 
      ? "미션을 시도한 후 어떤 감정인가요?"
      : "미션을 완료한 후 어떤 감정인가요?",
    placeholder: isFailed
      ? "예: 아쉽지만, 시도해본 것만으로도 뿌듯해요..."
      : "예: 생각보다 별거 아니었고, 뿌듯해요...",
    type: "after"
  },
  {
    icon: Lightbulb,
    question: "이 경험을 통해 어떤 것을 깨달았나요?",
    placeholder: isFailed
      ? "예: 완벽하지 않아도 괜찮다는 걸 배웠어요. 다음에는 더 잘할 수 있을 것 같아요..."
      : "예: 막상 해보니 별거 아니었어요. 다음엔 더 자신있게 할 수 있을 것 같아요...",
    type: "insight"
  }
];

const ReflectionDialog: React.FC<ReflectionDialogProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  isFailed = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState<string[]>(['', '', '']);

  const reflectionPrompts = getReflectionPrompts(isFailed);

  const handleNext = () => {
    if (currentStep < reflectionPrompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const statusLabel = isFailed ? "시도 후" : "완료 후";
    const fullReflection = `시작 전 감정: ${reflections[0]}\n\n${statusLabel} 감정: ${reflections[1]}\n\n깨달은 점: ${reflections[2]}`;
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
            <div className={`p-2 rounded-full ${isFailed ? 'bg-yellow-100' : 'bg-orange-100'}`}>
              <IconComponent className={`w-5 h-5 ${isFailed ? 'text-yellow-600' : 'text-orange-600'}`} />
            </div>
            {isFailed ? '경험 기록하기' : '성장 기록하기'}
          </DialogTitle>
          <DialogDescription>
            {isFailed 
              ? '시도하신 것만으로도 충분히 의미있어요. 경험을 기록해보세요.'
              : '오늘의 경험을 기록하고 더 깊은 성장을 이루어보세요.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 진행 표시기 */}
          <div className="flex gap-2">
            {reflectionPrompts.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentStep 
                    ? (isFailed ? 'bg-yellow-500' : 'bg-orange-500') 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* 감정 변화 시각화 */}
          {currentStep === 1 && reflections[0] && (
            <Card className={`border-0 bg-gradient-to-r ${
              isFailed 
                ? 'from-yellow-50 to-orange-50' 
                : 'from-orange-50 to-pink-50'
            } p-3`}>
              <div className="flex items-center gap-3 text-sm">
                <div className={`${
                  isFailed ? 'bg-yellow-100' : 'bg-orange-100'
                } px-3 py-1 rounded-full`}>
                  시작 전: {reflections[0].slice(0, 20)}...
                </div>
                <ArrowRight className={`w-4 h-4 ${
                  isFailed ? 'text-yellow-600' : 'text-orange-600'
                }`} />
                <div className={`${
                  isFailed ? 'text-yellow-600' : 'text-orange-600'
                } font-medium`}>
                  {isFailed ? '시도 후는?' : '완료 후는?'}
                </div>
              </div>
            </Card>
          )}

          <Card className={`border-0 bg-gradient-to-r ${
            isFailed 
              ? 'from-yellow-50 to-orange-50' 
              : 'from-orange-50 to-pink-50'
          }`}>
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
                className={`flex-1 ${
                  isFailed 
                    ? 'border-yellow-200 text-yellow-700 hover:bg-yellow-50'
                    : 'border-orange-200 text-orange-700 hover:bg-orange-50'
                }`}
              >
                이전
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!reflections[currentStep].trim()}
              className={`flex-1 ${
                isFailed 
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
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
