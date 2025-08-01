'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalInfo, nextStep } from '../store/formSlice'
import { Button } from '@/components/ui/button'
import TextField from '@/components/ui/textField'

export default function PersonalInfo() {
	const dispatch = useDispatch()
	const { name, email, phone } = useSelector(
		state => state.form.personalInfo,
	)
	const [form, setForm] = useState({ name, email, phone })
	const [errors, setErrors] = useState({})

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
		setErrors({ ...errors, [e.target.name]: '' })
	}

	const validate = () => {
		const newErrors = {}
		if (!form.name.trim()) newErrors.name = 'This field is required'
		if (!form.email.trim()) newErrors.email = 'This field is required'
		if (!form.phone.trim()) newErrors.phone = 'This field is required'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleNext = () => {
		if (validate()) {
			dispatch(setPersonalInfo(form))
			dispatch(nextStep())
		}
	}

	return (
		<div className="p-4">
			<h2 className="header">Personal info</h2>
			<p className="text-desc">
				Please provide your name, email address, and phone number.
			</p>

			<TextField
				title="Name"
				textHolder="e.g. Stephen King"
				name="name"
				value={form.name}
				onChange={handleChange}
				error={errors.name}
			/>
			<TextField
				title="Email Address"
				textHolder="e.g. stephenking@lorem.com"
				name="email"
				value={form.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				title="Phone Number"
				textHolder="e.g. +1 234 567 890"
				name="phone"
				value={form.phone}
				onChange={handleChange}
				error={errors.phone}
			/>

			<div className="flex justify-end mt-32">
				<Button onClick={handleNext}>Next Step</Button>
			</div>
		</div>
	)
}
