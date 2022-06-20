export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='/#page-top'>
            Anime-Gadgets
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='/#features' className='page-scroll'>
                Nowe Figurki
              </a>
            </li>
            <li>
              <a href='/shop' className='page-scroll'>
                Sklep
              </a>
            </li>
            <li>
              <a href='/#contact' className='page-scroll'>
                Contact
              </a>
            </li>
            
            <li>
              <a href='/register' className='page-scroll'>
                Register
              </a>
            </li>
            <li>
              <a href='login' className='page-scroll'>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
