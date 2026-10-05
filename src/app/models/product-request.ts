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
  userId: number;
  productRequestId: number;
  name: string;
  username: string;
  userImage: string;
  replies: Reply[];
}
export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Reply {
  id: number;
  content: string;
  userId: number;
  commentId: number;
  replyToUserId: number;
  name: string;
  username: string;
  userImage: string;
  replyingTo: string;
}