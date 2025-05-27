// src/pages/VerifyEmail.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Message = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Подтверждаем…');

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setStatus('Нет токена для подтверждения');
      return;
    }
    axios.get(`/api/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus('E-mail успешно подтверждён! Сейчас вы будете перенаправлены…');
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch(err => {
        setStatus(err.response?.data || 'Ошибка при подтверждении');
      });
  }, [params, navigate]);

  return <Message>{status}</Message>;
}
