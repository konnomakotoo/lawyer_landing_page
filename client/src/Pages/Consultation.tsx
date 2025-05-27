// src/components/ConsultationForm.tsx
import React, { useState } from 'react'
import styled from 'styled-components'

const serviceOptions = [
  { value: 'business', label: 'Услуги бизнесу' },
  { value: 'private',  label: 'Услуги частным клиентам' },
  { value: 'other',    label: 'Другое' },
]

// —— STYLES ————————————————————————————————————————————————————————————————
const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundAlt ?? '#f9f9f9'};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem;
  }
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textOnBackground};
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`

const Select = styled.select`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`
// ————————————————————————————————————————————————————————————————————————

export const ConsultationForm: React.FC = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(serviceOptions[0].value)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: отправить данные на сервер
    console.log({ name, phone, service, comment })
    // очистить форму
    setName('')
    setPhone('')
    setService(serviceOptions[0].value)
    setComment('')
    alert('Заявка отправлена!')
  }

  return (
    <FormContainer>
      <Title>Запишитесь на консультацию</Title>
      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+7XXXXXXXXXX"
            required
          />
        </Field>
        <Field>
          <Label htmlFor="service">Тип услуги</Label>
          <Select
            id="service"
            value={service}
            onChange={e => setService(e.target.value)}
          >
            {serviceOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="comment">Комментарий (необязательно)</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Field>
        <SubmitButton type="submit">Отправить</SubmitButton>
      </StyledForm>
    </FormContainer>
  )
}
