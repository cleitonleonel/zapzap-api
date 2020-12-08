/*! Copyright (c) 2015 WhatsApp Inc.  All Rights Reserved. */
webpackJsonp([0], {
  712: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function i(e) {
      window.history.pushState({}, "", window.location.href)
    }

    function o() {
      if (!Store.Conn.connected) return !1;
      var e = n(862),
        t = Store.Msg.any(function(e) {
          return 0 === e.ack && e.local && e.isSentByMe
        }),
        r = Store.Chat.any(function(e) {
          return !!e.composeText
        });
      return t || r || e.hasText
    }
    var s = n(3),
      a = r(s),
      c = n(6),
      l = n(28),
      d = n(1);
    _.defaults(window.Store, n(965));
    var u = n(44),
      p = n(7),
      h = n(13),
      m = n(63),
      f = n(15),
      g = n(895),
      v = n(980),
      y = n(928),
      E = n(352),
      T = n(979),
      b = n(882),
      S = n(158),
      M = n(8),
      C = n(21),
      w = n(29),
      N = n(165),
      P = n(170),
      R = n(978),
      k = n(905),
      x = n(82),
      D = n(105),
      A = n(982),
      I = n(955),
      O = n(159),
      L = O.HotKeys,
      U = O.HotKeyMapMixin,
      F = window.history && window.history.pushState && window.location,
      G = c.createClass({
        displayName: "Main",
        mixins: [S, U({}), D],
        statics: {
          hasPending: o
        },
        getInitialState: function() {
          return {
            drawerActive: !1
          }
        },
        componentWillMount: function() {
          m.uiActive = !0, m.markAvailable()
        },
        componentWillUnmount: function() {
          A.trigger(R.Event + ":" + R.Events.LOGGED_OUT), F && (window.removeEventListener("popstate", i), window.history.back()), m.uiActive = !1, this.clearIdleMonitor(), this.clearServerPropsQueryLoop()
        },
        componentDidMount: function() {
          if (A.trigger(R.Event + ":" + R.Events.LOGGED_IN), F && (window.history.pushState({}, "", window.location.href), window.addEventListener("popstate", i)), this.beginIdleMonitor(!0), this.beginServerPropsQueryLoop(), this.addObserverAndRun(Store.Conn, "change:tos", this.showTOS), l.findDOMNode(this).focus(), u.isSafari) {
            var e = f.getNUX(p.NUX.SAFARI_LIMITED_SUPPORT);
            (!e || e < e.maxViews) && (this.safeDelay(function() {
              var e = l10n.t("whatsapp_safari_limited").replace("__chrome_homepage__", p.BROWSER_LINK.CHROME).replace("__firefox_homepage__", p.BROWSER_LINK.FIREFOX).replace("__opera_homepage__", p.BROWSER_LINK.OPERA);
              M.openModal(c.createElement(E, {
                onOK: M.closeModal.bind(M),
                okText: l10n.t("ok_got_it")
              }, c.createElement("div", {
                dangerouslySetInnerHTML: {
                  __html: e
                }
              })))
            }, 250), f.setNUX(p.NUX.SAFARI_LIMITED_SUPPORT, {
              views: 1,
              maxViews: 1
            }))
          }
        },
        beginIdleMonitor: function(e) {
          var t = this;
          e = e ? p.IDLE_TIMEOUT : 0, this.idleMonitor = w.loopOnError(C.ShouldLoop, function() {
            return a["default"].delay(e).then(function() {
              m.markUnavailable(3e4);
              var e = [w.waitForEvent(document, "mousemove"), w.waitForEvent(document, "scroll"), w.waitForEvent(document, "keydown"), w.waitForEvent(window, "focus"), w.waitForEvent(window, "blur"), w.waitForEvent(window, "resize")];
              return a["default"].any(e).timeout(p.IDLE_TIMEOUT_WAIT, "idleMonitorTimeout")["finally"](function() {
                e.forEach(function(e) {
                  e["catch"](a["default"].CancellationError, _.noop), e.cancel()
                })
              })
            }).then(function() {
              throw m.markAvailable(), e = p.IDLE_TIMEOUT, new C.ShouldLoop
            })
          }).cancellable()["catch"](a["default"].CancellationError, _.noop)["catch"](a["default"].TimeoutError, function() {
            f.getRememberMe() ? t.beginIdleMonitor() : (d.log("main:beginIdleMonitor logout due to inactivity")(), h.logout())
          })["finally"](function() {
            delete t.idleMonitor
          })
        },
        clearIdleMonitor: function() {
          this.idleMonitor && this.idleMonitor.cancel()
        },
        beginServerPropsQueryLoop: function() {
          var e = this;
          this.serverPropsQueryLoop = N.setTimeout(function() {
            Store.Props.fetch()["catch"](C.WapDrop, _.noop), e.beginServerPropsQueryLoop()
          }, moment().add("1", "days").valueOf())
        },
        clearServerPropsQueryLoop: function() {
          N.clearTimeout(this.serverPropsQueryLoop)
        },
        handleRightDrawer: function(e) {
          if (this.setState({
              drawerActive: !!e
            }), this.refs.chatlist && this.refs.container && this.refs.conversation) {
            var t = l.findDOMNode(this.refs.chatlist),
              n = l.findDOMNode(this.refs.conversation),
              r = l.findDOMNode(this.refs.container),
              i = n.clientWidth / (r.clientWidth - t.clientWidth);
            Velocity(n, {
              scaleX: [1, i]
            }, {
              duration: 300,
              easing: [.1, .82, .25, 1]
            })
          }
        },
        onRotateFocus: function(e) {
          var t = 1;
          e && (e.stopPropagation(), e.preventDefault(), t = e.shiftKey ? -1 : 1, L.flashFocus = Date.now());
          var n = _.toArray(l.findDOMNode(this).querySelectorAll("[data-tab]"));
          if (this.refs.drawer.isFlowActive(x.DRAWER_LEFT)) {
            var r = l.findDOMNode(this.refs.chatlist);
            n = _.reject(n, function(e) {
              return r.contains(e)
            })
          }
          if (this.refs.drawer.isFlowActive(x.DRAWER_MID)) {
            var i = l.findDOMNode(this.refs.conversation);
            i && (n = _.reject(n, function(e) {
              return i.contains(e)
            }))
          }
          if (n.length) {
            n = _.sortBy(n, function(e) {
              return parseInt(e.getAttribute("data-tab"), 10) || 0
            });
            var o = 0,
              s = document.activeElement;
            s && (o = P.ring(_.findIndex(n, function(e) {
              return e.contains(s)
            }) + t, n));
            var a = n[o];
            L.flashFocus = Date.now(), a.restoreFocus ? a.restoreFocus() : a.focus()
          }
        },
        onBlur: function(e) {
          var t = this;
          _.delay(function() {
            if (t.isMounted()) {
              var e = l.findDOMNode(t);
              document.activeElement === document.body && e.focus()
            }
          }, 10)
        },
        showTOS: function() {
          switch (Store.Conn.tos) {
            case 1:
            case 2:
              M.openModal(c.createElement(I, null), void 0, void 0, !0);
              break;
            case 3:
              h.logout()
          }
        },
        render: function() {
          var e = this.state.drawerActive ? "app three" : "app two";
          u.isSafari && (e += " safari-fix");
          var t = {
            tab: this.onRotateFocus,
            "shift+tab": this.onRotateFocus
          };
          return c.createElement(L, {
            handlers: t,
            ref: "container",
            className: e,
            onBlur: this.onBlur
          }, c.createElement(T, null), c.createElement(b, null), c.createElement(v, null), c.createElement(y, {
            ref: "drawer",
            onRightDrawer: this.handleRightDrawer
          }), c.createElement(g, {
            ref: "chatlist"
          }), c.createElement(k, {
            ref: "conversation"
          }))
        }
      });
    e.exports = G
  },
  713: function(e, t, n) {
    e.exports = {
      "default": n(990),
      __esModule: !0
    }
  },
  714: function(e, t, n) {
    e.exports = {
      "default": n(991),
      __esModule: !0
    }
  },
  715: function(e, t, n) {
    e.exports = {
      "default": n(992),
      __esModule: !0
    }
  },
  796: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function i(e, t) {
      return e === t || e + "?x=2" === t || e === t + "?x=2"
    }

    function o(e) {
      return new l["default"](function(t, n) {
        var r = e.map(function(e) {
          return [e.clientUrl, e.from.split("@")[0], e.to.split("@")[0], e.t]
        });
        x.send({
          data: ["query", "refreshMedia", r],
          onSend: t,
          onDrop: n
        })
      }).then(function(t) {
        if (200 === t.status) {
          var n = t.data;
          return n.length !== e.length ? (u.error("Msg:refreshMedia returned length differs from orig")(), l["default"].reject("Msg:refreshMedia returned length differs from orig")) : (n.forEach(function(t) {
            var n = e.shift(),
              r = n.duration || t.d;
            r = r ? r.toString() : void 0;
            var i = {
              url: t.url,
              urlState: t.url ? O.URL_STATE.URL : O.URL_STATE.NO_URL,
              mimetype: t.mt,
              duration: r
            };
            "image" === n.type && (i.fullWidth = t.w, i.fullHeight = t.h), n.set(i)
          }), e)
        }
        return u.error("Msg:refreshMedia error " + t.status)(), l["default"].reject("Msg:refreshMedia error " + t.status)
      })
    }

    function s(e, t, n) {
      var r = Store.Contact.get(e);
      if (r.plaintextDisabled) return l["default"].resolve();
      var i = !1;
      switch (t) {
        case "audio":
        case "ptt":
          i = C.supportsFeature(C.F.ENC_AUDIO) && L[n];
          break;
        case "video":
          i = C.supportsFeature(C.F.ENC_VIDEO) && U[n];
          break;
        case "document":
          i = C.supportsFeature(C.F.ENC_DOC) && F[n];
          break;
        case "image":
          i = C.supportsFeature(C.F.ENC_IMAGE)
      }
      return i ? r.canSendEncryptedMedia(t) : l["default"].reject()
    }

    function a() {
      var e = new Uint8Array(8);
      window.crypto.getRandomValues(e);
      for (var t = new Array(16), n = 0, r = 0; n < e.length; n++, r += 2) {
        var i = e[n];
        t[r] = G[i >> 4], t[r + 1] = G[15 & i]
      }
      return "3EB0" + String.fromCharCode.apply(String, t)
    }
    var c = n(3),
      l = r(c),
      d = n(7),
      u = n(1),
      p = n(62),
      h = n(161),
      m = n(35),
      f = n(21),
      g = n(841),
      v = n(109),
      y = n(22),
      E = n(881),
      T = n(356),
      b = n(830),
      S = n(61),
      M = n(876),
      C = n(83),
      w = n(108),
      N = n(879),
      P = n(157),
      R = n(63),
      k = n(880),
      x = n(13),
      D = {
        NOTIFICATION: "notification",
        GROUP_NOTIFICATION: "group_notification",
        GP2: "gp2",
        BROADCAST_NOTIFICATION: "broadcast_notification",
        CHAT: "chat",
        IMAGE: "image",
        VIDEO: "video",
        LOCATION: "location",
        AUDIO: "audio",
        PTT: "ptt",
        VCARD: "vcard",
        CIPHERTEXT: "ciphertext",
        DOCUMENT: "document"
      },
      A = {
        INIT: "init",
        REFRESHING: "refreshing",
        REFRESH_RETRY: "refresh_retry",
        URL: "url",
        STATUS_200: "status_200",
        STATUS_ERR: "status_err",
        NO_URL: "no_url",
        RMR_FETCHING: "rmr_fetching",
        RMR_ERROR_MISSING: "rmr_error_missing",
        RMR_ERROR_RETRY: "rmr_error_retry",
        UPLOADING: "uploading"
      },
      I = {
        UPLOADING: "uploading",
        RETRY: "retry",
        PHONE_UPLOADING: "phone_uploading"
      },
      O = p.extend(M, {
        Collection: "Msg",
        props: {
          id: "msgKey",
          body: "string",
          type: {
            type: "string",
            values: _.values(D)
          },
          subtype: "string",
          t: "number",
          notifyName: "string",
          from: "string",
          to: "string",
          author: "string",
          self: {
            type: ["string"],
            values: ["in", "out"],
            "default": "in"
          },
          ack: "number",
          invis: "boolean",
          isNew: "boolean",
          star: "boolean",
          recvFresh: "boolean",
          clientUrl: "string",
          url: "string",
          caption: "string",
          mimetype: "string",
          duration: "string",
          filehash: "string",
          size: "number",
          loc: "string",
          lat: "string",
          lng: "string",
          height: "number",
          width: "number",
          filename: "string",
          title: "string",
          description: "string",
          canonicalUrl: "string",
          matchedText: "string",
          thumbnail: "string",
          recipients: "array",
          broadcast: "boolean",
          avparams: "object",
          mediaKey: "string",
          pageCount: "number"
        },
        session: {
          fullHeight: "number",
          fullWidth: "number",
          decryptedMediaBlob: "object",
          decryptedMediaURL: "string",
          decryptMediaPromise: "object",
          uploadhash: "string",
          urlState: {
            type: "string",
            values: _.values(A),
            "default": A.INIT
          },
          local: "boolean",
          urlRetry: {
            type: "number",
            "default": 0
          },
          uploadPromise: "object",
          reupload: "any",
          resendPromise: "object",
          ajaxHeadPromise: "object",
          rmrPromise: "object",
          needsMediaAck: "boolean",
          search: "boolean",
          msgChunk: "object",
          startOfDay: "number",
          startOfDaySkew: "number"
        },
        children: {
          senderObj: h
        },
        initialize: function() {
          this.sender && (this.senderObj = Store.Contact.gadd({
            id: this.sender
          }), this.listenTo(this.senderObj, "all", this._getEventBubblingHandler("senderObj"))), this.isMMS && this.listenTo(this, "change:needsRefresh change:isObserved", function() {
            this.isObserved && this.initializeMedia()
          });
          var e;
          (e = Store.Msg.preAck[this.id]) && (u.log("Msg:initialize updating msg with out of order ack", e)(), this.updateAck(e.ack), delete Store.Msg.preAck[this.id])
        },
        derived: {
          chat: {
            fn: function() {
              return Store.Chat.get(this.id.remote)
            }
          },
          isGroupMsg: {
            fn: function() {
              return y.isGroup(this.from) || y.isGroup(this.to)
            }
          },
          isSentByMe: {
            fn: function() {
              var e = this.id;
              return "in" === e.self || this.isNotification ? !1 : this.from === Store.Conn.me
            }
          },
          isNotification: {
            deps: ["type"],
            fn: function() {
              switch (this.type) {
                case D.GROUP_NOTIFICATION:
                case D.GP2:
                case D.BROADCAST_NOTIFICATION:
                case D.NOTIFICATION:
                  return !0;
                default:
                  return !1
              }
            }
          },
          isMedia: {
            deps: ["type"],
            fn: function() {
              return ["image", "video", "audio"].indexOf(this.type) > -1
            }
          },
          isMMS: {
            deps: ["type"],
            fn: function() {
              return ["image", "video", "audio", "ptt"].indexOf(this.type) > -1
            }
          },
          mmsSrc: {
            deps: ["url"],
            fn: function() {
              return S.isHttp(this.url) ? this.url + "?x=2" : this.url
            }
          },
          hasSymbol: {
            deps: ["type"],
            fn: function() {
              return ["image", "video", "audio", "ptt", "location", "vcard"].indexOf(this.type) > -1
            }
          },
          uploadState: {
            deps: ["ack", "uploadPromise"],
            fn: function() {
              return this.isSentByMe && 0 === this.ack ? this.local ? this.uploadPromise ? I.UPLOADING : I.RETRY : I.PHONE_UPLOADING : !1
            }
          },
          eventType: {
            deps: ["type", "invis"],
            fn: function() {
              var e, t, n = this.type,
                r = this.subtype;
              return this.isNew ? ("gp2" === n || "group_notification" === n ? "subject" === r ? e = "n" : "add" === r ? (t = _.first(this.recipients), e = t === Store.Conn.me ? "s" : "i") : "remove" === r ? (t = _.first(this.recipients), e = t === Store.Conn.me ? "n" : "i") : e = "create" === r ? "n" : "i" : e = "broadcast_notification" === n || "notification" === n ? "create" === r ? "n" : "i" : this.broadcast ? "i" : n === D.CIPHERTEXT ? "i" : "d", this.invis ? "i" === e ? "i" : "n" : e) : "i"
            }
          },
          sender: {
            fn: function() {
              return this.isSentByMe ? this.from : this.isGroupMsg ? this.author : this.from
            }
          },
          needsRefresh: {
            deps: ["clientUrl", "urlState"],
            fn: function() {
              return this.clientUrl && !S.isEncryptedMedia(this.clientUrl) && _.contains([A.INIT, A.REFRESH_RETRY], this.urlState)
            }
          },
          containsEmoji: {
            deps: ["body", "caption"],
            fn: function() {
              switch (this.type) {
                case D.CHAT:
                  return this.body && T.containsEmoji(this.body);
                case D.IMAGE:
                  return this.caption && T.containsEmoji(this.caption);
                default:
                  return !1
              }
            }
          },
          mayFail: {
            deps: ["isSentByMe", "ack"],
            fn: function() {
              return this.isSentByMe && this.ack <= 1
            }
          },
          isFailed: {
            deps: ["ack"],
            fn: function() {
              return this.ack < 0
            }
          },
          vcardWAid: {
            deps: ["type", "body"],
            fn: function() {
              if (this.type === D.VCARD) {
                var e = this.body.match(/TEL[^\n]*;waid=(\d+):/);
                return e ? e[1] + "@c.us" : void 0
              }
            }
          },
          canForward: {
            deps: ["type", "ack", "isMMS", "isSentByMe"],
            fn: function() {
              return !(this.ack < 1 && this.isMMS && this.isSentByMe)
            }
          },
          dir: {
            deps: ["type", "body", "subtype"],
            fn: function() {
              switch (this.type) {
                case D.CHAT:
                  return N.dir(this.body);
                case D.VCARD:
                  return N.dir(this.subtype);
                default:
                  return
              }
            }
          },
          rtl: {
            deps: ["type", "body", "subtype"],
            fn: function() {
              switch (this.type) {
                case D.CHAT:
                  return "rtl" === N.dir(this.body);
                case D.VCARD:
                  return "rtl" === N.dir(this.subtype);
                default:
                  return !1
              }
            }
          },
          linkPreview: {
            deps: ["matchedText", "body"],
            fn: function() {
              return _.isString(this.matchedText) && this.body.indexOf(this.matchedText) > -1
            }
          },
          isEncryptedMedia: {
            deps: ["clientUrl", "mediaKey"],
            fn: function() {
              return !!this.mediaKey || S.isEncryptedMedia(this.clientUrl)
            }
          }
        },
        isGroupLeave: function() {
          return "gp2" === this.type && ("leave" === this.subtype || "remove" === this.subtype) && _.first(this.recipients) === Store.Conn.me
        },
        isTrusted: function() {
          return this.sender === Store.Conn.me ? !0 : this.senderObj && this.senderObj.isMyContact ? !0 : this.isGroupMsg ? this.chat.trusted : !1
        },
        initializeMedia: function() {
          this.needsRefresh ? Store.Msg.refreshMediaUrl(this) : this.clientUrl && S.isEncryptedMedia(this.clientUrl) && !this.url && this.set({
            url: this.clientUrl,
            urlState: O.URL_STATE.URL
          })
        },
        decryptMedia: function() {
          var e = this;
          return this.decryptedMediaURL ? l["default"].resolve(this.decryptedMediaURL) : this.decryptMediaPromise ? this.decryptMediaPromise : this.decryptMediaPromise = v.get(this.clientUrl, v.RESP_TYPE.ARRAY_BUFFER).then(function(t) {
            if (200 === t.status) {
              var n = g.decryptE2EMedia(e.type, t.response, e.mediaKey, e.mimetype);
              e.needsMediaAck && g.ackE2EMedia(e.type, e.mediaKey, e.clientUrl).then(function() {
                return e.needsMediaAck = !1
              });
              var r = URL.createObjectURL(n);
              return e.set({
                decryptedMediaBlob: n,
                decryptedMediaURL: r
              }), r
            }
            throw new f.MediaLoadError("media preload error: " + t.status + " " + e.type, e.clientUrl)
          })["finally"](function() {
            return e.unset("decryptMediaPromise")
          })["catch"](function(t) {
            u.error("models:msg:decryptMedia: " + t)();
            var n = t instanceof f.MediaEncryptionError ? "encryption error " : "encryption XHR Error ";
            throw new f.MediaLoadError(n + e.type, e.clientUrl)
          })
        },
        "delete": function() {
          this.decryptedMediaURL && (URL.revokeObjectURL(this.decryptedMediaURL), this.unset("decryptedMediaBlob"), this.unset("decryptedMediaURL")), S.isBlob(this.url) && URL.revokeObjectURL(this.url), p.prototype["delete"].call(this), Store.Msg.remove(this.id), Store.StarredMsg.remove(this.id), this.msgChunk && this.msgChunk.remove(this.id)
        },
        displayName: function(e, t) {
          if (!this.sender) return "";
          if (this.sender === Store.Conn.me) return l10n.t("web_you");
          var n = this.senderObj,
            r = e ? n.shortName : void 0;
          if (r) return r;
          if (n.name) return n.name;
          var i = t && this.notifyName ? " ~" + this.notifyName : "";
          return l10n.isRTL() ? l10n.embedLTR(y.formattedUser(this.sender)) + i : y.formattedUser(this.sender) + i
        },
        updateAck: function(e) {
          var t = this.ack;
          _.isNumber(e) && ("undefined" == typeof t || e > t) ? this.ack = e : -1 === e && 0 === this.ack && (this.ack = e)
        },
        reuploadMedia: function() {
          var e = this;
          return this.reupload ? this.uploadPromise ? this.uploadPromise : (this.urlState = A.UPLOADING, this.uploadPromise = this.reupload().cancellable().then(function(t) {
            return e.clientUrl = t.url, e.sendMediaMsg(t)
          }).then(function() {
            e.set({
              urlState: e.url ? A.STATUS_200 : A.INIT,
              reupload: null
            })
          })["finally"](function() {
            e.unset("uploadPromise")
          })["catch"](l["default"].CancellationError, _.noop)) : l["default"].resolve()
        },
        sendMediaMsg: function(e) {
          var t = e.filehash;
          return this.mediaKey && (delete e.name, e.mimetype = this.mimetype, e.size = this.size, e.type = this.type === D.PTT ? "audio" : this.type, e.height = this.height, e.width = this.width, e.duration = this.duration, e.filehash = this.filehash, this.type === D.DOCUMENT && (e.filename = this.filename)), this.set({
            avparams: e,
            filehash: e.filehash,
            uploadhash: t,
            size: parseInt(e.size, 10)
          }), Store.Msg.send(this).then(function(t) {
            return {
              result: t,
              avparams: e
            }
          })
        },
        sendPlayed: function() {
          if ("ptt" === this.type && !(this.isSentByMe || this.ack >= d.ACK_PLAYED)) {
            var e = this;
            m.sendMessagePlayed(this.id).then(function(t) {
              e.ack = d.ACK_PLAYED
            })["catch"](f.WapDrop, _.noop)
          }
        },
        urlState200: function(e) {
          i(this.url, e) || S.isBlob(e) ? (this.urlState = A.STATUS_200, S.isBlob(e) && (this.url = e)) : u.log("Msg:status_200 set for wrong url?")()
        },
        mediaLoadError: function(e) {
          if (!i(this.url, e)) return l["default"].resolve();
          if (R.info === R.INFO.OFFLINE) return l["default"].resolve();
          if (S.isEncryptedMedia(this.clientUrl) && !this.mediaKey) return l["default"].resolve();
          if (this.urlRetry > 3) return l["default"].resolve();
          this.urlRetry++, this.ajaxHeadPromise && this.ajaxHeadPromise.cancel();
          var t, n;
          return n = this.ajaxHeadPromise = v.head(e).bind(this).timeout(3e4, "mediaLoadErrorTimeout").cancellable().tap(function() {
            t = n.cancel.bind(n), this.listenToOnce(this, "change:url", t)
          }).then(function(t) {
            return 404 === t.status ? this.requestMediaReupload() : void(t.status >= 200 && t.status < 400 && this.urlState200(e))
          })["finally"](function() {
            this.stopListening(this, "change:url", t), n === this.ajaxHeadPromise && this.unset("ajaxHeadPromise")
          })["catch"](l["default"].CancellationError, _.noop)["catch"](l["default"].TimeoutError, _.noop)["catch"](_.noop)
        },
        requestMediaReupload: function() {
          return this.set({
            url: null,
            urlState: A.RMR_FETCHING
          }), this.rmrPromise ? this.rmrPromise : (S.isEncryptedMedia(this.clientUrl) && (this.needsMediaAck = !0), this.rmrPromise = m.requestMediaReupload(this).bind(this).then(function(e) {
            if (200 === e.status)
              if (S.isEncryptedMedia(e.url)) {
                var t = {
                  url: e.url,
                  clientUrl: e.url,
                  urlState: A.URL
                };
                e.mediaKey && (t.mediaKey = e.mediaKey), this.set(t)
              } else this.set({
                clientUrl: e.url,
                urlState: A.INIT
              });
            else 404 === e.status ? this.urlState = A.RMR_ERROR_MISSING : e.status >= 400 && (this.urlState = A.RMR_ERROR_RETRY)
          })["finally"](function() {
            this.unset("rmrPromise")
          })["catch"](function(e) {
            throw this.urlState = A.RMR_ERROR_RETRY, e
          }))
        },
        forward: function(e) {
          var t = e.id;
          if (y.isUser(t)) {
            var n = Store.Contact.get(t);
            if (n.isBlocked()) return l["default"].reject(new f.ContactBlocked("Forwarded to contact is blocked", n))
          }
          var r, i = this.type,
            o = this.toJSON();
          switch (_.extend(o, {
            id: new w(Store.Conn.me, t, a(), void 0, "out"),
            t: P.globalUnixTime(),
            from: Store.Conn.me,
            to: t,
            self: "out",
            origin: null,
            caption: void 0,
            local: !0,
            isNew: !0,
            ack: 0,
            uploadhash: this.uploadhash
          }), i) {
            case D.CHAT:
              r = new O(o);
              var s = Store.Msg.send(r);
              return e.msgs.add(r), s;
            case D.DOCUMENT:
            case D.VIDEO:
            case D.IMAGE:
            case D.AUDIO:
            case D.PTT:
              var c, d = this.isEncryptedMedia ? o.uploadhash : o.filehash,
                u = o.size,
                p = o.clientUrl;
              return d && u || p ? (r = new O(o), r.type === D.PTT && (r.type = D.AUDIO), this.urlState !== A.STATUS_200 && r.unset("url"), c = e.msgs.add(r), c.urlState = A.UPLOADING, d && u ? c.reupload = this.forwardMedia(c) : c.reupload = this.ensureHashSize(c), c.reuploadMedia()) : l["default"].reject(new f.MediaMissing);
            case D.LOCATION:
              return e.sendLocation(o.lat, o.lng, o.loc, o.clientUrl);
            case D.VCARD:
              return e.sendContact(o.body, o.subtype)
          }
        },
        forwardMedia: function(e) {
          var t = this;
          return function() {
            var n = t.isEncryptedMedia ? s(e.to, e.type, e.mimetype).then(function() {
              return m.requestEncryptedMediaUpload(e.type, e.uploadhash).then(function(t) {
                return "ok" === t.result ? k.computeRefs(e.to, e.type, e.mediaKey).then(function(n) {
                  return k.forwardEncryptedMedia(t.data, e.uploadhash, n)
                }).then(function(e) {
                  return e.url ? {
                    result: "duplicate",
                    data: e
                  } : {}
                }) : {}
              })
            })["catch"](function() {
              return e.unset("mediaKey"), m.requestMediaUpload(e.type, e.filehash, e.size).then(function(e) {
                return e.needsDecryptedUpload = !0, e
              })
            }) : s(e.to, e.type, e.mimetype).then(function() {
              return t.requestMediaReupload().then(function() {
                return o([t])
              }).then(function() {
                return v.get(t.url, v.RESP_TYPE.ARRAY_BUFFER)
              }).then(function(e) {
                return 200 === e.status ? e.response : l["default"].reject()
              }).then(function(t) {
                e.mediaKey = g.newB64MediaKey(), e.decryptedMediaBlob = new Blob([t]), e.url = e.decryptedMediaURL = URL.createObjectURL(e.decryptedMediaBlob);
                var n = g.encryptE2EMedia(e.type, t, e.mediaKey);
                return b.getHash(n).then(function(t) {
                  return m.requestEncryptedMediaUpload(e.type, t.hash, t.size).then(function(r) {
                    return "ok" === r.result ? k.computeRefs(e.to, e.type, e.mediaKey).then(function(e) {
                      return k.uploadEncryptedMediaToMMS(r.data, n, void 0, t.hash, e)
                    }) : l["default"].reject()
                  })
                }).then(function(e) {
                  return {
                    result: "duplicate",
                    data: e
                  }
                })
              })
            }, function() {
              return m.requestMediaUpload(e.type, e.filehash, e.size)
            });
            return n.then(function(n) {
              var r = n.result;
              if ("duplicate" === r) return n.data;
              if (n.needsDecryptedUpload) {
                if ("ok" === r) return t.decryptMedia().then(function() {
                  return k.uploadMediaToMMS(n.data, t.decryptedMediaBlob, e.to)
                }, function() {
                  throw new f.MediaMissing
                });
                throw new f.MediaMissing
              }
              return t.requestMediaReupload().then(function() {
                switch (t.urlState) {
                  case A.RMR_ERROR_MISSING:
                  case A.RMR_ERROR_RETRY:
                    throw new f.MediaMissing
                }
                var n = t.clientUrl;
                if (n) return {
                  filehash: e.filehash,
                  size: e.size,
                  type: e.type,
                  url: n
                };
                throw new f.MediaMissing
              })
            })
          }
        },
        ensureHashSize: function(e) {
          var t = this;
          return function() {
            var n = t.isEncryptedMedia ? s(e.to, e.type, e.mimetype).then(function() {
              return E.headRetry(t.clientUrl).then(function(e) {
                var n = k.getFileMetadata(e).filehash;
                if (200 === e.status) return n ? {
                  hash: t.filehash,
                  uploadhash: n,
                  size: t.size
                } : v.get(t.clientUrl, v.RESP_TYPE.BLOB).then(function(e) {
                  return 200 === e.status ? b.getHash(e.response) : l["default"].reject()
                }).then(function(e) {
                  return {
                    hash: t.filehash,
                    uploadhash: e.hash,
                    size: t.size
                  }
                });
                if (404 === e.status) return l["default"].resolve();
                throw new f.GaveUpRetry("unexpected error: " + e.status)
              })
            }, function() {
              return t.decryptMedia().then(function() {
                return b.getHash(t.decryptedMediaBlob)
              }, function() {
                return l["default"].resolve()
              })
            }) : E.getRetry(S.build(t.url, {
              random: Date.now()
            }), v.RESP_TYPE.BLOB).then(function(e) {
              return 404 === e.status ? l["default"].resolve() : b.getHash(e.response)
            });
            return n.then(function(n) {
              if (n) {
                e.filehash = t.filehash = n.hash, e.uploadhash = t.uploadhash = n.uploadhash, e.size = t.size = n.size;
                var r = t.forwardMedia(e);
                return e.reupload = r, r()
              }
              return t.requestMediaReupload().then(function() {
                var n = t.ensureHashSize(e);
                return t.isEncryptedMedia ? t.decryptMedia().then(function(r) {
                  return t.url = r, e.url = r, n()
                })["catch"](function(e) {
                  return l["default"].reject(new f.MediaMissing)
                }) : n()
              })
            })
          }
        },
        avParams: function() {
          return this.avparams ? this.avparams : {
            url: this.clientUrl,
            type: this.type,
            filehash: this.filehash,
            duration: this.duration,
            width: this.fullWidth,
            height: this.fullHeight
          }
        },
        resend: function() {
          return this.isMMS && !C.supportsFeature(C.F.MEDIA_RETRY) ? l["default"].reject() : this.resendPromise ? this.resendPromise : (this.urlState = A.UPLOADING, this.resendPromise = Store.Msg.send(this).bind(this).then(function(e) {
            "success" === e ? this.urlState = A.INIT : this.urlState = A.NO_URL
          })["finally"](function() {
            this.unset("resendPromise")
          })["catch"](function() {
            this.urlState = A.NO_URL
          }))
        },
        getMessageInfo: function() {
          return Store.MsgInfo.find(this)
        }
      }),
      L = {
        "audio/aac": !0,
        "audio/mp4": !0,
        "audio/amr": !0,
        "audio/mpeg": !0,
        "audio/ogg; codecs=opus": !0
      },
      U = {
        "video/mp4": !0,
        "video/3gpp": !0
      },
      F = {
        "application/pdf": !0
      },
      G = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
    O.TYPE = D, O.URL_STATE = A, O.UPLOAD_STATE = I, O.newTag = a, O.needsEncryption = s, O.refreshMedia = o, e.exports = O
  },
  797: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(710),
      o = r(i),
      s = n(3),
      a = r(s),
      c = n(1),
      l = n(21),
      d = n(8),
      u = n(29),
      p = {
        async: function(e, t, n) {
          var r = this,
            i = e.split(".");
          t = t || this.props;
          var o = this._getAsyncIndex(i),
            s = t[i[0]],
            p = o > 1 ? s.getp(i.slice(1, o).join(".")) : s;
          if (!p) throw new Error("async base did not resolve to a value");
          var h, m, f = _.isString(p) ? p : p.getp("id"),
            g = this._getKeyPath(i);
          if (o > 0 ? (h = Store[i[o]], m = h.get(f)) : (m = p, h = m.getCollection()), !m) return c.error("asyncMixin:async Non-existing state in AsyncMixin! baseId: " + f + ", key: " + e)();
          if (h.isStateStale(f))
            if (d.uiBusy) {
              var v = this._waAsyncWaits || (this._waAsyncWaits = []),
                y = u.waitForBBEvent(d, "ui_idle").then(function() {
                  return h.find(f)
                })["finally"](function() {
                  r._waAsyncWaits = _.without(r._waAsyncWaits, y)
                })["catch"](l.WapDrop, _.noop)["catch"](a["default"].CancellationError, _.noop);
              v.push(y)
            } else h.find(f)["catch"](l.WapDrop, _.noop);
          return this.__willMount = !1, this._addObserver(m, e, p), m.getp(g)
        },
        componentWillMount: function() {
          var e;
          this.__willMount = !0, this.__stateQueue && this.setState((e = _).assign.apply(e, [{}].concat((0, o["default"])(this.__stateQueue))))
        },
        setOrQueueState: function(e) {
          this.__willMount ? this.setState(e) : (this.__stateQueue = this.__stateQueue || [], this.__stateQueue.push(e))
        },
        componentWillReceiveProps: function(e) {
          var t = this._asyncs;
          if (t)
            for (var n in e) {
              var r = t[n];
              if (r)
                for (var i in r) {
                  var o = r[i];
                  if (o.base !== e[n]) {
                    var s = i.split("."),
                      a = this._getObserverKeyPath(s),
                      c = this._getStateKey(s),
                      l = o.object,
                      d = o.callback,
                      u = o.context;
                    l.off("change:" + a, d, u), l.isState && l._uiObservers--;
                    var p = {};
                    p[c] = this.async(i, e), this.setState(p)
                  }
                }
            }
        },
        componentWillUnmount: function() {
          this._waAsyncUnmount = !0;
          var e = this._waAsyncWaits;
          if (e)
            for (; e.length;) e.shift().cancel();
          var t = this._asyncs;
          if (t)
            for (var n in t)
              for (var r in t[n]) {
                var i = this._getObserverKeyPath(r.split(".")),
                  o = t[n][r].object,
                  s = t[n][r].callback,
                  a = t[n][r].context;
                o.off("change:" + i, s, a), o.isState && o._uiObservers--
              }
        },
        _addObserver: function(e, t, n) {
          var r = t.split("."),
            i = this._getKeyPath(r),
            o = this._getObserverKeyPath(r),
            s = this._asyncs;
          s || (s = this._asyncs = {});
          var a = function() {
            var t = {};
            t[this._getStateKey(r)] = e.getp(i), this.setOrQueueState(t)
          };
          s[r[0]] = s[r[0]] || {}, s[r[0]][t] = {
            object: e,
            base: n,
            callback: a,
            context: this
          }, e.on("change:" + o, a, this), e.isState && e._uiObservers++
        },
        _getStateKey: function(e) {
          return e[e.length - 1]
        },
        _getKeyPath: function(e) {
          for (var t = e.length, n = 0; n < e.length; n++)
            if (0 === e.indexOf("@")) {
              t = n;
              break
            }
          var r = this._getAsyncIndex(e);
          return e.slice(r + 1, t).join(".")
        },
        _getObserverKeyPath: function(e) {
          var t = this._getAsyncIndex(e);
          return e.slice(t + 1).join(".")
        },
        _getAsyncIndex: function(e) {
          for (var t = 0, n = 1; n < e.length; n++)
            if (e[n].charAt(0).toLowerCase() !== e[n].charAt(0)) {
              t = n;
              break
            }
          return t
        }
      };
    e.exports = p
  },
  798: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function i(e, t, n, r, o, s) {
      if (n > r) return -1;
      var a, c = Math.round((n + r) / 2),
        l = e[c],
        d = l.offsetLeft - o;
      if (d >= t) a = s;
      else {
        if (d + l.clientWidth > t) return c;
        a = !s
      }
      return a ? i(e, t, n, c - 1, o, s) : i(e, t, c + 1, r, o, s)
    }

    function o(e, t) {
      for (var n = 0, r = e.childNodes, i = 0; i < r.length; i++) {
        var o = r[i];
        if (o === t) break;
        n += o.clientWidth
      }
      return n
    }
    var s = n(3),
      a = r(s),
      c = n(6),
      l = n(28),
      d = n(356),
      u = n(44),
      p = n(106),
      h = n(84),
      m = n(158),
      f = n(8),
      g = n(29),
      v = n(987),
      y = n(43),
      E = n(708),
      T = 4096,
      b = {
        SMALL: "small",
        LARGE: "large"
      },
      S = c.createClass({
        displayName: "EmojiText",
        mixins: [h, p, m, E],
        statics: {
          EMOJI_SIZE: b
        },
        propTypes: {
          text: c.PropTypes.string,
          emojiSize: c.PropTypes.oneOf(_.values(b)),
          element: c.PropTypes.any,
          classes: c.PropTypes.string,
          direction: c.PropTypes.string,
          linkify: c.PropTypes.bool,
          titlify: c.PropTypes.bool,
          ellipsify: c.PropTypes.bool,
          selectable: c.PropTypes.bool,
          format: c.PropTypes.bool,
          wbr: c.PropTypes.number,
          dirMismatch: c.PropTypes.bool
        },
        getInitialState: function() {
          return this.debouncedRecompute = this.safeDebounce(this.recompute, 20), this.reged = !1, {
            ellipsified: null
          }
        },
        getDefaultProps: function() {
          return {
            emojiSize: b.SMALL,
            element: "span"
          }
        },
        componentWillMount: function() {
          u.isWebkit && this.props.ellipsify && this.containsEmoji() && this.regResizeListener()
        },
        componentWillReceiveProps: function(e) {
          if (u.isWebkit && this.props.ellipsify && e.text !== this.props.text) {
            var t = (e.text || "").substring(0, T);
            d.containsEmoji(t) ? (this.setState({
              ellipsified: null
            }, this.ellipsify), this.containsEmoji() || this.regResizeListener()) : (this.setState({
              ellipsified: null
            }), this.containsEmoji() && this.unregResizeListener())
          }
        },
        containsEmoji: function() {
          var e = (this.props.text || "").substring(0, T);
          return d.containsEmoji(e)
        },
        regResizeListener: function() {
          this.reged || (this.regNativeListener(window, "resize", this.debouncedRecompute), this.regCmd("resize", this.debouncedRecompute), this.reged = !0)
        },
        unregResizeListener: function() {
          this.reged && (this.unregNativeListener(window, "resize", this.debouncedRecompute), this.unregCmd("resize", this.debouncedRecompute), this.reged = !1)
        },
        recompute: function() {
          this.setState({
            ellipsified: null
          }, this.ellipsify)
        },
        ellipsifyCheck: function() {
          this.isMounted() && this.containsEmoji() && this.ellipsify()
        },
        componentDidMount: function() {
          u.isWebkit && this.props.ellipsify && (f.uiBusy ? g.waitForBBEvent(f, "ui_idle").then(this.ellipsifyCheck)["catch"](a["default"].CancellationError, _.noop) : this.ellipsifyCheck())
        },
        ellipsify: function() {
          var e = l.findDOMNode(this);
          if (e) {
            var t = e.querySelectorAll("img");
            if (0 !== t.length) {
              var n, r = !l10n.isRTL(),
                s = 0;
              if (n = e.clientWidth) {
                if (n === e.scrollWidth) return;
                s = 0
              } else {
                var a = e.parentNode;
                if (s = o(a, e), n = a.clientWidth - s, a.clientWidth === a.scrollWidth) return
              }
              var c = i(t, r ? n : 0, 0, t.length - 1, r ? s : 0, r);
              if (!(0 > c)) {
                var d = t[c],
                  u = 10;
                u -= Math.floor(u / 4);
                var p = i(t, r ? n - u : u, 0, c, r ? s : 0, r);
                p > -1 && (d = t[p]);
                for (var h = e.childNodes, m = [], f = 0; f < h.length; f++) {
                  var g = h[f];
                  if (g === d) break;
                  3 === g.nodeType ? m.push(g.textContent || "") : m.push(g.alt || "")
                }
                if (m.length) {
                  var v = m.length - 1;
                  m[v] = m[v].trimRight()
                }
                this.setState({
                  ellipsified: m.join("")
                })
              }
            }
          }
        },
        render: function() {
          if (!this.props.text) return null;
          var e = this.state.ellipsified;
          e || (e = this.props.ellipsify ? (this.props.text || "").substring(0, T) : this.props.text);
          var t, n = this.props.wbr,
            r = !1,
            i = this.props.selectable ? "selectable-text" : void 0;
          this.props.linkify ? t = v.linkify(e, !0, n, i, r) : (e = n && e.length > n ? v.wbr(e, n) : e, t = d.emojiToHTML(_.escape(e), i, this.props.emojiSize), r && (t = v.format(t))), this.state.ellipsified && (t += "&hellip;");
          var o = y(this.props.classes, {
              emojitext: !this.props.classes,
              ellipsify: this.props.ellipsify,
              "inverse-text-direction": this.props.dirMismatch,
              "selectable-text": this.props.selectable
            }),
            s = this.props.element;
          return this.props.titlify ? c.createElement(s, {
            className: o,
            dir: this.props.direction,
            title: this.props.text,
            dangerouslySetInnerHTML: {
              __html: t
            }
          }) : c.createElement(s, {
            className: o,
            dir: this.props.direction,
            dangerouslySetInnerHTML: {
              __html: t
            }
          })
        }
      });
    e.exports = S
  },
  799: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(989),
      o = r(i),
      s = n(3),
      a = r(s),
      c = n(6),
      l = n(7),
      d = n(1),
      u = n(62),
      p = n(828),
      h = n(796),
      m = n(161),
      f = n(877),
      g = n(840),
      v = n(827),
      y = n(83),
      E = n(8),
      T = n(63),
      b = n(35),
      S = n(15),
      M = n(157),
      C = n(21),
      w = n(108),
      N = n(832),
      P = n(61),
      R = n(830),
      k = n(22),
      x = n(362),
      D = n(983),
      A = n(164),
      I = n(841),
      O = n(880),
      L = {
        GROUP: "group",
        BROADCAST: "broadcast",
        CHAT: "chat"
      },
      U = u.extend({
        Collection: "Chat",
        props: {
          id: "string",
          t: "number",
          unreadCount: {
            type: "number",
            "default": 0
          },
          archive: "boolean",
          isReadOnly: "boolean",
          modifyTag: "number",
          muteExpiration: {
            type: "number",
            "default": 0
          },
          name: "string",
          notSpam: "boolean"
        },
        session: {
          viewed: "boolean",
          createdLocally: "boolean",
          pendingAction: "number",
          formattedTitle: "string",
          active: "boolean",
          pausedTimerId: "number",
          presenceResendTimerId: "number",
          recording: "boolean",
          typing: "boolean",
          unreadDivider: "object",
          colors: "object",
          composeText: "string",
          composeSel: "object",
          squelch: "number",
          pendingSeenCount: {
            type: "number",
            "default": 0
          },
          markedUnread: "boolean",
          msgChunks: {
            type: "array",
            "default": function() {
              return []
            }
          },
          trusted: "boolean"
        },
        collections: {
          msgs: v
        },
        children: {
          presence: p,
          contact: m,
          mute: f,
          groupMetadata: g
        },
        initialize: function() {
          if (this.presence = Store.Presence.gadd(this.id), this.listenTo(this.presence, "all", this._getEventBubblingHandler("presence")), this.mute = Store.Mute.add({
              id: this.id,
              expiration: this.muteExpiration
            }, {
              merge: !0
            }), this.listenTo(this.mute, "all", this._getEventBubblingHandler("mute")), this.contact = Store.Contact.gadd(this.id), this.name && !this.contact.name && (this.contact.name = this.name), this.listenTo(this.contact, "all", this._getEventBubblingHandler("contact")), this.listenTo(this.contact, "change:formattedName", this.updateTitle), this.isGroup && (this.trusted = !0), this.isGroup || this.isBroadcast) {
            var e;
            this.isBroadcast && !Store.GroupMetadata.get(this.id) && (e = !0), this.groupMetadata = Store.GroupMetadata.gadd({
              id: this.id
            }), this.listenTo(this.groupMetadata, "all", this._getEventBubblingHandler("groupMetadata")), this.listenTo(this.groupMetadata, "change:stale", this.updateReadOnly), this.listenTo(this.groupMetadata, "change:trusted change:stale", this.isTrusted), this.listenTo(this.groupMetadata.participants, "add remove reset", this.updateReadOnly), this.listenTo(this.groupMetadata.participants, "change:contact.formattedShortName", this.updateTitle), this.updateReadOnly();
            var t = this.id;
            this.listenTo(this, "change:isReadOnly", function() {
              Store.ProfilePicThumb.update(t)["catch"](C.WapDrop, _.noop), Store.GroupMetadata.update(t)["catch"](C.WapDrop, _.noop)
            }), e && Store.GroupMetadata.update(t)["catch"](C.WapDrop, _.noop)
          } else this.listenTo(this.presence, "change:isOnline", this._presenceOnlineChanged), this.listenTo(this.contact, "change:isMyContact", this.isTrusted);
          this.listenTo(this, "change:notSpam", this.isTrusted), this.updateTitle(), this.isTrusted(), this.listenTo(this.msgs, "add", this.onNewMsg), this._saveAssignedColors = _.debounce(this.saveAssignedColors, 1e3), this.listenTo(this, "change:active", this.onActiveUpdate),
            this.pendingAction = 0, this.listenTo(this, "change:pendingAction", this.onPendingActionUpdate)
        },
        derived: {
          kind: {
            fn: function() {
              return this.isGroup ? L.GROUP : this.isBroadcast ? L.BROADCAST : this.isUser ? L.CHAT : void 0
            }
          },
          isGroup: {
            fn: function() {
              return k.isGroup(this.id)
            }
          },
          isBroadcast: {
            fn: function() {
              return k.isBroadcast(this.id)
            }
          },
          isUser: {
            fn: function() {
              return k.isUser(this.id)
            }
          },
          hasUnread: {
            deps: ["unreadCount"],
            fn: function() {
              return 0 !== this.unreadCount
            }
          }
        },
        onActiveUpdate: function() {
          this.isGroup && this.active && (this.squelch = -1), this.presence.chatActive = this.active
        },
        onPendingActionUpdate: function() {
          this.pendingAction < 0 && (d.log("chat:onPendingActionUpdate pendingAction value is invalid")(), this.pendingAction = 0)
        },
        isTrusted: function() {
          return this.isGroup ? this.groupMetadata.stale ? this.trusted : y.supportsFeature(y.F.SPAM) ? this.trusted = this.notSpam || this.groupMetadata.trusted : this.trusted = this.groupMetadata.trusted : this.isBroadcast ? this.trusted = !0 : this.isUser ? y.supportsFeature(y.F.SPAM) ? this.trusted = this.notSpam || this.contact.isMyContact : this.trusted = !0 : void 0
        },
        updateTitle: function() {
          this.isBroadcast ? this.formattedTitle = this.contact.name || this.groupMetadata.participants.map(function(e) {
            return e.contact.formattedShortName
          }).join(", ") : this.isUser ? this.formattedTitle = this.contact.name || k.formattedUser(this.id) : this.isGroup && (this.formattedTitle = this.contact.name)
        },
        sendExit: function() {
          if (!this.isGroup) return a["default"].reject(new C.ActionError);
          var e = b.leaveGroup(this.id),
            t = l10n.t("action_group_exiting"),
            n = e.then(function(e) {
              return 200 === e.status ? l10n.t("action_group_exited") : e.status >= 400 ? l10n.t("action_group_exit_failed") : void 0
            })["catch"](function(e) {
              return d.error("models:chat:sendExit dropped")(e), l10n.t("action_group_exit_failed")
            });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: t,
            actionText: n,
            retry: this.sendExit.bind(this)
          })), e.bind(this).then(function(e) {
            200 !== e.status || e._duplicate || this.exit()
          })
        },
        canExit: function() {
          return y.supportsFeature(y.F.GROUP_EXIT)
        },
        exit: function() {
          this.isGroup && (this.groupMetadata.participants.remove(Store.Conn.me), this.isReadOnly = !0)
        },
        sendDelete: function() {
          var e, t = this.msgs.last(),
            n = t ? t.id : void 0,
            r = b.sendConversationDelete(this.id, n),
            i = this.kind;
          switch (i) {
            case L.GROUP:
              e = l10n.t("action_group_deleting");
              break;
            case L.BROADCAST:
              e = l10n.t("action_broadcast_deleting");
              break;
            case L.CHAT:
              e = l10n.t("action_chat_deleting")
          }
          var o = r.bind(this).then(function(e) {
            if (200 === e.status) switch (i) {
              case L.GROUP:
                return l10n.t("action_group_deleted");
              case L.BROADCAST:
                return l10n.t("action_broadcast_deleted");
              case L.CHAT:
                return l10n.t("action_chat_deleted")
            } else if (e.status >= 400) switch (i) {
              case L.GROUP:
                return l10n.t("action_group_delete_failed");
              case L.BROADCAST:
                return l10n.t("action_broadcast_delete_failed");
              case L.CHAT:
                return l10n.t("action_chat_delete_failed")
            }
          })["catch"](function(e) {
            switch (d.error("models:chat:sendDelete dropped")(e), i) {
              case L.GROUP:
                return l10n.t("action_group_delete_failed");
              case L.BROADCAST:
                return l10n.t("action_broadcast_delete_failed");
              case L.CHAT:
                return l10n.t("action_chat_delete_failed")
            }
          });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: e,
            actionText: o,
            retry: this.sendDelete.bind(this)
          })), r.bind(this).then(function(e) {
            if (200 === e.status && !e._duplicate) {
              var n = this.msgs.last();
              t === n ? this["delete"](!0) : this.deleteMsgsBeforeMsgInclusive(t)
            }
          })
        },
        canDelete: function() {
          return y.supportsFeature(y.F.DELETE)
        },
        canClear: function() {
          return y.supportsFeature(y.F.CHAT_CLEAR)
        },
        sendClear: function(e) {
          var t = this,
            n = this.msgs.last(),
            r = n ? n.id : void 0,
            i = b.sendConversationClear(this.id, r, !e),
            o = l10n.t("action_chat_clearing"),
            s = i.then(function(e) {
              return 200 === e.status ? l10n.t("action_chat_cleared") : e.status >= 400 ? l10n.t("action_chat_clear_failed") : void 0
            })["catch"](function(e) {
              return d.error("models:chat:sendClear dropped")(e), l10n.t("action_chat_clear_failed")
            });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: o,
            actionText: s,
            retry: this.sendClear.bind(this, e)
          })), i.then(function(r) {
            200 !== r.status || r._duplicate || t.deleteMsgsBeforeMsgInclusive(n, e)
          })
        },
        "delete": function(e) {
          this.cancelPendingPromises(), u.prototype["delete"].call(this), this.groupMetadata["delete"](), this.presence["delete"](), Store.Mute.remove(this.id), this.mute["delete"](), this.deleteMsgs(), Store.Chat.remove(this.id), E.clearChat(this)
        },
        isDirty: function() {
          return 0 !== this.unreadCount
        },
        isNewlyCreated: function() {
          return !!this.createdLocally && 0 === this.msgs.length
        },
        isVisible: function() {
          return this.viewed || !this.isNewlyCreated()
        },
        onNewMsg: function(e) {
          if (e && "i" !== e.eventType)
            if (this.t = e.t, this.archive && (this.archive = !1), e.isSentByMe || this.presence.handle({
                id: this.id,
                participant: e.author,
                type: "available"
              }), e.isSentByMe) this.unreadCount = 0;
            else if ("d" === e.eventType) this.unreadCount = this.unreadCount + 1 || 1, E.alertNewMsg(e), this.msgs.length < l.MSG_PRELOAD_THRESHOLD && this.loadEarlierMsgs();
          else if ("s" === e.eventType) {
            if ("gp2" === e.type && "add" === e.subtype && _.first(e.recipients) === Store.Conn.me && !this.contact.name) return;
            E.alertNewMsg(e)
          }
        },
        setArchive: function(e) {
          if (this.archive === e) return a["default"].reject(new C.ActionError);
          var t = this.msgs.last(),
            n = t ? t.id : void 0,
            r = b.sendConversationArchive(this.id, e, n),
            i = e ? l10n.t("action_chat_archiving") : l10n.t("action_chat_unarchiving"),
            o = r.then(function(t) {
              return 200 === t.status ? e ? l10n.t("action_chat_archived") : l10n.t("action_chat_unarchived") : t.status >= 400 ? e ? l10n.t("action_chat_archive_failed") : l10n.t("action_chat_unarchive_failed") : void 0
            })["catch"](function(t) {
              return d.error("models:chat:setArchive dropped")(t), e ? l10n.t("action_chat_archive_failed") : l10n.t("action_chat_unarchive_failed")
            });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: i,
            actionText: o,
            retry: this.setArchive.bind(this, e)
          })), r.bind(this).then(function(t) {
            200 !== t.status || t._duplicate || (this.archive = e)
          })
        },
        canArchive: function() {
          return this.isBroadcast ? y.supportsFeature(y.F.ARCHIVE_BROADCAST) : y.supportsFeature(y.F.ARCHIVE)
        },
        sendSeen: function() {
          if (this.markedUnread || 0 === this.unreadCount) return a["default"].resolve();
          if (!T.available) return this.listenTo(T, "change:available", this.sendSeen), a["default"].resolve();
          this.stopListening(T, "change:available", this.sendSeen);
          for (var e, t = this.msgs.length - 1; t >= 0; t--) {
            var n = this.msgs.at(t);
            if (n && (!n.isSentByMe || !n.local || n.ack > 0)) {
              e = n;
              break
            }
          }
          var r = this.unreadCount - this.pendingSeenCount;
          if (0 === r) return a["default"].resolve();
          this.pendingSeenCount = this.unreadCount;
          var i = this,
            o = function() {
              i.pendingSeenCount = i.pendingSeenCount - r, i.pendingSeenCount < 0 && (d.error("models:chat:sendSeen unread " + i.unreadCount + " pending: " + i.pendingSeenCount + " delta: " + r)(), i.pendingSeenCount = 0)
            },
            s = e ? e.id : void 0;
          return y.gte([0, 4]) ? b.sendConversationSeen(this.id, s, r).bind(this).then(function(e) {
            return o(), 200 !== e.status || e._duplicate || this.markSeen(r), e
          })["catch"](C.WapDrop, function(e) {
            o(), d.error("models:chat:sendConversationSeen dropped")()
          }) : (o(), this.markSeen(r), b.sendConversationSeen(this.id, s, r).bind(this).then(function(e) {
            return e
          })["catch"](C.WapDrop, function(e) {
            d.error("models:chat:sendConversationSeen dropped")()
          }))
        },
        markSeen: function(e) {
          e && "number" == typeof e ? e > 0 && e <= this.unreadCount ? this.unreadCount = this.unreadCount - e : -1 === e && this.unreadCount <= 0 && (this.unreadCount = 0) : this.unreadCount = 0, this.markedUnread = !1
        },
        markUnread: function(e) {
          e ? this.active && (this.markedUnread = !0) : this.markedUnread = !1;
          var t = e ? this.sendUnseen() : this.sendSeen(),
            n = e ? l10n.t("action_chat_marking_unread") : l10n.t("action_chat_marking_read"),
            r = t.then(function(t) {
              return 200 === t.status ? e ? l10n.t("action_chat_marked_unread") : l10n.t("action_chat_marked_read") : t.status >= 400 ? e ? l10n.t("action_chat_mark_unread_failed") : l10n.t("action_chat_mark_read_failed") : void 0
            })["catch"](function(t) {
              return e ? l10n.t("action_chat_mark_unread_failed") : l10n.t("action_chat_mark_read_failed")
            });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: n,
            actionText: r,
            retry: this.markUnread.bind(this, e)
          })), t
        },
        canMarkUnseen: function() {
          return y.supportsFeature(y.F.CHAT_MARK_UNSEEN)
        },
        sendUnseen: function() {
          var e = this,
            t = this.msgs.last(),
            n = t ? t.id : void 0;
          return b.sendConversationUnseen(this.id, n).then(function(t) {
            return 200 === t.status ? e.markUnseen() : e.markedUnread = !1, t
          })
        },
        markUnseen: function() {
          this.active && (this.markedUnread = !0), this.unreadCount = -1
        },
        markRecording: function() {
          if ((this.presence.isOnline || this.isGroup) && !this.recording) {
            var e = this.id;
            b.sendChatstateRecording(e).then(function(t) {
              t.status >= 400 && d.error("models:chat send presence recording error " + e)()
            })["catch"](C.WapDrop, _.noop), this.presenceResendTimerId = _.delay(this._resendPresence.bind(this), l.PRESENCE_RESEND_WAIT)
          }
          this.pausedTimerId && (clearTimeout(this.pausedTimerId), this.unset("pausedTimerId")), this.recording = !0, this.typing = !1
        },
        markComposing: function() {
          if ((this.presence.isOnline || this.isGroup) && !this.typing) {
            var e = this.id;
            b.sendChatstateComposing(e).then(function(t) {
              t.status >= 400 && d.error("models:chat send presence composing error " + e)()
            })["catch"](C.WapDrop, _.noop), this.presenceResendTimerId = _.delay(this._resendPresence.bind(this), l.PRESENCE_RESEND_WAIT)
          }
          this.typing = !0, this.pausedTimerId && clearTimeout(this.pausedTimerId), this.pausedTimerId = _.delay(this.markPaused.bind(this), l.SEND_PAUSED_WAIT)
        },
        markPaused: function() {
          if ((this.presence.isOnline || this.isGroup) && (this.typing || this.recording)) {
            var e = this.id;
            b.sendChatstatePaused(e).then(function(t) {
              t.status >= 400 && d.error("models:chat send presence paused error " + e)()
            })["catch"](C.WapDrop, _.noop)
          }
          this.presenceResendTimerId && (clearTimeout(this.presenceResendTimerId), this.unset("presenceResendTimerId")), this.pausedTimerId && (clearTimeout(this.pausedTimerId), this.unset("pausedTimerId")), this.typing = this.recording = !1
        },
        _resendPresence: function() {
          var e = this.id;
          if (this.recording) b.sendChatstateRecording(e).then(function(t) {
            t.status >= 400 && d.error("models:chat send presence resend recording error " + e)()
          })["catch"](C.WapDrop, _.noop);
          else {
            if (!this.typing) return void this.unset("presenceResendTimerId");
            b.sendChatstateComposing(e).then(function(t) {
              t.status >= 400 && d.error("models:chat send presence resend composing error " + e)()
            })["catch"](C.WapDrop, _.noop)
          }
          this.presenceResendTimerId = _.delay(this._resendPresence.bind(this), l.PRESENCE_RESEND_WAIT)
        },
        _messageSent: function() {
          this.presenceResendTimerId && (clearTimeout(this.presenceResendTimerId), this.unset("presenceResendTimerId")), this.pausedTimerId && (clearTimeout(this.pausedTimerId), this.unset("pausedTimerId")), this.typing = !1
        },
        _presenceOnlineChanged: function() {
          this.presence.isOnline ? this._resendPresence() : this.presenceResendTimerId && (clearTimeout(this.presenceResendTimerId), this.unset("presenceResendTimerId"))
        },
        handleGroupAction: function(e, t, n) {
          var r;
          switch (e) {
            case "subject":
              return void(this.contact.name = n.subject);
            case "add":
            case "promote":
            case "demote":
              var i = "promote" === e;
              return r = _.map(n.participants, function(e) {
                return {
                  id: e,
                  isAdmin: i
                }
              }), void this.groupMetadata.participants.add(r, {
                merge: !0
              });
            case "remove":
              return r = this.groupMetadata.participants, void _.each(n.participants, function(e) {
                r.remove(e)
              });
            case "modify":
              return;
            default:
              return
          }
        },
        mediaMsgs: function() {
          return this.getAllMsgs().filter(function(e) {
            return e.isMedia
          })
        },
        preload: function() {
          1 === this.msgs.length && this.loadEarlierMsgs()
        },
        loadEarlierMsgs: function(e) {
          return e || (e = this.msgs), e.msgLoadState.noEarlierMsgs ? a["default"].resolve() : e.loadEarlierPromise ? e.loadEarlierPromise : this._loadMsgs("before", e).then(function(t) {
            return _.isArray(t) && t.length < l.PAGE_SIZE && (e.msgLoadState.noEarlierMsgs = !0), t
          })
        },
        isMostRecentCMC: function(e) {
          return this.msgs === e
        },
        loadRecentMsgs: function(e) {
          return e || (e = this.msgs), this.isMostRecentCMC(e) ? a["default"].resolve() : e.loadRecentPromise ? e.loadRecentPromise : this._loadMsgs("after", e)
        },
        _loadMsgs: function(e, t) {
          var n;
          n = "after" === e ? t.last() : t.first();
          var r = {};
          return n ? r = n.id.clone() : r.remote = this.id, r.count = l.PAGE_SIZE, r.direction = e, this._loadMsgsPromise(t, Store.Msg.findQuery(r), e)
        },
        _loadMsgsPromise: function(e, t, n) {
          "after" === n ? e.msgLoadState.isLoadingRecentMsgs = !0 : "before" === n ? e.msgLoadState.isLoadingEarlierMsgs = !0 : "around" === n && (e.msgLoadState.isLoadingAroundMsgs = !0);
          var r = this.regCancellablePromise(t)["finally"](function() {
            "after" === n ? (e.msgLoadState.isLoadingRecentMsgs = !1, delete e.loadRecentPromise) : "before" === n ? (e.msgLoadState.isLoadingEarlierMsgs = !1, delete e.loadEarlierPromise) : "around" === n && (e.msgLoadState.isLoadingAroundMsgs = !1, delete e.loadAroundPromise)
          })["catch"](C.WapDrop, _.noop)["catch"](function(e) {
            d.error("chat:loadMsgs:error " + e)()
          })["catch"](a["default"].CancellationError, _.noop);
          return "after" === n ? e.loadRecentPromise = r : "before" === n ? e.loadEarlierPromise = r : "around" === n && (e.loadAroundPromise = r), r
        },
        getSearchContext: function(e) {
          var t, n = e.msgChunk,
            r = (0, o["default"])(l.PAGE_SIZE / 3 * 2);
          if (n) t = n.loadAroundPromise ? n.loadAroundPromise : a["default"].resolve();
          else {
            var i = e.id.clone();
            i.count = r, n = e.msgChunk = new v, n.add(e), this.msgChunks.push(n);
            var s = function() {
              return e.msgChunk
            };
            t = this._loadMsgsPromise(n, Store.Msg.getContext(i, s), "around"), t.then(function(t) {
              var n = t[0];
              _.isArray(n) && n.length < r && (e.msgChunk.msgLoadState.noEarlierMsgs = !0)
            })
          }
          return {
            collection: n,
            promise: t,
            msg: e
          }
        },
        sendStarMsgs: function(e, t) {
          if (e && !_.any(e, function(e) {
              return !e.id
            })) {
            var n = b.sendMessageStarred(this.id, _.map(e, function(e) {
                return e.id
              }), t),
              r = _.size(e),
              i = {
                count: r,
                _plural: r
              },
              o = t ? l10n.t("action_message_starring", i) : l10n.t("action_message_unstarring", i),
              s = n.then(function(e) {
                return 200 === e.status ? t ? l10n.t("action_message_starred", i) : l10n.t("action_message_unstarred", i) : e.status >= 400 ? t ? l10n.t("action_message_star_failed", i) : l10n.t("action_message_unstar_failed", i) : void 0
              })["catch"](function(e) {
                return d.error("models:chat:sendStarMsgs dropped")(e), t ? l10n.t("action_message_star_failed", i) : l10n.t("action_message_unstar_failed", i)
              });
            return E.openToast(c.createElement(A, {
              id: A.genId(),
              pendingText: o,
              actionText: s,
              retry: this.sendStarMsgs.bind(this, e, t)
            })), n.then(function(n) {
              200 === n.status && (t ? Store.StarredMsg.add(e) : Store.StarredMsg.remove(e), _.forEach(e, function(e) {
                e.set("star", t)
              }))
            })
          }
        },
        sendNotSpam: function(e) {
          var t = this;
          if (!y.supportsFeature(y.F.SPAM)) return a["default"].resolve();
          if (this.notSpam) return a["default"].resolve();
          this.notSpam = !0;
          var n = b.sendConversationNotSpam(this.id);
          if (e) {
            var r = l10n.t("action_mark_as_not_spam"),
              i = n.then(function(e) {
                return 200 === e.status ? l10n.t("action_marked_as_not_spam") : e.status >= 400 ? l10n.t("action_mark_as_not_spam_failed") : void 0
              })["catch"](function(e) {
                return d.error("models:chat:sendNotSpam dropped")(e), l10n.t("action_mark_as_not_spam_failed")
              });
            E.openToast(c.createElement(A, {
              id: A.genId(),
              pendingText: r,
              actionText: i,
              retry: function() {
                return t.sendNotSpam(e)
              }
            }))
          }
          return n
        },
        sendSpamReport: function() {
          var e = b.sendSpamReport(this.id),
            t = l10n.t("action_spam_report"),
            n = e.then(function(e) {
              return 200 === e.status ? l10n.t("action_spam_reported") : e.status >= 400 ? l10n.t("action_spam_report_failed") : void 0
            })["catch"](function(e) {
              return d.error("models:chat:sendSpamReport dropped")(e), l10n.t("action_spam_report_failed")
            });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: t,
            actionText: n,
            retry: this.sendSpamReport.bind(this)
          })), e
        },
        sendDeleteMsgs: function(e) {
          if (e && !_.any(e, function(e) {
              return !e.id
            })) {
            var t = b.sendMessageDelete(this.id, _.map(e, function(e) {
                return e.id
              }), !0),
              n = _.size(e),
              r = {
                count: n,
                _plural: n
              },
              i = l10n.t("action_message_deleting", r),
              o = t.then(function(e) {
                return 200 === e.status ? l10n.t("action_message_deleted", r) : e.status >= 400 ? l10n.t("action_message_delete_failed", r) : void 0
              })["catch"](function(e) {
                return d.error("models:chat:sendDeleteMsgs dropped")(e), l10n.t("action_message_delete_failed", r)
              });
            return E.openToast(c.createElement(A, {
              id: A.genId(),
              pendingText: i,
              actionText: o,
              retry: this.sendDeleteMsgs.bind(this, e)
            })), t.then(function(t) {
              200 === t.status && _.forEach(e, function(e) {
                e["delete"]()
              })
            })
          }
        },
        removeMsg: function(e) {
          var t = e.msgChunk;
          if (t) {
            var n = t.indexOf(e);
            0 > n || (d.log("models:Chat:removeMsg " + e.get("id"))(), t.remove(e), 0 === t.length && (t === this.msgs ? (d.log("models:Chat:removeMsg 0 messages left, querying...")(), this.loadEarlierMsgs()) : this.removeMsgsCollection(t)))
          }
        },
        deleteMsgs: function(e) {
          var t = this;
          this.getAllCMCs().forEach(function(n) {
            for (; n.length;) {
              var r = n.at(0);
              !e && r.star || r["delete"]()
            }
            n.msgLoadState.noEarlierMsgs = !0, n !== t.msgs && t.removeMsgsCollection(n)
          }), this.unreadCount = 0
        },
        deleteMsgsOlderThan: function(e, t) {
          var n = this.msgs,
            r = _.first(n.models);
          if (r && !(r.t >= e)) {
            if (r = _.last(n.models), r.t < e) return void this.deleteMsgs(t);
            var i = function(n) {
              return n && (n.star && !t || n.t >= e)
            };
            this.deleteMsgsPartial(i)
          }
        },
        deleteMsgsBeforeMsgInclusive: function(e, t) {
          if (e && this.msgs.get(e.id)) {
            var n = this.msgs.indexOf(e),
              r = function(e, r) {
                return e.msgChunk === this.msgs && r > n || t && e.star
              };
            this.deleteMsgsPartial(r)
          }
        },
        deleteMsgsPartial: function(e) {
          var t = this,
            n = this.unreadCount,
            r = _.flatten(this.getAllCMCs().map(function(t) {
              return t.filter(function() {
                return !e.apply(this, arguments)
              }, this)
            }, this));
          if (r.forEach(function(e) {
              e["delete"]()
            }), _.clone(this.msgChunks).forEach(function(e) {
              0 === e.length && t.removeMsgsCollection(e)
            }), this.msgs.length > 0) {
            var i = n > this.msgs.length ? this.msgs.length : n;
            this.unreadCount = i, this.msgs.msgLoadState.noEarlierMsgs = !0
          }
        },
        getFirstMsgWithStatus: function() {
          return _.find(this.msgs.models, function(e) {
            return !e.isNotification && (e.isSentByMe || e.type === h.TYPE.PTT)
          })
        },
        getFirstMsgFromMe: function() {
          return _.find(this.msgs.models, function(e) {
            return !e.isNotification && e.isSentByMe
          })
        },
        sendMessage: function(e) {
          if (e = "undefined" == typeof e ? "" : e.trim(), "" === e) return a["default"].resolve();
          this._messageSent();
          var t = this.id,
            n = Store.Conn.me,
            r = new h({
              id: new w(n, t, h.newTag(), void 0, "out"),
              body: e,
              type: "chat",
              t: M.globalUnixTime(),
              from: n,
              to: t,
              self: "out",
              local: !0,
              ack: 0
            }),
            i = Store.Msg.send(r);
          return this.msgs.add(r), i
        },
        sendLocation: function(e, t, n, r) {
          var i = Store.Conn.me,
            o = this.id,
            s = this;
          return D.getThumb(e, t).then(function(a) {
            var c = {
              id: new w(i, o, h.newTag(), void 0, "out"),
              body: P.parseDataURL(a).data,
              type: "location",
              t: M.globalUnixTime(),
              from: i,
              to: o,
              self: "out",
              lat: e,
              lng: t,
              local: !0,
              ack: 0
            };
            r && n && (c.loc = n, c.url = r);
            var l = new h(c),
              d = Store.Msg.send(l);
            return s.msgs.add(l), d
          })
        },
        sendContact: function(e, t) {
          var n = Store.Conn.me,
            r = this.id,
            i = new h({
              id: new w(n, r, h.newTag(), void 0, "out"),
              type: "vcard",
              body: e,
              subtype: t,
              t: M.globalUnixTime(),
              from: n,
              to: r,
              self: "out",
              local: !0,
              ack: 0
            }),
            o = Store.Msg.send(i);
          return this.msgs.add(i), o
        },
        sendMedia: function(e) {
          var t = this;
          e = _.flatten([e], 1);
          var n = [],
            r = [];
          e.forEach(function(e) {
            var i = e.file,
              o = e.type,
              s = e.duration,
              a = e.caption,
              c = t._prepSendMedia(i, o, s, a);
            n.push(c.preMsg), r.push(c.AVparams)
          });
          var i = a["default"].reduce(n, function(e, n, i) {
            var o = t._createPendingMsg(n),
              s = r[i];
            return o.uploadPromise = s.promise, o.reupload = s.reupload, e.push(o), e
          }, []).then(function(e) {
            var t = _.invoke(_.pluck(r, "promise"), "reflect");
            return a["default"].reduce(t, function(t, n, r) {
              var i = e[r];
              return n.isFulfilled() && n.value() ? i.sendMediaMsg(n.value()).then(function() {
                i.set({
                  urlState: h.URL_STATE.STATUS_200,
                  uploadPromise: null,
                  reupload: null
                })
              }) : i.unset("uploadPromise"), e
            }, 1)
          });
          return this.regCancellablePromise(i)["catch"](a["default"].CancellationError, function() {
            _.invoke(n, "cancel"), _.invoke(_.pluck(r, "promise"), "cancel")
          })
        },
        _prepSendMedia: function(e, t, n, r) {
          function i() {
            return x.regCancellablePromise(a["default"].props({
              blob: g,
              okdup: C,
              hash: y,
              refs: k
            })).then(function(e) {
              var t = e.okdup;
              if ("duplicate" === t.result) return t.data;
              if ("ok" === t.result) {
                var n = t.data;
                return e.blob.encrypt ? O.uploadEncryptedMediaToMMS(n, e.blob.hashUploadBlob, o, e.hash.hash, e.refs) : O.uploadMediaToMMS(n, e.blob.hashUploadBlob, c, o)
              }
            })
          }
          var o = e.name,
            s = Store.Conn.me,
            c = this.id,
            d = new w(s, c, h.newTag(), void 0, "out"),
            u = R.typeFromMimetype(e.type),
            p = t || u,
            m = R.fileToBlobs(e),
            f = h.needsEncryption(c, p, e.type).then(function() {
              return a["default"].resolve({
                encrypt: !0,
                mediaKey: I.newB64MediaKey()
              })
            })["catch"](function() {
              return a["default"].resolve({
                encrypt: !1
              })
            }),
            g = f.then(function(e) {
              if (e.encrypt) {
                var t = m.then(function(e) {
                  return R.blobToArrayBuffer(e.blob)
                }).then(function(t) {
                  return I.encryptE2EMedia(p, t, e.mediaKey)
                });
                return a["default"].props({
                  encrypt: !0,
                  mediaKey: e.mediaKey,
                  hashUploadBlob: t
                })
              }
              return a["default"].props({
                encrypt: !1,
                hashUploadBlob: m.then(function(e) {
                  return e.blob
                })
              })
            }),
            v = n ? n : R.getFileDuration(e),
            y = g.then(function(e) {
              return R.getHash(e.hashUploadBlob).then(function(t) {
                return t.encrypt = e.encrypt, t
              })
            }),
            E = m.then(function(e) {
              return R.getHash(e.blob)
            }).then(function(e) {
              return e.hash
            }),
            T = void 0;
          switch (p) {
            case "video":
              var S = window.URL.createObjectURL(e);
              T = N.generateVideoThumb(S, l.IMG_THUMB_MAX_EDGE, l.IMG_THUMB_MAX_EDGE).then(function(e) {
                return P.parseDataURL(e.url).data
              })["finally"](function(e) {
                return window.URL.revokeObjectURL(S), e
              });
              break;
            case "image":
              T = N.resizeAndOrient(e, l.IMG_THUMB_MAX_EDGE, l.IMG_THUMB_MAX_EDGE).then(function(e) {
                return P.parseDataURL(e.url).data
              });
              break;
            default:
              T = a["default"].resolve()
          }
          var M = a["default"].props({
              blob: m,
              thumb: T,
              duration: v,
              key: d,
              caption: r,
              msgType: p,
              file: e,
              filename: o,
              mediaKey: f.then(function(e) {
                return e.mediaKey
              }),
              size: m.then(function(e) {
                return e.blob.size
              }),
              filehash: E
            }),
            C = y.then(function(e) {
              return e.encrypt ? b.requestEncryptedMediaUpload(u, e.hash) : b.requestMediaUpload(u, e.hash, e.size)
            }),
            k = g.then(function(e) {
              return e.encrypt ? O.computeRefs(c, u, e.mediaKey) : a["default"].resolve()
            }),
            x = this,
            D = i()["catch"](a["default"].CancellationError, _.noop);
          return {
            preMsg: M,
            AVparams: {
              promise: D,
              reupload: i
            }
          }
        },
        _createPendingMsg: function(e) {
          var t = Store.Msg.add({
            id: e.key,
            body: e.thumb,
            type: e.msgType,
            t: M.globalUnixTime(),
            from: Store.Conn.me,
            isNew: !0,
            to: this.id,
            self: "out",
            url: e.blob.dataUrl,
            urlState: h.URL_STATE.UPLOADING,
            duration: "number" != typeof e.duration || isNaN(e.duration) ? void 0 : e.duration + "",
            ack: 0,
            local: !0,
            mimetype: e.file.type,
            height: e.blob.h,
            width: e.blob.w,
            fullHeight: e.blob.h,
            fullWidth: e.blob.w,
            size: e.size,
            caption: e.caption,
            mediaKey: e.mediaKey,
            filehash: e.filehash,
            filename: e.filename,
            decryptedMediaBlob: e.mediaKey ? e.blob.blob : void 0,
            decryptedMediaURL: e.mediaKey ? e.blob.dataUrl : void 0
          });
          return this.msgs.add(t)
        },
        updateReadOnly: function() {
          this.isGroup && !this.groupMetadata.stale && (this.isReadOnly = !this.groupMetadata.participants.get(Store.Conn.me)), this.isBroadcast && this.updateTitle()
        },
        _updateAssignedColor: function() {
          if (this.colors) {
            var e = this.groupMetadata.participants;
            if (0 !== e.size) {
              var t = this.colors,
                n = _.difference(_.keys(t), e.pluck("id").map(x));
              n.forEach(function(e) {
                delete t[e]
              }), n.length && this._saveAssignedColors()
            }
          }
        },
        loadAssignedColors: function() {
          return this.listenTo(this.groupMetadata.participants, "all", this._updateAssignedColor), S.getGroupParticipantAssignedColor(this.id) || {}
        },
        saveAssignedColors: function() {
          var e = this.colors;
          e && S.setGroupParticipantAssignedColor(this.id, e)
        },
        assignedColor: function(e) {
          var t, n = this.colors || (this.colors = this.loadAssignedColors()),
            r = x(e);
          return (t = n[r]) ? t : (t = _.keys(n).length % l.NUM_COLORS + 1, n[r] = t, this._saveAssignedColors(), t)
        },
        setSubject: function() {
          var e = this,
            t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
          if (t = t.trim(), !t) return a["default"].reject(new C.ActionError);
          if (t === this.contact.name) return a["default"].reject(new C.ActionError);
          var n = b.changeSubject(this.id, t),
            r = l10n.t("action_group_renaming"),
            i = n.then(function(e) {
              return 200 === e.status ? l10n.t("action_group_renamed", {
                subject: t
              }) : e.status >= 400 ? l10n.t("action_group_rename_failed") : void 0
            })["catch"](function(e) {
              return d.error("models:chat:setSubject dropped")(e), l10n.t("action_group_rename_failed")
            });
          return E.openToast(c.createElement(A, {
            id: A.genId(),
            pendingText: r,
            actionText: i,
            retry: this.setSubject.bind(this, t)
          })), n.then(function(n) {
            200 !== n.status || n._duplicate || (e.contact.name = t)
          })
        },
        unstarAll: function() {
          this.getAllMsgs().forEach(function(e) {
            e && (e.star = !1)
          })
        },
        replaceMsgsCollection: function(e) {
          d.info("model:Chat:replaceMsgsCollection:" + this.id)(), this.msgs.replace(e), this.notifyMsgCollectionMerge(e, this.msgs, this.msgs), this.msgChunks = _.without(this.msgChunks, e)
        },
        notifyMsgCollectionMerge: function(e, t, n) {
          this.trigger("change:cmc:merge", e, t, n)
        },
        removeMsgsCollection: function(e) {
          this.msgChunks = _.without(this.msgChunks, e)
        },
        getAllCMCs: function() {
          return this.msgChunks.concat([this.msgs])
        },
        getAllMsgs: function() {
          return _.flatten(this.getAllCMCs().map(function(e) {
            return e.models
          }))
        }
      });
    U.KIND = L, e.exports = U
  },
  800: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(709),
      o = r(i),
      s = n(6),
      a = n(43),
      c = {
        LEFT: "left",
        MID: "mid",
        RIGHT: "right"
      },
      l = s.createClass({
        displayName: "Drawer",
        propTypes: {
          children: s.PropTypes.node.isRequired,
          id: s.PropTypes.string,
          variant: s.PropTypes.string,
          noContainer: s.PropTypes.bool,
          position: s.PropTypes.oneOf(_.values(c)),
          onDragLeave: s.PropTypes.func,
          onDrop: s.PropTypes.func,
          onDragOver: s.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            position: "left"
          }
        },
        statics: {
          RIGHT: "right",
          LEFT: "left",
          MID: "mid"
        },
        getInitialState: function() {
          return {
            isDragging: !1
          }
        },
        isDragDropDrawer: function() {
          return this.props.onDragOver && this.props.onDragLeave && this.props.onDrop
        },
        onDragOver: function(e) {
          e.preventDefault(), this.isDragDropDrawer() && !this.state.isDragging && (this.props.onDragOver(e), this.setState({
            isDragging: !0
          }))
        },
        onDrop: function(e) {
          e.preventDefault(), e.stopPropagation(), this.setState({
            isDragging: !1
          }), this.props.onDrop(e)
        },
        onDragLeave: function(e) {
          e.preventDefault(), e.stopPropagation(), this.state.isDragging && (this.setState({
            isDragging: !1
          }), this.props.onDragLeave(e))
        },
        render: function() {
          var e, t = this.props,
            n = a("drawer", (0, o["default"])({}, "drawer-" + t.id, !!t.id));
          if (this.isDragDropDrawer()) {
            var r = this.state.isDragging ? {} : {
              display: "none"
            };
            e = s.createElement("div", {
              key: "mask",
              className: "drag-drop-mask",
              style: r,
              onDragLeave: this.onDragLeave,
              onDrop: this.onDrop
            })
          }
          return s.createElement("div", {
            className: n,
            onDragOver: this.onDragOver
          }, e, t.children)
        }
      });
    l.Position = c, e.exports = l
  },
  801: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(6),
      l = n(43),
      d = c.createClass({
        displayName: "DrawerBody",
        propTypes: {
          expands: c.PropTypes.bool,
          flex: c.PropTypes.bool,
          classes: c.PropTypes.string
        },
        getDefaultProps: function() {
          return {
            expands: !1
          }
        },
        render: function() {
          var e = this.props,
            t = (e.expands, e.classes),
            n = e.flex,
            r = (0, a["default"])(e, ["expands", "classes", "flex"]),
            i = l("drawer-body", "drawer-editable", t, {
              "drawer-body-flex": n
            });
          return c.createElement("div", (0, o["default"])({
            className: i
          }, r), this.props.children)
        }
      });
    e.exports = d
  },
  802: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(355),
      o = n(43),
      s = n(82),
      a = {
        SMALL: "small",
        LARGE: "large",
        POPUP: "popup",
        OFFSET: "offset"
      },
      c = r.createClass({
        displayName: "DrawerHeader",
        propTypes: {
          children: r.PropTypes.node,
          title: r.PropTypes.string,
          onBack: r.PropTypes.func,
          onCancel: r.PropTypes.func,
          a8n: r.PropTypes.string,
          type: r.PropTypes.oneOf(_.values(a)).isRequired
        },
        render: function() {
          var e = this.props,
            t = e.title,
            n = e.onBack,
            c = e.onCancel,
            l = e.type,
            d = e.children,
            u = null;
          if (t) {
            var p = void 0,
              h = {
                textAlign: "initial"
              };
            l === a.SMALL ? (p = {
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "21px"
            }, h.width = 54) : l === a.LARGE ? (p = {
              fontWeight: 500,
              fontSize: 19,
              lineHeight: "19px"
            }, h.width = 54) : (p = {
              fontWeight: 500,
              fontSize: 19,
              lineHeight: "19px"
            }, h.width = 48, h.opacity = .7);
            var m = o("icon btn-close-drawer", {
                "icon-back": l === a.SMALL,
                "icon-back-light": l !== a.SMALL
              }),
              f = n ? r.createElement("span", {
                className: m,
                "data-a8n": i.key("btn-closer-drawer"),
                "data-ignore-capture": s.IGNORE_ANY,
                onClick: n
              }) : null,
              g = o("icon btn-close-drawer", {
                "icon-x": l === a.SMALL,
                "icon-x-light": l !== a.SMALL
              }),
              v = c ? r.createElement("span", {
                className: g,
                "data-a8n": i.key("btn-closer-drawer"),
                "data-ignore-capture": s.IGNORE_ANY,
                onClick: c
              }) : null;
            u = r.createElement("div", {
              className: "drawer-title",
              style: p
            }, r.createElement("div", {
              style: h,
              className: "drawer-title-action"
            }, f, v), r.createElement("span", {
              "data-a8n": i.key(this.props.a8n),
              className: "drawer-title-body"
            }, t))
          }
          var y = o({
            "drawer-header": l === a.LARGE,
            "drawer-header-small": l === a.SMALL,
            "drawer-header-offset": l === a.OFFSET,
            "drawer-header-popup": l === a.POPUP
          });
          return r.createElement("header", {
            className: y
          }, u, d)
        }
      });
    c.Type = a, e.exports = c
  },
  803: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(355),
      o = n(106),
      s = n(82),
      a = n(159),
      c = a.HotKeys,
      l = r.createClass({
        displayName: "MenuItem",
        mixins: [o],
        propTypes: {
          shortcut: r.PropTypes.string,
          action: r.PropTypes.func.isRequired,
          a8n: r.PropTypes.string
        },
        componentWillMount: function() {},
        onKeyDown: function(e) {
          if (e.metaKey) {
            var t = this.props.shortcut;
            t && e.key === t + "" && (e.preventDefault(), this.onClick(e))
          }
        },
        onClick: function(e) {
          this.props.action(e) || e.target && e.target.hasAttribute("data-ignore-capture") ? e.stopPropagation() : s.pop(s.MENU)
        },
        render: function() {
          var e = null,
            t = _.isString(this.props.children) ? this.props.children : null,
            n = {
              enter: this.onClick
            };
          return n[l10n.LR("right", "left")] = this.onClick, r.createElement(c, {
            component: "li",
            handlers: n,
            "data-a8n": i.key(this.props.a8n),
            className: "menu-item menu-shortcut",
            onClick: this.onClick
          }, r.createElement("a", {
            className: "ellipsify",
            title: t
          }, this.props.children), e)
        }
      });
    e.exports = l
  },
  804: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(709),
      a = r(s),
      c = n(354),
      l = r(c),
      d = n(6),
      u = n(28),
      p = n(166),
      h = n(43),
      m = n(8),
      f = n(106),
      g = n(158),
      v = 72,
      y = "data-list-scroll-container",
      E = d.createClass({
        displayName: "List",
        mixins: [f, g],
        propTypes: {
          extraItems: d.PropTypes.number,
          scrollTop: d.PropTypes.number,
          animate: d.PropTypes.bool.isRequired,
          classes: d.PropTypes.arrayOf(d.PropTypes.string),
          height: d.PropTypes.number.isRequired,
          data: d.PropTypes.arrayOf(d.PropTypes.element).isRequired
        },
        getDefaultProps: function() {
          return {
            classes: [],
            scrollTarget: null,
            data: null,
            height: v,
            extraItems: 30,
            animate: !1
          }
        },
        statics: {
          DEFAULT_HEIGHT: v,
          SCROLL_ATTR: y
        },
        getInitialState: function() {
          return {
            scrollTarget: void 0,
            firstVisibleIndex: 0,
            visibleCount: 0,
            physicalCount: 0,
            renderVisible: !0
          }
        },
        componentWillReceiveProps: function(e) {
          _.isNumber(e.scrollTop) && this.state.scrollTarget && (this.state.scrollTarget.scrollTop = e.scrollTop), this.props.scrollTarget === e.scrollTarget && this.props.height === e.height && this.props.data.length === e.data.length || this.initialize(e)
        },
        componentWillMount: function() {
          this.scrollTop = 0, this._eventLoopBusy = !1, this._uiBusy = !1, this.renderedItems = {}, this.disablePointerEventsOff = this.safeDebounce(this._disablePointerEventsOff, 150), this.disableUIBusy = this.safeDebounce(this._disableUIBusy, 150)
        },
        componentDidMount: function() {
          this.initialize();
          var e = this;
          this.regNativeListener(window, "resize", function() {
            e.initialize()
          })
        },
        initialize: function(e) {
          var t = e ? e : this.props;
          this.state.scrollTarget && this.unregNativeListener(this.state.scrollTarget, "scroll", this.onScroll);
          for (var n, r = u.findDOMNode(this), i = 0; 5 > i; i++) {
            if (r.hasAttribute(y)) {
              n = r;
              break
            }
            r = r.parentNode
          }
          if (!n) throw new Error("list scroll container not found");
          this.regNativeListener(n, "scroll", this.onScroll), this.scrollTop = n.scrollTop;
          var o = Math.floor(this.scrollTop / t.height),
            s = n.clientHeight,
            a = Math.min(Math.ceil(s / t.height), t.data.length),
            c = Math.min(a + t.extraItems, t.data.length);
          return this.setState({
            scrollTarget: n,
            firstVisibleIndex: o,
            visibleCount: a,
            physicalCount: c,
            renderVisible: !0
          }), this.renderedItems = {}, n
        },
        _disablePointerEventsOff: function(e) {
          this._pointerEvents = !1, u.findDOMNode(this.refs.viewport).style.pointerEvents = "auto"
        },
        disablePointerEvents: function(e) {
          this.disablePointerEventsOff(), this._pointerEvents || (u.findDOMNode(this.refs.viewport).style.pointerEvents = "none", this._pointerEvents = !0)
        },
        onScroll: function(e) {
          this._eventLoopBusy || window.requestAnimationFrame(this._onScroll), this._eventLoopBusy = !0
        },
        _disableUIBusy: function() {
          m.setUiBusy(!1), this._uiBusy = !1
        },
        _onScroll: function() {
          if (this.isMounted()) {
            this.disablePointerEvents(), this._uiBusy || (m.setUiBusy(!0), this._uiBusy = !0), this.disableUIBusy(), this.scrollTop = this.state.scrollTarget.scrollTop;
            var e = Math.floor(this.scrollTop / this.props.height);
            if (this.state.firstVisibleIndex === e) this._eventLoopBusy = !1;
            else {
              var t = this;
              this.setState({
                firstVisibleIndex: e,
                renderVisible: !1
              }, function() {
                t._eventLoopBusy = !1
              })
            }
          }
        },
        getFirstPhysicalIndex: function() {
          var e = this.state.firstVisibleIndex + this.state.visibleCount / 2,
            t = Math.max(0, Math.floor(e - this.state.physicalCount / 2));
          return Math.min(t, this.props.data.length - this.state.physicalCount)
        },
        getComponents: function() {
          var e = this,
            t = this.getFirstPhysicalIndex(),
            n = Math.min(t + this.state.physicalCount, this.props.data.length),
            r = {},
            i = _.chain(this.props.data).forEach(function(e, t) {
              return r[e.key] = t
            }).slice(t, n).forEach(function(t, n) {
              return e.renderedItems[t.key] = t
            }).value(),
            o = this.state.renderVisible ? i : this.renderedItems;
          return _(o).sortBy("key").map(function(t) {
            var n = 0 === r[t.key] ? "first" : null;
            return d.createElement(T, {
              key: t.key,
              rowHeight: e.props.height,
              classes: n,
              zIndex: e.props.data.length - r[t.key] - 1,
              rowNumber: r[t.key]
            }, t)
          }).value()
        },
        render: function() {
          var e = {
              container: {},
              viewport: {
                height: this.props.data.length * this.props.height
              }
            },
            t = {
              container: h("infinite-list", this.props.classes, {
                "infinite-list-animate": this.props.animate && !this._eventLoopBusy
              }),
              viewport: "infinite-list-viewport"
            },
            n = this.getComponents();
          return d.createElement("div", {
            className: t.container,
            style: e.container
          }, d.createElement("div", {
            className: t.viewport,
            ref: "viewport",
            style: e.viewport
          }, n))
        }
      }),
      T = d.createClass({
        displayName: "ListItem",
        propTypes: {
          children: d.PropTypes.element.isRequired,
          rowNumber: d.PropTypes.number.isRequired,
          rowHeight: d.PropTypes.number.isRequired,
          zIndex: d.PropTypes.number.isRequired
        },
        getInitialState: function() {
          return {
            rendered: !1
          }
        },
        componentDidMount: function() {
          this.setState({
            rendered: !0
          })
        },
        render: function() {
          var e = this.props,
            t = e.children,
            n = e.rowNumber,
            r = e.rowHeight,
            i = e.zIndex,
            s = e.classes,
            c = (0, l["default"])(e, ["children", "rowNumber", "rowHeight", "zIndex", "classes"]),
            u = (0, a["default"])({
              zIndex: i,
              height: r,
              willChange: "transform"
            }, p.prefix("transform"), "translate3d(0, " + 100 * n + "%, 0)"),
            m = h(s, {
              "infinite-list-item": !0,
              "infinite-list-item-keyframe": !this.state.rendered,
              "infinite-list-item-transition": !0
            });
          return d.createElement("div", (0, o["default"])({
            className: m,
            style: u
          }, c), t)
        }
      });
    e.exports = E
  },
  805: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(899),
      o = n(797),
      s = n(160),
      a = n(22),
      c = "large",
      l = "regular",
      d = "low",
      u = "high",
      p = r.createClass({
        displayName: "DetailImage",
        mixins: [o],
        propTypes: {
          id: r.PropTypes.string.isRequired,
          size: r.PropTypes.oneOf([l, c]),
          loader: r.PropTypes.bool,
          quality: r.PropTypes.oneOf([d, u]),
          onClick: r.PropTypes.func,
          onLoad: r.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            size: l,
            quality: d
          }
        },
        statics: {
          LARGE: c,
          REGULAR: l,
          LOW: d,
          HIGH: u
        },
        getInitialState: function() {
          var e = this.props.quality;
          return a.isBroadcast(this.props.id) ? {
            loaded: !1
          } : e === p.HIGH ? {
            loaded: !1,
            imgFull: this.async("id.ProfilePicThumb.imgFull", null)
          } : e === p.LOW ? {
            loaded: !1,
            img: this.async("id.ProfilePicThumb.img", null)
          } : void 0
        },
        onLoad: function(e) {
          this.state.loaded || this.setState({
            loaded: !0
          }), this.props.onLoad && this.props.onLoad()
        },
        onError: function(e) {
          if (410 === e) {
            var t = Store.ProfilePicThumb.get(this.props.id);
            t && t.update()
          }
        },
        getClasses: function() {
          var e = "avatar",
            t = this.props.id;
          return a.isUser(t) ? e += " icon-user-default" : a.isGroup(t) ? e += " icon-group-default" : a.isBroadcast(t) && (e += " icon-broadcast-default"), this.props.size === p.LARGE && (e += " avatar-l"), e
        },
        getStyle: function() {
          return this.props.onClick ? {
            cursor: "pointer"
          } : null
        },
        render: function() {
          var e = this.state.img || this.state.imgFull,
            t = Store.ProfilePicThumb.get(this.props.id),
            n = void 0;
          return !this.props.loader || this.state.loaded || t && !t.stale && !e || (n = r.createElement("div", {
            className: "avatar-spinner-container"
          }, r.createElement(s, {
            size: 50,
            stroke: 3
          }))), e = e ? r.createElement(i, {
            src: e,
            onLoad: this.onLoad,
            onError: this.onError
          }) : null, r.createElement("div", {
            className: this.getClasses(),
            style: this.getStyle(),
            onClick: this.props.onClick
          }, e, n)
        }
      });
    e.exports = p
  },
  806: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(161),
      s = n(819),
      a = n(805),
      c = n(891),
      l = n(82),
      d = n(797),
      u = n(105),
      p = n(43),
      h = n(798),
      m = n(829),
      f = n(159),
      g = f.HotKeys,
      v = {
        SMALL: "small",
        DEFAULT: "default"
      },
      y = r.createClass({
        displayName: "Contact",
        mixins: [d, u],
        propTypes: {
          contact: r.PropTypes.instanceOf(o).isRequired,
          onClick: r.PropTypes.func,
          mouseDownAsClick: r.PropTypes.bool,
          onDelete: r.PropTypes.func,
          onContext: r.PropTypes.func,
          contextEnabled: r.PropTypes.func,
          admin: r.PropTypes.bool,
          active: r.PropTypes.object,
          className: r.PropTypes.string,
          secondary: r.PropTypes.node,
          type: r.PropTypes.oneOf(_.values(v)),
          showNotifyName: r.PropTypes.bool
        },
        getInitialState: function() {
          var e = this.props.contact,
            t = this.props.active,
            n = {
              formattedName: this.async("contact.formattedName"),
              pendingAction: this.async("contact.pendingAction"),
              active: t ? t.value === e : !1,
              contextMenu: !1
            };
          return this.props.showNotifyName && (n.notifyName = this.async("contact.notifyName")), n
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.active;
          t && this.addObserver(t, this.props.contact.id, function(t) {
            if ("focus" === t) {
              var n = i.findDOMNode(e);
              n.focus(), m.scrollIntoViewIfNeeded(n)
            }
            e.setState({
              active: !!t
            })
          })
        },
        componentWillUnmount: function() {
          var e = i.findDOMNode(this);
          e.contains(document.activeElement) && l.focusNodeOrParent(e.parentNode)
        },
        contextEnabled: function() {
          return !1
        },
        onDelete: function(e) {
          e.stopPropagation(), this.props.onDelete(e, this.props.contact)
        },
        onClick: function(e) {
          _.isFunction(this.props.onClick) && this.props.onClick(e, this.props.contact)
        },
        onMouseDown: function(e) {
          0 === e.button && this.onClick(e)
        },
        onEnter: function(e) {
          e.preventDefault(), e.stopPropagation(), this.onClick(e)
        },
        onContext: function(e) {
          return this.state.contextMenu ? (l.pop(l.MENU), void this.setState({
            contextMenu: !1
          })) : (this.props.onContext(e, this.props.contact, this.onContextClose), void this.setState({
            contextMenu: !0
          }))
        },
        onContextClose: function() {
          this.setState({
            contextMenu: !1
          })
        },
        indicateFocus: function(e) {
          if (!(Date.now() - (g.flashFocus || 0) > 200)) {
            var t = i.findDOMNode(this.refs.cell);
            Velocity(t, "stop"), Velocity(t, {
              backgroundColor: ["#e9eaeb", "#cbdde7"]
            }, {
              duration: 1300,
              easing: [.19, .69, .01, .99],
              complete: this.onBlur
            })
          }
        },
        onBlur: function(e) {
          var t = i.findDOMNode(this.refs.cell);
          t && (Velocity(t, "stop"), t.style.backgroundColor = "")
        },
        render: function() {
          var e = this.props,
            t = e.contact,
            n = e.secondary,
            i = e.onContext,
            o = e.onDelete,
            l = e.contextEnabled,
            d = e.admin,
            u = e.showNotifyName,
            m = e.className;
          m = p("contact", m, {
            active: !!this.state.active
          });
          var f = void 0,
            y = void 0,
            E = void 0;
          if (!t.name && u && this.state.notifyName && (E = r.createElement("span", {
              className: "ellipsify screen-name"
            }, r.createElement(h, {
              classes: "screen-name-text",
              direction: "auto",
              text: this.state.notifyName.name
            }))), d && (y = r.createElement("div", {
              className: "chat-meta"
            }, r.createElement("div", {
              className: "chat-marker chat-marker-admin"
            }, l10n.t("web_group_admin")))), o) {
            var _ = p("icon", {
              "icon-x-alt-small": this.props.type === v.SMALL,
              "icon-x-alt": this.props.type !== v.SMALL
            });
            f = r.createElement("div", {
              className: "chat-controls"
            }, r.createElement("button", {
              className: _,
              onClick: this.onDelete
            }))
          }
          n || (n = r.createElement(c, {
            status: t.status
          })), i && (i = this.onContext);
          var T = r.createElement("div", {
              className: "chat-avatar"
            }, r.createElement(a, {
              id: t.id
            })),
            b = {
              enter: this.onEnter
            },
            S = this.props.mouseDownAsClick;
          return r.createElement(g, {
            handlers: b,
            onFocus: this.indicateFocus,
            onBlur: this.onBlur
          }, r.createElement(s, {
            id: t.id,
            ref: "cell",
            className: m,
            contextEnabled: l || this.contextEnabled,
            pendingAction: this.state.pendingAction,
            detail: f,
            image: T,
            primary: this.state.formattedName,
            primaryDetail: y,
            secondary: n,
            secondaryDetail: E,
            onClick: S ? null : this.onClick,
            onMouseDown: S ? this.onMouseDown : null,
            onContext: i
          }))
        }
      });
    y.Type = v, e.exports = y
  },
  807: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = r.createClass({
        displayName: "HiddenToken",
        propTypes: {
          children: r.PropTypes.node.isRequired
        },
        render: function() {
          return r.createElement("span", {
            className: "hidden-token"
          }, "⁠⁠⁠⁠", this.props.children, "⁠⁠⁠⁠⁠")
        }
      });
    e.exports = i
  },
  808: function(e, t, n) {
    "use strict";

    function r(e, t) {
      this.list = e, this.index = -1, this.value = void 0, this.getter = t || function(e) {
        return e
      }
    }
    var i = n(47);
    _.assign(r.prototype, i, {
      init: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
          n = void 0,
          r = void 0;
        if (this.value) {
          if (n = _.indexOf(e, this.value), n > -1) {
            if (n === this.index) return this.list = e;
            t = !0
          } else n = e.length && t ? Math.min(Math.max(this.index, 0), e.length - 1) : -1, r = !0;
          this.list = e, this.set(n, t, r)
        } else this.list = e
      },
      unset: function() {
        this.value && this.trigger(this.getter(this.value), !1), this.value = void 0, this.index = -1
      },
      reset: function() {
        this.index < 0 || this.value && this.trigger(this.getter(this.value), "focus")
      },
      set: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1],
          n = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2];
        if (this.list.length) {
          var r = Math.min(Math.max(e, -1), this.list.length - 1),
            i = this.value,
            o = r > -1 ? this.list[r] : void 0;
          o ? (this.trigger(this.getter(o), t ? "focus" : "select"), this.value = o) : this.value = void 0, n && i && i !== o && this.trigger(this.getter(i), !1), this.index = r
        }
      },
      getVal: function() {
        return this.value
      },
      setVal: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1],
          n = _.indexOf(this.list, e);
        n > -1 ? this.set(n, t) : (this.unset(), this.value = e)
      },
      setFirst: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
        _.isEmpty(this.list) || this.set(0, e)
      },
      setLast: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
        _.isEmpty(this.list) || this.set(this.list.length - 1, e)
      },
      setPrev: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
        _.isEmpty(this.list) || this.set(this.prev(), e)
      },
      setNext: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
        _.isEmpty(this.list) || this.set(this.next(), e)
      },
      prev: function() {
        return _.isEmpty(this.list) ? -1 : -1 === this.index ? -1 : this.index - 1
      },
      next: function() {
        return _.isEmpty(this.list) ? -1 : Math.min(this.index + 1, this.list.length - 1)
      }
    }), e.exports = r
  },
  809: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(6),
      l = n(160),
      d = n(43),
      u = function(e) {
        var t = e.className,
          n = d("empty-icon", t);
        return c.createElement("div", {
          className: "empty-icon-container"
        }, c.createElement("span", {
          className: n
        }))
      },
      p = function(e) {
        var t = e.icon,
          n = e.title,
          r = e.text,
          i = e.className,
          s = e.children,
          l = (0, a["default"])(e, ["icon", "title", "text", "className", "children"]),
          u = n ? c.createElement("div", {
            className: "empty-title"
          }, n) : null,
          p = r ? c.createElement("div", {
            className: "empty-text"
          }, r) : null,
          h = d("empty", i);
        return c.createElement("div", (0, o["default"])({
          className: h
        }, l), t, u, p, s)
      },
      h = function() {
        var e = c.createElement(u, {
          className: "icon-empty-blocked"
        });
        return c.createElement(p, {
          icon: e,
          title: l10n.t("blocked_empty"),
          text: l10n.t("add_blocked_description")
        })
      },
      m = function() {
        var e = c.createElement(u, {
          className: "icon-empty-archived"
        });
        return c.createElement(p, {
          icon: e,
          title: l10n.t("archived_empty")
        })
      },
      f = function() {
        return c.createElement(p, {
          className: "empty-top",
          text: l10n.t("search_no_chats_or_contacts")
        })
      },
      g = function() {
        return c.createElement(p, {
          className: "empty-top",
          text: l10n.t("search_no_contacts")
        })
      },
      v = function() {
        return c.createElement(p, {
          className: "empty-top",
          text: l10n.t("search_no_groups")
        })
      },
      y = function() {
        return c.createElement(p, {
          text: l10n.t("no_chats")
        })
      },
      E = function() {
        return c.createElement(p, {
          text: l10n.t("no_contacts")
        })
      },
      _ = function() {
        return c.createElement(p, {
          text: l10n.t("no_groups")
        })
      },
      T = function() {
        return c.createElement(p, {
          text: l10n.t("all_chats_archived")
        })
      },
      b = function() {
        return c.createElement(p, {
          text: l10n.t("no_starred_messages")
        })
      },
      S = function() {
        return c.createElement(p, null, c.createElement(l, null))
      };
    e.exports = {
      Blocked: h,
      Archived: m,
      Search: f,
      SearchContacts: g,
      SearchGroups: v,
      List: y,
      ListContacts: E,
      ListGroups: _,
      AllArchived: T,
      StarredMsgs: b,
      Loading: S
    }
  },
  810: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(158),
      s = n(43),
      a = 4e3,
      c = r.createClass({
        displayName: "Toast",
        mixins: [o],
        propTypes: {
          id: r.PropTypes.string.isRequired,
          msg: r.PropTypes.string.isRequired,
          action: r.PropTypes.shape({
            actionText: r.PropTypes.string.isRequired,
            onAction: r.PropTypes.func.isRequired
          }),
          onDismiss: r.PropTypes.func,
          duration: r.PropTypes.number
        },
        statics: {
          genId: function(e) {
            return _.uniqueId(e || "toast")
          }
        },
        getDefaultProps: function() {
          return {
            duration: a
          }
        },
        componentWillMount: function() {
          this.delay = this.safeDelay(function() {
            i.closeToast(this)
          }, a)
        },
        restartDelay: function() {
          this.clearSafeTimeout(this.delay), this.delay = this.safeDelay(function() {
            i.closeToast(this)
          }, a)
        },
        onDismiss: function() {
          i.closeToast(this), this.props.onDismiss && this.props.onDismiss()
        },
        render: function() {
          var e, t = this.props,
            n = t.msg,
            i = t.action,
            o = t.className;
          return i && (e = r.createElement("button", {
            className: "action",
            onClick: i.onAction
          }, i.actionText)), r.createElement("div", {
            className: s("toast", o)
          }, r.createElement("span", null, n), e, r.createElement("button", {
            className: "icon icon-x-alt",
            onClick: this.onDismiss
          }))
        }
      });
    e.exports = c
  },
  811: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(798),
      s = n(796),
      a = n(8),
      c = n(22),
      l = n(43),
      d = function(e) {
        function t() {
          Store.Chat.find(n.author).then(function(e) {
            a.openChat(e)
          })
        }
        var n = e.msg,
          s = n.chat.assignedColor(n.sender),
          d = n.senderObj,
          u = l("message-author color-" + s, {
            "title-number": !d.name
          }),
          p = void 0;
        return p = d.name ? r.createElement("span", {
          className: "text-clickable",
          onClick: t
        }, r.createElement(o, {
          text: d.name
        })) : [r.createElement("span", {
          className: "number text-clickable",
          key: n.id + "-number",
          onClick: t
        }, c.formattedUser(d.id)), r.createElement("span", {
          className: "ellipsify screen-name",
          key: n.id + "-push-name",
          onClick: t
        }, r.createElement(o, {
          classes: "screen-name-text",
          direction: "auto",
          text: n.notifyName
        }))], r.createElement("h3", {
          className: u
        }, r.createElement(i, null, p))
      };
    d.shouldRender = function(e) {
      return !e.isSentByMe && e.isGroupMsg
    }, d.propTypes = {
      msg: r.PropTypes.instanceOf(s).isRequired
    }, e.exports = d
  },
  812: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(920),
      s = n(796),
      a = n(43),
      c = n(157),
      l = n(8),
      d = n(83),
      u = n(797),
      p = r.createClass({
        displayName: "Meta",
        mixins: [u],
        propTypes: {
          msg: r.PropTypes.instanceOf(s).isRequired
        },
        getInitialState: function() {
          return d.supportsFeature(d.F.STARRED) ? {
            star: this.async("msg.star")
          } : {}
        },
        openInfoDrawer: function() {
          l.msgInfoDrawer(this.props.msg)
        },
        render: function() {
          var e, t, n = this.props.msg,
            l = n.broadcast || n.star ? (n.type === s.TYPE.IMAGE || n.type === s.TYPE.VIDEO) && !n.caption : null;
          if (n.broadcast) {
            var u = a("icon-s", {
              "icon-broadcast-light": l,
              "icon-broadcast": !l
            });
            e = r.createElement("span", {
              className: u
            })
          }
          if (n.star) {
            var p = a("icon-s", {
              "icon-star-light": l,
              "icon-star": !l
            });
            t = r.createElement("span", {
              className: p
            })
          }
          var h = n.isSentByMe ? r.createElement(o, {
              msg: this.props.msg
            }) : null,
            m = n.isSentByMe && d.supportsFeature(d.F.MESSAGE_INFO);
          return r.createElement("div", {
            className: m ? "message-meta text-clickable" : "message-meta",
            onClick: m ? this.openInfoDrawer : null
          }, t, e, r.createElement(i, null, r.createElement("span", {
            className: "message-datetime"
          }, c.timestampStr(n.t))), h)
        }
      });
    e.exports = p
  },
  813: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i, o = n(709),
      s = r(o),
      a = n(6),
      c = n(8),
      l = n(43),
      d = n(82),
      u = n(107),
      p = (i = {}, (0, s["default"])(i, d.DRAWER_LEFT, "drawer-container-left"), (0, s["default"])(i, d.DRAWER_RIGHT, "drawer-container-right"), (0, s["default"])(i, d.DRAWER_MID, "drawer-container-mid"), (0, s["default"])(i, d.MODAL, "modal"), i),
      h = {
        PUSH: "-push",
        POP: "-pop",
        DEFAULT_DRAWER: "flow-transition-drawer",
        DEFAULT_MODAL: "flow-transition-modal"
      },
      m = {
        propTypes: {
          type: a.PropTypes.oneOf(_.keys(p))
        },
        getDefaultProps: function() {
          return {
            type: p[d.MODAL]
          }
        },
        getInitialState: function() {
          return {
            _stack: []
          }
        },
        endFlow: function() {
          this.props.type === p.MODAL ? c.closeModal() : c.closeDrawer(this.props.type)
        },
        push: function(e, t) {
          this.state._stack.push(e), this.setState({
            _stack: this.state._stack,
            _transition: (t || this.props.transition || h.DEFAULT_MODAL) + h.PUSH
          })
        },
        pop: function(e, t) {
          if (this.state._stack.length <= 1) return this.endFlow();
          if (this.state._stack.pop(), e) {
            var n = _.last(this.state._stack);
            e.key = _.uniqueId("flow_"), n = a.cloneElement(n, e), this.state._stack.splice(this.state._stack.length - 1, 1, n)
          }
          this.setState({
            _stack: this.state._stack,
            _transition: (t || this.props.transition || h.DEFAULT_MODAL) + h.POP
          })
        },
        render: function() {
          var e = _.last(this.state._stack);
          _.isFunction(e) && (e = e());
          var t = l(p[this.props.type], {
            "flow-drawer-container": this.props.type !== p[d.MODAL]
          });
          return a.createElement(u, {
            transitionName: this.state._transition,
            className: t
          }, e)
        }
      };
    m.Type = p, m.Transition = h, e.exports = m
  },
  814: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(6),
      l = n(355),
      d = n(43),
      u = c.createClass({
        displayName: "DrawerSection",
        propTypes: {
          children: c.PropTypes.node.isRequired,
          title: c.PropTypes.node,
          subtitle: c.PropTypes.node,
          footer: c.PropTypes.node,
          expands: c.PropTypes.bool.isRequired,
          classes: c.PropTypes.string,
          onMouseDown: c.PropTypes.func,
          noContainer: c.PropTypes.bool,
          a8n: c.PropTypes.string
        },
        getDefaultProps: function() {
          return {
            expands: !1,
            noContainer: !1
          }
        },
        render: function() {
          var e = this.props,
            t = e.children,
            n = e.title,
            r = e.subtitle,
            i = e.footer,
            s = e.expands,
            u = e.classes,
            p = e.onMouseDown,
            h = e.noContainer,
            m = (0, a["default"])(e, ["children", "title", "subtitle", "footer", "expands", "classes", "onMouseDown", "noContainer"]),
            f = d(u, {
              "drawer-section-expand": !!s,
              "drawer-section": !s,
              well: !!n
            });
          if (!n) return c.createElement("div", {
            className: f
          }, t);
          var g = r ? c.createElement("div", {
              className: "col-side"
            }, r) : null,
            v = t;
          if (!h && v) {
            var y = d("drawer-section-body", {
              "drawer-section-body-expand": !!s,
              chatlist: !!s
            });
            v = c.createElement("div", {
              className: y
            }, t)
          }
          return c.createElement("div", (0, o["default"])({
            className: f,
            onMouseDown: p
          }, m), c.createElement("div", {
            className: "drawer-section-title title-underlined"
          }, c.createElement("div", {
            "data-a8n": l.key(this.props.a8n),
            className: "col-main"
          }, n), g), v, i)
        }
      });
    e.exports = u
  },
  815: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(866),
      o = n(867),
      s = n(898),
      a = n(107),
      c = n(8),
      l = n(357),
      d = n(82),
      u = n(163),
      p = n(43),
      h = r.createClass({
        displayName: "AdvancedInput",
        mixins: [u],
        propTypes: {
          id: r.PropTypes.string,
          editable: r.PropTypes.bool,
          value: r.PropTypes.string,
          maxLength: r.PropTypes.number,
          showRemaining: r.PropTypes.bool,
          selection: r.PropTypes.object,
          onEnter: r.PropTypes.func,
          onChange: r.PropTypes.func,
          onCancel: r.PropTypes.func,
          onSelectionChange: r.PropTypes.func,
          multiline: r.PropTypes.bool,
          placeholder: r.PropTypes.string,
          floating: r.PropTypes.bool,
          parent: r.PropTypes.object,
          disableEmoji: r.PropTypes.bool
        },
        getDefaultProps: function() {
          return {
            placeholder: "",
            floating: !0,
            multiline: !0,
            showRemaining: !1,
            editable: !1,
            disableEmoji: !1
          }
        },
        getInitialState: function() {
          return {
            active: !1
          }
        },
        componentDidMount: function() {
          this.regWithUIManager()
        },
        componentDidUpdate: function(e) {
          !e.editable && this.props.editable ? this.regWithUIManager() : e.editable && !this.props.editable && this.unregWithUIManager()
        },
        regWithUIManager: function() {
          this.props.id && this.props.editable && this.uimPush(this.props.parent || this, this.props.id, {
            popable: !0,
            maintainFocus: !0
          })
        },
        unregWithUIManager: function() {
          this.props.id && this.uimPop(this.props.id), d.popDependents(this)
        },
        componentWillUnmount: function() {
          this.unregWithUIManager()
        },
        onEmoji: function(e) {
          this.refs.inputLine.replaceSelection(e)
        },
        onFocus: function() {
          this.props.id && d.stealFocus(this.props.id), this.setState({
            active: !0
          })
        },
        onBlur: function() {
          this.setState({
            active: !1
          })
        },
        restoreFocus: function() {
          this.refs.inputLine.restoreFocus()
        },
        onEmojiPicker: function(e) {
          e && (e.preventDefault(), e.stopPropagation());
          var t = r.createElement(o, {
            onEmoji: this.onEmoji
          });
          this.props.id && this.regWithUIManager(), c.openContextMenu(t, {
            anchor: e.target,
            parent: this,
            menuDirection: {
              y: l.Direction.Y.TOP
            },
            type: l.Type.EMOJI_PICKER
          }), this.restoreFocus()
        },
        uimClose: function() {
          this.props.onCancel && this.props.onCancel()
        },
        uimFocus: function() {
          this.restoreFocus()
        },
        focus: function() {
          this.restoreFocus()
        },
        preventBlur: function(e) {
          e.preventDefault(), e.stopPropagation(), this.restoreFocus()
        },
        render: function() {
          var e = p("input-emoji input-advanced", this.props.className, {
              active: this.state.active,
              "static": !this.props.editable
            }),
            t = this.props.editable && !this.props.disableEmoji ? r.createElement("button", {
              className: "icon icon-emoji-input",
              onClick: this.onEmojiPicker
            }) : null,
            n = this.props.floating ? this.props.placeholder : void 0,
            o = this.props.value || this.props.floating ? void 0 : this.props.placeholder;
          return r.createElement("div", {
            className: e,
            onMouseDown: this.preventBlur
          }, r.createElement(s, {
            placeholder: n,
            hasText: !!this.props.value
          }, r.createElement("div", {
            className: "input-main"
          }, r.createElement(i, {
            ref: "inputLine",
            value: this.props.value,
            className: "input-line",
            placeholder: o,
            onChange: this.props.onChange,
            onEnter: this.props.onEnter,
            editable: this.props.editable,
            maxLength: this.props.maxLength,
            showRemaining: this.props.showRemaining,
            onFocus: this.onFocus,
            onBlur: this.onBlur
          }), r.createElement(a, {
            transitionName: "pop",
            className: "btn-input"
          }, t))))
        }
      });
    e.exports = h
  },
  816: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(799),
      s = n(819),
      a = n(805),
      c = n(859),
      l = n(896),
      d = n(856),
      u = n(901),
      p = n(853),
      h = n(884),
      m = n(857),
      f = n(861),
      g = n(887),
      v = n(818),
      y = n(797),
      E = n(105),
      T = n(7),
      b = n(82),
      S = n(8),
      M = n(43),
      C = n(829),
      w = n(159),
      N = w.HotKeys,
      P = {
        LAST: "last",
        INFO: "info"
      },
      R = r.createClass({
        displayName: "Chat",
        mixins: [y, E],
        propTypes: {
          chat: r.PropTypes.instanceOf(o).isRequired,
          mode: r.PropTypes.oneOf(_.values(P)).isRequired,
          noContext: r.PropTypes.bool,
          mouseDownAsClick: r.PropTypes.bool,
          onClick: r.PropTypes.func,
          active: r.PropTypes.object
        },
        statics: {
          Mode: P
        },
        getDefaultProps: function() {
          return {
            mode: P.LAST
          }
        },
        getInitialState: function() {
          this.hoverCounter = 0;
          var e = this.props.chat,
            t = this.props.active;
          return {
            formattedTitle: this.async("chat.formattedTitle"),
            hasUnread: this.async("chat.hasUnread"),
            isReadOnly: this.async("chat.isReadOnly"),
            pendingAction: this.async("chat.pendingAction"),
            active: t ? t.value === e : !1,
            contextMenu: !1
          }
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.active;
          t && this.addObserver(t, this.props.chat.id, function(t) {
            if ("focus" === t) {
              var n = i.findDOMNode(e);
              n.focus(), C.scrollIntoViewIfNeeded(n)
            }
            e.setState({
              active: t
            })
          })
        },
        componentWillUpdate: function(e, t) {
          this.state.isReadOnly !== t.isReadOnly && b.pop(b.MENU)
        },
        componentWillUnmount: function() {
          var e = i.findDOMNode(this);
          e.contains(document.activeElement) && b.focusNodeOrParent(e.parentNode), this.state.contextMenu && b.pop(b.MENU)
        },
        contextEnabled: function() {
          var e = this.props,
            t = e.chat,
            n = e.noContext;
          return !n && (t.mute.canMute() || t.canArchive() || t.canDelete() || t.canExit())
        },
        onMenu: function(e) {
          if (this.state.contextMenu) return b.pop(b.MENU), void this.setState({
            contextMenu: !1
          });
          var t = this.props.chat,
            n = [];
          t.canArchive() && n.push(r.createElement(l, {
            key: "archive",
            onArchive: this.onArchive,
            chat: t
          })), t.mute.canMute() && n.push(r.createElement(c, {
            key: "mute",
            onMute: this.onMute,
            chat: t
          })), t.canDelete() && n.push(r.createElement(d, {
            key: "delete",
            onDeleteOrExit: this.onDeleteOrExit,
            chat: t
          })), t.canMarkUnseen() && n.push(r.createElement(u, {
            key: "mark_unread",
            onMarkUnread: this.onMarkUnread,
            chat: t
          })), this.setState({
            contextMenu: !0
          }), S.openContextMenu(n, {
            onDefault: this.onClick,
            onClose: this.removeContext,
            event: e.event,
            anchor: e.anchor,
            parent: this
          })
        },
        removeContext: function() {
          this.setState({
            contextMenu: !1
          })
        },
        onMute: function(e) {
          S.muteChat(this.props.chat, e, this)
        },
        onArchive: function(e) {
          S.archiveChat(this.props.chat, e)
        },
        onDeleteOrExit: function() {
          S.deleteOrExitChat(this.props.chat, this)
        },
        onMarkUnread: function(e) {
          S.markChatUnread(this.props.chat, e)
        },
        onClick: function(e) {
          _.isFunction(this.props.onClick) && this.props.onClick(e, this.props.chat)
        },
        onMouseDown: function(e) {
          0 === e.button && this.onClick(e)
        },
        onEnter: function(e) {
          e.preventDefault(), e.stopPropagation(), N.flashFocus = Date.now(), this.onClick(e)
        },
        onDragEnter: function(e) {
          var t = e.dataTransfer;
          _.contains(t.types, T.DRAG_TYPE_FILE) && (0 === this.hoverCounter && this.setState({
            dragging: !0
          }), this.hoverCounter += 1)
        },
        onDragLeave: function(e) {
          var t = e.dataTransfer;
          _.contains(t.types, T.DRAG_TYPE_FILE) && (this.hoverCounter -= 1, 0 === this.hoverCounter && this.setState({
            dragging: !1
          }))
        },
        onDrop: function(e) {
          this.setState({
            dragging: !1
          });
          var t = void 0,
            n = e.dataTransfer;
          _.contains(n.types, T.DRAG_TYPE_FILE) && (t = Array.prototype.slice.call(e.target.files || n.files), S.openChat(this.props.chat, void 0, !1), S.openDrawer(r.createElement(v, {
            files: t,
            chat: this.props.chat,
            type: b.DRAWER_MID
          }), "slide-up"))
        },
        indicateFocus: function(e) {
          if (!(Date.now() - (N.flashFocus || 0) > 200)) {
            var t = i.findDOMNode(this.refs.cell);
            Velocity(t, "stop"), Velocity(t, {
              backgroundColor: ["#e9eaeb", "#cbdde7"]
            }, {
              duration: 1300,
              easing: [.19, .69, .01, .99],
              complete: this.onBlur
            })
          }
        },
        onBlur: function(e) {
          var t = i.findDOMNode(this.refs.cell);
          t && (Velocity(t, "stop"), t.style.backgroundColor = "")
        },
        render: function() {
          var e = this,
            t = this.props,
            n = t.chat,
            i = t.mode,
            o = t.secondary,
            c = t.className;
          c = M(c, {
            unread: this.state.hasUnread,
            active: !!this.state.active,
            "chat-drag": this.state.dragging
          });
          var l = void 0,
            d = void 0,
            u = void 0;
          switch (i) {
            case P.LAST:
              l = r.createElement(p, {
                chat: n
              }), o || (o = r.createElement(h, {
                chat: n
              }), d = r.createElement(g, {
                chat: n
              })), u = {
                enter: this.onEnter,
                right: function() {
                  e.refs.cell.openContextMenu()
                }
              };
              break;
            case P.INFO:
              o || (o = n.isGroup ? r.createElement(m, {
                presence: n.presence,
                groupMetadata: n.groupMetadata,
                location: "list"
              }) : r.createElement(f, {
                presence: n.presence,
                location: "list"
              })), u = {
                enter: this.onEnter
              }
          }
          var v = r.createElement("div", {
              className: "chat-avatar"
            }, r.createElement(a, {
              id: n.id
            })),
            y = this.props.mouseDownAsClick;
          return r.createElement(N, {
            handlers: u,
            onFocus: this.indicateFocus,
            onBlur: this.onBlur,
            className: "chat-drag-cover",
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave,
            onDrop: this.onDrop
          }, r.createElement(s, {
            id: n.id,
            ref: "cell",
            className: c,
            contextEnabled: this.contextEnabled,
            pendingAction: this.state.pendingAction,
            contextMenu: this.state.contextMenu,
            image: v,
            primary: this.state.formattedTitle,
            primaryDetail: l,
            secondary: o,
            secondaryDetail: d,
            onClick: y ? null : this.onClick,
            onMouseDown: y ? this.onMouseDown : null,
            onContext: this.onMenu
          }))
        }
      });
    e.exports = R
  },
  817: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(6),
      l = n(28),
      d = n(106),
      u = n(43),
      p = {
        COVER: "cover",
        SCALE_DOWN: "scaleDown"
      },
      h = c.createClass({
        displayName: "ObjectFit",
        mixins: [d],
        propTypes: {
          children: c.PropTypes.node.isRequired,
          type: c.PropTypes.oneOf(_.values(p)).isRequired,
          size: c.PropTypes.shape({
            width: c.PropTypes.number.isRequired,
            height: c.PropTypes.number.isRequired
          })
        },
        statics: {
          TYPES: p
        },
        getInitialState: function() {
          return {
            style: this.props.size,
            className: "object-fit",
            computed: !1
          }
        },
        componentDidMount: function() {
          if (!this.shouldUseNativeObjectFit()) {
            this.initialize();
            var e = this;
            this.regNativeListener(window, "resize", function() {
              e.initialize()
            })
          }
        },
        componentWillReceiveProps: function(e) {
          this.initialize(e)
        },
        initialize: function(e) {
          this.shouldUseNativeObjectFit() || (e = e || this.props, e.size && this.setState(this[e.type](e.size.width, e.size.height)))
        },
        shouldUseNativeObjectFit: function() {
          return !1
        },
        cover: function(e, t) {
          var n = l.findDOMNode(this),
            r = n.clientWidth,
            i = n.clientHeight,
            o = e,
            s = t,
            a = 0,
            c = 0;
          return o !== r && (s *= r / o, o = r, s > i && (a = i / 2 - s / 2)), i > s && (o *= i / s, s = i, o > r && (c = r / 2 - o / 2)), {
            style: {
              width: o,
              height: s,
              top: a,
              left: c,
              position: "absolute"
            },
            className: "object-fit object-fit-cover",
            computed: !0
          }
        },
        scaleDown: function(e, t) {
          var n = l.findDOMNode(this),
            r = n.clientWidth,
            i = n.clientHeight,
            o = t,
            s = e;
          return o > i && (o = i, s = e * (i / t)), s > r && (s = r, o = t * (r / e)), {
            style: {
              width: s,
              height: o
            },
            className: "object-fit object-fit-scaledown",
            computed: !0
          }
        },
        render: function() {
          var e = this.props,
            t = e.children,
            n = (e.size, e.type, e.className),
            r = (0, a["default"])(e, ["children", "size", "type", "className"]);
          if (this.shouldUseNativeObjectFit()) return c.createElement("div", {
            className: "native-scale-down"
          }, t);
          var i = u(this.state.className, n),
            s = this.state.computed ? this.state.style : {
              visibility: "hidden"
            };
          return c.createElement("div", (0, o["default"])({}, r, {
            className: i
          }), c.createElement("div", {
            style: s
          }, t))
        }
      });
    e.exports = h
  },
  818: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(813),
      o = n(869),
      s = n(799),
      a = n(8),
      c = r.createClass({
        displayName: "AttachMediaFlow",
        mixins: [i],
        propTypes: {
          files: r.PropTypes.array,
          state: r.PropTypes.string,
          chat: r.PropTypes.instanceOf(s).isRequired
        },
        componentWillMount: function() {
          this.push(r.createElement(o, {
            files: this.props.files,
            state: this.props.state,
            onBack: this.endFlow,
            onSend: this.sendMedia
          }))
        },
        componentWillUnmount: function() {
          a.focusChatTextInput(this.props.chat)
        },
        sendMedia: function(e) {
          var t = this.props.chat;
          _.delay(function() {
            t.sendMedia(e)
          }, 300), this.endFlow()
        }
      });
    e.exports = c
  },
  819: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(6),
      l = n(798),
      d = n(160),
      u = n(82),
      p = n(797),
      h = n(708),
      m = n(107),
      f = n(43),
      g = c.createClass({
        displayName: "Cell",
        mixins: [p, h],
        propTypes: {
          id: c.PropTypes.string.isRequired,
          contextEnabled: c.PropTypes.func.isRequired,
          pendingAction: c.PropTypes.number,
          contextMenu: c.PropTypes.bool,
          image: c.PropTypes.node,
          detail: c.PropTypes.node,
          primary: c.PropTypes.string.isRequired,
          primaryDetail: c.PropTypes.node,
          secondary: c.PropTypes.node,
          secondaryDetail: c.PropTypes.node,
          onClick: c.PropTypes.func,
          onContext: c.PropTypes.func
        },
        getInitialState: function() {
          return {
            hover: !1,
            contextMenu: !1
          }
        },
        componentWillUpdate: function(e) {
          this.props.contextMenu && this.state.contextMenu && !e.contextMenu && this.setState({
            contextMenu: !1
          })
        },
        onMenuClick: function(e) {
          this.props.contextEnabled() && (e.stopPropagation(), e.preventDefault(), this.props.onContext({
            anchor: e.target
          }))
        },
        onMenuMouseDown: function(e) {
          e.stopPropagation()
        },
        onContextMenu: function(e) {
          this.props.contextEnabled() && (e.stopPropagation(), e.preventDefault(), this.props.onContext({
            event: e
          }))
        },
        openContextMenu: function() {
          var e = this;
          this.props.contextEnabled() && this.setState({
            contextMenu: !0
          }, function() {
            e.refs.context.click()
          })
        },
        mouseOver: function() {
          this.state.hover || this.props.contextMenu || !this.props.contextEnabled() || this.setState({
            hover: !0
          })
        },
        mouseEnter: function() {
          this.state.hover || this.props.contextMenu || !this.props.contextEnabled() || this.setState({
            hover: !0
          })
        },
        mouseLeave: function() {
          this.state.hover && this.setState({
            hover: !1
          })
        },
        render: function() {
          var e = this.props,
            t = (e.id, e.contextEnabled),
            n = e.className,
            r = e.pendingAction,
            i = e.image,
            s = e.detail,
            p = e.primary,
            h = e.primaryDetail,
            g = e.secondary,
            v = e.secondaryDetail,
            y = e.onClick,
            E = e.onContext,
            _ = (0, a["default"])(e, ["id", "contextEnabled", "className", "pendingAction", "image", "detail", "primary", "primaryDetail", "secondary", "secondaryDetail", "onClick", "onContext"]),
            T = this.props.contextMenu || this.state.contextMenu,
            b = T || this.state.hover,
            S = f(n, {
              chat: !0,
              hover: b
            }),
            M = null,
            C = null;
          return r ? C = c.createElement("div", {
            className: "btn-context icon-spinner"
          }, c.createElement(d, {
            size: 18,
            stroke: 6
          })) : b && (M = c.createElement("span", {
            className: "icon icon-down btn-context",
            key: "icon-context",
            ref: "context",
            "data-ignore-capture": E ? u.IGNORE_CONTEXT : u.IGNORE_ANY,
            onMouseDown: this.onMenuMouseDown,
            onClick: this.onMenuClick
          })), s && (s = c.createElement("div", {
            className: "chat-body chat-detail"
          }, s)), c.createElement("div", (0, o["default"])({
            className: S,
            "data-ignore-capture": u.IGNORE_ANY,
            onClick: y,
            onContextMenu: t() ? this.onContextMenu : null,
            onMouseEnter: this.state.hover ? null : this.mouseEnter,
            onMouseOver: this.state.hover ? null : this.mouseOver,
            onMouseLeave: this.state.hover ? this.mouseLeave : null
          }, _), i, c.createElement("div", {
            className: "chat-body"
          }, c.createElement("div", {
            className: "chat-main"
          }, c.createElement("div", {
            className: "chat-title"
          }, c.createElement(l, {
            text: p,
            direction: "auto",
            titlify: !0,
            ellipsify: !0
          })), h), c.createElement("div", {
            className: "chat-secondary"
          }, g, c.createElement("div", {
            className: "chat-meta"
          }, v, c.createElement(m, {
            transitionName: "pop"
          }, C), c.createElement(m, {
            transitionName: "pop-fast-chat"
          }, b ? M : null)))), s)
        }
      });
    e.exports = g
  },
  820: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(158),
      s = n(82),
      a = n(163),
      c = n(107),
      l = r.createClass({
        displayName: "ChatlistSearch",
        mixins: [o, a],
        propTypes: {
          searchText: r.PropTypes.string.isRequired,
          searchType: r.PropTypes.oneOf([s.CHAT_SEARCH, s.CONTACT_SEARCH]).isRequired,
          onSearch: r.PropTypes.func.isRequired,
          placeholder: r.PropTypes.string
        },
        getInitialState: function() {
          return {
            isSearching: !1
          }
        },
        componentWillUnmount: function() {
          this.onCancel()
        },
        componentWillReceiveProps: function(e) {
          this.state.isSearching && (e.searchText || i.findDOMNode(this).contains(document.activeElement) || this.setState({
            isSearching: !1
          }))
        },
        onBlur: function(e) {
          this.props.searchText || this.onCancel()
        },
        onChange: function(e) {
          this.props.onSearch(e.target.value)
        },
        onCancel: function(e) {
          this.uimPop(this.props.searchType)
        },
        onReset: function(e) {
          e.stopPropagation(), this.focus(), this.props.onSearch("")
        },
        onSearchOn: function(e) {
          this.setState({
            isSearching: !0
          }), this.uimPush(this, this.props.searchType, {
            escapable: !0
          }), this.safeDefer(function() {
            this.refs.input.focus()
          })
        },
        focus: function() {
          this.refs.input.focus()
        },
        uimFocus: function() {
          this.focus()
        },
        uimClose: function() {
          this.safeIsMounted() && (this.refs.input.blur(), this.props.onSearch(""), this.setState({
            isSearching: !1
          }))
        },
        render: function() {
          var e = "pane-subheader pane-list-subheader subheader-search";
          this.state.isSearching && (e += " active");
          var t = null;
          this.state.isSearching && (_.isEmpty(this.props.searchText) || (t = r.createElement("button", {
            className: "icon icon-x-alt",
            key: "icon-clear-search",
            onClick: this.onReset
          })));
          var n = this.props.placeholder || l10n.t("search_or_start_new_chat"),
            i = this.state.isSearching ? this.onCancel : this.onSearchOn;
          return r.createElement("div", {
            className: e
          }, r.createElement("button", {
            className: "icon icon-search-morph",
            onMouseDown: i
          }, r.createElement("div", {
            className: "icon icon-back-blue"
          }), r.createElement("div", {
            className: "icon icon-search"
          })), r.createElement(c, {
            transitionName: "pop"
          }, t), r.createElement("div", {
            className: "input-placeholder"
          }, n), r.createElement("label", {
            htmlFor: "input-chatlist-search",
            className: "cont-input-search"
          }, r.createElement("input", {
            type: "text",
            ref: "input",
            className: "input input-search",
            "data-tab": 2,
            dir: "auto",
            title: n,
            value: this.props.searchText,
            onBlur: this.onBlur,
            onFocus: this.state.isSearching ? null : this.onSearchOn,
            onChange: this.onChange
          })))
        }
      });
    e.exports = l
  },
  821: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(3),
      l = r(c),
      d = n(6),
      u = n(63),
      p = n(13),
      h = n(105),
      m = n(29),
      f = n(109),
      g = n(21),
      v = n(61),
      y = n(85),
      E = n(7),
      T = 10,
      b = d.createClass({
        displayName: "ImageTag",
        mixins: [h],
        propTypes: {
          hasPrivacyChecks: d.PropTypes.bool
        },
        getInitialState: function() {
          var e = new Image;
          return e.src = this.props.src, e.complete ? {
            src: this.props.src
          } : (this.ensureLoaded(this.props.src), {
            src: null
          })
        },
        componentWillReceiveProps: function(e) {
          this.props.src !== e.src && this.ensureLoaded(e.src)
        },
        componentWillUnmount: function() {
          this.ensureLoadedPromise && this.ensureLoadedPromise.cancel()
        },
        ensureLoaded: function(e) {
          var t = this;
          this.ensureLoadedPromise && this.ensureLoadedPromise.cancel(), this.ensureLoadedPromise = m.loopOnError(g.ShouldLoop, l["default"].TimeoutError, function(n) {
            if (n >= T) throw new g.ImageError("Too many image retries", e);
            var r;
            return r = t.props.hasPrivacyChecks && !u.phoneActive && n > 0 ? m.waitForBBEvent(u, "change:phoneActive", _.matches({
              phoneActive: !0
            })) : p.state === p.STATE.CONNECTED ? l["default"].delay(Math.floor(1e3 * y.expBackoff(n, 60, void 0, .1))) : m.waitForBBEvent(p, "change:state", _.matches({
              state: p.STATE.CONNECTED
            })), n > 0 && v.isHttp(e) && (r = r.then(function() {
              return new l["default"](function(n, r) {
                f.get(e).then(function(i) {
                  var o = i.status;
                  o >= 200 && 400 > o ? n() : o >= 500 ? r(new g.ShouldLoop) : (t.props.onError(o), r(new g.ImageError("Image error: " + o, e)))
                })["catch"](function(e) {
                  r(new g.ShouldLoop)
                })
              })
            }).timeout(3e4, "imageTagRetryTimeout")), r.then(function() {
              return new l["default"](function(t, n) {
                var r = function(t) {
                    n(v.isHttp(e) ? new g.ShouldLoop : new g.ImageError("Invalid Data URI", e))
                  },
                  i = new Image;
                i.onload = function() {
                  t(e)
                }, i.onerror = r, i.src = e
              })
            }).then(function(e) {
              t.isMounted() && t.setState({
                src: e
              })
            })
          })["finally"](function() {
            delete t.ensureLoadedPromise
          })["catch"](l["default"].CancellationError, _.noop)["catch"](g.ImageError, this.props.onError || _.noop)
        },
        render: function() {
          var e, t, n = this.props,
            r = (n.src, n.onLoad, (0, a["default"])(n, ["src", "onLoad"]));
          return this.state.src ? (t = this.state.src, e = this.props.onLoad) : (t = E.ONE_BY_ONE_TRANS_GIF, e = null), d.createElement("img", (0, o["default"])({
            src: t,
            onLoad: e
          }, r))
        }
      });
    e.exports = b
  },
  822: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(160),
      s = r.createClass({
        displayName: "Pending",
        render: function() {
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "icon-xl icon-media icon-media-disabled"
          }, r.createElement(o, {
            size: 50,
            stroke: 3
          })))
        }
      }),
      a = r.createClass({
        displayName: "PendingCancel",
        render: function() {
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "icon-xl icon-media-cancel"
          }, r.createElement(o, {
            size: 50,
            stroke: 3
          })))
        }
      }),
      c = r.createClass({
        displayName: "Cancel",
        render: function() {
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "icon-xl icon-media-download"
          }))
        }
      }),
      l = r.createClass({
        displayName: "Download",
        propTypes: {
          filesize: r.PropTypes.number.isRequired
        },
        render: function() {
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "btn-meta"
          }, r.createElement("span", {
            className: "icon-xl icon-media-download-noborder"
          }), r.createElement(i, null, this.props.filesize > 0 ? l10n.filesize(this.props.filesize) : null)))
        }
      }),
      d = r.createClass({
        displayName: "Upload",
        propTypes: {
          filesize: r.PropTypes.number.isRequired
        },
        render: function() {
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "btn-meta"
          }, r.createElement("span", {
            className: "icon-xl icon-media-upload-noborder"
          }), r.createElement(i, null, this.props.filesize > 0 ? l10n.filesize(this.props.filesize) : null)))
        }
      }),
      u = r.createClass({
        displayName: "Play",
        render: function() {
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "icon-xl icon-media-play"
          }))
        }
      }),
      p = r.createClass({
        displayName: "Missing",
        render: function() {
          var e;
          switch (this.props.msg.type) {
            case "image":
              e = l10n.t("missing_photo_title");
              break;
            case "video":
              e = l10n.t("missing_video_title");
              break;
            case "audio":
              e = l10n.t("missing_audio_title")
          }
          return r.createElement("div", {
            className: "media-state-controls"
          }, r.createElement("button", {
            className: "btn-meta missing-text"
          }, e))
        }
      });
    e.exports = {
      Pending: s,
      Cancel: c,
      PendingCancel: a,
      Download: l,
      Upload: d,
      Play: u,
      Missing: p
    }
  },
  823: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(1),
      l = n(860),
      d = n(831),
      u = n(797),
      p = n(105),
      h = n(796),
      m = n(8),
      f = n(352),
      g = n(798),
      v = n(838),
      y = n(803),
      E = n(82),
      T = n(826),
      b = n(834),
      S = n(921),
      M = n(916),
      C = n(915),
      w = n(909),
      N = n(923),
      P = n(913),
      R = n(917),
      k = n(911),
      x = n(914),
      D = n(43),
      A = n(83),
      I = n(107),
      O = {
        FRONT: "front",
        MID: "mid",
        END: "end",
        SINGLE: "single"
      },
      L = {
        CONVERSATION: "conversation",
        MSG_INFO: "msg_info",
        STARRED_MSGS: "starred_msgs"
      },
      U = s.createClass({
        displayName: "Wrapper",
        mixins: [p, u],
        propTypes: {
          msg: s.PropTypes.instanceOf(h).isRequired,
          position: s.PropTypes.oneOf(_.values(O)),
          displayType: s.PropTypes.oneOf(_.values(L)),
          hideMsgInfo: s.PropTypes.bool,
          selectable: s.PropTypes.bool,
          onMessageSelect: s.PropTypes.func,
          tailOverride: s.PropTypes.oneOf(["left", "right"]),
          isFocusedMsg: s.PropTypes.bool,
          didRenderFocusedMsg: s.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            displayType: L.CONVERSATION
          }
        },
        getInitialState: function() {
          return {
            failed: this.props.msg.isFailed,
            hover: !1,
            contextMenu: !1,
            selected: !1,
            msgType: this.async("msg.type")
          }
        },
        componentWillReceiveProps: function(e) {
          e.selectable || this.setState({
            selected: !1
          })
        },
        shouldComponentUpdate: function(e, t) {
          return t.hover !== this.state.hover || t.contextMenu !== this.state.contextMenu || t.failed !== this.state.failed || e.position !== this.props.position || t.selected !== this.state.selected || e.selectable !== this.props.selectable || e.isFocusedMsg !== this.props.isFocusedMsg
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.msg;
          A.supportsFeature(A.F.RESEND_ICON) && t.mayFail && (this.addObserver(t, "change:ack", this.onAckChange), this.addObserver(t, "change:urlState", function() {
            return e.forceUpdate()
          }))
        },
        scrollIntoView: function() {
          if (this.props.isFocusedMsg) {
            var e = this.props.didRenderFocusedMsg;
            e && e(a.findDOMNode(this))
          }
        },
        componentDidUpdate: function(e, t) {
          this.props.isFocusedMsg && !e.isFocusedMsg && this.scrollIntoView()
        },
        componentDidMount: function() {
          this.scrollIntoView()
        },
        onFailedChange: function() {
          var e = this.props.msg;
          e.mayFail || (this.removeObserver(e, "change:ack"), this.removeObserver(e, "change:urlState")), this.setState({
            failed: e.isFailed
          })
        },
        resend: function() {
          var e = this.props.msg;
          return e.isMMS && !A.supportsFeature(A.F.MEDIA_RETRY) ? void m.openModal(s.createElement(T, {
            msg: e
          })) : void e.resend().bind(this).then(function(t) {
            this.isMounted() && this.setState({
              failed: e.isFailed
            })
          })["catch"](function(e) {
            c.log("wrapper:resend failure: " + e)()
          })
        },
        openForwardFlow: function() {
          var e = this.props.msg;
          e.ack < 1 && e.isMMS && e.isSentByMe ? m.openModal(s.createElement(f, {
            title: l10n.t("err_unsent_forward_title"),
            onOK: m.closeModal.bind(m),
            okText: l10n.t("web_ok")
          }, l10n.t("err_unsent_forward_text"))) : m.openModal(s.createElement(v, {
            msgs: [this.props.msg]
          }), "modal-flow")
        },
        openInfoDrawer: function() {
          m.msgInfoDrawer(this.props.msg)
        },
        openContactChat: function() {
          Store.Chat.find(this.props.msg.author).then(function(e) {
            m.openChat(e)
          })
        },
        mouseEnter: function() {
          this.contextEnabled() && !this.state.hover && this.setState({
            hover: !0
          })
        },
        mouseOver: function() {
          this.contextEnabled() && !this.state.hover && this.setState({
            hover: !0
          })
        },
        mouseLeave: function() {
          this.contextEnabled() && this.state.hover && this.setState({
            hover: !1
          })
        },
        contextMenu: function(e) {
          var t = this.props.msg;
          t.isNotification || e.stopPropagation()
        },
        contextEnabled: function() {
          return !this.props.msg.isNotification
        },
        removeContext: function() {
          this.setState({
            contextMenu: !1
          })
        },
        onDeleteMessage: function() {
          var e = this,
            t = function() {
              E.pop(E.MENU), m.closeModal(), e.props.msg.chat.sendDeleteMsgs([e.props.msg])
            },
            n = l10n.t("delete_message_confirmation");
          m.openModal(s.createElement(f, {
            onOK: t,
            okText: l10n.t("web_delete"),
            onCancel: m.closeModal.bind(m),
            cancelText: l10n.t("web_cancel")
          }, s.createElement(g, {
            text: n
          })))
        },
        onStarMessage: function() {
          this.props.msg.chat.sendStarMsgs([this.props.msg], !0)
        },
        onUnstarMessage: function() {
          this.props.msg.chat.sendStarMsgs([this.props.msg], !1)
        },
        onMenu: function(e) {
          if (e.stopPropagation(), e.preventDefault(), this.state.contextMenu) return E.pop(E.MENU), void this.setState({
            contextMenu: !1
          });
          var t = this.props.msg,
            n = [];
          t.isSentByMe && A.supportsFeature(A.F.MESSAGE_INFO) && this.props.displayType !== L.MSG_INFO && n.push(s.createElement(y, {
            key: "info",
            action: this.openInfoDrawer
          }, l10n.t("message_info"))), t.type !== h.TYPE.DOCUMENT && n.push(s.createElement(y, {
            key: "forward",
            action: this.openForwardFlow
          }, l10n.t("forward_message"))), A.supportsFeature(A.F.STARRED) && (t.star ? n.push(s.createElement(y, {
            key: "star",
            action: this.onUnstarMessage
          }, l10n.t("unstar_message"))) : n.push(s.createElement(y, {
            key: "star",
            action: this.onStarMessage
          }, l10n.t("star_message")))), A.supportsFeature(A.F.MESSAGE_DELETE) && n.push(s.createElement(y, {
            key: "delete",
            action: this.onDeleteMessage
          }, l10n.t("delete_message"))), t.isGroupMsg && t.author && !t.isSentByMe && n.push(s.createElement(y, {
            key: "author",
            action: this.openContactChat
          }, l10n.t("message_author", {
            author: t.displayName()
          }))), this.setState({
            contextMenu: !0
          }), m.openContextMenu(n, {
            onClose: this.removeContext,
            anchor: e.target,
            parent: this,
            classes: "dropdown-compact"
          })
        },
        getMsgComponent: function() {
          var e = this.props,
            t = e.msg,
            n = e.position,
            r = t.type,
            i = t.subtype,
            o = this.props.displayType !== L.STARRED_MSGS && !(n === O.MID || n === O.END);
          switch (r) {
            case h.TYPE.CHAT:
              var a = t.senderObj ? t.senderObj.name : null;
              return s.createElement(S, {
                msg: t,
                trusted: t.isTrusted(),
                ref: "component",
                senderName: a,
                displayAuthor: o
              });
            case h.TYPE.IMAGE:
              return s.createElement(M, {
                msg: t,
                ref: "component",
                isMsgInfo: this.props.displayType === L.MSG_INFO,
                displayAuthor: o
              });
            case h.TYPE.GROUP_NOTIFICATION:
            case h.TYPE.GP2:
            case h.TYPE.BROADCAST_NOTIFICATION:
            case h.TYPE.NOTIFICATION:
              var l = t.body;
              switch (r) {
                case "gp2":
                case "group_notification":
                  l = d.formatGroupNotification(t);
                  break;
                case "broadcast_notification":
                  l = d.formatBroadcastNotification(i, t.body)
              }
              return s.createElement(C, {
                text: l,
                ref: "component"
              });
            case h.TYPE.AUDIO:
            case h.TYPE.VIDEO:
              return s.createElement(w, {
                msg: t,
                displayAuthor: o,
                ref: "component"
              });
            case h.TYPE.VCARD:
              return s.createElement(N, {
                msg: t,
                displayAuthor: o,
                ref: "component"
              });
            case h.TYPE.LOCATION:
              return s.createElement(P, {
                msg: t,
                displayAuthor: o,
                ref: "component"
              });
            case h.TYPE.PTT:
              return s.createElement(R, {
                msg: t,
                displayAuthor: o,
                ref: "component"
              });
            case h.TYPE.DOCUMENT:
              return s.createElement(k, {
                msg: t,
                trusted: t.isTrusted(),
                ref: "component",
                senderName: t.senderObj ? t.senderObj.name : null,
                displayAuthor: o
              });
            default:
              c.log("messageList:render Unknown message type: " + r)()
          }
        },
        onSelectClick: function() {
          var e = !this.state.selected;
          this.props.onMessageSelect(this.props.msg, e), this.setState({
            selected: e
          })
        },
        render: function() {
          var e, t = this.props,
            n = t.msg,
            r = t.position,
            i = t.displayType;
          (this.state.hover || this.state.contextMenu) && (e = s.createElement(x, (0, o["default"])({}, this.props, {
            key: "icon-context",
            onClick: this.onMenu
          })));
          var a;
          if (A.supportsFeature(A.F.RESEND_ICON) && i === L.CONVERSATION && n.isFailed && n.urlState !== h.URL_STATE.UPLOADING) {
            var c = s.createElement("span", null, l10n.t("resend_message"));
            a = s.createElement(l, {
              style: {
                "float": "right"
              },
              trigger: !0,
              tooltip: c,
              direction: "left"
            }, s.createElement("button", {
              className: "error",
              onClick: this.resend
            }, s.createElement("span", {
              className: "icon icon-error"
            })))
          }
          var d = !n.isNotification && this.props.selectable ? s.createElement("div", {
              className: "msg-select",
              onClick: this.onSelectClick
            }, s.createElement(b, {
              onChange: this.onSelectClick,
              checked: this.state.selected
            })) : null,
            u = r === O.MID || r === O.END,
            p = {
              wrapper: D("msg", {
                "msg-continuation": r === O.FRONT || r === O.MID,
                "msg-group": n.isGroupMsg && !u,
                selected: this.state.selected
              }),
              container: D("message", {
                "message-system": n.isNotification,
                "message-out": !n.isNotification && n.isSentByMe,
                "message-in": !n.isNotification && !n.isSentByMe,
                "focused-msg": this.props.isFocusedMsg,
                hover: this.state.contextMenu || this.state.hover,
                tail: !this.props.tailOverride && (r === O.END || r === O.SINGLE),
                "tail-override-left": "left" === this.props.tailOverride,
                "tail-override-right": "right" === this.props.tailOverride,
                "message-chat": n.type === h.TYPE.CHAT
              })
            };
          return s.createElement("div", {
            className: p.wrapper
          }, s.createElement(I, {
            transitionName: "delay-leave"
          }, d), s.createElement("div", {
            className: p.container,
            onContextMenu: this.contextMenu,
            onMouseOver: this.mouseOver,
            onMouseEnter: this.mouseEnter,
            onMouseLeave: this.mouseLeave
          }, a, this.getMsgComponent(), s.createElement(I, {
            transitionName: "pop-fast"
          }, e)))
        }
      });
    U.Position = O, U.DisplayType = L, e.exports = U
  },
  824: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(7),
      o = n(352),
      s = n(8),
      a = n(44),
      c = {
        GUIDE_ALLOW: "guide-allow",
        GUIDE_UNBLOCK: "guide-unblock",
        GUIDE_NONE: "guide-none"
      },
      l = {
        CHROME_MEDIA_ERROR: "__chrome_media_error__",
        FIREFOX_LOCK: "__firefox_lock__",
        OPERA_MEDIA: "__opera_media__"
      },
      d = r.createClass({
        displayName: "GuidePopup",
        propTypes: {
          title: r.PropTypes.string.isRequired,
          desc: r.PropTypes.string.isRequired,
          browserPrefixDesc: r.PropTypes.bool.isRequired,
          type: r.PropTypes.oneOf(_.values(c)).isRequired,
          onConfirm: r.PropTypes.func,
          onCancel: r.PropTypes.func
        },
        statics: {
          TYPE: c
        },
        getDefaultProps: function() {
          return {
            browserPrefixDesc: !0,
            type: c.GUIDE_NONE,
            onConfirm: s.closeModal.bind(s)
          }
        },
        componentDidMount: function() {
          var e = this.getDescription(),
            t = this.refs.description;
          e.indexOf(l.CHROME_MEDIA_ERROR) > -1 && (t.innerHTML = t.innerHTML.replace(l.CHROME_MEDIA_ERROR, '<span class="chrome-media-icon"></span>')), e.indexOf(l.FIREFOX_LOCK) > -1 && (t.innerHTML = t.innerHTML.replace(l.FIREFOX_LOCK, '<span class="firefox-lock-icon"></span>')), e.indexOf(l.OPERA_MEDIA) > -1 && (t.innerHTML = t.innerHTML.replace(l.OPERA_MEDIA, '<span class="opera-media-icon"></span>'))
        },
        getDescription: function() {
          var e = this.props.desc + "_" + a.browser;
          return this.props.browserPrefixDesc && l10n.hasT(e) ? l10n.t(e) : l10n.t(this.props.desc)
        },
        render: function() {
          var e = "popup-guide";
          if (a.browser === i.BROWSER_TYPE.CHROME) switch (a.os) {
            case i.OS_TYPE.MAC:
              e += " popup-guide-mac";
              break;
            case i.OS_TYPE.CHROMEOS:
              e += " popup-guide-chrome";
              break;
            case i.OS_TYPE.WINDOWS:
          }
          var t = null;
          this.props.type !== c.GUIDE_NONE && a.browser === i.BROWSER_TYPE.CHROME && (t = r.createElement("div", {
            className: "round"
          }, r.createElement("div", {
            className: "round-body " + this.props.type
          })));
          var n = this.props.onCancel ? l10n.t("learn_more") : void 0;
          return r.createElement(o, {
            title: l10n.t(this.props.title),
            classes: e,
            onOK: this.props.onConfirm,
            okText: l10n.t("ok_got_it"),
            onCancel: this.props.onCancel,
            cancelText: n
          }, t, r.createElement("div", {
            className: "text text-tip",
            ref: "description"
          }, this.getDescription()))
        }
      });
    e.exports = d
  },
  825: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(354),
      o = r(i),
      s = n(6),
      a = n(821),
      c = n(805),
      l = n(798),
      d = n(817),
      u = n(161),
      p = n(8),
      h = n(82),
      m = n(163),
      f = n(797),
      g = n(43),
      v = 500,
      y = s.createClass({
        displayName: "PhotoViewerModal",
        mixins: [f, m],
        propTypes: {
          contact: s.PropTypes.instanceOf(u),
          imgFull: s.PropTypes.string,
          animateBorderRadius: s.PropTypes.bool,
          getZoomNode: s.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            formattedUser: this.async("contact.formattedUser"),
            imgFull: this.props.imgFull || this.async("contact.profilePicThumb.imgFull"),
            style: {
              visibility: "hidden"
            }
          }
        },
        componentWillMount: function() {
          this.uimPush(this, h.MEDIA_VIEWER, {
            popable: !0
          })
        },
        uimClose: function() {
          var e = void 0;
          if (this.props.getZoomNode(function(t) {
              e = t
            }), !e) return p.closeModalMedia();
          var t = this.refs.image,
            n = t.getBoundingClientRect(),
            r = e.getBoundingClientRect(),
            i = r.top - n.top,
            o = r.left - n.left,
            s = e.clientWidth / t.clientWidth;
          Velocity(t, {
            translateX: [o, 0],
            translateY: [i, 0],
            scale: [s, 1]
          }, {
            duration: 200,
            easing: [.1, .82, .25, 1]
          }).then(function() {
            p.closeModalMedia()
          })
        },
        onClose: function() {
          h.find(h.MEDIA_VIEWER) && this.uimPop(h.MEDIA_VIEWER)
        },
        onImageLoad: function(e) {
          var t = this,
            n = e.target;
          this.setState({
            size: {
              width: n.naturalWidth,
              height: n.naturalHeight
            }
          }, function() {
            t.props.getZoomNode(function(e) {
              var r = n.getBoundingClientRect(),
                i = e.getBoundingClientRect(),
                o = i.top - r.top,
                s = i.left - r.left,
                a = e.clientWidth / n.clientWidth,
                c = {
                  visibility: "hidden",
                  transform: "translateX(" + s + "px) translateY(" + o + "px) scale(" + a + ")",
                  transition: "transform 0s"
                };
              t.props.animateBorderRadius && (c.borderRadius = "50%"), t.setState({
                style: c
              }, function() {
                var e = {
                  transform: "translateX(0px) translateY(0px) scale(1)",
                  transition: "transform " + v + "ms cubic-bezier(.1,.82,.25,1)"
                };
                t.props.animateBorderRadius && (e = {
                  transform: "translateX(0px) translateY(0px) scale(1)",
                  borderRadius: "0%",
                  transition: "transform " + v + "ms cubic-bezier(.1,.82,.25,1),\n                                         border-radius " + v + "ms cubic-bezier(.1,.82,.25,1)"
                }), t.setState({
                  style: e
                })
              })
            })
          })
        },
        render: function() {
          var e = this.props,
            t = e.contact,
            n = ((0, o["default"])(e, ["contact"]), g("media-viewer", "media-viewer-animate"));
          return s.createElement("div", {
            className: n,
            onWheel: this.onScroll,
            onClick: this.onClose
          }, s.createElement("div", {
            className: "media-panel-header"
          }, s.createElement("div", {
            className: "chat media-chat"
          }, s.createElement("div", {
            className: "chat-avatar"
          }, s.createElement(c, {
            id: t.id
          })), s.createElement("div", {
            className: "chat-body"
          }, s.createElement("div", {
            className: "chat-main"
          }, s.createElement(l, {
            text: this.state.formattedUser
          })))), s.createElement("div", {
            className: "menu menu-horizontal media-panel-tools"
          }, s.createElement("div", {
            className: "menu-item"
          }, s.createElement("button", {
            className: "icon icon-x-viewer",
            title: l10n.t("web_close"),
            onClick: this.onClose
          }, l10n.t("web_close"))))), s.createElement("div", {
            className: "media-content",
            dir: "ltr",
            ref: "container"
          }, s.createElement("div", {
            className: "media"
          }, s.createElement(d, {
            type: d.TYPES.SCALE_DOWN,
            size: this.state.size
          }, s.createElement("div", {
            className: "profile-viewer",
            ref: "image",
            style: this.state.style
          }, s.createElement(a, {
            src: this.state.imgFull,
            hasPrivacyChecks: !0,
            onLoad: this.onImageLoad,
            className: "profile-viewer-img"
          }))))))
        }
      });
    e.exports = y
  },
  826: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(352),
      o = n(796),
      s = n(8),
      a = r.createClass({
        displayName: "RemoteUpload",
        propTypes: {
          msg: r.PropTypes.instanceOf(o).isRequired
        },
        render: function() {
          var e, t;
          switch (this.props.msg.type) {
            case o.TYPE.IMAGE:
              e = l10n.t("retry_upload_photo_title"), t = l10n.t("retry_upload_photo_text");
              break;
            case o.TYPE.VIDEO:
              e = l10n.t("retry_upload_video_title"), t = l10n.t("retry_upload_video_text");
              break;
            case o.TYPE.AUDIO:
            case o.TYPE.PTT:
              e = l10n.t("retry_upload_audio_title"), t = l10n.t("retry_upload_audio_text")
          }
          return r.createElement(i, {
            title: e,
            onOK: s.closeModal.bind(s),
            okText: l10n.t("web_ok")
          }, t)
        }
      });
    e.exports = a
  },
  827: function(e, t, n) {
    "use strict";
    var r = n(353),
      i = n(796),
      o = n(62),
      s = o.extend({
        props: {
          noEarlierMsgs: "boolean",
          isLoadingEarlierMsgs: "boolean",
          isLoadingRecentMsgs: "boolean",
          isLoadingAroundMsgs: "boolean"
        }
      }),
      a = r.extend({
        model: i,
        initialize: function() {
          r.prototype.initialize.call(this), this.msgLoadState = new s({
            noEarlierMsgs: !1,
            isLoadingEarlierMsgs: !1,
            isLoadingRecentMsgs: !1,
            isLoadingAroundMsgs: !1
          })
        },
        add: function() {
          var e = this,
            t = r.prototype.add.apply(this, arguments),
            n = Store.Msg.add(t, arguments[1]);
          return _.isArray(n) ? n.forEach(function(t) {
            e.isModel(t) && (t.msgChunk = e)
          }) : this.isModel(n) && (n.msgChunk = this), this.trigger("bulk_add", t), t
        },
        replace: function(e) {
          var t = this;
          this.set(e.models, {
            silent: !0,
            merge: !1
          }), e.models.forEach(function(e) {
            t.isModel(e) && (e.msgChunk = t)
          }), this.trigger("bulk_add", e.models)
        }
      });
    e.exports = a
  },
  828: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(7),
      a = n(1),
      c = n(22),
      l = n(62),
      d = n(358),
      u = n(35),
      p = n(157),
      h = 1500,
      m = 2e3,
      f = l.extend({
        props: {
          id: "string",
          type: {
            type: "string",
            values: ["available", "unavailable", "composing", "recording"]
          },
          t: {
            type: "number",
            allowNull: !0
          },
          deny: "boolean"
        },
        session: {
          updateTime: "number",
          _expireTimerId: 0
        }
      }),
      g = d.extend({
        model: f
      }),
      v = l.extend({
        Collection: "Presence",
        props: {
          id: "string"
        },
        session: {
          isOnline: "boolean",
          stale: ["boolean", !1, !0],
          hasData: ["boolean", !1, !1],
          isSubscribed: ["boolean", !1, !1],
          withholdDisplay: ["boolean", !1, !0],
          forceDisplay: ["boolean", !1, !1],
          chatActive: ["boolean", !1, !1],
          withholdDisplayTimer: "number",
          forceDisplayTimer: "number"
        },
        children: {
          chatstate: f
        },
        collections: {
          chatstates: g
        },
        derived: {
          isGroup: {
            fn: function() {
              return c.isGroup(this.id)
            }
          },
          isUser: {
            fn: function() {
              return c.isUser(this.id)
            }
          }
        },
        initialize: function() {
          this.isGroup ? (this.chatstate.set({
            id: "",
            type: "unavailable"
          }), this.listenTo(this.chatstates, "add change", function() {
            var e, t = !1;
            this.chatstates.forEach(function(n) {
              "composing" !== n.type && "recording" !== n.type || e && !(e.updateTime < n.updateTime) || (e = n), t = t || "unavailable" !== n.type
            }), this.set({
              isOnline: t,
              chatstate: {
                id: e ? e.id : "",
                type: e ? e.type : "unavailable"
              }
            })
          })) : (this.chatstate.set({
            id: this.id
          }), this.listenTo(this.chatstate, "change:type", function() {
            this.isOnline = "unavailable" !== this.chatstate.type
          })), this.listenTo(this, "change:chatActive", this.onChatActiveChange)
        },
        "delete": function() {
          l.prototype["delete"].call(this), Store.Presence.remove(this.id), this.chatstate["delete"](), this.chatstates.forEach(function(e) {
            e["delete"]()
          })
        },
        handle: function(e) {
          "undefined" == typeof e.type ? e.type = this.chatstate.type || "unavailable" : "paused" === e.type && (e.type = "available"), this.isGroup && "available" !== e.type && (e.updateTime = Date.now());
          var t;
          if (this.isGroup) {
            if (e.id = e.participant, e.participant = void 0, !e.id) return;
            t = this.chatstates.add(e, {
              merge: !0
            })
          } else t = this.chatstate.set(e);
          t._expireTimerId && clearTimeout(t._expireTimerId), "composing" === t.type || "recording" === t.type ? t._expireTimerId = _.delay(this._expireComposing, s.PRESENCE_COMPOSING_TIMEOUT, t) : t._expireTimerId = 0;
          var n = this.forceDisplay || this.isOnline || this.isUser && !this.chatstate.deny;
          this.set({
            hasData: !0,
            forceDisplay: n
          })
        },
        _expireComposing: function(e) {
          var t = e.type;
          "composing" === t || "recording" === t ? e.type = "available" : a.error("models:presence:expireComposing " + t)()
        },
        reset: function() {
          this.hasData = !1, this.isGroup ? this.chatstates.forEach(function(e) {
            e.type = "unavailable"
          }) : this.isUser && (this.chatstate.unset("t"), this.chatstate.unset("deny")), this.chatstate.set({
            id: this.isGroup ? "" : this.id,
            type: "unavailable",
            t: void 0,
            deny: void 0
          })
        },
        isActive: function() {
          var e = this.chatstate.type;
          return this.hasData && ("composing" === e || "recording" === e)
        },
        getFormattedString: function() {
          if (!this.hasData) return null;
          if (this.isGroup) {
            var e = this.chatstate.id;
            if (!e) return null;
            var t = Store.Contact.get(e);
            if (!t) return null;
            var n = t.formattedShortName;
            return "composing" === this.chatstate.type ? l10n.t("web_conversation_name_is_composing", {
              participant: n
            }) : l10n.t("web_conversation_name_is_recording", {
              participant: n
            })
          }
          if (!this.isUser) return null;
          var r = this.chatstate;
          switch (r.type) {
            case "available":
              return l10n.t("web_conversation_contact_online");
            case "composing":
              return l10n.t("web_conversation_is_composing");
            case "recording":
              return l10n.t("web_conversation_is_recording");
            case "unavailable":
              return r.deny || !r.t ? null : p.lastSeenStr(r.t)
          }
        },
        onChatActiveChange: function() {
          var e = this.chatActive;
          e ? (this.hasData ? this.withholdDisplay = !1 : this.withholdDisplayTimer = _.delay(function(e) {
            e.set({
              withholdDisplay: !1,
              withholdDisplayTimer: 0
            })
          }, h, this), this.forceDisplayTimer = _.delay(function(e) {
            e.set({
              forceDisplay: !0,
              forceDisplayTimer: 0
            })
          }, m, this)) : (this.withholdDisplayTimer && (clearTimeout(this.withholdDisplayTimer), this.withholdDisplayTimer = 0), this.forceDisplayTimer && (clearTimeout(this.forceDisplayTimer), this.forceDisplayTimer = 0))
        },
        subscribe: function() {
          return this.isSubscribed ? o["default"].resolve() : this.isUser ? this.update() : this.isGroup ? (this.isSubscribed = !0, o["default"].join(this.update(), u.presenceSubscribe(this.id), _.noop).bind(this)["catch"](function(e) {
            return this.isSubscribed = !1, o["default"].reject(e)
          })) : o["default"].resolve()
        }
      });
    e.exports = v
  },
  829: function(e, t) {
    "use strict";
    var n = {
      scrollIntoViewIfNeeded: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
        if (_.isFunction(e.scrollIntoViewIfNeeded)) return e.scrollIntoViewIfNeeded(t);
        var n = e.parentNode,
          r = window.getComputedStyle(n, null),
          i = parseInt(r.getPropertyValue("border-top-width")),
          o = e.offsetTop - n.offsetTop < n.scrollTop,
          s = e.offsetTop - n.offsetTop + e.clientHeight - i > n.scrollTop + n.clientHeight,
          a = o && !s;
        (o || s) && t && (n.scrollTop = e.offsetTop - n.offsetTop - n.clientHeight / 2 - i + e.clientHeight / 2), !o && !s || t || e.scrollIntoView(a)
      }
    };
    e.exports = n
  },
  830: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(716),
      o = r(i),
      s = n(3),
      a = r(s),
      c = n(1),
      l = n(7),
      d = n(842),
      u = {
        fileToCanvas: function(e, t, n, r) {
          var i, o, s = u.typeFromMimetype(e.type),
            a = document.createElement("canvas");
          "image" === s ? (i = new Image, o = function(e) {
            i.onload = e
          }) : "video" === s && (i = document.createElement("video"), o = function(e) {
            i.addEventListener("seeked", e), i.addEventListener("loadeddata", function() {
              var e = i.seekable.end(0);
              i.currentTime = ~~(e / 2)
            })
          });
          var c = function() {
            var e = d.boundHeightWidth(i.height, i.width, n, t);
            a.width = e.width, a.height = e.height;
            var o = a.getContext("2d");
            o.fillStyle = "rgb(247,247,247)", o.fillRect(0, 0, e.width, e.height), o.drawImage(i, 0, 0, e.width, e.height), URL.revokeObjectURL(i.src), r && r(a)
          };
          o(c), i.src = URL.createObjectURL(e)
        },
        fileToBlobs: function(e) {
          var t = this;
          return new a["default"](function(n, r) {
            var i = t.typeFromMimetype(e.type);
            switch (i) {
              case "image":
                t.fileToCanvas(e, l.IMG_MAX_EDGE, l.IMG_MAX_EDGE, function(e) {
                  var t = e.toDataURL("image/jpeg"),
                    r = window.dataURLtoBlob(t);
                  n({
                    dataUrl: t,
                    blob: r,
                    h: e.height,
                    w: e.width
                  })
                });
                break;
              case "video":
              case "audio":
                n({
                  dataUrl: URL.createObjectURL(e),
                  blob: e
                });
                break;
              default:
                r(new Error("file:fileToBlobs unsupported type: " + i + " filetype: " + e.type))
            }
          })
        },
        blobToArrayBuffer: function(e) {
          return new a["default"](function(t) {
            var n = new FileReader;
            n.onload = function(e) {
              t(e.target.result)
            }, n.onerror = function(e) {
              c.error("wa:blobToAB:fileReader:error:" + e)()
            }, n.readAsArrayBuffer(e)
          })
        },
        fileToAudio: function(e, t) {
          var n = document.createElement("audio");
          t && n.addEventListener("loadeddata", function() {
            t(n)
          }), n.src = URL.createObjectURL(e)
        },
        fileToVideo: function(e, t) {
          var n = document.createElement("video");
          t && n.addEventListener("loadeddata", function() {
            t(n)
          }), n.src = URL.createObjectURL(e)
        },
        getHash: function(e) {
          return new a["default"](function(t) {
            var n = new FileReader;
            n.onload = function(e) {
              var n = CryptoJS.lib.WordArray.create(e.target.result),
                r = CryptoJS.SHA256(n);
              t({
                hash: r.toString(CryptoJS.enc.Base64),
                size: n.sigBytes
              })
            }, n.onerror = function(e) {
              c.log("wa:getHash:filereader error: " + e)()
            }, n.readAsArrayBuffer(e)
          })
        },
        getFileDuration: function(e) {
          var t = this;
          return new a["default"](function(n, r) {
            var i = t.typeFromMimetype(e.type);
            switch (i) {
              case "image":
                n(void 0);
                break;
              case "video":
                t.fileToVideo(e, function(e) {
                  n(~~e.seekable.end(0)), URL.revokeObjectURL(e.src)
                });
                break;
              case "audio":
                t.fileToAudio(e, function(e) {
                  n(~~e.seekable.end(0)), URL.revokeObjectURL(e.src)
                });
                break;
              default:
                r(new Error("file:getFileDuration unsupported type: " + i))
            }
          })
        },
        typeFromMimetype: function(e) {
          var t = e.split("/"),
            n = (0, o["default"])(t, 2),
            r = n[0],
            i = n[1];
          switch (r) {
            case "image":
            case "video":
            case "audio":
              return r;
            case "application":
              switch (i) {
                case "pdf":
              }
          }
        }
      };
    e.exports = u
  },
  831: function(e, t, n) {
    "use strict";

    function r(e, t) {
      var n, r, i = "";
      if ("create" === e) {
        var o = parseInt(t, 10);
        i = l10n.t("web_you_created_list_unnamed", {
          count: o,
          _plural: o
        })
      } else "add" === e ? (n = Store.Contact.get(t), r = n ? n.get("name") : "", r = r ? r : l.formattedUser(t), i = l10n.t("web_list_recipient_added", {
        name: r
      })) : "remove" === e && (n = Store.Contact.get(t), r = n ? n.get("name") : "", r = r ? r : l.formattedUser(t), i = l10n.t("web_list_recipient_removed", {
        name: r
      }));
      return i
    }

    function i(e) {
      var t, n, r = "",
        i = e.get("type"),
        o = e.get("subtype"),
        a = e.displayName(),
        c = e.get("author"),
        d = e.get("body");
      if ("group_notification" === i) switch (o) {
        case "add":
          r = c === Store.Conn.me ? l10n.t("web_group_participant_added_you") : l10n.t("web_group_participant_added_name", {
            name: a
          });
          break;
        case "remove":
          r = c === Store.Conn.me ? l10n.t("web_group_participant_removed_you") : l10n.t("web_group_participant_removed_name", {
            name: a
          });
          break;
        case "leave":
          r = c === Store.Conn.me ? l10n.t("web_group_participant_left_you") : l10n.t("web_group_participant_left_name", {
            name: a
          });
          break;
        case "picture":
          r = "remove" === d ? c === Store.Conn.me ? l10n.t("web_photo_removed_by_you") : l10n.t("web_photo_removed_by", {
            name: a
          }) : c === Store.Conn.me ? l10n.t("web_photo_changed_by_you") : l10n.t("web_photo_changed_by", {
            name: a
          });
          break;
        case "subject":
          r = c === Store.Conn.me ? l10n.t("web_group_subject_changed_by_you", {
            subject: d
          }) : l10n.t("web_group_subject_changed_by_name", {
            name: a,
            subject: d
          });
          break;
        case "modify":
          t = l.formattedUser(e.get("author")), n = l.formattedUser(d), r = t === a ? l10n.t("web_group_participant_changed_number_unknown_name", {
            name: a,
            new_number: n
          }) : l10n.t("web_group_participant_changed_number", {
            name: a,
            old_number: t,
            new_number: n
          });
          break;
        default:
          s.log("wa:formatGroupNotification:unknown message subtype: " + o)()
      } else if ("gp2" === i) {
        var u, p = e.recipients,
          h = p ? p.map(function(e) {
            var t = Store.Contact.get(e);
            return t ? t.get("formattedName") : l.formattedUser(e)
          }).join(l10n.t("enumeration_comma")) : "",
          m = p ? _.first(p) : "",
          f = Store.Contact.get(m),
          g = f ? f.get("formattedName") : m ? l.formattedUser(m) : "";
        switch (o) {
          case "add":
            r = c ? c === Store.Conn.me ? l10n.t("web_group_participants_you_added_names", {
              participants: h
            }) : m === Store.Conn.me ? l10n.t("web_group_participants_name_added_you", {
              name: a
            }) : l10n.t("web_group_participants_name_added_names", {
              name: a,
              participants: h
            }) : m === Store.Conn.me ? l10n.t("web_group_participant_added_you") : l10n.t("web_group_participant_added_name", {
              name: g
            });
            break;
          case "remove":
            r = c ? c === Store.Conn.me ? l10n.t("web_group_participants_you_removed_names", {
              participants: h
            }) : m === Store.Conn.me ? l10n.t("web_group_participants_name_removed_you", {
              name: a
            }) : l10n.t("web_group_participants_name_removed_names", {
              name: a,
              participants: h
            }) : m === Store.Conn.me ? l10n.t("web_group_participant_removed_you") : l10n.t("web_group_participant_removed_name", {
              name: g
            });
            break;
          case "leave":
            r = m === Store.Conn.me ? l10n.t("web_group_participant_left_you") : l10n.t("web_group_participant_left_name", {
              name: h
            });
            break;
          case "picture":
            r = "remove" === d ? c === Store.Conn.me ? l10n.t("web_photo_removed_by_you") : l10n.t("web_photo_removed_by", {
              name: a
            }) : c === Store.Conn.me ? l10n.t("web_photo_changed_by_you") : l10n.t("web_photo_changed_by", {
              name: a
            });
            break;
          case "subject":
            r = c === Store.Conn.me ? l10n.t("web_group_subject_changed_by_you", {
              subject: d
            }) : l10n.t("web_group_subject_changed_by_name", {
              name: a,
              subject: d
            });
            break;
          case "modify":
            t = l.formattedUser(c), n = l.formattedUser(m), r = t === a ? l10n.t("web_group_participant_changed_number_unknown_name", {
              name: a,
              new_number: n
            }) : l10n.t("web_group_participant_changed_number", {
              name: a,
              old_number: t,
              new_number: n
            });
            break;
          case "create":
            r = c === Store.Conn.me ? d ? l10n.t("web_group_created_by_you", {
              subject: d
            }) : l10n.t("web_group_created_by_you_no_subject") : d ? l10n.t("web_group_created_by_name", {
              name: a,
              subject: d
            }) : l10n.t("web_group_created_by_name_no_subject", {
              name: a
            });
            break;
          case "delete":
            r = c === Store.Conn.me ? l10n.t("web_group_ended_you") : l10n.t("web_group_ended_name", {
              name: a
            });
            break;
          case "promote":
            u = p.length, r = 1 === u && m === Store.Conn.me ? l10n.t("web_group_participant_promoted_you") : l10n.t("web_group_participant_promoted_names", {
              count: u,
              participants: h,
              _plural: u
            });
            break;
          case "demote":
            u = p.length, r = 1 === u && m === Store.Conn.me ? l10n.t("web_group_participant_demoted_you") : l10n.t("web_group_participant_demoted_names", {
              count: u,
              participants: h,
              _plural: u
            });
            break;
          default:
            s.log("wa:formatGroupNotification:unknown message subtype: " + o)()
        }
      }
      return l10n.isRTL() && (r = l10n.forceRTL(r)), r
    }
    var o = n(879),
      s = n(1),
      a = n(44),
      c = n(157),
      l = n(22),
      d = n(796).TYPE;
    e.exports = {
      formatBroadcastNotification: r,
      formatGroupNotification: i,
      asDesktopNotification: function(e) {
        var t, n, l, u, p = "",
          h = e.dir,
          m = Store.Mute.getGlobalPreviews();
        switch (e.from !== Store.Conn.me && e.isGroupMsg && (p = e.displayName()), e.type) {
          case d.CHAT:
            if (m) t = e.body;
            else if (e.isGroupMsg) t = p ? l10n.t("hidden_group_message_text_with_author", {
              author: p
            }) : l10n.t("hidden_group_message_text"), p = "";
            else {
              var f = e.chat;
              t = l10n.t("hidden_message_text", {
                unreadCount: l10n.n(f.unreadCount),
                _plural: f.unreadCount
              })
            }
            break;
          case d.IMAGE:
            l = a.hasEmoji ? "📷 " : "", t = l + (m && e.caption || l10n.t("web_conversations_most_recent_image"));
            break;
          case d.VIDEO:
            l = a.hasEmoji ? "🎥 " : "", u = m && e.caption || l10n.t("web_conversations_most_recent_video"), t = l + " " + u + " (" + c.durationStr(e.duration) + ")";
            break;
          case d.PTT:
            l = a.hasEmoji ? "🎤 " : "", t = l + " " + l10n.t("web_conversations_most_recent_voice") + " (" + c.durationStr(e.duration) + ")";
            break;
          case d.AUDIO:
            l = a.hasEmoji ? "🎵 " : "", t = l + " " + l10n.t("web_conversations_most_recent_audio") + " (" + c.durationStr(e.duration) + ")";
            break;
          case d.LOCATION:
            l = a.hasEmoji ? "📍 " : "", t = l + (m && e.loc || l10n.t("web_conversations_most_recent_location"));
            break;
          case d.GROUP_NOTIFICATION:
          case d.GP2:
            t = i(e), p = "";
            break;
          case d.BROADCAST_NOTIFICATION:
            n = e.subtype;
            var g = e.body;
            t = r(n, g);
            break;
          case d.NOTIFICATION:
            t = e.body;
            break;
          case d.VCARD:
            l = a.hasEmoji ? "👤 " : "", t = l + (e.subType || l10n.t("web_conversations_most_recent_contact"));
            break;
          case d.DOCUMENT:
            l = a.hasEmoji ? "📄 " : "", t = l + (e.subType || l10n.t("web_conversations_most_recent_file"));
            break;
          default:
            return s.error("asDesktopNotification: Unrecognized type " + e.type)(), ""
        }
        var v = l10n.isRTL() ? "rtl" : "ltr",
          y = c.relativeStr(e.t);
        if (p) {
          var E = o.dir(p);
          return "ltr" !== v || h && "ltr" !== h || E && "ltr" !== E ? "ltr" !== v || h && "ltr" !== h ? "ltr" !== v || E && "ltr" !== E ? "ltr" === v ? "‫" + p + "‏: " + t + "‏ - ‪" + y + "‬‬" : h && "rtl" !== h || E && "rtl" !== E ? h && "rtl" !== h ? E && "rtl" !== E ? "‪" + p + "‎: " + t + "‎ - ‪" + y + "‬‬" : p + "‏: ‪" + t + "‬‏ - " + y : "‏‪" + p + "‬: " + t + "‏ - " + y : p + "‏: " + t + "‏ - " + y : p + "‎: ‫" + t + "‬‎ - " + y : "‎‫" + p + "‬: " + t + "‎ - " + y : p + "‎: " + t + "‎ - " + y
        }
        return "ltr" === v ? t + "‎‏ - ‪" + y + "‬" : t + "‏‎ - ‫" + y + "‬"
      },
      msgText: function(e) {
        switch (e.type) {
          case d.CHAT:
            return e.body;
          case d.IMAGE:
            return e.caption ? e.caption : l10n.t("web_conversations_most_recent_image");
          case d.VIDEO:
            return e.caption ? e.caption : l10n.t("web_conversations_most_recent_video");
          case d.PTT:
            var t = c.durationStr(e.duration);
            return t ? t : l10n.t("web_conversations_most_recent_voice");
          case d.AUDIO:
            return l10n.t("web_conversations_most_recent_audio");
          case d.LOCATION:
            return e.loc || l10n.t("web_conversations_most_recent_location");
          case d.GROUP_NOTIFICATION:
          case d.GP2:
            return i(e);
          case d.BROADCAST_NOTIFICATION:
            return r(e.subtype, e.body);
          case d.NOTIFICATION:
            return e.body;
          case d.VCARD:
            return l10n.t("web_conversations_most_recent_contact");
          case d.DOCUMENT:
            var n = e.pageCount > 0 ? l10n.t("web_conversations_most_recent_document", {
              count: e.pageCount + "",
              _plural: e.pageCount
            }) : null;
            return _.compact([e.caption || e.filename || l10n.t("web_conversations_most_recent_file"), n]).join(" • ");
          default:
            return ""
        }
      }
    }
  },
  832: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(719),
      a = n(842),
      c = {
        readFile: function(e) {
          return new o["default"](function(t, n) {
            var r = new FileReader;
            r.readAsDataURL(e), r.onload = function(n) {
              return t({
                file: e,
                url: this.result
              })
            }, r.onabort = function(e) {
              return n("onabort", e)
            }, r.onerror = function(e) {
              return n("onerror", e)
            }
          })
        },
        generateVideoThumb: function(e, t, n) {
          return new o["default"](function(r, i) {
            var o = document.createElement("video");
            o.autoplay = !1, o.loop = !1, o.onloadeddata = function() {
              var e = document.createElement("canvas"),
                i = c.boundWidthHeight(o.videoWidth, o.videoHeight, t, n);
              e.width = i.width, e.height = i.height;
              var s = e.getContext("2d");
              return s.drawImage(o, 0, 0, i.width, i.height), r({
                url: e.toDataURL("image/jpeg"),
                width: i.width,
                height: i.height
              })
            }, o.onerror = function(e) {
              i(e)
            }, o.src = e, o.load()
          })
        },
        resizeAndOrient: function(e, t, n) {
          return new o["default"](function(r, i) {
            if (!e.type.match("image.*")) return i("Invalid image file", e);
            var o = new FileReader,
              a = new Image;
            o.onload = function() {
              s(this.result, function(e) {
                a.src = e
              })
            }, a.onload = function() {
              if (0 === this.width || 0 === this.height) return i("Invalid image", a);
              var e = document.createElement("canvas"),
                o = c.boundWidthHeight(a.width, a.height, t, n);
              e.width = o.width, e.height = o.height;
              var s = e.getContext("2d");
              return s.fillStyle = "rgb(247,247,247)", s.fillRect(0, 0, o.width, o.height), s.drawImage(a, 0, 0, o.width, o.height), r({
                url: e.toDataURL("image/jpeg"),
                width: o.width,
                height: o.height
              })
            };
            var l = function(e) {
                return i("onabort", e)
              },
              d = function(e) {
                return i("onerror", e)
              };
            o.onabort = l, o.onerror = d, a.onabort = l, a.onerror = d, o.readAsDataURL(e)
          })
        },
        crop: function(e, t, n, r, i, s, a) {
          return new o["default"](function(o, c) {
            var l = document.createElement("canvas"),
              d = l.getContext("2d"),
              u = new Image;
            u.onload = function() {
              return s && a ? (l.height = a, l.width = s, d.drawImage(u, t, n, r, i, 0, 0, s, a)) : (l.height = i, l.width = r, d.drawImage(u, t, n, r, i)), o({
                url: l.toDataURL("image/jpeg"),
                width: r,
                height: i
              })
            };
            var p = function(e) {
                return c("onabort", e)
              },
              h = function(e) {
                return c("onerror", e)
              };
            0 !== e.indexOf("data:") && u.setAttribute("crossOrigin", "anonymous"), u.onabort = p, u.onerror = h, u.src = e
          })
        },
        boundWidthHeight: function(e, t, n, r) {
          return e = e || n, t = t || r, e > t ? e > n && (t *= n / e, e = n) : t > r && (e *= r / t, t = r), {
            width: e,
            height: t
          }
        },
        resizeDataURI: function(e, t, n) {
          return new o["default"](function(r, i) {
            var o = new Image;
            o.onload = function() {
              var e = document.createElement("canvas"),
                i = a.boundHeightWidth(o.height, o.width, n, t);
              e.width = i.width, e.height = i.height;
              var s = e.getContext("2d");
              s.drawImage(o, 0, 0, i.width, i.height), r(e.toDataURL("image/jpeg"))
            }, o.onerror = i, o.src = e
          })
        }
      };
    e.exports = c
  },
  833: function(e, t, n) {
    "use strict";
    var r = n(804),
      i = 3;
    e.exports = {
      minHeight: function(e, t) {
        return {
          minHeight: e.length > i ? i * r.DEFAULT_HEIGHT + t : e.length * r.DEFAULT_HEIGHT + t
        }
      }
    }
  },
  834: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(106),
      o = n(43),
      s = r.createClass({
        displayName: "CheckBox",
        mixins: [i],
        propTypes: {
          checked: r.PropTypes.bool.isRequired,
          onChange: r.PropTypes.func.isRequired
        },
        onToggle: function(e) {
          e && e.stopPropagation(), this.props.onChange()
        },
        render: function() {
          var e = o("checkbox", {
            checked: this.props.checked,
            unchecked: !this.props.checked
          });
          return r.createElement("div", {
            className: "checkbox-container",
            onClick: this.onToggle
          }, r.createElement("div", {
            className: e,
            ref: "checkbox"
          }, r.createElement("div", {
            className: "checkmark"
          })))
        }
      });
    e.exports = s
  },
  835: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(1),
      l = n(357),
      d = n(803),
      u = n(902),
      p = n(825),
      h = n(817),
      m = n(821),
      f = n(832),
      g = n(355),
      v = n(897),
      y = n(160),
      E = n(352),
      T = n(82),
      b = n(8),
      S = n(7),
      M = n(43),
      C = n(107),
      w = 200,
      N = 1.3,
      P = 2,
      R = {
        GROUP: "group",
        PROFILE: "profile",
        NO_EDIT: "no_edit"
      },
      k = s.createClass({
        displayName: "PhotoPicker",
        propTypes: {
          startImage: s.PropTypes.string,
          type: s.PropTypes.oneOf(_.values(R)).isRequired,
          id: s.PropTypes.string,
          pending: s.PropTypes.bool,
          onImageSet: s.PropTypes.func.isRequired
        },
        statics: {
          Type: R
        },
        getInitialState: function() {
          return {
            img: this.props.startImage,
            left: 0,
            top: 0,
            isEditing: !1,
            hover: !1,
            contextActive: !1
          }
        },
        componentWillReceiveProps: function(e) {
          this.props.startImage !== e.startImage && this.setState({
            img: e.startImage,
            isEditing: !1
          })
        },
        cropImage: function() {
          if (!this.refs.img) return o["default"].reject();
          var e = a.findDOMNode(this.refs.img),
            t = this.state.scale,
            n = Math.abs(this.state.left / t),
            r = Math.abs(this.state.top / t),
            i = w / t,
            s = i;
          i > S.MAX_PIC_SIDE ? s = S.MAX_PIC_SIDE : i < S.MIN_PIC_SIDE && (s = S.MIN_PIC_SIDE);
          var c;
          return new o["default"](function(t, o) {
            f.crop(e.src, n, r, i, i, s, s).then(function(e) {
              return c = e, f.crop(c.url, 0, 0, S.PROF_PIC_THUMB_SIDE, S.PROF_PIC_THUMB_SIDE)
            }).then(function(e) {
              t({
                thumb: e.url,
                full: c.url
              })
            })
          })
        },
        onZoomIn: function() {
          var e = this.state.scale * N;
          e >= P || this.setState({
            scale: e
          })
        },
        onZoomOut: function() {
          var e = this.state.scale / N;
          this.state.minScale >= e && (e = this.state.minScale), this.setState({
            scale: e
          })
        },
        onCrop: function() {
          this.cropImage().bind(this).then(function(e) {
            this.props.onImageSet(e.thumb, e.full)
          })["catch"](function() {
            this.setState({
              img: this.props.startImage,
              isEditing: !1
            })
          })
        },
        onDragEnd: function(e, t) {
          this.setState({
            left: e,
            top: t
          })
        },
        onUpload: function(e) {
          var t = this.refs.imageInput;
          return t.click(), !0
        },
        removeImage: function() {
          this.props.onImageSet(), b.closeModal()
        },
        onRemove: function(e) {
          var t = this.props.type === R.GROUP ? l10n.t("remove_group_icon") : l10n.t("remove_profile_photo");
          b.openModal(s.createElement(E, {
            onOK: this.removeImage,
            okText: l10n.t("remove"),
            onCancel: b.closeModal.bind(b),
            cancelText: l10n.t("web_cancel")
          }, t))
        },
        onView: function() {
          var e = this.refs.imageContainer,
            t = function(t) {
              t(e)
            };
          b.openModalMedia(s.createElement(p, {
            contact: Store.Contact.get(this.props.id),
            animateBorderRadius: !0,
            getZoomNode: t
          }), "profile-viewer")
        },
        onImageTake: function(e) {
          this.createAndSetImage(e)
        },
        onImagePick: function(e) {
          T.pop(T.MENU);
          var t = e.target.files[0];
          return t ? (this.createAndSetImage(t), void(e.target.value = "")) : !1
        },
        createAndSetImage: function(e) {
          var t = this;
          f.resizeAndOrient(e, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY).then(function(e) {
            var n = new Image;
            n.onload = function() {
              var r, i = n.width,
                o = n.height;
              r = o > i ? w / i : w / o, t.setState({
                img: e.url,
                isEditing: !0,
                scale: r,
                minScale: w / Math.min(i, o)
              })
            }, n.src = e.url
          })["catch"](function(e) {
            c.error("PhotoPicker:createAndSetImage:error " + e)(e)
          })
        },
        onImageClick: function(e) {
          if (this.props.type === R.NO_EDIT && this.state.img) return void this.onView();
          if (!this.state.isEditing) {
            e.stopPropagation(), e.preventDefault();
            var t = [];
            this.props.id && this.state.img && t.push(s.createElement(d, {
              key: "view",
              action: this.onView
            }, l10n.t("view_photo"))), navigator.getUserMedia && t.push(s.createElement(u, {
              key: "take",
              onImageTake: this.onImageTake
            })), t.push(s.createElement(d, {
              key: "upload",
              action: this.onUpload
            }, l10n.t("upload_photo"))), this.state.img && t.push(s.createElement(d, {
              key: "remove",
              action: this.onRemove
            }, l10n.t("remove_photo"))), b.openContextMenu(t, {
              onClose: this.contextClose,
              type: l.Type.DROPDOWN,
              event: e
            }), this.setState({
              contextActive: !0
            })
          }
        },
        contextClose: function() {
          this.setState({
            contextActive: !1
          })
        },
        onMouseOver: function(e) {
          this.state.hover || this.setState({
            hover: !0
          })
        },
        onMouseEnter: function(e) {
          this.state.hover || this.setState({
            hover: !0
          })
        },
        onMouseLeave: function(e) {
          this.state.hover && this.setState({
            hover: !1
          })
        },
        onLoad: function(e) {
          var t = e.target.clientWidth,
            n = e.target.clientHeight;
          this.setState({
            imageSize: {
              width: t,
              height: n
            }
          })
        },
        render: function() {
          var e;
          if (this.state.img && this.state.isEditing) {
            var t = {
              width: w,
              height: w
            };
            e = s.createElement(v, {
              ref: "img",
              container: t,
              onStop: this.onDragEnd,
              scale: this.state.scale
            }, s.createElement("img", {
              className: "avatar-original",
              src: this.state.img
            }))
          } else this.state.img && (e = s.createElement(h, {
            type: h.TYPES.COVER,
            size: this.state.imageSize
          }, s.createElement(m, {
            src: this.state.img,
            style: {
              height: "100%",
              width: "100%"
            },
            onLoad: this.onLoad
          })));
          var n;
          (this.props.pending || !this.state.isEditing && this.state.img && !this.state.imageSize) && (n = s.createElement("div", {
            className: "avatar-spinner-container"
          }, s.createElement(y, {
            size: 50,
            stroke: 3
          })));
          var r = null;
          if (!this.props.pending && this.props.type !== R.NO_EDIT && (!this.state.img || this.state.imageSize) && (!this.state.img || this.state.contextActive || !this.state.isEditing && this.state.hover)) {
            var i;
            switch (this.props.type) {
              case "group":
                i = this.state.img ? l10n.t("change_group_icon") : l10n.t("add_group_icon");
                break;
              case "profile":
                i = this.state.img ? l10n.t("change_profile_photo") : l10n.t("add_profile_photo")
            }
            r = s.createElement("div", {
              className: "avatar-overlay",
              key: "avatar-overlay"
            }, s.createElement("span", {
              className: "icon icon-camera-light"
            }), s.createElement("div", {
              "data-a8n": g.key("avatar-text"),
              className: "avatar-overlay-text"
            }, i))
          }
          var o, a, c = M("avatar", "avatar-l", "draggable-container", {
            "icon-group-default": this.props.type !== R.PROFILE,
            "icon-user-default": this.props.type === R.PROFILE
          });
          this.state.isEditing && (o = s.createElement("div", {
            className: "avatar-picker-controls",
            key: "zoom-controls"
          }, s.createElement("button", {
            className: "icon icon-plus",
            onClick: this.onZoomIn
          }), s.createElement("button", {
            className: "icon icon-minus",
            onClick: this.onZoomOut
          })), a = s.createElement("div", {
            className: "tip-container tip-avatar-picker",
            key: "tip-controls"
          }, s.createElement("div", {
            className: "tip"
          }, s.createElement("div", {
            className: "tip-body"
          }, l10n.t("adjust_image")), s.createElement("div", {
            className: "tip-controls"
          }, s.createElement("button", {
            className: "button",
            onClick: this.onCrop
          }, l10n.t("done_adjusting"))))));
          var l = this.props.type === R.NO_EDIT || this.props.pending || !this.state.imageSize && this.state.img ? _.noop : this.onImageClick;
          return s.createElement("div", {
            className: "avatar-picker"
          }, s.createElement("div", {
            className: c,
            onClick: l,
            onMouseOver: this.onMouseOver,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            ref: "imageContainer"
          }, e, s.createElement(C, {
            transitionName: "fade"
          }, n, r)), s.createElement(C, {
            transitionName: "fade"
          }, o), s.createElement(C, {
            transitionName: "slide"
          }, a), s.createElement("input", {
            ref: "imageInput",
            type: "file",
            "data-ignore-capture": T.IGNORE_ANY,
            accept: "image/gif,image/jpeg,image/jpg,image/png",
            style: {
              display: "none"
            },
            onChange: this.onImagePick
          }))
        }
      });
    e.exports = k
  },
  836: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = r.createClass({
        displayName: "SectionHeader",
        propTypes: {
          header: r.PropTypes.string.isRequired
        },
        render: function() {
          return r.createElement("div", {
            className: "list-title"
          }, this.props.header)
        }
      });
    e.exports = i
  },
  837: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(796),
      s = n(157),
      a = n(61),
      c = r.createClass({
        displayName: "PreviewImage",
        propTypes: {
          duration: r.PropTypes.oneOfType([r.PropTypes.string, r.PropTypes.number]),
          shade: r.PropTypes.bool,
          thumb: r.PropTypes.string,
          type: r.PropTypes.oneOf([o.TYPE.AUDIO, o.TYPE.LOCATION, o.TYPE.VIDEO, o.TYPE.PTT, o.TYPE.VCARD]).isRequired
        },
        getDefaultProps: function() {
          return {
            shade: !0
          }
        },
        getIconClassNames: function() {
          return this.props.type === o.TYPE.VIDEO ? "icon-sm icon-video-inv" : this.props.type === o.TYPE.AUDIO ? "icon-sm icon-arrow-inv" : void 0
        },
        getClassNames: function() {
          var e = "preview";
          return e += this.props.type === o.TYPE.VCARD ? " icon-user-default" : " icon-user-default-square", this.props.thumb || (e += " preview-" + this.props.type + " no-image"), e
        },
        getStyles: function() {
          var e = this.props.thumb;
          return e ? a.isHttp(e) ? {
            backgroundImage: 'url("' + e + '")'
          } : {
            backgroundImage: 'url("data:image/jpeg;base64,' + e + '")'
          } : {}
        },
        render: function() {
          var e = s.durationStr(this.props.duration),
            t = this.props.shade ? r.createElement("span", {
              className: "shade"
            }) : null;
          return r.createElement("div", {
            className: this.getClassNames(),
            style: this.getStyles()
          }, t, r.createElement("span", {
            className: "meta meta-audio"
          }, r.createElement("span", {
            className: this.getIconClassNames()
          }), r.createElement(i, null, e)))
        }
      });
    e.exports = c
  },
  838: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(813),
      c = n(352),
      l = n(939),
      d = n(796),
      u = n(8),
      p = n(21),
      h = n(798),
      m = s.createClass({
        displayName: "ForwardMessageFlow",
        mixins: [a],
        propTypes: {
          msgs: s.PropTypes.arrayOf(s.PropTypes.instanceOf(d)).isRequired,
          onFoward: s.PropTypes.func
        },
        componentWillMount: function() {
          this.push(this.chatModal)
        },
        chatModal: function() {
          var e = this;
          return s.createElement(l, {
            onChat: this.confirmForward,
            key: "ChatModal",
            selectedTab: this.selectedTab,
            onSelectTab: function(t) {
              e.selectedTab = t
            },
            title: l10n.t("forward_message_to")
          })
        },
        confirmForward: function(e) {
          var t, n = !1;
          e.isGroup ? t = l10n.t("confirm_forward_to_group", {
            chat: e.formattedTitle
          }) : e.isUser && e.contact.isBlocked() ? (t = l10n.t("confirm_unblock_contact_and_forward", {
            chat: e.formattedTitle
          }), n = !0) : t = l10n.t("confirm_forward_to_contact", {
            chat: e.formattedTitle
          }), this.push(s.createElement(c, {
            onOK: _.partial(this.onForwardConfirmed, e, n),
            okText: l10n.t("web_ok"),
            onCancel: this.pop.bind(null, void 0, void 0),
            key: "ConfirmPopup",
            cancelText: l10n.t("web_cancel")
          }, s.createElement(h, {
            text: t
          })))
        },
        onForwardConfirmed: function(e, t) {
          var n, r = this,
            i = this,
            s = Date.now();
          n = t ? e.contact.setBlock(!1) : o["default"].resolve(!0);
          var a = [];
          n.then(function() {
            return o["default"].each(r.props.msgs, function(t) {
              return t.forward(e)["catch"](p.MediaMissing, function(e) {
                a.push(t)
              })["catch"](function(e) {
                throw e
              })
            }).then(function() {
              a.length > 0 && i.showMediaMissing(a, s)
            })["catch"](p.ContactBlocked, function(t) {
              i.showContactBlocked(e, s)
            })
          })["catch"](_.noop), this.endFlow(), _.isFunction(this.props.onForward) && this.props.onForward(this.props.msgs), u.openChat(e)
        },
        showContactBlocked: function(e, t) {
          var n = Date.now() - t > 1e3 ? void 0 : !1;
          u.openModal(s.createElement(c, {
            key: "contactBlocked",
            onOK: u.closeModal.bind(u)
          }, l10n.t("web_cannot_send_to_blocked_contact_1", {
            contact: e.contact.formattedName
          })), n)
        },
        showMediaMissing: function(e, t) {
          var n, r;
          if (1 === e.length) {
            var i = e[0].type;
            switch (i) {
              case d.TYPE.VIDEO:
                n = l10n.t("missing_video_title"), r = l10n.t("missing_video_forward_text");
                break;
              case d.TYPE.AUDIO:
              case d.TYPE.PTT:
                n = l10n.t("missing_audio_title"), r = l10n.t("missing_audio_forward_text");
                break;
              case d.TYPE.IMAGE:
                n = l10n.t("missing_photo_title"), r = l10n.t("missing_photo_forward_text")
            }
          } else n = l10n.t("missing_media_title"), r = l10n.t("missing_media_forward_text", {
            count: e.length,
            _plural: e.length
          });
          var o = Date.now() - t > 1e3 ? void 0 : !1;
          u.openModal(s.createElement(c, {
            title: n,
            onOK: u.closeModal.bind(u),
            okText: l10n.t("web_ok")
          }, r), o)
        }
      });
    e.exports = m
  },
  839: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(709),
      o = r(i),
      s = n(6),
      a = n(43),
      c = s.createClass({
        displayName: "Modal",
        propTypes: {
          type: s.PropTypes.oneOf(["compact", "box", "tower"]),
          classes: s.PropTypes.string,
          title: s.PropTypes.string,
          children: s.PropTypes.node.isRequired
        },
        getDefaultProps: function() {
          return {
            classes: "",
            type: "compact"
          }
        },
        statics: {
          COMPACT: "compact",
          BOX: "box",
          TOWER: "tower"
        },
        render: function() {
          var e = this.props.title ? s.createElement("div", {
              className: "popup-title",
              dir: "auto"
            }, this.props.title) : null,
            t = a("popup", this.props.classes, (0, o["default"])({}, "popup-" + this.props.type, this.props.type !== c.COMPACT));
          return s.createElement("div", {
            className: "backdrop"
          }, s.createElement("div", {
            className: "popup-container"
          }, s.createElement("div", {
            className: t
          }, s.createElement("div", {
            className: "popup-body"
          }, e, s.createElement("div", {
            className: "popup-contents"
          }, this.props.children)))))
        }
      });
    e.exports = c
  },
  840: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(1),
      c = n(358),
      l = n(360),
      d = n(161),
      u = n(62),
      p = n(35),
      d = n(161),
      h = n(8),
      m = n(83),
      f = n(21),
      g = n(164),
      v = n(810),
      y = u.extend({
        props: {
          id: "string",
          isAdmin: "boolean"
        },
        children: {
          contact: d
        },
        initialize: function() {
          this.contact = Store.Contact.gadd({
            id: this.id
          }), this.listenTo(this.contact, "all", this._getEventBubblingHandler("contact"))
        }
      }),
      E = c.extend(l, {
        model: y,
        comparator: function(e, t) {
          return d.Comparator(e.contact, t.contact)
        },
        initialize: function() {
          this.listenTo(this, "change:contact.name", this.sort), this.listenTo(h, "locale_change", this.sort)
        },
        addParticipant: function(e) {
          if (this.get(e.id)) return h.openToast(s.createElement(v, {
            id: v.genId(),
            msg: l10n.t("action_participant_failed_already_added", {
              participant: e.formattedShortName
            })
          })), o["default"].reject(new f.ActionError);
          if (!this.canAdd()) return o["default"].reject(new f.ActionError);
          var t = p.addParticipant(this.parent.id, e.id),
            n = l10n.t("action_participant_adding", {
              participant: e.formattedShortName
            }),
            r = t.then(function(t) {
              return 200 === t.status ? l10n.t("action_participant_added", {
                participant: e.formattedShortName
              }) : 404 === t.status ? l10n.t("action_participant_add_failed") + " " + l10n.t("action_participant_failed_404") : 401 === t.status ? l10n.t("action_participant_add_failed") + " " + l10n.t("action_participant_failed_401") : 403 === t.status ? l10n.t("action_participant_add_failed") + " " + l10n.t("action_participant_failed_403") : void 0
            })["catch"](function(e) {
              throw a.error("models:groupMetadata:participantCollection:addParticipant dropped")(e), l10n.t("action_participant_add_failed")
            });
          return h.openToast(s.createElement(g, {
            id: g.genId(),
            pendingText: n,
            actionText: r,
            retry: this.addParticipant.bind(this, e)
          })), t
        },
        removeParticipant: function(e) {
          if (!this.canRemove(e)) return o["default"].reject(new f.ActionError);
          var t = p.removeParticipant(this.parent.id, e.id),
            n = l10n.t("action_participant_removing", {
              participant: e.contact.formattedShortName
            }),
            r = t.then(function(t) {
              return 200 === t.status ? l10n.t("action_participant_removed", {
                participant: e.contact.formattedShortName
              }) : 404 === t.status ? l10n.t("action_participant_remove_failed") + " " + l10n.t("action_participant_failed_404") : 401 === t.status ? l10n.t("action_participant_remove_failed") + " " + l10n.t("action_participant_failed_401") : 403 === t.status ? l10n.t("action_participant_remove_failed") + " " + l10n.t("action_participant_failed_403") : void 0
            })["catch"](function(e) {
              throw a.error("models:groupMetadata:participantCollection:removeParticipant dropped")(e), l10n.t("action_participant_remove_failed")
            });
          return h.openToast(s.createElement(g, {
            id: g.genId(),
            pendingText: n,
            actionText: r,
            retry: this.removeParticipant.bind(this, e)
          })), t
        },
        promoteParticipant: function(e) {
          if (!this.canPromote(e)) return o["default"].reject(new f.ActionError);
          var t = p.promoteParticipant(this.parent.id, e.id),
            n = l10n.t("action_participant_promoting", {
              participant: e.contact.formattedShortName
            }),
            r = t.then(function(t) {
              return 200 === t.status ? l10n.t("action_participant_promoted", {
                participant: e.contact.formattedShortName
              }) : 404 === t.status ? l10n.t("action_participant_promote_failed") + " " + l10n.t("action_participant_failed_404") : 401 === t.status ? l10n.t("action_participant_promote_failed") + " " + l10n.t("action_participant_failed_401") : 403 === t.status ? l10n.t("action_participant_promote_failed") + " " + l10n.t("action_participant_failed_403") : void 0
            })["catch"](function(e) {
              throw a.error("models:groupMetadata:participantCollection:removeParticipant dropped")(e), l10n.t("action_participant_promote_failed")
            });
          return h.openToast(s.createElement(g, {
            id: g.genId(),
            pendingText: n,
            actionText: r,
            retry: this.promoteParticipant.bind(this, e)
          })), t
        },
        canAdd: function() {
          return m.supportsFeature(m.F.GROUP_ADD_PARTICIPANT) ? !!this.iAmAdmin() : !1
        },
        canPromote: function(e) {
          return m.supportsFeature(m.F.GROUP_PROMOTE_PARTICIPANT) && e ? Store.Conn.me === e.id ? !1 : this.iAmAdmin() ? !e.isAdmin : !1 : !1
        },
        canRemove: function(e) {
          return m.supportsFeature(m.F.GROUP_REMOVE_PARTICIPANT) && e ? Store.Conn.me === e.id ? !1 : !!this.iAmAdmin() : !1
        },
        iAmMember: function() {
          return 1 === this.where({
            id: Store.Conn.me
          }).length
        },
        iAmAdmin: function() {
          return 1 === this.where({
            id: Store.Conn.me,
            isAdmin: !0
          }).length
        }
      }),
      _ = u.extend({
        Collection: "GroupMetadata",
        props: {
          id: "string",
          creation: "number",
          owner: "string"
        },
        session: {
          stale: ["boolean", !1, !0],
          trusted: "boolean"
        },
        collections: {
          participants: E
        },
        "delete": function() {
          u.prototype["delete"].call(this), Store.GroupMetadata.remove(this.id), this.participants.invoke("delete"), this.participants.stopListening(), this.participants.reset()
        },
        canSetSubject: function() {
          return m.supportsFeature(m.F.GROUP_SET_SUBJECT) ? !!this.participants.iAmMember() : !1
        },
        initialize: function() {
          this.listenTo(this.participants, "change:isAdmin change:contact.isMyContact sort remove reset", this.isTrusted), this.listenTo(this, "change:owner", this.isTrusted), this.listenTo(this.participants, "add remove reset", this.onParticipantChange)
        },
        isTrusted: function() {
          if (!this.owner) return this.trusted = !1;
          if (this.owner === Store.Conn.me) return this.trusted = !0;
          var e = Store.Contact.get(this.owner);
          if (e && e.isMyContact) return this.trusted = !0;
          for (var t = this.participants.models, n = 0, r = t.length; r > n; ++n) {
            var i = t[n];
            if (i.isAdmin && i.id !== Store.Conn.me && i.contact.isMyContact) return this.trusted = !0
          }
          return this.trusted = !1
        },
        onParticipantChange: function() {
          Store.Contact.get(this.id).unset("_capabilities")
        }
      });
    e.exports = _
  },
  841: function(e, t, n) {
    "use strict";

    function r(e) {
      return CryptoJS.lib.WordArray.create(new Uint8Array(e))
    }
    var i = n(9),
      o = n(21),
      s = n(366),
      a = n(172),
      c = n(1),
      l = n(881),
      d = n(22),
      u = {
        image: "WhatsApp Image Keys",
        video: "WhatsApp Video Keys",
        audio: "WhatsApp Audio Keys",
        ptt: "WhatsApp Audio Keys",
        document: "WhatsApp Document Keys"
      },
      p = {
        image: "image/jpeg"
      },
      h = {
        decryptE2EMedia: function(e, t, n, s) {
          try {
            if (t.length < 10) throw new o.MediaEncryptionError("ciphertext too short: " + t.length);
            var a = this.computeKeys(e, n),
              c = a.iv,
              l = a.cipherKey,
              d = a.macKey,
              u = i.wrap(t),
              h = u.slice(u.limit - 10).toBase64(),
              m = u.slice(u.offset, u.limit - 10).toBuffer(),
              f = i.concat([new Uint8Array(c), m]).toBuffer(),
              g = CryptoJS.lib.WordArray.create(f),
              v = CryptoJS.HmacSHA256(g, r(d)).toString(CryptoJS.enc.Base64),
              y = i.fromBase64(v).slice(0, 10).toBase64();
            if (!y || !h || y !== h) throw new o.MediaEncryptionError("hmac fail computed: " + v + " given: " + h);
            var E = CryptoJS.AES.decrypt({
                ciphertext: CryptoJS.lib.WordArray.create(m),
                salt: void 0
              }, r(l), {
                iv: r(c),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              }),
              _ = i.fromBase64(E.toString(CryptoJS.enc.Base64)).toBuffer(),
              T = new Blob([_], {
                type: s ? s : p[e]
              });
            return T
          } catch (b) {
            throw b instanceof o.MediaEncryptionError ? b : new o.MediaEncryptionError("unknown error: " + b.stack)
          }
        },
        ackE2EMedia: function(e, t, n) {
          if (t && n && e) {
            var o = d.userToLegacy(Store.Conn.me),
              s = i.fromUTF8(o).toBuffer(),
              u = CryptoJS.lib.WordArray.create(s),
              p = r(this.computeKeys(e, t).refKey),
              h = CryptoJS.HmacSHA256(u, p);
            h.sigBytes = 20, h.clamp();
            var m = a.urlSafe(h.toString(CryptoJS.enc.Base64)),
              f = n + "?ack=" + m;
            return c.log("crypto:ack:" + f)(), l.postRetry(f)
          }
        },
        encryptE2EMedia: function(e, t, n) {
          try {
            var s = this.computeKeys(e, n),
              a = s.iv,
              c = s.cipherKey,
              l = s.macKey,
              d = CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(t), r(c), {
                iv: r(a),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              }),
              u = d.iv.concat(d.ciphertext),
              p = CryptoJS.HmacSHA256(u, r(l));
            p.sigBytes = 10, p.clamp();
            var h = d.ciphertext.concat(p),
              m = i.fromBase64(h.toString(CryptoJS.enc.Base64)).toBuffer();
            return new Blob([m])
          } catch (f) {
            throw f instanceof o.MediaEncryptionError ? f : new o.MediaEncryptionError("unknown error: " + f.stack)
          }
        },
        computeKeys: function(e, t) {
          var n = u[e];
          if (!t || !n) throw new o.MediaEncryptionError("computeKeys fail: !!mediakey: " + !!t + " info: " + n + " type: " + e);
          var r = s.extractAndExpand(a.decode(t), void 0, n, 112, !0);
          if (!r || r.length < 112) throw new o.MediaEncryptionError("computeKeys:hkdf error");
          return {
            iv: r.slice(0, 16),
            cipherKey: r.slice(16, 48),
            macKey: r.slice(48, 80),
            refKey: r.slice(80, 112)
          }
        },
        computeRefs: function(e, t) {
          if (!e || !t || t.filter(function(e) {
              return !d.isUser
            }).length > 0) throw new o.MediaEncryptionError("computeRefs error: " + !!e + "," + (t && t.join()));
          var n = r(e);
          return t.map(function(e) {
            var t = CryptoJS.HmacSHA256(CryptoJS.enc.Utf8.parse(d.userToLegacy(e)), n);
            return t.sigBytes = 20, t.clamp(), a.urlSafe(t.toString(CryptoJS.enc.Base64))
          })
        },
        newB64MediaKey: function() {
          var e = new Uint8Array(32);
          return window.crypto.getRandomValues(e), a.encode(e)
        }
      };
    e.exports = h
  },
  842: function(e, t) {
    "use strict";
    var n = {
      boundHeightWidth: function(e, t, n, r) {
        return t = t || r, e = e || n, t > e ? t > r && (e *= r / t, t = r) : e > n && (t *= n / e, e = n), {
          width: Math.max(t, 1),
          height: Math.max(e, 1)
        }
      }
    };
    e.exports = n
  },
  852: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(1),
      o = n(796),
      s = n(105),
      a = r.createClass({
        displayName: "MsgSymbol",
        mixins: [s],
        propTypes: {
          msg: r.PropTypes.instanceOf(o)
        },
        componentWillMount: function() {
          var e = this.props.msg;
          "ptt" === e.type && e.ack < 4 && this.addObserver(this.props.msg, "change:ack")
        },
        getClasses: function() {
          var e = "icon media-icon",
            t = this.props.msg;
          switch (t.type) {
            case "location":
            case "image":
            case "video":
            case "audio":
            case "vcard":
            case "document":
              e += " icon-status-" + t.type;
              break;
            case "ptt":
              var n = 4 === t.ack ? "blue" : t.isSentByMe ? "gray" : "green";
              e += " icon-status-" + t.type + "-" + n;
              break;
            default:
              i.log("chat:getClasses Invalid msg type.")()
          }
          return e
        },
        render: function() {
          return r.createElement("span", {
            className: this.getClasses()
          })
        }
      });
    e.exports = a
  },
  853: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(796),
      s = n(157),
      a = n(105),
      c = n(84),
      l = r.createClass({
        displayName: "Timestamp",
        mixins: [a, c],
        propTypes: {
          chat: r.PropTypes.instanceOf(i),
          msg: r.PropTypes.instanceOf(o)
        },
        componentWillMount: function() {
          this.props.chat && this.addObserver(this.props.chat.msgs, "change:last")
        },
        componentDidMount: function() {
          this.maybeRegMidnight()
        },
        componentDidUpdate: function() {
          this.maybeRegMidnight()
        },
        rerender: function() {
          this.forceUpdate()
        },
        maybeRegMidnight: function() {
          var e = this.timestamp();
          if (e) {
            this.unregCmd("midnight", this.rerender);
            var t = moment().startOf("day").subtract(7, "day");
            e >= t.unix() && this.regCmd("midnight", this.rerender)
          }
        },
        timestamp: function() {
          if (this.props.msg) return this.props.msg.t;
          var e = this.props.chat.msgs.last();
          return e && e.t
        },
        render: function() {
          var e = this.timestamp();
          return e ? r.createElement("div", {
            className: "chat-meta"
          }, r.createElement("span", {
            className: "chat-time"
          }, s.relativeStr(e))) : null
        }
      });
    e.exports = l
  },
  854: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(804),
      s = n(806),
      a = n(836),
      c = n(808),
      l = n(159),
      d = l.HotKeys,
      u = r.createClass({
        displayName: "ContactList",
        propTypes: {
          contacts: r.PropTypes.array.isRequired,
          exclude: r.PropTypes.array,
          onClick: r.PropTypes.func,
          onFocusSearch: r.PropTypes.func
        },
        getInitialState: function() {
          this.selection = new c(this.props.contacts, function(e) {
            return e.id
          });
          var e = this.props.exclude;
          return e && (e = _.object(e.map(function(e) {
            return [e.id, !0]
          }))), {
            exclude: e
          }
        },
        componentWillReceiveProps: function(e) {
          this.selection.init(e.contacts)
        },
        onFocusGain: function(e) {
          e.target === i.findDOMNode(this) && (this.selection.index < 0 ? this.focusFirst() : this.selection.reset())
        },
        focusFirst: function() {
          this.selection.setFirst()
        },
        onNextContact: function(e) {
          e.preventDefault(), e.stopPropagation(), this.selection.setNext()
        },
        onPrevContact: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = this.selection.prev();
          t > -1 ? this.selection.setPrev() : (this.selection.unset(), this.props.onFocusSearch(e))
        },
        render: function() {
          for (var e, t = this.props.contacts, n = [], i = t.length > 10, c = this.state.exclude || {}, l = "XXX", u = 0; u < t.length; u++) {
            var p = t[u];
            if (e = null, i) {
              var h = p.header;
              u < t.length - 1 && h != t[u + 1].header && (e = "last"), h !== l && (n.push(r.createElement(a, {
                key: h,
                header: h
              })), l = h)
            }
            var m = p.id;
            n.push(r.createElement(s, {
              contact: p,
              active: this.selection,
              className: e,
              onClick: this.props.onClick,
              member: c[m],
              key: m
            }))
          }
          var f = {
            down: this.onNextContact,
            up: this.onPrevContact
          };
          return r.createElement(d, {
            handlers: f,
            onFocus: this.onFocusGain,
            "data-tab": 3
          }, r.createElement(o, {
            classes: ["chatlist"],
            data: n,
            height: 72,
            extraItems: 4
          }))
        }
      });
    e.exports = u
  },
  855: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(13),
      l = n(84),
      d = n(106),
      u = n(158),
      p = n(8),
      h = n(61),
      m = n(44),
      f = n(796),
      g = n(7),
      v = n(984),
      y = 3e5,
      E = new Audio,
      _ = E.canPlayType("audio/ogg"),
      T = s.createClass({
        displayName: "AudioTag",
        mixins: [l, d, u],
        propTypes: {
          msg: s.PropTypes.instanceOf(f).isRequired,
          className: s.PropTypes.string,
          controls: s.PropTypes.bool,
          preload: s.PropTypes.string,
          type: s.PropTypes.string,
          onClick: s.PropTypes.func,
          onPlay: s.PropTypes.func,
          onError: s.PropTypes.func,
          autoPlay: s.PropTypes.bool
        },
        getInitialState: function() {
          return {
            src: void 0
          }
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.msg,
            n = void 0;
          if (h.isEncryptedMedia(t.url)) n = o["default"].resolve().then(function() {
            return t.decryptMedia()
          }).then(function(e) {
            if (t.mimetype.indexOf(g.MIMETYPE_OGG) > -1 && t.decryptedMediaBlob.size < y && !_) {
              var n = new v(t.decryptedMediaBlob);
              return n.generateBlob().then(function(e) {
                return URL.createObjectURL(e)
              })
            }
            return e
          }).then(function(e) {
            return t.urlState200(e), e
          });
          else {
            var r = h.isBlob(t.url) ? t.url : t.url + "?x=2";
            n = o["default"].resolve(r)
          }
          n.bind(this).then(function(t) {
            e.setState({
              src: t
            })
          })["catch"](function(n) {
            e.props.onError(t.url)
          })
        },
        componentDidMount: function() {
          var e = a.findDOMNode(this);
          this.regNativeListener(e, "error", this.onPlayerError, !0), this.regNativeListener(e, "playing", this.onPlaying), this.regCmd("mediaPlaying", this.onOtherPlaying), (m.isGecko || m.isSafari) && (this.props.autoPlay ? (this.checkIteration = 0, this.checkForSuccessInterval = this.safeInterval(this.checkForSuccess, 250)) : this.props.autoPlay ? this.startCheckForSuccess() : this.regNativeListener(e, "play", this.startCheckForSuccess))
        },
        startCheckForSuccess: function() {
          this.checkIteration = 0, this.checkForSuccessInterval = this.safeInterval(this.checkForSuccess, 250)
        },
        clearCheckForSuccess: function() {
          this.checkForSuccessInterval && (this.clearSafeInterval(this.checkForSuccessInterval), delete this.checkForSuccessInterval, delete this.checkIteration)
        },
        checkForSuccess: function() {
          if (c.state === c.STATE.CONNECTED) {
            if (this.checkIteration++, this.checkIteration > 40) return void this.onPlayerError({
              target: {
                src: this.state.src,
                error: {
                  code: window.MediaError.MEDIA_ERR_NETWORK
                }
              }
            });
            var e = a.findDOMNode(this),
              t = e.buffered;
            t && t.length && t.end(0) > 0 && this.onPlaying({
              target: e
            })
          }
        },
        onPlayerError: function(e) {
          this.clearCheckForSuccess(), this.props.onError(e.target.src)
        },
        onOtherPlaying: function(e) {
          e !== this && a.findDOMNode(this).pause()
        },
        onPlaying: function(e) {
          this.clearCheckForSuccess(), p.mediaPlaying(this), this.props.onPlay && this.props.onPlay(e)
        },
        render: function() {
          return s.createElement("audio", {
            src: this.state.src,
            className: this.props.className,
            onClick: this.props.onClick,
            controls: this.props.controls,
            preload: this.props.preload,
            type: this.props.type,
            autoPlay: this.props.autoPlay
          }, this.props.children)
        }
      });
    e.exports = T
  },
  856: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(797),
      s = n(803),
      a = r.createClass({
        displayName: "DeleteMenuItem",
        mixins: [o],
        propTypes: {
          chat: r.PropTypes.instanceOf(i).isRequired,
          onDeleteOrExit: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            isReadOnly: this.async("chat.isReadOnly")
          }
        },
        render: function() {
          var e;
          switch (this.props.chat.kind) {
            case i.KIND.GROUP:
              e = this.props.chat.isReadOnly ? l10n.t("web_delete_group") : l10n.t("web_exit_group");
              break;
            case i.KIND.BROADCAST:
              e = l10n.t("web_delete_list");
              break;
            case i.KIND.CHAT:
              e = l10n.t("delete_chat")
          }
          return r.createElement(s, {
            a8n: "mi-delete",
            action: this.props.onDeleteOrExit,
            shortcut: "x"
          }, e)
        }
      });
    e.exports = a
  },
  857: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(105),
      o = n(798),
      s = n(21),
      a = n(828),
      c = n(840),
      l = r.createClass({
        displayName: "GroupSubtitle",
        mixins: [i],
        propTypes: {
          presence: r.PropTypes.instanceOf(a),
          groupMetadata: r.PropTypes.instanceOf(c),
          placeholder: r.PropTypes.node,
          location: r.PropTypes.oneOf(["list", "title"])
        },
        componentWillMount: function() {
          Store.GroupMetadata.find(this.props.groupMetadata.id)["catch"](s.WapDrop, _.noop);
          var e = this.props.groupMetadata.participants;
          this.addObserver(e, "sort remove reset"), this.addObserver(this.props.presence, "change:chatstate.id change:chatstate.type change:forceDisplay change:withholdDisplay")
        },
        getSubtitle: function() {
          return this.props.groupMetadata.participants.map(function(e) {
            return e.contact.formattedShortNameWithNonBreakingSpaces
          }).join(", ")
        },
        render: function() {
          var e, t = this.props.presence;
          return "list" === this.props.location ? (e = t.getFormattedString() || this.getSubtitle(), e ? r.createElement(o, {
            ellipsify: !0,
            titlify: !0,
            text: e
          }) : null) : (e = t.withholdDisplay ? this.props.placeholder : t.getFormattedString() || (t.forceDisplay ? this.getSubtitle() : this.getSubtitle() || this.props.placeholder), e ? r.createElement("div", {
            className: "chat-status ellipsify"
          }, r.createElement(o, {
            ellipsify: !0,
            titlify: !0,
            text: e
          })) : null)
        }
      });
    e.exports = l
  },
  858: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(82),
      o = n(107),
      s = n(355),
      a = n(163),
      c = r.createClass({
        displayName: "MenuBar",
        propTypes: {
          children: r.PropTypes.node,
          a8n: r.PropTypes.string
        },
        render: function() {
          return r.createElement("div", {
            className: "menu menu-horizontal"
          }, this.props.children)
        }
      }),
      l = r.createClass({
        displayName: "MenuBarItem",
        mixins: [a],
        propTypes: {
          icon: r.PropTypes.string.isRequired,
          title: r.PropTypes.string.isRequired,
          children: r.PropTypes.node,
          transitionName: r.PropTypes.string,
          onClick: r.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            transitionName: "dropdown"
          }
        },
        getInitialState: function() {
          return {
            active: !1
          }
        },
        onClick: function(e) {
          e.stopPropagation(), this.props.onClick(e)
        },
        onOpen: function(e) {
          e.preventDefault(), e.stopPropagation(), this.setState({
            active: !0
          }), this.uimPush(this, i.MENU, {
            popable: !0
          })
        },
        onClose: function(e) {
          e.preventDefault(), e.stopPropagation(), this.setState({
            active: !1
          }), this.uimPop(i.MENU)
        },
        uimClose: function() {
          this.setState({
            active: !1
          })
        },
        render: function() {
          var e = "icon icon-" + this.props.icon,
            t = this.state.active,
            n = this.props.onClick ? this.onClick : t ? this.onClose : this.onOpen,
            a = null;
          if (this.props.children) {
            var c = this.props.transitionName,
              l = r.Children.only(this.props.children);
            a = r.createElement(o, {
              transitionName: c
            }, t ? l : null)
          }
          var d = "menu-item";
          return t && (d += " active"), r.createElement("div", {
            "data-a8n": s.key(this.props.a8n),
            className: d,
            onClick: n
          }, r.createElement("button", {
            className: e,
            "data-ignore-capture": i.IGNORE_ANY,
            title: this.props.title
          }, this.props.title), a)
        }
      });
    e.exports = {
      MenuBar: c,
      MenuBarItem: l
    }
  },
  859: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(797),
      s = n(803),
      a = r.createClass({
        displayName: "MuteMenuItem",
        mixins: [o],
        propTypes: {
          chat: r.PropTypes.instanceOf(i).isRequired,
          onMute: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            isMuted: this.async("chat.mute.isMuted")
          }
        },
        render: function() {
          var e = this.props.onMute.bind(null, !this.state.isMuted);
          return r.createElement(s, {
            action: e,
            shortcut: "m"
          }, this.state.isMuted ? l10n.t("web_menuitem_mute_off") : l10n.t("web_menuitem_mute"))
        }
      });
    e.exports = a
  },
  860: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = r.createClass({
        displayName: "TooltipTrigger",
        propTypes: {
          trigger: r.PropTypes.bool,
          tooltip: r.PropTypes.node.isRequired,
          style: r.PropTypes.object,
          direction: r.PropTypes.oneOf(["top", "right", "bottom", "left"])
        },
        getDefaultProps: function() {
          return {
            direction: "top"
          }
        },
        getInitialState: function() {
          return {
            active: !this.props.trigger
          }
        },
        showModal: function() {
          this.setState({
            active: !0
          })
        },
        hideModal: function() {
          this.setState({
            active: !1
          })
        },
        render: function() {
          var e = this.state.active ? r.createElement(o, {
              direction: this.props.direction,
              ref: "tooltip",
              body: this.props.tooltip
            }) : null,
            t = this.props.trigger;
          return r.createElement("div", {
            style: this.props.style,
            className: "tooltip-container",
            onMouseEnter: t ? this.showModal : null,
            onMouseLeave: t ? this.hideModal : null
          }, this.props.children, e)
        }
      }),
      o = r.createClass({
        displayName: "Tooltip",
        propTypes: {
          body: r.PropTypes.node.isRequired,
          direction: r.PropTypes.string.isRequired
        },
        render: function() {
          var e = "tooltip " + this.props.direction;
          return r.createElement("div", {
            className: e
          }, this.props.body)
        }
      });
    e.exports = i
  },
  861: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(797),
      o = n(798),
      s = n(828),
      a = r.createClass({
        displayName: "UserSubtitle",
        mixins: [i],
        propTypes: {
          presence: r.PropTypes.instanceOf(s),
          placeholder: r.PropTypes.node,
          location: r.PropTypes.oneOf(["list", "title"])
        },
        getInitialState: function() {
          return {
            hasData: this.async("presence.hasData"),
            type: this.async("presence.chatstate.type"),
            deny: this.async("presence.chatstate.deny"),
            t: this.async("presence.chatstate.t"),
            forceDisplay: this.async("presence.forceDisplay"),
            withholdDisplay: this.async("presence.withholdDisplay")
          }
        },
        render: function() {
          var e, t = this.props.presence;
          return "list" === this.props.location ? (e = t.getFormattedString(), e ? r.createElement(o, {
            ellipsify: !0,
            titlify: !0,
            text: e
          }) : null) : (e = t.withholdDisplay ? this.props.placeholder : t.getFormattedString() || (t.forceDisplay ? "" : this.props.placeholder), e ? r.createElement("div", {
            className: "chat-status ellipsify"
          }, r.createElement(o, {
            ellipsify: !0,
            titlify: !0,
            text: e
          })) : null)
        }
      });
    e.exports = a
  },
  862: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(7),
      s = n(799),
      a = n(867),
      c = n(866),
      l = n(84),
      d = n(158),
      u = n(82),
      p = n(163),
      h = n(797),
      m = n(8),
      f = n(352),
      g = n(21),
      v = n(107),
      y = n(830),
      E = n(818),
      T = n(159),
      b = T.HotKeys,
      S = n(925),
      M = r.createClass({
        displayName: "ComposeBox",
        mixins: [l, d, p, h],
        propTypes: {
          chat: r.PropTypes.instanceOf(s).isRequired,
          onPageUpDown: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          var e = this.props.chat;
          return this.text = e.composeText || "", this.selection = e.composeSel, {
            trusted: this.async("chat.trusted"),
            hasText: this.hasText(),
            emojiExpanded: !1,
            recording: !1
          }
        },
        componentWillMount: function() {
          var e = this.props.chat;
          e.unset("composeText"), e.unset("composeSel"), this.regCmd("focus_chat_text_input_" + this.props.chat.id, this.focusEmojiInput), this.regCmd("paste_chat_text_input_" + this.props.chat.id, this.pasteEmojiInput), this.regCmd("enter_chat_text_input_" + this.props.chat.id, this.onSendText)
        },
        focusEmojiInput: function() {
          this.refs.input && this.refs.input.restoreFocus(!0)
        },
        pasteEmojiInput: function(e) {
          this.refs.input && (this.refs.input.restoreFocus(!0), this.refs.input.pasteText(e))
        },
        componentWillUnmount: function() {
          var e = this.props.chat;
          e.set("composeText", this.text), e.set("composeSel", this.selection)
        },
        componentDidMount: function() {
          this.height = i.findDOMNode(this.refs.input).clientHeight
        },
        uimFocus: function() {
          this.refs.input && this.refs.input.restoreFocus(!1)
        },
        uimClose: function() {
          this.state.emojiExpanded !== !1 && (this.setState({
            emojiExpanded: !1
          }), m.composeHeightChange())
        },
        onMaxPasteExceeded: function() {
          m.openModal(r.createElement(f, {
            title: l10n.t("message_too_large_title"),
            onOK: m.closeModal.bind(m),
            okText: l10n.t("web_ok")
          }, l10n.t("message_too_large_text")))
        },
        onChange: function(e) {
          var t = i.findDOMNode(this.refs.input),
            n = t.clientHeight,
            r = n - this.height;
          r && m.composeHeightChange(r), this.height = n;
          var o = this.hasText();
          this.text = e.target.value;
          var s = this.hasText();
          s !== o && this.setState({
            hasText: s
          }), s ? (this.props.chat.presence.subscribe()["catch"](g.WapDrop, _.noop), this.props.chat.markComposing()) : this.props.chat.markPaused()
        },
        onSelectionChange: function(e) {
          this.selection = e
        },
        onFocus: function() {
          u.stealFocus(u.COMPOSE_INPUT)
        },
        onPaste: function(e) {
          var t = e.clipboardData.items,
            n = _.filter(t, function(e) {
              var t = y.typeFromMimetype(e.type);
              return "file" === e.kind && ("image" === t || "video" === t)
            }).map(function(e) {
              return e.getAsFile()
            });
          if (n.length) {
            e.preventDefault();
            var i = _.reject(t, {
              kind: "string",
              type: "text/html"
            });
            return void(i.length === n.length && m.openDrawer(r.createElement(E, {
              files: n,
              chat: this.props.chat,
              type: u.DRAWER_MID
            }), "slide-up"))
          }
        },
        indicateFocus: function(e) {
          if (!(Date.now() - (b.flashFocus || 0) > 200)) {
            var t = i.findDOMNode(this.refs.input_hotkey);
            Velocity(t, "stop"), Velocity(t, {
              backgroundColor: ["#ffffff", "#D9F3FF"],
              borderColor: ["#ffffff", "#CBE4EF"]
            }, {
              duration: 1300,
              easing: [.24, .91, .01, .99]
            })
          }
        },
        onMouseDown: function(e) {
          u.stealFocus(u.COMPOSE_INPUT), e.defaultPrevented && this.refs.input.restoreFocus(!1)
        },
        onPageUpDown: function(e) {
          if (this.props.onPageUpDown) {
            e.stopPropagation(), this.props.onPageUpDown(e);
            var t = this.refs.input;
            this.safeDefer(function() {
              t.restoreFocus(!0)
            })
          }
        },
        maybeFocusChatSearch: function(e) {
          e.repeat || this.refs.input.isAtBeginning() && (e.stopPropagation(), e.preventDefault(), b.flashFocus = Date.now(), m.focusChatSearch())
        },
        onKeyPress: function(e) {
          return "Enter" !== e.key || e.shiftKey || e.ctrlKey ? void 0 : (this.onSendText(), void e.preventDefault())
        },
        hasText: function() {
          return M.hasText = this.text.trim().length > 0
        },
        onSendText: function() {
          if (this.hasText()) {
            var e = this.text;
            this.text = "", delete this.selection, this.forceUpdate(), this.props.chat.sendMessage(e), this.closeEmojiPanel()
          }
        },
        handleEmoji: function(e) {
          this.refs.input.replaceSelection(e)
        },
        openEmojiPanel: function() {
          this.state.emojiExpanded !== !0 && (this.setState({
            emojiExpanded: !0
          }), m.composeHeightChange(), this.uimPush(this, u.EMOJI, {
            escapable: !0
          }))
        },
        closeEmojiPanel: function() {
          this.state.emojiExpanded !== !1 && this.uimPop(u.EMOJI)
        },
        onPTT: function(e) {
          e === S.REC ? this.setState({
            recording: !0
          }) : this.setState({
            recording: !1
          })
        },
        preventBlur: function(e) {
          e.preventDefault(), e.stopPropagation(), this.refs.input.restoreFocus(!1)
        },
        render: function() {
          var e = this.props.chat,
            t = this.state.emojiExpanded ? r.createElement("button", {
              className: "icon icon-hide btn-emoji",
              onClick: this.closeEmojiPanel
            }) : r.createElement("button", {
              className: "icon icon-smiley btn-emoji",
              onClick: this.openEmojiPanel
            }),
            n = this.state.emojiExpanded ? r.createElement(a, {
              onEmoji: this.handleEmoji,
              key: "compose-emoji-panel"
            }) : null,
            i = "block-compose";
          this.state.recording && (i += " ptt-open");
          var s = "input-container";
          this.state.recording && (s += " disabled");
          var l = null;
          l = navigator.getUserMedia && window.AudioContext ? this.hasText() ? r.createElement("button", {
            className: "icon btn-icon icon-send send-container",
            onClick: this.onSendText
          }) : r.createElement(S, {
            key: "ptt",
            chat: e,
            onStateChange: this.onPTT
          }) : this.hasText() ? r.createElement("button", {
            className: "icon btn-icon icon-send send-container",
            onClick: this.onSendText
          }) : r.createElement("button", {
            className: "icon btn-icon icon-send send-container",
            onClick: this.onSendText,
            disabled: !0
          });
          var d = {
            pagedown: this.onPageUpDown,
            pageup: this.onPageUpDown
          };
          d[l10n.LR("left", "right")] = this.maybeFocusChatSearch;
          var p = l10n.t("type_a_message");
          return r.createElement(b, {
            component: "footer",
            handlers: d,
            className: "pane-footer pane-chat-footer",
            onMouseDown: this.preventBlur,
            onContextMenu: this.preventBlur
          }, r.createElement(v, {
            transitionName: "emoji"
          }, n), r.createElement("div", {
            className: i
          }, t, r.createElement(b, {
            ref: "input_hotkey",
            className: s,
            "data-ignore-capture": u.IGNORE_ANY,
            onFocus: this.indicateFocus
          }, r.createElement(c, {
            placeholder: p,
            editable: !this.state.recording,
            ref: "input",
            value: this.text,
            spellCheck: !0,
            selection: this.selection,
            multiline: !0,
            maxLength: o.MAX_TXT_MSG_SIZE,
            maxPaste: o.MAX_TXT_MSG_SIZE,
            onMaxPasteExceeded: this.onMaxPasteExceeded,
            onKeyPress: this.onKeyPress,
            onPaste: this.onPaste,
            onMouseDown: this.onMouseDown,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onSelectionChange: this.onSelectionChange
          })), l))
        }
      });
    e.exports = M
  },
  863: function(e, t, n) {
    "use strict";

    function r(e, t) {
      var n = [];
      return n.push(s.createElement(c, {
        key: "info",
        action: function() {
          return a.groupInfoDrawer(e)
        },
        shortcut: "i"
      }, l10n.t("web_group_info"))), n.push(s.createElement(c, {
        a8n: "mi-select-messages",
        key: "select",
        action: t,
        shortcut: "e"
      }, l10n.t("web_select_messages"))), e.mute.canMute() && n.push(s.createElement(l, {
        key: "mute",
        onMute: function(t) {
          return a.muteChat(e, t)
        },
        chat: e
      })), e.canClear() && n.push(s.createElement(c, {
        key: "clear",
        shortcut: "e",
        action: function() {
          return a.clearChatMsgs(e)
        }
      }, l10n.t("clear_group"))), e.canDelete() && n.push(s.createElement(d, {
        key: "delete",
        onDeleteOrExit: function() {
          return a.deleteOrExitChat(e)
        },
        chat: e
      })), n
    }

    function i(e, t) {
      var n = [];
      return n.push(s.createElement(c, {
        key: "info",
        action: function() {
          return a.broadcastInfoDrawer(e)
        },
        shortcut: "i"
      }, l10n.t("web_list_info"))), n.push(s.createElement(c, {
        a8n: "mi-select-messages",
        key: "select",
        action: t,
        shortcut: "e"
      }, l10n.t("web_select_messages"))), e.canClear() && n.push(s.createElement(c, {
        key: "clear",
        shortcut: "e",
        action: function() {
          return a.clearChatMsgs(e)
        }
      }, l10n.t("clear_list"))), e.canDelete() && n.push(s.createElement(d, {
        key: "delete",
        onDeleteOrExit: function() {
          return a.deleteOrExitChat(e)
        },
        chat: e
      })), n
    }

    function o(e, t) {
      var n = [];
      return n.push(s.createElement(c, {
        key: "info",
        a8n: "mi-contact",
        action: function() {
          return a.contactInfoDrawer(e)
        },
        shortcut: "i"
      }, l10n.t("web_contact_info"))), n.push(s.createElement(c, {
        a8n: "mi-select-messages",
        key: "select",
        action: t,
        shortcut: "e"
      }, l10n.t("web_select_messages"))), e.mute.canMute() && n.push(s.createElement(l, {
        key: "mute",
        onMute: function(t) {
          return a.muteChat(e, t)
        },
        chat: e
      })), e.canClear() && n.push(s.createElement(c, {
        key: "clear",
        shortcut: "e",
        action: function() {
          return a.clearChatMsgs(e)
        }
      }, l10n.t("clear_chat"))), e.canDelete() && n.push(s.createElement(d, {
        key: "delete",
        onDeleteOrExit: function() {
          return a.deleteOrExitChat(e)
        },
        chat: e
      })), n
    }
    var s = n(6),
      a = n(8),
      c = n(803),
      l = n(859),
      d = n(856);
    e.exports = {
      group: r,
      contact: o,
      broadcast: i
    }
  },
  864: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(798),
      o = n(865),
      s = n(796),
      a = r.createClass({
        displayName: "Caption",
        propTypes: {
          msg: r.PropTypes.instanceOf(s).isRequired
        },
        render: function() {
          var e = this.props.msg;
          return r.createElement("div", {
            className: "image-caption message-text",
            "data-id": e.id
          }, r.createElement(o, {
            msg: e
          }), r.createElement(i, {
            direction: "auto",
            selectable: !0,
            text: e.caption,
            linkify: !0
          }))
        }
      });
    e.exports = a
  },
  865: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(157),
      s = r.createClass({
        displayName: "HiddenText",
        propTypes: {
          msg: r.PropTypes.instanceOf(i).isRequired
        },
        render: function() {
          var e = this.props.msg,
            t = e.senderObj.formattedUser,
            n = "[" + o.timeStr(e.t) + "]";
          return r.createElement("span", {
            className: "message-pre-text"
          }, "⁠⁠", n, " ", t, ": ⁠⁠⁠")
        }
      });
    e.exports = s
  },
  866: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(84),
      o = n(106),
      s = n(158),
      a = n(356),
      c = n(986),
      l = n(44),
      d = n(711),
      u = n(43),
      p = r.createClass({
        displayName: "EmojiInput",
        mixins: [i, o, s],
        propTypes: {
          focusOnMount: r.PropTypes.bool,
          editable: r.PropTypes.bool,
          value: r.PropTypes.string,
          selection: r.PropTypes.object,
          className: r.PropTypes.string,
          placeholder: r.PropTypes.string,
          onKeyPress: r.PropTypes.func,
          onEnter: r.PropTypes.func,
          onChange: r.PropTypes.func,
          onFocus: r.PropTypes.func,
          onBlur: r.PropTypes.func,
          onMouseDown: r.PropTypes.func,
          onSelectionChange: r.PropTypes.func,
          maxLength: r.PropTypes.number,
          showRemaining: r.PropTypes.bool,
          multiline: r.PropTypes.bool,
          spellCheck: r.PropTypes.bool
        },
        getDefaultProps: function() {
          return {
            editable: !0,
            value: ""
          }
        },
        getInitialState: function() {
          return this.value = this.props.value || "", this.length = c.multibyteLength(this.value), this.selection = this.props.selection, null
        },
        componentWillMount: function() {
          this.debouncedSaveSelection = this.safeDebounce(this._saveSelection, 0)
        },
        componentWillReceiveProps: function(e) {
          if (e.value !== this.value && (this.setNewValue(e.value || "", !1), this.updateDOM(), this.safeDefer(this.restoreFocus.bind(this, !0))), this.props.editable !== e.editable) {
            var t = this.refs.input;
            t.contentEditable = e.editable, e.editable && this._disableObjectResize()
          }
        },
        restoreFocus: function(e) {
          if (this.props.editable) {
            var t = this.refs.input;
            if (t.blur(), t.focus(), this.selection && !e) this.restoreSelection(this.selection);
            else {
              var n = window.getSelection();
              n.selectAllChildren(t), n.collapseToEnd()
            }
            this.debouncedSaveSelection()
          }
        },
        componentDidMount: function() {
          this.props.focusOnMount && this.safeDefer(this.restoreFocus), this.props.editable && this._disableObjectResize(), this.setRemaining(), this.refs.input.restoreFocus = this.restoreFocus
        },
        componentWillUnmount: function() {
          this.refs.input.restoreFocus = null
        },
        _disableObjectResize: function() {
          l.isGecko && document.execCommand("enableObjectResizing", !1, !1)
        },
        limitLength: function(e) {
          var t = this.props.maxLength;
          if (!t) return e;
          e = e || "";
          var n = this.selectionLength(),
            r = n + t - c.multibyteLength(this.value);
          return r > 0 ? c.multibyteSubstr(e, 0, r) : ""
        },
        onMouseDown: function(e) {
          e.stopPropagation(), this.regNativeListener(window, "mouseup", this.onWindowMouseUp), this.props.onMouseDown && this.props.onMouseDown(e)
        },
        onWindowMouseUp: function() {
          this.unregNativeListener(window, "mouseup", this.onWindowMouseUp), this.debouncedSaveSelection()
        },
        onContextMenu: function(e) {
          e.stopPropagation()
        },
        onKeyUp: function(e) {
          if (l.isTrident && this.onInput(e), "Backspace" === e.key || "Delete" === e.key) {
            var t = this.refs.input;
            switch (t.innerHTML) {
              case "\n":
              case "\r\n":
              case "<br>":
                t.innerHTML = "", this.value = ""
            }
          }
          this.debouncedSaveSelection()
        },
        onKeyPress: function(e) {
          if (l.isTrident && this.onInput(e), !this.props.onKeyPress || (this.props.onKeyPress(e), !e.defaultPrevented)) {
            this.props.multiline || "Enter" !== e.key || (e.preventDefault(), this.props.onEnter && this.props.onEnter(e));
            var t = this.limitLength(d.ucs2.encode([e.charCode]));
            t.length || e.preventDefault()
          }
        },
        onInput: function(e) {
          var t = this.refs.input;
          this.setNewValue(a.NodeToEmoji(t), !0)
        },
        setNewValue: function(e, t) {
          if (e !== this.value) {
            if (e && !this.value) {
              var n = this.refs.placeholder;
              n && (n.style.display = "none")
            } else if (this.value && !e) {
              var n = this.refs.placeholder;
              n && (n.style.display = "")
            }
            this.value = e, this.length = c.multibyteLength(e), t && this.props.onChange && this.props.onChange({
              target: {
                value: e
              }
            }), this.setRemaining(), this.debouncedSaveSelection()
          }
        },
        setRemaining: function() {
          this.props.showRemaining && this.props.maxLength && (this.refs.counter.innerHTML = this.props.maxLength - this.length)
        },
        updateDOM: function() {
          var e = a.emojiToHTML(_.escape(this.value)),
            t = this.refs.input;
          t.innerHTML !== e && (t.innerHTML = e), this.setRemaining()
        },
        selectionLength: function() {
          if (!this.props.editable) return 0;
          var e = this.refs.input;
          e.focus();
          var t = window.getSelection();
          if (t.rangeCount) {
            var n = t.getRangeAt(0);
            return c.multibyteLength(a.NodeToEmoji(n.cloneContents()))
          }
          return 0
        },
        _saveSelection: function() {
          var e = this.getSelection();
          _.isEqual(e, this.prevSelection) || (this.props.onSelectionChange && this.props.onSelectionChange(e), this.prevSelection = this.selection, this.selection = e)
        },
        isCollapsed: function() {
          if (this.isMounted()) {
            var e = this.refs.input;
            if (document.activeElement !== e) return null;
            var t = window.getSelection();
            return t.isCollapsed
          }
        },
        getCursor: function() {
          if (!this.isMounted()) return -1;
          var e = this.refs.input;
          if (document.activeElement !== e) return null;
          var t = window.getSelection(),
            n = t.anchorNode,
            r = t.anchorOffset,
            i = e.childNodes,
            o = 0;
          e === n && (n = i[r]);
          for (var s = 0; s < i.length; s++) {
            var a = i[s];
            if (a === n) return o + r;
            a.nodeType === window.Node.ELEMENT_NODE && a.alt ? o += a.alt.length : a.nodeType === window.Node.TEXT_NODE && (o += a.length)
          }
          return o
        },
        isAtBeginning: function() {
          return this.isCollapsed() && 0 === this.getCursor()
        },
        isAtEnd: function() {
          return this.isCollapsed() && this.getCursor() === this.value.length
        },
        getSelection: function() {
          if (!this.isMounted()) return null;
          var e = this.refs.input;
          if (document.activeElement !== e) return null;
          for (var t = window.getSelection(), n = t.anchorNode, r = t.anchorOffset, i = t.focusNode, o = t.focusOffset, s = e.childNodes, a = -1, c = -1, l = !1, d = !1, u = 0; u < s.length; u++) {
            var p = s[u];
            if (p === n && (a = u, l = !0), p === i && (c = u, d = !0), l && d) break
          }
          return {
            anchor: {
              index: a,
              offset: r
            },
            focus: {
              index: c,
              offset: o
            }
          }
        },
        restoreSelection: function(e) {
          var t, n, r, i, o, s, a = this.refs.input,
            c = a.childNodes; - 1 === e.anchor.index ? (t = a, r = e.anchor.offset, o = 0) : (t = c[e.anchor.index], r = e.anchor.index, o = e.anchor.offset), -1 === e.focus.index ? (n = a, i = e.focus.offset, s = 0) : (n = c[e.focus.index], i = e.focus.index, s = e.focus.offset);
          var d;
          d = r === i ? s >= o ? "forward" : "reverse" : r > i ? "reverse" : "forward";
          var u = window.getSelection();
          if (t && n) try {
            var p = document.createRange();
            return void(l.isTrident ? ("forward" === d ? (p.setStart(t, e.anchor.offset), p.setEnd(n, e.focus.offset)) : (p.setStart(n, e.focus.offset), p.setEnd(t, e.anchor.offset)), u.removeAllRanges(), u.addRange(p)) : (p.setStart(t, e.anchor.offset), u.removeAllRanges(), u.addRange(p), u.extend(n, e.focus.offset)))
          } catch (h) {
            u.selectAllChildren(a), u.collapseToEnd()
          } else u.selectAllChildren(a), u.collapseToEnd()
        },
        onCut: function(e) {
          l.isTrident && this.onInput(e)
        },
        onPaste: function(e) {
          if (this.props.onPaste && this.props.onPaste(e), !e.defaultPrevented) {
            e.preventDefault();
            var t = l.isTrident ? "text" : "text/plain",
              n = e.clipboardData.getData(t);
            this.pasteText(n)
          }
        },
        pasteText: function(e) {
          e && (this.props.maxPaste && e.length > this.props.maxPaste ? this.props.onMaxPasteExceeded() : this.replaceSelection(e))
        },
        replaceSelection: function(e) {
          if (this.props.editable && (this.refs.input.focus(), e = this.limitLength(e), 0 !== e.length)) {
            this.props.multiline || (e = e.replace(/\n+/g, " ").replace(/(\r\n)+/g, " "));
            var t = a.emojiToHTML(_.escape(e));
            l.isTrident ? this.replaceSelectionTrident(t) : document.execCommand("insertHTML", !1, t), this.onInput(), this.debouncedSaveSelection()
          }
        },
        replaceSelectionTrident: function(e) {
          var t = window.getSelection();
          if (t.getRangeAt && t.rangeCount) {
            var n = t.getRangeAt(0);
            n.deleteContents();
            var r = document.createElement("div");
            r.innerHTML = e;
            for (var i, o, s = document.createDocumentFragment(); i = r.firstChild;) o = s.appendChild(i);
            n.insertNode(s), o && (n = n.cloneRange(), n.setStartAfter(o), n.collapse(!0), t.removeAllRanges(), t.addRange(n))
          }
        },
        shouldComponentUpdate: function() {
          return !1
        },
        render: function() {
          var e = a.emojiToHTML(_.escape(this.value)),
            t = this.props.className ? "input " + this.props.className : "input",
            n = this.props.showRemaining ? r.createElement("span", {
              className: "input-counter",
              ref: "counter"
            }) : null,
            i = u("input-emoji", {
              "input-remaining": this.props.showRemaining
            }),
            o = this.props.placeholder && !this.props.value ? r.createElement("div", {
              className: "input-placeholder",
              ref: "placeholder"
            }, this.props.placeholder) : null;
          return r.createElement("div", {
            className: i
          }, o, r.createElement("div", {
            dangerouslySetInnerHTML: {
              __html: e
            },
            dir: "auto",
            ref: "input",
            spellCheck: this.props.spellCheck,
            "data-tab": this.props.editable ? 1 : null,
            contentEditable: this.props.editable,
            className: t,
            onInput: this.onInput,
            onPaste: this.onPaste,
            onCut: this.onCut,
            onKeyUp: this.onKeyUp,
            onKeyPress: this.onKeyPress,
            onMouseDown: this.onMouseDown,
            onContextMenu: this.onContextMenu,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur
          }), n)
        }
      });
    e.exports = p
  },
  867: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(15),
      o = n(105),
      s = n(106),
      a = n(158),
      c = n(84),
      l = n(356),
      d = n(981),
      u = n(798),
      p = n(8),
      h = n(803),
      m = n(357),
      f = n(82),
      g = n(107),
      v = {
        RECENT: "Recent",
        SMILEYS_PEOPLE: "Smileys & People",
        ANIMALS_NATURE: "Animals & Nature",
        FOOD_DRINK: "Food & Drink",
        ACTIVITY: "Activity",
        TRAVEL_PLACES: "Travel & Places",
        OBJECTS: "Objects",
        SYMBOLS: "Symbols",
        FLAGS: "Flags"
      },
      y = ["Recent", "Smileys & People", "Animals & Nature", "Food & Drink", "Activity", "Travel & Places", "Objects", "Symbols", "Flags"],
      E = [""].concat(l.skinToneVariations),
      T = r.createClass({
        displayName: "EmojiPanel",
        propTypes: {
          onEmoji: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          var e = Store.RecentEmoji.length > 0 ? v.RECENT : v.SMILEYS_PEOPLE,
            t = i.getLastEmojiTab();
          return y.indexOf(t) > -1 && (e = t), {
            selected: e
          }
        },
        componentWillUnmount: function() {
          i.setLastEmojiTab(this.state.selected)
        },
        onSelectTab: function(e) {
          var t = y.indexOf(this.state.selected),
            n = y.indexOf(e),
            r = n > t ? "right" : "left";
          this.setState({
            selected: e,
            direction: r
          })
        },
        onEmoji: function(e) {
          this.props.onEmoji(e), Store.RecentEmoji.increment(e)
        },
        render: function() {
          var e = r.createElement("div", {
              className: "emoji-panel-body",
              key: "emoji-" + this.state.selected
            }, r.createElement(b, {
              tab: this.state.selected,
              onEmoji: this.onEmoji
            })),
            t = [{
              css: "icon-emoji-recent",
              tab: v.RECENT
            }, {
              css: "icon-emoji-people",
              tab: v.SMILEYS_PEOPLE
            }, {
              css: "icon-emoji-nature",
              tab: v.ANIMALS_NATURE
            }, {
              css: "icon-emoji-food",
              tab: v.FOOD_DRINK
            }, {
              css: "icon-emoji-activity",
              tab: v.ACTIVITY
            }, {
              css: "icon-emoji-travel",
              tab: v.TRAVEL_PLACES
            }, {
              css: "icon-emoji-objects",
              tab: v.OBJECTS
            }, {
              css: "icon-emoji-symbols",
              tab: v.SYMBOLS
            }, {
              css: "icon-emoji-flags",
              tab: v.FLAGS
            }],
            n = this;
          t = t.map(function(e) {
            var t = r.createElement("button", {
              className: "menu-item" + (n.state.selected === e.tab ? " active" : ""),
              onClick: n.onSelectTab.bind(null, e.tab),
              key: e.tab,
              title: e.tab
            }, r.createElement("span", {
              className: "icon " + e.css
            }));
            return t
          });
          var i = l10n.isRTL() ? -1 : 1,
            o = {
              width: 100 / y.length + "%",
              transform: "translateX(" + 100 * y.indexOf(this.state.selected) * i + "%)"
            },
            s = "right" === this.state.direction ? "slide-forward" : "slide-back";
          return r.createElement("div", {
            className: "emoji-panel k"
          }, r.createElement("div", {
            className: "menu-tabs menu-tabs-emoji emoji-panel-header",
            "data-active-tab": this.state.selected
          }, r.createElement("div", {
            style: o,
            className: "menu-tabs-marker"
          }), t), r.createElement(g, {
            transitionName: s
          }, e))
        }
      });
    e.exports = T;
    var b = r.createClass({
      displayName: "EmojiTab",
      mixins: [o, a, s, c],
      propTypes: {
        tab: r.PropTypes.oneOf(y).isRequired,
        onEmoji: r.PropTypes.func.isRequired
      },
      getInitialState: function() {
        return this.props.tab === v.RECENT ? {
          recent: Store.RecentEmoji.models.map(function(e) {
            return l.emojiMap[e["char"]]
          }),
          variants: {}
        } : void 0
      },
      componentDidMount: function() {
        var e = this;
        this.addObserver(Store.EmojiVariant, "add remove change:variant", function() {
          e.forceUpdate()
        })
      },
      componentWillUnmount: function() {
        f.popDependents(this)
      },
      onEmoji: function(e) {
        f.popDependents(this), this.props.onEmoji(e)
      },
      setEmojiVariant: function(e, t) {
        if (this.onEmoji(t), Store.EmojiVariant.setVariant(e, t), this.state.recent) {
          var n = this.state.variants;
          n[e] = t, this.setState({
            variants: n
          })
        }
        return f.pop(f.TOOLTIP), !0
      },
      onContextMenu: function(e, t, n) {
        this.clearPickerTimer(), e && (e.preventDefault(), e.stopPropagation());
        var i = this.setEmojiVariant,
          o = l.skinToneEmojis[t],
          s = E.map(function(e, n) {
            var s = o + e;
            return r.createElement(h, {
              key: s,
              action: _.partial(i, t, s)
            }, r.createElement(u, {
              text: s,
              emojiSize: u.EMOJI_SIZE.LARGE
            }))
          });
        p.openTooltip(s, {
          anchor: n || e.target,
          type: m.Type.PICKER,
          parent: this,
          menuDirection: {
            x: m.Direction.X.RIGHT,
            y: m.Direction.Y.TOP
          }
        })
      },
      clearPickerTimer: function() {
        this.pickerTimer && (this.unregNativeListener(window, "mouseup", this.clearPickerTimer, !0), this.clearSafeTimeout(this.pickerTimer), this.pickerTimer = null)
      },
      eatClick: function(e) {
        e.preventDefault(), e.stopPropagation(), this.unregCmd("window_click", this.eatClick)
      },
      startPickerTimer: function(e, t) {
        this.clearPickerTimer();
        var n = e.target;
        this.pickerTimer = this.safeDelay(function() {
          this.regCmd("window_click", this.eatClick), this.onContextMenu(null, t, n)
        }, 250), this.regNativeListener(window, "mouseup", this.clearPickerTimer, !0)
      },
      getEmoji: function() {
        var e = this.onContextMenu,
          t = this.startPickerTimer,
          n = this.onEmoji,
          i = this.state.recent ? this.state.recent : d[this.props.tab];
        return i.map(function(i) {
          var o, s, a, c = l.codeToEmoji[i];
          if (l.skinToneEmojis[c]) {
            s = function(t) {
              e(t, c, t.target)
            }, a = _.partial(t, _, c);
            var d;
            this.state.recent ? (d = this.state.variants[c], d ? (i = l.emojiMap[d], o = _.partial(n, d)) : o = _.partial(n, c)) : (d = Store.EmojiVariant.getVariant(c), d ? (i = l.emojiMap[d], o = _.partial(n, d)) : o = s)
          } else o = _.partial(n, c);
          return r.createElement("span", {
            key: c,
            onClick: o,
            onContextMenu: s,
            onMouseDown: a,
            className: "emojik emoji" + i
          })
        }.bind(this))
      },
      render: function() {
        var e = "emoji-" + this.props.tab;
        return r.createElement("div", {
          className: e
        }, this.getEmoji())
      }
    })
  },
  868: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(106),
      s = n(948),
      a = r.createClass({
        displayName: "MediaViewerFlow",
        mixins: [o],
        propTypes: {
          startId: r.PropTypes.string.isRequired
        },
        getInitialState: function() {
          var e = Store.Msg.get(this.props.startId),
            t = e.chat.mediaMsgs(),
            n = t.indexOf(e);
          return {
            mediaMsgs: t,
            index: n
          }
        },
        componentWillMount: function() {
          this.regNativeListener(window, "keydown", this.onKeyDown)
        },
        componentDidMount: function() {
          this.hasRendered = !0
        },
        onKeyDown: function(e) {
          37 === e.keyCode ? this.onPrev() : 39 === e.keyCode && this.onNext()
        },
        onNext: function(e) {
          e && e.stopPropagation(), this.state.index < this.state.mediaMsgs.length - 1 && this.setState({
            index: this.state.index + 1
          })
        },
        onPrev: function(e) {
          e && e.stopPropagation(), this.state.index > 0 && this.setState({
            index: this.state.index - 1
          })
        },
        endFlow: function() {
          i.closeModalMedia()
        },
        render: function() {
          var e = void 0,
            t = void 0;
          return (t = this.state.mediaMsgs[this.state.index]) && (e = r.createElement(s, {
            msg: t,
            onBack: this.endFlow,
            onNext: this.onNext,
            onPrev: this.onPrev,
            zoomIn: !this.hasRendered
          })), r.createElement("div", null, e)
        }
      });
    e.exports = a
  },
  869: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(21),
      c = n(106),
      l = n(158),
      d = n(7),
      u = n(817),
      p = n(1),
      h = n(800),
      m = n(802),
      f = n(801),
      g = n(832),
      v = n(935),
      y = n(160),
      E = n(107),
      T = n(815),
      b = n(82),
      S = function(e) {
        return 150 + 15 * e
      },
      M = 400,
      C = 26214400,
      w = 10,
      N = "image",
      P = "video",
      R = "url",
      k = "invalid",
      x = {
        ACTIVE: "active",
        PROCESSING: "processing",
        INVALID: "invalid"
      },
      D = s.createClass({
        displayName: "AttachMediaDrawer",
        mixins: [c, l],
        propTypes: {
          files: s.PropTypes.array,
          state: s.PropTypes.oneOf(_.values(x)),
          onBack: s.PropTypes.func.isRequired,
          onSend: s.PropTypes.func.isRequired
        },
        statics: {
          STATE: x
        },
        getDefaultProps: function() {
          return {
            state: x.PROCESSING,
            reason: null,
            isDragging: !1
          }
        },
        getInitialState: function() {
          return {
            state: this.props.state,
            activeIndex: -1,
            media: []
          }
        },
        componentWillMount: function() {
          this.regNativeListener(window, "keydown", this.onKeyDown), this.regNativeListener(window, "drop", this.onWindowDrop)
        },
        componentDidMount: function() {
          if (this.props.files) {
            var e = this;
            this.safeDelay(function() {
              e.initialize()
            }, 300)
          }
        },
        componentWillUnmount: function() {
          var e = this;
          this.state.media.forEach(function(t) {
            var n = e.getFileType(t.file);
            n === P && window.URL.revokeObjectURL(t.vid)
          })
        },
        componentDidUpdate: function() {
          this.state.state !== x.INVALID && this.state.reason && this.setState({
            reason: null
          })
        },
        initialize: function() {
          var e = this.props.files;
          e = e.slice(0, Math.min(e.length, w)), this.processFiles(e).bind(this).then(function(e) {
            this.isMounted() && this.setState({
              media: e,
              state: x.ACTIVE,
              activeIndex: 0
            })
          })["catch"](function(e) {
            this.isMounted() && this.setState({
              state: x.INVALID,
              reason: e,
              activeIndex: -1,
              prevIndex: void 0
            })
          })
        },
        getFileType: function(e) {
          var t = e.type;
          return t.match(/url/) ? R : t.match(/^image\/.*/) ? N : t.match(/^video\/.*/) ? P : k
        },
        processFiles: function(e) {
          var t = this;
          return t.setState({
            state: x.PROCESSING
          }), o["default"].all(e.map(function(e) {
            var n = t.getFileType(e);
            if (n !== N && e.size > d.MAX_MEDIA_UPLOAD_SIZE || n === N && e.size > C) {
              var r = new a.MediaFileTooLarge;
              return r.file = e, o["default"].reject(r)
            }
            var i = Math.ceil(1e6 * Math.random());
            switch (n) {
              case P:
                var s = window.URL.createObjectURL(e),
                  c = v.isSupported(e),
                  l = g.generateVideoThumb(s, d.IMG_MAX_EDGE, d.IMG_MAX_EDGE);
                return o["default"].join(c, l, function(t, n) {
                  return t ? (p.log("AttachMediaDrawer:processFiles ok file")(), {
                    file: e,
                    img: n.url,
                    width: n.width,
                    height: n.height,
                    vid: s,
                    key: i
                  }) : (p.error("AttachMediaDrawer:processFiles bad file")(e), o["default"].reject("File unsupported!"))
                })["catch"](function() {
                  return window.URL.revokeObjectURL(s), o["default"].reject("Failed to generate video thumb")
                });
              case N:
                return g.resizeAndOrient(e, d.IMG_MAX_EDGE, d.IMG_MAX_EDGE).then(function(e) {
                  return {
                    file: window.dataURLtoBlob(e.url),
                    img: e.url,
                    width: e.width,
                    height: e.height,
                    key: i
                  }
                });
              case R:
                return g.crop(e.url, 0, 0, d.IMG_MAX_EDGE, d.IMG_MAX_EDGE).then(function(e) {
                  return {
                    file: window.dataURLtoBlob(e.url),
                    img: e.url,
                    width: e.width,
                    height: e.height,
                    key: i
                  }
                });
              default:
                return o["default"].reject(new a.InvalidMediaFileType)
            }
          }))
        },
        onDragOver: function(e) {
          this.state.isDragging || this.setState({
            isDragging: !0
          })
        },
        onWindowDrop: function(e) {
          _.isEmpty(this.props.files) && _.isEmpty(this.state.media) && this.props.onBack()
        },
        onDrop: function(e) {
          this.setState({
            isDragging: !1
          }), this.onFilePick(e)
        },
        onDragLeave: function(e) {
          this.state.media.length || this.props.onBack(), this.setState({
            isDragging: !1
          });
        },
        onKeyDown: function(e) {
          if (this.state.state !== x.INVALID && !e.repeat)
            if (37 === e.keyCode) {
              var t = this.state.media[this.state.activeIndex],
                n = this.refs.emojiInput && this.refs.emojiInput.refs.inputLine;
              (t && !t.caption || n && n.isAtBeginning()) && this.onPrev()
            } else if (39 === e.keyCode) {
            var t = this.state.media[this.state.activeIndex],
              n = this.refs.emojiInput && this.refs.emojiInput.refs.inputLine;
            (t && !t.caption || n && n.isAtEnd()) && this.onNext()
          }
        },
        onNext: function() {
          this.state.activeIndex + 1 < this.state.media.length && this.setState({
            prevIndex: this.state.activeIndex,
            activeIndex: this.state.activeIndex + 1,
            state: x.ACTIVE
          })
        },
        onPrev: function() {
          this.state.activeIndex > 0 && this.setState({
            prevIndex: this.state.activeIndex,
            activeIndex: this.state.activeIndex - 1,
            state: x.ACTIVE
          })
        },
        onSelectThumb: function(e, t) {
          e !== this.state.activeIndex && this.setState({
            prevIndex: this.state.activeIndex,
            activeIndex: e,
            state: x.ACTIVE
          })
        },
        onSend: function() {
          this.props.onSend(this.state.media)
        },
        onAddFileClick: function(e) {
          var t = this.refs.input;
          t.click()
        },
        onFilePick: function(e) {
          for (var t = [], n = e.target.files || e.dataTransfer.files, r = n.length + this.state.media.length > w ? Math.max(w - this.state.media.length, 0) : n.length, i = 0; r > i; i++) t.push(n[i]);
          !n.length && this.state.media.length < w && e.dataTransfer.getData("text/uri-list") && t.push({
            type: "url",
            url: e.dataTransfer.getData("text/uri-list")
          }), this.processFiles(t).bind(this).then(function(e) {
            if (this.isMounted()) {
              var t = this.state.media.concat(e);
              this.setState({
                prevIndex: void 0,
                activeIndex: Math.min(this.state.media.length, 9),
                media: t,
                state: x.ACTIVE
              })
            }
          })["catch"](function(e) {
            this.isMounted() && this.setState({
              state: x.INVALID,
              activeIndex: -1,
              reason: e,
              prevIndex: void 0
            })
          }), e.target.value = ""
        },
        onRemoveThumb: function(e, t) {
          t.stopPropagation(), t.preventDefault();
          var n = this.state.media;
          n.splice(e, 1);
          var r = this.state.activeIndex;
          r >= e && (r = Math.max(--r, 0)), this.setState({
            prevIndex: void 0,
            activeIndex: n.length ? r : -1,
            media: n
          })
        },
        onCaptionChange: function(e) {
          var t = this.state.media;
          t[this.state.activeIndex].caption = e.target.value, this.setState({
            media: t
          })
        },
        render: function() {
          var e, t, n, r = this,
            i = 0,
            o = "media-scale",
            c = this.state.activeIndex;
          if (this.state.state === x.PROCESSING) e = s.createElement(y, {
            key: "processing"
          });
          else if (this.state.state === x.ACTIVE && c > -1) {
            var l = this.state.media[c],
              p = this.getFileType(l.file),
              g = l.width && l.height ? {
                width: l.width,
                height: l.height
              } : null;
            switch (p) {
              case N:
                e = s.createElement("img", {
                  src: l.img,
                  className: "media-viewer-img"
                });
                break;
              case P:
                e = s.createElement("video", {
                  controls: !0,
                  className: "media-viewer-img",
                  type: l.file.type,
                  src: l.vid
                })
            }
            e = s.createElement("div", {
              className: "media-body-container",
              key: this.state.media[c].key
            }, s.createElement("div", {
              className: "media-element-container"
            }, s.createElement("div", {
              className: "media-element"
            }, s.createElement(u, {
              type: u.TYPES.SCALE_DOWN,
              size: g
            }, e))), s.createElement("div", {
              className: "media-caption"
            }, s.createElement(T, {
              id: b.CAPTION_INPUT,
              ref: "emojiInput",
              editable: !0,
              value: this.state.media[c].caption,
              floating: !1,
              maxLength: d.MAX_CAPTION_LENGTH,
              showRemaining: !0,
              placeholder: l10n.t("add_a_caption"),
              onEnter: this.onSend,
              onChange: this.onCaptionChange
            }))), _.isNumber(this.state.prevIndex) && this.state.prevIndex !== c && (o = this.state.prevIndex < c ? "media-slide-forward" : "media-slide-back")
          } else if (this.state.state === x.INVALID) {
            var v, C = this.state.reason;
            if (C instanceof a.MediaFileTooLarge) switch (this.getFileType(C.file)) {
              case N:
                v = l10n.t("image_too_big");
                break;
              case P:
                v = l10n.t("video_too_big")
            }
            v = v || l10n.t("invalid_media_files"), e = s.createElement("div", {
              className: "invalid-media-container",
              key: "pending"
            }, s.createElement("div", {
              className: "invalid-media"
            }, v))
          }
          this.state.media.length > 0 && (t = this.state.media.map(function(e, t) {
            var n = "media-thumb stagger-delay";
            t === r.state.activeIndex && (n += " active");
            var i = Math.max(r.state.media.length - r.state.activeIndex - 1, 1),
              o = S(t) / i * Math.max(0, t - r.state.activeIndex) + "ms",
              a = {
                backgroundImage: "url(" + e.img + ")"
              };
            return s.createElement("div", {
              className: n,
              key: "media-" + e.key,
              onClick: r.onSelectThumb.bind(null, t),
              staggerDelay: o
            }, s.createElement("span", {
              className: "btn-delete icon icon-x-alt-light",
              onClick: r.onRemoveThumb.bind(null, t)
            }), s.createElement("div", {
              className: "media-thumb-body",
              style: a
            }))
          }), i = 1 === this.state.media.length ? M : M + S(this.state.media.length), n = s.createElement("div", {
            className: "drawer-controls"
          }, s.createElement("button", {
            className: "btn btn-round btn-l",
            "data-ignore-capture": b.IGNORE_ANY,
            onClick: this.onSend
          }, s.createElement("span", {
            className: "icon icon-send-light"
          }))));
          var R = this.state.isDragging ? s.createElement("div", {
              key: "container",
              className: "drag-drop"
            }, s.createElement("div", {
              className: "stitching"
            }, l10n.t("drag_media_here"))) : null,
            k = this.state.media.length < w ? s.createElement("div", {
              key: "media-more",
              className: "media-thumb btn-add-media",
              onClick: this.onAddFileClick
            }, s.createElement("button", {
              className: "btn-fill"
            }, s.createElement("span", {
              className: "icon icon-add-alt"
            }), l10n.t("add_media"))) : null;
          return s.createElement(h, {
            key: "attach-image-modal",
            ref: "container",
            position: "right",
            id: "media",
            variant: "noheader",
            onDrop: this.onDrop,
            onDragOver: this.onDragOver,
            onDragLeave: this.onDragLeave
          }, s.createElement(m, {
            title: l10n.t("web_preview_msg"),
            type: m.Type.OFFSET,
            onCancel: this.props.onBack
          }), s.createElement(f, null, R, s.createElement("div", {
            className: "media-body"
          }, s.createElement(E, {
            transitionName: o
          }, e)), s.createElement(E, {
            transitionName: "thumb-scale",
            className: "media-collection"
          }, t, k), s.createElement(E, {
            transitionName: "btn",
            delay: i
          }, n), s.createElement("input", {
            ref: "input",
            type: "file",
            accept: d.IMAGE_MIMES + "," + d.VIDEO_MIMES,
            style: {
              display: "none"
            },
            onChange: this.onFilePick,
            multiple: !0
          })))
        }
      });
    e.exports = D
  },
  870: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(105),
      o = n(8),
      s = n(799),
      a = n(157),
      c = n(825),
      l = n(804),
      d = n(806),
      u = n(800),
      p = n(801),
      h = n(814),
      m = n(805),
      f = n(82),
      g = n(833),
      v = r.createClass({
        displayName: "BroadcastInfoDrawer",
        mixins: [i],
        propTypes: {
          chat: r.PropTypes.instanceOf(s).isRequired
        },
        componentWillMount: function() {
          var e = this.props.chat.groupMetadata;
          this.addObserver(e.participants, "add remove sort reset")
        },
        onParticipantClick: function(e, t) {
          Store.Conn.me !== t.id && Store.Chat.find(t.id).then(function(e) {
            o.openChat(e)
          })
        },
        onClose: function() {
          o.closeDrawer(this.props.type)
        },
        onDelete: function() {
          o.deleteOrExitChat(this.props.chat)
        },
        onViewPicture: function(e) {
          var t = e.target,
            n = function(e) {
              e(t)
            };
          o.openModalMedia(r.createElement(c, {
            contact: this.props.chat.contact,
            animateBorderRadius: !0,
            getZoomNode: n
          }), "profile-viewer")
        },
        render: function() {
          var e, t = this.props.chat,
            n = t.groupMetadata,
            i = this.onParticipantClick,
            o = n.participants.map(function(e) {
              var t = Store.Contact.get(e.id) || Store.Contact.add({
                id: e.id
              });
              return r.createElement(d, {
                contact: t,
                admin: !!e.isAdmin,
                onClick: i,
                key: e.id
              })
            }),
            s = 24,
            c = g.minHeight(o, s),
            v = o.length ? r.createElement(h, {
              classes: "animate-enter1",
              title: l10n.t("web_recipients_title"),
              subtitle: l10n.n(o.length),
              style: c,
              expands: !0,
              "data-list-scroll-container": !0
            }, r.createElement(l, {
              data: o,
              height: 72,
              extraItems: 4
            })) : null;
          t.canDelete() && (e = r.createElement(h, {
            classes: "animate-enter3 drawer-section-action"
          }, r.createElement("div", {
            onClick: this.onDelete,
            className: "btn btn-danger"
          }, l10n.t("web_delete_list"))));
          var y;
          return t.groupMetadata.creation ? (y = a.timeStr(t.groupMetadata.creation), y = r.createElement("div", {
            className: "header-secondary"
          }, l10n.t("web_group_creation_time", {
            when: y
          }))) : y = null, r.createElement(u, {
            key: "contact-info-modal",
            id: "info",
            variant: "panel",
            onCancel: this.onClose
          }, r.createElement("header", {
            className: "pane-header"
          }, r.createElement("div", {
            className: "header-close"
          }, r.createElement("button", {
            onClick: this.onClose,
            "data-ignore-capture": f.IGNORE_ANY
          }, r.createElement("span", {
            className: "icon icon-x"
          }))), r.createElement("div", {
            className: "header-body"
          }, r.createElement("div", {
            className: "header-main"
          }, r.createElement("div", {
            className: "header-title"
          }, l10n.t("broadcast_list_info")), y))), r.createElement(p, {
            expands: !!o.length
          }, r.createElement(h, {
            classes: "drawer-scale drawer-section-photo"
          }, r.createElement(m, {
            id: t.id,
            size: m.LARGE,
            onClick: this.onViewPicture
          })), v, e))
        }
      });
    e.exports = v
  },
  871: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(1),
      s = n(903),
      a = n(817),
      c = n(158),
      l = n(106),
      d = n(800),
      u = n(802),
      p = n(801),
      h = n(43),
      m = n(815),
      f = n(82),
      g = n(7),
      v = n(107),
      y = {
        ANIMATING: "animating",
        LOADING: "loading",
        RECORDING: "active",
        SENDING: "sending"
      },
      E = r.createClass({
        displayName: "CaptureDrawer",
        mixins: [l, c],
        propTypes: {
          noContainer: r.PropTypes.bool,
          stream: r.PropTypes.object.isRequired,
          caption: r.PropTypes.bool,
          onBack: r.PropTypes.func.isRequired,
          onSend: r.PropTypes.func.isRequired
        },
        statics: {
          State: y
        },
        getInitialState: function() {
          return {
            state: y.ANIMATING,
            img: void 0,
            url: void 0
          }
        },
        componentDidMount: function() {
          this.safeDelay(function() {
            this.setState({
              state: y.LOADING,
              url: window.URL.createObjectURL(this.props.stream)
            })
          }, 300)
        },
        componentWillUnmount: function() {
          if (this.state.url) {
            var e = this.props.stream;
            if (_.isFunction(e.stop)) e.stop();
            else
              for (var t = e.getTracks(), n = 0; n < t.length; n++) t[n].stop();
            window.URL.revokeObjectURL(this.state.url)
          }
        },
        onCapture: function(e) {
          var t = document.createElement("canvas");
          if (this.refs.video) {
            var n = i.findDOMNode(this.refs.video);
            t.height = n.videoHeight, t.width = n.videoWidth;
            var r = t.getContext("2d");
            r.translate(t.width, 0), r.scale(-1, 1), r.drawImage(n, 0, 0, n.videoWidth, n.videoHeight);
            var o = t.toDataURL("image/jpeg");
            this.setState({
              state: y.SENDING,
              img: o
            })
          }
        },
        onVideoLoaded: function(e) {
          this.setState({
            state: y.RECORDING,
            videoSize: {
              width: e.target.videoWidth,
              height: e.target.videoHeight
            }
          })
        },
        onRetake: function(e) {
          this.setState({
            state: y.RECORDING,
            caption: void 0
          })
        },
        onSend: function(e) {
          this.props.onSend({
            file: window.dataURLtoBlob(this.state.img),
            caption: this.state.caption
          })
        },
        onCaptionChange: function(e) {
          this.setState({
            caption: e.target.value
          })
        },
        render: function() {
          var e, t, n, i;
          switch (this.state.state) {
            case y.ANIMATING:
              break;
            case y.LOADING:
            case y.RECORDING:
              var c = h("capture-video media-viewer-img webcam", {
                "capture-video-inactive": this.state.state === y.LOADING
              });
              n = r.createElement("div", {
                key: "webcam"
              }, r.createElement(a, {
                type: a.TYPES.COVER,
                size: this.state.videoSize
              }, r.createElement(s, {
                className: c,
                autoPlay: !0,
                ref: "video",
                onPlay: this.onVideoLoaded,
                src: this.state.url
              }))), e = r.createElement("div", {
                className: "drawer-controls fade",
                key: "btn-capture"
              }, r.createElement("button", {
                className: "btn btn-round btn-l",
                onClick: this.onCapture
              }, r.createElement("span", {
                className: "icon icon-camera-light"
              })));
              break;
            case y.SENDING:
              var l = {
                backgroundImage: "url(" + this.state.img + ")"
              };
              n = r.createElement("div", {
                key: "snapshot"
              }, r.createElement(a, {
                type: a.TYPES.COVER,
                size: this.state.videoSize
              }, r.createElement("div", {
                className: "capture-image snapshot",
                style: l
              })));
              var E = this.props.noContainer ? "icon icon-checkmark-light-l" : "icon icon-send-light";
              e = r.createElement("div", {
                className: "drawer-controls btn-send",
                key: "btn-send"
              }, r.createElement("button", {
                className: "btn btn-round btn-l",
                "data-ignore-capture": f.IGNORE_ANY,
                onClick: this.onSend
              }, r.createElement("span", {
                className: E
              }))), t = r.createElement("div", {
                className: "drawer-header-action",
                onClick: this.onRetake
              }, r.createElement("span", {
                className: "icon icon-refresh-light"
              }), l10n.t("retake")), i = r.createElement(m, {
                id: f.CAPTION_INPUT,
                ref: "emojiInput",
                editable: !0,
                value: this.state.caption,
                floating: !1,
                maxLength: g.MAX_CAPTION_LENGTH,
                showRemaining: !0,
                placeholder: l10n.t("add_a_caption"),
                onEnter: this.onSend,
                onChange: this.onCaptionChange
              });
              break;
            default:
              o.log("captureDrawer:render Unhandled video capture state " + this.state.state)()
          }
          var _ = void 0;
          _ = this.props.caption ? r.createElement("div", {
            className: "media-collection"
          }, r.createElement(v, {
            transitionName: "media-caption",
            className: "media-caption"
          }, i), r.createElement(v, {
            transitionName: "pop_delay"
          }, e)) : r.createElement("div", {
            className: "media-collection-no-caption"
          }, r.createElement(v, {
            transitionName: "pop_delay"
          }, e));
          var T = this.props.noContainer ? u.Type.POPUP : u.Type.OFFSET;
          return r.createElement(d, {
            key: "attach-capture-modal",
            position: "right",
            id: "capture",
            variant: "noheader",
            noContainer: this.props.noContainer
          }, r.createElement(u, {
            title: l10n.t("take_photo"),
            type: T,
            onCancel: this.props.onBack
          }, t), r.createElement(p, null, r.createElement("div", {
            className: "media-body"
          }, r.createElement("div", {
            className: "media-body-container"
          }, r.createElement(v, {
            transitionName: "capture"
          }, n))), _))
        }
      });
    e.exports = E
  },
  872: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(797),
      o = n(158),
      s = n(8),
      a = n(804),
      c = n(825),
      l = n(816),
      d = n(800),
      u = n(801),
      p = n(814),
      h = n(805),
      m = n(900),
      f = n(798),
      g = n(21),
      v = n(82),
      y = n(161),
      E = n(833),
      T = n(22),
      b = r.createClass({
        displayName: "ContactInfoDrawer",
        mixins: [i, o],
        propTypes: {
          contact: r.PropTypes.instanceOf(y).isRequired
        },
        getInitialState: function() {
          return {
            status: this.async("contact.Status.status"),
            commonGroups: void 0
          }
        },
        componentDidMount: function() {
          this.safeDelay(function() {
            this.props.contact.findCommonGroups().bind(this).then(function(e) {
              this.isMounted() && this.setState({
                commonGroups: _.compact(e)
              })
            })["catch"](g.WapDrop, _.noop)["catch"](_.noop)
          }, 300)
        },
        onDeleteChat: function() {
          var e = Store.Chat.get(this.props.contact.id);
          s.deleteOrExitChat(e)
        },
        onClose: function() {
          s.closeDrawer(this.props.type)
        },
        parseSelection: function(e) {
          for (var t, n, r = "", i = 0; i < e.rangeCount; i++)
            for (n = document.createTreeWalker(e.getRangeAt(i).cloneContents(), window.NodeFilter.SHOW_ALL); n.nextNode();) t = n.currentNode, r += t instanceof HTMLImageElement ? t.alt : t.nodeValue ? t.nodeValue : "";
          return r
        },
        onCopyPhone: function(e) {
          var t = this.parseSelection(window.getSelection()),
            n = "​",
            r = "⁠",
            i = "" + n + r + n;
          if (_.startsWith(t, i)) {
            var o = t.match(new RegExp("^" + i + "(.*?)" + i));
            o && o.length > 1 && (t = _.last(o))
          }
          t = t.replace(new RegExp("" + i), ""), e.clipboardData.setData("text/plain", t), e.stopPropagation(), e.preventDefault()
        },
        onViewPicture: function(e) {
          if (this.canViewPicture) {
            var t = e.target,
              n = function(e) {
                e(t)
              };
            s.openModalMedia(r.createElement(c, {
              contact: this.props.contact,
              animateBorderRadius: !0,
              getZoomNode: n
            }), "profile-viewer")
          }
        },
        onDetailImageLoad: function(e) {
          this.canViewPicture = !0
        },
        onClick: function(e, t) {
          s.openChat(t), this.onClose()
        },
        render: function() {
          var e, t, n = this,
            i = this.props.contact,
            o = this.state.commonGroups;
          if (_.isArray(o) && o.length) {
            e = o.map(function(e) {
              return r.createElement(l, {
                chat: e,
                mode: l.Mode.INFO,
                onClick: n.onClick,
                key: e.id
              })
            });
            var s = 24,
              c = E.minHeight(o, s);
            e = r.createElement(p, {
              title: l10n.t("web_groups_participation_you_and_name"),
              subtitle: l10n.n(o.length),
              classes: "animate-enter drawer-section-list",
              ref: "container",
              style: c,
              expands: !0,
              noContainer: !0
            }, r.createElement("div", {
              className: "drawer-section-body drawer-section-body-expand chatlist",
              ref: "list",
              "data-list-scroll-container": !0
            }, r.createElement(a, {
              data: e,
              height: 72,
              extraItems: 4
            })))
          }
          var g = Store.Chat.get(i.id);
          _.isArray(o) && g && g.canDelete() && (t = r.createElement(p, {
            classes: "animate-enter drawer-section-action"
          }, r.createElement("div", {
            onClick: this.onDeleteChat,
            className: "btn btn-danger"
          }, l10n.t("delete_chat"))));
          var y = this.state.status ? r.createElement(p, {
            title: l10n.t("web_status"),
            classes: "animate-enter1"
          }, r.createElement(f, {
            classes: "textfield-static",
            direction: "auto",
            text: this.state.status
          })) : null;
          return r.createElement(d, {
            key: "contact-info-modal",
            id: "info",
            variant: "panel",
            onCancel: this.onClose
          }, r.createElement("header", {
            className: "pane-header"
          }, r.createElement("div", {
            className: "header-close"
          }, r.createElement("button", {
            onClick: this.onClose,
            "data-ignore-capture": v.IGNORE_ANY
          }, r.createElement("span", {
            className: "icon icon-x"
          }))), r.createElement("div", {
            className: "header-body"
          }, r.createElement("div", {
            className: "header-main"
          }, r.createElement("div", {
            className: "header-title"
          }, l10n.t("web_contact_info"))))), r.createElement(u, {
            expands: !!e
          }, r.createElement(p, {
            classes: "drawer-scale drawer-section-photo"
          }, r.createElement(h, {
            id: i.id,
            size: h.LARGE,
            loader: !0,
            onLoad: this.onDetailImageLoad,
            onClick: this.onViewPicture,
            quality: h.HIGH
          })), y, r.createElement(p, {
            title: l10n.t("web_contact_phone"),
            classes: "animate-enter2"
          }, r.createElement(m, {
            className: "textfield-static",
            onCopy: this.onCopyPhone,
            dir: "auto"
          }, T.formattedUser(i.id))), e, t))
        }
      });
    e.exports = b
  },
  873: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(875),
      o = n(808),
      s = n(161),
      a = n(806),
      c = n(836),
      l = n(809),
      d = n(105),
      u = n(43),
      p = r.createClass({
        displayName: "ContactsModal",
        mixins: [d],
        propTypes: {
          title: r.PropTypes.string.isRequired,
          contacts: r.PropTypes.arrayOf(r.PropTypes.instanceOf(s)),
          filter: r.PropTypes.func,
          onCancel: r.PropTypes.func.isRequired,
          onSelect: r.PropTypes.func.isRequired
        },
        getDefaultProps: function() {
          return {
            filter: function(e) {
              return Store.Contact.isFilteredContact(e)
            }
          }
        },
        getInitialState: function() {
          return this.selection = new o, {
            searchFilter: void 0
          }
        },
        componentWillMount: function() {
          this.props.contacts || this.addObserver(Store.Contact, "add remove change:name")
        },
        onSelect: function(e, t) {
          var n = t.props.contact;
          this.props.filter(n) === !0 && this.props.onSelect(n)
        },
        onSearch: function(e) {
          this.setState({
            searchFilter: e
          })
        },
        render: function() {
          var e = this.props,
            t = e.title,
            n = e.onCancel,
            o = e.filter,
            s = e.onSelect,
            d = l10n.accentFold(this.state.searchFilter),
            p = this.props.contacts || Store.Contact,
            h = p.filter(function(e) {
              return o(e) && (!d || d && e.searchMatch(d))
            }),
            m = [];
          if (h.length) {
            this.selection.init(h.filter(function(e) {
              return o(e) === !0
            }));
            for (var f = void 0, g = void 0, v = h.length > 10, y = 0; y < h.length; y++) {
              f = h[y], v && f.header !== g && m.push(r.createElement(c, {
                key: f.header,
                header: f.header
              }));
              var E = _.isString(o(f)),
                T = void 0;
              y < h.length - 1 && h[y + 1].header !== f.header && (T = "last");
              var b = void 0;
              E && (b = r.createElement("div", {
                className: "chat-status ellipsify",
                title: o(f)
              }, o(f)), T = u(T, "member")), m.push(r.createElement(a, {
                contact: f,
                active: this.selection,
                className: T,
                secondary: b,
                onClick: E ? void 0 : s.bind(null, f),
                key: f.id
              })), g = f.header
            }
          } else m = r.createElement(l.SearchContacts, null);
          return r.createElement(i, {
            title: t,
            selection: this.selection,
            onSearch: this.onSearch,
            searchPlaceholder: l10n.t("search_contacts"),
            onSelect: this.onSelect,
            onCancel: n
          }, m)
        }
      });
    e.exports = p
  },
  874: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(797),
      o = n(105),
      s = n(8),
      a = n(799),
      c = n(157),
      l = n(804),
      d = n(806),
      u = n(800),
      p = n(801),
      h = n(814),
      m = n(835),
      f = n(798),
      g = n(803),
      v = n(878),
      y = n(82),
      E = n(352),
      _ = n(930),
      T = n(810),
      b = n(833),
      S = n(7),
      M = T.genId("max_participant_toast"),
      C = r.createClass({
        displayName: "GroupInfoDrawer",
        mixins: [i, o],
        propTypes: {
          chat: r.PropTypes.instanceOf(a).isRequired
        },
        getInitialState: function() {
          return {
            imgFull: this.async("chat.ProfilePicThumb.imgFull"),
            name: this.async("chat.contact.name") || "",
            isReadOnly: this.async("chat.isReadOnly"),
            pendingSubject: !1,
            pendingPhoto: !1
          }
        },
        componentWillMount: function() {
          var e = this.props.chat.groupMetadata;
          this.addObserver(e.participants, "add remove reset sort change:isAdmin")
        },
        componentWillUnmount: function() {
          y.popDependents(this)
        },
        onImageSet: function(e, t) {
          var n = Store.ProfilePicThumb.get(this.props.chat.id);
          this.setState({
            pendingPhoto: !0
          });
          var r;
          r = e && t ? n.setPicture(e, t) : n.deletePicture(), r.bind(this).then(function() {
            this.isMounted() && this.setState({
              pendingPhoto: !1
            })
          })
        },
        onParticipantClick: function(e, t) {
          Store.Conn.me !== t.id && Store.Chat.find(t.id).then(function(e) {
            s.openChat(e)
          })
        },
        menuEnabled: function(e) {
          var t = this.props.chat.groupMetadata.participants,
            n = t.get(e.id);
          return n && (t.canPromote(n) || t.canRemove(n))
        },
        onParticipantMenu: function(e, t, n) {
          var i = this.props.chat.groupMetadata.participants,
            o = i.get(t.id);
          if (this.menuEnabled(t)) {
            var a = [];
            if (i.canPromote(o)) {
              var c = this.confirmParticipantPromote.bind(this, o);
              a.push(r.createElement(g, {
                key: "promote",
                action: c
              }, l10n.t("menuitem_make_group_admin")))
            }
            if (i.canRemove(o)) {
              var l = this.confirmParticipantRemove.bind(this, o);
              a.push(r.createElement(g, {
                key: "remove",
                action: l,
                shortcut: "d"
              }, l10n.t("menuitem_remove")))
            }
            s.openContextMenu(a, {
              parent: this,
              anchor: e.anchor,
              event: e.event,
              onClose: n
            })
          }
        },
        confirmParticipantRemove: function(e) {
          var t = this.onParticipantRemove.bind(this, e),
            n = l10n.t("confirm_remove_group_participant", {
              participant: e.contact.formattedName,
              subject: this.props.chat.contact.name
            });
          s.openModal(r.createElement(E, {
            onOK: t,
            okText: l10n.t("remove"),
            onCancel: s.closeModal.bind(s),
            cancelText: l10n.t("web_cancel")
          }, r.createElement(f, {
            text: n
          })))
        },
        onParticipantRemove: function(e) {
          e.contact.pendingAction++, this.props.chat.groupMetadata.participants.removeParticipant(e).then(function() {
            e.contact.pendingAction--
          }), s.closeModal()
        },
        confirmParticipantPromote: function(e) {
          var t = this.onParticipantPromote.bind(this, e),
            n = l10n.t("confirm_promote_group_participant", {
              participant: e.contact.formattedName,
              subject: this.props.chat.contact.name
            });
          s.openModal(r.createElement(E, {
            onOK: t,
            okText: l10n.t("menuitem_make_group_admin"),
            onCancel: s.closeModal.bind(s),
            cancelText: l10n.t("web_cancel")
          }, r.createElement(f, {
            text: n
          })))
        },
        onParticipantPromote: function(e) {
          e.contact.pendingAction++, this.props.chat.groupMetadata.participants.promoteParticipant(e).then(function() {
            e.contact.pendingAction--
          }), s.closeModal()
        },
        openAddGroupParticipantFlow: function() {
          if (this.props.chat.groupMetadata.participants.length >= S.MAX_GROUP_SIZE) {
            var e = l10n.t("action_group_create_failed_participant", {
              max: S.MAX_GROUP_SIZE
            });
            s.openToast(r.createElement(T, {
              msg: e,
              id: M
            }))
          } else {
            var t = r.createElement(_, {
              chat: this.props.chat
            });
            s.openModal(t, "modal-flow")
          }
        },
        onClose: function() {
          s.closeDrawer(this.props.type)
        },
        onExitOrDeleteGroup: function() {
          s.deleteOrExitChat(this.props.chat)
        },
        onSubjectChange: function(e) {
          this.setState({
            name: e.target.value
          })
        },
        validateSubject: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
          return !!e.trim()
        },
        onSetSubjectError: function() {
          s.openModal(r.createElement(E, {
            onOK: s.closeModal.bind(s),
            okText: l10n.t("web_ok")
          }, l10n.t("action_group_subject_empty")))
        },
        onSetSubject: function(e) {
          var t = this.props.chat,
            n = t.groupMetadata;
          n.canSetSubject() && this.state.name !== t.contact.name && (this.setState({
            pendingSubject: !0
          }), t.setSubject(this.state.name).bind(this)["finally"](function() {
            this.isMounted() && this.setState({
              name: t.contact.name,
              pendingSubject: !1
            })
          }))
        },
        onCancelSubject: function() {
          this.setState({
            name: this.props.chat.contact.name
          })
        },
        render: function() {
          var e, t, n = this.props.chat,
            i = n.groupMetadata,
            o = this,
            s = i.participants.map(function(e) {
              var t = e.contact;
              return r.createElement(d, {
                contact: t,
                key: e.id,
                admin: !!e.isAdmin,
                onClick: o.onParticipantClick,
                contextEnabled: o.menuEnabled.bind(o, t),
                onContext: o.onParticipantMenu,
                showNotifyName: !0
              })
            });
          n.canDelete() && (t = r.createElement(h, {
            classes: "animate-enter3 drawer-section-action"
          }, r.createElement("div", {
            onClick: this.onExitOrDeleteGroup,
            className: "btn btn-danger"
          }, n.isReadOnly ? l10n.t("web_delete_group") : l10n.t("web_exit_group")))), i.participants.canAdd() && (e = r.createElement("div", {
            className: "list-action",
            onClick: this.openAddGroupParticipantFlow
          }, r.createElement("div", {
            className: "list-action-icon"
          }, r.createElement("span", {
            className: "icon icon-add-user"
          })), r.createElement("div", {
            className: "list-action-body"
          }, l10n.t("add_group_participant"))));
          var a = 24,
            f = 55,
            g = e ? a + f : a,
            E = b.minHeight(s, g),
            _ = s.length ? r.createElement(h, {
              title: l10n.t("web_participants_title"),
              subtitle: l10n.t("web_participants_count", {
                count: s.length,
                max: S.MAX_GROUP_SIZE
              }),
              classes: "animate-enter2 drawer-section-list",
              expands: !0,
              style: E,
              ref: "container",
              noContainer: !0
            }, e, r.createElement("div", {
              className: "drawer-section-body drawer-section-body-expand chatlist",
              "data-list-scroll-container": !0
            }, r.createElement(l, {
              data: s,
              height: l.DEFAULT_HEIGHT,
              extraItems: 4
            }))) : null,
            T = r.createElement(h, {
              title: l10n.t("subject"),
              classes: "animate-enter1"
            }, r.createElement(v, {
              id: y.SUBJECT_INPUT,
              value: this.state.name,
              editable: i.canSetSubject(),
              pending: this.state.pendingSubject,
              showRemaining: !0,
              validate: this.validateSubject,
              maxLength: S.MAX_SUBJECT_LENGTH,
              onChange: this.onSubjectChange,
              onSave: this.onSetSubject,
              onError: this.onSetSubjectError,
              onCancel: this.onCancelSubject
            })),
            M = n.contact.profilePicThumb,
            C = n.isReadOnly || !M.canDelete() && !M.canSet() ? m.Type.NO_EDIT : m.Type.GROUP,
            w = r.createElement(m, {
              type: C,
              id: n.contact.id,
              pending: this.state.pendingPhoto,
              startImage: this.state.imgFull,
              onImageSet: this.onImageSet
            }),
            N = null;
          return n.groupMetadata.creation && (N = r.createElement("div", {
            className: "header-secondary"
          }, l10n.t("web_group_creation_time", {
            when: c.relativeDateAndTimeStr(n.groupMetadata.creation)
          }))), r.createElement(u, {
            key: "contact-info-modal",
            id: "info",
            variant: "panel",
            onCancel: this.onClose
          }, r.createElement("header", {
            className: "pane-header"
          }, r.createElement("div", {
            className: "header-close"
          }, r.createElement("button", {
            onClick: this.onClose,
            "data-ignore-capture": y.IGNORE_ANY
          }, r.createElement("span", {
            className: "icon icon-x"
          }))), r.createElement("div", {
            className: "header-body"
          }, r.createElement("div", {
            className: "header-main"
          }, r.createElement("div", {
            className: "header-title"
          }, l10n.t("web_group_info"))), N)), r.createElement(p, {
            expands: !!s.length
          }, r.createElement(h, {
            classes: "drawer-scale drawer-section-photo"
          }, w), T, _, t))
        }
      });
    e.exports = C
  },
  875: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(800),
      o = n(802),
      s = n(801),
      a = n(159),
      c = a.HotKeys,
      l = n(820),
      d = n(82),
      u = n(804),
      p = n(839),
      h = n(808),
      m = {
        LIST: "list",
        SEARCH: "search"
      },
      f = r.createClass({
        displayName: "ListModal",
        propTypes: {
          title: r.PropTypes.string.isRequired,
          selection: r.PropTypes.instanceOf(h),
          onSearch: r.PropTypes.func,
          searchPlaceholder: r.PropTypes.string,
          onCancel: r.PropTypes.func.isRequired,
          onSelect: r.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            searchPlaceholder: l10n.t("search")
          }
        },
        getInitialState: function() {
          return {
            searchText: ""
          }
        },
        onNext: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = this.props.selection;
          t && t.setNext()
        },
        onPrev: function(e) {
          var t = this.props.selection;
          if (t) {
            e.preventDefault(), e.stopPropagation();
            var n = t.prev();
            n > -1 ? t.setPrev() : (t.unset(), c.flashFocus = Date.now(), this.refs[m.SEARCH].focus())
          }
        },
        onFocusList: function(e) {
          this.refs[m.LIST] && (e.preventDefault(), e.stopPropagation(), c.flashFocus = Date.now(), this.props.selection.setFirst())
        },
        onSelectFirst: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = _.first(this.props.children);
          t && this.props.onSelect(e, t)
        },
        onSearch: function(e) {
          this.setState({
            searchText: e
          }), this.props.onSearch(e)
        },
        render: function() {
          var e = this.props,
            t = e.title,
            n = e.onCancel,
            a = e.onSearch,
            h = e.searchPlaceholder,
            f = e.children,
            g = {
              down: this.onFocusList,
              enter: this.onSelectFirst
            },
            v = {
              down: this.onNext,
              up: this.onPrev
            },
            y = void 0;
          a && (y = r.createElement(c, {
            handlers: g
          }, r.createElement(l, {
            ref: m.SEARCH,
            searchText: this.state.searchText,
            onSearch: this.onSearch,
            searchType: d.CONTACT_SEARCH,
            placeholder: h
          })));
          var E = void 0;
          return E = f && f.length ? r.createElement(c, {
            handlers: v
          }, r.createElement(u, {
            classes: ["chatlist"],
            ref: m.LIST,
            data: f,
            height: 72,
            extraItems: 4
          })) : f, r.createElement(p, {
            type: p.TOWER
          }, r.createElement(i, {
            key: "contact-modal",
            onCancel: n,
            position: "right"
          }, r.createElement(o, {
            title: t,
            type: o.Type.POPUP,
            onCancel: n
          }), y, r.createElement(s, {
            "data-list-scroll-container": !0
          }, E)))
        }
      });
    e.exports = f
  },
  876: function(e, t, n) {
    "use strict";
    var r = n(108),
      i = {
        dataTypes: {
          msgKey: {
            set: function(e) {
              return e instanceof r ? {
                val: e,
                type: "msgKey"
              } : void 0
            },
            compare: function(e, t, n) {
              return e && t && e.toString() === t.toString()
            }
          }
        }
      };
    e.exports = i
  },
  877: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(1),
      c = n(22),
      l = n(62),
      d = n(35),
      u = n(8),
      p = n(83),
      h = n(21),
      m = n(164),
      f = n(165),
      g = l.extend({
        props: {
          id: "string",
          expiration: {
            type: "number",
            "default": 0
          }
        },
        session: {
          _unmuteTimer: "string"
        },
        derived: {
          isMuted: {
            deps: ["expiration"],
            fn: function() {
              return !!this.expiration
            }
          }
        },
        initialize: function() {
          this.expiration && this.mute(this.expiration)
        },
        setMute: function(e, t) {
          (e || this.expiration) && e !== this.expiration && (e ? this.mute(e, t) : this.unmute(t))
        },
        mute: function v(e, t) {
          if (!_.isNumber(e)) return a.log("models:Mute:mute called with invalid expiration " + e)(), o["default"].reject(new h.ActionError);
          e = Math.round(e), e > 2e9 && a.log("models:Mute:mute called with wrong units?" + this.id + " exp:" + e)();
          var v = function() {
              this.isMuted && this._clearUnmuteTimer();
              var t = e - moment().unix();
              a.log("models:Mute:mute " + this.id + " duration:" + t)(), this._unmuteTimer = f.setTimeout(this.unmute.bind(this), 1e3 * e), this.set({
                expiration: e
              })
            }.bind(this),
            n = c.isGroup(this.id);
          if (t) {
            var r = d.sendConversationMute(this.id, e, this.expiration),
              i = n ? l10n.t("action_group_muting") : l10n.t("action_chat_muting"),
              l = r["catch"](function(e) {
                throw a.error("models:Mute:mute dropped")(e), n ? l10n.t("action_group_mute_failed") : l10n.t("action_chat_mute_failed")
              }).then(function(e) {
                if (200 === e.status) return n ? l10n.t("action_group_muted") : l10n.t("action_chat_muted");
                if (e.status >= 400) throw n ? l10n.t("action_group_mute_failed") : l10n.t("action_chat_mute_failed")
              });
            return u.openToast(s.createElement(m, {
              id: m.genId(),
              pendingText: i,
              actionText: l,
              retry: this.mute.bind(this, e, t)
            })), r.then(function(e) {
              200 !== e.status || e._duplicate || v()
            })
          }
          return v(), o["default"].resolve()
        },
        canMute: function() {
          return p.supportsFeature(p.F.MUTE) && c.isGroup(this.id) || p.supportsFeature(p.F.MUTE_1_1) && c.isUser(this.id)
        },
        _clearUnmuteTimer: function() {
          f.clearTimeout(this._unmuteTimer), this.unset("_unmuteTimer"), this.expiration = 0
        },
        unmute: function y(e) {
          var y = function() {
              a.log("models:Mute:unmute " + this.id)(), this._clearUnmuteTimer()
            }.bind(this),
            t = c.isGroup(this.id);
          if (e) {
            var n = d.sendConversationMute(this.id, !1, this.expiration),
              r = t ? l10n.t("action_group_unmuting") : l10n.t("action_chat_unmuting"),
              i = n["catch"](function(e) {
                throw a.error("models:Mute:unmute dropped")(e), t ? l10n.t("action_group_unmute_failed") : l10n.t("action_chat_unmute_failed")
              }).then(function(e) {
                if (200 === e.status) return t ? l10n.t("action_group_unmuted") : l10n.t("action_chat_unmuted");
                if (e.status >= 400) throw t ? l10n.t("action_group_unmute_failed") : l10n.t("action_chat_unmute_failed")
              });
            return u.openToast(s.createElement(m, {
              id: m.genId(),
              pendingText: r,
              actionText: i,
              retry: this.unmute.bind(this, e)
            })), n.then(function(e) {
              200 !== e.status || e._duplicate || y()
            })
          }
          return y(), o["default"].resolve()
        },
        "delete": function() {
          l.prototype["delete"].call(this), this._clearUnmuteTimer()
        }
      });
    e.exports = g
  },
  878: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(815),
      o = n(107),
      s = n(160),
      a = n(43),
      c = n(82),
      l = r.createClass({
        displayName: "TextField",
        propTypes: {
          id: r.PropTypes.string,
          value: r.PropTypes.string.isRequired,
          placeholder: r.PropTypes.string,
          editable: r.PropTypes.bool,
          pending: r.PropTypes.bool,
          maxLength: r.PropTypes.number,
          showRemaining: r.PropTypes.bool,
          validate: r.PropTypes.func,
          onChange: r.PropTypes.func,
          onSave: r.PropTypes.func,
          onCancel: r.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            placeholder: "",
            id: "",
            maxLength: 25,
            editable: !1,
            showRemaining: !1,
            forceCancel: !1
          }
        },
        getInitialState: function() {
          return {
            editing: !1,
            value: this.props.value
          }
        },
        componentWillReceiveProps: function(e) {
          this.setState({
            value: e.value
          })
        },
        onEdit: function() {
          this.setState({
            editing: !0
          })
        },
        onSave: function(e) {
          e && (e.preventDefault(), e.stopPropagation());
          var t = !0;
          this.props.validate && (t = this.props.validate(this.props.value)), t ? (this.props.onSave && this.props.onSave(), this.setState({
            editing: !1
          })) : this.props.onError && this.props.onError()
        },
        uimClose: function() {
          this.onCancel()
        },
        uimFocus: function() {
          this.refs.input.focus()
        },
        onCancel: function() {
          this.state.editing && this.setState({
            editing: !1
          }, this.props.onCancel)
        },
        render: function() {
          var e, t = a({
            textfield: !0,
            "textfield-editable": this.props.editable,
            active: this.state.editing
          });
          return this.props.pending ? e = r.createElement("div", {
            className: "icon icon-spinner"
          }, r.createElement(s, {
            size: 18,
            stroke: 6
          })) : this.state.editing ? e = r.createElement("span", {
            className: "icon icon-checkmark",
            onClick: this.onSave,
            key: "btn-done",
            title: l10n.t("click_to_save_esc_to_cancel")
          }, l10n.t("save_button")) : this.props.editable && (e = r.createElement("span", {
            className: "icon icon-pencil",
            "data-ignore-capture": c.IGNORE_ANY,
            onClick: this.onEdit,
            key: "btn-edit",
            title: l10n.t("edit_button")
          }, l10n.t("edit_button"))), r.createElement("div", {
            className: t
          }, r.createElement(i, {
            id: this.props.id,
            ref: "input",
            placeholder: this.props.placeholder,
            value: this.state.value,
            editable: this.state.editing,
            maxLength: this.props.maxLength,
            showRemaining: this.props.showRemaining,
            onEnter: this.onSave,
            onChange: this.props.onChange,
            onCancel: this.onCancel,
            parent: this
          }), r.createElement(o, {
            transitionName: "pop",
            component: "div",
            className: "textfield-controls"
          }, e))
        }
      });
    e.exports = l
  },
  879: function(e, t, n) {
    "use strict";

    function r() {
      if (!o) {
        var e = n(1e3),
          t = e.length / 2;
        o = new Int32Array(t), s = new Int32Array(t);
        for (var r = 0, i = 0; t > r; r++, i += 2) o[r] = e[i] + (0 === r ? 0 : o[r - 1]), s[r] = e[i + 1]
      }
    }

    function i(e) {
      r();
      for (var t = 0; t < e.length; t++) {
        var n = 0 | e.charCodeAt(t);
        if (n >= 55296 && 56320 > n && (n = ((1023 & n) << 10 | 1023 & e.charCodeAt(++t)) + 65536), !(n < o[0])) {
          for (var i = 0 | o.length, a = 0, c = i - 1 | 0; c > a;) {
            var l = c + a >> 1;
            if (o[l] > n) c = l - 1 | 0;
            else {
              if (o[l + 1] > n) {
                c = l;
                break
              }
              a = l + 1 | 0
            }
          }
          var d = s[c],
            u = o[c] + Math.abs(d) | 0;
          if (u > n) return 0 > d ? "rtl" : "ltr"
        }
      }
    }
    var o, s;
    e.exports = {
      dir: i
    }
  },
  880: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(841),
      a = n(21),
      c = n(1),
      l = n(29),
      d = n(13),
      u = n(85),
      p = n(109),
      h = n(22),
      m = {
        computeRefs: function(e, t, n) {
          var r = h.isUser(e) ? o["default"].resolve([e, Store.Conn.me]) : Store.GroupMetadata.find(e).then(function(e) {
              return e.participants.map(function(e) {
                return e.id
              })
            }),
            i = s.computeKeys(t, n).refKey;
          return r.then(function(e) {
            return s.computeRefs(i, e)
          })
        },
        uploadMediaToMMS: function(e, t, n, r) {
          var i = new FormData;
          return i.append("from", h.user(Store.Conn.me)), i.append("to", h.user(n)), i.append("file", t, r), this.postMediaToMMS(e, i)
        },
        uploadEncryptedMediaToMMS: function(e, t, n, r, i) {
          var o = new FormData;
          return o.append("file", t, n), o.append("hash", r), o.append("refs", i.join("\r\n")), this.postMediaToMMS(e, o)
        },
        forwardEncryptedMedia: function(e, t, n) {
          var r = new FormData;
          return r.append("hash", t), r.append("refs", n.join("\r\n")), this.postMediaToMMS(e, r)
        },
        getFileMetadata: function(e) {
          if (e) {
            var t = e.getResponseHeader("X-WA-Metadata");
            if (t) return _.zipObject(t.split("; ").map(function(e) {
              var t = e.indexOf("=");
              return [e.substring(0, t), e.substring(t + 1)]
            }))
          }
          return {}
        },
        postMediaToMMS: function(e, t) {
          return l.loopOnError(a.ShouldLoop, function(n) {
            if (n > 4) throw new a.GaveUpRetry("gave up mms upload after " + n + " tries");
            var r;
            if (d.state === d.STATE.CONNECTED) {
              var i = Math.floor(1e3 * u.expBackoff(n, 60, void 0, .1));
              r = o["default"].delay(i).then(function() {
                return d.state === d.STATE.CONNECTED ? void 0 : l.waitForBBEvent(d, "change:state", _.matches({
                  state: d.STATE.CONNECTED
                }))
              })
            } else r = l.waitForBBEvent(d, "change:state", _.matches({
              state: d.STATE.CONNECTED
            }));
            var s = 3e5 * (1 + n);
            return r.then(function() {
              return p.post(e + "?f=j", t).timeout(s, "postMediaToMMSTimeout").then(function(e) {
                if (200 === e.status) return c.log("http upload success:" + e.status)(), JSON.parse(e.response);
                throw c.log("http upload error response: " + e.status)(), new a.ShouldLoop
              })["catch"](o["default"].CancellationError, _.noop)["catch"](o["default"].TimeoutError, function(e) {
                throw new a.ShouldLoop
              })["catch"](function(e) {
                return e instanceof window.ProgressEvent
              }, function(e) {
                throw c.log("http upload error: " + e)(), new a.ShouldLoop
              })
            })
          })
        }
      };
    e.exports = m
  },
  881: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function i(e, t) {
      return a(function() {
        return p.get(e, t)
      })
    }

    function o(e) {
      return a(function() {
        return p.head(e)
      })
    }

    function s(e, t) {
      return a(function() {
        return p.post(e, t)
      })
    }

    function a(e) {
      return u.loopOnError(m.ShouldLoop, function(t) {
        var n;
        return n = d.state === d.STATE.CONNECTED ? l["default"].delay(Math.floor(1e3 * h.expBackoff(t, 60, void 0, .1))) : u.waitForBBEvent(d, "change:state", _.matches({
          state: d.STATE.CONNECTED
        })), n.then(function() {
          return e().then(function(e) {
            if (e.state >= 500) throw new m.ShouldLoop;
            return e
          })["catch"](function() {
            throw new m.ShouldLoop
          })
        })
      })
    }
    var c = n(3),
      l = r(c),
      d = n(13),
      u = n(29),
      p = n(109),
      h = n(85),
      m = n(21);
    e.exports = {
      headRetry: o,
      getRetry: i,
      postRetry: s
    }
  },
  882: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(84),
      s = n(799),
      a = n(82),
      c = r.createClass({
        displayName: "ActionListener",
        mixins: [o],
        componentWillMount: function() {
          this.regCmd("mute_chat", this.onMute), this.regCmd("delete_or_exit_chat", this.onDeleteOrExit), this.regCmd("archive_chat", this.onArchive), this.regCmd("clear_chat_msgs", this.onClear), this.regCmd("mark_chat_unread", this.onMarkUnread), this.regCmd("msg_info_drawer", this.onMsgInfoDrawer), this.regCmd("group_info_drawer", this.onGroupInfoDrawer), this.regCmd("contact_info_drawer", this.onContactInfoDrawer), this.regCmd("broadcast_info_drawer", this.onBroadcastInfoDrawer)
        },
        onGroupInfoDrawer: function(e) {
          var t = n(874);
          return a.find(a.DRAWER_RIGHT) ? void i.closeDrawer() : void i.openDrawer(r.createElement(t, {
            chat: e,
            type: a.DRAWER_RIGHT
          }), "slide-left")
        },
        onBroadcastInfoDrawer: function(e) {
          var t = n(870);
          return a.find(a.DRAWER_RIGHT) ? void i.closeDrawer() : void i.openDrawer(r.createElement(t, {
            chat: e,
            type: a.DRAWER_RIGHT
          }), "slide-left")
        },
        onContactInfoDrawer: function(e) {
          var t = n(872);
          return a.find(a.DRAWER_RIGHT) ? void i.closeDrawer(a.DRAWER_RIGHT) : void i.openDrawer(r.createElement(t, {
            contact: e.contact,
            type: a.DRAWER_RIGHT
          }), "slide-left")
        },
        onMute: function l(e, t, o) {
          if (t) {
            var s = n(949),
              l = function(t) {
                e.pendingAction++, e.mute.mute(t, !0)["finally"](function() {
                  e.pendingAction--
                })
              };
            i.openModal(r.createElement(s, {
              chat: e,
              onMute: l
            }), null, o)
          } else e.pendingAction++, e.mute.unmute(!0)["finally"](function() {
            e.pendingAction--
          })
        },
        onDeleteOrExit: function(e, t) {
          var o = n(943),
            s = function(t) {
              e.pendingAction++, t["finally"](function() {
                e.pendingAction--
              })
            };
          i.openModal(r.createElement(o, {
            chat: e,
            onDeleteOrExit: s
          }), null, t)
        },
        onClear: function(e, t) {
          var o = n(940);
          i.openModal(r.createElement(o, {
            chat: e
          }), null, t)
        },
        onArchive: function(e, t) {
          e.pendingAction++, e.setArchive(t)["finally"](function() {
            e.pendingAction--
          })
        },
        onMarkUnread: function(e, t) {
          e.pendingAction++, e.markUnread(t)["finally"](function() {
            e.pendingAction--
          })
        },
        onMsgInfoDrawer: function(e) {
          if (e.chat.kind === s.KIND.CHAT) {
            var t = n(942);
            i.openDrawer(r.createElement(t, {
              msg: e,
              key: e.id.toString(),
              type: a.DRAWER_RIGHT
            }), "slide-left")
          } else {
            var o = n(946);
            i.openDrawer(r.createElement(o, {
              msg: e,
              key: e.id.toString(),
              type: a.DRAWER_RIGHT
            }), "slide-left")
          }
        },
        render: function() {
          return null
        }
      });
    e.exports = c
  },
  883: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(1),
      o = n(44),
      s = n(110),
      a = n(13),
      c = n(111),
      l = n(63),
      d = n(169),
      u = n(45),
      p = n(64),
      h = n(29),
      m = n(105),
      m = n(105),
      f = n(84),
      g = n(158),
      v = n(7),
      y = n(8),
      v = n(7),
      E = n(43),
      _ = n(107),
      T = n(824),
      b = r.createClass({
        displayName: "ButterBar",
        mixins: [m, f],
        getInitialState: function() {
          this._showNotifyTimer = new p(this, this.showPrompt), this._showBatteryTimer = new p(this, this.batteryUpdate);
          var e = d.battery < v.BATTERY_LOW_THRESHOLD_1 ? d.battery < v.BATTERY_LOW_THRESHOLD_2 ? 2 : 1 : 0;
          return {
            lowBatteryWarning: e,
            notifyPermission: window.Notification && window.Notification.permission,
            showNotify: !1
          }
        },
        componentWillMount: function() {
          this.addObserver(l, "change:displayInfo"), this.addObserver(l, "change:needsUpdate"), this.addObserver(d, "change:plugged", this.batteryUpdate), this.addObserver(d, "change:battery", this.batteryUpdate)
        },
        componentWillUnmount: function() {
          this._showNotifyTimer.cancel(), this._showBatteryTimer.cancel()
        },
        onReload: function() {
          s.restart()
        },
        batteryUpdate: function(e) {
          var t = this.state.lowBatteryWarning;
          d.plugged || d.battery > v.BATTERY_LOW_THRESHOLD_1 ? 0 !== t && this.setState({
            lowBatteryWarning: 0
          }) : d.battery <= v.BATTERY_LOW_THRESHOLD_2 ? -2 !== t && (e ? this._showBatteryTimer.before(v.BATTERY_DELAY) : 2 !== t && this.setState({
            lowBatteryWarning: 2
          })) : t > -1 && d.battery <= v.BATTERY_LOW_THRESHOLD_1 && (e ? this._showBatteryTimer.before(v.BATTERY_DELAY) : 1 !== t && this.setState({
            lowBatteryWarning: 1
          }))
        },
        dismissLowBatteryWarning: function() {
          var e = this.state.lowBatteryWarning;
          e > 0 && this.setState({
            lowBatteryWarning: -e
          })
        },
        showPrompt: function(e) {
          this.setState({
            showNotify: e
          })
        },
        guideConfirm: function() {
          y.closeModal()
        },
        guideLearnMore: function() {
          switch (o.browser) {
            case v.BROWSER_TYPE.CHROME:
              return window.open("http://www.whatsapp.com/faq/web/28080004", "_blank");
            case v.BROWSER_TYPE.FIREFOX:
              return window.open("http://www.whatsapp.com/faq/web/28080006", "_blank");
            case v.BROWSER_TYPE.SAFRI:
              return window.open("http://www.whatsapp.com/faq/web/28080008", "_blank");
            case v.BROWSER_TYPE.OPERA:
              return window.open("http://www.whatsapp.com/faq/web/28080007", "_blank");
            default:
              return window.open("http://www.whatsapp.com/faq/web/28080004", "_blank")
          }
        },
        requestPermissions: function() {
          y.openModal(r.createElement(T, {
            title: "guide_desktop_notifications_title",
            desc: "guide_desktop_notifications_description",
            onConfirm: this.guideConfirm,
            onCancel: this.guideLearnMore,
            type: T.TYPE.GUIDE_ALLOW
          }));
          var e = this;
          window.Notification.requestPermission(function(t) {
            y.closeModal(), e.setState({
              notifyPermission: t
            })
          })
        },
        render: function() {
          var e = null;
          switch (l.displayInfo) {
            case l.INFO.OFFLINE:
              e = r.createElement(C, {
                key: "bbar"
              });
              break;
            case l.INFO.OPENING:
            case l.INFO.CONNECTING:
              e = r.createElement(w, {
                key: "bbar"
              });
              break;
            case l.INFO.NORMAL:
              break;
            case l.INFO.RESUMING:
            case l.INFO.TIMEOUT:
              var t = window.open.bind(window, "http://www.whatsapp.com/faq/web/28080002", "_blank"),
                n = r.createElement("span", null, l10n.t("make_sure_phone_active_internet_connection"), " ", r.createElement("span", {
                  className: "action",
                  onClick: t
                }, l10n.t("learn_more")));
              e = r.createElement(S, {
                type: "phone",
                key: "bbar",
                title: l10n.t("phone_not_connected"),
                text: n
              })
          }
          if (!e && this.state.lowBatteryWarning > 0 && (e = r.createElement(S, {
              type: "battery",
              key: "bbar",
              title: l10n.t("phone_battery_low"),
              text: l10n.t("charge_phone_description"),
              dismissable: !0,
              onDismiss: this.dismissLowBatteryWarning
            })), !e && l.needsUpdate && (e = r.createElement(S, {
              type: "update",
              key: "bbar",
              title: l10n.t("update_available"),
              text: l10n.t("click_to_update_whatsapp_web"),
              action: this.onReload
            })), e) this.state.showNotify && this._showNotifyTimer.before(0, !1);
          else if (this.state.showNotify) {
            if (window.Notification && this.state.notifyPermission === v.PERMISSION_DEFAULT) {
              var i = r.createElement("span", {
                className: "action",
                onClick: this.requestPermissions
              }, l10n.t("enable_desktop_notifications"));
              e = r.createElement(S, {
                type: "notification",
                key: "bbar",
                title: l10n.t("get_notified_of_new_messages"),
                text: i
              })
            }
          } else this._showNotifyTimer.before(v.NOTIFICATION_PROMPT_DELAY, !0);
          return r.createElement("div", {
            className: "butterbar-container"
          }, r.createElement(_, {
            transitionName: "butterbar"
          }, e))
        }
      }),
      S = r.createClass({
        displayName: "BB",
        propTypes: {
          type: r.PropTypes.oneOf(["computer", "phone", "notification", "battery", "update"]),
          title: r.PropTypes.node.isRequired,
          text: r.PropTypes.node,
          dismissable: r.PropTypes.bool,
          onDismiss: r.PropTypes.func,
          action: r.PropTypes.func
        },
        onClick: function() {
          this.props.action && this.props.action()
        },
        render: function() {
          var e, t;
          switch (this.props.type) {
            case "computer":
            case "phone":
            case "notification":
            case "battery":
            case "update":
              e = "butterbar-" + this.props.type, t = "icon-alert-" + this.props.type;
              break;
            default:
              i.log("butterbar:render invalid type")()
          }
          var n = E("butterbar", e, {
              action: this.props.action
            }),
            o = E("icon", "icon-alert", t),
            s = this.props.dismissable ? r.createElement("div", {
              className: "butterbar-controls"
            }, r.createElement("button", {
              className: "icon icon-x-light",
              onClick: this.props.onDismiss
            })) : null,
            a = this.props.text ? r.createElement("div", {
              className: "butterbar-text"
            }, this.props.text) : null;
          return r.createElement("div", {
            className: "butterbar-wrapper"
          }, r.createElement("div", {
            className: n,
            onClick: this.onClick
          }, r.createElement("div", {
            className: "butterbar-icon"
          }, r.createElement("span", {
            className: o
          })), r.createElement("div", {
            className: "butterbar-body"
          }, r.createElement("div", {
            className: "butterbar-title"
          }, this.props.title), a), s))
        }
      }),
      M = 3e3,
      C = r.createClass({
        displayName: "Offline",
        mixins: [g],
        getInitialState: function() {
          return {
            allowReconnect: !0
          }
        },
        reconnect: function() {
          var e = c.numSocketsAttempted + 1;
          a.poke(), h.waitForBBEvent(l, "change:displayInfo", function() {
            return l.displayInfo === l.INFO.NORMAL
          }).then(function() {
            new u.WebcManualWebsocketAttempt({
              webcManualWebsocketAttemptSuccessful: c.numSocketsAttempted === e
            }).commit()
          }), this.setState({
            allowReconnect: !1
          }), this.reconnectTimeout = this.safeDelay(this.resetReconnectTimeout, M)
        },
        resetReconnectTimeout: function() {
          this.clearSafeTimeout(this.reconnectTimeout), delete this.reconnectTimeout, this.setState({
            allowReconnect: !0
          })
        },
        render: function() {
          var e, t;
          return this.state.allowReconnect ? (e = r.createElement("span", null, l10n.t("make_sure_computer_active_internet_connection") + " ", r.createElement("span", {
            className: "action",
            onClick: this.reconnect
          }, l10n.t("reconnect"))), t = l10n.t("computer_not_connected")) : (e = null, t = l10n.t("connecting_to_whatsapp_or_phone")), r.createElement(S, {
            type: "computer",
            title: t,
            text: e
          })
        }
      }),
      w = r.createClass({
        displayName: "Resume",
        mixins: [g, m],
        getInitialState: function() {
          return {
            takingTooLong: !1,
            didShowSubtitle: !1
          }
        },
        componentWillMount: function() {
          this.addObserver(a, "change:state", this.onProgress), this.addObserver(a, "change:retryTimestamp", this.onProgress)
        },
        onProgress: function() {
          this.clearSafeInterval(this.interval), delete this.interval, this.startTimeout(), this.setState({
            takingTooLong: !1
          })
        },
        componentDidMount: function() {
          this.startTimeout()
        },
        startTimeout: function() {
          this.safeDelay(this.connectTimeout, 3e3)
        },
        connectTimeout: function() {
          this.interval = this.safeInterval(this.timeoutTick, 1e3), this.setState({
            takingTooLong: !0,
            didShowSubtitle: !0
          })
        },
        timeoutTick: function() {
          this.setState({
            now: Date.now()
          })
        },
        retry: function(e) {
          a.poke(), this.onProgress()
        },
        cancel: function(e) {
          a.logout()
        },
        render: function() {
          var e, t;
          if (l.displayInfo === l.INFO.OPENING) e = l10n.t("connecting_to_whatsapp");
          else {
            if (l.displayInfo !== l.INFO.CONNECTING) return null;
            e = l10n.t("connecting_to_whatsapp_or_phone")
          }
          if (this.state.takingTooLong) {
            var n = a.retryTimestamp - Date.now();
            if (6e4 > n) {
              var i = Math.ceil(n / 1e3);
              n = l10n.t("retrying_in_some_seconds", {
                number: i,
                _plural: i
              })
            } else n = l10n.t("retrying_in", {
              duration: moment.duration(n).humanize()
            });
            t = r.createElement("span", null, n, " ", r.createElement("span", {
              className: "action",
              onClick: this.retry
            }, l10n.t("retry_now")))
          } else t = this.state.didShowSubtitle ? r.createElement("span", null, l10n.t("retrying")) : null;
          return r.createElement(S, {
            type: "computer",
            title: e,
            text: t
          })
        }
      });
    e.exports = b
  },
  884: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(798),
      s = n(888),
      a = n(105),
      c = r.createClass({
        displayName: "ChatstateInfo",
        mixins: [a],
        propTypes: {
          chat: r.PropTypes.instanceOf(i)
        },
        componentWillMount: function() {
          var e = this.props.chat;
          this.addObserver(e.msgs, "change:last"), this.addObserver(e.presence, "change:chatstate.id change:chatstate.type change:withholdDisplay")
        },
        render: function() {
          var e = this.props.chat,
            t = e.presence;
          if (t.isActive()) {
            var n = t.getFormattedString();
            return r.createElement("div", {
              className: "chat-status typing ellipsify",
              dir: "auto"
            }, r.createElement(o, {
              ellipsify: !0,
              titlify: !0,
              text: n
            }))
          }
          var i = e.msgs.last();
          return i ? r.createElement(s, {
            key: i.id,
            msg: i
          }) : r.createElement("div", {
            className: "chat-status"
          })
        }
      });
    e.exports = c
  },
  885: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(157),
      o = r.createClass({
        displayName: "ContactMsgInfoCell",
        propTypes: {
          title: r.PropTypes.string.isRequired,
          icon: r.PropTypes.node.isRequired,
          t: r.PropTypes.number
        },
        render: function() {
          var e = this.props,
            t = e.title,
            n = e.t,
            o = e.icon,
            s = n ? i.relativeDateAndTimeStr(n) : "-",
            a = {
              cursor: "auto"
            };
          return r.createElement("div", {
            className: "contact chat",
            style: a
          }, r.createElement("div", {
            className: "chat-body"
          }, r.createElement("div", {
            className: "chat-main"
          }, r.createElement("div", {
            className: "chat-title"
          }, r.createElement("span", {
            className: "ellipsify",
            dir: "auto"
          }, o, t))), r.createElement("div", {
            className: "chat-secondary"
          }, r.createElement("div", {
            className: "chat-status ellipsify"
          }, r.createElement("span", {
            className: "ellipsify",
            dir: "auto"
          }, s)))))
        }
      });
    e.exports = o
  },
  886: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(819),
      o = n(805),
      s = n(157),
      a = n(797),
      c = r.createClass({
        displayName: "GroupMsgInfoCell",
        mixins: [a],
        propTypes: {
          participant: r.PropTypes.instanceOf(Object).isRequired
        },
        getInitialState: function() {
          return {
            formattedName: this.async("participant.contact.formattedName")
          }
        },
        render: function() {
          var e = this.props.participant,
            t = r.createElement("div", {
              className: "chat-avatar"
            }, r.createElement(o, {
              id: e.id
            })),
            n = {
              cursor: "auto"
            };
          return r.createElement(i, {
            id: e.id,
            contextEnabled: function() {
              return !1
            },
            image: t,
            primary: this.state.formattedName,
            secondary: s.relativeDateAndTimeStr(e.t),
            style: n
          })
        }
      });
    e.exports = c
  },
  887: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(797),
      o = n(107),
      s = r.createClass({
        displayName: "Icons",
        mixins: [i],
        propTypes: {
          chat: r.PropTypes.object.isRequired
        },
        getInitialState: function() {
          return {
            isMuted: this.async("chat.mute.isMuted"),
            unreadCount: this.async("chat.unreadCount"),
            archive: this.async("chat.archive")
          }
        },
        render: function() {
          var e = this.props.chat,
            t = this.state.isMuted ? r.createElement("span", {
              className: "icon icon-meta icon-muted",
              key: "icon-muted"
            }) : null,
            n = 0 !== e.unreadCount ? r.createElement("span", {
              className: "icon-meta unread-count",
              key: "icon-unread"
            }, e.unreadCount > 0 ? l10n.n(this.state.unreadCount) : r.createElement("span", null, " ")) : null,
            i = this.state.archive ? r.createElement("span", {
              className: "icon-meta chat-marker chat-marker-archived",
              key: "icon-archived"
            }, l10n.t("chat_archived")) : null;
          return r.createElement(o, {
            transitionName: "pop"
          }, t, i, n)
        }
      });
    e.exports = s
  },
  888: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(44),
      s = n(831),
      a = n(890),
      c = n(852),
      l = n(798),
      d = n(797),
      u = n(105),
      p = n(43),
      h = r.createClass({
        displayName: "LastMsg",
        mixins: [d, u],
        propTypes: {
          msg: r.PropTypes.instanceOf(i).isRequired
        },
        getInitialState: function() {
          return this.props.msg.sender ? {
            formattedShortName: this.async("msg.senderObj.formattedShortName")
          } : {}
        },
        componentWillMount: function() {
          "ptt" === this.props.msg.type && this.addObserver(this.props.msg, "change:duration")
        },
        render: function() {
          var e = this.props.msg,
            t = [];
          if (e.isSentByMe && t.push(r.createElement(a, {
              msg: e,
              key: "symbol"
            })), !e.isSentByMe && e.isGroupMsg && !e.isNotification) {
            var n = p("chat-status-name", {
              number: !e.senderObj.name
            });
            t.push(r.createElement(l, {
              text: this.state.formattedShortName,
              direction: "auto",
              classes: n,
              key: "author"
            })), t.push(r.createElement("span", {
              className: "chat-status-divider",
              key: "divider"
            }, ":"))
          }(e.hasSymbol || e.type === i.TYPE.DOCUMENT) && t.push(r.createElement(c, {
            msg: e,
            key: "msg-symbol"
          })), t.push(r.createElement(l, {
            direction: e.dir,
            ellipsify: !0,
            text: s.msgText(e),
            key: "status"
          }));
          var d = "chat-status";
          o.isGecko && (d += " ellipsify");
          var u = l10n.embedDir(s.msgText(e), e.rtl);
          return r.createElement("div", {
            className: d,
            title: u
          }, t)
        }
      });
    e.exports = h
  },
  889: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(797),
      s = n(819),
      a = n(798),
      c = n(853),
      l = n(852),
      d = n(796),
      u = n(82),
      p = n(43),
      h = n(829),
      m = n(105),
      f = n(44),
      g = n(831),
      v = n(796),
      y = n(159),
      E = y.HotKeys,
      T = r.createClass({
        displayName: "Message",
        mixins: [o, m],
        propTypes: {
          msg: r.PropTypes.instanceOf(d).isRequired,
          mouseDownAsClick: r.PropTypes.bool,
          onClick: r.PropTypes.func,
          active: r.PropTypes.object
        },
        getInitialState: function() {
          var e = this.props.msg,
            t = this.props.active;
          return {
            formattedTitle: this.async("msg.chat.formattedTitle"),
            active: t ? t.value === e : !1
          }
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.active;
          t && this.addObserver(t, this.props.msg.id.toString(), function(t) {
            if ("focus" === t) {
              var n = i.findDOMNode(e);
              n.focus(), h.scrollIntoViewIfNeeded(n)
            }
            e.setState({
              active: t
            })
          })
        },
        componentWillUnmount: function() {
          var e = i.findDOMNode(this);
          e.contains(document.activeElement) && u.focusNodeOrParent(e.parentNode)
        },
        onClick: function(e) {
          if (_.isFunction(this.props.onClick)) {
            var t = this.props.msg,
              n = t.chat,
              r = n.getSearchContext(t);
            r.msg = t, this.props.onClick(e, n, r)
          }
        },
        onMouseDown: function(e) {
          0 === e.button && this.onClick(e)
        },
        onEnter: function(e) {
          e.preventDefault(), e.stopPropagation(), E.flashFocus = Date.now(), this.onClick(e)
        },
        indicateFocus: function(e) {
          if (!(Date.now() - (E.flashFocus || 0) > 200)) {
            var t = i.findDOMNode(this.refs.cell);
            Velocity(t, "stop"), Velocity(t, {
              backgroundColor: ["#e9eaeb", "#cbdde7"]
            }, {
              duration: 1300,
              easing: [.19, .69, .01, .99],
              complete: this.onBlur
            })
          }
        },
        onBlur: function(e) {
          var t = i.findDOMNode(this.refs.cell);
          t && (Velocity(t, "stop"), t.style.backgroundColor = "")
        },
        contextEnabled: function() {
          return !1
        },
        render: function() {
          var e = this.props.msg,
            t = r.createElement(c, {
              msg: e
            }),
            n = [];
          (e.hasSymbol || e.type === v.TYPE.DOCUMENT) && n.push(r.createElement(l, {
            msg: e,
            key: "msg-symbol"
          })), n.push(r.createElement(a, {
            direction: e.dir,
            ellipsify: !0,
            text: g.msgText(e),
            key: "status"
          }));
          var i = "chat-status";
          f.isGecko && (i += " ellipsify");
          var o = l10n.embedDir(g.msgText(e), e.rtl),
            d = r.createElement("div", {
              className: i,
              title: o
            }, n),
            u = {
              enter: this.onEnter
            },
            h = p("message", {
              active: !!this.state.active
            }),
            m = this.props.mouseDownAsClick;
          return r.createElement(E, {
            handlers: u,
            onFocus: this.indicateFocus,
            onBlur: this.onBlur,
            className: "chat-drag-cover"
          }, r.createElement(s, {
            id: e.id + "",
            ref: "cell",
            contextEnabled: this.contextEnabled,
            className: h,
            primary: e.chat.formattedTitle,
            primaryDetail: t,
            secondary: d,
            onClick: m ? null : this.onClick,
            onMouseDown: m ? this.onMouseDown : null,
            onContext: this.onMenu
          }))
        }
      });
    e.exports = T
  },
  890: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(797),
      s = n(43),
      a = r.createClass({
        displayName: "MsgAck",
        mixins: [o],
        propTypes: {
          msg: r.PropTypes.instanceOf(i)
        },
        getInitialState: function() {
          return {
            ack: this.async("msg.ack")
          }
        },
        render: function() {
          var e = this.props.msg.ack,
            t = s("icon", {
              "icon-status-time": 1 > e,
              "icon-status-check": 1 === e,
              "icon-status-dblcheck": 2 === e,
              "icon-status-dblcheck-ack": e > 2
            });
          return r.createElement("span", {
            className: t
          })
        }
      });
    e.exports = a
  },
  891: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(361),
      o = n(798),
      s = n(797),
      a = r.createClass({
        displayName: "Status",
        mixins: [s],
        propTypes: {
          status: r.PropTypes.instanceOf(i)
        },
        getInitialState: function() {
          return {
            status: this.async("status.status")
          }
        },
        render: function() {
          return _.isUndefined(this.state.status) ? r.createElement("div", {
            className: "muted"
          }, l10n.t("contact_status_loading")) : r.createElement("div", {
            className: "chat-status ellipsify",
            title: this.state.status
          }, r.createElement(o, {
            direction: "auto",
            ellipsify: !0,
            text: this.state.status
          }))
        }
      });
    e.exports = a
  },
  892: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(710),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(804),
      l = n(8),
      d = n(836),
      u = n(105),
      p = n(84),
      h = n(808),
      m = n(106),
      f = n(816),
      g = n(799),
      v = n(806),
      y = n(889),
      E = n(83),
      T = n(159),
      b = T.HotKeys,
      S = s.createClass({
        displayName: "Chatlist",
        mixins: [u, p, m],
        propTypes: {
          isSearching: s.PropTypes.bool,
          chats: s.PropTypes.array,
          contacts: s.PropTypes.array,
          ftsResult: s.PropTypes.array,
          onClick: s.PropTypes.func,
          onFocusSearch: s.PropTypes.func
        },
        getDefaultProps: function() {
          return {
            chats: []
          }
        },
        getInitialState: function() {
          var e = this;
          return this.debouncedOpenSelected = _.debounce(function() {
            e.openSelected(e.focusComposer), e.focusComposer = !1
          }, 200), this.selection = new h(this.getSelection(), function(e) {
            return e.id.toString()
          }), {}
        },
        componentDidMount: function() {
          this.regCmd("focus_chat_list", this.restoreFocus), this.regCmd("focus_next_chat", this.onNextChat.bind(this, null, !0)), this.regCmd("focus_prev_chat", this.onPrevChat.bind(this, null, !0)), this.regCmd("open_chat", this.updateSelected)
        },
        componentDidUpdate: function() {
          var e = this.selection.getVal();
          this.selection.init(this.getSelection(), !this.props.isSearching), e !== this.selection.getVal() && this.debouncedOpenSelected()
        },
        updateSelected: function(e, t) {
          this.debouncedOpenSelected.cancel();
          var n = t ? t.msg : e;
          this.selection.setVal(n, !0)
        },
        openSelected: function(e) {
          e = e || !1;
          var t = this.selection.getVal();
          t && t instanceof g && l.openChat(t, !1, e, !1)
        },
        onClick: function(e, t, n) {
          var r = this;
          e.preventDefault(), e.stopPropagation(), Store.Chat.find(t.id).then(function(e) {
            r.props.isSearching && r.props.onClick && r.props.onClick(), l.openChat(e, n, !0)
          })
        },
        getSelection: function() {
          return [].concat((0, o["default"])(this.props.chats), (0, o["default"])(this.props.contacts), (0, o["default"])(this.props.ftsResult))
        },
        getList: function() {
          for (var e = this, t = this.props, n = t.chats, r = t.contacts, i = t.ftsResult, o = [], a = 0; a < n.length; a++) {
            var c = n[a];
            c && (this.props.isSearching && 0 === a && (r.length || i.length) && o.push(s.createElement(d, {
              key: "chat-header",
              header: l10n.t("web_chats")
            })), o.push(s.createElement(f, {
              chat: c,
              mode: f.Mode.LAST,
              onClick: this.onClick,
              mouseDownAsClick: !0,
              active: this.selection,
              key: c.id
            })))
          }
          for (var l = 0; l < r.length; l++) {
            var u = r[l];
            u && (0 === l && o.push(s.createElement(d, {
              key: "contact-header",
              header: l10n.t("web_contacts")
            })), o.push(s.createElement(v, {
              contact: u,
              active: this.selection,
              onClick: this.onClick,
              mouseDownAsClick: !0,
              key: u.id
            })))
          }
          return E.supportsFeature(E.F.FULL_TEXT_SEARCH) && _.partition(i, {
            star: !0
          }).forEach(function(t, n) {
            for (var r = 0 === n ? l10n.t("web_starred_messages") : l10n.t("web_messages"), i = 0; i < t.length; i++) 0 == i && o.push(s.createElement(d, {
              key: "fts-header-" + n,
              header: r
            })), o.push(s.createElement(y, {
              msg: t[i],
              onClick: e.onClick,
              active: e.selection,
              key: t[i].id.toString()
            }))
          }), o
        },
        restoreFocus: function() {
          this.selection.reset()
        },
        onFocusGain: function(e) {
          e.target === a.findDOMNode(this) && (this.selection.index < 0 ? this.focusFirst() : this.selection.reset())
        },
        focusFirst: function() {
          this.selection.setFirst(), this.debouncedOpenSelected()
        },
        onNextChat: function(e, t, n) {
          e && (e.preventDefault(), e.stopPropagation());
          var r = this.selection.next();
          this.selection.index !== r && (this.selection.setNext(), this.focusComposer = n, this.debouncedOpenSelected())
        },
        onPrevChat: function(e, t, n) {
          e && (e.stopPropagation(), e.preventDefault());
          var r = this.selection.prev();
          r > -1 ? (this.selection.setPrev(), this.focusComposer = n, this.debouncedOpenSelected()) : t || (this.debouncedOpenSelected.cancel(), this.openSelected(), this.props.onFocusSearch())
        },
        render: function() {
          var e = this,
            t = {
              down: function(t) {
                return e.onNextChat(t)
              },
              up: function(t) {
                return e.onPrevChat(t)
              }
            };
          return s.createElement(b, {
            handlers: t,
            onFocus: this.onFocusGain,
            "data-tab": 3
          }, s.createElement(c, {
            classes: ["chatlist"],
            data: this.getList(),
            height: 72,
            animate: !0,
            extraItems: 4
          }))
        }
      });
    e.exports = S
  },
  893: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(1),
      o = n(10),
      s = n(13),
      a = n(82),
      c = n(952),
      l = n(944),
      d = n(352),
      u = n(932),
      p = n(933),
      h = n(937),
      m = n(936),
      f = n(954),
      g = n(15),
      v = n(357),
      y = n(803),
      E = n(805),
      _ = n(8),
      T = n(797),
      b = n(858),
      S = b.MenuBarItem,
      M = b.MenuBar,
      C = n(83),
      w = n(810),
      N = n(43),
      P = n(953),
      R = n(107),
      k = "global_mute",
      x = r.createClass({
        displayName: "ChatlistHeader",
        mixins: [T],
        getDefaultProps: function() {
          return {
            muteId: k
          }
        },
        getInitialState: function() {
          return Store.Mute.globalMute(), {
            isMuted: this.async("muteId.Mute.isMuted")
          }
        },
        onMouseDown: function() {},
        onDrag: function(e) {
          this.didDrag = !0
        },
        onClickCapture: function(e) {},
        onNewChat: function() {
          _.openDrawer(r.createElement(u, {
            type: a.DRAWER_LEFT
          }))
        },
        onProfile: function() {
          _.openDrawer(r.createElement(c, {
            type: a.DRAWER_LEFT,
            id: Store.Conn.me
          }))
        },
        onUnmute: function() {
          Store.Mute.globalMute().unmute(), _.openToast(r.createElement(w, {
            msg: l10n.t("global_unmuted"),
            id: w.genId()
          }))
        },
        render: function() {
          var e = null;
          this.state.isMuted && (e = r.createElement(S, {
            icon: "dnd",
            title: l10n.t("global_unmute"),
            onClick: this.onUnmute,
            key: "btn-dnd"
          }));
          var t = N("pane-list-user", {});
          return r.createElement("header", {
            className: "pane-header pane-list-header",
            onMouseDown: this.onMouseDown,
            onClickCapture: this.onClickCapture
          }, r.createElement("div", {
            className: t
          }, r.createElement(E, {
            id: Store.Conn.me,
            onClick: this.onProfile
          })), r.createElement("div", {
            className: "pane-list-controls"
          }, r.createElement(M, {
            key: "chatlist-header"
          }, r.createElement(R, {
            transitionName: "btn"
          }, e, r.createElement(S, {
            a8n: "menu-bar-chat",
            icon: "chat",
            title: l10n.t("web_menuitem_new"),
            onClick: this.onNewChat
          }), r.createElement(S, {
            a8n: "menu-bar-menu",
            icon: "menu",
            title: l10n.t("menutitle_menu")
          }, r.createElement(D, null))))))
        }
      });
    e.exports = x;
    var D = r.createClass({
      displayName: "ChatlistHeaderDropdown",
      getInitialState: function() {
        return {
          rememberMe: g.getRememberMe()
        }
      },
      onCreateGroup: function() {
        _.openDrawer(r.createElement(p, {
          type: a.DRAWER_LEFT
        }))
      },
      onProfile: function() {
        _.openDrawer(r.createElement(c, {
          type: a.DRAWER_LEFT,
          id: Store.Conn.me
        }))
      },
      onHelp: function() {
        o.upload("help-page-opened");
        var e, t, n = Store.Conn.PLATFORMS;
        switch (e = Store.Conn.platform || "unknown") {
          case n.ANDROID:
            t = l10n.t("guide_help_description_android");
            break;
          case n.BB:
            t = l10n.t("guide_help_description_bb");
            break;
          case n.BBX:
            t = l10n.t("guide_help_description_bbx");
            break;
          case n.WP7:
            t = l10n.t("guide_help_description_wp7");
            break;
          case n.SYMBIAN:
            t = l10n.t("guide_help_description_symbian");
            break;
          case n.S40:
            t = l10n.t("guide_help_description_s40");
            break;
          case n.IPHONE:
            t = l10n.t("guide_help_description_iphone");
            break;
          default:
            i.log("chatlistHeader:onHelp unknown platform: " + e)()
        }
        var s = function() {
          _.closeModal(), window.open("http://www.whatsapp.com/faq/web", "_blank")
        };
        _.openModal(r.createElement(d, {
          title: l10n.t("guide_help_title"),
          onOK: _.closeModal.bind(_),
          okText: l10n.t("ok_got_it"),
          onCancel: s,
          cancelText: l10n.t("web_settings_faq")
        }, l10n.t("guide_help_faq") + " " + t))
      },
      onUploadLogs: function() {
        _.openModal(r.createElement(P, null))
      },
      onDisconnect: function() {
        var e = Store.Msg.any(function(e) {
          return 0 === e.ack && e.local && e.isSentByMe
        });
        return e ? void _.openModal(r.createElement(d, {
          title: l10n.t("confirm_logout"),
          onOK: function() {
            return s.logout()
          },
          okText: l10n.t("menuitem_logout"),
          onCancel: function() {
            return _.closeModal()
          },
          cancelText: l10n.t("web_cancel")
        }, l10n.t("some_of_your_messages_are_still_sending"))) : s.logout()
      },
      onNotifications: function() {
        _.openModal(r.createElement(l, null))
      },
      onArchived: function() {
        _.openDrawer(r.createElement(m, {
          type: a.DRAWER_LEFT
        }))
      },
      onStarred: function() {
        Store.StarredMsg.sync(!1), _.openDrawer(r.createElement(f, {
          type: a.DRAWER_LEFT
        }))
      },
      onBlocked: function() {
        _.openDrawer(r.createElement(h, {
          type: a.DRAWER_LEFT
        }))
      },
      render: function() {
        var e = C.supportsFeature(C.F.GROUP_CREATE) ? r.createElement(y, {
            a8n: "mi-new-group menu-item",
            action: this.onCreateGroup,
            shortcut: "g"
          }, l10n.t("web_menuitem_groupchat")) : null,
          t = C.supportsFeature(C.F.STARRED) && C.supportsFeature(C.F.FULL_TEXT_SEARCH) ? r.createElement(y, {
            a8n: "mi-starred menu-item",
            action: this.onStarred
          }, l10n.t("menuitem_starred")) : null,
          n = C.supportsFeature(C.F.SET_BLOCK) ? r.createElement(y, {
            action: this.onBlocked
          }, l10n.t("menuitem_blocked")) : null;
        return r.createElement(v, {
          type: v.Type.DROPDOWN_MENU,
          flipOnRTL: !0,
          key: "ChatlistHeader",
          direction: {
            x: v.Direction.X.LEFT
          }
        }, e, r.createElement(y, {
          a8n: "mi-profile-status menu-item",
          action: this.onProfile
        }, l10n.t("menuitem_profile_status")), r.createElement(y, {
          a8n: "mi-notifications menu-item",
          action: this.onNotifications
        }, l10n.t("menuitem_notifications")), n, r.createElement(y, {
          a8n: "mi-archived menu-item",
          action: this.onArchived
        }, l10n.t("menuitem_archived")), t, r.createElement(y, {
          a8n: "mi-help menu-item",
          action: this.onHelp
        }, l10n.t("menuitem_help")), r.createElement(y, {
          a8n: "mi-logout menu-item",
          action: this.onDisconnect,
          shortcut: "q"
        }, l10n.t("menuitem_logout")))
      }
    })
  },
  894: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(806),
      o = n(159),
      s = o.HotKeys,
      a = n(808),
      c = r.createClass({
        displayName: "ParticipantList",
        propTypes: {
          contacts: r.PropTypes.array.isRequired,
          onDelete: r.PropTypes.func.isRequired,
          onFocusSearch: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return this.selection = new a(this.props.contacts, function(e) {
            return e.id
          }), null
        },
        componentWillReceiveProps: function(e) {
          this.selection.init(e.contacts, !0)
        },
        focusLast: function() {
          _.size(this.props.contacts) && this.selection.setLast()
        },
        focusPrev: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = this.selection.prev();
          t > -1 && this.selection.setPrev()
        },
        focusNext: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = this.selection.next();
          this.selection.index === t ? (this.selection.unset(), this.props.onFocusSearch(e)) : this.selection.setNext()
        },
        deleteContact: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = _.find(this.props.contacts, this.selection.getVal());
          this.props.onDelete(e, t)
        },
        onParticipantClick: function(e, t) {
          this.selection.setVal(t)
        },
        render: function() {
          var e = this.props.contacts;
          if (!e) return null;
          var t = _.size(this.props.contacts) ? _.map(this.props.contacts, function(e) {
              return r.createElement(i, {
                contact: e,
                active: this.selection,
                onDelete: this.props.onDelete,
                onClick: this.onParticipantClick,
                type: i.Type.SMALL,
                key: e.id
              })
            }, this) : null,
            n = {
              up: this.focusPrev,
              down: this.focusNext,
              backspace: this.deleteContact
            };
          n[l10n.LR("left", "right")] = this.focusPrev, n[l10n.LR("right", "left")] = this.focusNext;
          var o = r.createElement("ul", {
            ref: "list"
          }, t);
          return r.createElement(s, {
            handlers: n
          }, o)
        }
      });
    e.exports = c
  },
  895: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(105),
      s = n(84),
      a = n(893),
      c = n(820),
      l = n(892),
      d = n(809),
      u = n(883),
      p = n(82),
      h = n(8),
      m = n(83),
      f = n(708),
      g = n(159),
      v = g.HotKeys,
      y = r.createClass({
        displayName: "ChatlistPanel",
        mixins: [o, s, f],
        getInitialState: function() {
          return this.fts = _.debounce(function(e) {
            var t = e.state.searchText;
            t && Store.Msg.search(t).then(function(t) {
              e.state.searchText && e.setState({
                ftsResult: t
              })
            })
          }, 750), {
            searchText: "",
            ftsResult: []
          }
        },
        componentDidMount: function() {
          this.regCmd("focus_chat_search", this.onFocusSearch)
        },
        getFilteredContacts: function() {
          var e = this.state.searchText;
          if (!e) return [];
          e = l10n.accentFold(e);
          var t = Store.Contact.getFilteredContacts();
          return t.filter(function(t) {
            var n = t.searchMatch(e);
            if (!n) return !1;
            var r = Store.Chat.get(t.id);
            return !r || r.isNewlyCreated()
          })
        },
        getFilteredChats: function() {
          var e = this.state.searchText;
          return e ? (e = l10n.accentFold(e), Store.Chat.filter(function(t) {
            return t.contact.searchMatch(e) && !t.isNewlyCreated()
          })) : Store.Chat.filter(function(e) {
            return !e.archive && !e.isNewlyCreated()
          })
        },
        fullTextSearch: function() {
          this.state.searchText && m.supportsFeature(m.F.FULL_TEXT_SEARCH) && this.fts(this)
        },
        getEmptyChatlistState: function() {
          var e = this.getFilteredContacts().length,
            t = this.getFilteredChats().length,
            n = this.state.ftsResult.length,
            i = !(e || t || n);
          if (i) {
            if (this.state.searchText) return r.createElement(d.Search, null);
            var o = Store.Chat.filter(function(e) {
              return !e.isNewlyCreated()
            });
            return o.length ? r.createElement(d.AllArchived, null) : r.createElement(d.List, null)
          }
        },
        componentWillMount: function() {
          this.addObserver(Store.Chat, "sort remove change:archive")
        },
        componentWillUpdate: function(e, t) {
          this.state.searchText !== t.searchText && this.fullTextSearch()
        },
        onSearch: function(e) {
          var t = {
            searchText: e
          };
          this.state.searchText !== e && (t.ftsResult = []), this.setState(t)
        },
        onStopSearch: function() {
          this.setState({
            searchText: "",
            ftsResult: []
          }), this.fts.cancel()
        },
        onFocusList: function(e) {
          this.refs.chatlist && (e.preventDefault(), e.stopPropagation(), v.flashFocus = Date.now(), this.refs.chatlist.focusFirst())
        },
        onOpenFirst: function(e) {
          var t = this,
            n = _.first(this.getFilteredChats()) || _.first(this.getFilteredContacts());
          n && Store.Chat.find(n.id).then(function(e) {
            t.onStopSearch(), v.flashFocus = Date.now(), h.openChat(e), h.focusChatTextInput(e)
          })
        },
        onFocusSearch: function(e) {
          v.flashFocus = Date.now(), this.refs.search.focus()
        },
        indicateFocus: function(e) {
          if (!(Date.now() - (v.flashFocus || 0) > 200)) {
            var t = i.findDOMNode(this.refs.input_hotkey);
            Velocity(t, "stop"), Velocity(t, {
              backgroundColor: ["#fbfbfb", "#D9F3FF"]
            }, {
              duration: 1600,
              easing: [.19, .69, .01, .99]
            })
          }
        },
        render: function() {
          var e;
          (e = this.getEmptyChatlistState()) || (e = r.createElement(l, {
            isSearching: !!this.state.searchText,
            ref: "chatlist",
            chats: this.getFilteredChats(),
            onFocusSearch: this.onFocusSearch,
            ftsResult: this.state.ftsResult,
            onClick: this.onStopSearch,
            contacts: this.getFilteredContacts()
          }));
          var t = {
            down: this.onFocusList,
            enter: this.onOpenFirst
          };
          return r.createElement("div", {
            id: "side",
            className: "pane pane-list pane-one"
          }, r.createElement(a, {
            key: "ChatHeader"
          }), r.createElement(u, {
            key: "ButterBar"
          }), r.createElement(v, {
            handlers: t,
            onFocus: this.indicateFocus,
            ref: "input_hotkey",
            className: "search-container"
          }, r.createElement(c, {
            searchText: this.state.searchText,
            ref: "search",
            onSearch: this.onSearch,
            searchType: p.CHAT_SEARCH
          })), r.createElement("div", {
            ref: "panel",
            className: "pane-body pane-list-body",
            id: "pane-side",
            "data-list-scroll-container": !0
          }, e))
        }
      });
    e.exports = y
  },
  896: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(797),
      s = n(803),
      a = r.createClass({
        displayName: "ArchiveMenuItem",
        mixins: [o],
        propTypes: {
          chat: r.PropTypes.instanceOf(i).isRequired,
          onArchive: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            archive: this.async("chat.archive")
          }
        },
        render: function() {
          var e = this.props.onArchive.bind(null, !this.state.archive);
          return r.createElement(s, {
            a8n: "mi-archive",
            action: e,
            shortcut: "a",
            key: "ArchiveMenuItem"
          }, this.state.archive ? l10n.t("unarchive_chat") : l10n.t("archive_chat"))
        }
      });
    e.exports = a
  },
  897: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(709),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(106),
      l = n(166),
      d = s.createClass({
        displayName: "Draggable",
        mixins: [c],
        propTypes: {
          children: s.PropTypes.node.isRequired,
          start: s.PropTypes.shape({
            x: s.PropTypes.number,
            y: s.PropTypes.number
          }),
          scale: s.PropTypes.number,
          container: s.PropTypes.shape({
            width: s.PropTypes.number.isRequired,
            height: s.PropTypes.number.isRequired
          }),
          onStart: s.PropTypes.func,
          onDrag: s.PropTypes.func,
          onStop: s.PropTypes.func
        },
        getInitialState: function() {
          return {
            dragging: !1,
            x: 0,
            y: 0,
            offsetX: 0,
            offsetY: 0
          }
        },
        componentDidMount: function() {
          this.updateContainer()
        },
        componentWillReceiveProps: function(e) {
          e.scale !== this.props.scale || e.container.width !== this.props.container.width || e.container.height !== this.props.container.height ? this.updateContainer(e, !0) : this.updateContainer(e)
        },
        updateContainer: function(e, t) {
          e = e || this.props;
          var n = e.container;
          if (n && this.refs.draggable) {
            var r, i = a.findDOMNode(this.refs.draggable),
              o = this.state.x,
              s = this.state.y,
              c = i.width * e.scale,
              l = i.height * e.scale;
            this.props.scale !== e.scale && this.state.center ? (r = this.state.center, o = n.width / 2 - r.x * c, s = n.height / 2 - r.y * l) : r = {
              x: (n.width / 2 - o) / c,
              y: (n.height / 2 - s) / l
            }, o > 0 ? o = 0 : o + c < n.width && (o = n.width - c), s > 0 ? s = 0 : s + l < n.height && (s = n.height - l), this.setState({
              width: c,
              height: l,
              x: o,
              y: s,
              center: r
            }), this.props.onStop && t && e.onStop(o, s)
          }
        },
        handleMouseDown: function(e) {
          e.preventDefault(), this.setState({
            dragging: !0,
            offsetX: e.clientX - this.state.x,
            offsetY: e.clientY - this.state.y
          }), this.regNativeListener(window, "mousemove", this.handleMouseMove), this.regNativeListener(window, "mouseup", this.handleMouseUp), this.props.onStart && this.props.onStart()
        },
        handleMouseUp: function(e) {
          this.unregisterListeners(), this.setState({
            dragging: !1
          }), this.props.onStop && this.props.onStop(this.state.x, this.state.y)
        },
        handleMouseMove: function(e) {
          if (this.state.dragging) {
            var t = e.clientX - this.state.offsetX,
              n = e.clientY - this.state.offsetY,
              r = this.props.container;
            r && ((t > 0 || t + this.state.width < r.width) && (t = this.state.x), (n > 0 || n + this.state.height < r.height) && (n = this.state.y)), this.setState({
              x: t,
              y: n
            }), this.props.onDrag && this.props.onDrag(t, n)
          }
        },
        render: function() {
          var e = this.props.scale ? " scale(" + this.props.scale + ")" : "",
            t = (0, o["default"])({}, l.prefix("transform"), "translate(" + this.state.x + "px, " + this.state.y + "px)" + e);
          this.state.dragging || (t[l.prefix("transition")] = "transform 200ms");
          var n = "draggable";
          return this.state.dragging && (n += " dragging"), s.cloneElement(s.Children.only(this.props.children), {
            style: t,
            draggable: !0,
            ref: "draggable",
            className: n,
            onMouseDown: this.handleMouseDown
          })
        }
      });
    e.exports = d
  },
  898: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = r.createClass({
        displayName: "FloatingPlaceholder",
        propTypes: {
          children: r.PropTypes.node.isRequired,
          placeholder: r.PropTypes.string,
          hasText: r.PropTypes.bool
        },
        render: function() {
          var e = "placeholder";
          return this.props.hasText && (e += " placeholder-enter"), this.props.placeholder ? r.createElement("div", {
            className: "floating-placeholder"
          }, r.createElement("span", {
            className: e
          }, this.props.placeholder), this.props.children) : this.props.children
        }
      });
    e.exports = i
  },
  899: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(162),
      o = r(i),
      s = n(354),
      a = r(s),
      c = n(6),
      l = n(821),
      d = n(43),
      u = c.createClass({
        displayName: "ImageLoader",
        propTypes: {
          src: c.PropTypes.string.isRequired,
          onError: c.PropTypes.func
        },
        getInitialState: function() {
          return {
            loaded: !1
          }
        },
        componentWillMount: function() {
          var e = new Image;
          e.src = this.props.src, e.complete && this.onLoad()
        },
        onLoad: function(e) {
          this.state.isLoaded || this.setState({
            loaded: !0
          }), this.props.onLoad && this.props.onLoad(e)
        },
        render: function() {
          var e = this.props,
            t = e.className,
            n = (e.onLoad, (0, a["default"])(e, ["className", "onLoad"]));
          return t = d("avatar-image", t, {
            "is-loaded": this.state.loaded
          }), c.createElement(l, (0, o["default"])({
            hasPrivacyChecks: !0,
            onLoad: this.onLoad,
            className: t
          }, n))
        }
      });
    e.exports = u
  },
  900: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(354),
      o = r(i),
      s = n(6),
      a = s.createClass({
        displayName: "IsolatedBlock",
        propTypes: {
          Component: s.PropTypes.string.isRequired
        },
        getDefaultProps: function() {
          return {
            Component: "span"
          }
        },
        render: function() {
          var e = this.props,
            t = e.Component,
            n = (e.children, (0, o["default"])(e, ["Component", "children"]));
          return s.createElement(t, n, "​⁠​", this.props.children, "​⁠​")
        }
      });
    e.exports = a
  },
  901: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(797),
      s = n(803),
      a = r.createClass({
        displayName: "MarkUnreadMenuItem",
        mixins: [o],
        propTypes: {
          chat: r.PropTypes.instanceOf(i).isRequired,
          onMarkUnread: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            unreadCount: this.async("chat.unreadCount")
          }
        },
        render: function() {
          var e = this.props.onMarkUnread.bind(null, !this.state.unreadCount);
          return r.createElement(s, {
            action: e,
            shortcut: "r",
            key: "MarkUnreadMenuItem"
          }, this.state.unreadCount ? l10n.t("mark_read_chat") : l10n.t("mark_unread_chat"))
        }
      });
    e.exports = a
  },
  902: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(82),
      c = n(21),
      l = n(8),
      d = n(803),
      u = n(938),
      p = n(824),
      h = s.createClass({
        displayName: "TakePhotoMenuItem",
        propTypes: {
          onImageTake: s.PropTypes.func.isRequired
        },
        onCapture: function() {
          a.pop(a.MENU);
          var e = this,
            t = new o["default"](function(n, r) {
              navigator.getUserMedia({
                video: !0
              }, function(r) {
                l.closeModal(), n(r), t.isResolved() && l.openModal(s.createElement(u, {
                  stream: r,
                  onSend: e.props.onImageTake
                }))
              }, function(e) {
                var n = _.isString(e) ? e : e.name,
                  i = c.GUM[n] || c.GUM.GUMError;
                r(new i), t && t.isResolved() && l.closeModal()
              })
            }).bind(this).timeout(1500, "waitForGUMTakePhotoTimeout").then(function(e) {
              l.openModal(s.createElement(u, {
                stream: e,
                onSend: this.props.onImageTake
              }))
            })["catch"](o["default"].TimeoutError, function(e) {
              l.openModal(s.createElement(p, {
                title: "guide_desktop_camera_title",
                desc: "guide_desktop_camera_description",
                type: p.TYPE.GUIDE_ALLOW
              }))
            })["catch"](c.GUM.PermissionDeniedError, function() {
              l.openModal(s.createElement(p, {
                title: "guide_desktop_camera_title",
                desc: "guide_desktop_camera_fail_description",
                type: p.TYPE.GUIDE_UNBLOCK
              }))
            })["catch"](c.GUM.GUMError, function() {
              l.openModal(s.createElement(p, {
                title: "guide_desktop_camera_missing_title",
                desc: "guide_desktop_camera_missing_description",
                type: p.TYPE.GUIDE_NONE
              }))
            })
        },
        render: function() {
          return s.createElement(d, {
            action: this.onCapture
          }, l10n.t("take_photo"))
        }
      });
    e.exports = h
  },
  903: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(106),
      s = n(708),
      a = r.createClass({
        displayName: "Video",
        mixins: [o, s],
        propTypes: {
          src: r.PropTypes.string.isRequired,
          onPlay: r.PropTypes.func
        },
        componentDidMount: function() {
          var e = i.findDOMNode(this),
            t = this;
          this.regNativeListener(e, "playing", function(n) {
            e.videoHeight && e.videoWidth || (e.pause(), e.play()), e.videoHeight && e.videoWidth && t.props.onPlay(n)
          })
        },
        render: function() {
          return r.createElement("video", this.props)
        }
      });
    e.exports = a
  },
  904: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(13),
      s = n(84),
      a = n(106),
      c = n(158),
      l = n(8),
      d = n(44),
      u = n(61),
      p = n(1),
      h = n(796),
      m = r.createClass({
        displayName: "VideoTag",
        mixins: [s, a, c],
        propTypes: {
          msg: r.PropTypes.instanceOf(h).isRequired,
          poster: r.PropTypes.string,
          className: r.PropTypes.string,
          controls: r.PropTypes.bool,
          width: r.PropTypes.number,
          height: r.PropTypes.number,
          onClick: r.PropTypes.func,
          onPlay: r.PropTypes.func,
          onError: r.PropTypes.func,
          autoPlay: r.PropTypes.bool
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.msg;
          if (u.isEncryptedMedia(t.url)) t.decryptMedia().then(function(n) {
            t.urlState200(n), e.isMounted() && e.setState({
              src: n
            })
          }, function(e) {
            return t.mediaLoadError(t.url)
          })["catch"](function(e) {
            return p.error("Video decryption error: " + e + ".")()
          });
          else {
            var n = u.isBlob(t.url) ? t.url : t.url + "?x=2";
            this.setState({
              src: n
            })
          }
        },
        componentDidMount: function() {
          var e = i.findDOMNode(this);
          this.regNativeListener(e, "playing", this.onPlaying), this.regCmd("mediaPlaying", this.onOtherPlaying), this.regNativeListener(e, "error", this.onPlayerError, !0), (d.isGecko || d.isSafari) && (this.props.autoPlay ? this.startCheckForSuccess() : this.regNativeListener(e, "play", this.startCheckForSuccess))
        },
        startCheckForSuccess: function() {
          this.checkIteration = 0, this.checkForSuccessInterval = this.safeInterval(this.checkForSuccess, 250)
        },
        clearCheckForSuccess: function() {
          this.checkForSuccessInterval && (this.clearSafeInterval(this.checkForSuccessInterval), delete this.checkForSuccessInterval, delete this.checkIteration)
        },
        checkForSuccess: function() {
          if (o.state === o.STATE.CONNECTED) {
            if (this.checkIteration++, this.checkIteration > 240) return void this.onPlayerError({
              target: {
                src: this.props.src,
                error: {
                  code: window.MediaError.MEDIA_ERR_NETWORK
                }
              }
            });
            var e = i.findDOMNode(this),
              t = e.buffered;
            t && t.length && t.end(0) > 0 && this.onPlaying({
              target: e
            })
          }
        },
        onPlayerError: function(e) {
          this.clearCheckForSuccess();
          var t = e.target.error || {
              code: "__MISSING__"
            },
            n = e.target.src;
          switch (t.code) {
            case self.MediaError.MEDIA_ERR_NETWORK:
            case self.MediaError.MEDIA_ERR_DECODE:
            case self.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              this.props.msg.mediaLoadError(n);
              break;
            default:
              p.log("mediaVideoModal:onPlayerError unknown error", t.code, n)()
          }
          this.props.msg.mediaLoadError(e.target.src), this.props.onError && this.props.onError(e)
        },
        onOtherPlaying: function(e) {
          e !== this && i.findDOMNode(this).pause()
        },
        onPlaying: function(e) {
          this.clearCheckForSuccess(), l.mediaPlaying(this), this.props.onPlay && this.props.onPlay(e)
        },
        render: function() {
          var e = {
            height: this.props.height,
            width: this.props.width
          };
          return r.createElement("video", {
            src: this.state.src,
            poster: this.props.poster,
            style: e,
            width: this.props.width,
            height: this.props.height,
            className: this.props.className,
            onClick: this.props.onClick,
            controls: this.props.controls,
            autoPlay: this.props.autoPlay
          }, this.props.children)
        }
      });
    e.exports = m
  },
  905: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(84),
      s = n(106),
      a = n(105),
      c = n(927),
      l = n(934),
      d = n(21),
      u = n(7),
      p = n(63),
      h = n(8),
      m = void 0,
      f = r.createClass({
        displayName: "Conversation",
        mixins: [o, s, a],
        getInitialState: function() {
          return {
            chat: void 0,
            msgCollection: void 0,
            ftsMsg: void 0
          }
        },
        componentWillMount: function() {
          this.regCmd("open_chat", this.handleOpenChat), this.regCmd("clear_chat", this.handleClearChat), this.regNativeListener(window, "focus", this.windowGainedFocus), this.regNativeListener(window, "blur", this.windowLostFocus)
        },
        componentDidMount: function() {
          this.regNativeListener(window, "resize", this.windowResized), this.windowResized()
        },
        windowResized: _.debounce(function() {
          m = i.findDOMNode(this).clientHeight
        }, 100),
        componentDidUpdate: function(e, t) {
          var n = this.state.chat,
            r = t.chat;
          n && r !== n && (this.addObserver(n, "change:cmc:merge", this.msgCollectionChanged), r && this.removeObserver(r, "change:cmc:merge"))
        },
        msgCollectionChanged: function(e, t, n) {
          var r = this.state.msgCollection;
          r !== e && r !== t || this.setState({
            msgCollection: n
          })
        },
        windowGainedFocus: function() {
          p.markAvailable();
          var e = this.state.conversation;
          e && e.isUser && e.presence.subscribe()["catch"](d.WapDrop, _.noop)
        },
        windowLostFocus: function() {
          p.markUnavailable(u.SEND_UNAVAILABLE_WAIT)
        },
        handleClearChat: function(e) {
          this.state.chat === e && this.setState({
            chat: void 0,
            msgCollection: void 0,
            ftsMsg: void 0
          })
        },
        handleOpenChat: function(e, t, n, r) {
          if (n && this.state.chat === e && h.focusChatTextInput(e), r || this.state.chat !== e || t && this.state.msgCollection !== t.collection || !t && this.state.msgCollection !== this.state.chat.msgs || t && this.state.ftsMsg !== t.msg) {
            h.setUiBusy(!0);
            var i = function() {
              n && h.focusChatTextInput(e), h.setUiBusy(!1)
            };
            this.setState({
              chat: e,
              msgCollection: t ? t.collection : e.msgs,
              ftsMsg: t ? t.msg : void 0
            }, i)
          }
        },
        render: function() {
          var e = this.state.chat;
          return e ? r.createElement(c, {
            key: e.id,
            chat: e,
            msgCollection: this.state.msgCollection,
            height: m,
            ftsMsg: this.state.ftsMsg
          }) : r.createElement(l, null)
        }
      });
    e.exports = f
  },
  906: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(7),
      l = n(797),
      d = n(106),
      u = n(82),
      p = n(863),
      h = n(799),
      m = n(857),
      f = n(861),
      g = n(805),
      v = n(798),
      y = n(818),
      E = n(931),
      T = n(872),
      b = n(874),
      S = n(870),
      M = n(8),
      C = n(824),
      w = n(352),
      N = n(21),
      P = n(858),
      R = P.MenuBar,
      k = P.MenuBarItem,
      x = n(357),
      u = n(82),
      D = n(860),
      A = s.createClass({
        displayName: "ConversationHeader",
        mixins: [l, d],
        propTypes: {
          chat: s.PropTypes.instanceOf(h).isRequired,
          onSelectMessages: s.PropTypes.func.isRequired
        },
        statics: {
          ATTACH_MEDIA_ACTIVE: "attach_media_active",
          GROUP_CHAT_ACTIVE: "group_chat_active"
        },
        getInitialState: function() {
          return {
            img: this.async("chat.ProfilePicThumb.img"),
            formattedTitle: this.async("chat.formattedTitle"),
            activeDropdown: void 0
          }
        },
        onMouseDown: function(e) {},
        onDrag: function(e) {
          this.didDrag = !0
        },
        onClickCapture: function(e) {},
        onClick: function() {
          if (u.find(u.DRAWER_RIGHT)) return void M.closeDrawer();
          var e = this.props.chat;
          e.isUser ? M.openDrawer(s.createElement(T, {
            contact: e.contact,
            type: u.DRAWER_RIGHT
          }), "slide-left") : e.isBroadcast ? M.openDrawer(s.createElement(S, {
            chat: e,
            type: u.DRAWER_RIGHT
          }), "slide-left") : e.isGroup && M.openDrawer(s.createElement(b, {
            chat: e,
            type: u.DRAWER_RIGHT
          }), "slide-left")
        },
        render: function() {
          var e, t, n = this.props.chat;
          return n.isUser ? (e = s.createElement(F, {
            chat: n,
            onSelectMessages: this.props.onSelectMessages
          }), t = s.createElement(f, {
            presence: n.presence,
            placeholder: l10n.t("click_here_for_user_info"),
            location: "title"
          })) : n.isBroadcast ? (e = s.createElement(U, {
            chat: n,
            onSelectMessages: this.props.onSelectMessages
          }), t = null) : n.isGroup && (e = s.createElement(L, {
            chat: n,
            onSelectMessages: this.props.onSelectMessages
          }), t = s.createElement(m, {
            presence: n.presence,
            groupMetadata: n.groupMetadata,
            placeholder: l10n.t("click_here_for_group_info"),
            location: "title"
          })), s.createElement("header", {
            className: "pane-header pane-chat-header",
            onClickCapture: this.onClickCapture,
            onMouseDown: this.onMouseDown
          }, s.createElement("div", {
            className: "chat-avatar",
            onClick: this.onClick
          }, s.createElement(g, {
            id: n.id
          })), s.createElement("div", {
            className: "chat-body",
            onClick: this.onClick
          }, s.createElement("div", {
            className: "chat-main"
          }, s.createElement("h2", {
            className: "chat-title",
            dir: "auto"
          }, s.createElement(v, {
            text: this.state.formattedTitle,
            titlify: !0,
            ellipsify: !0
          }))), t), s.createElement("div", {
            className: "pane-chat-controls"
          }, s.createElement(R, {
            key: "conversation-header"
          }, s.createElement(k, {
            a8n: "conversation-clip",
            icon: "clip",
            title: l10n.t("menutitle_attach"),
            transitionName: "menu"
          }, s.createElement(I, {
            chat: n
          })), s.createElement(k, {
            a8n: "conversation-menu",
            icon: "menu",
            title: l10n.t("menutitle_menu")
          }, e))))
        }
      }),
      I = s.createClass({
        displayName: "AttachMenuDropdown",
        mixins: [d],
        propTypes: {
          chat: s.PropTypes.instanceOf(h).isRequired
        },
        getInitialState: function() {
          return {
            canSendDocument: void 0
          }
        },
        componentDidMount: function(e) {},
        componentWillUnmount: function() {
          this.needsEncryptionPromise && this.needsEncryptionPromise.cancel()
        },
        onDocumentPick: function(e) {
          var t = this;
          e.stopPropagation();
          var n = _.toArray(e.target.files);
          e.target.value = "";
          var r = this.state.canSendDocument;
          return _.isBoolean(r) ? r ? (u.pop(u.MENU), void this.openAttachMediaFlow(n)) : this.cantSendDocument() : this.needsEncryptionPromise.then(function() {
            u.pop(u.MENU), t.openAttachMediaFlow(n)
          })["catch"](function() {
            return t.cantSendDocument()
          })
        },
        onFilePick: function(e) {
          e.stopPropagation();
          var t = _.toArray(e.target.files);
          e.target.value = "", u.pop(u.MENU), this.openAttachMediaFlow(t)
        },
        openAttachMediaFlow: function(e) {
          M.openDrawer(s.createElement(y, {
            files: e,
            chat: this.props.chat,
            type: u.DRAWER_MID
          }), "slide-up")
        },
        onImageClick: function(e) {
          e.stopPropagation(), a.findDOMNode(this.refs.imagePicker).click()
        },
        onDocumentClick: function(e) {
          e.stopPropagation();
          var t = this.state.canSendDocument;
          return _.isBoolean(t) && !t ? this.cantSendDocument() : void a.findDOMNode(this.refs.documentPicker).click()
        },
        cantSendDocument: function() {
          var e = this.props.chat,
            t = e.isUser ? l10n.t("cannot_send_document_to_contact_unsupported", {
              contact: e.formattedTitle
            }) : l10n.t("cannot_send_document_to_group_unsupported", {
              group: e.formattedTitle
            });
          M.openModal(s.createElement(w, {
            onOK: M.closeModal.bind(M)
          }, s.createElement(v, {
            text: t
          })))
        },
        onCaptureClick: function() {
          u.pop(u.MENU);
          var e = this.props.chat,
            t = new o["default"](function(n, r) {
              navigator.getUserMedia({
                video: !0
              }, function(r) {
                M.closeModal(), n(r), t.isResolved() && M.openDrawer(s.createElement(E, {
                  chat: e,
                  stream: r,
                  type: u.DRAWER_MID
                }), "slide-up")
              }, function(e) {
                var n = _.isString(e) ? e : e.name,
                  i = N.GUM[n] || N.GUM.GUMError;
                r(new i), t && t.isResolved() && M.closeModal()
              })
            }).bind(this).timeout(1e3, "waitForGUMConversationHeaderTimeout").then(function(t) {
              M.openDrawer(s.createElement(E, {
                chat: e,
                stream: t,
                type: u.DRAWER_MID
              }), "slide-up")
            })["catch"](o["default"].TimeoutError, function() {
              M.openModal(s.createElement(C, {
                title: "guide_desktop_camera_title",
                desc: "guide_desktop_camera_description",
                type: C.TYPE.GUIDE_ALLOW
              }))
            })["catch"](N.GUM.PermissionDeniedError, function() {
              M.openModal(s.createElement(C, {
                title: "guide_desktop_camera_title",
                desc: "guide_desktop_camera_fail_description",
                type: C.TYPE.GUIDE_UNBLOCK
              }))
            })["catch"](N.GUM.GUMError, function() {
              M.openModal(s.createElement(C, {
                title: "guide_desktop_camera_missing_title",
                desc: "guide_desktop_camera_missing_description",
                type: C.TYPE.GUIDE_NONE
              }))
            })
        },
        render: function() {
          var e, t = navigator.getUserMedia ? s.createElement(D, {
              style: {
                "float": "right"
              },
              trigger: !0,
              tooltip: l10n.t("attach_capture"),
              direction: "left"
            }, s.createElement("button", {
              className: "menu-icons-item",
              onClick: this.onCaptureClick
            }, s.createElement("div", {
              className: "icon-xl icon-camera"
            }))) : null,
            n = s.createElement(D, {
              style: {
                "float": "right"
              },
              trigger: !0,
              tooltip: l10n.t("attach_media"),
              direction: "left"
            }, s.createElement("button", {
              className: "menu-icons-item",
              onClick: this.onImageClick
            }, s.createElement("div", {
              className: "icon-xl icon-image"
            })));
          return s.createElement(x, {
            type: x.Type.MENU,
            key: "AttachMenuDropdown"
          }, e, n, t, e ? s.createElement(O, {
            ref: "documentPicker",
            mime: c.DOC_MIMES,
            onPick: this.onDocumentPick
          }) : null, s.createElement(O, {
            ref: "imagePicker",
            mime: [c.IMAGE_MIMES, c.VIDEO_MIMES].join(","),
            onPick: this.onFilePick
          }))
        }
      }),
      O = s.createClass({
        displayName: "FilePicker",
        propTypes: {
          mime: s.PropTypes.string.isRequired,
          onPick: s.PropTypes.func.isRequired
        },
        stopPropagation: function(e) {
          e.stopPropagation()
        },
        render: function() {
          return s.createElement("input", {
            accept: this.props.mime,
            type: "file",
            multiple: !0,
            style: {
              display: "none"
            },
            onChange: this.props.onPick,
            onClick: this.stopPropagation
          })
        }
      }),
      L = s.createClass({
        displayName: "GroupMenuDropdown",
        mixins: [l],
        propTypes: {
          chat: s.PropTypes.instanceOf(h).isRequired,
          onSelectMessages: s.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            isReadOnly: this.async("chat.isReadOnly")
          }
        },
        render: function() {
          var e = p.group(this.props.chat, this.props.onSelectMessages);
          return s.createElement(x, {
            type: x.Type.DROPDOWN_MENU,
            key: "GroupMenuDropdown",
            flipOnRTL: !0,
            direction: {
              x: x.Direction.X.LEFT
            }
          }, e)
        }
      }),
      U = s.createClass({
        displayName: "BroadcastMenuDropdown",
        propTypes: {
          chat: s.PropTypes.instanceOf(h).isRequired,
          onSelectMessages: s.PropTypes.func.isRequired
        },
        render: function() {
          var e = p.broadcast(this.props.chat, this.props.onSelectMessages);
          return s.createElement(x, {
            type: x.Type.DROPDOWN_MENU,
            key: "BroadcastMenuDropdown",
            flipOnRTL: !0,
            direction: {
              x: x.Direction.X.LEFT
            }
          }, e)
        }
      }),
      F = s.createClass({
        displayName: "ContactMenuDropdown",
        propTypes: {
          chat: s.PropTypes.instanceOf(h).isRequired,
          onSelectMessages: s.PropTypes.func.isRequired
        },
        render: function() {
          var e = p.contact(this.props.chat, this.props.onSelectMessages);
          return s.createElement(x, {
            type: x.Type.DROPDOWN_MENU,
            key: "ContactMenuDropdown",
            flipOnRTL: !0,
            direction: {
              x: x.Direction.X.LEFT
            }
          }, e)
        }
      });
    e.exports = A
  },
  907: function(e, t, n) {
    "use strict";

    function r(e) {
      for (var t = arguments.length <= 1 || void 0 === arguments[1] ? window.innerHeight : arguments[1], n = 0, r = e.length, i = 1; r > i; ++i) {
        var o = e[r - i];
        switch (o.type) {
          case "notification":
          case "group_notification":
          case "gp2":
          case "broadcast_notification":
            n += 40;
            break;
          case "chat":
            n += 30 + 20 * Math.ceil((o.body || "").length / 50);
            break;
          case "image":
          case "video":
          case "audio":
            n += 200;
            break;
          case "location":
          case "ptt":
          case "vcard":
          case "document":
            n += 100
        }
        if (n > t) break
      }
      return i
    }
    var i = n(6),
      o = n(28),
      s = n(7),
      a = n(797),
      c = n(105),
      l = n(84),
      d = n(158),
      u = n(924),
      p = n(908),
      h = n(8),
      m = n(799),
      f = n(827),
      g = n(796),
      v = n(106),
      y = n(44),
      E = n(830),
      T = n(829),
      b = n(82),
      S = n(818),
      M = n(43),
      C = n(863),
      w = n(926),
      N = n(83),
      P = 50,
      R = i.createClass({
        displayName: "ConversationMsgs",
        mixins: [a, l, c, v, d],
        propTypes: {
          chat: i.PropTypes.instanceOf(m).isRequired,
          msgCollection: i.PropTypes.instanceOf(f).isRequired,
          selectable: i.PropTypes.bool,
          onMessageSelect: i.PropTypes.func.isRequired,
          onSelectMessages: i.PropTypes.func.isRequired,
          height: i.PropTypes.number,
          ftsMsg: i.PropTypes.instanceOf(g)
        },
        getInitialState: function() {
          return {
            cursor: r(this.props.msgCollection.models, this.props.height),
            unreadCount: this.props.chat.unreadCount
          }
        },
        componentDidMount: function() {
          var e = this.props.chat,
            t = this.props.msgCollection;
          if (this.regCmd("open_chat", this.onOpenChat), this.regCmd("compose_height_change", this.composeHeightChange), this.attachMsgCollectionObservers(), this.regNativeListener(window, "focus", this.windowGainedFocus), this.regNativeListener(window, "blur", this.windowLostFocus), this.addObserver(e, "change:trusted"), this.addObserver(t.msgLoadState, "change:isLoadingAroundMsgs"), e.isGroup ? this.addObserver(e.groupMetadata.participants, "change:contact.name change:contact.isMyContact") : e.isUser && this.addObserver(e.contact, "change:isMyContact"), !this.props.ftsMsg && !t.msgLoadState.noEarlierMsgs) {
            var n = o.findDOMNode(this);
            0 === n.scrollTop && this.loadEarlierMsgs()
          }
        },
        attachMsgCollectionObservers: function(e) {
          var t = this.props.chat,
            n = this.props.msgCollection;
          e && (this.removeObserver(t, "change:unreadCount"), this.removeObserver(n, "change:last"), this.removeObserver(n, "bulk_add remove"), this.removeObserver(n.msgLoadState, "change:isLoadingAroundMsgs"), t = e.chat, n = e.msgCollection), n === t.msgs && (this.addObserver(t, "change:unreadCount", this.onUnreadCount), this.addObserver(n, "change:last", this.onLastMsgChanged)), this.addObserver(n, "bulk_add remove"), this.addObserver(n.msgLoadState, "change:isLoadingAroundMsgs")
        },
        isMostRecentCMC: function() {
          return this.props.chat.msgs === this.props.msgCollection
        },
        componentWillReceiveProps: function(e) {
          this.attachMsgCollectionObservers(e)
        },
        componentWillUnmount: function() {
          this.isMostRecentCMC() && (this.props.chat.isDirty() && this.props.chat.sendSeen(), this.props.chat.markedUnread = !1)
        },
        scrollTo: function(e) {
          e(o.findDOMNode(this))
        },
        loadEarlierMsgs: function() {
          var e = this.props.chat,
            t = this.props.msgCollection;
          if (t.length <= this.state.cursor || this.props.ftsMsg) {
            var n = this;
            e.loadEarlierMsgs(t).then(function() {
              n.isMounted() && n.setState({
                cursor: t.length
              })
            })
          } else {
            var r = Math.min(this.state.cursor + P, t.length);
            this.setState({
              cursor: r
            })
          }
        },
        loadRecentMsgs: function() {
          var e = this.props.chat,
            t = this.props.msgCollection;
          e.loadRecentMsgs(t)
        },
        composeHeightChange: function(e) {
          var t = o.findDOMNode(this);
          if (e) {
            if (0 > e && t.scrollTop === t.scrollHeight - t.clientHeight) return;
            t.scrollTop = t.scrollTop + e
          } else {
            var n = t.scrollHeight - (t.scrollTop + t.clientHeight);
            Velocity(t, {
              tween: 18
            }, {
              progress: function() {
                t.scrollTop = t.scrollHeight - n - t.clientHeight
              },
              duration: 300
            }, [.1, .82, .25, 1])
          }
        },
        nearBottom: function(e) {
          return e = e || o.findDOMNode(this), e.scrollTop + s.SCROLL_FUDGE > e.scrollHeight - e.clientHeight
        },
        getMsgs: function() {
          var e = this.props.msgCollection;
          if (this.props.ftsMsg) return e.toArray();
          var t = e.length,
            n = Math.max(0, t - this.state.cursor);
          return e.toArray().slice(n, t)
        },
        onScroll: function(e) {
          this.handleScroll(e.target, this.props.chat, this.nearBottom, this)
        },
        handleScroll: _.throttle(function(e, t, n, r) {
          0 === e.scrollTop && this.loadEarlierMsgs(), n(e) && (t.isDirty() && document.hasFocus() && r.isMostRecentCMC() && t.sendSeen(), r.isMostRecentCMC() || this.loadRecentMsgs())
        }, 100),
        windowGainedFocus: function() {
          var e = this.props.chat;
          !this.clearUnreadTimer && e.isDirty() && (this.clearUnreadTimer = this.safeDelay(function() {
            delete this.clearUnreadTimer;
            var t = o.findDOMNode(this);
            this.nearBottom(t) && e.isDirty() && this.isMostRecentCMC() && e.sendSeen()
          }, s.CLEAR_CHAT_DIRTY_WAIT))
        },
        windowLostFocus: function() {
          if (this.state.unreadCount && this.isMostRecentCMC()) {
            var e = this.props.chat;
            0 === e.unreadCount && this.setState({
              unreadCount: 0
            }), e.markedUnread = !1
          }
        },
        onOpenChat: function(e) {
          e.id === this.props.chat.id && this.isMostRecentCMC() && !this.props.ftsMsg && this.scrollToBottom()
        },
        scrollToBottom: function() {
          var e = o.findDOMNode(this);
          e.scrollTop = e.scrollHeight
        },
        onLastMsgChanged: function() {
          var e = this.props.chat,
            t = this.props.msgCollection,
            n = t.last();
          (document.hasFocus() || n && n.isSentByMe) && (this.state.unreadCount && this.setState({
            unreadCount: 0
          }), (n && n.isSentByMe || this.nearBottom()) && this.scrollToBottom()), n && n.isSentByMe && e.isDirty() && this.isMostRecentCMC() && e.sendSeen();
          var r = t.length;
          r !== this.state.cursor && this.setState({
            cursor: r
          })
        },
        onUnreadCount: function() {
          var e = this.props.chat,
            t = document.hasFocus();
          return !t && e.unreadCount && e.unreadCount !== this.state.unreadCount ? void this.setState({
            unreadCount: e.unreadCount
          }) : void(t && e.isDirty() && this.nearBottom() && this.isMostRecentCMC() && e.sendSeen())
        },
        onPageUpDown: function(e) {
          o.findDOMNode(this).focus()
        },
        onKeyPress: function(e) {
          e.metaKey || e.ctrlKey || ("Enter" !== e.key || e.shiftKey ? y.isGecko ? h.pasteChatTextInput(this.props.chat, String.fromCharCode(e.charCode)) : h.focusChatTextInput(this.props.chat) : h.enterChatTextInput(this.props.chat))
        },
        onContextMenu: function(e) {
          var t, n = this.props.chat,
            r = this.props.onSelectMessages;
          if (n.isUser) t = C.contact(n, r);
          else if (n.isGroup) t = C.group(n, r);
          else {
            if (!n.isBroadcast) return;
            t = C.broadcast(n, r)
          }
          e.preventDefault(), e.stopPropagation(), h.openContextMenu(t, {
            event: e,
            parent: this
          })
        },
        onPaste: function(e) {
          e.preventDefault();
          var t = e.clipboardData.items,
            n = _.filter(t, function(e) {
              var t = E.typeFromMimetype(e.type);
              return "file" === e.kind && ("image" === t || "video" === t)
            }).map(function(e) {
              return e.getAsFile()
            });
          return n.length ? void(t.length === n.length && h.openDrawer(i.createElement(S, {
            files: n,
            chat: this.props.chat,
            type: b.DRAWER_MID
          }), "slide-up")) : void h.pasteChatTextInput(this.props.chat, e.clipboardData.getData("text/plain"))
        },
        scrollToMsg: function(e) {
          var t = this.props.msgCollection.loadAroundPromise;
          t ? t.then(function() {
            T.scrollIntoViewIfNeeded(e)
          }) : T.scrollIntoViewIfNeeded(e)
        },
        spam: function() {
          if (!N.supportsFeature(N.F.SPAM)) return null;
          var e = this.props.chat;
          return e.isNewlyCreated() ? null : e.isTrusted() ? null : i.createElement(w, {
            chat: this.props.chat
          })
        },
        render: function() {
          var e = this.props.chat,
            t = this.props.msgCollection,
            n = M("pane-chat-msgs pane-chat-body lastTabIndex", {
              selectable: this.props.selectable
            }),
            r = null,
            o = this.isMostRecentCMC(),
            s = i.createElement(p, {
              direction: "around",
              isMostRecentCMC: o,
              loadMoreMsgs: _.noop,
              msgCollection: t
            }),
            a = i.createElement(p, {
              direction: "earlier",
              isMostRecentCMC: o,
              loadMoreMsgs: this.loadEarlierMsgs,
              msgCollection: t
            }),
            c = i.createElement(u, {
              key: "ml-" + e.id,
              scrollTo: this.scrollTo,
              chatId: e.id,
              unreadCount: this.isMostRecentCMC() ? this.state.unreadCount : 0,
              selectable: this.props.selectable,
              onMessageSelect: this.props.onMessageSelect,
              msgs: this.getMsgs(),
              focusedMsg: this.props.ftsMsg,
              didRenderFocusedMsg: this.scrollToMsg
            }),
            l = i.createElement(p, {
              direction: "recent",
              isMostRecentCMC: o,
              loadMoreMsgs: this.loadRecentMsgs,
              msgCollection: t
            });
          return o ? (s = void 0, l = void 0) : t.msgLoadState.isLoadingAroundMsgs ? (a = void 0, c = void 0, l = void 0) : s = void 0, i.createElement("div", {
            className: n,
            onScroll: this.onScroll,
            onKeyPress: this.onKeyPress,
            onContextMenu: this.onContextMenu,
            onPaste: this.onPaste,
            tabIndex: "0"
          }, i.createElement("div", {
            className: "pane-chat-empty"
          }), s, a, c, l, r)
        }
      });
    e.exports = R
  },
  908: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(160),
      o = n(105),
      s = n(827),
      a = r.createClass({
        displayName: "LoadMoreMessages",
        mixins: [o],
        propTypes: {
          direction: r.PropTypes.oneOf(["recent", "earlier", "around"]).isRequired,
          isMostRecentCMC: r.PropTypes.bool.isRequired,
          loadMoreMsgs: r.PropTypes.func.isRequired,
          msgCollection: r.PropTypes.instanceOf(s).isRequired
        },
        getInitialState: function() {
          return this.props.msgCollection.msgLoadState.toJSON()
        },
        componentWillMount: function() {
          this.attachObservers()
        },
        componentWillReceiveProps: function(e) {
          this.attachObservers(e)
        },
        attachObservers: function(e) {
          var t = this,
            n = this.props.msgCollection.msgLoadState;
          e && (this.removeObserver(n, "change"), n = e.msgCollection.msgLoadState), this.addObserver(n, "change", function() {
            t.setState(n.toJSON())
          })
        },
        loadMoreMsgs: function(e) {
          "earlier" === this.props.direction && this.state.isLoadingEarlierMsgs || "recent" === this.props.direction && this.state.isLoadingRecentMsgs || "around" === this.props.direction && this.state.isLoadingAroundMsgs || this.props.loadMoreMsgs()
        },
        render: function() {
          if ("earlier" === this.props.direction && this.state.noEarlierMsgs || "recent" === this.props.direction && this.props.isMostRecentCMC || "around" === this.props.direction && !this.state.isLoadingAroundMsgs) return null;
          if ("earlier" === this.props.direction && this.state.isLoadingEarlierMsgs || "recent" === this.props.direction && this.state.isLoadingRecentMsgs || "around" === this.props.direction && this.state.isLoadingAroundMsgs) return r.createElement("div", {
            className: "more"
          }, r.createElement("div", {
            className: "btn-more",
            title: l10n.t("loading_messages")
          }, r.createElement(i, {
            stroke: 6,
            size: 24
          })));
          var e;
          return e = "earlier" === this.props.direction ? l10n.t("load_earlier_messages") : "recent" === this.props.direction ? l10n.t("load_recent_messages") : l10n.t("loading_messages"), r.createElement("div", {
            className: "more"
          }, r.createElement("div", {
            className: "btn-more",
            title: e,
            onClick: this.loadMoreMsgs
          }, r.createElement("span", {
            className: "icon icon-refresh"
          })))
        }
      });
    e.exports = a
  },
  909: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(1),
      c = n(796),
      l = n(797),
      d = n(106),
      u = n(822),
      p = n(864),
      h = n(812),
      m = n(811),
      f = n(8),
      g = n(868),
      v = n(352),
      y = n(826),
      u = n(822),
      E = n(21),
      T = n(83),
      b = n(157),
      S = s.createClass({
        displayName: "AudioVideo",
        mixins: [l, d],
        propTypes: {
          msg: s.PropTypes.instanceOf(c).isRequired,
          displayAuthor: s.PropTypes.bool
        },
        getInitialState: function() {
          return this.retry = 0, {
            urlState: this.async("msg.urlState"),
            url: this.async("msg.url"),
            uploadState: this.async("msg.uploadState")
          }
        },
        showMediaMissing: function() {
          var e, t, n = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
          switch (this.props.msg.type) {
            case c.TYPE.VIDEO:
              e = l10n.t("missing_video_title"), t = n ? l10n.t("missing_video_forward_text") : l10n.t("missing_video_text");
              break;
            case c.TYPE.AUDIO:
              e = l10n.t("missing_audio_title"), t = n ? l10n.t("missing_audio_forward_text") : l10n.t("missing_audio_text")
          }
          f.openModal(s.createElement(v, {
            title: e,
            onOK: f.closeModal.bind(f),
            okText: l10n.t("web_ok")
          }, t))
        },
        cancelMediaReupload: function() {
          this.preloadImagePromise && this.preloadImagePromise.cancel(), this.props.msg.urlState = c.URL_STATE.NO_URL
        },
        remoteMediaReupload: function() {
          T.supportsFeature(T.F.MEDIA_RETRY) ? this.props.msg.resend()["catch"](_.noop) : f.openModal(s.createElement(y, {
            msg: this.props.msg
          }))
        },
        requestMediaReupload: function() {
          var e = this,
            t = this.props.msg;
          t.requestMediaReupload().then(function() {
            e.isMounted() && t.urlState === c.URL_STATE.URL && e.launchMediaViewer()
          })["catch"](_.noop)
        },
        launchMediaViewer: function(e) {
          f.openModalMedia(s.createElement(g, {
            startId: this.props.msg.id.toString()
          }), "media-viewer")
        },
        cancelMmsUpload: function() {
          var e = this.props.msg;
          e.uploadPromise && e.uploadPromise.cancel()
        },
        retryMmsUpload: function() {
          var e = this,
            t = this.props.msg.reuploadMedia();
          t && t["catch"](o["default"].CancellationError, _.noop)["catch"](E.MediaMissing, function() {
            return e.showMediaMissing(!0)
          })["catch"](E.GaveUpRetry, _.noop)
        },
        render: function() {
          var e = this,
            t = this.props.msg,
            n = t.caption && t.type !== c.TYPE.VIDEO || t.type === c.TYPE.AUDIO ? null : s.createElement("div", {
              className: "shade"
            }),
            r = t.caption ? s.createElement(p, {
              msg: t
            }) : null,
            i = "bubble-image bubble-video";
          t.caption && (i += " bubble-image-caption");
          var o = _.noop,
            l = null;
          if (t.ack < 0) switch (t.urlState) {
            case c.URL_STATE.UPLOADING:
              l = s.createElement(u.Pending, null);
              break;
            default:
              l = s.createElement(u.Upload, {
                filesize: t.size
              }), o = this.remoteMediaReupload
          } else switch (t.urlState) {
            case c.URL_STATE.INIT:
            case c.URL_STATE.REFRESHING:
              l = s.createElement(u.Pending, null);
              break;
            case c.URL_STATE.NO_URL:
            case c.URL_STATE.RMR_ERROR_RETRY:
            case c.URL_STATE.STATUS_ERR:
              l = s.createElement(u.Download, {
                filesize: t.size
              }), o = this.requestMediaReupload;
              break;
            case c.URL_STATE.REFRESH_RETRY:
              l = s.createElement(u.Download, {
                filesize: t.size
              }), o = t.initializeMedia.bind(t);
              break;
            case c.URL_STATE.RMR_FETCHING:
              l = s.createElement(u.PendingCancel, null), o = this.cancelMediaReupload;
              break;
            case c.URL_STATE.RMR_ERROR_MISSING:
              o = function() {
                return e.showMediaMissing(!1)
              };
              break;
            case c.URL_STATE.URL:
            case c.URL_STATE.STATUS_200:
            case c.URL_STATE.UPLOADING:
              switch (t.uploadState) {
                case c.UPLOAD_STATE.UPLOADING:
                  l = s.createElement(u.PendingCancel, null), o = this.cancelMmsUpload;
                  break;
                case c.UPLOAD_STATE.RETRY:
                  l = s.createElement(u.Upload, {
                    filesize: t.size
                  }), o = this.retryMmsUpload;
                  break;
                case c.UPLOAD_STATE.PHONE_UPLOADING:
                  l = s.createElement(u.Pending, null);
                  break;
                default:
                  l = s.createElement(u.Play, null), o = this.launchMediaViewer
              }
              break;
            default:
              a.log("audioVideo:render Unknown media state")()
          }
          var d = b.durationStr(t.duration) || null;
          d && (d = s.createElement("span", {
            className: "message-duration"
          }, t.type === c.TYPE.VIDEO ? s.createElement("span", {
            className: "icon-s icon-msg-video-light"
          }) : s.createElement("span", {
            className: "icon-s icon-msg-audio-light"
          }), d));
          var f;
          if (t.type === c.TYPE.VIDEO) {
            var g = "data:image/jpeg;base64," + t.body,
              v = {
                backgroundImage: 'url("' + g + '")'
              };
            f = s.createElement("div", {
              className: "image-thumb-body",
              style: v
            })
          } else t.type === c.TYPE.AUDIO && (f = s.createElement("div", {
            className: "image-audio"
          }));
          var y = this.props.displayAuthor && m.shouldRender(t) ? s.createElement(m, {
            msg: t
          }) : null;
          return s.createElement("div", null, s.createElement("div", {
            className: i
          }, y, s.createElement("div", {
            className: "image-thumb",
            onClick: o
          }, l, f, n, d), r, s.createElement(h, {
            msg: this.props.msg
          })))
        }
      });
    e.exports = S
  },
  910: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(798),
      s = n(708),
      a = n(84),
      c = n(157),
      l = r.createClass({
        displayName: "DateMarker",
        mixins: [a, s],
        propTypes: {
          timestamp: r.PropTypes.number.isRequired
        },
        componentDidMount: function() {
          this.maybeRegMidnight()
        },
        componentDidUpdate: function() {
          this.maybeRegMidnight()
        },
        rerender: function() {
          this.forceUpdate()
        },
        maybeRegMidnight: function() {
          this.unregCmd("midnight", this.rerender);
          var e = moment().startOf("day").subtract(7, "day");
          this.props.timestamp >= e.unix() && this.regCmd("midnight", this.rerender)
        },
        render: function() {
          var e = c.relativeDateStr(this.props.timestamp).toUpperCase();
          return r.createElement("span", {
            className: "message-system-body"
          }, r.createElement(i, null, r.createElement(o, {
            direction: "auto",
            text: e
          })))
        }
      });
    e.exports = l
  },
  911: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(811),
      o = n(812),
      s = n(796),
      a = n(798),
      c = n(43),
      l = n(708),
      d = {
        "application/pdf": {
          ext: "PDF",
          icon: "icon-doc-pdf"
        },
        "text/plain": {
          ext: "TXT",
          icon: "icon-doc-txt"
        },
        "text/rtf": {
          ext: "RTF",
          icon: "icon-doc-doc"
        },
        "application/msword": {
          ext: "DOC",
          icon: "icon-doc-doc"
        },
        "application/vnd.ms-excel": {
          ext: "XLS",
          icon: "icon-doc-xls"
        },
        "application/vnd.ms-powerpoint": {
          ext: "PPT",
          icon: "icon-doc-ppt"
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
          ext: "DOCX",
          icon: "icon-doc-doc"
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
          ext: "PPTX",
          icon: "icon-doc-ppt"
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
          ext: "XLSX",
          icon: "icon-doc-xls"
        }
      },
      u = r.createClass({
        displayName: "Doc",
        mixins: [l],
        propTypes: {
          msg: r.PropTypes.instanceOf(s).isRequired,
          senderName: r.PropTypes.string,
          displayAuthor: r.PropTypes.bool,
          trusted: r.PropTypes.bool
        },
        render: function() {
          var e, t = this.props,
            n = t.msg,
            s = t.displayAuthor,
            l = c("bubble", "bubble-doc", {
              "bubble-broadcast": n.broadcast,
              "bubble-star": n.star
            }),
            u = s && i.shouldRender(n) ? r.createElement(i, {
              msg: n
            }) : null;
          n.pageCount > 0 && (e = r.createElement("span", {
            className: "document-meta-value"
          }, l10n.t("web_conversations_most_recent_document", {
            count: n.pageCount,
            _plural: n.pageCount
          })));
          var p, h = n.size > 0 ? r.createElement("span", {
              className: "document-meta-value"
            }, l10n.filesize(n.size)) : null,
            m = "icon-doc";
          _.has(d, n.mimetype) && (p = r.createElement("span", {
            className: "document-meta-value"
          }, d[n.mimetype].ext), m = c(m, d[n.mimetype].icon));
          var f = n.body ? r.createElement("div", {
              className: "document-thumb",
              style: {
                backgroundImage: "url(data:image/jpeg;base64," + n.body + ")"
              }
            }) : null,
            g = n.caption || n.filename || l10n.t("untitled_document");
          return r.createElement("div", {
            className: l
          }, u, r.createElement("a", {
            className: "document-container"
          }, f, r.createElement("div", {
            className: "document-body"
          }, r.createElement("div", {
            className: "document-icon"
          }, r.createElement("div", {
            className: m
          })), r.createElement("div", {
            className: "document-text"
          }, r.createElement(a, {
            text: g,
            ellipsify: !0,
            selectable: !1,
            dirMismatch: n.rtl !== l10n.isRTL(),
            direction: "auto"
          })))), r.createElement("div", {
            className: "document-meta"
          }, e, p, h), r.createElement(o, {
            msg: n
          }))
        }
      });
    e.exports = u
  },
  912: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(61),
      s = n(708),
      a = n(43),
      c = r.createClass({
        displayName: "LinkPreview",
        mixins: [s],
        propTypes: {
          msg: r.PropTypes.instanceOf(i).isRequired
        },
        render: function() {
          var e = this.props.msg,
            t = e.thumbnail ? r.createElement("img", {
              className: "link-preview-media",
              src: "data:image/jpeg;base64," + e.thumbnail
            }) : null,
            n = e.title ? r.createElement("div", {
              className: "link-preview-title",
              title: e.title
            }, e.title) : null,
            i = e.description ? r.createElement("div", {
              className: "link-preview-description",
              title: e.description
            }, e.description) : null,
            s = a("link-preview-body", {
              nothumb: !t
            }),
            c = o.hostname(e.canonicalUrl || e.matchedText),
            l = window.open.bind(window, e.matchedText, "", "");
          return r.createElement("div", {
            className: "link-preview-container",
            onClick: l
          }, t, r.createElement("div", {
            className: s
          }, n, i, r.createElement("div", {
            className: "link-preview-source ellipsify"
          }, c)))
        }
      });
    e.exports = c
  },
  913: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(837),
      s = n(797),
      a = n(796),
      c = n(812),
      l = n(811),
      d = n(61),
      u = r.createClass({
        displayName: "Location",
        mixins: [s],
        propTypes: {
          msg: r.PropTypes.instanceOf(a).isRequired,
          displayAuthor: r.PropTypes.bool
        },
        getInitialState: function() {
          return {
            url: this.async("msg.body")
          }
        },
        googleMapUrl: function() {
          var e = this.props.msg,
            t = this.loc();
          return t && t.name ? ["https://maps.google.com/maps/search", encodeURIComponent(t.name), "@" + e.lat + "," + e.lng + ",17z"].join("/") : d.build("https://maps.google.com/maps", {
            q: e.lat + "," + e.lng,
            z: 17
          })
        },
        mapUrl: function() {
          return this.props.msg.clientUrl || this.googleMapUrl()
        },
        loc: function p() {
          var p = this.props.msg.get("loc");
          return p ? (p = p.split("\n"), 2 === p.length ? {
            name: p[0],
            addr: p[1]
          } : {
            name: p
          }) : void 0
        },
        render: function() {
          var e, t, n = this.props.msg,
            s = r.createElement("a", {
              href: this.googleMapUrl(),
              className: "preview-location",
              target: "_blank"
            }, r.createElement(o, {
              thumb: n.body,
              type: n.type,
              shade: !1
            })),
            a = n.isSentByMe ? "text no-author" : "text",
            d = this.loc();
          d ? (e = r.createElement("a", {
            href: this.mapUrl(),
            title: d.name,
            target: "_blank",
            className: "text-title"
          }, r.createElement(i, null, d.name)), t = d.addr ? r.createElement("div", {
            title: d.addr,
            className: "text-contents"
          }, r.createElement(i, null, d.addr)) : null) : e = r.createElement("a", {
            href: this.mapUrl(),
            title: l10n.t("web_view"),
            target: "_blank",
            className: "text-title"
          }, r.createElement(i, null, l10n.t("web_view")));
          var u = this.props.displayAuthor && l.shouldRender(n) ? r.createElement(l, {
            msg: n
          }) : null;
          return r.createElement("div", {
            className: "bubble bubble-attach bubble-location"
          }, u, r.createElement("div", {
            className: "wrapper"
          }, s, r.createElement("div", {
            className: "contents"
          }, r.createElement("div", {
            className: a
          }, e, t), r.createElement(c, {
            msg: n
          }))))
        }
      });
    e.exports = u
  },
  914: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(43),
      s = {
        FRONT: "front",
        MID: "mid",
        END: "end",
        SINGLE: "single"
      },
      a = r.createClass({
        displayName: "Menu",
        propTypes: {
          msg: r.PropTypes.instanceOf(i).isRequired,
          position: r.PropTypes.oneOf(_.values(s)).isRequired,
          onClick: r.PropTypes.func,
          isFocusedMsg: r.PropTypes.bool
        },
        render: function() {
          var e = this.props,
            t = e.msg,
            n = e.position,
            a = e.onClick,
            c = t.isMedia,
            l = t.isSentByMe,
            d = t.isGroupMsg,
            u = t.type,
            p = l ? "context-out" : "context-in",
            h = t.type === i.TYPE.DOCUMENT && !t.body,
            m = t.type === i.TYPE.DOCUMENT && t.body;
          c = c || m;
          var f;
          d && (f = !l && (n === s.FRONT || n === s.SINGLE), c = c && !f);
          var g = u === i.TYPE.CHAT && t.body.indexOf(t.matchedText) > -1 && !f && t.isTrusted(),
            v = o("js-context-icon", c ? "context-icon-media" : "context-icon"),
            y = o(p, {
              context: !(c || g),
              "focused-msg": this.props.isFocusedMsg,
              "context-media": c,
              "context-media-document": m,
              "context-location": u === i.TYPE.LOCATION && !f,
              "context-ptt": u === i.TYPE.PTT,
              "context-ptt-author": u === i.TYPE.PTT && f,
              "context-special": g || h
            });
          return r.createElement("div", {
            className: y
          }, r.createElement("div", {
            className: v,
            onClick: a
          }))
        }
      });
    e.exports = a
  },
  915: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(807),
      o = n(798),
      s = n(708),
      a = r.createClass({
        displayName: "Notification",
        mixins: [s],
        propTypes: {
          text: r.PropTypes.string.isRequired
        },
        render: function() {
          return r.createElement("span", {
            className: "message-system-body"
          }, r.createElement(i, null, r.createElement(o, {
            direction: "auto",
            text: this.props.text
          })))
        }
      });
    e.exports = a
  },
  916: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(1),
      c = n(797),
      l = n(811),
      d = n(864),
      u = n(43),
      p = n(8),
      h = n(352),
      m = n(826),
      f = n(21),
      g = n(61),
      v = n(822),
      y = n(868),
      E = n(825),
      T = n(812),
      b = n(796),
      S = n(106),
      M = n(83),
      C = n(7),
      w = s.createClass({
        displayName: "Picture",
        mixins: [c, S],
        propTypes: {
          msg: s.PropTypes.instanceOf(b).isRequired,
          isMsgInfo: s.PropTypes.bool,
          displayAuthor: s.PropTypes.bool
        },
        defaultWidth: 330,
        canLoad: function() {
          var e = this.props.msg;
          return e.url && _.contains([b.URL_STATE.URL, b.URL_STATE.STATUS_200], e.urlState)
        },
        getInitialState: function() {
          this.retry = 0;
          var e = this.props.msg;
          if (this.canLoad() && !g.isEncryptedMedia(e.url)) {
            var t = new Image;
            t.src = e.url, t.complete ? this.onPreloadLoad(t) : this.preloadImage(e.url)
          } else g.isEncryptedMedia(e.clientUrl) && this.preloadImage(e.clientUrl);
          return {
            urlState: this.async("msg.urlState"),
            url: this.async("msg.url"),
            mediaKey: this.async("msg.mediaKey"),
            uploadState: this.async("msg.uploadState")
          }
        },
        componentDidMount: function() {
          this.regNativeListener(window, "online", this.ensureImageLoaded)
        },
        componentWillUpdate: function(e, t) {
          t.url === this.state.url && t.mediaKey === this.state.mediaKey || !this.canLoad() || !t.url || g.isEncryptedMedia(t.url) && !t.mediaKey || this.preloadImage(t.url)
        },
        ensureImageLoaded: function() {
          var e = this.props.msg;
          e.url && e.urlState !== b.URL_STATE.STATUS_200 && this.preloadImage(e.url)
        },
        isImageLoaded: function(e) {
          if (!e) return !1;
          var t = new Image;
          return t.src = e, t.complete
        },
        preloadImage: function(e, t) {
          if (e) {
            this.preloadImagePromise && this.preloadImagePromise.cancel();
            var n = g.isEncryptedMedia(e) ? this.props.msg.decryptMedia()["catch"](f.MediaLoadError, function(e) {
                throw new f.ImageError("mediaLoadError", e.src)
              }) : o["default"].resolve(e),
              r = this.preloadImagePromise = n.then(function(t) {
                return new o["default"](function(n, r) {
                  var i = function(t) {
                      r(new f.ImageError("Image preload error", e))
                    },
                    o = new Image;
                  o.onload = function() {
                    n(o)
                  }, o.onerror = i, o.src = t
                })
              }).bind(this).cancellable().then(this.onPreloadLoad)["finally"](function() {
                r === this.preloadImagePromise && delete this.preloadImagePromise
              })["catch"](o["default"].CancellationError, _.noop)["catch"](f.ImageError, t ? this.onImgErrorRMR : this.onPreloadError)
          }
        },
        onPreloadLoad: function(e) {
          var t = this.props.msg;
          t.set({
            fullWidth: e.naturalWidth,
            fullHeight: e.naturalHeight
          }), t.urlState200(e.src)
        },
        onPreloadError: function(e) {
          var t = this.props.msg;
          e.src !== t.url && e.src !== t.clientUrl || (this.props.msg.urlState = b.URL_STATE.STATUS_ERR)
        },
        onImgErrorRMR: function(e) {
          this.props.msg.mediaLoadError(e.src)
        },
        getImgStyle: function() {
          var e = this.getHeight(),
            t = this.aspect(this.defaultWidth, e);
          return this.isPortrait(t) ? {
            width: this.defaultWidth
          } : {
            height: "100%"
          }
        },
        getStyle: function() {
          return {
            width: this.defaultWidth + "px",
            height: this.getHeight()
          }
        },
        getHeight: function() {
          var e, t, n = this.props.msg;
          n.urlState === b.URL_STATE.STATUS_200 ? (e = n.fullWidth || n.width, t = n.fullHeight || n.height) : (e = n.width || 1, t = n.height || 1);
          var r, i = this.defaultWidth,
            o = this.aspect(e, t),
            s = this.isPortrait(o);
          return s ? r = i : o && (o > 2.4 ? r = i / 2.4 : e && t && (r = t * (i / e))), Math.round(r)
        },
        isPortrait: function(e) {
          return e ? 1 >= e : null
        },
        aspect: function(e, t) {
          return e && t ? e / t : void 0
        },
        showMediaMissing: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0],
            t = e ? l10n.t("missing_photo_forward_text") : l10n.t("missing_photo_text");
          p.openModal(s.createElement(h, {
            title: l10n.t("missing_photo_title"),
            onOK: p.closeModal.bind(p),
            okText: l10n.t("web_ok")
          }, t))
        },
        cancelMediaReupload: function() {
          this.preloadImagePromise && this.preloadImagePromise.cancel(), this.props.msg.urlState = b.URL_STATE.NO_URL
        },
        remoteMediaReupload: function() {
          M.supportsFeature(M.F.MEDIA_RETRY) ? this.props.msg.resend()["catch"](_.noop) : p.openModal(s.createElement(m, {
            msg: this.props.msg
          }))
        },
        requestMediaReupload: function() {
          var e = this.props.msg;
          e.url ? this.preloadImage(e.url, !0) : e.requestMediaReupload()["catch"](_.noop)
        },
        cancelMmsUpload: function() {
          var e = this.props.msg;
          e.uploadPromise && e.uploadPromise.cancel()
        },
        retryMmsUpload: function() {
          var e = this,
            t = this.props.msg.reuploadMedia();
          t && t["catch"](o["default"].CancellationError, _.noop)["catch"](f.MediaMissing, function() {
            return e.showMediaMissing(!0)
          })["catch"](f.GaveUpRetry, _.noop)
        },
        launchMediaViewer: function(e) {
          var t = this;
          if (this.props.isMsgInfo) {
            var n = function(e) {
              t.isMounted() && e(t.refs.img)
            };
            p.openModalMedia(s.createElement(E, {
              contact: this.props.msg.senderObj,
              imgFull: this.props.msg.url,
              getZoomNode: n
            }), "media-viewer")
          } else p.openModalMedia(s.createElement(y, {
            startId: this.props.msg.id.toString()
          }), "media-viewer")
        },
        onDragStart: function(e) {
          e.nativeEvent.dataTransfer.setData(C.DRAG_TYPE_LOCAL_IMAGE, !0)
        },
        render: function() {
          var e = this,
            t = this.props.msg,
            n = t.caption ? null : s.createElement("div", {
              className: "shade"
            }),
            r = t.caption ? s.createElement(d, {
              msg: t
            }) : null,
            i = _.noop,
            o = null,
            c = "data:image/jpeg;base64," + t.body;
          if (t.ack < 0) switch (t.urlState) {
            case b.URL_STATE.UPLOADING:
              o = s.createElement(v.Pending, null);
              break;
            default:
              o = s.createElement(v.Upload, {
                filesize: t.size
              }), i = this.remoteMediaReupload
          } else switch (t.urlState) {
            case b.URL_STATE.INIT:
            case b.URL_STATE.REFRESHING:
              o = s.createElement(v.Pending, null);
              break;
            case b.URL_STATE.NO_URL:
            case b.URL_STATE.RMR_ERROR_RETRY:
            case b.URL_STATE.STATUS_ERR:
              switch (t.uploadState) {
                case b.UPLOAD_STATE.UPLOADING:
                  t.url && !g.isEncryptedMedia(t.url) && (c = t.url), o = s.createElement(v.PendingCancel, null), i = this.cancelMmsUpload;
                  break;
                case b.UPLOAD_STATE.RETRY:
                  t.url && !g.isEncryptedMedia(t.url) && (c = t.url), o = s.createElement(v.Upload, {
                    filesize: t.size
                  }), i = this.retryMmsUpload;
                  break;
                case b.UPLOAD_STATE.PHONE_UPLOADING:
                  o = s.createElement(v.Pending, null);
                  break;
                default:
                  o = s.createElement(v.Download, {
                    filesize: t.size
                  }), i = this.requestMediaReupload
              }
              break;
            case b.URL_STATE.REFRESH_RETRY:
              o = s.createElement(v.Download, {
                filesize: t.size
              }), i = t.initializeMedia.bind(t);
              break;
            case b.URL_STATE.URL:
            case b.URL_STATE.RMR_FETCHING:
              o = s.createElement(v.PendingCancel, null), i = this.cancelMediaReupload;
              break;
            case b.URL_STATE.RMR_ERROR_MISSING:
              i = function() {
                return e.showMediaMissing(!1)
              };
              break;
            case b.URL_STATE.STATUS_200:
              c = t.url;
            case b.URL_STATE.UPLOADING:
              switch (t.uploadState) {
                case b.UPLOAD_STATE.UPLOADING:
                  t.url && !g.isEncryptedMedia(t.url) && (c = t.url), o = s.createElement(v.PendingCancel, null), i = this.cancelMmsUpload;
                  break;
                case b.UPLOAD_STATE.RETRY:
                  t.url && !g.isEncryptedMedia(t.url) && (c = t.url), o = s.createElement(v.Upload, {
                    filesize: t.size
                  }), i = this.retryMmsUpload;
                  break;
                case b.UPLOAD_STATE.PHONE_UPLOADING:
                  o = s.createElement(v.Pending, null);
                  break;
                default:
                  i = this.launchMediaViewer
              }
              break;
            default:
              a.log("picture:render Unknown image state")()
          }
          var p = u("bubble-image", {
              "bubble-image-caption": t.caption,
              "bubble-broadcast": t.caption && t.broadcast,
              "bubble-star": t.caption && t.star
            }),
            h = u("image-thumb-body", {
              "image-thumb-lores": c !== t.url
            }),
            m = this.props.displayAuthor && l.shouldRender(t) ? s.createElement(l, {
              msg: t
            }) : null;
          return s.createElement("div", {
            className: p
          }, m, s.createElement("div", {
            className: "image-thumb",
            onClick: i,
            style: this.getStyle()
          }, o, s.createElement("img", {
            src: c,
            onDragStart: this.onDragStart,
            className: h,
            style: this.getImgStyle(),
            ref: "img"
          }), n), r, s.createElement(T, {
            msg: this.props.msg
          }))
        }
      });
    e.exports = w
  },
  917: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(7),
      c = n(1),
      l = n(796),
      d = n(797),
      u = n(812),
      p = n(811),
      h = n(21),
      m = n(837),
      f = n(918),
      g = n(919),
      v = n(826),
      y = n(8),
      E = n(83),
      T = n(352),
      b = s.createClass({
        displayName: "PTT",
        mixins: [d],
        propTypes: {
          msg: s.PropTypes.instanceOf(l).isRequired,
          displayAuthor: s.PropTypes.bool
        },
        getInitialState: function() {
          return {
            uploadState: this.async("msg.uploadState"),
            urlState: this.async("msg.urlState"),
            url: this.async("msg.url"),
            img: this.async("msg.sender.ProfilePicThumb.img"),
            ack: this.async("msg.ack"),
            currentTime: 0,
            playing: !1,
            autoPlay: !1
          }
        },
        getStatusClass: function(e) {
          return e += " audio-state-default", this.state.ack === a.ACK_PLAYED && (e += " audio-state-played"), e
        },
        cancelMmsUpload: function() {
          var e = this.props.msg;
          e.uploadPromise && e.uploadPromise.cancel()
        },
        retryMmsUpload: function() {
          var e = this.props.msg.reuploadMedia();
          e && e["catch"](o["default"].CancellationError, _.noop)["catch"](h.MediaMissing, this.showMediaMissing)["catch"](h.GaveUpRetry, _.noop)
        },
        showMediaMissing: function() {
          var e = l10n.t("missing_audio_title"),
            t = l10n.t("missing_audio_forward_text");
          y.openModal(s.createElement(T, {
            title: e,
            onOK: y.closeModal.bind(y),
            okText: l10n.t("web_ok")
          }, t))
        },
        cancelMediaReupload: function() {
          this.props.msg.urlState = l.URL_STATE.NO_URL
        },
        remoteMediaReupload: function() {
          E.supportsFeature(E.F.MEDIA_RETRY) ? this.props.msg.resend()["catch"](_.noop) : y.openModal(s.createElement(v, {
            msg: this.props.msg
          }))
        },
        requestMediaReupload: function() {
          this.props.msg.requestMediaReupload().bind(this).then(function() {
            this.isMounted() && this.setState({
              autoPlay: !0
            })
          })["catch"](_.noop)
        },
        handleTimeUpdate: function(e) {
          this.setState({
            currentTime: e
          })
        },
        handlePlayingUpdate: function(e) {
          this.setState({
            autoPlay: !1,
            playing: e
          })
        },
        render: function() {
          var e = this.props.msg,
            t = this.getStatusClass("bubble bubble-attach bubble-audio"),
            n = "audio-status icon ";
          n += this.state.ack === a.ACK_PLAYED ? e.isSentByMe ? "icon-ptt-out-blue" : "icon-ptt-in-blue" : e.isSentByMe ? "icon-ptt-out-gray" : "icon-ptt-in-green";
          var r, i = s.createElement("span", {
              className: n,
              key: "status"
            }),
            o = this.state.playing ? this.state.currentTime : e.duration,
            d = s.createElement(m, {
              key: "image",
              thumb: this.state.img,
              type: e.type,
              shade: !1,
              duration: o
            }),
            h = e.isSentByMe ? [d, i] : null,
            v = e.isSentByMe ? null : [d, i],
            y = e.isSentByMe ? "text no-author" : "text";
          if (e.ack < 0) r = s.createElement(f, {
            action: this.remoteMediaReupload,
            msg: e
          });
          else switch (e.urlState) {
            case l.URL_STATE.INIT:
            case l.URL_STATE.REFRESHING:
              r = s.createElement(f, {
                msg: e
              });
              break;
            case l.URL_STATE.NO_URL:
            case l.URL_STATE.REFRESH_RETRY:
            case l.URL_STATE.RMR_ERROR_RETRY:
            case l.URL_STATE.STATUS_ERR:
              r = s.createElement(f, {
                action: this.requestMediaReupload,
                msg: e
              });
              break;
            case l.URL_STATE.RMR_FETCHING:
              r = s.createElement(f, {
                action: this.cancelMediaReupload,
                msg: e
              });
              break;
            case l.URL_STATE.STATUS_200:
            case l.URL_STATE.UPLOADING:
              switch (e.uploadState) {
                case l.UPLOAD_STATE.UPLOADING:
                  r = s.createElement(f, {
                    action: this.cancelMmsUpload,
                    msg: e
                  });
                  break;
                case l.UPLOAD_STATE.RETRY:
                  r = s.createElement(f, {
                    action: this.retryMmsUpload,
                    msg: e
                  });
                  break;
                case l.UPLOAD_STATE.PHONE_UPLOADING:
                  r = s.createElement(f, {
                    msg: e
                  });
                  break;
                default:
                  r = s.createElement(g, {
                    msg: e,
                    autoPlay: this.state.autoPlay,
                    onPlayingUpdate: this.handlePlayingUpdate,
                    onTimeUpdate: this.handleTimeUpdate
                  })
              }
              break;
            case l.URL_STATE.URL:
            case l.URL_STATE.RMR_ERROR_MISSING:
              r = s.createElement(g, {
                msg: e,
                autoPlay: this.state.autoPlay,
                onPlayingUpdate: this.handlePlayingUpdate,
                onTimeUpdate: this.handleTimeUpdate
              });
              break;
            default:
              c.log("ptt:render Unknown PTT state")()
          }
          var E = this.props.displayAuthor && p.shouldRender(e) ? s.createElement(p, {
            msg: e
          }) : null;
          return s.createElement("div", {
            className: t
          }, s.createElement("div", {
            className: "wrapper"
          }, h, s.createElement("div", {
            className: "contents"
          }, E, s.createElement("div", {
            className: y
          }, r)), v, s.createElement(u, {
            msg: e
          })))
        }
      });
    e.exports = b
  },
  918: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(1),
      o = n(796),
      s = n(160),
      a = r.createClass({
        displayName: "PTTLoader",
        propTypes: {
          action: r.PropTypes.func,
          msg: r.PropTypes.instanceOf(o).isRequired
        },
        render: function() {
          var e = null,
            t = this.props.msg;
          switch (t.uploadState) {
            case o.UPLOAD_STATE.UPLOADING:
              e = r.createElement("button", {
                className: "btn-audio icon icon-audio-cancel-noborder",
                onClick: this.props.action
              }, r.createElement(s, {
                stroke: 3,
                size: 38
              }));
              break;
            case o.UPLOAD_STATE.RETRY:
              e = r.createElement("button", {
                className: "btn-audio icon icon-audio-upload",
                onClick: this.props.action
              });
              break;
            default:
              if (t.ack < 0) switch (t.urlState) {
                case o.URL_STATE.UPLOADING:
                  e = r.createElement("button", {
                    className: "btn-audio",
                    onClick: this.props.action
                  }, r.createElement(s, {
                    stroke: 3,
                    size: 38
                  }));
                  break;
                default:
                  e = r.createElement("button", {
                    className: "btn-audio icon icon-audio-upload",
                    onClick: this.props.action
                  })
              } else switch (t.urlState) {
                case o.URL_STATE.INIT:
                case o.URL_STATE.REFRESHING:
                  e = r.createElement("button", {
                    className: "btn-audio",
                    onClick: this.props.action
                  }, r.createElement(s, {
                    stroke: 3,
                    size: 38
                  }));
                  break;
                case o.URL_STATE.NO_URL:
                case o.URL_STATE.REFRESH_RETRY:
                case o.URL_STATE.RMR_ERROR_RETRY:
                case o.URL_STATE.STATUS_ERR:
                  e = r.createElement("button", {
                    className: "btn-audio icon icon-audio-download",
                    onClick: this.props.action
                  });
                  break;
                case o.URL_STATE.RMR_FETCHING:
                  e = r.createElement("button", {
                    className: "btn-audio icon icon-audio-cancel-noborder",
                    onClick: this.props.action
                  }, r.createElement(s, {
                    stroke: 3,
                    size: 38
                  }));
                  break;
                default:
                  i.log("pttLoader:render Unknown PTT state")()
              }
          }
          return r.createElement("div", {
            className: "audio"
          }, r.createElement("div", {
            className: "audio-controls"
          }, e), r.createElement("div", {
            className: "audio-body"
          }, r.createElement("input", {
            type: "range",
            className: "audio-track",
            min: 0,
            max: 100,
            value: 0,
            disabled: "disabled"
          })))
        }
      });
    e.exports = a
  },
  919: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(7),
      s = n(796),
      a = n(8),
      c = n(352),
      l = n(106),
      d = n(855),
      u = r.createClass({
        displayName: "PTTPlayer",
        mixins: [l],
        propTypes: {
          msg: r.PropTypes.instanceOf(s).isRequired,
          autoPlay: r.PropTypes.bool.isRequired,
          onPlayingUpdate: r.PropTypes.func.isRequired,
          onTimeUpdate: r.PropTypes.func.isRequired
        },
        playing: !1,
        dragging: !1,
        getInitialState: function() {
          return {
            progress: 0
          }
        },
        onPlayClick: function() {
          this.hasAttemptedPlayback = !0;
          var e = i.findDOMNode(this.refs.audio);
          this.playing ? e.pause() : e.play()
        },
        onPlaying: function() {
          this.playing = !0;
          var e = this.props.msg;
          !e.get("isSentByMe") && e.get("ack") < o.ACK_PLAYED && e.sendPlayed(), this.props.onPlayingUpdate && this.props.onPlayingUpdate(this.playing)
        },
        onPause: function() {
          this.playing = !1, this.props.onPlayingUpdate && this.props.onPlayingUpdate(this.playing)
        },
        onEnded: function() {
          var e = i.findDOMNode(this.refs.audio);
          e.currentTime = 0, e.load()
        },
        onTimeUpdate: function() {
          var e = i.findDOMNode(this.refs.audio),
            t = 0;
          _.isFinite(e.duration) && (t = Math.round(100 * Math.min(1, e.currentTime / e.duration)), this.props.onTimeUpdate && this.props.onTimeUpdate(e.currentTime)), this.setState({
            progress: t
          })
        },
        componentDidMount: function() {
          var e = i.findDOMNode(this.refs.audio);
          this.regNativeListener(e, "loadeddata", this.onLoad), this.regNativeListener(e, "playing", this.onPlaying), this.regNativeListener(e, "pause", this.onPause), this.regNativeListener(e, "ended", this.onEnded), this.regNativeListener(e, "timeupdate", this.onTimeUpdate), this.regNativeListener(e, "durationchange", this.onTimeUpdate), this.regNativeListener(e, "progress", this.onTimeUpdate)
        },
        onLoad: function(e) {
          this.props.msg.urlState = s.URL_STATE.STATUS_200
        },
        onDrag: function(e) {
          var t = i.findDOMNode(this.refs.audio);
          this.setState({
            progress: e
          }), t.duration && (t.currentTime = t.duration / 100 * e)
        },
        showMediaMissing: function() {
          a.openModal(r.createElement(c, {
            title: l10n.t("missing_audio_title"),
            onOK: a.closeModal.bind(a),
            okText: l10n.t("web_ok")
          }, l10n.t("missing_audio_text")))
        },
        onPlayerError: function(e) {
          this.hasAttemptedPlayback ? (this.props.msg.urlState = s.URL_STATE.STATUS_ERR, this.props.msg.mediaLoadError(e)) : (this.props.msg.urlState = s.URL_STATE.NO_URL, this.props.msg.unset("url"))
        },
        render: function() {
          var e = "btn-audio icon ";
          e += this.playing ? "icon-audio-pause" : "icon-audio-play";
          var t = {
              value: this.state.progress,
              requestChange: this.onDrag
            },
            n = this.props.msg.urlState === s.URL_STATE.RMR_ERROR_MISSING ? this.showMediaMissing : this.onPlayClick,
            i = {
              width: this.state.progress - this.state.progress / 100 * 3 + "%"
            };
          return r.createElement("div", {
            className: "audio"
          }, r.createElement("div", {
            className: "audio-controls"
          }, r.createElement("button", {
            ref: "play_pause",
            className: e,
            onClick: n
          })), r.createElement("div", {
            className: "audio-body"
          }, r.createElement("div", {
            className: "audio-track-container"
          }, r.createElement("span", {
            className: "audio-progress",
            style: i
          }), r.createElement("input", {
            type: "range",
            className: "audio-track",
            valueLink: t,
            min: "0",
            max: "100"
          }))), r.createElement(d, {
            ref: "audio",
            msg: this.props.msg,
            preload: "auto",
            onError: this.onPlayerError,
            autoPlay: this.props.autoPlay
          }))
        }
      });
    e.exports = u
  },
  920: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(797),
      s = r.createClass({
        displayName: "Status",
        mixins: [o],
        propTypes: {
          msg: r.PropTypes.instanceOf(i).isRequired
        },
        getInitialState: function() {
          var e = this.props.msg;
          return {
            ack: e.ack < 3 ? this.async("msg.ack") : e.ack
          }
        },
        getStatus: function() {
          var e = this.props.msg,
            t = "icon",
            n = e.ack;
          return t += 1 > n ? " icon-msg-time" : 1 === n ? " icon-msg-check" : 2 === n ? " icon-msg-dblcheck" : " icon-msg-dblcheck-ack", e.isMedia && !e.caption && (t += "-light"), t
        },
        render: function() {
          return r.createElement("span", {
            onClick: this.openInfoDrawer,
            className: this.getStatus()
          })
        }
      });
    e.exports = s
  },
  921: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(811),
      o = n(812),
      s = n(912),
      a = n(865),
      c = n(796),
      l = n(798),
      d = n(43),
      u = n(708),
      p = n(83),
      h = n(797),
      m = r.createClass({
        displayName: "Text",
        mixins: [u, h],
        propTypes: {
          msg: r.PropTypes.instanceOf(c).isRequired,
          senderName: r.PropTypes.string,
          displayAuthor: r.PropTypes.bool,
          trusted: r.PropTypes.bool
        },
        getInitialState: function() {
          return p.supportsFeature(p.F.STARRED) ? {
            star: this.async("msg.star")
          } : {}
        },
        render: function() {
          var e = this.props,
            t = e.msg,
            n = e.displayAuthor,
            c = e.trusted,
            u = n && i.shouldRender(t),
            p = d("bubble", "bubble-text", {
              "bubble-broadcast": t.broadcast,
              "bubble-star": this.state.star,
              "has-author": u
            }),
            h = u ? r.createElement(i, {
              msg: t
            }) : null,
            m = c && t.linkPreview ? r.createElement(s, {
              msg: t
            }) : null,
            f = d("message-text", {
              "heart-animation": 1 == t.body.length && "❤" == t.body
            });
          return r.createElement("div", {
            className: p
          }, h, r.createElement("div", {
            className: f,
            "data-id": t.id
          }, m, r.createElement(a, {
            msg: t
          }), r.createElement(l, {
            text: t.body,
            selectable: !0,
            dirMismatch: t.rtl !== l10n.isRTL(),
            direction: t.dir,
            linkify: c,
            format: !0,
            wbr: 15
          })), r.createElement(o, {
            msg: t
          }))
        }
      });
    e.exports = m
  },
  922: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(807),
      s = n(797),
      a = r.createClass({
        displayName: "Unread",
        mixins: [s],
        propTypes: {
          count: r.PropTypes.number.isRequired,
          shouldScrollTo: r.PropTypes.bool.isRequired,
          didInsert: r.PropTypes.func.isRequired
        },
        componentDidMount: function() {
          this.props.shouldScrollTo && this.props.didInsert(i.findDOMNode(this).parentNode)
        },
        render: function() {
          var e = l10n.t("unread_message_count", {
            count: l10n.n(this.props.count),
            _plural: this.props.count
          });
          return r.createElement("span", {
            className: "msg-unread-body"
          }, r.createElement(o, null, e))
        }
      });
    e.exports = a
  },
  923: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(837),
      o = n(811),
      s = n(812),
      a = n(796),
      c = n(43),
      l = n(8),
      d = n(988),
      u = n(798),
      p = n(929),
      h = r.createClass({
        displayName: "Vcard",
        propTypes: {
          msg: r.PropTypes.instanceOf(a).isRequired,
          displayAuthor: r.PropTypes.bool
        },
        openContactChat: function() {
          var e = this.props.msg.vcardWAid;
          Store.Chat.find(e).then(function(e) {
            l.openChat(e)
          })
        },
        addContactToGroup: function() {
          Store.Contact.find(this.props.msg.vcardWAid).then(function(e) {
            l.openModal(r.createElement(p, {
              contact: e
            }), "modal-flow")
          })
        },
        render: function() {
          var e = this.props.msg,
            t = r.createElement(i, {
              thumb: d.thumbnail(e.body),
              type: e.type,
              ref: "media",
              shade: !1,
              duration: e.duration
            }),
            n = e.isSentByMe ? t : null,
            a = e.isSentByMe ? null : t,
            l = e.author ? "text" : "text no-author",
            p = c(["bubble", "bubble-attach", "bubble-contact"], {
              "bubble-attach-caption": !!e.caption
            }),
            h = void 0;
          e.vcardWAid && (h = r.createElement("div", {
            className: "bubble-actions"
          }, r.createElement("div", {
            className: "bubble-btn",
            onClick: this.openContactChat,
            title: l10n.t("message_author", {
              author: e.subtype
            })
          }, l10n.t("message")), r.createElement("div", {
            className: "bubble-btn",
            onClick: this.addContactToGroup,
            title: l10n.t("add_contact_to_group")
          }, l10n.t("add_contact_to_group"))));
          var m = this.props.displayAuthor && o.shouldRender(e) ? r.createElement(o, {
            msg: e
          }) : null;
          return r.createElement("div", null, r.createElement("div", {
            className: p
          }, r.createElement("div", {
            className: "wrapper"
          }, n, r.createElement("div", {
            className: "contents"
          }, m, r.createElement("div", {
            className: l
          }, r.createElement(s, {
            msg: e,
            contextMenu: this.contextMenu
          })), r.createElement(u, {
            text: e.subtype,
            element: "div",
            classes: "button button-contact",
            selectable: !0,
            dirMismatch: e.rtl !== l10n.isRTL(),
            direction: e.dir,
            wbr: 15
          })), a), h))
        }
      });
    e.exports = h
  },
  924: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(796),
      s = n(910),
      a = n(922),
      c = n(823),
      l = n(84),
      d = n(43),
      u = n(157),
      p = {
        FRONT: "front",
        SWITCH: "switch",
        BACK: "back",
        MUTATE: "mutate",
        UNREAD: "unread",
        FOCUS: "focus"
      },
      h = r.createClass({
        displayName: "MessageList",
        mixins: [l],
        propTypes: {
          msgs: r.PropTypes.arrayOf(r.PropTypes.instanceOf(o)).isRequired,
          scrollTo: r.PropTypes.func.isRequired,
          chatId: r.PropTypes.string.isRequired,
          unreadCount: r.PropTypes.number,
          selectable: r.PropTypes.bool,
          onMessageSelect: r.PropTypes.func.isRequired,
          focusedMsg: r.PropTypes.instanceOf(o),
          didRenderFocusedMsg: r.PropTypes.func
        },
        propChangeType: function(e) {
          var t = this.props.msgs,
            n = e.msgs;
          return e.focusedMsg ? p.FOCUS : this.props.unreadCount !== e.unreadCount ? p.UNREAD : this.props.chatId !== e.chatId ? p.SWITCH : t.length && n.length && t[0].id !== n[0].id ? p.BACK : t.length === n.length || n.length < t.length ? p.MUTATE : p.FRONT
        },
        componentWillMount: function() {
          this.regCmd("is_msg_visible", this.isMsgVisible)
        },
        didInsertMessageUnread: function(e) {
          this.props.scrollTo(function(t) {
            t.scrollTop = e.offsetTop - t.clientHeight / 4
          }), this.shouldScrollBottom = !1, this.shouldRestoreScroll = void 0
        },
        componentDidMount: function() {
          this._hasRendered = !0, this.shouldScrollBottom === !1 || this.props.focusedMsg || this.props.scrollTo(function(e) {
            e.scrollTop = e.scrollHeight
          })
        },
        componentWillUpdate: function(e) {
          this.props.scrollTo(function(t) {
            var n = this.propChangeType(e);
            if (n === p.SWITCH) this.shouldScrollBottom = !0;
            else if (n === p.FRONT) {
              var r = _.last(e.msgs);
              (r.isSentByMe || t.scrollTop + t.offsetHeight === t.scrollHeight) && (this.shouldScrollBottom = !0), this.shouldScrollBottom || (this.shouldRestoreScroll = t.scrollHeight - t.scrollTop - t.clientHeight)
            } else n !== p.BACK && n !== p.UNREAD || (this.shouldRestoreScroll = t.scrollHeight - t.scrollTop - t.clientHeight);
          }.bind(this))
        },
        componentDidUpdate: function(e) {
          this.props.scrollTo(function(e) {
            this.shouldScrollBottom ? (e.scrollTop = e.scrollHeight, this.shouldScrollBottom = !1) : "undefined" != typeof this.shouldRestoreScroll && (e.scrollTop = e.scrollHeight - this.shouldRestoreScroll - e.clientHeight, this.shouldRestoreScroll = void 0)
          }.bind(this))
        },
        processHiddenText: function(e, t) {
          var n = "​",
            r = "⁠",
            i = r + r,
            o = r + r + r,
            s = i + "([^" + r + "]+)" + o,
            a = r + r + r + r,
            c = r + r + r + r + r,
            l = a + "[^" + r + "]+" + c;
          if (e = e.replace(new RegExp(n, "g"), ""), e = e.replace(new RegExp("" + l, "g"), ""), e = e.replace(new RegExp("^[^" + r + "]+" + c + "(.*)", "g"), "$1"), e = e.replace(new RegExp("(.*)" + a + "[^" + r + "]+$", "g"), "$1"), !new RegExp("^" + s).test(e) && new RegExp("" + s, "g").test(e)) {
            for (var d, p = t.getRangeAt(0).startContainer, h = 0; 5 > h && !(d = p.getAttribute && p.getAttribute("data-id")); h++) p = p.parentNode;
            var m = Store.Msg.get(d);
            if (m) {
              var f = "[" + u.timeStr(m.t) + "]",
                g = m.senderObj.formattedUser;
              e = i + f + " " + g + ": " + o + e
            }
          }
          e = e.replace(new RegExp("^(.*)" + s + "$", "g"), "$1");
          var v = e.match(new RegExp(s, "g"));
          return v && 1 === v.length && (e = e.replace(new RegExp(s, "g"), "")), e = e.replace(new RegExp("" + s, "g"), "\n$1"), "\n" === e.charAt(0) && (e = e.slice(1)), e
        },
        parseSelection: function(e) {
          for (var t, n, r = "", i = 0; i < e.rangeCount; i++)
            for (n = document.createTreeWalker(e.getRangeAt(i).cloneContents(), window.NodeFilter.SHOW_ALL); n.nextNode();) t = n.currentNode, r += t instanceof HTMLImageElement ? t.alt : t.nodeValue ? t.nodeValue : "";
          return r
        },
        onCopy: function(e) {
          var t = window.getSelection(),
            n = this.parseSelection(t);
          e.clipboardData.setData("text/plain", this.processHiddenText(n, t)), e.stopPropagation(), e.preventDefault()
        },
        isMsgVisible: function(e, t) {
          var n = void 0,
            r = this.refs[e.toString()];
          if (r) {
            var o = i.findDOMNode(this).parentNode,
              s = o.scrollTop,
              a = s + o.clientHeight,
              c = i.findDOMNode(r);
            c.offsetTop + c.clientHeight > s && c.offsetTop < a && (n = i.findDOMNode(r.refs.component.refs.img))
          }
          t(n)
        },
        render: function() {
          for (var e, t, n = [], i = this.props.msgs, l = i.length, p = this.props.unreadCount, h = [o.TYPE.CHAT, o.TYPE.IMAGE, o.TYPE.VIDEO, o.TYPE.AUDIO, o.TYPE.VCARD, o.TYPE.LOCATION, o.TYPE.PTT]; p > 0;) {
            if (l--, 0 > l) {
              l = i.length;
              break
            }
            e = i[l], h.indexOf(e.type) > -1 && p--
          }
          var m = i[l];
          if (m && m.chat.noEarlierMsgs)
            for (t = 0; l > t; t++)
              if (h.indexOf(i[t].type)) {
                l = i.length;
                break
              }
          var f = !1,
            g = void 0;
          for (t = 0; t < i.length; t++)
            if (e = i[t]) {
              var v = u.dayOfMsg(e);
              if (0 === t || g !== v) {
                var y = "msg-" + e.id + "-date";
                n.push(r.createElement("div", {
                  className: "msg",
                  key: y
                }, r.createElement("div", {
                  className: "message message-system"
                }, r.createElement(s, {
                  key: y,
                  timestamp: e.t
                })))), f = !1
              }
              g = v, t === l && (n.push(r.createElement("div", {
                className: "msg-unread",
                key: "msg-unread"
              }, r.createElement(a, {
                shouldScrollTo: !this._hasRendered,
                didInsert: this.didInsertMessageUnread,
                count: this.props.unreadCount
              }))), f = !1);
              var E = _.matches({
                  from: e.from,
                  startOfDay: e.startOfDay
                }),
                T = _.matches({
                  author: e.author,
                  startOfDay: e.startOfDay
                }),
                b = e.isGroupMsg ? T : E,
                S = c.Position.SINGLE,
                M = i[t + 1];
              (M && t + 1 === l || M && M.isNotification || M && v !== u.dayOfMsg(M)) && (M = !1), e.isNotification ? S = c.Position.SINGLE : b(M) && !b(f) ? S = c.Position.FRONT : b(f) && b(M) ? S = c.Position.MID : b(f) && !b(M) && (S = c.Position.END);
              var C = this.props.focusedMsg === e;
              e.type === o.TYPE.IMAGE ? n.push(r.createElement(c, {
                key: "msg-" + e.id,
                ref: e.id.toString(),
                msg: e,
                selectable: this.props.selectable,
                onMessageSelect: this.props.onMessageSelect,
                position: S,
                isFocusedMsg: C,
                didRenderFocusedMsg: this.props.didRenderFocusedMsg
              })) : n.push(r.createElement(c, {
                key: "msg-" + e.id,
                msg: e,
                selectable: this.props.selectable,
                onMessageSelect: this.props.onMessageSelect,
                position: S,
                isFocusedMsg: C,
                didRenderFocusedMsg: this.props.didRenderFocusedMsg
              })), f = e.isNotification ? !1 : e
            }
          var w = d("message-list", {
            selectable: this.props.selectable
          });
          return r.createElement("div", {
            className: w,
            onCopy: this.onCopy
          }, n)
        }
      });
    e.exports = h
  },
  925: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i, o = n(3),
      s = r(o),
      a = n(6),
      c = n(1),
      l = n(8),
      d = n(799),
      u = n(82),
      p = n(163),
      h = n(106),
      m = n(158),
      f = n(21),
      g = n(824),
      v = n(985),
      y = n(107),
      E = a.createClass({
        displayName: "PTT",
        mixins: [m, h, p],
        propTypes: {
          chat: a.PropTypes.instanceOf(d),
          onStateChange: a.PropTypes.func.isRequired
        },
        statics: {
          READY: "ready",
          DELAY: "delay",
          REC: "recording",
          PROCESSSING: "processsing",
          GUM_TIMEOUT: "ptt_gum_timeout",
          PERMISSION_DENIED: "permission_denied",
          NOT_SUPPORTED_ERROR: "not_supported_error",
          MANDATORY_UNSATISFIED_ERROR: "mandatory_unsatisfied_error",
          CANCEL: "cancel",
          SEND: "send"
        },
        getInitialState: function() {
          return {
            state: E.READY,
            active: void 0,
            elapsedTimeInterval: void 0,
            elapsedTime: 0,
            startTime: 0
          }
        },
        componentDidMount: function() {
          this.regNativeListener(window, "blur", this.cancelRecording)
        },
        isRecording: function() {
          var e = this.state.state;
          return e === E.REC || e === E.DELAY || e === E.PROCESSSING
        },
        getRecorder: function() {
          var e;
          return e = new s["default"](function(t, n) {
            navigator.getUserMedia({
              audio: !0
            }, function(n) {
              if (e.isResolved()) {
                if (_.isFunction(n.stop)) n.stop();
                else
                  for (var r = n.getTracks(), i = 0; i < r.length; i++) r[i].stop();
                l.closeModal()
              } else t(n)
            }, function(t) {
              var r = _.isString(t) ? t : t.name,
                i = f.GUM[r] || f.GUM.GUMError;
              n(new i), e && e.isResolved() && l.closeModal()
            })
          }).timeout(1500, "waitForGUMConversationPTTTimeout").then(function(e) {
            return i = new v({
              encoderPath: "/lib/opus-recorder-oggopusEncoder-0.4.4.js",
              bitRate: 16e3,
              encoderSampleRate: 16e3,
              encoderApplication: 2048
            }), i.initStream(e), i
          })["catch"](s["default"].TimeoutError, function(e) {
            throw l.openModal(a.createElement(g, {
              title: "guide_desktop_mic_title",
              desc: "guide_desktop_mic_description",
              type: g.TYPE.GUIDE_ALLOW
            })), e
          })["catch"](f.GUM.PermissionDeniedError, function(e) {
            throw l.openModal(a.createElement(g, {
              title: "guide_desktop_mic_title",
              desc: "guide_desktop_mic_fail_description",
              type: g.TYPE.GUIDE_UNBLOCK
            })), e
          })["catch"](f.GUM.GUMError, function(e) {
            if (e instanceof f.GUM.PermissionDeniedError) throw e;
            throw l.openModal(a.createElement(g, {
              title: "guide_desktop_mic_missing_title",
              desc: "guide_desktop_mic_missing_description",
              type: g.TYPE.GUIDE_NONE
            })), e
          })
        },
        cancelRecording: function() {
          this.isRecording() && (this.state.state !== E.READY && this.props.onStateChange(E.READY), this.safeIsMounted() && this.setState({
            state: E.READY,
            active: void 0,
            elapsedTime: 0,
            startTime: 0
          }), this.clearSafeInterval(this.elapsedTimeInterval), delete this.elapsedTimeInterval, i && i.stop(), this.props.chat.markPaused())
        },
        startInterval: function() {
          var e = this;
          this.elapsedTimeInterval = this.safeInterval(function() {
            e.setState({
              elapsedTime: e.state.elapsedTime + 1
            })
          }, 1e3), this.setState({
            elapsedTime: 0,
            startTime: Date.now()
          })
        },
        cancelPTTTimer: function() {
          this.pttTimer && (this.clearSafeTimeout(this.pttTimer), delete this.pttTimer)
        },
        onPTTReady: function() {
          delete this.pttTimer, this.state.state === E.DELAY && this.setState({
            state: E.REC
          })
        },
        uimClose: function() {
          this.cancelRecording()
        },
        onMouseOverSend: function() {
          this.setState({
            active: E.SEND
          })
        },
        onMouseOutSend: function() {
          this.setState({
            active: void 0
          })
        },
        onMouseOverCancel: function() {
          this.setState({
            active: E.CANCEL
          })
        },
        onMouseOutCancel: function() {
          this.setState({
            active: void 0
          })
        },
        onMouseUpCancel: function() {
          this.state.elapsedTime < 1 || (this.cancelPTTTimer(), this.uimPop(u.PTT))
        },
        onMouseUpSend: function() {
          var e = this;
          if (!(this.state.elapsedTime < 1)) {
            this.cancelPTTTimer();
            var t = this.props.chat;
            if (this.state.state === E.REC) {
              var n = Math.ceil((Date.now() - this.state.startTime) / 1e3);
              t.regCancellablePromise(new s["default"](function(r, o) {
                e.setState({
                  state: E.PROCESSSING
                }), e.props.onStateChange(E.READY), i.addEventListener("dataAvailable", function(o) {
                  i.removeEventListener("dataAvailable"), t.sendMedia({
                    file: o.detail,
                    type: "ptt",
                    duration: n
                  })["finally"](r), e.uimPop(u.PTT)
                }), i.stop()
              }))["catch"](s["default"].CancellationError, function() {
                e.uimPop(u.PTT)
              })
            } else this.uimPop(u.PTT), c.log("ptt:onMouseUpSend duration too short")()
          }
        },
        onMouseDown: function() {
          this.state.state === E.READY && this.getRecorder().bind(this).then(function(e) {
            e.start(), this.props.chat.presence.update()["catch"](f.WapDrop, _.noop), this.props.chat.markRecording(), this.setState({
              state: E.DELAY
            }), this.props.onStateChange(E.REC), this.uimPush(this, u.PTT, {
              popable: !0
            }), u.stealFocus(u.PTT), this.pttTimer = this.safeDelay(this.onPTTReady, 1500), this.startInterval()
          })["catch"](function(e) {
            c.error("PTT Recording Error")(e)
          })
        },
        render: function() {
          var e = "btn-close btn-border ptt-close";
          this.state.active === E.CANCEL && (e += " is-hover");
          var t = "btn-border ptt-send";
          this.state.active === E.SEND && (t += " is-hover");
          var n = this.state.state === E.DELAY || this.state.state === E.REC ? a.createElement("div", {
              className: "ptt-recording",
              key: "recording"
            }, a.createElement("button", {
              className: e,
              onMouseOver: this.onMouseOverCancel,
              onMouseOut: this.onMouseOutCancel,
              onMouseUp: this.onMouseUpCancel
            }, a.createElement("span", {
              className: "icon icon-round-x btn-state-default"
            }), a.createElement("span", {
              className: "icon icon-round-x-inv btn-state-hover"
            })), a.createElement("div", {
              className: "ptt-counter"
            }, moment.unix(this.state.elapsedTime).format("m:ss")), a.createElement("button", {
              className: t,
              onMouseOver: this.onMouseOverSend,
              onMouseOut: this.onMouseOutSend,
              onMouseUp: this.onMouseUpSend
            }, a.createElement("span", {
              className: "icon icon-round-send btn-state-default"
            }), a.createElement("span", {
              className: "icon icon-round-send-inv btn-state-hover"
            }))) : null,
            r = this.state.state === E.READY || this.state.state === E.PROCESSSING ? a.createElement("button", {
              className: "icon btn-icon icon-ptt",
              onMouseDown: this.onMouseDown,
              disabled: this.state.state === E.PROCESSSING,
              key: "button"
            }) : null,
            i = "ptt-container";
          return n && (i += " active"), a.createElement("div", {
            className: i
          }, a.createElement(y, {
            transitionName: "ptt"
          }, n || r))
        }
      });
    e.exports = E
  },
  926: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(799),
      c = n(352),
      l = n(8),
      d = n(105),
      u = n(29),
      p = s.createClass({
        displayName: "Spam",
        mixins: [d],
        propTypes: {
          chat: s.PropTypes.instanceOf(a).isRequired
        },
        componentWillMount: function() {
          this.addObserver(Store.Blocklist, "add remove reset")
        },
        confirmReportGroupSpam: function() {
          l.openModal(s.createElement(c, {
            onOK: this.reportGroupSpam,
            okText: l10n.t("report_group_spam"),
            onCancel: l.closeModal.bind(l),
            cancelText: l10n.t("web_cancel")
          }, l10n.t("report_group_spam_ack")))
        },
        reportGroupSpam: function() {
          var e = this.props.chat,
            t = e.sendSpamReport(!0);
          if (!e.isReadOnly) {
            var n = e.sendExit(),
              r = u.waitForBBEvent(e.msgs, "change:last", function(e) {
                return e.isGroupLeave()
              });
            t = o["default"].join(t, n, r)
          }
          t.then(function() {
            return e.sendDelete()
          })["catch"](_.noop), l.closeModal()
        },
        confirmReportSpam: function() {
          l.openModal(s.createElement(c, {
            onOK: this.reportSpam,
            okText: l10n.t("report_spam"),
            onCancel: l.closeModal.bind(l),
            cancelText: l10n.t("web_cancel")
          }, l10n.t("report_spam_ack")))
        },
        reportSpam: function() {
          var e = this.props.chat;
          e.sendSpamReport().then(function() {
            return e.contact.setBlock(!0)
          }).then(function() {
            return e.sendDelete()
          })["catch"](_.noop), l.closeModal()
        },
        notSpam: function() {
          this.props.chat.sendNotSpam(!0)["catch"](_.noop)
        },
        confirmBlock: function() {
          l.openModal(s.createElement(c, {
            onOK: this.block,
            okText: l10n.t("block"),
            onCancel: l.closeModal.bind(l),
            cancelText: l10n.t("web_cancel")
          }, l10n.t("block_ack")))
        },
        block: function() {
          this.props.chat.contact.setBlock(!0)["catch"](_.noop), l.closeModal()
        },
        confirmUnblock: function() {
          l.openModal(s.createElement(c, {
            okText: l10n.t("unblock_button"),
            onOK: this.unblock,
            cancelText: l10n.t("web_cancel"),
            onCancel: l.closeModal.bind(l)
          }, l10n.t("unblock_confirmation", {
            contact: this.props.chat.contact.formattedName
          })))
        },
        unblock: function() {
          this.props.chat.contact.setBlock(!1)["catch"](_.noop), l.closeModal()
        },
        render: function() {
          var e, t = this.props.chat,
            n = [];
          if (t.isGroup) e = l10n.t("group_admin_not_a_contact"), n.push(s.createElement("button", {
            className: "spam-button btn-plain",
            key: "report_spam",
            onClick: this.confirmReportGroupSpam
          }, l10n.t("report_group_spam")));
          else {
            e = l10n.t("sender_not_a_contact"), n.push(s.createElement("button", {
              className: "spam-button btn-plain",
              key: "report_spam",
              onClick: this.confirmReportSpam
            }, l10n.t("report_spam")));
            var r = Store.Blocklist.get(t.id);
            r ? n.push(s.createElement("button", {
              onClick: this.confirmUnblock,
              key: "unblock",
              className: "spam-button btn-plain"
            }, l10n.t("unblock_button"))) : n.push(s.createElement("button", {
              onClick: this.confirmBlock,
              key: "block",
              className: "spam-button btn-plain"
            }, l10n.t("block")))
          }
          return n.push(s.createElement("button", {
            onClick: this.notSpam,
            key: "not_spam",
            className: "spam-button btn-plain"
          }, l10n.t("not_spam"))), s.createElement("div", {
            className: "spam"
          }, s.createElement("div", {
            className: "spam-text"
          }, e), s.createElement("div", {
            className: "spam-controls"
          }, n))
        }
      });
    e.exports = p
  },
  927: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(105),
      o = n(82),
      s = n(799),
      a = n(796),
      c = n(827),
      l = n(906),
      d = n(907),
      u = n(862),
      p = n(977),
      h = n(818),
      m = n(869),
      f = n(8),
      g = n(45),
      v = n(107),
      y = n(163),
      E = r.createClass({
        displayName: "ConversationPanel",
        mixins: [i, y],
        propTypes: {
          chat: r.PropTypes.instanceOf(s).isRequired,
          msgCollection: r.PropTypes.instanceOf(c).isRequired,
          ftsMsg: r.PropTypes.instanceOf(a)
        },
        getInitialState: function() {
          return {
            canCompose: this.canCompose(),
            selectable: !1,
            selectedMessages: []
          }
        },
        componentWillMount: function() {
          var e = this.props.chat;
          e.isGroup ? this.addObserver(e, "change:isReadOnly", this.onComposeState) : e.isUser && this.addObserver(Store.Blocklist, "add remove reset", this.onComposeState), this.openEvent = new g.WebcChatOpen({
            webcUnreadCount: e.unreadCount
          })
        },
        componentDidMount: function() {
          var e = this.props.chat;
          e.set({
            active: !0,
            viewed: !0
          }), e.isDirty() && this.props.chat.msgs === this.props.msgCollection && e.sendSeen(), this.openEvent && (this.openEvent.markWebcChatOpenT(), this.openEvent.commit(), delete this.openEvent)
        },
        componentWillUnmount: function() {
          f.closeDrawer(o.DRAWER_RIGHT), this.props.chat.set("active", !1)
        },
        onComposeState: function() {
          var e = this.canCompose();
          this.state.canCompose !== e && this.setState({
            canCompose: e
          })
        },
        canCompose: function() {
          var e = this.props.chat;
          return e.isReadOnly ? !1 : e.isUser ? !e.contact.isBlocked() : !0
        },
        onSelectMessages: function() {
          this.setState({
            selectable: !0
          }), this.uimPush(this, o.CONVERSATION_FOOTER, {
            escapable: !0
          })
        },
        onCancelSelection: function() {
          this.uimPop(o.CONVERSATION_FOOTER)
        },
        uimClose: function() {
          this.setState({
            selectable: !1,
            selectedMessages: []
          })
        },
        onPageUpDown: function(e) {
          this.refs.msgs.onPageUpDown(e)
        },
        onMessageSelect: function(e, t) {
          var n;
          t ? (n = this.state.selectedMessages.concat(e), this.setState({
            selectedMessages: n
          })) : (n = _.without(this.state.selectedMessages, e), this.setState({
            selectedMessages: n
          }))
        },
        onDragEnter: function(e) {
          _.contains(e.dataTransfer.types, "Files") && (f.openDrawer(r.createElement(h, {
            chat: this.props.chat,
            state: m.STATE.ACTIVE,
            type: o.DRAWER_MID
          }), "slide-up"), e.stopPropagation(), e.preventDefault())
        },
        render: function() {
          var e, t, n = this.props,
            i = n.chat,
            o = n.msgCollection,
            s = n.ftsMsg;
          if (this.state.selectable) t = r.createElement(p, {
            chat: i,
            selectedMessages: this.state.selectedMessages,
            onCancel: this.onCancelSelection
          }), e = r.createElement("footer", {
            className: "pane-footer pane-chat-footer"
          });
          else if (this.state.canCompose) e = r.createElement(u, {
            chat: i,
            onPageUpDown: this.onPageUpDown
          });
          else {
            var a = i.isGroup ? l10n.t("web_cannot_send_not_a_group_participant") : l10n.t("web_cannot_send_to_blocked_contact_1", {
              contact: i.contact.formattedName
            });
            e = r.createElement("footer", {
              className: "pane-footer pane-chat-footer"
            }, r.createElement("div", {
              className: "block-message"
            }, a))
          }
          return r.createElement("div", {
            id: "main",
            className: "pane pane-chat pane-two",
            onDragOver: this.onDragOver,
            onDragEnter: this.onDragEnter
          }, r.createElement(l, {
            chat: i,
            onSelectMessages: this.onSelectMessages
          }), r.createElement("div", {
            className: "pane-body pane-chat-tile-container"
          }, r.createElement(d, {
            ref: "msgs",
            chat: i,
            selectable: this.state.selectable,
            onMessageSelect: this.onMessageSelect,
            msgCollection: o,
            onSelectMessages: this.onSelectMessages,
            ftsMsg: s
          }), r.createElement("div", {
            className: "pane-chat-tile"
          })), e, r.createElement(v, {
            transitionName: "slide-up"
          }, t))
        }
      });
    e.exports = E
  },
  928: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(1),
      s = n(84),
      a = n(82),
      c = n(44),
      l = n(163),
      d = n(107),
      u = n(159),
      p = u.HotKeys,
      h = r.createClass({
        displayName: "DrawerManager",
        mixins: [s, l],
        propTypes: {
          onRightDrawer: r.PropTypes.func.isRequired
        },
        statics: {
          DEFAULT_TRANSITION: "drawer-left"
        },
        getInitialState: function() {
          var e = {};
          return e[a.DRAWER_LEFT] = {
            flow: null,
            transition: h.DEFAULT_TRANSITION
          }, e[a.DRAWER_MID] = {
            flow: null,
            transition: h.DEFAULT_TRANSITION
          }, e[a.DRAWER_RIGHT] = {
            flow: null,
            transition: h.DEFAULT_TRANSITION
          }, {
            flows: e
          }
        },
        componentWillMount: function() {
          this.regCmd("open_drawer", this.openFlow), this.regCmd("close_drawer", this.closeFlow), this.regCmd("chat_delete", this.chatDelete)
        },
        openFlow: function(e, t, n) {
          var r = e.props.type;
          return r ? (r === a.DRAWER_RIGHT && this.props.onRightDrawer(!0), this.uimPush(this, r, {
            escapable: !0,
            parent: n
          }), this.state.flows[r] = {
            flow: e,
            transition: t || h.DEFAULT_TRANSITION
          }, void this.setState(this.state.flows, this.focus)) : void o.log("drawerManager:openFlow Tried to open flow without a type.")()
        },
        focus: function() {
          var e = i.findDOMNode(this);
          e.contains(document.activeElement) || e.focus()
        },
        uimClose: function(e) {
          e === a.DRAWER_RIGHT && this.props.onRightDrawer(!1);
          var t = this.state.flows;
          t[e] = {
            flow: null,
            transition: t[e].transition
          }, this.setState(t)
        },
        chatDelete: function() {
          this.closeFlow(a.DRAWER_RIGHT)
        },
        closeFlow: function(e) {
          e ? this.uimPop(e) : (this.uimPop(a.DRAWER_MID), this.uimPop(a.DRAWER_RIGHT))
        },
        isFlowActive: function(e) {
          var t = this.state.flows[e];
          return t && t.flow
        },
        checkRTL: function(e) {
          return l10n.isRTL() ? e + "-rtl" : e
        },
        onKeyPress: function(e) {
          if (!e.metaKey && !e.ctrlKey) {
            var t = i.findDOMNode(this);
            if (t === document.activeElement) {
              var n = _.toArray(t.querySelectorAll("input[data-tab]"));
              if (n.length) {
                var r = _.first(n);
                p.flashFocus = Date.now(), r.restoreFocus ? r.restoreFocus() : r.focus()
              }
            }
          }
        },
        preventBlur: function(e) {
          this.isFlowActive(a.DRAWER_MID) && document.activeElement === i.findDOMNode(this) && "Escape" !== e.key && (e.preventDefault(), e.stopPropagation())
        },
        render: function() {
          var e = a,
            t = this.state.flows[e.DRAWER_LEFT].flow,
            n = this.checkRTL(this.state.flows[e.DRAWER_LEFT].transition),
            i = this.state.flows[e.DRAWER_MID].flow,
            o = c.isTrident ? "fade" : this.state.flows[e.DRAWER_MID].transition,
            s = this.state.flows[e.DRAWER_RIGHT].flow,
            l = this.checkRTL(this.state.flows[e.DRAWER_RIGHT].transition);
          return r.createElement("div", {
            tabIndex: "-1",
            onKeyDown: this.preventBlur,
            onKeyPress: this.onKeyPress,
            className: "drawer-manager"
          }, r.createElement(d, {
            transitionName: n,
            className: "pane pane-one"
          }, t), r.createElement(d, {
            transitionName: o,
            className: "pane pane-two"
          }, i), r.createElement(d, {
            transitionName: l,
            className: "pane pane-three"
          }, s))
        }
      });
    e.exports = h
  },
  929: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(813),
      o = n(352),
      s = n(161),
      a = n(798),
      c = n(8),
      l = n(947),
      d = r.createClass({
        displayName: "AddContactToGroupFlow",
        mixins: [i],
        propTypes: {
          contact: r.PropTypes.instanceOf(s).isRequired
        },
        filter: function(e) {
          var t = e.groupMetadata;
          return !e.isGroup || e.isGroup && !t.participants.iAmMember() ? !1 : t.participants.get(this.props.contact.id) ? l10n.t("already_added_to_group") : t.participants.iAmAdmin() ? !0 : l10n.t("chat_not_an_admin")
        },
        componentWillMount: function() {
          this.push(r.createElement(l, {
            chats: Store.Chat.filter(function(e) {
              return e.isGroup
            }),
            filter: this.filter,
            onCancel: this.onBack,
            onGroup: this.confirmAddToGroup
          }))
        },
        confirmAddToGroup: function(e) {
          this.push(r.createElement(o, {
            onOK: this.addToGroup.bind(null, e),
            okText: l10n.t("add_group_participant"),
            onCancel: this.onBack,
            cancelText: l10n.t("web_cancel")
          }, r.createElement(a, {
            text: l10n.t("confirm_add_group_participant", {
              participant: this.props.contact.formattedName,
              subject: e.contact.name
            })
          })))
        },
        addToGroup: function(e) {
          e.groupMetadata.participants.addParticipant(this.props.contact).then(function() {
            c.openChat(e)
          })["catch"](_.noop), this.endFlow()
        },
        onBack: function() {
          this.pop()
        }
      });
    e.exports = d
  },
  930: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(813),
      o = n(352),
      s = n(873),
      a = n(799),
      c = n(8),
      l = n(798),
      d = r.createClass({
        displayName: "AddGroupParticipantFlow",
        mixins: [i],
        propTypes: {
          chat: r.PropTypes.instanceOf(a).isRequired
        },
        componentWillMount: function() {
          var e = this.props.chat.groupMetadata,
            t = function(t) {
              return Store.Contact.isFilteredContact(t) ? e.participants.get(t.id) ? l10n.t("already_added_to_group") : !0 : !1
            };
          this.push(r.createElement(s, {
            title: l10n.t("add_group_participant"),
            filter: t,
            onCancel: this.onBack,
            onSelect: this.confirmAddParticipant
          }))
        },
        confirmAddParticipant: function(e) {
          var t = this.onAddParticipant.bind(this, e),
            n = l10n.t("confirm_add_group_participant", {
              participant: e.formattedName,
              subject: this.props.chat.contact.name
            });
          this.push(r.createElement(o, {
            onOK: t,
            okText: l10n.t("add_group_participant"),
            onCancel: this.onBack,
            cancelText: l10n.t("web_cancel")
          }, r.createElement(l, {
            text: n
          })))
        },
        onBack: function() {
          this.pop()
        },
        onAddParticipant: function(e) {
          this.props.chat.groupMetadata.participants.addParticipant(e)["catch"](_.noop), c.closeModal()
        }
      });
    e.exports = d
  },
  931: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(813),
      o = n(871),
      s = n(799),
      a = r.createClass({
        displayName: "CaptureFlow",
        mixins: [i],
        propTypes: {
          chat: r.PropTypes.instanceOf(s).isRequired,
          stream: r.PropTypes.object.isRequired
        },
        componentWillMount: function() {
          this.push(r.createElement(o, {
            onBack: this.endFlow,
            caption: !0,
            onSend: this.sendMedia,
            stream: this.props.stream
          }))
        },
        sendMedia: function(e) {
          this.props.chat.sendMedia(e), this.endFlow()
        }
      });
    e.exports = a
  },
  932: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(813),
      o = n(941),
      s = n(8),
      a = r.createClass({
        displayName: "NewChatFlow",
        mixins: [i],
        componentWillMount: function() {
          this.push(r.createElement(o, {
            title: l10n.t("new_chat_flow_title"),
            onBack: this.endFlow,
            onClick: this.onClick
          }))
        },
        onClick: function(e, t) {
          Store.Chat.find(t.id).then(s.openChat.bind(s)), this.endFlow()
        }
      });
    e.exports = a
  },
  933: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(813),
      o = n(950),
      s = n(951),
      a = r.createClass({
        displayName: "NewGroupFlow",
        mixins: [i],
        getDefaultProps: function() {
          return {
            transition: i.Transition.DEFAULT_DRAWER
          }
        },
        componentWillMount: function() {
          this.push(r.createElement(o, {
            key: "NewGroupDrawer",
            onBack: this.endFlow,
            onContinue: this.groupParticipants
          }))
        },
        groupParticipants: function(e, t, n) {
          this.push(r.createElement(s, {
            key: "NewGroupParticipantsDrawer",
            subject: e,
            thumb: t,
            full: n,
            onBack: this.participantsBack,
            onContinue: this.createGroup
          }))
        },
        createGroup: function(e, t, n, r) {
          Store.Chat.createGroup(e, t, n, r), this.endFlow()
        },
        participantsBack: function(e, t, n) {
          this.pop({
            subject: e,
            thumb: t,
            full: n
          })
        }
      });
    e.exports = a
  },
  934: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(355),
      o = r.createClass({
        displayName: "IntroPanel",
        componentDidMount: function() {
          var e = this.refs.image,
            t = this.refs.text;
          Velocity(e, {
            scale: [1, 0],
            opacity: [1, 0]
          }, {
            delay: 1340,
            duration: 180,
            easing: [.05, 1.02, 0, 1.01]
          }), Velocity(t, {
            translateY: [0, 80],
            opacity: [1, 0]
          }, {
            delay: 1300,
            duration: 140,
            easing: [.05, 1.02, 0, 1.01]
          })
        },
        render: function() {
          return r.createElement("div", {
            className: "pane pane-intro pane-two"
          }, r.createElement("div", {
            className: "intro-body"
          }, r.createElement("div", {
            ref: "image",
            className: "intro-image"
          }), r.createElement("div", {
            ref: "text",
            className: "intro-text-container"
          }, r.createElement("h1", {
            "data-a8n": i.key("intro-title"),
            className: "intro-title"
          }, l10n.t("intro_title")), r.createElement("div", {
            "data-a8n": i.key("intro-text"),
            className: "intro-text"
          }, l10n.t("intro_connection")))))
        }
      });
    e.exports = o
  },
  935: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function i(e) {
      var t = void 0,
        n = void 0;
      return new s["default"](function(r, i) {
        c.info("MediaAnalyzer:isSupported sending file to worker")(), n = new d.WebcMediaAnalyzed, t = new l, t.onmessage = r, t.onerror = i, t.postMessage(e)
      }).then(function(n) {
        return "FileReader undefined" === n.data ? new s["default"](function(t, n) {
          c.log("MediaAnalyzer:isSupported sending buffer to worker")();
          var r = new FileReader;
          r.onload = t, r.onerror = n, r.onabort = n, r.readAsArrayBuffer(e)
        }).then(function(e) {
          return new s["default"](function(n, r) {
            t.onmessage = n, t.onerror = r, t.postMessage(e.target.result, [e.target.result])
          })
        }) : n
      }).then(function(t) {
        var r = t.data;
        if (c.info("MediaAnalyzer:isSupported got result " + r)(t), "boolean" != typeof r) throw r;
        var i = void 0;
        if (e.name) {
          var o = e.name.split(".");
          o.length > 1 && (i = o[o.length - 1])
        }
        return n.set({
          webcMediaSupported: r,
          webcMediaExtensions: i
        }), n.markWebcMediaAnalyzeT(), n.commit(), r
      })["catch"](function(e) {
        return c.error("MediaAnalyzer:isSupported got error! " + e)(e), a.upload("media-detection-error"), !1
      })["finally"](function() {
        t && t.terminate()
      })
    }
    var o = n(3),
      s = r(o),
      a = n(10),
      c = n(1),
      l = n(1001),
      d = n(45);
    e.exports = {
      isSupported: i
    }
  },
  936: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(8),
      s = n(800),
      a = n(802),
      c = n(801),
      l = n(804),
      d = n(809),
      u = n(816),
      p = n(105),
      h = n(808),
      m = n(159),
      f = m.HotKeys,
      g = r.createClass({
        displayName: "ArchivedDrawer",
        mixins: [p],
        getInitialState: function() {
          this.selection = new h([], function(e) {
            return e.id
          })
        },
        componentDidMount: function() {
          this.addObserver(Store.Chat, "change:archive add remove"), this.refs.list && i.findDOMNode(this.refs.list).focus()
        },
        onClick: function(e, t) {
          o.openChat(t), this.onClose()
        },
        onClose: function() {
          o.closeDrawer(this.props.type)
        },
        getList: function() {
          return Store.Chat.filter("archive")
        },
        onNextChat: function(e) {
          e.preventDefault(), e.stopPropagation(), this.selection.setNext()
        },
        onPrevChat: function(e) {
          e.preventDefault(), e.stopPropagation(), this.selection.setPrev()
        },
        render: function() {
          var e = this,
            t = void 0,
            n = this.getList();
          if (this.selection.init(n, !0), n.length > 0) {
            var i = n.map(function(t) {
                return r.createElement(u, {
                  chat: t,
                  mode: u.Mode.LAST,
                  key: t.id,
                  active: e.selection,
                  onClick: e.onClick
                })
              }),
              o = {
                down: this.onNextChat,
                up: this.onPrevChat
              };
            t = r.createElement(f, {
              handlers: o,
              ref: "list",
              className: "drawer-section-main chatlist",
              "data-list-scroll-container": !0
            }, r.createElement(l, {
              data: i,
              height: l.DEFAULT_HEIGHT,
              extraItems: 4
            }))
          } else t = r.createElement(d.Archived, null);
          return r.createElement(s, {
            id: "blocked",
            onCancel: this.onClose
          }, r.createElement(a, {
            title: l10n.t("archived_flow_title"),
            onBack: this.onClose,
            type: a.Type.LARGE
          }), r.createElement(c, null, t))
        }
      });
    e.exports = g
  },
  937: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(800),
      s = n(802),
      a = n(801),
      c = n(804),
      l = n(809),
      d = n(806),
      u = n(352),
      p = n(105),
      h = n(873),
      m = r.createClass({
        displayName: "BlockedDrawer",
        mixins: [p],
        componentWillMount: function() {
          this.addObserver(Store.Blocklist, "add remove")
        },
        onBlockConfirm: function(e) {
          e.setBlock(!0)["catch"](_.noop), i.closeModal()
        },
        onBlock: function(e) {
          var t = function(e) {
            return Store.Contact.isFilteredContact(e) ? Store.Blocklist.get(e.id) ? l10n.t("participant_already_blocked") : !0 : !1
          };
          i.openModal(r.createElement(h, {
            title: l10n.t("add_blocked_title"),
            filter: t,
            onCancel: i.closeModal.bind(i),
            onSelect: this.onBlockConfirm
          }))
        },
        onUnblockConfirm: function(e) {
          e.setBlock(!1)["catch"](_.noop), i.closeModal()
        },
        onUnblockCancel: function() {
          i.closeModal()
        },
        onUnblock: function(e, t) {
          i.openModal(r.createElement(u, {
            okText: l10n.t("unblock_button"),
            onOK: this.onUnblockConfirm.bind(this, t),
            cancelText: l10n.t("web_cancel"),
            onCancel: this.onUnblockCancel
          }, l10n.t("unblock_confirmation", {
            contact: t.formattedName
          })))
        },
        onClose: function() {
          i.closeDrawer(this.props.type)
        },
        render: function() {
          var e = this,
            t = void 0,
            n = void 0;
          if (Store.Blocklist.length > 0) {
            var i = Store.Blocklist.map(function(t) {
              return r.createElement(d, {
                contact: t.contact,
                key: t.contact.id,
                onClick: e.onUnblock,
                onDelete: e.onUnblock
              })
            });
            t = r.createElement("div", {
              className: "drawer-section-main chatlist",
              "data-list-scroll-container": !0
            }, r.createElement(c, {
              data: i,
              height: c.DEFAULT_HEIGHT,
              extraItems: 4
            })), n = r.createElement("div", {
              className: "hint"
            }, l10n.t("add_blocked_description"))
          } else t = r.createElement(l.Blocked, null);
          return r.createElement(o, {
            id: "blocked",
            onCancel: this.onClose
          }, r.createElement(s, {
            title: l10n.t("blocked_flow_title"),
            onBack: this.onClose,
            type: s.Type.LARGE
          }), r.createElement(a, null, r.createElement("div", {
            className: "list-action",
            onClick: this.onBlock
          }, r.createElement("div", {
            className: "list-action-icon"
          }, r.createElement("span", {
            className: "icon icon-add-user"
          })), r.createElement("div", {
            className: "list-action-body"
          }, l10n.t("add_blocked_title"))), t, n))
        }
      });
    e.exports = m
  },
  938: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(839),
      o = n(871),
      s = n(8),
      a = r.createClass({
        displayName: "CaptureModal",
        propTypes: {
          onSend: r.PropTypes.func.isRequired,
          stream: r.PropTypes.object.isRequired
        },
        onCancel: function() {
          s.closeModal()
        },
        onSend: function(e) {
          this.props.onSend(e.file), this.onCancel()
        },
        render: function() {
          return r.createElement(i, {
            type: i.BOX
          }, r.createElement(o, {
            onBack: this.onCancel,
            caption: !1,
            onSend: this.onSend,
            stream: this.props.stream,
            noContainer: !0
          }))
        }
      });
    e.exports = a
  },
  939: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(28),
      o = n(839),
      s = n(8),
      a = n(800),
      c = n(802),
      l = n(801),
      d = n(107),
      u = n(820),
      p = n(816),
      h = n(806),
      m = n(804),
      f = n(809),
      g = n(82),
      v = n(808),
      y = n(159),
      E = y.HotKeys,
      T = n(43),
      b = {
        RECENT: "recent",
        GROUPS: "groups",
        CONTACTS: "contacts"
      },
      S = r.createClass({
        displayName: "ChatModal",
        propTypes: {
          title: r.PropTypes.string,
          onChat: r.PropTypes.func.isRequired,
          selectedTab: r.PropTypes.oneOf(_.values(b)),
          onSelectTab: r.PropTypes.func
        },
        getInitialState: function() {
          return {
            searchText: "",
            selected: this.props.selectedTab || b.RECENT
          }
        },
        componentWillMount: function() {
          this.selection = new v(this.getData(), function(e) {
            return e.id
          })
        },
        onSelectTab: function(e) {
          var t = this,
            n = _.values(b).indexOf(this.state.selected),
            r = _.values(b).indexOf(e),
            i = r > n ? "right" : "left";
          this.tabSelected = !0, this.setState({
            searchText: "",
            selected: e,
            direction: i
          }, function() {
            delete t.tabSelected
          }), this.props.onSelectTab && this.props.onSelectTab(e)
        },
        getFilteredChats: function() {
          var e = this.state.searchText;
          return e ? (e = l10n.accentFold(e), Store.Chat.filter(function(t) {
            return t.contact.searchMatch(e) && !t.isNewlyCreated()
          })) : Store.Chat.filter(function(e) {
            return !e.isNewlyCreated()
          })
        },
        getFilteredGroups: function() {
          var e = this.state.searchText;
          return e ? (e = l10n.accentFold(e), Store.Chat.filter(function(t) {
            return t.isGroup && t.contact.searchMatch(e) && !t.isNewlyCreated()
          })) : Store.Chat.filter(function(e) {
            return e.isGroup && !e.isNewlyCreated()
          })
        },
        getFilteredContacts: function() {
          var e = Store.Contact.getFilteredContacts(),
            t = this.state.searchText;
          return t ? (t = l10n.accentFold(t), e.filter(function(e) {
            return e.searchMatch(t)
          })) : e
        },
        getData: function() {
          switch (this.state.selected) {
            case b.CONTACTS:
              return this.getFilteredContacts();
            case b.GROUPS:
              return this.getFilteredGroups();
            case b.RECENT:
              return this.getFilteredChats()
          }
        },
        getList: function() {
          var e, t = this;
          switch (this.state.selected) {
            case b.CONTACTS:
              e = this.getFilteredContacts(), e = e.map(function(e) {
                return r.createElement(h, {
                  active: t.selection,
                  contact: e,
                  onClick: t.forwardToContact,
                  secondary: e.isBlocked() ? l10n.t("confirm_unblock_contact_and_forward_text") : null,
                  key: e.id
                })
              });
              break;
            case b.GROUPS:
              e = this.getFilteredGroups(), e = e.map(function(e) {
                return r.createElement(p, {
                  active: t.selection,
                  chat: e,
                  mode: p.Mode.INFO,
                  noContext: !0,
                  onClick: t.forwardToChat,
                  key: e.id
                })
              });
              break;
            case b.RECENT:
              e = this.getFilteredChats(), e = e.map(function(e) {
                return e.isGroup ? r.createElement(p, {
                  active: t.selection,
                  chat: e,
                  mode: p.Mode.INFO,
                  noContext: !0,
                  onClick: t.forwardToChat,
                  key: e.id
                }) : r.createElement(h, {
                  active: t.selection,
                  contact: e.contact,
                  onClick: t.forwardToContact,
                  secondary: e.contact.isBlocked() ? l10n.t("confirm_unblock_contact_and_forward_text") : null,
                  key: e.id
                })
              })
          }
          return 0 === e.length ? null : r.createElement(m, {
            data: e,
            ref: "list",
            scrollTop: this.tabSelected ? 0 : void 0,
            height: 72,
            extraItems: 4
          })
        },
        getTabs: function() {
          var e = this;
          return [{
            tab: b.RECENT,
            title: l10n.t("web_recent_chats")
          }, {
            tab: b.GROUPS,
            title: l10n.t("web_groups")
          }, {
            tab: b.CONTACTS,
            title: l10n.t("web_contacts")
          }].map(function(t) {
            var n = T("menu-item", {
              active: e.state.selected === t.tab
            });
            return r.createElement("button", {
              className: n,
              onClick: e.onSelectTab.bind(null, t.tab),
              key: t.tab,
              title: t.title
            }, t.title)
          })
        },
        forwardToContact: function(e, t) {
          Store.Chat.find(t.id).then(this.forwardToChat.bind(this, e))
        },
        forwardToChat: function(e, t) {
          this.props.onChat(t)
        },
        onSearch: function(e) {
          this.setState({
            searchText: e
          })
        },
        onStopSearch: function() {
          this.setState({
            searchText: ""
          })
        },
        onCancel: function() {
          s.closeModal()
        },
        onSelectFirst: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = _.first(this.getData());
          t && this.forwardToContact(e, t)
        },
        onFocusList: function(e) {
          e.preventDefault(), e.stopPropagation(), E.flashFocus = Date.now(), this.selection.setFirst()
        },
        indicateSearchFocus: function(e) {
          if (this.selection.unset(), !(Date.now() - (E.flashFocus || 0) > 200)) {
            var t = i.findDOMNode(this.refs.search);
            Velocity(t, "stop"), Velocity(t, {
              backgroundColor: ["#fbfbfb", "#D9F3FF"]
            }, {
              duration: 1600,
              easing: [.19, .69, .01, .99]
            })
          }
        },
        onListFocus: function(e) {
          e.target === i.findDOMNode(this.refs.list) && (this.selection.index < 0 ? this.selection.setFirst() : this.selection.reset())
        },
        onNext: function(e) {
          e.preventDefault(), e.stopPropagation(), this.selection.setNext()
        },
        onPrev: function(e) {
          e.stopPropagation(), e.preventDefault();
          var t = this.selection.prev();
          t > -1 ? this.selection.setPrev() : (this.selection.unset(), E.flashFocus = Date.now(), this.refs.search.focus())
        },
        render: function() {
          var e = this.getList();
          if (this.selection.init(this.getData()), !e)
            if (this.state.searchText) e = r.createElement(f.Search, null);
            else switch (this.state.selected) {
              case b.CONTACTS:
                e = r.createElement(f.ListContacts, null);
                break;
              case b.GROUPS:
                e = r.createElement(f.ListGroups, null);
                break;
              case b.RECENT:
                e = r.createElement(f.List, null)
            }
            var t = "right" === this.state.direction ? "slide-forward" : "slide-back",
              n = {
                down: this.onFocusList,
                enter: this.onSelectFirst
              },
              i = {
                down: this.onNext,
                up: this.onPrev
              };
          return r.createElement(o, {
            type: o.TOWER
          }, r.createElement(a, {
            key: "chat-modal",
            onCancel: this.onCancel
          }, r.createElement(c, {
            title: this.props.title,
            type: c.Type.POPUP,
            onCancel: this.onCancel
          }), r.createElement("div", {
            className: "menu-tabs menu-tabs-lists",
            "data-active-tab": this.state.selected
          }, this.getTabs()), r.createElement(E, {
            handlers: n,
            onFocus: this.indicateSearchFocus
          }, r.createElement(u, {
            ref: "search",
            searchText: this.state.searchText,
            onSearch: this.onSearch,
            key: this.state.selected,
            searchType: g.CHAT_SEARCH,
            placeholder: l10n.t("search")
          })), r.createElement(l, {
            "data-list-scroll-container": !0
          }, r.createElement(d, {
            transitionName: t,
            className: "column"
          }, r.createElement(E, {
            handlers: i,
            onFocus: this.onListFocus,
            "data-tab": 3,
            className: "column",
            ref: "list",
            key: this.state.selected
          }, r.createElement("div", {
            className: "chatlist column"
          }, e))))))
        }
      });
    e.exports = S
  },
  940: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(355),
      o = n(799),
      s = n(8),
      a = n(83),
      c = n(834),
      l = n(798),
      d = n(352),
      u = r.createClass({
        displayName: "ClearChatPopup",
        propTypes: {
          onCancel: r.PropTypes.func,
          onDeleteOrExit: r.PropTypes.func,
          chat: r.PropTypes.instanceOf(o).isRequired
        },
        getInitialState: function() {
          return {
            keepStarred: !0
          }
        },
        getText: function() {
          var e = this.props.chat;
          switch (e.kind) {
            case o.KIND.GROUP:
              return l10n.t("clear_chat_group", {
                name: e.formattedTitle
              });
            case o.KIND.CHAT:
              return l10n.t("clear_chat_chat", {
                name: e.formattedTitle
              });
            case o.KIND.BROADCAST:
              return l10n.t("clear_chat_broadcast");
            default:
              return ""
          }
        },
        onCancel: function() {
          s.closeModal()
        },
        onClear: function() {
          var e = this.props.chat;
          e.pendingAction++, e.sendClear(a.supportsFeature(a.F.STARRED) && a.supportsFeature(a.F.CHAT_CLEAR_STARRED) && this.state.keepStarred)["finally"](function() {
            e.pendingAction--
          }), s.closeModal()
        },
        onToggleStarred: function() {
          this.setState({
            keepStarred: !this.state.keepStarred
          })
        },
        render: function() {
          var e = void 0;
          return a.supportsFeature(a.F.STARRED) && a.supportsFeature(a.F.CHAT_CLEAR_STARRED) && (e = r.createElement("div", {
            className: "section",
            onClick: this.onToggleStarred
          }, r.createElement("div", {
            "data-a8n": i.key("menu-icon-clear-chat"),
            className: "section-control"
          }, r.createElement(c, {
            onChange: this.onToggleStarred,
            checked: this.state.keepStarred
          })), r.createElement("div", {
            className: "section-label"
          }, l10n.t("keep_starred")))), r.createElement(d, {
            title: l10n.t("are_you_sure"),
            onOK: this.onClear,
            okText: l10n.t("clear_button"),
            onCancel: this.onCancel
          }, r.createElement("div", null, r.createElement(l, {
            text: this.getText()
          }), e))
        }
      });
    e.exports = u
  },
  941: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(800),
      o = n(802),
      s = n(801),
      a = n(854),
      c = n(820),
      l = n(158),
      d = n(82),
      u = n(159),
      p = u.HotKeys,
      h = r.createClass({
        displayName: "ContactDrawer",
        mixins: [l],
        propTypes: {
          onBack: r.PropTypes.func.isRequired,
          onClick: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            searchText: "",
            cancelSearch: !1,
            active: !1
          }
        },
        componentDidMount: function() {
          this.safeDefer(function(e) {
            e.setState({
              active: !0
            })
          }, this)
        },
        getFilteredContacts: function() {
          var e = Store.Contact.getFilteredContacts(),
            t = this.state.searchText;
          return t ? (t = l10n.accentFold(t), e.filter(function(e) {
            return e.searchMatch(t)
          })) : e
        },
        uimClose: function() {
          return this.searchText ? (this.setState({
            searchText: "",
            cancelSearch: !0
          }), !0) : !1
        },
        onSearch: function(e) {
          this.setState({
            searchText: e
          })
        },
        onFocusList: function(e) {
          this.refs.list && (e.preventDefault(), e.stopPropagation(), p.flashFocus = Date.now(), this.refs.list.focusFirst())
        },
        onSelectFirst: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = _.first(this.getFilteredContacts());
          t && (p.flashFocus = Date.now(), this.props.onClick(e, t))
        },
        onFocusSearch: function(e) {
          p.flashFocus = Date.now(), this.refs.search.focus()
        },
        render: function() {
          var e = this.state.active ? r.createElement(a, {
              ref: "list",
              contacts: this.getFilteredContacts(),
              onFocusSearch: this.onFocusSearch,
              onClick: this.props.onClick
            }) : null,
            t = {
              down: this.onFocusList,
              enter: this.onSelectFirst
            };
          return r.createElement(i, {
            key: "contact-modal",
            onCancel: this.props.onBack
          }, r.createElement(o, {
            title: this.props.title,
            type: o.Type.LARGE,
            onBack: this.props.onBack
          }), r.createElement(p, {
            handlers: t
          }, r.createElement(c, {
            ref: "search",
            searchText: this.state.searchText,
            isSearching: !this.state.cancelSearch,
            onSearch: this.onSearch,
            searchType: d.CONTACT_SEARCH,
            placeholder: l10n.t("search_contacts")
          })), r.createElement(s, {
            "data-list-scroll-container": !0
          }, e))
        }
      });
    e.exports = h
  },
  942: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(105),
      s = n(800),
      a = n(802),
      c = n(801),
      l = n(814),
      d = n(885),
      u = n(823),
      p = n(160),
      h = n(810),
      m = n(796),
      f = n(43),
      g = r.createClass({
        displayName: "ContactMsgInfoDrawer",
        mixins: [o],
        propTypes: {
          msg: r.PropTypes.instanceOf(m)
        },
        getInitialState: function() {
          return {
            msgInfo: void 0
          }
        },
        componentWillMount: function() {
          var e = this;
          Store.MsgInfo.find(this.props.msg).then(function(t) {
            e.setState({
              msgInfo: t
            }), e.addObserver(t, "change:playedRemaining change:readRemaining change:deliveryRemaining")
          })["catch"](function() {
            e.setState({
              unimplemented: !0
            }), i.openToast(r.createElement(h, {
              msg: l10n.t("msg_info_failed"),
              id: h.genId("msg_info_failed")
            }))
          })
        },
        componentDidMount: function() {
          this.props.msg.type === m.TYPE.IMAGE && (this.refs.scrollable.scrollTop = this.refs.scrollable.scrollHeight)
        },
        onClose: function() {
          i.closeDrawer(this.props.type)
        },
        render: function() {
          var e = this.props.msg,
            t = this.state,
            n = t.msgInfo,
            i = t.unimplemented,
            o = void 0,
            h = void 0;
          if (n) {
            var g = [],
              v = void 0,
              y = void 0,
              E = void 0;
            n.isPTT && (h = l10n.t("message_info_seen"), v = n.played.first(), y = v && v.t, E = r.createElement("span", {
              className: "icon icon-status icon-status-ptt-blue"
            }), g.push(r.createElement(d, {
              title: l10n.t("message_info_played"),
              t: y,
              icon: E,
              key: "played"
            }))), v = n.read.first(), y = v && v.t, E = r.createElement("span", {
              className: "icon icon-status icon-status-dblcheck-ack"
            }), h = h || l10n.t("message_info_read"), g.push(r.createElement(d, {
              title: h,
              t: y,
              icon: E,
              key: "read"
            })), v = n.delivery.first(), y = v && v.t, E = r.createElement("span", {
              className: "icon icon-status icon-status-dblcheck"
            }), g.push(r.createElement(d, {
              title: l10n.t("message_info_delivered"),
              t: y,
              icon: E,
              key: "delivery"
            })), o = r.createElement(l, {
              classes: "drawer-section-info well animate-enter"
            }, g)
          }
          var _ = void 0;
          n || i || (_ = r.createElement(l, {
            classes: "drawer-section-spinner",
            key: "spinner"
          }, r.createElement(p, {
            size: 50,
            stroke: 4
          })));
          var T = f("pane-preview-wrapper", "pane-preview-wrapper-bg", {
            "pane-preview-resize": e.type === m.TYPE.PTT || e.type === m.TYPE.IMAGE || e.type === m.TYPE.LOCATION || e.type === m.TYPE.VCARD
          });
          return r.createElement(s, {
            key: "message-info-modal",
            id: "info",
            variant: "panel",
            onCancel: this.onClose
          }, r.createElement(a, {
            title: l10n.t("message_info"),
            type: a.Type.SMALL,
            onCancel: this.onClose
          }), r.createElement("div", {
            className: T,
            ref: "scrollable"
          }, r.createElement("div", {
            className: "pane-preview"
          }, r.createElement("div", {
            className: "pane-chat-tile"
          }), r.createElement(u, {
            msg: e,
            displayType: u.DisplayType.MSG_INFO,
            position: u.Position.END
          }))), r.createElement(c, {
            classes: "drawer-body-msg-info"
          }, _, o))
        }
      });
    e.exports = g
  },
  943: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(355),
      o = n(1),
      s = n(799),
      a = n(8),
      c = n(797),
      l = n(798),
      d = r.createClass({
        displayName: "DeleteChatPopup",
        mixins: [c],
        propTypes: {
          onCancel: r.PropTypes.func,
          onDeleteOrExit: r.PropTypes.func,
          chat: r.PropTypes.instanceOf(s).isRequired
        },
        getInitialState: function() {
          return {
            isReadOnly: this.async("chat.isReadOnly")
          }
        },
        getText: function() {
          var e = this.props.chat,
            t = e.formattedTitle;
          return e.isGroup ? this.state.isReadOnly ? l10n.t("web_delete_group_dialog_title", {
            groupName: t
          }) : l10n.t("web_exit_group_dialog_title", {
            groupName: t
          }) : e.isUser ? l10n.t("delete_chat_dialog_title", {
            name: t
          }) : e.isBroadcast ? l10n.t("delete_list_dialog_title") : void 0
        },
        getButton: function() {
          var e = this.props.chat;
          return e.isGroup ? this.state.isReadOnly ? l10n.t("web_delete") : l10n.t("web_exit") : e.isUser || e.isBroadcast ? l10n.t("web_delete") : void 0
        },
        onCancel: function() {
          a.closeModal(), _.isFunction(this.props.onCancel) && this.props.onCancel()
        },
        onDelete: function() {
          var e, t = this.props.chat;
          t.isGroup ? e = this.state.isReadOnly ? t.sendDelete() : t.sendExit() : t.isUser || t.isBroadcast ? e = t.sendDelete() : o.error("deleteChatPopup:onDelete Unsupported chat type")(), _.isFunction(this.props.onDeleteOrExit) && e && this.props.onDeleteOrExit(e), a.closeModal()
        },
        render: function() {
          return r.createElement("div", {
            className: "backdrop"
          }, r.createElement("div", {
            className: "popup-container"
          }, r.createElement("div", {
            className: "popup"
          }, r.createElement("div", {
            className: "popup-body"
          }, r.createElement("div", {
            className: "popup-title"
          }, l10n.t("are_you_sure")), r.createElement("div", {
            className: "popup-contents"
          }, r.createElement(l, {
            text: this.getText()
          }))), r.createElement("div", {
            className: "popup-controls"
          }, r.createElement("button", {
            "data-a8n": i.key("cancel-btn"),
            className: "btn-plain popup-controls-item",
            onClick: this.onCancel
          }, l10n.t("web_cancel")), r.createElement("button", {
            "data-a8n": i.key("delete-btn"),
            className: "btn-plain btn-default popup-controls-item",
            onClick: this.onDelete
          }, this.getButton())))))
        }
      });
    e.exports = d
  },
  944: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(355),
      o = n(1),
      s = n(8),
      a = n(834),
      c = n(352),
      l = n(810),
      d = {
        title: 0,
        hour: 1,
        day: 24,
        week: 168
      },
      u = r.createClass({
        displayName: "DoNotDisturbPopup",
        getInitialState: function() {
          return {
            notifications: Store.Mute.getGlobalNotifications(),
            sounds: Store.Mute.getGlobalSounds(),
            previews: Store.Mute.getGlobalPreviews(),
            dnd: d.title
          }
        },
        componentWillUnmount: function() {
          this.state.dnd !== d.title && s.openToast(r.createElement(l, {
            msg: this.globalMuteDurationLabel(this.state.dnd),
            id: l.genId()
          }))
        },
        globalMuteDurationLabel: function(e) {
          switch (this.state.dnd) {
            case 1:
              return l10n.t("global_muted_1hour");
            case 24:
              return l10n.t("global_muted_1day");
            case 168:
              return l10n.t("global_muted_1week");
            default:
              return o.log("DoNotDisturbPopup:globalMuteDurationLabel non standard global mute duration:" + e)(), l10n.t("global_muted")
          }
        },
        onSounds: function() {
          var e = !this.state.sounds;
          this.setState({
            sounds: e
          }), Store.Mute.setGlobalSounds(e)
        },
        onNotifications: function() {
          var e = !this.state.notifications;
          this.setState({
            notifications: e
          }), Store.Mute.setGlobalNotifications(e)
        },
        onPreviews: function() {
          var e = !this.state.previews;
          this.setState({
            previews: e
          }), Store.Mute.setGlobalPreviews(e)
        },
        onDND: function(e) {
          var t = parseInt(e.target.value, 10);
          if (0 === t) return this.setState({
            dnd: d.title
          }), void Store.Mute.globalMute().unmute();
          this.setState({
            dnd: t
          });
          var n = moment().unix() + 60 * e.target.value * 60;
          Store.Mute.globalMute().mute(n)
        },
        onClose: function(e) {
          s.closeModal()
        },
        render: function() {
          var e = window.Notification ? [r.createElement("div", {
            className: "section",
            onClick: this.onNotifications,
            key: 0
          }, r.createElement("div", {
            "data-a8n": i.key("menu-icon-notifications"),
            className: "section-control"
          }, r.createElement(a, {
            onChange: this.onNotifications,
            checked: this.state.notifications
          })), r.createElement("div", {
            className: "section-label"
          }, l10n.t("option_desktop_notifications"))), r.createElement("div", {
            className: "section",
            onClick: this.onPreviews,
            key: 1
          }, r.createElement("div", {
            "data-a8n": i.key("menu-icon-notifications"),
            className: "section-control"
          }, r.createElement(a, {
            onChange: this.onPreviews,
            checked: this.state.previews
          })), r.createElement("div", {
            className: "section-label"
          }, l10n.t("option_msg_previews"), r.createElement("div", {
            className: "hint"
          }, l10n.t("option_msg_previews_hint_text"))))] : null;
          return r.createElement(c, {
            title: l10n.t("menuitem_notifications"),
            okText: l10n.t("web_ok"),
            onOK: this.onClose
          }, r.createElement("div", {
            className: "section",
            onClick: this.onSounds
          }, r.createElement("div", {
            "data-a8n": i.key("menu-icon-notifications"),
            className: "section-control"
          }, r.createElement(a, {
            onChange: this.onSounds,
            checked: this.state.sounds
          })), r.createElement("div", {
            className: "section-label"
          }, l10n.t("option_sounds"))), e, r.createElement("div", {
            className: "section"
          }, r.createElement("div", {
            className: "select"
          }, r.createElement("select", {
            value: this.state.dnd,
            onChange: this.onDND
          }, r.createElement("option", {
            value: d.title,
            disabled: this.state.state === d.title
          }, l10n.t("option_select_mute")), r.createElement("option", {
            value: d.hour,
            disabled: this.state.state === d.hour
          }, l10n.t("mute_1hour")), r.createElement("option", {
            value: d.day,
            disabled: this.state.state === d.day
          }, l10n.t("mute_1day")), r.createElement("option", {
            value: d.week,
            disabled: this.state.state === d.week
          }, l10n.t("mute_1week"))))))
        }
      });
    e.exports = u
  },
  945: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(43),
      o = r.createClass({
        displayName: "DrawerSectionFooter",
        propTypes: {
          children: r.PropTypes.node.isRequired,
          separator: r.PropTypes.bool
        },
        getDefaultProps: function() {
          return {
            separator: !0
          }
        },
        render: function() {
          var e = i("drawer-section-footer", {
            separator: this.props.separator
          });
          return r.createElement("div", {
            className: e
          }, r.createElement("div", {
            className: "col-main"
          }, this.props.children))
        }
      });
    e.exports = o
  },
  946: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(105),
      s = n(800),
      a = n(802),
      c = n(801),
      l = n(814),
      d = n(945),
      u = n(886),
      p = n(823),
      h = n(160),
      m = n(810),
      f = n(796),
      g = n(833),
      v = n(43),
      y = r.createClass({
        displayName: "GroupMsgInfoDrawer",
        mixins: [o],
        propTypes: {
          msg: r.PropTypes.instanceOf(f)
        },
        getInitialState: function() {
          return {
            msgInfo: void 0
          }
        },
        componentWillMount: function() {
          var e = this;
          Store.MsgInfo.find(this.props.msg).then(function(t) {
            e.setState({
              msgInfo: t
            }), e.addObserver(t.played, "add remove"), e.addObserver(t.read, "add remove"), e.addObserver(t.delivery, "add remove"), e.addObserver(t, "change:playedRemaining change:readRemaining change:deliveryRemaining")
          })["catch"](function() {
            e.setState({
              unimplemented: !0
            }), i.openToast(r.createElement(m, {
              msg: l10n.t("msg_info_failed"),
              id: m.genId("msg_info_failed")
            }))
          })
        },
        getAnimateEnterClass: function(e) {
          return "animate-enter" + (-1 === e ? "" : e)
        },
        componentDidMount: function() {
          this.props.msg.type === f.TYPE.IMAGE && (this.refs.scrollable.scrollTop = this.refs.scrollable.scrollHeight)
        },
        onClose: function() {
          i.closeDrawer(this.props.type)
        },
        render: function() {
          var e, t = this.props.msg,
            n = this.state,
            i = n.msgInfo,
            o = n.unimplemented,
            m = -1,
            y = 24,
            E = 26,
            _ = void 0,
            T = void 0;
          if (i && i.isPTT) {
            var b = r.createElement("span", {
                className: "icon icon-status-ptt-blue"
              }),
              S = i.played.map(function(e) {
                return r.createElement(u, {
                  participant: e,
                  key: e.id
                })
              }),
              M = S.length > 0 ? r.createElement("div", {
                className: "chatlist-plain"
              }, S) : null,
              C = i.playedRemaining > 0 ? r.createElement(d, {
                separator: 0 !== i.played.length
              }, l10n.t("message_info_remaining", {
                count: i.playedRemaining,
                _plural: i.playedRemaining
              })) : null,
              w = v(this.getAnimateEnterClass(m), {
                "drawer-section-bottom": !(i && i.deliveryRemaining > 0 || i && !(i.played.length > 0 && 0 === i.readRemaining))
              });
            T = l10n.t("message_info_seen_by"), e = C ? y + E : y, k = g.minHeight(S, e), _ = r.createElement(l, {
              classes: w,
              key: "played-section",
              expands: !0,
              style: k,
              title: l10n.t("message_info_played_by"),
              subtitle: b,
              footer: C
            }, M)
          }
          var N = void 0;
          if (i && (i.read.length > 0 || i.playedRemaining > 0)) {
            var P = r.createElement("span", {
                className: "icon icon-status-dblcheck-ack"
              }),
              S = i.read.map(function(e) {
                return r.createElement(u, {
                  participant: e,
                  key: e.id
                })
              }),
              M = S.length > 0 ? r.createElement("div", {
                className: "chatlist-plain"
              }, S) : null,
              C = i.readRemaining > 0 ? r.createElement(d, {
                separator: 0 !== i.read.length
              }, l10n.t("message_info_remaining", {
                count: i.readRemaining,
                _plural: i.readRemaining
              })) : null,
              R = v(this.getAnimateEnterClass(m), {
                "drawer-section-bottom": !(i && i.deliveryRemaining > 0)
              });
            T = T || l10n.t("message_info_read_by"), e = C ? y + E : y;
            var k = g.minHeight(S, e);
            N = r.createElement(l, {
              classes: R,
              key: "read-section",
              expands: !0,
              title: T,
              style: k,
              subtitle: P,
              footer: C
            }, M)
          }
          var x = void 0;
          if (i && (i.delivery.length > 0 || i.deliveryRemaining > 0)) {
            var D = r.createElement("span", {
                className: "icon icon-status-dblcheck"
              }),
              S = i.delivery.map(function(e) {
                return r.createElement(u, {
                  participant: e,
                  key: e.id
                })
              }),
              M = S.length > 0 ? r.createElement("div", {
                className: "chatlist-plain"
              }, S) : null,
              C = i.deliveryRemaining > 0 ? r.createElement(d, {
                separator: 0 !== i.delivery.length
              }, l10n.t("message_info_remaining", {
                count: i.deliveryRemaining,
                _plural: i.deliveryRemaining
              })) : null,
              A = v(this.getAnimateEnterClass(m), "drawer-section-bottom");
            e = C ? y + E : y, k = g.minHeight(S, e), x = r.createElement(l, {
              classes: A,
              key: "delivered-section",
              expands: !0,
              style: k,
              title: l10n.t("message_info_delivered_to"),
              subtitle: D,
              footer: C
            }, M)
          }
          var I = void 0;
          i || o || (I = r.createElement(l, {
            classes: "drawer-section-spinner",
            key: "spinner"
          }, r.createElement(h, {
            size: 50,
            stroke: 4
          })));
          var O = v("pane-preview-wrapper", "pane-preview-wrapper-bg", {
            "pane-preview-resize": t.type === f.TYPE.PTT || t.type === f.TYPE.IMAGE || t.type === f.TYPE.LOCATION || t.type === f.TYPE.VCARD
          });
          return r.createElement(s, {
            key: "message-info-modal",
            id: "info",
            variant: "panel",
            onCancel: this.onClose
          }, r.createElement(a, {
            title: l10n.t("message_info"),
            type: a.Type.SMALL,
            onCancel: this.onClose
          }), r.createElement("div", {
            className: O,
            ref: "scrollable"
          }, r.createElement("div", {
            className: "pane-preview"
          }, r.createElement("div", {
            className: "pane-chat-tile"
          }), r.createElement(p, {
            msg: t,
            displayType: p.DisplayType.MSG_INFO,
            position: p.Position.END
          }))), r.createElement(c, {
            classes: "drawer-body-msg-info"
          }, I, _, N, x))
        }
      });
    e.exports = y
  },
  947: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(875),
      c = n(799),
      l = n(816),
      d = n(808),
      u = n(809),
      p = s.createClass({
        displayName: "GroupsModal",
        propTypes: {
          chats: s.PropTypes.arrayOf(s.PropTypes.instanceOf(c)),
          filter: s.PropTypes.func,
          onCancel: s.PropTypes.func.isRequired,
          onGroup: s.PropTypes.func.isRequired
        },
        getDefaultProps: function() {
          return {
            filter: function() {
              return !0
            }
          }
        },
        getInitialState: function() {
          return this.selection = new d, {
            loading: !0,
            searchFilter: void 0
          }
        },
        componentWillMount: function() {
          var e = this,
            t = this.props.chats;
          o["default"].delay(300).then(function() {
            var e = _(t).filter(function(e) {
              return e.groupMetadata.stale
            }).map(function(e) {
              return e.groupMetadata.update()["catch"](_.noop)
            }).value();
            return o["default"].all(e)
          }).then(function() {
            return e.setState({
              loading: !1
            })
          })
        },
        onSelect: function(e, t) {
          var n = t.props.chat;
          this.props.filter(n) === !0 && this.props.onGroup(t.props.chat)
        },
        onSearch: function(e) {
          this.setState({
            searchFilter: e
          })
        },
        render: function() {
          var e = this,
            t = this.props,
            n = t.chats,
            r = t.onGroup,
            i = t.filter,
            o = t.onCancel,
            c = void 0;
          return this.state.loading ? c = s.createElement(u.Loading, null) : ! function() {
            var t = l10n.accentFold(e.state.searchFilter),
              o = n.filter(function(e) {
                return i(e) && (!t || t && e.contact.searchMatch(t))
              });
            o.length ? (e.selection.init(_.pluck(o.filter(function(e) {
              return i(e) === !0
            }), "id")), c = o.map(function(t) {
              var n = void 0,
                o = void 0;
              return _.isString(i(t)) && (n = s.createElement("div", {
                className: "chat-status ellipsify",
                title: i(t)
              }, i(t)), o = "member"), s.createElement(l, {
                chat: t,
                mode: l.Mode.INFO,
                active: e.selection,
                secondary: n,
                noContext: !0,
                className: o,
                onClick: _.isString(i(t)) ? void 0 : r.bind(null, t),
                key: t.id
              })
            })) : c = s.createElement(u.SearchGroups, null)
          }(), s.createElement(a, {
            title: l10n.t("web_groups"),
            selection: this.selection,
            onSearch: this.onSearch,
            searchPlaceholder: l10n.t("search_groups"),
            onSelect: this.onSelect,
            onCancel: o
          }, c)
        }
      });
    e.exports = p
  },
  948: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(28),
      c = n(61),
      l = n(796),
      d = n(797),
      u = n(106),
      p = n(84),
      h = n(798),
      m = n(805),
      f = n(821),
      g = n(904),
      v = n(855),
      y = n(817),
      E = n(822),
      T = n(82),
      b = n(8),
      S = n(838),
      M = n(352),
      C = n(157),
      w = n(16),
      N = n(21),
      P = n(842),
      R = n(43),
      k = 500,
      x = s.createClass({
        displayName: "MediaViewerModal",
        mixins: [d, p],
        propTypes: {
          msg: s.PropTypes.instanceOf(l).isRequired,
          zoomIn: s.PropTypes.bool,
          onBack: s.PropTypes.func.isRequired,
          onNext: s.PropTypes.func,
          onPrev: s.PropTypes.func
        },
        getInitialState: function() {
          return {
            urlState: this.async("msg.urlState"),
            url: this.async("msg.url")
          }
        },
        componentWillMount: function() {
          var e = this;
          T.push(this, T.MEDIA_VIEWER, {
            escapable: !0
          }), this.regCmd("open_chat", this.onClose), this.props.zoomIn && b.isMsgVisible(this.props.msg.id, function(t) {
            e.setState({
              zoomElement: t,
              style: t ? {
                transition: "transform 2s",
                visibility: "hidden"
              } : {}
            })
          })
        },
        onImageLoad: function(e) {
          var t = this.state.zoomElement,
            n = e.target;
          t && n && this.props.zoomIn && this.animateZoom(t, e.target)
        },
        animateZoom: function(e, t) {
          var n = this,
            r = t.getBoundingClientRect(),
            i = e.getBoundingClientRect(),
            o = i.top - r.top,
            s = i.left - r.left,
            a = e.clientWidth / t.clientWidth;
          this.setState({
            style: {
              visibility: "hidden",
              transform: "translateX(" + s + "px) translateY(" + o + "px) scale(" + a + ")",
              transition: "transform 0s"
            }
          }, function() {
            n.setState({
              style: {
                transform: "translateX(0px) translateY(0px) scale(1)",
                transition: "transform " + k + "ms cubic-bezier(.1,.82,.25,1)"
              }
            })
          })
        },
        stopPropagation: function(e) {
          w.startDownloading(), e.stopPropagation()
        },
        openForwardFlow: function(e) {
          e.stopPropagation();
          var t = this.props.msg;
          t.ack < 1 && t.isMMS && t.isSentByMe ? b.openModal(s.createElement(M, {
            title: l10n.t("err_unsent_forward_title"),
            onOK: b.closeModal.bind(b),
            okText: l10n.t("web_ok")
          }, l10n.t("err_unsent_forward_text"))) : b.openModal(s.createElement(S, {
            msgs: [this.props.msg]
          }), "modal-flow")
        },
        onScroll: function(e) {
          this.onClose()
        },
        onClose: function() {
          T.find(T.MEDIA_VIEWER) && T.pop(T.MEDIA_VIEWER)
        },
        uimClose: function(e) {
          var t = this,
            n = void 0;
          if (this.state.zoomIn ? n = this.state.zoomElement : b.isMsgVisible(this.props.msg.id, function(e) {
              n = e
            }), !n) return this.props.onBack();
          var r = this.refs.mediaImage,
            i = r && r.refs ? r.refs.image : null;
          if (!i) return this.props.onBack();
          i = a.findDOMNode(i);
          var o = i.getBoundingClientRect(),
            s = n.getBoundingClientRect(),
            c = s.top - o.top,
            l = s.left - o.left,
            d = n.clientWidth / i.clientWidth;
          Velocity(i, {
            translateX: [l, 0],
            translateY: [c, 0],
            scale: [d, 1]
          }, {
            duration: 200,
            easing: [.1, .82, .25, 1]
          }).then(function() {
            t.props.onBack()
          })
        },
        render: function() {
          var e, t = this.props.msg;
          switch (t.type) {
            case "image":
              e = s.createElement(D, {
                msg: t,
                key: t.id,
                style: this.state.style,
                ref: "mediaImage",
                onLoad: this.onImageLoad
              });
              break;
            case "video":
              e = s.createElement(A, {
                msg: t,
                key: t.id
              });
              break;
            case "audio":
              e = s.createElement(O, {
                msg: t,
                key: t.id
              })
          }
          var n = this.props.onNext ? s.createElement("button", {
              className: "btn btn-round btn-media-next",
              onClick: this.props.onNext
            }, s.createElement("span", {
              className: "icon icon-chevron-right icon-l",
              title: l10n.t("next_button")
            }, l10n.t("next_button"))) : s.createElement("div", {
              className: "btn-media-next"
            }),
            r = this.props.onPrev ? s.createElement("button", {
              className: "btn btn-round btn-media-prev",
              onClick: this.props.onPrev
            }, s.createElement("span", {
              className: "icon icon-chevron-left icon-l",
              title: l10n.t("previous_button")
            }, l10n.t("previous_button"))) : s.createElement("div", {
              className: "btn-media-prev"
            }),
            i = null;
          (!t.isEncryptedMedia && [l.URL_STATE.URL, l.URL_STATE.STATUS_200].indexOf(this.state.urlState) > -1 || t.isEncryptedMedia && c.isBlob(this.state.url)) && (i = s.createElement("div", {
            className: "menu-item"
          }, s.createElement("a", {
            className: "icon icon-download",
            title: l10n.t("web_button_download"),
            onClick: this.stopPropagation,
            download: t.filename ? t.filename : !0,
            href: this.state.url
          }, l10n.t("web_button_download"))));
          var o = t.displayName(!0, !0);
          t.isGroupMsg && (o += " @ " + t.chat.formattedTitle);
          var a = R("media-viewer", {
              "media-viewer-animate": this.props.zoomIn
            }),
            d = R("media-panel-header", {});
          return s.createElement("div", {
            className: a,
            onWheel: this.onScroll,
            onClick: this.onClose
          }, s.createElement("div", {
            className: d
          }, s.createElement("div", {
            className: "chat media-chat"
          }, s.createElement("div", {
            className: "chat-avatar"
          }, s.createElement(m, {
            id: t.sender
          })), s.createElement("div", {
            className: "chat-body"
          }, s.createElement("div", {
            className: "chat-main"
          }, s.createElement(h, {
            text: o
          })), s.createElement("div", {
            className: "chat-secondary"
          }, s.createElement("div", {
            className: "chat-status ellipsify"
          }, C.relativeDateAndTimeStr(t.t))))), s.createElement("div", {
            className: "menu menu-horizontal media-panel-tools"
          }, s.createElement("div", {
            className: "menu-item"
          }, s.createElement("span", {
            className: "icon btn-media-forward icon-forward",
            title: l10n.t("forward"),
            onClick: this.openForwardFlow
          }, l10n.t("forward"))), i, s.createElement("div", {
            className: "menu-item"
          }, s.createElement("button", {
            className: "icon icon-x-viewer",
            title: l10n.t("web_close"),
            onClick: this.onClose
          }, l10n.t("web_close"))))), s.createElement("div", {
            className: "media-content",
            dir: "ltr",
            ref: "container"
          }, r, s.createElement("div", {
            className: "media"
          }, s.createElement(L, {
            msg: t
          }), e), n))
        }
      }),
      D = s.createClass({
        displayName: "MediaImage",
        mixins: [d, u],
        propTypes: {
          msg: s.PropTypes.instanceOf(l).isRequired,
          onLoad: s.PropTypes.func
        },
        canLoad: function() {
          return _.contains([l.URL_STATE.URL, l.URL_STATE.STATUS_200], this.props.msg.urlState)
        },
        canRMR: function() {
          return _.contains([l.URL_STATE.NO_URL, l.URL_STATE.STATUS_ERR], this.props.msg.urlState)
        },
        getInitialState: function() {
          this.retry = 0;
          var e = this.props.msg,
            t = e.url;
          if (t)
            if (this.canLoad() && !c.isEncryptedMedia(e.url)) {
              var n = new Image;
              n.src = t, n.complete ? this.onPreloadLoad(n) : this.preloadImage(t)
            } else this.canRMR() && this.preloadImage(t);
          else c.isEncryptedMedia(e.clientUrl) && this.preloadImage(e.clientUrl);
          return {
            urlState: this.async("msg.urlState"),
            url: this.async("msg.url"),
            mediaKey: this.async("msg.mediaKey")
          }
        },
        componentDidMount: function() {
          this.regNativeListener(window, "online", this.ensureImageLoaded);
          var e = this.props.msg;
          e.urlState === l.URL_STATE.NO_URL && e.requestMediaReupload()["catch"](_.noop)
        },
        componentWillUpdate: function(e, t) {
          t.url === this.state.url && t.mediaKey === this.state.mediaKey || !this.canLoad() || !t.url || c.isEncryptedMedia(t.url) && !t.mediaKey || this.preloadImage(t.url)
        },
        ensureImageLoaded: function() {
          var e = this.props.msg;
          e.url && e.urlState !== l.URL_STATE.STATUS_200 && this.preloadImage(e.url)
        },
        preloadImage: function(e) {
          if (e) {
            this.preloadImagePromise && this.preloadImagePromise.cancel();
            var t = c.isEncryptedMedia(e) ? this.props.msg.decryptMedia()["catch"](N.MediaLoadError, function(e) {
                throw new N.ImageError("mediaLoadError", e.src)
              }) : o["default"].resolve(e),
              n = this.preloadImagePromise = t.then(function(t) {
                return new o["default"](function(n, r) {
                  var i = function(t) {
                      r(new N.ImageError("Image preload error", e))
                    },
                    o = new Image;
                  o.onload = function() {
                    n(o)
                  }, o.onerror = i, o.src = t
                })
              }).bind(this).cancellable().then(this.onPreloadLoad)["finally"](function() {
                n === this.preloadImagePromise && delete this.preloadImagePromise
              })["catch"](o["default"].CancellationError, _.noop)["catch"](N.ImageError, this.onPreloadError)
          }
        },
        onPreloadLoad: function(e) {
          var t = this.props.msg;
          t.set({
            fullWidth: e.naturalWidth,
            fullHeight: e.naturalHeight
          }), t.urlState200(e.src)
        },
        onPreloadError: function(e) {
          this.props.msg.mediaLoadError(e.src)
        },
        onImageLoad: function(e) {
          this.onPreloadLoad(e.target), this.props.onLoad && this.props.onLoad(e)
        },
        onImageClick: function(e) {
          e.stopPropagation()
        },
        render: function() {
          var e = this.props.msg,
            t = "media-viewer-img",
            n = e.fullWidth,
            r = e.fullHeight,
            i = n && r ? {
              width: n,
              height: r
            } : null;
          switch (this.state.urlState) {
            case l.URL_STATE.STATUS_200:
              return s.createElement(y, {
                type: y.TYPES.SCALE_DOWN,
                size: i,
                style: {
                  overflow: "visible"
                }
              }, s.createElement(f, {
                src: e.url,
                style: this.props.style,
                ref: "image",
                onLoad: this.onImageLoad,
                onClick: this.onImageClick,
                className: t
              }));
            default:
              return s.createElement(I, {
                msg: e
              })
          }
        }
      }),
      A = s.createClass({
        displayName: "MediaVideo",
        mixins: [d, u],
        propTypes: {
          msg: s.PropTypes.instanceOf(l).isRequired
        },
        getInitialState: function() {
          return this.retry = 0, {
            played: !1,
            urlState: this.async("msg.urlState"),
            mmsSrc: this.async("msg.mmsSrc")
          }
        },
        componentDidMount: function() {
          var e = this.props.msg;
          e.urlState === l.URL_STATE.NO_URL && e.requestMediaReupload()["catch"](_.noop)
        },
        onPlayerClick: function(e) {
          e.stopPropagation();
          var t = a.findDOMNode(this.refs.player);
          e.clientY > t.clientHeight + t.offsetTop - 44 || (t.paused ? t.play() : t.pause())
        },
        onPlayerPlay: function(e) {
          var t = e.target,
            n = this.props.msg;
          n.set({
            fullWidth: t.videoWidth,
            fullHeight: t.videoHeight
          }), n.urlState200(t.src), this.state.played || this.setState({
            played: !0
          })
        },
        render: function() {
          var e = this.props.msg,
            t = "media-viewer-img",
            n = e.fullWidth,
            r = e.fullHeight,
            i = n && r ? {
              width: n,
              height: r
            } : null;
          switch (this.state.urlState) {
            case l.URL_STATE.URL:
            case l.URL_STATE.STATUS_200:
              var o, a, c = s.createElement(y, {
                type: y.TYPES.SCALE_DOWN,
                size: i
              }, s.createElement(g, {
                msg: e,
                ref: "player",
                className: t,
                onPlay: this.onPlayerPlay,
                onClick: this.onPlayerClick,
                autoPlay: !0,
                controls: !0
              }, l10n.t("video_playback_not_supported")));
              return i || this.state.played || (o = {
                display: "none"
              }, a = s.createElement(I, {
                msg: e
              })), s.createElement("div", null, a, s.createElement("div", {
                style: o
              }, c));
            default:
              return s.createElement(I, {
                msg: e
              })
          }
        }
      }),
      I = s.createClass({
        displayName: "BlurredImage",
        render: function() {
          var e = this.props.msg,
            t = "data:image/jpeg;base64," + e.body,
            n = P.boundHeightWidth(10 * e.height, 10 * e.width, 500, 500),
            r = {
              width: n.width,
              height: n.height
            };
          return s.createElement("div", {
            className: "media-viewer-blur-crop",
            style: r
          }, s.createElement("img", {
            className: "media-viewer-blur-img",
            src: t
          }))
        }
      }),
      O = s.createClass({
        displayName: "MediaAudio",
        mixins: [d, u],
        propTypes: {
          msg: s.PropTypes.instanceOf(l).isRequired
        },
        getInitialState: function() {
          return this.retry = 0, {
            urlState: this.async("msg.urlState"),
            mmsSrc: this.async("msg.mmsSrc")
          }
        },
        componentDidMount: function() {
          var e = this.props.msg;
          e.urlState === l.URL_STATE.NO_URL && e.requestMediaReupload()["catch"](_.noop)
        },
        onPlayerClick: function(e) {
          this.hasAttemptedPlayback = !0, e.stopPropagation()
        },
        onPlayerPlay: function(e) {
          this.props.msg.urlState200(e.target.src)
        },
        onPlayerError: function(e) {
          this.hasAttemptedPlayback ? (this.props.msg.urlState = l.URL_STATE.STATUS_ERR, this.props.msg.mediaLoadError(e)) : (this.props.msg.urlState = l.URL_STATE.NO_URL, this.props.msg.unset("url"))
        },
        render: function() {
          var e = this.props.msg,
            t = "media-viewer-img media-viewer-audio";
          switch (this.state.urlState) {
            case l.URL_STATE.URL:
            case l.URL_STATE.STATUS_200:
              return s.createElement(v, {
                msg: e,
                ref: "player",
                className: t,
                onClick: this.onPlayerClick,
                onError: this.onPlayerError,
                onPlay: this.onPlayerPlay,
                autoPlay: !0,
                controls: !0
              }, l10n.t("audio_playback_not_supported"));
            default:
              return s.createElement("div", {
                className: "image-audio"
              })
          }
        }
      }),
      L = s.createClass({
        displayName: "MediaState",
        mixins: [d],
        propTypes: {
          msg: s.PropTypes.instanceOf(l).isRequired
        },
        getInitialState: function() {
          return {
            urlState: this.async("msg.urlState")
          }
        },
        initializeMedia: function(e) {
          e.stopPropagation(), this.props.msg.initializeMedia()
        },
        requestMediaReupload: function(e) {
          e.stopPropagation(), this.props.msg.requestMediaReupload()["catch"](_.noop)
        },
        cancelMediaReupload: function(e) {
          e.stopPropagation(), this.props.msg.urlState = l.URL_STATE.NO_URL
        },
        captureClick: function(e) {
          e.stopPropagation()
        },
        render: function() {
          var e = this.props.msg;
          switch (this.state.urlState) {
            case l.URL_STATE.STATUS_200:
              return null;
            case l.URL_STATE.NO_URL:
            case l.URL_STATE.RMR_ERROR_RETRY:
            case l.URL_STATE.STATUS_ERR:
              return s.createElement("div", {
                onClick: this.requestMediaReupload
              }, s.createElement(E.Download, {
                filesize: e.size
              }));
            case l.URL_STATE.REFRESH_RETRY:
              return s.createElement("div", {
                onClick: this.initializeMedia
              }, s.createElement(E.Download, {
                filesize: e.size
              }));
            case l.URL_STATE.INIT:
            case l.URL_STATE.REFRESHING:
            case l.URL_STATE.URL:
              return s.createElement(E.Pending, null);
            case l.URL_STATE.RMR_FETCHING:
              return "image" === e.type ? s.createElement("div", {
                onClick: this.cancelMediaReupload
              }, s.createElement(E.Pending, null)) : null;
            case l.URL_STATE.RMR_ERROR_MISSING:
              return s.createElement("div", {
                onClick: this.captureClick
              }, s.createElement(E.Missing, {
                msg: e
              }));
            case l.URL_STATE.UPLOADING:
              return null
          }
        }
      });
    e.exports = x
  },
  949: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(799),
      o = n(8),
      s = function() {
        return [{
          label: l10n.t("web_mute_8hours"),
          duration: 8
        }, {
          label: l10n.t("web_mute_1week"),
          duration: 168
        }, {
          label: l10n.t("web_mute_1year"),
          duration: 8760
        }]
      },
      a = r.createClass({
        displayName: "MutePopup",
        propTypes: {
          onCancel: r.PropTypes.func,
          onMute: r.PropTypes.func.isRequired,
          chat: r.PropTypes.instanceOf(i).isRequired
        },
        getInitialState: function() {
          return {
            mute: 8
          }
        },
        onChange: function(e) {
          this.setState({
            mute: parseInt(e.target.value, 10)
          })
        },
        onMute: function(e) {
          e.stopPropagation(), o.closeModal(), this.props.onMute(3600 * this.state.mute + moment().unix(), !0)
        },
        render: function() {
          var e = this.props.onCancel || function() {
              o.closeModal()
            },
            t = this.state.mute,
            n = this,
            i = s().map(function(e) {
              var i = e.duration;
              return r.createElement("li", {
                key: "mute-" + i
              }, r.createElement("label", null, r.createElement("input", {
                type: "radio",
                name: "duration",
                value: e.duration,
                checked: t === i,
                onChange: n.onChange
              }), e.label))
            }),
            a = this.props.chat.isGroup ? l10n.t("web_mute_time") : l10n.t("web_mute_time_chat");
          return r.createElement("div", {
            className: "backdrop"
          }, r.createElement("div", {
            className: "popup-container"
          }, r.createElement("div", {
            className: "popup"
          }, r.createElement("div", {
            className: "popup-body"
          }, r.createElement("div", {
            className: "popup-title",
            dir: "auto"
          }, a), r.createElement("div", {
            className: "popup-contents"
          }, r.createElement("form", {
            ref: "form"
          }, r.createElement("ol", {
            className: "choices"
          }, i)))), r.createElement("div", {
            className: "popup-controls"
          }, r.createElement("button", {
            className: "btn-plain popup-controls-item",
            onClick: e
          }, l10n.t("web_cancel")), r.createElement("button", {
            className: "btn-plain btn-default popup-controls-item",
            onClick: this.onMute
          }, l10n.t("web_ok"))))))
        }
      });
    e.exports = a
  },
  950: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(800),
      o = n(802),
      s = n(801),
      a = n(815),
      c = n(835),
      l = n(107),
      d = r.createClass({
        displayName: "NewGroupDrawer",
        propTypes: {
          thumb: r.PropTypes.string,
          full: r.PropTypes.string,
          subject: r.PropTypes.string,
          onBack: r.PropTypes.func.isRequired,
          onContinue: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            text: this.props.subject || "",
            thumb: this.props.thumb,
            full: this.props.full,
            emojiActive: !1
          }
        },
        componentDidMount: function() {
          this.refs.emojiInput.restoreFocus()
        },
        preventBlur: function(e) {
          e.preventDefault(), e.stopPropagation(), this.refs.emojiInput.restoreFocus()
        },
        onImageSet: function(e, t) {
          this.setState({
            thumb: e,
            full: t
          })
        },
        onContinue: function() {
          var e = this.state.text.trim(),
            t = this.refs.photoPicker;
          if (t.state.isEditing) {
            var n = this;
            t.cropImage().then(function(t) {
              n.props.onContinue(e, t.thumb, t.full)
            })
          } else this.props.onContinue(e, this.state.thumb, this.state.full)
        },
        onInputChange: function(e) {
          this.setState({
            text: e.target.value
          })
        },
        render: function() {
          var e = this.state.text.length > 0 ? r.createElement("div", {
            className: "drawer-section drawer-controls"
          }, r.createElement("button", {
            className: "btn btn-round",
            onClick: this.onContinue
          }, r.createElement("span", {
            className: "icon icon-forward-light icon-l"
          }))) : null;
          return r.createElement(i, {
            id: "new-group",
            onCancel: this.props.onBack
          }, r.createElement(o, {
            title: l10n.t("new_group_flow_title"),
            type: o.Type.LARGE,
            onBack: this.props.onBack
          }), r.createElement(s, null, r.createElement("div", {
            className: "drawer-section"
          }, r.createElement(c, {
            type: c.Type.GROUP,
            startImage: this.state.full,
            onImageSet: this.onImageSet,
            ref: "photoPicker"
          })), r.createElement("div", {
            className: "drawer-section",
            onMouseDown: this.preventBlur
          }, r.createElement(a, {
            ref: "emojiInput",
            placeholder: l10n.t("group_subject"),
            floating: !0,
            value: this.state.text,
            editable: !0,
            showRemaining: !0,
            maxLength: 25,
            onEnter: this.onContinue,
            onChange: this.onInputChange
          })), r.createElement(l, {
            transitionName: "btn"
          }, e)))
        }
      });
    e.exports = d
  },
  951: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(800),
      o = n(802),
      s = n(801),
      a = n(854),
      c = n(894),
      l = n(105),
      d = n(7),
      u = n(8),
      p = n(810),
      h = n(107),
      m = n(159),
      f = m.HotKeys,
      g = p.genId("max_participant_toast"),
      v = r.createClass({
        displayName: "NewGroupParticipantsDrawer",
        mixins: [l],
        propTypes: {
          thumb: r.PropTypes.string,
          full: r.PropTypes.string,
          subject: r.PropTypes.string.isRequired,
          onBack: r.PropTypes.func.isRequired,
          onContinue: r.PropTypes.func.isRequired
        },
        getInitialState: function() {
          return {
            searchText: "",
            participants: [],
            shouldFocus: !0
          }
        },
        getFilteredContacts: function() {
          var e = Store.Contact.getFilteredContacts();
          e = _.difference(e, this.state.participants);
          var t = this.state.searchText;
          return t ? (t = l10n.accentFold(t), e.filter(function(e) {
            return e.searchMatch(t)
          })) : e
        },
        componentDidMount: function() {
          this.focus()
        },
        componentDidUpdate: function() {
          this.adjustInput()
        },
        onKeyDown: function(e) {
          if ("Backspace" !== e.key || this.state.searchText || _.isEmpty(this.state.participants)) "Enter" === e.key && _.size(this.state.participants) && this.onContinue();
          else {
            e.preventDefault();
            var t = this.state.participants;
            this.setState({
              participants: t.slice(0, t.length - 1),
              shouldFocus: !0
            })
          }
        },
        onInput: function(e) {
          this.setState({
            searchText: e.target.value
          })
        },
        adjustInput: function() {
          var e = this.refs.input.offsetParent.offsetWidth - 10,
            t = this.refs.sizer.offsetWidth,
            n = t > e ? e : t;
          this.refs.input.style.width = n + "px";
          var r;
          r = e - this.refs.input.offsetLeft - n > 0 ? e - this.refs.input.offsetLeft : e, this.refs.input.style.width = r + "px", this.state.shouldFocus && this.focus()
        },
        onReset: function() {
          this.setState({
            searchText: "",
            shouldFocus: !0
          })
        },
        focus: function() {
          this.refs.input.focus()
        },
        uimFocus: function() {
          this.focus()
        },
        onBack: function() {
          var e = this.props;
          e.onBack(e.subject, e.thumb, e.full)
        },
        onContinue: function() {
          var e = this.props;
          e.onContinue(e.subject, e.thumb, e.full, this.state.participants)
        },
        onDelete: function(e, t) {
          var n = _.without(this.state.participants, t);
          this.setState({
            participants: n,
            shouldFocus: !n.length
          })
        },
        onContactClick: function(e, t) {
          var n = this.state.participants;
          if (_.contains(n, t)) this.setState({
            participants: _.without(n, t),
            shouldFocus: !0
          });
          else if (n.length >= d.MAX_GROUP_SIZE) {
            var i = l10n.t("action_group_create_failed_participant", {
              max: d.MAX_GROUP_SIZE
            });
            u.openToast(r.createElement(p, {
              msg: i,
              id: g
            }))
          } else this.setState({
            participants: n.concat(t),
            searchText: "",
            shouldFocus: !0
          })
        },
        onFocusList: function(e) {
          this.refs.list && (e.preventDefault(), e.stopPropagation(), f.flashFocus = Date.now(), this.refs.list.focusFirst())
        },
        onFocusParticipants: function(e) {
          e.repeat || 0 !== this.refs.input.selectionStart || this.refs.participantList && (e.preventDefault(), e.stopPropagation(), f.flashFocus = null, this.refs.participantList.focusLast())
        },
        onSelectFirst: function(e) {
          e.preventDefault(), e.stopPropagation();
          var t = _.first(this.getFilteredContacts());
          t && this.onContactClick(e, t)
        },
        onFocusSearch: function(e) {
          f.flashFocus = Date.now(), this.refs.input.focus()
        },
        render: function() {
          var e = _.size(this.state.participants) ? r.createElement("button", {
              className: "btn btn-round",
              onClick: this.onContinue
            }, r.createElement("span", {
              className: "icon icon-checkmark-light"
            })) : null,
            t = _.size(this.state.participants) ? " " : l10n.t("group_participant_hint"),
            n = {
              down: this.onFocusList,
              enter: this.onSelectFirst,
              up: this.onFocusParticipants
            };
          return n[l10n.LR("left", "right")] = this.onFocusParticipants, r.createElement(i, {
            id: "new-group",
            onCancel: this.onBack
          }, r.createElement(o, {
            title: l10n.t("add_group_participants_title"),
            type: o.Type.LARGE,
            onBack: this.onBack
          }), r.createElement(s, {
            flex: !0
          }, r.createElement("div", {
            className: "drawer-section new-group-search"
          }, r.createElement("div", {
            className: "input-clear input-ext"
          }, r.createElement(f, {
            handlers: n,
            className: "input input-line"
          }, r.createElement("div", {
            className: "list-names list-deletable new-group-preview"
          }, r.createElement("div", {
            className: "new-group-participants",
            "data-list-scroll-container": !0
          }, r.createElement(c, {
            ref: "participantList",
            contacts: this.state.participants,
            onDelete: this.onDelete,
            onFocusSearch: this.onFocusSearch
          }))), r.createElement("input", {
            className: "inputarea",
            ref: "input",
            placeholder: t,
            onKeyDown: this.onKeyDown,
            onChange: this.onInput,
            value: this.state.searchText
          }), r.createElement("span", {
            className: "inputarea-sizer",
            ref: "sizer"
          }, this.state.searchText)))), r.createElement("div", {
            className: "new-group-contacts",
            "data-list-scroll-container": !0
          }, r.createElement(a, {
            ref: "list",
            contacts: this.getFilteredContacts(),
            onFocusSearch: this.onFocusSearch,
            onClick: this.onContactClick
          })), r.createElement(h, {
            transitionName: "btn",
            className: "drawer-section drawer-controls"
          }, e)))
        }
      });
    e.exports = v
  },
  952: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(800),
      o = n(802),
      s = n(814),
      a = n(801),
      c = n(835),
      l = n(352),
      d = n(8),
      u = n(797),
      p = n(878),
      h = n(82),
      m = n(7),
      f = r.createClass({
        displayName: "ProfileDrawer",
        mixins: [u],
        propTypes: {
          id: r.PropTypes.string.isRequired
        },
        getInitialState: function() {
          return {
            status: this.async("id.Status.status") || l10n.t("contact_status_loading"),
            imgFull: this.async("id.ProfilePicThumb.imgFull"),
            pendingStatus: !1,
            pendingPhoto: !1
          }
        },
        validateStatus: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
          return !!e.trim()
        },
        onSetStatusError: function() {
          d.openModal(r.createElement(l, {
            onOK: d.closeModal.bind(d),
            okText: l10n.t("web_ok")
          }, l10n.t("action_status_empty")))
        },
        onSetStatus: function(e) {
          if (Store.Status.canSetMyStatus()) {
            var t = Store.Status.get(this.props.id).status;
            this.state.status !== t && (this.setState({
              pendingStatus: !0
            }), Store.Status.setMyStatus(this.state.status).bind(this)["finally"](function() {
              this.isMounted() && this.setState({
                status: Store.Status.get(this.props.id).status,
                pendingStatus: !1
              })
            }))
          }
        },
        onBack: function() {
          d.closeDrawer(this.props.type)
        },
        onStatusChange: function(e) {
          this.setState({
            status: e.target.value
          })
        },
        onCancelStatus: function() {
          this.setState({
            status: Store.Status.get(this.props.id).status
          })
        },
        onImageSet: function(e, t) {
          var n = Store.ProfilePicThumb.get(this.props.id);
          this.setState({
            pendingPhoto: !0
          });
          var r;
          r = e && t ? n.setPicture(e, t) : n.deletePicture(), r.bind(this).then(function() {
            this.isMounted() && this.setState({
              pendingPhoto: !1
            })
          })
        },
        render: function() {
          var e = Store.ProfilePicThumb.get(this.props.id),
            t = e.canSet() || e.canDelete() ? c.Type.PROFILE : c.Type.NO_EDIT,
            n = r.createElement(c, {
              type: t,
              id: this.props.id,
              pending: this.state.pendingPhoto,
              startImage: this.state.imgFull,
              onImageSet: this.onImageSet
            });
          return r.createElement(i, {
            onCancel: this.onBack,
            id: "profile"
          }, r.createElement(o, {
            a8n: "drawer-title-profile",
            title: l10n.t("menuitem_profile_status"),
            onBack: this.onBack,
            type: o.Type.LARGE
          }), r.createElement(a, null, r.createElement("div", {
            className: "drawer-section drawer-scale drawer-section-photo"
          }, n), r.createElement(s, {
            a8n: "col-main-profile",
            title: l10n.t("web_status"),
            classes: "animate-enter1"
          }, r.createElement(p, {
            id: h.STATUS_INPUT,
            value: this.state.status,
            editable: Store.Status.canSetMyStatus(),
            pending: this.state.pendingStatus,
            showRemaining: !0,
            validate: this.validateStatus,
            maxLength: m.MAX_STATUS_LENGTH,
            onChange: this.onStatusChange,
            onSave: this.onSetStatus,
            onError: this.onSetStatusError,
            onCancel: this.onCancelStatus
          }))))
        }
      });
    e.exports = f
  },
  953: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(352),
      o = n(8),
      s = n(10),
      a = n(815),
      c = n(7),
      l = r.createClass({
        displayName: "SendLogsPopup",
        getInitialState: function() {
          return {
            logText: ""
          }
        },
        onSend: function() {
          s.upload(this.state.logText, !0, !0), o.closeModal()
        },
        onCancel: function() {
          o.closeModal()
        },
        onChange: function(e) {
          this.setState({
            logText: e.target.value
          })
        },
        render: function() {
          return r.createElement(i, {
            title: l10n.t("menuitem_send_logs"),
            okText: l10n.t("send_logs_confirm"),
            onOK: this.onSend,
            onCancel: this.onCancel
          }, r.createElement(a, {
            placeholder: l10n.t("describe_logs"),
            value: this.state.logText,
            maxLength: c.MAX_STATUS_LENGTH,
            editable: !0,
            floating: !0,
            disableEmoji: !0,
            className: "send-logs-input",
            multiline: !0,
            onChange: this.onChange
          }))
        }
      });
    e.exports = l
  },
  954: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(8),
      o = n(800),
      s = n(809),
      a = n(802),
      c = n(801),
      l = n(823),
      d = n(798),
      u = n(105),
      p = n(157),
      h = n(796),
      m = n(43),
      f = n(107),
      g = n(160),
      v = r.createClass({
        displayName: "StarredDrawer",
        mixins: [u],
        onClose: function() {
          i.closeDrawer(this.props.type)
        },
        getStarredMessages: function() {
          return Store.StarredMsg.models
        },
        componentWillMount: function() {
          this.addObserver(Store.StarredMsg, "add remove"), this.addObserverAndRun(Store.StarredMsg, "sync")
        },
        onClickMsg: function(e, t) {
          i.openChat(t.chat, t.chat.getSearchContext(t))
        },
        render: function() {
          var e, t, n = this,
            i = this.getStarredMessages();
          if (Store.StarredMsg.syncState === Store.StarredMsg.SYNC_STATES.INIT && (t = r.createElement("div", {
              className: "icon-spinner"
            }, r.createElement(g, {
              size: 36,
              stroke: 6
            }))), i.length > 0) {
            var u = i.map(function(e) {
              var t;
              t = e.isSentByMe ? r.createElement("span", {
                className: "ellipsify screen-name"
              }, r.createElement(d, {
                direction: "auto",
                text: l10n.t("web_you")
              })) : r.createElement("span", {
                className: "ellipsify screen-name"
              }, r.createElement(d, {
                classes: "screen-name-text",
                direction: "auto",
                text: e.notifyName
              }));
              var i, o = r.createElement("div", {
                className: "chat-meta"
              }, r.createElement("span", {
                className: "chat-time"
              }, p.relativeStr(e.t)));
              (e.chat.isGroup || e.chat.isBroadcast) && (i = r.createElement("span", {
                className: "chat-title"
              }, r.createElement(d, {
                text: e.chat.formattedTitle,
                direction: "auto",
                titlify: !0,
                ellipsify: !0
              })));
              var s = m("starred-msg-wrapper", {
                "starred-msg-resize": e.type === h.TYPE.PTT || e.type === h.TYPE.IMAGE || e.type === h.TYPE.LOCATION || e.type === h.TYPE.VCARD
              });
              return r.createElement("div", {
                key: e.id,
                className: s,
                onClick: function(t) {
                  return n.onClickMsg(t, e)
                }
              }, r.createElement("div", {
                className: "starred-msg-title"
              }, t, o, i), r.createElement(l, {
                msg: e,
                key: e.id,
                displayType: l.DisplayType.STARRED_MSGS,
                position: l.Position.END,
                tailOverride: "left"
              }))
            });
            e = r.createElement(f, {
              transitionName: "slide"
            }, u)
          } else e = r.createElement(s.StarredMsgs, null);
          return r.createElement(o, {
            id: "starred",
            onCancel: this.onClose
          }, r.createElement(a, {
            title: l10n.t("starred_flow_title"),
            onBack: this.onClose,
            type: a.Type.LARGE
          }), r.createElement(c, null, r.createElement("div", {
            className: "spinner-container"
          }, t), e))
        }
      });
    e.exports = v
  },
  955: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(105),
      o = n(8),
      s = n(13),
      a = r.createClass({
        displayName: "TermsOfServiceModal",
        mixins: [i],
        componentDidMount: function() {
          this.addObserver(Store.Conn, "change:tos", this.close)
        },
        close: function() {
          0 === Store.Conn.tos && o.closeModal()
        },
        logout: function() {
          o.closeModal(), s.logout()
        },
        render: function() {
          var e, t = null;
          switch (Store.Conn.tos) {
            default:
              case 1:
              e = l10n.t("web_terms_of_service_1"),
            t = r.createElement("div", {
              className: "popup-controls"
            }, r.createElement("button", {
              className: "btn-plain btn-default popup-controls-item",
              onClick: o.closeModal.bind(o)
            }, l10n.t("ok_got_it")));
            break;
            case 2:
                e = l10n.t("web_terms_of_service_2"),
              t = r.createElement("div", {
                className: "popup-controls"
              }, r.createElement("button", {
                className: "btn-plain popup-controls-item",
                onClick: this.logout
              }, l10n.t("menuitem_logout")))
          }
          return r.createElement("div", {
            className: "backdrop"
          }, r.createElement("div", {
            className: "popup-container"
          }, r.createElement("div", {
            className: "popup"
          }, r.createElement("div", {
            className: "popup-body"
          }, r.createElement("div", {
            className: "popup-contents"
          }, e)), t)))
        }
      });
    e.exports = a
  },
  956: function(e, t, n) {
    "use strict";
    var r = n(62),
      i = n(161),
      o = r.extend({
        Collection: "Blocklist",
        children: {
          contact: i
        },
        props: {
          id: "string"
        },
        initialize: function() {
          this.contact = Store.Contact.gadd({
            id: this.id
          }), this.listenTo(this.contact, "all", this._getEventBubblingHandler("contact"))
        }
      });
    e.exports = o
  },
  957: function(e, t, n) {
    "use strict";
    var r = n(353),
      i = n(956),
      o = r.extend({
        model: i,
        handle: function(e) {
          var t = e.shift(),
            n = t.blocklist,
            r = _.map(n, function(e) {
              return {
                id: e
              }
            });
          this.set(r)
        }
      });
    e.exports = new o
  },
  958: function(e, t, n) {
    "use strict";
    var r = n(1),
      i = n(62),
      o = n(8),
      s = i.extend({
        Collection: "Call",
        props: {
          id: "string",
          type: "string",
          from: "string"
        },
        initialize: function() {
          this.listenToAndRun(this, "change:type", this.updateNotification)
        },
        updateNotification: function() {
          r.log("call:" + this.type + " id:" + this.id + " from:" + this.from)(), "offer" === this.type ? o.alertCall(this.id, this.from) : o.cancelCall(this.id)
        }
      });
    e.exports = s
  },
  959: function(e, t, n) {
    "use strict";
    var r = n(353),
      i = n(958),
      o = n(169),
      s = r.extend({
        model: i,
        handle: function(e) {
          var t = e.shift();
          switch (t.type) {
            case "offer":
            case "accept":
            case "reject":
            case "terminate":
              o.tosShowCallNotification && this.add(t, {
                merge: !0
              })
          }
        }
      });
    e.exports = new s
  },
  960: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(27),
      o = r(i),
      s = n(3),
      a = r(s),
      c = n(6),
      l = n(7),
      d = n(1),
      u = n(353),
      p = n(799),
      h = n(35),
      m = n(29),
      f = n(108),
      g = n(8),
      v = n(21),
      y = n(164),
      E = u.extend({
        model: p,
        comparator: function(e, t) {
          return e.t ? t.t ? "" + e.t + e.id > "" + t.t + t.id ? -1 : 1 : -1 : 1
        },
        initialize: function() {
          u.prototype.initialize.call(this), this.listenTo(this, "change:t", this.sort)
        },
        active: function T() {
          var T = _.first(this.filter("active"));
          return T ? T.id : void 0
        },
        _find: function(e) {
          return a["default"].resolve({
            id: e,
            createdLocally: !0
          })
        },
        _findQuery: function(e) {
          var t = this;
          return h.chatFindQuery(!!e.retry).then(function(e) {
            return "preempted" === e ? a["default"].reject("chats preempted") : (t.trigger(l.COLLECTION_HAS_SYNCED), a["default"].resolve(e))
          })
        },
        handle: function(e) {
          var t = e.shift(),
            n = this;
          if (_.isArray(t)) {
            var r = [],
              i = [];
            t.forEach(function(e) {
              if ("c.us" === e.id) i.push(e);
              else {
                var t = !!n.get(e.id),
                  s = ["delete", "clear", "archive", "unarchive", "star", "unstar", "spam", "modify_tag"].indexOf(e.type) > -1;
                t || s ? t && s ? i.push(e) : d.log("Model:chat:handle received junk chat record: " + (0, o["default"])(e))() : r.push(e)
              }
            }), n.add(r, {
              merge: !0
            }), i.forEach(function(e) {
              var t = e.type;
              if ("c.us" === e.id) switch (t) {
                case "clear":
                  d.log("Model:chat:handle:clear:all before: " + e.before)(), n.forEach(function(t) {
                    "number" == typeof e.before ? t.deleteMsgsOlderThan(e.before, e.star) : t.deleteMsgs(e.star)
                  });
                  break;
                case "delete":
                  d.log("Model:chat:handle:delete:all")(), n.forEach(function(e) {
                    e["delete"]()
                  });
                  break;
                case "archive":
                  d.log("Model:chat:handle:archive:all")(), n.forEach(function(e) {
                    e.archive = !0
                  });
                  break;
                case "unarchive":
                  d.log("Model:chat:handle:unarchive:all")(), n.forEach(function(e) {
                    e.archive = !1
                  });
                  break;
                case "unstar":
                  d.log("Model:chat:handle:unstar:all")(), n.forEach(function(e) {
                    e.unstarAll()
                  });
                  break;
                default:
                  d.error("Model:chat:handle unknown " + (0, o["default"])(e), e)()
              } else {
                var r = n.get(e.id);
                if (!r) return;
                switch (t) {
                  case "clear":
                  case "star":
                  case "unstar":
                    if (e.keys) {
                      for (var i = e.keys.length, s = "star" === t, a = 0; i > a; a++) {
                        var c = e.keys[a][0],
                          l = e.keys[a][1],
                          u = e.keys[a][2],
                          p = l ? Store.Conn.me : e.id,
                          h = l ? e.id : Store.Conn.me,
                          m = l ? "out" : "in",
                          g = new f(p, h, c, u, m),
                          v = Store.Msg.get(g);
                        v && ("clear" === t ? v["delete"]() : v.star = s)
                      }
                      "star" !== t && "unstar" !== t || Store.StarredMsg.sync();
                      var y = e.keys.map(function(e) {
                        return e.join("_")
                      }).join();
                      d.log("model:Chat:handle:messages:" + [t, e.id, y, e.modifyTag].join())()
                    } else "clear" === t ? ("number" == typeof e.before ? r.deleteMsgsOlderThan(e.before, e.star) : r.deleteMsgs(e.star), d.log("model:Chat:handle cleared chat:" + [e.id, e.before, e.modifyTag].join())()) : "unstar" === t && (r.unstarAll(), d.log("model:Chat:handle unstarred chat: " + e.id)());
                    isNaN(e.modifyTag) || (r.modifyTag = e.modifyTag);
                    break;
                  case "delete":
                    r["delete"](), d.log("model:Chat:handle deleted chat for " + e.id)();
                    break;
                  case "archive":
                    r.archive = !0;
                    break;
                  case "unarchive":
                    r.archive = !1;
                    break;
                  case "spam":
                    r.notSpam = e.notSpam;
                    break;
                  case "modify_tag":
                    r.modifyTag = e.modifyTag
                }
              }
            })
          } else if ("leave" === t.cmd) t.gids.forEach(function(e) {
            var t = n.get(e);
            t && t.exit()
          });
          else if ("preempt" === t.cmd) Store.Chat.add(t.response, {
            merge: !0
          }), this.trigger(l.COLLECTION_HAS_SYNCED);
          else if ("action" === t.cmd) {
            var s = t.id,
              a = t.data;
            if ("create" === a[0] || "introduce" === a[0]) {
              var c = a[1],
                u = a[2],
                p = _.map(u.admins, function(e) {
                  return {
                    id: e,
                    isAdmin: !0
                  }
                }).concat(_.map(u.regulars, function(e) {
                  return {
                    id: e,
                    isAdmin: !1
                  }
                }));
              Store.GroupMetadata.add({
                id: s,
                creation: u.creation,
                owner: c,
                participants: p,
                stale: !1
              }, {
                merge: !0
              }), Store.Contact.add({
                id: s,
                name: u.subject
              }, {
                merge: !0
              });
              var h = Store.Chat.get(s);
              if (!h) return;
              var m = h.msgs.last();
              if (!m) return;
              "gp2" === m.type && "add" === m.subtype && _.first(m.recipients) === Store.Conn.me && g.alertNewMsg(m)
            } else {
              var v = Store.Chat.get(t.id);
              v ? v.handleGroupAction.apply(v, t.data) : d.error("model:chat: unknown chat for action " + (0, o["default"])(t))()
            }
          } else d.error("model:chat: unknown payload: " + (0, o["default"])(t))()
        },
        createGroup: function(e, t, n, r) {
          var i = _.pluck(r, "id"),
            o = h.createGroup(e, i),
            s = l10n.t("action_group_creating"),
            a = o.then(function(e) {
              return 200 === e.status ? l10n.t("action_group_created") : 406 === e.status ? l10n.t("action_group_create_failed") + " " + l10n.t("action_group_create_failed_406") : void 0
            })["catch"](function(e) {
              throw d.error("models:chatCollection:createGroup dropped")(e), l10n.t("action_group_create_failed")
            });
          return g.openToast(c.createElement(y, {
            id: y.genId(),
            pendingText: s,
            actionText: a,
            retry: this.createGroup.bind(this, e, t, n, r)
          })), o.then(function(e) {
            if (200 === e.status && e.gid && Store.Chat.find(e.gid).then(function(e) {
                g.openChat(e)
              }), 200 === e.status && !e._duplicate && t && n) {
              var r = Store.ProfilePicThumb.gadd(e.gid);
              return r.setPicture(t, n)
            }
            200 === e.status && e._duplicate && d.error("createGroup failed to set picture.")()
          })
        },
        sync: function() {
          return this.findQuery({})["catch"](v.WapDrop, _.noop), a["default"].all([m.waitForBBEvent(this, l.COLLECTION_HAS_SYNCED), Store.Msg._hasSynced()])
        },
        resyncMessages: function() {
          d.log("ChatStore:resyncMessages")();
          var e = Store.Chat.filter(function(e) {
              return !e.isNewlyCreated()
            }),
            t = e.map(function(e) {
              var t = e.id,
                n = {
                  wid: t,
                  archive: e.archive,
                  mute: e.mute.expiration,
                  active: e.active,
                  isReadOnly: e.isReadOnly,
                  modifyTag: e.modifyTag,
                  unreadCount: e.unreadCount,
                  notSpam: e.notSpam
                },
                r = Store.Msg.lastReceivedKey[t];
              if (r) {
                var i = r;
                n.id = i.id, n.fromMe = i.fromMe.toString(), n.participant = i.participant
              }
              return n
            });
          return h.resyncMessages(t).then(function(e) {
            return e.status >= 400 ? (d.error("ChatStore:resyncMessages resume error " + e.status)(), a["default"].reject(new Error("ChatStore:resyncMessages resume error " + e.status))) : (d.log("ChatStore:resyncMessages resume success")(), e.checksum && Store.Contact.resyncContacts(e.checksum), e.data.forEach(function(e) {
              if ("delete" !== e.type) {
                var t = Store.Contact.get(e.id);
                t ? e.name && (t.name = e.name) : Store.Contact.add({
                  id: e.id,
                  name: e.name
                })
              }
              var n = Store.Chat.get(e.id);
              if (!n) return void Store.Chat.add(e);
              if ("clear" === e.type) {
                var r = [];
                n.msgs.forEach(function(e) {
                  r.push(e)
                }), _.each(r, function(e) {
                  e["delete"]()
                }), n.set({
                  t: e.t,
                  unreadCount: e.unreadCount,
                  createdLocally: !1,
                  archive: e.archive,
                  isReadOnly: e.isReadOnly,
                  modifyTag: e.modifyTag,
                  msgs: [],
                  notSpam: e.notSpam
                }), n.mute.setMute(e.muteExpiration), d.log("model:chat:resume: cleared chat for " + e.id)()
              } else "delete" === e.type ? (n["delete"](), d.log("model:chat:resume: deleted chat for " + e.id)()) : (n.set(e, {
                merge: !0
              }), n.mute.setMute(e.muteExpiration))
            }), a["default"].resolve())
          })["catch"](v.WapDrop, function(e) {
            return d.error("ChatStore:resyncMessages resume dropped")(), a["default"].reject(e)
          })
        }
      });
    e.exports = new E
  },
  961: function(e, t, n) {
    "use strict";
    var r = n(7),
      i = n(1),
      o = n(10),
      s = n(21),
      a = {
        handle: function(e) {
          var t = e.shift();
          switch (t.type) {
            case "const":
              r[t.key] = t.value;
              break;
            case "read":
            case "unread":
              var n = Store.Chat.get(t.jid);
              n && ("read" === t.type ? n.markSeen() : "unread" === t.type && n.markUnseen());
              break;
            case "picture":
              Store.ProfilePicThumb.imageChanged(t.jid, t.tag);
              break;
            case "log":
              o.upload("server-requested");
              break;
            case "privacy":
              t.jid ? (Store.Presence.update(t.jid)["catch"](s.WapDrop, _.noop), Store.ProfilePicThumb.update(t.jid)["catch"](s.WapDrop, _.noop), Store.Status.update(t.jid)["catch"](s.WapDrop, _.noop)) : i.error("Store:Cmd:handle:privacy no jid", t)();
              break;
            default:
              i.warn("Store.Cmd:handle:unknown " + t.type, t)()
          }
        }
      };
    e.exports = a
  },
  962: function(e, t, n) {
    "use strict";
    var r = n(62),
      i = r.extend({
        idAttribute: "char",
        props: {
          "char": "string",
          variant: "string"
        }
      });
    e.exports = i
  },
  963: function(e, t, n) {
    "use strict";
    var r = n(353),
      i = n(962),
      o = n(356),
      s = r.extend({
        model: i,
        initialize: function() {
          r.prototype.initialize.call(this, {
            CachePolicy: {
              id: "emoji_variant_collection",
              policy: r.CACHE_POLICY.LOAD,
              delay: 1e3
            }
          })
        },
        setVariant: function(e, t) {
          var n = o.skinToneEmojis[e];
          if (!n) throw new Error("attempt to store variantless emoji");
          this.gadd({
            "char": n,
            variant: t
          })
        },
        getVariant: function(e) {
          if (o.skinToneEmojis[e]) {
            var t = this.get(e);
            return t ? t.variant : null
          }
          throw new Error("attempt to get variantless emoji")
        }
      });
    e.exports = new s
  },
  964: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(1),
      a = n(353),
      c = n(840),
      l = n(35),
      d = n(21),
      u = n(22),
      p = a.extend({
        model: c,
        initialize: function() {
          a.prototype.initialize.call(this, {
            staleCollection: !0
          })
        },
        onResume: function() {
          _.union(Store.Chat.where({
            active: !0
          }).filter(function(e) {
            return e.isGroup || e.isBroadcast
          }), Store.Chat.where({
            isBroadcast: !0
          })).forEach(function(e) {
            Store.GroupMetadata.find(e.id)["catch"](d.WapDrop, _.noop)
          })
        },
        _find: function(e) {
          var t = this;
          if (u.isGroup(e)) {
            var n = Store.Chat.get(e);
            return n && n.isReadOnly ? l.groupMetadataFindFromPhone(e).then(function(t) {
              return "ok" === t.status ? t.data : "missing" === t.status ? void _.defer(function() {
                Store.Chat.get(e)["delete"]()
              }) : "error" === t.status ? (s.error("model:GroupMetadata:find error " + t.info)(), o["default"].reject(new Error("model:GroupMetadata:find error"))) : void 0
            }) : l.groupMetadataFind(e).then(function(n) {
              if (n.status >= 400) return {
                id: e,
                stale: !1
              };
              var r = [],
                i = t.get(e);
              return i ? i.participants.set(n.participants) : r = n.participants, t.updateSubject(e, n.subject), {
                id: n.id,
                owner: n.owner,
                creation: n.creation,
                participants: r,
                stale: !1
              }
            })
          }
          return u.isBroadcast(e) ? l.contactFindBroadcast(e).then(function(t) {
            if (200 === t.status) {
              var n = Store.GroupMetadata.get(e);
              if (n && !n.stale) return o["default"].resolve(n);
              var r = [];
              return n ? n.participants.set(t.recipients) : r = t.recipients, o["default"].resolve({
                id: e,
                stale: !1,
                participants: r
              })
            }
            return 404 === t.status ? o["default"].reject("False broadcast list query.") : (s.error("models:GroupMetadataCollection:_find:bclist error: " + t.status)(), o["default"].reject(new Error("models:GroupMetadataCollection:_find:bclist error: " + t.status)))
          }) : (s.log("groupMetadata:find trying to fetch non-group/bclist wid " + e)(), o["default"].reject(new Error("groupMetadata:find trying to fetch non-group/bclist wid " + e)))
        },
        _handle: function(e) {
          return e
        },
        updateSubject: function(e, t) {
          _.isString(t) && Store.Contact.find(e).then(function(e) {
            e.name || (e.name = t)
          })
        }
      });
    e.exports = new p
  },
  965: function(e, t, n) {
    "use strict";
    e.exports = {
      Blocklist: n(957),
      Call: n(959),
      Chat: n(960),
      Cmd: n(961),
      GroupMetadata: n(964),
      Msg: n(966),
      MsgInfo: n(968),
      StarredMsg: n(975),
      Mute: n(969),
      Presence: n(970),
      ProfilePicThumb: n(971),
      Props: n(972),
      RecentEmoji: n(974),
      EmojiVariant: n(963),
      Status: n(976)
    }
  },
  966: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function i(e) {
      if (e.notifyName) {
        var t = Store.Contact.get(e.sender);
        t && (!t.notifyName || t.notifyName.t < e.t) && (t.notifyName = {
          name: e.notifyName,
          t: e.t
        })
      }
    }

    function o(e, t, n, r) {
      var o = [],
        s = [];
      if (t.forEach(function(t, a) {
          t.id = new w(t.from, t.to, t.id, t.participant, t.self), _.isString(e) && T.isBroadcast(e) && delete t.broadcast, t.recvFresh || t.clientUrl || (t.urlState = S.URL_STATE.NO_URL), "ptt" === t.type && !t.id.fromMe && t.ack < 0 && (t.ack = 0);
          var c = Store.Msg.get(t.id);
          if (c) {
            "undefined" == typeof c.clientUrl && t.clientUrl && c.set({
              urlState: S.URL_STATE.INIT
            }), t.ack < c.ack && delete t.ack;
            for (var l in t) t.hasOwnProperty(l) && "undefined" == typeof t[l] && delete t[l];
            c.set(t), n.isHistory && (c.recvFresh || r) && !c.search ? (v.warn("model:Msg:handle:processMM:" + (c.recvFresh ? "dup:" : "overlap:") + c.id)(), s.push(c)) : n.isHistory && c.search ? (c.search = !1, v.warn("model:Msg:handle:processMM load search as history " + c.id)(), o.push(c.toJSON())) : "search" !== n.add && "resync" !== n.add || o.push(c.toJSON()), i(c)
          } else "search" === n.add && (t.search = !0), n.update || o.push(t)
        }), 0 === o.length && 0 === s.length) return f["default"].resolve(t.map(function(e) {
        return Store.Msg.get(e.id)
      }));
      var a = u(o).then(function(e) {
        var t = Store.Msg.add(e, {
          merge: !0
        });
        return _.each(t, function(e) {
          i(e)
        }), t
      });
      return e ? f["default"].join(a, Store.Chat.find(e), function(i, o) {
        var a = "function" == typeof r ? r() : r,
          l = "after" === n.add || "last" === n.add,
          u = !n.isHistory;
        if (c(t, i, s, o, l, a || o.msgs), u && T.isBroadcast(e) && i.forEach(function(t) {
            if ("broadcast_notification" === t.type) {
              var n = Store.GroupMetadata.get(e);
              "add" === t.subtype ? n.participants.add({
                id: t.body
              }, {
                merge: !0
              }) : "remove" === t.subtype && n.participants.remove(t.body), o.groupMetadata.stale = !1
            } else t.recvFresh && d(t)
          }), b.supportsFeature(b.F.RECENT_EMOJI_SYNC) && !Store.RecentEmoji.syncDue)
          for (var p = 0; p < i.length; p++) {
            var h = i[p];
            if (h.isNew && h.isSentByMe && h.containsEmoji) {
              Store.RecentEmoji.periodicSync();
              break
            }
          }
        return t.map(function(e) {
          return Store.Msg.get(e.id)
        })
      }) : a.then(function(e) {
        return t.map(function(e) {
          return Store.Msg.get(e.id)
        })
      })
    }

    function s(e, t, n, r) {
      var i = t.msgs.length,
        o = r || t.msgs;
      if (e = _.isArray(e) ? e : [e], 0 !== e.length) {
        if (n ? o.add(e) : o.add(e, {
            at: 0
          }), n || 0 === i) {
          var s = _.last(e).id,
            a = s.remote;
          Store.Msg.lastReceivedKey[a] = s
        }
        if (n || 0 === i || !Store.Msg.lastReceivedReceipt[t.id])
          for (var c = e.length, l = c - 1; l >= 0; l--) {
            var d = e[l],
              u = d.id;
            if (u.fromMe && !d.isNotification) {
              Store.Msg.updateLastReceipt(u.remote, d.t);
              break
            }
          }
      }
    }

    function a(e, t, n, r, i) {
      var o, s, a, c = {},
        l = {},
        d = n.length,
        u = i;
      if (0 === d) return {
        msgs: t,
        collection: u
      };
      for (o = 0; d > o; o++) s = n[o], l[s.id] = s;
      for (d = t.length, o = 0; d > o; o++) s = t[o], c[s.id] = s;
      var p = [];
      for (d = e.length, o = 0; d > o; o++)
        if (s = e[o], a = c[s.id], a && p.push(a), a = l[s.id])
          if (a.recvFresh) p.push(a), r.removeMsg(a), a.unset("recvFresh");
          else {
            var h = r.getAllCMCs(),
              m = _.find(h, function(e) {
                return e.get(s.id)
              });
            i && m === i || (m ? (m.forEach(function(e) {
              p.push(e), delete l[e.id]
            }), m === r.msgs ? (r.replaceMsgsCollection(i), u = r.msgs) : (r.notifyMsgCollectionMerge(i, m, i), r.removeMsgsCollection(m))) : (v.error("models:Msg:reorder trying to merge CMC of orphaned message " + s.id, s)(), p.push(l[s.id])))
          }
      return {
        msgs: p,
        collection: u
      }
    }

    function c(e, t, n, r, i, o) {
      var c = a(e, t, n, r, o);
      s(c.msgs, r, i, c.collection)
    }

    function l(e) {
      return _.isObject(e) ? JSON.parse((0, h["default"])(e)) : e
    }

    function d(e) {
      function t(t) {
        var n = new w(e.from, t, r.id);
        if (!Store.Msg.some(_.matches({
            id: n
          }))) {
          var i = l(e);
          i.to = t, i.id = n, i.broadcast = !0;
          var o = Store.Msg.add(i, {
            merge: !0
          });
          Store.Chat.find(t).then(function(e) {
            s(o, e, !0)
          })
        }
      }
      var n, r = e.id;
      if (!e.invis)
        if (e.recipients && 0 !== e.recipients.length) n = e.recipients, e.recipients.forEach(t);
        else {
          var i = Store.GroupMetadata.get(r.remote);
          i ? (n = l(i.participants), _.pluck(n, "id").forEach(t)) : v.log("model:msgs:broadcastFanout no group_metadata rec for bclist, cant fanout: " + r.remote)()
        }
      return n
    }

    function u(e) {
      return f["default"].all(e.map(function(e) {
        return ["image", "video"].indexOf(e.type) > -1 && !parseInt(e.width || 0, 10) && e.body ? new f["default"](function(t, n) {
          var r = new Image;
          r.onload = function() {
            e.width = r.width, e.height = r.height, t(e)
          }, r.src = "data:image/jpeg;base64," + e.body
        }) : f["default"].resolve(e)
      }))
    }
    var p = n(27),
      h = r(p),
      m = n(3),
      f = r(m),
      g = n(7),
      v = n(1),
      y = n(353),
      E = n(21),
      T = n(22),
      b = n(83),
      S = n(796),
      M = n(29),
      C = n(61),
      w = n(108),
      N = n(13),
      P = n(35),
      R = y.extend({
        model: S,
        initialize: function() {
          y.prototype.initialize.call(this), this.lastReceivedKey = {}, this.lastReceivedReceipt = {}, this.refreshMediaPromises = {}, this.preAck = {}, this.pendingAdd = {}, this.listenTo(N, "change:stream", function() {
            N.stream === N.STREAM.DISCONNECTED && (this.preAck = {})
          })
        },
        _findQuery: function(e) {
          var t, n = this;
          switch (e.direction) {
            case "before":
            case "after":
              t = e.direction;
              break;
            default:
              t = "before"
          }
          return P.msgFindQuery(t, e).then(function(r) {
            if (r.status >= 400) return v.error("model:Msg:findQuery error " + r.status)(), f["default"].reject(r.status);
            var i = function() {
              var t = n.get(e),
                r = Store.Chat.get(e.remote);
              return t ? t.msgChunk : r ? r.msgs : void 0
            };
            return r.forEach(function(e) {
              e.invis = !0
            }), v.log("model:Msg:findQuery:got:" + r.length + ":" + e.direction)(), n.processMultipleMessages(e.remote, r, {
              add: t,
              isHistory: !0
            }, i)
          })
        },
        resyncChatMsgs: function(e, t) {
          var n = this,
            r = "number" != typeof t || isNaN(t) ? g.PAGE_SIZE : t;
          return P.msgFindQuery("before", {
            remote: e,
            count: r
          }).then(function(e) {
            return e.status >= 400 ? (v.error("model:Msg:resyncChatMsgs error " + e.status)(), f["default"].reject(e.status)) : n.processMultipleMessages(void 0, e, {
              add: "resync"
            })
          })
        },
        getStarred: function() {
          var e = this;
          return P.msgFindQuery("star").then(function(t) {
            return t.status >= 400 ? (v.error("model:Msg:getStarred error " + t.status)(), f["default"].reject(t.status)) : e.processMultipleMessages(void 0, t, {
              add: "search"
            })
          })
        },
        search: function(e) {
          var t = this;
          return P.msgFindQuery("search", e).then(function(e) {
            return e.status >= 400 ? (v.error("model:Msg:search error " + e.status)(), f["default"].reject(e.status)) : t.processMultipleMessages(void 0, e, {
              add: "search"
            })
          })
        },
        getContext: function(e, t) {
          var n = this;
          return f["default"].join(P.msgFindQuery("before", e), P.msgFindQuery("after", e), function(r, i) {
            return _.isArray(r) && _.isArray(i) ? f["default"].join(n.processMultipleMessages(e.remote, r, {
              add: "before",
              isHistory: !0
            }, t), n.processMultipleMessages(e.remote, i, {
              add: "after",
              isHistory: !0
            }, t)) : (v.error("model:msg:getContext fetch error", r, i)(), f["default"].reject(r.status || i.status))
          })
        },
        handle: function(e) {
          function t(e, t) {
            var n = new w(i.from, e, t, void 0, "out"),
              o = r.get(n);
            if (o) {
              o.updateAck(i.ack), r.updateLastReceipt(n.remote, i.t);
              var s = n.remote;
              T.isUser(s) && (Store.MsgInfo.update(t, i.from, e, i.ack, s, i.t), T.isBroadcast(i.broadcast) && Store.MsgInfo.update(t, i.from, i.broadcast, i.ack, s, i.t))
            } else v.log("Msg:out of order ack", i)(), r.preAck[n] = i
          }
          var n, r = this,
            i = e.shift();
          if ("ack" === i.cmd) {
            var o = [i.to];
            if (T.isBroadcast(i.to) && 1 === i.ack) {
              var s = Store.GroupMetadata.get(i.to);
              s && Array.prototype.push.apply(o, _.pluck(s.participants.toArray(), "id"))
            }
            return o.forEach(function(e) {
              t(e, i.id)
            }), !0
          }
          if ("acks" === i.cmd) return i.id.forEach(function(e) {
            t(i.to, e)
          }), !0;
          if (i.msg) return i.msg.recvFresh = !0, i.msg.isNew = !0, this.processMultipleMessages(i.chat, [i.msg], {
            add: "after",
            update: "update" === i.meta.add,
            isHistory: !1
          }), !0;
          if (i.msgs) {
            var a = i.msgs.length;
            if (!a) return !1;
            var c = i.meta;
            c.isHistory = !0;
            for (var l = 0; a > l; l++) n = i.msgs[l], n.invis = !0;
            return this.processMultipleMessages(i.chat, i.msgs, c), !0
          }
          if (i.recent) {
            delete i.recent, this.trigger(g.COLLECTION_HAS_SYNCED);
            for (var d in i) n = i[d], n.invis = !0, this.processMultipleMessages(d, [n], {
              add: "last",
              isHistory: !0
            })
          } else v.log("************** Msg else clause. something strange is going on")()
        },
        _hasSynced: function() {
          return M.waitForBBEvent(this, g.COLLECTION_HAS_SYNCED)
        },
        "delete": function() {
          y.prototype["delete"].call(this), this.lastReceivedKey = {}, this.lastReceivedReceipt = {}, this.preAck = {}, this.refreshMediaPromises = {}
        },
        send: function(e) {
          return new f["default"](function(t, n) {
            var r = e.id,
              i = r,
              o = e.toJSON(),
              s = e.chat;
            if (b.supportsFeature(b.F.SPAM) && (s.isTrusted() || s.sendNotSpam()["catch"](_.noop)), e.isNew = !0, !e.isGroupMsg && Store.Blocklist.get(e.to)) return void n(new E.ContactBlocked("Contact is blocked"));
            if (T.isBroadcast(o.to)) var a = d(o);
            delete o.status, delete o.mimetype, delete o.height, delete o.width, delete o.recipients, delete o.chat, delete o.broadcast, delete o.ack, delete o.invis, delete o.filehash, delete o.recvFresh, C.isHttp(e.url) || delete o.url;
            for (var c in o) null !== o[c] && "undefined" != typeof o[c] || delete o[c];
            o.id = i.id, e.isMMS && (o.avparams = e.avParams()), "chat" !== o.type || "url" !== o.subtype || b.supportsFeature(b.F.URL) || delete o.subtype, P.msgCreateRecord(o, e.local).then(function(n) {
              if (200 === n.status) {
                var o = i.remote,
                  s = i.fromMe && i.remote === Store.Conn.me ? 3 : n.data ? n.data.ack : 1;
                e.updateAck(s), Store.Msg.lastReceivedKey[o] = r, Store.Msg.updateLastReceipt(o, n.t), T.isBroadcast(o) && (a ? a.forEach(function(e) {
                  var t = new w(Store.Conn.me, e.id, i.id),
                    n = Store.Msg.get(t);
                  n && (n.ack = 1, Store.Msg.lastReceivedKey[e] = t, Store.Msg.updateLastReceipt(e, n.t))
                }) : v.log("model:msg:createRecord bclist server ack, no recipients")()), t("success")
              }
            })["catch"](function(e) {
              throw t("dropped"), v.error("model:msg:createRecord dropped msg: " + o.id)(), e
            })
          })
        },
        resyncReceipts: function() {
          v.log("Msg:resyncReceipts")();
          var e = [];
          for (var t in Store.Msg.lastReceivedReceipt) {
            var n, r = Store.Chat.get(t);
            if (n = r ? b.gte([0, 5]) ? r.getFirstMsgWithStatus() : r.getFirstMsgFromMe() : void 0) {
              var i = n.id;
              i.t = Store.Msg.lastReceivedReceipt[t], e.push(i)
            } else v.error("Msg:resyncReceipts wid in lastReceivedReceipt, but no msg: " + t)()
          }
          return 0 === e.length ? f["default"].resolve() : P.resyncReceipts(e).then(function(e) {
            _.isArray(e) ? (v.log("Msg:resyncReceipts success")(), e.forEach(function(e) {
              Store.Msg.updateLastReceipt(e.id, e.t), e.acks.forEach(function(t) {
                if (4 === t.length) {
                  var n = t[1],
                    r = n ? Store.Conn.me : e.id,
                    i = n ? e.id : Store.Conn.me,
                    o = new w(r, i, t[0], t[2]),
                    s = Store.Msg.get(o);
                  s && s.updateAck(t[3])
                } else v.error("Msg:resyncReceipts invalid response: " + (0, h["default"])(t))()
              })
            })) : v.error("Msg:resyncReceipts error", e)()
          })["catch"](E.LogoutDrop, E.EphemeralDrop, E.BrowserReplacedDrop, _.noop)["catch"](function() {
            throw v.error("Msg:resyncReceipts dropped")(), new Error("Msg:resyncReceipts dropped")
          })
        },
        updateLastReceipt: function(e, t) {
          var n = this.lastReceivedReceipt[e];
          (!n || t > n) && (this.lastReceivedReceipt[e] = t)
        },
        refreshMediaUrl: function(e) {
          return C.isEncryptedMedia(e.clientUrl) ? void v.warn("Store:msg:refreshMediaUrl:encrypted")() : void(this.refreshMediaPromises[e.id] || (this.refreshMediaPromises[e.id] = e, this._refreshMedia()))
        },
        _refreshMedia: _.debounce(function() {
          var e = _.where(this.refreshMediaPromises, {
            needsRefresh: !0
          });
          0 !== e.length && (e.forEach(function(e) {
            e.set({
              url: null,
              urlState: S.URL_STATE.REFRESHING
            })
          }), S.refreshMedia(_.clone(e)).bind(this)["finally"](function() {
            _.forEach(e, function(e) {
              delete this.refreshMediaPromises[e.id]
            }.bind(this))
          })["catch"](function(t) {
            _.forEach(e, function(e) {
              e.urlState = S.URL_STATE.REFRESH_RETRY
            })
          }))
        }, 500),
        processMultipleMessages: function(e, t, n, r) {
          var i = this,
            s = arguments;
          if (e) {
            var a, c = this.pendingAdd[e];
            return a = c ? c.then(function() {
              return o.apply(i, s)
            }) : o.apply(i, s), a["finally"](function() {
              i.pendingAdd[e] === a && (i.pendingAdd[e] = null)
            }), this.pendingAdd[e] = a
          }
          return o.apply(i, s)
        }
      });
    e.exports = new R
  },
  967: function(e, t, n) {
    "use strict";
    var r = n(62),
      i = n(876),
      o = n(161),
      s = n(358),
      a = n(360),
      c = r.extend({
        props: {
          id: "id",
          t: "number"
        },
        children: {
          contact: o
        },
        initialize: function() {
          this.contact = Store.Contact.gadd({
            id: this.id
          }), this.listenTo(this.contact, "all", this._getEventBubblingHandler("contact"))
        },
        getCollection: function() {
          return this.collection
        }
      }),
      l = s.extend(a, {
        model: c,
        comparator: function(e, t) {
          return o.Comparator(e.contact, t.contact)
        },
        isStateStale: function(e) {
          var t = this.get(e);
          return t && t.stale
        }
      }),
      d = r.extend(i, {
        Collection: "MsgInfo",
        props: {
          id: "msgKey",
          isPTT: "boolean",
          playedRemaining: {
            type: "number",
            "default": 0
          },
          readRemaining: {
            type: "number",
            "default": 0
          },
          deliveryRemaining: {
            type: "number",
            "default": 0
          }
        },
        collections: {
          played: l,
          read: l,
          delivery: l
        },
        derived: {
          settled: {
            deps: ["isPTT", "playedRemaining", "readRemaining"],
            fn: function() {
              return this.isPTT ? !this.playedRemaining : !this.readRemaining
            }
          }
        }
      });
    e.exports = d
  },
  968: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(1),
      a = n(22),
      c = n(108),
      l = n(353),
      d = n(796),
      u = n(967),
      p = n(13),
      h = n(35),
      m = l.extend({
        model: u,
        initialize: function() {
          l.prototype.initialize.call(this, {
            staleCollection: !0
          })
        },
        _initializeStaleCollection: function() {
          var e = this;
          this.listenTo(p, "change:stream", function() {
            p.stream === p.STREAM.DISCONNECTED && e.forEach(function(e) {
              e.settled || e.set("stale", !0)
            })
          })
        },
        _find: function(e) {
          return e.isSentByMe ? h.queryMsgInfo(e.id).then(function(t) {
            return t.status >= 400 ? (s.log("model:MsgInfo:findQuery error " + t.status)(), o["default"].reject(t.status)) : (t.id = e.id, t.isPTT = e.type === d.TYPE.PTT, o["default"].resolve(t))
          }) : o["default"].reject("message not sent by me")
        },
        update: function(e, t, n, r, i, o) {
          var l, d, u = new c(t, n, e, i),
            p = this.get(u),
            h = a.isUser(u.remote);
          if (p) switch (r) {
            case 4:
              if (l = p.played.get(i), l || (p.played.add({
                  id: i,
                  t: o
                }), p.playedRemaining -= 1), h) break;
            case 3:
              if (d = p.read.filter(function(e) {
                  return e.id === i
                }), p.read.remove(d), 3 === r && (p.read.add({
                  id: i,
                  t: o
                }), 0 === d.length && (p.readRemaining -= 1)), h) break;
            case 2:
              d = p.delivery.filter(function(e) {
                return e.id === i
              }), p.delivery.remove(d), 2 === r && (p.delivery.add({
                id: i,
                t: o
              }), 0 === d.length && (p.deliveryRemaining -= 1));
              break;
            default:
              s.error("model:MsgInfo:handle ack err: " + r, arguments)()
          }
        },
        handle: function(e) {
          var t = this,
            n = e.shift();
          switch (n.cmd) {
            case "ack":
              this.update(n.id, n.from, n.to, n.ack, n.participant, n.t);
              break;
            case "acks":
              n.id.forEach(function(e) {
                t.update(e, n.from, n.to, n.ack, n.participant, n.t)
              })
          }
        }
      });
    e.exports = new m
  },
  969: function(e, t, n) {
    "use strict";
    var r = n(1),
      i = n(353),
      o = n(877),
      s = n(15),
      a = "global_mute",
      c = !0,
      l = !0,
      d = !0,
      u = i.extend({
        model: o,
        initialize: function() {
          i.prototype.initialize.call(this, {
            CachePolicy: {
              id: "mute",
              policy: i.CACHE_POLICY.LOAD,
              delay: 1e3
            }
          })
        },
        initializeFromCache: function() {
          var e = s.getGlobalSounds();
          this.setGlobalSounds(e);
          var t = s.getGlobalNotifications();
          this.setGlobalNotifications(t);
          var n = s.getGlobalPreviews();
          this.setGlobalPreviews(n)
        },
        saveToCache: function() {
          if (Store.Conn.me) {
            var e = this._config.CachePolicy.id;
            r.log("models:mute:cache-save: " + e)(), s.setCollection(e, [this.globalMute().toJSON()])
          }
        },
        globalMute: function() {
          var e = this.get(a);
          return e ? e : this.add({
            id: a
          })
        },
        getGlobalSounds: function() {
          return c
        },
        setGlobalSounds: function(e) {
          c = e, s.setGlobalSounds(e)
        },
        getGlobalNotifications: function() {
          return l
        },
        setGlobalNotifications: function(e) {
          l = e, s.setGlobalNotifications(e)
        },
        getGlobalPreviews: function() {
          return d
        },
        setGlobalPreviews: function(e) {
          d = e, s.setGlobalPreviews(e)
        },
        handle: function(e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t],
              r = Store.Chat.get(n.id);
            r && "mute" === n.type && r.mute.setMute(n.muteExpiration)
          }
        }
      });
    e.exports = new u
  },
  970: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(1),
      a = n(353),
      c = n(828),
      l = n(35),
      d = n(63),
      u = n(21),
      p = a.extend({
        model: c,
        initialize: function() {
          a.prototype.initialize.call(this, {
            staleCollection: !0
          }), this.listenTo(d, "change:phoneActive", this.onPresenceSubscribabilityChange)
        },
        _find: function(e) {
          var t = this.gadd(e);
          return t.isUser ? (t.isSubscribed = !0, l.presenceSubscribe(e)["catch"](function(e) {
            return t.isSubscribed = !1, o["default"].reject(e)
          })["catch"](u.WapDrop, _.noop), l.lastseenFind(e).then(function(n) {
            return 423 === n.status ? {
              id: e,
              stale: !0,
              hasData: !1
            } : 401 === n.status ? (t.handle({
              id: e,
              deny: !0
            }), {
              id: e
            }) : (n.id = e, t.handle(n), {
              id: e
            })
          })) : o["default"].resolve({
            id: e
          })
        },
        handle: function(e) {
          var t = e.shift();
          if (t.id === Store.Conn.me) "unavailable" === t.type ? this.forEach(function(e) {
            "unavailable" === e.type || e.stale || this.add({
              id: e.id,
              type: "unavailable",
              t: t.t,
              stale: !1
            }, {
              merge: !0
            })
          }.bind(this)) : s.log('models:presence:handle for self is not "unavailable" !')();
          else {
            var n = this.get(t.id);
            n && ("unsubscribe" === t.type ? n.set({
              isSubscribed: !1,
              stale: !0
            }) : (n.handle(t), n.stale = !1))
          }
        },
        onPresenceSubscribabilityChange: function() {
          d.phoneActive ? Store.Chat.forEach(function(e) {
            e.active && e.presence.isUser && e.presence.update()["catch"](u.WapDrop, _.noop)
          }) : this.forEach(function(e) {
            e.reset(), e.set({
              stale: !0,
              isSubscribed: !1
            })
          })
        }
      });
    e.exports = new p
  },
  971: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(1),
      a = n(353),
      c = n(365),
      l = n(15),
      d = n(35),
      u = n(21),
      p = n(22),
      h = n(362),
      m = n(63),
      f = n(13),
      g = a.extend({
        model: c,
        initialize: function() {
          a.prototype.initialize.call(this, {
            staleCollection: !0,
            CachePolicy: {
              id: "profile_pic_thumb",
              trigger: "change:tag change:raw",
              policy: a.CACHE_POLICY.LOAD,
              delay: 5e3
            }
          }), this.listenTo(m, "change:phoneActive", function() {
            m.phoneActive && this.onPhoneActive()
          })
        },
        get: function(e) {
          var t = a.prototype.get.call(this, e);
          if (!_.isString(e)) return t;
          var n = a.prototype.get.call(this, h(e));
          if (n) {
            if (this.remove(n, {
                silent: !0
              }), t) return t;
            var r = n.toJSON();
            return r.id = e, this.add(r, {
              silent: !0
            })
          }
          return t ? t : void 0
        },
        saveToCache: function() {
          if (Store.Conn.me) {
            var e = this._config.CachePolicy.id,
              t = this.models.filter(function(e) {
                return p.isWid(e.id)
              });
            t = t.map(function(e) {
              return e = e.toJSON(), e.id = h(e.id), e
            }), s.log("models:profilePic:cache-save: " + e)(), l.setCollection(e, t)
          }
        },
        onPhoneActive: function() {
          if (f.stream === f.STREAM.CONNECTED) {
            var e = [];
            this.forEach(function(t) {
              t._uiObservers && t.stale && (t.tag || t.unset("tag", {
                silent: !0
              }), e.push(t.toJSON()))
            }), this.resyncPictures(e)
          }
        },
        onResume: function() {
          var e = this.filter(_.property("_uiObservers")).map(function(e) {
            return e.tag || e.unset("tag", {
              silent: !0
            }), e.toJSON()
          });
          this.resyncPictures(e)
        },
        _find: function(e) {
          var t = Store.Chat.get(e);
          return t && t.isReadOnly ? d.profilePicFindThumbFromPhone(e, this.get(e)) : d.profilePicFind("ProfilePicThumb", e).then(function(t) {
            return 401 === t.status ? {
              id: e,
              raw: void 0,
              tag: ""
            } : 423 === t.status ? {
              id: e,
              stale: !0
            } : t.status >= 400 ? {
              id: e
            } : "undefined" == typeof t.status ? {
              id: e,
              tag: t.tag,
              raw: void 0
            } : void 0
          })["catch"](u.WapDrop, function() {
            return {
              id: e,
              stale: !0
            }
          })
        },
        imageChanged: function(e, t) {
          var n = Store.ProfilePicThumb.get(e);
          n && ("remove" === t ? n.unset("tag") : n.tag !== t && n.update()["catch"](u.WapDrop, _.noop))
        },
        resyncPictures: function(e) {
          return 0 === e.length ? o["default"].resolve() : d.resyncPictures(e).then(function(e) {
            if (423 === e.status) s.warn("ProfilePicThumbStore:resyncPictures blocked")();
            else {
              if (e.status >= 400) throw s.error("ProfilePicThumbStore:resyncPictures error")(), new Error("ProfilePicThumbStore:resyncPictures error");
              if (!_.isArray(e)) throw s.error("ProfilePicThumbStore:resyncPictures unknown reply", e)(), new Error("ProfilePicThumbStore:resyncPictures unknown reply");
              s.log("ProfilePicThumbStore:resyncPictures success")(), e.forEach(function(e) {
                var t = Store.ProfilePicThumb.get(e.id);
                t && t.set({
                  tag: e.tag,
                  raw: void 0,
                  stale: !1
                })
              })
            }
          })["catch"](u.WapDrop, _.noop)["catch"](function(e) {
            throw s.error("ProfilePicThumbStore:resyncPictures dropped: " + e)(), new Error("ProfilePicThumbStore:resyncPictures dropped: " + e)
          })
        }
      });
    e.exports = new g
  },
  972: function(e, t, n) {
    "use strict";

    function r(e) {
      return "number" == typeof e && e > 0 ? e - 1 : a.MAX_GROUP_SIZE
    }

    function i(e) {
      return "number" == typeof e && e > 0 ? 1024 * e * 1024 : a.MAX_MEDIA_UPLOAD_SIZE
    }

    function o(e) {
      return "number" == typeof e && e > 0 ? 1024 * e : a.IMG_MAX_BYTES
    }

    function s(e) {
      var t;
      for (t in d)
        if ("undefined" != typeof e[t]) {
          var n, r, i = d[t];
          _.isArray(i) ? (n = i[0], r = i[1](e[t])) : (n = i, r = e[t]), a[n] = r
        }
      for (t in l.F) "undefined" != typeof e[t] && l.setFeature(t, !!e[t])
    }
    var a = n(7),
      c = n(35),
      l = n(83),
      d = {
        imageMaxEdge: "IMG_MAX_EDGE",
        imageMaxKBytes: ["IMG_MAX_BYTES", o],
        maxParticipants: ["MAX_GROUP_SIZE", r],
        maxSubject: "MAX_SUBJECT_LENGTH",
        media: ["MAX_MEDIA_UPLOAD_SIZE", i]
      },
      u = {
        handle: function(e) {
          var t = e.shift();
          "number" == typeof t.status && t.status >= 400 || s(t)
        },
        fetch: function() {
          return c.queryServerProps().then(function(e) {
            "number" == typeof e.status && e.status >= 400 || s(e)
          })
        }
      };
    e.exports = u
  },
  973: function(e, t, n) {
    "use strict";
    var r = n(62),
      i = r.extend({
        idAttribute: "char",
        props: {
          "char": "string",
          weight: "number"
        }
      });
    e.exports = i
  },
  974: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(7),
      a = n(1),
      c = n(353),
      l = n(973),
      d = n(35),
      u = n(21),
      p = n(356),
      h = n(83),
      m = c.extend({
        model: l,
        comparator: function(e, t) {
          return e.weight > t.weight ? -1 : 1
        },
        initialize: function() {
          c.prototype.initialize.call(this, {
            CachePolicy: {
              id: "recent_emoji_collection",
              policy: c.CACHE_POLICY.LOAD,
              delay: 2e3
            }
          }), this.listenTo(this, "change:weight change:length", this.sortTrimScale), this.dirty = !1, this.syncDue = !1
        },
        "delete": function() {
          c.prototype["delete"].call(this), this.dirty = !1, this.syncDue = !1
        },
        _findQuery: function(e) {
          return h.supportsFeature(h.F.RECENT_EMOJI_SYNC) ? d.recentEmojiQuery(e ? this.toArray() : void 0).then(function(e) {
            return _.isArray(e) ? (e.forEach(function(e) {
              e["char"] = p.normalizeEmoji(e["char"])
            }), o["default"].resolve(e)) : (a.error("models:recentEmoji:findQuery error", e)(), o["default"].reject("recent emoji fetch error"))
          }) : o["default"].reject("gk recent emoji sync unsupported")
        },
        sync: function() {
          var e = this;
          return this.findQuery(this.dirty)["finally"](function() {
            e.dirty = !1
          })["catch"](u.WapDrop, _.noop)
        },
        _sync: _.throttle(function(e, t) {
          e.sync()["finally"](t)
        }, s.EMOJI_SYNC_DELAY, {
          leading: !1
        }),
        periodicSync: function() {
          h.supportsFeature(h.F.RECENT_EMOJI_SYNC) && (a.log("models:recentEmoji:periodicSync due:" + this.syncDue + " dirty: " + this.dirty)(), this.syncDue = !0, this._sync(this, function() {
            this.syncDue = !1
          }.bind(this)))
        },
        sortTrimScale: function() {
          var e = this.length;
          e && (this.sort(), e > 30 && this.remove(this.models.slice(30)), _.first(this.models).weight < 10 && _.last(this.models).weight > .01 || this.forEach(function(t, n) {
            t.weight = 1 + 3 * ((e - n) / e)
          }))
        },
        increment: function(e) {
          this.forEach(function(t) {
            t["char"] === e ? t.weight += 1 : t.weight *= .9, t.weight = Math.round(1e3 * t.weight) / 1e3
          }), this.get(e) || this.add({
            "char": e,
            weight: 1
          }), this.dirty = !0, this.periodicSync()
        }
      });
    e.exports = new m
  },
  975: function(e, t, n) {
    "use strict";
    var r = n(353),
      i = n(796),
      o = n(83),
      s = n(1),
      a = r.extend({
        model: i,
        initialize: function() {
          r.prototype.initialize.call(this);
          var e = {
            NONE: "none",
            INIT: "init",
            SYNCING: "syncing",
            SYNCED: "synced",
            ERROR: "error"
          };
          this.SYNC_STATES = e, this.syncState = this.SYNC_STATES.NONE
        },
        comparator: function(e, t) {
          return t.t - e.t
        },
        sync: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
          if (this.syncState !== this.SYNC_STATES.SYNCING && (this.syncState !== this.SYNC_STATES.SYNCED || e) && o.supportsFeature(o.F.FULL_TEXT_SEARCH)) {
            var t = this;
            t.syncState === this.SYNC_STATES.NONE ? t.syncState = this.SYNC_STATES.INIT : t.syncState = this.SYNC_STATES.SYNCING, t.trigger("sync"), Store.Msg.getStarred().then(function(e) {
              t.set(e), t.syncState = t.SYNC_STATES.SYNCED, t.trigger("sync")
            })["catch"](function(e) {
              s.error("starred msg sync error: ", e)(), t.syncState = t.SYNC_STATES.ERROR
            })
          }
        },
        "delete": function() {
          r.prototype["delete"].call(this), this.syncState = this.SYNC_STATES.NONE
        }
      });
    e.exports = new a
  },
  976: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(1),
      c = n(353),
      l = n(361),
      d = n(35),
      u = n(21),
      p = n(63),
      h = n(13),
      m = n(8),
      f = n(83),
      g = n(164),
      v = c.extend({
        model: l,
        initialize: function() {
          c.prototype.initialize.call(this, {
            staleCollection: !0
          }), this.listenTo(p, "change:phoneActive", function() {
            p.phoneActive && this.onPhoneActive()
          })
        },
        onPhoneActive: function() {
          h.stream === h.STREAM.CONNECTED && this.onResume()
        },
        onResume: function() {
          this.filter(_.property("_uiObservers")).forEach(function(e) {
            Store.Status.find(e.id)["catch"](u.WapDrop, _.noop)
          })
        },
        _find: function(e) {
          return d.statusFind(e).then(function(t) {
            return _.isNumber(t.status) ? 423 === t.status ? {
              id: e,
              stale: !0,
              status: ""
            } : t.status >= 400 ? {
              id: e,
              status: ""
            } : void 0 : {
              id: e,
              status: t.status
            }
          })["catch"](u.WapDrop, function() {
            return {
              id: e,
              stale: !0,
              status: ""
            }
          })
        },
        _handle: function(e) {
          return e
        },
        canSetMyStatus: function() {
          return f.supportsFeature(f.F.SET_STATUS)
        },
        setMyStatus: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
          if (e = e.trim(), !e) return o["default"].reject(new u.ActionError);
          if (!this.canSetMyStatus()) return o["default"].reject(new u.ActionError);
          var t = d.sendSetStatus(e),
            n = l10n.t("action_status_setting"),
            r = t.then(function(e) {
              return 200 === e.status ? l10n.t("action_status_set") : e.status >= 400 ? l10n.t("action_status_set_failed") : void 0
            })["catch"](function(e) {
              throw a.error("models:statusCollection:setMyStatus dropped")(e), l10n.t("action_status_set_failed")
            });
          return m.openToast(s.createElement(g, {
            id: g.genId(),
            pendingText: n,
            actionText: r,
            retry: this.setMyStatus.bind(this, e)
          })), t.bind(this).then(function(t) {
            200 !== t.status || t._duplicate || (this.get(Store.Conn.me).status = e)
          })
        }
      });
    e.exports = new v
  },
  977: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(796),
      o = n(799),
      s = n(8),
      a = n(352),
      c = n(798),
      l = n(838),
      d = n(83),
      u = n(105),
      p = r.createClass({
        displayName: "MultiselectFooter",
        mixins: [u],
        propTypes: {
          chat: r.PropTypes.instanceOf(o).isRequired,
          selectedMessages: r.PropTypes.arrayOf(r.PropTypes.instanceOf(i)).isRequired,
          onCancel: r.PropTypes.func.isRequired
        },
        componentWillMount: function() {
          this.componentWillReceiveProps()
        },
        componentWillReceiveProps: function() {
          var e = this,
            t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            n = t.selectedMessages || [],
            r = this.props.selectedMessages;
          _.difference(n, r).forEach(function(t) {
            return e.addObserver(t, "change:star")
          }), _.difference(r, n).forEach(function(t) {
            return e.removeObserver(t, "change:star")
          })
        },
        onStarSelected: function() {
          this.props.chat.sendStarMsgs(this.props.selectedMessages, !0)
        },
        onUnstarSelected: function() {
          this.props.chat.sendStarMsgs(this.props.selectedMessages, !1)
        },
        onDeleteSelected: function() {
          var e = this,
            t = this.props.selectedMessages,
            n = function() {
              s.closeModal(), e.props.chat.sendDeleteMsgs(t), e.props.onCancel()
            },
            i = _.size(t),
            o = l10n.t("delete_message_confirmation", {
              count: i,
              _plural: i
            });
          s.openModal(r.createElement(a, {
            onOK: n,
            okText: l10n.t("web_delete"),
            onCancel: s.closeModal.bind(s),
            cancelText: l10n.t("web_cancel")
          }, r.createElement(c, {
            text: o
          })))
        },
        onForwardSelected: function() {
          var e = this,
            t = this.props.selectedMessages,
            n = _.size(t);
          if (_.any(t, "canForward"))
            if (_.some(t, _.negate(_.property("canForward")))) {
              var i = _.filter(t, _.property("canForward"));
              s.openModal(r.createElement(a, {
                title: l10n.t("confirm_forward_partial_messages_title"),
                onOK: function() {
                  return s.openModal(r.createElement(l, {
                    msgs: i
                  }), "modal-flow")
                },
                okText: l10n.t("web_ok"),
                onCancel: s.closeModal.bind(s),
                cancelText: l10n.t("web_cancel")
              }, l10n.t("confirm_forward_partial_messages_text")))
            } else {
              var o = function() {
                e.props.onCancel()
              };
              s.openModal(r.createElement(l, {
                msgs: t,
                onForward: o
              }), "modal-flow")
            }
          else s.openModal(r.createElement(a, {
            title: l10n.t("err_unsent_forward_title"),
            onOK: s.closeModal.bind(s),
            okText: l10n.t("web_ok")
          }, l10n.t("err_unsent_forward_text", {
            count: n,
            _plural: n
          })))
        },
        render: function() {
          var e, t = this.props.selectedMessages,
            n = _.size(t),
            i = r.createElement("button", {
              className: "btn-icon btn-forward",
              disabled: n ? null : "disabled",
              title: l10n.t("forward_message", {
                count: n,
                _plural: n
              }),
              onClick: this.onForwardSelected
            }, r.createElement("span", {
              className: "icon icon-forward"
            }));
          d.supportsFeature(d.F.MESSAGE_DELETE) && (e = r.createElement("button", {
            className: "btn-icon btn-delete",
            disabled: n ? null : "disabled",
            title: l10n.t("delete_message", {
              count: n,
              _plural: n
            }),
            onClick: this.onDeleteSelected
          }, r.createElement("span", {
            className: "icon icon-delete"
          })));
          var o;
          if (d.supportsFeature(d.F.STARRED)) {
            var s, a, c;
            n && _.every(t, "star") ? (s = this.onUnstarSelected, a = r.createElement("span", {
              className: "icon icon-unstar-btn"
            }), c = l10n.t("unstar_message", {
              count: n,
              _plural: n
            })) : (s = this.onStarSelected, a = r.createElement("span", {
              className: "icon icon-star-btn"
            }), c = l10n.t("star_message", {
              count: n,
              _plural: n
            })), o = r.createElement("button", {
              className: "btn-icon btn-star",
              disabled: n ? null : "disabled",
              title: c,
              onClick: s
            }, a)
          }
          return r.createElement("div", {
            className: "multi-controls"
          }, r.createElement("button", {
            className: "btn-icon btn-cancel",
            onClick: this.props.onCancel
          }, r.createElement("span", {
            className: "icon icon-x"
          })), r.createElement("span", {
            className: "multi-count"
          }, l10n.t("selected_count", {
            count: n,
            _plural: n
          })), o, e, i)
        }
      });
    e.exports = p
  },
  978: function(e, t) {
    "use strict";
    e.exports = {
      Action: "keyboard_action",
      Event: "keyboard_event",
      Events: {
        LOGGED_IN: "logged_in",
        LOGGED_OUT: "logged_out",
        ARCHIVE: "archived",
        MUTE: "muted",
        READ: "read",
        READ_ONLY: "read_only",
        CHAT_KIND: "chat_kind"
      },
      Actions: {
        NEW_CHAT: "new_chat",
        NEW_GROUP: "new_group",
        PROFILE_STATUS: "profile_status",
        LOGOUT: "logout",
        SEARCH: "search",
        ZOOM_IN: "zoom_in",
        ZOOM_OUT: "zoom_out",
        ZOOM_RESET: "zoom_reset",
        TOGGLE_UNREAD: "toggle_unread",
        DELETE_CHAT: "delete_chat",
        DELETE_GROUP: "delete_group",
        EXIT_GROUP: "exit_group",
        TOGGLE_ARCHIVE: "toggle_archive",
        TOGGLE_MUTE: "toggle_mute",
        NEXT_CHAT: "next_chat",
        PREV_CHAT: "prev_chat"
      }
    }
  },
  979: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(6),
      a = n(7),
      c = n(84),
      l = n(105),
      d = n(106),
      u = n(22),
      p = n(63),
      h = n(21),
      m = n(831),
      f = n(367),
      g = s.createClass({
        displayName: "NotificationManager",
        mixins: [c, l, d],
        componentWillMount: function() {
          this.tone = new Audio(a.NOTIFICATION_TONE_PATH), this.regCmd("alert_new_msg", this.alertNewMsg), this.regCmd("alert_call", this.showCallNotification), this.regCmd("cancel_call", this.cancelCallNotification), this.addObserver(Store.Chat, "add remove reset change:unreadCount", this.updateUnreadCount), this.addObserver(Store.Chat, "change:hasUnread", this.closeNotifications), this.addObserver(p, "change:displayInfo", this.updateUnreadCount)
        },
        componentDidMount: function() {
          this.updateUnreadCount()
        },
        componentWillUnmount: function() {
          f.setTitleAndIcon(0), f.closeAllNotifications()
        },
        closeNotifications: function(e, t) {
          t || f.closeChatNotifications(e.id)
        },
        updateUnreadCount: function() {
          var e;
          e = p.displayInfo === p.INFO.OFFLINE ? -1 : p.displayInfo === p.INFO.TIMEOUT ? -1 : Store.Chat.filter(function(e) {
            return !e.archive && e.isDirty()
          }).length, this.count !== e && (this.count = e, f.setTitleAndIcon(e))
        },
        alertNewMsg: function(e) {
          var t = e.get("chat");
          if ((!document.hasFocus() || !t.get("active")) && !Store.Mute.globalMute().isMuted && !t.mute.isMuted && (Store.Mute.getGlobalNotifications() && this.showDesktopNotification(e), Store.Mute.getGlobalSounds()))
            if (t.isGroup) {
              var n = Date.now(),
                r = t.squelch || 0;
              n > r && (this.playAudioNotification(), Store.GroupMetadata.find(t.id).then(function(e) {
                var r = e.participants.length,
                  i = 1e3 * Math.min(120, 30 + 5 * r);
                t.squelch = n + i
              })["catch"](h.WapDrop, function() {
                t.squelch = n + 6e4
              }))
            } else this.playAudioNotification()
        },
        showCallNotification: function(e, t) {
          if (window.Notification && window.Notification.permission === a.PERMISSION_ALLOWED) {
            var n = Store.Contact.get(t),
              r = n ? n.get("formattedName") : u.formattedUser(t),
              i = l10n.t("incoming_call_notification_title", {
                name: r
              }),
              s = l10n.t("incoming_call_notification_text");
            Store.ProfilePicThumb.find(t).timeout(1e3, "showCallNotificationTimeout").then(function(n) {
              var r = n && n.get("img") ? n.get("img") : a.USER_DEFAULT_ICON;
              f.showNotification(t, e, i, s, r, !0)
            })["catch"](h.WapDrop, o["default"].TimeoutError, function(n) {
              f.showNotification(t, e, i, s, a.USER_DEFAULT_ICON, !0)
            }), Store.Mute.getGlobalSounds() && this.playAudioNotification()
          }
        },
        cancelCallNotification: function(e) {
          f.closeNotification(e), Store.Call.remove(Store.Call.get(e))
        },
        showDesktopNotification: function(e) {
          if (window.Notification && window.Notification.permission === a.PERMISSION_ALLOWED) {
            var t = e.get("chat"),
              n = t.get("id"),
              r = m.asDesktopNotification(e);
            r && r.charCodeAt(0) >= 128 && (r = " " + r);
            var i = t.isGroup ? a.GROUP_DEFAULT_ICON : a.USER_DEFAULT_ICON,
              s = t.isGroup ? l10n.t("default_group_message_notification_title") : l10n.t("default_contact_message_notification_title");
            Store.ProfilePicThumb.find(n).timeout(1500, "showDesktopNotificationTimeout").then(function(o) {
              var a = t.contact.formattedName || s,
                c = o ? o.img : "";
              f.showNotification(n, e.id, a, r, c || i)
            })["catch"](h.WapDrop, o["default"].TimeoutError, function(o) {
              var a = t.contact.formattedName || s;
              f.showNotification(n, e.id, a, r, i)
            })
          }
        },
        playAudioNotification: function() {
          this.tone.play()
        },
        render: function() {
          return null
        }
      });
    e.exports = g
  },
  980: function(e, t, n) {
    "use strict";
    var r = n(6),
      i = n(84),
      o = n(107),
      s = n(44),
      a = 3,
      c = r.createClass({
        displayName: "ToastManager",
        mixins: [i],
        componentWillMount: function() {
          this.regCmd("open_toast", this.openToast), this.regCmd("close_toast", this.closeToast)
        },
        getInitialState: function() {
          return {
            toasts: {}
          }
        },
        openToast: function(e, t) {
          var n;
          (n = this.refs[e.props.id]) ? n.restartDelay(): (this.state.toasts[e.props.id] = e, this.setState({
            toasts: this.state.toasts
          }))
        },
        closeToast: function(e) {
          var t = this.state.toasts;
          t[e.props.id] && this.setState({
            toasts: _.omit(t, e.props.id)
          })
        },
        componentWillUpdate: function(e, t) {
          this.animateEnter = _.size(this.state.toasts) > _.size(t.toasts)
        },
        render: function() {
          var e = this.animateEnter,
            t = _.chain(this.state.toasts).sortBy("id").reverse().map(function(t, n) {
              var i = a > n ? "slide" + n : "slide" + a;
              return 0 !== n || e || (i = ""), r.cloneElement(t, {
                key: t.props.id,
                ref: t.props.id,
                className: i
              })
            }).value(),
            n = s.isTrident ? "fade_sifo" : "toast-transition";
          return r.createElement(o, {
            transitionName: n
          }, t)
        }
      });
    e.exports = c
  },
  981: function(e, t) {
    "use strict";
    e.exports = {
      "Smileys & People": ["ordered1359", "ordered1403", "ordered1360", "ordered1361", "ordered1362", "ordered1363", "ordered1364", "ordered1365", "ordered1366", "ordered1368", "ordered1369", "ordered1425", "ordered1426", "ordered0078", "ordered1370", "ordered1371", "ordered1372", "ordered1383", "ordered1382", "ordered1384", "ordered1385", "ordered1387", "ordered1388", "ordered1386", "ordered1592", "ordered1594", "ordered1373", "ordered1598", "ordered1374", "ordered1413", "ordered1375", "ordered1376", "ordered1377", "ordered1427", "ordered1595", "ordered1410", "ordered1389", "ordered1390", "ordered1391", "ordered1392", "ordered1379", "ordered1380", "ordered1424", "ordered0077", "ordered1394", "ordered1381", "ordered1402", "ordered1400", "ordered1395", "ordered1405", "ordered1408", "ordered1399", "ordered1407", "ordered1406", "ordered1397", "ordered1398", "ordered1393", "ordered1396", "ordered1401", "ordered1378", "ordered1404", "ordered1412", "ordered1409", "ordered1591", "ordered1414", "ordered1593", "ordered1596", "ordered1411", "ordered1114", "ordered1119", "ordered1367", "ordered1043", "ordered1032", "ordered1033", "ordered1044", "ordered1034", "ordered1041", "ordered1597", "ordered1417", "ordered1415", "ordered1416", "ordered1418", "ordered1419", "ordered1420", "ordered1423", "ordered1422", "ordered1421", "ordered1455", "ordered0896", "ordered0872", "ordered0884", "ordered0890", "ordered0866", "ordered0144", "ordered0156", "ordered0878", "ordered0150", "ordered0902", "ordered1120", "ordered1473", "ordered0063", "ordered0842", "ordered0848", "ordered0854", "ordered0860", "ordered1322", "ordered1316", "ordered1599", "ordered1328", "ordered0162", "ordered1064", "ordered0840", "ordered0841", "ordered0828", "ordered0834", "ordered0826", "ordered0825", "ordered0927", "ordered0928", "ordered1349", "ordered1014", "ordered0929", "ordered0935", "ordered0941", "ordered0947", "ordered0984", "ordered1002", "ordered1008", "ordered0990", "ordered0996", "ordered0971", "ordered1020", "ordered1051", "ordered1306", "ordered0616", "ordered1035", "ordered1026", "ordered0978", "ordered1548", "ordered0678", "ordered1057", "ordered0977", "ordered0968", "ordered0969", "ordered0970", "ordered1440", "ordered1045", "ordered1428", "ordered1434", "ordered1449", "ordered1467", "ordered1461", "ordered1076", "ordered1070", "ordered1093", "ordered1095", "ordered1094", "ordered1089", "ordered1091", "ordered1090", "ordered0953", "ordered0960", "ordered0961", "ordered0959", "ordered0962", "ordered0963", "ordered0965", "ordered0966", "ordered0964", "ordered0967", "ordered0954", "ordered0956", "ordered0957", "ordered0955", "ordered0958", "ordered0917", "ordered0912", "ordered0913", "ordered0911", "ordered0914", "ordered0916", "ordered0915", "ordered1063", "ordered1085", "ordered0926", "ordered0923", "ordered0924", "ordered0925", "ordered0921", "ordered0922", "ordered0909", "ordered0652", "ordered0635", "ordered0908", "ordered0119", "ordered0634", "ordered0920", "ordered0918", "ordered0919", "ordered1143", "ordered0910", "ordered1307", "ordered1087", "ordered0487"],
      "Animals & Nature": ["ordered0815", "ordered0810", "ordered0806", "ordered0818", "ordered0809", "ordered0820", "ordered0821", "ordered0801", "ordered0808", "ordered1606", "ordered0807", "ordered0816", "ordered0822", "ordered0817", "ordered0786", "ordered0814", "ordered1446", "ordered1447", "ordered1448", "ordered0779", "ordered0781", "ordered0800", "ordered0799", "ordered0797", "ordered0796", "ordered0798", "ordered0819", "ordered0784", "ordered0813", "ordered1609", "ordered0790", "ordered0788", "ordered0773", "ordered0791", "ordered0789", "ordered1308", "ordered1607", "ordered1605", "ordered0774", "ordered0795", "ordered0793", "ordered0792", "ordered0794", "ordered0805", "ordered0812", "ordered0772", "ordered0771", "ordered0767", "ordered0766", "ordered0764", "ordered0763", "ordered0765", "ordered0803", "ordered0804", "ordered0785", "ordered0777", "ordered0776", "ordered0778", "ordered0775", "ordered0783", "ordered0761", "ordered0762", "ordered0780", "ordered1608", "ordered1273", "ordered0782", "ordered0802", "ordered0769", "ordered0768", "ordered0824", "ordered0823", "ordered0770", "ordered0811", "ordered0536", "ordered0615", "ordered0533", "ordered0534", "ordered0535", "ordered0532", "ordered0546", "ordered0062", "ordered0547", "ordered0629", "ordered0627", "ordered0550", "ordered0549", "ordered0548", "ordered0545", "ordered0541", "ordered0542", "ordered0540", "ordered0538", "ordered0543", "ordered0539", "ordered1092", "ordered0551", "ordered0531", "ordered0614", "ordered0787", "ordered1309", "ordered0499", "ordered0498", "ordered0500", "ordered0506", "ordered0507", "ordered0508", "ordered0509", "ordered0502", "ordered0503", "ordered0504", "ordered0505", "ordered0511", "ordered0514", "ordered0512", "ordered0513", "ordered0515", "ordered0510", "ordered0200", "ordered0516", "ordered1126", "ordered0174", "ordered0057", "ordered0053", "ordered0519", "ordered0115", "ordered0520", "ordered0521", "ordered0054", "ordered0522", "ordered0116", "ordered0524", "ordered0107", "ordered1247", "ordered1115", "ordered0177", "ordered0523", "ordered0056", "ordered0114", "ordered0527", "ordered1118", "ordered0525", "ordered0526", "ordered0055", "ordered0060", "ordered1117", "ordered1116", "ordered0495"],
      "Food & Drink": ["ordered0562", "ordered0561", "ordered0563", "ordered0557", "ordered0558", "ordered0559", "ordered0556", "ordered0554", "ordered0566", "ordered0555", "ordered0565", "ordered0564", "ordered0560", "ordered0552", "ordered0553", "ordered0537", "ordered0544", "ordered0579", "ordered0594", "ordered0577", "ordered1610", "ordered0570", "ordered0569", "ordered0583", "ordered0598", "ordered0567", "ordered0578", "ordered0528", "ordered0568", "ordered0576", "ordered0529", "ordered0530", "ordered0575", "ordered0597", "ordered0584", "ordered0582", "ordered0596", "ordered0574", "ordered0572", "ordered0573", "ordered0571", "ordered0581", "ordered0580", "ordered0586", "ordered0587", "ordered0585", "ordered0595", "ordered0613", "ordered0593", "ordered0591", "ordered0592", "ordered0590", "ordered0610", "ordered0588", "ordered0589", "ordered0605", "ordered0606", "ordered0602", "ordered0603", "ordered0604", "ordered0609", "ordered0601", "ordered0600", "ordered0061", "ordered0607", "ordered0599", "ordered0608"],
      Activity: ["ordered0112", "ordered0675", "ordered0698", "ordered0113", "ordered0673", "ordered0716", "ordered0699", "ordered0660", "ordered0127", "ordered0712", "ordered0719", "ordered0753", "ordered0718", "ordered0717", "ordered0715", "ordered0674", "ordered0130", "ordered0677", "ordered0131", "ordered0754", "ordered0646", "ordered1514", "ordered0700", "ordered0684", "ordered1563", "ordered0132", "ordered0706", "ordered1536", "ordered1542", "ordered0692", "ordered1305", "ordered0691", "ordered0672", "ordered0690", "ordered0636", "ordered0637", "ordered0751", "ordered0654", "ordered0642", "ordered0656", "ordered0651", "ordered0653", "ordered0647", "ordered0650", "ordered0671", "ordered0668", "ordered0666", "ordered0669", "ordered0667", "ordered0670", "ordered0655", "ordered0657", "ordered1042", "ordered0658", "ordered0661", "ordered0659", "ordered0662"],
      "Travel & Places": ["ordered1502", "ordered1500", "ordered1504", "ordered1491", "ordered1493", "ordered0714", "ordered1498", "ordered1496", "ordered1497", "ordered1495", "ordered1505", "ordered1506", "ordered1507", "ordered0713", "ordered1534", "ordered1524", "ordered1499", "ordered1492", "ordered1503", "ordered1501", "ordered1512", "ordered1511", "ordered1510", "ordered1482", "ordered1490", "ordered1508", "ordered1483", "ordered1484", "ordered1487", "ordered1509", "ordered1481", "ordered1485", "ordered1486", "ordered1489", "ordered1488", "ordered1480", "ordered1586", "ordered0142", "ordered1587", "ordered1588", "ordered0129", "ordered1585", "ordered1520", "ordered0128", "ordered1590", "ordered1479", "ordered1589", "ordered1141", "ordered0099", "ordered1523", "ordered0139", "ordered1494", "ordered1522", "ordered1521", "ordered0676", "ordered1513", "ordered0644", "ordered0645", "ordered0643", "ordered0723", "ordered0486", "ordered1355", "ordered0745", "ordered0126", "ordered0633", "ordered0124", "ordered0720", "ordered1354", "ordered0496", "ordered1357", "ordered0721", "ordered0138", "ordered0730", "ordered1583", "ordered1584", "ordered0490", "ordered0489", "ordered0728", "ordered0722", "ordered0729", "ordered0492", "ordered0491", "ordered0725", "ordered0488", "ordered0494", "ordered0497", "ordered0517", "ordered0623", "ordered0622", "ordered0493", "ordered0724", "ordered0748", "ordered0747", "ordered0731", "ordered1356", "ordered0732", "ordered0733", "ordered0726", "ordered0734", "ordered0744", "ordered0735", "ordered0736", "ordered0737", "ordered0738", "ordered0740", "ordered0742", "ordered0743", "ordered0741", "ordered1096", "ordered0727", "ordered0123", "ordered1275", "ordered1276", "ordered1274", "ordered0122"],
      Objects: ["ordered0027", "ordered1196", "ordered1197", "ordered1142", "ordered0029", "ordered1334", "ordered1335", "ordered1336", "ordered1337", "ordered1310", "ordered1345", "ordered1144", "ordered1145", "ordered1146", "ordered1147", "ordered1207", "ordered1202", "ordered1203", "ordered1204", "ordered0648", "ordered1208", "ordered0641", "ordered1177", "ordered0058", "ordered1178", "ordered1179", "ordered1205", "ordered1206", "ordered0638", "ordered0639", "ordered0640", "ordered0038", "ordered0039", "ordered0037", "ordered1303", "ordered0040", "ordered0028", "ordered1180", "ordered1221", "ordered1222", "ordered1111", "ordered1248", "ordered1302", "ordered1342", "ordered1582", "ordered1139", "ordered1136", "ordered1135", "ordered1137", "ordered1138", "ordered1131", "ordered1134", "ordered1088", "ordered0101", "ordered1249", "ordered1250", "ordered0098", "ordered1580", "ordered0118", "ordered1251", "ordered0103", "ordered0120", "ordered1253", "ordered1113", "ordered1252", "ordered1348", "ordered0100", "ordered1581", "ordered1528", "ordered0069", "ordered0110", "ordered0111", "ordered0755", "ordered1256", "ordered1209", "ordered1082", "ordered0102", "ordered1255", "ordered1254", "ordered1304", "ordered1084", "ordered1083", "ordered0518", "ordered0752", "ordered1232", "ordered1560", "ordered1562", "ordered1569", "ordered1227", "ordered1346", "ordered1574", "ordered1575", "ordered1578", "ordered1526", "ordered1577", "ordered1338", "ordered1353", "ordered0125", "ordered1358", "ordered1576", "ordered0624", "ordered0631", "ordered0611", "ordered0612", "ordered0626", "ordered0625", "ordered0630", "ordered0632", "ordered0628", "ordered0746", "ordered0143", "ordered1188", "ordered1187", "ordered1186", "ordered1086", "ordered1193", "ordered1189", "ordered1190", "ordered1191", "ordered1192", "ordered1185", "ordered1194", "ordered1184", "ordered1183", "ordered1175", "ordered1150", "ordered1164", "ordered1157", "ordered1155", "ordered1156", "ordered1151", "ordered1152", "ordered1153", "ordered1344", "ordered1154", "ordered1340", "ordered1352", "ordered1341", "ordered1158", "ordered1343", "ordered1148", "ordered1149", "ordered1339", "ordered1347", "ordered1195", "ordered1166", "ordered1168", "ordered1170", "ordered1171", "ordered1172", "ordered1167", "ordered1165", "ordered1173", "ordered1169", "ordered1233", "ordered1161", "ordered1311", "ordered0140", "ordered1163", "ordered1162", "ordered1159", "ordered1160", "ordered1525", "ordered0749", "ordered0750", "ordered1226", "ordered1228", "ordered1229", "ordered1225", "ordered1312", "ordered1313", "ordered0169", "ordered1176", "ordered0168", "ordered1315", "ordered1314", "ordered1223", "ordered1224"],
      Symbols: ["ordered0186", "ordered1105", "ordered1104", "ordered1103", "ordered1106", "ordered1098", "ordered0185", "ordered1099", "ordered1108", "ordered1097", "ordered1101", "ordered1100", "ordered1102", "ordered1107", "ordered1109", "ordered0074", "ordered0172", "ordered0073", "ordered1272", "ordered0076", "ordered0173", "ordered1257", "ordered1277", "ordered0075", "ordered0072", "ordered1579", "ordered0117", "ordered0079", "ordered0080", "ordered0081", "ordered0082", "ordered0083", "ordered0084", "ordered0085", "ordered0086", "ordered0087", "ordered0088", "ordered0089", "ordered0090", "ordered0216", "ordered0104", "ordered0475", "ordered0481", "ordered0070", "ordered0071", "ordered1199", "ordered1198", "ordered0478", "ordered0472", "ordered0480", "ordered0482", "ordered0479", "ordered0176", "ordered0222", "ordered0484", "ordered1129", "ordered0483", "ordered0205", "ordered0204", "ordered0476", "ordered0477", "ordered0474", "ordered0208", "ordered0209", "ordered0212", "ordered0213", "ordered0210", "ordered0220", "ordered0121", "ordered1174", "ordered1527", "ordered0179", "ordered0201", "ordered1112", "ordered0095", "ordered1554", "ordered1531", "ordered1535", "ordered1533", "ordered1240", "ordered1200", "ordered0184", "ordered0183", "ordered0181", "ordered0182", "ordered0015", "ordered0016", "ordered1130", "ordered1215", "ordered1216", "ordered1259", "ordered0105", "ordered0203", "ordered0106", "ordered1555", "ordered1258", "ordered0096", "ordered0473", "ordered1140", "ordered0178", "ordered0175", "ordered0180", "ordered0141", "ordered1110", "ordered0485", "ordered0192", "ordered0501", "ordered0044", "ordered0739", "ordered0471", "ordered1570", "ordered1571", "ordered1572", "ordered1573", "ordered0097", "ordered1529", "ordered1561", "ordered0211", "ordered1532", "ordered1556", "ordered1557", "ordered1559", "ordered1558", "ordered1530", "ordered0649", "ordered1201", "ordered0470", "ordered0218", "ordered0219", "ordered0221", "ordered0214", "ordered0217", "ordered0215", "ordered0003", "ordered0004", "ordered0005", "ordered0006", "ordered0007", "ordered0008", "ordered0009", "ordered0010", "ordered0011", "ordered0012", "ordered1241", "ordered1244", "ordered0047", "ordered0041", "ordered0036", "ordered0042", "ordered0043", "ordered0034", "ordered0035", "ordered0030", "ordered0031", "ordered1210", "ordered1211", "ordered1212", "ordered0048", "ordered1270", "ordered1271", "ordered0032", "ordered0033", "ordered0190", "ordered0195", "ordered0196", "ordered0197", "ordered0022", "ordered0023", "ordered0024", "ordered0021", "ordered0020", "ordered0019", "ordered1214", "ordered0026", "ordered0025", "ordered0193", "ordered0194", "ordered0001", "ordered0002", "ordered0018", "ordered1246", "ordered1243", "ordered1242", "ordered1245", "ordered0664", "ordered0665", "ordered0202", "ordered0191", "ordered0170", "ordered1213", "ordered0187", "ordered0188", "ordered0189", "ordered0171", "ordered1133", "ordered1132", "ordered0013", "ordered0014", "ordered0017", "ordered1236", "ordered1235", "ordered1237", "ordered1239", "ordered1238", "ordered0059", "ordered1234", "ordered0108", "ordered0109", "ordered1262", "ordered1263", "ordered1266", "ordered1267", "ordered1264", "ordered1265", "ordered1268", "ordered0045", "ordered0046", "ordered0198", "ordered0199", "ordered1269", "ordered0050", "ordered0049", "ordered0052", "ordered0051", "ordered1260", "ordered1261", "ordered1218", "ordered1219", "ordered1220", "ordered1217", "ordered1182", "ordered1181", "ordered1230", "ordered1231", "ordered0207", "ordered0206", "ordered0091", "ordered0092", "ordered0093", "ordered0094", "ordered0663", "ordered0827", "ordered1128", "ordered1351", "ordered1127", "ordered1278", "ordered1279", "ordered1280", "ordered1281", "ordered1282", "ordered1283", "ordered1284", "ordered1285", "ordered1286", "ordered1287", "ordered1288", "ordered1289", "ordered1290", "ordered1291", "ordered1292", "ordered1293", "ordered1294", "ordered1295", "ordered1296", "ordered1297", "ordered1298", "ordered1299", "ordered1300", "ordered1301"],
      Flags: ["ordered0225", "ordered0237", "ordered0228", "ordered0283", "ordered0233", "ordered0223", "ordered0230", "ordered0227", "ordered0231", "ordered0226", "ordered0232", "ordered0229", "ordered0236", "ordered0235", "ordered0234", "ordered0238", "ordered0254", "ordered0245", "ordered0241", "ordered0240", "ordered0257", "ordered0242", "ordered0258", "ordered0247", "ordered0249", "ordered0255", "ordered0251", "ordered0252", "ordered0239", "ordered0256", "ordered0253", "ordered0328", "ordered0458", "ordered0250", "ordered0244", "ordered0243", "ordered0246", "ordered0273", "ordered0339", "ordered0268", "ordered0259", "ordered0322", "ordered0346", "ordered0262", "ordered0435", "ordered0267", "ordered0269", "ordered0275", "ordered0260", "ordered0270", "ordered0341", "ordered0263", "ordered0261", "ordered0266", "ordered0271", "ordered0319", "ordered0272", "ordered0274", "ordered0276", "ordered0277", "ordered0280", "ordered0279", "ordered0281", "ordered0282", "ordered0284", "ordered0286", "ordered0430", "ordered0310", "ordered0288", "ordered0285", "ordered0290", "ordered0291", "ordered0294", "ordered0296", "ordered0293", "ordered0292", "ordered0297", "ordered0302", "ordered0396", "ordered0436", "ordered0298", "ordered0307", "ordered0301", "ordered0278", "ordered0304", "ordered0305", "ordered0311", "ordered0306", "ordered0300", "ordered0309", "ordered0314", "ordered0313", "ordered0303", "ordered0308", "ordered0315", "ordered0316", "ordered0320", "ordered0318", "ordered0317", "ordered0321", "ordered0331", "ordered0327", "ordered0323", "ordered0330", "ordered0329", "ordered0324", "ordered0326", "ordered0325", "ordered0332", "ordered0265", "ordered0334", "ordered0336", "ordered0333", "ordered0335", "ordered0347", "ordered0337", "ordered0340", "ordered0464", "ordered0345", "ordered0338", "ordered0348", "ordered0357", "ordered0349", "ordered0354", "ordered0353", "ordered0358", "ordered0351", "ordered0355", "ordered0356", "ordered0369", "ordered0365", "ordered0363", "ordered0377", "ordered0379", "ordered0376", "ordered0366", "ordered0374", "ordered0364", "ordered0371", "ordered0372", "ordered0375", "ordered0466", "ordered0378", "ordered0295", "ordered0361", "ordered0360", "ordered0368", "ordered0362", "ordered0373", "ordered0359", "ordered0380", "ordered0367", "ordered0381", "ordered0390", "ordered0389", "ordered0387", "ordered0382", "ordered0392", "ordered0386", "ordered0383", "ordered0385", "ordered0391", "ordered0384", "ordered0370", "ordered0343", "ordered0388", "ordered0393", "ordered0399", "ordered0406", "ordered0404", "ordered0394", "ordered0397", "ordered0407", "ordered0395", "ordered0398", "ordered0402", "ordered0400", "ordered0405", "ordered0403", "ordered0408", "ordered0409", "ordered0410", "ordered0412", "ordered0413", "ordered0248", "ordered0420", "ordered0342", "ordered0350", "ordered0401", "ordered0456", "ordered0463", "ordered0424", "ordered0429", "ordered0414", "ordered0425", "ordered0411", "ordered0416", "ordered0423", "ordered0419", "ordered0431", "ordered0422", "ordered0421", "ordered0415", "ordered0426", "ordered0467", "ordered0312", "ordered0344", "ordered0428", "ordered0289", "ordered0352", "ordered0417", "ordered0427", "ordered0433", "ordered0418", "ordered0264", "ordered0432", "ordered0448", "ordered0439", "ordered0449", "ordered0438", "ordered0441", "ordered0437", "ordered0440", "ordered0444", "ordered0446", "ordered0443", "ordered0445", "ordered0442", "ordered0434", "ordered0447", "ordered0451", "ordered0450", "ordered0224", "ordered0299", "ordered0452", "ordered0459", "ordered0453", "ordered0454", "ordered0461", "ordered0455", "ordered0457", "ordered0460", "ordered0462", "ordered0287", "ordered0465", "ordered0468", "ordered0469"]
    }
  },
  982: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(167),
      o = r(i),
      s = n(168),
      a = r(s),
      c = function() {
        function e() {
          (0, o["default"])(this, e)
        }
        return (0, a["default"])(e, [{
          key: "trigger",
          value: function(e) {}
        }]), e
      }();
    e.exports = new c
  },
  983: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(61);
    e.exports = {
      getThumb: function(e, t) {
        var n = s.build("https://maps.googleapis.com/maps/api/staticmap", {
          size: "170x170",
          center: e + "," + t,
          zoom: 15,
          sensor: "true",
          format: "png8",
          mobile: "true",
          markers: "color:red|size:mid|" + e + "," + t,
          key: "AIzaSyAd9DUC0P8PLPdtCBcLFcka6DTwoXhjf-k"
        });
        return new o["default"](function(e, t) {
          var r = new Image;
          r.onload = function(t) {
            var n = document.createElement("canvas");
            n.width = 100, n.height = 100;
            var i = n.getContext("2d");
            i.drawImage(r, 35, 35, 100, 100, 0, 0, 100, 100), e(n.toDataURL("image/jpeg"))
          }, r.onerror = t, r.setAttribute("crossOrigin", "anonymous"), r.src = n
        })
      }
    }
  },
  984: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(167),
      a = r(s),
      c = n(168),
      l = r(c),
      d = n(61),
      u = n(109),
      p = "audio/wav",
      h = void 0,
      m = function() {
        function e(t, n) {
          (0, a["default"])(this, e), this.decoderWorkerPath = n || "/lib/opus-recorder-oggopusDecoder-0.4.4.js", h || (h = new window.AudioContext), this.oggBlob = t
        }
        return (0, l["default"])(e, [{
          key: "generateBlob",
          value: function() {
            return this.oggBlobToWAVBlob(this.oggBlob, h, 1)
          }
        }, {
          key: "oggBlobToWAVBlob",
          value: function(e, t) {
            var n = this,
              r = arguments.length <= 2 || void 0 === arguments[2] ? 2 : arguments[2];
            return new o["default"](function(i, o) {
              var s = new Worker(n.decoderWorkerPath),
                a = [],
                c = [],
                l = {
                  outputBufferSampleRate: t.sampleRate,
                  bufferLength: 4096
                };
              s.onmessage = function(e) {
                if (null === e.data) {
                  for (var o = function(e) {
                      a.forEach(function(t, n) {
                        t = t[e] || t[0];
                        for (var r = 0; r < t.length; r++) c.push(t[r])
                      })
                    }, s = 0; r > s; s++) o(s);
                  var l = n.encodeWAV(c, t, r),
                    d = new Blob([l], {
                      type: p
                    });
                  i(d)
                } else a.push(e.data), r = a[0].length
              }, s.postMessage({
                command: "init",
                config: l
              }), n.blobToArrayBuffer(e).then(function(e) {
                s.postMessage({
                  command: "decode",
                  pages: new Uint8Array(e)
                }), s.postMessage({
                  command: "done"
                })
              })
            })
          }
        }, {
          key: "encodeWAV",
          value: function(e, t, n) {
            var r = new ArrayBuffer(44 + 2 * e.length),
              i = new DataView(r);
            return this.writeString(i, 0, "RIFF"), i.setUint32(4, 36 + 2 * e.length, !0), this.writeString(i, 8, "WAVE"), this.writeString(i, 12, "fmt "), i.setUint32(16, 16, !0), i.setUint16(20, 1, !0), i.setUint16(22, n, !0), i.setUint32(24, t.sampleRate, !0), i.setUint32(28, 4 * t.sampleRate, !0), i.setUint16(32, 2 * n, !0), i.setUint16(34, 16, !0), this.writeString(i, 36, "data"), i.setUint32(40, 2 * e.length, !0), this.floatTo16BitPCM(i, 44, e), i
          }
        }, {
          key: "writeString",
          value: function(e, t, n) {
            for (var r = 0; r < n.length; r++) e.setUint8(t + r, n.charCodeAt(r))
          }
        }, {
          key: "floatTo16BitPCM",
          value: function(e, t, n) {
            for (var r = 0; r < n.length; r++, t += 2) {
              var i = Math.max(-1, Math.min(1, n[r]));
              e.setInt16(t, 0 > i ? 32768 * i : 32767 * i, !0)
            }
          }
        }, {
          key: "blobToArrayBuffer",
          value: function(e) {
            return new o["default"](function(t, n) {
              var r = new FileReader;
              r.onload = function(e) {
                t(r.result)
              }, r.readAsArrayBuffer(e)
            })
          }
        }, {
          key: "urlToArrayBuffer",
          value: function(e) {
            return d.isBlob(e) ? new o["default"](function(t, n) {
              var r = new FileReader;
              r.onload = function(e) {
                t(r.result)
              }, r.readAsArrayBuffer(e)
            }) : u.get(this.props.msg.url, u.RESP_TYPE.ARRAY_BUFFER).then(function(e) {
              var t = e.response;
              return o["default"].resolve(t)
            })
          }
        }]), e
      }();
    e.exports = m
  },
  985: function(e, t) {
    "use strict";
    var n = function r(e) {
      if (!r.isRecordingSupported()) throw "Recording is not supported in this browser";
      this.config = e = e || {}, this.config.command = "init", this.config.bufferLength = e.bufferLength || 4096, this.config.monitorGain = e.monitorGain || 0, this.config.numberOfChannels = e.numberOfChannels || 1, this.config.originalSampleRate = this.audioContext.sampleRate, this.config.encoderSampleRate = e.encoderSampleRate || 48e3, this.config.encoderPath = e.encoderPath || "oggopusEncoder.js", this.config.streamPages = e.streamPages || !1, this.config.leaveStreamOpen = e.leaveStreamOpen || !1, this.config.maxBuffersPerPage = e.maxBuffersPerPage || 40, this.config.encoderApplication = e.encoderApplication || 2049, this.config.encoderFrameSize = e.encoderFrameSize || 20, this.config.streamOptions = e.streamOptions || {
        optional: [],
        mandatory: {
          googEchoCancellation: !1,
          googAutoGainControl: !1,
          googNoiseSuppression: !1,
          googHighpassFilter: !1
        }
      }, this.state = "inactive", this.eventTarget = document.createDocumentFragment(), this.createAudioNodes()
    };
    n.isRecordingSupported = function() {
      return window.AudioContext && navigator.getUserMedia
    }, n.prototype.addEventListener = function(e, t, n) {
      this.eventTarget.addEventListener(e, t, n)
    }, n.prototype.audioContext = new window.AudioContext, n.prototype.clearStream = function() {
      this.stream && (this.stream.getTracks().forEach(function(e) {
        e.stop()
      }), delete this.stream)
    }, n.prototype.createAudioNodes = function() {
      var e = this;
      this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels), this.scriptProcessorNode.onaudioprocess = function(t) {
        e.encodeBuffers(t.inputBuffer)
      }, this.monitorNode = this.audioContext.createGain(), this.setMonitorGain(this.config.monitorGain), this.config.sampleRate < this.audioContext.sampleRate && this.createButterworthFilter()
    }, n.prototype.createButterworthFilter = function() {
      this.filterNode = this.audioContext.createBiquadFilter(), this.filterNode2 = this.audioContext.createBiquadFilter(), this.filterNode3 = this.audioContext.createBiquadFilter(), this.filterNode.type = this.filterNode2.type = this.filterNode3.type = "lowpass";
      var e = this.config.sampleRate / 2;
      this.filterNode.frequency.value = this.filterNode2.frequency.value = this.filterNode3.frequency.value = e - e / 3.5355, this.filterNode.Q.value = .51764, this.filterNode2.Q.value = .70711, this.filterNode3.Q.value = 1.93184, this.filterNode.connect(this.filterNode2), this.filterNode2.connect(this.filterNode3), this.filterNode3.connect(this.scriptProcessorNode)
    }, n.prototype.encodeBuffers = function(e) {
      if ("recording" === this.state) {
        for (var t = [], n = 0; n < e.numberOfChannels; n++) t[n] = e.getChannelData(n);
        this.encoder.postMessage({
          command: "encode",
          buffers: t
        }), this.duration += e.duration, this.eventTarget.dispatchEvent(new CustomEvent("duration", {
          detail: this.duration
        }))
      }
    }, n.prototype.initStream = function(e) {
      if (this.stream) return void this.eventTarget.dispatchEvent(new Event("streamReady"));
      if (e) return this.stream = e, this.sourceNode = this.audioContext.createMediaStreamSource(e), this.sourceNode.connect(this.filterNode || this.scriptProcessorNode), this.sourceNode.connect(this.monitorNode), void this.eventTarget.dispatchEvent(new Event("streamReady"));
      var t = this;
      navigator.getUserMedia({
        audio: this.config.streamOptions
      }, function(e) {
        t.stream = e, t.sourceNode = t.audioContext.createMediaStreamSource(e), t.sourceNode.connect(t.filterNode || t.scriptProcessorNode), t.sourceNode.connect(t.monitorNode), t.eventTarget.dispatchEvent(new Event("streamReady"))
      }, function(e) {
        t.eventTarget.dispatchEvent(new ErrorEvent("streamError", {
          error: e
        }))
      })
    }, n.prototype.pause = function() {
      "recording" === this.state && (this.state = "paused", this.eventTarget.dispatchEvent(new Event("pause")))
    }, n.prototype.removeEventListener = function(e, t, n) {
      this.eventTarget.removeEventListener(e, t, n)
    }, n.prototype.resume = function() {
      "paused" === this.state && (this.state = "recording", this.eventTarget.dispatchEvent(new Event("resume")))
    }, n.prototype.setMonitorGain = function(e) {
      this.monitorNode.gain.value = e
    }, n.prototype.start = function() {
      if ("inactive" === this.state && this.stream) {
        var e = this;
        this.encoder = new Worker(this.config.encoderPath), this.config.streamPages ? this.encoder.addEventListener("message", function(t) {
          e.streamPage(t.data)
        }) : (this.recordedPages = [], this.totalLength = 0, this.encoder.addEventListener("message", function(t) {
          e.storePage(t.data)
        })), this.encodeBuffers = function() {
          delete this.encodeBuffers
        }, this.duration = 0, this.state = "recording", this.monitorNode.connect(this.audioContext.destination), this.scriptProcessorNode.connect(this.audioContext.destination), this.eventTarget.dispatchEvent(new Event("start")), this.eventTarget.dispatchEvent(new CustomEvent("duration", {
          detail: this.duration
        })), this.encoder.postMessage(this.config)
      }
    }, n.prototype.stop = function() {
      "inactive" !== this.state && (this.state = "inactive", this.monitorNode.disconnect(), this.scriptProcessorNode.disconnect(), this.config.leaveStreamOpen || this.clearStream(), this.encoder.postMessage({
        command: "done"
      }))
    }, n.prototype.storePage = function(e) {
      if (this.recordedPages.push(e), this.totalLength += e.length, 4 & e[5]) {
        for (var t = new Uint8Array(this.totalLength), n = 0, r = 0; r < this.recordedPages.length; r++) t.set(this.recordedPages[r], n), n += this.recordedPages[r].length;
        this.eventTarget.dispatchEvent(new CustomEvent("dataAvailable", {
          detail: new Blob([t], {
            type: "audio/ogg; codecs=opus"
          })
        })), this.recordedPages = [], this.eventTarget.dispatchEvent(new Event("stop"))
      }
    }, n.prototype.streamPage = function(e) {
      this.eventTarget.dispatchEvent(new CustomEvent("dataAvailable", {
        detail: new Blob([e], {
          type: "audio/ogg; codecs=opus"
        })
      })), 4 & e[5] && this.eventTarget.dispatchEvent(new Event("stop"))
    }, e.exports = n
  },
  986: function(e, t, n) {
    "use strict";
    var r = n(711),
      i = {
        multibyteLength: function(e) {
          return r.ucs2.decode(e).length
        },
        multibyteSubstr: function(e, t, n) {
          var i = r.ucs2.decode(e);
          if ("undefined" == typeof n) i = i.slice(t);
          else {
            if (0 >= n) return "";
            i = i.slice(t, t + n)
          }
          return r.ucs2.encode(i)
        }
      };
    e.exports = i
  },
  987: function(e, t, n) {
    "use strict";

    function r(e, t, n) {
      return t + "​" + n
    }

    function i() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
      return e.replace(/(?:&#96;){3}([\s\S]+?)(?:&#96;){3}|(^|[^*_\w])(\*+|_+)(?!\3\S|\s)((?:.(?!\3\S))*?\S)\3(?!\w)/g, o)
    }

    function o(e, t, n, r, o) {
      if (t) return '<code class="selectable-text">' + t + "</code>";
      switch (r.charAt(0)) {
        case "*":
          return n + '<strong class="selectable-text">' + i(o) + "</strong>";
        case "_":
          return n + '<em class="selectable-text">' + i(o) + "</em>"
      }
    }
    var s = n(43),
      a = n(44),
      c = n(356),
      l = "ac|academy|ad|ae|aero|af|ag|agency|ai|al|am|ao|app|ar|as|asia|at|au|audio|az|ba|baidu|bank|bar|barclays|bb|bd|be|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blue|bm|bn|bnpparibas|bo|br|bs|bt|buzz|bw|by|bz|ca|cab|cafe|camera|capital|cards|careers|casa|cash|casino|cat|cc|cd|center|cf|cg|ch|chat|church|ci|city|cl|click|club|cm|cn|co|codes|com|community|company|cool|coop|country|cr|cu|cv|cx|cy|cz|date|de|deals|desi|design|dev|digital|direct|directory|dj|dk|do|domains|download|dz|ec|edu|education|ee|eg|email|energy|es|eu|eus|events|exchange|expert|farm|fashion|fi|fj|fm|fo|fr|fund|futbol|ga|gal|gallery|gd|ge|gg|gh|gi|gift|gl|global|gm|gold|goo|google|gov|gp|gq|gr|gratis|gs|gt|guide|guru|gy|haus|help|hk|hm|hn|horse|host|house|how|hr|ht|hu|id|ie|il|im|in|info|ink|int|international|io|iq|ir|is|istanbul|it|je|jm|jo|jobs|jp|ke|kg|kh|kim|kr|krd|kred|kw|kz|la|land|lat|lb|lc|li|life|link|live|lk|lol|london|love|ls|lt|lu|lv|ly|ma|market|marketing|md|me|media|menu|mg|mil|mk|ml|mm|mn|mo|mobi|moe|money|moscow|movie|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|nc|net|network|news|nf|ng|ni|ninja|nl|no|np|nu|nyc|nz|om|one|onl|online|ooo|org|ovh|pa|paris|parts|party|pe|pf|pg|ph|photo|photos|pics|pink|pk|pl|place|plus|pm|pn|porn|post|pr|press|pro|prod|ps|pt|pub|pw|py|qa|racing|re|red|ren|rentals|report|rest|reviews|ro|rocks|rs|ru|run|rw|sa|sc|school|science|scot|sd|se|services|sex|sexy|sg|sh|si|site|sk|sl|sm|sn|so|social|software|solutions|space|sr|st|studio|style|su|support|sv|sx|sy|systems|sz|taipei|tc|team|tech|technology|tf|tg|th|tips|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|tr|trade|travel|tt|tv|tw|tz|ua|ug|uk|university|uno|us|uy|uz|va|vc|ve|vg|video|vn|vote|vu|wales|wang|watch|webcam|website|wf|wiki|win|work|works|world|ws|wtf|xn--6frz82g|xn--80asehdb|xn--p1ai|xyz|ye|yoga|yt|za|zm|zone|zw",
      d = "\\w+://|mailto:",
      u = "\\w|%[0-9a-f][0-9a-f]",
      p = "(?:" + u + ")|(?:" + u + ")(?:" + u + "|-)*(?:" + u + ")",
      h = "(?:(?:" + p + ")\\.)+(?:" + l + ")(?!\\." + p + ")",
      m = "(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])",
      f = m + "\\." + m + "\\." + m + "\\." + m,
      g = "!.\\-=?,(\\[{<«‘“",
      v = "(?:" + u + "|[" + g + "$^&/*)\\]}'\">»’”])",
      y = "/" + v + "*?",
      E = "[" + g + "]*(?!" + v + "|#)",
      T = "\\?(?!" + E + ")" + v + "*?",
      b = "#" + v + "*?",
      S = "0-9a-z!#$%&'*+/=?^_`{|}~\\-",
      M = "\\b\\w[" + S + "]*(?:\\.[" + S + "]+)*",
      C = "(^|[^/\\w.])(" + d + ")?(" + M + "@)?(" + h + "|" + f + "(?=/))(?:(?=\\b[^/?#])|(" + y + ")?(" + T + ")?(" + b + ")?(?=" + E + "))",
      w = 1,
      N = 2,
      P = 3,
      R = 5,
      k = 6,
      x = 7,
      D = {
        34: 34,
        39: 39,
        41: 40,
        62: 60,
        93: 91,
        125: 123,
        187: 171,
        8217: 8216,
        8221: 8220
      },
      A = {
        34: 34,
        39: 39,
        40: 41,
        60: 62,
        91: 93,
        123: 125,
        171: 187,
        8216: 8217,
        8220: 8221
      },
      I = new RegExp("" + C, "gi"),
      O = {
        "http://": !0,
        "https://": !0,
        "mailto:": !0
      },
      L = _.memoize(function(e) {
        var t = n(171);
        return new RegExp("(" + t.arabic + "{" + e + "})(" + t.arabic + ")", "g")
      }),
      U = _.memoize(function(e, t) {
        if (!a.isWebkit) return e;
        if (e.length <= t) return e;
        for (var n = e.split(/\s/), i = !1, o = L(t), s = 0, c = n.length; c > s; ++s) {
          var l = n[s];
          if (l.length > t) {
            var d = l.replace(o, r);
            l !== d && (n[s] = d, i = !0)
          }
        }
        return i ? n.join(" ") : e
      }, function(e, t) {
        return "s:" + e + "n:" + t
      }),
      F = _.memoize(function(e, t, n, r, o) {
        n = a.isWebkit ? n : 0;
        for (var l = "", d = 0, u = void 0, p = void 0; u = I.exec(e);) {
          var h = u[w].length,
            m = u[0],
            f = u.index + h,
            g = _.find([x, k, R], function(e) {
              return u[e]
            }) || 0;
          if (g) {
            for (var v = [], y = u[g], E = 0, T = 0, b = 0; b < y.length; b++) {
              var S = y.charCodeAt(b);
              S === T ? (T = v.pop() || 0, 0 === T && (E = b)) : S in A ? (0 !== T && v.push(T), T = A[S]) : S in D || 0 === T && (E = b)
            }
            for (; 0 !== v.length;) v.pop();
            E !== y.length - 1 ? (m = _.compact(_.slice(u, N, g)).join("") + y.slice(0, E + 1), I.lastIndex = f + m.length) : m = m.slice(h)
          } else m = m.slice(h);
          var M = m,
            C = u[N];
          if (C ? C = C.toLowerCase() : (C = 0 === M.toLowerCase().indexOf("irc.") ? "irc://" : 0 === M.toLowerCase().indexOf("ftp.") ? "ftp://" : u[P] ? "mailto:" : "https://", M = C + M), ("mailto:" === C || !u[P]) && O[C]) {
            p = _.escape(e.slice(d, f)), p = n && p.length > n ? U(p, n) : p, t && (p = c.emojiToHTML(p, r)), o && (p = i(p)), l += p;
            var L = document.createElement("a");
            L.href = M, L.title = M, L.target = "_blank", L.rel = "noopener noreferrer", L.className = s(r);
            var F = t ? c.emojiToHTML(_.escape(m), r) : _.escape(m);
            L.innerHTML = n && m.length > n ? U(F, n) : F, l += L.outerHTML, d = I.lastIndex
          }
        }
        return p = _.escape(e.slice(d)), p = n && p.length > n ? U(p, n) : p, t && (p = c.emojiToHTML(p, r)), o && (p = i(p)), l + p
      }, function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
          n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
          r = arguments[3],
          i = arguments.length <= 4 || void 0 === arguments[4] ? !1 : arguments[4];
        return "t:" + e + "e:" + t + "w:" + n + "c:" + r + "f:" + i
      });
    e.exports = {
      format: i,
      linkify: F,
      wbr: U
    }
  },
  988: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var i = n(3),
      o = r(i),
      s = n(7),
      a = n(832),
      c = n(61),
      l = {
        vCardPrepareForSend: function(e) {
          return new o["default"](function(t, n) {
            var r = new FileReader;
            r.onload = function() {
              var e = l.vCardParse(r.result),
                n = e.vcard.FN || {},
                i = e.vcard.PHOTO;
              if (i) {
                var o = s.MAX_VCARD_PHOTO_SIDE,
                  d = "data:image/jpeg;base64," + i.value;
                return a.resizeDataURI(d, o, o).then(function(r) {
                  var o = c.parseDataURL(r);
                  i.value = o.data, i.line = "PHOTO;BASE64:" + o.data, t(l.vCardSerialize(e.rows), n.value)
                })
              }
              t(l.vCardSerialize(e.rows), n.value)
            }, r.onerror = n, r.readAsText(e)
          })
        },
        vCardParse: function(e) {
          function t(e) {
            var t = {
                line: e
              },
              n = e.split(/:/, 2);
            return t.key = t.fullkey = n[0], t.value = n[1], n = t.key.split(/;/, 2), n.length > 1 && (t.key = n[0]), t
          }
          if (e) {
            e = e.replace(/\n^ /gm, "");
            var n = e.split(/\n/),
              r = "BEGIN VERSION FN N TEL EMAIL ADR PHOTO END".split(/ /),
              i = {};
            r.forEach(function(e) {
              i[e] = !0
            });
            for (var o = [], s = {}, a = 0; a < n.length; ++a) {
              var c = t(n[a]);
              i[c.key] && (o.push(c), s[c.key] = c)
            }
            return {
              vcard: s,
              rows: o
            }
          }
        },
        vCardSerialize: function(e) {
          return e.map(function(e) {
            return e.line.replace(/(.{75,75})/g, "$1\n ").replace(/\n^-$/gm, "")
          }).join("\n")
        },
        thumbnail: function(e) {
          if (e) {
            e = e.replace(/\n^ /gm, "");
            var t = e.match(/^PHOTO;(BASE64|ENCODING=b;TYPE=image\/jpeg):(.*)$/m);
            return t ? t[2] : void 0
          }
        }
      };
    e.exports = l
  },
  989: function(e, t, n) {
    e.exports = {
      "default": n(993),
      __esModule: !0
    }
  },
  990: function(e, t, n) {
    n(359), n(996), e.exports = n(19).Array.from
  },
  991: function(e, t, n) {
    n(364), n(359), e.exports = n(994)
  },
  992: function(e, t, n) {
    n(364), n(359), e.exports = n(995)
  },
  993: function(e, t, n) {
    n(997), e.exports = n(19).Math.trunc
  },
  994: function(e, t, n) {
    var r = n(48),
      i = n(363);
    e.exports = n(19).getIterator = function(e) {
      var t = i(e);
      if ("function" != typeof t) throw TypeError(e + " is not iterable!");
      return r(t.call(e))
    }
  },
  995: function(e, t, n) {
    var r = n(173),
      i = n(23)("iterator"),
      o = n(66);
    e.exports = n(19).isIterable = function(e) {
      var t = Object(e);
      return void 0 !== t[i] || "@@iterator" in t || o.hasOwnProperty(r(t))
    }
  },
  996: function(e, t, n) {
    "use strict";
    var r = n(65),
      i = n(46),
      o = n(112),
      s = n(369),
      a = n(368),
      c = n(371),
      l = n(363);
    i(i.S + i.F * !n(370)(function(e) {
      Array.from(e)
    }), "Array", {
      from: function(e) {
        var t, n, i, d, u = o(e),
          p = "function" == typeof this ? this : Array,
          h = arguments,
          m = h.length,
          f = m > 1 ? h[1] : void 0,
          g = void 0 !== f,
          v = 0,
          y = l(u);
        if (g && (f = r(f, m > 2 ? h[2] : void 0, 2)), void 0 == y || p == Array && a(y))
          for (t = c(u.length), n = new p(t); t > v; v++) n[v] = g ? f(u[v], v) : u[v];
        else
          for (d = y.call(u), n = new p; !(i = d.next()).done; v++) n[v] = g ? s(d, f, [i.value, v], !0) : i.value;
        return n.length = v, n
      }
    })
  },
  997: function(e, t, n) {
    var r = n(46);
    r(r.S, "Math", {
      trunc: function(e) {
        return (e > 0 ? Math.floor : Math.ceil)(e)
      }
    })
  },
  1e3: function(e, t) {
    e.exports = [65, 26, 32, 26, 73, 1, 11, 1, 5, 1, 6, 23, 24, 31, 32, 449, 451, 7, 21, 2, 16, 5, 14, 1, 130, 4, 6, 2, 4, 4, 5, 1, 7, 1, 2, 3, 4, 1, 2, 20, 21, 83, 84, 140, 147, 166, 167, 38, 40, 7, 8, 39, 40, 1, 7, -1, 46, -1, 2, -1, 3, -1, 3, -1, 2, -56, 64, -1, 3, -1, 2, -1, 14, -48, 82, -3, 4, -101, 116, -2, 9, -2, 12, -23, 24, -30, 57, -91, 102, -58, 67, -2, 6, -28, 32, -1, 10, -1, 4, -1, 6, -43, 46, -135, 167, 55, 56, 1, 2, 4, 12, 4, 5, 3, 10, 10, 12, 29, 30, 2, 3, 8, 10, 2, 4, 22, 23, 7, 8, 1, 4, 4, 7, 4, 10, 2, 4, 2, 3, 1, 9, 1, 5, 2, 3, 3, 7, 12, 14, 7, 15, 1, 2, 6, 10, 2, 4, 22, 23, 7, 8, 2, 3, 2, 3, 2, 6, 3, 27, 4, 5, 1, 8, 10, 12, 3, 17, 1, 2, 9, 10, 3, 4, 22, 23, 7, 8, 2, 3, 5, 8, 4, 12, 1, 2, 2, 5, 1, 16, 2, 6, 11, 19, 1, 9, 2, 3, 8, 10, 2, 4, 22, 23, 7, 8, 2, 3, 5, 8, 2, 3, 1, 7, 2, 4, 2, 12, 1, 5, 2, 3, 3, 7, 18, 29, 1, 2, 6, 9, 3, 4, 4, 7, 2, 3, 1, 2, 2, 5, 2, 5, 3, 6, 12, 16, 2, 3, 2, 5, 3, 4, 3, 6, 1, 7, 1, 15, 13, 27, 3, 4, 8, 9, 3, 4, 23, 24, 16, 19, 1, 4, 4, 23, 3, 8, 2, 6, 10, 25, 1, 3, 2, 3, 8, 9, 3, 4, 23, 24, 10, 11, 5, 8, 8, 9, 3, 4, 2, 11, 2, 9, 1, 2, 2, 6, 10, 11, 2, 17, 2, 3, 8, 9, 3, 4, 41, 43, 4, 9, 3, 4, 3, 4, 1, 9, 1, 8, 3, 7, 16, 19, 7, 9, 2, 3, 18, 21, 24, 25, 9, 10, 1, 3, 7, 15, 3, 9, 8, 14, 10, 12, 3, 15, 48, 49, 2, 14, 7, 15, 13, 50, 2, 3, 1, 3, 2, 3, 1, 3, 1, 7, 4, 5, 7, 8, 3, 4, 1, 2, 1, 3, 2, 3, 4, 5, 2, 11, 1, 3, 5, 6, 1, 10, 10, 12, 4, 36, 24, 26, 27, 28, 1, 2, 1, 6, 10, 11, 36, 54, 1, 6, 1, 3, 5, 54, 8, 9, 6, 7, 13, 50, 45, 49, 1, 7, 1, 3, 2, 4, 25, 27, 4, 7, 16, 20, 13, 14, 2, 4, 6, 7, 15, 16, 40, 41, 1, 6, 1, 3, 377, 378, 4, 6, 7, 8, 1, 2, 4, 6, 41, 42, 4, 6, 33, 34, 4, 6, 7, 8, 1, 2, 4, 6, 15, 16, 57, 58, 4, 6, 67, 72, 29, 32, 16, 32, 86, 88, 6, 9, 639, 640, 26, 31, 89, 96, 13, 14, 4, 18, 18, 21, 2, 11, 18, 32, 13, 14, 3, 18, 52, 54, 1, 8, 8, 9, 2, 13, 7, 8, 1, 4, 10, 48, 10, 16, 88, 96, 41, 42, 1, 6, 70, 80, 31, 35, 4, 6, 3, 7, 2, 3, 6, 19, 40, 42, 5, 16, 44, 48, 26, 32, 11, 48, 23, 25, 2, 5, 56, 57, 1, 10, 1, 2, 2, 10, 6, 19, 10, 16, 10, 16, 14, 100, 48, 49, 1, 6, 1, 2, 5, 6, 9, 13, 27, 36, 9, 14, 32, 36, 2, 4, 1, 4, 56, 57, 1, 3, 3, 4, 1, 4, 2, 10, 48, 56, 2, 7, 15, 18, 51, 115, 8, 19, 1, 14, 1, 8, 4, 5, 6, 7, 2, 11, 192, 256, 278, 280, 6, 8, 38, 40, 6, 8, 8, 9, 1, 2, 1, 2, 1, 2, 31, 33, 53, 54, 7, 8, 1, 4, 3, 4, 7, 10, 4, 6, 6, 10, 13, 18, 3, 4, 7, 24, 1, 1, -1, 98, 1, 14, 1, 17, 13, 114, 1, 5, 1, 3, 10, 11, 1, 4, 5, 11, 1, 2, 1, 2, 1, 2, 4, 5, 11, 13, 4, 9, 5, 9, 2, 18, 41, 470, 69, 95, 1, 263, 78, 528, 1, 340, 256, 1024, 47, 48, 47, 48, 133, 139, 4, 7, 2, 14, 38, 39, 1, 6, 1, 3, 56, 63, 2, 17, 23, 32, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 557, 3, 28, 9, 13, 2, 3, 5, 7, 5, 9, 86, 92, 3, 4, 90, 91, 4, 9, 41, 44, 94, 95, 43, 96, 45, 48, 48, 64, 28, 31, 50, 65, 12, 16, 47, 48, 119, 123, 99, 101, 31, 32, 6582, 6656, 20950, 20992, 1165, 1232, 317, 320, 28, 48, 47, 64, 30, 32, 80, 82, 6, 48, 102, 103, 37, 39, 8, 71, 11, 12, 3, 4, 4, 5, 25, 27, 1, 9, 8, 16, 52, 64, 68, 78, 12, 36, 12, 14, 38, 46, 25, 36, 2, 13, 30, 36, 48, 49, 2, 6, 2, 3, 17, 18, 11, 15, 7, 8, 25, 26, 41, 47, 2, 4, 2, 13, 3, 4, 8, 9, 1, 3, 10, 12, 32, 33, 51, 52, 1, 4, 2, 4, 5, 7, 1, 2, 1, 25, 17, 19, 8, 19, 6, 8, 6, 8, 6, 15, 7, 8, 7, 8, 54, 64, 117, 118, 2, 3, 4, 7, 10, 16, 11172, 11184, 23, 27, 49, 2101, 6766, 6768, 106, 144, 7, 19, 5, 10, -1, 2, -10, 11, -532, 534, -144, 176, -13, 14, -2, 114, -143, 177, 26, 32, 26, 37, 89, 92, 6, 8, 6, 8, 6, 8, 3, 38, 12, 13, 26, 27, 19, 20, 2, 3, 15, 17, 14, 48, 123, 128, 1, 2, 1, 5, 45, 48, 9, 153, 45, 176, 29, 32, 49, 96, 36, 48, 27, 32, 38, 48, 30, 31, 37, 41, 14, 56, 158, 160, 10, 96, 40, 48, 52, 63, 1, 145, 311, 320, 22, 32, 8, 160, -287, 288, -225, 228, -1, 3, -5, 9, -40, 43, -4, 5, -165, 167, -82, 89, -800, 831, -385, 385, 1, 2, 54, 69, 7, 31, 10, 28, 49, 53, 2, 4, 7, 21, 25, 32, 10, 19, 36, 41, 1, 10, 14, 26, 35, 36, 3, 14, 52, 61, 11, 14, 1, 3, 16, 17, 20, 31, 18, 19, 28, 31, 2, 3, 1, 3, 6, 72, 7, 8, 1, 2, 4, 5, 15, 16, 11, 17, 47, 48, 3, 16, 10, 18, 2, 3, 8, 10, 2, 4, 22, 23, 7, 8, 2, 3, 5, 8, 3, 4, 4, 6, 2, 4, 3, 5, 1, 7, 1, 6, 7, 291, 51, 57, 1, 2, 4, 6, 1, 3, 4, 12, 10, 176, 50, 56, 4, 6, 1, 3, 27, 63, 51, 59, 2, 3, 1, 3, 4, 15, 10, 48, 43, 44, 1, 2, 2, 8, 1, 10, 10, 64, 26, 32, 2, 6, 1, 10, 16, 368, 83, 95, 1, 449, 57, 1344, 922, 1024, 111, 112, 5, 16, 196, 2944, 1071, 5120, 583, 9216, 569, 576, 31, 32, 10, 14, 2, 98, 30, 37, 1, 11, 48, 55, 15, 25, 10, 11, 7, 8, 21, 26, 19, 899, 69, 80, 47, 67, 13, 16493, 2, 3072, 107, 112, 13, 16, 9, 16, 10, 12, 1, 3, 1, 4961, 246, 256, 39, 41, 62, 65, 9, 25, 2, 9, 30, 34, 59, 434, 18, 160, 85, 86, 71, 72, 2, 4, 1, 3, 2, 4, 4, 5, 12, 13, 1, 2, 7, 8, 65, 66, 4, 6, 8, 9, 7, 8, 28, 29, 4, 5, 5, 6, 1, 4, 7, 8, 340, 342, 51, 52, 57, 58, 57, 58, 57, 58, 57, 58, 8, 60, 512, 567, 4, 54, 8, 9, 14, 15, 7, 3451, -208, 215, -1561, 1563, -270, 542, 31, 32, 58, 64, 43, 118, 29, 42, 43, 48, 9, 16, 2, 3504, 42711, 42752, 4149, 4160, 222, 224, 5762, 16352, 542, 788480, 65534, 65536, 65534]
  },
  1001: function(e, t, n) {
    e.exports = function() {
      return new Worker(n.p + "083bbb3e48fbe92618fd.worker.js")
    }
  }
});