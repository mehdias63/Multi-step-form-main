import { Input } from './input'
import { Label } from './label'

function TextField({
	title,
	textHolder,
	name,
	value,
	onChange,
	error,
	type = 'text',
}) {
	return (
		<div className="mt-4 md:mt-8">
			<div className="flex justify-between items-center">
				<Label htmlFor={name}>{title}</Label>
				{error && (
					<p className="text-sm font-bold text-[#EE374A] mb-1">
						{error}
					</p>
				)}
			</div>
			<Input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={textHolder}
				className={error ? 'border-[#EE374A]' : ''}
			/>
		</div>
	)
}

export default TextField
