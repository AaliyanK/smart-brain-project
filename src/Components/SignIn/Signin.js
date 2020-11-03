import React from 'react';
import 'tachyons'

// Use tachyons sign in form

// Convert SignIn into state because we will be sending it to frontend
class Signin extends React.Component {
// Create props that are to be updated from the front end (email and password)
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // Save email
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    // Save password (need to update it)
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // WE USE SPECIFIC BACKEND FUNCTION IN SPECIFIC PLACES
    onSubmitSignIn = (event) => {
        fetch('https://limitless-temple-33371.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // Send back the user entered email/password
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
            // Take response data (usually a string with "success" or something)
        }).then(response => response.json()).then(user => {
            if (user.id) {
                this.props.loadUser(user);
                // Only switch routes to home page if we get a success string (custom json message)
                this.props.onRouteChange('home');
            }
        })

        // Once person clicks submit, redirect to home
        
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className ="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center">
                <main className ="pa4 black-80">
                    <div className ="measure">
                        <fieldset id="sign_up" className ="ba b--transparent ph0 mh0">
                        <legend className ="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className ="mt3">
                            <label className ="b db fw6 lh-copy f6" htmlfor="email-address">Email</label>
                            {/* HERE WE WILL USE ONCHANGE TO take EMAIL INFO WHEN USER TYPES IT*/}
                            <input onChange={this.onEmailChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className ="mv3">
                            <label className ="b db fw6 lh-copy f6" htmlfor="password">Password</label>
                            <input onChange={this.onPasswordChange} className ="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className ="">
                            {/* AN ONCLICK is added on this input and the onRouteChange function is triggered to change the state to 'home' a function is defined*/}
                        <input className ="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignIn} type="submit" value="Sign in" />
                        </div>
                        <div className ="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} className ="b f6 link dim black db b--black pointer">Register</p>
    
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin  