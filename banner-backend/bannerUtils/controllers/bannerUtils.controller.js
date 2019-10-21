const axios = require('axios');

const GOOGLE_FONTS_API_KEY = 'AIzaSyBNKgnGLp_DxUiQ-EY9DtbSe0XivbJLXPk';

exports.getFonts = (req, res) => {
  axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${GOOGLE_FONTS_API_KEY}`)
    .then(result => {
      const items = result.data.items;
      res.send(items);
    })
    .catch(err => console.log(err))
};
