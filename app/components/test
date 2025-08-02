export default function Summary({ formData, prevStep, onConfirm }) {
	if (!formData.plan) return null

	const planPrice =
		formData.billingType === 'yearly'
			? formData.plan.priceYearly
			: formData.plan.priceMonthly

	const addonsTotal = formData.addons.reduce((total, addon) => {
		return (
			total +
			(formData.billingType === 'yearly'
				? addon.priceYearly
				: addon.priceMonthly)
		)
	}, 0)

	const total = planPrice + addonsTotal

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Summary</h2>

			<div className="mb-4">
				<p className="font-semibold">
					{formData.plan.name} ({formData.billingType})
				</p>
				<p>
					$
					{formData.billingType === 'yearly'
						? formData.plan.priceYearly
						: formData.plan.priceMonthly}
					{formData.billingType === 'yearly' ? '/yr' : '/mo'}
				</p>
			</div>

			<div className="mb-4">
				{formData.addons.map(addon => (
					<div key={addon.id} className="flex justify-between">
						<p>{addon.name}</p>
						<p>
							+$
							{formData.billingType === 'yearly'
								? addon.priceYearly
								: addon.priceMonthly}
							{formData.billingType === 'yearly' ? '/yr' : '/mo'}
						</p>
					</div>
				))}
			</div>

			<div className="font-bold flex justify-between">
				<p>Total:</p>
				<p>
					${total}
					{formData.billingType === 'yearly' ? '/yr' : '/mo'}
				</p>
			</div>

			<div className="flex justify-between mt-6">
				<button
					onClick={prevStep}
					className="bg-gray-300 px-4 py-2 rounded"
				>
					Go Back
				</button>
				<button
					onClick={onConfirm}
					className="bg-green-500 text-white px-4 py-2 rounded"
				>
					Confirm
				</button>
			</div>
		</div>
	)
}
