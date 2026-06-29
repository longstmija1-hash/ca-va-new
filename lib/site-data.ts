export const BOOKING_URL = "https://n1332782.yclients.com/";
export const PHONE = "+7 (995) 563-88-10";
export const PHONE_HREF = "tel:+79955638810";

export const SOCIAL = {
  vk: "https://vk.com/cavabeauty",
  instagram:
    "https://www.instagram.com/cava_ekb?igsh=MW5oZmE2ZWtudWd0Zw==",
} as const;

export const REVIEW_LINKS = {
  gis: "https://2gis.ru/ekaterinburg/firm/70000001094230814/tab/reviews?m=60.60473%2C56.85518%2F16",
  yandex:
    "https://yandex.ru/maps/org/sa_va/97118654142/reviews/?ll=60.604877%2C56.854818&tab=reviews&z=16.69",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Главная" },
  { href: "#team", label: "Команда" },
  { href: "#gallery", label: "Галерея" },
  { href: "#prices", label: "Прайс" },
  { href: "#reviews", label: "Отзывы" },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  roleBack: string;
  bio: string;
  image: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Иван",
    role: "Барбер",
    roleBack: "Барбер",
    bio: "Мужские стрижки и моделирование бороды. Любит чёткие линии и аккуратные переходы - приходите за формой, которую легко поддерживать.",
    image: "/assets/team/master-1.png",
  },
  {
    name: "Даниил",
    role: "Барбер",
    roleBack: "Барбер",
    bio: "Классические и современные мужские стрижки, оформление бороды. Подберёт образ под форму лица и стиль.",
    image: "/assets/team/master-3.png",
  },
  {
    name: "Илья",
    role: "Массажист",
    roleBack: "Массаж · восстановление",
    bio: "Расслабляющий и спортивный массаж, работа со спиной и шеей. Снимет напряжение после рабочей недели и подберёт нагрузку под ваше самочувствие.",
    image: "/assets/team/master-2.png",
  },
  {
    name: "Валерия",
    role: "Beauty-мастер",
    roleBack: "Brow & beauty · уход",
    bio: "Брови, оформление и уход за лицом. Подбирает форму под черты лица и всегда расскажет про домашний уход.",
    image: "/assets/team/master-4.png",
  },
  {
    name: "Арина",
    role: "Барбер",
    roleBack: "Барбер",
    bio: "Хороший специалист по удлинённым стрижкам. Подберёт форму под ваш стиль и сделает работу аккуратно и со вкусом.",
    image: "/assets/team/master-5.png",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
};

export const GALLERY: GalleryItem[] = [
  { src: "/assets/gallery/01-barber-at-work.png", alt: "Мастерство в каждом движении" },
  { src: "/assets/gallery/02-massage.png", alt: "Снимем напряжение за один визит" },
  { src: "/assets/gallery/03-clipper-cut.png", alt: "Чёткий fade, который держит форму" },
  { src: "/assets/gallery/04-blowdry.png", alt: "Образ, который хочется не снимать" },
  { src: "/assets/gallery/05-salon-wide.png", alt: "Пространство, куда хочется возвращаться" },
  { src: "/assets/gallery/06-styling-chair.png", alt: "Стрижка с вниманием к деталям" },
  { src: "/assets/gallery/07-fade-detail.png", alt: "Чистый переход, без лишнего" },
  { src: "/assets/gallery/08-hair-wash.png", alt: "Комфорт с первых минут визита" },
];

export type Review = {
  author: string;
  source: string;
  avatar: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    author: "Мария Кравцова",
    source: "2ГИС",
    avatar: "М",
    text: "Отличное место! Пока стригут мужа, можно и себе сделать красивые бровки. Красивый интерьер, чисто, уютно, приятная музыка. К Валерии советую сходить за бровями - всегда слышит все пожелания. Удобно, что есть своя парковка. Персонал дружелюбный. Всем рекомендую!",
  },
  {
    author: "Андрей Андреев",
    source: "2ГИС",
    avatar: "А",
    text: "Отличное впечатление после стрижки, уютно, есть о чём поговорить с мастером.",
  },
  {
    author: "Матвей Косарев",
    source: "2ГИС",
    avatar: "М",
    text: "Мастер Арина - ТОП! Знает своё дело на 100%. Спасла меня и исправила то, что накосячил другой барбер. Благодарность бесконечная. Рекомендую!",
  },
  {
    author: "Михаил Колесников",
    source: "Яндекс",
    avatar: "М",
    text: "Отличный барбершоп с отличным интерьером. Сотрудники выполнили работу на высочайшем уровне. Был и на мужском маникюре у Софии, и на стрижке у топ-барбера Ивана. Спасибо Софии за качественный маникюр и позитивный настрой, а Ивану - за идеальную стрижку, именно такую, как я хотел.",
  },
  {
    author: "Николай Третьяков",
    source: "2ГИС",
    avatar: "Н",
    text: "Впервые посетил данный салон, спасибо Ивану за стрижку - всё было на высшем уровне, учёл все пожелания. Обязательно приду ещё!",
  },
  {
    author: "Арина К.",
    source: "Яндекс",
    avatar: "А",
    text: "Посетила салон для коррекции и оформления бровей. Мастер Лера очень приятная девушка, выполнила работу красиво и аккуратно, и при этом приятный собеседник. Я довольна результатом! Сам салон светлый, приятный, эстетичный, удобное местоположение. Всем советую!",
  },
];

