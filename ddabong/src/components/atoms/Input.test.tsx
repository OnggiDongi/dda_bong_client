import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Input from './Input';

describe('atoms/Input 컴포넌트', () => {
  it('placeholder와 함께 렌더링되어야 합니다', () => {
    render(<Input placeholder='텍스트 입력...' />);
    const inputElement = screen.getByPlaceholderText('텍스트 입력...');
    expect(inputElement).toBeInTheDocument();
  });

  it('사용자 타이핑을 허용해야 합니다', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const [value, setValue] = useState('');
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-testid='test-input'
        />
      );
    };

    render(<TestComponent />);
    const inputElement = screen.getByTestId('test-input');

    await user.type(inputElement, '안녕하세요!');
    expect(inputElement).toHaveValue('안녕하세요!');
  });

  it('disabled prop이 true일 때 비활성화되어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Input placeholder='disabled' disabled />);
    const inputElement = screen.getByPlaceholderText('disabled');

    expect(inputElement).toBeDisabled();

    await user.type(inputElement, '입력불가').catch(() => {});
    expect(inputElement).not.toHaveValue('입력불가');
  });

  it('추가적인 className을 적용해야 합니다', () => {
    render(<Input placeholder='test' className='my-custom-class' />);
    const inputElement = screen.getByPlaceholderText('test');
    expect(inputElement).toHaveClass('my-custom-class');
  });
});
