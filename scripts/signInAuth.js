
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  
  /*Vue*/
  
      // Define components
    const SignIn = { template: '#signin-template' };
    const SignUp = { template: '#signup-template' };

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

    // Create Vue app
    const vueApp = Vue.createApp({});
    vueApp.use(router);
    vueApp.mount('#app');