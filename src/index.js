import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';

class ErrorBoundary extends Component{
  constructor(props){
      super(props);
      this.state={hasError:false};
  }
  componentDidCatch(error,info){
      this.setState({hasError:true});
  }
  render(){
      if(this.state.hasError){
       return <h1>ERROR. Something went wrong.</h1>;
      }
      return this.props.children;
  }
}

ReactDOM.render(
<ErrorBoundary>
<MainApp />
</ErrorBoundary>
, document.getElementById('root'));

    




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

