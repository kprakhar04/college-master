let dev = false;
let url = "";

if (dev) {
  url = "http://localhost:5000/api";
} else {
  url = "https://college-master.herokuapp.com/api";
}

export default url;
