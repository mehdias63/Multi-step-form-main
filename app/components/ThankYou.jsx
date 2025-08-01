'use client'
import { useDispatch } from 'react-redux'
import { resetForm } from '../store/formSlice'
export default function ThankYou() {
	const dispatch = useDispatch()
	const handleRestart = () => {
		dispatch(resetForm())
	}
	return (
		<div className="text-center">
			<h2 className="text-3xl font-bold mb-4">Thank you!</h2>
			<p className="text-gray-600">
				Thanks for confirming your subscription. We hope you enjoy
				using our service!
			</p>
			<button
				onClick={handleRestart}
				className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all"
			>
				Start Over
			</button>
		</div>
	)
}
