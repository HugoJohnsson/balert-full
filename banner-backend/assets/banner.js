(function(global) {
    // const eventUrl = 'https://bannerjs.com/event';
    var body = document.getElementsByTagName("body")[0];
    const defaultBodyMarginTop = body.style.marginTop;
    function run(config) {
        for (var i = 0; i < config.banners.length; i++) {
            var didRender = createBannerFromConfig(config.banners[i]);
            if (didRender) {
                // sendEvent({
                //     event: 'load',
                //     entity: 'app',
                //     id: config.appId,
                //     host: window.location.hostname,
                //     path: window.location.pathname,
                // })
            }
        }
    }
    function createBannerFromConfig(config) {
        if (!shouldRender(config)) {
            return false;
        }

        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', config.css.fontUrl);
        document.head.appendChild(link);

        var banner = document.createElement("div");
        banner.innerHTML = config.text;
        banner.style.visibility = 'visible';
        banner.style.position = config.css.position;
        banner.style.fontFamily = config.css.fontFamily;
        if (config.css.location === 'top') {
            if (config.css.position === 'fixed') {
                banner.style.top = 0;
                var body = document.getElementsByTagName("body")[0];
                body.style.marginTop = "60px";
            }
        } else {
            banner.style.bottom = 0;
        }
        if (config.css.position === 'fixed') {
            if (config.css.top !== undefined) {}
            if (config.css.bottom !== undefined) {
                banner.style.position = config.css.position;
                banner.style.bottom = config.css.bottom;
            }
        }
        banner.style.width = config.css.width;
        banner.style.padding = "10px 40px 10px 10px";
        banner.style.color = config.css.textColor;
        banner.style.backgroundColor = config.css.backgroundColor;
        banner.style.textAlign = config.css.textAlign;
        banner.style.fontSize = config.css.fontSize;
        banner.style.zIndex = 9999;
        if (config.css["fontFamily"] != undefined) {
            banner.style.fontFamily = config.css.fontFamily;
        }
        if (config.dismissable === true) {
            var dismissButton = document.createElement("span");
            dismissButton.innerText = '×';
            dismissButton.style.cursor = 'pointer';
            dismissButton.style.position = 'absolute';
            dismissButton.style.color = '#fff';
            dismissButton.style.top = '0px';
            dismissButton.style.right = '70px';
            dismissButton.style.padding = "10px 0px";
            dismissButton.addEventListener("click", function(e) {
                e.currentTarget.parentElement.remove();
                body.style.marginTop = defaultBodyMarginTop;
                // sendEvent({
                //     event: 'dismiss',
                //     entity: 'banner',
                //     id: config.id,
                //     host: window.location.hostname,
                //     path: window.location.pathname,
                // })
            });
            banner.append(dismissButton);
        }
        document.body.insertBefore(banner, document.body.childNodes[0]);
        sendEvent({
            event: 'view',
            entity: 'banner',
            id: config.id,
            host: window.location.hostname,
            path: window.location.pathname,
        });
        return true;
    }
    function shouldRender(config) {
        if (!config.enabled) {
            return false;
        }
        var shouldRenderFromPages = shouldRenderPages(config);
        if (!shouldRenderFromPages) {
            return false;
        }
        var shouldRenderFromSegments = shouldRenderSegments(config);
        if (!shouldRenderFromSegments) {
            return false;
        }
        return true;
    }
    function shouldRenderPages(config) {
        if (config.pages && config.pages.only && config.pages.only.length > 0) {
            var hasMatch = false;
            var currentPath = window.location.pathname;
            for (var i = 0; i < config.pages.only.length; i++) {
                var page = config.pages.only[i];
                if (page.type == 'exact_match') {
                    var match = currentPath.match('^' + page.value + '$');
                    if (match && currentPath === match[0]) {
                        hasMatch = true;
                    }
                }
                if (page.type == 'contains') {
                    var match = currentPath.match(page.value);
                    if (match && page.value === match[0]) {
                        hasMatch = true;
                    }
                }
            }
            if (!hasMatch) {
                return false;
            }
        }
        if (config.pages && config.pages.exclude && config.pages.exclude.length > 0) {
            var hasMatch = false;
            var currentPath = window.location.pathname;
            for (var i = 0; i < config.pages.exclude.length; i++) {
                var page = config.pages.exclude[i];
                if (page.type == 'exact_match') {
                    var match = currentPath.match('^' + page.value + '$');
                    if (match && currentPath === match[0]) {
                        hasMatch = true;
                    }
                }
                if (page.type == 'contains') {
                    var match = currentPath.match(page.value);
                    if (match && page.value === match[0]) {
                        hasMatch = true;
                    }
                }
            }
            if (hasMatch) {
                return false;
            }
        }
        return true;
    }
    function shouldRenderSegments(config) {
        if (document.referrer === undefined || document.referrer === '') {
            return true;
        }
        if (config.segments && config.segments.only && config.segments.only.length > 0) {
            var hasMatch = false;
            var referrer = document.referrer.split('//')[1].split('/')[0].replace('www.', '');
            for (var i = 0; i < config.segments.only.length; i++) {
                var domain = config.segments.only[i];
                if (referrer === domain) {
                    hasMatch = true;
                }
            }
            if (!hasMatch) {
                return false;
            }
        }
        if (config.segments && config.segments.exclude && config.segments.exclude.length > 0) {
            var hasMatch = false;
            var referrer = document.referrer.split('//')[1].split('/')[0].replace('www.', '');
            for (var i = 0; i < config.segments.exclude.length; i++) {
                var domain = config.segments.exclude[i];
                if (referrer === domain) {
                    hasMatch = true;
                }
            }
            if (hasMatch) {
                return false;
            }
        }
        return true;
    }
    // function sendEvent(event) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("POST", eventUrl, true);
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send(JSON.stringify(event));
    // }
    var config = {
        appId: 'vK527HmaYE',
        banners: JSON.parse('[{"id":"2CzRnCk0GU","enabled":true,"text":"Welcome to EasyBanner! This is an example banner that is fully configurable.","dismissable":true,"css":{"location":"top","position":"fixed","width":"100%","textColor":"#ffffff","backgroundColor":"#41b693","textAlign":"center","fontFamily":"Lexend Deca, sans-serif","fontUrl":"https://fonts.googleapis.com/css?family=Lexend+Deca:400italic,400,300,700","fontSize":"16px"},"pages":{"only":[],"exclude":[{"type":"exact_match","value":"/login"}]},"segments":{"only":[],"exclude":[]}}]')
    };
    run(config);
})(this);
