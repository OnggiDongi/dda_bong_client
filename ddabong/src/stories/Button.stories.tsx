import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@/components/atoms/Button';

const COLOR_OPTIONS = [
  'green',
  'mint',
  'pink',
  'gray',
  'white',
  'purple',
] as const;
const BORDER_COLOR_OPTIONS = [
  'pink',
  'mint',
  'mint2',
  'purple',
  'green',
] as const;
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

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: '버튼',
    color: 'green',
    textWeight: 'semibold',
    disabled: false,
    className: '',
    textClassName: '',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: COLOR_OPTIONS,
      description: '토큰 기반 배경색',
    },
    borderColor: {
      control: { type: 'select' },
      mapping: {
        '': undefined,
        pink: 'pink',
        mint: 'mint',
        mint2: 'mint2',
        purple: 'purple',
        green: 'green',
      },
      description: '토큰 기반 테두리 색상 (미설정 시 테두리 없음)',
    },
    textWeight: {
      control: { type: 'select' },
      options: TEXT_WEIGHT_OPTIONS,
      description: 'Txt 컴포넌트의 폰트 굵기',
    },
    textClassName: {
      control: 'text',
      description: '텍스트 클래스(색상/크기 오버라이드)',
    },
    className: {
      control: 'text',
      description: '버튼 자체 크기/여백 조절',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Edit: Story = {
  args: {
    children: '수정하기',
    color: 'gray',
    textClassName: 'text-Icon-Detail',
    className: 'h-[45px] w-[155px]',
  },
};

export const Delete: Story = {
  args: {
    children: '삭제하기',
    color: 'pink',
    textClassName: 'text-white',
    className: 'h-[45px] w-[155px]',
  },
};
