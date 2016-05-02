import React from 'react'
import { Link } from 'react-router'

class Menu extends React.Component {
	render () {
		return (
			<div className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">ConCaVa GUI</Link>
						<button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="navbar-collapse collapse" id="navbar-main">
						<ul className="nav navbar-nav">
							<li><Link to="test">Test</Link></li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Menu
