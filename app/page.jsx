'use client'
import { useSelector, useDispatch } from 'react-redux'
import StepIndicator from './components/StepIndicator'
import PersonalInfo from './components/PersonalInfo'
import SelectPlan from './components/SelectPlan'
import AddOns from './components/AddOns'
import Summary from './components/Summary'
import ThankYou from './components/ThankYou'
import { setSubmitted } from '../app/store/formSlice'

export default function Home() {
	const dispatch = useDispatch()
	const step = useSelector(state => state.form.step)
	const isSubmitted = useSelector(state => state.form.isSubmitted)

	return (
		<div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
			<div className="bg-white shadow-lg rounded-lg flex flex-col sm:flex-row w-full h-full max-w-4xl">
				<StepIndicator currentStep={step} isSubmitted={isSubmitted} />
				<div className="flex-1 flex flex-col justify-center p-6 mx-4 bg-white rounded-2xl -mt-20 sm:mt-0 z-10">
					{isSubmitted ? (
						<ThankYou />
					) : (
						<>
							{step === 1 && <PersonalInfo />}
							{step === 2 && <SelectPlan />}
							{step === 3 && <AddOns />}
							{step === 4 && (
								<Summary
									onConfirm={() => dispatch(setSubmitted(true))}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
