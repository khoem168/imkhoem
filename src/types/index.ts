export type Language = 'en' | 'kh';
export type Theme = 'dark' | 'light';

export type ToolCategory = 'all' | 'ai' | 'utility' | 'fun' | 'social' | 'hardware';

export interface ToolItem {
  id: string;
  name: {
    en: string;
    kh: string;
  };
  desc: {
    en: string;
    kh: string;
  };
  category: ToolCategory;
  iconName: string;
  badge?: {
    en: string;
    kh: string;
  };
  isHot?: boolean;
  isNew?: boolean;
  componentType: 'qr' | 'currency' | 'aiChat' | 'textStyle' | 'randomPicker' | 'gameId' | 'zodiac' | 'confession' | 'external' | 'hardware';
  link?: string;
}

export interface ServiceItem {
  id: string;
  title: {
    en: string;
    kh: string;
  };
  subtitle: {
    en: string;
    kh: string;
  };
  priceStart: {
    en: string;
    kh: string;
  };
  image: string;
  tag: {
    en: string;
    kh: string;
  };
  features: {
    en: string[];
    kh: string[];
  };
  actionUrl: string;
  popular?: boolean;
}

export interface MediaMention {
  id: string;
  name: string;
  khName: string;
  tagline: {
    en: string;
    kh: string;
  };
  category: string;
  color: string;
  accent: string;
}

export interface OwnerChannel {
  id: string;
  title: {
    en: string;
    kh: string;
  };
  handle: string;
  link: string;
  iconName: string;
  followers?: string;
  badge?: {
    en: string;
    kh: string;
  };
  color: string;
}

export interface TelegramBotItem {
  id: string;
  title: {
    en: string;
    kh: string;
  };
  desc: {
    en: string;
    kh: string;
  };
  link: string;
  iconName: string;
  members: string;
  tag: {
    en: string;
    kh: string;
  };
}

export interface GameItem {
  id: string;
  slug: string;
  name: string;
  khName: string;
  publisher: string;
  currencyName: string;
  imageUrl: string;
  category: string;
  badge?: string;
  priceStart: string;
  popular?: boolean;
  requiresServer?: boolean;
  uidLabel?: string;
  uidExample?: string;
}

export interface ProjectItem {
  id: string; // slug for /projects/[slug]
  title: {
    en: string;
    kh: string;
  };
  subtitle: {
    en: string;
    kh: string;
  };
  description: {
    en: string;
    kh: string;
  };
  category: {
    en: string;
    kh: string;
  };
  status: {
    en: string;
    kh: string;
  };
  badge: {
    en: string;
    kh: string;
  };
  tags: string[];
  techStack: {
    name: string;
    role: string;
  }[];
  features: {
    title: { en: string; kh: string };
    desc: { en: string; kh: string };
  }[];
  architecture: {
    en: string;
    kh: string;
  };
  liveUrl: string;
  accentColor: string;
  metrics: {
    label: { en: string; kh: string };
    value: string;
  }[];
}

export interface FeedbackMessage {
  id: string;
  author: string;
  role: string;
  message: string;
  date: string;
  avatarColor: string;
  reactions: {
    heart: number;
    fire: number;
    rocket: number;
  };
}
