import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


export interface Lawyer {
  id: string;
  name: string;
  photo: string;       // путь до картинки
  area: string;        // область практики
  bio: string;         // краткая биография
  experience: number;  // лет опыта
  university: string;  // закончил(а)
  location: string;    // город/регион
  contactLink: string; // ссылка на «Связаться» (mailto: или роут)
}

 const lawyers: Lawyer[] = [
  {
    id: 'ivanov',
    name: 'Иван Иванов',
    photo: 'https://media.gettyimages.com/id/1473893794/nl/foto/smiling-businessman-gesturing-against-blue-background.jpg?s=612x612&w=gi&k=20&c=yfxs87VpKNVd8MDJ8cXNt1k6jGjkMt1gKVtXNoUwn6o=',
    area: 'Уголовное право',
    bio: 'Защищает интересы доверителей в сложнейших уголовных делах, опыт работы с 2010 года.',
    experience: 13,
    university: 'Московский государственный юридический университет',
    location: 'Москва',
    contactLink: 'mailto:ivanov@example.com',
  },
  {
    id: 'petrova',
    name: 'Анна Петрова',
    photo: '/images/lawyers/petrova.jpg',
    area: 'Гражданское право',
    bio: 'Специализируется на спорах по недвижимости и наследству, практикует с 2012 года.',
    experience: 11,
    university: 'СПбГУ, юридический факультет',
    location: 'Санкт-Петербург',
    contactLink: 'mailto:petrova@example.com',
  },
  {
    id: 'sidorov',
    name: 'Пётр Сидоров',
    photo: '/images/lawyers/sidorov.jpg',
    area: 'Арбитраж',
    bio: 'Работает с корпоративными спорами и банкротством, на рынке с 2008 года.',
    experience: 15,
    university: 'ВШЭ, направление «Право»',
    location: 'Казань',
    contactLink: 'mailto:sidorov@example.com',
  },
  {
    id: 'smirnova',
    name: 'Елена Смирнова',
    photo: '/images/lawyers/smirnova.jpg',
    area: 'Семейное право',
    bio: 'Ведёт дела о разводах, разделе имущества, опеке с 2015 года.',
    experience: 8,
    university: 'МГУ, факультет права',
    location: 'Новосибирск',
    contactLink: 'mailto:smirnova@example.com',
  },
];

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.lg};
`;
const BackButton = styled.button`
  margin-bottom: ${({ theme }) => theme.space.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;
const Photo = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  display: block;
  margin: 0 auto ${({ theme }) => theme.space.md};
`;
const Name = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;
const Meta = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.space.md};
`;
const Bio = styled.p`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.space.md};
`;
const ContactButton = styled.a`
  display: block;
  text-align: center;
  padding: ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export function LawyerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const lawyer = lawyers.find(l => l.id === id);
  if (!lawyer) return <Container>Адвокат не найден</Container>;

  return (
    <Container>
      <BackButton onClick={() => navigate('/team')}>← Назад к команде</BackButton>
      <Photo src={lawyer.photo} alt={lawyer.name} />
      <Name>{lawyer.name}</Name>
      <Meta>
        {lawyer.area} • {lawyer.experience} {lawyer.experience === 1 ? 'год' : lawyer.experience < 5 ? 'года' : 'лет'} опыта
      </Meta>
      <Meta>{lawyer.university}, {lawyer.location}</Meta>
      <Bio>{lawyer.bio}</Bio>
      <ContactButton href={lawyer.contactLink}>Связаться</ContactButton>
    </Container>
  );
}


