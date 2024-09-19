import { Metadata } from 'next'
import { LayoutProps } from '@/app/types/layout';

export const metadata: Metadata = {
    title:"Sign In" ,
    description: "Signin to get started",
};

export default function Layout({children}:LayoutProps) {
  return (
    <>
      {children}
    </>
  )
}