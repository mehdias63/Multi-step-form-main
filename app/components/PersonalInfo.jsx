import { useState } from 'react'

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
		<div>
			<h2 className="text-2xl font-bold mb-2">Personal info</h2>
			<p className="text-gray-500 mb-6">
				Please provide your name, email address, and phone number.
			</p>

			<div className="mb-4">
				<label className="block text-sm font-medium">Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className={`w-full border p-2 rounded ${
						errors.name ? 'border-red-500' : 'border-gray-300'
					}`}
					placeholder="e.g. Stephen King"
				/>
				{errors.name && (
					<p className="text-red-500 text-sm mt-1">{errors.name}</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium">
					Email Address
				</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={`w-full border p-2 rounded ${
						errors.email ? 'border-red-500' : 'border-gray-300'
					}`}
					placeholder="e.g. stephenking@lorem.com"
				/>
				{errors.email && (
					<p className="text-red-500 text-sm mt-1">{errors.email}</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium">
					Phone Number
				</label>
				<input
					type="text"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					className={`w-full border p-2 rounded ${
						errors.phone ? 'border-red-500' : 'border-gray-300'
					}`}
					placeholder="e.g. +1 234 567 890"
				/>
				{errors.phone && (
					<p className="text-red-500 text-sm mt-1">{errors.phone}</p>
				)}
			</div>

			<button
				onClick={handleNext}
				className="bg-blue-900 text-white px-4 py-2 rounded"
			>
				Next Step
			</button>
		</div>
	)
}
