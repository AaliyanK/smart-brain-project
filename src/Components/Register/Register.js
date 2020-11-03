import React from 'react';
import 'tachyons'

// Use tachyons sign in form

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }

    // Save email
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    // Save email
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    // Save password (need to update it)
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = (event) => {
        fetch('https://limitless-temple-33371.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // Send back the user entered email/password
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
            // Take response data (usually a string with "success" or something)
        }).then(response => response.json()).then(user => {
            // Also takes care of blank entries
            if (user.id) {
                // To update users and then change route
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })

        // Once person clicks submit, redirect to home
        
    }

    render(){
        return (
            <article className ="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center">
                <main className ="pa4 black-80">
                    <div className ="measure">
                        <fieldset id="sign_up" className ="ba b--transparent ph0 mh0">
                        <legend className ="f1 fw6 ph0 mh0">Register</legend>
                        <div className ="mt3">
                            <label className ="b db fw6 lh-copy f6" htmlfor="email-address">Name</label>
                            <input onChange = {this.onNameChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className ="mt3">
                            <label className ="b db fw6 lh-copy f6" htmlfor="email-address">Email</label>
                            {/* ONCHANGE IS IMPORTANT*/}
                            <input onChange = {this.onEmailChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className ="mv3">
                            <label className ="b db fw6 lh-copy f6" htmlfor="password">Password</label>
                            <input onChange = {this.onPasswordChange}className ="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className ="">
                            {/* AN ONCLICK is added on this input and the onRouteChange function is triggered to change the state to 'home' a function is defined*/}
                        <input className ="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignIn} type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
    
        );
    }


}

export default Register  