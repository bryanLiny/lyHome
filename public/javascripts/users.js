var UserListView = React.createClass({

	getInitialState:function(){
		return {
			userList : []
		}
	},

	componentDidMount:function(){
		this.serverRequest = $.get('/users/queryAll', function(data) {
			var users = data;
			this.setState({
				userList: users
			});
		}.bind(this));
	},

	componentWillUnmount: function() {
    	this.serverRequest.abort();
  	},

	render: function(){
		let pstr = this.state.userList.map((user, index) => {
			return <p data-id={user.id} key={index}>{user.name}</p>
		})
		return (
			<div>
				{pstr}
			</div>
		);
	}
});


jQuery(document).ready(function($) {
	ReactDOM.render(
		<UserListView />,
		document.getElementById('userList')
	);
});