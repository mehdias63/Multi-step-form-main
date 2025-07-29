// File: store/index.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;


// File: store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

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
  addons: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => { state.step += 1; },
    prevStep: (state) => { state.step -= 1; },
    setStep: (state, action) => { state.step = action.payload; },
    setSubmitted: (state, action) => { state.isSubmitted = action.payload; },
    setPersonalInfo: (state, action) => { state.personalInfo = action.payload; },
    setPlan: (state, action) => { state.plan = action.payload; },
    setAddons: (state, action) => { state.addons = action.payload; },
    resetForm: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  setSubmitted,
  setPersonalInfo,
  setPlan,
  setAddons,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;


// File: pages/_app.js
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;


// File: pages/index.js
import { useSelector, useDispatch } from 'react-redux';
import StepIndicator from '../components/StepIndicator';
import PersonalInfo from '../components/PersonalInfo';
import SelectPlan from '../components/SelectPlan';
import AddOns from '../components/AddOns';
import Summary from '../components/Summary';
import ThankYou from '../components/ThankYou';
import { setSubmitted } from '../store/formSlice';

export default function Home() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.form.step);
  const isSubmitted = useSelector((state) => state.form.isSubmitted);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StepIndicator currentStep={step} isSubmitted={isSubmitted} />
      <div className="flex-1 p-6">
        {isSubmitted ? (
          <ThankYou />
        ) : (
          <>
            {step === 1 && <PersonalInfo />}
            {step === 2 && <SelectPlan />}
            {step === 3 && <AddOns />}
            {step === 4 && <Summary onConfirm={() => dispatch(setSubmitted(true))} />}
          </>
        )}
      </div>
    </div>
  );
}


// File: components/ThankYou.js
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ThankYou() {
  const form = useSelector((state) => state.form);

  useEffect(() => {
    console.log('Submitted Data:', form);
  }, [form]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
      <p className="text-gray-700">We’ve received your submission.</p>
    </div>
  );
}


// File: components/PersonalInfo.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setPersonalInfo } from '../store/formSlice';

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const { name, email, phone } = useSelector((state) => state.form.personalInfo);

  const [form, setForm] = useState({ name, email, phone });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'This field is required';
    if (!form.email) newErrors.email = 'This field is required';
    if (!form.phone) newErrors.phone = 'This field is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
    } else {
      dispatch(setPersonalInfo(form));
      dispatch(nextStep());
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Info</h2>
      <div className="space-y-4">
        <div>
          <input
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next Step
        </button>
      </div>
    </div>
  );
}

// File: components/SelectPlan.js
import { useDispatch, useSelector } from 'react-redux';
import { setPlan, nextStep, prevStep } from '../store/formSlice';

export default function SelectPlan() {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.form.plan);

  const plans = [
    { name: 'Basic', monthly: 10, yearly: 100 },
    { name: 'Pro', monthly: 20, yearly: 200 },
    { name: 'Ultimate', monthly: 30, yearly: 300 },
  ];

  const toggleYearly = () => {
    dispatch(setPlan({ ...plan, yearly: !plan.yearly }));
  };

  const handleSelect = (selected) => {
    dispatch(setPlan({
      name: selected.name,
      price: plan.yearly ? selected.yearly : selected.monthly,
      yearly: plan.yearly
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Plan</h2>
      <div className="space-y-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`p-4 border rounded ${plan.name === p.name ? 'border-blue-600' : 'border-gray-300'}`}
            onClick={() => handleSelect(p)}
          >
            <p className="font-bold">{p.name}</p>
            <p>{plan.yearly ? `$${p.yearly}/yr` : `$${p.monthly}/mo`}</p>
          </div>
        ))}
        <button onClick={toggleYearly} className="text-blue-500 underline">
          Switch to {plan.yearly ? 'Monthly' : 'Yearly'}
        </button>
        <div className="flex justify-between mt-4">
          <button onClick={() => dispatch(prevStep())} className="text-gray-600">
            Back
          </button>
          <button onClick={() => dispatch(nextStep())} className="bg-blue-600 text-white px-4 py-2 rounded">
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

// components/AddOns.js
import { useDispatch, useSelector } from 'react-redux';
import { setAddons, nextStep, prevStep } from '../store/formSlice';

export default function AddOns() {
  const dispatch = useDispatch();
  const { addons, plan } = useSelector((state) => state.form);

  const addonList = [
    { name: 'Online support', monthly: 5, yearly: 50 },
    { name: 'Extra storage', monthly: 7, yearly: 70 },
    { name: 'Custom themes', monthly: 3, yearly: 30 },
  ];

  const toggleAddon = (addonName) => {
    const newAddons = addons.includes(addonName)
      ? addons.filter((a) => a !== addonName)
      : [...addons, addonName];
    dispatch(setAddons(newAddons));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pick Add-ons</h2>
      <div className="space-y-4">
        {addonList.map((addon) => (
          <div key={addon.name} className="flex items-center justify-between border p-3 rounded">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={addons.includes(addon.name)}
                onChange={() => toggleAddon(addon.name)}
              />
              <span>{addon.name}</span>
            </label>
            <span>{plan.yearly ? `$${addon.yearly}/yr` : `$${addon.monthly}/mo`}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button onClick={() => dispatch(prevStep())} className="text-gray-600">
            Back
          </button>
          <button onClick={() => dispatch(nextStep())} className="bg-blue-600 text-white px-4 py-2 rounded">
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

// components/Summary.js
import { useDispatch, useSelector } from 'react-redux';
import { prevStep, setSubmitted } from '../store/formSlice';

export default function Summary({ onConfirm }) {
  const dispatch = useDispatch();
  const { plan, addons } = useSelector((state) => state.form);

  const addonList = [
    { name: 'Online support', monthly: 5, yearly: 50 },
    { name: 'Extra storage', monthly: 7, yearly: 70 },
    { name: 'Custom themes', monthly: 3, yearly: 30 },
  ];

  const addonPrices = addonList
    .filter((a) => addons.includes(a.name))
    .map((a) => plan.yearly ? a.yearly : a.monthly);

  const total =
    (plan.price || 0) + addonPrices.reduce((acc, cur) => acc + cur, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>{plan.name} ({plan.yearly ? 'Yearly' : 'Monthly'})</span>
          <span>${plan.price}/{plan.yearly ? 'yr' : 'mo'}</span>
        </div>
        {addonList.filter(a => addons.includes(a.name)).map((a) => (
          <div key={a.name} className="flex justify-between text-sm text-gray-600">
            <span>{a.name}</span>
            <span>${plan.yearly ? a.yearly : a.monthly}/{plan.yearly ? 'yr' : 'mo'}</span>
          </div>
        ))}
        <hr />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total}/{plan.yearly ? 'yr' : 'mo'}</span>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={() => dispatch(prevStep())} className="text-gray-600">
          Back
        </button>
        <button onClick={onConfirm} className="bg-green-600 text-white px-4 py-2 rounded">
          Confirm
        </button>
      </div>
    </div>
  );
}
// components/StepIndicator.js
export default function StepIndicator({ currentStep, isSubmitted }) {
  const steps = ['1', '2', '3', '4'];

  return (
    <div className="w-40 bg-blue-900 text-white py-6 px-4 space-y-4 hidden md:block">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
            ${parseInt(step) === currentStep || (isSubmitted && step === '4')
              ? 'bg-blue-300 text-blue-900'
              : 'border border-white text-white'}`}>
            {step}
          </div>
          <div className="uppercase text-sm hidden lg:block">Step {step}</div>
        </div>
      ))}
    </div>
  );
}

