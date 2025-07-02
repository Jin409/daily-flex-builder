
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
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Lock, Unlock, Users } from 'lucide-react';
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
  const [visibility, setVisibility] = useState<'public' | 'private' | 'family'>('public');

  useEffect(() => {
    if (reflection) {
      setTitle(reflection.title);
      setContent(reflection.reflection);
      setVisibility(reflection.visibility || 'public');
    }
  }, [reflection]);

  const handleSave = () => {
    if (reflection) {
      const updatedReflection: ReflectionEntry = {
        ...reflection,
        title,
        reflection: content,
        visibility
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
    setVisibility('public');
  };

  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'private':
        return <Lock className="w-4 h-4 text-gray-600" />;
      case 'family':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <Unlock className="w-4 h-4 text-orange-600" />;
    }
  };

  const getVisibilityDescription = () => {
    switch (visibility) {
      case 'private':
        return '나만 볼 수 있습니다';
      case 'family':
        return '가족만 볼 수 있습니다';
      default:
        return '모든 사람이 볼 수 있습니다';
    }
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
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {getVisibilityIcon()}
                  <Label htmlFor="visibility">공개 범위</Label>
                </div>
                <Select value={visibility} onValueChange={(value: 'public' | 'private' | 'family') => setVisibility(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">전체 공개</SelectItem>
                    <SelectItem value="family">가족에게만 공개</SelectItem>
                    <SelectItem value="private">비공개</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">
                  {getVisibilityDescription()}
                </p>
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
