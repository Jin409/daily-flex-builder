
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Lock, Unlock } from 'lucide-react';
import { ReflectionEntry } from '@/types/reflection';

interface ReflectionEditDialogProps {
  open: boolean;
  onClose: () => void;
  reflection: ReflectionEntry | null;
  onSave: (updatedReflection: ReflectionEntry) => void;
}

const ReflectionEditDialog: React.FC<ReflectionEditDialogProps> = ({ 
  open, 
  onClose, 
  reflection, 
  onSave 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (reflection) {
      setTitle(reflection.title);
      setContent(reflection.reflection);
      setIsPrivate(reflection.isPrivate || false);
    }
  }, [reflection]);

  const handleSave = () => {
    if (reflection) {
      const updatedReflection: ReflectionEntry = {
        ...reflection,
        title,
        reflection: content,
        isPrivate
      };
      onSave(updatedReflection);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    // 리셋
    setTitle('');
    setContent('');
    setIsPrivate(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-orange-600" />
            회고 수정하기
          </DialogTitle>
          <DialogDescription>
            성장 기록을 수정하고 공개 범위를 설정하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="회고 제목을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="회고 내용을 입력하세요"
              className="min-h-[120px]"
            />
          </div>

          <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isPrivate ? (
                    <Lock className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Unlock className="w-4 h-4 text-orange-600" />
                  )}
                  <div>
                    <Label htmlFor="privacy">비공개 설정</Label>
                    <p className="text-sm text-gray-600">
                      {isPrivate ? '나만 볼 수 있습니다' : '다른 사람들도 볼 수 있습니다'}
                    </p>
                  </div>
                </div>
                <Switch
                  id="privacy"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReflectionEditDialog;
