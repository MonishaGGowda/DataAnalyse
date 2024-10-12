class HeaderComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
        <header>
          <nav>
            <div class="logo">
              <span>DATA ANALYSE</span>
            </div>
            <div class="nav-links">
              <a href="../home_page/homepage.html">Home</a>
              <a href="../login_page/index.html">Logout</a>
            </div>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('header-component', HeaderComponent);