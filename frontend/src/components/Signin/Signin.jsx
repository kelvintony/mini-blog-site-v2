import React, { useState } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = {
	email: '',
	password: ''
};

const Signin = () => {
	const [ formData, setFormData ] = useState(initialState);
	const [ isLoading, setisLoading ] = useState(false);

	const navgate = useNavigate();

	const apiUrl = 'http://localhost:5000';

	const authAxios = axios.create({
		baseURL: apiUrl
	});

	const handleSubmit = async () => {
		setisLoading(true);
		await authAxios
			.post('/user/signin', formData)
			.then(function(response) {
				if (response) {
					// localStorage.setItem('task', JSON.stringify(response.data.results));
					setisLoading(false);
					alert('signin succefully');
					console.log(response.data.result);
					// navigate('/');
				}
			})
			.catch(function(error) {
				console.log(error);
			});
		console.log(formData);
	};

	return (
		<div className='signin-container'>
			<div className='post-input-content'>
				<h3 className='blog-header'>Signin</h3>
				<label>
					Email <br />
					<input
						type='text'
						name='email'
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					/>
				</label>{' '}
				<br />
				<label>
					Password <br />
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
				</label>{' '}
				<br />
				<div>
					<button className='btn-submit' type='submit' onClick={handleSubmit}>
						{isLoading && <i className='fa fa-refresh fa-spin' />} Signin
					</button>{' '}
					<br />
					<Link className='btn-links' to='/register'>
						Don't have an account? register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signin;
