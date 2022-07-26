import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
	const [ post, setPost ] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
	const [ isLoading, setisLoading ] = useState(false);

	const navigate = useNavigate();

	const apiUrl = 'http://localhost:5000';

	const authAxios = axios.create({
		baseURL: apiUrl
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		await authAxios
			.post('/posts', post)
			.then(function(response) {
				if (response) {
					// localStorage.setItem('task', JSON.stringify(response.data.results));
					setisLoading(false);
					alert('submitted succefully');
					navigate('/');
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	const handleClear = () => {};

	return (
		<section className='post-input'>
			<div className='post-input-content'>
				<h3 className='blog-header'>Create A Blog</h3>
				<label>
					Creator <br />
					<input
						type='text'
						name='creator'
						value={post.creator}
						onChange={(e) => setPost({ ...post, creator: e.target.value })}
					/>
				</label>{' '}
				<br />
				<label>
					Tile <br />
					<input
						type='text'
						name='title'
						value={post.title}
						onChange={(e) => setPost({ ...post, title: e.target.value })}
					/>
				</label>{' '}
				<br />
				<label>
					Message <br />
					<textarea
						name='message'
						id=''
						cols='30'
						rows='10'
						value={post.message}
						onChange={(e) => setPost({ ...post, message: e.target.value })}
					/>
				</label>{' '}
				<br />
				<label>
					Tag <br />
					<input
						type='text'
						name='tag'
						value={post.tags}
						onChange={(e) => setPost({ ...post, tags: e.target.value.split(',') })}
					/>
				</label>{' '}
				<br />
				<div>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) => setPost({ ...post, selectedFile: base64 })}
					/>
				</div>
				<span>no file chosen</span> <br />
				<div>
					<button className='btn-submit' type='submit' onClick={handleSubmit} disabled={isLoading}>
						{isLoading && <i className='fa fa-refresh fa-spin' />} Submit
					</button>{' '}
					<br />
					<button className='btn-clear' onClick={handleClear}>
						Clear
					</button>
				</div>
			</div>
		</section>
	);
};

export default Form;
