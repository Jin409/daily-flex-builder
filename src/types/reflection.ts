export interface Comment {
  id: string;
  author: string;
  content: string;
  date: Date;
  type: 'comment' | 'feedback';
  isFamily: boolean;
}

export interface ReflectionEntry {
  id: string;
  title: string;
  category: string;
  reflection: string;
  date: Date;
  visibility: 'public' | 'private' | 'family';
  status: 'completed' | 'failed' | 'in-progress';
  isOwner: boolean;
  comments?: Comment[];
  relatedGoal?: {
    id: string;
    title: string;
    mission: {
      id: string;
      title: string;
    };
  };
}

export const categoryConfig: { [key: string]: { color: string; icon: string } } = {
  '개인적 유연성': { color: 'text-blue-600 bg-blue-100', icon: 'Heart' },
  '대인관계 유연성': { color: 'text-green-600 bg-green-100', icon: 'Users' },
  '인지적 유연성': { color: 'text-purple-600 bg-purple-100', icon: 'Brain' },
  '목표 달성': { color: 'text-orange-600 bg-orange-100', icon: 'Target' }
};

export const defaultCategories = [
  { name: '개인적 유연성', color: 'text-blue-600 bg-blue-100', icon: 'Heart' },
  { name: '대인관계 유연성', color: 'text-green-600 bg-green-100', icon: 'Users' },
  { name: '인지적 유연성', color: 'text-purple-600 bg-purple-100', icon: 'Brain' },
  { name: '목표 달성', color: 'text-orange-600 bg-orange-100', icon: 'Target' }
];

export const mockReflections: ReflectionEntry[] = [
  {
    id: '1',
    title: '새로운 요리 도전기',
    category: '개인적 유연성',
    reflection: '평소 요리를 안 하던 내가 오늘 파스타에 도전해봤다. 처음엔 많이 서툴렀지만, 완성하고 나니 뿌듯했다. 작은 변화도 큰 성장이 될 수 있다는 걸 느꼈다.',
    date: new Date(2024, 0, 15),
    visibility: 'public',
    status: 'completed',
    isOwner: true,
    relatedGoal: {
      id: 'goal1',
      title: '일상에서 새로운 것들 도전하기',
      mission: {
        id: 'm4',
        title: '새로운 취미 활동 시작하기'
      }
    },
    comments: [
      {
        id: 'c1',
        author: '민수',
        content: '와 정말 대단해! 나도 요리 해보고 싶어졌어',
        date: new Date(2024, 0, 15),
        type: 'comment',
        isFamily: true
      },
      {
        id: 'c2',  
        author: '지영',
        content: '요리할 때 재료 준비를 미리 다 해두면 더 수월할 거야. 다음에는 더 복잡한 요리에도 도전해볼 수 있을 것 같아!',
        date: new Date(2024, 0, 15),
        type: 'feedback',
        isFamily: true
      }
    ]
  },
  {
    id: '2',
    title: '새로운 사람들과의 만남',
    category: '대인관계 유연성',
    reflection: '오늘 동호회 모임에 처음 참석했다. 낯선 사람들과 대화하는 게 어색했지만, 생각보다 재미있었다. 다양한 사람들과 소통하는 능력이 조금씩 늘고 있는 것 같다.',
    date: new Date(2024, 0, 14),
    visibility: 'family',
    status: 'completed',
    isOwner: false,
    relatedGoal: {
      id: 'goal2',
      title: '대인관계 유연성 키우기',
      mission: {
        id: 'm7',
        title: '새로운 모임에 참여하기'
      }
    },
    comments: [
      {
        id: 'c3',
        author: '현우',
        content: '첫 모임 참석 정말 용기있는 행동이었어! 👏',
        date: new Date(2024, 0, 14),
        type: 'comment',
        isFamily: false
      },
      {
        id: 'c4',
        author: '수진',
        content: '처음엔 어색해도 몇 번 더 참석하다 보면 편해질 거야. 공통 관심사를 찾아서 대화를 시작하면 더 자연스러울 수 있어!',
        date: new Date(2024, 0, 14), 
        type: 'feedback',
        isFamily: true
      }
    ]
  },
  {
    id: '3',
    title: '다른 관점으로 문제 바라보기',
    category: '인지적 유연성',
    reflection: '회사에서 발생한 갈등 상황을 다른 각도에서 생각해봤다. 처음엔 상대방이 잘못했다고만 생각했는데, 상대의 입장에서 생각해보니 이해할 수 있는 부분들이 있었다.',
    date: new Date(2024, 0, 13),
    visibility: 'public',
    status: 'completed',
    isOwner: true,
    comments: [
      {
        id: 'c5',
        author: '태현',
        content: '다른 사람 입장에서 생각하는 건 정말 어려운 일인데 대단해!',
        date: new Date(2024, 0, 13),
        type: 'comment',
        isFamily: false
      },
      {
        id: 'c6',
        author: '은혜',
        content: '이런 관점 전환 능력이 생기면 앞으로 더 복잡한 인간관계도 잘 풀어나갈 수 있을 거야. 갈등이 생겼을 때 잠시 시간을 두고 생각하는 습관을 기르는 것도 도움이 될 것 같아!',
        date: new Date(2024, 0, 13),
        type: 'feedback', 
        isFamily: true
      }
    ]
  },
  {
    id: '4',
    title: '운동 루틴 도전',
    category: '목표 달성',
    reflection: '3일 연속 아침 운동을 하려고 했지만 2일째에 포기했다. 완벽하지 않아도 시도한 것 자체가 의미 있다고 생각한다. 내일부터 다시 도전해보려고 한다.',
    date: new Date(2024, 0, 12),
    visibility: 'public',
    status: 'failed',
    isOwner: true,
    relatedGoal: {
      id: 'goal3',
      title: '감정 조절 능력 향상하기',
      mission: {
        id: 'm12',
        title: '스트레스 해소 활동 하기'
      }
    },
    comments: [
      {
        id: 'c7',
        author: '정민',
        content: '시도하는 것만으로도 충분히 대단해! 화이팅! 💪',
        date: new Date(2024, 0, 12),
        type: 'comment',
        isFamily: false
      },
      {
        id: 'c8',
        author: '혜진',
        content: '처음부터 매일 하려고 하지 말고 주 3회부터 시작해보는 건 어때? 작은 목표부터 달성하면서 자신감을 쌓아가는 게 지속가능할 것 같아!',
        date: new Date(2024, 0, 12),
        type: 'feedback',
        isFamily: true  
      }
    ]
  }
];

export const userTypeMissions = {
  introvert: [
    "새로운 사람과 대화하기",
    "그룹 활동에 참여하기",
    "의견을 적극적으로 표현하기"
  ],
  extrovert: [
    "혼자만의 시간 가지기",
    "조용한 활동 즐기기", 
    "깊이 있는 대화하기"
  ],
  analytical: [
    "직감적으로 결정하기",
    "감정적 접근법 시도하기",
    "창의적 활동하기"
  ],
  creative: [
    "논리적으로 분석하기",
    "체계적으로 계획하기",
    "데이터 기반 결정하기"
  ]
};
