// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyDWsa7uWmbTQSOUUgidqHdqRfTzh_7BqNk",
    authDomain: "rccg-teens.firebaseapp.com",
    projectId: "rccg-teens",
    storageBucket: "rccg-teens.firebasestorage.app",
    messagingSenderId: "211729181703",
    appId: "1:211729181703:web:de51d14119add97046cea2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  /*Vue*/
  
    const SignIn = { 
  template: '#signin-template',
  mounted() {
    console.log('SignIn Component Mounted');
  }
};

const SignUp = { 
  template: '#signup-template',
  mounted() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('cpassword');
    const signUpButton = document.querySelector('.login-button');

    signUpButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      if (!email || !password || !confirmPassword) {
        console.error('All fields are required');
        return;
      }

      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      try {
        signUpButton.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: email
        });

        console.log('User signed up and verification email sent!');
      } catch (err) {
        console.error('Error signing up:', err.message);
      }
    });
  }
};

// Define routes
const routes = [
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/', redirect: '/signin' }, // Default route
  { path: '/:pathMatch(.*)*', redirect: '/signin' } // Catch-all route
];

// Create Vue Router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

const vueApp = Vue.createApp({});
vueApp.use(router);
vueApp.mount('#app');