import type { Meta, StoryObj } from '@storybook/nextjs';
import Badge from '@/components/atoms/Badge';

const TEXT_WEIGHT_OPTIONS = [
  'thin',
  'light',
  'regular',
  'medium',
  'semibold',
  'bold',
  'heavy',
  'extrabold',
] as const;

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  args: {
    text: '뱃지',
    bgColor: 'bg-Logo-Mint',
    textColor: 'text-white',
    borderColor: undefined,
    rounded: 'rounded-3xl',
    weight: 'semibold',
    className: '',
    textClassName: '',
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    bgColor: {
      control: 'text',
      description: '배경색 클래스 (예: bg-Logo-Mint, bg-white 등)',
    },
    textColor: {
      control: 'text',
      description: '글자색 클래스 (예: text-white, text-Hana-Black 등)',
    },
    borderColor: {
      control: 'text',
      description:
        '테두리 색상 클래스 (예: border-1Q-Mint-Line). 값이 있으면 border 자동 활성화',
    },
    rounded: {
      control: 'text',
      description: 'radius 클래스 (예: rounded-md, rounded-3xl 등)',
    },
    weight: {
      control: { type: 'select' },
      options: TEXT_WEIGHT_OPTIONS,
      description: 'Txt 컴포넌트에 전달되는 폰트 굵기',
    },
    className: {
      control: 'text',
      description: '바깥에 추가할 클래스',
    },
    textClassName: {
      control: 'text',
      description: '내부 Txt에 추가할 클래스',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Pending: Story = {
  args: {
    text: '승인 대기',
    bgColor: 'bg-white',
    textColor: 'text-Modal-font',
    borderColor: 'border-Modal-font',
  },
};

export const RejectBadge: Story = {
  args: {
    text: '거절',
    bgColor: 'bg-Logo-Pink',
    textColor: 'text-white',
  },
};
