import '@mantine/core/styles.css'
import './globals.css'

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core'

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully'
}

const theme = createTheme({
  luminanceThreshold: 0.5,
  autoContrast: true,
  primaryColor: 'cyan'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
