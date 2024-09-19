import AppLayout from "@/components/custom/layout/AppLayout";
import TitlePage from "@/components/custom/page-heading";
import Dummy from "@/components/custom/dummy-content";

export default async function Page() {
  return(
    <>
      <AppLayout>
        <TitlePage title="Dashboard" description="description" />
        <Dummy/>
      </AppLayout>
    </>
  )
} 
