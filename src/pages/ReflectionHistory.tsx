
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";  
import { Calendar, Plus, BookOpen, Filter, Search, Users } from 'lucide-react';
import ReflectionCard from '@/components/ReflectionCard';
import ReflectionCalendar from '@/components/ReflectionCalendar';
import ReflectionDialog from '@/components/ReflectionDialog';
import { mockReflections } from '@/types/reflection';
import { useToast } from '@/hooks/use-toast';

const ReflectionHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReflectionDialog, setShowReflectionDialog] = useState(false);
  const [reflections, setReflections] = useState(mockReflections);
  const { toast } = useToast();

  const handleReflectionUpdate = (updatedReflection: any) => {
    setReflections(prev => 
      prev.map(r => r.id === updatedReflection.id ? updatedReflection : r)
    );
    toast({
      title: "회고가 수정되었습니다",
      description: "변경사항이 저장되었습니다.",
    });
  };

  const handleAddReflection = (reflection: string) => {
    const newReflection = {
      id: Date.now().toString(),
      title: "새로운 성장 회고",
      category: "개인적 유연성",
      reflection: reflection,
      date: new Date(),
      visibility: 'public' as const,
      status: 'completed' as const,
      isOwner: true,
      comments: []
    };
    
    setReflections(prev => [newReflection, ...prev]);
    toast({
      title: "성장 기록이 추가되었습니다! ✨",
      description: "새로운 회고가 성공적으로 저장되었습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            성장 기록
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            나의 변화와 성장을 기록하고 돌아보세요
          </p>
          
          {/* 상단 액션 버튼들 - 디자인 개선 */}
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
            <Button
              onClick={() => setShowReflectionDialog(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            >
              <Plus className="w-5 h-5" />
              새 회고 작성
            </Button>
            
            <Button
              onClick={() => setShowCalendar(!showCalendar)}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
              {showCalendar ? '목록으로' : '달력 보기'}
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Filter className="w-5 h-5" />
              필터
            </Button>
            
            <Button
              variant="outline"  
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Search className="w-5 h-5" />
              검색
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              그룹 피드
            </Button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        {showCalendar ? (
          <ReflectionCalendar 
            reflections={reflections}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        ) : (
          <div className="space-y-6">
            {reflections.map((reflection) => (
              <ReflectionCard 
                key={reflection.id} 
                reflection={reflection}
                onUpdate={handleReflectionUpdate}
              />
            ))}
          </div>
        )}

        {/* 회고 작성 다이얼로그 */}
        <ReflectionDialog
          open={showReflectionDialog}
          onClose={() => setShowReflectionDialog(false)}
          onSubmit={handleAddReflection}
        />
      </div>
    </div>
  );
};

export default ReflectionHistory;
