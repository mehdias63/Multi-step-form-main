'use client'
import ubuntuFont from '@/constants/localFonts'
import './globals.css'
import Providers from './providers'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={`${ubuntuFont.variable} font-sans`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
