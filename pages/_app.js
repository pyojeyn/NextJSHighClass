import "../styles/globals.css";
import Layout from "../components/layout/Layout";
// 특수 파일. 최상위 컴포넌트

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
