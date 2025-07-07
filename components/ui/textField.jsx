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
			<Label htmlFor={name}>{title}</Label>
			<Input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={textHolder}
				className={error ? 'border-red-500' : ''}
			/>
			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
		</div>
	)
}

export default TextField
