class Form extends React.Component {
	
	constructor(props) {
		super(props);
		var email = props.email;
		var emailIsValid = this.validateEmail(email);
		var password = props.password;
		var confirm = props.confirm;
		var passwordIsValid = this.validatePassword(password);
		var firstname = props.firstname;
		this.state = {email: email, password: password, emailValid: emailIsValid, passwordValid: passwordIsValid, firstname: firstname, confirm: confirm, confirmValid: true, submitInfo: ""};
	   
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onFirstnameChange = this.onFirstnameChange.bind(this);
		this.onConfirmChange = this.onConfirmChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	validatePassword(password){
		if (/\s/.test(password))
			return false;
		if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\w).{8,}/.test(password))
			return true;
		return false;
	}
	
	validateEmail(email) {
		if (/^[A-Za-z\d._-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,4}$/.test(email))
			return true;
		return false;
	}
	
	onPasswordChange(event) {
		var val = event.target.value;
		var valid = this.validatePassword(val);
		this.setState({password: val, passwordValid: valid});
		if (event.target.value == this.state.confirm)
			this.setState({confirmValid: true});
		else
			this.setState({confirmValid: false});
	}
	
	onConfirmChange(event){
		this.setState({confirm: event.target.value});
		if (event.target.value == this.state.password)
			this.setState({confirmValid: true});
		else
			this.setState({confirmValid: false});
	}
	
	onFirstnameChange(event) {
		var val = event.target.value;
		this.setState({firstname: val});
	}
	
	onEmailChange(event) {
	var val = event.target.value;
	var valid = this.validateEmail(val);
	this.setState({email: val, emailValid: valid});
	}

	handleSubmit(event) {
		if (this.state.emailValid === false)
		{
			alert("Invalid email");
			event.preventDefault();
			return;
		}
		if (this.state.passwordValid === false)
		{
			event.preventDefault();
			alert("Invalid password")
			return;
		}
		if (this.state.confirmValid === false)
		{
			event.preventDefault();
			alert("Invalid confirm")
			return;
		}
	}

	render() { 
		var confirmColor = this.state.confirmValid === true ? "✓":"✖";
		var passwordColor = this.state.passwordValid === true ? "✓":"✖";
		var emailColor = this.state.emailValid === true ? "✓":"✖";
		return (
				<form id="signup" name="signup" method="post" onSubmit={this.handleSubmit} action="/signup" align="center">
				   
					<h4>{this.submitInfo}</h4>
					<input class="text" name="email" type="email"
					 value={this.state.email} placeholder="Email"
					 onChange={this.onEmailChange} required/><br/>
					 
					<input class="text" type="text" name="name" 
					value={this.state.firstname} placeholder="Name"
					onChange={this.onFirstnameChange} required/><br/>
				
					<input name="password" type="password" id="password"
					 value={this.state.password} placeholder="Password"
					 onChange={this.onPasswordChange} required/><br/>
					 					 
					<input name="confirm" type="password" id="confirm_password"
					 value={this.state.confirm} placeholder="Confirm password"
					 onChange={this.onConfirmChange} required/><br/>
					 
					 <h1>{emailColor} - {passwordColor} - {confirmColor}</h1>
					 
					 <input class="btn" type="submit" value="Зарегистрироваться" id="submit" />
				 </form>
			 );
	}
}

ReactDOM.render(
	<Form />,
	document.getElementById('root')
);