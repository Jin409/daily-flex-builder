
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Heart } from 'lucide-react';
import { Group } from '@/types/reflection';

interface GroupManagementProps {
  open: boolean;
  onClose: () => void;
  currentGroup?: Group;
  onJoinGroup: (groupId: string) => void;
  onCreateGroup: (groupName: string, isFamily: boolean) => void;
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: '김씨 가족',
    members: ['김아빠', '김엄마', '김딸'],
    isFamily: true
  },
  {
    id: '2',
    name: '성장 스터디',
    members: ['박성장', '이도전', '정꾸준'],
    isFamily: false
  }
];

const GroupManagement: React.FC<GroupManagementProps> = ({
  open,
  onClose,
  currentGroup,
  onJoinGroup,
  onCreateGroup
}) => {
  const [newGroupName, setNewGroupName] = useState('');
  const [isFamily, setIsFamily] = useState(true);
  const [joinCode, setJoinCode] = useState('');

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      onCreateGroup(newGroupName, isFamily);
      setNewGroupName('');
      onClose();
    }
  };

  const handleJoinGroup = (groupId: string) => {
    onJoinGroup(groupId);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            가족 및 그룹 관리
          </DialogTitle>
          <DialogDescription>
            함께 성장할 가족이나 그룹에 참여하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {currentGroup ? (
            <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {currentGroup.isFamily ? (
                    <Heart className="w-5 h-5 text-pink-600" />
                  ) : (
                    <Users className="w-5 h-5 text-orange-600" />
                  )}
                  {currentGroup.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">구성원 ({currentGroup.members.length}명)</p>
                  <div className="flex flex-wrap gap-1">
                    {currentGroup.members.map((member, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* 새 그룹 만들기 */}
              <Card className="border-0 bg-gradient-to-r from-orange-50 to-pink-50">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-medium">새 그룹 만들기</h3>
                  <div className="space-y-2">
                    <Label htmlFor="groupName">그룹 이름</Label>
                    <Input
                      id="groupName"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="예: 김씨 가족, 성장 스터디"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={isFamily ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsFamily(true)}
                      className={isFamily ? "bg-pink-600 hover:bg-pink-700" : "border-pink-200 text-pink-600"}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      가족
                    </Button>
                    <Button
                      variant={!isFamily ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsFamily(false)}
                      className={!isFamily ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-600"}
                    >
                      <Users className="w-4 h-4 mr-1" />
                      그룹
                    </Button>
                  </div>
                  <Button
                    onClick={handleCreateGroup}
                    disabled={!newGroupName.trim()}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    그룹 만들기
                  </Button>
                </CardContent>
              </Card>

              {/* 기존 그룹 참여 */}
              <div className="space-y-2">
                <h3 className="font-medium">참여 가능한 그룹</h3>
                {mockGroups.map((group) => (
                  <Card
                    key={group.id}
                    className="border hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {group.isFamily ? (
                            <Heart className="w-4 h-4 text-pink-600" />
                          ) : (
                            <Users className="w-4 h-4 text-orange-600" />
                          )}
                          <span className="font-medium">{group.name}</span>
                        </div>
                        <Badge variant="outline">
                          {group.members.length}명
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupManagement;
