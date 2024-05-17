import Head from "next/head";
import { useRouter } from "next/router";

export default function HeadMeta() {
  const router = useRouter();

  const pageName =
    router.asPath.split("/")[1].charAt(0).toUpperCase() +
    router.asPath.split("/")[1].split("-").join(" ").slice(1);

  return (
    <Head>
      <link rel="shortcut icon" href="/images/logo.png" />
      <title>Green Step - {pageName || "Accueil"}</title>
    </Head>
  );
}
