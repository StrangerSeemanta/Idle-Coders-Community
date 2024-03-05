import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function checkUser() {
  const auth = getAuth();
  let response = false;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      response = true;
    } else {
      response = false;
    }
  });

  return response;
}
