import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

// For background
const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  // box will have bounding box parameters
  box: {},
  // Keep track of where we are on the page - initially itll be sigin
  route: 'signin',
  isSignedIn: false,
  // When registering, these will update
  user: {
    id:'',
    name:'',
    email: '',
    entries: 0,
    joined: ''

  }
}

// Create states that have actions
class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  // To register user - pass below in <Register>
  loadUser = (data) => {
    this.setState({
      user: {
        id:data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
  }

  // CONNECT TO BACKEND - need cors
  componentDidMount() {
    fetch('https://limitless-temple-33371.herokuapp.com/').then(response => response.json()).then(console.log)
  }

  // For bounding box: Call function, can have multiple faces
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    // Grabbing from FaceRecognition.js
    const image = document.getElementById('inputimage')

    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width-(clarifaiFace.right_col * width),
      bottomRow: height-(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  // For url:
  onInputChange = (event) => {
    // Whatever the link is, it will be saved as a STATE
    this.setState({input:event.target.value})
  }

  // When someone clicks a button, this happens: CALL BACKEND API HERE
  onButtonSubmit = () => {
    // Image url is saved by inputChange
    this.setState({imageUrl: this.state.input})
    
    // Input is a URL! API uses url NEEDS TO BE INPUT
    // We want regions from face detect model\
    fetch('https://limitless-temple-33371.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              // Send back the user entered email/password
              input: this.state.input,
          })
        })
        .then(response => response.json())
        .then(response => {
          if (response) { // IF WE GET A REPONSE, CALL THE API
            fetch('https://limitless-temple-33371.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                // Send back the user entered email/password
                id: this.state.user.id,
            })
          }).then(response=>response.json()).then(count => { 
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
      })
      // The facelocation returns a box object to another function that sets the box as a STATE 
  }

  // This function basically changes the state to HOME, refer to the if statement all the way below
  // If anything but home is set as a state to "route", the normal home page will be displayed
  onRouteChange = (route) => {
    // User will pass in route:
    if (route==='signout'){
      // If user signs out, refresh all states to the original one so no data is saved
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">

        <Particles className='particles'
        params={particlesOptions}/>

        {/* Build Components: */}

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        {/* This is basically saying, if the constructor has route set as signin then return signin component only, otherwise return all the other */}
        { route === 'home' 
        // If the signin button is pressed, the route will change to "home" and homepage will be returned
        // Logo, rank..
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              {/* Create Prop: */}
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
  );}
}

export default App;
