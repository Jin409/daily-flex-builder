
export interface ReflectionEntry {
  id: string;
  date: Date;
  category: '사회적 유연성' | '인지적 유연성' | '감정적 유연성';
  title: string;
  reflection: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: Date;
  type: 'comment' | 'feedback';
}

export const categoryConfig = {
  '사회적 유연성': {
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: 'Users',
    dotColor: '#EA580C'
  },
  '인지적 유연성': {
    color: 'bg-pink-100 text-pink-800 border-pink-200',
    icon: 'Brain',
    dotColor: '#EC4899'
  },
  '감정적 유연성': {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: 'Heart',
    dotColor: '#8B5CF6'
  }
};

// 오늘 날짜 기준으로 미션 날짜 생성
const today = new Date();
const getDateOffset = (offset: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offset);
  return date;
};

export const mockReflections: ReflectionEntry[] = [
  {
    id: '1',
    date: getDateOffset(0), // 오늘
    category: '사회적 유연성',
    title: '처음 보는 사람에게 먼저 인사하기',
    reflection: '처음엔 긴장했지만 점차 편안해졌어요. 생각보다 사람들이 친근하게 반응해주었어요. 더 자연스럽게 대화를 이어가고 싶어요.',
    comments: [
      {
        id: '1',
        author: '김성장',
        content: '정말 대단해요! 저도 이런 용기를 내보고 싶어요 👏',
        date: getDateOffset(0),
        type: 'comment'
      }
    ]
  },
  {
    id: '2',
    date: getDateOffset(-1), // 어제
    category: '인지적 유연성',
    title: '내 의견과 반대되는 입장 끝까지 듣기',
    reflection: '평소라면 중간에 반박했을 텐데, 끝까지 들어보니 새로운 관점을 발견했어요. 다양한 시각을 받아들이는 것이 생각보다 어렵지 않았어요.',
    comments: []
  },
  {
    id: '3',
    date: getDateOffset(-2), // 2일 전
    category: '감정적 유연성',
    title: '하루 동안 모른다는 말 3번 하기',
    reflection: '완벽해야 한다는 압박에서 조금 벗어날 수 있었어요. 모르는 것을 인정하니 오히려 더 많이 배울 수 있었습니다.',
    comments: [
      {
        id: '2',
        author: '박응원',
        content: '모르는 것을 인정하는 용기가 정말 대단합니다. 저도 배워야겠어요!',
        date: getDateOffset(-2),
        type: 'feedback'
      }
    ]
  },
  {
    id: '4',
    date: getDateOffset(-3),
    category: '사회적 유연성',
    title: '평소와 다른 길로 출근하기',
    reflection: '익숙한 길 대신 새로운 길을 선택했어요. 작은 변화지만 하루를 다르게 시작할 수 있었습니다.',
    comments: []
  },
  {
    id: '5',
    date: getDateOffset(-4),
    category: '인지적 유연성',
    title: '오늘 하루 계획을 완전히 바꿔보기',
    reflection: '예상치 못한 상황에 유연하게 대응하는 연습을 했어요. 계획이 바뀌어도 괜찮다는 것을 느꼈습니다.',
    comments: []
  },
  {
    id: '6',
    date: getDateOffset(-5),
    category: '감정적 유연성',
    title: '화가 날 때 5분 기다리고 반응하기',
    reflection: '즉각적인 반응 대신 잠시 멈추고 생각할 시간을 가져봤어요. 더 현명한 선택을 할 수 있었습니다.',
    comments: []
  },
  {
    id: '7',
    date: getDateOffset(-6),
    category: '사회적 유연성',
    title: '평소 안 가던 카페에서 일하기',
    reflection: '새로운 환경에서 적응하는 능력을 키워봤어요. 환경이 바뀌어도 집중할 수 있다는 자신감을 얻었습니다.',
    comments: []
  },
  {
    id: '8',
    date: getDateOffset(-7),
    category: '인지적 유연성',
    title: '평소와 반대 의견으로 토론해보기',
    reflection: '내 입장과 반대되는 관점에서 생각해보는 연습을 했어요. 다각도로 사고하는 능력이 늘어난 것 같아요.',
    comments: []
  },
  {
    id: '9',
    date: getDateOffset(-8),
    category: '감정적 유연성',
    title: '스트레스 받는 상황에서 심호흡 3번 하기',
    reflection: '긴장되는 순간에 의식적으로 호흡을 조절해봤어요. 마음이 차분해지고 더 냉정하게 판단할 수 있었어요.',
    comments: []
  },
  {
    id: '10',
    date: getDateOffset(-9),
    category: '사회적 유연성',
    title: '평소 말 안 하는 동료와 대화하기',
    reflection: '용기를 내어 먼저 말을 걸어봤어요. 생각보다 재미있는 이야기를 나눌 수 있었고, 새로운 인연을 만들 수 있었습니다.',
    comments: []
  }
];
