import React from 'react'
import '../../css/section/Header.css'

const Header = () => {
  return (
    <header id="header">
      <h2 className="header-title">
        Learn a <span className="highlight-primary">language</span> like a native
      </h2>
      <button className="header-btn">
        <a className="header-btn-link" href="#get_started">
          Start now
        </a>
      </button>
    </header>
  )
}

export default Header