// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  arrayUnion,
  query,
  where,
  Timestamp,
  addDoc,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkBtDl0XBiR1u9ePOHPmsuqjlcaRPSAN8",
  authDomain: "marvelcomics-9c887.firebaseapp.com",
  projectId: "marvelcomics-9c887",
  storageBucket: "marvelcomics-9c887.appspot.com",
  messagingSenderId: "857707545160",
  appId: "1:857707545160:web:3e8580444628115f0c0e7d",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const initFirebase = () => {
  try {
    app;
    console.log("Firebase was successfully init.");
  } catch (err) {
    console.log("...");
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
};

export const sendFav = async (favoriteData) => {
  const saveFav = async (value) => {
    console.log(value.id); // 270
    const docRef = doc(db, "favoriteData", localStorage.getItem("UserId")); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await updateDoc(docRef, {
        userFav: arrayUnion(value),
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(docRef, {
        userFav: [value],
      });
    }
  };
  await saveFav(favoriteData);
  //   console.log(Favdata);
};

export const allMyFav = async (userID) => {
  const citiesRef = collection(db, "favoriteData");
  const querySnapshot = await getDocs(citiesRef);
  let c = [];

  querySnapshot.forEach((doc) => {
    const userFavObj = doc.data().userFav;
    // console.log("userfavvvvv", userFavObj);
    userFavObj.map((item) => {
      c.push(item);
    });
  });
  console.log(c);
  return c;
};

export const testGet = () => {
  return true;
};
//   let c = [];
//   try {
//     const citiesRef = collection(db, "favoriteData");
//     const querySnapshot = await getDocs(citiesRef);
//     querySnapshot.forEach((doc) => {
//       const userFavObj = doc.data().userFav;
//       console.log(userFavObj);
//       c = userFavObj;
//     });
//   } catch (e) {
//     console.log("OUT");
//   }
//   setTimeout(() => {
//     console.log(c);
//     return c;
//   }, 2500);
// };

export const deleteFav = async (item) => {
  const docRef = doc(db, "favoriteData", localStorage.getItem("UserId")); //doc(db, "collection", "document target");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const favItems = [...docSnap.data()?.userFav];
    const index = favItems.findIndex(
      (itemOrigin) => itemOrigin.title === item.title
    );
    favItems.splice(index, 1);

    await setDoc(docRef, { userFav: favItems }, { merge: true });
  }
};

const db = getFirestore();
