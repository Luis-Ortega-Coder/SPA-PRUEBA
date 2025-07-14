import './api.js'; 
import './auth.js';
import { router } from './router.js';


window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);



