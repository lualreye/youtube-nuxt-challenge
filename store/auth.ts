import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';


import { auth } from '../firebaseConfig';
import type { User } from '../interface/user.interface';

const router = useRouter();

interface RootState {
  user: User | null,
  errorMessage: string | null,
  isLoading: boolean
}

const useUserStore = defineStore('UserStore', {
  state: (): RootState => ({
    user: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async registerUser(email: string, password: string): Promise<void> {
      this.isLoading = true;

      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        this.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified
        }

        await router.push('/');
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async loginUser(email: string, password: string): Promise<void> {
      this.isLoading = true;

      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        this.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified
        }

        router.push('/');
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async logoutUser() {
      this.isLoading = true;

      try {
        await signOut(auth);
        this.user = null;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async currentUser(): Promise<User | null> {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.user = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified
              }
            } else {
              this.user = null;
            }
            resolve(this.user);
          },
          (error) => reject(error)
        )
        unsuscribe();
      })
    }
  }
});

export default useUserStore;