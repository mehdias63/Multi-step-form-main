'use client'
import { useDispatch } from 'react-redux'
import { resetForm } from '../store/formSlice'
import { Button } from '@/components/ui/button'

export default function ThankYou() {
	const dispatch = useDispatch()
	const handleRestart = () => {
		dispatch(resetForm())
	}
	return (
		<div className="w-full flex flex-col justify-between items-center gap-y-4">
			<img src="/images/icon-thank-you.svg" alt="icon-thank-you" />
			<h2 className="text-3xl font-bold mb-4 mt-6">Thank you!</h2>
			<p className="text-sm text-[#9699AA] leading-[1.5rem] text-center">
				Thanks for confirming your subscription! We hope you have fun
				using our platform. If you ever need support, please feel free
				to email us at support@loremgaming.com.
			</p>
			<Button onClick={handleRestart} className=" mt-20">
				Start Over
			</Button>
		</div>
	)
}
