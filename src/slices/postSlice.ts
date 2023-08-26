import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {PostProps} from '../components/common/Post';
import {ToastAndroid} from 'react-native';

const initialState: PostProps[] = [];
export const updatePostLikes = createAsyncThunk(
  'post/likes',
  async ({
    userId,
    postId,
    add,
  }: {
    userId: string;
    postId: string;
    add: boolean;
  }) => {
    const userRef = firestore().collection('Posts').doc(postId);
    if (add) {
      await userRef.update({
        likes: firestore.FieldValue.arrayUnion(userId),
      });
    } else {
      await userRef.update({
        likes: firestore.FieldValue.arrayRemove(userId),
      });
    }
  },
);

export const updatePostSaves = createAsyncThunk(
  'post/saves',
  async ({
    userId,
    postId,
    add,
  }: {
    userId: string;
    postId: string;
    add: boolean;
  }) => {
    const userRef = firestore().collection('Posts').doc(postId);
    if (add) {
      await userRef.update({
        saves: firestore.FieldValue.arrayUnion(userId),
      });
    } else {
      await userRef.update({
        saves: firestore.FieldValue.arrayRemove(userId),
      });
    }
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    deletePost: (state, action) => {
      const postId = action.payload;
      return state.filter(oldPost => postId !== oldPost.id);
    },
    addPost: (state, action) => {
      const post = action.payload;
      state.unshift(post);
    },
    setPosts: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updatePostLikes.pending, () => {})
      .addCase(updatePostLikes.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating likes',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updatePostLikes.fulfilled, () => {})
      .addCase(updatePostSaves.pending, () => {})
      .addCase(updatePostSaves.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating Saves',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updatePostSaves.fulfilled, () => {});
  },
});

export default postSlice.reducer;
export const {deletePost, addPost, setPosts} = postSlice.actions;
