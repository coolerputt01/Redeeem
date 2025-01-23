// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signInButton = document.querySelector('.login-button');
    
    signInButton.addEventListener('click' ,async (e)=>{
      e.preventDefault();
      try{
    const userCredential = await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim());
    const user = userCredential.user;
    
    console.log("User signed in successfully:", user);
    router.push('/home');
      }catch(err){
        alert(err.message)
      }
  });
  }
};
const Home = {
  template:'#home',
  mounted(){
    console.log('home');
  }
}
const Verify = {
  template:'#verify',
  data(){
    return {
      emailVerified:false
    }
  },
  methods:{
    async checkEmailVerification(){
      try{
      await auth.currentUser.reload();
      this.emailVerified = auth.currentUser.emailVerified;
      if(this.emailVerified){
        router.push('/home');
        }else{
        alert('hi');
        const errorToast = document.querySelector('.cardv');
        const errorText = document.querySelector('.message-text');
        errorToast.style.display = 'block';
        errorText.textContent = "Please Verify your email.";
        }
      }catch(err){
        alert(err.message);
      }
    }
  },
  mounted(){
    console.log('verify');
    this.checkEmailVerification();
  }
}
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
        alert('All fields are required');
        return;
      }

      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        const errorToast = document.querySelector('.card');
        const errorText = document.querySelector('.message-text');
        errorToast.style.display = 'block';
        errorText.textContent = "Passwords do not match";
        return;
      }

      try {
        signUpButton.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: email
        });

        console.log('User signed up and verification email sent!');

        // Redirect to home route
        router.push('/verify');

        signUpButton.innerHTML = "Sign Up";
      } catch (err) {
        const errorToast = document.querySelector('.card');
        const errorText = document.querySelector('.message-text');
        errorToast.style.display = 'block';
        errorText.textContent = err.message;
        console.error('Error signing up:', err.message);
        signUpButton.innerHTML = "Sign Up";
      }
    });
  }
};
// Define routes
const routes = [
  { path: '/signin', component: SignIn },
  { path:'/home',component:Home}
  ,
  {path:'/verify', component:Verify}
  ,
  { path: '/signup', component: SignUp },
  { path: '/', redirect: '/signin' }, // Default route
  { path: '/:pathMatch(.*)*', redirect: '/signin' } // Catch-all route
];

// Create Vue Router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const vueApp = Vue.createApp({});
vueApp.use(router);
vueApp.mount('#app');