import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsHxTJ6tF8U3hQChhDtYsFNKQwkdoHjJY",
  authDomain: "htmlcompilerlite.firebaseapp.com",
  projectId: "htmlcompilerlite",
  storageBucket: "htmlcompilerlite.firebasestorage.app",
  messagingSenderId: "946345222366",
  appId: "1:946345222366:web:8e9233838a03abd6c5a24f",
  measurementId: "G-P58YVTNSQF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const status = document.getElementById("status");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    status.textContent = "Đang mở cửa sổ đăng nhập...";
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const phone = prompt("Nhập số điện thoại của bạn:");
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: phone
        });
      }

      status.textContent = "Đăng nhập thành công! Đang chuyển...";
      setTimeout(() => {
        location.href = "ai.html";
      }, 1000);
    } catch (error) {
      status.textContent = "Lỗi đăng nhập: " + error.message;
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    status.textContent = "Đã đăng nhập! Đang chuyển...";
    setTimeout(() => {
      location.href = "ai.html";
    }, 1000);
  }
});

// Xử lý đăng xuất
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await auth.signOut();
      status.textContent = "Đã đăng xuất!";
      setTimeout(() => {
        location.href = "index.html";
      }, 1000);
    } catch (error) {
      status.textContent = "Lỗi đăng xuất: " + error.message;
    }
  });
}