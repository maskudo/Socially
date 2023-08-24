import firestore from '@react-native-firebase/firestore';
async function getPostsByUser(userId: string) {
  const posts = [];
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
