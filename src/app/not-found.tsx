"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const [loggedIn, setStatus] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if(localStorage){
      if (localStorage.getItem("user")) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
  }, []);

  interface Props{
    loggedIn: boolean | undefined
  }

  const RenderPage = ({loggedIn}:Props) => (
    <div className={cn("flex items-center justify-center",{"h-screen": !loggedIn, "h-[calc(100vh-180px)]": loggedIn})}>
      <div className="flex flex-col items-center">
        <h6 className="text-2xl font-semibold">Not Found</h6>
        <p className="text-muted-foreground text-sm">The page you are looking does not exist</p>
        <Image src={"/not-found.svg"} height={250} width={250} alt="Not-Found" priority className="mb-3" />
        <Button asChild>
          <Link href={loggedIn ? "/" : '/sign-in'}>{loggedIn ? "Return Home": "Back"}</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <React.Fragment>
      <RenderPage loggedIn={loggedIn}/>
    </React.Fragment>
  );
}
