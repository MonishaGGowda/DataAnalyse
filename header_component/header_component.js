class HeaderComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
        <header>
          <nav>
            <div class="logo">
              <span>DOCUSENSE</span>
            </div>
            <div class="nav-links">
              <a href="../home_page/homepage.html">Home</a>
              <a href="../login_page/loginpage.html">Logout</a>
            </div>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('header-component', HeaderComponent);