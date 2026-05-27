export interface ChatNavigationItem {
  label: string;
  description: string;
  route: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: Date;
  suggestions?: string[];
  relatedCourses?: string[];
  navigation?: ChatNavigationItem[];
}

