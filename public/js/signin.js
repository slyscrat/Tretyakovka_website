class Form extends React.Component {
            constructor(props) {
                super(props);
                var email = props.email;
                var password = props.password;
                this.state = {email: email, password: password};
               
                this.onEmailChange = this.onEmailChange.bind(this);
                this.onPasswordChange = this.onPasswordChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }
            
            onPasswordChange(event) {
                var val = event.target.value;
                this.setState({password: val});
            }
            
            onEmailChange(event) {
            var val = event.target.value;
            this.setState({email: val});
            }
        
            handleSubmit(event) {
            }
        
            render() {
                return (
                        <form id="signin" name="signin" method="post" action="signin" align="center">
                           
                            <input class="text" name="email" type="text"
                             value={this.state.email} placeholder="Email"
                             onChange={this.onEmailChange} /><br/>
                            
                            <input name="password" type="password"
                             value={this.state.password} placeholder="Password"
                             onChange={this.onPasswordChange} /><br/>
                            <input type="submit" value="Войти"/>
                         </form>
                     );
            }
        }
        
		ReactDOM.render(
			<Form />,
			document.getElementById('root')
		);