export type PriceRow = {
  service: string;
  time: string;
  price: string;
};

export type PriceTab = {
  id: string;
  label: string;
  title: string;
  rows: PriceRow[];
};

export const PRICE_TABS: PriceTab[] = [
  {
    id: "haircuts",
    label: "Стрижки",
    title: "Мужские стрижки",
    rows: [
      { service: "Стрижка мужская", time: "1 ч", price: "1 700 ₽" },
      { service: "Удлинённая стрижка", time: "1 ч", price: "1 700 ₽" },
      { service: "Детская стрижка", time: "1 ч", price: "1 700 ₽" },
      { service: "Стрижка машинкой", time: "30 мин", price: "900 ₽" },
      { service: "Стрижка + борода", time: "1.5 ч", price: "2 500 ₽" },
      { service: "Оформление бороды", time: "30 мин", price: "1 000 ₽" },
      { service: "Королевское бритьё", time: "45 мин", price: "1 000 ₽" },
      { service: "Окантовка", time: "15 мин", price: "600 ₽" },
      { service: "Укладка", time: "15 мин", price: "500 ₽" },
      { service: "Камуфляж седины", time: "30 мин", price: "1 000 ₽" },
      { service: "Биозавивка волос", time: "3 ч", price: "от 4 500 ₽" },
      { service: "Коррекция стрижки (до 14 дней)", time: "45 мин", price: "1 000 ₽" },
    ],
  },
  {
    id: "combos",
    label: "Комплексы",
    title: "Комплексы",
    rows: [
      { service: "Стрижка + борода", time: "1.5 ч", price: "2 500 ₽" },
      { service: "Отец и сын", time: "2 ч", price: "3 200 ₽" },
      { service: "Стрижка + Камуфляж седины", time: "1.5 ч", price: "2 500 ₽" },
      { service: "Стрижка + Борода + Массаж тела", time: "2.5 ч", price: "5 200 ₽" },
    ],
  },
  {
    id: "massage",
    label: "Массаж",
    title: "Массаж",
    rows: [
      { service: "Расслабляющий массаж", time: "60 мин", price: "3 000 ₽" },
      { service: "Расслабляющий массаж", time: "90 мин", price: "4 000 ₽" },
      { service: "Общий массаж тела", time: "60 мин", price: "3 500 ₽" },
      { service: "Общий массаж тела", time: "90 мин", price: "4 000 ₽" },
      { service: "Массаж шейно-воротниковой зоны", time: "30 мин", price: "1 500 ₽" },
      { service: "Массаж шейно-воротниковой зоны", time: "45 мин", price: "3 000 ₽" },
      { service: "Программа «Здоровая спина»", time: "1.5 ч", price: "3 000 ₽" },
      { service: "Спортивный / глубокотканный", time: "80 мин", price: "4 500 ₽" },
      { service: "Лимфодренажный массаж", time: "60 мин", price: "3 500 ₽" },
      { service: "Лимфодренажный массаж", time: "90 мин", price: "4 000 ₽" },
      { service: "Триггерные зоны", time: "60 мин", price: "4 000 ₽" },
      { service: "ПИР (постизометрическая релаксация)", time: "1.5 ч", price: "от 3 500 ₽" },
    ],
  },
  {
    id: "beauty",
    label: "Beauty",
    title: "Beauty (уход + брови + ресницы)",
    rows: [
      { service: "Уход за лицом", time: "30 мин", price: "600 ₽" },
      { service: "Уход за кожей головы и волосами", time: "20 мин", price: "700 ₽" },
      { service: "Патчи", time: "10 мин", price: "200 ₽" },
      { service: "Массаж лица «Против отёчности»", time: "1 ч", price: "3 000 ₽" },
      { service: "Буккальный массаж «Супер Лифтинг»", time: "1 ч", price: "3 500 ₽" },
      { service: "Коррекция бровей", time: "20 мин", price: "600 ₽" },
      { service: "Окрашивание бровей + коррекция", time: "1 ч", price: "1 200 ₽" },
      { service: "Долговременная укладка бровей", time: "1 ч 15 мин", price: "1 500 ₽" },
      { service: "Полный комплекс бровей", time: "1.5 ч", price: "1 800 ₽" },
      { service: "Осветление бровей + коррекция", time: "1 ч", price: "1 100 ₽" },
      { service: "Окрашивание ресниц", time: "20 мин", price: "900 ₽" },
    ],
  },
];

export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
