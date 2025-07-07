import { Input } from '@/components/ui/input'
import { useState } from 'react'
import TextField from '../../components/ui/textField'
import { Button } from '@/components/ui/button'

export default function PersonalInfo({
	nextStep,
	formData,
	setFormData,
}) {
	const [errors, setErrors] = useState({})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
		setErrors({ ...errors, [e.target.name]: '' }) // پاک کردن ارور هنگام تایپ
	}

	const validate = () => {
		const newErrors = {}
		if (!formData.name.trim())
			newErrors.name = 'This field is required'
		if (!formData.email.trim())
			newErrors.email = 'This field is required'
		if (!formData.phone.trim())
			newErrors.phone = 'This field is required'

		setErrors(newErrors)

		return Object.keys(newErrors).length === 0
	}

	const handleNext = () => {
		if (validate()) {
			nextStep()
		}
	}

	return (
		<div className="p-4">
			<h2 className="text-2xl md:text-[2rem] font-bold mb-2 leading-[1.8rem] md:leading-[2.4rem] text-[#022959]">
				Personal info
			</h2>
			<p className="text-base text-[#9699AA] mb-6 leading-[1.5rem]">
				Please provide your name, email address, and phone number.
			</p>

			<TextField
				title="Name"
				textHolder="e.g. Stephen King"
				name="name"
				value={formData.name}
				onChange={handleChange}
				error={errors.name}
			/>
			<TextField
				title="Email Address"
				textHolder="e.g. stephenking@lorem.com"
				name="email"
				onChange={handleChange}
				error={errors.email}
			/>

			<TextField
				title="Phone Number"
				textHolder="e.g. +1 234 567 890"
				name="phone"
				onChange={handleChange}
				error={errors.phone}
			/>

			<button
				onClick={handleNext}
				className="bg-blue-900 text-white px-4 py-2 rounded"
			>
				Next Step
			</button>
			<div className="flex justify-end mt-16">
				<Button>Next Step</Button>
			</div>
		</div>
	)
}
