class CommentView extends React.Component{
	// 初始化
	constructor(props) {
		super(props);
		this.state = {
			autoPlay: props.autoPlay || false,
			maxLoops: props.maxLoops || 3,
			postName: props.postName || "linyu"
		};
	}
	render(){
		return(
			<div className='commentBox'>
				<p>{this.state.postName}</p>
			</div>
		)
	}
	componentWillMount() {

	}
};

jQuery(document).ready(function($) {
	ReactDOM.render(
		<CommentView />,
		document.getElementById('content')
	);
});