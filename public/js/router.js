import { auth } from './auth.js';
import {
  showLogin,
  showRegister,
  showDashboard,
  showCourses, 
  showCreateCourse, 
  showEditCourse,
  renderNotFound 
} from './views.js';


const routes = {
  '#/login': showLogin, 
  '#/register': showRegister,
  '#/dashboard': showDashboard,
  '#/dashboard/courses': showCourses,
  '#/dashboard/courses/create': showCreateCourse,
  
};


export function router() {
  const path = location.hash || '#/login';
  const user = auth.getUser();

  
  if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
    location.hash = '#/login';
    return;
  }


  if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
    location.hash = '#/dashboard';
    return;
  }


  if (path.startsWith('#/dashboard/courses/edit/')) {
    showEditCourse(); 
    return;
  }


  const view = routes[path];
  if (view) {
    view();
  } else {
    renderNotFound();
  }
}


