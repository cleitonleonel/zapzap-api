/*! Copyright (c) 2015 WhatsApp Inc.  All Rights Reserved. */ ! function(e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = n[r] = {
      exports: {},
      id: r,
      loaded: !1
    };
    return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
  }
  var n = {};
  return t.m = e, t.c = n, t.oe = function(e) {
    throw e
  }, t.p = "/", t(t.s = 4)
}([function(e, t, n) {
  "use strict";

  function r() {
    a(l.LOG, Array.prototype.slice.call(arguments))
  }

  function o() {
    a(l.INFO, Array.prototype.slice.call(arguments))
  }

  function c() {
    a(l.WARN, Array.prototype.slice.call(arguments))
  }

  function s() {
    a(l.ERROR, Array.prototype.slice.call(arguments))
  }

  function a(e, t) {
    f ? u.sendMessage(f, "log", {
      level: e,
      message: t
    }) : h.push([e, t])
  }

  function i(e) {
    e.ports && e.ports.length && (f = e.ports[0], h.forEach(function(e) {
      return a.apply(void 0, e)
    }), h = [])
  }
  var u = n(1),
    l = {
      LOG: "log",
      INFO: "info",
      WARN: "warn",
      ERROR: "error"
    },
    f = null,
    h = [];
  u.on("registerClientLogger", i), e.exports = {
    log: r,
    info: o,
    warn: c,
    error: s
  }
}, function(e, t) {
  "use strict";

  function n(e, t) {
    i[e] || (i[e] = []), i[e].push(t)
  }

  function r(e, t) {
    if (i[e]) {
      var n = i[e].indexOf(t); - 1 !== n && i[e].splice(n, 1)
    }
  }

  function o(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    i.all.forEach(function(e) {
      return e.apply(null, t)
    }), i[e] && i[e].forEach(function(e) {
      return e.apply(null, t)
    })
  }

  function c(e, t, n, r) {
    var o = [];
    if (self.MessageChannel) {
      var c = new MessageChannel;
      r || (r = a), c.port1.onmessage = r, o.push(c.port2)
    }
    e.postMessage({
      command: t,
      message: n
    }, o)
  }

  function s(e, t, n) {
    e.forEach(function(e) {
      return c(e, t, n)
    })
  }

  function a(e) {
    var t = e.data.command || "unknown";
    o(t, e, function(t) {
      e.ports && e.ports.length && e.ports.forEach(function(e) {
        return e.postMessage(t)
      })
    })
  }
  var i = {
      all: [],
      unknown: []
    },
    u = self.window ? self.navigator.serviceWorker : self;
  try {
    u.addEventListener("message", a)
  } catch (l) {}
  e.exports = {
    on: n,
    off: r,
    trigger: o,
    sendMessage: c,
    broadcast: s
  }
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
    return self.caches.keys().then(function(n) {
      return 1 >= n ? void 0 : (s.log("Updating to version: " + i.version), Promise.all(e.map(function(e) {
        return e = self.registration.scope + e, self.caches.match(e).then(function(t) {
          return t ? f.put(e, t) : f.add(e)
        })
      }).concat(t.map(function(e) {
        return f.add(self.registration.scope + e)
      })))["catch"](function(e) {
        s.error("Error occured while updating to version:" + i.version + ", error: " + e)
      }))
    })
  }

  function o() {
    return self.caches.keys().then(function(e) {
      return Promise.all(e.map(function(e) {
        return e !== l ? self.caches["delete"](e) : void 0
      }))
    })
  }

  function c(e) {
    return f.match(e).then(function(t) {
      return t ? t : self.fetch(e).then(function(t) {
        return t.ok ? f.put(e, t.clone())["catch"](function(n) {
          s.error("Error caching url: " + e.url + " response status: " + t.status + ", error: " + n)
        }) : s.error("Received invalid response, url: " + t.url + ", status: " + t.status + ", type: " + t.type), t
      })
    })
  }
  var s = n(0),
    a = n(3),
    i = void 0;
  try {
    i = {
      "version": "0.2.63",
      "hashedResources": ["083bbb3e48fbe92618fd.worker.js", "app_c0fb73d31b57a16aee29.js", "main_f7c004e4b79068cee2be.js", "progress_820473ba9bb470fd5a9adb0228cbb2c2.js", "style.useable_af86a00c93cc50069dbc.js", "style_rtl.useable_5b06dd20460c50e333ac.js", "unorm_43e0ebe55e9db34525ba.js", "vendor1_10bb4cb285e4baecc5a0.js", "vendor2_d73bbb9d9f0971ead23f.js", "browsers_ba1de4f32e9c12a489bc4fd76e667180.css", "sprite_848a9a80e2b1964ed08f.css", "style_12419772e4922c1975cb.css", "style_rtl_014aaab09d7b29393149.css"],
      "unhashedResources": ["", "apple-touch-icon.png", "favicon-48x48.ico", "favicon-64x64.ico", "favicon.ico", "wa.appcache", "assets/notification.mp3", "img/favicon/1x/favicon.png"]
    }
  } catch (u) {
    s.error("Unable to read cache list: " + u), i = {
      version: "",
      unhashedResources: [],
      hashedResources: []
    }
  }
  var l = "wa" + i.version,
    f = new a(l),
    h = new RegExp(self.registration.scope + "([^?]*)(\\?.*)?");
  e.exports = {
    CacheList: i,
    cache: f,
    UrlMatch: h,
    update: r,
    cleanup: o,
    fetchAndCacheResource: c
  }
}, function(e, t) {
  "use strict";

  function n(e) {
    this.cacheName = e, this.cache = self.caches.open(this.cacheName)
  }
  n.prototype = {
    add: function(e) {
      return this.cache.then(function(t) {
        return t.add(e)
      })
    },
    match: function(e, t) {
      return this.cache.then(function(n) {
        return n.match(e, t)
      })
    },
    put: function(e, t) {
      return this.cache.then(function(n) {
        return n.put(e, t)
      })
    }
  }, e.exports = n
}, function(e, t, n) {
  "use strict";

  function r(e) {
    s.log("Installing..."), e.waitUntil(a.update(i.hashedResources, i.unhashedResources).then(function() {
      return self.skipWaiting()
    }))
  }

  function o(e) {
    s.log("Activating..."), e.waitUntil(self.clients.claim().then(function() {
      return a.cleanup()
    }))
  }

  function c(e) {
    if ("GET" === e.request.method) {
      var t = e.request.url.match(a.UrlMatch);
      t && -1 !== u.indexOf(t[1]) && e.respondWith(a.fetchAndCacheResource(e.request))
    }
  }
  var s = n(0),
    a = n(2),
    i = a.CacheList,
    u = i.hashedResources.concat(i.unhashedResources);
  self.addEventListener("install", r), self.addEventListener("activate", o), self.addEventListener("fetch", c)
}]);