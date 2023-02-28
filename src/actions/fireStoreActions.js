import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';

// export const addUser = async (user) => {
//   const userRef = await addDoc(collection(db, 'users'), user);
//   return userRef;
// };
// export const getAdmin = async () => {
//   const docRef = doc(db, 'users', 'admin');
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log('Document data:', docSnap.data());
//   } else {
//     console.log('No such document!');
//   }
//   return docSnap;
// };
export const UserRef = async (user, userRef) => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const querySnapshots = await getDocs(q);
    querySnapshots.forEach((doc) => {
      userRef.push(doc.id);
      return userRef;
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUser = async (user) => {
  try {
    const data = {
      accountLevel: 'basic',
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    const userRef = await addDoc(collection(db, 'users'), data);
    return userRef;
  } catch (error) {
    return toast.error(error.message);
  }
};
export const fetchUserFromApi = async (uid) => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const user = [];
    querySnapshot.forEach((doc) => {
      user.push({ ...doc.data() });
    });
    return user;
  } catch (err) {
    console.error(err);
    return toast.error(err.message);
  }
};
export const addMovieFromPlaylist = async (uid, movie, media_type) => {
  try {
    const data = {
      uid,
      movie: {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        star: movie.vote_average,
        media_type,
      },
      create_at: Timestamp.fromDate(new Date(Date.now())),
    };
    const res = await addDoc(collection(db, 'favoriteMovie'), data);

    return { ...data, id: res.id };
  } catch (error) {
    return toast.error(error.message);
  }
};

export const fetchMovieFavorite = async (uid) => {
  try {
    const q = query(collection(db, 'favoriteMovie'), where('uid', '==', uid), orderBy('create_at'));
    const querySnapshot = await getDocs(q);
    const favoriteList = [];
    querySnapshot.forEach((doc) => {
      favoriteList.push({ ...doc.data(), id: doc.id });
    });
    return favoriteList;
  } catch (error) {
    return toast.error(error.message);
  }
};

export const deleteFavoriteMovie = async (data) => {
  try {
    await deleteDoc(doc(db, `favoriteMovie/${data.id}`));
    return data;
  } catch (error) {
    return toast.error(error.message);
  }
};
export const deleteUser = async (user) => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapShot) => {
      console.log(docSnapShot.id, '=>', docSnapShot.data().accountLevel);
      if (docSnapShot.data().accountLevel !== 'premium') {
        const docRef = doc(db, 'users', docSnapShot.id);
        deleteDoc(docRef).then(() => {
          console.log('success');
        });
      } else {
        return toast.error("Can't delete a VIP account");
      }
    });
  } catch (error) {
    return console.log(error.message);
  }
};

export const postComment = async (newComment) => {
  try {
    const res = await addDoc(collection(db, 'comments'), newComment);

    return {
      ...newComment,
      id: res.id,
    };
  } catch (error) {
    return toast.error(error.message);
  }
};

export const fecthCommentFromApi = async (id) => {
  try {
    const q = query(collection(db, 'comments'), where('movieId', '==', id));
    const querySnapshot = await getDocs(q);
    const commentList = [];
    querySnapshot.forEach((doc) => {
      commentList.push({ ...doc.data(), id: doc.id });
    });
    return commentList;
  } catch (error) {
    console.log(error);
    return toast.error(error.message);
  }
};
export const fetchUserVip = async () => {
  try {
    const q = query(collection(db, 'users'), where('accountLevel', '==', 'premium'));
    const querySnapshot = await getDocs(q);
    const userVipList = [];
    querySnapshot.forEach((doc) => {
      userVipList.push({ ...doc.data() });
    });
    return userVipList;
  } catch (error) {
    console.log(error);
    return toast.error(error.message);
  }
};
// export const fetchUserFromApi = async () => {
//   try {
//     const db = getFirestore();
//     const q = collection(db, 'users');
//     const querySnapshot = await getDocs(q);
//     const userList = [];
//     querySnapshot.forEach((doc) => {
//       userList.push({ ...doc.data() });
//     });
//     return userList;
//   } catch (error) {
//     console.log(error);
//     return toast.error(error.message);
//   }
// };
