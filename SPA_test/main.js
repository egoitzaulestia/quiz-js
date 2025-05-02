const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

const homeNav = document.getElementById('homeNav');
const aboutNav = document.getElementById('aboutNav');
const contactNav = document.getElementById('contactNav');

// function goAbout() {
//   about.classList.remove('hide');
//   home.classList.add('hide');
//   contact.classList.add('hide');
// }

// const goHome = () => {
//   home.classList.remove('hide');
//   about.classList.add('hide');
//   contact.classList.add('hide');
// };

// const goContact = () => {
//   hideView();
//   contact.classList.remove('hide');
// };

// function hideView2() {
//   home.classList.add('hide');
//   about.classList.add('hide');
//   contact.classList.add('hide');
// }

// aboutNav.addEventListener('click', goAbout);
// homeNav.addEventListener('click', goHome);
// contactNav.addEventListener('click', goContact);

const hideView = () => {
  home.classList.add('hide');
  about.classList.add('hide');
  contact.classList.add('hide');
};

const showView = (view) => {
  hideView();
  view.classList.remove('hide');
};

homeNav.addEventListener('click', () => showView(home));
aboutNav.addEventListener('click', () => showView(about));
contactNav.addEventListener('click', () => showView(contact));
