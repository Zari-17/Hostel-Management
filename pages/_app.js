import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../styles/globals.css";
import { onAuthStateChanged } from "firebase/auth";

function MyApp({ Component, pageProps }) {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (router.pathname === "/login") {
          router.replace("/hostel/clients").then(() => setLoad(true));
        } else {
          setLoad(true);
        }
      } else {
        if (router.pathname !== "/login") {
          router.replace("/login").then(() => setLoad(true));
        } else {
          setLoad(true);
          
        }
      }
    });
  }, [auth.currentUser, router.pathname]);

  return <>{load && <Component {...pageProps} />}</>;
}

export default MyApp;
