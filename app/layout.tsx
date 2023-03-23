import Navbar from "@/components/navbar/Navbar"

export const metadata = {
  title: 'Valorant Vods',
  description: 'Valorant Vods',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>

        {children}
      </body>
    </html>
  )
}
