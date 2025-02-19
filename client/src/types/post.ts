export interface Post {
  _id: string;
  title: string;
  body: string;
  userId: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}

export interface CreatePostData {
  title: string;
  body: string;
}
