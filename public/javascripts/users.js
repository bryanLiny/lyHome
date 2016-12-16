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

  	handClick:function(userId){
  		$.get('/users/query?id='+userId, function(data) {
  			var userInfo = data[0];
  			ReactDOM.render(
  				<UserInfoView userInfo={userInfo} />,
  				document.getElementById('userInfo')
  			);
  		});
  	},

	render: function(){
		var clickEvent = this.handClick;
		let pstr = this.state.userList.map((user, index) => {
			return <p onClick={function(){clickEvent(user.id);}} data-id={user.id} key={index}>{user.name}</p>
		})
		return (
			<div>
				{pstr}
			</div>
		);
	}
});

var UserInfoView = React.createClass({
	handChangeName:function(event){
		// this.setState({
		// 	name = event.target.value;
		// });
	},
	handChangeAge:function(event){
		// this.setState({
		// 	age = event.target.value;
		// });
	},
	render:function(){
		var user = this.props.userInfo; 
		return (
			<form role="form" action='/users/updateUser'>
				<input type='hidden' value={user.id} />
				<div className="form-group">
					<label htmlFor="username">Email address</label>
					<input onChange={this.handChangeName} type="text" className="form-control" value={user.name} id="username" placeholder="UserName" />
				</div>
				<div className="form-group">
					<label htmlFor="userage">Password</label>
					<input onChange={this.handChangeAge} type="text" className="form-control" value={user.age} id="userage" placeholder="UserAge" />
				</div>
				<div className="form-group">
					<button type='submit' className='btn btn-success'>提交</button>
					<button type='button' className='btn btn-warning'>删除</button>
				</div>
			</form>
		)
	}
});


jQuery(document).ready(function($) {
	ReactDOM.render(
		<UserListView />,
		document.getElementById('userList')
	);
});