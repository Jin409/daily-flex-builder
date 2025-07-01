
export interface ReflectionEntry {
  id: string;
  date: Date;
  category: '사회적 유연성' | '인지적 유연성' | '감정적 유연성';
  title: string;
  reflection: string;
}

export const categoryConfig = {
  '사회적 유연성': {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: 'Users',
    dotColor: '#3B82F6'
  },
  '인지적 유연성': {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: 'Brain',
    dotColor: '#8B5CF6'
  },
  '감정적 유연성': {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: 'Heart',
    dotColor: '#10B981'
  }
};

export const mockReflections: ReflectionEntry[] = [
  {
    id: '1',
    date: new Date(2025, 0, 29),
    category: '사회적 유연성',
    title: '처음 보는 사람에게 먼저 인사하기',
    reflection: '처음엔 긴장했지만 점차 편안해졌어요. 생각보다 사람들이 친근하게 반응해주었어요. 더 자연스럽게 대화를 이어가고 싶어요.'
  },
  {
    id: '2',
    date: new Date(2025, 0, 28),
    category: '인지적 유연성',
    title: '내 의견과 반대되는 입장 끝까지 듣기',
    reflection: '평소라면 중간에 반박했을 텐데, 끝까지 들어보니 새로운 관점을 발견했어요. 다양한 시각을 받아들이는 것이 생각보다 어렵지 않았어요.'
  },
  {
    id: '3',
    date: new Date(2025, 0, 27),
    category: '감정적 유연성',
    title: '하루 동안 모른다는 말 3번 하기',
    reflection: '완벽해야 한다는 압박에서 조금 벗어날 수 있었어요. 모르는 것을 인정하니 오히려 더 많이 배울 수 있었습니다.'
  }
];
