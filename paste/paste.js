const Verify = {
  template: '#verify',
  data() {
    return {
      emailVerified: false,
      checkingStatus: true, // To show a loader while checking
    };
  },
  methods: {
    async checkEmailVerification() {
      try {
        // Reload the user's data to get the latest verification status
        await auth.currentUser.reload();

        // Update the verification status
        this.emailVerified = auth.currentUser.emailVerified;

        if (this.emailVerified) {
          // Redirect to home if verified
          router.push('/home');
        }
      } catch (err) {
        console.error('Error checking verification status:', err);
      } finally {
        this.checkingStatus = false; // Stop loader
      }
    },
    async resendVerificationEmail() {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Verification email sent!');
      } catch (err) {
        console.error('Error sending verification email:', err);
        alert('Failed to send verification email.');
      }
    }
  },
  mounted() {
    console.log('Verify Component Mounted');
    this.checkEmailVerification(); // Check verification status on component mount
  }
};