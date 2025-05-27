type Service = {
  id: string;
  image: string;
  title: string;
  description: string;
};

 export const services: Service[] = [
  {
    id: 'consult',
    image: '/representation.svg',
    title: 'Юридическая консультация',
    description: 'Подробный анализ вашей ситуации с выдачей письменного заключения и рекомендациями по дальнейшим шагам.',
  },
  {
    id: 'contracts',
    image: '/representation.svg',
    title: 'Составление договоров',
    description: 'Разработка и проверка договоров любой сложности с учётом ваших интересов и актуального законодательства.',
  },
  {
    id: 'representation',
    image: '/representation.svg',
    title: 'Судебное представительство',
    description: 'Представительство в судах всех инстанций: подготовка процессуальных документов и защита ваших прав в зале суда.',
  },
  {
    id: 'family',
    image: '/representation.svg',
    title: 'Семейные споры',
    description: 'Разводы, споры о детях, разделе имущества — комплексная поддержка в любых семейно-правовых вопросах.',
  },
  {
    id: 'criminal',
    image: '/representation.svg',
    title: 'Уголовная защита',
    description: 'Защита прав на этапах проверки, дознания и в суде при обвинениях в уголовных преступлениях.',
  },
  {
    id: 'inheritance',
    image: '/representation.svg',
    title: 'Наследственные дела',
    description: 'Оспаривание и оформление наследства, защита прав наследников в суде.',
  },
];