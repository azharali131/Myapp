export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface DesignElement {
  id: string;
  type: 'box' | 'text' | 'button';
  content: string;
  styles: string; // Tailwind classes
}
