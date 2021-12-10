/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 */

/**
 * Define Global Variables
 *
 */
const navBarr = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 */
// build the nav
const createNavBarList = () => {
  sections.forEach((section) => {
    let item = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navBarr.insertAdjacentHTML("beforeend", item);
  });
};
// Add class 'active' to section when near top of viewport
const observeSections = () => {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        let linkActive = navBarr.querySelector(`[data-nav=${entry.target.id}]`);
        if (entry.isIntersecting) {
          entry.target.classList.add("your-active-class");
          linkActive.classList.add("active");
          location.hash = `${entry.target.id}`;
        } else {
          entry.target.classList.remove("your-active-class");
          linkActive.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  return sections.forEach((section) => {
    observer.observe(section);
  });
};
// smooth scrolling
navBarr.addEventListener("click", (evnt) => {
  evnt.preventDefault();
  if (evnt.target.dataset.nav) {
    document
      .getElementById(`${evnt.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${evnt.target.dataset.nav}`;
    }, 150);
  }
});

// Scroll to anchor ID using scrollTO event
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
createNavBarList();
// Scroll to section on link click
// Set sections as active
observeSections();
