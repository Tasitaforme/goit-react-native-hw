// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Функція для підключення гугл аналітики
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
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
// const firebaseConfig = {
//   apiKey: "AIzaSyCE65L2VUFbCvn2YvNsi0Git3n9hrmqwvw",
//   authDomain: "show-your-world.firebaseapp.com",
//   databaseURL: "https://show-your-world.firebaseio.com",
//   projectId: "show-your-world",
//   storageBucket: "show-your-world.appspot.com",
//   messagingSenderId: "sender-id",
//   appId: "app-id",
//   measurementId: "G-measurement-id",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
