
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Users, Brain, Heart, MessageCircle, ThumbsUp, Send, PlusCircle, Edit3, Lock, User, Target } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReflectionEntry, categoryConfig, Comment, defaultCategories } from '@/types/reflection';
import ReflectionEditDialog from './ReflectionEditDialog';

interface ReflectionCardProps {
  reflection: ReflectionEntry;
  onUpdate?: (updatedReflection: ReflectionEntry) => void;
}

const iconMap = {
  'Users': Users,
  'Brain': Brain,
  'Heart': Heart,
  'Target': Target,
  'MessageCircle': MessageCircle
};

const ReflectionCard = ({ reflection, onUpdate }: ReflectionCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(reflection.comments || []);
  const [commentType, setCommentType] = useState<'comment' | 'feedback'>('comment');
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestMission, setSuggestMission] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);

  // 카테고리 설정 찾기
  const categoryData = defaultCategories.find(cat => cat.name === reflection.category);
  const config = categoryData || defaultCategories[0];
  const IconComponent = iconMap[config.icon as keyof typeof iconMap] || Users;

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: '익명의 응원자',
        content: newComment,
        date: new Date(),
        type: commentType
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleSuggestMission = () => {
    if (suggestMission.trim()) {
      setShowSuggest(false);
      setSuggestMission('');
      alert('미션이 제안되었습니다! (실제 연결은 추후 구현)');
    }
  };

  const handleSaveReflection = (updatedReflection: ReflectionEntry) => {
    if (onUpdate) {
      onUpdate(updatedReflection);
    }
  };

  const getStatusBadge = () => {
    switch (reflection.status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">완료</Badge>;
      case 'failed':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">시도함</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">진행중</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <>
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-pink-100">
                <IconComponent className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-lg text-gray-800">{reflection.title}</CardTitle>
                  {reflection.isPrivate && <Lock className="w-4 h-4 text-gray-500" />}
                  {!reflection.isOwner && <User className="w-4 h-4 text-blue-500" />}
                </div>
                <CardDescription className="text-sm">
                  {format(reflection.date, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <Badge variant="outline" className={config.color}>
                {reflection.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">
            {reflection.reflection}
          </p>
          
          {/* 소유자만 수정 가능 */}
          {reflection.isOwner && (
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditDialog(true)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                수정
              </Button>
            </div>
          )}
          
          {/* 댓글 토글 버튼 */}
          {!reflection.isPrivate && (
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                응원 ({comments.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-pink-600 border-pink-200 hover:bg-pink-50"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                공감
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => setShowSuggest(!showSuggest)}
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                미션 제안하기
              </Button>
            </div>
          )}

          {/* 댓글 섹션 */}
          {showComments && !reflection.isPrivate && (
            <div className="space-y-4 border-t pt-4">
              {/* 기존 댓글 */}
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gradient-to-r from-orange-50 to-pink-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-orange-700">{comment.author}</span>
                    <Badge variant="outline" className={`text-xs ${
                      comment.type === 'feedback' 
                        ? 'bg-purple-100 text-purple-700 border-purple-200' 
                        : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      {comment.type === 'feedback' ? '피드백' : '응원'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {format(comment.date, 'MM/dd HH:mm')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              ))}

              {/* 새 댓글 작성 */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    variant={commentType === 'comment' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCommentType('comment')}
                    className={commentType === 'comment' ? 'bg-orange-500 hover:bg-orange-600' : 'text-orange-600 border-orange-200'}
                  >
                    응원 메시지
                  </Button>
                  <Button
                    variant={commentType === 'feedback' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCommentType('feedback')}
                    className={commentType === 'feedback' ? 'bg-purple-500 hover:bg-purple-600' : 'text-purple-600 border-purple-200'}
                  >
                    성장 피드백
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={commentType === 'comment' ? "따뜻한 응원 메시지를 남겨주세요..." : "성장에 도움이 될 피드백을 남겨주세요..."}
                    className="flex-1 min-h-[60px] border-orange-200 focus:border-orange-400"
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showSuggest && !reflection.isPrivate && (
            <div className="flex gap-2 mb-4 animate-fade-in">
              <Textarea
                value={suggestMission}
                onChange={e => setSuggestMission(e.target.value)}
                placeholder="새로운 미션을 제안해보세요!"
                className="flex-1 min-h-[40px] border-green-200 focus:border-green-400"
              />
              <Button
                onClick={handleSuggestMission}
                disabled={!suggestMission.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}

          {reflection.isPrivate && (
            <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              이 기록은 비공개로 설정되어 있습니다.
            </div>
          )}
        </CardContent>
      </Card>

      <ReflectionEditDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        reflection={reflection}
        onSave={handleSaveReflection}
      />
    </>
  );
};

export default ReflectionCard;
