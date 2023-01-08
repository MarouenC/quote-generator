import React from 'react';
import './App.css';
import axios from 'axios';
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      quote :"",
      author:"",
      bgcolor:""
    }
  }
  componentDidMount(){
     this.fetchQuote();
   }
   
   fetchQuote =() =>{
    axios.get('https://api.quotable.io/random')
    .then((response)=>{
      const color =Math.floor(Math.random()*12);
      const {content} = response.data;
      const{author }= response.data;
      this.setState(()=>({
        quote : content,
        author : author,
        bgcolor : colors[color]
      }))
    })
    .catch((error)=>{
      console.log(error);
    })
   }
  render(){
    return(
      <div className="app row justify-content-center">
        <div id="quote-box" className="card fade-transition">
          <h1 id="text px-3" className="fade-transition" style={{ color: this.state.bgcolor }}> <i class="fa fa-quote-left"></i>{this.state.quote}</h1>
          <h6 id="author" className="text-end"><cite className="fade-transition" style={{ color: this.state.bgcolor }}>{this.state.author}</cite></h6>
          <div className="row py-3">
            <div className ="col-6">
              <a className="btn  mx-1 fade-transition" id ="tweet-quote" style={{ backgroundColor: this.state.bgcolor }}href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)}><i className="bi bi-twitter"></i></a >
              <a className="btn  fade-transition" style={{ backgroundColor: this.state.bgcolor }}href={"https://www.facebook.com/sharer/sharer.php?u=http://example.com" + encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)}><i className="bi bi-facebook"></i></a >
            </div>
            <div className="col-6">
              <button className="button fade-transition" onClick={this.fetchQuote}><span style={{ color: this.state.bgcolor }}>Another Quote!</span></button>
            </div>
          </div>
          <div className="pt-2"><a href="https://codepen.io/marouenC/"><span>by Marouen</span></a></div>
        </div>
      </div>
    )
  };
}

export default App;