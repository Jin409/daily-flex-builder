
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";  
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, BookOpen, Filter, Search, Users, Home, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReflectionCard from '@/components/ReflectionCard';
import ReflectionCalendar from '@/components/ReflectionCalendar';
import ReflectionDialog from '@/components/ReflectionDialog';
import { mockReflections, defaultCategories } from '@/types/reflection';
import { useToast } from '@/hooks/use-toast';

const ReflectionHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReflectionDialog, setShowReflectionDialog] = useState(false);
  const [reflections, setReflections] = useState(mockReflections);
  
  // 필터 및 검색 상태
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedVisibility, setSelectedVisibility] = useState('전체');
  
  const { toast } = useToast();

  // 필터링된 회고 목록
  const filteredReflections = reflections.filter(reflection => {
    const matchesSearch = reflection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reflection.reflection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || reflection.category === selectedCategory;
    const matchesStatus = selectedStatus === '전체' || reflection.status === selectedStatus;
    const matchesVisibility = selectedVisibility === '전체' || reflection.visibility === selectedVisibility;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesVisibility;
  });

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('전체');
    setSelectedStatus('전체');
    setSelectedVisibility('전체');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link to="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                홈으로
              </Button>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              성장 기록
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            나의 변화와 성장을 기록하고 돌아보세요
          </p>
          
          {/* 상단 액션 버튼들 */}
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
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className={`flex items-center gap-2 px-6 py-3 ${
                showFilters 
                  ? 'bg-purple-100 border-purple-300 text-purple-700' 
                  : 'bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300'
              } font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
            >
              <Filter className="w-5 h-5" />
              필터
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              그룹 피드
            </Button>
          </div>

          {/* 검색 및 필터 섹션 */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="제목이나 내용으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-400">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체 카테고리</SelectItem>
                    {defaultCategories.map(category => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-400">
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체 상태</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                    <SelectItem value="failed">시도완료</SelectItem>
                    <SelectItem value="in-progress">진행중</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedVisibility} onValueChange={setSelectedVisibility}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-400">
                    <SelectValue placeholder="공개 범위" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체 범위</SelectItem>
                    <SelectItem value="public">공개</SelectItem>
                    <SelectItem value="family">그룹</SelectItem>
                    <SelectItem value="private">비공개</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  총 {filteredReflections.length}개의 기록이 있습니다
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4 mr-1" />
                  필터 초기화
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 메인 콘텐츠 */}
        {showCalendar ? (
          <ReflectionCalendar 
            reflections={filteredReflections}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        ) : (
          <div className="space-y-6">
            {filteredReflections.length > 0 ? (
              filteredReflections.map((reflection) => (
                <ReflectionCard 
                  key={reflection.id} 
                  reflection={reflection}
                  onUpdate={handleReflectionUpdate}
                />
              ))
            ) : (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">검색 결과가 없습니다</h3>
                  <p className="text-gray-500">다른 검색어나 필터를 시도해보세요</p>
                </CardContent>
              </Card>
            )}
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
