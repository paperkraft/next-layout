import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/custom/theme-provider";
import ThemeWrapper from "@/components/custom/theme-wrapper";
import './styles/globals.css';

export const metadata: Metadata = {
  title:{
    default:"Webdesk",
    template:"%s | SV"
} ,
  description: "Educational ERP",
};

// export const viewport: Viewport = {
//   themeColor: "currentColor"
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
