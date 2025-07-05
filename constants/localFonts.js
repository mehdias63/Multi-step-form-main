import LocalFont from 'next/font/local'
const ubuntuFont = LocalFont({
	src: [
		{
			path: '../public/fonts/Ubuntu-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/fonts/Ubuntu-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../public/fonts/Ubuntu-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-ubuntu',
	style: 'normal',
	display: 'block',
})

export default ubuntuFont
