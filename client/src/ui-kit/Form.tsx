import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundAlt || '#fff'};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Icon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondary};
  pointer-events: none;  /* чтобы клик приходил на сам input */
`;

export const IconEye = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
`;

export const StyledInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const StyledButton = styled.button<{ variant?: 'solid' | 'outline' }>`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  color: #fff;
  background: ${({ theme, variant = 'solid' }) =>
    variant === 'solid' ? theme.colors.primary : 'transparent'};
  border-color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.colors.primary : 'transparent'};
  &:hover {
    opacity: 0.9;
  }
`;

export const StyledError = styled.p`
  font-size: 0.9rem;
  color: red;
`;
