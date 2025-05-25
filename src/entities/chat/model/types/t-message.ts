export type TMessage = {
  messageId: number;
  content: string;
  createdAt: string;
  user: {
    userId: number;
    username: string;
    displayName: string;
  };
};