'use client'
import { useState } from 'react'
import StepIndicator from './components/StepIndicator'
import PersonalInfo from './components/PersonalInfo'
import SelectPlan from './components/SelectPlan'
import AddOns from './components/AddOns'
import Summary from './components/Summary'
import ThankYou from './components/ThankYou'

export default function Home() {
	const [currentStep, setCurrentStep] = useState(1)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		plan: '',
		billingType: 'monthly',
		addons: [],
	})

	const nextStep = () => setCurrentStep(prev => prev + 1)
	const prevStep = () => setCurrentStep(prev => prev - 1)

	return (
		<div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
			<div className="bg-white shadow-lg rounded-lg flex w-full h-full max-w-4xl">
				<StepIndicator
					currentStep={currentStep}
					isSubmitted={isSubmitted}
				/>
				<div className="flex-1 p-6">
					{isSubmitted ? (
						<ThankYou />
					) : (
						<>
							{currentStep === 1 && (
								<PersonalInfo
									formData={formData}
									setFormData={setFormData}
									nextStep={nextStep}
								/>
							)}
							{currentStep === 2 && (
								<SelectPlan
									formData={formData}
									setFormData={setFormData}
									nextStep={nextStep}
									prevStep={prevStep}
								/>
							)}
							{currentStep === 3 && (
								<AddOns
									formData={formData}
									setFormData={setFormData}
									nextStep={nextStep}
									prevStep={prevStep}
								/>
							)}
							{currentStep === 4 && (
								<Summary
									formData={formData}
									prevStep={prevStep}
									onConfirm={() => setIsSubmitted(true)}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
