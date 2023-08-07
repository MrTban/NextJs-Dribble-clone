'use client'

import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { createNewProject, fetchToken, updateProject } from '@/lib/actions'
import { ProjectInterface, SessionInterface } from '@/common.types'
import { categoryFilters } from '@/constants'

import FormField from './FormField'
import CustomMenu from './CustomMenu'
import Button from './Button'

type Props = {
	type: string
	session: SessionInterface
	project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: Props) => {
	const router = useRouter()

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setIsSubmitting(true)

		const { token } = await fetchToken()

		try {
			if (type === 'create') {
				await createNewProject(form, session?.user?.id, token)

				router.push('/')
			}

			if (type === 'edit') {
				await updateProject(form, project?.id as string, token)

				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		const file = e.target.files?.[0]

		if (!file) return

		if (!file.type.includes('image')) {
			return toast.error('Please upload an image file')
		}

		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onload = () => {
			const result = reader.result as string

			handleStateChange('image', result)
		}
	}

	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prevState) => ({
			...prevState,
			[fieldName]: value,
		}))
	}

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [form, setForm] = useState({
		image: project?.image || '',
		title: project?.title || '',
		description: project?.description || '',
		liveSiteUrl: project?.liveSiteUrl || '',
		githubUrl: project?.githubUrl || '',
		category: project?.category || '',
	})

	return (
		<form onSubmit={handleFormSubmit} className='flexStart form'>
			{/* IMAGE */}
			<div className='flexStart form_image-container'>
				<label htmlFor='poster' className='flexCenter form_image-label'>
					{!form.image && 'Chose a poster for you project'}
				</label>
				<input
					id='image'
					type='file'
					accept='image/*'
					required={type === 'create' ? true : false}
					className='form_image-input'
					onChange={(e) => handleChangeImage(e)}
				/>
				{form.image && (
					<Image
						src={form?.image}
						className='sm:p-10 object-contain z-20'
						alt='Project poster'
						fill
					/>
				)}
			</div>

			{/* TITLE */}
			<FormField
				title='Title'
				state={form.title}
				placeholder='Flexibble'
				setState={(value) => handleStateChange('title', value)}
			/>

			{/* DESCRIPTION */}
			<FormField
				title='Description'
				state={form.description}
				placeholder='Showcase and discover remakable developer projects'
				setState={(value) => handleStateChange('description', value)}
			/>

			{/* WEBSITE */}
			<FormField
				type='url'
				title='Website URL'
				state={form.liveSiteUrl}
				placeholder='https://mrtban.tech'
				setState={(value) => handleStateChange('liveSiteUrl', value)}
			/>

			{/* GITHUB */}
			<FormField
				type='url'
				title='Github URL'
				state={form.githubUrl}
				placeholder='https://github.com/MrTban/'
				setState={(value) => handleStateChange('githubUrl', value)}
			/>

			{/* LINKEDIN */}
			{/* <FormField
				type='url'
				title='LinkedIn URL'
				state={form.linkedinUrl}
				placeholder='https://linkedin.com/in/mrtban/'
				setState={(value) => handleStateChange('linkedinUrl', value)}
			/> */}

			{/* CATEGORY */}
			<CustomMenu
				title='Category'
				state={form.category}
				filters={categoryFilters}
				setState={(value) => handleStateChange('category', value)}
			/>

			{/* CREATE */}
			<div className='flexStart w-full'>
				<Button
					title={
						isSubmitting
							? `${type === 'create' ? 'Creating' : 'Editing'}`
							: `${type === 'create' ? 'Create' : 'Edit'}`
					}
					type='submit'
					leftIcon={isSubmitting ? '' : '/plus.svg'}
					isSubmitting={isSubmitting}
				/>
			</div>
		</form>
	)
}

export default ProjectForm
