export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
  Text = 'text',
}

export type Session = {
  user: {
    id: string;
    email: string;
  };
};
