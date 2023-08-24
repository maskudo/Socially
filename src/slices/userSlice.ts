import {createSlice} from '@reduxjs/toolkit';

type User = {
  id: string;
  displayName?: string;
  handle?: string;
  posts?: string[];
  likedPosts?: string[];
  savedPosts?: string[];
  followers?: string[];
  following?: string[];
  email: string;
};
const initialState: User = {
  id: '',
  displayName: '',
  handle: '',
  posts: [],
  likedPosts: [],
  savedPosts: [],
  followers: [],
  following: [],
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {},
    setUserFromAuth: (state, action) => {
      const {
        displayName,
        email,
        handle,
        posts,
        likedPosts,
        savedPosts,
        followers,
        following,
      } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.handle = handle;
      state.posts = posts;
      state.likedPosts = likedPosts;
      state.savedPosts = savedPosts;
      state.followers = followers;
      state.following = following;
    },
    savePost: (state, action) => {
      const postId = action.payload;
      if (!state.savedPosts?.includes(postId)) {
        state.savedPosts?.push(postId);
      } else {
        state.savedPosts = state.savedPosts.filter(post => post !== postId);
      }
    },
    likePost: (state, action) => {
      const postId = action.payload;
      if (!state.likedPosts?.includes(postId)) {
        state.likedPosts?.push(postId);
      } else {
        state.likedPosts = state.likedPosts.filter(post => post !== postId);
      }
    },
    addPostToUser: (state, action) => {
      const {postId} = action.payload;
      state.posts?.push(postId);
    },
  },
});

export default userSlice.reducer;
export const {updateUser, setUserFromAuth, likePost, savePost, addPostToUser} =
  userSlice.actions;
