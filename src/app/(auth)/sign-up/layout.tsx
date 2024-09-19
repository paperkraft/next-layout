import { Metadata } from 'next'
import { LayoutProps } from '@/app/types/layout';

export const metadata: Metadata = {
    title:"Sign Up" ,
    description: "Signup to get started",
};

export default function Layout({children}:LayoutProps) {
  return (<>{children}</>)
}