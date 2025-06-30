export default function AddOns({
	nextStep,
	prevStep,
	formData,
	setFormData,
}) {
	const addonsList = [
		{
			id: 'online-service',
			name: 'Online Service',
			priceMonthly: 1,
			priceYearly: 10,
		},
		{
			id: 'larger-storage',
			name: 'Larger Storage',
			priceMonthly: 2,
			priceYearly: 20,
		},
		{
			id: 'custom-profile',
			name: 'Customizable Profile',
			priceMonthly: 2,
			priceYearly: 20,
		},
	]

	const toggleAddon = addon => {
		const existingAddons = formData.addons || []

		const alreadySelected = existingAddons.find(
			item => item.id === addon.id,
		)

		if (alreadySelected) {
			// اگر قبلاً انتخاب شده، حذفش کن
			setFormData({
				...formData,
				addons: existingAddons.filter(item => item.id !== addon.id),
			})
		} else {
			// اگر انتخاب نشده بود، اضافه کن
			setFormData({
				...formData,
				addons: [...existingAddons, addon],
			})
		}
	}

	const isSelected = addonId => {
		return (formData.addons || []).some(item => item.id === addonId)
	}

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Pick Add-ons</h2>

			{addonsList.map(addon => (
				<div
					key={addon.id}
					className="flex items-center justify-between border p-2 mb-2 rounded cursor-pointer"
					onClick={() => toggleAddon(addon)}
					style={{
						backgroundColor: isSelected(addon.id)
							? '#cfe2ff'
							: 'white',
					}}
				>
					<div className="flex items-center">
						<input
							type="checkbox"
							checked={isSelected(addon.id)}
							readOnly
							className="mr-2"
						/>
						<div>
							<p className="font-semibold">{addon.name}</p>
							<p className="text-gray-500 text-sm">
								{formData.billingType === 'yearly'
									? `$${addon.priceYearly}/yr`
									: `$${addon.priceMonthly}/mo`}
							</p>
						</div>
					</div>
				</div>
			))}

			<div className="flex justify-between mt-6">
				<button
					onClick={prevStep}
					className="bg-gray-300 px-4 py-2 rounded"
				>
					Go Back
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
