
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, UserPlus, Lock, Globe } from 'lucide-react';

interface GroupManagementProps {
  open: boolean;
  onClose: () => void;
  onJoinGroup: (groupId: string) => void;
  onCreateGroup: (groupName: string) => void;
}

const mockGroups = [
  {
    id: 'group1',
    name: '함께 성장하는 사람들',
    description: '일상의 작은 변화를 통해 함께 성장해요',
    memberCount: 8,
    isPrivate: false,
    tags: ['일상', '성장', '유연성']
  },
  {
    id: 'group2',
    name: '직장인 소통모임',
    description: '직장 생활에서의 소통 스킬을 함께 늘려가요',
    memberCount: 12,
    isPrivate: false,
    tags: ['직장', '소통', '관계']
  },
  {
    id: 'group3',
    name: '마음챙김 여행',
    description: '감정 조절과 마음 건강을 위한 여행',
    memberCount: 5,
    isPrivate: true,
    tags: ['감정', '마음건강', '힐링']
  }
];

const GroupManagement: React.FC<GroupManagementProps> = ({ 
  open, 
  onClose, 
  onJoinGroup, 
  onCreateGroup 
}) => {
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      onCreateGroup(groupName);
      setGroupName('');
      setGroupDescription('');
      onClose();
    }
  };

  const handleJoinWithCode = () => {
    if (joinCode.trim()) {
      onJoinGroup(joinCode);
      setJoinCode('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-100">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            성장 그룹 관리
          </DialogTitle>
          <DialogDescription>
            함께 성장할 동료들과 연결되어 서로 응원하고 피드백을 나누어보세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 탭 버튼 */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeTab === 'join' ? 'default' : 'ghost'}
              className="flex-1"
              onClick={() => setActiveTab('join')}
            >
              그룹 찾기
            </Button>
            <Button
              variant={activeTab === 'create' ? 'default' : 'ghost'}
              className="flex-1"
              onClick={() => setActiveTab('create')}
            >
              그룹 만들기
            </Button>
          </div>

          {activeTab === 'join' && (
            <div className="space-y-4">
              {/* 초대 코드로 참여 */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    초대 코드로 참여하기
                  </CardTitle>
                  <CardDescription>
                    친구나 동료로부터 받은 초대 코드를 입력하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="초대 코드를 입력하세요"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleJoinWithCode}
                      disabled={!joinCode.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      참여하기
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 공개 그룹 목록 */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">공개 그룹 둘러보기</h3>
                <div className="space-y-3">
                  {mockGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-800">{group.name}</h4>
                              {group.isPrivate ? (
                                <Lock className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Globe className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{group.memberCount}명 참여</span>
                              <div className="flex gap-1">
                                {group.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => onJoinGroup(group.id)}
                            className="bg-orange-600 hover:bg-orange-700"
                            disabled={group.isPrivate}
                          >
                            {group.isPrivate ? '비공개' : '참여'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-4">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="w-5 h-5 text-green-600" />
                    새 그룹 만들기
                  </CardTitle>
                  <CardDescription>
                    나만의 성장 그룹을 만들어 사람들을 초대해보세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="groupName">그룹 이름</Label>
                    <Input
                      id="groupName"
                      placeholder="예: 함께 성장하는 직장동료들"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groupDescription">그룹 설명 (선택사항)</Label>
                    <Input
                      id="groupDescription"
                      placeholder="그룹의 목표나 분위기를 간단히 설명해주세요"
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleCreateGroup}
                    disabled={!groupName.trim()}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    그룹 만들기
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">그룹 만들기 혜택</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 초대 코드를 통해 원하는 사람들만 초대</li>
                  <li>• 그룹 멤버들과 서로의 성장 기록 공유</li>
                  <li>• 응원 메시지와 피드백 주고받기</li>
                  <li>• 함께하는 미션 도전하기</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupManagement;
