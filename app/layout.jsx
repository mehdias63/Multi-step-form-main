import ubuntuFont from '@/constants/localFonts'
import './globals.css'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={`${ubuntuFont.variable} font-sans`}
			>
				{children}
			</body>
		</html>
	)
}
