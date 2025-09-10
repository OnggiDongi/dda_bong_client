import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './modal';

describe('atoms/Modal 컴포넌트', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    // 각 테스트 전에 mock 함수 초기화
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  it('title과 description을 올바르게 렌더링해야 합니다', () => {
    render(
      <Modal
        title='테스트 타이틀'
        description='테스트 설명'
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('테스트 타이틀')).toBeInTheDocument();
    expect(screen.getByText('테스트 설명')).toBeInTheDocument();
  });

  it('확인 버튼을 클릭하면 onConfirm 함수가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title='확인 테스트'
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmText='확인'
      />
    );

    const confirmButton = screen.getByText('확인');
    await user.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it('취소 버튼을 클릭하면 onCancel 함수가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title='취소 테스트'
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        cancelText='취소'
      />
    );

    const cancelButton = screen.getByText('취소');
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('오버레이를 클릭하면 onCancel 함수가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title='오버레이 테스트'
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // 4
    const modalContent = screen.getByText('오버레이 테스트').parentElement;
    const overlay = modalContent?.parentElement;

    expect(overlay).toBeInTheDocument();

    if (overlay) {
      await user.click(overlay);
    }

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('커스텀 버튼 텍스트를 올바르게 렌더링해야 합니다', () => {
    render(
      <Modal
        title='커스텀 텍스트 테스트'
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmText='네'
        cancelText='아니오'
      />
    );

    expect(screen.getByText('네')).toBeInTheDocument();
    expect(screen.getByText('아니오')).toBeInTheDocument();
  });
});
