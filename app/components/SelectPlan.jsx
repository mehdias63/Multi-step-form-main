import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

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
			icon: '/images/icon-arcade.svg',
		},
		{
			id: 'advanced',
			name: 'Advanced',
			priceMonthly: 12,
			priceYearly: 120,
			icon: '/images/icon-advanced.svg',
		},
		{
			id: 'pro',
			name: 'Pro',
			priceMonthly: 15,
			priceYearly: 150,
			icon: '/images/icon-pro.svg',
		},
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
			<h2 className="header">Select your plan</h2>
			<p className="text-desc">
				You have the option of monthly or yearly billing.
			</p>
			<div className="flex flex-col lg:flex-row gap-x-4">
				{plans.map(plan => (
					<div
						key={plan.id}
						onClick={() => handleSelect(plan)}
						className={`border p-4 mb-2 rounded cursor-pointer flex gap-x-4 lg:flex-col lg:justify-between lg:min-h-[10rem] lg:min-w-[8.625rem] ${
							formData.plan?.id === plan.id
								? 'bg-blue-50 border-[#483EFF]'
								: ''
						}`}
					>
						<div>
							<img src={plan.icon} />
						</div>
						<div>
							<p className="text-base font-medium text-[#022959] leading-[1.2rem]">
								{plan.name}
							</p>
							<p className="text-sm text-[#9699AA] leading-[1.05rem]">
								$
								{formData.billingType === 'yearly'
									? plan.priceYearly + '/yr'
									: plan.priceMonthly + '/mo'}
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="bg-[#F8F9FF] h-12 flex items-center justify-center gap-x-4 mt-8">
				<p
					className={`text-sm font-medium ${
						formData.billingType === 'monthly'
							? 'text-[#022959]'
							: 'text-[#9699AA]'
					}`}
				>
					Monthly
				</p>
				<Switch onClick={toggleBilling}>
					{formData.billingType === 'yearly' ? 'Monthly' : 'Yearly'}
				</Switch>
				<p
					className={`text-sm font-medium ${
						formData.billingType === 'yearly'
							? 'text-[#022959]'
							: 'text-[#9699AA]'
					}`}
				>
					Yearly
				</p>
			</div>
			<div className="flex justify-between mt-32">
				<Button variant="secondary" onClick={prevStep}>
					Go Back
				</Button>
				<Button onClick={nextStep}>Next Step</Button>
			</div>
		</div>
	)
}
