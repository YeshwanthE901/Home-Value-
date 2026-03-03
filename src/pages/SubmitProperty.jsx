import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getRecommendations, getValueEstimate } from '../utils/recommendations';

const cities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune',
    'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other',
];

const initialForm = {
    ownerName: '',
    city: '',
    propertyType: '',
    squareFeet: '',
    condition: '',
    budget: '',
    yearsOld: '',
};

export default function SubmitProperty() {
    const { addSubmission, setRecommendations, setValueEstimate, setLastFormData } = useApp();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);

    const validate = () => {
        const e = {};
        if (!form.ownerName.trim()) e.ownerName = 'Name is required';
        if (!form.city) e.city = 'Select a city';
        if (!form.propertyType) e.propertyType = 'Select property type';
        if (!form.squareFeet || form.squareFeet <= 0) e.squareFeet = 'Enter valid square feet';
        if (!form.condition) e.condition = 'Select condition';
        if (!form.budget || form.budget <= 0) e.budget = 'Enter valid budget';
        if (!form.yearsOld || form.yearsOld < 0) e.yearsOld = 'Enter valid age';
        return e;
    };

    const handleNext = () => {
        if (step === 1) {
            const e = {};
            if (!form.ownerName.trim()) e.ownerName = 'Name is required';
            if (!form.city) e.city = 'Select a city';
            if (!form.propertyType) e.propertyType = 'Select property type';
            if (Object.keys(e).length > 0) { setErrors(e); return; }
        }
        setErrors({});
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length > 0) { setErrors(e2); return; }

        const recs = getRecommendations({ ...form, budget: parseFloat(form.budget) });
        const estimate = getValueEstimate({ ...form, budget: parseFloat(form.budget) });

        addSubmission({ ...form, squareFeet: parseFloat(form.squareFeet), budget: parseFloat(form.budget), yearsOld: parseInt(form.yearsOld) });
        setRecommendations(recs);
        setValueEstimate(estimate);
        setLastFormData(form);

        navigate('/recommendations');
    };

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });
    const err = (field) => errors[field] ? <span className="field-error">{errors[field]}</span> : null;

    return (
        <div className="page submit-page">
            <div className="page-hero page-hero--sm">
                <h1>Submit Your Property</h1>
                <p>Tell us about your home to get personalised upgrade recommendations</p>
            </div>

            <section className="section">
                <div className="submit-wrap">
                    {/* Progress */}
                    <div className="form-steps">
                        <div className={`form-step ${step >= 1 ? 'active' : ''}`}>
                            <span>1</span> Basic Info
                        </div>
                        <div className="step-line" />
                        <div className={`form-step ${step >= 2 ? 'active' : ''}`}>
                            <span>2</span> Property Details
                        </div>
                    </div>

                    <form className="submit-form" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="form-section">
                                <h3>Basic Information</h3>
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input type="text" placeholder="Ravi Kumar" value={form.ownerName} onChange={set('ownerName')} />
                                    {err('ownerName')}
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <select value={form.city} onChange={set('city')}>
                                            <option value="">Select city</option>
                                            {cities.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                        {err('city')}
                                    </div>
                                    <div className="form-group">
                                        <label>Property Type</label>
                                        <select value={form.propertyType} onChange={set('propertyType')}>
                                            <option value="">Select type</option>
                                            <option>Apartment</option>
                                            <option>Independent House</option>
                                        </select>
                                        {err('propertyType')}
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary btn-block" onClick={handleNext}>
                                    Next: Property Details →
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-section">
                                <h3>Property Details</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Square Feet</label>
                                        <input type="number" placeholder="e.g. 1200" value={form.squareFeet} onChange={set('squareFeet')} min="100" />
                                        {err('squareFeet')}
                                    </div>
                                    <div className="form-group">
                                        <label>Age of Property (years)</label>
                                        <input type="number" placeholder="e.g. 10" value={form.yearsOld} onChange={set('yearsOld')} min="0" />
                                        {err('yearsOld')}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Current Condition</label>
                                    <div className="radio-group">
                                        {['Poor', 'Average', 'Good'].map((c) => (
                                            <label key={c} className={`radio-btn ${form.condition === c ? 'selected' : ''}`}>
                                                <input type="radio" name="condition" value={c} checked={form.condition === c} onChange={set('condition')} />
                                                {c}
                                            </label>
                                        ))}
                                    </div>
                                    {err('condition')}
                                </div>
                                <div className="form-group">
                                    <label>Budget for Improvements (₹)</label>
                                    <input type="number" placeholder="e.g. 300000" value={form.budget} onChange={set('budget')} min="10000" />
                                    <small className="form-hint">Enter amount in Rupees (e.g. 300000 = ₹3 Lakh)</small>
                                    {err('budget')}
                                </div>
                                <div className="form-row">
                                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                                    <button type="submit" className="btn btn-primary">Get Recommendations →</button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
}
