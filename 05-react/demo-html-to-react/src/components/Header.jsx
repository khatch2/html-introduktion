function Header() {
  return ( 
  <header id="header">
      <nav id="nav-bar">
        <img
          class="logo"
          src="https://github.com/JohanCodeForFun/algorithms-and-data-structures/blob/main/freecodecamp/ResponsiveWebDesign/product-landing-page/images/ducky-crop-104x48.png?raw=true"
          height="72"
          width="auto"
          alt=""
          id="header-img"
        />
        <ul class="nav-link-container">
          <li><a class="nav-link" href="#testimonial">Feature</a></li>
          <li><a class="nav-link" href="#friends">Friends</a></li>
          <li><a class="nav-link" href="#signup-form">Sign up!</a></li>
        </ul>
      </nav>
    </header>
 );
}

export default Header;