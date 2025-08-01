import { useDispatch, useSelector } from 'react-redux'
import { setAddons, nextStep, prevStep } from '../store/formSlice'

export default function AddOns() {
	const dispatch = useDispatch()
	const { addons, plan } = useSelector(state => state.form)

	const addonList = [
		{ name: 'Online support', monthly: 5, yearly: 50 },
		{ name: 'Extra storage', monthly: 7, yearly: 70 },
		{ name: 'Custom themes', monthly: 3, yearly: 30 },
	]

	const toggleAddon = addonName => {
		const newAddons = addons.includes(addonName)
			? addons.filter(a => a !== addonName)
			: [...addons, addonName]
		dispatch(setAddons(newAddons))
	}

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Pick Add-ons</h2>
			<div className="space-y-4">
				{addonList.map(addon => (
					<div
						key={addon.name}
						className="flex items-center justify-between border p-2 mb-2 rounded cursor-pointer"
					>
						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={addons.includes(addon.name)}
								onChange={() => toggleAddon(addon.name)}
							/>
							<span>{addon.name}</span>
						</label>
						<span>
							{plan.yearly
								? `$${addon.yearly}/yr`
								: `$${addon.monthly}/mo`}
						</span>
					</div>
				))}
				<div className="flex justify-between mt-6">
					<button
						onClick={() => dispatch(prevStep())}
						className="bg-gray-300 px-4 py-2 rounded"
					>
						Go Back
					</button>
					<button
						onClick={() => dispatch(nextStep())}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Next Step
					</button>
				</div>
			</div>
		</div>
	)
}
