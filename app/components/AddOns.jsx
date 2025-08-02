import { useDispatch, useSelector } from 'react-redux'
import { setAddons, nextStep, prevStep } from '../store/formSlice'
import { Button } from '@/components/ui/button'

export default function AddOns() {
	const dispatch = useDispatch()
	const { addons, plan } = useSelector(state => state.form)

	const addonList = [
		{
			name: 'Online service',
			description: 'Access to multiplayer games',
			monthly: 1,
			yearly: 10,
		},
		{
			name: 'Larger storage',
			description: 'Extra 1TB of cloud save',
			monthly: 2,
			yearly: 20,
		},
		{
			name: 'Customizable profile',
			description: 'Custom theme on your profile',
			monthly: 2,
			yearly: 20,
		},
	]

	const toggleAddon = addonName => {
		const newAddons = addons.includes(addonName)
			? addons.filter(a => a !== addonName)
			: [...addons, addonName]
		dispatch(setAddons(newAddons))
	}

	return (
		<div>
			<h2 className="header">Pick Add-ons</h2>
			<p className="text-desc">
				Add-ons help enhance your gaming experience.
			</p>
			<div className="space-y-4">
				{addonList.map(addon => {
					const selected = addons.includes(addon.name)

					return (
						<div
							key={addon.name}
							onClick={() => toggleAddon(addon.name)}
							className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all h-[3.875rem] md:h-[5.0625rem] ${
								selected
									? 'bg-[#F8F9FF] border-[#483EFF]'
									: 'bg-white border-gray-300'
							}`}
						>
							<label className="flex items-center space-x-5 cursor-pointer">
								<input
									type="checkbox"
									checked={selected}
									onChange={() => toggleAddon(addon.name)}
									className="w-4 h-4 accent-[#483EFF]"
								/>
								<div>
									<p className="text-[#022959] text-sm md:text-base font-medium leading-[1.2rem] md:mb-1">
										{addon.name}
									</p>
									<p className="text-[#9699AA] text-xs md:text-sm">
										{addon.description}
									</p>
								</div>
							</label>
							<span className="text-[#483EFF] text-xs md:text-sm">
								{plan.yearly
									? `+ $${addon.yearly}/yr`
									: `+$${addon.monthly}/mo`}
							</span>
						</div>
					)
				})}
			</div>

			<div className="flex justify-between mt-32">
				<Button
					variant="secondary"
					onClick={() => dispatch(prevStep())}
				>
					Go Back
				</Button>
				<Button onClick={() => dispatch(nextStep())}>
					Next Step
				</Button>
			</div>
		</div>
	)
}
