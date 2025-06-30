export default function StepIndicator({ currentStep, isSubmitted }) {
	const steps = [
		{ number: 1, label: 'Your Info' },
		{ number: 2, label: 'Select Plan' },
		{ number: 3, label: 'Add-ons' },
		{ number: 4, label: 'Summary' },
	]
	const activeStep = isSubmitted ? 4 : currentStep

	return (
		<div className="bg-blue-900 text-white p-6 rounded-l-2xl h-full flex flex-col gap-6">
			{steps.map(step => (
				<div key={step.number} className="flex items-center gap-4">
					<div
						className={`w-10 h-10 flex items-center justify-center rounded-full border font-bold transition-all duration-300 ${
							currentStep === step.number
								? 'bg-white text-blue-900'
								: 'border-white text-white'
						}`}
					>
						{step.number}
					</div>
					<div className="uppercase text-xs">
						<p className="text-gray-400">Step {step.number}</p>
						<p className="font-bold">{step.label}</p>
					</div>
				</div>
			))}
		</div>
	)
}
