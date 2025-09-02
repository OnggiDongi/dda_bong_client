import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from '@/components/atoms/Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    placeholder: '내용을 입력하세요',
    className: 'h-[50px] w-[300px] px-4',
    disabled: false,
    type: 'text',
  },
  argTypes: {
    placeholder: { control: 'text', description: '플레이스홀더 텍스트' },
    className: { control: 'text', description: 'Tailwind로 크기/여백 커스텀' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'input type',
    },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '이메일을 입력하세요',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
  },
};

export const CustomSize: Story = {
  args: {
    className: 'h-[56px] w-[360px] px-5 text-lg',
    placeholder: '커스텀 사이즈',
  },
};
