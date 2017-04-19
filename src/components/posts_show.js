import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
				.then(() => { 	
					this.context.router.push('/');	
				});	
	}

	render() {
		const { post } = this.props;

		// Spinner while loading
		if (!post ) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<br/>
				<h3>{post.title}</h3><br/>
				<h6>Categories: {post.categories}</h6><br/>
			 	<p>{post.content}</p><br />
				<Link to="/"><button className="btn btn-primary">
					Back to Index
				</button></Link>
				<button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
			</div>
		);
	}	
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);