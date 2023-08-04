import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import type { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Flexibble',
	description: 'Dribble clone App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}