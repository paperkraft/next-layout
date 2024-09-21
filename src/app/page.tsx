import AppLayout from "@/components/custom/layout/AppLayout";
import TitlePage from "@/components/custom/page-heading";
import WeekCalendar from "@/components/custom/week-calendar";

export default async function Page() {
  return(
    <>
      <AppLayout>
        <TitlePage title="Dashboard" description="description" />
        <WeekCalendar/>
      </AppLayout>
    </>
  )
} 
