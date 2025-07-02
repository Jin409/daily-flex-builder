
export interface ReflectionEntry {
  id: string;
  date: Date;
  category: string;
  title: string;
  reflection: string;
  comments?: Comment[];
  isPrivate?: boolean;
  isOwner?: boolean;
  status: 'completed' | 'failed' | 'in-progress';
  emotions?: {
    before?: string;
    after?: string;
  };
  customGoal?: string;
  userType?: string;
  groupId?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: Date;
  type: 'comment' | 'feedback';
}

export interface UserProfile {
  id: string;
  name: string;
  userType: 'explorer' | 'challenger' | 'social' | 'thinker' | 'steady';
  customCategories: string[];
  groupId?: string;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  isFamily: boolean;
}

// 새로운 카테고리 시스템
export const defaultCategories = [
  {
    id: 'social',
    name: '사람과의 관계',
    icon: 'Users',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    dotColor: '#EA580C'
  },
  {
    id: 'mindset',
    name: '생각의 변화',
    icon: 'Brain',
    color: 'bg-pink-100 text-pink-800 border-pink-200',
    dotColor: '#EC4899'
  },
  {
    id: 'emotion',
    name: '감정 조절',
    icon: 'Heart',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    dotColor: '#8B5CF6'
  },
  {
    id: 'habit',
    name: '새로운 도전',
    icon: 'Target',
    color: 'bg-green-100 text-green-800 border-green-200',
    dotColor: '#059669'
  },
  {
    id: 'communication',
    name: '소통 방식',
    icon: 'MessageCircle',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    dotColor: '#2563EB'
  }
];

// 사용자 유형별 맞춤 미션
export const userTypeMissions = {
  explorer: [
    "오늘 처음 가보는 장소에서 30분 보내기",
    "새로운 음식 주문해보기",
    "모르는 길로 산책하기"
  ],
  challenger: [
    "평소 회피했던 일 하나 도전하기",
    "어려운 문제에 30분 도전하기",
    "새로운 기술 배우기 시작하기"
  ],
  social: [
    "새로운 사람과 대화하기",
    "그룹 활동에 참여하기",
    "누군가에게 먼저 연락하기"
  ],
  thinker: [
    "평소와 반대 의견으로 생각해보기",
    "새로운 관점으로 문제 접근하기",
    "창의적인 해결책 찾아보기"
  ],
  steady: [
    "작은 변화 하나 시도하기",
    "루틴을 조금 바꿔보기",
    "편안한 속도로 새로운 것 시도하기"
  ]
};

// 기존 categoryConfig는 defaultCategories로 대체
export const categoryConfig = defaultCategories.reduce((acc, cat) => {
  acc[cat.name] = {
    color: cat.color,
    icon: cat.icon,
    dotColor: cat.dotColor
  };
  return acc;
}, {} as Record<string, any>);

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
    date: getDateOffset(0),
    category: '사람과의 관계',
    title: '처음 보는 사람에게 먼저 인사하기',
    reflection: '시작 전 감정: 긴장했고, 망설여졌어요.\n\n완료 후 감정: 생각보다 별거 아니었고, 뿌듯해요.\n\n깨달은 점: 막상 해보니 별거 아니었어요. 다음엔 더 자신있게 할 수 있을 것 같아요.',
    status: 'completed',
    isOwner: true,
    isPrivate: false,
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
    date: getDateOffset(-1),
    category: '생각의 변화',
    title: '내 의견과 반대되는 입장 끝까지 듣기',
    reflection: '시작 전 감정: 답답하고 참기 어려웠어요.\n\n완료 후 감정: 새로운 관점을 발견해서 신기했어요.\n\n깨달은 점: 다양한 시각을 받아들이는 것이 생각보다 어렵지 않았어요.',
    status: 'completed',
    isOwner: true,
    isPrivate: false,
    comments: []
  },
  {
    id: '3',
    date: getDateOffset(-2),
    category: '감정 조절',
    title: '스트레스 상황에서 심호흡하기',
    reflection: '시작 전 감정: 화가 나고 조급했어요.\n\n시도 후 감정: 완전히 성공하지는 못했지만, 조금이라도 시도해본 것이 의미있었어요.\n\n깨달은 점: 완벽하지 않아도 시도하는 것 자체가 성장이에요.',
    status: 'failed',
    isOwner: true,
    isPrivate: false,
    comments: [
      {
        id: '2',
        author: '박응원',
        content: '시도하신 것만으로도 대단해요. 완벽하지 않아도 괜찮아요!',
        date: getDateOffset(-2),
        type: 'feedback'
      }
    ]
  },
  {
    id: '4',
    date: getDateOffset(-3),
    category: '새로운 도전',
    title: '평소와 다른 길로 출근하기',
    reflection: '시작 전 감정: 귀찮고 번거로울 것 같았어요.\n\n완료 후 감정: 새로운 발견이 있어서 재미있었어요.\n\n깨달은 점: 작은 변화지만 하루를 다르게 시작할 수 있었습니다.',
    status: 'completed',
    isOwner: false,
    isPrivate: false,
    comments: []
  },
  {
    id: '5',
    date: getDateOffset(-4),
    category: '소통 방식',
    title: '평소 말 안 하는 동료와 대화하기',
    reflection: '시작 전 감정: 어색하고 뭘 말해야 할지 몰랐어요.\n\n완료 후 감정: 생각보다 재미있는 대화를 나눌 수 있었어요.\n\n깨달은 점: 새로운 인연을 만들 수 있었고, 소통의 즐거움을 느꼈습니다.',
    status: 'completed',
    isOwner: false,
    isPrivate: true,
    comments: []
  }
];
