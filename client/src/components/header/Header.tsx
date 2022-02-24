import React, { Fragment } from 'react'
import './headerStyle.css'
import Menu from './menu/Menu'

const Header = () => (
  <Fragment>
    <div className="headerWrapper pt-30">
      <div className="container">Place the banner</div>
    </div>
    <Menu />
  </Fragment>
)

export default Header
