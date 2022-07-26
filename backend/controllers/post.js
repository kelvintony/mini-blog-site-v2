import postModel from '../models/post.js';

//get posts
export const getPosts = async (req, res) => {
	try {
		const posts = await postModel.find();

		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

//create posts
export const createPost = async (req, res) => {
	const post = req.body;

	const newPost = new postModel(post);

	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

//delete post
export const deletePost = async (req, res) => {
	const { id } = req.params;

	try {
		await postModel.findByIdAndRemove(id);
		res.json({ message: 'Post deleted successfully.' });
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

//update post
export const updatePost = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };
		const data = await postModel.findByIdAndUpdate(id, updatedData, options);
		res.status(200).json({ message: 'updated successfully', data });
	} catch (error) {
		res.status(500).json({ message: 'something went wrong' });
	}
};

//get single post
export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await postModel.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	// if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	try {
		const post = await postModel.findById(id);

		const updatedPost = await postModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

		res.json(updatedPost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
