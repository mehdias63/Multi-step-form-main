import { useDispatch, useSelector } from 'react-redux'
import { prevStep, setSubmitted, setPlan } from '../store/formSlice'
import { Button } from '@/components/ui/button'

export default function Summary({ onConfirm }) {
	const dispatch = useDispatch()
	const { plan, addons } = useSelector(state => state.form)

	const addonList = [
		{ name: 'Online service', monthly: 5, yearly: 50 },
		{ name: 'Larger storage', monthly: 7, yearly: 70 },
		{ name: 'Customizable profile', monthly: 3, yearly: 30 },
	]

	const addonPrices = addonList
		.filter(a => addons.includes(a.name))
		.map(a => (plan.yearly ? a.yearly : a.monthly))

	const total =
		(plan.price || 0) + addonPrices.reduce((acc, cur) => acc + cur, 0)

	const handleToggleBilling = () => {
		const newYearly = !plan.yearly
		const updatedPrice = addonList.find(p => p.name === plan.name)
		const newPrice = newYearly ? plan.price * 10 : plan.price / 10

		dispatch(
			setPlan({
				...plan,
				yearly: newYearly,
				price: newPrice,
			}),
		)
	}

	return (
		<div>
			<h2 className="header">Finishing up</h2>
			<p className="text-desc">
				Double-check everything looks OK before confirming.
			</p>
			<div className="space-y-2 mb-4 bg-blue-50 px-6 py-4 rounded-lg mt-8">
				<div className="flex justify-between items-center">
					<div>
						<span className="text-[#022959] text-sm md:text-base font-medium leading-[1.3125rem]">
							{plan.name} ({plan.yearly ? 'Yearly' : 'Monthly'})
						</span>
						<Button
							variant="secondary"
							onClick={handleToggleBilling}
							className="block -ml-6 text-sm"
						>
							Change
						</Button>
					</div>
					<span className="font-bold text-sm md:text-base text-[#022959] leading-[1.05rem]">
						${plan.price}/{plan.yearly ? 'yr' : 'mo'}
					</span>
				</div>
				<hr />
				{addonList
					.filter(a => addons.includes(a.name))
					.map(a => (
						<div
							key={a.name}
							className="flex justify-between text-sm text-[#9699AA] mt-3 mb-4"
						>
							<span>{a.name}</span>
							<span className="text-[#022959] text-sm">
								${plan.yearly ? a.yearly : a.monthly}/
								{plan.yearly ? 'yr' : 'mo'}
							</span>
						</div>
					))}
			</div>
			<div className="flex justify-between mt-6 p-6">
				<span className="text-sm text-[#9699AA]">Total</span>
				<span className="text-[#483EFF] text-base md:text-lg font-bold">
					+${total}/{plan.yearly ? 'yr' : 'mo'}
				</span>
			</div>
			<div className="flex justify-between mt-24">
				<Button
					variant="secondary"
					onClick={() => dispatch(prevStep())}
				>
					Go Back
				</Button>
				<Button onClick={onConfirm} className="bg-[#483EFF]">
					Confirm
				</Button>
			</div>
		</div>
	)
}
