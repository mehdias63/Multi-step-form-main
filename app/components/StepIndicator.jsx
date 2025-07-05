export default function StepIndicator({ currentStep, isSubmitted }) {
	const steps = [
		{ number: 1, label: 'Your Info' },
		{ number: 2, label: 'Select Plan' },
		{ number: 3, label: 'Add-ons' },
		{ number: 4, label: 'Summary' },
	]
	const activeStep = isSubmitted ? 4 : currentStep

	return (
		<div className="relative text-white md:p-6">
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
			<div className="absolute -top-10 left-0 w-full h-full flex items-center justify-center gap-x-4 sm:flex-col sm:justify-start sm:top-8 sm:items-start sm:left-8 sm:space-y-6 md:top-16 md:left-14">
				{steps.map(step => (
					<div key={step.number} className="flex items-center gap-4">
						<span
							className={`w-10 h-10 flex items-center justify-center rounded-full border font-bold leading-none transition-all duration-300 ${
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
