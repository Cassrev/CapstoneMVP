import { useState } from "react";

export const RadioBeans = () => {
	const [bean, setBean] = useState({});

	// this function will be called when a radio button is checked
	const handleChange = (e) => {
		setBean(e.target.value);
	}
	
	return (
		<div style={
			{ padding: 50 }
		}>
			<form>
				<fieldset>
					<legend>Select your age</legend>

					<input
						type="radio"
						name="bean"
						id='age-range-1'
						value="0-17"
						onChange={handleChange}
						checked={bean === '0-17'} />
					<label htmlFor="age-range-1">Under 18</label><br />

					<input
						type="radio"
						name="age"
						id='age-range-2'
						value="18-24"
						onChange={handleChange}
						checked={bean === '18-24'} />
					<label htmlFor="age-range-2">18-24</label><br />

					<input
						type="radio"
						name="age"
						id='age-range-3'
						value="25-34"
						onChange={handleChange}
						checked={bean === '25-34'} />
					<label htmlFor="age-range-3">25-34</label><br />

					<input
						type="radio"
						name="age"
						id='age-range-4'
						value="35-44"
						onChange={handleChange}
						checked={bean === '35-44'} />
					<label htmlFor="age-range-4">35-44</label><br />

					<input
						type="radio"
						name="age"
						id='age-range-5'
						value="45-54"
						onChange={handleChange}
						checked={bean === '45-54'} />
					<label htmlFor="age-range-5">45-54</label><br />

					<input
						type="radio"
						name="age"
						id='age-range-6'
						value="55-64"
						onChange={handleChange}
						checked={bean === '55-64'} />
					<label htmlFor="age-range-6">55-64</label><br />

					<input
						type="radio"
						name="age"
						id='age-range-7'
						value="65+"
						onChange={handleChange}
						checked={bean === '65+'} />
					<label htmlFor="age-range-7">65+</label><br />
				</fieldset>
			</form>
			<h1>
				{
					bean === undefined ?
						'Please select your age'
					:
						`Your age: ${bean}`
				}
			</h1>
		</div>
	);
}
