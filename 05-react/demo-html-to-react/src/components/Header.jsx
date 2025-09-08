const links = [
  {href: "#testimonial", name: "Feature" },
  {href: "#friends", name: "Friends" },
  {href: "#signup-form", name: "Sign up!" },
];

const imageSrc = "https://github.com/JohanCodeForFun/algorithms-and-data-structures/blob/main/freecodecamp/ResponsiveWebDesign/product-landing-page/images/ducky-crop-104x48.png?raw=true";

function Header() {
  return ( 
  <header id="header">
      <nav id="nav-bar">
        <img
          className="logo"
          src={imageSrc}
          height="72"
          width="auto"
          alt=""
          id="header-img"
        />
        <ul className="nav-link-container">
          {links.map((link, index) => {
            const {href, name} = link;

            return (
              <li key={index}><a className="nav-link" href={href}>{name}</a></li>
            )}
          )}
        </ul>
      </nav>
    </header>
 );
}

export default Header;