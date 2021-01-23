import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import { connect } from 'react-redux'
import { setSearchField, requestRobots } from '../actions'

// what piece of state i must to listen
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots:state.requestRobots.robots,
    isPending: state.requestRobots.isPenfding,
    error: state.requestRobots.error,
  }
}
// return object that contains our actions (I'am interested in this actions)
const mapDispatchToProps = dispatch => {
  return {    
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: ()=> dispatch(requestRobots())
  }
}

class App extends Component {
 
  componentDidMount () {
    this.props.onRequestRobots();
  }

  render () {
    
    const { searchField, onSearchChange, robots, isPending } = this.props;
console.log(this.props);
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return isPending
      ? <h1>Loading...</h1>
      : <div className='tc'>
        <h1 className='f2'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// connect is higher-order function..function thats return another function and run App
