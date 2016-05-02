import React from 'react'
import Menu from '../view/menu'

class App extends React.Component {
	render () {
		return (
			<div>
				<Menu />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		)
	}
}

App.propTypes = {
	children: React.PropTypes.element.isRequired
}

export default App
