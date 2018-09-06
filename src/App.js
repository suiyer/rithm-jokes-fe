import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state={
    members:[],
    topjokes:[],
    bottomjokes:[]
  };
  handleUpvote = jokeId => {
    console.log(jokeId + ' was upvoted.');
    axios.post("http://localhost:8080/jokes/" + jokeId + "/vote").then(res =>
    {let updatedJokes = this.state.members.map(member => {
      if (member.id === jokeId) {
        return Object.assign({}, member, {
          upvotes: member.upvotes+1
        });
      } else {
        return member;
      }
    });
    this.setState({members:updatedJokes});
    }).then(() => {this.getTop5()}).then(() => {this.getBottom5()});
  }

  handleDownvote = jokeId => {
    console.log(jokeId + ' was downvoted.');
    axios.post("http://localhost:8080/jokes/" + jokeId + "/vote?isUpvote=false").then(res =>
    {let updatedJokes = this.state.members.map(member => {
      if (member.id === jokeId) {
        return Object.assign({}, member, {
          downvotes: member.downvotes+1
        });
      } else {
        return member;
      }
    });
    this.setState({members:updatedJokes});
    }).then(() => {this.getTop5()}).then(() => {this.getBottom5()});
  }

  componentDidMount() {
    axios.get("http://localhost:8080/jokes").then(res => {
      this.setState({
        members: res.data.jokes
      });
    }).then(() => {this.getTop5()}).then(() => {this.getBottom5()});
  }

  getTop5 = () => {
    axios.get("http://localhost:8080/topjokes").then(res => {
      this.setState({
        topjokes: res.data.jokes
      });
    });
  }

  getBottom5 = () => {
    axios.get("http://localhost:8080/bottomjokes").then(res => {
      this.setState({
        bottomjokes: res.data.jokes
      });
    });
  }

  refreshRandom = () => {
    axios.get("http://localhost:8080/jokes").then(res => {
      this.setState({
        members: res.data.jokes
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Joke Voting App</h1>
        </header>
      
        <div>        
          <h2 className="App-title">Top 5 Jokes</h2>
          <div className="row">
            {this.state.topjokes.map((joke, index) => <Joke 
              key={index}
              text={joke.text}
              onUpvote={this.handleUpvote}
              onDownvote={this.handleDownvote}
              upvotes={joke.upvotes}
              downvotes={joke.downvotes}
              id={joke.id}/>)}
          </div>
        </div>
        <div>
          <h2 className="App-title">Bottom 5 Jokes</h2>
          <div className="row">
            {this.state.bottomjokes.map((joke, index) => <Joke 
              key={index}
              text={joke.text}
              onUpvote={this.handleUpvote}
              onDownvote={this.handleDownvote}
              upvotes={joke.upvotes}
              downvotes={joke.downvotes}
              id={joke.id}/>)}
            </div>
        </div>
        <div>
          <h2 className="App-title">Random Jokes 
          <button className="btn btn-primary" onClick={this.refreshRandom}>Refresh This List</button></h2> 
          <div className="row">
            {this.state.members.map((joke, index) => <Joke 
              key={index}
              text={joke.text}
              onUpvote={this.handleUpvote}
              onDownvote={this.handleDownvote}
              upvotes={joke.upvotes}
              downvotes={joke.downvotes}
              id={joke.id}/>)}
          </div>
        </div>
      </div>
    );
  }
}

class Joke extends Component {
  handleUpvote = event => this.props.onUpvote(this.props.id);
  handleDownvote = event => this.props.onDownvote(this.props.id);
  render() {
    return(
      <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-body"> 
            {this.props.text} 
          </div>
          <div className="panel-footer">
            <button className="btn btn-success" onClick={this.handleUpvote}>Upvote</button><span className="votes">{this.props.upvotes} </span> Upvotes
            <button className="btn btn-danger" onClick={this.handleDownvote}>Downvote</button><span className="votes">{this.props.downvotes} </span> Downvotes
          </div>
        </div>
      </div>
    );
  }
}

export default App;
