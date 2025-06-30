export default function SelectPlan({
	formData,
	setFormData,
	nextStep,
	prevStep,
}) {
	const plans = [
		{
			id: 'arcade',
			name: 'Arcade',
			priceMonthly: 9,
			priceYearly: 90,
		},
		{
			id: 'advanced',
			name: 'Advanced',
			priceMonthly: 12,
			priceYearly: 120,
		},
		{ id: 'pro', name: 'Pro', priceMonthly: 15, priceYearly: 150 },
	]

	const handleSelect = plan => {
		setFormData({ ...formData, plan })
	}

	const toggleBilling = () => {
		setFormData({
			...formData,
			billingType:
				formData.billingType === 'monthly' ? 'yearly' : 'monthly',
		})
	}

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Select Plan</h2>

			{plans.map(plan => (
				<div
					key={plan.id}
					onClick={() => handleSelect(plan)}
					className={`border p-2 mb-2 rounded cursor-pointer ${
						formData.plan?.id === plan.id ? 'bg-blue-100' : ''
					}`}
				>
					<p>{plan.name}</p>
					<p>
						$
						{formData.billingType === 'yearly'
							? plan.priceYearly + '/yr'
							: plan.priceMonthly + '/mo'}
					</p>
				</div>
			))}

			<button
				onClick={toggleBilling}
				className="bg-gray-300 px-4 py-1 rounded mb-4"
			>
				Switch to{' '}
				{formData.billingType === 'monthly' ? 'Yearly' : 'Monthly'}
			</button>

			<div className="flex justify-between">
				<button
					onClick={prevStep}
					className="bg-gray-300 px-4 py-2 rounded"
				>
					Back
				</button>
				<button
					onClick={nextStep}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Next Step
				</button>
			</div>
		</div>
	)
}
