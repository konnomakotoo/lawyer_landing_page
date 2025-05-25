import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: ${({ theme, $variant = 'primary' }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textOnPrimary};

  &:hover {
    opacity: 0.9;
  }
`;

export const Button: React.FC<ButtonProps> = ({ $variant = 'primary', children, ...rest }) => (
  <StyledButton $variant={$variant} {...rest}>
    {children}
  </StyledButton>
);
