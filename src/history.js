/*	
 *	This file is used to allow for programmatic navigation, it allows us to access
 *	history much easier because we do not have to use Browser Router and can instead
 *	use our own Router obj
 */

import {createBrowserHistory} from 'history'; 
export default createBrowserHistory();