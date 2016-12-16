class CommentView extends React.Component{
	render(){
		return (
			<div className="col-xs-6">
				<h2>
					React入门
				</h2>
				<p>
					ES6+写法：
					<code>
						class CommentView extends React.Component
					</code>
				</p>
				<p>
					ES5写法：
					<code>
						var CommentView = React.createClass
					</code>
				</p>
			</div>
		);
	}
};

jQuery(document).ready(function($) {
	ReactDOM.render(
        <CommentView />,
        document.getElementById('hello')
    );
});