export interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  commentCount: number;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}