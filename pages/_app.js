import "../styles/globals.css";
import { useEffect } from "react";

const liffId = "1656580161-nv4wjRBq";

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId });
    } catch (error) {
      console.error("liff init error", error.message);
    }
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  });
  return <Component {...pageProps} />;
}

export default MyApp;
