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

  	clickUserDetail:function(userId){
  		var userInfoBox = document.getElementById('userInfo'),
  			btnGroupBox = document.getElementById('btnGroup');
  		// 重新渲染数据DOM
  		// React 数据并非双向绑定框架，数据改变，不会重新渲染DOM
  		// React 根据对比新旧树的结构变化，两个树一样，则不会重新渲染了
  		// userInfoBox.innerHTML = '' 是为了简单的能在user信息改变时，数据重新填充
  		// 网上有用reactMixin插件解决数据绑定问题，但这里简单实现就未采取该方法
  		// ES6 使用 LinkedStateMixin 解决
  		userInfoBox.innerHTML = "";
  		btnGroupBox.innerHTML = "";
  		$.get('/users/query?id='+userId, function(data) {
  			var userInfo = data[0];
  			ReactDOM.render(
  				<UserInfoEditView userInfo={userInfo} />,
  				userInfoBox
  			);
  		});
  	},

  	clickAddUser: function(){
  		var userInfoBox = document.getElementById('userInfo'),
  			btnGroupBox = document.getElementById('btnGroup');
  		ReactDOM.render(
			<UserInfoAddView />,
			userInfoBox
		);
		btnGroupBox.innerHTML = '';
  	},

	render: function(){
		var clickEvent = this.clickUserDetail;
		let pstr = this.state.userList.map((user, index) => {
			return <p onClick={function(){clickEvent(user.id);}} data-id={user.id} key={index}>{user.name}</p>
		})
		return (
			<div>
				{pstr}
				<button onClick={this.clickAddUser} type='button' className='btn btn-info' >新增</button>
			</div>
		);
	}
});

var UserInfoEditView = React.createClass({
	clickDelUserInfo:function(){
		var userId = this.props.userInfo.id;
		$.get('/users/deleteUser?id='+userId, function(data) {
			var result = data;
			if (result.code === 200) {
				alert(result.msg);
				location.reload(); 
			};
		});
	},
	render:function(){
		var user = this.props.userInfo || {};
		return (
			<form id="userForm" role="form" method='POST' action='/users/updateUser'>
				<input type='hidden' name='id' defaultValue={user.id} />
				<div className="form-group">
					<label htmlFor="username">用户名：</label>
					<input type="text" name='name' className="form-control" defaultValue={user.name} id="username" placeholder="UserName" />
				</div>
				<div className="form-group">
					<label htmlFor="userage">年龄：</label>
					<input type="text" name='age' className="form-control" defaultValue={user.age} id="userage" placeholder="UserAge" />
				</div>
				<div className="form-group">
					<button type='submit' className='btn btn-success'>修改</button>
					<button onClick={this.clickDelUserInfo} type='button' className='btn btn-warning'>删除</button>
				</div>
			</form>
		)
	}
});

var UserInfoAddView = React.createClass({
	render:function(){	
		return (
			<form id="userForm" role="form" method='get' action='/users/addUser'>
				<div className="form-group">
					<label htmlFor="username">用户名：</label>
					<input type="text" name='name' className="form-control" id="username" placeholder="UserName" />
				</div>
				<div className="form-group">
					<label htmlFor="userage">年龄：</label>
					<input type="text" name='age' className="form-control" id="userage" placeholder="UserAge" />
				</div>
				<div>
					<button type='submit' className='btn btn-success'>保存</button>
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