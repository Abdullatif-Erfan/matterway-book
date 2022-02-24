import React from 'react'
import './menuStyle_bkp.css'

function Menu_bkp() {
  return (
    <div className="menuWrapper">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-red navbar-dark">
          <div className="wrapper"> </div>
          <div className="container-fluid all-show">
            {' '}
            <a className="navbar-brand" href="#">
              Penton <i className="fa fa-codepen" />
            </a>{' '}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {' '}
              <span className="navbar-toggler-icon" />{' '}
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {' '}
                  <a className="nav-link active" aria-current="page" href="#">
                    About us
                  </a>{' '}
                </li>
                <li className="nav-item">
                  {' '}
                  <a className="nav-link" href="#">
                    Products
                  </a>{' '}
                </li>
                <li className="nav-item">
                  {' '}
                  <a className="nav-link" href="#">
                    Services
                  </a>{' '}
                </li>
                <li className="nav-item">
                  {' '}
                  <a className="nav-link" href="#">
                    Events
                  </a>{' '}
                </li>
                <li className="nav-item">
                  {' '}
                  <a className="nav-link" href="#">
                    contact
                  </a>{' '}
                </li>
                <li className="nav-item">
                  {' '}
                  <a className="nav-link" href="#">
                    <i className="fa fa-search" />
                  </a>{' '}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Menu_bkp
