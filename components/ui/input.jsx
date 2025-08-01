import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-[#9699AA] placeholder:text-sm md:placeholder:text-base selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-sm border border-[#D6D9E6] bg-transparent px-3 py-1 md:px-4 md:py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:ring-ring/50 focus-visible:border-[#483EFF]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className,
			)}
			{...props}
		/>
	)
}

export { Input }
