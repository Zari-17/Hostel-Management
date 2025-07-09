import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    console.log(loading);
    if (loading) {
      if (user) {
        router.replace("/hostel/clients");
      } else {
        router.replace("/login");
      }
    }
  }, [loading]);
  return <div />;
}
