exports.Expires = {
  fileMatch: /^(gif|png|jpg|js|css)$/ig,
  // maxAge: 60 * 60 * 24 * 365
  maxAge: 5
};

exports.Compress = {
  fileMatch: /^(html|js|css)$/ig,
};

exports.Welcome = {
  file: 'index.html'
}