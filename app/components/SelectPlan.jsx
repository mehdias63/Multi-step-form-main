import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useDispatch, useSelector } from 'react-redux'
import { setPlan, nextStep, prevStep } from '../store/formSlice'

export default function SelectPlan() {
	const dispatch = useDispatch()
	const plan = useSelector(state => state.form.plan)
	const plans = [
		{
			id: 'arcade',
			name: 'Arcade',
			monthly: 9,
			yearly: 90,
			icon: '/images/icon-arcade.svg',
		},
		{
			id: 'advanced',
			name: 'Advanced',
			monthly: 12,
			yearly: 120,
			icon: '/images/icon-advanced.svg',
		},
		{
			id: 'pro',
			name: 'Pro',
			monthly: 15,
			yearly: 150,
			icon: '/images/icon-pro.svg',
		},
	]

	const handleSelect = selected => {
		dispatch(
			setPlan({
				name: selected.name,
				price: plan.yearly ? selected.yearly : selected.monthly,
				yearly: plan.yearly,
			}),
		)
	}

	const toggleBilling = () => {
		dispatch(setPlan({ ...plan, yearly: !plan.yearly }))
	}

	return (
		<div>
			<h2 className="header">Select your plan</h2>
			<p className="text-desc">
				You have the option of monthly or yearly billing.
			</p>
			<div className="flex flex-col lg:flex-row gap-x-4">
				{plans.map(p => (
					<div
						key={p.name}
						onClick={() => handleSelect(p)}
						className={`border p-4 mb-2 rounded cursor-pointer flex gap-x-4 lg:flex-col lg:justify-between lg:min-h-[10rem] lg:min-w-[8.625rem] ${
							plan.name === p.name
								? 'bg-blue-50 border-[#483EFF]'
								: ''
						}`}
					>
						<div>
							<img src={p.icon} />
						</div>
						<div>
							<p className="text-base font-medium text-[#022959] leading-[1.2rem]">
								{p.name}
							</p>
							<p className="text-sm text-[#9699AA] leading-[1.05rem]">
								{plan.yearly ? `$${p.yearly}/yr` : `$${p.monthly}/mo`}
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="bg-[#F8F9FF] h-12 flex items-center justify-center gap-x-4 mt-8 rounded-lg">
				<p
					className={`text-sm font-medium ${
						!plan.yearly ? 'text-[#022959]' : 'text-[#9699AA]'
					}`}
				>
					Monthly
				</p>
				<Switch onClick={toggleBilling}>
					{plan.yearly ? 'Monthly' : 'Yearly'}
				</Switch>
				<p
					className={`text-sm font-medium ${
						plan.yearly ? 'text-[#022959]' : 'text-[#9699AA]'
					}`}
				>
					Yearly
				</p>
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
