/*  
 *  Helper function that obtains parameters from the has of the URL, returns object
 */

const getHashParams = () => {
  var hashParams = {};
   var e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export default getHashParams;