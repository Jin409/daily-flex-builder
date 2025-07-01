
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, List, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReflectionList from '@/components/ReflectionList';
import ReflectionCalendar from '@/components/ReflectionCalendar';
import { mockReflections } from '@/types/reflection';

const ReflectionHistory = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState('list');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              성장 기록
            </h1>
            <p className="text-gray-600">
              지금까지의 유연성 여정을 돌아보세요
            </p>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              목록으로 보기
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              달력으로 보기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <ReflectionList reflections={mockReflections} />
          </TabsContent>

          <TabsContent value="calendar">
            <ReflectionCalendar 
              reflections={mockReflections}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReflectionHistory;
