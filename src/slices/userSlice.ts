import {createSlice} from '@reduxjs/toolkit';

type User = {
  name: string;
  handle: string;
  posts: string[];
  likedPosts: string[];
  savedPosts: string[];
  followers: string[];
  following: string[];
};
const initialState: User = {
  name: 'Malenia',
  handle: 'malenia',
  posts: [],
  likedPosts: [],
  savedPosts: [],
  followers: ['apar', 'praful'],
  following: ['manuj'],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {},
    deleteUser: (state, action) => {},
    savePost: (state, action) => {
      const postId = action.payload;
      state.savedPosts.push(postId);
    },
    likePost: (state, action) => {
      const postId = action.payload;
      state.likedPosts.push(postId);
    },
  },
});

export default userSlice.reducer;
export const {updateUser, deleteUser, likePost, savePost} = userSlice.actions;
