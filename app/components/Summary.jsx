import { useDispatch, useSelector } from 'react-redux'
import { prevStep, setSubmitted } from '../store/formSlice'

export default function Summary({ onConfirm }) {
	const dispatch = useDispatch()
	const { plan, addons } = useSelector(state => state.form)

	const addonList = [
		{ name: 'Online support', monthly: 5, yearly: 50 },
		{ name: 'Extra storage', monthly: 7, yearly: 70 },
		{ name: 'Custom themes', monthly: 3, yearly: 30 },
	]

	const addonPrices = addonList
		.filter(a => addons.includes(a.name))
		.map(a => (plan.yearly ? a.yearly : a.monthly))

	const total =
		(plan.price || 0) + addonPrices.reduce((acc, cur) => acc + cur, 0)

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Summary</h2>
			<div className="space-y-2">
				<div className="flex justify-between">
					<span>
						{plan.name} ({plan.yearly ? 'Yearly' : 'Monthly'})
					</span>
					<span>
						${plan.price}/{plan.yearly ? 'yr' : 'mo'}
					</span>
				</div>
				{addonList
					.filter(a => addons.includes(a.name))
					.map(a => (
						<div
							key={a.name}
							className="flex justify-between text-sm text-gray-600"
						>
							<span>{a.name}</span>
							<span>
								${plan.yearly ? a.yearly : a.monthly}/
								{plan.yearly ? 'yr' : 'mo'}
							</span>
						</div>
					))}
				<hr />
				<div className="flex justify-between font-bold">
					<span>Total</span>
					<span>
						${total}/{plan.yearly ? 'yr' : 'mo'}
					</span>
				</div>
			</div>
			<div className="flex justify-between mt-6">
				<button
					onClick={() => dispatch(prevStep())}
					className="text-gray-600"
				>
					Back
				</button>
				<button
					onClick={onConfirm}
					className="bg-green-600 text-white px-4 py-2 rounded"
				>
					Confirm
				</button>
			</div>
		</div>
	)
}
