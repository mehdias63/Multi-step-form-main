export default function StepIndicator({ currentStep, isSubmitted }) {
	const steps = [
		{ number: 1, label: 'Your Info' },
		{ number: 2, label: 'Select Plan' },
		{ number: 3, label: 'Add-ons' },
		{ number: 4, label: 'Summary' },
	]
	const activeStep = isSubmitted ? 4 : currentStep

	return (
		<div className="flex text-white md:p-6">
			<div className="w-full">
				<picture>
					<source
						media="(min-width: 640px)"
						srcSet="/images/bg-sidebar-desktop.svg"
					/>
					<img
						src="/images/bg-sidebar-mobile.svg"
						alt="background pattern"
						className="w-full"
					/>
				</picture>
			</div>
			<div className="absolute space-y-6 gap-x-8 flex sm:flex-col">
				{steps.map(step => (
					<div key={step.number} className="flex items-center gap-4">
						<span
							className={`w-10 h-10 flex items-center justify-center rounded-full border font-bold transition-all duration-300 ${
								currentStep === step.number
									? 'bg-[#BEE2FD] text-blue-900 border-[#BEE2FD]'
									: 'border-white text-white'
							}`}
						>
							{step.number}
						</span>
						<div className="uppercase text-xs hidden sm:block">
							<p className="text-gray-400">Step {step.number}</p>
							<p className="font-bold">{step.label}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
