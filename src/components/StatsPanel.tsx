import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';

const weeklyData = [
  { day: '월', completed: 1, category: '사회적 유연성' },
  { day: '화', completed: 1, category: '인지적 유연성' },
  { day: '수', completed: 1, category: '감정적 유연성' },
  { day: '목', completed: 0, category: null },
  { day: '금', completed: 1, category: '사회적 유연성' },
  { day: '토', completed: 0, category: null },
  { day: '일', completed: 0, category: null },
];

const categoryData = [
  { name: '사회적 유연성', value: 8, color: '#3B82F6' },
  { name: '인지적 유연성', value: 3, color: '#8B5CF6' },
  { name: '감정적 유연성', value: 1, color: '#10B981' },
];

const achievements = [
  { title: "첫 걸음", description: "첫 미션 완료", icon: "🎯", unlocked: true },
  { title: "꾸준함", description: "3일 연속 완료", icon: "🔥", unlocked: true },
  { title: "용기", description: "어려운 미션 완료", icon: "💪", unlocked: false },
  { title: "성장", description: "레벨 5 달성", icon: "🌱", unlocked: false },
];

const StatsPanel = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {/* 주간 활동 */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">이번 주 활동</CardTitle>
          </div>
          <CardDescription>요일별 미션 완료 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end gap-2 px-2 py-4">
            {weeklyData.map((day, idx) => {
              const cat = categoryData.find(c => c.name === day.category);
              return (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full shadow-md transition-all duration-200 ${day.completed ? '' : 'opacity-40'}`}
                    style={{ backgroundColor: day.completed && cat ? cat.color : '#e5e7eb', border: day.completed ? '2px solid #fff' : '2px dashed #d1d5db' }}
                  />
                  <span className="text-xs text-gray-700 mt-1 font-medium">{day.day}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{weeklyData.filter(d => d.completed).length}/7</div>
            <div className="text-sm text-gray-600">이번 주 완료일</div>
          </div>
        </CardContent>
      </Card>

      {/* 카테고리별 분석 */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <CardTitle className="text-lg">성장 영역</CardTitle>
          </div>
          <CardDescription>카테고리별 경험 분포</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-600">{category.name}</span>
                </div>
                <span className="font-medium">{category.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 업적 시스템 */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">업적</CardTitle>
          </div>
          <CardDescription>달성한 업적들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.description}
                  </div>
                </div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    달성
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
