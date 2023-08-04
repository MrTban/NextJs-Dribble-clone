import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/constants'
import AuthProviders from './AuthProviders'

const Navbar = () => {
	const session = null

	return (
		<nav className='flexBetween navbar'>
			<div className='flex-1 flexStart gap-10'>
				{/* LOGO */}
				<Link href='/'>
					<Image src='/logo.svg' alt='Flexibble' width={115} height={43} />
				</Link>

				{/* LINKS */}
				<ul className='xl:flex hidden text-small gap-7'>
					{NavLinks.map((link) => (
						<Link href={link.href} key={link.key}>
							{link.text}
						</Link>
					))}
				</ul>

				<div className='flexCenter gap-4'>
					{session ? (
						<>
							UserPhoto
							<Link href='/create-projects'>Share Work</Link>
						</>
					) : (
						<AuthProviders />
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
