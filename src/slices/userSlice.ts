import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';
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

export const updateUserLikes = createAsyncThunk(
  'uses/likes',
  async ({
    userId,
    postId,
    add,
  }: {
    userId: string;
    postId: string;
    add: boolean;
  }) => {
    const userRef = firestore().collection('Users').doc(userId);
    if (add) {
      await userRef.update({
        likedPosts: firestore.FieldValue.arrayUnion(postId),
      });
    } else {
      await userRef.update({
        likedPosts: firestore.FieldValue.arrayRemove(postId),
      });
    }
  },
);
export const updateUserSaves = createAsyncThunk(
  'uses/saves',
  async ({
    userId,
    postId,
    add,
  }: {
    userId: string;
    postId: string;
    add: boolean;
  }) => {
    const userRef = firestore().collection('Users').doc(userId);
    if (add) {
      await userRef.update({
        savedPosts: firestore.FieldValue.arrayUnion(postId),
      });
    } else {
      await userRef.update({
        savedPosts: firestore.FieldValue.arrayRemove(postId),
      });
    }
  },
);

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
        id,
      } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.handle = handle;
      state.posts = posts;
      state.likedPosts = likedPosts;
      state.savedPosts = savedPosts;
      state.followers = followers;
      state.following = following;
      state.id = id;
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
  extraReducers: builder => {
    builder
      .addCase(updateUserLikes.pending, () => {})
      .addCase(updateUserLikes.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating likes',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updateUserLikes.fulfilled, () => {})
      .addCase(updateUserSaves.pending, () => {})
      .addCase(updateUserSaves.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating Saves',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updateUserSaves.fulfilled, () => {});
  },
});

export default userSlice.reducer;
export const {updateUser, setUserFromAuth, likePost, savePost, addPostToUser} =
  userSlice.actions;
