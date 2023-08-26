import firestore from '@react-native-firebase/firestore';
import {PostProps} from '../components/common/Post';
async function getPostsByUser(userId: string) {
  const posts: PostProps[] = [];
  let res = await firestore()
    .collection('Posts')
    .where('createdBy', '==', userId)
    .get();
  res.forEach(post => {
    posts.push({...post.data(), id: post.id});
  });
  return posts;
}

export {getPostsByUser};
