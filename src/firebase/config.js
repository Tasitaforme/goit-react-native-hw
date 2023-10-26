import AsyncStorage from "@react-native-async-storage/async-storage";

// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { getApp, getApps, initializeApp } from "firebase/app";

// Функція для підключення авторизації в проект
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";

// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Функція для підключення гугл аналітики
// import { getAnalytics } from "firebase/analytics";
//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE65L2VUFbCvn2YvNsi0Git3n9hrmqwvw",
  authDomain: "show-your-world.firebaseapp.com",
  projectId: "show-your-world",
  storageBucket: "show-your-world.appspot.com",
  messagingSenderId: "521325278850",
  appId: "1:521325278850:web:3c2b890edbc17b0aaea69b",
  measurementId: "G-8J0D4VZ01P",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const analytics = getAnalytics(app);

let app, auth;

if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}
export { auth };

export const db = getFirestore(app);
export const storage = getStorage(app);
