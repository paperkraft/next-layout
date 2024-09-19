"use client"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { inconsolata, inter, montserrat, noto_sans, poppins, roboto, trio } from "@/lib/fonts";

interface ThemeWrapperProps extends React.ComponentProps<"section"> {
  defaultTheme?: string
}

export default function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const [config] = useConfig();
  // const path = usePathname();
  return (
    // Theme-wrapper
    <section className={cn("w-full", className,
      // { "mt-16": !proctedRoutes(path)},
      `
      theme-${config.theme}
      ${inter.variable} 
      ${roboto.variable} 
      ${inconsolata.variable} 
      ${montserrat.variable} 
      ${noto_sans.variable} 
      ${trio.variable} 
      ${poppins.variable}`
    )}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
          "fontFamily": `var(--${config.font})`
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  )
}