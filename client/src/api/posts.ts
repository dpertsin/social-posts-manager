/**
 * API for posts
 * @description This file exports functions that make requests to the server API for posts.
 * The getAllPosts function sends a GET request to /posts to get all posts.
 * The createPost function sends a POST request to /posts with the post data.
 * The likePost function sends a POST request to /likes/:postId with the post ID.
 * The unlikePost function sends a DELETE request to /likes/:postId with the post ID.
 * The getLikedPosts function sends a GET request to /likes with the entityType set to "Post" to get all the liked posts.
 */
import { api } from "./axios";
import { Post, CreatePostData } from "../types/post";
import { ApiResponse } from "../types/api";

export const postsApi = {
  getAllPosts: () => api.get<Post[]>("/posts"),

  createPost: (data: CreatePostData) => api.post<Post>("/posts", data),

  likePost: (postId: string) =>
    api.post<ApiResponse<void>>(`/likes/${postId}`, { entityType: "Post" }),

  unlikePost: (postId: string) =>
    api.delete<ApiResponse<void>>(`/likes/${postId}`, {
      data: { entityType: "Post" },
    }),

  getLikedPosts: () =>
    api.get<Post[]>("/likes", { params: { entityType: "Post" } }),
};
