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
          post.saves.push(userId);
        }
      });
    },
    updatePostLikes: (state, action) => {
      const {userId, postId} = action.payload;
      state.forEach(post => {
        if (post.id === postId) {
          post.likes.push(userId);
        }
      });
    },
    deletePost: (state, action) => {},
  },
});

export default postSlice.reducer;
export const {updatePostLikes, deletePost, updatePostSaves} = postSlice.actions;
