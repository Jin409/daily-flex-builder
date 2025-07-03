
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Target } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  category: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  missions: Mission[];
  completedMissions: number;
  totalMissions: number;
  isActive: boolean;
}

interface GoalRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

const GoalRegistrationModal: React.FC<GoalRegistrationModalProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [missions, setMissions] = useState<Mission[]>([]);
  const [newMissionTitle, setNewMissionTitle] = useState('');
  const [newMissionDescription, setNewMissionDescription] = useState('');
  const [newMissionCategory, setNewMissionCategory] = useState('');

  const categories = [
    '새로운 도전',
    '사람과의 관계',
    '감정 조절',
    '생각의 변화',
    '소통 방식',
    '목표 달성'
  ];

  const addMission = () => {
    if (newMissionTitle.trim() && newMissionDescription.trim()) {
      const newMission: Mission = {
        id: `mission_${Date.now()}`,
        title: newMissionTitle,
        description: newMissionDescription,
        category: newMissionCategory || '새로운 도전',
        isCompleted: false
      };
      setMissions([...missions, newMission]);
      setNewMissionTitle('');
      setNewMissionDescription('');
      setNewMissionCategory('');
    }
  };

  const removeMission = (missionId: string) => {
    setMissions(missions.filter(m => m.id !== missionId));
  };

  const handleSave = () => {
    if (title.trim() && description.trim() && missions.length > 0) {
      const newGoal: Goal = {
        id: `goal_${Date.now()}`,
        title,
        description,
        category: category || '새로운 도전',
        missions,
        completedMissions: 0,
        totalMissions: missions.length,
        isActive: false
      };
      onSave(newGoal);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setMissions([]);
    setNewMissionTitle('');
    setNewMissionDescription('');
    setNewMissionCategory('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            새 목표 등록
          </DialogTitle>
          <DialogDescription className="text-center">
            달성하고 싶은 목표와 하위 미션들을 등록해보세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 목표 정보 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">목표 제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 일상에서 새로운 것들 도전하기"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">목표 설명</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="이 목표를 통해 어떤 변화를 이루고 싶으신가요?"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 하위 미션 등록 */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">하위 미션 등록</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <Input
                value={newMissionTitle}
                onChange={(e) => setNewMissionTitle(e.target.value)}
                placeholder="미션 제목 (예: 안 가던 길로 가보기)"
              />
              <Textarea
                value={newMissionDescription}
                onChange={(e) => setNewMissionDescription(e.target.value)}
                placeholder="미션 설명을 입력하세요"
                className="min-h-[60px]"
              />
              <div className="flex gap-2">
                <Select value={newMissionCategory} onValueChange={setNewMissionCategory}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="미션 카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addMission} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 등록된 미션 목록 */}
            {missions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">등록된 미션들:</h4>
                {missions.map((mission) => (
                  <div key={mission.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{mission.title}</p>
                      <p className="text-sm text-gray-600">{mission.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mission.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMission(mission.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              취소
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!title.trim() || !description.trim() || missions.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              목표 등록
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalRegistrationModal;
