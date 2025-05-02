const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

const homeNav = document.getElementById('homeNav');
const aboutNav = document.getElementById('aboutNav');
const contactNav = document.getElementById('contactNav');

// const goHome = () => {
//   hideView();
//   home.classList.remove('hide');
// };

// const goAbout = () => {
//   hideView();
//   about.classList.remove('hide');
// };

// const goContact = () => {
//   hideView();
//   contact.classList.remove('hide');
// };

const hideView = () => {
  home.classList.add('hide');
  about.classList.add('hide');
  contact.classList.add('hide');
};

const showView = (view) => {
  hideView();
  view.classList.remove('hide');
};

// homeNav.addEventListener('click', goHome);
// aboutNav.addEventListener('click', goAbout);
// contactNav.addEventListener('click', goContact);

homeNav.addEventListener('click', () => showView(home));
aboutNav.addEventListener('click', () => showView(about));
contactNav.addEventListener('click', () => showView(contact));
