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
  },
});

export default postSlice.reducer;
export const {updatePostLikes, deletePost, updatePostSaves} = postSlice.actions;
