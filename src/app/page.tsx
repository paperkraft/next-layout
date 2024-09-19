import AppLayout from "@/components/custom/layout/AppLayout";
import TitlePage from "@/components/custom/page-heading";
import Script from "next/script";
import parse from 'html-react-parser';
import { serverResponse } from "./actions/action";

export default async function Page() {
  const htmlString =  await serverResponse();
  return(
    <>
      <AppLayout>
        <TitlePage title="Dashboard" description="description" />
        { parse(htmlString) }
      </AppLayout>
      <Script id="test" strategy="afterInteractive" src="/js/main.js" />
    </>
  )
} 
