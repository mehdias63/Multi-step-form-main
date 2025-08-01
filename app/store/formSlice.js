import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	step: 1,
	isSubmitted: false,
	personalInfo: {
		name: '',
		email: '',
		phone: '',
	},
	plan: {
		name: '',
		price: 0,
		yearly: false,
	},
	billingType: 'monthly',
	addons: [],
}

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		nextStep: state => {
			state.step += 1
		},
		prevStep: state => {
			state.step -= 1
		},
		setStep: (state, action) => {
			state.step = action.payload
		},
		setSubmitted: (state, action) => {
			state.isSubmitted = action.payload
		},
		setPersonalInfo: (state, action) => {
			state.personalInfo = action.payload
		},
		setPlan: (state, action) => {
			state.plan = action.payload
		},
		setSelectedPlan: (state, action) => {
			state.plan = action.payload
		},
		setBillingType: (state, action) => {
			state.billingType = action.payload
		},

		setAddons: (state, action) => {
			state.addons = action.payload
		},
		resetForm: () => initialState,
	},
})

export const {
	nextStep,
	prevStep,
	setStep,
	setSubmitted,
	setPersonalInfo,
	setSelectedPlan,
	setBillingType,
	setPlan,
	setAddons,
	resetForm,
} = formSlice.actions

export default formSlice.reducer
