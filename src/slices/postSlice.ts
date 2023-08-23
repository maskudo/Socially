import {createSlice} from '@reduxjs/toolkit';
import {PostProps} from '../components/common/Post';
import {POSTS} from '../utils/data';

const initialState: PostProps[] = POSTS;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePostSaves: (state, action) => {
      const {userId, postId} = action.payload;
      state.forEach(post => {
        if (post.id === postId) {
          if (post.saves.includes(userId)) {
            post.saves = post.saves.filter(user => user !== userId);
          } else {
            post.saves.push(userId);
          }
        }
      });
    },
    updatePostLikes: (state, action) => {
      const {userId, postId} = action.payload;
      state.forEach(post => {
        if (post.id === postId) {
          if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(user => user !== userId);
          } else {
            post.likes.push(userId);
          }
        }
      });
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      return state.filter(oldPost => postId !== oldPost.id);
    },
    addPost: (state, action) => {
      const {postId, url, createdBy} = action.payload;
      const post = {
        id: postId.toString(),
        url,
        createdAt: '0 hours ago',
        createdBy,
        comments: [],
        likes: [],
        saves: [],
      };

      state.unshift(post);
    },
  },
});

export default postSlice.reducer;
export const {updatePostLikes, deletePost, updatePostSaves, addPost} =
  postSlice.actions;
