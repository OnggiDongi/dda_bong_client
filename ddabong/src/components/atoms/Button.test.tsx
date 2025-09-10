import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('atoms/Button 컴포넌트', () => {
  it('자식으로 주어진 텍스트와 함께 렌더링되어야 합니다', () => {
    render(<Button>테스트 버튼</Button>);

    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('클릭 시 onClick 핸들러가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭!</Button>);

    await user.click(screen.getByText('클릭!'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('color prop에 따라 배경색 클래스를 적용해야 합니다', () => {
    render(<Button color='pink'>핑크 버튼</Button>);

    const buttonElement = screen.getByText('핑크 버튼').parentElement;
    expect(buttonElement).toHaveClass('bg-Logo-Pink');
  });

  it('borderColor prop에 따라 테두리 클래스를 적용해야 합니다', () => {
    render(<Button borderColor='mint'>테두리 버튼</Button>);
    const buttonElement = screen.getByText('테두리 버튼').parentElement;
    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).toHaveClass('border-Logo-Mint');
  });

  it('disabled prop이 true일 때 비활성화되어야 합니다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        비활성 버튼
      </Button>
    );
    const buttonElement = screen.getByText('비활성 버튼').parentElement;
    expect(buttonElement).toBeDisabled();

    await user.click(buttonElement!).catch(() => {});
    expect(handleClick).not.toHaveBeenCalled();
  });
});
