import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";

const liffId = "1656580161-nv4wjRBq";

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId });
      liff
        .getProfile()
        .then((profile) => {
          console.log(profile);
          localStorage.setItem("UserId", profile.userId);
          localStorage.setItem("UserInfo", JSON.stringify(profile));
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("liff init error", error.message);
    }
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  });

  return (
    <div>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
