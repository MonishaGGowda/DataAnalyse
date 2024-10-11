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
              <a href="#">Profile</a>
              <a href="#">Logout</a>
            </div>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('header-component', HeaderComponent);