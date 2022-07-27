import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Link } from 'react-router-dom';



const apiUrl = 'http://localhost:5000';

const authAxios = axios.create({
	baseURL: apiUrl
});



const Posts = () => {
	const [ posts, setPosts ] = useState([]);
	const [ loading, setLoading ] = useState(true);
 

	
	useEffect(() => {
            const getPosts = async () => {
                setLoading(true);
                await authAxios 
                    .get(`/posts`)
                    .then((res) => {
                        setPosts(res.data);
                        // localStorage.setItem('tasks', JSON.stringify(res.data.results));
                        setLoading(false);
                        // console.log(posts);
                        // return res.data
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        }
		getPosts(); 

		
	}, []);

   
    const deletePost=async(id)=>{
      await authAxios
        .delete(
            `/posts/${id}`
        )  
        .then((res) => {
            alert('Deleted successfully');
        });

		setPosts(posts=>posts.filter(post=>post._id!==id)) 
		//this simply means return all the post except the one that the id is equal to the payload id


    }

	const likePost=async(id)=>{
		await authAxios
			.put(`/posts/${id}/likepost`)
			.then(function(response) {
				if (response) {
					// navigate('/');

					setPosts(posts.map((post)=>post._id===id?response.data:post))

				}
			})
			.catch(function(error) {
				console.log(error);
			});

	}

	return (
		<div className='post-card'>
			{loading && <h3>loading...</h3>}
			{!loading &&
				posts.map((post, key) => {
					return (
						<div key={post?._id} className='post-card-box'>
							<img className='post-card-img' src={post.selectedFile} alt='pix-1' />
							<h4>{post?.creator}</h4>
							<p>{moment(post.createdAt).fromNow()}</p>
							<p>{post?.tags.map((tag) => `#${tag} `)}</p>
							<h4>{post?.title}</h4>
							<p>{post?.message} </p>
							<div className='like-post'>
								<button className='like-post-box-1 btn-clear-post' onClick={()=>{likePost(post._id)}}>
									<img
										src='https://img.icons8.com/material-rounded/24/000000/facebook-like--v1.png'
										alt='pix-2'
									/>
									<p>{post?.likeCount} likes</p>
								</button>
                                <div className='btn-post'>
                                    <button className='btn-delete-post' onClick={() => {
										if (window.confirm('Are you sure you wish to delete this item?'))
											deletePost(post._id);
									}}>delete</button>
                                    <Link to={`posts/editpost/${post._id}`}  className='btn-clear-post btn-links'>edit</Link>
                                </div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Posts;
