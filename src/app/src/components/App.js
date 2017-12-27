import React, { Component } from 'react'
import DashboardLayout from './DashboardLayout'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router'
import Loading from './Loading'
const fiveMin = 900000

class App extends Component {
  static propTypes = {
    current: PropTypes.object,
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    const nameOrId = this.props.match.params.nameOrId
    this.props.dispatch(actions.loadAvailableDashboards(nameOrId))
  }

  setCurrent = (current) => {
    this.props.dispatch(actions.setCurrent(current))
  }

  render() {
    if (this.props.available.length) {
      return this.props.current
        ? <DashboardLayout onCurrentSelected={this.setCurrent} {...this.props} />
        : <Redirect to={{ pathname: '/setup', state: { from: this.props.location } }} />
    }

    return <Loading />
  }
}

const mapStateToProps = (state) => ({
  available: state.dashboards.available,
  current: state.dashboards.current,
})

export default withRouter(connect(mapStateToProps)(App))
