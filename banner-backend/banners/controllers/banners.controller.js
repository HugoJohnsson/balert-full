const BannerModel = require("../models/banners.model");
const UserModel = require("../../users/models/users.model");

exports.getJavaScriptFile = (req, res) => {
  BannerModel.findByUserAndEnabled(req.params.userId)
  .then(result => {
    const bannerText = result.text;
    const fontUrl = result.fontUrl;
    const fontFamily = result.fontFamily;
    const fontSize = result.fontSize;
    const backgroundColor = result.backgroundColor;
    const textColor = result.textColor;
    const dismissable = result.dismissable;
    const enabled = result.enabled;
    const localhost = result.localhost;
    const hasLink = result.hasLink;
    const linkText = result.linkText;
    const linkTo = result.linkTo;
    const linkColor = result.linkColor;
    const openLinkInNewWindow = result.openLinkInNewWindow;

    let host = '';
    if (localhost) {
      host = 'localhost';
    } else {
      host = result.user.domain;
    }

    if(!result.user.hasStartedPlan) {
      res.end('');
    }

    res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    res.end(`
      (function(global) {
          var body = document.getElementsByTagName("body")[0];
          const defaultBodyMarginTop = body.style.marginTop;
          function run(config) {
            var didRender = createBanner();
            if (didRender) {
              console.log("banner has been rendered")
            }
          }

          function createBanner() {
              if (!shouldRender()) {
                  return false;
              }

              var link = document.createElement('link');
              link.setAttribute('rel', 'stylesheet');
              link.setAttribute('type', 'text/css');
              link.setAttribute('href', "${fontUrl}");
              document.head.appendChild(link);

              var banner = document.createElement("div");
              banner.innerHTML = "${bannerText}";
              banner.style.visibility = 'visible';
              banner.style.position = 'relative';
              banner.style.fontFamily = "${fontFamily}";
              banner.style.bottom = 0;
              banner.style.width = '100%';
              banner.style.boxSizing = 'border-box';
              banner.style.padding = "10px 40px 10px 10px";
              banner.style.color = '#fff';
              banner.style.backgroundColor = "${backgroundColor}";
              banner.style.textAlign = 'center';
              banner.style.fontSize = "${fontSize}";
              banner.style.zIndex = 9999;

              if (${hasLink}) {
                  var bannerLink = document.createElement("a");
                  bannerLink.innerText = "${linkText}";
                  bannerLink.style.cursor = 'pointer';
                  bannerLink.style.color = "${linkColor}";
                  bannerLink.setAttribute('href', "${linkTo}");
                  if ("${bannerText}" !== '') {
                    bannerLink.style.marginLeft = '10px';
                  }
                  if (${openLinkInNewWindow}) {
                    bannerLink.setAttribute('target', '_blank');
                  }
                  banner.append(bannerLink);
              }

              if (${dismissable} === true) {
                  var dismissButton = document.createElement("span");
                  dismissButton.innerText = '×';
                  dismissButton.style.cursor = 'pointer';
                  dismissButton.style.position = 'absolute';
                  dismissButton.style.color = '#fff';
                  dismissButton.style.top = '0px';
                  dismissButton.style.right = '30px';
                  dismissButton.style.padding = "10px 0px";
                  dismissButton.addEventListener("click", function(e) {
                      e.currentTarget.parentElement.remove();
                      body.style.marginTop = defaultBodyMarginTop;
                  });
                  banner.append(dismissButton);
              }
              document.body.insertBefore(banner, document.body.childNodes[0]);
              return true;
          }
          function shouldRender(config) {
              if ("${host}" === "localhost" || "${host}" === "127.0.0.1") {
                if (!${enabled} || window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
                    return false;
                }
                return true;
              } else {
                if (!${enabled} || window.location.hostname !== "${host}") {
                    return false;
                }
                return true;
              }
          }
          run();
      })(this);
    `);
  })
  .catch(err => {
    res.status(500).send();
  })
}

exports.insert = (req, res) => {
  BannerModel.createBanner(req.body)
    .then(result => {
      res.status(201).send({ id: result._id });
    })
    .catch(err => res.status(500).send({ error: err }));
};

exports.list = (req, res) => {
  const userId = req.params.userId;
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  BannerModel.list(userId, limit, page).then(result => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  BannerModel.findById(req.params.bannerId).then(result => {
    console.log(result);
    res.status(200).send(result);
  });
};
exports.patchById = (req, res) => {
  BannerModel.patchBanner(req.params.bannerId, req.body)
  .then(result => {
    res.status(200).send({ id: result._id });
  })
  .catch(err => res.status(500).send({error: err}))
};

exports.removeById = (req, res) => {
  BannerModel.removeById(req.params.bannerId).then(result => {
    res.status(200).send({});
  })
  .catch(err => {
    res.status(500).send({ error: err });
  })
};
