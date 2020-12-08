/*! Copyright (c) 2015 WhatsApp Inc.  All Rights Reserved. */
webpackJsonp([84], [, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    return h[Math.round(Math.random() * (h.length - 1))]
  }

  function i() {
    this.logs = [], this.localCursor = 0, this.pending = void 0, this.timer = new l(this, this.persistIdb)
  }

  function a(e) {
    return this.writeLine(e, !1), _.noop
  }

  function s(e) {
    return this.writeLine(e, !0), _.noop
  }
  var d = r(3),
    u = n(d),
    c = r(7),
    l = r(64),
    f = 250,
    h = "LTSXOo+_*-=.<^!#?".split(""),
    p = o() + o() + o() + o();
  i.prototype.writeLine = function(e, t) {
    e = t ? e : e ? e.toString().substring(0, f) : e;
    var r = p + " " + moment().locale("en").format("YYYY-MM-DD HH:mm:ss: ") + e;
    this.persist(r)
  }, i.prototype.logColor = function(e, t) {
    return a.call(this, t)
  }, i.prototype.log = a, i.prototype.logVerbose = s, i.prototype.info = a, i.prototype.infoVerbose = s, i.prototype.warn = a, i.prototype.warnVerbose = s, i.prototype.error = a, i.prototype.errorVerbose = s, i.prototype.trace = function(e) {
    var t = new Error(e);
    return this.errorVerbose(t.stack)(t), e
  }, i.prototype.persist = function(e) {
    this.logs.push(e), this.logs.length > c.LOG_SIZE && (this.logs.shift(), this.localCursor--), this.timer.debounceAndCap(250, 1e3)
  }, i.prototype.persistIdb = function() {
    var e = this,
      t = r(30),
      n = this.logs.slice(Math.max(this.localCursor, 0), this.logs.length);
    n.length && (this.pending = t.idb().then(function(t) {
      return t.transaction("rw", t.logs, function() {
        var r = void 0,
          o = e.getCursor();
        return _.forEach(n, function(e, n) {
          r = (o + n) % c.LOG_SIZE, t.logs.put({
            line: r,
            log: e
          })
        }), r
      })
    }).then(function(t) {
      e.localCursor += n.length, e.setCursor(t)
    })["catch"](function(e) {})["finally"](function() {
      e.pending = void 0
    }))
  }, i.prototype.clearLogs = function() {
    var e = r(30);
    e.idb().then(function(e) {
      e.logs["delete"]()
    })["catch"](_.noop), this.setCursor(0), this.localCursor = 0, this.logs = []
  }, i.prototype.getLogs = function() {
    var e = this,
      t = r(30),
      n = [this.pending];
    return 0 !== this.timer.ts && (this.timer.trigger(), n.push(this.pending)), u["default"].all(n).then(function() {
      return t.idb()
    }).then(function(e) {
      return e.logs.orderBy("line").toArray()
    }).then(function(t) {
      var r = e.getCursor(),
        n = r < t.length - 1 ? t.slice(r, t.length) : [],
        o = t.slice(0, r);
      return _.pluck(n.concat(o), "log")
    })["catch"](function() {
      return e.logs
    })
  }, i.prototype.getCursor = function() {
    var e = r(30);
    try {
      return JSON.parse(e.permanentStorage.getItem(c.KEY_LOG_CURSOR)) || Math.max(this.localCursor, 0)
    } catch (t) {
      return Math.max(this.localCursor, 0)
    }
  }, i.prototype.setCursor = function(e) {
    var t = r(30);
    return t.permanentStorage.setItem(c.KEY_LOG_CURSOR, e)
  }, e.exports = new i
}, , function(e, t, r) {
  e.exports = {
    "default": r(427),
    __esModule: !0
  }
}, , , , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(81),
    i = n(o),
    a = r(391);
  ["webkitGetUserMedia"].forEach(function(e) {
    var t = (0, i["default"])(navigator)[e];
    t && navigator[e] !== t && (navigator[e] = t)
  }), window.URL = window.URL || window.webkitURL, window.AudioContext = window.AudioContext || window.webkitAudioContext, navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia, window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  var s = {
    MAX_GROUP_SIZE: 101,
    MAX_SUBJECT_LENGTH: 25,
    IMG_MAX_EDGE: 1600,
    IMG_MAX_BYTES: 5242880,
    IMG_THUMB_MAX_EDGE: 100,
    MAX_MEDIA_UPLOAD_SIZE: 16777216,
    BROWSER_CAPABILITY: {
      getRandomValues: !(!window.crypto || !window.crypto.getRandomValues),
      localstorage: !!window.localStorage,
      sessionstorage: !!window.sessionStorage,
      indexeddb: !!window.indexedDB,
      url: !!window.URL,
      websocket: !!window.WebSocket,
      worker: !!window.Worker
    },
    BROWSER_TYPE: {
      CHROME: "chrome",
      CHROMIUM: "chromium",
      FIREFOX: "firefox",
      SAFARI: "safari",
      IE: "ie",
      OPERA: "opera",
      EDGE: "edge"
    },
    BROWSER_LINK: {
      CHROME: '<a href="https://www.google.com/chrome">Google Chrome</a>',
      FIREFOX: '<a href="http://www.firefox.com">Mozilla Firefox</a>',
      OPERA: '<a href="http://www.opera.com">Opera</a>'
    },
    OS_TYPE: {
      WINDOWS: "windows",
      MAC: "mac os",
      CHROMEOS: "chromium os"
    },
    LATEST_HASH: "8dd31e1b1c23d48d479ed62864b65cc751e955c4",
    VERSION: {
      p: 0,
      s: 2,
      t: 63
    },
    VERSION_STR: "0.2.63",
    CLB_URL: "https://web-crashlog.whatsapp.net/upload.php",
    PREVIEW_WINDOW: "preview-window",
    UPLOAD_SELECT: "upload-select",
    CURRENT_LOCATION_ICON: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
    CURRENT_LOCATION_SHADOW: "https://maps.gstatic.com/mapfiles/ms2/micons/msmarker.shadow.png",
    GROUP_DEFAULT_ICON: r(489),
    USER_DEFAULT_ICON: r(490),
    NOTIFICATION_PROMPT_DELAY: 1e4,
    NOTIFICATION_TIMEOUT: 5e3,
    CALL_NOTIFICATION_TIMEOUT: 45e3,
    NOTIFICATION_TONE_PATH: "/assets/notification.mp3",
    IDLE_TIMEOUT: 6e4,
    IDLE_TIMEOUT_WAIT: 78e4,
    PING_INTERVAL: 24e4,
    ACK_TIMEOUT: 8e3,
    RETRY_TIMESTEP: 20500,
    SEND_UNAVAILABLE_WAIT: 15e3,
    SEND_PAUSED_WAIT: 2500,
    CLEAR_CHAT_DIRTY_WAIT: 2500,
    MAX_RETRY_GENERATION: 4,
    GIVE_UP_WAIT: 12e4,
    LOG_UPLOAD_INTERVAL: 36e5,
    EMOJI_SYNC_DELAY: 3e4,
    MAX_TXT_MSG_SIZE: 65536,
    DRAG_TYPE_FILE: "Files",
    DRAG_TYPE_LOCAL_IMAGE: "drag_type_local_image",
    NUM_COLORS: 20,
    KEY_STORAGE_TEST: "storage_test",
    KEY_CLIENT_TOKEN: "WAToken1",
    KEY_SERVER_TOKEN: "WAToken2",
    KEY_SECRET: "WASecretKey",
    KEY_SECRET_BUNDLE: "WASecretBundle",
    KEY_BROWSER_ID: "WABrowserId",
    KEY_GEOCODER_LOCATION: "WAGeocoderLocation",
    KEY_GROUP_ASSIGNED_COLOR: "WAGroupAssignedColor",
    KEY_GMAPS_OVER_LIMIT: "WAGmapsOverLimit",
    KEY_GLOBAL_MUTE_SOUNDS: "WAGlobalSounds",
    KEY_GLOBAL_MUTE_NOTIFICATIONS: "WAGlobalNotifications",
    KEY_GLOBAL_MUTE_PREVIEWS: "WAGlobalPreviews",
    KEY_LANG: "WALangPref",
    KEY_LAST_ACTIVE_EMOJI_TAB: "WALastActiveEmojiTab",
    KEY_UNKNOWN_ID: "WAUnknownID",
    KEY_VERSION: "WAVersion",
    KEY_LOAD_RETRY_GENERATION: "WALoadRetryGeneration",
    KEY_REMEMBER_ME: "remember-me",
    KEY_LOGOUT_TOKEN: "logout-token",
    KEY_OLD_LOGOUT_CREDS: "old-logout-cred",
    KEY_NO_TAKEOVER: "no-takeover",
    KEY_WHATSAPP_MUTEX: "whatsapp-mutex",
    KEY_WHATSAPP_LS_VERSION: "ver",
    KEY_LOCAL_TAKEOVER_OK: "local-takeover-ok",
    KEY_WAM_BUFFER: "wam-buffer",
    KEY_WAM_INFO: "wam-info",
    COOKIE_REF: "ref",
    COOKIE_TOK: "tok",
    PAGE_SIZE: 50,
    MSG_PRELOAD_THRESHOLD: 20,
    SCROLL_FUDGE: 100,
    MIN_PIC_SIDE: 192,
    MAX_PIC_SIDE: 640,
    PROF_PIC_THUMB_SIDE: 96,
    MAX_CAPTION_LENGTH: 160,
    MAX_VCARD_PHOTO_SIDE: 64,
    EMOJI_PANEL_HEIGHT: 222,
    GROUP_SET_PIC_CONTEXT: "group",
    GROUP_CREATE_PIC_CONTEXT: "create_group",
    PROFILE_PIC_CONTEXT: "profile",
    PERMISSION_ALLOWED: "granted",
    PERMISSION_DEFAULT: "default",
    PERMISSION_DENIED: "denied",
    PRESENCE_COMPOSING_TIMEOUT: 25e3,
    PRESENCE_RESEND_WAIT: 1e4,
    PTT_CANCEL_AREA: 300,
    PTT_TIME_CHECK: 1,
    PTT_TIME_CANCEL: .75,
    CANCEL_ANIMATION_DURATION: 2700,
    MIMETYPE_OGG: "audio/ogg",
    IMAGE_MIMES: "image/*",
    VIDEO_MIMES: "video/*",
    DOC_MIMES: "application/pdf",
    SEARCH_ANIMATION_DURATION: 150,
    SLIDEDOWN_DURATION: 100,
    CSS_TRANSITION_DURATION: 1,
    EARTH_RADIUS: 6378137,
    LOG_SIZE: 4999,
    KEY_LOG_CURSOR: "debugCursor",
    MAX_STATUS_LENGTH: 139,
    QR_EDGE: 240,
    FILE_ERROR_MISSING: "File missing.",
    FILE_ERROR_SIZE: "File size is too large.",
    FILE_ERROR_TYPE: "File type is invalid.",
    FILE_ERROR_MIN_DIM: "File dimensions are too small.",
    GMAPS_OVER_LIMIT_DURATION: 14400,
    ACK_ERROR: -1,
    ACK_PENDING: 0,
    ACK_SERVER: 1,
    ACK_DEVICE: 2,
    ACK_READ: 3,
    ACK_PLAYED: 4,
    BATTERY_LOW_THRESHOLD_1: 15,
    BATTERY_LOW_THRESHOLD_2: 5,
    BATTERY_DELAY: 1e4,
    WAM_MAX_BUFFER_SIZE: 5e4,
    NUX: {
      SAFARI_LIMITED_SUPPORT: "safari_limited_support"
    },
    COLLECTION_HAS_SYNCED: "collection_has_synced",
    DIAGNOSTIC_DELAY: 18e3,
    ONE_BY_ONE_TRANS_GIF: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  };
  for (var d in a) a.hasOwnProperty(d) && (s[d] = a[d]);
  e.exports = s
}, function(e, t, r) {
  "use strict";
  var n = r(1),
    o = r(47),
    i = r(86),
    a = {
      isMainLoaded: !1,
      uiBusy: 0,
      mainLoaded: function() {
        this.isMainLoaded = !0, this.trigger("main_loaded")
      },
      incrementProgress: function() {
        n.log("Cmd: incrementProgress")(), this.trigger("increment_progress")
      },
      logSocketSummary: function() {
        this.trigger("log_socket_summary")
      },
      muteChat: function(e, t, r) {
        this.trigger("mute_chat", e, t, r)
      },
      deleteOrExitChat: function(e, t) {
        this.trigger("delete_or_exit_chat", e, t)
      },
      clearChatMsgs: function(e, t) {
        this.trigger("clear_chat_msgs", e, t)
      },
      archiveChat: function(e, t) {
        this.trigger("archive_chat", e, t)
      },
      markChatUnread: function(e, t) {
        this.trigger("mark_chat_unread", e, t)
      },
      msgInfoDrawer: function(e) {
        this.trigger("msg_info_drawer", e)
      },
      groupInfoDrawer: function(e) {
        this.trigger("group_info_drawer", e)
      },
      broadcastInfoDrawer: function(e) {
        this.trigger("broadcast_info_drawer", e)
      },
      contactInfoDrawer: function(e) {
        this.trigger("contact_info_drawer", e)
      },
      openChat: function(e, t) {
        var r = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2],
          n = arguments.length <= 3 || void 0 === arguments[3] ? !0 : arguments[3];
        this.closeDrawer(), this.trigger("open_chat", e, t, r, n)
      },
      clearChat: function(e) {
        this.trigger("clear_chat", e)
      },
      focusChatTextInput: function(e) {
        this.trigger("focus_chat_text_input_" + e.id)
      },
      enterChatTextInput: function(e) {
        this.trigger("enter_chat_text_input_" + e.id)
      },
      focusNextChat: function(e) {
        this.trigger("focus_next_chat", e)
      },
      focusPrevChat: function(e) {
        this.trigger("focus_prev_chat", e)
      },
      focusChatList: function() {
        this.trigger("focus_chat_list")
      },
      focusChatSearch: function() {
        this.trigger("focus_chat_search")
      },
      pasteChatTextInput: function(e, t) {
        this.trigger("paste_chat_text_input_" + e.id, t)
      },
      composeHeightChange: function(e, t) {
        this.trigger("compose_height_change", e, t)
      },
      isMsgVisible: function(e, t) {
        this.trigger("is_msg_visible", e, t)
      },
      jsHaltDetected: function(e) {
        this.trigger("js_halt_detected", e)
      },
      login: function(e) {
        this.trigger("login", e)
      },
      openContextMenu: function(e, t) {
        this.trigger("open_context_menu", e, t)
      },
      openTooltip: function(e, t) {
        this.trigger("open_tooltip", e, t)
      },
      openToast: function(e) {
        this.trigger("open_toast", e)
      },
      closeToast: function(e) {
        this.trigger("close_toast", e)
      },
      alertNewMsg: function(e) {
        this.trigger("alert_new_msg", e)
      },
      alertCall: function(e, t) {
        this.trigger("alert_call", e, t)
      },
      cancelCall: function(e) {
        this.trigger("cancel_call", e)
      },
      windowError: function(e) {},
      error2412: function(e) {},
      sentPing: function(e) {},
      openModal: function(e, t, r, n) {
        this.trigger("open_modal", e, t, r, n)
      },
      closeModal: function() {
        this.trigger("close_modal")
      },
      openModalMedia: function(e, t, r, n) {
        this.trigger("open_modal_media", e, t, r, n)
      },
      closeModalMedia: function() {
        this.trigger("close_modal_media")
      },
      openDrawer: function(e, t, r) {
        this.trigger("open_drawer", e, t, r)
      },
      closeDrawer: function(e) {
        this.trigger("close_drawer", e)
      },
      mediaPlaying: function(e) {
        this.trigger("mediaPlaying", e)
      },
      uiResize: function() {
        this.trigger("resize")
      },
      localeChange: function() {
        this.trigger("locale_change")
      },
      clearUiBusy: _.debounce(function() {
        this.uiBusy && (n.log("cmd:clearUIBusy uibusy timeout")(), this.uiBusy = 0, this.trigger("ui_idle"))
      }, 1e3, {
        maxWait: 5e3
      }),
      setUiBusy: function(e) {
        var t = this.uiBusy || 0;
        e ? (++t, this.clearUiBusy()) : t && --t, this.uiBusy = t, 0 === t && (this.clearUiBusy.cancel(), this.trigger("ui_idle"))
      },
      windowMouseDown: function(e) {
        this.trigger("window_mousedown", e)
      },
      windowClick: function(e) {
        this.trigger("window_click", e)
      },
      midnight: function() {
        this.trigger("midnight")
      }
    };
  _.extend(a, o, i), e.exports = a
}, function(e, t, r) {
  (function(e) {
    /**
     * @license ByteBuffer.js (c) 2013-2014 Daniel Wirtz <dcode@dcode.io>
     * This version of ByteBuffer.js uses an ArrayBuffer (AB) as its backing buffer and is compatible with modern browsers.
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/ByteBuffer.js for details
     */
    ! function(t) {
      "use strict";

      function n(e) {
        var t = function(e, n, o) {
          if ("undefined" == typeof e && (e = t.DEFAULT_CAPACITY), "undefined" == typeof n && (n = t.DEFAULT_ENDIAN), "undefined" == typeof o && (o = t.DEFAULT_NOASSERT), !o) {
            if (e = 0 | e, 0 > e) throw new RangeError("Illegal capacity: 0 <= " + e);
            if ("boolean" != typeof n) throw new TypeError("Illegal littleEndian: Not a boolean");
            if ("boolean" != typeof o) throw new TypeError("Illegal noAssert: Not a boolean")
          }
          this.buffer = 0 === e ? r : new ArrayBuffer(e), this.view = 0 === e ? null : new DataView(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = e, this.littleEndian = "undefined" != typeof n ? !!n : !1, this.noAssert = !!o
        };
        t.VERSION = "3.1.0", t.LITTLE_ENDIAN = !0, t.BIG_ENDIAN = !1, t.DEFAULT_CAPACITY = 16, t.DEFAULT_ENDIAN = t.BIG_ENDIAN, t.DEFAULT_NOASSERT = !1, t.Long = e || null;
        var r = new ArrayBuffer(0);
        t.allocate = function(e, r, n) {
          return new t(e, r, n)
        }, t.concat = function(e, r, n, o) {
          "boolean" != typeof r && "string" == typeof r || (o = n, n = r, r = void 0);
          for (var i, a = 0, s = 0, d = e.length; d > s; ++s) t.isByteBuffer(e[s]) || (e[s] = t.wrap(e[s], r)), i = e[s].limit - e[s].offset, i > 0 && (a += i);
          if (0 === a) return new t(0, n, o);
          var u, c = new t(a, n, o),
            l = new Uint8Array(c.buffer);
          for (s = 0; d > s;) u = e[s++], i = u.limit - u.offset, 0 >= i || (l.set(new Uint8Array(u.buffer).subarray(u.offset, u.limit), c.offset), c.offset += i);
          return c.limit = c.offset, c.offset = 0, c
        }, t.isByteBuffer = function(e) {
          return e && e instanceof t
        }, t.type = function() {
          return ArrayBuffer
        }, t.wrap = function(e, r, n, o) {
          if ("string" != typeof r && (o = n, n = r, r = void 0), "string" == typeof e) switch ("undefined" == typeof r && (r = "utf8"), r) {
            case "base64":
              return t.fromBase64(e, n);
            case "hex":
              return t.fromHex(e, n);
            case "binary":
              return t.fromBinary(e, n);
            case "utf8":
              return t.fromUTF8(e, n);
            case "debug":
              return t.fromDebug(e, n);
            default:
              throw new TypeError("Unsupported encoding: " + r)
          }
          if (null === e || "object" != typeof e) throw new TypeError("Illegal buffer: null or non-object");
          var a;
          if (t.isByteBuffer(e)) return a = t.prototype.clone.call(e), a.markedOffset = -1, a;
          if (e instanceof Uint8Array) a = new t(0, n, o), e.length > 0 && (a.buffer = e.buffer, a.offset = e.byteOffset, a.limit = e.byteOffset + e.length, a.view = e.length > 0 ? new DataView(e.buffer) : null);
          else if (e instanceof ArrayBuffer) a = new t(0, n, o), e.byteLength > 0 && (a.buffer = e, a.offset = 0, a.limit = e.byteLength, a.view = e.byteLength > 0 ? new DataView(e) : null);
          else {
            if ("[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("Illegal buffer");
            for (a = new t(e.length, n, o), a.limit = e.length, i = 0; i < e.length; ++i) a.view.setUint8(i, e[i])
          }
          return a
        }, t.prototype.writeInt8 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 1;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 1, this.view.setInt8(t, e), r && (this.offset += 1), this
        }, t.prototype.writeByte = t.prototype.writeInt8, t.prototype.readInt8 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
          }
          var r = this.view.getInt8(e);
          return t && (this.offset += 1), r
        }, t.prototype.readByte = t.prototype.readInt8, t.prototype.writeUint8 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 1;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 1, this.view.setUint8(t, e), r && (this.offset += 1), this
        }, t.prototype.readUint8 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
          }
          var r = this.view.getUint8(e);
          return t && (this.offset += 1), r
        }, t.prototype.writeInt16 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 2;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 2, this.view.setInt16(t, e, this.littleEndian), r && (this.offset += 2), this
        }, t.prototype.writeShort = t.prototype.writeInt16, t.prototype.readInt16 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 2 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength)
          }
          var r = this.view.getInt16(e, this.littleEndian);
          return t && (this.offset += 2), r
        }, t.prototype.readShort = t.prototype.readInt16, t.prototype.writeUint16 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 2;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 2, this.view.setUint16(t, e, this.littleEndian), r && (this.offset += 2), this
        }, t.prototype.readUint16 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 2 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength)
          }
          var r = this.view.getUint16(e, this.littleEndian);
          return t && (this.offset += 2), r
        }, t.prototype.writeInt32 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 4;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 4, this.view.setInt32(t, e, this.littleEndian), r && (this.offset += 4), this
        }, t.prototype.writeInt = t.prototype.writeInt32, t.prototype.readInt32 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
          }
          var r = this.view.getInt32(e, this.littleEndian);
          return t && (this.offset += 4), r
        }, t.prototype.readInt = t.prototype.readInt32, t.prototype.writeUint32 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 4;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 4, this.view.setUint32(t, e, this.littleEndian), r && (this.offset += 4), this
        }, t.prototype.readUint32 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
          }
          var r = this.view.getUint32(e, this.littleEndian);
          return t && (this.offset += 4), r
        }, e && (t.prototype.writeInt64 = function(t, r) {
          var n = "undefined" == typeof r;
          if (n && (r = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if (!(t && t instanceof e)) throw new TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof r || r % 1 !== 0) throw new TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength)
          }
          "number" == typeof t && (t = e.fromNumber(t)), r += 8;
          var o = this.buffer.byteLength;
          return r > o && this.resize((o *= 2) > r ? o : r), r -= 8, this.littleEndian ? (this.view.setInt32(r, t.low, !0), this.view.setInt32(r + 4, t.high, !0)) : (this.view.setInt32(r, t.high, !1), this.view.setInt32(r + 4, t.low, !1)), n && (this.offset += 8), this
        }, t.prototype.writeLong = t.prototype.writeInt64, t.prototype.readInt64 = function(t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength)
          }
          var n = this.littleEndian ? new e(this.view.getInt32(t, !0), this.view.getInt32(t + 4, !0), !1) : new e(this.view.getInt32(t + 4, !1), this.view.getInt32(t, !1), !1);
          return r && (this.offset += 8), n
        }, t.prototype.readLong = t.prototype.readInt64, t.prototype.writeUint64 = function(t, r) {
          var n = "undefined" == typeof r;
          if (n && (r = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if (!(t && t instanceof e)) throw new TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof r || r % 1 !== 0) throw new TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength)
          }
          "number" == typeof t && (t = e.fromNumber(t)), r += 8;
          var o = this.buffer.byteLength;
          return r > o && this.resize((o *= 2) > r ? o : r), r -= 8, this.littleEndian ? (this.view.setInt32(r, t.low, !0), this.view.setInt32(r + 4, t.high, !0)) : (this.view.setInt32(r, t.high, !1), this.view.setInt32(r + 4, t.low, !1)), n && (this.offset += 8), this
        }, t.prototype.readUint64 = function(t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength)
          }
          var n = this.littleEndian ? new e(this.view.getInt32(t, !0), this.view.getInt32(t + 4, !0), !0) : new e(this.view.getInt32(t + 4, !1), this.view.getInt32(t, !1), !0);
          return r && (this.offset += 8), n
        }), t.prototype.writeFloat32 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e) throw new TypeError("Illegal value: " + e + " (not a number)");
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 4;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 4, this.view.setFloat32(t, e, this.littleEndian), r && (this.offset += 4), this
        }, t.prototype.writeFloat = t.prototype.writeFloat32, t.prototype.readFloat32 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
          }
          var r = this.view.getFloat32(e, this.littleEndian);
          return t && (this.offset += 4), r
        }, t.prototype.readFloat = t.prototype.readFloat32, t.prototype.writeFloat64 = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e) throw new TypeError("Illegal value: " + e + " (not a number)");
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          t += 8;
          var n = this.buffer.byteLength;
          return t > n && this.resize((n *= 2) > t ? n : t), t -= 8, this.view.setFloat64(t, e, this.littleEndian), r && (this.offset += 8), this
        }, t.prototype.writeDouble = t.prototype.writeFloat64, t.prototype.readFloat64 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 8 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength)
          }
          var r = this.view.getFloat64(e, this.littleEndian);
          return t && (this.offset += 8), r
        }, t.prototype.readDouble = t.prototype.readFloat64, t.MAX_VARINT32_BYTES = 5, t.calculateVarint32 = function(e) {
          return e >>>= 0, 128 > e ? 1 : 16384 > e ? 2 : 1 << 21 > e ? 3 : 1 << 28 > e ? 4 : 5
        }, t.zigZagEncode32 = function(e) {
          return ((e |= 0) << 1 ^ e >> 31) >>> 0
        }, t.zigZagDecode32 = function(e) {
          return e >>> 1 ^ -(1 & e) | 0
        }, t.prototype.writeVarint32 = function(e, r) {
          var n = "undefined" == typeof r;
          if (n && (r = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof r || r % 1 !== 0) throw new TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength)
          }
          var o, i = t.calculateVarint32(e);
          r += i;
          var a = this.buffer.byteLength;
          return r > a && this.resize((a *= 2) > r ? a : r), r -= i, this.view.setUint8(r, o = 128 | e), e >>>= 0, e >= 128 ? (o = e >> 7 | 128, this.view.setUint8(r + 1, o), e >= 16384 ? (o = e >> 14 | 128, this.view.setUint8(r + 2, o), e >= 1 << 21 ? (o = e >> 21 | 128, this.view.setUint8(r + 3, o), e >= 1 << 28 ? (this.view.setUint8(r + 4, e >> 28 & 15), i = 5) : (this.view.setUint8(r + 3, 127 & o), i = 4)) : (this.view.setUint8(r + 2, 127 & o), i = 3)) : (this.view.setUint8(r + 1, 127 & o), i = 2)) : (this.view.setUint8(r, 127 & o), i = 1), n ? (this.offset += i, this) : i
        }, t.prototype.writeVarint32ZigZag = function(e, r) {
          return this.writeVarint32(t.zigZagEncode32(e), r)
        }, t.prototype.readVarint32 = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
          }
          var r, n = 0,
            o = 0;
          do r = this.view.getUint8(e + n), 5 > n && (o |= (127 & r) << 7 * n >>> 0), ++n; while (128 === (128 & r));
          return o = 0 | o, t ? (this.offset += n, o) : {
            value: o,
            length: n
          }
        }, t.prototype.readVarint32ZigZag = function(e) {
          var r = this.readVarint32(e);
          return "object" == typeof r ? r.value = t.zigZagDecode32(r.value) : r = t.zigZagDecode32(r), r
        }, e && (t.MAX_VARINT64_BYTES = 10, t.calculateVarint64 = function(t) {
          "number" == typeof t && (t = e.fromNumber(t));
          var r = t.toInt() >>> 0,
            n = t.shiftRightUnsigned(28).toInt() >>> 0,
            o = t.shiftRightUnsigned(56).toInt() >>> 0;
          return 0 == o ? 0 == n ? 16384 > r ? 128 > r ? 1 : 2 : 1 << 21 > r ? 3 : 4 : 16384 > n ? 128 > n ? 5 : 6 : 1 << 21 > n ? 7 : 8 : 128 > o ? 9 : 10
        }, t.zigZagEncode64 = function(t) {
          return "number" == typeof t ? t = e.fromNumber(t, !1) : t.unsigned !== !1 && (t = t.toSigned()), t.shiftLeft(1).xor(t.shiftRight(63)).toUnsigned()
        }, t.zigZagDecode64 = function(t) {
          return "number" == typeof t ? t = e.fromNumber(t, !1) : t.unsigned !== !1 && (t = t.toSigned()), t.shiftRightUnsigned(1).xor(t.and(e.ONE).toSigned().negate()).toSigned()
        }, t.prototype.writeVarint64 = function(r, n) {
          var o = "undefined" == typeof n;
          if (o && (n = this.offset), !this.noAssert) {
            if ("number" == typeof r) r = e.fromNumber(r);
            else if (!(r && r instanceof e)) throw new TypeError("Illegal value: " + r + " (not an integer or Long)");
            if ("number" != typeof n || n % 1 !== 0) throw new TypeError("Illegal offset: " + n + " (not an integer)");
            if (n >>>= 0, 0 > n || n + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength)
          }
          "number" == typeof r ? r = e.fromNumber(r, !1) : r.unsigned !== !1 && (r = r.toSigned());
          var i = t.calculateVarint64(r),
            a = r.toInt() >>> 0,
            s = r.shiftRightUnsigned(28).toInt() >>> 0,
            d = r.shiftRightUnsigned(56).toInt() >>> 0;
          n += i;
          var u = this.buffer.byteLength;
          switch (n > u && this.resize((u *= 2) > n ? u : n), n -= i, i) {
            case 10:
              this.view.setUint8(n + 9, d >>> 7 & 1);
            case 9:
              this.view.setUint8(n + 8, 9 !== i ? 128 | d : 127 & d);
            case 8:
              this.view.setUint8(n + 7, 8 !== i ? s >>> 21 | 128 : s >>> 21 & 127);
            case 7:
              this.view.setUint8(n + 6, 7 !== i ? s >>> 14 | 128 : s >>> 14 & 127);
            case 6:
              this.view.setUint8(n + 5, 6 !== i ? s >>> 7 | 128 : s >>> 7 & 127);
            case 5:
              this.view.setUint8(n + 4, 5 !== i ? 128 | s : 127 & s);
            case 4:
              this.view.setUint8(n + 3, 4 !== i ? a >>> 21 | 128 : a >>> 21 & 127);
            case 3:
              this.view.setUint8(n + 2, 3 !== i ? a >>> 14 | 128 : a >>> 14 & 127);
            case 2:
              this.view.setUint8(n + 1, 2 !== i ? a >>> 7 | 128 : a >>> 7 & 127);
            case 1:
              this.view.setUint8(n, 1 !== i ? 128 | a : 127 & a)
          }
          return o ? (this.offset += i, this) : i
        }, t.prototype.writeVarint64ZigZag = function(e, r) {
          return this.writeVarint64(t.zigZagEncode64(e), r)
        }, t.prototype.readVarint64 = function(t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength)
          }
          var n = t,
            o = 0,
            i = 0,
            a = 0,
            s = 0;
          if (s = this.view.getUint8(t++), o = 127 & s, 128 & s && (s = this.view.getUint8(t++), o |= (127 & s) << 7, 128 & s && (s = this.view.getUint8(t++), o |= (127 & s) << 14, 128 & s && (s = this.view.getUint8(t++), o |= (127 & s) << 21, 128 & s && (s = this.view.getUint8(t++), i = 127 & s, 128 & s && (s = this.view.getUint8(t++), i |= (127 & s) << 7, 128 & s && (s = this.view.getUint8(t++), i |= (127 & s) << 14, 128 & s && (s = this.view.getUint8(t++), i |= (127 & s) << 21, 128 & s && (s = this.view.getUint8(t++), a = 127 & s, 128 & s && (s = this.view.getUint8(t++), a |= (127 & s) << 7, 128 & s)))))))))) throw new Error("Data must be corrupt: Buffer overrun");
          var d = e.from28Bits(o, i, a, !1);
          return r ? (this.offset = t, d) : {
            value: d,
            length: t - n
          }
        }, t.prototype.readVarint64ZigZag = function(r) {
          var n = this.readVarint64(r);
          return n && n.value instanceof e ? n.value = t.zigZagDecode64(n.value) : n = t.zigZagDecode64(n), n
        }), t.prototype.writeCString = function(e, t) {
          var r = "undefined" == typeof t;
          r && (t = this.offset);
          var n, i = e.length;
          if (!this.noAssert) {
            if ("string" != typeof e) throw new TypeError("Illegal str: Not a string");
            for (n = 0; i > n; ++n)
              if (0 === e.charCodeAt(n)) throw new RangeError("Illegal str: Contains NULL-characters");
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          var a = t;
          i = o.calculateUTF16asUTF8(o.stringSource(e))[1], t += i + 1;
          var s = this.buffer.byteLength;
          return t > s && this.resize((s *= 2) > t ? s : t), t -= i + 1, o.encodeUTF16toUTF8(o.stringSource(e), function(e) {
            this.view.setUint8(t++, e)
          }.bind(this)), this.view.setUint8(t++, 0), r ? (this.offset = t - a, this) : i
        }, t.prototype.readCString = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
          }
          var r, n = e,
            i = -1;
          return o.decodeUTF8toUTF16(function() {
            if (0 === i) return null;
            if (e >= this.limit) throw RangeError("Illegal range: Truncated data, " + e + " < " + this.limit);
            return 0 === (i = this.view.getUint8(e++)) ? null : i
          }.bind(this), r = o.stringDestination(), !0), t ? (this.offset = e, r()) : {
            string: r(),
            length: e - n
          }
        }, t.prototype.writeIString = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("string" != typeof e) throw new TypeError("Illegal str: Not a string");
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          var n, i = t;
          n = o.calculateUTF16asUTF8(o.stringSource(e), this.noAssert)[1], t += 4 + n;
          var a = this.buffer.byteLength;
          if (t > a && this.resize((a *= 2) > t ? a : t), t -= 4 + n, this.view.setUint32(t, n, this.littleEndian), t += 4, o.encodeUTF16toUTF8(o.stringSource(e), function(e) {
              this.view.setUint8(t++, e)
            }.bind(this)), t !== i + 4 + n) throw new RangeError("Illegal range: Truncated data, " + t + " == " + (t + 4 + n));
          return r ? (this.offset = t, this) : t - i
        }, t.prototype.readIString = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
          }
          var r, n = 0,
            i = e;
          n = this.view.getUint32(e, this.littleEndian), e += 4;
          var a, s = e + n;
          return o.decodeUTF8toUTF16(function() {
            return s > e ? this.view.getUint8(e++) : null
          }.bind(this), a = o.stringDestination(), this.noAssert), r = a(), t ? (this.offset = e, r) : {
            string: r,
            length: e - i
          }
        }, t.METRICS_CHARS = "c", t.METRICS_BYTES = "b", t.prototype.writeUTF8String = function(e, t) {
          var r = "undefined" == typeof t;
          if (r && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
          }
          var n, i = t;
          n = o.calculateUTF16asUTF8(o.stringSource(e))[1], t += n;
          var a = this.buffer.byteLength;
          return t > a && this.resize((a *= 2) > t ? a : t), t -= n, o.encodeUTF16toUTF8(o.stringSource(e), function(e) {
            this.view.setUint8(t++, e)
          }.bind(this)), r ? (this.offset = t, this) : t - i
        }, t.prototype.writeString = t.prototype.writeUTF8String, t.calculateUTF8Chars = function(e) {
          return o.calculateUTF16asUTF8(o.stringSource(e))[0]
        }, t.calculateUTF8Bytes = function(e) {
          return o.calculateUTF16asUTF8(o.stringSource(e))[1]
        }, t.prototype.readUTF8String = function(e, r, n) {
          "number" == typeof r && (n = r, r = void 0);
          var i = "undefined" == typeof n;
          if (i && (n = this.offset), "undefined" == typeof r && (r = t.METRICS_CHARS), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal length: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof n || n % 1 !== 0) throw new TypeError("Illegal offset: " + n + " (not an integer)");
            if (n >>>= 0, 0 > n || n + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength)
          }
          var a, s = 0,
            d = n;
          if (r === t.METRICS_CHARS) {
            if (a = o.stringDestination(), o.decodeUTF8(function() {
                return e > s && n < this.limit ? this.view.getUint8(n++) : null
              }.bind(this), function(e) {
                ++s, o.UTF8toUTF16(e, a)
              }.bind(this)), s !== e) throw new RangeError("Illegal range: Truncated data, " + s + " == " + e);
            return i ? (this.offset = n, a()) : {
              string: a(),
              length: n - d
            }
          }
          if (r === t.METRICS_BYTES) {
            if (!this.noAssert) {
              if ("number" != typeof n || n % 1 !== 0) throw new TypeError("Illegal offset: " + n + " (not an integer)");
              if (n >>>= 0, 0 > n || n + e > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + n + " (+" + e + ") <= " + this.buffer.byteLength)
            }
            var u = n + e;
            if (o.decodeUTF8toUTF16(function() {
                return u > n ? this.view.getUint8(n++) : null
              }.bind(this), a = o.stringDestination(), this.noAssert), n !== u) throw new RangeError("Illegal range: Truncated data, " + n + " == " + u);
            return i ? (this.offset = n, a()) : {
              string: a(),
              length: n - d
            }
          }
          throw new TypeError("Unsupported metrics: " + r)
        }, t.prototype.readString = t.prototype.readUTF8String, t.prototype.writeVString = function(e, r) {
          var n = "undefined" == typeof r;
          if (n && (r = this.offset), !this.noAssert) {
            if ("string" != typeof e) throw new TypeError("Illegal str: Not a string");
            if ("number" != typeof r || r % 1 !== 0) throw new TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength)
          }
          var i, a, s = r;
          i = o.calculateUTF16asUTF8(o.stringSource(e), this.noAssert)[1], a = t.calculateVarint32(i), r += a + i;
          var d = this.buffer.byteLength;
          if (r > d && this.resize((d *= 2) > r ? d : r), r -= a + i, r += this.writeVarint32(i, r), o.encodeUTF16toUTF8(o.stringSource(e), function(e) {
              this.view.setUint8(r++, e)
            }.bind(this)), r !== s + i + a) throw new RangeError("Illegal range: Truncated data, " + r + " == " + (r + i + a));
          return n ? (this.offset = r, this) : r - s
        }, t.prototype.readVString = function(e) {
          var t = "undefined" == typeof e;
          if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
          }
          var r, n = this.readVarint32(e),
            i = e;
          e += n.length, n = n.value;
          var a = e + n,
            s = o.stringDestination();
          return o.decodeUTF8toUTF16(function() {
            return a > e ? this.view.getUint8(e++) : null
          }.bind(this), s, this.noAssert), r = s(), t ? (this.offset = e, r) : {
            string: r,
            length: e - i
          }
        }, t.prototype.append = function(e, r, n) {
          "number" != typeof r && "string" == typeof r || (n = r, r = void 0);
          var o = "undefined" == typeof n;
          if (o && (n = this.offset), !this.noAssert) {
            if ("number" != typeof n || n % 1 !== 0) throw new TypeError("Illegal offset: " + n + " (not an integer)");
            if (n >>>= 0, 0 > n || n + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength)
          }
          e instanceof t || (e = t.wrap(e, r));
          var i = e.limit - e.offset;
          if (0 >= i) return this;
          n += i;
          var a = this.buffer.byteLength;
          return n > a && this.resize((a *= 2) > n ? a : n), n -= i, new Uint8Array(this.buffer, n).set(new Uint8Array(e.buffer).subarray(e.offset, e.limit)), e.offset += i, o && (this.offset += i), this
        }, t.prototype.appendTo = function(e, t) {
          return e.append(this, t), this
        }, t.prototype.assert = function(e) {
          return this.noAssert = !e, this
        }, t.prototype.capacity = function() {
          return this.buffer.byteLength
        }, t.prototype.clear = function() {
          return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, this
        }, t.prototype.clone = function(e) {
          var r = new t(0, this.littleEndian, this.noAssert);
          if (e) {
            var n = new ArrayBuffer(this.buffer.byteLength);
            new Uint8Array(n).set(this.buffer), r.buffer = n, r.view = new DataView(n)
          } else r.buffer = this.buffer, r.view = this.view;
          return r.offset = this.offset, r.markedOffset = this.markedOffset, r.limit = this.limit, r
        }, t.prototype.compact = function(e, t) {
          if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          if (0 === e && t === this.buffer.byteLength) return this;
          var n = t - e;
          if (0 === n) return this.buffer = r, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= e), this.offset = 0, this.limit = 0, this;
          var o = new ArrayBuffer(n);
          return new Uint8Array(o).set(new Uint8Array(this.buffer).subarray(e, t)), this.buffer = o, this.view = new DataView(o), this.markedOffset >= 0 && (this.markedOffset -= e), this.offset = 0, this.limit = n, this
        }, t.prototype.copy = function(e, r) {
          if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof r && (r = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof r || r % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (r >>>= 0, 0 > e || e > r || r > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + r + " <= " + this.buffer.byteLength)
          }
          if (e === r) return new t(0, this.littleEndian, this.noAssert);
          var n = r - e,
            o = new t(n, this.littleEndian, this.noAssert);
          return o.offset = 0, o.limit = n, o.markedOffset >= 0 && (o.markedOffset -= e), this.copyTo(o, 0, e, r), o
        }, t.prototype.copyTo = function(e, r, n, o) {
          var i, a;
          if (!this.noAssert && !t.isByteBuffer(e)) throw new TypeError("Illegal target: Not a ByteBuffer");
          if (r = (a = "undefined" == typeof r) ? e.offset : 0 | r, n = (i = "undefined" == typeof n) ? this.offset : 0 | n, o = "undefined" == typeof o ? this.limit : 0 | o, 0 > r || r > e.buffer.byteLength) throw new RangeError("Illegal target range: 0 <= " + r + " <= " + e.buffer.byteLength);
          if (0 > n || o > this.buffer.byteLength) throw new RangeError("Illegal source range: 0 <= " + n + " <= " + this.buffer.byteLength);
          var s = o - n;
          return 0 === s ? e : (e.ensureCapacity(r + s), new Uint8Array(e.buffer).set(new Uint8Array(this.buffer).subarray(n, o), r), i && (this.offset += s), a && (e.offset += s), this)
        }, t.prototype.ensureCapacity = function(e) {
          var t = this.buffer.byteLength;
          return e > t ? this.resize((t *= 2) > e ? t : e) : this
        }, t.prototype.fill = function(e, t, r) {
          var n = "undefined" == typeof t;
          if (n && (t = this.offset), "string" == typeof e && e.length > 0 && (e = e.charCodeAt(0)), "undefined" == typeof t && (t = this.offset), "undefined" == typeof r && (r = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof r || r % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (r >>>= 0, 0 > t || t > r || r > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + t + " <= " + r + " <= " + this.buffer.byteLength)
          }
          if (t >= r) return this;
          for (; r > t;) this.view.setUint8(t++, e);
          return n && (this.offset = t), this
        }, t.prototype.flip = function() {
          return this.limit = this.offset, this.offset = 0, this
        }, t.prototype.mark = function(e) {
          if (e = "undefined" == typeof e ? this.offset : e, !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength)
          }
          return this.markedOffset = e, this
        }, t.prototype.order = function(e) {
          if (!this.noAssert && "boolean" != typeof e) throw new TypeError("Illegal littleEndian: Not a boolean");
          return this.littleEndian = !!e, this
        }, t.prototype.LE = function(e) {
          return this.littleEndian = "undefined" != typeof e ? !!e : !0, this
        }, t.prototype.BE = function(e) {
          return this.littleEndian = "undefined" != typeof e ? !e : !1, this
        }, t.prototype.prepend = function(e, r, n) {
          "number" != typeof r && "string" == typeof r || (n = r, r = void 0);
          var o = "undefined" == typeof n;
          if (o && (n = this.offset), !this.noAssert) {
            if ("number" != typeof n || n % 1 !== 0) throw new TypeError("Illegal offset: " + n + " (not an integer)");
            if (n >>>= 0, 0 > n || n + 0 > this.buffer.byteLength) throw new RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength)
          }
          e instanceof t || (e = t.wrap(e, r));
          var i = e.limit - e.offset;
          if (0 >= i) return this;
          var a, s = i - n;
          if (s > 0) {
            var d = new ArrayBuffer(this.buffer.byteLength + s);
            a = new Uint8Array(d), a.set(new Uint8Array(this.buffer).subarray(n, this.buffer.byteLength), i), this.buffer = d, this.view = new DataView(d), this.offset += s, this.markedOffset >= 0 && (this.markedOffset += s), this.limit += s, n += s
          } else a = new Uint8Array(this.buffer);
          return a.set(new Uint8Array(e.buffer).subarray(e.offset, e.limit), n - i), e.offset = e.limit, o && (this.offset -= i), this
        }, t.prototype.prependTo = function(e, t) {
          return e.prepend(this, t), this
        }, t.prototype.printDebug = function(e) {
          "function" != typeof e && (e = console.log.bind(console)), e(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0))
        }, t.prototype.remaining = function() {
          return this.limit - this.offset
        }, t.prototype.reset = function() {
          return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, this
        }, t.prototype.resize = function(e) {
          if (!this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal capacity: " + e + " (not an integer)");
            if (e |= 0, 0 > e) throw new RangeError("Illegal capacity: 0 <= " + e)
          }
          if (this.buffer.byteLength < e) {
            var t = new ArrayBuffer(e);
            new Uint8Array(t).set(new Uint8Array(this.buffer)), this.buffer = t, this.view = new DataView(t)
          }
          return this
        }, t.prototype.reverse = function(e, t) {
          if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          return e === t ? this : (Array.prototype.reverse.call(new Uint8Array(this.buffer).subarray(e, t)), this.view = new DataView(this.buffer), this)
        }, t.prototype.skip = function(e) {
          if (!this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal length: " + e + " (not an integer)");
            e |= 0
          }
          var t = this.offset + e;
          if (!this.noAssert && (0 > t || t > this.buffer.byteLength)) throw new RangeError("Illegal length: 0 <= " + this.offset + " + " + e + " <= " + this.buffer.byteLength);
          return this.offset = t, this
        }, t.prototype.slice = function(e, t) {
          if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          var r = this.clone();
          return r.offset = e, r.limit = t, r
        }, t.prototype.toBuffer = function(e) {
          var t = this.offset,
            n = this.limit;
          if (t > n) {
            var o = t;
            t = n, n = o
          }
          if (!this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal offset: Not an integer");
            if (t >>>= 0, "number" != typeof n || n % 1 !== 0) throw new TypeError("Illegal limit: Not an integer");
            if (n >>>= 0, 0 > t || t > n || n > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + t + " <= " + n + " <= " + this.buffer.byteLength)
          }
          if (!e && 0 === t && n === this.buffer.byteLength) return this.buffer;
          if (t === n) return r;
          var i = new ArrayBuffer(n - t);
          return new Uint8Array(i).set(new Uint8Array(this.buffer).subarray(t, n), 0), i
        }, t.prototype.toArrayBuffer = t.prototype.toBuffer, t.prototype.toString = function(e) {
          if ("undefined" == typeof e) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
          switch (e) {
            case "utf8":
              return this.toUTF8();
            case "base64":
              return this.toBase64();
            case "hex":
              return this.toHex();
            case "binary":
              return this.toBinary();
            case "debug":
              return this.toDebug();
            case "columns":
              return this.toColumns();
            default:
              throw new Error("Unsupported encoding: " + e)
          }
        };
        var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        n += "", t.prototype.toBase64 = function(e, t) {
          if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          if (e === t) return "";
          for (var r, o, i, a, s, d, u, c, l, f = ""; t > e;) r = this.view.getUint8(e++), o = (a = t > e) ? this.view.getUint8(e++) : 0, i = (s = t > e) ? this.view.getUint8(e++) : 0, d = r >> 2, u = (3 & r) << 4 | o >> 4, c = (15 & o) << 2 | i >> 6, l = 63 & i, s || (l = 64, a || (c = 64)), f += n.charAt(d) + n.charAt(u) + n.charAt(c) + n.charAt(l);
          return f
        }, t.fromBase64 = function(e, r, o) {
          if (!o) {
            if ("string" != typeof e) throw new TypeError("Illegal str: Not a string");
            if (e.length % 4 !== 0) throw new TypeError("Illegal str: Length not a multiple of 4")
          }
          var i, a, s = e.length,
            d = 0;
          for (i = e.length - 1; i >= 0 && "=" === e.charAt(i); --i) d++;
          if (d > 2) throw new TypeError("Illegal str: Suffix is too large");
          if (0 === s) return new t(0, r, o);
          var u, c, l, f, h, p, g, _ = new t(s / 4 * 3 - d, r, o);
          for (i = 0, a = 0; s > i;) {
            if (u = n.indexOf(e.charAt(i++)), c = (h = s > i) ? n.indexOf(e.charAt(i++)) : 0, l = (p = s > i) ? n.indexOf(e.charAt(i++)) : 0, f = (g = s > i) ? n.indexOf(e.charAt(i++)) : 0, !o && (0 > u || 0 > c || 0 > l || 0 > f)) throw new TypeError("Illegal str: Contains non-base64 characters");
            _.view.setUint8(a++, u << 2 | c >> 4), 64 !== l && (_.view.setUint8(a++, c << 4 & 240 | l >> 2, a), 64 !== f && _.view.setUint8(a++, l << 6 & 192 | f))
          }
          return _.limit = a, _
        }, t.btoa = function(e) {
          return t.fromBinary(e).toBase64()
        }, t.atob = function(e) {
          return t.fromBase64(e).toBinary()
        }, t.prototype.toBinary = function(e, t) {
          if (e = "undefined" == typeof e ? this.offset : e, t = "undefined" == typeof t ? this.limit : t, !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          if (e === t) return "";
          for (var r = []; t > e;) r.push(this.view.getUint8(e++));
          return String.fromCharCode.apply(String, r)
        }, t.fromBinary = function(e, r, n) {
          if (!n && "string" != typeof e) throw new TypeError("Illegal str: Not a string");
          for (var o, i = 0, a = e.length, s = new t(a, r, n); a > i;) {
            if (o = e.charCodeAt(i), !n && o > 255) throw new TypeError("Illegal charCode at " + i + ": 0 <= " + o + " <= 255");
            s.view.setUint8(i++, o)
          }
          return s.limit = a, s
        }, t.prototype.toDebug = function(e) {
          for (var t, r = -1, n = this.buffer.byteLength, o = "", i = "", a = ""; n > r;) {
            if (-1 !== r && (t = this.view.getUint8(r), o += 16 > t ? "0" + t.toString(16).toUpperCase() : t.toString(16).toUpperCase(), e && (i += t > 32 && 127 > t ? String.fromCharCode(t) : ".")), ++r, e && r > 0 && r % 16 === 0 && r !== n) {
              for (; o.length < 51;) o += " ";
              a += o + i + "\n", o = i = ""
            }
            o += r === this.offset && r === this.limit ? r === this.markedOffset ? "!" : "|" : r === this.offset ? r === this.markedOffset ? "[" : "<" : r === this.limit ? r === this.markedOffset ? "]" : ">" : r === this.markedOffset ? "'" : e || 0 !== r && r !== n ? " " : ""
          }
          if (e && " " !== o) {
            for (; o.length < 51;) o += " ";
            a += o + i + "\n"
          }
          return e ? a : o
        }, t.fromDebug = function(e, r, n) {
          for (var o, i, a = e.length, s = new t((a + 1) / 3 | 0, r, n), d = 0, u = 0, c = !1, l = !1, f = !1, h = !1, p = !1; a > d;) {
            switch (o = e.charAt(d++)) {
              case "!":
                if (!n) {
                  if (l || f || h) {
                    p = !0;
                    break
                  }
                  l = f = h = !0
                }
                s.offset = s.markedOffset = s.limit = u, c = !1;
                break;
              case "|":
                if (!n) {
                  if (l || h) {
                    p = !0;
                    break
                  }
                  l = h = !0
                }
                s.offset = s.limit = u, c = !1;
                break;
              case "[":
                if (!n) {
                  if (l || f) {
                    p = !0;
                    break
                  }
                  l = f = !0
                }
                s.offset = s.markedOffset = u, c = !1;
                break;
              case "<":
                if (!n) {
                  if (l) {
                    p = !0;
                    break
                  }
                  l = !0
                }
                s.offset = u, c = !1;
                break;
              case "]":
                if (!n) {
                  if (h || f) {
                    p = !0;
                    break
                  }
                  h = f = !0
                }
                s.limit = s.markedOffset = u, c = !1;
                break;
              case ">":
                if (!n) {
                  if (h) {
                    p = !0;
                    break
                  }
                  h = !0
                }
                s.limit = u, c = !1;
                break;
              case "'":
                if (!n) {
                  if (f) {
                    p = !0;
                    break
                  }
                  f = !0
                }
                s.markedOffset = u, c = !1;
                break;
              case " ":
                c = !1;
                break;
              default:
                if (!n && c) {
                  p = !0;
                  break
                }
                if (i = parseInt(o + e.charAt(d++), 16), !n && (isNaN(i) || 0 > i || i > 255)) throw new TypeError("Illegal str: Not a debug encoded string");
                s.view.setUint8(u++, i), c = !0
            }
            if (p) throw new TypeError("Illegal str: Invalid symbol at " + d)
          }
          if (!n) {
            if (!l || !h) throw new TypeError("Illegal str: Missing offset or limit");
            if (u < s.buffer.byteLength) throw new TypeError("Illegal str: Not a debug encoded string (is it hex?) " + u + " < " + a)
          }
          return s
        }, t.prototype.toHex = function(e, t) {
          if (e = "undefined" == typeof e ? this.offset : e, t = "undefined" == typeof t ? this.limit : t, !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          for (var r, n = new Array(t - e); t > e;) r = this.view.getUint8(e++), 16 > r ? n.push("0", r.toString(16)) : n.push(r.toString(16));
          return n.join("")
        }, t.fromHex = function(e, r, n) {
          if (!n) {
            if ("string" != typeof e) throw new TypeError("Illegal str: Not a string");
            if (e.length % 2 !== 0) throw new TypeError("Illegal str: Length not a multiple of 2")
          }
          for (var o, i = e.length, a = new t(i / 2 | 0, r), s = 0, d = 0; i > s; s += 2) {
            if (o = parseInt(e.substring(s, s + 2), 16), !n && (!isFinite(o) || 0 > o || o > 255)) throw new TypeError("Illegal str: Contains non-hex characters");
            a.view.setUint8(d++, o)
          }
          return a.limit = d, a
        };
        var o = function() {
            var e = {};
            return e.encodeUTF8 = function(e, t) {
              var r = null;
              for ("number" == typeof e && (r = e, e = function() {
                  return null
                }); null !== r || null !== (r = e());) 128 > r ? t(127 & r) : 2048 > r ? (t(r >> 6 & 31 | 192), t(63 & r | 128)) : 65536 > r ? (t(r >> 12 & 15 | 224), t(r >> 6 & 63 | 128), t(63 & r | 128)) : (t(r >> 18 & 7 | 240), t(r >> 12 & 63 | 128), t(r >> 6 & 63 | 128), t(63 & r | 128)), r = null
            }, e.decodeUTF8 = function(e, t) {
              for (var r, n, o, i, a = function(e) {
                  e = e.slice(0, e.indexOf(null));
                  var t = Error(e.toString());
                  throw t.name = "TruncatedError", t.bytes = e, t
                }; null !== (r = e());)
                if (0 === (128 & r)) t(r);
                else if (192 === (224 & r)) null === (n = e()) && a([r, n]), t((31 & r) << 6 | 63 & n);
              else if (224 === (240 & r))(null === (n = e()) || null === (o = e())) && a([r, n, o]), t((15 & r) << 12 | (63 & n) << 6 | 63 & o);
              else {
                if (240 !== (248 & r)) throw RangeError("Illegal starting byte: " + r);
                (null === (n = e()) || null === (o = e()) || null === (i = e())) && a([r, n, o, i]), t((7 & r) << 18 | (63 & n) << 12 | (63 & o) << 6 | 63 & i)
              }
            }, e.UTF16toUTF8 = function(e, t) {
              for (var r, n = null;;) {
                if (null === (r = null !== n ? n : e())) break;
                r >= 55296 && 57343 >= r && null !== (n = e()) && n >= 56320 && 57343 >= n ? (t(1024 * (r - 55296) + n - 56320 + 65536), n = null) : t(r)
              }
              null !== n && t(n)
            }, e.UTF8toUTF16 = function(e, t) {
              var r = null;
              for ("number" == typeof e && (r = e, e = function() {
                  return null
                }); null !== r || null !== (r = e());) 65535 >= r ? t(r) : (r -= 65536, t((r >> 10) + 55296), t(r % 1024 + 56320)), r = null
            }, e.encodeUTF16toUTF8 = function(t, r) {
              e.UTF16toUTF8(t, function(t) {
                e.encodeUTF8(t, r)
              })
            }, e.decodeUTF8toUTF16 = function(t, r) {
              e.decodeUTF8(t, function(t) {
                e.UTF8toUTF16(t, r)
              })
            }, e.assertByte = function(e) {
              if ("number" != typeof e || e !== e) throw TypeError("Illegal byte: " + typeof e);
              if (-128 > e || e > 255) throw RangeError("Illegal byte: " + e);
              return e
            }, e.assertCharCode = function(e) {
              if ("number" != typeof e || e !== e) throw TypeError("Illegal char code: " + typeof e);
              if (0 > e || e > 65535) throw RangeError("Illegal char code: " + e);
              return e
            }, e.assertCodePoint = function(e) {
              if ("number" != typeof e || e !== e) throw TypeError("Illegal code point: " + typeof e);
              if (0 > e || e > 1114111) throw RangeError("Illegal code point: " + e);
              return e
            }, e.calculateCodePoint = function(e) {
              return 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
            }, e.calculateUTF8 = function(t) {
              for (var r, n = 0; null !== (r = t());) n += e.calculateCodePoint(r);
              return n
            }, e.calculateUTF16asUTF8 = function(t) {
              var r = 0,
                n = 0;
              return e.UTF16toUTF8(t, function(t) {
                ++r, n += e.calculateCodePoint(t)
              }), [r, n]
            }, e
          }(),
          a = String.fromCharCode;
        return o.stringSource = function(e) {
          var t = 0;
          return function() {
            return t < e.length ? e.charCodeAt(t++) : null
          }
        }, o.stringDestination = function() {
          var e = [],
            t = [];
          return function() {
            return 0 === arguments.length ? t.join("") + a.apply(String, e) : (e.length + arguments.length > 1024 && (t.push(a.apply(String, e)), e.length = 0), void Array.prototype.push.apply(e, arguments))
          }
        }, t.prototype.toUTF8 = function(e, t) {
          if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw new TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw new TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw new RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
          }
          var r, n = this;
          try {
            o.decodeUTF8toUTF16(function() {
              return t > e ? n.view.getUint8(e++) : null
            }, r = o.stringDestination())
          } catch (i) {
            if (e !== t) throw new RangeError("Illegal range: Truncated data, " + e + " != " + t)
          }
          return r()
        }, t.fromUTF8 = function(e, r, n) {
          if (!n && "string" != typeof e) throw new TypeError("Illegal str: Not a string");
          var i = new t(o.calculateUTF16asUTF8(o.stringSource(e), !0)[1], r, n),
            a = 0;
          return o.encodeUTF16toUTF8(o.stringSource(e), function(e) {
            i.view.setUint8(a++, e)
          }), i.limit = a, i
        }, t
      }
      e.exports = n(r(373))
    }(this)
  }).call(t, r(60)(e))
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    var e = r(16),
      t = e.info();
    if (t) {
      var n = "WhatsApp/" + c.VERSION_STR,
        o = "Web/" + t.ua,
        i = "Device/" + t.os;
      return n + " " + o + " " + i
    }
  }

  function i(e, t, r) {
    function n() {
      p = setTimeout(function() {
        var e = g;
        p = 0, g = void 0, "undefined" != typeof e && i(e ? "delayed-" + e : "delayed")
      }, c.LOG_UPLOAD_INTERVAL)
    }
    l.logSocketSummary(), d.log("==================================================")(), d.log("wa:uploadLogs ref: " + (Store.Conn.ref || "no conn"))(), d.log("wa:uploadLogs hash: " + c.LATEST_HASH)(), d.log("wa:uploadLogs version: " + c.VERSION_STR)(), d.log("wa:uploadLogs userAgent: " + navigator.userAgent)(), d.log("wa:uploadLogs platform: " + (Store.Conn.platform || "no platform"))(), d.log("wa:uploadLogs url: " + location.href)();
    var a;
    "undefined" == typeof e ? (d.log("reason for logs: manual-upload")(), a = !0) : e && d.log("reason for logs: " + e)(), d.log("==================================================")();
    var m = Store.Conn.me,
      v = m ? h.user(m) : f.getUnknownId(),
      y = o();
    if (!a && !r) {
      if (!(Math.random() < c.UPLOAD_TO_CLB)) return d.log("wa:uploadLogs squelched logs")(), s["default"].resolve("deferred");
      if (p) return d.log("wa:uploadLogs delayed logs")(), "undefined" == typeof g && (g = e), s["default"].resolve("deferred")
    }
    var b = (t ? s["default"].resolve(d.getLogs()) : s["default"].delay(500).then(d.getLogs.bind(d))).bind(this).then(function(e) {
      e = e.join("\n");
      var t = new FormData,
        r = new Blob([e], {
          type: "text/plain"
        });
      return t.append("from", v), t.append("agent", y), t.append("file", r, "logs.txt"), u.post(c.CLB_URL, t)["catch"](_.noop)
    });
    return r || n(), b
  }
  var a = r(3),
    s = n(a),
    d = r(1),
    u = r(109),
    c = r(7),
    l = r(8),
    f = r(15),
    h = r(22),
    p = 0,
    g = void 0;
  e.exports = {
    upload: i
  }
}, function(e, t) {
  var r = Object;
  e.exports = {
    create: r.create,
    getProto: r.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: r.getOwnPropertyDescriptor,
    setDesc: r.defineProperty,
    setDescs: r.defineProperties,
    getKeys: r.keys,
    getNames: r.getOwnPropertyNames,
    getSymbols: r.getOwnPropertySymbols,
    each: [].forEach
  }
}, , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    return e instanceof T
  }

  function i(e) {
    var t = m.getOldLogoutCreds();
    m.setOldLogoutCreds(_.filter(t, _.negate(_.matches(e))))
  }
  var a = r(36),
    s = n(a),
    d = r(3),
    u = n(d),
    c = r(27),
    l = n(c),
    f = r(1),
    h = r(10),
    p = r(49),
    g = r(7),
    m = r(15),
    v = r(8),
    y = r(196),
    b = r(111),
    w = r(181),
    E = r(29),
    S = r(21),
    N = r(179),
    T = r(9),
    $ = r(39),
    C = r(55),
    k = r(398),
    A = r(110),
    I = r(16),
    O = r(85),
    R = r(157),
    P = {
      OPENING: "OPENING",
      PAIRING: "PAIRING",
      UNPAIRED: "UNPAIRED",
      UNPAIRED_IDLE: "UNPAIRED_IDLE",
      CONNECTED: "CONNECTED",
      TIMEOUT: "TIMEOUT",
      CONFLICT: "CONFLICT",
      UNLAUNCHED: "UNLAUNCHED",
      PROXYBLOCK: "PROXYBLOCK",
      TOS_BLOCK: "TOS_BLOCK"
    },
    M = {
      DISCONNECTED: "DISCONNECTED",
      SYNCING: "SYNCING",
      RESUMING: "RESUMING",
      CONNECTED: "CONNECTED"
    },
    L = {
      NEW: "new",
      SENT: "sent",
      WEBDACKED: "webdacked",
      WILL_RETRY: "will_retry"
    },
    D = S.defineAll(["SendCalledWhileDisconnected", "ExternalPoke", "MustExitLoop", "Denied401Failed", "Denied409Conflict", "DeniedTOS", "DeniedUnknown", "ForcedRefresh", "TooManyRefRequest", "UILogout", "WindowOffline", "PhoneFailedPing", "AssertionFailed", "TakeoverRequested", "PhoneReplacedClient", "NoSecretBundle", "PhoneKickedClient"]),
    x = {
      SYNC_INFO: ["Conn", N.OBJECT],
      CHALLENGE: ["Cmd", {
        type: "challenge",
        challenge: N.STRING
      }],
      DISCONNECT: ["Cmd", {
        type: "disconnect",
        kind: _
      }],
      HARD_REFRESH: ["Cmd", {
        type: "update"
      }],
      PONG: ["Pong", N.BOOLEAN]
    },
    j = {
      TAG: function(e) {
        return new N({
          tag: e,
          data: N.ANY
        })
      },
      SYNC_INFO: new N({
        tag: N.ANY,
        data: x.SYNC_INFO
      }),
      CHALLENGE: new N({
        tag: N.ANY,
        data: x.CHALLENGE
      }),
      DISCONNECT: new N({
        tag: N.ANY,
        data: x.DISCONNECT
      }),
      HARD_REFRESH: new N({
        tag: N.ANY,
        data: x.HARD_REFRESH
      }),
      PONG: new N({
        tag: N.ANY,
        data: x.PONG
      })
    },
    U = new N({
      status: function(e) {
        return "number" == typeof e && e >= 500
      },
      _: _
    }),
    B = 5,
    F = 6e4,
    W = 5,
    Y = 500,
    G = 3e3,
    q = 3e3,
    K = 36e5,
    H = 120,
    V = 40,
    z = p.extend({
      extraProperties: "reject",
      props: {
        data: "any",
        tag: "string",
        state: {
          type: "string",
          values: _.values(L),
          "default": L.NEW
        },
        ephemeral: "boolean",
        ignore: "boolean",
        clientCacheable: "boolean",
        onSend: "function",
        onDrop: "function",
        age: {
          type: "number",
          "default": 0
        },
        resends: {
          type: "number",
          "default": 0
        },
        resendTimer: {
          type: "number",
          "default": 0
        },
        binaryOpts: "object"
      },
      derived: {
        likelyDead: {
          deps: ["age"],
          fn: function() {
            return this.age >= V
          }
        },
        isToPhone: {
          deps: ["data"],
          fn: function() {
            return this.data instanceof ArrayBuffer
          }
        }
      },
      getTag: function() {
        return this.tag || (this.onSend ? this.onSend.tag : void 0)
      },
      toString: function() {
        return this.binaryOpts ? this.binaryOpts.debugString : !_.isArray(this.data) || "query" !== this.data[0] && "action" !== this.data[0] ? _.isArray(this.data) ? "[" + this.data[0] + (this.data.length > 1 ? ", ...]" : "]") : _.isObject(this.data) ? "{...}" : this.data + "" : "[" + this.data[0] + ", " + this.data[1] + (this.data.length > 2 ? ", ...]" : "]")
      },
      serialize: function() {
        var e = this.tag;
        if (this.binaryOpts) {
          var t = this.binaryOpts,
            r = T.calculateUTF8Bytes(e) + 3,
            n = new T(r, !1),
            o = t.metric ? t.metric : 0,
            i = (this.ignore ? 0 : 1) << 7 | (!this.ignore && t.ackRequest ? 1 : 0) << 6 | (t.available === !0 ? 1 : 0) << 5 | (t.available === !1 ? 1 : 0) << 4 | (t.expires ? 1 : 0) << 3 | (t.skipOffline ? 1 : 0) << 2;
          return n.writeString(e), n.writeString(","), n.writeByte(o), n.writeByte(i), n.reset(), T.concat([n, this.data]).toBuffer()
        }
        var a = _.isString(this.data) ? this.data : (0, l["default"])(this.data);
        return e + ",," + a
      }
    }),
    Q = p.extend({
      extraProperties: "reject",
      session: {
        socketPreload: "object",
        socket: "object",
        launchGeneration: {
          type: "number",
          "default": 0
        },
        backoffGeneration: {
          type: "number",
          "default": 0
        },
        hasSynced: "boolean",
        state: {
          type: "string",
          values: _.keys(P),
          "default": P.UNLAUNCHED
        },
        stream: {
          type: "string",
          values: _.keys(M),
          "default": M.DISCONNECTED
        },
        canSend: "boolean",
        sendQueue: "array",
        sendHash: "object",
        sequence: {
          type: "number",
          "default": 0
        },
        shortTagBase: "string",
        socketWatcher: "object",
        refWatcher: "object",
        phoneWatchdog: "object",
        pendingPhoneReqs: {
          type: "number",
          "default": 0
        },
        isIncognito: "boolean",
        runPromise: "object",
        streamPromise: "object",
        logoutMutex: {
          type: "number",
          "default": 0
        },
        retryTimestamp: "number",
        pokeable: "object",
        conflictPromise: "object",
        launched: "boolean",
        mustExitLoop: "boolean",
        syncTag: "string",
        lastPhoneMessage: "number"
      },
      initialize: function() {
        this.sendQueue = [], this.sendHash = {}, this.phoneWatchdog = new w({
          waitAlgorithm: w.FIBONACCI(G, q, K),
          onTimeout: this.phoneTimedOut.bind(this),
          onActivated: this.onPhoneWatchdogActivated.bind(this),
          onFed: this.onPhoneWatchdogFed.bind(this),
          onDeactivated: this.onPhoneWatchdogDeactivated.bind(this)
        }), this.listenTo(this, "change:state", this.onStateChange.bind(this)), this.listenTo(this, "change:stream", this.onStreamChange.bind(this)), u["default"].delay(0).then(E.determineIncognito).bind(this).then(function(e) {
          this.isIncognito = e
        }), this.listenTo(v, "log_socket_summary", this.summary)
      },
      STATE: P,
      STREAM: M,
      preload: function(e) {
        this.socketPreload = e || new k
      },
      send: function(e) {
        var t = new z(e);
        this.sendQueue.push(t), this.flushQueue()
      },
      shortTag: function() {
        return this.shortTagBase || (this.shortTagBase = (moment().unix() % 1e3).toString()), this.shortTagBase + ".--" + this.sequence++
      },
      tag: function(e) {
        var t = moment().unix() + ".--" + this.sequence++;
        return e && g.FLAVOR_TAGS ? t + "-" + e : t
      },
      launch: function(e, t) {
        function r() {
          f.log("ws2:socket loop closed")(), this.socketPreload && this.socketPreload.deactivate(), this.clearState(), this.set({
            state: P.UNLAUNCHED,
            mustExitLoop: !1,
            launched: !1,
            socketPreload: null
          })
        }
        f.log("ws2:Launch gen" + this.launchGeneration + " (backoff gen" + this.backoffGeneration + ")")(), t = t || 0;
        var n = Date.now() + 300 * O.expBackoff(this.backoffGeneration, 100),
          o = n + F;
        if (this.launched) {
          var i = new Error("Redundant Launch");
          return f.error("ws2:launch redundantly called!")(), f.errorVerbose(i.stack)(), void h.upload("redundant-launch")
        }
        this.mustExitLoop ? r.call(this) : (this.launched = !0, this.run(t, e).then(function(e) {
          return [e, !1]
        }).bind(this)["catch"](D.MustExitLoop, function() {
          return this.mustExitLoop = !0, [!1, !1]
        })["catch"](D.TakeoverRequested, function() {
          return [!1, !0]
        })["catch"](function(e) {
          return f.error("ws2:run error unknown!")(e), f.errorVerbose(e.stack)(), h.upload("unknown-error-in-ws-loop"), this.clearState(), [!0, !1]
        }).spread(function(e, t) {
          if (this.mustExitLoop) r.call(this);
          else {
            var i = Date.now();
            this.launchGeneration++, this.backoffGeneration = e && o > i ? this.backoffGeneration + 1 : 0, this.launched = !1, this.launch(t, n > i ? n - i : 0)
          }
        }))
      },
      poke: function() {
        this.pokeable ? this.pokeable.poke() : this.phoneWatchdog.forceTimeout()
      },
      takeover: function() {
        if (!this.conflictPromise) throw "Takeover called without conflict!";
        this.conflictPromise.cancel(new D.TakeoverRequested)
      },
      exitLoop: function() {
        this.mustExitLoop = !0, this.runPromise && this.runPromise.cancel(new D.MustExitLoop)
      },
      logout: function(e) {
        var t = this.runPromise;
        f.info("ws2:user logged out")(), this.stream === M.DISCONNECTED || e ? this.sendCurrentLogout() : this.sendCurrentLogout(this.socket), this.clearCredentials(), t && t.cancel(new D.UILogout), this.state === P.OPENING && this.trigger("change:state")
      },
      summary: function() {
        f.log("ws:summary --------------------------------")(), f.log("ws state           " + this.state)(), f.log("wd online:         " + navigator.onLine)(), f.log("ws socket id:      " + (this.socket ? this.socket.id : "n/a"))(), f.log("ws queue:")(), _.isEmpty(this.sendQueue) || y.printArray(_.map(this.sendQueue, function(e) {
          var t = _.pick(e, "tag", "state", "age", "ephemeral", "isToPhone");
          return e && e.toString && (t.debug = e.toString()), t
        })).split(/\n/).forEach(function(e) {
          f.log(e)()
        }), f.log("ws hash:")(), _.isEmpty(this.sendHash) || y.printArray(_.map(this.sendHash, function(e) {
          var t = _.pick(e, "tag", "state", "age", "ephemeral", "isToPhone");
          return e && e.toString && (t.debug = e.toString()), t
        })).split(/\n/).forEach(function(e) {
          f.log(e)()
        })
      },
      onStateChange: function() {
        f.log("ws2:state change: " + this.state)()
      },
      onStreamChange: function() {
        f.log("ws2:stream change: " + this.stream)(), this.stream === M.DISCONNECTED && this.onRefCycle()
      },
      onRefCycle: function() {
        f.log("ws2:onRefCycle")(), this.sendQueue.forEach(function(e) {
          e.state = L.NEW, e.age = 0
        }), this.clearSendHash()
      },
      onActivity: function(e) {
        if (e) {
          var t = e.data;
          if (j.HARD_REFRESH.test(e)) f.error("ws2:hard refresh!")(), A.update(0);
          else if (t) {
            var r = _.isArray(t) ? " [" + t[0] + ", ...]" : "";
            f.logColor("green", "    recv: " + e.tag + r, t)()
          } else f.logColor("#669999", "     ack: " + e.tag)()
        } else R.setSkew(this.socket.timeSkew || 0);
        this.sendRemainingLogouts()
      },
      onPhoneWatchdogActivated: function() {},
      onPhoneWatchdogFed: function() {
        this.state = P.CONNECTED
      },
      onPhoneWatchdogDeactivated: function() {},
      flushQueue: function() {
        if (this.canSend && this.sendQueue.length) {
          var e = _.where(this.sendQueue, {
              state: L.NEW
            }),
            t = R.localUnixTime(),
            r = _.partition(e, function(e) {
              return e.binaryOpts && e.binaryOpts.expires ? t - e.binaryOpts.expires > H : !1
            }),
            n = r[0],
            o = r[1];
          this.sendQueue = _.difference(this.sendQueue, n), n.forEach(function(e) {
            delete this.sendHash[e.tag], e.onSend({
              status: 408
            })
          }, this), o.length && o.forEach(this._send, this)
        }
      },
      phoneTimedOut: function() {
        var e = this.phoneWatchdog.failGeneration;
        if (1 === e) {
          f.warn("ws2:Phone timed out")();
          var t = _.pluck(this.sendHash, "tag");
          f.warn("ws2:Outstanding Reqs: " + t.join(","))()
        }
        v.sentPing(e);
        var r = this.phoneWatchdog.waitAlgorithm(this.phoneWatchdog);
        return this.set({
          state: P.TIMEOUT,
          retryTimestamp: Date.now() + r
        }), this._basicSend({
          tag: this.tag("ping"),
          data: ["admin", "test"]
        }, "ping"), !0
      },
      clearSendHash: function(e) {
        if (e) _.each(this.sendHash, function(e) {
          e.resendTimer && clearTimeout(e.resendTimer), e.onDrop(new S.LogoutDrop(e.toString()))
        });
        else {
          var t = _.filter(this.sendHash, "ephemeral");
          f.warn("Ephemeral Drop: " + _.pluck(t, "tag").join(","))(), t.forEach(function(e) {
            e.resendTimer && clearTimeout(e.resendTimer), e.onDrop(new S.EphemeralDrop(e.toString()))
          })
        }
        this.sendHash = {}, this.pendingPhoneReqs = 0, this.phoneWatchdog.deactivate()
      },
      _basicSend: function(e, t) {
        f.logColor("blue", "low-send: " + t + " " + e.tag, e.data)(), this.socket.cast(e.tag + "," + (0, l["default"])(e.data))
      },
      _send: function(e) {
        e.tag = e.getTag() || this.shortTag(), this.sendHash[e.tag] = e;
        var t = e.binaryOpts ? e.binaryOpts.debugObj : e.data;
        f.logColor("blue", "    send: " + e.tag + ", " + e.toString(), t)(), this.socket.send(e.serialize()), e.isToPhone && (this.pendingPhoneReqs++, this.phoneWatchdog.activate()), e.state = L.SENT
      },
      sendBasic: function(e) {
        return this.socket ? (e.tag = this.tag(), this._basicSend(e, "external"), this.socket.nextMessage(j.TAG(e.tag))) : u["default"].reject("socket not open")
      },
      sendEphemeral: function(e) {
        e.ephemeral = !0;
        var t = new z(e);
        this.canSend ? this._send(t) : t.onDrop(new S.EphemeralDrop(t.toString()))
      },
      sendEphemeralIgnore: function(e) {
        e.ephemeral = !0, e.ignore = !0, e.tag = this.tag();
        var t = new z(e);
        if (this.canSend) {
          var r = t.serialize();
          this.socket.send(r), f.logColor("blue", "sending: " + t.tag + ", " + t.toString(), t.data)()
        } else t.onDrop(new S.EphemeralDrop(t.toString()))
      },
      onMessage: function(e) {
        var t = e.tag,
          r = e.data;
        if (o(r) && (this.lastPhoneMessage = moment().unix()), j.PONG.test(e))
          if (r[1]) {
            var n = 0,
              i = !1;
            _.each(this.sendHash, function(e) {
              if (e.isToPhone) {
                var t = e.likelyDead;
                e.age++, e.likelyDead && !t ? (i = !0, f.error(e.tag + " likely dead: " + e.toString(), e)(), v.error2412("(" + e.tag + ") " + e.toString()), Store.Wap.error2412()) : e.likelyDead || n++
              }
            }), this.pendingPhoneReqs = n, this.phoneWatchdog.feed(), 0 === n && this.phoneWatchdog.deactivate(), i && h.upload("error-2412")
          } else this.state !== P.TIMEOUT ? f.error("ws2:Pang while not timed-out")() : this.runPromise.cancel(new D.PhoneFailedPing);
        else {
          var a = this.sendHash[t];
          if (a) {
            if (!r) return void(a.state = L.WEBDACKED);
            var s;
            try {
              s = a.onSend(r)
            } catch (d) {
              if (d instanceof S.E401) return void this.logout();
              f.error("ws2:onMessage error")(d), a.onDrop(d)
            }
            U.test(s) ? (f.error("ws2:onMessage 5xx error " + a.tag, s)(), a.resends >= B ? (f.error("ws2:onMessage dropping " + a.tag)(), a.onDrop(new S.Server5xxDrop), delete this.sendHash[t], this.sendQueue = _.without(this.sendQueue, a)) : this.resendRequestEventually(a)) : (delete this.sendHash[t], this.sendQueue = _.without(this.sendQueue, a), a.isToPhone && (a.likelyDead || this.pendingPhoneReqs--, this.phoneWatchdog.feed(), 0 === this.pendingPhoneReqs && this.phoneWatchdog.deactivate()))
          } else if (r) {
            var u;
            if (T.isByteBuffer(r)) u = Store.Wap;
            else {
              var c = _.isFunction(r.shift) ? r.shift() : r;
              u = Store[c]
            }
            u ? u.handle(r, this, t) : f.error("ws2: Invalid type received", r)(), o(r) && this.phoneWatchdog.feed()
          }
        }
      },
      run: function(e, t) {
        return this.runPromise = $.resolve(e).bind(this).cancellable().then(function(e) {
          if (this.state = P.OPENING, v.incrementProgress(), e > 0) {
            f.log("ws2:Run Backoff " + e + "ms")();
            var t = $.delay(e).cancellable()["catch"](D.ExternalPoke, _.noop);
            return this.setPokeable(t, Date.now() + e), t
          }
        })["finally"](function() {
          this.unset("pokeable"), this.unset("retryTimestamp")
        }).then(function() {
          return v.incrementProgress(), f.log("ws2:Running")(), this.openSocket()
        }).then(function(e) {
          return v.incrementProgress(), e.onactivity = this.onActivity.bind(this), this.socket = e, this.socketWatcher = E.attachWatcher(this.runPromise, this.throwOnClose()), this.state = P.PAIRING, "undefined" == typeof this.isIncognito ? E.waitForBBEvent(this, "change:isIncognito") : void 0
        }).then(function() {
          var e = this;
          v.incrementProgress(), this.shortTagBase = (moment().unix() % 1e3).toString();
          var r = this.initConn();
          if (!m.knowsPhone()) return r.bind(this).then(function() {
            this.set({
              state: P.UNPAIRED,
              refWatcher: E.attachWatcher(this.runPromise, this.manageRef())
            })
          });
          var n = function() {
            var n = e.requestSync(t);
            return {
              v: u["default"].all([r, n])["finally"](function() {
                r.cancel(), n.cancel()
              })
            }
          }();
          return "object" === ("undefined" == typeof n ? "undefined" : (0, s["default"])(n)) ? n.v : void 0
        }).then(this.waitForSyncInfo)["finally"](function() {
          this.refWatcher && (this.refWatcher.cancel(), this.unset("refWatcher"))
        }).then(function(e) {
          return v.incrementProgress(), f.log("ws2:completed " + (this.hasSynced ? "re-auth" : "auth"))(), this.state = P.CONNECTED, E.waitForMain()["return"](e)
        }).then(function(e) {
          f.log("ws2:main loaded")(), e.initial = !0, Store.Conn.handle([e]);
          var t = this.openStream();
          return this.streamPromise = t, t
        }).then(function() {
          return new $
        })["catch"](S.SocketClosed, function(e) {
          throw e.event instanceof D.UILogout ? e.event : e
        })["catch"](function(e) {
          f.warn("ws2:run loop interrupt: " + e)(e), this.set({
            canSend: !1,
            stream: M.DISCONNECTED,
            runPromise: null
          }), this.phoneWatchdog.deactivate(), this.streamPromise && (this.streamPromise.cancel(), this.unset("streamPromise")), this.socketWatcher && (this.socketWatcher.cancel(), this.unset("socketWatcher"));
          var t = this.socket;
          return t && "closed" !== t.state && (t.detachCallbacks(), t.close(!0, e)), this.unset("socket"), u["default"].reject(e)
        })["catch"](S.E401, D.PhoneFailedPing, function() {
          return !1
        })["catch"](D.ForcedRefresh, function() {
          return this.clearState(), !1
        })["catch"](S.SocketClosed, S.SocketError, function() {
          return !0
        })["catch"](D.DeniedUnknown, function(e) {
          return f.error("ws2:sync rejected, logging out")(), this.sendCurrentLogout(), this.clearCredentials(), !1
        })["catch"](D.Denied401Failed, D.PhoneKickedClient, function(e) {
          return f.log("ws2:phone disassociated via " + e)(), this.clearCredentials(), !1
        })["catch"](D.NoSecretBundle, function() {
          return f.error("ws2:No secret bundle!")(), this.clearCredentials(), h.upload("no-secret-bundle"), !1
        })["catch"](D.TooManyRefRequest, function() {
          return this.state = P.UNPAIRED_IDLE, this.setPokeable(E.waitForOfflineNaive()["throw"](new D.WindowOffline)["catch"](D.ExternalPoke, _.constant(!1)))
        })["catch"](S.BlockedByProxy, function() {
          return I.promptUnloadGuards++, this.state = P.PROXYBLOCK, this.setPokeable((new $)["catch"](D.ExternalPoke, _.constant(!1))["finally"](function() {
            I.promptUnloadGuards--
          }))
        })["catch"](D.DeniedTOS, function() {
          f.log("ws2:denied tos")();
          var e = this.setPokeable((new $).cancellable()["catch"](D.ExternalPoke, _.constant(!1))).cancellable();
          return this.clearState(), this.set({
            state: P.TOS_BLOCK,
            runPromise: e
          }), e
        })["catch"](D.Denied409Conflict, D.PhoneReplacedClient, function(e) {
          e instanceof D.Denied409Conflict ? f.log("ws2:phone denied (conflict)")() : f.log("ws2:phone replaced")(), this.clearState();
          var t = (new $).cancellable();
          return this.set({
            state: P.CONFLICT,
            conflictPromise: t,
            runPromise: t
          }), t
        })["finally"](function() {
          this.conflictPromise && this.conflictPromise.cancel()
        })["catch"](D.UILogout, D.WindowOffline, function() {
          return !1
        })
      },
      openSocket: function() {
        var e = this,
          t = this.socketPreload;
        if (this.socketPreload = null, t && t.socket && "open" === t.socket.state) return u["default"].resolve(t.socket);
        t && t.active || (t = new k);
        var r = function() {
          e.retryTimestamp = t.retryTimestamp
        };
        t.on("change:retryTimestamp", r), this.pokeable = t;
        var n = E.waitForBBEvent(t, "change:socket").cancellable().then(function() {
          return t.socket
        })["finally"](function() {
          t.off("change:retryTimestamp", r), t.onerror = null, t.deactivate(), e.pokeable = null
        });
        return t.onerror = function(e) {
          n.cancel(e)
        }, n
      },
      initConn: function() {
        return new u["default"](function(e, t) {
          var r = g.VERSION,
            n = this.tag("init"),
            o = I.info();
          return this._basicSend({
            tag: n,
            data: ["admin", "init", [r.p, r.s, r.t],
              [o.os || "Unknown", o.name || "Unknown"], I.id(), !this.isIncognito && !!m.getRememberMe()
            ]
          }, "init"), this.socket.nextMessage(j.TAG(n)).get("data")["catch"](t).then(e)
        }.bind(this)).then(function(e) {
          A.update(e.update, e.curr), R.setSkew(Date.now() - e.time), Store.Conn.handle([{
            id: 1,
            ref: e.ref,
            refTTL: e.ttl
          }])
        })
      },
      manageRef: function() {
        var e = this;
        return E.loopOnError(S.ShouldLoop, function(t) {
          var r = Store.Conn.refExpiry - Date.now() - Y;
          return u["default"].delay(Math.max(r, 0)).cancellable().then(function() {
            if (t >= W) throw new D.TooManyRefRequest;
            f.log("ws2:Requesting Ref Update")();
            var r = e.tag("qr" + t);
            return e._basicSend({
              tag: r,
              data: ["admin", "Conn", "reref"]
            }, "reref"), e.socket.nextMessage(j.TAG(r))
          }).then(function(e) {
            var t = e.data;
            switch (t.status) {
              case 200:
                throw f.log("ws2:Updating Ref")(), Store.Conn.handle([{
                  ref: t.ref,
                  refTTL: t.ttl
                }]), new S.ShouldLoop;
              case 304:
                return void f.log("ws2:Keeping Ref")();
              case 429:
                throw f.log("ws2:Server denied new ref")(), new D.TooManyRefRequest;
              default:
                throw f.error("ws2:Bad Ref Response!", t)(), new D.AssertionFailed("unrecognized ref request status (" + t.status + ")")
            }
          })
        }).cancellable()
      },
      requestSync: function(e) {
        var t = this;
        if (this.syncTag = this.tag("sync"), !C.load()) throw new D.NoSecretBundle;
        var r = m.getLoginTokens(),
          n = r.client,
          o = r.server,
          i = ["admin", "login", n, o, I.id()];
        e ? i.push("takeover") : this.hasSynced && (i.push("reconnect"), i.push(Store.Conn.me));
        var a = function() {
            return t._basicSend({
              tag: t.syncTag,
              data: i
            }, "sync"), !0
          },
          s = new w({
            waitAlgorithm: w.FIBONACCI(0, 8500, 6e4),
            onTimeout: a
          });
        s.on("change:ts", function() {
          t.retryTimestamp = s.ts
        }), this.pokeable = s, s.activate(), a();
        var d = this.socket.nextMessage(j.TAG(this.syncTag)),
          c = this.lookForAndHandleChallenge()["catch"](u["default"].CancellationError, _.noop)["catch"](d.cancel.bind(d));
        return d.then(function(e) {
          f.log("ws2:login", e)();
          var t = e.data;
          switch (t.status) {
            case 200:
              return e;
            case 401:
              return u["default"].reject(new D.Denied401Failed);
            case 403:
              return u["default"].reject(t.tos >= 2 ? new D.DeniedTOS : new D.DeniedUnknown);
            case 405:
              return f.error("ws2:Already authorized!")(), h.upload("already-authorized"), u["default"].reject(new D.ForcedRefresh);
            case 409:
              return u["default"].reject(new D.Denied409Conflict);
            default:
              return f.error("ws2:unknown error! status:" + t.status, e)(), u["default"].reject(new D.DeniedUnknown)
          }
        })["finally"](function() {
          c.cancel(), s.deactivate(), t.unset("pokeable"), t.unset("retryTimestamp")
        })
      },
      waitForSyncInfo: function() {
        return this.socket.nextMessage(j.SYNC_INFO).then(function(e) {
          return e.data[1]
        })
      },
      lookForAndHandleChallenge: function() {
        return this.socket.nextMessage(j.CHALLENGE).bind(this).then(function(e) {
          f.log("ws2:challenged!")();
          var t = CryptoJS.enc.Base64.parse(e.data[1].challenge),
            r = C.getSecurityToken(t),
            n = m.getLoginTokens(),
            o = n ? n.server : void 0;
          if (!o) return f.error("ws2:handleChallenge no server token!", n)(), u["default"].reject(new Error("Handle challenge no server token"));
          var i = this.tag("challenge");
          return this._basicSend({
            tag: i,
            data: ["admin", "challenge", r, o, I.id()]
          }, "challenge"), this.socket.nextMessage(j.TAG(i))
        }).then(function(e) {
          return e.data.status >= 400 ? (f.error("ws2:handleChallenge failed challenge!", e.data)(), u["default"].reject(new D.Denied401Failed)) : void f.log("ws2:handleChallenge passed challenge")()
        })
      },
      throwOnClose: function() {
        return this.socket.nextMessage(j.DISCONNECT).then(function(e) {
          var t = e.data[1];
          throw "replaced" === t.kind ? new D.PhoneReplacedClient : new D.PhoneKickedClient;
        })
      },
      openStream: function() {
        this.canSend = !0;
        var e, t;
        return this.hasSynced ? e = u["default"].join(this.queryReceivedActions(), Store.Chat.resyncMessages(), Store.Msg.resyncReceipts(), _.noop).bind(this).then(function() {
          this.flushQueue(), this.stream = M.CONNECTED
        })["catch"](S.EphemeralDrop, u["default"].CancellationError, function() {
          this.stream = M.DISCONNECTED
        })["catch"](function(e) {
          throw f.error("ws2:error during resume, resyncing: " + e)(e), f.errorVerbose(e.stack)(), h.upload("error-on-resume"), this.stream = M.DISCONNECTED, new D.ForcedRefresh
        }) : (t = Store.Chat.sync().cancellable().bind(this).then(function() {
          this.set({
            hasSynced: !0,
            stream: M.CONNECTED
          })
        })["catch"](u["default"].CancellationError, _.noop), e = u["default"].join(t, Store.Contact.sync(), _.noop).bind(this)["catch"](function(e) {
          return t.cancel(), this.set({
            hasSynced: !1,
            stream: M.DISCONNECTED
          }), u["default"].reject(e)
        })["catch"](u["default"].CancellationError, _.noop)), u["default"].resolve().cancellable().bind(this).then(function() {
          return this.stream = this.hasSynced ? M.RESUMING : M.SYNCING, this.socket.onmessage = this.onMessage.bind(this), this.socket.releaseMessages(), e
        })["catch"](u["default"].CancellationError, function() {
          e.cancel()
        })
      },
      queryReceivedActions: function() {
        var e = this,
          t = _.filter(this.sendQueue, "clientCacheable", !0),
          r = _.pluck(t, "tag").filter(function(e) {
            return e
          });
        return f.log("ws2:queryReceivedActions")(), 0 === r.length ? u["default"].resolve() : Store.Wap.queryReceivedActions(r).then(function(r) {
          _.isArray(r) ? r.forEach(function(t) {
            var r = _.find(e.sendQueue, "tag", t.id);
            if (r)
              if (f.log("ws2:queryReceivedActions found dup: " + t.id + "," + t.code)(), delete e.sendHash[t.id], e.sendQueue = _.without(e.sendQueue, r), r.onSend) {
                var n = r.onSend({
                  status: t.code,
                  _duplicate: !0
                });
                U.test(n) && r.onDrop(new S.Server5xxDrop)
              } else f.error("ws2:queryReceivedActions onSendDup undefined; should be defined: " + t.id)(), r.onDrop(new S.ConventionViolationDrop);
            else f.error("ws2:queryReceivedActions unknown tag in response: " + t.id)()
          }) : "replaced" === r ? (t.forEach(function(e) {
            e.onDrop(new S.BrowserReplacedDrop)
          }), e.sendQueue = _.difference(e.sendQueue, t)) : f.error("ws2:queryReceivedActions error", r)()
        })
      },
      setPokeable: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? this.retryTimestamp : arguments[1];
        return this.set({
          pokeable: {
            poke: function() {
              e.cancel(new D.ExternalPoke)
            }
          },
          retryTimestamp: t
        }), e
      },
      clearCredentials: function() {
        this.clearState(), m.setBrowserId(), m.setUnknownId(), m.clearTokens(), m.clearAllLocalState(), C.clear()
      },
      clearState: function() {
        this.sendQueue = [], this.clearSendHash(!0), this.unset("hasSynced"), _.each(Store, function(e) {
          _.isFunction(e["delete"]) && e["delete"]()
        })
      },
      resendRequestEventually: function(e) {
        var t = this,
          r = 300 * O.expBackoff(e.resends, 100);
        f.log("ws2:Resending " + e.toString() + " in " + r + "ms")();
        var n = _.delay(function() {
          e.resends++, e.resendTimer = 0, t.sendHash[e.tag] === e && t._send(e)
        }, r);
        e.set({
          resendTimer: n,
          state: L.WILL_RETRY
        })
      },
      sendCurrentLogout: function(e) {
        if (C.load()) {
          var t = {
              t: m.getLogoutToken(),
              m: Store.Wap.logoutToken()
            },
            r = m.getOldLogoutCreds();
          r.push(t), m.setOldLogoutCreds(r)
        }
        if (e && e.state === b.STATE.OPEN) {
          var n = this.logoutMutex;
          this.logoutMutex = 0 >= n ? n = 1 : ++n, f.info("ws2:logout through socket")(), e.partingSend(new D.UILogout, 'goodbye,,["admin","Conn","disconnect"]', _.matches("goodbye,")).bind(this).then(function(e) {
            e ? (f.log("ws2:logout through socket success")(), i(t)) : f.warn("ws2:logout through socket failure, will POST")()
          })["finally"](function() {
            this.logoutMutex === n && (this.logoutMutex = 0)
          })
        } else this.logoutMutex < 0 && (this.logoutMutex = 0), this.sendRemainingLogouts()
      },
      sendRemainingLogouts: function() {
        var e = this.logoutMutex;
        if (0 === e) {
          var t = r(109),
            n = m.getOldLogoutCreds();
          if (0 === n.length) return void(this.logoutMutex = -1);
          this.logoutMutex = e = 1, u["default"].all(_.map(n, function(e) {
            return f.info("ws2:POST logout")(), t.post(g.LOGOUT_URL, e).then(function() {
              i(e)
            })["catch"](function(e) {
              f.warn("ws2:POST logout failure")()
            })
          })).bind(this)["finally"](function() {
            e === this.logoutMutex && (this.logoutMutex = 0)
          })
        }
      }
    });
  e.exports = new Q
}, , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(27),
    i = n(o),
    a = r(7),
    s = r(30),
    d = r(1),
    u = r(362),
    c = r(403),
    l = [a.KEY_LOGOUT_TOKEN, a.KEY_CLIENT_TOKEN, a.KEY_SERVER_TOKEN, a.KEY_SECRET_BUNDLE],
    f = [a.KEY_LOG_CURSOR, a.KEY_WHATSAPP_MUTEX, a.KEY_REMEMBER_ME, a.KEY_WHATSAPP_LS_VERSION],
    h = [a.KEY_WHATSAPP_MUTEX, a.KEY_REMEMBER_ME, a.KEY_OLD_LOGOUT_CREDS],
    p = [a.KEY_VERSION],
    g = 1,
    m = {
      v0: function() {
        var e = localStorage.getItem(a.KEY_SECRET_BUNDLE);
        e && (e = JSON.parse(e), e = _.isObject(e) ? (0, i["default"])(e) : e, localStorage.setItem(a.KEY_SECRET_BUNDLE, e)), this._setLSVersion(1)
      }
    },
    v = "x" + Math.round(1e9 * Math.random()),
    y = function(e) {
      if (e.key !== a.KEY_WHATSAPP_MUTEX) return !1;
      var t = e.newValue || "";
      return -1 === t.indexOf(v)
    },
    b = function(e) {
      if (e.key !== a.KEY_LOCAL_TAKEOVER_OK) return !1;
      var t = e.newValue || "";
      return -1 === t.indexOf(v)
    },
    w = {
      thisTabId: v,
      getRememberMe: function() {
        var e = this._getPS(a.KEY_REMEMBER_ME);
        return _.isNull(e) && (e = !0, this._setPS(a.KEY_REMEMBER_ME, !0)), e
      },
      setRememberMe: function(e) {
        if (e = !!e, e !== this.getRememberMe()) {
          d.log("UserPrefs:setRememberMe: " + e)();
          var t, r;
          if (t = this._storage(), this._setPS(a.KEY_REMEMBER_ME, e), r = this._storage(), t !== r) {
            var n = _.difference(_.keys(t), f, h);
            n.forEach(function(e) {
              _.isFunction(t[e]) || (r[e] = t[e], t.removeItem(e))
            })
          }
          e || d.clearLogs()
        }
      },
      _storage: function() {
        return this.getRememberMe() ? s.permanentStorage : s.temporaryStorage
      },
      clear: function() {
        var e = this._getPreservedKeys();
        this._storage().clear(), this._setPreservedKeys(e)
      },
      _getKeys: function(e, t) {
        return _.object(t, t.map(function(t) {
          return e.getItem(t)
        }))
      },
      _setKeys: function(e, t) {
        _.each(t, function(t, r) {
          e.setItem(r, t)
        })
      },
      _getPreservedKeys: function() {
        return this._getKeys(s.permanentStorage, h)
      },
      _setPreservedKeys: function(e) {
        return this._setKeys(s.permanentStorage, e)
      },
      _getAllKeyValues: function() {
        var e = this._storage();
        return _.object(_.keys(e).map(function(t) {
          return [t, e.getItem(t)]
        }))
      },
      _setAllKeyValues: function(e) {
        var t = this._storage();
        _.keys(e).forEach(function(r) {
          t.setItem(r, e[r])
        })
      },
      _getPS: function(e) {
        return this._get(e, s.permanentStorage)
      },
      _setPS: function(e, t) {
        return this._set(e, t, s.permanentStorage)
      },
      _getTS: function(e) {
        return this._get(e, s.temporaryStorage)
      },
      _setTS: function(e, t) {
        return this._set(e, t, s.temporaryStorage)
      },
      _get: function(e, t, n) {
        if (_.isUndefined(e)) throw new Error("_get called with no key");
        t = t || this._storage();
        var o = t.getItem(e);
        if (n || _.isUndefined(o)) return o;
        try {
          return JSON.parse(o)
        } catch (i) {
          d.log("userPrefs:_get(" + e + ") '" + i + "' " + o)();
          var a = r(10);
          return a.upload("userprefs-parse-error"), void t.removeItem(e)
        }
      },
      _set: function(e, t, r, n) {
        if (_.isUndefined(e)) throw new Error("_set called with no key");
        r = r || this._storage(), _.isUndefined(t) ? r.removeItem(e) : r.setItem(e, n ? t : (0, i["default"])(t))
      },
      _getUser: function(e) {
        if (!Store.Conn.me) return d.error("userPrefs: Me has not loaded yet.")(), null;
        var t = u([Store.Conn.me, e].join(":"));
        return this._get(t)
      },
      _setUser: function(e, t) {
        if (!Store.Conn.me) return d.error("userPrefs: Me has not loaded yet.")(), null;
        var r = u([Store.Conn.me, e].join(":"));
        return this._set(r, t)
      },
      getLoginTokens: function() {
        return {
          client: this._get(a.KEY_CLIENT_TOKEN),
          server: this._get(a.KEY_SERVER_TOKEN)
        }
      },
      setLoginTokens: function(e) {
        var t = e.client,
          r = e.server;
        t && r && !_.isUndefined(t) && (d.log("UserPrefs:setLoginTokens")(), this._set(a.KEY_CLIENT_TOKEN, t), this._set(a.KEY_SERVER_TOKEN, r))
      },
      knowsPhone: function() {
        var e = this.getLoginTokens();
        return !(!e.client || !e.server)
      },
      setRefTokCookies: function(e, t) {
        w.clearCookies(), w.clearDeprecatedKeys(), c.setCookie({
          name: a.COOKIE_REF,
          value: e,
          path: a.PP_REF,
          domain: a.COOKIE_DOMAIN,
          secure: !0
        });
        var r = {
          name: a.COOKIE_TOK,
          value: t,
          path: a.PP_TOK,
          domain: a.COOKIE_DOMAIN,
          secure: !0
        };
        c.setCookie(r)
      },
      clearCookies: function() {
        c.setCookie({
          name: a.COOKIE_REF,
          expirationDate: 0,
          domain: a.COOKIE_DOMAIN,
          path: a.PP_REF
        }), c.setCookie({
          name: a.COOKIE_TOK,
          expirationDate: 0,
          domain: a.COOKIE_DOMAIN,
          path: a.PP_TOK
        })
      },
      clearDeprecatedKeys: function() {
        p.forEach(function(e) {
          s.permanentStorage.removeItem(e)
        })
      },
      getSecretBundle: function() {
        var e = this._get(a.KEY_SECRET_BUNDLE);
        return e ? _.object(_.map(e, function(e, t) {
          return [t, CryptoJS.enc.Base64.parse(e)]
        })) : (d.error("UserPrefs:Attempted to load non-existent secret bundle!", e)(), null)
      },
      setSecretBundle: function(e) {
        return this._set(a.KEY_SECRET_BUNDLE, _.object(_.map(e, function(e, t) {
          return [t, CryptoJS.enc.Base64.stringify(e)]
        })))
      },
      clearTokens: function() {
        l.forEach(function(e) {
          this._set(e)
        }, this)
      },
      getNUX: function(e) {
        return this._getUser(e)
      },
      setNUX: function(e, t) {
        return this._setUser(e, t)
      },
      getUnknownId: function() {
        var e = this._get(a.KEY_UNKNOWN_ID);
        return e || (e = "unknown" + Math.floor(1e10 * Math.random()), this.setUnknownId(e)), e
      },
      setUnknownId: function(e) {
        return this._set(a.KEY_UNKNOWN_ID, e)
      },
      getBrowserId: function() {
        return this._get(a.KEY_BROWSER_ID)
      },
      setBrowserId: function(e) {
        this._set(a.KEY_BROWSER_ID, e)
      },
      setLastEmojiTab: function(e) {
        return this._setUser(a.KEY_LAST_ACTIVE_EMOJI_TAB, e)
      },
      getLastEmojiTab: function() {
        return this._getUser(a.KEY_LAST_ACTIVE_EMOJI_TAB)
      },
      getCollection: function(e) {
        return this._getUser(e)
      },
      setCollection: function(e, t) {
        return this._setUser(e, t)
      },
      getGlobalSounds: function() {
        return !this._getUser(a.KEY_GLOBAL_MUTE_SOUNDS)
      },
      setGlobalSounds: function(e) {
        return this._setUser(a.KEY_GLOBAL_MUTE_SOUNDS, !e)
      },
      getGlobalNotifications: function() {
        return !this._getUser(a.KEY_GLOBAL_MUTE_NOTIFICATIONS)
      },
      setGlobalNotifications: function(e) {
        return this._setUser(a.KEY_GLOBAL_MUTE_NOTIFICATIONS, !e)
      },
      getGlobalPreviews: function() {
        return !this._getUser(a.KEY_GLOBAL_MUTE_PREVIEWS)
      },
      setGlobalPreviews: function(e) {
        return this._setUser(a.KEY_GLOBAL_MUTE_PREVIEWS, !e)
      },
      getGeocoderLocation: function() {
        return this._getUser(a.KEY_GEOCODER_LOCATION)
      },
      setGeocoderLocation: function(e) {
        this._setUser(a.KEY_GEOCODER_LOCATION, e)
      },
      getMapsOverQuota: function() {
        return this._get(a.KEY_GMAPS_OVER_LIMIT)
      },
      setMapsOverQuota: function(e) {
        return this._set(a.KEY_GMAPS_OVER_LIMIT, e)
      },
      getGroupParticipantAssignedColor: function(e) {
        return this._getUser(a.KEY_GROUP_ASSIGNED_COLOR + "-" + e)
      },
      setGroupParticipantAssignedColor: function(e, t) {
        this._setUser(a.KEY_GROUP_ASSIGNED_COLOR + "-" + e, t)
      },
      getMutex: function() {
        var e = this._getPS(a.KEY_WHATSAPP_MUTEX);
        return e
      },
      setMutex: function(e) {
        var t = e ? v + ":" + e : e;
        return this._setPS(a.KEY_WHATSAPP_MUTEX, t)
      },
      removeMutex: function() {
        return this._setPS(a.KEY_WHATSAPP_MUTEX)
      },
      parseMutex: function(e) {
        return e = e ? JSON.parse(e) : "", e ? e.toString().split(/:/).pop() : e
      },
      mutexFilter: y,
      localTakeoverSuccess: function() {
        var e = this.getRememberMe() ? {} : _.omit(this._getAllKeyValues(), f);
        e.wa_tab_src = v, this._setPS(a.KEY_LOCAL_TAKEOVER_OK, e), this._setPS(a.KEY_LOCAL_TAKEOVER_OK)
      },
      parseTakeover: function(e) {
        return e = e ? JSON.parse(e) : {}, _.isObject(e) ? (delete e.wa_tab_src, e) : {}
      },
      takeoverFilter: b,
      getLangPref: function() {
        return this._get(a.KEY_LANG)
      },
      setLangPref: function(e) {
        return this._set(a.KEY_LANG, e)
      },
      getLogoutToken: function() {
        return this._getPS(a.KEY_LOGOUT_TOKEN)
      },
      setLogoutToken: function(e) {
        return this._setPS(a.KEY_LOGOUT_TOKEN, e)
      },
      getOldLogoutCreds: function() {
        return this._getPS(a.KEY_OLD_LOGOUT_CREDS) || []
      },
      setOldLogoutCreds: function(e) {
        return this._setPS(a.KEY_OLD_LOGOUT_CREDS, e)
      },
      setLogCursor: function(e) {
        e %= a.LOG_SIZE, this._setPS(a.KEY_LOG_CURSOR, e)
      },
      _getLSVersion: function() {
        return this._getPS(a.KEY_WHATSAPP_LS_VERSION) || 0
      },
      _setLSVersion: function(e) {
        return this._setPS(a.KEY_WHATSAPP_LS_VERSION, e)
      },
      _version: function() {
        return g
      },
      compareVersion: function() {
        var e = this._getLSVersion();
        return g - e
      },
      _migrate: function(e) {
        if (e > 5) throw new Error("too many migrations");
        var t = this.compareVersion();
        if (0 !== t) {
          var r, n = this._getLSVersion();
          if (!(t > 0)) throw new Error("downgrades not supported");
          if (r = m["v" + n], !r) throw new Error("no migration for: " + n);
          d.log("userPrefs:migrate from: " + n + " towards: " + g)(), r.call(this), this._migrate(e + 1)
        }
      },
      maybeMigrate: function() {
        if (!_.isEmpty(localStorage) || !_.isEmpty(sessionStorage)) {
          var e = _.flatten([l, a.KEY_BROWSER_ID, a.KEY_LOG_CURSOR]),
            t = _.pick(localStorage, e);
          try {
            this._migrate(0)
          } catch (r) {
            d.error("userPrefs:error migrating")(r), this.clear(), this._setAllKeyValues(t), this._setLSVersion(g)
          }
        }
      },
      clearAllLocalState: function() {
        var e = this._getPreservedKeys();
        localStorage.clear(), this._setPreservedKeys(e), sessionStorage.clear(), this.clearCookies(), d.clearLogs()
      },
      setNoTakeover: function(e) {
        return this._setTS(a.KEY_NO_TAKEOVER, e)
      },
      getNoTakeover: function() {
        return this._getTS(a.KEY_NO_TAKEOVER)
      },
      getWamBuffer: function() {
        return this._get(a.KEY_WAM_BUFFER, void 0, !0)
      },
      setWamBuffer: function(e) {
        this._set(a.KEY_WAM_BUFFER, e, void 0, !0)
      },
      getWamInfo: function() {
        return this._get(a.KEY_WAM_INFO)
      },
      setWamInfo: function(e) {
        return this._set(a.KEY_WAM_INFO, e)
      },
      getWamOldBuffer: function() {
        return this._get(a.KEY_WAM_OLD_BUFFER)
      },
      setWamOldBuffer: function(e) {
        this._set(a.KEY_WAM_OLD_BUFFER, e)
      },
      clearWamBuffer_old: function() {
        this._set("WaWamBuffer", void 0)
      },
      clearWamStatus_old: function() {
        this._set("WAWamStatus", void 0)
      },
      clearWamLastRotate_old: function() {
        this._set("WAWamLastRotate", void 0)
      },
      clearWamDimensionCache_old: function() {
        this._set("WAWamDimensionCache", void 0)
      }
    };
  e.exports = w
}, function(e, t, r) {
  "use strict";
  var n = r(44),
    o = !1,
    i = _.debounce(function() {
      return o = !1
    }, 500);
  e.exports = {
    id: function a() {
      var e = r(15),
        a = e.getBrowserId();
      if (a) return a;
      var t = new Uint32Array(4);
      window.crypto.getRandomValues(t);
      var n = CryptoJS.lib.WordArray.create(t);
      return a = CryptoJS.enc.Base64.stringify(n), e.setBrowserId(a), a
    },
    info: function() {
      var e = n.parser.getResult();
      return {
        os: e.os.name + (e.os.version ? " " + e.os.version : ""),
        name: e.browser.name,
        ua: e.browser.name + " " + e.browser.version
      }
    },
    hardRefresh: function(e) {
      if (this.promptUnloadGuards++, e) {
        var t = r(15);
        t.setNoTakeover(!0)
      }
      location.reload(!0)
    },
    startDownloading: function() {
      o = !0, i()
    },
    clearDownloading: function() {
      o = !1
    },
    isDownloading: function() {
      return o
    },
    promptUnloadGuards: 0
  }
}, , , , , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e, t, r, n) {
    function o(e) {
      _.isFunction(t) ? this.message = t.apply(this, arguments) : arguments.length > 0 ? this.message = "" + e : t ? this.message = t : this.message = this.name;
      var r = this.message !== this.name ? this.name + ": " + this.message : this.name,
        o = new Error(r).stack;
      if (!o) try {
        throw new Error(r)
      } catch (i) {
        o = i.stack, o || (o = "Error: " + r + "\n    at (unspecified)")
      }
      this.stack = o, _.isFunction(n) && n.apply(this, _.rest(arguments))
    }
    return r = r || Error, o.prototype = (0, c["default"])(r.prototype), o.prototype.name = e, o
  }

  function i(e, t) {
    return _.reduce(e, function(e, r, n) {
      var i, a;
      return _.isString(n) ? (i = n, a = r) : i = r, e[i] = o(i, a, t), e
    }, {})
  }

  function a(e) {
    this.event = e;
    try {
      return (0, d["default"])(e)
    } catch (t) {
      return "" + e
    }
  }
  var s = r(27),
    d = n(s),
    u = r(87),
    c = n(u),
    l = o("WAPStatusCode"),
    f = o("401", null, l),
    h = o("404", null, l),
    p = o("500", null, l),
    g = o("WapDrop"),
    m = o("EphemeralDrop", null, g),
    v = o("EphemeralDrop", null, g),
    y = o("Server5xxDrop", null, g),
    b = o("ConventionViolationDrop", null, g),
    w = o("BrowserReplacedDrop", null, g),
    E = o("ShouldLoop"),
    S = o("GaveUpRetry"),
    N = o("GUMError"),
    T = i({
      NotSupportedError: "The operation is not supported.",
      PermissionDeniedError: "The user did not grant permission for the operation",
      ConstraintNotSatisfiedError: "One of the mandatory Constraints could not be satisfied.",
      OverconstrainedError: "Due to changes in the environment, one or more mandatory constraints can no longer be satisfied.",
      NotFoundError: "The object can not be found here.",
      AbortError: "The operation was aborted.",
      SourceUnavailableError: "The source of the MediaStream could not be accessed due to a hardware error (e.g. lock from another process)."
    }, N),
    $ = o("MediaFileError"),
    C = o("InvalidMediaFileType", null, $),
    k = o("MediaFileTooLarge", null, $),
    A = o("MediaEncryptionError", null, $),
    I = o("ImageError", "Image failed to load.", null, function(e) {
      this.src = e, this.target = {
        src: e
      }
    }),
    O = o("ContactBlocked", "Contact is blocked", null, function(e) {
      this.contact = e
    }),
    R = o("CapabilityError"),
    P = o("CapabilityUnsupported", null, R, function(e) {
      this.jidCapabilities = e
    }),
    M = o("CapabilityInvalid", null, R),
    L = o("CapabilityUnknown", null, R),
    D = o("MediaMissing", "Media is no longer available on your phone"),
    x = o("MediaLoadError", null, null, function(e) {
      this.src = e
    }),
    j = o("SocketError", a),
    U = o("SocketClosed", a),
    B = o("SocketNotOpen", function(e) {
      return "socket not open, is " + e
    }),
    F = o("BlockedByProxy");
  e.exports = {
    define: o,
    defineAll: i,
    QueryDrop: o("QueryDrop"),
    WapDrop: g,
    EphemeralDrop: m,
    LogoutDrop: v,
    Server5xxDrop: y,
    ConventionViolationDrop: b,
    BrowserReplacedDrop: w,
    ShouldLoop: E,
    GaveUpRetry: S,
    MediaFileError: $,
    InvalidMediaFileType: C,
    MediaFileTooLarge: k,
    MediaEncryptionError: A,
    WAPStatusCode: l,
    E401: f,
    E404: h,
    E500: p,
    SocketError: j,
    SocketClosed: U,
    SocketNotOpen: B,
    BlockedByProxy: F,
    ImageError: I,
    ContactBlocked: O,
    MediaMissing: D,
    MediaLoadError: x,
    CapabilityError: R,
    CapabilityUnsupported: P,
    CapabilityInvalid: M,
    CapabilityUnknown: L,
    ActionError: o("ActionError", "Could not perform action."),
    GUM: _.defaults(T, {
      GUMError: N,
      PERMISSION_DENIED: T.PermissionDeniedError,
      NOT_SUPPORTED_ERROR: T.ConstraintNotSatisfiedError,
      MANDATORY_UNSATISFIED_ERROR: T.NotFoundError
    })
  }
}, function(e, t, r) {
  "use strict";

  function n(e, t) {
    return _.isString(t) ? t.split("@")[1] === e : ("undefined" != typeof t && i.log("wid:isXWid called on nonstring: " + t)(), !1)
  }

  function o(e) {
    return _.isString(e) ? e.split("@")[0] : void 0
  }
  var i = r(1),
    a = r(390),
    s = ["c.us", "g.us", "broadcast"],
    d = _.memoize(function(e) {
      return "Server" === e ? e : a.format(e)
    });
  e.exports = {
    userToLegacy: function(e) {
      if (_.isString(e)) {
        var t = e.split("@");
        if (2 === t.length && "c.us" === t[1]) return t[0] + "@s.whatsapp.net"
      }
      return e
    },
    isUser: function(e) {
      return n("c.us", e)
    },
    isBroadcast: function(e) {
      return n("broadcast", e)
    },
    isGroup: function(e) {
      return n("g.us", e)
    },
    isWid: function(e) {
      return _.isString(e) ? _.contains(s, e.split("@")[1]) : !1
    },
    user: o,
    formattedUser: function(e) {
      if (e) {
        var t = o(e);
        if (t) return l10n.numAndPunc(d(t))
      }
      return ""
    }
  }
}, function(e, t, r) {
  var n = r(191)("wks"),
    o = r(193),
    i = r(31).Symbol;
  e.exports = function(e) {
    return n[e] || (n[e] = i && i[e] || (i || o)("Symbol." + e))
  }
}, , , , , , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    function e(e) {
      var s = p["default"].resolve([a++, e]).cancellable().spread(o).then(function() {
        return r.apply(void 0, arguments)
      });
      t = s["catch"].apply(s, i)["catch"](function() {
        return n.apply(void 0, arguments)
      })
    }
    var t, r, n, o = _.last(arguments),
      i = _.initial(arguments),
      a = 0;
    return i.push(e), p["default"].resolve().then(function() {
      return new p["default"](function(t, o) {
        r = t, n = o, e()
      }).cancellable()["catch"](function(e) {
        if (t && t.isPending()) return new p["default"](function(o, i) {
          r = o, n = i, t.cancel(e)
        });
        throw e
      })
    })
  }

  function i(e) {
    return new p["default"](function(t) {
      function r() {
        t(n.status && n.status < 12e3 ? n : null)
      }
      var n = new XMLHttpRequest;
      n.onload = r, n.onreadystatechange = function() {
        4 === n.readyState ? r() : 0 === n.readyState && t(null)
      }, n.onerror = t.bind(void 0, null), n.ontimeout = t.bind(void 0, null), n.open("GET", e, !0), n.send()
    })
  }

  function a(e, t) {
    return t["catch"](p["default"].CancellationError, _.noop)["catch"](function(t) {
      e.cancel(t)
    })
  }

  function s() {
    return u(window, "offline")
  }

  function d() {
    var e, t;
    return new p["default"](function(r) {
      function n() {
        t && t + 1500 < Date.now() ? r(!0) : (t = Date.now(), e = _.delay(n, 1e3))
      }
      n()
    }).cancellable()["finally"](function() {
      clearTimeout(e)
    })
  }

  function u(e, t, r) {
    var n;
    return new p["default"](function(o) {
      n = r ? function() {
        r.apply(this, arguments) && o.apply(this, arguments)
      } : o, e.addEventListener(t, n)
    }).cancellable()["finally"](function() {
      e.removeEventListener(t, n)
    })
  }

  function c(e, t, r) {
    var n;
    return new p["default"](function(o) {
      n = r ? function() {
        r.apply(this, arguments) && o(arguments)
      } : function() {
        o(arguments)
      }, e.on(t, n)
    }).cancellable()["finally"](function() {
      e.off(t, n)
    })
  }

  function l() {
    return v.isMainLoaded ? p["default"].resolve() : c(v, "main_loaded")
  }

  function f() {
    return new p["default"](function(e, t) {
      function r() {
        e(!1)
      }
      if (window.requestFileSystem) window.requestFileSystem(window.TEMPORARY, 1, r, function(t) {
        e("SecurityError" === t.name)
      });
      else if (window.indexedDB) {
        var n = window.indexedDB.open("pb_detect");
        n ? (n.onsuccess = r, n.onerror = function(t) {
          t.preventDefault(), e(!0)
        }) : r()
      } else r()
    }).then(function(e) {
      if (!window.localStorage) return !0;
      if (e) return e;
      try {
        return window.localStorage.setItem("INCOG", 0), window.localStorage.removeItem("INCOG"), !1
      } catch (t) {
        return "QuotaExceededError" === t.name ? !0 : p["default"].reject(t)
      }
    }).timeout(100, "detectIncognitoTimeout")["catch"](p["default"].TimeoutError, function() {
      return !1
    })["catch"](function(e) {
      return g.error("promiseUtil:determineIncognito failed check: " + e)(e), m.upload("incog-throw"), !1
    })
  }
  var h = r(3),
    p = n(h),
    g = r(1),
    m = r(10),
    v = r(8);
  e.exports = {
    loopOnError: o,
    attachWatcher: a,
    getResponseIfOnline: i,
    waitForOfflineNaive: s,
    waitForEvent: u,
    waitForBBEvent: c,
    determineIncognito: f,
    waitForSkip: d,
    waitForMain: l
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    this.initializeStorage(), this._dbName = "wawc", this._db = new d(this._dbName), this._db.version(1).stores({
      logs: "line,log"
    }), this._db.version(2).stores({
      logs: "line,log",
      assets: "key,hash,data"
    }), this._db.version(3).stores({
      logs: "line,log",
      assets: "key,hash,data",
      wam: ",buffer,prevValues,lastSend"
    }), this.openAttempt = 0, this.openDB(), this._dbState = h.OPENING, this.deleteLegacyDBs()
  }
  var i = r(3),
    a = n(i),
    s = r(7),
    d = r(463),
    u = r(1),
    c = r(44),
    l = r(45),
    f = "WA",
    h = {
      ERROR: "error",
      OPENING: "opening",
      BLOCKED: "blocked",
      OPEN: "open",
      CLOSED: "closed"
    };
  o.prototype.initializeStorage = function() {
    var e = window.localStorage,
      t = window.sessionStorage,
      r = {
        setItem: function(e, t) {
          this[e] = t
        },
        getItem: function(e, t) {
          return this[e]
        },
        removeItem: function(e) {
          delete this[e]
        },
        clear: function() {
          for (var e in this) this.hasOwnProperty(e) && "function" != typeof e && delete this[e]
        }
      };
    this.permanentStorage = this._hasLocalStorage() ? e : r, this.temporaryStorage = this._hasSessionStorage() ? t : r
  }, o.prototype._hasLocalStorage = function() {
    try {
      return localStorage.setItem(s.KEY_STORAGE_TEST, s.KEY_STORAGE_TEST), !0
    } catch (e) {
      return !1
    }
  }, o.prototype._hasSessionStorage = function() {
    try {
      return sessionStorage.setItem(s.KEY_STORAGE_TEST, s.KEY_STORAGE_TEST), !0
    } catch (e) {
      return !1
    }
  }, o.prototype.openDB = function() {
    var e = new l.WebcIdbOpen;
    this._openDB().then(function() {
      e.markWebcIdbOpenT(), e.webcIdbOpenSuccess = !0, e.commit()
    })["catch"](function() {
      e.markWebcIdbOpenT(), e.webcIdbOpenSuccess = !1, e.commit()
    })
  }, o.prototype._openDB = function() {
    var e = this;
    this._db.isOpen() && this._db.close();
    var t = a["default"].resolve(this._db.open()).bind(this).timeout(1e4).then(function() {
      return u.info("db: Successfully opened db")(), e._dbState = h.OPEN, h.OPEN
    })["catch"](a["default"].TimeoutError, function(t) {
      return u.info("db:openDB blocked"), e._dbState = h.BLOCKED, h.BLOCKED
    })["catch"](function(t) {
      return u.error("db:openDB:Error " + t)(), e.openAttempt > 1 || c.isSafari ? (e.opening = void 0, e._dbState = h.ERROR, a["default"].reject(h.ERROR)) : (e.openAttempt += 1, e._db["delete"]().then(function() {
        return e.openDB()
      }))
    }).then(function(t) {
      return e.opening = void 0, t === h.BLOCKED ? a["default"].reject(h.BLOCKED) : e._db
    });
    return this.opening || (this.opening = t), t
  }, o.prototype.idb = function() {
    return this._db.isOpen() ? a["default"].resolve(this._db) : this._db.hasFailed() ? a["default"].reject(h.FAILED) : this._dbState === h.BLOCKED ? a["default"].reject(h.BLOCKED) : this.opening ? this.opening : a["default"].reject(h.CLOSED)
  }, o.prototype.deleteLegacyDBs = function() {
    return d.getDatabaseNames().then(function(e) {
      e.forEach(function(e) {
        e === f && (localStorage.setItem(s.KEY_LOG_CURSOR, 0), d["delete"](e))
      })
    })
  }, o.prototype.State = h, e.exports = new o
}, function(e, t) {
  var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = r)
}, , , , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    return function(t) {
      return "number" == typeof t.status && t.status >= 500 ? t : void e(t)
    }
  }

  function i(e) {
    return CryptoJS.lib.WordArray.create(new Uint8Array(e))
  }
  var a, s = r(3),
    d = n(s),
    u = r(1),
    c = r(10),
    l = r(55),
    f = r(13),
    h = r(172),
    p = r(366),
    g = r(180),
    _ = r(16),
    m = r(22),
    v = r(183),
    y = r(184),
    b = r(185),
    w = r(186),
    E = r(410),
    S = {
      setVersion: function(e, t) {
        var r = e[0],
          n = e[1];
        switch (u.log("wap:setVersion " + [r, n, t].join("."))(), r) {
          case 0:
            switch (n) {
              case 2:
                v.setSubProtocol(1), a = v;
                break;
              case 3:
                v.setSubProtocol(n), a = v;
                break;
              case 4:
                y.setSubProtocol(n), a = y;
                break;
              case 5:
              case 6:
                b.setSubProtocol(n), a = b;
                break;
              case 7:
                w.setSubProtocol(t), a = w;
                break;
              case 8:
                E.setSubProtocol(t), a = E
            }
        }
        a || (u.error("wap:setVersion unknown version. attempting to update")(), c.upload("wap_unknown_version", !0)["finally"](function() {
          return _.hardRefresh()
        }))
      },
      "delete": function() {
        return a ? a["delete"].apply(a, arguments) : void 0
      },
      error2412: function() {
        return a.error2412.apply(a, arguments)
      },
      setSharedSecret: function(e) {
        u.log("Wap:saveSharedSecret start")();
        var t = h.decode(e, !0),
          r = t.slice(0, 32),
          n = h.encode(t.slice(32, 64)),
          o = t.slice(64),
          a = i(r.concat(o)),
          s = l.get().keyPair.privKey,
          d = g.sharedSecret(r, s),
          c = p.extractAndExpand(d, void 0, "", 80, !0),
          f = i(c.slice(0, 32)),
          _ = i(c.slice(32, 64)),
          m = i(c.slice(64, 80)),
          v = CryptoJS.HmacSHA256(a, _),
          y = v.toString(CryptoJS.enc.Base64);
        if (n !== y) return void u.error("Wap:saveSharedSecret hmac mismatch " + n + " " + y)();
        var b = CryptoJS.AES.decrypt({
            ciphertext: i(o),
            salt: void 0
          }, f, {
            iv: m,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }),
          w = h.decode(b.toString(CryptoJS.enc.Base64), !0),
          E = i(w.slice(0, 32)),
          S = i(w.slice(32, 64));
        l.setSecretKeys("0.1", E, S), u.log("Wap:saveSharedSecret done")()
      },
      dispatch: function(e, t, r) {
        var n = a[e];
        return "function" != typeof n ? r ? d["default"].resolve(r) : d["default"].reject("wap:" + e + ":unsupported") : n.apply(a, t)
      },
      handle: function() {
        return a.handle.apply(a, arguments)
      },
      queryServerProps: function() {
        return new d["default"](function(e, t) {
          f.sendEphemeral({
            data: ["query", "props"],
            onSend: e,
            onDrop: t
          })
        })
      },
      resyncPictures: function(e) {
        return new d["default"](function(t, r) {
          f.sendEphemeral({
            data: ["query", "resumePic", e],
            onSend: o(t),
            onDrop: r
          })
        })
      },
      setRememberMe: function(e) {
        return f.sendBasic({
          data: ["admin", "remember", !!e]
        })
      },
      requestMediaUpload: function(e, t, r) {
        return new d["default"](function(n, i) {
          var a = function(e) {
            switch (e.status) {
              case 200:
                n({
                  result: "ok",
                  data: e.url,
                  size: r
                });
                break;
              case 299:
                n({
                  result: "duplicate",
                  data: e.params,
                  size: r
                });
                break;
              default:
                i({
                  size: r
                })
            }
          };
          f.send({
            data: ["action", "upload", e, t, r.toString()],
            onSend: o(a),
            onDrop: i
          })
        })
      },
      requestEncryptedMediaUpload: function(e, t) {
        return new d["default"](function(r, n) {
          var i = function(e) {
            switch (e.status) {
              case 200:
                r({
                  result: "ok",
                  data: e.url
                });
                break;
              default:
                n()
            }
          };
          f.send({
            data: ["action", "encr_upload", e, t],
            onSend: o(i),
            onDrop: n
          })
        })
      },
      contactFindBroadcast: function(e) {
        return new d["default"](function(t, r) {
          f.send({
            data: ["query", "contact", e],
            onSend: o(t),
            onDrop: r
          })
        })
      },
      commonGroupsFind: function(e) {
        return new d["default"](function(t, r) {
          f.send({
            data: ["query", "group", "common", e],
            onSend: t,
            onDrop: r
          })
        })
      },
      getCapabilities: function(e) {
        return new d["default"](function(t, r) {
          f.send({
            data: ["query", "caps", e.filter(m.isUser)],
            onSend: o(t),
            onDrop: r
          })
        })
      },
      groupMetadataFind: function(e) {
        return new d["default"](function(t, r) {
          f.sendEphemeral({
            data: ["query", "GroupMetadata", e],
            onSend: o(t),
            onDrop: r
          })
        })
      },
      groupMetadataFindFromPhone: function(e) {
        return a.groupMetadataFindFromPhone.apply(a, arguments)
      },
      lastseenFind: function(e) {
        return new d["default"](function(t, r) {
          f.sendEphemeral({
            data: ["query", "Presence", "lastseen", e],
            onSend: o(t),
            onDrop: r
          })
        })
      },
      profilePicFind: function(e, t) {
        return "ProfilePicThumb" === e ? new d["default"](function(r, n) {
          f.sendEphemeral({
            data: ["query", e, t],
            onSend: o(r),
            onDrop: n
          })
        }) : void 0
      },
      profilePicFindThumbFromPhone: function(e, t) {
        return a.profilePicFindThumbFromPhone.apply(a, arguments)
      },
      statusFind: function(e) {
        return new d["default"](function(t, r) {
          f.sendEphemeral({
            data: ["query", "Status", e],
            onSend: o(t),
            onDrop: r
          })
        })
      },
      sendPing: function(e) {
        return new d["default"](function(e, t) {
          f.send({
            data: ["admin", "test"],
            onSend: o(e),
            onDrop: t
          })
        })
      },
      requestDeviceUploadLogs: function() {
        return this.dispatch("requestDeviceUploadLogs", arguments)
      },
      resyncMessages: function() {
        return this.dispatch("resyncMessages", arguments)
      },
      resyncReceipts: function() {
        return this.dispatch("resyncReceipts", arguments)
      },
      queryReceivedActions: function() {
        return this.dispatch("queryReceivedActions", arguments, [])
      },
      addParticipant: function() {
        return this.dispatch("addParticipant", arguments)
      },
      changeSubject: function() {
        return this.dispatch("changeSubject", arguments)
      },
      createGroup: function() {
        return this.dispatch("createGroup", arguments)
      },
      leaveGroup: function() {
        return this.dispatch("leaveGroup", arguments)
      },
      removeParticipant: function() {
        return this.dispatch("removeParticipant", arguments)
      },
      promoteParticipant: function() {
        return this.dispatch("promoteParticipant", arguments)
      },
      requestMediaReupload: function() {
        return this.dispatch("requestMediaReupload", arguments)
      },
      sendMedia: function() {
        return this.dispatch("sendMedia", arguments)
      },
      sendConversationSeen: function() {
        return this.dispatch("sendConversationSeen", arguments)
      },
      sendConversationUnseen: function() {
        return this.dispatch("sendConversationUnseen", arguments)
      },
      sendConversationClear: function() {
        return this.dispatch("sendConversationClear", arguments)
      },
      sendConversationDelete: function() {
        return this.dispatch("sendConversationDelete", arguments)
      },
      sendConversationArchive: function() {
        return this.dispatch("sendConversationArchive", arguments)
      },
      sendConversationMute: function() {
        return this.dispatch("sendConversationMute", arguments)
      },
      sendConversationNotSpam: function() {
        return this.dispatch("sendConversationNotSpam", arguments)
      },
      sendMessagePlayed: function() {
        return this.dispatch("sendMessagePlayed", arguments)
      },
      sendMessageDelete: function() {
        return this.dispatch("sendMessageDelete", arguments)
      },
      sendMessageStarred: function() {
        return this.dispatch("sendMessageStarred", arguments)
      },
      sendUnstarAll: function() {
        return this.dispatch("sendUnstarAll", arguments)
      },
      sendPresenceAvailable: function() {
        return this.dispatch("sendPresenceUpdate", ["available"])
      },
      sendPresenceUnavailable: function() {
        return this.dispatch("sendPresenceUpdate", ["unavailable"])
      },
      sendChatstateComposing: function(e) {
        return this.dispatch("sendChatstateUpdate", ["composing", e])
      },
      sendChatstatePaused: function(e) {
        return this.dispatch("sendChatstateUpdate", ["paused", e])
      },
      sendChatstateRecording: function(e) {
        return this.dispatch("sendChatstateUpdate", ["recording", e])
      },
      sendSetPicture: function() {
        return this.dispatch("sendSetPicture", arguments)
      },
      deletePicture: function() {
        return this.dispatch("deletePicture", arguments)
      },
      sendSetStatus: function() {
        return this.dispatch("sendSetStatus", arguments)
      },
      sendSetBlock: function() {
        return this.dispatch("sendSetBlock", arguments)
      },
      sendSpamReport: function() {
        return this.dispatch("sendSpamReport", arguments)
      },
      chatFindQuery: function() {
        return this.dispatch("chatFindQuery", arguments)
      },
      contactFindQuery: function() {
        return this.dispatch("contactFindQuery", arguments)
      },
      msgCreateRecord: function() {
        return this.dispatch("msgCreateRecord", arguments)
      },
      msgFindQuery: function() {
        return this.dispatch("msgFindQuery", arguments)
      },
      queryMsgInfo: function() {
        return this.dispatch("queryMsgInfo", arguments)
      },
      presenceSubscribe: function() {
        return this.dispatch("presenceSubscribe", arguments)
      },
      recentEmojiQuery: function() {
        return this.dispatch("recentEmojiQuery", arguments)
      },
      logoutToken: function() {
        var e = l.get().encKey.toString(CryptoJS.enc.Base64),
          t = l.get().macKey.toString(CryptoJS.enc.Base64),
          r = CryptoJS.enc.Base64.parse(e),
          n = CryptoJS.enc.Base64.parse(t);
        return CryptoJS.HmacSHA256(r, n).toString(CryptoJS.enc.Base64)
      }
    };
  e.exports = S
}, , , , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    this._parent = null, this._subs = [], this._catchTypes = null, this._onResolve = null, this._onReject = null, this.type = h.ROOT, this.state = p.PENDING, this.value = void 0, this._forceable = !1, this._cancellable = !1;
    var e, t;
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        e = arguments[0];
        break;
      case 2:
        t = arguments[0], e = arguments[1];
        break;
      default:
        throw new Error("TightPromise constructor with " + arguments.length + " arguments")
    }
    if (this.context = t, arguments.length > 0) try {
      e.call(t, i.bind(this), a.bind(this))
    } catch (r) {
      a.call(this, r)
    }
  }

  function i(e) {
    this.state === p.PENDING && (s(e) ? e.then(i.bind(this), a.bind(this)) : (this.value = e, this.state = p.FULFILLED, this._notifySubs()))
  }

  function a(e) {
    this.state === p.PENDING && (this.value = e, this.state = p.REJECTED, this._notifySubs())
  }

  function s(e) {
    return ("object" === ("undefined" == typeof e ? "undefined" : (0, c["default"])(e)) || "function" == typeof e) && "function" == typeof e.then
  }

  function d(e) {
    setTimeout(function(e) {
      throw e
    }, 0, e)
  }
  var u = r(36),
    c = n(u),
    l = r(3),
    f = n(l),
    h = {
      ROOT: 1,
      THENABLE: 2,
      FINALLY: 3,
      META: 4
    },
    p = {
      PENDING: 1,
      FULFILLED: 2,
      REJECTED: 3
    };
  o.STATE = p, o.TYPE = h, o.prototype = {
    isPending: function() {
      return this.state === p.PENDING
    },
    then: function(e, t) {
      if (!e && !t) return this;
      var r = new o;
      return r.type = h.THENABLE, r._onResolve = e || null, r._onReject = t || null, this._addChild(r), r
    },
    "catch": function() {
      var e = new o;
      return e.type = h.THENABLE, e._onReject = arguments[arguments.length - 1], arguments.length > 1 && (e._catchTypes = Array.prototype.slice.call(arguments, 0, arguments.length - 1), e._catchTypes.forEach(function(e) {
        if ("function" != typeof e) throw new Error("expected type, got " + e)
      })), this._addChild(e), e
    },
    "finally": function(e) {
      var t = new o;
      return t.type = h.FINALLY, t._onResolve = e, this._addChild(t), t
    },
    bind: function(e) {
      var t = new o;
      return t.type = h.META, this._addChild(t), t.context = e, t
    },
    spread: function(e) {
      return this.then(function(t) {
        e.apply(this, t)
      })
    },
    get: function(e) {
      return this.then(function(t) {
        return t[e]
      })
    },
    forceable: function() {
      var e = new o;
      return e.context = this.context, e.type = h.META, this._addChild(e), e._forceable = !0, e
    },
    cancellable: function() {
      var e = new o;
      return e.context = this.context, e.type = h.META, this._addChild(e), e._cancellable = !0, e
    },
    force: function(e) {
      if (this._forceable) {
        for (var t = this; t.type === h.META;) {
          var r = t._parent;
          if (!r || !r._forceable || r.state !== p.PENDING) break;
          t = r
        }
        i.call(this, e)
      }
    },
    cancel: function(e) {
      if (this._cancellable) {
        e = e || new f["default"].CancellationError;
        var t = this,
          r = !1;
        do {
          var n = t._parent;
          n && n._cancellable && n.state === p.PENDING ? t = n : r = !0
        } while (!r);
        a.call(t, e)
      }
    },
    timeout: function(e, t) {
      var r = new o;
      return r.type = h.META, this._addChild(r), r.state === p.PENDING && setTimeout(a.bind(r, new f["default"].TimeoutError(t)), e), r
    },
    loosen: function() {
      return f["default"].resolve(this)
    },
    _run: function(e, t) {
      var r;
      try {
        r = e.call(this.context, t)
      } catch (n) {
        return void a.call(this, n)
      }
      i.call(this, r)
    },
    _handle: function() {
      if (this.state === p.PENDING) {
        var e = this._parent;
        switch (this.type) {
          case h.THENABLE:
            if (e.state === p.FULFILLED) {
              var t = this._onResolve;
              t ? this._run(t, e.value) : i.call(this, e.value)
            } else if (this._onReject) {
              var r = this._catchTypes,
                n = r ? r.length : 0,
                o = e.value;
              if (0 === n) return void this._run(this._onReject, o);
              for (var s = 0; n > s; s++)
                if (o instanceof r[s]) return void this._run(this._onReject, o);
              a.call(this, o)
            } else a.call(this, e.value);
            return;
          case h.FINALLY:
            try {
              this._onResolve.call(this.context)
            } catch (u) {
              d(u)
            }
          default:
            e.state === p.FULFILLED ? i.call(this, e.value) : a.call(this, e.value)
        }
      }
    },
    _addChild: function(e) {
      e._parent = this, e.context = this.context, e._cancellable = this._cancellable, e.type === h.META && (e._forceable = this._forceable), this.state === p.PENDING ? this._subs.push(e) : e._handle()
    },
    _notifySubs: function() {
      this._subs.forEach(function(e) {
        e._handle()
      })
    }
  }, o.delay = function() {
    var e, t;
    switch (arguments.length) {
      case 0:
        e = 0;
        break;
      case 1:
        e = arguments[0];
        break;
      default:
        e = arguments[1], t = arguments[0]
    }
    return new o(function(r) {
      setTimeout(r.bind(null, t), e)
    })
  }, o.resolve = function(e) {
    var t = new o;
    return i.call(t, e), t
  }, o.reject = function(e) {
    var t = new o;
    return a.call(t, e), t
  }, e.exports = o
}, , , , , function(e, t, r) {
  "use strict";

  function n(e, t) {
    var r, n, o, i = /(\.0)+[^\.]*$/;
    for (e = (e + "").replace(i, "").split("."), t = (t + "").replace(i, "").split("."), o = Math.min(e.length, t.length), r = 0; o > r; r++)
      if (n = parseInt(e[r], 10) - parseInt(t[r], 10), 0 !== n) return n;
    return e.length - t.length
  }

  function o(e, t) {
    return n(e, t) >= 0
  }
  var i, a = r(627),
    s = window.navigator.userAgent;
  i = new a, i.setUA(s);
  var d = (i.getBrowser().name || "").toUpperCase(),
    u = i.getBrowser().version || "0.0.0",
    c = (i.getEngine().name || "").toUpperCase(),
    l = (i.getOS().name || "").toUpperCase(),
    f = i.getOS().version || "0.0.0",
    h = !c || "WEBKIT" === c,
    p = "SAFARI" === d,
    g = "CHROME" === d,
    _ = "TRIDENT" === c || "EDGEHTML" === c,
    m = "GECKO" === c,
    v = !1;
  switch (l) {
    case "MAC OS":
      g ? v = o(f, "10.10") && o(u, "41.0.0") : o(f, "10.7") && (v = !0);
      break;
    case "WINDOWS":
      o(f, "8.1") && (m ? v = !0 : g && o(u, "41.0.0") && (v = !0))
  }
  e.exports = {
    isWebkit: h,
    isGecko: m,
    isTrident: _,
    isSafari: p,
    hasEmoji: v,
    os: l.toLowerCase(),
    browser: d.toLowerCase(),
    parser: i
  }, window.notMSEdge = function() {
    e.exports.isTrident = !1
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    return "number" == typeof e && e === Math.floor(e)
  }

  function i(e, t, r) {
    var n = this;
    this.name = e, this.id = t, this.type = r, _.isObject(r) ? ! function() {
      var e = _.invert(r);
      n.validator = function(t) {
        return t in e
      }
    }() : r === b || r === S ? this.validator = o : this.validator = r
  }

  function a(e, t, r) {
    return N[e] ? N[e] : N[e] = new i(e, t, r)
  }

  function s(e, t, r) {
    var n = {
        id: t
      },
      o = {};
    for (var i in r) {
      var s = r[i];
      s[1] === S && (n["mark" + _.capitalize(i)] = c(i));
      var d = a(i, s[0], s[1]);
      o[i] = d.validator
    }
    var u = m.define(e, o, l);
    _.extend(u.prototype, n), T[e] = u
  }

  function d(e) {
    for (var t in e) {
      var r = e[t];
      s(t, r[0], r[1])
    }
  }

  function u(e) {
    var t = {},
      r = function(r) {
        var n = e[r],
          o = a(r, n[0], n[1]);
        t[r] = {
          type: o.validator,
          allowNull: !0,
          set: function(e) {
            this.commitOnSet && v.set(o, e)
          }
        }
      };
    for (var n in e) r(n);
    var o = m.define("Global", t, f);
    h = new o
  }

  function c(e) {
    return function() {
      this[e] = Date.now() - this.eventTime
    }
  }

  function l() {
    this.eventTime = Date.now(), this.commitTime = void 0
  }

  function f() {
    this.commitOnSet = !0
  }
  var h, p = r(87),
    g = n(p),
    m = r(411),
    v = r(182),
    y = "boolean",
    b = "integer",
    w = "number",
    E = "string",
    S = "timer",
    N = {},
    T = {};
  l.prototype = _.extend((0, g["default"])(m.prototype), {
    commit: function() {
      v.commit(this)
    },
    setTime: function(e) {
      this.eventTime = e || Date.now()
    }
  });
  var $ = {
      IPHONE: 1,
      ANDROID: 2,
      BB: 3,
      BBX: 7,
      S40: 4,
      SYMBIAN: 5,
      WP: 6,
      WEBCLIENT: 8,
      OSMETA: 11,
      TEST: 9,
      UNKNOWN: 10
    },
    C = {
      UNCACHED: 0,
      IDLE: 1,
      CHECKING: 2,
      DOWNLOADING: 3,
      UPDATEREADY: 4,
      OBSOLETE: 5
    },
    k = {
      PROD: 0,
      INTERN: 1,
      DEV: 2
    },
    A = {
      NAVIGATE_NEXT: 0,
      RELOAD: 1,
      BACK_FORWARD: 2,
      UNDEFINED: 255
    },
    I = {
      OFFLINE: 0,
      OPENING: 1,
      PAIRING: 2,
      SYNCING: 3,
      RESUMING: 4,
      CONNECTING: 5,
      NORMAL: 6,
      TIMEOUT: 7
    },
    O = {
      QR: 0,
      MAIN: 1,
      SYNCING: 2,
      OFFLINE: 3,
      CONFLICT: 4,
      PROXYBLOCK: 5
    };
  f.prototype = (0, g["default"])(m.prototype), u({
    appIsBetaRelease: [21, y],
    appVersion: [17, E],
    browser: [779, E],
    browserVersion: [295, E],
    deviceName: [13, E],
    mcc: [5, b],
    mnc: [3, b],
    platform: [11, $],
    webcEnv: [633, k],
    webcPhoneCharging: [783, y],
    webcPhoneDeviceManufacturer: [829, E],
    webcPhoneDeviceModel: [831, E],
    webcPhoneOsBuildNumber: [833, E],
    webcPhoneOsVersion: [835, E],
    webcPhonePlatform: [707, $]
  }), d({
    WebcAvailableChange: [772, {
      webcAvailable: [645, y],
      webcAvailableDuration: [776, S]
    }],
    WebcChatOpen: [864, {
      webcUnreadCount: [866, w],
      webcChatOpenT: [868, S]
    }],
    WebcIdbOpen: [874, {
      webcIdbOpenT: [876, S],
      webcIdbOpenSuccess: [781, y]
    }],
    WebcManualWebsocketAttempt: [896, {
      webcManualWebsocketAttemptSuccessful: [811, y]
    }],
    WebcMediaAnalyzed: [912, {
      webcMediaSupported: [863, y],
      webcMediaExtensions: [865, E],
      webcMediaAnalyzeT: [914, S]
    }],
    WebcNotificationSet: [830, {
      webcNotificationOn: [709, y]
    }],
    WebcPageLoad: [642, {
      webcUnloadEventStart: [648, S],
      webcUnloadEventEnd: [650, S],
      webcRedirectStart: [652, S],
      webcRedirectEnd: [654, S],
      webcFetchStart: [656, S],
      webcDomainLookupStart: [658, S],
      webcDomainLookupEnd: [660, S],
      webcConnectStart: [662, S],
      webcConnectEnd: [664, S],
      webcSecureConnectionStart: [666, S],
      webcRequestStart: [668, S],
      webcResponseStart: [670, S],
      webcResponseEnd: [672, S],
      webcDomLoading: [674, S],
      webcDomInteractive: [676, S],
      webcDomContentLoadedEventStart: [678, S],
      webcDomContentLoadedEventEnd: [680, S],
      webcDomComplete: [682, S],
      webcLoadEventStart: [684, S],
      webcLoadEventEnd: [686, S],
      webcExeStart: [760, S],
      webcExeDone: [756, S],
      webcWsOpening: [704, S],
      webcWsPairing: [706, S],
      webcWsSyncing: [708, S],
      webcWsNormal: [710, S],
      webcWsAttempts: [712, w],
      webcAppcacheStatus: [629, C],
      webcCached: [565, y],
      webcQrCode: [601, y],
      webcNavigation: [591, A],
      webcRedirectCount: [700, w],
      webcPageLoadT: [644, S]
    }],
    WebcPageResume: [884, {
      webcResumeCount: [785, b]
    }],
    WebcPhoneDisconnected: [878, {
      webcPhoneDisconnectedT: [880, S],
      webcPhoneBbarShownT: [882, S]
    }],
    WebcResourceLoad: [688, {
      webcResourceName: [567, E],
      webcResourceDuration: [690, S],
      webcResourceCached: [569, y]
    }],
    WebcStreamInfoChange: [768, {
      webcStreamInfo: [641, I],
      webcStreamInfoDuration: [774, S]
    }],
    WebcStreamModeChange: [770, {
      webcStreamMode: [643, O]
    }],
    WebcWamUpload: [916, {
      webcTotalT: [918, S],
      webcAvailableTp: [920, w],
      webcAvailableBbarTp: [922, w],
      webcAvailableNormalTp: [924, w],
      webcUnavailableTp: [926, w],
      webcUnavailableBbarTp: [928, w],
      webcUnavailableNormalTp: [930, w]
    }],
    WebcWsOpen: [740, {
      webcWsOpenT: [738, S]
    }],
    WebcWsTimeout: [742, {
      webcWsTimeoutT: [744, S]
    }]
  }), e.exports = _.defaults({}, T, {
    METRICS: N,
    Global: h,
    WamEvent: l,
    PLATFORM_TYPE: $,
    WEBC_APPCACHE_STATUS_CODE: C,
    WEBC_ENV_CODE: k,
    WEBC_NAVIGATION_TYPE: A,
    WEBC_STREAM_INFO_CODE: I,
    WEBC_STREAM_MODE_CODE: O
  })
}, function(e, t, r) {
  var n = r(31),
    o = r(19),
    i = r(65),
    a = "prototype",
    s = function(e, t, r) {
      var d, u, c, l = e & s.F,
        f = e & s.G,
        h = e & s.S,
        p = e & s.P,
        g = e & s.B,
        _ = e & s.W,
        m = f ? o : o[t] || (o[t] = {}),
        v = f ? n : h ? n[t] : (n[t] || {})[a];
      f && (r = t);
      for (d in r) u = !l && v && d in v, u && d in m || (c = u ? v[d] : r[d], m[d] = f && "function" != typeof v[d] ? r[d] : g && u ? i(c, n) : _ && v[d] == c ? function(e) {
        var t = function(t) {
          return this instanceof e ? new e(t) : e(t)
        };
        return t[a] = e[a], t
      }(c) : p && "function" == typeof c ? i(Function.call, c) : c, p && ((m[a] || (m[a] = {}))[d] = c))
    };
  s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, e.exports = s
}, , function(e, t, r) {
  var n = r(90);
  e.exports = function(e) {
    if (!n(e)) throw TypeError(e + " is not an object!");
    return e
  }
}, , function(e, t, r) {
  "use strict";
  var n = r(1),
    o = r(55),
    i = r(9),
    a = {
      getKeys: function() {
        var e = o.get().encKey.toString(CryptoJS.enc.Base64),
          t = o.get().macKey.toString(CryptoJS.enc.Base64);
        return {
          enc: CryptoJS.enc.Base64.parse(e),
          mac: CryptoJS.enc.Base64.parse(t)
        }
      },
      encrypt: function(e) {
        var t = CryptoJS.lib.WordArray.create(e),
          r = new Uint32Array(4),
          n = this.getKeys();
        window.crypto.getRandomValues(r);
        var o = CryptoJS.AES.encrypt(t, n.enc, {
            iv: CryptoJS.lib.WordArray.create(r),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }),
          a = o.iv.concat(o.ciphertext),
          s = CryptoJS.HmacSHA256(a, n.mac),
          d = s.concat(a);
        return i.fromBase64(d.toString(CryptoJS.enc.Base64)).toBuffer()
      },
      decrypt: function(e) {
        var t = i.wrap(e),
          r = t.slice(t.offset, t.offset + 32).toBase64(),
          o = t.slice(t.offset + 32).toBuffer(),
          a = this.getKeys(),
          s = CryptoJS.lib.WordArray.create(o),
          d = CryptoJS.HmacSHA256(s, a.mac).toString(CryptoJS.enc.Base64);
        if (r !== d) throw n.error("bp:03:decrypt hmac dont match " + r + " " + d)(), new Error("hmac mismatch");
        var u = t.slice(t.offset + 32, t.offset + 48).toBuffer(),
          c = t.slice(t.offset + 48).toBuffer(),
          l = CryptoJS.AES.decrypt({
            ciphertext: CryptoJS.lib.WordArray.create(c),
            salt: void 0
          }, a.enc, {
            iv: CryptoJS.lib.WordArray.create(u),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });
        return i.fromBase64(l.toString(CryptoJS.enc.Base64)).toBuffer()
      }
    };
  e.exports = a
}, function(e, t, r) {
  "use strict";

  function n(e) {
    var t = !1,
      r = o.wrap(e, void 0, t);
    this.readByte = function() {
      return r.readUint8()
    }, this.readInt16 = function() {
      return r.readUint16()
    }, this.readInt20 = function() {
      var e = 15 & r.readUint8(),
        t = r.readUint8(),
        n = r.readUint8();
      return (e << 16) + (t << 8) + n
    }, this.readInt32 = function() {
      return r.readUint32()
    }, this.readString = function(e) {
      return r.readString(e, o.METRICS_BYTES)
    }, this.readBytes = function(e) {
      var t = r.copy(r.offset, r.offset + e);
      return r.offset += e, t
    }, this.debugInfo = function() {
      return "offset: " + r.offset + " byte: " + r.readUint8(r.offset)
    }
  }
  var o = r(9);
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e, t) {
    if (!e) return "undefined";
    var r = o(e[1], t),
      n = i(e[2], t);
    return "<" + e[0] + r + (n ? ">\n" + n + "\n</" + e[0] + ">" : "/>")
  }

  function o(e, t) {
    if (e) {
      var r = "";
      for (var n in e) {
        var o = "string" == typeof e[n] ? t ? "..." : '"' + e[n] + '"' : e[n];
        r += " " + n + "=" + o
      }
      return r
    }
    return ""
  }

  function i(e, t) {
    return a.isByteBuffer(e) ? "<<bin:" + e.limit + ">>" : "string" == typeof e ? t ? "<<string:" + e.length + ">>" : e : _.isArray(e) ? e.map(_.partial(n, _, t)).join("\n") : void 0
  }
  var a = r(9),
    s = {
      tag: function(e) {
        return e && e[0]
      },
      attr: function(e, t) {
        return t && t[1] ? t[1][e] : void 0
      },
      attrs: function(e) {
        return e[1]
      },
      child: function d(e, t) {
        var r = t[2];
        if (_.isArray(r))
          for (var n = r.length, o = 0; n > o; o++) {
            var d = r[o];
            if (_.isArray(d) && d[0] === e) return d
          }
      },
      children: function(e) {
        return e && e[2]
      },
      dataStr: function(e) {
        if (!e) return "";
        var t = e[2];
        return "string" == typeof t ? t : a.isByteBuffer(t) ? t.readString(t.limit, a.METRICS_BYTES, 0).string : void 0
      },
      toString: n
    };
  e.exports = s
}, function(e, t, r) {
  "use strict";

  function n() {
    function e(e) {
      r++, n.push(e)
    }
    var t = !1,
      r = 0,
      n = [];
    this.pushInt16 = function(t) {
      if ("number" != typeof t) throw new Error("invalid int16");
      e((65280 & t) >> 8), e((255 & t) >> 0)
    }, this.pushInt20 = function(t) {
      if ("number" != typeof t) throw new Error("invalid int20");
      e((983040 & t) >> 16), e((65280 & t) >> 8), e((255 & t) >> 0)
    }, this.pushInt32 = function(t) {
      if ("number" != typeof t) throw new Error("invalid int32");
      e((4278190080 & t) >> 24), e((16711680 & t) >> 16), e((65280 & t) >> 8), e((255 & t) >> 0)
    }, this.pushByte = function(t) {
      if ("number" != typeof t || 0 > t || t > 255) throw new Error("invalid byte value: " + t);
      e(t)
    }, this.pushBytes = function(e) {
      if (!o.isByteBuffer(e)) throw new Error("invalid byte buffer");
      r += e.limit, n.push(e)
    }, this.pushUint8Array = function(e) {
      if ("[object Uint8Array]" !== Object.prototype.toString.call(e)) throw new Error("invalid Uint8Array");
      r += e.length;
      for (var t = 0; t < e.length; t++) n.push(e[t])
    }, this.pushString = function(e) {
      if ("string" != typeof e) throw new Error("invalid string");
      r += o.calculateUTF8Bytes(e), n.push(e)
    }, this.toBuffer = function() {
      for (var e = new o(r, t), i = n.length, a = 0; i > a; a++) {
        var s = n[a];
        "string" == typeof s ? e.writeString(s) : o.isByteBuffer(s) ? (s.reset(), e.append(s)) : e.writeByte(s)
      }
      return e.reset(), e.toBuffer(!0)
    }
  }
  var o = r(9);
  e.exports = n
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = n.createClass({
      displayName: "ErrorDialog",
      propTypes: {
        title: n.PropTypes.node,
        body: n.PropTypes.node.isRequired,
        tip: n.PropTypes.node,
        cancelLabel: n.PropTypes.node,
        onCancel: n.PropTypes.func,
        defaultLabel: n.PropTypes.node,
        onDefault: n.PropTypes.func
      },
      render: function() {
        var e = this.props.tip ? n.createElement("div", {
            className: "popup-contents"
          }, this.props.body, n.createElement("hr", null), n.createElement("div", {
            className: "text text-tip"
          }, this.props.tip)) : n.createElement("div", {
            className: "popup-contents"
          }, this.props.body),
          t = this.props.title ? n.createElement("div", {
            className: "popup-title",
            dir: "auto"
          }, this.props.title) : null,
          r = [];
        return this.props.onCancel && this.props.cancelLabel && r.push(n.createElement("button", {
          className: "btn-plain popup-controls-item",
          onClick: this.props.onCancel,
          key: "secondary"
        }, this.props.cancelLabel)), this.props.onDefault && this.props.defaultLabel && r.push(n.createElement("button", {
          className: "btn-plain btn-default popup-controls-item",
          onClick: this.props.onDefault,
          key: "primary"
        }, this.props.defaultLabel)), r.length && (r = n.createElement("div", {
          className: "popup-controls"
        }, r)), n.createElement("div", null, n.createElement("div", {
          className: "backdrop backdrop-transparent"
        }, n.createElement("div", {
          className: "popup-container"
        }, n.createElement("div", {
          className: "popup"
        }, n.createElement("div", {
          className: "popup-body"
        }, t, e), r))))
      }
    });
  e.exports = o
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    g = e
  }

  function i() {
    g = void 0
  }

  function a() {
    return g
  }

  function s() {
    if (!g) return w.log("secret_bundle:getSecurityToken: no secret bundle!")(), "nosecretbundle!";
    var e = f(_.toArray(arguments));
    return e.toString(CryptoJS.enc.Base64)
  }

  function d(e, t, r) {
    "0.1" === e ? t && r ? (g.encKey = t, g.macKey = r, g.key = r) : w.error("secret_bundle:setSecretKeys v" + e + " " + t + " " + r)() : w.log("secret_bundle:setSecretKeys unknown version: v" + e)()
  }

  function u() {
    if (g && g.key && g.keyPair) return g.key.toString(CryptoJS.enc.Base64);
    var e = b.keyPair(),
      t = CryptoJS.lib.WordArray.create(e.pubKey),
      r = CryptoJS.enc.Base64.stringify(t),
      n = {
        key: CryptoJS.enc.Base64.parse(r),
        keyPair: e
      };
    return o(n), r
  }

  function c() {
    var e = E.getSecretBundle();
    return e ? (o(e), e) : (w.log("secret_bundle:load: attempted to load non-existent secret bundle!")(), null)
  }

  function l() {
    return g ? (delete g.keyPair, void E.setSecretBundle(g)) : void w.log("secret_bundle:save: trying to save empty secret bundle!")()
  }

  function f(e) {
    for (var t = g.key.toString(CryptoJS.enc.Base64), r = h(e), n = [], o = 0; o < r.length; o++) {
      var i = CryptoJS.enc.Base64.parse(t);
      n.push(CryptoJS.HmacSHA256(r[o], i))
    }
    return n.reduce(p)
  }

  function h(e) {
    var t = [];
    if (null === e || "undefined" == typeof e) return [];
    if (_.isArray(e))
      for (var r = 0; r < e.length; r++) t = t.concat(h(e[r]));
    else if ("object" === ("undefined" == typeof e ? "undefined" : (0, v["default"])(e)))
      if ("undefined" != typeof e.words && "undefined" != typeof e.sigBytes) t.push(e);
      else
        for (var n in e) {
          var o = e[n];
          o && (t = t.concat(h(o)))
        } else t.push(y.userToLegacy(e.toString()));
    return t
  }

  function p(e, t) {
    var r, n;
    e.sigBytes > t.sigBytes ? (n = e, r = t) : (n = t, r = e);
    for (var o = r.words.length, i = 0; o > i; i++) n.words[i] = r.words[i] ^ n.words[i];
    return n
  }
  var g, m = r(36),
    v = n(m),
    y = r(22),
    b = r(180),
    w = r(1),
    E = r(15);
  e.exports = {
    set: o,
    get: a,
    clear: i,
    getOrGenerate: u,
    load: c,
    save: l,
    getSecurityToken: s,
    setSecretKeys: d
  }
}, , , , , , function(e, t) {
  "use strict";
  var r, n = {
    build: function(e, t) {
      return t && (t = _.chain(t).map(function(e, t) {
        return e ? encodeURIComponent(t) + "=" + encodeURIComponent(e) : null
      }).compact().join("&").value()), t ? e + "?" + t : e
    },
    relToAbs: function(e) {
      return r || (r = document.createElement("a")), r.href = e, r.href
    },
    hostname: _.memoize(function(e) {
      return r || (r = document.createElement("a")), r.href = this.isHttp(e) ? e : "http://" + e, r.hostname
    }),
    isHttp: function(e) {
      return e && ("https://" === e.substring(0, 8) || "http://" === e.substring(0, 7))
    },
    isBlob: function(e) {
      return _.isString(e) && "blob:" === e.substring(0, 5)
    },
    isEncryptedMedia: function(e) {
      return e && _.isString(e) && _.endsWith(e, ".enc")
    },
    parseDataURL: function(e) {
      var t = e.indexOf(":"),
        r = e.indexOf(";"),
        n = e.indexOf(",");
      return {
        mimetype: e.substring(t + 1, r),
        data: e.substring(n + 1)
      }
    }
  };
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(1),
    s = r(49),
    d = r(86),
    u = s.extend(d, {
      extraProperties: "allow",
      session: {
        _uiObservers: {
          type: "number",
          "default": 0
        },
        _promises: {
          type: "array",
          "default": function() {
            return []
          }
        },
        _waitPromise: "object",
        stale: "boolean"
      },
      derived: {
        isObserved: {
          deps: ["_uiObservers"],
          fn: function() {
            return this._uiObservers > 0
          }
        }
      },
      update: function() {
        return this.getCollection().update(this.id)
      },
      find: function() {
        return this.getCollection().find(this.id)
      },
      getCollection: function() {
        return this.Collection ? Store[this.Collection] : a.error("baseState:getCollection Attempting to get a non existing collection")()
      },
      getp: function(e) {
        if (_.isString(e)) {
          for (var t = e.split("."), r = this, n = 0; n < t.length; n++) {
            if (!r) throw Error("Path: " + e + " is not defined");
            r = r.get(t[n])
          }
          return r
        }
      },
      regCancellablePromise: function(e) {
        var t = this;
        return this._promises.push(e), e.cancellable()["finally"](function() {
          t._promises = _.without(t._promises, e)
        })
      },
      hasPendingPromises: function() {
        return this._promises && this._promises.length > 0 || this._waitPromise
      },
      cancelPendingPromises: function() {
        this.hasPendingPromises() && (this._promises.forEach(function(e) {
          e.cancel()
        }), this._promises = []), this._waitPromise && this.unset("_waitPromise")
      },
      waitForPromises: function() {
        var e = this;
        if (this._waitPromise) return this._waitPromise;
        var t = this._promises;
        return t && 0 !== t.length ? this._waitPromise = i["default"].settle(t)["finally"](function() {
          e.unset("_waitPromise")
        }) : i["default"].resolve(!0)
      },
      set: function(e, t) {
        return t && t.merge && _.isObject(e) ? s.prototype.set.call(this, _.omit(e, _.isUndefined), t) : s.prototype.set.call(this, e, t)
      },
      "delete": function() {
        this.stopListening()
      }
    });
  e.exports = u
}, function(e, t, r) {
  "use strict";

  function n() {
    switch (f.state) {
      case f.STATE.TIMEOUT:
        return b.TIMEOUT;
      case f.STATE.OPENING:
        return l.online ? b.OPENING : b.OFFLINE;
      case f.STATE.PAIRING:
        return f.hasSynced ? b.RESUMING : b.PAIRING;
      case f.STATE.CONNECTED:
        return f.stream !== f.STREAM.CONNECTED ? f.hasSynced ? b.NORMAL : b.SYNCING : b.NORMAL;
      case f.STATE.UNLAUNCHED:
      case f.STATE.PROXYBLOCK:
      default:
        return b.NORMAL
    }
  }

  function o() {
    if (!v.knowsPhone() && f.state !== f.STATE.PROXYBLOCK) return w.QR;
    var e = f.hasSynced;
    switch (f.state) {
      case f.STATE.PROXYBLOCK:
        return w.PROXYBLOCK;
      case f.STATE.CONFLICT:
        return w.CONFLICT;
      case f.STATE.TOS_BLOCK:
        return w.TOS_BLOCK;
      case f.STATE.UNLAUNCHED:
        return w.SYNCING;
      case f.STATE.UNPAIRED_IDLE:
      case f.STATE.UNPAIRED:
        return w.QR;
      case f.STATE.OPENING:
        if (!l.online && !f.hasSynced) return w.OFFLINE;
      default:
        return e || f.stream === f.STREAM.CONNECTED ? w.MAIN : w.SYNCING
    }
  }

  function i(e, t) {
    switch (t) {
      case E.SHOW:
        return e;
      case E.HIDE:
        return f.hasSynced ? b.NORMAL : b.CONNECTING;
      case E.OBSCURE:
        switch (e) {
          case b.OPENING:
          case b.PAIRING:
          case b.SYNCING:
          case b.RESUMING:
            return b.CONNECTING;
          default:
            return e
        }
    }
  }
  var a = r(7),
    s = r(1),
    d = r(62),
    u = r(45),
    c = r(103),
    l = r(117),
    f = r(13),
    h = r(21),
    p = r(35),
    g = r(110),
    m = r(64),
    v = r(15),
    y = r(111),
    b = {
      OFFLINE: "OFFLINE",
      OPENING: "OPENING",
      PAIRING: "PAIRING",
      SYNCING: "SYNCING",
      RESUMING: "RESUMING",
      CONNECTING: "CONNECTING",
      NORMAL: "NORMAL",
      TIMEOUT: "TIMEOUT"
    },
    w = {
      QR: "QR",
      MAIN: "MAIN",
      SYNCING: "SYNCING",
      OFFLINE: "OFFLINE",
      CONFLICT: "CONFLICT",
      PROXYBLOCK: "PROXYBLOCK",
      TOS_BLOCK: "TOS_BLOCK"
    },
    E = {
      SHOW: "SHOW",
      OBSCURE: "OBSCURE",
      HIDE: "HIDE"
    },
    S = 3e3,
    N = d.extend({
      extraProperties: "reject",
      session: {
        info: {
          type: "string",
          values: _.values(b),
          "default": b.NORMAL
        },
        obscurity: {
          type: "string",
          values: _.values(E),
          "default": E.HIDE
        },
        mode: {
          type: "string",
          values: _.values(w),
          "default": w.SYNCING
        },
        needsUpdate: "boolean",
        couldForce: "boolean",
        uiActive: "boolean",
        available: ["boolean", !1, !0],
        unavailableShiftTimer: "object",
        unobscureShiftTimer: "object",
        timeoutEvent: "object",
        resumeCount: {
          type: "number",
          "default": 0
        },
        phoneActive: "boolean",
        phoneAuthed: ["boolean", !1, !1]
      },
      derived: {
        displayInfo: {
          deps: ["info", "obscurity"],
          fn: function() {
            return i(this.info, this.obscurity)
          }
        }
      },
      initialize: function() {
        this.unavailableShiftTimer = new m(this, this.markUnavailable), this.unobscureShiftTimer = new m(this, this.unobscure), this.listenTo(f, "change:state change:stream change:hasSynced", this.onSocketUpdate), this.listenTo(l, "change:online", this.onSocketUpdate), this.listenTo(this, "change:available", this.onAvailableUpdate), this.listenTo(this, "change:phoneAuthed", this.onPhoneAuthedUpdate), this.listenTo(this, "change:info change:displayInfo change:mode", _.debounce(this.onSelfUpdate)), this.listenTo(this, "change:info", this.logPageResume), this.listenTo(this, "change:info", this.updateWamLog), this.listenTo(this, "change:available change:uiActive", this.updateCouldForce.bind(this, !1)), document.addEventListener("visibilitychange", this.updateCouldForce.bind(this, !1)), this.updateCouldForce(!1)
      },
      "delete": function() {},
      INFO: b,
      MODE: w,
      handle: function(e) {
        switch (e[0]) {
          case "awake":
            this.phoneActive = !1, this.phoneActive = !0;
            break;
          case "asleep":
            this.phoneActive = !1;
            break;
          case "update":
            g.update(e[1], e[2]);
            break;
          case "killsw":
            g.killServiceWorker();
            break;
          default:
            s.error("Stream:handle unknown cmd " + e[0], e)()
        }
      },
      markAvailable: function() {
        this.unavailableShiftTimer.cancel(), this.available = !0, c.monitor(!0, this.displayInfo === b.TIMEOUT)
      },
      markUnavailable: function(e) {
        e ? this.unavailableShiftTimer.before(e) : (this.unavailableShiftTimer.cancel(), this.available = !1, c.monitor(!1, this.displayInfo === b.TIMEOUT))
      },
      onSelfUpdate: function() {
        var e = this.timeoutEvent;
        this.info === b.TIMEOUT ? (e || (this.timeoutEvent = e = new u.WebcPhoneDisconnected), this.displayInfo !== b.TIMEOUT || e._bbarTime || (e._bbarTime = Date.now())) : e && (e.markWebcPhoneDisconnectedT(), e._bbarTime && (e.webcPhoneBbarShownT = Date.now() - e._bbarTime), e.commit(), this.timeoutEvent = null), s.log("Stream:onSelfUpdate mode:" + this.mode + (" info:" + this.info + " view:" + this.displayInfo))()
      },
      onSocketUpdate: function() {
        var e = {},
          t = f.previousAttributes();
        t.stream !== f.stream && f.stream === f.STREAM.DISCONNECTED && (e.phoneActive = !1);
        var r = n();
        if (e.info = r, e.mode = o(), e.phoneAuthed = f.stream !== f.STREAM.DISCONNECTED, r === b.NORMAL) this.unobscureShiftTimer.cancel(), e.obscurity = E.HIDE;
        else if (r === b.OFFLINE) this.unobscureShiftTimer.cancel(), e.obscurity = E.OBSCURE;
        else switch (this.obscurity) {
          case E.HIDE:
            this.unobscureShiftTimer.before(a.DIAGNOSTIC_DELAY);
            break;
          case E.OBSCURE:
            this.unobscureShiftTimer.before(S);
            break;
          case E.SHOW:
        }
        this.set(e)
      },
      unobscure: function() {
        this.obscurity = E.SHOW
      },
      onPhoneAuthedUpdate: function() {
        this.phoneAuthed && (this.sendAvailability(!0), Store.RecentEmoji.sync())
      },
      onAvailableUpdate: function() {
        s.log("Stream:onAvailableUpdate user " + (this.available ? "available" : "unavailable"))(), this.sendAvailability(!1)
      },
      sendAvailability: function(e) {
        (e || this.uiActive) && (this.available ? p.sendPresenceAvailable()["catch"](h.WapDrop, _.noop) : p.sendPresenceUnavailable()["catch"](h.WapDrop, _.noop))
      },
      updateCouldForce: function() {
        this.couldForce = !this.uiActive || !this.available && document.hidden
      },
      logPageResume: function() {
        this.info === b.RESUMING && (this.resumeCount++, new u.WebcPageResume({
          webcResumeCount: this.resumeCount
        }).commit())
      },
      updateWamLog: function() {
        var e = this.info === b.NORMAL;
        c.streamInfoChange(this.info, y.numSocketsAttempted, e), e && this.stopListening(null, "change:info", this.updateWamLog)
      }
    });
  e.exports = new N
}, function(e, t) {
  "use strict";

  function r() {
    this.cancel(), this.foo.apply(this.context, arguments)
  }
  var n = function() {
    1 === arguments.length ? (this.context = null, this.foo = arguments[0]) : (this.context = arguments[0], this.foo = arguments[1]), this.timer = 0, this.ts = 0, this._before = 0, this._after = 0, this.trigger = r.bind(this)
  };
  n.prototype = {
    before: function(e) {
      var t = e + Date.now(),
        r = this.ts;
      return this._before && this._before < t ? r : this._after && t < this._after ? r : (this._before = t, (!r || r > t) && (arguments[0] = t, r = this.set.apply(this, arguments)), r)
    },
    after: function(e) {
      var t = e + Date.now(),
        r = this.ts;
      return this._after && this._after > t ? r : this._before && t > this._before ? r : (this._after = t, (!r || r > t) && (arguments[0] = t, r = this.set.apply(this, arguments)), r)
    },
    debounce: function(e) {
      return arguments[0] = e + Date.now(), this.set.apply(this, arguments)
    },
    debounceAndCap: function(e, t) {
      if (arguments.length <= 2) this.debounce(e), this.before(t);
      else {
        for (var r = new Array(arguments.length - 1), n = 2; n < arguments.length; n++) r[n - 1] = arguments[n];
        r[0] = e, this.debounce.apply(this, r), r[0] = t, this.before.apply(this, r)
      }
    },
    set: function(e) {
      for (var t = this, n = arguments.length, o = Array(n > 1 ? n - 1 : 0), i = 1; n > i; i++) o[i - 1] = arguments[i];
      var a = Date.now();
      if (e = Math.max(e, a), this._before && this._before < e || this._after && this._after > e) return this.ts;
      this.timer && clearTimeout(this.timer);
      var s = e - a;
      return this.timer = o.length > 0 ? setTimeout(function() {
        r.apply(t, o)
      }, s) : setTimeout(this.trigger, s), this.ts = e
    },
    cancel: function() {
      this.timer && (clearTimeout(this.timer), this.timer = 0, this.ts = 0, this._before = 0, this._after = 0)
    }
  }, e.exports = n
}, function(e, t, r) {
  var n = r(119);
  e.exports = function(e, t, r) {
    if (n(e), void 0 === t) return e;
    switch (r) {
      case 1:
        return function(r) {
          return e.call(t, r)
        };
      case 2:
        return function(r, n) {
          return e.call(t, r, n)
        };
      case 3:
        return function(r, n, o) {
          return e.call(t, r, n, o)
        }
    }
    return function() {
      return e.apply(t, arguments)
    }
  }
}, function(e, t) {
  e.exports = {}
}, function(e, t, r) {
  "use strict";

  function n(e) {
    "number" == typeof e && (e = "v" + e);
    var t = p[e];
    t || (o.error("binaryProtocol unknown version: " + e)(), a.upload("bp_unknown_version", !0)["finally"](function() {
      return i.hardRefresh()
    }));
    var r = t.OutputStream,
      n = new t.Writer(t.Dictionary),
      s = t.InputStream,
      d = new t.Reader(t.Dictionary),
      u = t.Crypto;
    this.Node = t.Node, this.read = function(e) {
      var t;
      try {
        var r = new s(u.decrypt(e));
        t = d.readNode(r)
      } catch (n) {
        o.errorVerbose("binaryProtocol:read error " + n.stack)()
      }
      return t
    }, this.write = function(e) {
      var t;
      try {
        var i = new r;
        n.writeNode(i, e), t = u.encrypt(i.toBuffer())
      } catch (a) {
        o.errorVerbose("binaryProtocol:write error " + a.stack)()
      }
      return t
    }
  }
  var o = r(1),
    i = r(16),
    a = r(10),
    s = {
      OutputStream: r(381),
      Writer: r(383),
      InputStream: r(379),
      Reader: r(382),
      Dictionary: r(378),
      Node: r(380),
      Crypto: r(377)
    },
    d = {
      OutputStream: r(53),
      Writer: r(114),
      InputStream: r(51),
      Reader: r(113),
      Dictionary: r(384),
      Node: r(52),
      Crypto: r(50)
    },
    u = {
      OutputStream: r(53),
      Writer: r(114),
      InputStream: r(51),
      Reader: r(113),
      Dictionary: r(385),
      Node: r(52),
      Crypto: r(50)
    },
    c = {
      OutputStream: r(53),
      Writer: r(114),
      InputStream: r(51),
      Reader: r(113),
      Dictionary: r(177),
      Node: r(52),
      Crypto: r(50)
    },
    l = {
      OutputStream: r(53),
      Writer: r(116),
      InputStream: r(51),
      Reader: r(115),
      Dictionary: r(177),
      Node: r(52),
      Crypto: r(50)
    },
    f = {
      OutputStream: r(53),
      Writer: r(116),
      InputStream: r(51),
      Reader: r(115),
      Dictionary: r(386),
      Node: r(52),
      Crypto: r(50)
    },
    h = {
      OutputStream: r(53),
      Writer: r(116),
      InputStream: r(51),
      Reader: r(115),
      Dictionary: r(387),
      Node: r(52),
      Crypto: r(50)
    },
    p = {
      "01": s,
      "03": d,
      "04": u,
      "05": c,
      "06": l,
      v1: c,
      v2: l,
      v3: f,
      v4: h
    };
  e.exports = n
}, function(e, t, r) {
  e.exports = {
    "default": r(425),
    __esModule: !0
  }
}, function(e, t) {
  var r = {}.toString;
  e.exports = function(e) {
    return r.call(e).slice(8, -1)
  }
}, function(e, t, r) {
  var n = r(188),
    o = r(120);
  e.exports = function(e) {
    return n(o(e))
  }
}, , , , , , , , , , , function(e, t, r) {
  e.exports = {
    "default": r(424),
    __esModule: !0
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && _.isFunction(e.isMounted) && e.isMounted() ? i.findDOMNode(e) : null
  }

  function o(e, t) {
    var r;
    return e && t && (r = n(e.component)) && r.contains(t)
  }
  var i = r(28),
    a = r(8),
    s = r(44),
    d = {
      TOOLTIP: "tooltip",
      MENU: "menu",
      MODAL: "modal",
      MODAL_MEDIA: "modal_media",
      EMOJI: "emoji",
      DRAWER_LEFT: "drawer_left",
      DRAWER_MID: "drawer_mid",
      DRAWER_RIGHT: "drawer_right",
      PTT: "ptt_recorder",
      MAIN: "main",
      CONVERSATION_FOOTER: "conversation_footer",
      MEDIA_VIEWER: "media_viewer",
      STATUS_INPUT: "status_input",
      ADVANCED_INPUT: "advanced_input",
      SUBJECT_INPUT: "subject_input",
      COMPOSE_INPUT: "compose_input",
      CAPTION_INPUT: "caption_input",
      CONTACT_SEARCH: "contact_search",
      CHAT_SEARCH: "chat_search",
      CHATLIST_PANEL: "chatlist_panel",
      IGNORE_ANY: "any",
      IGNORE_CONTEXT: "contextmenu",
      _stack: [],
      _base: null,
      _events: !1,
      push: function(e, t) {
        var r, n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
        (r = this.find(t)) && (this._stack = _.without(this._stack, r)), r = {
          component: e,
          type: t,
          popable: !!n.popable,
          escapable: !!n.escapable || !!n.popable,
          maintainFocus: !!n.maintainFocus,
          parent: n.parent
        }, this._stack.push(r), this._listeners(), this._focus()
      },
      pop: function(e, t) {
        if (this._stack.length) {
          var r;
          if (e ? r = this.find(e) : (r = _.last(this._stack), r = r.popable ? r : null), r) {
            var n = this._deps(r.component);
            n.push(r), this._close(n, t)
          }
        }
      },
      popDependents: function(e) {
        this._close(this._deps(e))
      },
      stealFocus: function(e) {
        for (var t, r = function(t) {
            return t.maintainFocus && t.type !== e
          }; t = _.find(this._stack, r);) {
          var n = this._deps(t.component);
          n.push(t), this._close(n)
        }
      },
      _close: function(e, t) {
        if (!_.isEmpty(e)) {
          var r = this._stack;
          e.forEach(function(e) {
            e.index = _.findIndex(r, e)
          }), e = e.sort(function(e, t) {
            return t.index - e.index
          });
          var i = _.findLast(e, "parent"),
            a = this,
            s = document.activeElement;
          e.forEach(function(e) {
            a.unregBubbleTrap(e), r = _.without(r, e), o(e, s) && _.isFunction(s.blur) && s.blur(), _.isFunction(e.component.uimClose) && e.component.uimClose(e.type, t)
          }), this._stack = r, this._listeners(), document.activeElement === document.body && (i ? this.focusNodeOrParent(n(i.parent)) : this._focus(t))
        }
      },
      focusNodeOrParent: function(e) {
        for (; e && _.isFunction(e.focus);) {
          if (e.focus(), document.activeElement === e) return;
          e = e.parentNode
        }
      },
      _deps: function(e) {
        var t = this,
          r = _.filter(this._stack, {
            parent: e
          });
        return _.flatten(r, _.chain(r).pluck("component").map(function(e) {
          return t._deps(e)
        }).value())
      },
      top: function() {
        return _.last(this._stack) || this._base
      },
      find: function(e) {
        return _.find(this._stack, {
          type: e
        })
      },
      _listeners: function() {
        var e = this.top();
        e && e.popable ? this.regListeners() : this.unregListeners()
      },
      _focus: function(e) {
        var t = this.top();
        t && _.isFunction(t.component.uimFocus) && t.component.isMounted() && t.component.uimFocus(t.type, e)
      },
      regListeners: function() {
        this._events || (window.addEventListener("DOMMouseScroll", this.maybePreventDefault, !0), window.addEventListener("mousewheel", this.maybePreventDefault, !0), a.on("window_mousedown", this.onMouseDown), window.addEventListener("resize", this.onResize, !0), this._events = !0)
      },
      unregListeners: function() {
        this._events && (window.removeEventListener("DOMMouseScroll", this.maybePreventDefault, !0), window.removeEventListener("mousewheel", this.maybePreventDefault, !0), a.off("window_mousedown", this.onMouseDown), window.removeEventListener("resize", this.onResize, !0), this._events = !1)
      },
      regBubbleTrap: function(e) {
        var t = n(e.parent);
        t && (t.addEventListener("click", this.stopEvent), t.addEventListener("contextmenu", this.stopEvent))
      },
      unregBubbleTrap: function(e) {
        var t = n(e.parent);
        t && (t.removeEventListener("click", this.stopEvent), t.removeEventListener("contextmenu", this.stopEvent))
      },
      stopEvent: function(e) {
        e.preventDefault(), e.stopPropagation()
      },
      maybePreventDefault: function(e) {
        return o(this.top(), e.target) ? !0 : (e.preventDefault(), void e.stopPropagation())
      },
      maintainFocus: function(e) {
        var t = _.findLast(this._stack, "maintainFocus");
        t && t.component.uimFocus && (o(t, e.target) || (e.preventDefault(), t.component.uimFocus()))
      },
      onMouseDown: function(e) {
        this.unregEatClick();
        var t = e.target,
          r = _.last(this._stack);
        if (o(r, t)) return void this.maintainFocus(e);
        var n = "click";
        e.button > 0 && (n = "contextmenu");
        for (var i = !0; t !== document;) {
          var a = t.getAttribute("data-ignore-capture");
          if (a) {
            if (a === d.IGNORE_ANY || a === n) {
              i = !1;
              break
            }
            break
          }
          t = t.parentNode
        }
        this.pop(), this.maintainFocus(e), i && this.regEatClick()
      },
      regEatClick: function() {
        a.on("window_click", this.onClick), a.on("window_mousedown", this.unregEatClick)
      },
      unregEatClick: function() {
        a.off("window_click", this.onClick), a.off("window_mousedown", this.unregEatClick)
      },
      onClick: function(e) {
        s.isGecko && "click" === e.type && e.button > 0 || (this.unregEatClick(), e.defaultPrevented || (e.preventDefault(), e.stopPropagation()))
      },
      onResize: function(e) {
        for (var t = this.top(); t && t.popable;) this.pop(), t = this.top()
      }
    };
  "maybePreventDefault stopEvent onMouseDown regEatClick unregEatClick onClick onResize".split(/ /).forEach(function(e) {
    d[e] = d[e].bind(d)
  }), window.addEventListener("keydown", function(e) {
    if (27 === e.keyCode) {
      e.stopPropagation(), e.preventDefault();
      var t = _.last(d._stack);
      t && t.escapable && d.pop(t.type)
    }
  }), e.exports = d
}, function(e, t) {
  "use strict";

  function r() {
    this.proto = [0, 0], this.F = _(o).flatten().map(_.keys).flatten().concat(_.keys(i)).uniq().map(function(e) {
      return [e, e]
    }).zipObject().value()
  }
  var n = !1;
  n = !0;
  var o = [
      [{
        RESEND_ICON: !1
      }, {}, {}, {
        FORWARD_MESSAGE: !0
      }, {
        SET_STATUS: !0,
        SET_PROFILE_PIC: !0,
        SET_BLOCK: !0,
        MUTE: !0,
        ARCHIVE: !0,
        ARCHIVE_BROADCAST: !0,
        DELETE: !0,
        GROUP_CREATE: !0,
        GROUP_EXIT: !0,
        GROUP_SET_SUBJECT: !0,
        GROUP_SET_PIC: !0,
        GROUP_ADD_PARTICIPANT: !0,
        GROUP_REMOVE_PARTICIPANT: !0,
        GROUP_PROMOTE_PARTICIPANT: !0
      }, {
        RECENT_EMOJI_SYNC: !0,
        MESSAGE_DELETE: !0,
        MESSAGE_INFO: !0,
        CHAT_MARK_UNSEEN: !0,
        CHAT_CLEAR: !0
      }, {}, {
        MUTE_1_1: !0,
        MEDIA_RETRY: !0,
        STARRED: !1
      }, {
        SPAM: !n,
        FULL_TEXT_SEARCH: !n
      }]
    ],
    i = {
      KEY_PARTICIPANT: !1,
      MEDIA_RETRY: !1,
      STARRED: !1,
      DOCUMENT: !1,
      URL: !1,
      CHAT_CLEAR_STARRED: !1,
      ENC_IMAGE: !1,
      ENC_AUDIO: !1,
      ENC_VIDEO: !1,
      ENC_DOC: !1
    };
  r.prototype = {
    setVersion: function(e) {
      if (this.proto.length !== e.length || this.proto[0] !== e[0] || this.proto[1] !== e[1]) {
        this.proto = e;
        var t = o.slice(0, e[0] + 1),
          r = o.slice(e[0] + 1, o.length),
          n = t[e[0]],
          i = n.slice(0, e[1] + 1),
          a = n.slice(e[1] + 1, n.length);
        t[e[0]] = i, r.unshift(a), this.features = _.merge(_.omit(_.merge.apply(_, [{}].concat(_.flatten(t))), function(e) {
          return !e
        }), this.features || {});
        var s = _.merge.apply(_, [{}].concat(_.flatten(r)));
        this.features = _.omit(this.features, function(e, t) {
          return !!s[t]
        }), this.VF = _(_.keys(_.merge.apply(_, [{}].concat(_.flatten(t))))).map(function(e) {
          return [e, e]
        }).zipObject().value()
      }
    },
    setPlatform: function(e) {
      switch (e) {
        case "iphone":
          this.features.RECENT_EMOJI_SYNC = !1, this.features.ARCHIVE_BROADCAST = !1, this.features.RESEND_ICON = !0;
          break;
        case "symbian":
        case "s40":
        case "bb":
          this.features.CHAT_MARK_UNSEEN = !1
      }
    },
    setFeature: function(e, t) {
      var r = this.features[e] !== t;
      return this.features[e] = t, r
    },
    setFeatures: function(e) {
      var t = {},
        r = _.merge({}, i, e);
      for (var n in r) n in this.VF || (t[n] = this.setFeature(n, !!r[n]));
      return t
    },
    supportsFeature: function(e) {
      return !!this.features[e]
    },
    lt: function(e) {
      var t = this.proto;
      return e[0] > t[0] || e[0] === t[0] && e[1] > t[1]
    },
    lte: function(e) {
      var t = this.proto;
      return e[0] > t[0] || e[0] === t[0] && e[1] >= t[1]
    },
    gt: function(e) {
      var t = this.proto;
      return e[0] < t[0] || e[0] === t[0] && e[1] < t[1]
    },
    gte: function(e) {
      var t = this.proto;
      return e[0] < t[0] || e[0] === t[0] && e[1] <= t[1]
    }
  };
  var a = new r;
  e.exports = a
}, function(e, t, r) {
  "use strict";
  var n = r(8),
    o = {
      getCmds: function() {
        return this._cmds || (this._cmds = []), this._cmds
      },
      regCmd: function(e, t) {
        if (!_.isFunction(t)) throw Error("handler is not a function");
        this.getCmds().push({
          cmd: e,
          handler: t
        }), this.isMounted() && n.on(e, t)
      },
      unregCmd: function(e, t) {
        n.off(e, t), this._cmds = _.reject(this._cmds, _.matches({
          cmd: e,
          handler: t
        }))
      },
      registerCmds: function() {
        this._cmds && this.getCmds().forEach(function(e) {
          n.on(e.cmd, e.handler)
        })
      },
      unregisterCmds: function() {
        this._cmds && (this.getCmds().forEach(function(e) {
          n.off(e.cmd, e.handler)
        }), delete this._cmds)
      },
      componentDidMount: function() {
        this.registerCmds()
      },
      componentWillUnmount: function() {
        this.unregisterCmds()
      }
    };
  e.exports = o
}, function(e, t) {
  "use strict";

  function r(e, t, r, n) {
    var o;
    return o = 0 === e ? r || 0 : Math.pow(2, e), _.isFinite(t) && o > t && (o = t), _.isFinite(r) && r > o && (o = r), n && (o *= 1 + n * Math.random()), o
  }
  e.exports = {
    expBackoff: r
  }
}, function(e, t, r) {
  "use strict";
  var n = r(47),
    o = {
      listenTo: function(e, t, r) {
        if (!_.isObject(e)) throw Error("obj is not an object");
        if (_.isObject(t));
        else if (!_.isFunction(r)) throw Error("callback is not a function");
        n.listenTo.apply(this, arguments)
      },
      listenToOnce: function(e, t, r) {
        if (!_.isObject(e)) throw Error("obj is not an object");
        if (_.isObject(t));
        else if (!_.isFunction(r)) throw Error("callback is not a function");
        n.listenToOnce.apply(this, arguments)
      }
    };
  e.exports = o
}, function(e, t, r) {
  e.exports = {
    "default": r(421),
    __esModule: !0
  }
}, function(e, t, r) {
  e.exports = !r(89)(function() {
    return 7 != Object.defineProperty({}, "a", {
      get: function() {
        return 7
      }
    }).a
  })
}, function(e, t) {
  e.exports = function(e) {
    try {
      return !!e()
    } catch (t) {
      return !0
    }
  }
}, function(e, t) {
  e.exports = function(e) {
    return "object" == typeof e ? null !== e : "function" == typeof e
  }
}, function(e, t, r) {
  var n = r(11).setDesc,
    o = r(121),
    i = r(23)("toStringTag");
  e.exports = function(e, t, r) {
    e && !o(e = r ? e : e.prototype, i) && n(e, i, {
      configurable: !0,
      value: t
    })
  }
}, , , , , , , , , , , , function(e, t, r) {
  "use strict";

  function n(e, t, r) {
    var n = Math.floor(window.performance.now());
    g[e] = n, r && (g.socketSequence = t, o(), i(), h.resumeJobs())
  }

  function o() {
    function e(e) {
      var r = 0 | t[e];
      return r && r - n
    }
    if (!(window.performance && window.performance.timing && window.performance.navigation)) return void l.log("MetricReporter:logPageLoad metrics not provided by browser!", "red")();
    var t = window.performance.timing,
      r = window.performance.navigation,
      n = 0 | t.navigationStart,
      i = (0 | t.loadEventEnd) - n;
    return 0 >= i ? (l.log("MetricReporter:logPageLoad delayed", "blue")(), void _.delay(o, 1e4)) : (p.set({
      webcPageLoadT: i,
      webcUnloadEventStart: e("unloadEventStart"),
      webcUnloadEventEnd: e("unloadEventEnd"),
      webcRedirectStart: e("redirectStart"),
      webcRedirectEnd: e("redirectEnd"),
      webcFetchStart: e("fetchStart"),
      webcDomainLookupStart: e("domainLookupStart"),
      webcDomainLookupEnd: e("domainLookupEnd"),
      webcConnectStart: e("connectStart"),
      webcConnectEnd: e("connectEnd"),
      webcSecureConnectionStart: e("secureConnectionStart"),
      webcRequestStart: e("requestStart"),
      webcResponseStart: e("responseStart"),
      webcResponseEnd: e("responseEnd"),
      webcDomLoading: e("domLoading"),
      webcDomInteractive: e("domInteractive"),
      webcDomContentLoadedEventStart: e("domContentLoadedEventStart"),
      webcDomContentLoadedEventEnd: e("domContentLoadedEventEnd"),
      webcDomComplete: e("domComplete"),
      webcLoadEventStart: e("loadEventStart"),
      webcLoadEventEnd: e("loadEventEnd"),
      webcAppcacheStatus: window.applicationCache ? window.applicationCache.status : void 0,
      webcCached: t.fetchStart === t.domainLookupEnd,
      webcNavigation: r.type,
      webcRedirectCount: r.redirectCount,
      webcWsOpening: g.OPENING,
      webcWsPairing: g.PAIRING,
      webcWsSyncing: g.SYNCING,
      webcWsNormal: g.NORMAL,
      webcWsAttempts: g.socketSequence,
      webcQrCode: !g.SYNCING
    }), p.commit(), void(p = null))
  }

  function i() {
    if (window.performance.getEntriesByType) {
      var e, t = window.performance.getEntriesByType("resource"),
        r = document.createElement("a");
      t.forEach(function(t) {
        r.href = t.name, e = r.pathname + r.search + r.hash, new f.WebcResourceLoad({
          webcResourceName: e,
          webcResourceDuration: Math.round(t.duration),
          webcResourceCached: t.domainLookupEnd === t.fetchStart
        }).commit()
      })
    }
  }

  function a(e) {
    v = Date.now(), y = e, m = {
      total: 0,
      ab: 0,
      an: 0,
      ub: 0,
      un: 0
    }
  }

  function s(e, t) {
    var r = e ? t ? "ab" : "an" : t ? "ub" : "un";
    d(r)
  }

  function d(e) {
    if (m) {
      var t = Date.now(),
        n = Math.max(t - v, 0);
      m.total += n, m[e] += n, v = t, y = e
    } else a(e), r(8).on("js_halt_detected", u)
  }

  function u(e) {
    Date.now() - e > v ? v += e : m[y] -= e
  }

  function c() {
    var e = new f.WebcWamUpload;
    if (m) {
      d(y);
      var t = m.total;
      if (t > 0) {
        var r = m.an + m.ab,
          n = m.un + m.ub;
        e.set({
          webcTotalT: Math.ceil(m.total),
          webcAvailableTp: r / t,
          webcAvailableNormalTp: r ? m.an / r : void 0,
          webcAvailableBbarTp: r ? m.ab / r : void 0,
          webcUnavailableTp: n / t,
          webcUnavailableNormalTp: n ? m.un / n : void 0,
          webcUnavailableBbarTp: n ? m.ub / n : void 0
        })
      }
      a(y)
    }
    return e
  }
  var l = r(1),
    f = r(45),
    h = r(182),
    p = new f.WebcPageLoad,
    g = {},
    m = void 0,
    v = void 0,
    y = void 0;
  e.exports = {
    monitor: s,
    PageLoad: p,
    streamInfoChange: n,
    uploadEvent: c
  }
}, , function(e, t, r) {
  "use strict";
  var n = r(47),
    o = {
      getInitialState: function() {
        return {
          _observedStateIndex: 0
        }
      },
      addObserver: function(e, t, r) {
        if (!this._isObservable(e)) throw Error("Attempting to observe non-observable object");
        this._observer || (this._observer = n.createEmitter()), this._observer.listenTo(e, t, this._cbWrapper(r)), e.isState && e._uiObservers++
      },
      addObserverAndRun: function(e, t, r) {
        this.addObserver(e, t, r);
        var n = this._cbWrapper(r);
        n(e, t)
      },
      removeObserver: function(e, t) {
        if (!this._isObservable(e)) throw Error("Attempting to unobserve non-observable object");
        this._observer && (this._observer.stopListening(e, t), e.isState && e._uiObservers--)
      },
      _cbWrapper: function(e) {
        var t = this;
        return function() {
          if (t.isMounted()) {
            for (var r = arguments.length, n = Array(r), o = 0; r > o; o++) n[o] = arguments[o];
            return _.isFunction(e) ? e.apply(t, n) : t.setState({
              _observedStateIndex: t.state._observedStateIndex + 1
            })
          }
        }
      },
      _isObservable: function(e) {
        return e ? _.isFunction(e.trigger) : !1
      },
      componentWillUnmount: function() {
        if (this._observer) {
          var e = this._observer._listeningTo;
          for (var t in e) {
            var r = e[t];
            r.isState && r._uiObservers--
          }
          this._observer.stopListening()
        }
      }
    };
  e.exports = o
}, function(e, t, r) {
  "use strict";
  var n = r(1),
    o = r(166),
    i = {
      _nativeEventSafeIsMounted: function() {
        return this.isMounted() && "UNMOUNTING" !== this._compositeLifeCycleState
      },
      getEvents: function() {
        return this._events || (this._events = []), this._events
      },
      regNativeListener: function(e, t, r, n) {
        if (!_.isFunction(r)) throw Error("handler is not a function");
        t = o.prefix(t, e);
        var i = this,
          a = function() {
            return i._nativeEventSafeIsMounted() ? r.apply(null, arguments) : void 0
          };
        this.getEvents().push({
          src: e,
          evnt: t,
          handler: r,
          fn: a,
          capture: n
        }), this.isMounted() && e.addEventListener(t, a, n)
      },
      unregNativeListener: function(e, t, r, i) {
        t = o.prefix(t, e);
        var a = _.matches({
            src: e,
            evnt: t,
            handler: r,
            capture: i
          }),
          s = _.find(this.getEvents(), a);
        s ? (this._events = _.without(this._events, s), s.src.removeEventListener(s.evnt, s.fn, s.capture)) : n.error("nativeEventMixin:unregNativeListener unreg could not find event:" + t)()
      },
      unregisterListeners: function() {
        this._events && (this.getEvents().forEach(function(e) {
          e.src.removeEventListener(e.evnt, e.fn, e.capture)
        }), delete this._events)
      },
      componentDidMount: function() {
        this._events && this.getEvents().forEach(function(e) {
          e.src.addEventListener(e.evnt, e.fn, e.capture)
        })
      },
      componentWillUnmount: function() {
        this.unregisterListeners()
      }
    };
  e.exports = i
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(162),
    i = n(o),
    a = r(3),
    s = n(a),
    d = r(28),
    u = r(6),
    c = r(1),
    l = r(409),
    f = r(8),
    h = r(566),
    p = u.createClass({
      displayName: "VelocityTransitionGroupChild",
      propTypes: {
        transitionName: u.PropTypes.string.isRequired,
        delay: u.PropTypes.number
      },
      _getTransition: function() {
        return l[this.props.transitionName] || c.log("TransitionName " + this.props.transitionName + " wasn't found in VelocityTransitionGroupChild transitions.")(), l[this.props.transitionName] || l["default"]
      },
      componentWillEnter: function(e) {
        var t = this._getTransition();
        this.animateTransitions(t.enter)["finally"](this._cbWrapper(e))
      },
      componentWillLeave: function(e) {
        var t = this._getTransition();
        this.animateTransitions(t.leave)["finally"](this._cbWrapper(e))
      },
      _cbWrapper: function(e) {
        var t = this;
        return function() {
          return t.isMounted() && _.isFunction(e) ? e() : void 0
        }
      },
      animateTransitions: function(e) {
        var t = this._getTransition();
        if (!t || !e) return s["default"].resolve();
        var r = d.findDOMNode(this),
          n = this.props.delay,
          o = _.omit(t, "leave", "enter"),
          i = {},
          a = u.Children.only(this.props.children);
        e = _.filter(_.forceArray(e), function(e) {
          if (_.isString(e.selector) || i[e.selector]) {
            var t = r.querySelectorAll(e.selector);
            if (!t.length) return !1;
            i[e.selector] = t
          }
          return !0
        }), a.props.staggerDelay || n || _.forEach(e, function(e) {
          if (!e.delay && !o.delay) {
            var t = e.selector ? i[e.selector] : r;
            _.forEach(e.props, function(e, r) {
              _.isArray(e) && Velocity.hook(t, r, e[1])
            })
          }
        }), f.setUiBusy(!0);
        var l = this;
        return s["default"].map(e, function(e) {
          var t = e.selector ? i[e.selector] : r,
            d = Velocity(t, e.props, {
              easing: e.easing || o.easing || "easeInSine",
              duration: e.duration || o.duration || 0,
              delay: a.props.staggerDelay || n || e.delay || o.delay || 0,
              queue: o.queue || !1,
              stagger: e.stagger || !1,
              drag: e.drag || !1
            });
          return d ? d.then(function() {
            o.cleanOnComplete && (_.isArray(t) ? _.forEach(t, function(e) {
              e.removeAttribute("style")
            }) : t.removeAttribute("style"))
          }) : (c.log("VelocityTransitionGroup:animationTransitions:error " + l.props.transitionName)(), s["default"].resolve())
        })["finally"](function() {
          f.setUiBusy(!1)
        })
      },
      componentWillUnmount: function() {
        var e = d.findDOMNode(this);
        Velocity(e, "stop")
      },
      render: function() {
        return u.Children.only(this.props.children)
      }
    }),
    g = u.createClass({
      displayName: "VelocityTransitionGroup",
      propTypes: {
        transitionName: u.PropTypes.string.isRequired,
        delay: u.PropTypes.number
      },
      _wrapChild: function(e) {
        return u.createElement(p, {
          delay: this.props.delay,
          transitionName: this.props.transitionName
        }, e)
      },
      render: function() {
        return u.createElement(h, (0, i["default"])({
          childFactory: this._wrapChild
        }, this.props))
      }
    });
  e.exports = g
}, function(e, t, r) {
  "use strict";

  function n(e, t, r, n, s) {
    this._from = e, this._to = t, this._id = r, this._participant = n, this._selfDir = s;
    var d, u;
    if (!(e && t && r && Store.Conn.me)) throw new Error("MsgKey error: " + [e, t, r, Store.Conn.me].join());
    s = e === t ? s : void 0, e === t && e === Store.Conn.me ? (d = "out" === s, u = Store.Conn.me) : e === Store.Conn.me ? (d = !0, u = t) : t === Store.Conn.me ? (d = !1, u = e) : e === t && (i.isGroup(e) || i.isBroadcast(e)) ? (d = !0, u = e) : o.error("MsgKey case error: " + [e, t, r, Store.Conn.me].join())(), this.fromMe = d, this.remote = u, this.id = r;
    var c = [this.fromMe, this.remote, this.id];
    "undefined" != typeof s && (this.self = s, c.push(this.self)), a.gte([0, 5]) && a.supportsFeature(a.F.KEY_PARTICIPANT) && "undefined" != typeof n && (this.participant = n, c.push(this.participant)), this._serialized = c.join("_")
  }
  var o = r(1),
    i = r(22),
    a = r(83);
  n.prototype = {
    toString: function() {
      return this._serialized
    },
    clone: function() {
      return new n(this._from, this._to, this._id, this._participant, this._selfDir)
    }
  }, e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e, t, r, n, o) {
    var i = new XMLHttpRequest,
      a = new c["default"](function(a, s) {
        i.onload = function(e) {
          4 === i.readyState ? a(i) : s(e)
        }, i.onerror = s, i.ontimeout = s, i.onprogress = o, i.onabort = s, r instanceof FormData ? (i.open(t || f.POST, e, !0), n && (i.responseType = n), i.send(r)) : r instanceof Object ? (e = l.build(e, r), i.open(t || f.GET, e, !0), n && (i.responseType = n), i.send()) : (i.open(t || f.GET, e, !0), n && (i.responseType = n), i.send())
      });
    return a.cancellable()["catch"](c["default"].CancellationError, function(e) {
      return i.abort(), c["default"].reject(e)
    })
  }

  function i(e, t) {
    return o(e, f.GET, null, t)
  }

  function a(e, t) {
    return o(e, f.POST, t)
  }

  function s(e) {
    return o(e, f.HEAD)
  }

  function d(e) {
    return window.jsonp || (window.jsonp = {}), new c["default"](function(t, r) {
      var n = _.uniqueId("jsonp_");
      e += "&JsonType=callback&JsonCallback=" + n;
      var o = document.createElement("script");
      o.type = "text/javascript", o.src = e, o.onerror = function(e) {
        delete window.jsonp[n], document.head.removeChild(o), r(e)
      }, window.jsonp[n] = function(e) {
        delete window.jsonp[n], document.head.removeChild(o), t(e)
      }, document.head.appendChild(o)
    })
  }
  var u = r(3),
    c = n(u),
    l = r(61),
    f = {
      GET: "GET",
      POST: "POST",
      HEAD: "HEAD",
      PUT: "PUT"
    },
    h = {
      BLOB: "blob",
      ARRAY_BUFFER: "arraybuffer"
    };
  e.exports = {
    head: s,
    get: i,
    post: a,
    request: o,
    jsonp: d,
    VERB: f,
    RESP_TYPE: h
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    this.Type = h, this.Mode = p, this.pendingUpdate = void 0, this.pendingHardRefreshTimer = void 0, this.mode = p.IDLE, this.version = d.VERSION_STR
  }
  var i = r(3),
    a = n(i),
    s = r(165),
    d = r(7),
    u = r(1),
    c = r(47),
    l = r(86),
    f = r(118),
    h = {
      SILENT: "silent",
      SOFT: "soft",
      HARD: "hard"
    },
    p = {
      IDLE: "idle",
      REFRESHING: "refreshing",
      PENDING_REFRESH: "pending_refresh"
    };
  o.prototype.update = function(e, t) {
    var n = this;
    u.log("AppUpdate:update: " + e + " current: " + this.version + " latest: " + t)();
    var o = void 0;
    if (_.isNumber(e)) o = h.HARD;
    else if (e) o = h.SOFT;
    else {
      if (this.version === t) return;
      o = h.SILENT
    }
    var i = o === h.HARD ? Date.now() + e : void 0;
    return this.clearHardRefresh(), o === h.HARD && this.setMode(p.REFRESHING), this._update(t).then(function(e) {
      var t = r(16);
      o !== h.SILENT && (Store.Stream.needsUpdate = e), o === h.HARD && (n.setMode(p.PENDING_REFRESH), n.pendingHardRefreshTimer = s.setTimeout(function() {
        t.hardRefresh(!0), n.clearHardRefresh()
      }, i), n.listenTo(Store.Stream, "change:couldForce", function() {
        t.hardRefresh(!0), n.clearHardRefresh()
      }))
    })
  }, o.prototype.setMode = function(e) {
    this.mode = e, this.trigger("change:mode", e)
  }, o.prototype._update = function(e) {
    if (this.version !== e) {
      if (f && navigator.serviceWorker.controller) return this._swUpdate(e);
      if (window.applicationCache && window.applicationCache.status !== window.applicationCache.UNCACHED) return this._appcacheUpdate(e)
    }
    return a["default"].resolve(this.version !== e)
  }, o.prototype.killServiceWorker = function() {
    return f && navigator.serviceWorker.controller ? (u.info("Killing service worker")(), navigator.serviceWorker.ready.then(function(e) {
      return e.unregister()
    }).then(function(e) {
      return u.log("Service worker unregistration status: " + e)(), e
    })) : a["default"].resolve()
  }, o.prototype._swUpdate = function(e) {
    return navigator.serviceWorker.ready.then(function(t) {
      return new a["default"](function(r, n) {
        function o(t) {
          a(), u.error("Unable to update service worker to version " + e + ". Error: " + t)()
        }

        function i(e) {
          a(), r(!0)
        }

        function a() {
          navigator.serviceWorker.removeEventListener("error", o), navigator.serviceWorker.removeEventListener("controllerchange", i)
        }
        navigator.serviceWorker.addEventListener("error", o), navigator.serviceWorker.addEventListener("controllerchange", i), t.update().then(function() {
          t.installing || r(!1)
        })["catch"](function(e) {
          o(e), r(!1)
        })
      })
    })["catch"](function(e) {
      return u.error("Unable to update serviceworker, error: " + e)(), !1
    })
  };
  var g = r(29),
    m = r(21),
    v = r(85);
  o.prototype._appcacheUpdate = function(e) {
    return this.pendingUpdate || this.fetch(e).then(function() {
      return window.applicationCache.status === window.applicationCache.UPDATEREADY ? (u.info("Updater:handleUpdate:ApplicationCacheSuccess")(), !0) : (u.log("Updater:handleUpdate:ApplicationNoUpdate")(), !1)
    })["catch"](function(e) {
      return u.error("Updater:handleUpdate:ApplicationCacheError " + e)(e), r(10).upload("appcache-error"), !1
    })
  }, o.prototype.fetch = function(e) {
    var t = this;
    return this.pendingUpdate = g.loopOnError(m.ShouldLoop, function(r) {
      return a["default"].delay(1e3 * v.expBackoff(r, 120, 1, .1)).then(function() {
        return new a["default"](function(r, n) {
          function o() {
            window.applicationCache.removeEventListener("updateready", a), window.applicationCache.removeEventListener("error", s), window.applicationCache.removeEventListener("noupdate", i)
          }

          function i() {
            o(), d.version = e, r()
          }

          function a() {
            o(), d.version = e, r()
          }

          function s(e) {
            o(), n(new m.ShouldLoop("AppCache Error. Retrying..."))
          }
          var d = t;
          window.applicationCache.addEventListener("updateready", a), window.applicationCache.addEventListener("error", s), window.applicationCache.addEventListener("noupdate", i), window.applicationCache.status !== window.applicationCache.IDLE && window.applicationCache.status !== window.applicationCache.UPDATEREADY || window.applicationCache.update()
        })
      })
    })["finally"](function() {
      t.pendingUpdate = void 0
    })
  }, o.prototype.clearHardRefresh = function() {
    this.setMode(p.IDLE), this.pendingHardRefreshTimer && (s.clearTimeout(this.pendingHardRefreshTimer), this.pendingHardRefreshTimer = void 0), this.stopListening(Store.Stream, "change:couldForce")
  }, o.prototype.restart = function() {
    var e = r(16);
    e.hardRefresh()
  }, e.exports = new o, _.extend(e.exports, c, l)
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e, t) {
    var r = -1,
      n = _.find(e, function(e) {
        return r++, t(e)
      });
    return void 0 === n ? void 0 : {
      index: r,
      value: n
    }
  }

  function i(e) {
    var t, r;
    try {
      t = new $(e)
    } catch (n) {
      return c.error("WatchedSocket error constructing: " + n)(n), y.reject(n)
    }
    return new y(t, function(e, t) {
      this.id = $.numSocketsAttempted++, c.log("WatchedSocket opening socket " + this.id)(), r = new g.WebcWsOpen;
      var n = new WebSocket(this.url);
      n.binaryType = "arraybuffer", n.onopen = e, n.onclose = n.onerror = function(e) {
        t(new p.SocketError(e))
      }, this.socket = n
    }).cancellable()["catch"](function(e) {
      if (c.error("WatchedSocket error on open of " + this.id + ": " + e, e)(), this.socket) {
        var t = this.socket;
        switch (t.readyState) {
          case WebSocket.OPENING:
            t.onopen = null;
          case WebSocket.OPEN:
            t.onerror = null, t.onclose = null, t.close();
            break;
          case WebSocket.CLOSING:
          case WebSocket.CLOSED:
            t.onerror = null, t.onclose = null
        }
      }
      throw e
    }).then(function(e) {
      c.log("WatchedSocket opened socket " + this.id)(), r.markWebcWsOpenT(), r.commit();
      var t = this.socket;
      return t.onmessage = this._onMessage.bind(this, !0), t.onerror = this._onCloseOrError.bind(this, !0), t.onclose = this._onCloseOrError.bind(this, !1), this._offlineListener = h.waitForOfflineNaive().then(this.close.bind(this, !1, "offline"))["catch"](u["default"].CancellationError, _.noop), this._pingTimer.after(a()), this.state = T.OPEN, this
    })
  }

  function a() {
    return Math.random() * (E - w) + w
  }

  function s() {
    return Math.random() * (N - S) + S
  }
  var d = r(3),
    u = n(d),
    c = r(1),
    l = r(10),
    f = r(49),
    h = r(29),
    p = r(21),
    g = r(45),
    m = r(179),
    v = r(64),
    y = r(39),
    b = 2e4,
    w = 1e4,
    E = 3e4,
    S = 2e4,
    N = 9e4,
    T = {
      OPEN: "open",
      CLOSED: "closed"
    },
    $ = f.extend({
      extraProperties: "reject",
      session: {
        id: "number",
        url: {
          type: "string",
          required: !0,
          allowNull: !1
        },
        onmessage: "function",
        onactivity: "function",
        timeSkew: "number",
        msgParser: "function",
        state: {
          type: "string",
          values: [T.OPEN, T.CLOSED]
        },
        error: "any",
        socket: "object",
        isQueueing: {
          type: "boolean",
          "default": !0
        },
        maxQueueSize: "number",
        messageQueue: "array",
        _offlineListener: "object",
        _msgListeners: "array",
        _pingTimer: "object",
        _killTimer: "object"
      },
      initialize: function() {
        this._msgListeners = [], this.messageQueue = [], this._pingTimer = new v(this, this._ping), this._killTimer = new v(this, this._killSocket)
      },
      _ping: function() {
        this.send("?,,"), this._killTimer.after(s())
      },
      _killSocket: function() {
        c.warn("WatchedSocket " + this.id + " Timeout!")(), this.close(!0, "stale")
      },
      detachCallbacks: function() {
        this.set({
          onactivity: void 0,
          onmessage: void 0
        })
      },
      send: function(e) {
        if ("open" !== this.state) throw new p.SocketNotOpen(this.state);
        try {
          this.socket.send(e)
        } catch (t) {
          c.error("exception sending: " + t)(t), c.error("" + t.stack)(), l.upload("send-exception"), this.close(!0, t)
        }
      },
      cast: function(e) {
        this.send(e)
      },
      partingSend: function(e, t, r) {
        var n = this,
          o = this.socket;
        return new u["default"](function(i) {
          function a() {
            i(void 0)
          }
          o.onclose = a, o.onerror = a, o.onmessage = function(e) {
            var t = e.data;
            r && !r(t) || i(t)
          }, n.send(t), n._onCloseOrError(!1, e)
        }).timeout(b, "paringSendTimeout")["catch"](_.noop)["finally"](function() {
          o.onclose = void 0, o.onerror = void 0, o.onmessage = void 0, o.readyState === WebSocket.OPEN && o.close()
        })
      },
      close: function(e, t) {
        var r, n = this.socket;
        if (this._onCloseOrError(!!e, t || "unspecified"), n && (r = n.readyState, r === WebSocket.OPENING || r === WebSocket.OPEN)) try {
          n.close()
        } catch (o) {
          c.error("WatchedSocket:exception closing: " + o)(o), c.error("" + o.stack)()
        }
      },
      _onMessage: function(e, t) {
        if (e) {
          this._pingTimer.after(a()), this._killTimer.cancel();
          var r = t.data;
          if ("string" == typeof r && "!" === r.charAt(0)) {
            var n = parseInt(t.data.slice(1), 10);
            return n === n && (this.timeSkew = Date.now() - n), void(this.onactivity && this.onactivity())
          }
          this.msgParser && (t = this.msgParser(t)), this.onactivity && this.onactivity(t)
        }
        var i = o(this._msgListeners, function(e) {
          return !e.filter || e.filter(t)
        });
        i ? (this._msgListeners.splice(i.index, 1), i.value.removed = !0, i.value.promise.force(t)) : this.isQueueing ? (c.warn("watchedSocket:enqueued", t)(), this.messageQueue.push(t), void 0 !== this.maxQueueSize && this.messageQueue.length > this.maxQueueSize && this.close(!0, "Queue Overflow")) : this.onmessage ? this.onmessage(t) : c.error("watchedSocket:dropped!", t)()
      },
      _onCloseOrError: function(e, t) {
        if ("closed" !== this.state) {
          this.socket && (this.socket.onclose = void 0, this.socket.onerror = void 0, this.socket.onmessage = void 0), this._offlineListener && this._offlineListener.cancel(), c.warn("Socket " + this.id + " closing: " + t)(), this._pingTimer.cancel(), this._killTimer.cancel(), this.set({
            state: "closed",
            error: e ? t : void 0
          });
          var r = this._msgListeners,
            n = e ? new p.SocketError(t) : new p.SocketClosed(t);
          this._msgListeners = [], _.forEach(r, function(e) {
            e.removed = !0, e.promise.cancel(n)
          })
        }
      },
      holdMessages: function(e) {
        var t = this.isQueueing && void 0 !== e && this.messageQueue > e;
        this.set({
          isQueueing: !0,
          messageQueue: this.messageQueue || [],
          maxQueueSize: e
        }), t && this.close(!0, "Queue Overflow")
      },
      releaseMessages: function(e) {
        if (!this.isQueueing) return void c.error("WatchedSocket:releaseMessages not queued!")();
        var t = this.messageQueue;
        this.set({
          isQueueing: !1,
          messageQueue: void 0
        }), e ? t.length > 0 && c.error("WatchedSocket:releaseMessages dropping " + t.length + " messages.")() : _.forEach(t, function(e) {
          this._onMessage(!1, e)
        }, this)
      },
      nextMessage: function(e) {
        if ("open" !== this.state && "opening" !== this.state) return y.reject(new p.SocketNotOpen(this.state)).cancellable();
        if (e instanceof m && (e = e.test.bind(e)), this.isQueueing) {
          var t;
          if (e) {
            var r = o(this.messageQueue, e);
            r && (t = r.value, this.messageQueue.splice(r.index, 1))
          } else this.messageQueue.length > 0 && (t = this.messageQueue.shift());
          if (t) return y.resolve(t).cancellable()
        }
        var n = (new y).cancellable().forceable(),
          i = {
            removed: !1,
            filter: e,
            promise: n
          };
        return this._msgListeners.push(i), n.bind(this)["catch"](function() {
          i.removed || (this._msgListeners = _.without(this._msgListeners, i))
        }), n
      }
    });
  $.STATE = T, $.open = i, $.numSocketsAttempted = 0, e.exports = $
}, function(e, t, r) {
  var n = r(120);
  e.exports = function(e) {
    return Object(n(e))
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    var t = e.singleByte,
      r = e.doubleByte,
      n = e.nibbleDecode;
    this.readNode = function(e) {
      var t = e.readByte(),
        r = this.readListSize(e, t);
      if (t = e.readByte(), t === o.STREAM_END) throw new Error("unexpected stream end " + e.debugInfo());
      var n = this.readString(e, t);
      if (0 === r || !n) throw new Error("invalid node. 0 list or empty tag" + e.debugInfo());
      var i = r - 2 + r % 2 >> 1,
        a = this.readAttributes(e, i);
      if (r % 2 === 1) return [n, a, void 0];
      var s;
      if (t = e.readByte(), this.isListTag(t)) s = this.readList(e, t);
      else if (t === o.BINARY_8) {
        var d = e.readByte();
        s = e.readBytes(d)
      } else if (t === o.BINARY_20) {
        var u = e.readInt20();
        s = e.readBytes(u)
      } else if (t === o.BINARY_32) {
        var c = e.readInt32();
        s = e.readBytes(c)
      } else s = this.readString(e, t);
      return [n, a, s]
    }, this.isListTag = function(e) {
      return e === o.LIST_EMPTY || e === o.LIST_8 || e === o.LIST_16
    }, this.readListSize = function(e, t) {
      if (t === o.LIST_EMPTY) return 0;
      if (t === o.LIST_8) return e.readByte();
      if (t === o.LIST_16) return e.readInt16();
      throw new Error("invalid list size " + e.debugInfo())
    }, this.readString = function(e, t) {
      if (-1 === t) throw new Error("invalid start token readString" + e.debugInfo());
      if (t > 2 && 236 > t) {
        var r = this.getToken(t);
        return "s.whatsapp.net" === r && (r = "c.us"), r
      }
      switch (t) {
        case o.DICTIONARY_0:
        case o.DICTIONARY_1:
        case o.DICTIONARY_2:
        case o.DICTIONARY_3:
          var n = e.readByte();
          return this.getTokenDouble(t - o.DICTIONARY_0, n);
        case o.LIST_EMPTY:
          return;
        case o.BINARY_8:
          return e.readString(e.readByte());
        case o.BINARY_20:
          return e.readString(e.readInt20());
        case o.BINARY_32:
          return e.readString(e.readInt32());
        case o.JID_PAIR:
          var i = this.readString(e, e.readByte()),
            a = this.readString(e, e.readByte());
          if ("undefined" != typeof i && "undefined" != typeof a) return i + "@" + a;
          if ("undefined" != typeof a) return a;
          throw new Error("invalid jid " + i + "," + a + " " + e.debugInfo());
        case o.NIBBLE_8:
          return this.nibblesToBytes(e);
        default:
          throw new Error("invalid string " + e.debugInfo())
      }
    }, this.getToken = function(e) {
      var r;
      if (e >= 0 && e < t.length && (r = t[e]), "undefined" == typeof r) throw new Error("invalid token " + e);
      return r
    }, this.getTokenDouble = function(e, t) {
      var n, o = 256 * e + t;
      if (o >= 0 && o < r.length && (n = r[o]), "undefined" == typeof n) throw new Error("invalid double byte token " + e + " " + t);
      return n
    }, this.readAttributes = function(e, t) {
      for (var r, n, o = t ? {} : void 0, i = 0; t > i; i++) r = this.readString(e, e.readByte()), n = this.readString(e, e.readByte()), o[r] = n;
      return o
    }, this.readList = function(e, t) {
      for (var r = [], n = this.readListSize(e, t), o = 0; n > o; o++) r.push(this.readNode(e));
      return r
    }, this.nibblesToBytes = function(e) {
      for (var t = e.readByte(), r = t >> 7, n = 127 & t, o = "", i = 0; n > i; i++) {
        var a = e.readByte(),
          s = this.unpackBytePair(a);
        o += s[0], o += s[1]
      }
      return r && (o = o.substring(0, o.length - 1)), o
    }, this.unpackBytePair = function(e) {
      var t = (240 & e) >> 4,
        r = 15 & e;
      if (!n.hasOwnProperty(t)) throw new Error("invalid nibble to unpack: " + t);
      if (!n.hasOwnProperty(r)) throw new Error("invalid nibble to unpack: " + r);
      var o = n[t],
        i = n[r];
      return [o, i]
    }, this.bytesToString = function(e) {
      for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
      return t
    }
  }
  var o = r(176);
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    var t, r = {},
      n = e.nibbleEncode;
    for (t = 0; t < e.singleByte.length; t++) e.singleByte[t] && (r[e.singleByte[t]] = t);
    for (t = 0; t < e.doubleByte.length; t++) e.doubleByte[t] && (r[e.doubleByte[t]] = t + u.SINGLE_BYTE_MAX);
    this.writeNode = function(e, t) {
      if (t) {
        if (3 !== t.length) throw new Error("invalid node");
        var r = t[1] ? 2 * (0, a["default"])(t[1]).filter(function(e) {
          return !!t[1][e]
        }).length : 0;
        this.writeListStart(e, 1 + r + (t[2] ? 1 : 0)), this.writeString(e, t[0]), this.writeAttributes(e, t[1]), this.writeChildren(e, t[2])
      }
    }, this.writeString = function(e, t, n) {
      if ("string" != typeof t) throw new Error("invalid string");
      var o, i, a = r[t];
      if ("c.us" !== t || n)
        if ("undefined" == typeof a) {
          var s = t.indexOf("@");
          if (1 > s) this.writeStringRaw(e, t);
          else {
            var d = t.substring(0, s),
              c = t.substring(s + 1);
            this.writeJid(e, d, c)
          }
        } else {
          if (a < u.SINGLE_BYTE_MAX) this.writeToken(e, a);
          else {
            var l = a - u.SINGLE_BYTE_MAX,
              f = l >> 8;
            switch (i = l % 256, f) {
              case 0:
                o = u.DICTIONARY_0;
                break;
              case 1:
                o = u.DICTIONARY_1;
                break;
              case 2:
                o = u.DICTIONARY_2;
                break;
              case 3:
                o = u.DICTIONARY_3;
                break;
              default:
                throw new Error("double byte dictionary token out of range: " + t + " " + a)
            }
          }
          this.writeToken(e, o), this.writeToken(e, i)
        }
      else this.writeToken(e, r["s.whatsapp.net"])
    }, this.writeStringRaw = function(e, t) {
      var r = d.calculateUTF8Bytes(t);
      if (r >= 4294967296) throw new Error("string too large to encode (len = " + r + "): " + t);
      r >= 1 << 20 ? (e.pushByte(u.BINARY_32), e.pushInt32(r)) : r >= 256 ? (e.pushByte(u.BINARY_20), e.pushInt20(r)) : (e.pushByte(u.BINARY_8), e.pushByte(r)), e.pushString(t)
    }, this.writeJid = function(e, t, r) {
      if (e.pushByte(u.JID_PAIR), t) try {
        this.writeNibbles(e, t)
      } catch (n) {
        s.warnVerbose("writer:encode-fallback " + n.message, t)(), this.writeString(e, t)
      } else this.writeToken(e, u.LIST_EMPTY);
      this.writeString(e, r)
    }, this.writeToken = function(e, t) {
      if (245 > t) e.pushByte(t);
      else if (500 >= t) throw new Error("invalid token")
    }, this.writeAttributes = function(e, t) {
      if (t)
        for (var r in t) t[r] && (this.writeString(e, r), this.writeString(e, t[r]))
    }, this.writeChildren = function(e, t) {
      var r;
      if (t)
        if ("string" == typeof t) this.writeString(e, t, !0);
        else if (d.isByteBuffer(t)) {
        if (r = t.limit, r >= 4294967296) throw new Error("invalid children; too long (len = " + r);
        r >= 1 << 20 ? (e.pushByte(u.BINARY_32), e.pushInt32(r)) : r >= 256 ? (e.pushByte(u.BINARY_20), e.pushInt20(r)) : (e.pushByte(u.BINARY_8), e.pushByte(r)), e.pushBytes(t)
      } else {
        if (!_.isArray(t)) throw new Error("invalid children");
        r = t.length, this.writeListStart(e, r);
        for (var n = 0; r > n; n++) this.writeNode(e, t[n])
      }
    }, this.writeListStart = function(e, t) {
      0 === t ? e.pushByte(u.LIST_EMPTY) : 256 > t ? (e.pushByte(u.LIST_8), e.pushByte(t)) : (e.pushByte(u.LIST_16), e.pushInt16(t))
    }, this.writeNibbles = function(e, t) {
      var r = d.calculateUTF8Bytes(t);
      if (r > u.NIBBLE_MAX) throw new Error("too many bytes to nibble-encode: len = " + r);
      var n, o = Math.ceil(r / 2),
        i = [],
        a = 0;
      r % 2 > 0 && (a = 128);
      var s = a | o;
      i.push(u.NIBBLE_8), i.push(s);
      for (var c = Math.floor(r / 2), l = 0; c > l; l++) n = this.packBytePair(t[2 * l], t[2 * l + 1]), i.push(n);
      a > 0 && (n = this.packBytePair(t[r - 1], "\x00"), i.push(n));
      var f = new Uint8Array(i);
      e.pushUint8Array(f)
    }, this.packBytePair = function(e, t) {
      if (!n.hasOwnProperty(e)) throw new Error("invalid byte to nibble-pack: " + e);
      if (!n.hasOwnProperty(t)) throw new Error("invalid byte to nibble-pack: " + t);
      var r = n[e],
        o = n[t];
      return r << 4 | o
    }
  }
  var i = r(68),
    a = n(i),
    s = r(1),
    d = r(9),
    u = r(176);
  e.exports = o
}, function(e, t, r) {
  "use strict";

  function n(e) {
    var t = e.singleByte,
      r = e.doubleByte,
      n = e.nibbleDecode;
    this.readNode = function(e) {
      var t = e.readByte(),
        r = this.readListSize(e, t);
      if (t = e.readByte(), t === o.STREAM_END) throw new Error("unexpected stream end " + e.debugInfo());
      var n = this.readString(e, t);
      if (0 === r || !n) throw new Error("invalid node. 0 list or empty tag" + e.debugInfo());
      var i = r - 2 + r % 2 >> 1,
        a = this.readAttributes(e, i);
      if (r % 2 === 1) return [n, a, void 0];
      var s;
      if (t = e.readByte(), this.isListTag(t)) s = this.readList(e, t);
      else if (t === o.BINARY_8) {
        var d = e.readByte();
        s = e.readBytes(d)
      } else if (t === o.BINARY_20) {
        var u = e.readInt20();
        s = e.readBytes(u)
      } else if (t === o.BINARY_32) {
        var c = e.readInt32();
        s = e.readBytes(c)
      } else s = this.readString(e, t);
      return [n, a, s]
    }, this.isListTag = function(e) {
      return e === o.LIST_EMPTY || e === o.LIST_8 || e === o.LIST_16
    }, this.readListSize = function(e, t) {
      if (t === o.LIST_EMPTY) return 0;
      if (t === o.LIST_8) return e.readByte();
      if (t === o.LIST_16) return e.readInt16();
      throw new Error("invalid list size " + e.debugInfo())
    }, this.readString = function(e, t) {
      if (-1 === t) throw new Error("invalid start token readString" + e.debugInfo());
      if (t > 2 && 236 > t) {
        var r = this.getToken(t);
        return "s.whatsapp.net" === r && (r = "c.us"), r
      }
      switch (t) {
        case o.DICTIONARY_0:
        case o.DICTIONARY_1:
        case o.DICTIONARY_2:
        case o.DICTIONARY_3:
          var n = e.readByte();
          return this.getTokenDouble(t - o.DICTIONARY_0, n);
        case o.LIST_EMPTY:
          return;
        case o.BINARY_8:
          return e.readString(e.readByte());
        case o.BINARY_20:
          return e.readString(e.readInt20());
        case o.BINARY_32:
          return e.readString(e.readInt32());
        case o.JID_PAIR:
          var i = this.readString(e, e.readByte()),
            a = this.readString(e, e.readByte());
          if ("undefined" != typeof i && "undefined" != typeof a) return i + "@" + a;
          if ("undefined" != typeof a) return a;
          throw new Error("invalid jid " + i + "," + a + " " + e.debugInfo());
        case o.NIBBLE_8:
        case o.HEX_8:
          return this.readPacked8(t, e);
        default:
          throw new Error("invalid string " + e.debugInfo())
      }
    }, this.getToken = function(e) {
      var r;
      if (e >= 0 && e < t.length && (r = t[e]), "undefined" == typeof r) throw new Error("invalid token " + e);
      return r
    }, this.getTokenDouble = function(e, t) {
      var n, o = 256 * e + t;
      if (o >= 0 && o < r.length && (n = r[o]), "undefined" == typeof n) throw new Error("invalid double byte token " + e + " " + t);
      return n
    }, this.readAttributes = function(e, t) {
      for (var r, n, o = t ? {} : void 0, i = 0; t > i; i++) r = this.readString(e, e.readByte()), n = this.readString(e, e.readByte()), o[r] = n;
      return o
    }, this.readList = function(e, t) {
      for (var r = [], n = this.readListSize(e, t), o = 0; n > o; o++) r.push(this.readNode(e));
      return r
    }, this.readPacked8 = function(e, t) {
      for (var r = t.readByte(), n = r >> 7, o = 127 & r, i = "", a = 0; o > a; a++) {
        var s = t.readByte();
        i += this.unpackByte(e, (240 & s) >> 4), i += this.unpackByte(e, 15 & s)
      }
      return n && (i = i.substring(0, i.length - 1)), i
    }, this.unpackByte = function(e, t) {
      switch (e) {
        case o.NIBBLE_8:
          return this.unpackNibble(t);
        case o.HEX_8:
          return this.unpackHex(t);
        default:
          throw new Error("unpack non-nibble/hex type: " + e)
      }
    }, this.unpackNibble = function(e) {
      if (!n.hasOwnProperty(e)) throw new Error("invalid nibble to unpack: " + e);
      return n[e]
    }, this.unpackHex = function(e) {
      if (e >= 0 && 15 >= e) return e.toString(16).toUpperCase();
      throw new Error("invalid hex to unpack: " + e)
    }
  }
  var o = r(178);
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    var t, r = {},
      n = e.nibbleEncode;
    for (t = 0; t < e.singleByte.length; t++) e.singleByte[t] && (r[e.singleByte[t]] = t);
    for (t = 0; t < e.doubleByte.length; t++) e.doubleByte[t] && (r[e.doubleByte[t]] = t + u.SINGLE_BYTE_MAX);
    this.writeNode = function(e, t) {
      if (t) {
        if (3 !== t.length) throw new Error("invalid node");
        var r = t[1] ? 2 * (0, a["default"])(t[1]).filter(function(e) {
          return !!t[1][e]
        }).length : 0;
        this.writeListStart(e, 1 + r + (t[2] ? 1 : 0)), this.writeString(e, t[0]), this.writeAttributes(e, t[1]), this.writeChildren(e, t[2])
      }
    }, this.writeString = function(e, t, n) {
      if ("string" != typeof t) throw new Error("invalid string");
      var o, i, a = r[t];
      if ("c.us" !== t || n)
        if ("undefined" == typeof a) {
          var s = t.indexOf("@");
          if (1 > s) this.writeStringRaw(e, t);
          else {
            var d = t.substring(0, s),
              c = t.substring(s + 1);
            this.writeJid(e, d, c)
          }
        } else {
          if (a < u.SINGLE_BYTE_MAX) this.writeToken(e, a);
          else {
            var l = a - u.SINGLE_BYTE_MAX,
              f = l >> 8;
            switch (i = l % 256, f) {
              case 0:
                o = u.DICTIONARY_0;
                break;
              case 1:
                o = u.DICTIONARY_1;
                break;
              case 2:
                o = u.DICTIONARY_2;
                break;
              case 3:
                o = u.DICTIONARY_3;
                break;
              default:
                throw new Error("double byte dictionary token out of range: " + t + " " + a)
            }
          }
          this.writeToken(e, o), this.writeToken(e, i)
        }
      else this.writeToken(e, r["s.whatsapp.net"])
    }, this.writeStringRaw = function(e, t) {
      var r = d.calculateUTF8Bytes(t);
      if (r >= 4294967296) throw new Error("string too large to encode (len = " + r + "): " + t);
      r >= 1 << 20 ? (e.pushByte(u.BINARY_32), e.pushInt32(r)) : r >= 256 ? (e.pushByte(u.BINARY_20), e.pushInt20(r)) : (e.pushByte(u.BINARY_8), e.pushByte(r)), e.pushString(t)
    }, this.writeJid = function(e, t, r) {
      if (e.pushByte(u.JID_PAIR), t) try {
        this.writePackedBytes(e, t)
      } catch (n) {
        s.warnVerbose("writer:encode-fallback " + n.message, t)(), this.writeString(e, t)
      } else this.writeToken(e, u.LIST_EMPTY);
      this.writeString(e, r)
    }, this.writeToken = function(e, t) {
      if (245 > t) e.pushByte(t);
      else if (500 >= t) throw new Error("invalid token")
    }, this.writeAttributes = function(e, t) {
      if (t)
        for (var r in t) t[r] && (this.writeString(e, r), this.writeString(e, t[r]))
    }, this.writeChildren = function(e, t) {
      var r;
      if (t)
        if ("string" == typeof t) this.writeString(e, t, !0);
        else if (d.isByteBuffer(t)) {
        if (r = t.limit, r >= 4294967296) throw new Error("invalid children; too long (len = " + r);
        r >= 1 << 20 ? (e.pushByte(u.BINARY_32), e.pushInt32(r)) : r >= 256 ? (e.pushByte(u.BINARY_20), e.pushInt20(r)) : (e.pushByte(u.BINARY_8), e.pushByte(r)), e.pushBytes(t)
      } else {
        if (!_.isArray(t)) throw new Error("invalid children");
        r = t.length, this.writeListStart(e, r);
        for (var n = 0; r > n; n++) this.writeNode(e, t[n])
      }
    }, this.writeListStart = function(e, t) {
      0 === t ? e.pushByte(u.LIST_EMPTY) : 256 > t ? (e.pushByte(u.LIST_8), e.pushByte(t)) : (e.pushByte(u.LIST_16), e.pushInt16(t))
    }, this.writePackedBytes = function(e, t) {
      try {
        this.writePackedBytesImpl(e, t, u.NIBBLE_8)
      } catch (r) {
        s.warn("writer:enc nib fail, try hex " + r.message, t)(), this.writePackedBytesImpl(e, t, u.HEX_8)
      }
    }, this.writePackedBytesImpl = function(e, t, r) {
      var n = d.calculateUTF8Bytes(t);
      if (n > u.PACKED_MAX) throw new Error("too many bytes to nibble-encode: len = " + n);
      var o, i = Math.ceil(n / 2),
        a = [],
        s = 0;
      n % 2 > 0 && (s = 128);
      var c = s | i;
      a.push(r), a.push(c);
      for (var l = Math.floor(n / 2), f = 0; l > f; f++) o = this.packBytePair(r, t[2 * f], t[2 * f + 1]), a.push(o);
      s > 0 && (o = this.packBytePair(r, t[n - 1], "\x00"), a.push(o));
      var h = new Uint8Array(a);
      e.pushUint8Array(h)
    }, this.packBytePair = function(e, t, r) {
      var n, o;
      switch (e) {
        case u.NIBBLE_8:
          n = this.packNibble(t), o = this.packNibble(r);
          break;
        case u.HEX_8:
          n = this.packHex(t), o = this.packHex(r);
          break;
        default:
          throw new Error("invalid byte pack type: " + e)
      }
      return n << 4 | o
    }, this.packNibble = function(e) {
      if (!n.hasOwnProperty(e)) throw new Error("invalid byte to nibble-pack: " + e);
      return n[e]
    }, this.packHex = function(e) {
      switch (e) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "F":
          return parseInt(e, 16);
        case "\x00":
          return 15;
        default:
          throw new Error("packHex:invalid byte: " + e)
      }
    }
  }
  var i = r(68),
    a = n(i),
    s = r(1),
    d = r(9),
    u = r(178);
  e.exports = o
}, function(e, t, r) {
  "use strict";
  var n = r(49),
    o = r(7),
    i = r(1),
    a = r(29),
    s = n.extend({
      session: {
        online: {
          type: "boolean",
          "default": !0
        },
        _onlineCheck: "object"
      },
      initialize: function() {
        this.listenTo(this, "change:online", function() {
          i.log("NetworkStatus " + (this.online ? "online" : "offline"))()
        })
      },
      checkOnline: function() {
        return this._onlineCheck && this._onlineCheck.isPending() ? this._onlineCheck : (i.log("NetworkStatus:checkOnline checking")(), this._onlineCheck = a.getResponseIfOnline(o.STATUS_URL).bind(this).then(function(e) {
          var t = !!e;
          i.log("NetworkStatus:checkOnline response " + t)(), this.online = t, this._onlineCheck = null
        })["catch"](function(e) {
          i.error("NetworkStatus:checkOnline errored! " + e)(e), this._onlineCheck = null
        }), this._onlineCheck)
      }
    });
  e.exports = new s
}, , function(e, t) {
  e.exports = function(e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");
    return e
  }
}, function(e, t) {
  e.exports = function(e) {
    if (void 0 == e) throw TypeError("Can't call method on  " + e);
    return e
  }
}, function(e, t) {
  var r = {}.hasOwnProperty;
  e.exports = function(e, t) {
    return r.call(e, t)
  }
}, function(e, t, r) {
  var n = r(11),
    o = r(125);
  e.exports = r(88) ? function(e, t, r) {
    return n.setDesc(e, t, o(1, r))
  } : function(e, t, r) {
    return e[t] = r, e
  }
}, function(e, t) {
  e.exports = !0
}, function(e, t, r) {
  var n = r(46),
    o = r(19),
    i = r(89);
  e.exports = function(e, t) {
    var r = (o.Object || {})[e] || Object[e],
      a = {};
    a[e] = t(r), n(n.S + n.F * i(function() {
      r(1)
    }), "Object", a)
  }
}, function(e, t) {
  e.exports = function(e, t) {
    return {
      enumerable: !(1 & e),
      configurable: !(2 & e),
      writable: !(4 & e),
      value: t
    }
  }
}, function(e, t, r) {
  e.exports = r(122)
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t) {
  "use strict";

  function r(e) {
    m = e
  }

  function n(e) {
    v = e, y = Math.round(e / 1e3)
  }

  function o(e) {
    return void 0 !== e ? e + y : Math.floor(Date.now() / 1e3)
  }

  function i(e) {
    return void 0 !== e ? e - y : Math.floor((Date.now() - v) / 1e3)
  }

  function a(e) {
    return moment.unix(e).format(m ? "HH:mm" : "LT")
  }

  function s(e) {
    return moment.unix(e).format("l")
  }

  function d(e, t) {
    var r = moment().startOf("day"),
      n = moment.unix(e).startOf("day"),
      o = r.diff(n, "days"),
      i = t && a(e);
    if (0 === o) return t ? l10n.t("web_today_at", {
      time: i
    }) : l10n.t("web_today");
    if (1 === o) return t ? l10n.t("web_yesterday_at", {
      time: i
    }) : l10n.t("web_yesterday");
    if (!t && 6 > o) return moment.unix(e).format("dddd");
    var d = s(e);
    return t ? l10n.t("web_time_at", {
      date: d,
      time: i
    }) : d
  }

  function u(e) {
    var t = e + y;
    return t >= moment().startOf("day").unix() ? a(t) : d(t, !1)
  }

  function c(e) {
    return d(e + y, !1)
  }

  function l(e) {
    return d(e + y, !0)
  }

  function f(e) {
    return moment.unix(e + y).format(m ? "HH:mm, l" : "LT, l")
  }

  function h(e) {
    return a(e + y)
  }

  function p(e) {
    var t = e + y,
      r = a(t),
      n = moment.unix(t).startOf("day");
    switch (moment().startOf("day").diff(n, "days")) {
      case 0:
        return l10n.t("web_conversation_last_seen_today", {
          time: r
        });
      case 1:
        return l10n.t("web_conversation_last_seen_yesterday", {
          time: r
        });
      default:
        var o = d(t, !1);
        return l10n.t("web_conversation_last_seen_date", {
          date: o,
          time: r
        })
    }
  }

  function g(e) {
    var t = moment.utc(1e3 * e);
    return t.isValid() ? t.format("m:ss") : ""
  }

  function _(e) {
    var t = e.startOfDaySkew;
    return void 0 !== t && t > y - 30 && y + 30 > t ? e.startOfDay : (e.startOfDaySkew = y, e.startOfDay = moment.unix(e.t + y).startOf("day").unix())
  }
  var m = !1,
    v = 0,
    y = 0;
  e.exports = {
    setIs24Hour: r,
    setSkew: n,
    localUnixTime: o,
    globalUnixTime: i,
    relativeStr: u,
    relativeDateStr: c,
    relativeDateAndTimeStr: l,
    timeStr: f,
    timestampStr: h,
    lastSeenStr: p,
    durationStr: g,
    dayOfMsg: _
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(81),
    i = n(o),
    a = {
      getInitialState: function() {
        return this._timer_mixin_timers = {}, this._timer_mixin_seq = 0, {}
      },
      componentWillUnmount: function() {
        var e = this._timer_mixin_timers;
        e && _.values(e).forEach(function(e) {
          e()
        })
      },
      safeIsMounted: function() {
        return this.isMounted() && "UNMOUNTING" !== this._compositeLifeCycleState
      },
      safeInterval: function(e, t) {
        e = e.bind === (0, i["default"])(e).bind ? e.bind(this) : e;
        var r = setInterval(e, t);
        return this._regTimer(clearInterval.bind(void 0, r))
      },
      safeDelay: function() {
        var e, t = _.toArray(arguments),
          r = t.shift(),
          n = t.shift(),
          o = _.delay(function(n) {
            delete n._timer_mixin_timers[e], r.apply(n, t)
          }, n, this);
        return e = this._regTimer(clearTimeout.bind(void 0, o))
      },
      safeDefer: function() {
        var e, t = _.toArray(arguments),
          r = t.shift(),
          n = _.defer(function(n) {
            delete n._timer_mixin_timers[e], r.apply(n, t)
          }, this);
        return e = this._regTimer(clearTimeout.bind(void 0, n))
      },
      safeDebounce: function(e, t, r) {
        var n, o = this,
          i = this._timer_mixin_timers,
          a = function() {
            delete i[n], e()
          },
          s = _.debounce(a, t, r);
        return function() {
          n && delete i[n], s(), n = o._regTimer(s.cancel)
        }
      },
      clearSafeTimeout: function(e) {
        var t = this._timer_mixin_timers[e];
        t && t()
      },
      clearSafeInterval: function(e) {
        return this.clearSafeTimeout(e)
      },
      _regTimer: function(e) {
        var t = this._timer_mixin_timers,
          r = ++this._timer_mixin_seq;
        return t[r] = function() {
          delete t[r], e()
        }, r
      }
    };
  e.exports = a
}, , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(162),
    i = n(o),
    a = r(354),
    s = n(a),
    d = r(6),
    u = r(43),
    c = 20,
    l = d.createClass({
      displayName: "Spinner",
      propTypes: {
        size: d.PropTypes.number.isRequired,
        stroke: d.PropTypes.number.isRequired
      },
      getDefaultProps: function() {
        return {
          size: 65,
          stroke: 4
        }
      },
      shouldComponentUpdate: function(e, t) {
        return !1
      },
      render: function() {
        var e = this.props,
          t = e.size,
          r = e.stroke,
          n = e.className,
          o = (0, s["default"])(e, ["size", "stroke", "className"]),
          a = {
            width: t,
            height: t
          },
          l = 2 * c + r,
          f = "0 0 " + l + " " + l;
        return d.createElement("svg", (0, i["default"])({
          className: u("spinner-container", n),
          style: a,
          viewBox: f
        }, o), d.createElement("circle", {
          className: "path",
          cx: l / 2,
          cy: l / 2,
          r: c,
          fill: "none",
          strokeWidth: r
        }))
      }
    });
  e.exports = l
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(6),
    s = r(1),
    d = r(22),
    u = r(171),
    c = r(62),
    l = r(35),
    f = r(361),
    h = r(365),
    p = r(8),
    g = r(83),
    m = r(164),
    v = r(21),
    y = {
      ptt: 0,
      audio: 0,
      image: 1,
      location: 2,
      url: 3,
      video: 4,
      document: 5
    },
    b = {
      NONE: 0,
      ALLOW: 1,
      DISABLE: 2,
      UPGRADE: 3,
      FORWARD: 4
    },
    w = c.extend({
      Collection: "Contact",
      props: {
        id: "string",
        name: "string",
        shortName: "string",
        type: {
          type: "string",
          values: ["in", "out"],
          "default": "in"
        },
        plaintextDisabled: "boolean"
      },
      session: {
        pendingAction: "number",
        checked: "boolean",
        notifyName: {
          type: "any",
          "default": null
        },
        _capabilities: "object",
        _capabilitiesPromise: "object"
      },
      derived: {
        userid: {
          fn: function() {
            return this.isUser ? d.user(this.id) : null
          }
        },
        searchName: {
          deps: ["name"],
          fn: function() {
            return this.name ? l10n.accentFold(this.name) : null
          }
        },
        header: {
          deps: ["name"],
          fn: function() {
            if (this.name) {
              var e = this.name.charAt(0).toLowerCase();
              if (u.alpha.test(e)) {
                var t = l10n.removeAccents(e);
                return w.Collator.compare(t, e) ? e : t
              }
              return "#"
            }
          }
        },
        isMe: {
          fn: function() {
            return Store.Conn.me === this.id
          }
        },
        isUser: {
          fn: function() {
            return d.isUser(this.id)
          }
        },
        isGroup: {
          fn: function() {
            return d.isGroup(this.id)
          }
        },
        isBroadcast: {
          fn: function() {
            return d.isBroadcast(this.id)
          }
        },
        formattedShortNameWithNonBreakingSpaces: {
          deps: ["shortName", "formattedName", "id"],
          fn: function() {
            return this.id ? this.isMe ? l10n.t("web_you") : this.shortName || this.formattedName.replace(/\s/g, " ") : void 0
          }
        },
        formattedShortName: {
          deps: ["shortName", "formattedName", "id"],
          fn: function() {
            return this.id ? this.isMe ? l10n.t("web_you") : this.shortName || this.formattedName : void 0
          }
        },
        formattedName: {
          deps: ["name", "id"],
          fn: function() {
            if (this.id) {
              if (this.isMe) return l10n.t("web_you");
              var e;
              return this.name || (e = l10n.isRTL() ? l10n.embedLTR(d.formattedUser(this.id)) : d.formattedUser(this.id)), this.name || e
            }
          }
        },
        formattedUser: {
          deps: ["name", "id"],
          fn: function() {
            return this.id ? this.name ? this.name : l10n.isRTL() ? l10n.embedLTR(d.formattedUser(this.id)) : d.formattedUser(this.id) : void 0
          }
        },
        isWAContact: {
          deps: ["type"],
          fn: function() {
            return this.isUser && "in" === this.type
          }
        },
        isMyContact: {
          deps: ["name"],
          fn: function() {
            return !!(this.isUser && this.name && this.name.length)
          }
        },
        capabilities: {
          cache: !1,
          fn: function() {
            var e = this;
            return _.isObject(this._capabilities) ? i["default"].resolve(this._capabilities) : this._capabilitiesPromise ? this._capabilitiesPromise : this.isUser ? this._capabilitiesPromise = l.getCapabilities([this.id]).then(function(t) {
              if (200 === t.status) {
                var r = e._capabilities = t[e.id];
                return r ? (r.jid = e.id, r) : i["default"].reject(new v.CapabilityUnknown(e.id))
              }
              return i["default"].reject(new v.CapabilityUnknown(e.id + " status:" + t.status))
            })["finally"](function() {
              return e._capabilitiesPromise = void 0
            }) : this.isGroup || this.isBroadcast ? this._capabilitiesPromise = Store.GroupMetadata.find(this.id).then(function(e) {
              return e.participants.map(function(e) {
                return e.id
              })
            }).then(function(t) {
              return t.filter(d.isUser).length === t.length ? i["default"].all(t.map(function(e) {
                return Store.Contact.get(e).capabilities
              })).then(function(t) {
                return e._capabilities = t
              }) : i["default"].reject(new v.CapabilityInvalid("assertion fail: not all users: " + e.id))
            })["finally"](function() {
              return e._capabilitiesPromise = void 0
            }) : i["default"].reject(new v.CapabilityInvalid("unknown contact type: " + this.id))
          }
        }
      },
      children: {
        status: f,
        profilePicThumb: h
      },
      initialize: function() {
        this.id && (this.status = Store.Status.gadd(this.id), this.listenTo(this.status, "all", this._getEventBubblingHandler("status")), this.listenTo(p, "locale_change", function() {
          this.trigger("change:name", this, this.name)
        }), this.profilePicThumb = Store.ProfilePicThumb.gadd(this.id), this.listenTo(this.profilePicThumb, "all", this._getEventBubblingHandler("profilePicThumb")), this.pendingAction = 0, this.listenTo(this, "change:pendingAction", this.onPendingActionUpdate))
      },
      onPendingActionUpdate: function() {
        this.pendingAction < 0 && (s.log("contact:onPendingActionUpdate pendingAction value is invalid")(), this.pendingAction = 0)
      },
      canBlock: function() {
        return g.supportsFeature(g.F.SET_BLOCK)
      },
      setBlock: function(e) {
        var t = this;
        if (e && Store.Blocklist.get(this.id)) return i["default"].resolve();
        if (!e && !Store.Blocklist.get(this.id)) return i["default"].resolve();
        var r = l.sendSetBlock(e, [{
            jid: this.id
          }]),
          n = e ? l10n.t("action_blocking", {
            participant: this.formattedName
          }) : l10n.t("action_unblocking", {
            participant: this.formattedName
          }),
          o = r.bind(this)["catch"](function(t) {
            s.error("models:contact:setBlock dropped")(t);
            var r = e ? l10n.t("action_block_failed", {
              participant: this.formattedName
            }) : l10n.t("action_unblock_failed", {
              participant: this.formattedName
            });
            return i["default"].reject(r)
          }).then(function(r) {
            if (200 === r.status) return e ? l10n.t("action_blocked", {
              participant: t.formattedName
            }) : l10n.t("action_unblocked", {
              participant: t.formattedName
            });
            if (r.status >= 400) {
              var n = e ? l10n.t("action_block_failed", {
                participant: t.formattedName
              }) : l10n.t("action_unblock_failed", {
                participant: t.formattedName
              });
              return i["default"].reject(n)
            }
          });
        return p.openToast(a.createElement(m, {
          id: m.genId(),
          pendingText: n,
          actionText: o,
          retry: this.setBlock.bind(this, e)
        })), r.bind(this).then(function(r) {
          200 !== r.status || r._duplicate || (e ? Store.Blocklist.add({
            id: t.id
          }) : Store.Blocklist.remove(t.id))
        })
      },
      isBlocked: function() {
        return !!Store.Blocklist.get(this.id)
      },
      findCommonGroups: function() {
        var e = this.id;
        return new i["default"](function(t, r) {
          l.commonGroupsFind(e).then(function(e) {
            if (200 === e.status) {
              var n = e.groups.map(function(e) {
                return Store.Chat.get(e)
              });
              t(n)
            } else s.error("models:Contact:findCommonGroups error: " + e.status)(), r(new Error("models:Contact:findCommonGroups error: " + e.status))
          })
        })
      },
      searchMatch: function(e) {
        return this.searchName ? this.searchName.indexOf(e) > -1 : e && this.userid ? this.userid.indexOf(e) > -1 : !1
      },
      canSendEncryptedMedia: function(e, t) {
        var r = this,
          n = y[e];
        return "undefined" != typeof n ? this.capabilities.then(function(e) {
          return _.flatten([e])
        }).then(function(o) {
          return o.length > 0 ? o.reduce(function(e, t) {
            return e && t[n] === b.ALLOW
          }, !0) || i["default"].reject(new v.CapabilityUnsupported(r.id + " " + e, t ? _.zipObject(o.filter(function(e) {
            return e[n] !== b.ALLOW
          }).map(function(e) {
            return [e.jid, e[n]]
          })) : void 0)) : i["default"].reject(new v.CapabilityUnknown("no caps"))
        }) : i["default"].reject(new v.CapabilityInvalid(e))
      }
    });
  w.setCollator = function(e) {
    w.Collator = window.Intl ? window.Intl.Collator([e], {
      sensitivity: "base"
    }) : {
      compare: function(e, t) {
        return e.localeCompare(t)
      }
    }
  }, w.Comparator = function(e, t) {
    var r = e.id,
      n = t.id;
    if (r === Store.Conn.me) return 1;
    if (n === Store.Conn.me) return -1;
    var o = e.name,
      i = t.name;
    if (!o && i) return 1;
    if (o && !i) return -1;
    if (o && i) {
      var a = w.Collator.compare(e.header, t.header);
      return 0 === a ? w.Collator.compare(o, i) : a
    }
    return r && n ? r.localeCompare(n) : -1
  }, e.exports = w
}, , function(e, t, r) {
  "use strict";
  var n = r(82),
    o = {
      uimPush: function(e, t, r) {
        n.push(e, t, r), this._uim = this._uim || [], this._uim.push({
          component: e,
          type: t
        })
      },
      uimPop: function(e) {
        n.pop(e), this._uim && (this._uim = _.reject(this._uim, {
          type: e
        }))
      },
      componentWillUnmount: function() {
        if (this._uim)
          for (var e; e = this._uim.shift();) n.pop(e.type), n.popDependents(e.component)
      }
    };
  e.exports = o
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(6),
    s = r(8),
    d = r(158),
    u = r(43),
    c = 3e3,
    l = {
      PENDING: 0,
      SUCCESS: 1,
      FAILURE: -1
    },
    f = a.createClass({
      displayName: "ActionToast",
      mixins: [d],
      propTypes: {
        id: a.PropTypes.string.isRequired,
        pendingText: a.PropTypes.string.isRequired,
        actionText: a.PropTypes.instanceOf(i["default"]).isRequired,
        retry: a.PropTypes.func
      },
      statics: {
        genId: function(e) {
          return _.uniqueId(e || "action_toast")
        }
      },
      getInitialState: function() {
        return {
          text: this.props.pendingText,
          state: l.PENDING
        }
      },
      componentWillMount: function() {
        this.props.actionText.bind(this).then(function(e) {
          this.setState({
            text: e,
            state: l.SUCCESS
          })
        })["catch"](function(e) {
          this.setState({
            text: e,
            state: l.FAILURE
          })
        })["finally"](function() {
          this.safeDelay(function() {
            this.isMounted() && s.closeToast(this)
          }, c)
        })
      },
      onDismiss: function() {
        s.closeToast(this)
      },
      render: function() {
        var e, t, r = this.props,
          n = r.retry,
          o = r.className;
        return this.state.state === l.FAILURE && n.retry && (t = a.createElement("button", {
          className: "action",
          onClick: n.retry
        }, l10n.t("action_try_again"))), this.state.state === l.SUCCESS && (e = a.createElement("button", {
          className: "icon icon-x-alt",
          onClick: this.onDismiss
        })), a.createElement("div", {
          className: u("toast", o)
        }, a.createElement("span", null, this.state.text), t, e)
      }
    });
  e.exports = f
}, function(e, t, r) {
  "use strict";

  function n(e) {
    this._alarms = {}, this._initialize(e)
  }
  var o = r(1),
    i = 1e4,
    a = 3e3,
    s = Math.pow(2, 31) - 1,
    d = r(8);
  n.prototype._initialize = function(e) {
    var t, r, n, i = this;
    t = window.performance.now(), window.setInterval(function() {
      r = window.performance.now(), n = Math.abs(r - t - e), n > a && (_.isEmpty(i._alarms) || i._validateTimeouts(), o.log("Alarm:validate js halt detected.")(), d.jsHaltDetected(n)), t = r
    }, e)
  }, n.prototype._validateTimeouts = function() {
    var e = this;
    _.forEach(_.keys(this._alarms), function(t) {
      var r = e._alarms[t];
      r && (r.expiration < Date.now() ? (e.clearTimeout(t), r.fn()) : e.setTimeout(r.fn, r.expiration, t, !0))
    })
  }, n.prototype.setTimeout = function(e, t, r, n) {
    var i = this;
    r && this.clearTimeout(r), r = r || _.uniqueId("alarm_timer_");
    var d = t - Date.now(),
      u = Math.min(d, s);
    if (0 > d) return o.log("Alarm:setTimeout:Cannot set alarm in the past.")(), e(), r;
    var c = window.setTimeout(function() {
      t - Date.now() < a ? (delete i._alarms[r], e()) : i.setTimeout(e, t, r)
    }, u);
    return this._alarms[r] = {
      fn: e,
      expiration: t,
      timeoutId: c
    }, n || o.log("Alarm:setTimeout:" + r + " set", this._alarms[r])(), r
  }, n.prototype.clearTimeout = function(e) {
    var t = this._alarms[e];
    t && (window.clearTimeout(t.timeoutId), delete this._alarms[e])
  }, e.exports = new n(i)
}, function(e, t) {
  "use strict";
  var r = "animation",
    n = "transition",
    o = {
      _normalize: function(e, t, r) {
        var n = e.toLowerCase().indexOf(t),
          o = e.slice(0, n).toLowerCase();
        return 0 === e.indexOf(t) ? o + e.slice(n) + r.toLowerCase() : o + e.slice(n) + r
      },
      prefix: function(e, t) {
        var o;
        return 0 === e.indexOf(r) ? (o = e.substring(r.length), this._normalize(window.Modernizr.prefixed(r), r, o)) : 0 === e.indexOf(n) ? (o = e.substring(n.length), this._normalize(window.Modernizr.prefixed(n), n, o)) : window.Modernizr.prefixed(e, t, !1) || e
      }
    };
  e.exports = o
}, , , function(e, t, r) {
  "use strict";

  function n() {
    var e = this.phone || {};
    e.mcc && "string" == typeof e.mcc && (e.mcc = parseInt(e.mcc, 10)), e.mnc && "string" == typeof e.mnc && (e.mnc = parseInt(e.mnc, 10)), a.Global.set({
      mcc: e.mcc || null,
      mnc: e.mnc || null,
      webcPhoneDeviceManufacturer: e.device_manufacturer || null,
      webcPhoneDeviceModel: e.device_model || null,
      webcPhoneOsBuildNumber: e.os_build_number || null,
      webcPhoneOsVersion: e.os_version || null
    })
  }
  var o = r(62),
    i = r(15),
    a = r(45),
    s = r(1),
    d = r(55),
    u = r(35),
    c = r(83),
    l = r(157),
    f = r(16),
    h = {
      ANDROID: "android",
      BB: "bb",
      BBX: "bbx",
      IPAD: "ipad",
      IPHONE: "iphone",
      IPOD: "ipod",
      S40: "s40",
      SYMBIAN: "symbian",
      WP7: "wp7"
    },
    p = o.extend({
      props: {
        id: "number",
        ref: "string",
        refTTL: "number",
        refId: "number",
        wid: "string",
        connected: "boolean",
        me: "string",
        clientToken: "string",
        serverToken: "string",
        secret: "string",
        isResponse: "string",
        battery: "number",
        plugged: "boolean",
        lc: "string",
        lg: "string",
        is24h: "boolean",
        platform: "string",
        phone: "object",
        tos: "number"
      },
      derived: {
        refExpiry: {
          deps: ["ref", "refTTL"],
          fn: function() {
            return Date.now() + this.refTTL
          }
        },
        locale: {
          deps: ["lg", "lc"],
          fn: function() {
            return this.lg ? this.lc ? this.lg + "-" + this.lc : this.lg : null
          }
        },
        platformField: {
          deps: ["platform"],
          fn: function() {
            return "wp7" === this.platform ? a.PLATFORM_TYPE.WP : this.platform ? a.PLATFORM_TYPE[this.platform.toUpperCase()] || a.PLATFORM_TYPE.UNKNOWN : a.PLATFORM_TYPE.UNKNOWN
          }
        },
        tosShowCallNotification: {
          deps: ["tos"],
          fn: function() {
            return this.tos < 2
          }
        }
      },
      initialize: function() {
        var e = this;
        this.listenTo(this, "change:locale", function(e, t) {
          i.setLangPref(t), l10n.init(t)
        }), this.listenTo(this, "change:plugged", _.debounce(function() {
          a.Global.webcPhoneCharging = e.plugged
        }, 5e3, {
          leading: !0
        })), this.listenTo(this, "change:phone", n)
      },
      "delete": function() {
        this.clear()
      },
      handle: function(e) {
        var t, r = e.shift();
        if (r.id = 1, r.protoVersion) {
          c.setVersion(r.protoVersion);
          var n = r.features || {},
            o = c.setFeatures(n);
          t = !!o.KEY_PARTICIPANT, u.setVersion(r.protoVersion, r.binVersion), Store.Stream.handle(["awake"])
        }
        if (r.initial) {
          c.setPlatform(r.platform), i.setLogoutToken(r.browserToken), r.hasOwnProperty("is24h") && l.setIs24Hour(r.is24h);
          var a = r.ref,
            h = r.serverToken,
            p = r.clientToken,
            g = r.connected;
          a && g && h && i.setRefTokCookies(a, h), i.setLoginTokens({
            client: p,
            server: h
          }), r.secret && u.setSharedSecret(r.secret), "true" !== r.isResponse && d.save(), "iw" === r.lg && (r.lg = "he"), r.wid && (this.me = r.wid, Store.Contact.gadd(r.wid))
        } else this.connected && t && (s.log("models:Conn:participantChange:to:" + c.supportsFeature(c.F.KEY_PARTICIPANT))(), f.hardRefresh());
        this.set(r)
      }
    }),
    g = new p({
      id: 1
    });
  g.PLATFORMS = h, e.exports = g
}, function(e, t) {
  "use strict";
  e.exports = {
    ring: function(e, t) {
      return e > t.length - 1 ? 0 : 0 > e ? t.length - 1 : e
    }
  }
}, function(e, t) {
  "use strict";
  e.exports = {
    alpha: new RegExp("[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),
    mark: new RegExp("[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఁ-ఃా-ౄె-ైొ-్ౕౖౢౣಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣംഃാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢩᤠ-ᤫᤰ-᤻ᦰ-ᧀᧈᧉᨗ-ᨛᩕ-ᩞ᩠-᩿᩼ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᷀-ᷦ᷼-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣠-꣱ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꨩ-ꨶꩃꩌꩍꩻꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︦]", "g"),
    arabic: "[؀-؄؆-؋؍-ؚ؞ؠ-ؿف-يٖ-ٞ٪-ٯٱ-ۜ۞-ۿݐ-ݿࢠࢢ-ࢬࣤ-ࣾﭐ-﯁ﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-﷼ﹰ-ﹴﹶ-ﻼ]"
  }
}, function(e, t) {
  "use strict";

  function r(e) {
    "string" == typeof e ? e = e.split("") : "undefined" == typeof e.length && (e = new Uint8Array(e));
    for (var t = Math.ceil(4 * e.length / 3), r = 4 * Math.ceil(e.length / 3), n = new Array(r), o = 0, i = 0; r > o; o += 4, i += 3) {
      var a = e[i] << 16 | e[i + 1] << 8 | e[i + 2];
      n[o] = a >> 18, n[o + 1] = a >> 12 & 63, n[o + 2] = a >> 6 & 63, n[o + 3] = 63 & a
    }
    for (var o = 0; t > o; o++) {
      var s = n[o];
      if (0 > s || s >= 64) return null;
      26 > s ? n[o] = 65 + s : 52 > s ? n[o] = 71 + s : 62 > s ? n[o] = s - 4 : 62 === s ? n[o] = 43 : n[o] = 47
    }
    for (var o = t; r > o; o++) n[o] = 61;
    return String.fromCharCode.apply(String, n)
  }

  function n(e, t) {
    for (var r = e.length, n = new Int32Array(r + r % 4), o = 0; r > o; o++) {
      var i = e.charCodeAt(o);
      if (i >= 65 && 90 >= i) n[o] = i - 65;
      else if (i >= 97 && 122 >= i) n[o] = i - 71;
      else if (i >= 48 && 57 >= i) n[o] = i + 4;
      else if (43 === i) n[o] = 62;
      else {
        if (47 !== i) {
          if (61 === i) {
            r = o;
            break
          }
          return null
        }
        n[o] = 63
      }
    }
    for (var a = n.length / 4, o = 0, s = 0; a > o; o++, s += 4) n[o] = n[s] << 18 | n[s + 1] << 12 | n[s + 2] << 6 | n[s + 3];
    for (var d = Math.floor(3 * r / 4), u = new Uint8Array(d), c = 0, l = 0; d >= l + 3; c++, l += 3) {
      var f = n[c];
      u[l] = f >> 16, u[l + 1] = f >> 8 & 255, u[l + 2] = 255 & f
    }
    switch (d - l) {
      case 2:
        u[l] = n[c] >> 16, u[l + 1] = n[c] >> 8 & 255;
        break;
      case 1:
        u[l] = n[c] >> 16
    }
    return t ? Array.prototype.slice.call(u) : u
  }

  function o(e) {
    return e.replace(/\+/g, "-").replace(/\//g, "_")
  }
  e.exports = {
    encode: r,
    decode: n,
    urlSafe: o
  }
}, function(e, t, r) {
  var n = r(69),
    o = r(23)("toStringTag"),
    i = "Arguments" == n(function() {
      return arguments
    }());
  e.exports = function(e) {
    var t, r, a;
    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(r = (t = Object(e))[o]) ? r : i ? n(t) : "Object" == (a = n(t)) && "function" == typeof t.callee ? "Arguments" : a
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    var e = this;
    this.assetStyle = new f("asset-style"), this.assets = {}, window.addEventListener("dpichange", function() {
      return e.loadAssets(e.assets)
    })
  }
  var i = r(3),
    a = n(i),
    s = r(1),
    d = r(29),
    u = r(21),
    c = r(63),
    l = r(30),
    f = r(405),
    h = r(404),
    p = {
      DEFAULT: "default",
      WEBP: "webp"
    },
    g = {
      sprite: {
        "class": ".icon, .icon-s, .icon-l, .icon-xl",
        low: {
          "default": r(203)
        },
        high: {
          "default": r(203)
        }
      },
      "bg-chat": {
        "class": ".pane-chat-tile",
        low: {
          "default": r(202)
        },
        high: {
          "default": r(202)
        }
      },
      "emoji-small": {
        "class": ".emoji",
        low: {
          "default": r(482),
          webp: r(483)
        },
        high: {
          "default": r(485),
          webp: r(486)
        }
      },
      "emoji-large": {
        "class": ".emojik",
        low: {
          "default": r(484)
        },
        high: {
          "default": r(487),
          webp: r(488)
        }
      },
      "intro-connection": {
        "class": ".intro-image",
        low: {
          "default": r(492)
        },
        high: {
          "default": r(491)
        }
      }
    };
  o.prototype.loadInitialAssets = function(e) {
    return this.loadAssets(g)
  }, o.prototype.loadAssets = function(e) {
    return a["default"].all(_.map(e, this.loadAsset.bind(this)))
  }, o.prototype._supportsWebp = function() {
    return new a["default"](function(e, t) {
      Modernizr.on("webp", function(t) {
        e(t)
      })
    })
  }, o.prototype.loadAsset = function(e, t) {
    var r, n, o = this,
      i = h.currentRes,
      d = t + "-" + i,
      u = this._supportsWebp().then(function(t) {
        return t && t.valueOf() && e[i][p.WEBP] ? p.WEBP : p.DEFAULT
      }).timeout(500)["catch"](a["default"].TimeoutError, function(e) {
        return p.DEFAULT
      });
    return r = window.performance.now(), this.unloadAsset(t), this.assets[t] = e, this.assets[t].promise = u.then(function(t) {
      return l.idb().then(function(e) {
        return e.assets.get(d)
      })["catch"](function(e) {
        s.warn('Failed to "get" asset: ' + d)(e)
      }).then(function(r) {
        var n = _.last(e[i][t].split("/"));
        if (r && r.hash === n) return o.loadBlob(URL.createObjectURL(r.data));
        throw new Error("No result")
      })["catch"](function() {
        return o.loadAndCacheData(e[i][t], d).then(function(e) {
          return URL.createObjectURL(e)
        })
      }).then(function(t) {
        return e["class"] && o.assetStyle.setRule("" + e["class"], {
          "background-image": "url('" + t + "')"
        }), n = window.performance.now(), s.log("Asset: " + d + " loaded: " + (n - r).toFixed(2) + "ms")(), e.onSet && e.onSet(t), t
      })
    })
  }, o.prototype.unloadAsset = function(e) {
    var t = this.assets[e];
    t && t.promise && t.promise.isFulfilled() && URL.revokeObjectURL(t.promise.value()), delete this.assets[e]
  }, o.prototype.loadAndCacheData = function(e, t) {
    var r, n = _.last(e.split("/"));
    return this.loadData(e).then(function(e) {
      return r = e, l.idb().then(function(r) {
        return r.assets.put({
          key: t,
          hash: n,
          data: e
        })
      })
    })["catch"](function(e) {
      s.warn('Failed to "put" asset: ' + t)(e)
    }).then(function(e) {
      return r
    })
  }, o.prototype.loadBlob = function(e) {
    return new a["default"](function(t, r) {
      var n = new XMLHttpRequest;
      n.onload = function() {
        200 === n.status ? t(e) : (s.warn("Blob: " + e + " failed. Refetching asset")(), r(e))
      }, n.onerror = function() {
        return r(e)
      }, n.open("GET", e, !0), n.send()
    })
  }, o.prototype.loadData = function(e) {
    return d.loopOnError(u.ShouldLoop, function(t) {
      var r;
      return r = c.info === c.INFO.OFFLINE ? d.waitForBBEvent(c, "change:info", function(e) {
        return e.info !== c.INFO.OFFLINE
      }) : a["default"].delay(5e3 * (t > 0 ? 1 : 0)), r.then(function() {
        return new a["default"](function(t, r) {
          var n = new XMLHttpRequest;
          n.onload = function(o) {
            200 === n.status ? t(n.response) : (s.warn("Asset: " + _.last(e.split("/")) + " failed. Retrying...")(o), r(new u.ShouldLoop("Asset failed to load. Retrying...")))
          }, n.onerror = function(t) {
            s.warn("Asset: " + _.last(e.split("/")) + " failed. Retrying...")(t), r(new u.ShouldLoop("Asset failed to load. Retrying..."))
          }, n.open("GET", e, !0), n.responseType = "blob", n.send()
        })
      })
    })
  }, o.prototype.loadImage = function(e) {
    return d.loopOnError(u.ShouldLoop, function(t) {
      var r;
      return r = c.info === c.INFO.OFFLINE ? d.waitForBBEvent(c, "change:info", function(e) {
        return e.info !== c.INFO.OFFLINE
      }) : a["default"].delay(5e3 * (t > 0 ? 1 : 0)), r.bind(this).then(function() {
        return new a["default"](function(t, r) {
          var n = new Image;
          n.onload = function() {
            t(e)
          }, n.onerror = function() {
            s.warn("Asset: " + _.last(e.split("/")) + " failed. Retrying...")(), r(new u.ShouldLoop("Asset failed to load. Retrying..."))
          }, n.src = e
        })
      })
    })
  }, e.exports = new o
}, function(e, t) {
  "use strict";
  var r = {
    STREAM_END: 2,
    LIST_EMPTY: 0,
    DICTIONARY_0: 236,
    DICTIONARY_1: 237,
    DICTIONARY_2: 238,
    DICTIONARY_3: 239,
    LIST_8: 248,
    LIST_16: 249,
    JID_PAIR: 250,
    BINARY_8: 252,
    BINARY_20: 253,
    SINGLE_BYTE_MAX: 256
  };
  e.exports = r
}, function(e, t) {
  "use strict";
  var r = {
    STREAM_END: 2,
    LIST_EMPTY: 0,
    DICTIONARY_0: 236,
    DICTIONARY_1: 237,
    DICTIONARY_2: 238,
    DICTIONARY_3: 239,
    LIST_8: 248,
    LIST_16: 249,
    JID_PAIR: 250,
    BINARY_8: 252,
    BINARY_20: 253,
    BINARY_32: 254,
    NIBBLE_8: 255,
    SINGLE_BYTE_MAX: 256,
    NIBBLE_MAX: 254
  };
  e.exports = r
}, function(e, t) {
  "use strict";
  var r = {
    singleByte: [void 0, void 0, void 0, "200", "400", "404", "500", "501", "502", "action", "add", "after", "archive", "author", "available", "battery", "before", "body", "broadcast", "chat", "clear", "code", "composing", "contacts", "count", "create", "debug", "delete", "demote", "duplicate", "encoding", "error", "false", "filehash", "from", "g.us", "group", "groups_v2", "height", "id", "image", "in", "index", "invis", "item", "jid", "kind", "last", "leave", "live", "log", "media", "message", "mimetype", "missing", "modify", "name", "notification", "notify", "out", "owner", "participant", "paused", "picture", "played", "presence", "preview", "promote", "query", "raw", "read", "receipt", "received", "recipient", "recording", "relay", "remove", "response", "resume", "retry", "s.whatsapp.net", "seconds", "set", "size", "status", "subject", "subscribe", "t", "text", "to", "true", "type", "unarchive", "unavailable", "url", "user", "value", "web", "width", "mute", "read_only", "admin", "creator", "short", "update", "powersave", "checksum", "epoch", "block", "previous", "409", "replaced", "reason", "spam", "modify_tag", "message_info", "delivery", "emoji"],
    doubleByte: [],
    nibbleEncode: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      "-": 10,
      ".": 11,
      "\x00": 15
    },
    nibbleDecode: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "-",
      11: ".",
      15: "\x00"
    }
  };
  e.exports = r
}, function(e, t) {
  "use strict";
  var r = {
    STREAM_END: 2,
    LIST_EMPTY: 0,
    DICTIONARY_0: 236,
    DICTIONARY_1: 237,
    DICTIONARY_2: 238,
    DICTIONARY_3: 239,
    LIST_8: 248,
    LIST_16: 249,
    JID_PAIR: 250,
    HEX_8: 251,
    BINARY_8: 252,
    BINARY_20: 253,
    BINARY_32: 254,
    NIBBLE_8: 255,
    SINGLE_BYTE_MAX: 256,
    PACKED_MAX: 254
  };
  e.exports = r
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    var t = [],
      r = !1,
      n = 0;
    _.each(e, function(e, o) {
      function a(e) {
        return e.hasOwnProperty(o) && s(e[o])
      }
      if (e === _) return void(r = !0);
      n++;
      var s = i(e);
      t.push(a)
    });
    var o = _.reduceRight(t, function(e, t) {
      return e ? function(r) {
        return t(r) && e(r)
      } : t
    });
    return function(e) {
      if ("object" !== ("undefined" == typeof e ? "undefined" : (0, d["default"])(e))) return !1;
      var t = _.keys(e).length;
      return n > t ? !1 : !r && t > n ? !1 : o(e)
    }
  }

  function i(e) {
    switch ("undefined" == typeof e ? "undefined" : (0, d["default"])(e)) {
      case "object":
        return o(e);
      case "function":
        return e;
      case "boolean":
      case "null":
      case "undefined":
      case "number":
      case "string":
        return function(t) {
          return t === e
        }
    }
  }

  function a(e) {
    this.predicate = i(e)
  }
  var s = r(36),
    d = n(s);
  a.ANY = _.constant(!0), a.OBJECT = _.isObject, a.STRING = _.isString, a.BOOLEAN = _.isBoolean, a.prototype = {
    test: function(e) {
      return this.predicate(e)
    }
  }, e.exports = a
}, function(e, t, r) {
  "use strict";

  function n() {
    u || (u = r(630))
  }

  function o(e) {
    var t = void 0;
    return void 0 === e ? (t = new Uint8Array(32), window.crypto.getRandomValues(t)) : t = new Uint8Array(e), t[0] &= 248, t[31] &= 127, t[31] |= 64, d({
      pubKey: 32,
      privKey: t,
      basepoint: c
    }, function(e) {
      var r = u._curve25519_donna(e.pubKey, e.privKey, e.basepoint);
      if (r) throw new Error("Curve25519:keyPair Error Code " + r);
      return {
        pubKey: s(e.pubKey, 32),
        privKey: t.buffer
      }
    })
  }

  function i(e, t) {
    return d({
      sharedKey: 32,
      pubKey: e,
      privKey: t
    }, function(e) {
      var t = u._curve25519_donna(e.sharedKey, e.privKey, e.pubKey);
      if (t) throw new Error("Curve25519:sharedSecret Error Code " + t);
      return s(e.sharedKey, 32)
    })
  }

  function a(e) {
    if ("number" == typeof e) return u._malloc(e);
    var t = new Uint8Array(e.buffer || e),
      r = u._malloc(t.length);
    return u.HEAPU8.set(t, r), r
  }

  function s(e, t) {
    var r = new Uint8Array(t);
    return r.set(u.HEAPU8.subarray(e, e + t)), r.buffer
  }

  function d(e, t) {
    n();
    var r = {};
    try {
      for (var o in e) r[o] = a(e[o]);
      return t(r)
    } finally {
      for (var o in r) u._free(r[o])
    }
  }
  var u, c = new Uint8Array(32);
  c[0] = 9, e.exports = {
    keyPair: o,
    sharedSecret: i
  }
}, function(e, t, r) {
  "use strict";

  function n() {
    var e = this.onTimeout;
    return e ? (this.failGeneration++, void(e(this) && this._run(!1))) : (i.error("Watchdog timed-out without handler!")(), void a.upload("watchdog-no-handler"))
  }

  function o(e, t, r) {
    return "number" == typeof r ? function(n) {
      switch (n.failGeneration) {
        case 0:
          return Math.min(r, t);
        case 1:
          return Math.min(r, e + t);
        default:
          return Math.min(r, n.waitDuration + n.prevWaitDuration)
      }
    } : function(r) {
      switch (r.failGeneration) {
        case 0:
          return t;
        case 1:
          return e + t;
        default:
          return r.waitDuration + r.prevWaitDuration
      }
    }
  }
  var i = r(1),
    a = r(10),
    s = r(49),
    d = r(64),
    u = s.extend({
      session: {
        failGeneration: {
          type: "number",
          allowNull: !1,
          "default": 0
        },
        ts: "number",
        waitDuration: {
          type: "number",
          allowNull: !1,
          "default": 0
        },
        prevWaitDuration: {
          type: "number",
          allowNull: !1,
          "default": 0
        },
        jitter: {
          type: "number",
          "default": 0
        },
        shiftTimer: "object",
        waitAlgorithm: {
          type: "function",
          required: !0,
          allowNull: !1
        },
        onActivated: "function",
        onDeactivated: "function",
        onFed: "function",
        onTimeout: "function"
      },
      initialize: function() {
        this.shiftTimer = new d(this, n)
      },
      activate: function() {
        this.shiftTimer.ts || (this._run(!0), this.onActivated && this.onActivated(this))
      },
      deactivate: function() {
        this.shiftTimer.ts && (this.shiftTimer.cancel(), this.onDeactivated && this.onDeactivated(this))
      },
      feed: function() {
        this.shiftTimer.ts && (this._run(!0), this.onFed && this.onFed(this))
      },
      forceTimeout: function(e) {
        this.shiftTimer.ts ? e ? this.ts = this.shiftTimer.before(e) : this.shiftTimer.trigger() : i.error("forced non-running watchdog!")()
      },
      poke: function() {
        this.forceTimeout.apply(this, arguments)
      },
      _run: function(e) {
        e && (this.failGeneration = 0);
        var t = this.waitAlgorithm(this),
          r = this.jitter * Math.random() * t;
        this.set({
          ts: this.shiftTimer.debounce(t + r),
          waitDuration: t,
          prevWaitDuration: this.waitDuration
        })
      }
    });
  u.FIBONACCI = o, e.exports = u
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    return function() {
      if (j) return e.apply(void 0, arguments);
      x || (x = [], window.setTimeout(function() {
        w = r(16), E = r(9), S = r(10), N = r(7), T = r(30), $ = r(1), C = r(45), k = r(103), A = r(64), I = r(15), O = new A(c);
        for (var e = 0; e < x.length; e++) x[e]();
        x = null, j = !0
      }, 0));
      var t = Array.prototype.slice.call(arguments);
      x.push(e.apply.bind(e, void 0, t))
    }
  }

  function i(e) {
    e.commitTime ? $.error("wam:commit redundant commit! " + e.$className)() : ($.log("wam:commit " + e.$className, e.all)(), e.commitTime = b(), s([!0, e]))
  }

  function a(e, t) {
    $.log("wam:set " + e.name + " = " + t)(), s([!1, e, t])
  }

  function s(e) {
    F.push(e), W && O.before(Y)
  }

  function d() {
    $.log("wam pause processing")(), W = !1, O.cancel()
  }

  function u() {
    $.log("wam enable processing")(), W = !0, F.length > 0 && O.before(Y)
  }

  function c() {
    d(), D["default"].resolve(F).then(function(e) {
      if (!q) {
        var t = w.info();
        q = {
          appVersion: N.VERSION_STR,
          platform: C.PLATFORM_TYPE.WEBCLIENT,
          browser: t.name || null,
          browserVersion: t.ua || null,
          deviceName: t.os || null,
          webcPhonePlatform: Store.Conn.platformField || null,
          webcEnv: C.WEBC_ENV_CODE.PROD
        }, $.log("wam:executePending initializing", q)(), C.Global.commitOnSet = !1, C.Global.set(q), C.Global.commitOnSet = !0, I.clearWamBuffer_old(), I.clearWamStatus_old(), I.clearWamLastRotate_old(), I.clearWamDimensionCache_old()
      }
      $.log("wam:executePending " + e.length + " jobs")(), R || (R = new l(q));
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        if (n[0]) R.write(n[1]);
        else {
          var o = n[1],
            i = n[2];
          q[o.name] = i, R.set(-o.id, i)
        }
      }
      var a = b();
      if (R.bufferLength > 0 && (R.bufferLength > N.WAM_MAX_BUFFER_SIZE || a > B + N.WAM_ROTATE_INTERVAL || !G)) {
        if (!I.getLoginTokens().server) return $.log("wam:executePending wam unauthed, didn't send")(), R.bufferLength > N.WAM_MAX_BUFFER_SIZE ? (R = null, $.log("wam:executePending abandoned current buffer")(), D["default"].resolve()) : m();
        var s = k.uploadEvent();
        return s.commitTime = a, $.log("wam:executePending commit upload", s.all)(), R.write(s), v()
      }
      return m()
    })["catch"](function(e) {
      $.error("wam:executePending error " + (e && e.stack ? e.stack : e))(e), S.upload("wam-error"), R = null
    }).then(u, u), F = []
  }

  function l(e) {
    this.buffer = [], this.bufferLength = 0, this.prevValues = {}, this.dirtyGlobals = null, this.unsavedPortion = null, this.saveKey = 1e9 * Math.random() | 0, e && this.setAll(e)
  }

  function f(e) {
    var t = new E(10 + e.length, !0);
    t.writeString("WASTATS");
    for (var r = JSON.parse("[" + e + "]"), n = 0; n < r.length; n++) {
      var o = r[n],
        i = o[0];
      i > 0 ? h(t, i, o[1]) : p(t, -i, o[1], K)
    }
    return t
  }

  function h(e, t, r) {
    for (var n = 0; n < r.length; n++) {
      var o = r[n];
      p(e, o[0], o[1], V)
    }
    p(e, t, r.length, H)
  }

  function p(e, t, r, n) {
    if (null === r && n === K) g(e, t, n);
    else if (r === (0 | r)) 0 === r ? g(e, t, 16 | n) : 1 === r ? g(e, t, 32 | n) : r >= -128 && 128 > r ? (g(e, t, 48 | n), e.writeInt8(r)) : r >= -32768 && 32768 > r ? (g(e, t, 64 | n), e.writeInt16(r)) : (g(e, t, 80 | n), e.writeInt32(r));
    else if ("number" == typeof r) g(e, t, 112 | n), e.writeFloat64(r);
    else if ("string" == typeof r) {
      for (var o = 0, i = 0; i < r.length; i++) {
        var a = r.charCodeAt(i);
        a >= 55296 && 56320 > a && (a = ((1023 & a) << 10 | 1023 & r.charCodeAt(++i)) + 65536), 128 > a ? o++ : o += 2048 > a ? 2 : 65536 > a ? 3 : 4
      }
      256 > o ? (g(e, t, 128 | n), e.writeUint8(o)) : 65536 > o ? (g(e, t, 144 | n), e.writeUint16(o)) : (g(e, t, 160 | n), e.writeUint32(o)), e.writeString(r)
    } else null === r && g(e, t, 176 | n)
  }

  function g(e, t, r) {
    256 > t ? (e.writeUint8(r), e.writeUint8(t)) : (e.writeUint8(4 | r), e.writeUint16(t))
  }

  function m() {
    var e = R.stringBuffer();
    if (!e) return D["default"].resolve();
    var t = R.unsavedPortion;
    if (t && 0 === t.bufferLength) return D["default"].resolve();
    var r = R.saveKey,
      n = {
        buffer: e,
        lastSend: r
      },
      o = void 0;
    return o = t ? T.idb().then(function(e) {
      return e.wam.update(r, n)
    }).then(function(e) {
      return 0 === e ? (R = R.unsavedPortion, $.log("wam:save other tab claimed buffer, cutting head")(), m()) : ($.log("wam:save successfully updated " + r)(), void(R.unsavedPortion = new l(q)))
    }) : T.idb().then(function(e) {
      return e.wam.add(n, r)
    }).then(function() {
      $.log("wam:save successfully saved new entry " + r)(), R.unsavedPortion = new l(q)
    }), o["catch"](function(e) {
      $.warn("wam:save indexeddb failed to save " + e)(e)
    })
  }

  function v() {
    var e = {};
    return T.idb().then(function(t) {
      return t.wam.toCollection().modify(function(t) {
        e[t.lastSend] = t.buffer, delete this.value
      })
    })["catch"](function(e) {
      $.warn("wam:sendAllLogs failed to read because " + e)(e)
    }).then(function() {
      return R && (!R.unsavedPortion || R.saveKey in e || (R = R.unsavedPortion), e[R.saveKey] = R.stringBuffer()), D["default"].all(_.map(e, y))
    }).then(function(t) {
      var r = _.filter(t);
      if (r.length !== t.length && (B = b(), G = !0), R && -1 === _.indexOf(r, R.saveKey) && (R = null), 0 === r.length) return D["default"].resolve();
      var n = _.reduce(r, function(t, r) {
        return t + e[r].length
      }, 0);
      return n < N.WAM_MAX_BUFFER_SIZE ? T.idb().then(function(t) {
        return D["default"].settle(_.map(r, function(r) {
          return t.wam.add({
            buffer: e[r],
            lastSend: r
          }, r)
        }))
      }) : (R = null, void $.error("wam dropped " + r.length + " buffers! (" + n + " bytes)", e)())
    })
  }

  function y(e, t) {
    if ("" === e) return D["default"].resolve(void 0);
    var n = r(109),
      o = f(e).flip().toBase64();
    $.log("wam:sendLogs { strlen:" + e.length + ", b64len:" + o.length + " }")();
    var i = N.VERSION_STR,
      a = new FormData;
    return a.append("t", "" + b()), a.append("v", i), a.append("tok", I.getLoginTokens().server), a.append("buffer", o), n.post(N.WAM_URL, a).uncancellable().then(function(e) {
      if (e.status >= 500) throw e.status + " response";
      return e
    })["catch"](function(e) {
      return $.error("wam:sendLogs retry on error: " + e)(e), n.post(N.WAM_URL, a)
    }).then(function(e) {
      return 200 === e.status ? void $.log("wam:sendLogs success")() : ($.error("wam:sendLogs failure code: " + e.status)(), t)
    })["catch"](function(e) {
      return $.error("wam:sendLogs failure error: " + e)(e), t
    })
  }

  function b() {
    return Math.floor(Date.now() / 1e3)
  }
  var w, E, S, N, T, $, C, k, A, I, O, R, P = r(27),
    M = n(P),
    L = r(3),
    D = n(L),
    x = null,
    j = !1,
    U = -47,
    B = 0,
    F = [],
    W = !1,
    Y = 1e4,
    G = !1,
    q = null;
  l.prototype = {
    setAll: function(e) {
      for (var t in e) {
        var r = e[t];
        void 0 !== r && this.set(-C.METRICS[t].id, r)
      }
    },
    set: function(e, t) {
      this.dirtyGlobals || (this.dirtyGlobals = {}), this.dirtyGlobals[e] = t, this.unsavedPortion && this.unsavedPortion.set(e, t)
    },
    flushGlobals: function() {
      if (this.dirtyGlobals) {
        var e = this.dirtyGlobals,
          t = this.prevValues;
        for (var r in e) {
          var n = 0 | r,
            o = e[n];
          if ("boolean" == typeof o ? o = o ? 1 : 0 : void 0 === o && (o = null), o === t[n]) return;
          t[n] = o, this.appendToBuffer((0, M["default"])([n, o]))
        }
        this.dirtyGlobals = null
      }
    },
    write: function(e) {
      var t = this.prevValues;
      this.appendToBuffer((0, M["default"])([U, e.commitTime])), this.flushGlobals();
      var r = e.all,
        n = [];
      for (var o in r) {
        var i = C.METRICS[o].id,
          a = r[o];
        null !== a && void 0 !== a && ("boolean" == typeof a && (a = a ? 1 : 0), 0 !== a && 1 !== a && a === t[i] ? n.push([i, null]) : (t[i] = a, n.push([i, a])))
      }
      this.appendToBuffer((0, M["default"])([e.id, n])), this.unsavedPortion && this.unsavedPortion.write(e)
    },
    appendToBuffer: function(e) {
      this.buffer.push(e), this.buffer.length > 1 ? this.bufferLength += 1 + e.length : this.bufferLength += e.length
    },
    stringBuffer: function() {
      var e = this.buffer.join(",");
      return this.buffer.length > 1 && (this.buffer = [e]), this.bufferLength = e.length, e
    }
  };
  var K = 0,
    H = 1,
    V = 2;
  e.exports = _.mapValues({
    commit: i,
    set: a,
    resumeJobs: u
  }, o)
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(27),
    i = n(o),
    a = r(3),
    s = n(a),
    d = r(68),
    u = n(d),
    c = r(36),
    l = n(c),
    f = r(1),
    h = r(21),
    p = r(13),
    g = r(9),
    m = r(39),
    v = r(22),
    y = r(61),
    b = r(67),
    w = r(108),
    E = {
      BinaryProtocol: null,
      N: null,
      M: {
        DEBUG_LOG: 1,
        QUERY_RESUME: 2,
        QUERY_RECEIPT: 3,
        QUERY_MEDIA: 4,
        QUERY_CHAT: 5,
        QUERY_CONTACTS: 6,
        QUERY_MESSAGES: 7,
        PRESENCE: 8,
        PRESENCE_SUBSCRIBE: 9,
        GROUP: 10,
        READ: 11,
        CHAT: 12,
        RECEIVED: 13,
        PIC: 14,
        STATUS: 15,
        MESSAGE: 16
      },
      isRequestingDeviceUploadLogsMutex: 0,
      wrap: function(e) {
        return function(t) {
          return "number" == typeof t.status && t.status >= 500 ? t : void e(t)
        }
      },
      binWrap: function(e, t) {
        return function(r) {
          if ("object" === ("undefined" == typeof r ? "undefined" : (0, l["default"])(r)) && "number" == typeof r.status) {
            if (401 === r.status) throw new h.E401;
            if (r.status >= 500) return r;
            t(r)
          } else e(r)
        }
      },
      actionNode: function(e, t) {
        return ["action", {
          type: e
        }, t]
      },
      queryNode: function(e, t) {
        return ["query", e, t]
      },
      dropIfConditionMet: function(e, t) {
        return e.reduce(function(e, t) {
          return e || t
        }, !1) ? void 0 : t
      },
      actionGetMeta: function(e) {
        var t = {};
        if ("action" !== this.N.tag(e)) return t;
        var r = this.N.attr("add", e),
          n = this.N.attr("missing", e),
          o = this.N.attr("checksum", e);
        switch (r) {
          case "after":
          case "before":
          case "last":
          case "relay":
          case "update":
            t.add = r
        }
        switch (n) {
          case "remove":
            t.missing = n
        }
        return o && (t.checksum = o), t
      },
      groupActionsByType: function(e) {
        var t = {};
        if (!_.isArray(e)) return t;
        var r, n, o = e.length;
        for (n = 0; o > n; n++) switch (r = e[n], this.N.tag(r)) {
          case "broadcast":
            switch (this.N.attr("type", r)) {
              case "create":
              case "add":
              case "remove":
                t.msg || (t.msg = []), t.msg.push(r);
                break;
              case "modify":
                t.bcUpdate || (t.bcUpdate = []), t.bcUpdate.push(r)
            }
            break;
          case "message":
          case "groups_v2":
          case "notification":
            t.msg || (t.msg = []), t.msg.push(r);
            break;
          case "read":
          case "log":
            t.cmd || (t.cmd = []), t.cmd.push(r);
            break;
          case "received":
            t.ack || (t.ack = []), t.ack.push(r);
            break;
          case "user":
            t.contact || (t.contact = []), t.contact.push(r);
            break;
          case "chat":
            switch (this.N.attr("type", r)) {
              case "mute":
                t.mute || (t.mute = []), t.mute.push(r);
                break;
              default:
                t.chat || (t.chat = []), t.chat.push(r)
            }
            break;
          case "battery":
            t.battery || (t.battery = []), t.battery.push(r);
            break;
          default:
            f.errorVerbose("Wap:groupActionsByType unknown action: " + this.N.toString(r), r)()
        }
        return t
      },
      safeParseInt: function(e, t) {
        var r = parseInt(this.N.attr(t, e), 10);
        return _.isNaN(r) ? void 0 : r
      },
      parseChat: function(e) {
        if ("chat" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = parseInt(this.N.attr("t", e), 10) || void 0,
            n = this.N.attr("type", e),
            o = parseInt(this.N.attr("mute", e), 10) || void 0,
            i = parseInt(this.N.attr("before", e), 10) || void 0,
            a = "true" === this.N.attr("archive", e),
            s = "true" === this.N.attr("read_only", e),
            d = parseInt(this.N.attr("modify_tag", e), 10) || void 0,
            u = this.N.attr("name", e) || void 0,
            c = this.safeParseInt(e, "count"),
            l = "true" === this.N.attr("message", e);
          "ahead" === n && (n = "clear");
          var f, h = this.N.children(e);
          if (_.isArray(h)) {
            f = [];
            var p, g, m = h.length;
            for (p = 0; m > p; p++)
              if (g = h[p], "item" === this.N.tag(g)) {
                var v = this.N.attr("index", g);
                v && f.push([v, "true" === this.N.attr("owner", g)])
              }
          }
          var y = {
              id: t,
              t: r,
              type: n,
              keys: f,
              before: i,
              archive: a,
              isReadOnly: s,
              unreadCount: c,
              muteExpiration: o,
              modifyTag: d,
              name: u,
              pendingMsgs: l
            },
            b = [n && "delete" !== n && "clear" !== n && "archive" !== n && "unarchive" !== n && "mute" !== n, !n && !t, a && n && "clear" !== n, "clear" !== n && i && i > 0, "clear" !== n && f && f.length > 0];
          return this.dropIfConditionMet(b, y)
        }
      },
      parseContact: function(e) {
        if ("user" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = this.N.attr("name", e),
            n = this.N.attr("short", e) || void 0,
            o = this.N.attr("type", e) || "in",
            i = "true" === this.N.attr("plaintext_disabled", e),
            a = {
              id: t,
              name: r,
              type: o,
              shortName: n,
              plaintextDisabled: i
            },
            s = [!t, "in" !== o && "out" !== o && !!o];
          return this.dropIfConditionMet(s, a)
        }
      },
      parseCmd: function(e) {
        if ("read" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = {
              type: "read",
              jid: t
            },
            n = [!t];
          return this.dropIfConditionMet(n, r)
        }
      },
      parseAck: function(e) {
        if ("received" === this.N.tag(e)) {
          var t, r = this.N.attr("type", e),
            n = this.N.attr("id", e),
            o = this.N.attr("to", e);
          switch (r) {
            case "message":
              t = 2;
              break;
            case "read":
              t = 3;
              break;
            case "played":
              t = 4;
              break;
            case "error":
              t = -1;
              break;
            case "pending":
            default:
              t = 0
          }
          var i = {
              cmd: "ack",
              id: n,
              ack: t,
              from: Store.Conn.me,
              to: o
            },
            a = [!n, !o, "message" !== r && "read" !== r && "played" !== r && "error" !== r && "pending" !== r];
          return this.dropIfConditionMet(a, i)
        }
      },
      parseBCUpdate: function(e) {
        if ("broadcast" === this.N.tag(e) && "modify" === this.N.attr("type", e)) {
          var t = this.N.attr("jid", e),
            r = this.N.children(e),
            n = [];
          if (_.isArray(r)) {
            var o, i, a, s = r.length;
            for (o = 0; s > o; o++) i = r[o], a = this.N.attr("jid", i), "recipient" === this.N.tag(i) && a && 2 === a.split("@").length && "c.us" === a.split("@")[1] && n.push({
              id: a
            })
          }
          var d = {
              id: t,
              participants: n
            },
            u = [!t, "broadcast" !== t.split("@")[1], 0 === n.length];
          return this.dropIfConditionMet(u, d)
        }
      },
      parseBattery: function(e) {
        if ("battery" === this.N.tag(e)) {
          var t = Math.min(parseInt(this.N.attr("value", e), 10) || -1, 100),
            r = this.N.attr("live", e),
            n = {
              battery: 0 > t ? void 0 : t,
              plugged: r ? "true" === r : void 0
            },
            o = [0 > t && !r];
          return this.dropIfConditionMet(o, n)
        }
      },
      msgGetTarget: function(e) {
        return e.from === Store.Conn.me ? e.to : e.from
      },
      parseMsg: function(e, t) {
        switch (this.N.tag(e)) {
          case "message":
            return this.parseMsgMessage(e, t);
          case "groups_v2":
            return this.parseMsgGp2(e);
          case "broadcast":
            return this.parseMsgBroadcast(e);
          case "notification":
            return this.parseMsgNotification(e);
          default:
            return
        }
      },
      parseMsgMessage: function(e, t) {
        if ("message" === this.N.tag(e)) {
          var r;
          this.N.attr("from", e) !== Store.Conn.me || this.N.attr("to", e) ? this.N.attr("to", e) !== Store.Conn.me || this.N.attr("from", e) || (r = "out") : r = "in";
          var n, o = this.N.attr("id", e),
            i = parseInt(this.N.attr("t", e), 10) || 0,
            a = this.N.attr("to", e) || Store.Conn.me,
            s = this.N.attr("from", e) || Store.Conn.me,
            d = "broadcast" === s.split("@")[1],
            u = this.N.attr("participant", e),
            c = d ? u : s,
            l = d ? void 0 : u,
            h = d ? !1 : this.N.child("broadcast", e) && s === Store.Conn.me,
            p = "invis" === this.N.attr("web", e),
            g = this.N.attr("notify", e) || "",
            m = parseInt(this.N.attr("status", e)) || 0,
            v = [],
            y = this.N.child("broadcast", e);
          if ("broadcast" !== a) {
            switch (t) {
              case "fresh":
                n = 1;
                break;
              default:
                n = m >= -1 && 4 >= m ? m : 1
            }
            if (_.isArray(y)) {
              var b, w = y.length;
              for (b = 0; w > b; b++) {
                var E = y[b],
                  S = this.N.attr("jid", E);
                "to" === this.N.tag(E) && S && v.push(S)
              }
            }
            var N, T = [],
              $ = this.N.attr("type", e);
            switch ($) {
              case "ciphertext":
              case "text":
                var C = this.N.dataStr(this.N.child("body", e)) || "";
                N = {
                  id: o,
                  body: "text" === $ ? C : void 0,
                  type: "text" === $ ? "chat" : "ciphertext",
                  t: i,
                  notifyName: g,
                  from: c,
                  to: a,
                  self: r,
                  author: l,
                  invis: p,
                  ack: n,
                  broadcast: h,
                  recipients: v
                }, T = [!o, !i, !c, !a];
                break;
              case "media":
                var k, A, I, O, R, P = this.N.child("media", e),
                  M = this.N.attr("type", P),
                  L = this.N.attr("media_key", P),
                  D = this.N.attr("mimetype", P);
                if ("retry" === this.N.attr("reason", P)) return;
                switch (M) {
                  case "image":
                  case "video":
                    var x = this.N.attr("caption", P);
                    k = this.thumbFromMediaXml(P), A = this.N.attr("url", P), A = _.isString(A) && A.indexOf("/u/") > 0 ? void 0 : A, I = this.N.attr("filehash", P), O = parseInt(this.N.attr("size", P), 10) || 0, R = this.N.attr("seconds", P), N = {
                      id: o,
                      body: k,
                      type: M,
                      t: i,
                      notifyName: g,
                      from: c,
                      to: a,
                      self: r,
                      author: l,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      duration: R,
                      broadcast: h,
                      recipients: v,
                      filehash: I,
                      size: O,
                      caption: x,
                      mediaKey: L,
                      mimetype: D
                    }, T = [!o, !i, !c, !a];
                    break;
                  case "location":
                    var j = this.N.attr("latitude", P),
                      U = this.N.attr("longitude", P),
                      B = this.N.attr("name", P);
                    k = this.thumbFromMediaXml(P), A = this.N.attr("url", P), N = {
                      id: o,
                      body: k,
                      type: M,
                      t: i,
                      notifyName: g,
                      from: c,
                      to: a,
                      self: r,
                      author: l,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      loc: B,
                      lat: j,
                      lng: U,
                      broadcast: h,
                      recipients: v
                    }, T = [!o, !i, !c, !a, !j || !U];
                    break;
                  case "audio":
                    var F = "live" === this.N.attr("origin", P) ? "ptt" : M;
                    A = this.N.attr("url", P), A = _.isString(A) && A.indexOf("/u/") > 0 ? void 0 : A, I = this.N.attr("filehash", P), O = parseInt(this.N.attr("size", P), 10) || 0, R = this.N.attr("seconds", P), N = {
                      id: o,
                      type: F,
                      t: i,
                      notifyName: g,
                      from: c,
                      to: a,
                      self: r,
                      author: l,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      duration: R,
                      broadcast: h,
                      recipients: v,
                      filehash: I,
                      size: O,
                      mediaKey: L,
                      mimetype: D
                    }, T = [!o, !i, !c, !a];
                    break;
                  case "vcard":
                    var W = this.N.child("vcard", P),
                      Y = this.N.dataStr(W),
                      G = this.N.attr("name", W);
                    N = {
                      id: o,
                      body: Y,
                      type: M,
                      subtype: G,
                      t: i,
                      notifyName: g,
                      from: c,
                      to: a,
                      self: r,
                      author: l,
                      invis: p,
                      ack: n,
                      broadcast: h,
                      recipients: v
                    }, T = [!o, !i, !c, !a, !Y, !G];
                    break;
                  default:
                    f.error("wap:parseMsgMessage: unknown media type: " + this.N.toString(e), e)()
                }
                break;
              default:
                f.error("wap:parseMsgMessage: unknown message type: " + this.N.toString(e), e)()
            }
            return this.dropIfConditionMet(T, N)
          }
        }
      },
      thumbFromMediaXml: function(e) {
        return "raw" === this.N.attr("encoding", e) ? g.isByteBuffer(this.N.children(e)) ? this.N.children(e).toBase64() : "" : this.N.dataStr(e)
      },
      parseMsgGp2: function(e) {
        if ("groups_v2" === this.N.tag(e)) {
          var t, r = parseInt(this.N.attr("t", e), 10) || 0,
            n = this.N.attr("id", e),
            o = this.N.attr("jid", e),
            i = "invis" === this.N.attr("web", e),
            a = this.N.attr("type", e),
            s = this.N.attr("author", e),
            d = this.N.children(e),
            u = [];
          switch (a) {
            case "create":
              t = this.N.attr("subject", e);
              break;
            case "subject":
              t = this.N.attr("subject", e);
              break;
            case "picture":
              t = this.N.attr("picture", e)
          }
          if (_.isArray(d)) {
            var c, l = d.length;
            for (c = 0; l > c; c++) {
              var f = d[c],
                h = this.N.attr("jid", f);
              "participant" === this.N.tag(f) && h && u.push(h)
            }
          }
          var p = _.isString(s) ? s.indexOf("s.whatsapp.net") : -1;
          p > -1 && (s = s.slice(0, p) + "c.us");
          var g = {
              t: r,
              id: n,
              to: o,
              from: o,
              author: s,
              body: t ? t.toString() : void 0,
              type: "gp2",
              subtype: a,
              invis: i,
              recipients: u
            },
            m = [!n, !r, "subject" !== a && "add" !== a && "remove" !== a && "leave" !== a && "picture" !== a && "modify" !== a && "create" !== a && "delete" !== a && "promote" !== a && "demote" !== a, "subject" === a && !t, ("add" === a || "remove" === a || "leave" === a || "promote" === a || "demote" === a || "modify" === a) && 0 === u.length, !o, "string" == typeof o && "g.us" !== o.split("@")[1]];
          return this.dropIfConditionMet(m, g)
        }
      },
      parseMsgBroadcast: function(e) {
        if ("broadcast" === this.N.tag(e)) {
          var t, r = this.N.attr("type", e),
            n = this.N.attr("id", e),
            o = parseInt(this.N.attr("t", e), 10) || 0,
            i = this.N.attr("jid", e);
          switch (r) {
            case "create":
              t = parseInt(this.N.attr("count", e), 10) || 0;
              break;
            case "add":
            case "remove":
              t = this.N.attr("participant", e)
          }
          var a = {
              id: n,
              t: o,
              type: "broadcast_notification",
              subtype: r,
              from: i,
              to: i,
              body: t ? t.toString() : void 0
            },
            s = [!n, !o, !i, "string" == typeof i && "broadcast" !== i.split("@")[1], "create" !== r && "add" !== r && "remove" !== r, ("add" === r || "remove" === r) && 2 !== t.split("@").length];
          return this.dropIfConditionMet(s, a)
        }
      },
      parseMsgNotification: function(e) {
        if ("notification" === this.N.tag(e)) {
          var t = this.N.attr("id", e),
            r = parseInt(this.N.attr("t", e), 10) || 0,
            n = this.N.attr("jid", e),
            o = "invis" === this.N.attr("web", e),
            i = this.N.dataStr(e),
            a = "true" === this.N.attr("owner", e) ? Store.Conn.me : n,
            s = "true" === this.N.attr("owner", e) ? n : Store.Conn.me,
            d = {
              id: t,
              type: "notification",
              t: r,
              invis: o,
              from: a,
              to: s,
              body: i
            },
            u = [!t, !r, !n, 2 !== n.split("@").length];
          return this.dropIfConditionMet(u, d)
        }
      },
      "delete": _.noop,
      error2412: _.noop,
      setSubProtocol: function(e) {
        1 === e ? (this.BinaryProtocol = new b("01"), this.N = this.BinaryProtocol.Node) : (this.BinaryProtocol = new b("03"), this.N = this.BinaryProtocol.Node)
      },
      handle: function(e, t, r) {
        var n, o, i, a, s, d, c, l, h = this.BinaryProtocol.read(e);
        switch (this.N.tag(h)) {
          case "response":
            if (0 === r.indexOf("preempt")) switch (this.N.attr("type", h)) {
              case "chat":
                if (f.logColor("green", "bin-recv: " + r + ",response,chat", h)(), o = this.N.children(h) || [], _.isArray(o)) {
                  for (a = o.length, n = [], i = 0; a > i; i++) c = this.parseChat(o[i]), c && n.push(c);
                  Store.Chat.handle([{
                    cmd: "preempt",
                    response: n
                  }], t)
                }
                break;
              case "contacts":
                if (f.logColor("green", "bin-recv: " + r + ",response,contact", h)(), o = this.N.children(h), _.isArray(o)) {
                  for (a = o.length, n = [], i = 0; a > i; i++) s = this.parseContact(o[i]), s && n.push(s);
                  Store.Contact.handle([{
                    cmd: "preempt",
                    checksum: this.N.attr("checksum", h),
                    response: n
                  }], t)
                }
                break;
              default:
                f.error("Wap:handle unknown response type: " + this.N.toString(h, !0), h)()
            } else f.error("Wap:handle non-preemptive response: " + this.N.toString(h, !0), h)();
            break;
          case "action":
            var p = this.actionGetMeta(h),
              g = this.groupActionsByType(this.N.children(h)),
              m = (0, u["default"])(g);
            if (_.isArray(m)) {
              var v, y, b, w, E = m.length;
              if (0 === E && "last" === p.add) Store.Msg.handle([{
                recent: !0
              }], t);
              else
                for (i = 0; E > i; i++) {
                  y = m[i], v = g[y];
                  var S, N = v.length;
                  switch (y) {
                    case "msg":
                      var T;
                      switch (p.add) {
                        case "relay":
                        case "update":
                          T = this.parseMsg(v[0], "relay"), 1 !== N && f.error("Wap:handle action msg relay length not 1", h)(), T ? (f.logColor("green", "bin-recv: " + [r, "action", "msg", p.add, T.type, T.from, T.to, T.id].join(","), h)(), w = this.msgGetTarget(T), Store.Msg.handle([{
                            meta: {
                              add: p.add
                            },
                            chat: w,
                            msg: T
                          }], t)) : f.error("Wap:handle action msg relay dropped", v[0])();
                          break;
                        case "last":
                          for (f.logColor("green", "bin-recv: " + [r, "action", "msg", "last", v.length].join(","), h)(), b = [], S = 0; N > S; S++) T = this.parseMsg(v[S], "last"), T ? b.push(T) : f.error("Wap:handle action msg last dropped", v[S])();
                          if (b.length > 0) {
                            for (var $ = {
                                recent: !0
                              }, C = 0; C < b.length; C++) $[this.msgGetTarget(b[C])] = b[C];
                            Store.Msg.handle([$], t)
                          } else f.error("Wap:handle action msg last dropped to 0")();
                          break;
                        case "before":
                        case "after":
                          if (N > 0) {
                            for (b = [], S = 0; N > S; S++) T = this.parseMsg(v[S], p.add), T ? b.push(T) : f.error("Wap:handle action msg before/after dropped", v[S])();
                            f.logColor("green", "bin-recv: " + [r, "action", "msg", p.add, b.length].join(","), h)(), b.length > 0 ? (w = this.msgGetTarget(b[0]), Store.Msg.handle([{
                              meta: {
                                add: p.add
                              },
                              chat: w,
                              msgs: b
                            }], t)) : f.error("Wap:handle action msg before/after droppped to 0")()
                          } else f.error("Wap:handle action msg before/after 0 msgs")();
                          break;
                        default:
                          f.error("Wap:handle action msg no meta.add", h)()
                      }
                      break;
                    case "cmd":
                      for (S = 0; N > S; S++) {
                        var k = this.parseCmd(v[S]);
                        if (k) {
                          var A = _.values(k).join(",");
                          f.logColor("green", "bin-recv: " + [r, "action", "cmd", A].join(","), h)(), Store.Cmd.handle([k], t)
                        } else f.error("Wap:handle action cmd invalid", h)()
                      }
                      break;
                    case "bcUpdate":
                      var I = [];
                      for (S = 0; N > S; S++) {
                        var O = this.parseBCUpdate(v[S]);
                        O ? I.push(O) : f.error("Wap:handle action bc update invalid", v[S])()
                      }
                      f.logColor("green", "bin-recv: " + [r, "action", "bcUpdate", I.length].join(","), h)(), I.length > 0 && Store.GroupMetadata.handle(I, t);
                      break;
                    case "ack":
                      for (S = 0; N > S; S++) {
                        var R = this.parseAck(v[S]);
                        R ? (f.logColor("green", "bin-recv: " + [r, "action", "ack", R.to, R.id, R.ack].join(","), h)(), Store.Msg.handle([R], t)) : f.error("Wap:handle action ack invalid", h)()
                      }
                      break;
                    case "contact":
                      for (d = [], S = 0; N > S; S++) s = this.parseContact(v[S]), s ? d.push(s) : f.error("Wap:handle action contact dropped", v[S])();
                      if (f.logColor("green", "bin-recv: " + [r, "action", "contact", d.length, p.missing].join(","), h)(), d.length > 0) {
                        var P = [d];
                        (p.missing || p.checksum) && P.push(p), Store.Contact.handle(P, t)
                      }
                      break;
                    case "chat":
                      for (l = [], S = 0; N > S; S++) c = this.parseChat(v[S]), c ? l.push(c) : f.error("Wap:handle action chat dropped", v[S])();
                      f.logColor("green", "bin-recv: " + [r, "action", "chat", l.length].join(","), h)(), l.length > 0 && Store.Chat.handle([l], t);
                      break;
                    case "battery":
                      var M = this.parseBattery(v[0]);
                      M ? (f.logColor("green", "bin-recv: " + [r, "action", "battery", M.battery, M.plugged].join(","), h)(), Store.Conn.handle([M], t)) : f.error("Wap:handle action battery dropped", v[0])();
                      break;
                    case "mute":
                      for (l = [], S = 0; N > S; S++) c = this.parseChat(v[S]), c ? l.push(c) : f.error("Wap:handle action mute dropped", v[S])();
                      f.logColor("green", "bin-recv: " + [r, "action", "mute", l.length].join(","), h)(), l.length > 0 && Store.Mute.handle(l, t);
                      break;
                    default:
                      f.error("Wap:handle action unknown " + y, h)()
                  }
                }
            }
            break;
          default:
            f.errorVerbose("TODO " + this.N.toString(h, !0), h)()
        }
        return !0
      },
      requestDeviceUploadLogs: function() {
        var e, t = this;
        return new s["default"](function(r, n) {
          if (t.isRequestingDeviceUploadLogsMutex) return void r();
          e = ++t.isRequestingDeviceUploadLogsMutex;
          var o = t.actionNode("debug", [
              ["log", void 0, void 0]
            ]),
            i = r;
          i.drop = !0, p.send({
            data: t.BinaryProtocol.write(o),
            onSend: i,
            onDrop: n,
            binaryOpts: {
              debugString: "debug,log",
              debugObj: o,
              metric: t.M.DEBUG_LOG,
              ackRequest: !0
            }
          })
        })["finally"](function() {
          e === t.isRequestingDeviceUploadLogsMutex && (t.isRequestingDeviceUploadLogsMutex = 0)
        })
      },
      resyncMessages: function(e) {
        var t = this;
        return new m(function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (f.logColor("green", "bin-recv: response,resume", o)(), "response" === t.N.tag(o) && "resume" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseChat(i[a]);
                  d && n.push(d)
                }
              }
              r({
                checksum: t.N.attr("checksum", o),
                data: n
              })
            },
            i = e.map(function(e) {
              var t = {
                jid: e.wid,
                index: e.id,
                owner: e.fromMe,
                archive: (!!e.archive).toString()
              };
              return e.mute && (t.mute = e.mute.toString()), e.active && (t.active = "true"), v.isGroup(e.wid) && (t.read_only = (!!e.isReadOnly).toString()), e.modifyTag && (t.modify_tag = e.modifyTag.toString()), e.unreadCount && (t.count = e.unreadCount.toString()), ["last", t, void 0]
            }),
            a = t.queryNode({
              type: "resume"
            }, i);
          p.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: n,
            binaryOpts: {
              debugString: "query,resume",
              debugObj: a,
              metric: t.M.QUERY_RESUME,
              ackRequest: !1
            }
          })
        })
      },
      resyncReceipts: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (f.logColor("green", "bin-recv: response,receipt", o)(), "response" === t.N.tag(o) && "receipt" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s, d, u = i.length;
                for (a = 0; u > a; a++) {
                  s = i[a], d = t.N.children(s);
                  var c = t.N.attr("jid", s),
                    l = t.N.attr("t", s);
                  if ("receipt" === t.N.tag(s) && c && l && _.isArray(d)) {
                    var h, p = [],
                      g = d.length;
                    for (h = 0; g > h; h++) {
                      var m = d[h];
                      if ("item" === t.N.tag(m)) {
                        var v = t.N.attr("index", m),
                          y = parseInt(t.N.attr("status", m), 10) || 0;
                        v && 0 !== y && 4 >= y && p.push([v, !0, void 0, y])
                      }
                    }
                    p.length > 0 && n.push({
                      id: c,
                      t: parseInt(l, 10),
                      acks: p
                    })
                  }
                }
              }
              r(n)
            },
            i = e.map(function(e) {
              return ["last", {
                jid: e.remote,
                index: e.id,
                t: e.t.toString()
              }, void 0]
            }),
            a = t.queryNode({
              type: "receipt"
            }, i);
          p.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: n,
            binaryOpts: {
              debugString: "query,receipt",
              debugObj: a,
              metric: t.M.QUERY_RECEIPT,
              ackRequest: !1
            }
          })
        })
      },
      addParticipant: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = p.tag(),
            a = r.wrap(n);
          a.tag = i;
          var s = ["participant", {
              jid: t
            }, void 0],
            d = ["group", {
                id: i,
                jid: e,
                type: "add",
                author: Store.Conn.me
              },
              [s]
            ],
            u = r.actionNode("set", [d]);
          p.send({
            data: r.BinaryProtocol.write(u),
            onSend: a,
            onDrop: o,
            binaryOpts: {
              debugString: "action,group,add_participant",
              debugObj: u,
              metric: r.M.GROUP,
              ackRequest: !1
            }
          })
        })
      },
      changeSubject: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = p.tag(),
            a = r.wrap(n);
          a.tag = i;
          var s = ["group", {
              id: i,
              jid: e,
              type: "subject",
              author: Store.Conn.me,
              subject: t
            }, void 0],
            d = r.actionNode("set", [s]);
          p.send({
            data: r.BinaryProtocol.write(d),
            onSend: a,
            onDrop: o,
            binaryOpts: {
              debugString: "action,group,subject",
              debugObj: d,
              metric: r.M.GROUP,
              ackRequest: !1
            }
          })
        })
      },
      createGroup: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = p.tag(),
            a = r.wrap(n);
          a.tag = i;
          var s = t.map(function(e) {
            return ["participant", {
              jid: e
            }, void 0]
          });
          f.log("create group tag", i)();
          var d = ["group", {
              id: i,
              type: "create",
              author: Store.Conn.me,
              subject: e
            }, s],
            u = r.actionNode("set", [d]);
          p.send({
            data: r.BinaryProtocol.write(u),
            onSend: a,
            onDrop: o,
            binaryOpts: {
              debugString: "action,group,create",
              debugObj: u,
              metric: r.M.GROUP,
              ackRequest: !1
            }
          })
        })
      },
      leaveGroup: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = p.tag(),
            i = t.wrap(r);
          i.tag = o;
          var a = ["group", {
              id: o,
              jid: e,
              type: "leave",
              author: Store.Conn.me
            }, void 0],
            s = t.actionNode("set", [a]);
          p.send({
            data: t.BinaryProtocol.write(s),
            onSend: i,
            onDrop: n,
            binaryOpts: {
              debugString: "action,group,delete",
              debugObj: s,
              metric: t.M.GROUP,
              ackRequest: !1
            }
          })
        })
      },
      removeParticipant: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = p.tag(),
            a = r.wrap(n);
          a.tag = i;
          var s = ["participant", {
              jid: t
            }, void 0],
            d = ["group", {
                id: i,
                jid: e,
                type: "remove",
                author: Store.Conn.me
              },
              [s]
            ],
            u = r.actionNode("set", [d]);
          p.send({
            data: r.BinaryProtocol.write(u),
            onSend: a,
            onDrop: o,
            binaryOpts: {
              debugString: "action,group,rem_participant",
              debugObj: u,
              metric: r.M.GROUP,
              ackRequest: !1
            }
          })
        })
      },
      requestMediaReupload: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = e.id,
            i = function(e) {
              var n, o = t.BinaryProtocol.read(e);
              if ("response" === t.N.tag(o) && "media" === t.N.attr("type", o)) {
                var i = parseInt(t.N.attr("code", o)) || 400,
                  a = t.N.attr("url", o);
                i >= 500 && 502 !== i ? (f.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : 200 === i && a ? n = {
                  status: 200,
                  url: a,
                  mediaKey: t.N.attr("media_key", o)
                } : 200 !== i || a ? (f.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : n = {
                  status: 400
                }
              } else f.error("wap:requestMediaReupload:malformed")(), n = {
                status: 400
              };
              r(n)
            },
            a = o,
            s = t.queryNode({
              type: "media",
              index: a.id,
              jid: a.remote,
              owner: a.fromMe.toString()
            }, void 0);
          p.sendEphemeral({
            data: t.BinaryProtocol.write(s),
            onSend: t.binWrap(i, r),
            onDrop: n,
            binaryOpts: {
              debugString: "query,media",
              debugObj: s,
              metric: t.M.QUERY_MEDIA,
              ackRequest: !1
            }
          })
        })
      },
      sendConversationSeen: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, a) {
          var s = o,
            d = n.actionNode("set", [
              ["read", {
                jid: e,
                index: t ? t.id : void 0,
                owner: t ? t.fromMe.toString() : void 0,
                count: r && t ? r.toString() : void 0
              }, void 0]
            ]);
          p.sendEphemeral({
            data: n.BinaryProtocol.write(d),
            onSend: s,
            onDrop: a,
            binaryOpts: {
              debugString: "action,chat,read, " + (0, i["default"])(t) + ", " + r,
              debugObj: d,
              metric: n.M.READ,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationDelete: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = r,
            i = t.actionNode("set", [
              ["chat", {
                type: "delete",
                jid: e
              }, void 0]
            ]);
          p.send({
            data: t.BinaryProtocol.write(i),
            onSend: o,
            onDrop: n,
            binaryOpts: {
              debugString: "action,chat,delete",
              debugObj: i,
              metric: t.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationArchive: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = n,
            a = t ? "archive" : "unarchive",
            s = r.actionNode("set", [
              ["chat", {
                type: a,
                jid: e
              }, void 0]
            ]);
          p.send({
            data: r.BinaryProtocol.write(s),
            onSend: i,
            onDrop: o,
            binaryOpts: {
              debugString: "action,chat, " + a,
              debugObj: s,
              metric: r.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationMute: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = n,
            a = t ? t.toString() : void 0,
            s = r.actionNode("set", [
              ["chat", {
                type: "mute",
                mute: a,
                jid: e
              }, void 0]
            ]);
          p.send({
            data: r.BinaryProtocol.write(s),
            onSend: i,
            onDrop: o,
            binaryOpts: {
              debugString: "action,chat, " + e + ", " + (a ? "mute, " + a : "unmute"),
              debugObj: s,
              metric: r.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendMessagePlayed: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = r,
            i = e.remote,
            a = e.id,
            s = t.actionNode("set", [
              ["received", {
                type: "played",
                index: a,
                from: i
              }, void 0]
            ]);
          p.send({
            data: t.BinaryProtocol.write(s),
            onSend: o,
            onDrop: n,
            binaryOpts: {
              debugString: "action,played, " + i + "_" + a,
              debugObj: s,
              metric: t.M.RECEIVED,
              ackRequest: !0
            }
          })
        })
      },
      profilePicFindThumbFromPhone: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = function(i) {
              var a = r.BinaryProtocol.read(i);
              "response" === r.N.tag(a) && "preview" === r.N.attr("type", a) || o();
              var s = r.N.children(a),
                d = s && s[0];
              if (d || o(), "missing" === r.N.attr("type", d)) n({
                id: e,
                tag: void 0,
                raw: void 0
              });
              else {
                var u, c = r.N.attr("id", d);
                if (t && c === t.tag && t.raw) u = t.raw;
                else {
                  var l = r.N.children(d);
                  u = l ? l.toBase64() : void 0
                }
                n({
                  id: e,
                  tag: c,
                  raw: u
                })
              }
            },
            a = {
              type: "preview",
              jid: e
            };
          t && t.tag && (a.id = t.tag);
          var s = r.queryNode(a, []);
          p.sendEphemeral({
            data: r.BinaryProtocol.write(s),
            onSend: r.binWrap(i, n),
            onDrop: o,
            binaryOpts: {
              debugString: "query,thumb, " + e,
              debugObj: s,
              ackRequest: !1
            }
          })
        })
      },
      groupMetadataFindFromPhone: function(e, t) {
        var r = this;
        return new s["default"](function(t, n) {
          var o = function(n) {
              var o = r.BinaryProtocol.read(n);
              if ("response" !== r.N.tag(o) || "group" !== r.N.attr("type", o)) return void t({
                status: "error",
                info: "bad format: response incorrect"
              });
              var i = r.N.children(o),
                a = i && i[0];
              if (!a) return void t({
                status: "error",
                info: "bad format: no group node"
              });
              if ("missing" === r.N.attr("type")) return void t({
                status: "missing"
              });
              var s = _.map(r.N.children(a), function(e) {
                return {
                  id: r.N.attr("jid", e),
                  isAdmin: "admin" === r.N.attr("type", e)
                }
              });
              t({
                status: "ok",
                data: {
                  id: e,
                  owner: r.N.attr("creator", a),
                  creation: parseInt(r.N.attr("create", a), 10) || void 0,
                  participants: s,
                  stale: !1
                }
              })
            },
            i = r.queryNode({
              type: "group",
              jid: e
            }, []);
          p.sendEphemeral({
            data: r.BinaryProtocol.write(i),
            onSend: r.binWrap(o, t),
            onDrop: n,
            binaryOpts: {
              debugString: "query,group, " + e,
              debugObj: i,
              ackRequest: !1
            }
          })
        })
      },
      sendPresenceUpdate: function(e) {
        var t = this;
        return ["available", "unavailable"].indexOf(e) > -1 ? new s["default"](function(r, n) {
          var o = r,
            i = t.actionNode("set", [
              ["presence", {
                type: e
              }, void 0]
            ]),
            a = {
              data: t.BinaryProtocol.write(i),
              onSend: o,
              onDrop: n,
              binaryOpts: {
                debugString: "action,presence, " + e,
                debugObj: i,
                metric: t.M.PRESENCE,
                available: "available" === e,
                ackRequest: "available" === e
              }
            };
          "available" === e ? p.sendEphemeral(a) : p.sendEphemeralIgnore(a)
        }) : void 0
      },
      sendChatstateUpdate: function(e, t) {
        var r = this;
        return ["composing", "paused", "recording"].indexOf(e) > -1 ? new s["default"](function(n, o) {
          var i = n,
            a = r.actionNode("set", [
              ["presence", {
                type: e,
                to: t
              }, void 0]
            ]);
          p.sendEphemeralIgnore({
            data: r.BinaryProtocol.write(a),
            onSend: i,
            onDrop: o,
            binaryOpts: {
              debugString: "action,chatstate, " + e,
              debugObj: a,
              metric: r.M.PRESENCE,
              skipOffline: !0,
              ackRequest: !1
            }
          }, !0)
        }) : void 0
      },
      sendSetPicture: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = y.parseDataURL(t).data,
            s = y.parseDataURL(r).data,
            d = g.fromBase64(a, !1),
            u = g.fromBase64(s, !1),
            c = p.tag(),
            l = n.wrap(o);
          l.tag = c;
          var f = ["picture", {
                id: c,
                jid: e,
                type: "set"
              },
              [
                ["image", void 0, u],
                ["preview", void 0, d]
              ]
            ],
            h = n.actionNode("set", [f]);
          p.send({
            data: n.BinaryProtocol.write(h),
            onSend: l,
            onDrop: i,
            binaryOpts: {
              debugString: "action,set_pic, " + e,
              debugObj: h,
              metric: n.M.PIC,
              ackRequest: !1
            }
          })
        })
      },
      deletePicture: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = p.tag(),
            i = t.wrap(r);
          i.tag = o;
          var a = ["picture", {
              id: o,
              jid: e,
              type: "delete"
            }, void 0],
            s = t.actionNode("set", [a]);
          p.send({
            data: t.BinaryProtocol.write(s),
            onSend: i,
            onDrop: n,
            binaryOpts: {
              debugString: "action,delete_pic, " + e,
              debugObj: s,
              metric: t.M.PIC,
              ackRequest: !1
            }
          })
        })
      },
      sendSetStatus: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = p.tag(),
            i = t.wrap(r);
          i.tag = o;
          var a = t.actionNode("set", [
            ["status", void 0, e]
          ]);
          p.send({
            data: t.BinaryProtocol.write(a),
            onSend: i,
            onDrop: n,
            binaryOpts: {
              debugString: "action,status,set",
              debugObj: a,
              metric: t.M.STATUS,
              ackRequest: !1
            }
          })
        })
      },
      chatFindQuery: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if ("response" === t.N.tag(o) && "chat" === t.N.attr("type", o))
                if ("true" === t.N.attr("duplicate", o)) n = "preempted";
                else if (_.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseChat(i[a]);
                  d && n.push(d)
                }
              }
              r(n)
            },
            i = t.queryNode({
              type: "chat",
              kind: e ? "retry" : void 0
            }, void 0);
          p.sendEphemeral({
            data: t.BinaryProtocol.write(i),
            onSend: t.binWrap(o, r),
            onDrop: n,
            binaryOpts: {
              debugString: "query,chat, " + e,
              debugObj: i,
              metric: t.M.QUERY_CHAT,
              ackRequest: !1
            }
          })
        })
      },
      contactFindQuery: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if ("response" === t.N.tag(o) && "contacts" === t.N.attr("type", o))
                if ("true" === t.N.attr("duplicate", o)) n = "preempted";
                else if (_.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseContact(i[a]);
                  d && n.push(d)
                }
              }
              r({
                checksum: t.N.attr("checksum", o),
                data: n
              })
            },
            i = t.queryNode({
              type: "contacts",
              kind: e ? "retry" : void 0
            }, void 0);
          p.send({
            data: t.BinaryProtocol.write(i),
            onSend: t.binWrap(o, r),
            onDrop: n,
            binaryOpts: {
              debugString: "query,contacts, " + e,
              debugObj: i,
              metric: t.M.QUERY_CONTACTS,
              ackRequest: !1
            }
          })
        })
      },
      msgCreateRecord: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i, a, d = e.id;
          if ("chat" === e.type) a = s["default"].cast(["message", {
              type: "text",
              to: e.to,
              id: e.id,
              t: e.t.toString()
            },
            [
              ["body", void 0, e.body]
            ]
          ]);
          else if ("location" === e.type) i = e.body ? g.fromBase64(e.body, !1) : void 0, a = s["default"].cast(["message", {
              type: "media",
              to: e.to,
              id: e.id,
              t: e.t.toString()
            },
            [
              ["media", {
                type: "location",
                latitude: e.lat || void 0,
                longitude: e.lng || void 0,
                name: e.loc && e.url ? e.loc : void 0,
                url: e.loc && e.url ? e.url : void 0,
                encoding: e.body ? "raw" : void 0
              }, i]
            ]
          ]);
          else if ("vcard" === e.type) {
            var u = ["vcard", {
              name: e.subtype
            }, e.body];
            a = s["default"].cast(["message", {
                type: "media",
                to: e.to,
                id: e.id,
                t: e.t.toString()
              },
              [
                ["media", {
                    type: "vcard"
                  },
                  [u]
                ]
              ]
            ])
          } else {
            var c = e.mediaKey;
            i = e.body ? g.fromBase64(e.body, !1) : void 0, a = (t && !c ? r.sendMedia(e.avparams) : s["default"].resolve(_.merge({
              status: 200
            }, e.avparams))).then(function(t) {
              return 200 === t.status ? s["default"].cast(["message", {
                  type: "media",
                  to: e.to,
                  id: e.id,
                  t: e.t.toString()
                },
                [
                  ["media", {
                    encoding: e.body ? "raw" : void 0,
                    origin: "ptt" === e.type ? "live" : void 0,
                    seconds: "ptt" === e.type && e.duration ? e.duration.toString() : void 0,
                    type: t.type,
                    mimetype: e.mimetype || t.mimetype || void 0,
                    size: e.size ? e.size.toString() : void 0,
                    filehash: t.filehash,
                    url: t.url,
                    duration: t.duration ? t.duration.toString() : void 0,
                    vcodec: t.vcodec || void 0,
                    width: t.width ? t.width.toString() : void 0,
                    height: t.height ? t.height.toString() : void 0,
                    fps: t.fps ? t.fps.toString() : void 0,
                    vbitrate: t.vbitrate ? t.vbitrate.toString() : void 0,
                    acodec: t.acodec || void 0,
                    asampfreq: t.asampfreq ? t.asampfreq.toString() : void 0,
                    asampfmt: t.asampfmt || void 0,
                    abitrate: t.abitrate ? t.abitrate.toString() : void 0,
                    caption: "video" !== e.type && "image" !== e.type || !e.caption ? void 0 : e.caption,
                    page_count: "number" != typeof e.pageCount || isNaN(e.pageCount) ? void 0 : e.pageCount.toString(),
                    media_key: c,
                    filename: t.filename
                  }, i]
                ]
              ]) : (f.error("wap:msgCreateRecord:sendMedia error " + t.status)(), s["default"].reject())
            })["catch"](function() {
              return f.error("wap:msgCreateRecord:sendMedia dropped")(), s["default"].reject()
            })
          }
          a.then(function(t) {
            var i = r.actionNode("relay", [t]),
              a = r.wrap(n);
            a.tag = d, a.meta = {
              type: "message",
              key: new w(e.from, e.to, e.id)
            }, p.send({
              data: r.BinaryProtocol.write(i),
              onSend: a,
              onDrop: o,
              binaryOpts: {
                debugString: "action,message, " + e.type,
                debugObj: i,
                metric: r.M.MESSAGE,
                ackRequest: !1
              }
            })
          })["catch"](function() {
            f.error("wap:msgCreateRecord mPromise error")(), o()
          })
        })
      },
      msgFindQuery: function(e, t) {
        var r = this;
        return "before" !== e ? s["default"].reject("wap:msgFindQuery:unsupported:" + e) : new s["default"](function(e, n) {
          var o = function(t) {
              var n = [],
                o = r.BinaryProtocol.read(t),
                i = r.N.children(o);
              if ("response" === r.N.tag(o) && "message" === r.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = r.parseMsg(i[a], "response");
                  d && n.push(d)
                }
              }
              e(n)
            },
            i = r.queryNode({
              type: "message",
              jid: t.remote,
              count: t.count.toString(),
              index: t.id,
              owner: "undefined" == typeof t.fromMe ? void 0 : t.fromMe.toString()
            }, void 0);
          p.sendEphemeral({
            data: r.BinaryProtocol.write(i),
            onSend: r.binWrap(o, e),
            onDrop: n,
            binaryOpts: {
              debugString: "query,message, " + t.remote + "_" + t.id + "_" + t.fromMe + "_" + t.count,
              debugObj: i,
              metric: r.M.QUERY_MESSAGES,
              ackRequest: !1
            }
          })
        })
      },
      presenceSubscribe: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = r,
            i = t.actionNode("set", [
              ["presence", {
                type: "subscribe",
                to: e
              }, void 0]
            ]);
          p.sendEphemeral({
            data: t.BinaryProtocol.write(i),
            onSend: o,
            onDrop: n,
            binaryOpts: {
              debugString: "action,presence,subscribe, " + e,
              debugObj: i,
              metric: t.M.PRESENCE_SUBSCRIBE,
              ackRequest: !0
            }
          })
        })
      },
      sendMedia: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = _.clone(e),
            i = function(e) {
              r(_.merge(o, e))
            };
          p.send({
            data: ["query", "sendMedia", o.url],
            onSend: t.wrap(i),
            onDrop: n
          })
        })
      }
    };
  e.exports = E
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(27),
    i = n(o),
    a = r(3),
    s = n(a),
    d = r(36),
    u = n(d),
    c = r(1),
    l = r(21),
    f = r(13),
    h = r(9),
    p = r(39),
    g = r(22),
    m = r(61),
    v = r(67),
    y = r(108),
    b = r(183),
    w = {
      BinaryProtocol: null,
      N: null,
      M: {
        DEBUG_LOG: 1,
        QUERY_RESUME: 2,
        QUERY_RECEIPT: 3,
        QUERY_MEDIA: 4,
        QUERY_CHAT: 5,
        QUERY_CONTACTS: 6,
        QUERY_MESSAGES: 7,
        PRESENCE: 8,
        PRESENCE_SUBSCRIBE: 9,
        GROUP: 10,
        READ: 11,
        CHAT: 12,
        RECEIVED: 13,
        PIC: 14,
        STATUS: 15,
        MESSAGE: 16,
        QUERY_ACTIONS: 17,
        BLOCK: 18,
        QUERY_GROUP: 19,
        QUERY_PREVIEW: 20
      },
      epochCount: 0,
      epoch: 0,
      isRequestingDeviceUploadLogsMutex: 0,
      epochSend: function(e) {
        return 0 === this.epochCount && this.epoch++, e || this.epochCount++, c.log("wap:epochCount: " + this.epochCount + " epoch: " + this.epoch)(), this.epoch.toString()
      },
      epochRecv: function() {
        this.epochCount > 0 ? this.epochCount-- : c.error("wap:epochRecv: NEGATIVE")(), c.log("wap:epochCount: " + this.epochCount + " epoch: " + this.epoch)()
      },
      wrap: function(e) {
        var t = this;
        return function(r) {
          return r && "number" == typeof r.status && r.status >= 500 ? r : (t.epochRecv(), void e(r))
        }
      },
      binWrap: function(e, t) {
        var r = this;
        return function(n) {
          if ("object" === ("undefined" == typeof n ? "undefined" : (0, u["default"])(n)) && "number" == typeof n.status) {
            if (401 === n.status) throw r.epochRecv(), new l.E401;
            if (n.status >= 500) return n;
            r.epochRecv(), t(n)
          } else r.epochRecv(), e(n)
        }
      },
      actionNode: function(e, t, r) {
        return ["action", {
          type: e,
          epoch: this.epochSend(r)
        }, t]
      },
      queryNode: function(e, t) {
        return e.epoch = this.epochSend(), ["query", e, t]
      },
      parseMsgMessage: function(e, t) {
        if ("message" === this.N.tag(e)) {
          var r;
          this.N.attr("from", e) !== Store.Conn.me || this.N.attr("to", e) ? this.N.attr("to", e) !== Store.Conn.me || this.N.attr("from", e) || (r = "out") : r = "in";
          var n, o = this.N.attr("id", e),
            i = parseInt(this.N.attr("t", e), 10) || 0,
            a = this.N.attr("to", e) || Store.Conn.me,
            s = this.N.attr("from", e) || Store.Conn.me,
            d = "broadcast" === s.split("@")[1],
            u = this.N.attr("participant", e),
            l = d ? u : s,
            f = d ? void 0 : u,
            h = d ? !1 : this.N.child("broadcast", e) && s === Store.Conn.me,
            p = "invis" === this.N.attr("web", e),
            g = this.N.attr("notify", e) || "",
            m = parseInt(this.N.attr("status", e)) || 0,
            v = [],
            y = this.N.child("broadcast", e);
          if ("broadcast" !== a) {
            switch (t) {
              case "fresh":
                n = 1;
                break;
              default:
                n = m >= -1 && 4 >= m ? m : 1
            }
            if (_.isArray(y)) {
              var b, w = y.length;
              for (b = 0; w > b; b++) {
                var E = y[b],
                  S = this.N.attr("jid", E);
                "to" === this.N.tag(E) && S && v.push(S)
              }
            }
            var N, T = [],
              $ = this.N.attr("type", e);
            switch ($) {
              case "ciphertext":
              case "text":
                var C = this.N.dataStr(this.N.child("body", e)) || "";
                N = {
                  id: o,
                  body: "text" === $ ? C : void 0,
                  type: "text" === $ ? "chat" : "ciphertext",
                  t: i,
                  notifyName: g,
                  from: l,
                  to: a,
                  self: r,
                  author: f,
                  invis: p,
                  ack: n,
                  broadcast: h,
                  recipients: v
                }, T = [!o, !i, !l, !a];
                break;
              case "media":
                var k, A, I, O, R, P = this.N.child("media", e),
                  M = this.N.attr("type", P),
                  L = this.N.attr("media_key", P),
                  D = this.N.attr("mimetype", P);
                if ("retry" === this.N.attr("reason", P)) return;
                switch (M) {
                  case "image":
                  case "video":
                    var x = this.N.attr("caption", P);
                    k = this.thumbFromMediaXml(P), A = this.N.attr("url", P), A = _.isString(A) && A.indexOf("/u/") > 0 ? void 0 : A, I = this.N.attr("filehash", P), O = parseInt(this.N.attr("size", P), 10) || 0, R = this.N.attr("seconds", P), N = {
                      id: o,
                      body: k,
                      type: M,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      duration: R,
                      broadcast: h,
                      recipients: v,
                      filehash: I,
                      size: O,
                      caption: x,
                      mediaKey: L,
                      mimetype: D
                    }, T = [!o, !i, !l, !a];
                    break;
                  case "location":
                    var j = this.N.attr("latitude", P),
                      U = this.N.attr("longitude", P),
                      B = this.N.attr("name", P);
                    k = this.thumbFromMediaXml(P), A = this.N.attr("url", P), N = {
                      id: o,
                      body: k,
                      type: M,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      loc: B,
                      lat: j,
                      lng: U,
                      broadcast: h,
                      recipients: v
                    }, T = [!o, !i, !l, !a, !j || !U];
                    break;
                  case "audio":
                    var F = "live" === this.N.attr("origin", P) ? "ptt" : M;
                    A = this.N.attr("url", P), A = _.isString(A) && A.indexOf("/u/") > 0 ? void 0 : A, I = this.N.attr("filehash", P), O = parseInt(this.N.attr("size", P), 10) || 0, R = this.N.attr("seconds", P), N = {
                      id: o,
                      type: F,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      duration: R,
                      broadcast: h,
                      recipients: v,
                      filehash: I,
                      size: O,
                      mediaKey: L,
                      mimetype: D
                    }, T = [!o, !i, !l, !a];
                    break;
                  case "vcard":
                    var W = this.N.child("vcard", P),
                      Y = this.N.dataStr(W),
                      G = this.N.attr("name", W);
                    N = {
                      id: o,
                      body: Y,
                      type: M,
                      subtype: G,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      invis: p,
                      ack: n,
                      broadcast: h,
                      recipients: v
                    }, T = [!o, !i, !l, !a, !Y, !G];
                    break;
                  default:
                    c.error("wap:parseMsgMessage unknown media type: " + this.N.toString(e), e)()
                }
                break;
              default:
                c.error("wap:parseMsgMessage unknown message type: " + this.N.toString(e), e)()
            }
            return this.dropIfConditionMet(T, N)
          }
        }
      },
      parseMsgGp2: function(e) {
        if ("groups_v2" === this.N.tag(e)) {
          var t, r = parseInt(this.N.attr("t", e), 10) || 0,
            n = this.N.attr("id", e),
            o = this.N.attr("jid", e),
            i = "invis" === this.N.attr("web", e),
            a = this.N.attr("type", e),
            s = this.N.attr("author", e),
            d = this.N.children(e),
            u = [];
          switch (a) {
            case "create":
              t = this.N.attr("subject", e);
              break;
            case "subject":
              t = this.N.attr("subject", e);
              break;
            case "picture":
              t = this.N.attr("picture", e)
          }
          if (_.isArray(d)) {
            var c, l = d.length;
            for (c = 0; l > c; c++) {
              var f = d[c],
                h = this.N.attr("jid", f);
              "participant" === this.N.tag(f) && h && u.push(h)
            }
          }
          var p = {
              t: r,
              id: n,
              to: o,
              from: o,
              author: s,
              body: t ? t.toString() : void 0,
              type: "gp2",
              subtype: a,
              invis: i,
              recipients: u
            },
            g = [!n, !r, "subject" !== a && "add" !== a && "remove" !== a && "leave" !== a && "picture" !== a && "modify" !== a && "create" !== a && "delete" !== a && "promote" !== a && "demote" !== a, "subject" === a && !t, ("add" === a || "remove" === a || "leave" === a || "promote" === a || "demote" === a || "modify" === a) && 0 === u.length, !o, "string" == typeof o && "g.us" !== o.split("@")[1]];
          return this.dropIfConditionMet(g, p)
        }
      },
      setGroupParticipant: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = f.tag(),
            s = n.wrap(o),
            d = ["participant", {
              jid: r
            }, void 0],
            u = ["group", {
                id: a,
                jid: t,
                type: e,
                author: Store.Conn.me
              },
              [d]
            ],
            c = n.actionNode("set", [u]);
          f.send({
            tag: a,
            data: n.BinaryProtocol.write(c),
            clientCacheable: !0,
            onSend: s,
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,group,participant," + [e, t, r].join(","),
              debugObj: c,
              metric: n.M.GROUP,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      "delete": function() {
        this.epochCount = 0, this.epoch = 0
      },
      error2412: function() {
        this.epochRecv()
      },
      setSubProtocol: function(e) {
        4 === e ? (this.BinaryProtocol = new v("04"), this.N = this.BinaryProtocol.Node) : (c.error("Wap:setSubProtocol unknown " + e)(), this.BinaryProtocol = new v("04"), this.N = this.BinaryProtocol.Node)
      },
      requestDeviceUploadLogs: function() {
        var e, t = this;
        return new s["default"](function(r, n) {
          if (t.isRequestingDeviceUploadLogsMutex) return void r();
          e = ++t.isRequestingDeviceUploadLogsMutex;
          var o = t.actionNode("debug", [
              ["log", void 0, void 0]
            ]),
            i = t.wrap(r);
          i.drop = !0, f.send({
            data: t.BinaryProtocol.write(o),
            clientCacheable: !0,
            onSend: i,
            onDrop: n,
            binaryOpts: {
              debugString: "debug,log",
              debugObj: o,
              metric: t.M.DEBUG_LOG,
              ackRequest: !0
            }
          })
        })["finally"](function() {
          e === t.isRequestingDeviceUploadLogsMutex && (t.isRequestingDeviceUploadLogsMutex = 0)
        })
      },
      resyncMessages: function(e) {
        var t = this;
        return new p(function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (c.logColor("green", "bin-recv: response,resume", o)(), "response" === t.N.tag(o) && "resume" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseChat(i[a]);
                  d && n.push(d)
                }
              }
              r({
                checksum: t.N.attr("checksum", o),
                data: n
              })
            },
            i = e.map(function(e) {
              var t = {
                jid: e.wid,
                index: e.id,
                owner: e.fromMe,
                archive: (!!e.archive).toString()
              };
              return e.mute && (t.mute = e.mute.toString()), e.active && (t.active = "true"), g.isGroup(e.wid) && (t.read_only = (!!e.isReadOnly).toString()), e.modifyTag && (t.modify_tag = e.modifyTag.toString()), e.unreadCount && (t.count = e.unreadCount.toString()), ["last", t, void 0]
            }),
            a = t.queryNode({
              type: "resume"
            }, i);
          f.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,resume",
              debugObj: a,
              metric: t.M.QUERY_RESUME,
              ackRequest: !1
            }
          })
        })
      },
      resyncReceipts: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (c.logColor("green", "bin-recv: response,receipt", o)(), "response" === t.N.tag(o) && "receipt" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s, d, u = i.length;
                for (a = 0; u > a; a++) {
                  s = i[a], d = t.N.children(s);
                  var l = t.N.attr("jid", s),
                    f = t.N.attr("t", s);
                  if ("receipt" === t.N.tag(s) && l && f && _.isArray(d)) {
                    var h, p = [],
                      g = d.length;
                    for (h = 0; g > h; h++) {
                      var m = d[h];
                      if ("item" === t.N.tag(m)) {
                        var v = t.N.attr("index", m),
                          y = parseInt(t.N.attr("status", m), 10) || 0;
                        v && 0 !== y && 4 >= y && p.push([v, !0, void 0, y])
                      }
                    }
                    p.length > 0 && n.push({
                      id: l,
                      t: parseInt(f, 10),
                      acks: p
                    })
                  }
                }
              }
              r(n)
            },
            i = e.map(function(e) {
              return ["last", {
                jid: e.remote,
                index: e.id,
                t: e.t.toString()
              }, void 0]
            }),
            a = t.queryNode({
              type: "receipt"
            }, i);
          f.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,receipt",
              debugObj: a,
              metric: t.M.QUERY_RECEIPT,
              ackRequest: !1
            }
          })
        })
      },
      queryReceivedActions: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (c.logColor("green", "bin-recv: response,actions", o)(), "response" === t.N.tag(o) && "action" === t.N.attr("type", o))
                if (_.isArray(i)) {
                  var a, s = i.length;
                  for (a = 0; s > a; a++) {
                    var d = i[a],
                      u = t.N.attr("id", d),
                      l = parseInt(t.N.attr("code", d), 10) || 0;
                    "item" === t.N.tag(d) && u && 0 !== l && n.push({
                      id: u,
                      code: l
                    })
                  }
                } else "true" === t.N.attr("replaced", o) && (n = "replaced");
              r(n)
            },
            i = e.map(function(e) {
              return ["item", {
                id: e
              }, void 0]
            }),
            a = t.queryNode({
              type: "action"
            }, i);
          f.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,actions",
              debugObj: a,
              metric: t.M.QUERY_ACTIONS,
              ackRequest: !1
            }
          })
        })
      },
      changeSubject: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = f.tag(),
            a = r.wrap(n);
          a.tag = i;
          var s = ["group", {
              id: i,
              jid: e,
              type: "subject",
              author: Store.Conn.me,
              subject: t
            }, void 0],
            d = r.actionNode("set", [s]);
          f.send({
            data: r.BinaryProtocol.write(d),
            clientCacheable: !0,
            onSend: a,
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "action,group,subject",
              debugObj: d,
              metric: r.M.GROUP,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      createGroup: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = f.tag(),
            a = r.wrap(n);
          a.tag = i;
          var s = t.map(function(e) {
            return ["participant", {
              jid: e
            }, void 0]
          });
          c.log("create group tag", i)();
          var d = ["group", {
              id: i,
              type: "create",
              author: Store.Conn.me,
              subject: e
            }, s],
            u = r.actionNode("set", [d]);
          f.send({
            data: r.BinaryProtocol.write(u),
            clientCacheable: !0,
            onSend: a,
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "action,group,create",
              debugObj: u,
              metric: r.M.GROUP,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      leaveGroup: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = f.tag(),
            i = t.wrap(r);
          i.tag = o;
          var a = ["group", {
              id: o,
              jid: e,
              type: "leave",
              author: Store.Conn.me
            }, void 0],
            s = t.actionNode("set", [a]);
          f.send({
            data: t.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: i,
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,group,delete",
              debugObj: s,
              metric: t.M.GROUP,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      addParticipant: function(e, t) {
        return this.setGroupParticipant("add", e, t)
      },
      removeParticipant: function(e, t) {
        return this.setGroupParticipant("remove", e, t)
      },
      promoteParticipant: function(e, t) {
        return this.setGroupParticipant("promote", e, t)
      },
      requestMediaReupload: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = e.id,
            i = function(e) {
              var n, o = t.BinaryProtocol.read(e);
              if ("response" === t.N.tag(o) && "media" === t.N.attr("type", o)) {
                var i = parseInt(t.N.attr("code", o)) || 400,
                  a = t.N.attr("url", o);
                i >= 500 && 502 !== i ? (c.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : 200 === i && a ? n = {
                  status: 200,
                  url: a,
                  mediaKey: t.N.attr("media_key", o)
                } : 200 !== i || a ? (c.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : n = {
                  status: 400
                }
              } else c.error("wap:requestMediaReupload:malformed")(), n = {
                status: 400
              };
              r(n)
            },
            a = o,
            s = t.queryNode({
              type: "media",
              index: a.id,
              jid: a.remote,
              owner: a.fromMe.toString()
            }, void 0);
          f.sendEphemeral({
            data: t.BinaryProtocol.write(s),
            onSend: t.binWrap(i, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,media",
              debugObj: s,
              metric: t.M.QUERY_MEDIA,
              ackRequest: !1
            }
          })
        })
      },
      sendConversationSeen: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, a) {
          var s = n.actionNode("set", [
            ["read", {
              jid: e,
              index: t ? t.id : void 0,
              owner: t ? t.fromMe.toString() : void 0,
              count: r && t ? r.toString() : void 0
            }, void 0]
          ]);
          f.send({
            data: n.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(a),
            binaryOpts: {
              debugString: "action,chat,read," + (0, i["default"])(t) + "," + r,
              debugObj: s,
              metric: n.M.READ,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationDelete: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = r.actionNode("set", [
            ["chat", {
              type: "delete",
              jid: e,
              index: t ? t.id : void 0,
              owner: t ? t.fromMe.toString() : void 0
            }, void 0]
          ]);
          f.send({
            data: r.BinaryProtocol.write(i),
            clientCacheable: !0,
            onSend: r.wrap(n),
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "action,chat,delete",
              debugObj: i,
              metric: r.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationArchive: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = t ? "archive" : "unarchive",
            s = n.actionNode("set", [
              ["chat", {
                type: a,
                jid: e,
                index: r ? r.id : void 0,
                owner: r ? r.fromMe.toString() : void 0
              }, void 0]
            ]);
          f.send({
            data: n.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,chat," + a,
              debugObj: s,
              metric: n.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationMute: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = t ? t.toString() : void 0,
            s = r ? r.toString() : void 0,
            d = n.actionNode("set", [
              ["chat", {
                type: "mute",
                mute: a,
                previous: s,
                jid: e
              }, void 0]
            ]);
          f.send({
            data: n.BinaryProtocol.write(d),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,chat," + e + ", " + (a ? "mute," + a : "unmute"),
              debugObj: d,
              metric: n.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendMessagePlayed: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = t.wrap(r),
            i = e.remote,
            a = e.id,
            s = t.actionNode("set", [
              ["received", {
                type: "played",
                index: a,
                from: i
              }, void 0]
            ]);
          f.send({
            data: t.BinaryProtocol.write(s),
            onSend: o,
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,played," + i + "_" + a,
              debugObj: s,
              metric: t.M.RECEIVED,
              ackRequest: !0
            }
          })
        })
      },
      profilePicFindThumbFromPhone: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = function(i) {
              var a = r.BinaryProtocol.read(i);
              "response" === r.N.tag(a) && "preview" === r.N.attr("type", a) || o();
              var s = r.N.children(a),
                d = s && s[0];
              if (d || o(), "missing" === r.N.attr("type", d)) n({
                id: e,
                tag: void 0,
                raw: void 0
              });
              else {
                var u, c = r.N.attr("id", d);
                if (t && c === t.tag && t.raw) u = t.raw;
                else {
                  var l = r.N.children(d);
                  u = l ? l.toBase64() : void 0
                }
                n({
                  id: e,
                  tag: c,
                  raw: u
                })
              }
            },
            a = {
              type: "preview",
              jid: e
            };
          t && t.tag && (a.id = t.tag);
          var s = r.queryNode(a, []);
          f.sendEphemeral({
            data: r.BinaryProtocol.write(s),
            onSend: r.binWrap(i, n),
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "query,thumb," + e,
              debugObj: s,
              metric: r.M.QUERY_PREVIEW,
              ackRequest: !1
            }
          })
        })
      },
      groupMetadataFindFromPhone: function(e, t) {
        var r = this;
        return new s["default"](function(t, n) {
          var o = function(n) {
              var o = r.BinaryProtocol.read(n);
              if ("response" !== r.N.tag(o) || "group" !== r.N.attr("type", o)) return void t({
                status: "error",
                info: "bad format: response incorrect"
              });
              var i = r.N.children(o),
                a = i && i[0];
              if (!a) return void t({
                status: "error",
                info: "bad format: no group node"
              });
              if ("missing" === r.N.attr("type")) return void t({
                status: "missing"
              });
              var s = _.map(r.N.children(a), function(e) {
                return {
                  id: r.N.attr("jid", e),
                  isAdmin: "admin" === r.N.attr("type", e)
                }
              });
              t({
                status: "ok",
                data: {
                  id: e,
                  owner: r.N.attr("creator", a),
                  creation: parseInt(r.N.attr("create", a), 10) || void 0,
                  participants: s,
                  stale: !1
                }
              })
            },
            i = r.queryNode({
              type: "group",
              jid: e
            }, []);
          f.sendEphemeral({
            data: r.BinaryProtocol.write(i),
            onSend: r.binWrap(o, t),
            onDrop: r.wrap(n),
            binaryOpts: {
              debugString: "query,group," + e,
              debugObj: i,
              metric: r.M.QUERY_GROUP,
              ackRequest: !1
            }
          })
        })
      },
      sendPresenceUpdate: function(e) {
        var t = this;
        return ["available", "unavailable"].indexOf(e) > -1 ? new s["default"](function(r, n) {
          var o = "available" === e,
            i = o ? t.wrap(r) : r,
            a = t.actionNode("set", [
              ["presence", {
                type: e
              }, void 0]
            ], !o),
            s = {
              data: t.BinaryProtocol.write(a),
              onSend: i,
              onDrop: t.wrap(n),
              binaryOpts: {
                debugString: "action,presence," + e,
                debugObj: a,
                metric: t.M.PRESENCE,
                available: "available" === e,
                ackRequest: o
              }
            };
          o ? f.sendEphemeral(s) : f.sendEphemeralIgnore(s)
        }) : void 0
      },
      sendChatstateUpdate: function(e, t) {
        var r = this;
        return ["composing", "paused", "recording"].indexOf(e) > -1 ? new s["default"](function(n, o) {
          var i = n,
            a = r.actionNode("set", [
              ["presence", {
                type: e,
                to: t
              }, void 0]
            ], !0);
          f.sendEphemeralIgnore({
            data: r.BinaryProtocol.write(a),
            onSend: i,
            onDrop: o,
            binaryOpts: {
              debugString: "action,chatstate," + e,
              debugObj: a,
              metric: r.M.PRESENCE,
              skipOffline: !0,
              ackRequest: !1
            }
          }, !0)
        }) : void 0
      },
      sendSetPicture: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = m.parseDataURL(t).data,
            s = m.parseDataURL(r).data,
            d = h.fromBase64(a, !1),
            u = h.fromBase64(s, !1),
            c = f.tag(),
            l = n.wrap(o);
          l.tag = c;
          var p = ["picture", {
                id: c,
                jid: e,
                type: "set"
              },
              [
                ["image", void 0, u],
                ["preview", void 0, d]
              ]
            ],
            g = n.actionNode("set", [p]);
          f.send({
            data: n.BinaryProtocol.write(g),
            clientCacheable: !0,
            onSend: l,
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,set_pic," + e,
              debugObj: g,
              metric: n.M.PIC,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      deletePicture: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = f.tag(),
            i = t.wrap(r);
          i.tag = o;
          var a = ["picture", {
              id: o,
              jid: e,
              type: "delete"
            }, void 0],
            s = t.actionNode("set", [a]);
          f.send({
            data: t.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: i,
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,delete_pic," + e,
              debugObj: s,
              metric: t.M.PIC,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      sendSetStatus: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = t.wrap(r),
            i = t.actionNode("set", [
              ["status", void 0, e]
            ]);
          f.send({
            data: t.BinaryProtocol.write(i),
            clientCacheable: !0,
            onSend: o,
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,status,set",
              debugObj: i,
              metric: t.M.STATUS,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      sendSetBlock: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i = t.map(function(t) {
              return ["user", {
                jid: t.jid,
                reason: e && t.spam ? "spam" : void 0
              }, void 0]
            }),
            a = ["block", {
              type: e ? "add" : "remove"
            }, i],
            s = r.actionNode("set", [a]);
          f.send({
            data: r.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: r.wrap(n),
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "action,block," + e + "," + _.pluck(t, "jid").join(","),
              debugObj: s,
              metric: r.M.BLOCK,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      chatFindQuery: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if ("response" === t.N.tag(o) && "chat" === t.N.attr("type", o))
                if ("true" === t.N.attr("duplicate", o)) n = "preempted";
                else if (_.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseChat(i[a]);
                  d && n.push(d)
                }
              }
              r(n)
            },
            i = t.queryNode({
              type: "chat",
              kind: e ? "retry" : void 0
            }, void 0);
          f.sendEphemeral({
            data: t.BinaryProtocol.write(i),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,chat," + e,
              debugObj: i,
              metric: t.M.QUERY_CHAT,
              ackRequest: !1
            }
          })
        })
      },
      contactFindQuery: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if ("response" === t.N.tag(o) && "contacts" === t.N.attr("type", o))
                if ("true" === t.N.attr("duplicate", o)) n = "preempted";
                else if (_.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseContact(i[a]);
                  d && n.push(d)
                }
              }
              r({
                checksum: t.N.attr("checksum", o),
                data: n
              })
            },
            i = t.queryNode({
              type: "contacts",
              kind: e ? "retry" : void 0
            }, void 0);
          f.send({
            data: t.BinaryProtocol.write(i),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,contacts, " + e,
              debugObj: i,
              metric: t.M.QUERY_CONTACTS,
              ackRequest: !1
            }
          })
        })
      },
      msgCreateRecord: function(e, t) {
        var r = this;
        return new s["default"](function(n, o) {
          var i, a, d = e.id;
          if ("chat" === e.type) a = s["default"].cast(["message", {
              type: "text",
              to: e.to,
              id: e.id,
              t: e.t.toString()
            },
            [
              ["body", void 0, e.body]
            ]
          ]);
          else if ("location" === e.type) i = e.body ? h.fromBase64(e.body, !1) : void 0, a = s["default"].cast(["message", {
              type: "media",
              to: e.to,
              id: e.id,
              t: e.t.toString()
            },
            [
              ["media", {
                type: "location",
                latitude: e.lat || void 0,
                longitude: e.lng || void 0,
                name: e.loc && e.url ? e.loc : void 0,
                url: e.loc && e.url ? e.url : void 0,
                encoding: e.body ? "raw" : void 0
              }, i]
            ]
          ]);
          else if ("vcard" === e.type) {
            var u = ["vcard", {
              name: e.subtype
            }, e.body];
            a = s["default"].cast(["message", {
                type: "media",
                to: e.to,
                id: e.id,
                t: e.t.toString()
              },
              [
                ["media", {
                    type: "vcard"
                  },
                  [u]
                ]
              ]
            ])
          } else {
            var l = e.mediaKey;
            i = e.body ? h.fromBase64(e.body, !1) : void 0, a = (t && !l ? r.sendMedia(e.avparams) : s["default"].resolve(_.merge({
              status: 200
            }, e.avparams))).then(function(t) {
              return 200 === t.status ? s["default"].cast(["message", {
                  type: "media",
                  to: e.to,
                  id: e.id,
                  t: e.t.toString()
                },
                [
                  ["media", {
                    encoding: e.body ? "raw" : void 0,
                    origin: "ptt" === e.type ? "live" : void 0,
                    seconds: "ptt" === e.type && e.duration ? e.duration.toString() : void 0,
                    type: t.type,
                    mimetype: e.mimetype || t.mimetype || void 0,
                    size: e.size ? e.size.toString() : void 0,
                    filehash: t.filehash,
                    url: t.url,
                    duration: t.duration ? t.duration.toString() : void 0,
                    vcodec: t.vcodec || void 0,
                    width: t.width ? t.width.toString() : void 0,
                    height: t.height ? t.height.toString() : void 0,
                    fps: t.fps ? t.fps.toString() : void 0,
                    vbitrate: t.vbitrate ? t.vbitrate.toString() : void 0,
                    acodec: t.acodec || void 0,
                    asampfreq: t.asampfreq ? t.asampfreq.toString() : void 0,
                    asampfmt: t.asampfmt || void 0,
                    abitrate: t.abitrate ? t.abitrate.toString() : void 0,
                    caption: "video" !== e.type && "image" !== e.type || !e.caption ? void 0 : e.caption,
                    page_count: "number" != typeof e.pageCount || isNaN(e.pageCount) ? void 0 : e.pageCount.toString(),
                    media_key: l,
                    filename: t.filename
                  }, i]
                ]
              ]) : (c.error("wap:msgCreateRecord:sendMedia error " + t.status)(), s["default"].reject())
            })["catch"](function() {
              return c.error("wap:msgCreateRecord:sendMedia dropped")(), s["default"].reject()
            })
          }
          a.then(function(t) {
            var i = r.actionNode("relay", [t]),
              a = r.wrap(n);
            a.tag = d, a.meta = {
              type: "message",
              key: new y(e.from, e.to, e.id)
            }, f.send({
              data: r.BinaryProtocol.write(i),
              onSend: a,
              onDrop: r.wrap(o),
              binaryOpts: {
                debugString: "action,message, " + e.type,
                debugObj: i,
                metric: r.M.MESSAGE,
                ackRequest: !1
              }
            })
          })["catch"](function() {
            c.error("wap:msgCreateRecord mPromise error")(), o()
          })
        })
      },
      msgFindQuery: function(e, t) {
        var r = this;
        return "before" !== e ? s["default"].reject("wap:msgFindQuery:unsupported:" + e) : new s["default"](function(e, n) {
          var o = function(t) {
              var n = [],
                o = r.BinaryProtocol.read(t),
                i = r.N.children(o);
              if ("response" === r.N.tag(o) && "message" === r.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = r.parseMsg(i[a], "response");
                  d && n.push(d)
                }
              }
              e(n)
            },
            i = r.queryNode({
              type: "message",
              jid: t.remote,
              count: t.count.toString(),
              index: t.id,
              owner: "undefined" == typeof t.fromMe ? void 0 : t.fromMe.toString()
            }, void 0);
          f.sendEphemeral({
            data: r.BinaryProtocol.write(i),
            onSend: r.binWrap(o, e),
            onDrop: r.wrap(n),
            binaryOpts: {
              debugString: "query,message," + t.remote + "_" + t.id + "_" + t.fromMe + "_" + t.count,
              debugObj: i,
              metric: r.M.QUERY_MESSAGES,
              ackRequest: !1
            }
          })
        })
      },
      presenceSubscribe: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = t.wrap(r),
            i = t.actionNode("set", [
              ["presence", {
                type: "subscribe",
                to: e
              }, void 0]
            ]);
          f.sendEphemeral({
            data: t.BinaryProtocol.write(i),
            onSend: o,
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,presence,subscribe," + e,
              debugObj: i,
              metric: t.M.PRESENCE_SUBSCRIBE,
              ackRequest: !0
            }
          })
        })
      }
    };
  e.exports = _.defaults(w, b)
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(27),
    i = n(o),
    a = r(3),
    s = n(a),
    d = r(1),
    u = r(13),
    c = r(39),
    l = r(22),
    f = r(67),
    h = r(184),
    p = {
      BinaryProtocol: null,
      N: null,
      M: {
        DEBUG_LOG: 1,
        QUERY_RESUME: 2,
        QUERY_RECEIPT: 3,
        QUERY_MEDIA: 4,
        QUERY_CHAT: 5,
        QUERY_CONTACTS: 6,
        QUERY_MESSAGES: 7,
        PRESENCE: 8,
        PRESENCE_SUBSCRIBE: 9,
        GROUP: 10,
        READ: 11,
        CHAT: 12,
        RECEIVED: 13,
        PIC: 14,
        STATUS: 15,
        MESSAGE: 16,
        QUERY_ACTIONS: 17,
        BLOCK: 18,
        QUERY_GROUP: 19,
        QUERY_PREVIEW: 20,
        QUERY_EMOJI: 21,
        QUERY_MESSAGE_INFO: 22
      },
      epochCount: 0,
      epoch: 0,
      isRequestingDeviceUploadLogsMutex: 0,
      parseChat: function(e) {
        if ("chat" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = parseInt(this.N.attr("t", e), 10) || void 0,
            n = this.N.attr("type", e),
            o = parseInt(this.N.attr("mute", e), 10) || void 0,
            i = parseInt(this.N.attr("before", e), 10) || void 0,
            a = "true" === this.N.attr("archive", e),
            s = "true" === this.N.attr("read_only", e),
            d = parseInt(this.N.attr("modify_tag", e), 10) || void 0,
            u = this.N.attr("name", e) || void 0,
            c = this.safeParseInt(e, "count"),
            l = "true" === this.N.attr("message", e);
          "ahead" === n && (n = "clear");
          var f, h = this.N.children(e);
          if (_.isArray(h)) {
            f = [];
            var p, g, m = h.length;
            for (p = 0; m > p; p++)
              if (g = h[p], "item" === this.N.tag(g)) {
                var v = this.N.attr("index", g);
                v && f.push([v, "true" === this.N.attr("owner", g), this.N.attr("participant", g)])
              }
          }
          var y = {
              id: t,
              t: r,
              type: n,
              keys: f,
              before: i,
              archive: a,
              isReadOnly: s,
              unreadCount: c,
              muteExpiration: o,
              modifyTag: d,
              name: u,
              pendingMsgs: l
            },
            b = [n && "delete" !== n && "clear" !== n && "archive" !== n && "unarchive" !== n && "mute" !== n, !n && !t, a && n && "clear" !== n, "clear" !== n && i && i > 0, "clear" !== n && f && f.length > 0];
          return this.dropIfConditionMet(b, y)
        }
      },
      parseCmd: function(e) {
        if ("read" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = "false" === this.N.attr("type", e),
            n = {
              type: r ? "unread" : "read",
              jid: t
            },
            o = [!t];
          return this.dropIfConditionMet(o, n)
        }
      },
      parseMsgMessage: function(e, t) {
        if ("message" === this.N.tag(e)) {
          var r;
          this.N.attr("from", e) !== Store.Conn.me || this.N.attr("to", e) ? this.N.attr("to", e) !== Store.Conn.me || this.N.attr("from", e) || (r = "out") : r = "in";
          var n, o = this.N.attr("id", e),
            i = parseInt(this.N.attr("t", e), 10) || 0,
            a = this.N.attr("to", e) || Store.Conn.me,
            s = this.N.attr("from", e) || Store.Conn.me,
            u = "broadcast" === s.split("@")[1],
            c = this.N.attr("participant", e),
            l = u ? c : s,
            f = u ? void 0 : c,
            h = u ? !1 : this.N.child("broadcast", e) && s === Store.Conn.me,
            p = "invis" === this.N.attr("web", e),
            g = this.N.attr("notify", e) || "",
            m = parseInt(this.N.attr("status", e)) || 0,
            v = [],
            y = this.N.child("broadcast", e);
          if ("broadcast" !== a) {
            switch (t) {
              case "fresh":
                n = 1;
                break;
              default:
                n = m >= -1 && 4 >= m ? m : 1
            }
            if (_.isArray(y)) {
              var b, w = y.length;
              for (b = 0; w > b; b++) {
                var E = y[b],
                  S = this.N.attr("jid", E);
                "to" === this.N.tag(E) && S && v.push(S)
              }
            }
            var N, T = [],
              $ = this.N.attr("type", e);
            switch ($) {
              case "ciphertext":
              case "text":
                var C = this.N.dataStr(this.N.child("body", e)) || "";
                N = {
                  id: o,
                  body: "text" === $ ? C : void 0,
                  type: "text" === $ ? "chat" : "ciphertext",
                  t: i,
                  notifyName: g,
                  from: l,
                  to: a,
                  self: r,
                  author: f,
                  participant: c,
                  invis: p,
                  ack: n,
                  broadcast: h,
                  recipients: v
                }, T = [!o, !i, !l, !a];
                break;
              case "media":
                var k, A, I, O, R, P, M = this.N.child("media", e),
                  L = this.N.attr("type", M),
                  D = this.N.attr("media_key", M),
                  x = this.N.attr("mimetype", M);
                if ("retry" === this.N.attr("reason", M)) return;
                switch (L) {
                  case "image":
                  case "video":
                  case "document":
                    var j = parseInt(this.N.attr("page_count", M), 10) || 0,
                      U = this.N.attr("filename", M);
                    P = this.N.attr("caption", M), k = this.thumbFromMediaXml(M), A = this.N.attr("url", M), A = _.isString(A) && A.indexOf("/u/") > 0 ? void 0 : A, I = this.N.attr("filehash", M), O = parseInt(this.N.attr("size", M), 10) || 0, R = this.N.attr("seconds", M), N = {
                      id: o,
                      body: k,
                      type: L,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      duration: R,
                      broadcast: h,
                      recipients: v,
                      filehash: I,
                      size: O,
                      caption: P,
                      mediaKey: D,
                      pageCount: j,
                      mimetype: x,
                      filename: U
                    }, T = [!o, !i, !l, !a];
                    break;
                  case "location":
                    var B = this.N.attr("latitude", M),
                      F = this.N.attr("longitude", M),
                      W = this.N.attr("name", M);
                    k = this.thumbFromMediaXml(M), A = this.N.attr("url", M), N = {
                      id: o,
                      body: k,
                      type: L,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      loc: W,
                      lat: B,
                      lng: F,
                      broadcast: h,
                      recipients: v
                    }, T = [!o, !i, !l, !a, !B || !F];
                    break;
                  case "audio":
                    var Y = "live" === this.N.attr("origin", M) ? "ptt" : L;
                    A = this.N.attr("url", M), A = _.isString(A) && A.indexOf("/u/") > 0 ? void 0 : A, I = this.N.attr("filehash", M), O = parseInt(this.N.attr("size", M), 10) || 0, R = this.N.attr("seconds", M), N = {
                      id: o,
                      type: Y,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      clientUrl: A,
                      duration: R,
                      broadcast: h,
                      recipients: v,
                      filehash: I,
                      size: O,
                      mediaKey: D,
                      mimetype: x
                    }, T = [!o, !i, !l, !a];
                    break;
                  case "vcard":
                    var G = this.N.child("vcard", M),
                      q = this.N.dataStr(G),
                      K = this.N.attr("name", G);
                    N = {
                      id: o,
                      body: q,
                      type: L,
                      subtype: K,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: a,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      broadcast: h,
                      recipients: v
                    }, T = [!o, !i, !l, !a, !q, !K];
                    break;
                  default:
                    d.error("wap:parseMsgMessage unknown media type: " + this.N.toString(e), e)()
                }
                break;
              default:
                d.error("wap:parseMsgMessage unknown message type: " + this.N.toString(e), e)()
            }
            return this.dropIfConditionMet(T, N)
          }
        }
      },
      parseMsgGp2: function(e) {
        if ("groups_v2" === this.N.tag(e)) {
          var t, r = parseInt(this.N.attr("t", e), 10) || 0,
            n = this.N.attr("id", e),
            o = this.N.attr("jid", e),
            i = "invis" === this.N.attr("web", e),
            a = "true" === this.N.attr("owner", e),
            s = this.N.attr("type", e),
            d = this.N.attr("author", e),
            u = this.N.children(e),
            c = this.N.attr("participant", e),
            l = [];
          switch (s) {
            case "create":
              t = this.N.attr("subject", e);
              break;
            case "subject":
              t = this.N.attr("subject", e);
              break;
            case "picture":
              t = this.N.attr("picture", e)
          }
          if (_.isArray(u)) {
            var f, h = u.length;
            for (f = 0; h > f; f++) {
              var p = u[f],
                g = this.N.attr("jid", p);
              "participant" === this.N.tag(p) && g && l.push(g)
            }
          }
          var m = {
              t: r,
              id: n,
              to: a ? o : Store.Conn.me,
              from: a ? Store.Conn.me : o,
              author: d,
              participant: c,
              body: t ? t.toString() : void 0,
              type: "gp2",
              subtype: s,
              invis: i,
              recipients: l
            },
            v = [!n, !r, "subject" !== s && "add" !== s && "remove" !== s && "leave" !== s && "picture" !== s && "modify" !== s && "create" !== s && "delete" !== s && "promote" !== s && "demote" !== s, "subject" === s && !t, ("add" === s || "remove" === s || "leave" === s || "promote" === s || "demote" === s || "modify" === s) && 0 === l.length, !o, "string" == typeof o && "g.us" !== o.split("@")[1]];
          return this.dropIfConditionMet(v, m)
        }
      },
      parseMsgBroadcast: function(e) {
        if ("broadcast" === this.N.tag(e)) {
          var t, r, n = this.N.attr("type", e),
            o = this.N.attr("id", e),
            i = parseInt(this.N.attr("t", e), 10) || 0,
            a = this.N.attr("jid", e),
            s = "true" === this.N.attr("owner", e),
            d = this.N.attr("participant", e);
          switch (n) {
            case "create":
              t = parseInt(this.N.attr("count", e), 10) || 0;
              break;
            case "add":
            case "remove":
              r = this.N.child("participant", e), r && (t = this.N.attr("jid", r))
          }
          var u = {
              id: o,
              t: i,
              participant: d,
              type: "broadcast_notification",
              subtype: n,
              from: s ? Store.Conn.me : a,
              to: s ? a : Store.Conn.me,
              body: t ? t.toString() : void 0
            },
            c = [!o, !i, !a, "string" == typeof a && "broadcast" !== a.split("@")[1], "create" !== n && "add" !== n && "remove" !== n, ("add" === n || "remove" === n) && 2 !== t.split("@").length];
          return this.dropIfConditionMet(c, u)
        }
      },
      parseMsgNotification: function(e) {
        if ("notification" === this.N.tag(e)) {
          var t = this.N.attr("id", e),
            r = parseInt(this.N.attr("t", e), 10) || 0,
            n = this.N.attr("jid", e),
            o = this.N.attr("participant", e),
            i = "invis" === this.N.attr("web", e),
            a = this.N.dataStr(e),
            s = "true" === this.N.attr("owner", e) ? Store.Conn.me : n,
            d = "true" === this.N.attr("owner", e) ? n : Store.Conn.me,
            u = {
              id: t,
              type: "notification",
              t: r,
              invis: i,
              from: s,
              to: d,
              participant: o,
              body: a
            },
            c = [!t, !r, !n, 2 !== n.split("@").length];
          return this.dropIfConditionMet(c, u)
        }
      },
      sendConversationOpWithKey: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = n.actionNode("set", [
            ["chat", {
              type: e,
              jid: t,
              index: r ? r.id : void 0,
              owner: r ? r.fromMe.toString() : void 0,
              participant: r ? r.participant : void 0
            }, void 0]
          ]);
          u.send({
            data: n.BinaryProtocol.write(a),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,chat," + [e, (r || "no_msg_key").toString()].join(),
              debugObj: a,
              metric: n.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      setSubProtocol: function(e) {
        5 === e ? (this.BinaryProtocol = new f("05"), this.N = this.BinaryProtocol.Node) : 6 === e ? (this.BinaryProtocol = new f("06"), this.N = this.BinaryProtocol.Node) : (d.error("Wap:setSubProtocol unknown " + e)(), this.BinaryProtocol = new f("05"), this.N = this.BinaryProtocol.Node)
      },
      resyncMessages: function(e) {
        var t = this;
        return new c(function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (d.logColor("green", "bin-recv: response,resume", o)(), "response" === t.N.tag(o) && "resume" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var u = t.parseChat(i[a]);
                  u && n.push(u)
                }
              }
              r({
                checksum: t.N.attr("checksum", o),
                data: n
              })
            },
            i = e.map(function(e) {
              var t = {
                jid: e.wid,
                index: e.id,
                owner: e.fromMe,
                participant: e.participant,
                archive: (!!e.archive).toString()
              };
              return e.mute && (t.mute = e.mute.toString()), e.active && (t.active = "true"), l.isGroup(e.wid) && (t.read_only = (!!e.isReadOnly).toString()), e.modifyTag && (t.modify_tag = e.modifyTag.toString()), e.unreadCount && (t.count = e.unreadCount.toString()), ["last", t, void 0]
            }),
            a = t.queryNode({
              type: "resume"
            }, i);
          u.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,resume",
              debugObj: a,
              metric: t.M.QUERY_RESUME,
              ackRequest: !1
            }
          })
        })
      },
      resyncReceipts: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (d.logColor("green", "bin-recv: response,receipt", o)(), "response" === t.N.tag(o) && "receipt" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s, u, c = i.length;
                for (a = 0; c > a; a++) {
                  s = i[a], u = t.N.children(s);
                  var l = t.N.attr("jid", s),
                    f = t.N.attr("t", s);
                  if ("receipt" === t.N.tag(s) && l && f && _.isArray(u)) {
                    var h, p = [],
                      g = u.length;
                    for (h = 0; g > h; h++) {
                      var m = u[h];
                      if ("item" === t.N.tag(m)) {
                        var v = t.N.attr("index", m),
                          y = "true" === t.N.attr("owner", m),
                          b = parseInt(t.N.attr("status", m), 10) || 0,
                          w = t.N.attr("participant", m);
                        v && 0 !== b && 4 >= b && p.push([v, y, w, b])
                      }
                    }
                    p.length > 0 && n.push({
                      id: l,
                      t: parseInt(f, 10),
                      acks: p
                    })
                  }
                }
              }
              r(n)
            },
            i = e.map(function(e) {
              return ["last", {
                jid: e.remote,
                index: e.id,
                owner: e.fromMe.toString(),
                participant: e.participant,
                t: e.t.toString()
              }, void 0]
            }),
            a = t.queryNode({
              type: "receipt"
            }, i);
          u.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,receipt",
              debugObj: a,
              metric: t.M.QUERY_RECEIPT,
              ackRequest: !1
            }
          })
        })
      },
      recentEmojiQuery: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (d.logColor("green", "bin-recv: response,emoji", o)(), "response" === t.N.tag(o) && "emoji" === t.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var u = i[a],
                    c = t.N.attr("code", u),
                    l = parseFloat(t.N.attr("value", u)) || 0;
                  "item" === t.N.tag(u) && c && l && !isNaN(l) && n.push({
                    "char": c,
                    weight: l
                  })
                }
              }
              r(n)
            },
            i = _.isArray(e) ? e.map(function(e) {
              return ["item", {
                code: e["char"],
                value: e.weight.toString()
              }, void 0]
            }) : void 0,
            a = t.queryNode({
              type: "emoji"
            }, i);
          u.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,emoji",
              debugObj: a,
              metric: t.M.QUERY_EMOJI,
              ackRequest: !1
            }
          })
        })
      },
      queryMsgInfo: function(e) {
        var t = this,
          r = function(e) {
            var r, n, o = [];
            if (_.isArray(e)) {
              r = e.length;
              for (var i = 0; r > i; i++) n = e[i], "item" === t.N.tag(n) && t.N.attr("jid", n) && t.N.attr("t", n) && o.push({
                id: t.N.attr("jid", n),
                t: parseInt(t.N.attr("t", n), 10) || 0
              })
            }
            return o
          };
        return new s["default"](function(n, o) {
          var i = function(e) {
              var o = t.BinaryProtocol.read(e),
                i = {
                  played: [],
                  playedRemaining: 0,
                  read: [],
                  readRemaining: 0,
                  delivery: [],
                  deliveryRemaining: 0
                };
              if (d.logColor("green", "bin-recv: response,msg,info", o)(), "response" === t.N.tag(o) && "message_info" === t.N.attr("type", o)) {
                var a = t.N.child("played", o),
                  s = t.N.child("read", o),
                  u = t.N.child("delivery", o),
                  c = t.N.children(a),
                  l = t.N.children(s),
                  f = t.N.children(u),
                  h = parseInt(t.N.attr("count", o), 10) || 0;
                i.played = r(c), i.read = r(l), i.delivery = r(f);
                var p = h - i.played.length,
                  g = h - i.played.length - i.read.length,
                  _ = h - i.played.length - i.read.length - i.delivery.length;
                i.playedRemaining = 0 > p ? 0 : p, i.readRemaining = 0 > g ? 0 : g, i.deliveryRemaining = 0 > _ ? 0 : _
              }
              n(i)
            },
            a = t.queryNode({
              type: "message_info",
              index: e.id,
              jid: e.remote
            }, void 0);
          u.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(i, n),
            onDrop: t.wrap(o),
            binaryOpts: {
              debugString: ["query,msg,info", e.id, e.remote, e.fromMe].join(),
              debugObj: a,
              metric: t.M.QUERY_MESSAGE_INFO,
              ackRequest: !1
            }
          })
        })
      },
      requestMediaReupload: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = e.id,
            i = function(e) {
              var n, o = t.BinaryProtocol.read(e);
              if ("response" === t.N.tag(o) && "media" === t.N.attr("type", o)) {
                var i = parseInt(t.N.attr("code", o)) || 400,
                  a = t.N.attr("url", o);
                i >= 500 && 502 !== i ? (d.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : 200 === i && a ? n = {
                  status: 200,
                  url: a,
                  mediaKey: t.N.attr("media_key", o)
                } : 200 !== i || a ? (d.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : n = {
                  status: 400
                }
              } else d.error("wap:requestMediaReupload:malformed")(), n = {
                status: 400
              };
              r(n)
            },
            a = o,
            s = t.queryNode({
              type: "media",
              index: a.id,
              jid: a.remote,
              owner: a.fromMe.toString(),
              participant: a.participant
            }, void 0);
          u.sendEphemeral({
            data: t.BinaryProtocol.write(s),
            onSend: t.binWrap(i, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,media",
              debugObj: s,
              metric: t.M.QUERY_MEDIA,
              ackRequest: !1
            }
          })
        })
      },
      sendConversationSeen: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, a) {
          var s = n.actionNode("set", [
            ["read", {
              jid: e,
              index: t ? t.id : void 0,
              owner: t ? t.fromMe.toString() : void 0,
              participant: t ? t.participant : void 0,
              count: r && t ? r.toString() : void 0
            }, void 0]
          ]);
          u.send({
            data: n.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(a),
            binaryOpts: {
              debugString: "action,chat,read," + (0, i["default"])(t) + "," + r,
              debugObj: s,
              metric: n.M.READ,
              ackRequest: !0
            }
          })
        })
      },
      sendConversationUnseen: function(e, t) {
        return this.sendConversationSeen(e, t, -2)
      },
      sendConversationClear: function(e, t) {
        return this.sendConversationOpWithKey("clear", e, t)
      },
      sendConversationDelete: function(e, t) {
        return this.sendConversationOpWithKey("delete", e, t)
      },
      sendConversationArchive: function(e, t, r) {
        return this.sendConversationOpWithKey(t ? "archive" : "unarchive", e, r)
      },
      sendMessagePlayed: function(e) {
        var t = this;
        return new s["default"](function(r, n) {
          var o = t.wrap(r),
            i = t.actionNode("set", [
              ["received", {
                type: "played",
                index: e.id,
                from: e.remote,
                participant: e.participant
              }, void 0]
            ]);
          u.send({
            data: t.BinaryProtocol.write(i),
            onSend: o,
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,played," + e.toString(),
              debugObj: i,
              metric: t.M.RECEIVED,
              ackRequest: !0
            }
          })
        })
      },
      sendMessageDelete: function(e, t, r) {
        var n = this;
        return new s["default"](function(o, i) {
          var a = t.map(function(e) {
              return ["item", {
                index: e.id,
                owner: e.fromMe.toString(),
                participant: e.participant
              }, void 0]
            }),
            s = n.actionNode("set", [
              ["chat", {
                type: "clear",
                jid: e,
                media: r.toString()
              }, a]
            ]);
          u.send({
            data: n.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,msgs,delete," + [e, r, t.length].join(),
              debugObj: s,
              metric: n.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      msgFindQuery: function(e, t) {
        var r = this;
        return "before" !== e ? s["default"].reject("wap:msgFindQuery:unsupported:" + e) : new s["default"](function(e, n) {
          var o = function(t) {
              var n = [],
                o = r.BinaryProtocol.read(t),
                i = r.N.children(o);
              if ("response" === r.N.tag(o) && "message" === r.N.attr("type", o) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = r.parseMsg(i[a], "response");
                  d && n.push(d)
                }
              }
              e(n)
            },
            i = r.queryNode({
              type: "message",
              jid: t.remote,
              count: t.count.toString(),
              index: t.id,
              owner: "undefined" == typeof t.fromMe ? void 0 : t.fromMe.toString(),
              participant: t.participant
            }, void 0);
          u.sendEphemeral({
            data: r.BinaryProtocol.write(i),
            onSend: r.binWrap(o, e),
            onDrop: r.wrap(n),
            binaryOpts: {
              debugString: "query,message," + [t.toString(), t.count].join(),
              debugObj: i,
              metric: r.M.QUERY_MESSAGES,
              ackRequest: !1
            }
          })
        })
      }
    };
  e.exports = _.defaults(p, h)
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(1),
    s = r(10),
    d = r(13),
    u = r(9),
    c = r(67),
    l = r(108),
    f = r(16),
    h = r(185),
    p = {
      BinaryProtocol: null,
      N: null,
      M: {
        DEBUG_LOG: 1,
        QUERY_RESUME: 2,
        QUERY_RECEIPT: 3,
        QUERY_MEDIA: 4,
        QUERY_CHAT: 5,
        QUERY_CONTACTS: 6,
        QUERY_MESSAGES: 7,
        PRESENCE: 8,
        PRESENCE_SUBSCRIBE: 9,
        GROUP: 10,
        READ: 11,
        CHAT: 12,
        RECEIVED: 13,
        PIC: 14,
        STATUS: 15,
        MESSAGE: 16,
        QUERY_ACTIONS: 17,
        BLOCK: 18,
        QUERY_GROUP: 19,
        QUERY_PREVIEW: 20,
        QUERY_EMOJI: 21,
        QUERY_MESSAGE_INFO: 22,
        SPAM: 23
      },
      epochCount: 0,
      epoch: 0,
      isRequestingDeviceUploadLogsMutex: 0,
      parseChat: function(e) {
        if ("chat" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = parseInt(this.N.attr("t", e), 10) || void 0,
            n = this.N.attr("type", e),
            o = parseInt(this.N.attr("mute", e), 10) || void 0,
            i = parseInt(this.N.attr("before", e), 10) || void 0,
            a = "true" === this.N.attr("archive", e),
            s = "true" === this.N.attr("read_only", e),
            d = parseInt(this.N.attr("modify_tag", e), 10) || void 0,
            u = this.N.attr("name", e) || void 0,
            c = this.safeParseInt(e, "count"),
            l = "true" === this.N.attr("message", e),
            f = "true" === this.N.attr("star", e);
          "ahead" === n && (n = "clear");
          var h, p = this.N.children(e);
          if (_.isArray(p)) {
            h = [];
            var g, m, v = p.length;
            for (g = 0; v > g; g++)
              if (m = p[g], "item" === this.N.tag(m)) {
                var y = this.N.attr("index", m);
                y && h.push([y, "true" === this.N.attr("owner", m), this.N.attr("participant", m)])
              }
          }
          var b = {
              id: t,
              t: r,
              type: n,
              keys: h,
              before: i,
              archive: a,
              isReadOnly: s,
              unreadCount: c,
              muteExpiration: o,
              modifyTag: d,
              name: u,
              pendingMsgs: l,
              star: f
            },
            w = [n && "delete" !== n && "clear" !== n && "archive" !== n && "unarchive" !== n && "mute" !== n && "star" !== n && "unstar" !== n, !n && !t, a && n && "clear" !== n, "clear" !== n && i && i > 0, "clear" !== n && "star" !== n && "unstar" !== n && h && h.length > 0];
          return this.dropIfConditionMet(w, b)
        }
      },
      parseMsgMessage: function(e, t) {
        if ("message" === this.N.tag(e)) {
          var r;
          this.N.attr("from", e) !== Store.Conn.me || this.N.attr("to", e) ? this.N.attr("to", e) !== Store.Conn.me || this.N.attr("from", e) || (r = "out") : r = "in";
          var n, o = this.N.attr("id", e),
            i = parseInt(this.N.attr("t", e), 10) || 0,
            s = this.N.attr("to", e) || Store.Conn.me,
            d = this.N.attr("from", e) || Store.Conn.me,
            u = "broadcast" === d.split("@")[1],
            c = this.N.attr("participant", e),
            l = u ? c : d,
            f = u ? void 0 : c,
            h = u ? !1 : this.N.child("broadcast", e) && d === Store.Conn.me,
            p = "invis" === this.N.attr("web", e),
            g = this.N.attr("notify", e) || "",
            m = parseInt(this.N.attr("status", e)) || 0,
            v = [],
            y = this.N.child("broadcast", e),
            b = "true" === this.N.attr("star", e);
          if ("broadcast" !== s) {
            switch (t) {
              case "fresh":
                n = 1;
                break;
              default:
                n = m >= -1 && 4 >= m ? m : 1
            }
            if (_.isArray(y)) {
              var w, E = y.length;
              for (w = 0; E > w; w++) {
                var S = y[w],
                  N = this.N.attr("jid", S);
                "to" === this.N.tag(S) && N && v.push(N)
              }
            }
            var T, $ = [],
              C = this.N.attr("type", e);
            switch (C) {
              case "ciphertext":
              case "text":
                var k = this.N.dataStr(this.N.child("body", e)) || "";
                T = {
                  id: o,
                  body: "text" === C ? k : void 0,
                  type: "text" === C ? "chat" : "ciphertext",
                  t: i,
                  notifyName: g,
                  from: l,
                  to: s,
                  self: r,
                  author: f,
                  participant: c,
                  invis: p,
                  ack: n,
                  broadcast: h,
                  recipients: v,
                  star: b
                };
                var A = this.N.child("media", e);
                A && "url" === this.N.attr("type", A) && _.merge(T, {
                  subtype: "url",
                  title: this.N.attr("title", A),
                  description: this.N.attr("description", A),
                  canonicalUrl: this.N.attr("canonical-url", A),
                  matchedText: this.N.attr("matched-text", A),
                  thumbnail: this.thumbFromMediaXml(A)
                }), $ = [!o, !i, !l, !s];
                break;
              case "media":
                var I, O, R, P, M, L, D = this.N.child("media", e),
                  x = this.N.attr("type", D),
                  j = this.N.attr("media_key", D),
                  U = this.N.attr("mimetype", D);
                if ("retry" === this.N.attr("reason", D)) return;
                switch (x) {
                  case "image":
                  case "video":
                  case "document":
                    var B = parseInt(this.N.attr("page_count", D), 10) || 0,
                      F = this.N.attr("filename", D);
                    L = this.N.attr("caption", D), I = this.thumbFromMediaXml(D), O = this.N.attr("url", D), O = _.isString(O) && O.indexOf("/u/") > 0 ? void 0 : O, R = this.N.attr("filehash", D), P = parseInt(this.N.attr("size", D), 10) || 0, M = this.N.attr("seconds", D), T = {
                      id: o,
                      body: I,
                      type: x,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: s,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      clientUrl: O,
                      duration: M,
                      broadcast: h,
                      recipients: v,
                      filehash: R,
                      size: P,
                      caption: L,
                      mediaKey: j,
                      star: b,
                      pageCount: B,
                      mimetype: U,
                      filename: F
                    }, $ = [!o, !i, !l, !s];
                    break;
                  case "location":
                    var W = this.N.attr("latitude", D),
                      Y = this.N.attr("longitude", D),
                      G = this.N.attr("name", D);
                    I = this.thumbFromMediaXml(D), O = this.N.attr("url", D), T = {
                      id: o,
                      body: I,
                      type: x,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: s,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      clientUrl: O,
                      loc: G,
                      lat: W,
                      lng: Y,
                      broadcast: h,
                      recipients: v,
                      star: b
                    }, $ = [!o, !i, !l, !s, !W || !Y];
                    break;
                  case "audio":
                    var q = "live" === this.N.attr("origin", D) ? "ptt" : x;
                    O = this.N.attr("url", D), O = _.isString(O) && O.indexOf("/u/") > 0 ? void 0 : O, R = this.N.attr("filehash", D), P = parseInt(this.N.attr("size", D), 10) || 0, M = this.N.attr("seconds", D), T = {
                      id: o,
                      type: q,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: s,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      clientUrl: O,
                      duration: M,
                      broadcast: h,
                      recipients: v,
                      filehash: R,
                      size: P,
                      star: b,
                      mediaKey: j,
                      mimetype: U
                    }, $ = [!o, !i, !l, !s];
                    break;
                  case "vcard":
                    var K = this.N.child("vcard", D),
                      H = this.N.dataStr(K),
                      V = this.N.attr("name", K);
                    T = {
                      id: o,
                      body: H,
                      type: x,
                      subtype: V,
                      t: i,
                      notifyName: g,
                      from: l,
                      to: s,
                      self: r,
                      author: f,
                      participant: c,
                      invis: p,
                      ack: n,
                      broadcast: h,
                      recipients: v,
                      star: b
                    }, $ = [!o, !i, !l, !s, !H, !V];
                    break;
                  default:
                    a.error("wap:parseMsgMessage unknown media type: " + this.N.toString(e), e)()
                }
                break;
              default:
                a.error("wap:parseMsgMessage unknown message type: " + this.N.toString(e), e)()
            }
            return this.dropIfConditionMet($, T)
          }
        }
      },
      sendConversationOpWithKey: function(e, t, r, n) {
        var o = this;
        return new i["default"](function(i, a) {
          var s;
          switch (e) {
            case "clear":
              s = (!!n).toString()
          }
          var u = o.actionNode("set", [
            ["chat", {
              type: e,
              jid: t,
              index: r ? r.id : void 0,
              owner: r ? r.fromMe.toString() : void 0,
              participant: r ? r.participant : void 0,
              star: "undefined" != typeof s ? s : void 0
            }, void 0]
          ]);
          d.send({
            data: o.BinaryProtocol.write(u),
            clientCacheable: !0,
            onSend: o.wrap(i),
            onDrop: o.wrap(a),
            binaryOpts: {
              debugString: "action,chat," + [e, r, n].join(),
              debugObj: u,
              metric: o.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      setSubProtocol: function(e) {
        e ? (this.BinaryProtocol = new c(e), this.N = this.BinaryProtocol.Node) : (a.error("Wap:setSubProtocol unknown " + e)(), s.upload("07_unknown_version", !0)["finally"](function() {
          return f.hardRefresh()
        }))
      },
      sendConversationClear: function(e, t, r) {
        return this.sendConversationOpWithKey("clear", e, t, r)
      },
      sendMessageStarred: function(e, t, r) {
        var n = this;
        return new i["default"](function(o, i) {
          var a = t.map(function(e) {
              return ["item", {
                index: e.id,
                owner: e.fromMe.toString(),
                participant: e.participant
              }, void 0]
            }),
            s = n.actionNode("set", [
              ["chat", {
                type: r ? "star" : "unstar",
                jid: e
              }, a]
            ]);
          d.send({
            data: n.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: n.wrap(o),
            onDrop: n.wrap(i),
            binaryOpts: {
              debugString: "action,msgs,star," + [e, r, t.length].join(),
              debugObj: s,
              metrics: n.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      sendUnstarAll: function() {
        var e = this;
        return new i["default"](function(t, r) {
          var n = e.actionNode("set", [
            ["chat", {
              type: "unstar"
            }, void 0]
          ]);
          d.send({
            data: e.BinaryProtocol.write(n),
            clientCacheable: !0,
            onSend: e.wrap(t),
            onDrop: e.wrap(r),
            binaryOpts: {
              debugString: "action,unstar,all",
              debugObj: n,
              metrics: e.M.CHAT,
              ackRequest: !0,
              expires: moment().unix()
            }
          })
        })
      },
      sendSetBlock: function(e, t) {
        var r = this;
        return new i["default"](function(n, o) {
          var i = t.map(function(e) {
              return ["user", {
                jid: e.jid
              }, void 0]
            }),
            a = ["block", {
              type: e ? "add" : "remove"
            }, i],
            s = r.actionNode("set", [a]);
          d.send({
            data: r.BinaryProtocol.write(s),
            clientCacheable: !0,
            onSend: r.wrap(n),
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "action,block," + e + "," + _.pluck(t, "jid").join(","),
              debugObj: s,
              metric: r.M.BLOCK,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      sendSpamReport: function(e) {
        var t = this;
        return new i["default"](function(r, n) {
          var o = t.actionNode("set", [
            ["spam", {
              jid: e
            }, void 0]
          ]);
          d.send({
            data: t.BinaryProtocol.write(o),
            clientCacheable: !0,
            onSend: t.wrap(r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "action,spam," + e,
              debugObj: o,
              metric: t.M.SPAM,
              ackRequest: !1,
              expires: moment().unix()
            }
          })
        })
      },
      chatFindQuery: function(e) {
        var t = this;
        return new i["default"](function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if ("response" === t.N.tag(o) && "chat" === t.N.attr("type", o))
                if ("true" === t.N.attr("duplicate", o)) n = "preempted";
                else if (_.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = t.parseChat(i[a]);
                  d && n.push(d)
                }
              }
              r(n)
            },
            i = {
              type: "chat"
            };
          "boolean" == typeof e && e ? i.kind = "retry" : "string" == typeof e && (i.jid = e);
          var a = t.queryNode(i, void 0);
          d.sendEphemeral({
            data: t.BinaryProtocol.write(a),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: ["query", "chat", e].join(),
              debugObj: a,
              metric: t.M.QUERY_CHAT,
              ackRequest: !1
            }
          })
        })
      },
      msgCreateRecord: function(e, t) {
        var r = this;
        return new i["default"](function(n, o) {
          var s, c, f = e.id;
          if ("chat" === e.type) {
            var h = [
              ["body", void 0, e.body]
            ];
            "url" === e.subtype && h.push(["media", {
              type: "url",
              title: e.title,
              description: e.description,
              "canonical-url": e.canonicalUrl,
              "matched-text": e.matchedText,
              encoding: "raw"
            }, e.thumbnail ? u.fromBase64(e.thumbnail, !1) : void 0]), c = i["default"].cast(["message", {
              type: "text",
              to: e.to,
              id: e.id,
              t: e.t.toString()
            }, h])
          } else if ("location" === e.type) s = e.body ? u.fromBase64(e.body, !1) : void 0, c = i["default"].cast(["message", {
              type: "media",
              to: e.to,
              id: e.id,
              t: e.t.toString()
            },
            [
              ["media", {
                type: "location",
                latitude: e.lat || void 0,
                longitude: e.lng || void 0,
                name: e.loc && e.url ? e.loc : void 0,
                url: e.loc && e.url ? e.url : void 0,
                encoding: e.body ? "raw" : void 0
              }, s]
            ]
          ]);
          else if ("vcard" === e.type) {
            var p = ["vcard", {
              name: e.subtype
            }, e.body];
            c = i["default"].cast(["message", {
                type: "media",
                to: e.to,
                id: e.id,
                t: e.t.toString()
              },
              [
                ["media", {
                    type: "vcard"
                  },
                  [p]
                ]
              ]
            ])
          } else {
            var g = e.mediaKey;
            s = e.body ? u.fromBase64(e.body, !1) : void 0;
            var m = "ptt" === e.type ? "audio" : e.type;
            c = (t && !g ? r.sendMedia(e.avparams) : i["default"].resolve(_.merge({
              status: 200,
              type: m
            }, e.avparams))).then(function(t) {
              return 200 === t.status ? i["default"].cast(["message", {
                  type: "media",
                  to: e.to,
                  id: e.id,
                  t: e.t.toString()
                },
                [
                  ["media", {
                    encoding: e.body ? "raw" : void 0,
                    origin: "ptt" === e.type ? "live" : void 0,
                    seconds: "ptt" === e.type && e.duration ? e.duration.toString() : void 0,
                    type: t.type,
                    mimetype: e.mimetype || t.mimetype || void 0,
                    size: e.size ? e.size.toString() : void 0,
                    filehash: t.filehash,
                    url: t.url,
                    duration: t.duration ? t.duration.toString() : void 0,
                    vcodec: t.vcodec || void 0,
                    width: t.width ? t.width.toString() : void 0,
                    height: t.height ? t.height.toString() : void 0,
                    fps: t.fps ? t.fps.toString() : void 0,
                    vbitrate: t.vbitrate ? t.vbitrate.toString() : void 0,
                    acodec: t.acodec || void 0,
                    asampfreq: t.asampfreq ? t.asampfreq.toString() : void 0,
                    asampfmt: t.asampfmt || void 0,
                    abitrate: t.abitrate ? t.abitrate.toString() : void 0,
                    caption: "video" !== e.type && "image" !== e.type && "document" !== e.type || !e.caption ? void 0 : e.caption,
                    page_count: "number" != typeof e.pageCount || isNaN(e.pageCount) ? void 0 : e.pageCount.toString(),
                    media_key: g,
                    filename: t.filename
                  }, s]
                ]
              ]) : (a.error("wap:msgCreateRecord:sendMedia error " + t.status)(), i["default"].reject())
            })["catch"](function() {
              return a.error("wap:msgCreateRecord:sendMedia dropped")(), i["default"].reject()
            })
          }
          c.then(function(t) {
            var i = r.actionNode("relay", [t]),
              a = r.wrap(n);
            a.tag = f, a.meta = {
              type: "message",
              key: new l(e.from, e.to, e.id)
            }, d.send({
              data: r.BinaryProtocol.write(i),
              onSend: a,
              onDrop: r.wrap(o),
              binaryOpts: {
                debugString: ["action", "message", e.type, e.subtype].join(),
                debugObj: i,
                metric: r.M.MESSAGE,
                ackRequest: !1
              }
            })
          })["catch"](function() {
            a.error("wap:msgCreateRecord mPromise error")(), o()
          })
        })
      },
      msgFindQuery: function(e, t) {
        var r = this;
        return "before" !== e ? i["default"].reject("wap:msgFindQuery:unsupported:" + e) : new i["default"](function(e, n) {
          var o = function(t) {
              var n = [],
                o = r.BinaryProtocol.read(t),
                i = r.N.children(o);
              if ("response" === r.N.tag(o) && ("message" === r.N.attr("type", o) || "star" === r.N.attr("type", o) || "search" === r.N.attr("type", o)) && _.isArray(i)) {
                var a, s = i.length;
                for (a = 0; s > a; a++) {
                  var d = r.parseMsg(i[a], "response");
                  d && n.push(d)
                }
              }
              e(n)
            },
            i = r.queryNode({
              type: "message",
              jid: t.remote,
              count: t.count.toString(),
              index: t.id,
              owner: "undefined" == typeof t.fromMe ? void 0 : t.fromMe.toString(),
              participant: t.participant
            }, void 0);
          d.sendEphemeral({
            data: r.BinaryProtocol.write(i),
            onSend: r.binWrap(o, e),
            onDrop: r.wrap(n),
            binaryOpts: {
              debugString: "query,message," + [t.toString(), t.count].join(),
              debugObj: i,
              metric: r.M.QUERY_MESSAGES,
              ackRequest: !1
            }
          })
        })
      }
    };
  e.exports = _.defaults(p, h)
}, function(e, t, r) {
  e.exports = {
    "default": r(422),
    __esModule: !0
  }
}, function(e, t, r) {
  var n = r(69);
  e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
    return "String" == n(e) ? e.split("") : Object(e)
  }
}, function(e, t, r) {
  "use strict";
  var n = r(123),
    o = r(46),
    i = r(126),
    a = r(122),
    s = r(121),
    d = r(66),
    u = r(437),
    c = r(91),
    l = r(11).getProto,
    f = r(23)("iterator"),
    h = !([].keys && "next" in [].keys()),
    p = "@@iterator",
    g = "keys",
    _ = "values",
    m = function() {
      return this
    };
  e.exports = function(e, t, r, v, y, b, w) {
    u(r, t, v);
    var E, S, N = function(e) {
        if (!h && e in k) return k[e];
        switch (e) {
          case g:
            return function() {
              return new r(this, e)
            };
          case _:
            return function() {
              return new r(this, e)
            }
        }
        return function() {
          return new r(this, e)
        }
      },
      T = t + " Iterator",
      $ = y == _,
      C = !1,
      k = e.prototype,
      A = k[f] || k[p] || y && k[y],
      I = A || N(y);
    if (A) {
      var O = l(I.call(new e));
      c(O, T, !0), !n && s(k, p) && a(O, f, m), $ && A.name !== _ && (C = !0, I = function() {
        return A.call(this)
      })
    }
    if (n && !w || !h && !C && k[f] || a(k, f, I), d[t] = I, d[T] = m, y)
      if (E = {
          values: $ ? I : N(_),
          keys: b ? I : N(g),
          entries: $ ? N("entries") : I
        }, w)
        for (S in E) S in k || i(k, S, E[S]);
      else o(o.P + o.F * (h || C), t, E);
    return E
  }
}, function(e, t, r) {
  var n = r(11).getDesc,
    o = r(90),
    i = r(48),
    a = function(e, t) {
      if (i(e), !o(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
    };
  e.exports = {
    set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, o) {
      try {
        o = r(65)(Function.call, n(Object.prototype, "__proto__").set, 2), o(e, []), t = !(e instanceof Array)
      } catch (i) {
        t = !0
      }
      return function(e, r) {
        return a(e, r), t ? e.__proto__ = r : o(e, r), e
      }
    }({}, !1) : void 0),
    check: a
  }
}, function(e, t, r) {
  var n = r(31),
    o = "__core-js_shared__",
    i = n[o] || (n[o] = {});
  e.exports = function(e) {
    return i[e] || (i[e] = {})
  }
}, function(e, t) {
  var r = Math.ceil,
    n = Math.floor;
  e.exports = function(e) {
    return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e)
  }
}, function(e, t) {
  var r = 0,
    n = Math.random();
  e.exports = function(e) {
    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + n).toString(36))
  }
}, function(e, t) {}, , , , , , , , function(e, t, r) {
  e.exports = r.p + "img/23de3746eb94b2e205186a6486cca7f1.png"
}, function(e, t, r) {
  e.exports = r.p + "img/45210ece816d246c2e4f0e3b32f032c2.svg"
}, function(e, t) {
  e.exports = {
    action_try_again: "Try again.",
    action_profile_setting: "Setting profile photo",
    action_profile_set: "Profile photo set",
    action_profile_set_failed: "Couldn't set profile photo.",
    action_status_setting: "Changing status",
    action_status_set: "Status changed",
    action_status_set_failed: "Couldn't change status.",
    action_status_empty: "Status can't be empty",
    action_profile_removing: "Removing profile photo",
    action_profile_removed: "Profile photo removed",
    action_profile_remove_failed: "Couldn't remove profile photo.",
    action_chat_deleting: "Deleting chat",
    action_chat_deleted: "Chat deleted",
    action_chat_delete_failed: "Couldn't delete chat.",
    action_chat_archiving: "Archiving chat",
    action_chat_archived: "Chat archived",
    action_chat_archive_failed: "Couldn't archive chat.",
    action_chat_unarchiving: "Unarchiving chat",
    action_chat_unarchived: "Chat unarchived",
    action_chat_unarchive_failed: "Couldn't unarchive chat.",
    action_chat_marking_read: "Marking as read",
    action_chat_marked_read: "Marked as read",
    action_chat_mark_read_failed: "Couldn't mark chat as read.",
    action_chat_marking_unread: "Marking as unread",
    action_chat_marked_unread: "Marked as unread",
    action_chat_mark_unread_failed: "Couldn't mark chat as unread.",
    action_chat_clearing: "Clearing chat",
    action_chat_cleared: "Chat cleared",
    action_chat_clear_failed: "Couldn't clear chat.",
    action_group_deleting: "Deleting group",
    action_group_deleted: "Group deleted",
    action_group_delete_failed: "Couldn't delete group.",
    action_mark_as_not_spam: "Marking as not spam",
    action_marked_as_not_spam: "Marked as not spam",
    action_mark_as_not_spam_failed: "Couldn't mark as not spam",
    action_spam_report: "Reporting spam",
    action_spam_reported: "Reported spam",
    action_spam_report_failed: "Couldn't report spam",
    action_broadcast_deleting: "Deleting broadcast list",
    action_broadcast_deleted: "Broadcast list deleted",
    action_broadcast_delete_failed: "Couldn't delete broadcast list.",
    action_participant_adding: "Adding __participant__",
    action_participant_added: "__participant__ added",
    action_participant_add_failed: "Couldn't add __participant__.",
    action_participant_removing: "Removing __participant__",
    action_participant_removed: "__participant__ removed",
    action_participant_remove_failed: "Couldn't remove __participant__.",
    action_participant_promoting: "Making __participant__ a group admin",
    action_participant_promoted: "__participant__ is now a group admin",
    action_participant_promote_failed: "Couldn't make __participant__ an admin.",
    action_blocking: "Blocking __participant__",
    action_blocked: "__participant__ blocked",
    action_block_failed: "Couldn't block __participant__",
    action_unblocking: "Unblocking __participant__",
    action_unblocked: "__participant__ unblocked",
    action_unblock_failed: "Couldn't unblock __participant__",
    action_participant_failed_already_added: "__participant__ is already a participant.",
    action_participant_failed_401: "You're not an admin.",
    action_participant_failed_403: "You're not a participant.",
    action_participant_failed_404: "This group has ended.",
    action_group_creating: "Creating group",
    action_group_created: "Created group",
    action_group_create_failed: "Couldn't create group.",
    action_group_create_failed_406: "Please enter a shorter subject.",
    action_group_create_failed_participant: "Can't add more than __max__ participants",
    action_group_subject_empty: "Group subject can't be empty",
    action_group_icon_setting: "Setting group icon",
    action_group_icon_set: "Group icon set",
    action_group_icon_set_failed: "Couldn't set group icon.",
    action_group_icon_removing: "Removing group icon",
    action_group_icon_removed: "Group icon removed",
    action_group_icon_remove_failed: "Couldn't remove group icon.",
    action_group_exiting: "Exiting group",
    action_group_exited: "Exited group",
    action_group_exit_failed: "Couldn't exit group.",
    action_group_renaming: "Renaming group",
    action_group_renamed: "Group renamed to __subject__",
    action_group_rename_failed: "Couldn't rename group.",
    action_group_muting: "Muting group",
    action_group_muted: "Group muted",
    action_group_mute_failed: "Couldn't mute group.",
    action_group_unmuting: "Unmuting group",
    action_group_unmuted: "Group unmuted",
    action_group_unmute_failed: "Couldn't unmute group.",
    action_chat_muting: "Muting chat",
    action_chat_muted: "Chat muted",
    action_chat_mute_failed: "Couldn't mute chat.",
    action_chat_unmuting: "Unmuting chat",
    action_chat_unmuted: "Chat unmuted",
    action_chat_unmute_failed: "Couldn't unmute chat.",
    action_message_deleting: "Deleting message",
    action_message_deleting_plural: "Deleting messages",
    action_message_deleted: "Message deleted",
    action_message_deleted_plural: "__count__ messages deleted",
    action_message_delete_failed: "Couldn't delete message",
    action_message_delete_failed_plural: "Couldn't delete messages",
    delete_message: "Delete message",
    delete_message_plural: "Delete messages",
    action_message_starring: "Starring message",
    action_message_starring_plural: "Starring messages",
    action_message_starred: "Message starred",
    action_message_starred_plural: "__count__ messages starred",
    action_message_star_failed: "Couldn't star message",
    action_message_star_failed_plural: "Couldn't star messages",
    action_message_unstarring: "Unstarring message",
    action_message_unstarring_plural: "Unstarring messages",
    action_message_unstarred: "Message unstarred",
    action_message_unstarred_plural: "__count__ messages starred",
    action_message_unstar_failed: "Couldn't unstar message",
    action_message_unstar_failed_plural: "Couldn't unstar messages",
    star_message: "Star message",
    star_message_plural: "Star messages",
    unstar_message: "Unstar message",
    unstar_message_plural: "Unstar messages",
    msg_info_failed: "To view message info, update WhatsApp on your phone.",
    intro_title: "Keep your phone connected",
    intro_connection: "WhatsApp Web connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.",
    add_contact_to_group: "Add to a group",
    enumeration_comma: ", ",
    archive_chat: "Archive chat",
    unarchive_chat: "Unarchive chat",
    mark_unread_chat: "Mark as unread",
    mark_read_chat: "Mark as read",
    forward: "Forward",
    selected_count: "__count__ selected",
    selected_count_plural: "__count__ selected",
    forward_message: "Forward message",
    forward_message_plural: "Forward messages",
    forward_message_to: "Forward message to",
    forward_message_to_plural: "Forward messages to",
    confirm_forward_to_group: "Forward to “__chat__”?",
    confirm_forward_to_contact: "Forward to __chat__?",
    confirm_unblock_contact_and_forward: "Unblock __chat__ and forward messages?",
    confirm_unblock_contact_and_forward_text: "Blocked. Click to unblock and send.",
    message_author: "Message __author__",
    message: "Message",
    message_info: "Message info",
    hidden_group_message_text: "New Message",
    hidden_group_message_text_with_author: "Message from __author__",
    hidden_message_text: "__unreadCount__ New Message",
    hidden_message_text_plural: "__unreadCount__ New Messages",
    message_info_played_by: "Played by",
    message_info_played: "Played",
    message_info_read_by: "Read by",
    message_info_read: "Read",
    message_info_seen_by: "Seen by",
    message_info_seen: "Seen",
    message_info_delivered_to: "Delivered to",
    message_info_delivered: "Delivered",
    message_info_remaining: "__count__ remaining",
    message_info_remaining_plural: "__count__ remaining",
    copy_text: "Copy text",
    web_archive_broadcast: "Archive broadcast list",
    web_unarchive_broadcast: "Unarchive broadcast list",
    conversation_archived: "Chat archived",
    broadcast_archived: "Broadcast list archived",
    group_archived: "Group archived",
    web_undo: "undo",
    web_menuitem_groupchat: "New group",
    web_menuitem_new: "New chat",
    menuitem_profile_status: "Profile & status",
    menuitem_send_logs: "Send logs",
    send_logs_confirm: "send",
    describe_logs: "Enter log issue",
    menuitem_help: "Help",
    menuitem_keep_me_signed_in: "Keep me signed in",
    menuitem_notification_sounds: "Notification sounds",
    menuitem_notifications: "Notifications",
    menuitem_blocked: "Blocked",
    menuitem_archived: "Archived",
    menuitem_starred: "Starred",
    menuitem_logout: "Log out",
    menuitem_remove: "Remove",
    menuitem_make_group_admin: "Make group admin",
    menutitle_attach: "Attach",
    menutitle_menu: "Menu",
    web_settings_faq: "FAQ",
    if_unchecked_you_will_be_logged_out_afterawhile: "You'll be logged out after several minutes of inactivity",
    change_group_icon: "Change group icon",
    add_group_icon: "Add group icon",
    change_profile_photo: "Change profile photo",
    add_profile_photo: "Add profile photo",
    adjust_image: "Drag the image to adjust",
    done_adjusting: "Done",
    remove_profile_photo: "Remove your profile photo?",
    remove_group_icon: "Remove this group's icon?",
    delete_message_confirmation: "Delete message?",
    delete_message_confirmation_plural: "Delete messages?",
    confirm_remove_group_participant: "Remove __participant__ from “__subject__” group?",
    confirm_add_group_participant: "Add __participant__ to “__subject__” group?",
    confirm_promote_group_participant: "Make __participant__ an admin for “__subject__” group?",
    remove: "Remove",
    conversation_unarchived: "Chat unarchived",
    conversation_archive_failed: "Couldn't archive chat.",
    conversation_unarchive_failed: "Couldn't unarchive chat.",
    web_status: "Status",
    web_delete: "Delete",
    web_exit: "Exit",
    subject: "Subject",
    group_subject: "Group Subject",
    web_contact_phone: "Phone",
    web_group_creation_time: "Created __when__",
    group_participant_hint: "Type contact name",
    participant_already_blocked: "Already blocked",
    chat_not_an_admin: "You are not an admin",
    new_chat_flow_title: "New chat",
    new_group_flow_title: "New group",
    add_group_participants_title: "Add group participants",
    add_group_participant: "Add participant",
    already_added_to_group: "Already added to group",
    web_contact_info: "Contact info",
    broadcast_list_info: "Broadcast list info",
    web_group_info: "Group info",
    web_groups_participation_you_and_name: "Groups in common",
    web_participants_title: "Participants",
    web_recipients_title: "Recipients",
    web_participants_count: "__count__ of __max__",
    blocked_flow_title: "Blocked contacts",
    add_blocked_title: "Add blocked contact",
    add_blocked_hint: "Type contact name",
    blocked_description: "List of contacts that you have blocked",
    add_blocked_description: "Blocked contacts will no longer be able to call you or send you messages",
    add_blocked_instructions: "Click __icon__ button below to select a contact to block",
    blocked_empty: "No blocked contacts yet",
    unblock_button: "Unblock",
    unblock_confirmation: "Unblock __contact__?",
    archived_flow_title: "Archived chats",
    archived_empty: "No archived chats",
    starred_flow_title: "Starred messages",
    starred_empty: "No starred messages",
    cant_load_whatsapp: "Can't Load WhatsApp Web",
    computer_behind_proxy: "Your computer is connected to a network that prevents WhatsApp Web from working correctly",
    missing_photo_title: "Photo Unavailable",
    missing_photo_text: "Can’t view this photo because it's no longer on your phone.",
    missing_photo_forward_text: "Can’t forward this photo because it's no longer on your phone.",
    missing_video_title: "Video Unavailable",
    missing_video_text: "Can’t play this video because it's no longer on your phone.",
    missing_video_forward_text: "Can’t forward this video because it's no longer on your phone.",
    missing_audio_title: "Voice Message Unavailable",
    missing_audio_text: "Can’t play this Voice Message because it's no longer on your phone.",
    missing_audio_forward_text: "Can’t forward this Voice Message because it's no longer on your phone.",
    missing_media_title: "Media Message Unavailable",
    missing_media_forward_text: "Can't forward this media message because it's no longer on your phone",
    missing_media_forward_text_plural: "Can't forward some media messages because they are no longer on your phone",
    err_unsent_forward_title: "Can’t Forward",
    err_unsent_forward_text: "Wait until your message finishes sending and displays a checkmark before forwarding.",
    err_unsent_forward_text_plural: "Wait until each of your messages finishes sending and displays a checkmark before forwarding.",
    confirm_forward_partial_messages_title: "Can't forward all messages",
    confirm_forward_partial_messages_text: "Some messages have not been sent, do you want to forward rest of the messages?",
    retry_upload_photo_title: "Couldn’t Send Photo",
    retry_upload_photo_text: "Open WhatsApp on your phone and resend this photo",
    retry_upload_video_title: "Couldn’t Send Video",
    retry_upload_video_text: "Open WhatsApp on your phone and resend this video",
    retry_upload_audio_title: "Couldn’t Send Voice Message",
    retry_upload_audio_text: "Open WhatsApp on your phone and resend this Voice Message",
    guide_desktop_notifications_title: "Allow notifications",
    guide_desktop_notifications_description: "To get notifications for new messages, click “Allow” above.",
    guide_desktop_notifications_description_firefox: "To get notifications for new messages, select “Always show notifications” from the prompt below the URL bar.",
    guide_desktop_camera_title: "Allow camera",
    guide_desktop_camera_description: "To take photos, click “Allow” above to give WhatsApp Web access to your computer's camera.",
    guide_desktop_camera_description_firefox: "To take photos, WhatsApp Web needs access to your computer’s camera. Select “Always share” from the prompt below the URL bar.",
    guide_desktop_camera_description_edge: "To take photos, click “Yes” below to give WhatsApp Web access to your computer's camera.",
    guide_desktop_mic_title: "Allow microphone",
    guide_desktop_mic_description: "To record Voice Messages, click “Allow” above to give WhatsApp Web access to your computer's microphone.",
    guide_desktop_mic_description_firefox: "To record Voice Messages, WhatsApp Web needs access to your computer’s microphone. Select “Always share” from the prompt below the URL bar. Note: selecting “Share selected device” won’t let you record Voice Messages.",
    guide_desktop_mic_description_edge: "To record Voice Messages, click “Yes” below to give WhatsApp Web access to your computer's microphone.",
    guide_desktop_camera_fail_description: "To take photos, WhatsApp Web needs access to your computer's camera. Click __chrome_media_error__ in the URL bar and choose “Always allow web.whatsapp.com to access your camera.”",
    guide_desktop_camera_fail_description_firefox: "To take photos, WhatsApp Web needs access to your computer’s camera. Click __firefox_lock__ in the URL bar and set “Use the Camera” to “Allow.”",
    guide_desktop_camera_fail_description_opera: "To take photos, WhatsApp Web needs access to your computer’s camera. Click __opera_media__ in the URL bar and click “Clear This Setting and Reload.”",
    guide_desktop_camera_fail_description_edge: "To take photos, WhatsApp Web needs access to your computer’s camera. Refresh the page, try sending a camera image, and select “Yes” from the menu that appears.",
    guide_desktop_mic_fail_description: "To record Voice Messages, WhatsApp Web needs access to your microphone. Click __chrome_media_error__ in the URL bar and choose “Always allow web.whatsapp.com to access your microphone.”",
    guide_desktop_mic_fail_description_firefox: "To record Voice Messages, WhatsApp Web needs access to your computer’s microphone. Click __firefox_lock__ in the URL bar and set “Use the Microphone” to “Allow.”",
    guide_desktop_mic_fail_description_opera: "To record Voice Messages, WhatsApp Web needs access to your computer’s microphone. Click __opera_media__ in the URL bar and click “Clear This Setting and Reload.”",
    guide_desktop_mic_fail_description_edge: "To record Voice Messages, WhatsApp Web needs access to your computer’s microphone. Refresh the page, try sending a Voice Message, and select “Yes” from the menu that appears.",
    guide_desktop_camera_missing_title: "Camera Not Found",
    guide_desktop_camera_missing_description: "You can’t take a photo because it looks like your computer doesn’t have a camera. Try connecting one or if you have one connected, try restarting your browser.",
    guide_desktop_mic_missing_title: "Microphone Not Found",
    guide_desktop_mic_missing_description: "You can’t record a Voice Message because it looks like your computer doesn’t have a microphone. Try connecting one or if you have one connected, try restarting your browser.",
    attach_media: "Photos & Videos",
    attach_capture: "Camera",
    attach_location: "Location",
    attach_vcard: "Contact",
    attach_document: "Document",
    guide_help_title: "Help",
    guide_help_faq: "Click FAQ for help using WhatsApp Web.",
    guide_help_description_android: "To contact support, open WhatsApp on your phone and tap Menu – Settings – Help – Contact us.",
    guide_help_description_symbian: "To contact support, open WhatsApp on your phone and select Options – About – Contact support.",
    guide_help_description_bb: "To contact support, open WhatsApp on your phone and tap Settings – About – Contact support.",
    guide_help_description_bbx: "To contact support, open WhatsApp on your phone and swipe down from the top of the screen – Settings – Contact support.",
    guide_help_description_wp7: "To contact support, open WhatsApp on your phone and tap menu (three dots at the bottom of the screen) – Settings – About – Contact support.",
    guide_help_description_s40: "To contact support, open WhatsApp on your phone – swipe up from bottom – Settings – About – Options – Contact support.",
    guide_help_description_iphone: "To contact support, open WhatsApp on your phone and tap Settings – About – Contact Us.",
    turn_off_all_desktop_notifications_for: "Turn off all desktop notifications for:",
    learn_more: "Learn more",
    ok_got_it: "OK, got it",
    login: "Log in",
    web_view: "View",
    web_preview_msg: "Preview",
    add_a_caption: "Add a caption…",
    add_media: "Add media",
    drag_media_here: "Drag media here",
    view_photo: "View photo",
    take_photo: "Take photo",
    remove_photo: "Remove photo",
    upload_photo: "Upload photo",
    invalid_media_files: "WhatsApp Web doesn't support the type of image or video you tried adding. Try adding a different one.",
    image_too_big: "The image you tried adding is larger than the 16MB limit. Try adding a different one.",
    video_too_big: "The video you tried adding is larger than the 16MB limit. Try adding a different one.",
    option_select_mute: "Turn off alerts and sounds for…",
    option_desktop_notifications: "Desktop Alerts",
    option_sounds: "Sounds",
    option_msg_previews: "Show Previews",
    option_msg_previews_hint_text: "Display message text in desktop alerts",
    web_menuitem_mute_off: "Cancel mute",
    web_menuitem_mute: "Mute",
    group_muted: "Group muted",
    web_mute_time: "Mute group for…",
    web_mute_time_chat: "Mute chat for…",
    web_list_info: "Broadcast list info",
    click_here_for_group_info: "click here for group info",
    click_here_for_user_info: "click here for contact info",
    web_delete_contact_dialog_title: "Delete chat with “__name__”?",
    clear_button: "Clear",
    clear_chat_chat: "Clear chat with “__name__”?",
    clear_chat_group: "Clear “__name__” group?",
    clear_chat_broadcast: "Clear broadcast list?",
    keep_starred: "Keep starred messages",
    web_delete_group_dialog_title: "Delete “__groupName__” group?",
    web_exit_group_dialog_title: "Exit “__groupName__” group?",
    delete_chat_dialog_title: "Delete chat with “__name__”?",
    delete_list_dialog_title: "Delete broadcast list?",
    are_you_sure: "Are you sure?",
    next_button: "Next",
    previous_button: "Previous",
    save_button: "Save",
    edit_button: "Edit",
    clear_chat: "Clear chat",
    clear_group: "Clear group",
    clear_list: "Clear broadcast list",
    web_exit_group: "Exit group",
    web_delete_group: "Delete group",
    delete_chat: "Delete chat",
    web_delete_list: "Delete broadcast list",
    web_select_messages: "Select messages",
    conversation_deleted: "Chat deleted",
    broadcast_deleted: "Broadcast list deleted",
    group_deleted: "Group deleted",
    report_spam: "Report spam",
    report_group_spam_ack: "Are you sure you want to report spam and leave this group?",
    report_spam_ack: "Are you sure you want to report spam and block this contact?",
    report_group_spam: "Report spam and leave group",
    block: "Block",
    block_ack: "Are you sure you want to block this contact?",
    not_spam: "Not spam",
    group_admin_not_a_contact: "You were added by someone who's not in your contacts",
    sender_not_a_contact: "The sender is not in your contact list",
    unread_message_count: "__count__ unread message",
    unread_message_count_plural: "__count__ unread messages",
    web_chats: "Chats",
    web_recent_chats: "Chats",
    web_groups: "Groups",
    web_contacts: "Contacts",
    web_messages: "Messages",
    web_starred_messages: "Starred Messages",
    web_conversation_is_composing: "typing…",
    web_conversation_is_recording: "recording audio…",
    web_conversation_contact_online: "online",
    web_conversation_name_is_composing: "__participant__ is typing…",
    web_conversation_name_is_recording: "__participant__ is recording audio…",
    web_conversations_most_recent_image: "Photo",
    web_conversations_most_recent_audio: "Audio",
    web_conversations_most_recent_voice: "Voice message",
    web_conversations_most_recent_video: "Video",
    web_conversations_most_recent_contact: "Contact",
    web_conversations_most_recent_location: "Location",
    web_conversations_most_recent_file: "Document",
    web_conversations_most_recent_document: "__count__ page",
    web_conversations_most_recent_document_plural: "__count__ pages",
    untitled_document: "Untitled",
    search_no_chats_or_contacts: "No chats or contacts found",
    search_no_contacts: "No contacts found",
    search_no_groups: "No groups found",
    no_chats: "No chats",
    no_contacts: "No contacts",
    no_groups: "No groups",
    chat_archived: "Archived",
    all_chats_archived: "All chats are archived",
    no_starred_messages: "No starred messages",
    web_group_admin: "Group Admin",
    contact_status_loading: "Loading status…",
    retry_now: "Retry Now",
    retake: "Retake",
    web_cancel: "Cancel",
    web_ok: "OK",
    web_close: "Close",
    web_share: "Share",
    web_button_download: "Download",
    trying_to_reach_phone: "Trying to reach phone",
    connecting_to_whatsapp: "Connecting to WhatsApp",
    connecting_to_whatsapp_or_phone: "Connecting",
    connecting: "Connecting…",
    updating_whatsapp_web_title: "Updating",
    updating_whatsapp_web: "WhatsApp Web is out of date. Updating now…",
    retrying: "Retrying…",
    retrying_in: "Retrying in __duration__…",
    loading_messages: "loading messages…",
    load_earlier_messages: "load earlier messages…",
    load_recent_messages: "load recent messages…",
    resend_message: "Click to resend",
    click_to_save_esc_to_cancel: "Click to save, ESC to cancel",
    web_today_at: "today at __time__",
    web_yesterday_at: "yesterday at __time__",
    web_time_at: "__date__ at __time__",
    web_conversation_last_seen_today: "last seen today at __time__",
    web_conversation_last_seen_yesterday: "last seen yesterday at __time__",
    web_conversation_last_seen_date: "last seen __date__ at __time__",
    web_you: "You",
    web_today: "today",
    web_yesterday: "yesterday",
    retrying_in_some_seconds: "Retrying in __number__ second…",
    retrying_in_some_seconds_plural: "Retrying in __number__ seconds…",
    web_you_created_list_unnamed: "You created a broadcast list with __count__ recipient",
    web_you_created_list_unnamed_plural: "You created a broadcast list with __count__ recipients",
    web_list_recipient_added: "__name__ added to the list",
    web_list_recipient_removed: "__name__ removed from the list",
    web_group_subject_changed_by_you: "You changed the subject to “__subject__”",
    web_group_subject_changed_by_name: "__name__ changed the subject to “__subject__”",
    web_group_participant_added_name: "__name__ was added",
    web_group_participant_added_you: "You were added",
    web_group_participant_removed_name: "__name__ was removed",
    web_group_participant_removed_you: "You were removed",
    web_group_participant_left_name: "__name__ left",
    web_group_participant_left_you: "You left",
    web_group_participant_changed_number: "__name__ changed from __old_number__ to __new_number__",
    web_group_participant_changed_number_unknown_name: "__name__ changed to __new_number__",
    web_group_participants_name_added_names: "__name__ added __participants__",
    web_group_participants_you_added_names: "You added __participants__",
    web_group_participants_name_removed_names: "__name__ removed __participants__",
    web_group_participants_you_removed_names: "You removed __participants__",
    web_group_participants_name_added_you: "__name__ added you",
    web_group_participants_name_removed_you: "__name__ removed you",
    web_group_participant_promoted_names: "__participants__ is now an admin",
    web_group_participant_promoted_names_plural: "__participants__ are now admins",
    web_group_participant_demoted_names: "__participants__ is no longer an admin",
    web_group_participant_demoted_names_plural: "__participants__ are no longer admins",
    web_group_participant_promoted_you: "You're now an admin",
    web_group_participant_demoted_you: "You're no longer an admin",
    web_group_created_by_you: "You created group “__subject__”",
    web_group_created_by_name: "__name__ created group “__subject__”",
    web_group_created_by_you_no_subject: "You created this group",
    web_group_created_by_name_no_subject: "__name__ created this group",
    web_group_ended_you: "You ended this group",
    web_group_ended_name: "__name__ ended this group",
    web_photo_changed_by: "__name__ changed this group's icon",
    web_photo_removed_by: "__name__ deleted this group's icon",
    web_photo_changed_by_you: "You changed this group's icon",
    web_photo_removed_by_you: "You deleted this group's icon",
    web_mute_8hours: "8 Hours",
    web_mute_1week: "1 Week",
    web_mute_1year: "1 Year",
    mute_1hour: "1 Hour",
    mute_1day: "1 Day",
    mute_1week: "1 Week",
    global_muted: "Alerts and sounds off",
    global_muted_1hour: "Alerts and sounds off for 1 hour",
    global_muted_1day: "Alerts and sounds off for 1 day",
    global_muted_1week: "Alerts and sounds off for 1 week",
    global_notification_sounds_on: "Notification sounds on",
    global_notification_sounds_off: "Notification sounds off",
    global_unmuted: "Notifications enabled",
    global_unmute: "Alerts and sounds off. Click to restore.",
    web_cannot_send_not_a_group_participant: "You can't send messages to this group because you're no longer a participant.",
    web_cannot_send_to_blocked_contact_1: "Can't send a message to blocked contact __contact__.",
    cannot_send_document_to_contact_unsupported: "Can't send documents to __contact__ because __contact__ is on a version of WhatsApp that doesn't support them.",
    cannot_send_document_to_group_unsupported: "Can't send documents to __group__ because some members are on a version of WhatsApp that doesn't support them.",
    type_a_message: "Type a message",
    whatsapp_web: "WhatsApp Web",
    default_group_message_notification_title: "WhatsApp group message",
    incoming_call_notification_title: "WhatsApp Call from __name__",
    incoming_call_notification_text: "Check your phone to answer",
    default_contact_message_notification_title: "WhatsApp message",
    search_or_start_new_chat: "Search or start new chat",
    search_contacts: "Search contacts",
    search: "Search…",
    search_groups: "Search groups",
    update_available: "Update Available",
    click_to_update_whatsapp_web: "Click to update WhatsApp Web",
    phone_battery_low: "Phone Battery Low",
    charge_phone_description: "Charge your phone to keep using WhatsApp Web",
    computer_not_connected: "Computer Not Connected",
    make_sure_computer_active_internet_connection: "Make sure your computer has an active Internet connection.",
    check_internet_connection: "No Internet connection",
    reconnect: "Reconnect",
    phone_not_connected: "Phone Not Connected",
    make_sure_phone_active_internet_connection: "Make sure your phone has an active Internet connection.",
    enable_desktop_notifications: "Turn on desktop notifications",
    get_notified_of_new_messages: "Get Notified of New Messages",
    phone_has_another_active_webclient_session: "WhatsApp Web is open on another computer or browser. Click “Use Here” to use WhatsApp Web in this window.",
    whatsapp_web_is_open_in_another_window: "WhatsApp Web is open in another window. Click “Use Here” to use WhatsApp Web in this window.",
    button_use_here: "Use Here",
    open_whatsapp: "Open WhatsApp",
    click_to_reload_qr_code: "Click to reload QR code",
    scan_code_with_phone_to_login: "Use WhatsApp on your phone to scan the code",
    reduce_data_usage_connect_phone_to_wifi: "To reduce mobile data usage, connect your phone to Wi-Fi",
    android: "Android",
    android_login_path: "Open WhatsApp — Menu — WhatsApp Web",
    blackberry: "BlackBerry",
    blackberry_login_path: "Open WhatsApp — Chats — Menu key — WhatsApp Web",
    windows_phone: "Windows Phone",
    windows_phone_login_path: "Open WhatsApp — Menu — WhatsApp Web",
    nokia_symbian_s60: "Nokia S60",
    nokia_symbian_s60_login_path: "Open WhatsApp — Menu — WhatsApp Web",
    nokia_s40: "Nokia S40",
    nokia_s40_login_path: "Open WhatsApp – Swipe up from bottom of screen – WhatsApp Web",
    bb10: "BlackBerry 10",
    bb10_login_path: "Open WhatsApp — Swipe down from top of screen — WhatsApp Web",
    iphone: "iPhone",
    iphone_login_path: "Open WhatsApp — Settings — WhatsApp Web",
    message_too_large_title: "Message Too Long",
    message_too_large_text: "The message you’re pasting is too long. Try shortening it or sending it in multiple parts.",
    video_playback_not_supported: "Your browser doesn’t support video playback.",
    audio_playback_not_supported: "Your browser doesn’t support audio playback.",
    whatsapp_web_meta_description: "Quickly send and receive WhatsApp messages right from your computer.",
    whatsapp_web_description: "Send and receive WhatsApp messages right from your computer.",
    whatsapp_web_requirements: "We recommend using WhatsApp Web with one of the following browsers:",
    whatsapp_web_supports: "WhatsApp Web also supports:",
    update_safari: "Update Safari",
    get_safari: "Safari (MacOS 10.8+ Only)",
    get_google_chrome: "Google Chrome",
    update_google_chrome: "Update Google Chrome",
    get_mozilla_firefox: "Mozilla Firefox",
    update_mozilla_firefox: "Update Mozilla Firefox",
    get_opera: "Opera",
    get_edge: "Microsoft Edge",
    whatsapp_edge_version: "WhatsApp Web works with Microsoft Edge 13+",
    whatsapp_edge_instructions: "To use WhatsApp Web, update Windows 10 to get Microsoft Edge 13+, or use __chrome_homepage__, __firefox_homepage__, or __opera_homepage__.",
    update_edge: "Download latest Windows 10",
    whatsapp_safari_version: "WhatsApp Web works with Safari 7.1+",
    whatsapp_safari_instructions: "To use WhatsApp Web, update Safari or use __chrome_homepage__, __firefox_homepage__, or __opera_homepage__.",
    whatsapp_safari_limited_title: "Using Safari",
    whatsapp_safari_limited: "To use all of WhatsApp Web's features like photo capturing and Voice Message recording, we recommend using __chrome_homepage__, __firefox_homepage__ or __opera_homepage__.",
    whatsapp_firefox_version: "WhatsApp Web works with Mozilla Firefox 30+",
    whatsapp_firefox_instructions: "To use WhatsApp Web, update Firefox or use __chrome_homepage__, __safari_homepage__, or __opera_homepage__.",
    whatsapp_chrome_version: "WhatsApp Web works with Google Chrome 36+",
    whatsapp_chrome_instructions: "To use WhatsApp Web, update Chrome or use __firefox_homepage__, __safari_homepage__, or __opera_homepage__.",
    filesize_byte: "B",
    filesize_kilobyte: "kB",
    filesize_megabyte: "MB",
    filesize_gigabyte: "GB",
    confirm_closing_webclient: "You are closing WhatsApp Web.",
    confirm_logout: "Log out?",
    some_of_your_messages_are_still_sending: "Some of your messages are still sending.",
    web_terms_of_service_1: "WhatsApp is updating our Terms and Privacy Policy to reflect new features like WhatsApp Calling. Open WhatsApp on your phone to read our Terms and Privacy Policy and learn more about the choices you have.",
    web_terms_of_service_2: "WhatsApp is updating our Terms and Privacy Policy to reflect new features like WhatsApp Calling. Open WhatsApp on your phone to read our Terms and Privacy Policy and learn more about the choices you have.",
    web_terms_of_service_login_block: 'WhatsApp is updating our Terms and Privacy Policy to reflect new features like WhatsApp Calling. Open WhatsApp on your phone to read our Terms and Privacy Policy and learn more about the choices you have. If you have accepted the Terms and Privacy Policy, click \\"LOG IN\\" to continue using WhatsApp Web.'
  }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o() {
    return _.filter(_.keys(E.BROWSER_CAPABILITY), function(e) {
      return !E.BROWSER_CAPABILITY[e]
    })
  }

  function i() {
    W.sendMessage(navigator.serviceWorker.controller, "registerClientLogger"), W.on("log", function(e) {
      var t = e.data.message,
        r = t.message;
      r[0] = "ServiceWorker: " + r[0], h[t.level].apply(h, r)()
    })
  }

  function a() {
    return A.loopOnError(function(e) {
      return l["default"].delay(D.expBackoff(e, 12e4, 1e3, .1)).then(function() {
        return r.e(0).then(function(e) {
          u = r(712)
        }.bind(null, r))["catch"](function(e) {
          r.oe(e)
        })
      })
    })
  }

  function s() {
    return _.isFunction(String.prototype.normalize) ? l["default"].resolve() : A.loopOnError(function(e) {
      return l["default"].delay(D.expBackoff(e, 12e4, 1e3, .1)).then(function() {
        return r.e(5).then(function(e) {
          r(795)
        }.bind(null, r))["catch"](function(e) {
          r.oe(e)
        })
      })
    })
  }
  var d, u, c = r(3),
    l = n(c),
    f = r(6),
    h = r(1),
    p = r(397),
    g = r(399),
    m = r(395),
    v = r(396),
    y = r(388),
    b = r(401),
    w = r(54),
    E = r(7),
    S = r(8),
    N = r(43),
    T = r(394),
    $ = r(389),
    C = r(13),
    k = r(63),
    A = r(29),
    I = r(84),
    O = r(105),
    R = r(106),
    P = r(15),
    M = r(174),
    L = r(30),
    D = r(85),
    x = r(165),
    j = r(110),
    U = {
      INIT: "init",
      PING: "ping",
      PONG: "pong",
      TAKEOVER: "local-takeover"
    },
    B = 6e5,
    F = r(118),
    W = r(400);
  if (F) {
    try {
      navigator.serviceWorker.addEventListener("controllerchange", function(e) {
        C.state !== C.STATE.UNLAUNCHED && i()
      })
    } catch (Y) {
      h.error('Unable to add "controllerchange" event listener to service worker, error: ' + Y)()
    }
    W.on("updateReady", function(e) {
      C.state === C.STATE.UNLAUNCHED && (Store.Stream.needsUpdate = e.data.message)
    })
  }
  var G = f.createClass({
    displayName: "App",
    mixins: [I, O, R],
    statics: {
      hasPending: function() {
        return !!u && u.hasPending()
      }
    },
    getInitialState: function() {
      return {
        mode: k.mode,
        updating: !1,
        anotherSession: !1,
        takingOver: !1,
        locale: _.first(l10n._locales)
      }
    },
    clearMutexTimer: function() {
      this.updateMutexTimerID && x.clearTimeout(this.updateMutexTimerID)
    },
    updateMutex: function() {
      this.clearMutexTimer();
      var e = Date.now();
      P.setMutex(this.ourMutex = U.INIT + "_" + e), this.updateMutexTimerID = x.setTimeout(this.updateMutex, e + B)
    },
    unloadMutex: function() {
      var e = P.getMutex();
      e && this.ourMutex && e.indexOf(this.ourMutex) > -1 && P.removeMutex()
    },
    componentWillUpdate: function(e, t) {
      this.state.anotherSession === !0 && t.anotherSession === !1 ? L.openDB() : this.state.anotherSession === !1 && t.anotherSession === !0 && L.idb().then(function(e) {
        return e.close()
      })["catch"](_.noop)
    },
    componentWillMount: function() {
      l["default"].join(a(), s()).then(function() {
        return S.mainLoaded()
      });
      var e = o();
      if (e.length > 0) {
        var t = E.CAPABILITY_URL + "?missing=" + e.join(",");
        window.location.replace ? window.location.replace(t) : window.location.href = t
      }
      this.regNativeListener(window, "beforeunload", this.unloadMutex), this.regNativeListener(window, "unload", this.unloadMutex), this.regNativeListener(window, "storage", this.storagePong), this.addObserver(j, "change:mode", this.onUpdaterModeChange), this.addObserver(k, "change:mode", this.onStreamModeChange);
      var r = this;
      this.regCmd("locale_change", function() {
        h.log("App:componentWillMount:rerenderUI locale change")(), r.setState({
          locale: _.first(l10n._locales)
        })
      }), M.loadInitialAssets().then(function() {
        h.log("App:componentWillMount:loadInitialAssets")()
      }), this.registerYesterdayTimer(), h.log("App:componentWillMount:visibilityState: " + document.visibilityState)(), this.init(0)
    },
    registerYesterdayTimer: function() {
      var e = this;
      x.setTimeout(function() {
        h.log("App:registerYesterdayTimer:rerenderUI relative timestamps")(), S.midnight(), e.registerYesterdayTimer()
      }, moment().endOf("day").valueOf())
    },
    onStreamModeChange: function() {
      this.setState({
        mode: k.mode
      })
    },
    onUpdaterModeChange: function() {
      j.mode !== j.Mode.PENDING_REFRESH && j.mode !== j.Mode.REFRESHING || C.hasSynced || this.setState({
        updating: !0
      })
    },
    init: function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
        t = this;
      if (e += 1, e > 3) return void this.setState({
        takingOver: !1,
        anotherSession: !0
      });
      var r = P.getNoTakeover();
      P.setNoTakeover(), C.preload(), this.pingForOtherLocalSession().then(function(n) {
        n ? (P.maybeMigrate(), t.updateMutex(), C.launch(!r), t.setState({
          takingOver: !1,
          anotherSession: !1
        })) : r ? t.setState({
          takingOver: !1,
          anotherSession: !0
        }) : t.takeoverLocal(e)
      })
    },
    pingForOtherLocalSession: function() {
      var e = P.getMutex();
      if (e) {
        e += "";
        var t = 1e4;
        if (e.indexOf("_") > 0 && (e = parseInt(_.last(e.split("_")), 10), _.isFinite(e))) {
          var r = Date.now() - 1.5 * B;
          r > e && (h.log("app:pingForOtherLocalSession stale mutex")(),
            t = 1e3)
        }
        var n = A.waitForEvent(window, "storage", P.mutexFilter).timeout(t, "waitForOtherLocalSessionTimeout")["return"](!1)["catch"](l["default"].TimeoutError, function(e) {
          return !0
        });
        return P.setMutex(U.PING + Math.random()), n
      }
      return l["default"].resolve(!0)
    },
    storagePong: function(e) {
      if (P.mutexFilter(e)) {
        var t = P.parseMutex(e.newValue);
        t && (t === U.TAKEOVER ? (this.clearMutexTimer(), C.exitLoop(), P.localTakeoverSuccess(), this.setState({
          takingOver: !1,
          anotherSession: !0
        })) : 0 === t.indexOf(U.PING) && P.setMutex(U.PONG + Math.random()))
      }
    },
    takeoverLocal: function(e) {
      if (P.compareVersion() < 0 || Store.Stream.needsUpdate) return h.log("app:takeoverLocal stale client: " + P._version() + " ls: " + P._getLSVersion())(), document.location.reload(!0);
      if (F && navigator.serviceWorker.controller && i(), P.getMutex()) {
        this.setState({
          takingOver: !0
        });
        var t = this;
        A.waitForEvent(window, "storage", P.takeoverFilter).timeout(3e4, "takeoverLocalTimeout").then(function(r) {
          var n = P.parseTakeover(r.newValue);
          P.getRememberMe() || P._setAllKeyValues(n), C.mustExitLoop = !1, P.removeMutex(), t.init(e)
        })["catch"](l["default"].TimeoutError, function(r) {
          C.mustExitLoop = !1, P.removeMutex(), t.init(e)
        }), P.setMutex(U.TAKEOVER)
      } else this.init(e)
    },
    onMouseDown: function(e) {
      S.windowMouseDown(e)
    },
    onClick: function(e) {
      S.windowClick(e)
    },
    render: function() {
      var e, t = N("app-wrapper", {
        "app-wrapper-web": !0
      });
      if (this.state.updating) e = f.createElement(w, {
        body: l10n.t("updating_whatsapp_web"),
        title: l10n.t("updating_whatsapp_web_title")
      });
      else if (this.state.anotherSession) {
        var r, n;
        if (this.state.takingOver) r = _.noop, n = l10n.t("connecting");
        else {
          var o = this;
          r = function() {
            o.takeoverLocal(0)
          }, n = l10n.t("button_use_here")
        }
        e = f.createElement(w, {
          body: l10n.t("whatsapp_web_is_open_in_another_window"),
          cancelLabel: l10n.t("web_close"),
          onCancel: window.open.bind(window, "http://www.whatsapp.com/", "_self"),
          defaultLabel: n,
          onDefault: r
        })
      } else switch (this.state.mode) {
        case k.MODE.QR:
          e = [f.createElement(T, {
            key: "modal-manager"
          }), f.createElement(p, {
            key: "qr-code"
          })];
          break;
        case k.MODE.SYNCING:
          e = f.createElement(g, null);
          break;
        case k.MODE.OFFLINE:
          e = f.createElement(m, null);
          break;
        case k.MODE.PROXYBLOCK:
          e = f.createElement(v, null);
          break;
        case k.MODE.CONFLICT:
          e = f.createElement(y, null);
          break;
        case k.MODE.TOS_BLOCK:
          e = f.createElement(b, null);
          break;
        case k.MODE.MAIN:
          e = [f.createElement(T, {
            type: "media",
            key: "media-modal-manager"
          }), f.createElement(T, {
            type: "main",
            key: "main-modal-manager"
          }), f.createElement($, {
            type: "menu",
            key: "context-menu-manager"
          }), f.createElement($, {
            type: "tooltip",
            key: "tooltip-manager"
          }), f.createElement(u, {
            key: "main",
            conn: Store.Conn
          })], t += " app-wrapper-main";
          break;
        default:
          h.log("app:render Error invalid App state", this.state.mode)()
      }
      return f.createElement("div", {
        className: t,
        onMouseDownCapture: this.onMouseDown,
        onClickCapture: this.onClick,
        key: this.state.locale
      }, e, d ? f.createElement(d, null) : null)
    }
  });
  e.exports = G
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(27),
    i = n(o),
    a = r(3),
    s = n(a),
    d = r(7),
    u = r(1),
    c = r(353),
    l = r(161),
    f = r(29),
    h = r(22),
    p = r(35),
    g = r(8),
    m = r(21),
    v = r(13),
    y = c.extend({
      model: l,
      comparator: l.Comparator,
      _sort: _.debounce(function() {
        return c.prototype.sort.call(this)
      }, 1e3),
      _silentSort: _.debounce(function() {
        return c.prototype.sort.call(this, {
          silent: !0
        })
      }, 1e3),
      sort: function(e) {
        return e && e.slient ? this._silentSort() : this._sort()
      },
      initialize: function() {
        c.prototype.initialize.call(this, {
          CachePolicy: {
            id: "contact_collection",
            policy: c.CACHE_POLICY.NONE
          }
        }), this.checksum = void 0, this.listenTo(g, "locale_change", this.sort), this.listenTo(this, "change:name", this.sort), this.listenTo(v, "change:stream", function() {
          v.stream === v.STREAM.DISCONNECTED && this.forEach(function(e) {
            return e.unset("_capabilities")
          })
        })
      },
      "delete": function() {
        c.prototype["delete"].call(this), delete this.checksum
      },
      isFilteredContact: function(e) {
        return e.name && !e.isMe && e.isWAContact
      },
      getFilteredContacts: function() {
        return this.filter(function(e) {
          return e.name && !e.isMe && e.isWAContact
        })
      },
      _find: function(e) {
        var t = this.get(e);
        return t ? s["default"].resolve(t) : s["default"].resolve({
          id: e
        })
      },
      _findQuery: function(e) {
        var t = this;
        return p.contactFindQuery(e.retry).then(function(e) {
          return "preempted" === e ? s["default"].reject("contacts preempted") : (t.trigger(d.COLLECTION_HAS_SYNCED), e.checksum && (t.checksum = e.checksum, u.log("Store:Contact:query update checksum " + e.checksum)()), s["default"].resolve(e.data))
        })
      },
      handle: function(e) {
        function t(e) {
          var t = r.get(e.id);
          e.name ? r.add(e, {
            merge: !0
          }) : t && t.unset("name")
        }
        var r = this,
          n = e.shift();
        if (_.isArray(n)) {
          var o = e.shift();
          if (o && "remove" === o.missing) {
            var a = {};
            n.forEach(function(e) {
              a[e.id] = !0
            }), r.forEach(function(e) {
              var t = e.get("id");
              h.isUser(t) && !a[t] && e.set("name")
            })
          }
          o && o.checksum && (r.checksum = o.checksum, u.log("Store:Contact:handle update checksum " + o.checksum)()), n.forEach(t)
        } else if ("preempt" === n.cmd) this.add(n.response, {
          merge: !0
        }), n.checksum && (r.checksum = n.checksum, u.log("Store:Contact:handle update checksum " + n.checksum)()), this.trigger(d.COLLECTION_HAS_SYNCED);
        else if ("caps" === n.type) {
          var s = this.get(n.jid);
          if (s && s.isUser && s._capabilities && _.isObject(n.data))
            for (var c in n.data) s._capabilities[c] = n.data[c]
        } else u.error("Store:Contact:handle unknown: " + (0, i["default"])(n))()
      },
      sync: function() {
        return this.findQuery({})["catch"](m.WapDrop, _.noop), f.waitForBBEvent(this, d.COLLECTION_HAS_SYNCED)
      },
      resyncContacts: function(e) {
        "undefined" != typeof this.checksum && "undefined" != typeof e && (this.checksum !== e ? this.findQuery({
          retry: !0
        }).then(function(e) {
          if (_.isArray(e)) {
            u.log("Store:Contact:resync success")();
            var t, r, n = {};
            for (r = 0; r < e.length; r++) t = e[r], n[t.id] = t;
            for (r = 0; r < this.length; r++) t = this.at(r), n[t.id] || t.unset("name")
          } else u.error("Store.Contact.resync error " + (0, i["default"])(e), e)()
        })["catch"](m.WapDrop, _.noop) : u.log("Store:Contact:resync checksum match")())
      }
    });
  e.exports = new y
}, function(e, t, r) {
  "use strict";

  function n(e) {
    o.log("Application Cache " + e.type + " event")(e)
  }
  var o = r(1);
  applicationCache.addEventListener("cached", n), applicationCache.addEventListener("checking", n), applicationCache.addEventListener("downloading", n), applicationCache.addEventListener("error", n), applicationCache.addEventListener("noupdate", n), applicationCache.addEventListener("obsolete", n), applicationCache.addEventListener("progress", n), applicationCache.addEventListener("updateready", n)
}, function(e, t) {
  "use strict";
  ! function(e) {
    var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype,
      r = e.Blob && function() {
        try {
          return Boolean(new Blob)
        } catch (e) {
          return !1
        }
      }(),
      n = r && e.Uint8Array && function() {
        try {
          return 100 === new Blob([new Uint8Array(100)]).size
        } catch (e) {
          return !1
        }
      }(),
      o = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder,
      i = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
      a = (r || o) && e.atob && e.ArrayBuffer && e.Uint8Array && function(e) {
        var t, a, s, d, u, c, l, f, h;
        if (t = e.match(i), !t) throw new Error("invalid data URI");
        for (a = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), s = !!t[4], d = e.slice(t[0].length), u = s ? atob(d) : decodeURIComponent(d), c = new ArrayBuffer(u.length), l = new Uint8Array(c), f = 0; f < u.length; f += 1) l[f] = u.charCodeAt(f);
        return r ? new Blob([n ? l : c], {
          type: a
        }) : (h = new o, h.append(c), h.getBlob(a))
      };
    e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(e, r, n) {
      e(n && t.toDataURL && a ? a(this.toDataURL(r, n)) : this.mozGetAsFile("blob", r))
    } : t.toDataURL && a && (t.toBlob = function(e, t, r) {
      e(a(this.toDataURL(t, r)))
    })), e.dataURLtoBlob = a
  }(window)
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    return I[parseInt(e, 10)]
  }

  function i() {
    var e = y || window.location.href || "",
      t = e.split("/%F0%9F%8C%90/");
    return t.length > 1 ? _.first(t[1].split("/")) : void 0
  }
  var a = r(3),
    s = n(a),
    d = r(1),
    u = r(44),
    c = r(161),
    l = r(493),
    f = r(408),
    h = r(8),
    p = r(171),
    g = r(29),
    m = r(500),
    v = r(85),
    y = window.location.href,
    b = window.history && window.history.pushState && window.location;
  b && y && y.indexOf("/%F0%9F%8C%90/") > -1 && window.history.replaceState({}, "", "/");
  var w = "en",
    E = "en-GB",
    S = document.documentElement.getAttribute("dir"),
    N = document.getElementById("style").getAttribute("href"),
    T = {
      en: r(204)
    },
    $ = {
      LTR: "ltr",
      RTL: "rtl"
    },
    C = r(498),
    k = ["ar", "fa", "ur", "he", "dv", "ku"],
    A = ["ar", "fa"],
    I = "٠١٢٣٤٥٦٧٨٩".split("");
  c.setCollator(w), e.exports = {
    _locales: [w],
    init: function(e) {
      this.initPromise && this.initPromise.cancel();
      var t = [];
      if (this._addLocale(e, t), this._addLocale(i(), t), navigator.languages) {
        var n = this;
        _.forEach(navigator.languages, function(e) {
          n._addLocale(e, t)
        })
      }
      this._addLocale(navigator.language, t), this._addLocale(w, t);
      var o = t.filter(function(e) {
          return !T[e]
        }),
        a = o.map(function(e) {
          return e = C[e], e ? g.loopOnError(function(t) {
            return s["default"].delay(v.expBackoff(t, 12e4, 1e3, .1)).then(function() {
              return r(374)("./" + e + "/translation.json")()
            })
          }).cancellable()["catch"](s["default"].CancellationError, _.noop) : s["default"].reject("Non-existent language requested.")
        }),
        u = this.curDir();
      return this.initPromise = s["default"].all(a).bind(this).cancellable()["finally"](function() {
        return _.forEach(a, function(e) {
          return e.cancel()
        })
      }).then(function(r) {
        o.forEach(function(e, t) {
          T[e] = r[t]
        }), this._locales = t;
        var n = _.first(this._locales).replace("_", "-").toLowerCase();
        c.setCollator(n);
        var i = [e, _.first(this._locales), E].filter(function(e) {
          return !!e
        });
        moment.locale(i), this.customizeMomentLocale(moment.locale());
        var a = k.indexOf(_.first(this._locales)) > -1 ? $.RTL : $.LTR;
        if (a !== S) {
          if (this._loadedStyle && u === S) return this._switchStyleDir(u, a), h.localeChange(), d.log("i10n:init Locale Updated: " + this._locales.join(":"))(), this._locales;
          var s = window.performance.now();
          return this._loadStyle().bind(this).then(function(e) {
            this._loadedStyle = e;
            var t = window.performance.now();
            this._switchStyleDir(u, a);
            var r = window.performance.now();
            return d.log("i10n:init style fetching:" + (t - s) + "ms")(), d.log("i10n:init style executing:" + (r - t) + "ms")(), h.localeChange(), d.log("i10n:init Locale Updated: " + this._locales.join(":"))(), this._locales
          })
        }
        return this._switchStyleDir(u, a), h.localeChange(), d.log("i10n:init Locale Updated: " + this._locales.join(":"))(), this._locales
      })["catch"](s["default"].CancellationError, _.noop)["catch"](function() {
        this._locales = [w], c.setCollator(w);
        var r = [e, _.first(this._locales), E].filter(function(e) {
          return !!e
        });
        return moment.locale(r), this.customizeMomentLocale(moment.locale()), this._switchStyleDir(u, $.LTR), h.localeChange(), d.error("i10n:init Failed to fetch locales", t)(), this._locales
      })
    },
    _switchStyleDir: function(e, t) {
      if (e !== t) {
        var r = document.getElementById("style");
        t === S ? (e !== S && this._loadedStyle && (this._loadedStyle.unuse(), u.isGecko && r.setAttribute("href", N)), r.removeAttribute("disabled"), document.documentElement.setAttribute("dir", t)) : (u.isGecko && r.setAttribute("href", ""), r.setAttribute("disabled", "true"), document.documentElement.setAttribute("dir", t), this._loadedStyle.use())
      }
    },
    _loadRTL: function() {
      return g.loopOnError(function(e) {
        return s["default"].delay(v.expBackoff(e, 12e4, 1e3, .1)).then(function() {
          return r.e(1).then(function(e) {
            return r(718)
          }.bind(null, r))["catch"](function(e) {
            r.oe(e)
          })
        })
      })
    },
    _loadLTR: function() {
      return g.loopOnError(function(e) {
        return s["default"].delay(v.expBackoff(e, 12e4, 1e3, .1)).then(function() {
          return r.e(2).then(function(e) {
            return r(717)
          }.bind(null, r))["catch"](function(e) {
            r.oe(e)
          })
        })
      })
    },
    _loadStyle: function() {
      return S === $.RTL ? this._loadLTR() : this._loadRTL()
    },
    _addLocale: function(e, t) {
      if (e) {
        var r = e.replace("-", "_").toLowerCase();
        C[r] && (r = C[r], r = r.replace("-", "_").toLowerCase());
        var n = t.indexOf(r);
        0 > n && this.isLocaleSupported(e) && t.push(r);
        var o = r.split("_");
        if (!(o.length < 0)) {
          var i = _.first(o),
            a = t.indexOf(i);
          0 > a && this.isLocaleSupported(i) && t.push(i)
        }
      }
    },
    isLocaleSupported: function(e) {
      try {
        return !!e && (!window.Intl || _.isArray(window.Intl.Collator.supportedLocalesOf([e]))) && !!C[e.replace("-", "_").toLowerCase()]
      } catch (t) {
        return !1
      }
    },
    lng: function() {
      var e = _.first(this._locales);
      return C[e] || e
    },
    isRTL: function() {
      return k.indexOf(_.first(this._locales)) >= 0
    },
    LR: function(e, t) {
      return this.isRTL() ? t : e
    },
    curDir: function() {
      return document.documentElement.getAttribute("dir") === $.RTL ? $.RTL : $.LTR
    },
    embedDir: function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? this.isRTL() : arguments[1];
      return t ? this.embedRTL(e) : this.embedLTR(e)
    },
    forceDir: function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? this.isRTL() : arguments[1];
      return t ? this.forceRTL(e) : this.forceLTR(e)
    },
    embedLTR: function(e) {
      return "‪" + e + "‬"
    },
    embedRTL: function(e) {
      return "‫" + e + "‬"
    },
    forceLTR: function(e) {
      return "‎" + e
    },
    forceRTL: function(e) {
      return "‏" + e
    },
    hasT: function(e, t) {
      for (var r, n, o = t && t._plural ? t._plural : void 0, i = 0; i < this._locales.length; i++)
        if (r = e + this.getPluralExt(this._locales[i], o), n = T[this._locales[i]], n[r]) return !0;
      return !1
    },
    t: function(e, t) {
      for (var r, n, o = "", i = t && t._plural ? t._plural : void 0, a = 0; a < this._locales.length && (r = e + this.getPluralExt(n = this._locales[a], i), !(o = T[n][r])); a++);
      for (r in t) {
        if (!t.hasOwnProperty(r)) return;
        var s = new RegExp("__" + r + "__", "g"),
          d = this.n(t[r], n);
        o = o.replace(s, d)
      }
      return o
    },
    isHindiNumerals: function(e) {
      return A.indexOf(e || this._locales[0]) > -1
    },
    n: function(e, t) {
      return this.isHindiNumerals(t) ? e.toString().replace(/[0-9]/g, o) : e
    },
    numAndPunc: function(e) {
      return this.isHindiNumerals() ? this.embedLTR(this.n(e).replace(/./g, this.forceLTR)) : e
    },
    filesize: function(e) {
      return this.n(l(e, {
        round: 0,
        suffixes: {
          B: this.t("filesize_byte"),
          kB: this.t("filesize_kilobyte"),
          MB: this.t("filesize_megabyte"),
          GB: this.t("filesize_gigabyte")
        }
      }))
    },
    getPluralExt: function(e, t) {
      if (!t) return "";
      var r = f[e];
      if (!r) return "";
      var n = r.plurals(t),
        o = r.numbers[n];
      return 1 === o ? "" : 2 === r.numbers.length && 2 === o ? "_plural" : "_plural_" + o
    },
    removeAccents: function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
      return m(e.normalize("NFKD").replace(p.mark, ""))
    },
    accentFold: function(e) {
      return this.removeAccents(e).toLowerCase()
    },
    customizeMomentLocale: function() {
      var e = {
        "zh-tw": {
          longDateFormat: {
            LT: "Ah:mm",
            LTS: "Ah:m:s",
            L: "YYYY年MMMD日",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日LT",
            LLLL: "YYYY年MMMD日ddddLT",
            l: "YYYY年MMMD日",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日LT",
            llll: "YYYY年MMMD日ddddLT"
          }
        },
        "zh-cn": {
          longDateFormat: {
            LT: "Ah:mm",
            LTS: "Ah:m:s",
            L: "YYYY-MM-DD",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日LT",
            LLLL: "YYYY年MMMD日ddddLT",
            l: "YYYY年MMMD日",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日LT",
            llll: "YYYY年MMMD日ddddLT"
          }
        },
        ar: {
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd D MMMM YYYY LT"
          }
        }
      };
      return function(t) {
        var r = e[t];
        r && moment.locale(t, r)
      }
    }()
  }
}, function(e, t) {
  "use strict";
  _.mixin({
    forceArray: function(e) {
      return _.isArray(e) ? e : [e]
    }
  })
}, function(e, t) {
  "use strict";
  ! function() {
    if ("performance" in window == !1 && (window.performance = {}), !("now" in window.performance)) {
      var e = window.performance,
        t = e.timing && e.timing.navigationStart ? e.timing.navigationStart : Date.now();
      e.now = function() {
        return Date.now() - t
      }
    }
  }()
}, function(e, t, r) {
  (function(t, r, n) {
    /* @preserve
     * The MIT License (MIT)
     *
     * Copyright (c) 2014 Petka Antonov
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     *
     */
    ! function(t) {
      e.exports = t()
    }(function() {
      var e, o, i;
      return function a(e, t, r) {
        function n(i, s) {
          if (!t[i]) {
            if (!e[i]) {
              var d = "function" == typeof _dereq_ && _dereq_;
              if (!s && d) return d(i, !0);
              if (o) return o(i, !0);
              var u = new Error("Cannot find module '" + i + "'");
              throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = t[i] = {
              exports: {}
            };
            e[i][0].call(c.exports, function(t) {
              var r = e[i][1][t];
              return n(r ? r : t)
            }, c, c.exports, a, e, t, r)
          }
          return t[i].exports
        }
        for (var o = "function" == typeof _dereq_ && _dereq_, i = 0; i < r.length; i++) n(r[i]);
        return n
      }({
        1: [function(e, t, r) {
          "use strict";
          t.exports = function(e) {
            function t(e) {
              var t = new r(e),
                n = t.promise();
              return t.setHowMany(1), t.setUnwrap(), t.init(), n
            }
            var r = e._SomePromiseArray;
            e.any = function(e) {
              return t(e)
            }, e.prototype.any = function() {
              return t(this)
            }
          }
        }, {}],
        2: [function(e, t, r) {
          "use strict";

          function n() {
            this._isTickUsed = !1, this._lateQueue = new c(16), this._normalQueue = new c(16), this._trampolineEnabled = !0;
            var e = this;
            this.drainQueues = function() {
              e._drainQueues()
            }, this._schedule = u.isStatic ? u(this.drainQueues) : u
          }

          function o(e, t, r) {
            this._lateQueue.push(e, t, r), this._queueTick()
          }

          function i(e, t, r) {
            this._normalQueue.push(e, t, r), this._queueTick()
          }

          function a(e) {
            this._normalQueue._pushOne(e), this._queueTick()
          }
          var s;
          try {
            throw new Error
          } catch (d) {
            s = d
          }
          var u = e("./schedule.js"),
            c = e("./queue.js"),
            l = e("./util.js");
          n.prototype.disableTrampolineIfNecessary = function() {
            l.hasDevTools && (this._trampolineEnabled = !1)
          }, n.prototype.enableTrampoline = function() {
            this._trampolineEnabled || (this._trampolineEnabled = !0, this._schedule = function(e) {
              setTimeout(e, 0)
            })
          }, n.prototype.haveItemsQueued = function() {
            return this._normalQueue.length() > 0
          }, n.prototype.throwLater = function(e, t) {
            if (1 === arguments.length && (t = e, e = function() {
                throw t
              }), "undefined" != typeof setTimeout) setTimeout(function() {
              e(t)
            }, 0);
            else try {
              this._schedule(function() {
                e(t)
              })
            } catch (r) {
              throw new Error("No async scheduler available\n\n    See http://goo.gl/m3OTXk\n")
            }
          }, l.hasDevTools ? (u.isStatic && (u = function(e) {
            setTimeout(e, 0)
          }), n.prototype.invokeLater = function(e, t, r) {
            this._trampolineEnabled ? o.call(this, e, t, r) : this._schedule(function() {
              setTimeout(function() {
                e.call(t, r)
              }, 100)
            })
          }, n.prototype.invoke = function(e, t, r) {
            this._trampolineEnabled ? i.call(this, e, t, r) : this._schedule(function() {
              e.call(t, r)
            })
          }, n.prototype.settlePromises = function(e) {
            this._trampolineEnabled ? a.call(this, e) : this._schedule(function() {
              e._settlePromises()
            })
          }) : (n.prototype.invokeLater = o, n.prototype.invoke = i, n.prototype.settlePromises = a), n.prototype.invokeFirst = function(e, t, r) {
            this._normalQueue.unshift(e, t, r), this._queueTick()
          }, n.prototype._drainQueue = function(e) {
            for (; e.length() > 0;) {
              var t = e.shift();
              if ("function" == typeof t) {
                var r = e.shift(),
                  n = e.shift();
                t.call(r, n)
              } else t._settlePromises()
            }
          }, n.prototype._drainQueues = function() {
            this._drainQueue(this._normalQueue), this._reset(), this._drainQueue(this._lateQueue)
          }, n.prototype._queueTick = function() {
            this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues))
          }, n.prototype._reset = function() {
            this._isTickUsed = !1
          }, t.exports = new n, t.exports.firstLineError = s
        }, {
          "./queue.js": 28,
          "./schedule.js": 31,
          "./util.js": 38
        }],
        3: [function(e, t, r) {
          "use strict";
          t.exports = function(e, t, r) {
            var n = function(e, t) {
                this._reject(t)
              },
              o = function(e, t) {
                t.promiseRejectionQueued = !0, t.bindingPromise._then(n, n, null, this, e)
              },
              i = function(e, t) {
                this._isPending() && this._resolveCallback(t.target)
              },
              a = function(e, t) {
                t.promiseRejectionQueued || this._reject(e)
              };
            e.prototype.bind = function(n) {
              var s = r(n),
                d = new e(t);
              d._propagateFrom(this, 1);
              var u = this._target();
              if (d._setBoundTo(s), s instanceof e) {
                var c = {
                  promiseRejectionQueued: !1,
                  promise: d,
                  target: u,
                  bindingPromise: s
                };
                u._then(t, o, d._progress, d, c), s._then(i, a, d._progress, d, c)
              } else d._resolveCallback(u);
              return d
            }, e.prototype._setBoundTo = function(e) {
              void 0 !== e ? (this._bitField = 131072 | this._bitField, this._boundTo = e) : this._bitField = -131073 & this._bitField
            }, e.prototype._isBound = function() {
              return 131072 === (131072 & this._bitField)
            }, e.bind = function(n, o) {
              var i = r(n),
                a = new e(t);
              return a._setBoundTo(i), i instanceof e ? i._then(function() {
                a._resolveCallback(o)
              }, a._reject, a._progress, a, null) : a._resolveCallback(o), a
            }
          }
        }, {}],
        4: [function(e, t, r) {
          "use strict";

          function n() {
            try {
              Promise === i && (Promise = o)
            } catch (e) {}
            return i
          }
          var o;
          "undefined" != typeof Promise && (o = Promise);
          var i = e("./promise.js")();
          i.noConflict = n, t.exports = i
        }, {
          "./promise.js": 23
        }],
        5: [function(e, t, r) {
          "use strict";
          var n = Object.create;
          if (n) {
            var o = n(null),
              i = n(null);
            o[" size"] = i[" size"] = 0
          }
          t.exports = function(t) {
            function r(e, r) {
              var n;
              if (null != e && (n = e[r]), "function" != typeof n) {
                var o = "Object " + s.classString(e) + " has no method '" + s.toString(r) + "'";
                throw new t.TypeError(o)
              }
              return n
            }

            function n(e) {
              var t = this.pop(),
                n = r(e, t);
              return n.apply(e, this)
            }

            function o(e) {
              return e[this]
            }

            function i(e) {
              var t = +this;
              return 0 > t && (t = Math.max(0, t + e.length)), e[t]
            }
            var a, s = e("./util.js"),
              d = s.canEvaluate;
            s.isIdentifier;
            t.prototype.call = function(e) {
              for (var t = arguments.length, r = new Array(t - 1), o = 1; t > o; ++o) r[o - 1] = arguments[o];
              return r.push(e), this._then(n, void 0, void 0, r, void 0)
            }, t.prototype.get = function(e) {
              var t, r = "number" == typeof e;
              if (r) t = i;
              else if (d) {
                var n = a(e);
                t = null !== n ? n : o
              } else t = o;
              return this._then(t, void 0, void 0, e, void 0)
            }
          }
        }, {
          "./util.js": 38
        }],
        6: [function(e, t, r) {
          "use strict";
          t.exports = function(t) {
            var r = e("./errors.js"),
              n = e("./async.js"),
              o = r.CancellationError;
            t.prototype._cancel = function(e) {
              if (!this.isCancellable()) return this;
              for (var t, r = this; void 0 !== (t = r._cancellationParent) && t.isCancellable();) r = t;
              this._unsetCancellable(), r._target()._rejectCallback(e, !1, !0)
            }, t.prototype.cancel = function(e) {
              return this.isCancellable() ? (void 0 === e && (e = new o), n.invokeLater(this._cancel, this, e), this) : this
            }, t.prototype.cancellable = function() {
              return this._cancellable() ? this : (n.enableTrampoline(), this._setCancellable(), this._cancellationParent = void 0, this)
            }, t.prototype.uncancellable = function() {
              var e = this.then();
              return e._unsetCancellable(), e
            }, t.prototype.fork = function(e, t, r) {
              var n = this._then(e, t, r, void 0, void 0);
              return n._setCancellable(), n._cancellationParent = void 0, n
            }
          }
        }, {
          "./async.js": 2,
          "./errors.js": 13
        }],
        7: [function(e, r, n) {
          "use strict";
          r.exports = function() {
            function r(e) {
              this._parent = e;
              var t = this._length = 1 + (void 0 === e ? 0 : e._length);
              w(this, r), t > 32 && this.uncycle()
            }

            function n(e, t) {
              for (var r = 0; r < t.length - 1; ++r) t[r].push("From previous event:"), t[r] = t[r].join("\n");
              return r < t.length && (t[r] = t[r].join("\n")), e + "\n" + t.join("\n")
            }

            function o(e) {
              for (var t = 0; t < e.length; ++t)(0 === e[t].length || t + 1 < e.length && e[t][0] === e[t + 1][0]) && (e.splice(t, 1), t--)
            }

            function i(e) {
              for (var t = e[0], r = 1; r < e.length; ++r) {
                for (var n = e[r], o = t.length - 1, i = t[o], a = -1, s = n.length - 1; s >= 0; --s)
                  if (n[s] === i) {
                    a = s;
                    break
                  }
                for (var s = a; s >= 0; --s) {
                  var d = n[s];
                  if (t[o] !== d) break;
                  t.pop(), o--
                }
                t = n
              }
            }

            function a(e) {
              for (var t = [], r = 0; r < e.length; ++r) {
                var n = e[r],
                  o = g.test(n) || "    (No stack trace)" === n,
                  i = o && v(n);
                o && !i && (m && " " !== n.charAt(0) && (n = "    " + n), t.push(n))
              }
              return t
            }

            function s(e) {
              for (var t = e.stack.replace(/\s+$/g, "").split("\n"), r = 0; r < t.length; ++r) {
                var n = t[r];
                if ("    (No stack trace)" === n || g.test(n)) break
              }
              return r > 0 && (t = t.slice(r)), t
            }

            function d(e) {
              var t;
              if ("function" == typeof e) t = "[function " + (e.name || "anonymous") + "]";
              else {
                t = e.toString();
                var r = /\[object [a-zA-Z0-9$_]+\]/;
                if (r.test(t)) try {
                  var n = JSON.stringify(e);
                  t = n
                } catch (o) {}
                0 === t.length && (t = "(empty array)")
              }
              return "(<" + u(t) + ">, no stack trace)"
            }

            function u(e) {
              var t = 41;
              return e.length < t ? e : e.substr(0, t - 3) + "..."
            }

            function c(e) {
              var t = e.match(y);
              return t ? {
                fileName: t[1],
                line: parseInt(t[2], 10)
              } : void 0
            }
            var l, f = e("./async.js"),
              h = e("./util.js"),
              p = /[\\\/]bluebird[\\\/]js[\\\/](main|debug|zalgo|instrumented)/,
              g = null,
              _ = null,
              m = !1;
            h.inherits(r, Error), r.prototype.uncycle = function() {
              var e = this._length;
              if (!(2 > e)) {
                for (var t = [], r = {}, n = 0, o = this; void 0 !== o; ++n) t.push(o), o = o._parent;
                e = this._length = n;
                for (var n = e - 1; n >= 0; --n) {
                  var i = t[n].stack;
                  void 0 === r[i] && (r[i] = n)
                }
                for (var n = 0; e > n; ++n) {
                  var a = t[n].stack,
                    s = r[a];
                  if (void 0 !== s && s !== n) {
                    s > 0 && (t[s - 1]._parent = void 0, t[s - 1]._length = 1), t[n]._parent = void 0, t[n]._length = 1;
                    var d = n > 0 ? t[n - 1] : this;
                    e - 1 > s ? (d._parent = t[s + 1], d._parent.uncycle(), d._length = d._parent._length + 1) : (d._parent = void 0, d._length = 1);
                    for (var u = d._length + 1, c = n - 2; c >= 0; --c) t[c]._length = u, u++;
                    return
                  }
                }
              }
            }, r.prototype.parent = function() {
              return this._parent
            }, r.prototype.hasParent = function() {
              return void 0 !== this._parent
            }, r.prototype.attachExtraTrace = function(e) {
              if (!e.__stackCleaned__) {
                this.uncycle();
                for (var t = r.parseStackAndMessage(e), s = t.message, d = [t.stack], u = this; void 0 !== u;) d.push(a(u.stack.split("\n"))), u = u._parent;
                i(d), o(d), h.notEnumerableProp(e, "stack", n(s, d)), h.notEnumerableProp(e, "__stackCleaned__", !0)
              }
            }, r.parseStackAndMessage = function(e) {
              var t = e.stack,
                r = e.toString();
              return t = "string" == typeof t && t.length > 0 ? s(e) : ["    (No stack trace)"], {
                message: r,
                stack: a(t)
              }
            }, r.formatAndLogError = function(e, t) {
              if ("undefined" != typeof console) {
                var r;
                if ("object" == typeof e || "function" == typeof e) {
                  var n = e.stack;
                  r = t + _(n, e)
                } else r = t + String(e);
                "function" == typeof l ? l(r) : "function" != typeof console.log && "object" != typeof console.log || console.log(r)
              }
            }, r.unhandledRejection = function(e) {
              r.formatAndLogError(e, "^--- With additional stack trace: ")
            }, r.isSupported = function() {
              return "function" == typeof w
            }, r.fireRejectionEvent = function(e, t, n, o) {
              var i = !1;
              try {
                "function" == typeof t && (i = !0, "rejectionHandled" === e ? t(o) : t(n, o))
              } catch (a) {
                f.throwLater(a)
              }
              var s = !1;
              try {
                s = E(e, n, o)
              } catch (a) {
                s = !0, f.throwLater(a)
              }
              var d = !1;
              if (b) try {
                d = b(e.toLowerCase(), {
                  reason: n,
                  promise: o
                })
              } catch (a) {
                d = !0, f.throwLater(a)
              }
              s || i || d || "unhandledRejection" !== e || r.formatAndLogError(n, "Unhandled rejection ")
            };
            var v = function() {
                return !1
              },
              y = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
            r.setBounds = function(e, t) {
              if (r.isSupported()) {
                for (var n, o, i = e.stack.split("\n"), a = t.stack.split("\n"), s = -1, d = -1, u = 0; u < i.length; ++u) {
                  var l = c(i[u]);
                  if (l) {
                    n = l.fileName, s = l.line;
                    break
                  }
                }
                for (var u = 0; u < a.length; ++u) {
                  var l = c(a[u]);
                  if (l) {
                    o = l.fileName, d = l.line;
                    break
                  }
                }
                0 > s || 0 > d || !n || !o || n !== o || s >= d || (v = function(e) {
                  if (p.test(e)) return !0;
                  var t = c(e);
                  return !!(t && t.fileName === n && s <= t.line && t.line <= d)
                })
              }
            };
            var b, w = function() {
                var e = /^\s*at\s*/,
                  t = function(e, t) {
                    return "string" == typeof e ? e : void 0 !== t.name && void 0 !== t.message ? t.toString() : d(t)
                  };
                if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                  Error.stackTraceLimit = Error.stackTraceLimit + 6, g = e, _ = t;
                  var r = Error.captureStackTrace;
                  return v = function(e) {
                      return p.test(e)
                    },
                    function(e, t) {
                      Error.stackTraceLimit = Error.stackTraceLimit + 6, r(e, t), Error.stackTraceLimit = Error.stackTraceLimit - 6
                    }
                }
                var n = new Error;
                if ("string" == typeof n.stack && n.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return g = /@/, _ = t, m = !0,
                  function(e) {
                    e.stack = (new Error).stack
                  };
                var o;
                try {
                  throw new Error
                } catch (i) {
                  o = "stack" in i
                }
                return "stack" in n || !o || "number" != typeof Error.stackTraceLimit ? (_ = function(e, t) {
                  return "string" == typeof e ? e : "object" != typeof t && "function" != typeof t || void 0 === t.name || void 0 === t.message ? d(t) : t.toString()
                }, null) : (g = e, _ = t, function(e) {
                  Error.stackTraceLimit = Error.stackTraceLimit + 6;
                  try {
                    throw new Error
                  } catch (t) {
                    e.stack = t.stack
                  }
                  Error.stackTraceLimit = Error.stackTraceLimit - 6
                })
              }([]),
              E = function() {
                if (h.isNode) return function(e, r, n) {
                  return "rejectionHandled" === e ? t.emit(e, n) : t.emit(e, r, n)
                };
                var e = !1,
                  r = !0;
                try {
                  var n = new self.CustomEvent("test");
                  e = n instanceof CustomEvent
                } catch (o) {}
                if (!e) try {
                  var i = document.createEvent("CustomEvent");
                  i.initCustomEvent("testingtheevent", !1, !0, {}), self.dispatchEvent(i)
                } catch (o) {
                  r = !1
                }
                r && (b = function(t, r) {
                  var n;
                  return e ? n = new self.CustomEvent(t, {
                    detail: r,
                    bubbles: !1,
                    cancelable: !0
                  }) : self.dispatchEvent && (n = document.createEvent("CustomEvent"), n.initCustomEvent(t, !1, !0, r)), n ? !self.dispatchEvent(n) : !1
                });
                var a = {};
                return a.unhandledRejection = "onunhandledRejection".toLowerCase(), a.rejectionHandled = "onrejectionHandled".toLowerCase(),
                  function(e, t, r) {
                    var n = a[e],
                      o = self[n];
                    return o ? ("rejectionHandled" === e ? o.call(self, r) : o.call(self, t, r), !0) : !1
                  }
              }();
            return "undefined" != typeof console && "undefined" != typeof console.warn && (l = function(e) {
              console.warn(e)
            }, h.isNode && t.stderr.isTTY ? l = function(e) {
              t.stderr.write("[31m" + e + "[39m\n")
            } : h.isNode || "string" != typeof(new Error).stack || (l = function(e) {
              console.warn("%c" + e, "color: red")
            })), r
          }
        }, {
          "./async.js": 2,
          "./util.js": 38
        }],
        8: [function(e, t, r) {
          "use strict";
          t.exports = function(t) {
            function r(e, t, r) {
              this._instances = e, this._callback = t, this._promise = r
            }

            function n(e, t) {
              var r = {},
                n = a(e).call(r, t);
              if (n === s) return n;
              var o = d(r);
              return o.length ? (s.e = new u("Catch filter must inherit from Error or be a simple predicate function\n\n    See http://goo.gl/o84o68\n"), s) : n
            }
            var o = e("./util.js"),
              i = e("./errors.js"),
              a = o.tryCatch,
              s = o.errorObj,
              d = e("./es5.js").keys,
              u = i.TypeError;
            return r.prototype.doFilter = function(e) {
              for (var r = this._callback, o = this._promise, i = o._boundValue(), d = 0, u = this._instances.length; u > d; ++d) {
                var c = this._instances[d],
                  l = c === Error || null != c && c.prototype instanceof Error;
                if (l && e instanceof c) {
                  var f = a(r).call(i, e);
                  return f === s ? (t.e = f.e, t) : f
                }
                if ("function" == typeof c && !l) {
                  var h = n(c, e);
                  if (h === s) {
                    e = s.e;
                    break
                  }
                  if (h) {
                    var f = a(r).call(i, e);
                    return f === s ? (t.e = f.e, t) : f
                  }
                }
              }
              return t.e = e, t
            }, r
          }
        }, {
          "./errors.js": 13,
          "./es5.js": 14,
          "./util.js": 38
        }],
        9: [function(e, t, r) {
          "use strict";
          t.exports = function(e, t, r) {
            function n() {
              this._trace = new t(i())
            }

            function o() {
              return r() ? new n : void 0
            }

            function i() {
              var e = a.length - 1;
              return e >= 0 ? a[e] : void 0
            }
            var a = [];
            return n.prototype._pushContext = function() {
              r() && void 0 !== this._trace && a.push(this._trace)
            }, n.prototype._popContext = function() {
              r() && void 0 !== this._trace && a.pop()
            }, e.prototype._peekContext = i, e.prototype._pushContext = n.prototype._pushContext, e.prototype._popContext = n.prototype._popContext, o
          }
        }, {}],
        10: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r) {
            var n, o, i = t._getDomain,
              a = e("./async.js"),
              s = e("./errors.js").Warning,
              d = e("./util.js"),
              u = d.canAttachTrace,
              c = d.isNode && (!!{
                NODE_ENV: "production"
              }.BLUEBIRD_DEBUG || "development" === {
                NODE_ENV: "production"
              }.NODE_ENV);
            return c && a.disableTrampolineIfNecessary(), t.prototype._ignoreRejections = function() {
                this._unsetRejectionIsUnhandled(), this._bitField = 16777216 | this._bitField
              }, t.prototype._ensurePossibleRejectionHandled = function() {
                0 === (16777216 & this._bitField) && (this._setRejectionIsUnhandled(), a.invokeLater(this._notifyUnhandledRejection, this, void 0))
              }, t.prototype._notifyUnhandledRejectionIsHandled = function() {
                r.fireRejectionEvent("rejectionHandled", n, void 0, this)
              }, t.prototype._notifyUnhandledRejection = function() {
                if (this._isRejectionUnhandled()) {
                  var e = this._getCarriedStackTrace() || this._settledValue;
                  this._setUnhandledRejectionIsNotified(), r.fireRejectionEvent("unhandledRejection", o, e, this)
                }
              }, t.prototype._setUnhandledRejectionIsNotified = function() {
                this._bitField = 524288 | this._bitField
              }, t.prototype._unsetUnhandledRejectionIsNotified = function() {
                this._bitField = -524289 & this._bitField
              }, t.prototype._isUnhandledRejectionNotified = function() {
                return (524288 & this._bitField) > 0
              }, t.prototype._setRejectionIsUnhandled = function() {
                this._bitField = 2097152 | this._bitField
              }, t.prototype._unsetRejectionIsUnhandled = function() {
                this._bitField = -2097153 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled())
              }, t.prototype._isRejectionUnhandled = function() {
                return (2097152 & this._bitField) > 0
              }, t.prototype._setCarriedStackTrace = function(e) {
                this._bitField = 1048576 | this._bitField, this._fulfillmentHandler0 = e
              }, t.prototype._isCarryingStackTrace = function() {
                return (1048576 & this._bitField) > 0
              }, t.prototype._getCarriedStackTrace = function() {
                return this._isCarryingStackTrace() ? this._fulfillmentHandler0 : void 0
              }, t.prototype._captureStackTrace = function() {
                return c && (this._trace = new r(this._peekContext())), this
              }, t.prototype._attachExtraTrace = function(e, t) {
                if (c && u(e)) {
                  var n = this._trace;
                  if (void 0 !== n && t && (n = n._parent), void 0 !== n) n.attachExtraTrace(e);
                  else if (!e.__stackCleaned__) {
                    var o = r.parseStackAndMessage(e);
                    d.notEnumerableProp(e, "stack", o.message + "\n" + o.stack.join("\n")), d.notEnumerableProp(e, "__stackCleaned__", !0)
                  }
                }
              }, t.prototype._warn = function(e) {
                var t = new s(e),
                  n = this._peekContext();
                if (n) n.attachExtraTrace(t);
                else {
                  var o = r.parseStackAndMessage(t);
                  t.stack = o.message + "\n" + o.stack.join("\n")
                }
                r.formatAndLogError(t, "")
              }, t.onPossiblyUnhandledRejection = function(e) {
                var t = i();
                o = "function" == typeof e ? null === t ? e : t.bind(e) : void 0
              }, t.onUnhandledRejectionHandled = function(e) {
                var t = i();
                n = "function" == typeof e ? null === t ? e : t.bind(e) : void 0
              }, t.longStackTraces = function() {
                if (a.haveItemsQueued() && c === !1) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/DT1qyG\n");
                c = r.isSupported(), c && a.disableTrampolineIfNecessary()
              }, t.hasLongStackTraces = function() {
                return c && r.isSupported()
              }, r.isSupported() || (t.longStackTraces = function() {}, c = !1),
              function() {
                return c
              }
          }
        }, {
          "./async.js": 2,
          "./errors.js": 13,
          "./util.js": 38
        }],
        11: [function(e, t, r) {
          "use strict";
          var n = e("./util.js"),
            o = n.isPrimitive;
          t.exports = function(e) {
            var t = function() {
                return this
              },
              r = function() {
                throw this
              },
              n = function() {},
              i = function() {
                throw void 0
              },
              a = function(e, t) {
                return 1 === t ? function() {
                  throw e
                } : 2 === t ? function() {
                  return e
                } : void 0
              };
            e.prototype["return"] = e.prototype.thenReturn = function(e) {
              return void 0 === e ? this.then(n) : o(e) ? this._then(a(e, 2), void 0, void 0, void 0, void 0) : this._then(t, void 0, void 0, e, void 0)
            }, e.prototype["throw"] = e.prototype.thenThrow = function(e) {
              return void 0 === e ? this.then(i) : o(e) ? this._then(a(e, 1), void 0, void 0, void 0, void 0) : this._then(r, void 0, void 0, e, void 0)
            }
          }
        }, {
          "./util.js": 38
        }],
        12: [function(e, t, r) {
          "use strict";
          t.exports = function(e, t) {
            var r = e.reduce;
            e.prototype.each = function(e) {
              return r(this, e, null, t)
            }, e.each = function(e, n) {
              return r(e, n, null, t)
            }
          }
        }, {}],
        13: [function(e, t, r) {
          "use strict";

          function n(e, t) {
            function r(n) {
              return this instanceof r ? (l(this, "message", "string" == typeof n ? n : t), l(this, "name", e), void(Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new r(n)
            }
            return c(r, Error), r
          }

          function o(e) {
            return this instanceof o ? (l(this, "name", "OperationalError"), l(this, "message", e), this.cause = e, this.isOperational = !0, void(e instanceof Error ? (l(this, "message", e.message), l(this, "stack", e.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new o(e)
          }
          var i, a, s = e("./es5.js"),
            d = s.freeze,
            u = e("./util.js"),
            c = u.inherits,
            l = u.notEnumerableProp,
            f = n("Warning", "warning"),
            h = n("CancellationError", "cancellation error"),
            p = n("TimeoutError", "timeout error"),
            g = n("AggregateError", "aggregate error");
          try {
            i = TypeError, a = RangeError
          } catch (_) {
            i = n("TypeError", "type error"), a = n("RangeError", "range error")
          }
          for (var m = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), v = 0; v < m.length; ++v) "function" == typeof Array.prototype[m[v]] && (g.prototype[m[v]] = Array.prototype[m[v]]);
          s.defineProperty(g.prototype, "length", {
            value: 0,
            configurable: !1,
            writable: !0,
            enumerable: !0
          }), g.prototype.isOperational = !0;
          var y = 0;
          g.prototype.toString = function() {
            var e = Array(4 * y + 1).join(" "),
              t = "\n" + e + "AggregateError of:\n";
            y++, e = Array(4 * y + 1).join(" ");
            for (var r = 0; r < this.length; ++r) {
              for (var n = this[r] === this ? "[Circular AggregateError]" : this[r] + "", o = n.split("\n"), i = 0; i < o.length; ++i) o[i] = e + o[i];
              n = o.join("\n"), t += n + "\n"
            }
            return y--, t
          }, c(o, Error);
          var b = Error.__BluebirdErrorTypes__;
          b || (b = d({
            CancellationError: h,
            TimeoutError: p,
            OperationalError: o,
            RejectionError: o,
            AggregateError: g
          }), l(Error, "__BluebirdErrorTypes__", b)), t.exports = {
            Error: Error,
            TypeError: i,
            RangeError: a,
            CancellationError: b.CancellationError,
            OperationalError: b.OperationalError,
            TimeoutError: b.TimeoutError,
            AggregateError: b.AggregateError,
            Warning: f
          }
        }, {
          "./es5.js": 14,
          "./util.js": 38
        }],
        14: [function(e, t, r) {
          var n = function() {
            "use strict";
            return void 0 === this
          }();
          if (n) t.exports = {
            freeze: Object.freeze,
            defineProperty: Object.defineProperty,
            getDescriptor: Object.getOwnPropertyDescriptor,
            keys: Object.keys,
            names: Object.getOwnPropertyNames,
            getPrototypeOf: Object.getPrototypeOf,
            isArray: Array.isArray,
            isES5: n,
            propertyIsWritable: function(e, t) {
              var r = Object.getOwnPropertyDescriptor(e, t);
              return !(r && !r.writable && !r.set)
            }
          };
          else {
            var o = {}.hasOwnProperty,
              i = {}.toString,
              a = {}.constructor.prototype,
              s = function(e) {
                var t = [];
                for (var r in e) o.call(e, r) && t.push(r);
                return t
              },
              d = function(e, t) {
                return {
                  value: e[t]
                }
              },
              u = function(e, t, r) {
                return e[t] = r.value, e
              },
              c = function(e) {
                return e
              },
              l = function(e) {
                try {
                  return Object(e).constructor.prototype
                } catch (t) {
                  return a
                }
              },
              f = function(e) {
                try {
                  return "[object Array]" === i.call(e)
                } catch (t) {
                  return !1
                }
              };
            t.exports = {
              isArray: f,
              keys: s,
              names: s,
              defineProperty: u,
              getDescriptor: d,
              freeze: c,
              getPrototypeOf: l,
              isES5: n,
              propertyIsWritable: function() {
                return !0
              }
            }
          }
        }, {}],
        15: [function(e, t, r) {
          "use strict";
          t.exports = function(e, t) {
            var r = e.map;
            e.prototype.filter = function(e, n) {
              return r(this, e, n, t)
            }, e.filter = function(e, n, o) {
              return r(e, n, o, t)
            }
          }
        }, {}],
        16: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n) {
            function o() {
              return this
            }

            function i() {
              throw this
            }

            function a(e) {
              return function() {
                return e
              }
            }

            function s(e) {
              return function() {
                throw e
              }
            }

            function d(e, t, r) {
              var n;
              return n = f(t) ? r ? a(t) : s(t) : r ? o : i, e._then(n, h, void 0, t, void 0)
            }

            function u(e) {
              var o = this.promise,
                i = this.handler,
                a = o._isBound() ? i.call(o._boundValue()) : i();
              if (void 0 !== a) {
                var s = n(a, o);
                if (s instanceof t) return s = s._target(), d(s, e, o.isFulfilled())
              }
              return o.isRejected() ? (r.e = e, r) : e
            }

            function c(e) {
              var r = this.promise,
                o = this.handler,
                i = r._isBound() ? o.call(r._boundValue(), e) : o(e);
              if (void 0 !== i) {
                var a = n(i, r);
                if (a instanceof t) return a = a._target(), d(a, e, !0)
              }
              return e
            }
            var l = e("./util.js"),
              f = l.isPrimitive,
              h = l.thrower;
            t.prototype._passThroughHandler = function(e, t) {
              if ("function" != typeof e) return this.then();
              var r = {
                promise: this,
                handler: e
              };
              return this._then(t ? u : c, t ? u : void 0, void 0, r, void 0)
            }, t.prototype.lastly = t.prototype["finally"] = function(e) {
              return this._passThroughHandler(e, !0)
            }, t.prototype.tap = function(e) {
              return this._passThroughHandler(e, !1)
            }
          }
        }, {
          "./util.js": 38
        }],
        17: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            function i(e, r, n) {
              for (var i = 0; i < r.length; ++i) {
                n._pushContext();
                var a = l(r[i])(e);
                if (n._popContext(), a === c) {
                  n._pushContext();
                  var s = t.reject(c.e);
                  return n._popContext(), s
                }
                var d = o(a, n);
                if (d instanceof t) return d
              }
              return null
            }

            function a(e, r, o, i) {
              var a = this._promise = new t(n);
              a._captureStackTrace(), this._stack = i, this._generatorFunction = e, this._receiver = r, this._generator = void 0, this._yieldHandlers = "function" == typeof o ? [o].concat(f) : f
            }
            var s = e("./errors.js"),
              d = s.TypeError,
              u = e("./util.js"),
              c = u.errorObj,
              l = u.tryCatch,
              f = [];
            a.prototype.promise = function() {
              return this._promise
            }, a.prototype._run = function() {
              this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._next(void 0)
            }, a.prototype._continue = function(e) {
              if (e === c) return this._promise._rejectCallback(e.e, !1, !0);
              var r = e.value;
              if (e.done === !0) this._promise._resolveCallback(r);
              else {
                var n = o(r, this._promise);
                if (!(n instanceof t) && (n = i(n, this._yieldHandlers, this._promise), null === n)) return void this._throw(new d("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/4Y4pDk\n\n".replace("%s", r) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                n._then(this._next, this._throw, void 0, this, null)
              }
            }, a.prototype._throw = function(e) {
              this._promise._attachExtraTrace(e), this._promise._pushContext();
              var t = l(this._generator["throw"]).call(this._generator, e);
              this._promise._popContext(), this._continue(t)
            }, a.prototype._next = function(e) {
              this._promise._pushContext();
              var t = l(this._generator.next).call(this._generator, e);
              this._promise._popContext(), this._continue(t)
            }, t.coroutine = function(e, t) {
              if ("function" != typeof e) throw new d("generatorFunction must be a function\n\n    See http://goo.gl/6Vqhm0\n");
              var r = Object(t).yieldHandler,
                n = a,
                o = (new Error).stack;
              return function() {
                var t = e.apply(this, arguments),
                  i = new n(void 0, void 0, r, o);
                return i._generator = t, i._next(void 0), i.promise()
              }
            }, t.coroutine.addYieldHandler = function(e) {
              if ("function" != typeof e) throw new d("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              f.push(e)
            }, t.spawn = function(e) {
              if ("function" != typeof e) return r("generatorFunction must be a function\n\n    See http://goo.gl/6Vqhm0\n");
              var n = new a(e, this),
                o = n.promise();
              return n._run(t.spawn), o
            }
          }
        }, {
          "./errors.js": 13,
          "./util.js": 38
        }],
        18: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            var i = e("./util.js");
            i.canEvaluate, i.tryCatch, i.errorObj;
            t.join = function() {
              var e, t = arguments.length - 1;
              if (t > 0 && "function" == typeof arguments[t]) {
                e = arguments[t];
                var n
              }
              for (var o = arguments.length, i = new Array(o), a = 0; o > a; ++a) i[a] = arguments[a];
              e && i.pop();
              var n = new r(i).promise();
              return void 0 !== e ? n.spread(e) : n
            }
          }
        }, {
          "./util.js": 38
        }],
        19: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o, i) {
            function a(e, t, r, n) {
              this.constructor$(e), this._promise._captureStackTrace();
              var o = u();
              this._callback = null === o ? t : o.bind(t), this._preservedValues = n === i ? new Array(this.length()) : null, this._limit = r, this._inFlight = 0, this._queue = r >= 1 ? [] : g, c.invoke(s, this, void 0)
            }

            function s() {
              this._init$(void 0, -2)
            }

            function d(e, t, r, n) {
              var o = "object" == typeof r && null !== r ? r.concurrency : 0;
              return o = "number" == typeof o && isFinite(o) && o >= 1 ? o : 0, new a(e, t, o, n)
            }
            var u = t._getDomain,
              c = e("./async.js"),
              l = e("./util.js"),
              f = l.tryCatch,
              h = l.errorObj,
              p = {},
              g = [];
            l.inherits(a, r), a.prototype._init = function() {}, a.prototype._promiseFulfilled = function(e, r) {
              var n = this._values,
                i = this.length(),
                a = this._preservedValues,
                s = this._limit;
              if (n[r] === p) {
                if (n[r] = e, s >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return
              } else {
                if (s >= 1 && this._inFlight >= s) return n[r] = e, void this._queue.push(r);
                null !== a && (a[r] = e);
                var d = this._callback,
                  u = this._promise._boundValue();
                this._promise._pushContext();
                var c = f(d).call(u, e, r, i);
                if (this._promise._popContext(), c === h) return this._reject(c.e);
                var l = o(c, this._promise);
                if (l instanceof t) {
                  if (l = l._target(), l._isPending()) return s >= 1 && this._inFlight++, n[r] = p, l._proxyPromiseArray(this, r);
                  if (!l._isFulfilled()) return this._reject(l._reason());
                  c = l._value()
                }
                n[r] = c
              }
              var g = ++this._totalResolved;
              g >= i && (null !== a ? this._filter(n, a) : this._resolve(n))
            }, a.prototype._drainQueue = function() {
              for (var e = this._queue, t = this._limit, r = this._values; e.length > 0 && this._inFlight < t;) {
                if (this._isResolved()) return;
                var n = e.pop();
                this._promiseFulfilled(r[n], n)
              }
            }, a.prototype._filter = function(e, t) {
              for (var r = t.length, n = new Array(r), o = 0, i = 0; r > i; ++i) e[i] && (n[o++] = t[i]);
              n.length = o, this._resolve(n)
            }, a.prototype.preservedValues = function() {
              return this._preservedValues
            }, t.prototype.map = function(e, t) {
              return "function" != typeof e ? n("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : d(this, e, t, null).promise()
            }, t.map = function(e, t, r, o) {
              return "function" != typeof t ? n("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : d(e, t, r, o).promise()
            }
          }
        }, {
          "./async.js": 2,
          "./util.js": 38
        }],
        20: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            var i = e("./util.js"),
              a = i.tryCatch;
            t.method = function(e) {
              if ("function" != typeof e) throw new t.TypeError("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              return function() {
                var n = new t(r);
                n._captureStackTrace(), n._pushContext();
                var o = a(e).apply(this, arguments);
                return n._popContext(), n._resolveFromSyncValue(o), n
              }
            }, t.attempt = t["try"] = function(e, n, s) {
              if ("function" != typeof e) return o("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              var d = new t(r);
              d._captureStackTrace(), d._pushContext();
              var u = i.isArray(n) ? a(e).apply(s, n) : a(e).call(s, n);
              return d._popContext(), d._resolveFromSyncValue(u), d
            }, t.prototype._resolveFromSyncValue = function(e) {
              e === i.errorObj ? this._rejectCallback(e.e, !1, !0) : this._resolveCallback(e, !0)
            }
          }
        }, {
          "./util.js": 38
        }],
        21: [function(e, t, r) {
          "use strict";
          t.exports = function(t) {
            function r(e, t) {
              var r = this;
              if (!i.isArray(e)) return n.call(r, e, t);
              var o = s(t).apply(r._boundValue(), [null].concat(e));
              o === d && a.throwLater(o.e)
            }

            function n(e, t) {
              var r = this,
                n = r._boundValue(),
                o = void 0 === e ? s(t).call(n, null) : s(t).call(n, null, e);
              o === d && a.throwLater(o.e)
            }

            function o(e, t) {
              var r = this;
              if (!e) {
                var n = r._target(),
                  o = n._getCarriedStackTrace();
                o.cause = e, e = o
              }
              var i = s(t).call(r._boundValue(), e);
              i === d && a.throwLater(i.e)
            }
            var i = e("./util.js"),
              a = e("./async.js"),
              s = i.tryCatch,
              d = i.errorObj;
            t.prototype.asCallback = t.prototype.nodeify = function(e, t) {
              if ("function" == typeof e) {
                var i = n;
                void 0 !== t && Object(t).spread && (i = r), this._then(i, o, void 0, this, e)
              }
              return this
            }
          }
        }, {
          "./async.js": 2,
          "./util.js": 38
        }],
        22: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r) {
            var n = e("./util.js"),
              o = e("./async.js"),
              i = n.tryCatch,
              a = n.errorObj;
            t.prototype.progressed = function(e) {
              return this._then(void 0, void 0, e, void 0, void 0)
            }, t.prototype._progress = function(e) {
              this._isFollowingOrFulfilledOrRejected() || this._target()._progressUnchecked(e)
            }, t.prototype._progressHandlerAt = function(e) {
              return 0 === e ? this._progressHandler0 : this[(e << 2) + e - 5 + 2]
            }, t.prototype._doProgressWith = function(e) {
              var r = e.value,
                o = e.handler,
                s = e.promise,
                d = e.receiver,
                u = i(o).call(d, r);
              if (u === a) {
                if (null != u.e && "StopProgressPropagation" !== u.e.name) {
                  var c = n.canAttachTrace(u.e) ? u.e : new Error(n.toString(u.e));
                  s._attachExtraTrace(c), s._progress(u.e)
                }
              } else u instanceof t ? u._then(s._progress, null, null, s, void 0) : s._progress(u)
            }, t.prototype._progressUnchecked = function(e) {
              for (var n = this._length(), i = this._progress, a = 0; n > a; a++) {
                var s = this._progressHandlerAt(a),
                  d = this._promiseAt(a);
                if (d instanceof t) "function" == typeof s ? o.invoke(this._doProgressWith, this, {
                  handler: s,
                  promise: d,
                  receiver: this._receiverAt(a),
                  value: e
                }) : o.invoke(i, d, e);
                else {
                  var u = this._receiverAt(a);
                  "function" == typeof s ? s.call(u, e, d) : u instanceof r && !u._isResolved() && u._promiseProgressed(e, d)
                }
              }
            }
          }
        }, {
          "./async.js": 2,
          "./util.js": 38
        }],
        23: [function(e, r, n) {
          "use strict";
          r.exports = function() {
            function r(e) {
              if ("function" != typeof e) throw new l("the promise constructor requires a resolver function\n\n    See http://goo.gl/EC22Yn\n");
              if (this.constructor !== r) throw new l("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/KsIlge\n");
              this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._progressHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._settledValue = void 0, e !== f && this._resolveFromResolver(e)
            }

            function n(e) {
              var t = new r(f);
              t._fulfillmentHandler0 = e, t._rejectionHandler0 = e, t._progressHandler0 = e, t._promise0 = e, t._receiver0 = e, t._settledValue = e
            }
            var o, i = function() {
                return new l("circular promise resolution chain\n\n    See http://goo.gl/LhFpo0\n")
              },
              a = function() {
                return new r.PromiseInspection(this._target())
              },
              s = function(e) {
                return r.reject(new l(e))
              },
              d = e("./util.js");
            o = d.isNode ? function() {
              var e = t.domain;
              return void 0 === e && (e = null), e
            } : function() {
              return null
            }, d.notEnumerableProp(r, "_getDomain", o);
            var u = e("./async.js"),
              c = e("./errors.js"),
              l = r.TypeError = c.TypeError;
            r.RangeError = c.RangeError, r.CancellationError = c.CancellationError, r.TimeoutError = c.TimeoutError, r.OperationalError = c.OperationalError, r.RejectionError = c.OperationalError, r.AggregateError = c.AggregateError;
            var f = function() {},
              h = {},
              p = {
                e: null
              },
              g = e("./thenables.js")(r, f),
              _ = e("./promise_array.js")(r, f, g, s),
              m = e("./captured_trace.js")(),
              v = e("./debuggability.js")(r, m),
              y = e("./context.js")(r, m, v),
              b = e("./catch_filter.js")(p),
              w = e("./promise_resolver.js"),
              E = w._nodebackForPromise,
              S = d.errorObj,
              N = d.tryCatch;
            return r.prototype.toString = function() {
              return "[object Promise]"
            }, r.prototype.caught = r.prototype["catch"] = function(e) {
              var t = arguments.length;
              if (t > 1) {
                var n, o = new Array(t - 1),
                  i = 0;
                for (n = 0; t - 1 > n; ++n) {
                  var a = arguments[n];
                  if ("function" != typeof a) return r.reject(new l("Catch filter must inherit from Error or be a simple predicate function\n\n    See http://goo.gl/o84o68\n"));
                  o[i++] = a
                }
                o.length = i, e = arguments[n];
                var s = new b(o, e, this);
                return this._then(void 0, s.doFilter, void 0, s, void 0)
              }
              return this._then(void 0, e, void 0, void 0, void 0)
            }, r.prototype.reflect = function() {
              return this._then(a, a, void 0, this, void 0)
            }, r.prototype.then = function(e, t, r) {
              if (v() && arguments.length > 0 && "function" != typeof e && "function" != typeof t) {
                var n = ".then() only accepts functions but was passed: " + d.classString(e);
                arguments.length > 1 && (n += ", " + d.classString(t)), this._warn(n)
              }
              return this._then(e, t, r, void 0, void 0)
            }, r.prototype.done = function(e, t, r) {
              var n = this._then(e, t, r, void 0, void 0);
              n._setIsFinal()
            }, r.prototype.spread = function(e, t) {
              return this.all()._then(e, t, void 0, h, void 0)
            }, r.prototype.isCancellable = function() {
              return !this.isResolved() && this._cancellable()
            }, r.prototype.toJSON = function() {
              var e = {
                isFulfilled: !1,
                isRejected: !1,
                fulfillmentValue: void 0,
                rejectionReason: void 0
              };
              return this.isFulfilled() ? (e.fulfillmentValue = this.value(), e.isFulfilled = !0) : this.isRejected() && (e.rejectionReason = this.reason(), e.isRejected = !0), e
            }, r.prototype.all = function() {
              return new _(this).promise()
            }, r.prototype.error = function(e) {
              return this.caught(d.originatesFromRejection, e)
            }, r.is = function(e) {
              return e instanceof r
            }, r.fromNode = function(e) {
              var t = new r(f),
                n = N(e)(E(t));
              return n === S && t._rejectCallback(n.e, !0, !0), t
            }, r.all = function(e) {
              return new _(e).promise()
            }, r.defer = r.pending = function() {
              var e = new r(f);
              return new w(e)
            }, r.cast = function(e) {
              var t = g(e);
              if (!(t instanceof r)) {
                var n = t;
                t = new r(f), t._fulfillUnchecked(n)
              }
              return t
            }, r.resolve = r.fulfilled = r.cast, r.reject = r.rejected = function(e) {
              var t = new r(f);
              return t._captureStackTrace(), t._rejectCallback(e, !0), t
            }, r.setScheduler = function(e) {
              if ("function" != typeof e) throw new l("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              var t = u._schedule;
              return u._schedule = e, t
            }, r.prototype._then = function(e, t, n, i, a) {
              var s = void 0 !== a,
                d = s ? a : new r(f);
              s || (d._propagateFrom(this, 5), d._captureStackTrace());
              var c = this._target();
              c !== this && (void 0 === i && (i = this._boundTo), s || d._setIsMigrated());
              var l = c._addCallbacks(e, t, n, d, i, o());
              return c._isResolved() && !c._isSettlePromisesQueued() && u.invoke(c._settlePromiseAtPostResolution, c, l), d
            }, r.prototype._settlePromiseAtPostResolution = function(e) {
              this._isRejectionUnhandled() && this._unsetRejectionIsUnhandled(), this._settlePromiseAt(e)
            }, r.prototype._length = function() {
              return 131071 & this._bitField
            }, r.prototype._isFollowingOrFulfilledOrRejected = function() {
              return (939524096 & this._bitField) > 0
            }, r.prototype._isFollowing = function() {
              return 536870912 === (536870912 & this._bitField)
            }, r.prototype._setLength = function(e) {
              this._bitField = -131072 & this._bitField | 131071 & e
            }, r.prototype._setFulfilled = function() {
              this._bitField = 268435456 | this._bitField
            }, r.prototype._setRejected = function() {
              this._bitField = 134217728 | this._bitField
            }, r.prototype._setFollowing = function() {
              this._bitField = 536870912 | this._bitField
            }, r.prototype._setIsFinal = function() {
              this._bitField = 33554432 | this._bitField
            }, r.prototype._isFinal = function() {
              return (33554432 & this._bitField) > 0
            }, r.prototype._cancellable = function() {
              return (67108864 & this._bitField) > 0
            }, r.prototype._setCancellable = function() {
              this._bitField = 67108864 | this._bitField
            }, r.prototype._unsetCancellable = function() {
              this._bitField = -67108865 & this._bitField
            }, r.prototype._setIsMigrated = function() {
              this._bitField = 4194304 | this._bitField
            }, r.prototype._unsetIsMigrated = function() {
              this._bitField = -4194305 & this._bitField
            }, r.prototype._isMigrated = function() {
              return (4194304 & this._bitField) > 0
            }, r.prototype._receiverAt = function(e) {
              var t = 0 === e ? this._receiver0 : this[5 * e - 5 + 4];
              return void 0 === t && this._isBound() ? this._boundValue() : t
            }, r.prototype._promiseAt = function(e) {
              return 0 === e ? this._promise0 : this[5 * e - 5 + 3]
            }, r.prototype._fulfillmentHandlerAt = function(e) {
              return 0 === e ? this._fulfillmentHandler0 : this[5 * e - 5 + 0]
            }, r.prototype._rejectionHandlerAt = function(e) {
              return 0 === e ? this._rejectionHandler0 : this[5 * e - 5 + 1]
            }, r.prototype._boundValue = function() {
              var e = this._boundTo;
              return void 0 !== e && e instanceof r ? e.isFulfilled() ? e.value() : void 0 : e
            }, r.prototype._migrateCallbacks = function(e, t) {
              var n = e._fulfillmentHandlerAt(t),
                o = e._rejectionHandlerAt(t),
                i = e._progressHandlerAt(t),
                a = e._promiseAt(t),
                s = e._receiverAt(t);
              a instanceof r && a._setIsMigrated(), this._addCallbacks(n, o, i, a, s, null)
            }, r.prototype._addCallbacks = function(e, t, r, n, o, i) {
              var a = this._length();
              if (a >= 131066 && (a = 0, this._setLength(0)), 0 === a) this._promise0 = n, void 0 !== o && (this._receiver0 = o), "function" != typeof e || this._isCarryingStackTrace() || (this._fulfillmentHandler0 = null === i ? e : i.bind(e)), "function" == typeof t && (this._rejectionHandler0 = null === i ? t : i.bind(t)), "function" == typeof r && (this._progressHandler0 = null === i ? r : i.bind(r));
              else {
                var s = 5 * a - 5;
                this[s + 3] = n, this[s + 4] = o, "function" == typeof e && (this[s + 0] = null === i ? e : i.bind(e)), "function" == typeof t && (this[s + 1] = null === i ? t : i.bind(t)), "function" == typeof r && (this[s + 2] = null === i ? r : i.bind(r))
              }
              return this._setLength(a + 1), a
            }, r.prototype._setProxyHandlers = function(e, t) {
              var r = this._length();
              if (r >= 131066 && (r = 0, this._setLength(0)), 0 === r) this._promise0 = t, this._receiver0 = e;
              else {
                var n = 5 * r - 5;
                this[n + 3] = t, this[n + 4] = e
              }
              this._setLength(r + 1)
            }, r.prototype._proxyPromiseArray = function(e, t) {
              this._setProxyHandlers(e, t)
            }, r.prototype._resolveCallback = function(e, t) {
              if (!this._isFollowingOrFulfilledOrRejected()) {
                if (e === this) return this._rejectCallback(i(), !1, !0);
                var n = g(e, this);
                if (!(n instanceof r)) return this._fulfill(e);
                var o = 1 | (t ? 4 : 0);
                this._propagateFrom(n, o);
                var a = n._target();
                if (a._isPending()) {
                  for (var s = this._length(), d = 0; s > d; ++d) a._migrateCallbacks(this, d);
                  this._setFollowing(), this._setLength(0), this._setFollowee(a)
                } else a._isFulfilled() ? this._fulfillUnchecked(a._value()) : this._rejectUnchecked(a._reason(), a._getCarriedStackTrace())
              }
            }, r.prototype._rejectCallback = function(e, t, r) {
              r || d.markAsOriginatingFromRejection(e);
              var n = d.ensureErrorObject(e),
                o = n === e;
              this._attachExtraTrace(n, t ? o : !1), this._reject(e, o ? void 0 : n)
            }, r.prototype._resolveFromResolver = function(e) {
              var t = this;
              this._captureStackTrace(), this._pushContext();
              var r = !0,
                n = N(e)(function(e) {
                  null !== t && (t._resolveCallback(e), t = null)
                }, function(e) {
                  null !== t && (t._rejectCallback(e, r), t = null)
                });
              r = !1, this._popContext(), void 0 !== n && n === S && null !== t && (t._rejectCallback(n.e, !0, !0), t = null)
            }, r.prototype._settlePromiseFromHandler = function(e, t, r, n) {
              if (!n._isRejected()) {
                n._pushContext();
                var o;
                if (o = t !== h || this._isRejected() ? N(e).call(t, r) : N(e).apply(this._boundValue(), r), n._popContext(), o === S || o === n || o === p) {
                  var a = o === n ? i() : o.e;
                  n._rejectCallback(a, !1, !0)
                } else n._resolveCallback(o)
              }
            }, r.prototype._target = function() {
              for (var e = this; e._isFollowing();) e = e._followee();
              return e
            }, r.prototype._followee = function() {
              return this._rejectionHandler0
            }, r.prototype._setFollowee = function(e) {
              this._rejectionHandler0 = e
            }, r.prototype._cleanValues = function() {
              this._cancellable() && (this._cancellationParent = void 0)
            }, r.prototype._propagateFrom = function(e, t) {
              (1 & t) > 0 && e._cancellable() && (this._setCancellable(), this._cancellationParent = e), (4 & t) > 0 && e._isBound() && this._setBoundTo(e._boundTo)
            }, r.prototype._fulfill = function(e) {
              this._isFollowingOrFulfilledOrRejected() || this._fulfillUnchecked(e)
            }, r.prototype._reject = function(e, t) {
              this._isFollowingOrFulfilledOrRejected() || this._rejectUnchecked(e, t)
            }, r.prototype._settlePromiseAt = function(e) {
              var t = this._promiseAt(e),
                n = t instanceof r;
              if (n && t._isMigrated()) return t._unsetIsMigrated(), u.invoke(this._settlePromiseAt, this, e);
              var o = this._isFulfilled() ? this._fulfillmentHandlerAt(e) : this._rejectionHandlerAt(e),
                i = this._isCarryingStackTrace() ? this._getCarriedStackTrace() : void 0,
                a = this._settledValue,
                s = this._receiverAt(e);
              this._clearCallbackDataAtIndex(e), "function" == typeof o ? n ? this._settlePromiseFromHandler(o, s, a, t) : o.call(s, a, t) : s instanceof _ ? s._isResolved() || (this._isFulfilled() ? s._promiseFulfilled(a, t) : s._promiseRejected(a, t)) : n && (this._isFulfilled() ? t._fulfill(a) : t._reject(a, i)), e >= 4 && 4 === (31 & e) && u.invokeLater(this._setLength, this, 0)
            }, r.prototype._clearCallbackDataAtIndex = function(e) {
              if (0 === e) this._isCarryingStackTrace() || (this._fulfillmentHandler0 = void 0), this._rejectionHandler0 = this._progressHandler0 = this._receiver0 = this._promise0 = void 0;
              else {
                var t = 5 * e - 5;
                this[t + 3] = this[t + 4] = this[t + 0] = this[t + 1] = this[t + 2] = void 0
              }
            }, r.prototype._isSettlePromisesQueued = function() {
              return -1073741824 === (-1073741824 & this._bitField)
            }, r.prototype._setSettlePromisesQueued = function() {
              this._bitField = -1073741824 | this._bitField
            }, r.prototype._unsetSettlePromisesQueued = function() {
              this._bitField = 1073741823 & this._bitField
            }, r.prototype._queueSettlePromises = function() {
              u.settlePromises(this), this._setSettlePromisesQueued()
            }, r.prototype._fulfillUnchecked = function(e) {
              if (e === this) {
                var t = i();
                return this._attachExtraTrace(t), this._rejectUnchecked(t, void 0)
              }
              this._setFulfilled(), this._settledValue = e, this._cleanValues(), this._length() > 0 && this._queueSettlePromises()
            }, r.prototype._rejectUncheckedCheckError = function(e) {
              var t = d.ensureErrorObject(e);
              this._rejectUnchecked(e, t === e ? void 0 : t)
            }, r.prototype._rejectUnchecked = function(e, t) {
              if (e === this) {
                var r = i();
                return this._attachExtraTrace(r), this._rejectUnchecked(r)
              }
              return this._setRejected(), this._settledValue = e, this._cleanValues(), this._isFinal() ? void u.throwLater(function(e) {
                throw "stack" in e && u.invokeFirst(m.unhandledRejection, void 0, e), e
              }, void 0 === t ? e : t) : (void 0 !== t && t !== e && this._setCarriedStackTrace(t), void(this._length() > 0 ? this._queueSettlePromises() : this._ensurePossibleRejectionHandled()))
            }, r.prototype._settlePromises = function() {
              this._unsetSettlePromisesQueued();
              for (var e = this._length(), t = 0; e > t; t++) this._settlePromiseAt(t)
            }, d.notEnumerableProp(r, "_makeSelfResolutionError", i), e("./progress.js")(r, _), e("./method.js")(r, f, g, s), e("./bind.js")(r, f, g), e("./finally.js")(r, p, g), e("./direct_resolve.js")(r), e("./synchronous_inspection.js")(r), e("./join.js")(r, _, g, f), r.Promise = r, e("./map.js")(r, _, s, g, f), e("./cancel.js")(r), e("./using.js")(r, s, g, y), e("./generators.js")(r, s, f, g), e("./nodeify.js")(r), e("./call_get.js")(r), e("./props.js")(r, _, g, s), e("./race.js")(r, f, g, s), e("./reduce.js")(r, _, s, g, f), e("./settle.js")(r, _), e("./some.js")(r, _, s), e("./promisify.js")(r, f), e("./any.js")(r), e("./each.js")(r, f), e("./timers.js")(r, f), e("./filter.js")(r, f), d.toFastProperties(r), d.toFastProperties(r.prototype), n({
              a: 1
            }), n({
              b: 2
            }), n({
              c: 3
            }), n(1), n(function() {}), n(void 0), n(!1), n(new r(f)), m.setBounds(u.firstLineError, d.lastLineError), r
          }
        }, {
          "./any.js": 1,
          "./async.js": 2,
          "./bind.js": 3,
          "./call_get.js": 5,
          "./cancel.js": 6,
          "./captured_trace.js": 7,
          "./catch_filter.js": 8,
          "./context.js": 9,
          "./debuggability.js": 10,
          "./direct_resolve.js": 11,
          "./each.js": 12,
          "./errors.js": 13,
          "./filter.js": 15,
          "./finally.js": 16,
          "./generators.js": 17,
          "./join.js": 18,
          "./map.js": 19,
          "./method.js": 20,
          "./nodeify.js": 21,
          "./progress.js": 22,
          "./promise_array.js": 24,
          "./promise_resolver.js": 25,
          "./promisify.js": 26,
          "./props.js": 27,
          "./race.js": 29,
          "./reduce.js": 30,
          "./settle.js": 32,
          "./some.js": 33,
          "./synchronous_inspection.js": 34,
          "./thenables.js": 35,
          "./timers.js": 36,
          "./using.js": 37,
          "./util.js": 38
        }],
        24: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            function i(e) {
              switch (e) {
                case -2:
                  return [];
                case -3:
                  return {}
              }
            }

            function a(e) {
              var n, o = this._promise = new t(r);
              e instanceof t && (n = e, o._propagateFrom(n, 5)), this._values = e, this._length = 0, this._totalResolved = 0, this._init(void 0, -2)
            }
            var s = e("./util.js"),
              d = s.isArray;
            return a.prototype.length = function() {
              return this._length
            }, a.prototype.promise = function() {
              return this._promise
            }, a.prototype._init = function u(e, r) {
              var a = n(this._values, this._promise);
              if (a instanceof t) {
                if (a = a._target(), this._values = a, !a._isFulfilled()) return a._isPending() ? void a._then(u, this._reject, void 0, this, r) : void this._reject(a._reason());
                if (a = a._value(), !d(a)) {
                  var s = new t.TypeError("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n");
                  return void this.__hardReject__(s)
                }
              } else if (!d(a)) return void this._promise._reject(o("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n")._reason());
              if (0 === a.length) return void(-5 === r ? this._resolveEmptyArray() : this._resolve(i(r)));
              var c = this.getActualLength(a.length);
              this._length = c, this._values = this.shouldCopyValues() ? new Array(c) : this._values;
              for (var l = this._promise, f = 0; c > f; ++f) {
                var h = this._isResolved(),
                  p = n(a[f], l);
                p instanceof t ? (p = p._target(), h ? p._ignoreRejections() : p._isPending() ? p._proxyPromiseArray(this, f) : p._isFulfilled() ? this._promiseFulfilled(p._value(), f) : this._promiseRejected(p._reason(), f)) : h || this._promiseFulfilled(p, f)
              }
            }, a.prototype._isResolved = function() {
              return null === this._values
            }, a.prototype._resolve = function(e) {
              this._values = null, this._promise._fulfill(e)
            }, a.prototype.__hardReject__ = a.prototype._reject = function(e) {
              this._values = null, this._promise._rejectCallback(e, !1, !0)
            }, a.prototype._promiseProgressed = function(e, t) {
              this._promise._progress({
                index: t,
                value: e
              })
            }, a.prototype._promiseFulfilled = function(e, t) {
              this._values[t] = e;
              var r = ++this._totalResolved;
              r >= this._length && this._resolve(this._values)
            }, a.prototype._promiseRejected = function(e, t) {
              this._totalResolved++, this._reject(e)
            }, a.prototype.shouldCopyValues = function() {
              return !0
            }, a.prototype.getActualLength = function(e) {
              return e
            }, a
          }
        }, {
          "./util.js": 38
        }],
        25: [function(e, t, r) {
          "use strict";

          function n(e) {
            return e instanceof Error && h.getPrototypeOf(e) === Error.prototype
          }

          function o(e) {
            var t;
            if (n(e)) {
              t = new l(e), t.name = e.name, t.message = e.message, t.stack = e.stack;
              for (var r = h.keys(e), o = 0; o < r.length; ++o) {
                var i = r[o];
                p.test(i) || (t[i] = e[i])
              }
              return t
            }
            return s.markAsOriginatingFromRejection(e), e
          }

          function i(e) {
            return function(t, r) {
              if (null !== e) {
                if (t) {
                  var n = o(d(t));
                  e._attachExtraTrace(n), e._reject(n)
                } else if (arguments.length > 2) {
                  for (var i = arguments.length, a = new Array(i - 1), s = 1; i > s; ++s) a[s - 1] = arguments[s];
                  e._fulfill(a)
                } else e._fulfill(r);
                e = null
              }
            }
          }
          var a, s = e("./util.js"),
            d = s.maybeWrapAsError,
            u = e("./errors.js"),
            c = u.TimeoutError,
            l = u.OperationalError,
            f = s.haveGetters,
            h = e("./es5.js"),
            p = /^(?:name|message|stack|cause)$/;
          if (a = f ? function(e) {
              this.promise = e
            } : function(e) {
              this.promise = e, this.asCallback = i(e), this.callback = this.asCallback
            }, f) {
            var g = {
              get: function() {
                return i(this.promise)
              }
            };
            h.defineProperty(a.prototype, "asCallback", g), h.defineProperty(a.prototype, "callback", g)
          }
          a._nodebackForPromise = i, a.prototype.toString = function() {
            return "[object PromiseResolver]"
          }, a.prototype.resolve = a.prototype.fulfill = function(e) {
            if (!(this instanceof a)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
            this.promise._resolveCallback(e)
          }, a.prototype.reject = function(e) {
            if (!(this instanceof a)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
            this.promise._rejectCallback(e)
          }, a.prototype.progress = function(e) {
            if (!(this instanceof a)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
            this.promise._progress(e)
          }, a.prototype.cancel = function(e) {
            this.promise.cancel(e)
          }, a.prototype.timeout = function() {
            this.reject(new c("timeout"))
          }, a.prototype.isResolved = function() {
            return this.promise.isResolved()
          }, a.prototype.toJSON = function() {
            return this.promise.toJSON()
          }, t.exports = a
        }, {
          "./errors.js": 13,
          "./es5.js": 14,
          "./util.js": 38
        }],
        26: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r) {
            function n(e) {
              return !E.test(e)
            }

            function o(e) {
              try {
                return e.__isPromisified__ === !0
              } catch (t) {
                return !1
              }
            }

            function i(e, t, r) {
              var n = h.getDataPropertyOrDefault(e, t + r, b);
              return n ? o(n) : !1
            }

            function a(e, t, r) {
              for (var n = 0; n < e.length; n += 2) {
                var o = e[n];
                if (r.test(o))
                  for (var i = o.replace(r, ""), a = 0; a < e.length; a += 2)
                    if (e[a] === i) throw new v("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/iWrZbw\n".replace("%s", t))
              }
            }

            function s(e, t, r, n) {
              for (var s = h.inheritedDataKeys(e), d = [], u = 0; u < s.length; ++u) {
                var c = s[u],
                  l = e[c],
                  f = n === S ? !0 : S(c, l, e);
                "function" != typeof l || o(l) || i(e, c, t) || !n(c, l, e, f) || d.push(c, l)
              }
              return a(d, t, r), d
            }

            function d(e, n, o, i) {
              function a() {
                var o = n;
                n === f && (o = this);
                var i = new t(r);
                i._captureStackTrace();
                var a = "string" == typeof d && this !== s ? this[d] : e,
                  u = p(i);
                try {
                  a.apply(o, g(arguments, u))
                } catch (c) {
                  i._rejectCallback(_(c), !0, !0)
                }
                return i
              }
              var s = function() {
                  return this
                }(),
                d = e;
              return "string" == typeof d && (e = i), h.notEnumerableProp(a, "__isPromisified__", !0), a
            }

            function u(e, t, r, n) {
              for (var o = new RegExp(N(t) + "$"), i = s(e, t, o, r), a = 0, d = i.length; d > a; a += 2) {
                var u = i[a],
                  c = i[a + 1],
                  l = u + t;
                e[l] = n === T ? T(u, f, u, c, t) : n(c, function() {
                  return T(u, f, u, c, t)
                })
              }
              return h.toFastProperties(e), e
            }

            function c(e, t) {
              return T(e, t, void 0, e)
            }
            var l, f = {},
              h = e("./util.js"),
              p = e("./promise_resolver.js")._nodebackForPromise,
              g = h.withAppended,
              _ = h.maybeWrapAsError,
              m = h.canEvaluate,
              v = e("./errors").TypeError,
              y = "Async",
              b = {
                __isPromisified__: !0
              },
              w = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"],
              E = new RegExp("^(?:" + w.join("|") + ")$"),
              S = function(e) {
                return h.isIdentifier(e) && "_" !== e.charAt(0) && "constructor" !== e
              },
              N = function(e) {
                return e.replace(/([$])/, "\\$")
              },
              T = m ? l : d;
            t.promisify = function(e, t) {
              if ("function" != typeof e) throw new v("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              if (o(e)) return e;
              var r = c(e, arguments.length < 2 ? f : t);
              return h.copyDescriptors(e, r, n), r
            }, t.promisifyAll = function(e, t) {
              if ("function" != typeof e && "object" != typeof e) throw new v("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/9ITlV0\n");
              t = Object(t);
              var r = t.suffix;
              "string" != typeof r && (r = y);
              var n = t.filter;
              "function" != typeof n && (n = S);
              var o = t.promisifier;
              if ("function" != typeof o && (o = T), !h.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/8FZo5V\n");
              for (var i = h.inheritedDataKeys(e), a = 0; a < i.length; ++a) {
                var s = e[i[a]];
                "constructor" !== i[a] && h.isClass(s) && (u(s.prototype, r, n, o), u(s, r, n, o))
              }
              return u(e, r, n, o)
            }
          }
        }, {
          "./errors": 13,
          "./promise_resolver.js": 25,
          "./util.js": 38
        }],
        27: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            function i(e) {
              for (var t = u.keys(e), r = t.length, n = new Array(2 * r), o = 0; r > o; ++o) {
                var i = t[o];
                n[o] = e[i], n[o + r] = i
              }
              this.constructor$(n)
            }

            function a(e) {
              var r, a = n(e);
              return d(a) ? (r = a instanceof t ? a._then(t.props, void 0, void 0, void 0, void 0) : new i(a).promise(), a instanceof t && r._propagateFrom(a, 4), r) : o("cannot await properties of a non-object\n\n    See http://goo.gl/OsFKC8\n")
            }
            var s = e("./util.js"),
              d = s.isObject,
              u = e("./es5.js");
            s.inherits(i, r), i.prototype._init = function() {
              this._init$(void 0, -3)
            }, i.prototype._promiseFulfilled = function(e, t) {
              this._values[t] = e;
              var r = ++this._totalResolved;
              if (r >= this._length) {
                for (var n = {}, o = this.length(), i = 0, a = this.length(); a > i; ++i) n[this._values[i + o]] = this._values[i];
                this._resolve(n)
              }
            }, i.prototype._promiseProgressed = function(e, t) {
              this._promise._progress({
                key: this._values[t + this.length()],
                value: e
              })
            }, i.prototype.shouldCopyValues = function() {
              return !1
            }, i.prototype.getActualLength = function(e) {
              return e >> 1
            }, t.prototype.props = function() {
              return a(this)
            }, t.props = function(e) {
              return a(e)
            }
          }
        }, {
          "./es5.js": 14,
          "./util.js": 38
        }],
        28: [function(e, t, r) {
          "use strict";

          function n(e, t, r, n, o) {
            for (var i = 0; o > i; ++i) r[i + n] = e[i + t], e[i + t] = void 0
          }

          function o(e) {
            this._capacity = e, this._length = 0, this._front = 0
          }
          o.prototype._willBeOverCapacity = function(e) {
            return this._capacity < e
          }, o.prototype._pushOne = function(e) {
            var t = this.length();
            this._checkCapacity(t + 1);
            var r = this._front + t & this._capacity - 1;
            this[r] = e, this._length = t + 1
          }, o.prototype._unshiftOne = function(e) {
            var t = this._capacity;
            this._checkCapacity(this.length() + 1);
            var r = this._front,
              n = (r - 1 & t - 1 ^ t) - t;
            this[n] = e, this._front = n, this._length = this.length() + 1
          }, o.prototype.unshift = function(e, t, r) {
            this._unshiftOne(r), this._unshiftOne(t), this._unshiftOne(e)
          }, o.prototype.push = function(e, t, r) {
            var n = this.length() + 3;
            if (this._willBeOverCapacity(n)) return this._pushOne(e), this._pushOne(t), void this._pushOne(r);
            var o = this._front + n - 3;
            this._checkCapacity(n);
            var i = this._capacity - 1;
            this[o + 0 & i] = e, this[o + 1 & i] = t, this[o + 2 & i] = r, this._length = n
          }, o.prototype.shift = function() {
            var e = this._front,
              t = this[e];
            return this[e] = void 0, this._front = e + 1 & this._capacity - 1, this._length--, t
          }, o.prototype.length = function() {
            return this._length
          }, o.prototype._checkCapacity = function(e) {
            this._capacity < e && this._resizeTo(this._capacity << 1)
          }, o.prototype._resizeTo = function(e) {
            var t = this._capacity;
            this._capacity = e;
            var r = this._front,
              o = this._length,
              i = r + o & t - 1;
            n(this, 0, this, t, i)
          }, t.exports = o
        }, {}],
        29: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            function i(e, i) {
              var d = n(e);
              if (d instanceof t) return s(d);
              if (!a(e)) return o("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n");
              var u = new t(r);
              void 0 !== i && u._propagateFrom(i, 5);
              for (var c = u._fulfill, l = u._reject, f = 0, h = e.length; h > f; ++f) {
                var p = e[f];
                (void 0 !== p || f in e) && t.cast(p)._then(c, l, void 0, u, null)
              }
              return u
            }
            var a = e("./util.js").isArray,
              s = function(e) {
                return e.then(function(t) {
                  return i(t, e)
                })
              };
            t.race = function(e) {
              return i(e, void 0)
            }, t.prototype.race = function() {
              return i(this, void 0)
            }
          }
        }, {
          "./util.js": 38
        }],
        30: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o, i) {
            function a(e, r, n, a) {
              this.constructor$(e), this._promise._captureStackTrace(), this._preservedValues = a === i ? [] : null, this._zerothIsAccum = void 0 === n, this._gotAccum = !1, this._reducingIndex = this._zerothIsAccum ? 1 : 0, this._valuesPhase = void 0;
              var d = o(n, this._promise),
                l = !1,
                f = d instanceof t;
              f && (d = d._target(), d._isPending() ? d._proxyPromiseArray(this, -1) : d._isFulfilled() ? (n = d._value(), this._gotAccum = !0) : (this._reject(d._reason()), l = !0)), f || this._zerothIsAccum || (this._gotAccum = !0);
              var h = u();
              this._callback = null === h ? r : h.bind(r), this._accum = n, l || c.invoke(s, this, void 0)
            }

            function s() {
              this._init$(void 0, -5)
            }

            function d(e, t, r, o) {
              if ("function" != typeof t) return n("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              var i = new a(e, t, r, o);
              return i.promise()
            }
            var u = t._getDomain,
              c = e("./async.js"),
              l = e("./util.js"),
              f = l.tryCatch,
              h = l.errorObj;
            l.inherits(a, r), a.prototype._init = function() {}, a.prototype._resolveEmptyArray = function() {
              (this._gotAccum || this._zerothIsAccum) && this._resolve(null !== this._preservedValues ? [] : this._accum)
            }, a.prototype._promiseFulfilled = function(e, r) {
              var n = this._values;
              n[r] = e;
              var i, a = this.length(),
                s = this._preservedValues,
                d = null !== s,
                u = this._gotAccum,
                c = this._valuesPhase;
              if (!c)
                for (c = this._valuesPhase = new Array(a), i = 0; a > i; ++i) c[i] = 0;
              if (i = c[r], 0 === r && this._zerothIsAccum ? (this._accum = e, this._gotAccum = u = !0, c[r] = 0 === i ? 1 : 2) : -1 === r ? (this._accum = e, this._gotAccum = u = !0) : 0 === i ? c[r] = 1 : (c[r] = 2, this._accum = e), u) {
                for (var l, p = this._callback, g = this._promise._boundValue(), _ = this._reducingIndex; a > _; ++_)
                  if (i = c[_], 2 !== i) {
                    if (1 !== i) return;
                    if (e = n[_], this._promise._pushContext(), d ? (s.push(e), l = f(p).call(g, e, _, a)) : l = f(p).call(g, this._accum, e, _, a), this._promise._popContext(), l === h) return this._reject(l.e);
                    var m = o(l, this._promise);
                    if (m instanceof t) {
                      if (m = m._target(), m._isPending()) return c[_] = 4, m._proxyPromiseArray(this, _);
                      if (!m._isFulfilled()) return this._reject(m._reason());
                      l = m._value()
                    }
                    this._reducingIndex = _ + 1, this._accum = l
                  } else this._reducingIndex = _ + 1;
                this._resolve(d ? s : this._accum)
              }
            }, t.prototype.reduce = function(e, t) {
              return d(this, e, t, null)
            }, t.reduce = function(e, t, r, n) {
              return d(e, t, r, n)
            }
          }
        }, {
          "./async.js": 2,
          "./util.js": 38
        }],
        31: [function(e, o, i) {
          "use strict";
          var a, s = e("./util"),
            d = function() {
              throw new Error("No async scheduler available\n\n    See http://goo.gl/m3OTXk\n")
            };
          if (s.isNode && "undefined" == typeof MutationObserver) {
            var u = r.setImmediate,
              c = t.nextTick;
            a = s.isRecentNode ? function(e) {
              u.call(r, e)
            } : function(e) {
              c.call(t, e)
            }
          } else "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && window.navigator.standalone ? a = "undefined" != typeof n ? function(e) {
            n(e)
          } : "undefined" != typeof setTimeout ? function(e) {
            setTimeout(e, 0)
          } : d : (a = function(e) {
            var t = document.createElement("div"),
              r = new MutationObserver(e);
            return r.observe(t, {
                attributes: !0
              }),
              function() {
                t.classList.toggle("foo")
              }
          }, a.isStatic = !0);
          o.exports = a
        }, {
          "./util": 38
        }],
        32: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r) {
            function n(e) {
              this.constructor$(e)
            }
            var o = t.PromiseInspection,
              i = e("./util.js");
            i.inherits(n, r), n.prototype._promiseResolved = function(e, t) {
              this._values[e] = t;
              var r = ++this._totalResolved;
              r >= this._length && this._resolve(this._values)
            }, n.prototype._promiseFulfilled = function(e, t) {
              var r = new o;
              r._bitField = 268435456, r._settledValue = e, this._promiseResolved(t, r)
            }, n.prototype._promiseRejected = function(e, t) {
              var r = new o;
              r._bitField = 134217728, r._settledValue = e, this._promiseResolved(t, r)
            }, t.settle = function(e) {
              return new n(e).promise()
            }, t.prototype.settle = function() {
              return new n(this).promise()
            }
          }
        }, {
          "./util.js": 38
        }],
        33: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n) {
            function o(e) {
              this.constructor$(e), this._howMany = 0, this._unwrap = !1, this._initialized = !1
            }

            function i(e, t) {
              if ((0 | t) !== t || 0 > t) return n("expecting a positive integer\n\n    See http://goo.gl/1wAmHx\n");
              var r = new o(e),
                i = r.promise();
              return r.setHowMany(t), r.init(), i
            }
            var a = e("./util.js"),
              s = e("./errors.js").RangeError,
              d = e("./errors.js").AggregateError,
              u = a.isArray;
            a.inherits(o, r), o.prototype._init = function() {
              if (this._initialized) {
                if (0 === this._howMany) return void this._resolve([]);
                this._init$(void 0, -5);
                var e = u(this._values);
                !this._isResolved() && e && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
              }
            }, o.prototype.init = function() {
              this._initialized = !0, this._init()
            }, o.prototype.setUnwrap = function() {
              this._unwrap = !0
            }, o.prototype.howMany = function() {
              return this._howMany
            }, o.prototype.setHowMany = function(e) {
              this._howMany = e
            }, o.prototype._promiseFulfilled = function(e) {
              this._addFulfilled(e), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values))
            }, o.prototype._promiseRejected = function(e) {
              if (this._addRejected(e), this.howMany() > this._canPossiblyFulfill()) {
                for (var t = new d, r = this.length(); r < this._values.length; ++r) t.push(this._values[r]);
                this._reject(t)
              }
            }, o.prototype._fulfilled = function() {
              return this._totalResolved
            }, o.prototype._rejected = function() {
              return this._values.length - this.length()
            }, o.prototype._addRejected = function(e) {
              this._values.push(e)
            }, o.prototype._addFulfilled = function(e) {
              this._values[this._totalResolved++] = e
            }, o.prototype._canPossiblyFulfill = function() {
              return this.length() - this._rejected()
            }, o.prototype._getRangeError = function(e) {
              var t = "Input array must contain at least " + this._howMany + " items but contains only " + e + " items";
              return new s(t)
            }, o.prototype._resolveEmptyArray = function() {
              this._reject(this._getRangeError(0))
            }, t.some = function(e, t) {
              return i(e, t)
            }, t.prototype.some = function(e) {
              return i(this, e)
            }, t._SomePromiseArray = o
          }
        }, {
          "./errors.js": 13,
          "./util.js": 38
        }],
        34: [function(e, t, r) {
          "use strict";
          t.exports = function(e) {
            function t(e) {
              void 0 !== e ? (e = e._target(), this._bitField = e._bitField, this._settledValue = e._settledValue) : (this._bitField = 0, this._settledValue = void 0)
            }
            t.prototype.value = function() {
              if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/hc1DLj\n");
              return this._settledValue
            }, t.prototype.error = t.prototype.reason = function() {
              if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/hPuiwB\n");
              return this._settledValue
            }, t.prototype.isFulfilled = e.prototype._isFulfilled = function() {
              return (268435456 & this._bitField) > 0
            }, t.prototype.isRejected = e.prototype._isRejected = function() {
              return (134217728 & this._bitField) > 0
            }, t.prototype.isPending = e.prototype._isPending = function() {
              return 0 === (402653184 & this._bitField)
            }, t.prototype.isResolved = e.prototype._isResolved = function() {
              return (402653184 & this._bitField) > 0
            }, e.prototype.isPending = function() {
              return this._target()._isPending()
            }, e.prototype.isRejected = function() {
              return this._target()._isRejected()
            }, e.prototype.isFulfilled = function() {
              return this._target()._isFulfilled()
            }, e.prototype.isResolved = function() {
              return this._target()._isResolved()
            }, e.prototype._value = function() {
              return this._settledValue
            }, e.prototype._reason = function() {
              return this._unsetRejectionIsUnhandled(), this._settledValue
            }, e.prototype.value = function() {
              var e = this._target();
              if (!e.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/hc1DLj\n");
              return e._settledValue
            }, e.prototype.reason = function() {
              var e = this._target();
              if (!e.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/hPuiwB\n");
              return e._unsetRejectionIsUnhandled(), e._settledValue
            }, e.PromiseInspection = t
          }
        }, {}],
        35: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r) {
            function n(e, n) {
              if (u(e)) {
                if (e instanceof t) return e;
                if (i(e)) {
                  var c = new t(r);
                  return e._then(c._fulfillUnchecked, c._rejectUncheckedCheckError, c._progressUnchecked, c, null), c
                }
                var l = s.tryCatch(o)(e);
                if (l === d) {
                  n && n._pushContext();
                  var c = t.reject(l.e);
                  return n && n._popContext(), c
                }
                if ("function" == typeof l) return a(e, l, n)
              }
              return e
            }

            function o(e) {
              return e.then
            }

            function i(e) {
              return c.call(e, "_promise0")
            }

            function a(e, n, o) {
              function i(e) {
                c && (c._resolveCallback(e), c = null)
              }

              function a(e) {
                c && (c._rejectCallback(e, f, !0), c = null)
              }

              function u(e) {
                c && "function" == typeof c._progress && c._progress(e)
              }
              var c = new t(r),
                l = c;
              o && o._pushContext(), c._captureStackTrace(), o && o._popContext();
              var f = !0,
                h = s.tryCatch(n).call(e, i, a, u);
              return f = !1, c && h === d && (c._rejectCallback(h.e, !0, !0), c = null), l
            }
            var s = e("./util.js"),
              d = s.errorObj,
              u = s.isObject,
              c = {}.hasOwnProperty;
            return n
          }
        }, {
          "./util.js": 38
        }],
        36: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r) {
            function n(e) {
              var t = this;
              return t instanceof Number && (t = +t), clearTimeout(t), e
            }

            function o(e) {
              var t = this;
              throw t instanceof Number && (t = +t), clearTimeout(t), e
            }
            var i = e("./util.js"),
              a = t.TimeoutError,
              s = function(e, t) {
                if (e.isPending()) {
                  "string" != typeof t && (t = "operation timed out");
                  var r = new a(t);
                  i.markAsOriginatingFromRejection(r), e._attachExtraTrace(r), e._cancel(r)
                }
              },
              d = function(e) {
                return u(+this).thenReturn(e)
              },
              u = t.delay = function(e, n) {
                if (void 0 === n) {
                  n = e, e = void 0;
                  var o = new t(r);
                  return setTimeout(function() {
                    o._fulfill()
                  }, n), o
                }
                return n = +n, t.resolve(e)._then(d, null, null, n, void 0)
              };
            t.prototype.delay = function(e) {
              return u(this, e)
            }, t.prototype.timeout = function(e, t) {
              e = +e;
              var r = this.then().cancellable();
              r._cancellationParent = this;
              var i = setTimeout(function() {
                s(r, t)
              }, e);
              return r._then(n, o, void 0, i, void 0)
            }
          }
        }, {
          "./util.js": 38
        }],
        37: [function(e, t, r) {
          "use strict";
          t.exports = function(t, r, n, o) {
            function i(e) {
              for (var r = e.length, n = 0; r > n; ++n) {
                var o = e[n];
                if (o.isRejected()) return t.reject(o.error());
                e[n] = o._settledValue
              }
              return e
            }

            function a(e) {
              setTimeout(function() {
                throw e
              }, 0)
            }

            function s(e) {
              var t = n(e);
              return t !== e && "function" == typeof e._isDisposable && "function" == typeof e._getDisposer && e._isDisposable() && t._setDisposable(e._getDisposer()), t
            }

            function d(e, r) {
              function o() {
                if (i >= d) return u.resolve();
                var c = s(e[i++]);
                if (c instanceof t && c._isDisposable()) {
                  try {
                    c = n(c._getDisposer().tryDispose(r), e.promise)
                  } catch (l) {
                    return a(l)
                  }
                  if (c instanceof t) return c._then(o, a, null, null, null)
                }
                o()
              }
              var i = 0,
                d = e.length,
                u = t.defer();
              return o(), u.promise
            }

            function u(e) {
              var t = new _;
              return t._settledValue = e, t._bitField = 268435456, d(this, t).thenReturn(e)
            }

            function c(e) {
              var t = new _;
              return t._settledValue = e, t._bitField = 134217728, d(this, t).thenThrow(e)
            }

            function l(e, t, r) {
              this._data = e, this._promise = t, this._context = r
            }

            function f(e, t, r) {
              this.constructor$(e, t, r)
            }

            function h(e) {
              return l.isDisposer(e) ? (this.resources[this.index]._setDisposable(e), e.promise()) : e
            }
            var p = e("./errors.js").TypeError,
              g = e("./util.js").inherits,
              _ = t.PromiseInspection;
            l.prototype.data = function() {
              return this._data
            }, l.prototype.promise = function() {
              return this._promise
            }, l.prototype.resource = function() {
              return this.promise().isFulfilled() ? this.promise().value() : null
            }, l.prototype.tryDispose = function(e) {
              var t = this.resource(),
                r = this._context;
              void 0 !== r && r._pushContext();
              var n = null !== t ? this.doDispose(t, e) : null;
              return void 0 !== r && r._popContext(), this._promise._unsetDisposable(), this._data = null, n
            }, l.isDisposer = function(e) {
              return null != e && "function" == typeof e.resource && "function" == typeof e.tryDispose
            }, g(f, l), f.prototype.doDispose = function(e, t) {
              var r = this.data();
              return r.call(e, e, t)
            }, t.using = function() {
              var e = arguments.length;
              if (2 > e) return r("you must pass at least 2 arguments to Promise.using");
              var o = arguments[e - 1];
              if ("function" != typeof o) return r("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
              e--;
              for (var a = new Array(e), s = 0; e > s; ++s) {
                var d = arguments[s];
                if (l.isDisposer(d)) {
                  var f = d;
                  d = d.promise(), d._setDisposable(f)
                } else {
                  var p = n(d);
                  p instanceof t && (d = p._then(h, null, null, {
                    resources: a,
                    index: s
                  }, void 0))
                }
                a[s] = d
              }
              var g = t.settle(a).then(i).then(function(e) {
                g._pushContext();
                var t;
                try {
                  t = o.apply(void 0, e)
                } finally {
                  g._popContext()
                }
                return t
              })._then(u, c, void 0, a, void 0);
              return a.promise = g, g
            }, t.prototype._setDisposable = function(e) {
              this._bitField = 262144 | this._bitField, this._disposer = e
            }, t.prototype._isDisposable = function() {
              return (262144 & this._bitField) > 0
            }, t.prototype._getDisposer = function() {
              return this._disposer;
            }, t.prototype._unsetDisposable = function() {
              this._bitField = -262145 & this._bitField, this._disposer = void 0
            }, t.prototype.disposer = function(e) {
              if ("function" == typeof e) return new f(e, this, o());
              throw new p
            }
          }
        }, {
          "./errors.js": 13,
          "./util.js": 38
        }],
        38: [function(e, r, n) {
          "use strict";

          function o() {
            try {
              var e = C;
              return C = null, e.apply(this, arguments)
            } catch (t) {
              return $.e = t, $
            }
          }

          function i(e) {
            return C = e, o
          }

          function a(e) {
            return null == e || e === !0 || e === !1 || "string" == typeof e || "number" == typeof e
          }

          function s(e) {
            return !a(e)
          }

          function d(e) {
            return a(e) ? new Error(m(e)) : e
          }

          function u(e, t) {
            var r, n = e.length,
              o = new Array(n + 1);
            for (r = 0; n > r; ++r) o[r] = e[r];
            return o[r] = t, o
          }

          function c(e, t, r) {
            if (!S.isES5) return {}.hasOwnProperty.call(e, t) ? e[t] : void 0;
            var n = Object.getOwnPropertyDescriptor(e, t);
            return null != n ? null == n.get && null == n.set ? n.value : r : void 0
          }

          function l(e, t, r) {
            if (a(e)) return e;
            var n = {
              value: r,
              configurable: !0,
              enumerable: !1,
              writable: !0
            };
            return S.defineProperty(e, t, n), e
          }

          function f(e) {
            throw e
          }

          function h(e) {
            try {
              if ("function" == typeof e) {
                var t = S.names(e.prototype),
                  r = S.isES5 && t.length > 1,
                  n = t.length > 0 && !(1 === t.length && "constructor" === t[0]),
                  o = I.test(e + "") && S.names(e).length > 0;
                if (r || n || o) return !0
              }
              return !1
            } catch (i) {
              return !1
            }
          }

          function p(e) {
            function t() {}
            t.prototype = e;
            for (var r = 8; r--;) new t;
            return e
          }

          function g(e) {
            return O.test(e)
          }

          function _(e, t, r) {
            for (var n = new Array(e), o = 0; e > o; ++o) n[o] = t + o + r;
            return n
          }

          function m(e) {
            try {
              return e + ""
            } catch (t) {
              return "[no string representation]"
            }
          }

          function v(e) {
            try {
              l(e, "isOperational", !0)
            } catch (t) {}
          }

          function y(e) {
            return null == e ? !1 : e instanceof Error.__BluebirdErrorTypes__.OperationalError || e.isOperational === !0
          }

          function b(e) {
            return e instanceof Error && S.propertyIsWritable(e, "stack")
          }

          function w(e) {
            return {}.toString.call(e)
          }

          function E(e, t, r) {
            for (var n = S.names(e), o = 0; o < n.length; ++o) {
              var i = n[o];
              if (r(i)) try {
                S.defineProperty(t, i, S.getDescriptor(e, i))
              } catch (a) {}
            }
          }
          var S = e("./es5.js"),
            N = "undefined" == typeof navigator,
            T = function() {
              try {
                var e = {};
                return S.defineProperty(e, "f", {
                  get: function() {
                    return 3
                  }
                }), 3 === e.f
              } catch (t) {
                return !1
              }
            }(),
            $ = {
              e: {}
            },
            C, k = function(e, t) {
              function r() {
                this.constructor = e, this.constructor$ = t;
                for (var r in t.prototype) n.call(t.prototype, r) && "$" !== r.charAt(r.length - 1) && (this[r + "$"] = t.prototype[r])
              }
              var n = {}.hasOwnProperty;
              return r.prototype = t.prototype, e.prototype = new r, e.prototype
            },
            A = function() {
              var e = [Array.prototype, Object.prototype, Function.prototype],
                t = function(t) {
                  for (var r = 0; r < e.length; ++r)
                    if (e[r] === t) return !0;
                  return !1
                };
              if (S.isES5) {
                var r = Object.getOwnPropertyNames;
                return function(e) {
                  for (var n = [], o = Object.create(null); null != e && !t(e);) {
                    var i;
                    try {
                      i = r(e)
                    } catch (a) {
                      return n
                    }
                    for (var s = 0; s < i.length; ++s) {
                      var d = i[s];
                      if (!o[d]) {
                        o[d] = !0;
                        var u = Object.getOwnPropertyDescriptor(e, d);
                        null != u && null == u.get && null == u.set && n.push(d)
                      }
                    }
                    e = S.getPrototypeOf(e)
                  }
                  return n
                }
              }
              var n = {}.hasOwnProperty;
              return function(r) {
                if (t(r)) return [];
                var o = [];
                e: for (var i in r)
                  if (n.call(r, i)) o.push(i);
                  else {
                    for (var a = 0; a < e.length; ++a)
                      if (n.call(e[a], i)) continue e;
                    o.push(i)
                  }
                return o
              }
            }(),
            I = /this\s*\.\s*\S+\s*=/,
            O = /^[a-z$_][a-z$_0-9]*$/i,
            R = function() {
              return "stack" in new Error ? function(e) {
                return b(e) ? e : new Error(m(e))
              } : function(e) {
                if (b(e)) return e;
                try {
                  throw new Error(m(e))
                } catch (t) {
                  return t
                }
              }
            }(),
            P = {
              isClass: h,
              isIdentifier: g,
              inheritedDataKeys: A,
              getDataPropertyOrDefault: c,
              thrower: f,
              isArray: S.isArray,
              haveGetters: T,
              notEnumerableProp: l,
              isPrimitive: a,
              isObject: s,
              canEvaluate: N,
              errorObj: $,
              tryCatch: i,
              inherits: k,
              withAppended: u,
              maybeWrapAsError: d,
              toFastProperties: p,
              filledRange: _,
              toString: m,
              canAttachTrace: b,
              ensureErrorObject: R,
              originatesFromRejection: y,
              markAsOriginatingFromRejection: v,
              classString: w,
              copyDescriptors: E,
              hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
              isNode: "undefined" != typeof t && "[object process]" === w(t).toLowerCase()
            };
          P.isRecentNode = P.isNode && function() {
            var e = t.versions.node.split(".").map(Number);
            return 0 === e[0] && e[1] > 10 || e[0] > 0
          }(), P.isNode && P.toFastProperties(t);
          try {
            throw new Error
          } catch (M) {
            P.lastLineError = M
          }
          r.exports = P
        }, {
          "./es5.js": 14
        }]
      }, {}, [4])(4)
    }), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise)
  }).call(t, r(563), function() {
    return this
  }(), r(102).setImmediate)
}, , , , , , , , , , function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(355),
    i = r(106),
    a = n.createClass({
      displayName: "ConfirmPopup",
      mixins: [i],
      propTypes: {
        classes: n.PropTypes.string,
        onCancel: n.PropTypes.func,
        cancelText: n.PropTypes.string,
        onOK: n.PropTypes.func,
        okText: n.PropTypes.string,
        children: n.PropTypes.node.isRequired,
        title: n.PropTypes.node,
        a8n: n.PropTypes.string
      },
      getDefaultProps: function() {
        return {
          classes: "",
          cancelText: l10n.t("web_cancel"),
          okText: l10n.t("web_ok")
        }
      },
      onOK: function(e) {
        this.actionTriggered || (this.props.onOK(e), this.actionTriggered = !0)
      },
      onCancel: function(e) {
        this.actionTriggered || (this.props.onCancel(e), this.actionTriggered = !0)
      },
      componentDidMount: function() {
        if (this.props.onOK) {
          var e = this;
          this.regNativeListener(window, "keydown", function(t) {
            13 === t.keyCode && (t.stopPropagation(), t.preventDefault(), e.props.onOK())
          })
        }
      },
      render: function() {
        var e = this.props.onOK ? n.createElement("button", {
            "data-a8n": o.key("popup-controls-ok"),
            className: "btn-plain btn-default popup-controls-item",
            onClick: this.onOK
          }, this.props.okText) : null,
          t = this.props.onCancel ? n.createElement("button", {
            className: "btn-plain popup-controls-item",
            onClick: this.onCancel
          }, this.props.cancelText) : null,
          r = this.props.title ? n.createElement("div", {
            "data-a8n": o.key("popup-title"),
            className: "popup-title"
          }, this.props.title) : null;
        return n.createElement("div", {
          className: "backdrop"
        }, n.createElement("div", {
          className: "popup-container"
        }, n.createElement("div", {
          className: "popup " + this.props.classes
        }, n.createElement("div", {
          className: "popup-body"
        }, r, n.createElement("div", {
          "data-a8n": o.key("popup-contents"),
          className: "popup-contents"
        }, this.props.children)), n.createElement("div", {
          className: "popup-controls"
        }, t, e))))
      }
    });
  e.exports = a
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(27),
    s = n(a),
    d = r(1),
    u = r(10),
    c = r(360),
    l = r(86),
    f = r(358),
    h = r(13),
    p = r(21),
    g = r(15),
    m = {
      QUERY: "QUERY",
      FIND: "FIND",
      UPDATE: "UPDATE"
    },
    v = {
      NONE: "NONE",
      LOAD: "LOAD"
    },
    y = f.extend(c, l, {
      listenTo: function(e, t, r) {
        if (!_.isObject(e) || _.isEmpty(t) || !_.isFunction(r)) {
          var n = [];
          throw _.isObject(e) || n.push("obj parameter is not an object"), _.isEmpty(t) && n.push("event is empty string"), _.isFunction(r) || n.push("callback is not a function"), new Error(n.join(", "))
        }
        f.prototype.listenTo.apply(this, arguments)
      },
      initialize: function(e) {
        this._config = _.extend({
          CachePolicy: {
            id: void 0,
            policy: v.NONE,
            delay: 0
          },
          staleCollection: !1
        }, e), this._inflight = {}, this.listenTo(this, "add remove reset sort", function() {
          var e = this._last,
            t = this.last();
          (!e && t || e !== t) && (this._last = t, this.trigger("change:last", t));
          var r = this._first,
            n = this.first();
          (!r && n || r !== n) && (this._first = n, this.trigger("change:first", n))
        }), this._initializeFromCache(), this._config.staleCollection && this._initializeStaleCollection()
      },
      _initializeFromCache: function(e) {
        var t = this._config.CachePolicy,
          r = t.id,
          n = t.policy,
          o = t.delay,
          i = t.trigger || "all";
        this.listenTo(h, "change:stream", function() {
          if (h.stream === h.STREAM.SYNCING) {
            if (n === v.NONE) return void(_.isUndefined(r) || g.setCollection(r));
            if (d.log("baseCollection:initFromCache load: " + r)(), this.add(g.getCollection(r)), !_.isNumber(o)) return;
            this._saveToCache = _.debounce(this.saveToCache, o), this.listenTo(this, i, this._saveToCache), this.initializeFromCache()
          }
        })
      },
      initializeFromCache: function() {},
      saveToCache: function() {
        if (Store.Conn.me) {
          var e = this._config.CachePolicy.id;
          d.log("baseCollection:saveToCache save: " + e)(), g.setCollection(e, this.toJSON())
        }
      },
      _initializeStaleCollection: function() {
        var e = this;
        this.listenTo(h, "change:stream", function() {
          switch (h.stream) {
            case h.STREAM.DISCONNECTED:
              e.invoke("set", "stale", !0);
              break;
            case h.STREAM.RESUMING:
            case h.STREAM.SYNCING:
              break;
            case h.STREAM.CONNECTED:
              h.previousAttributes().stream === h.STREAM.RESUMING && _.isFunction(e.onResume) && e.onResume()
          }
        })
      },
      _query: function(e, t) {
        var r = _.isString(t) ? t : (0, s["default"])(t),
          n = e === m.QUERY ? void 0 : this.get(t),
          o = "force-" + r;
        return (this._inflight[o] && e === m.FIND || e === m.UPDATE) && (r = o), this._inflight[r] ? n && e === m.FIND ? i["default"].resolve(n) : this._inflight[r] : !n || n && n.stale || e === m.UPDATE ? this._inflight[r] = i["default"].bind(this).then(function() {
          return this._serverQuery(e, t)
        })["finally"](function() {
          delete this._inflight[r]
        })["catch"](p.WapDrop, function(e) {
          throw d.warn(e.toString())(), e
        })["catch"](_.isString, function(e) {
          d.log("baseCollection:query query promise rejected: " + e)()
        }) : i["default"].resolve(n)
      },
      _serverQuery: function(e, t) {
        var r;
        r = e === m.UPDATE ? this._update(t) : e === m.FIND ? this._find(t) : this._findQuery(t);
        var n = this;
        return r.then(function(e) {
          return n._config.staleCollection && _.each(_.compact(_.forceArray(e)), function(e) {
            "undefined" == typeof e.stale && (e.stale = !1)
          }), n.add(e, {
            merge: !0
          })
        })
      },
      findQuery: function(e) {
        return this._query(m.QUERY, e)
      },
      find: function(e) {
        return e ? this._query(m.FIND, e) : (u.upload(d.trace("Called find without an id")), i["default"].resolve())
      },
      update: function(e) {
        return e ? this._query(m.UPDATE, e) : (u.upload(d.trace("Called update without an id")), i["default"].resolve())
      },
      _update: function(e) {
        return this._find(e)
      },
      handle: function(e) {
        var t = this._handle(e.shift());
        this._config.staleCollection && _.each(_.compact(_.forceArray(t)), function(e) {
          e.stale = !1
        }), this.add(t, {
          merge: !0
        })
      },
      gadd: function(e) {
        if (_.isString(e) || _.isNumber(e)) {
          var t = {};
          return t[this.mainIndex] = e, this.get(e) || this.add(t, {
            merge: !0
          })
        }
        if (e && e[this.mainIndex]) return this.add(e, {
          merge: !0
        });
        var r = _.findKey(Store, this) || "unknown";
        throw new Error(r + ".gadd called without an id attr (" + this.mainIndex + ")")
      },
      "delete": function() {
        this.stopListening(this, "all", this._saveToCache), _.invoke(this.models, "stopListening"), _.invoke(this.models, "cancelPendingPromises"), this._inflight = {}, this.reset()
      },
      isStateStale: function(e) {
        var t = this.get(e);
        return t && t.stale
      }
    });
  y.CACHE_POLICY = v, e.exports = y
}, , function(e, t) {
  "use strict";
  e.exports = {
    key: function(e) {
      var t = !1;
      return t ? e : void 0
    }
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    var t = {};
    return e.forEach(function(e) {
      var r = e.split(""),
        n = _.initial(r).join(""),
        o = _.last(r);
      (t[n] || (t[n] = {}))[o] = 1
    }), _.keys(t).forEach(function(e) {
      t[e] = a(_.keys(t[e]))
    }), i(t)
  }

  function i(e) {
    return _.map(_.keys(e).sort(function(e, t) {
      return t.length - e.length
    }), function(t) {
      return _.escapeRegExp(t) + e[t]
    }).join("|")
  }

  function a(e) {
    if (1 === e.length) return _.escapeRegExp(e[0]);
    e = e.sort();
    for (var t = [], r = 0, n = e[r], o = e.length, i = 0; o >= i; i++) {
      var a = e[i];
      if (!a || a.charCodeAt(0) !== n.charCodeAt(0) + (i - r)) {
        var s = e[i - 1];
        s === n ? t.push(s) : t.push(n + "-" + s), r = i, n = a
      }
    }
    return "[" + _.escapeRegExp(t.join("")) + "]"
  }

  function s() {
    var e = (0, u["default"])($).concat((0, u["default"])(b), E);
    try {
      return new RegExp("(" + o(e) + ")", "g")
    } catch (t) {
      p.log("createRegexp Failed", e)()
    }
  }
  var d = r(68),
    u = n(d),
    c = r(407),
    l = r(406),
    f = r(7),
    h = r(43),
    p = r(1),
    g = null,
    m = {},
    v = "□",
    y = "🏻 🏼 🏽 🏾 🏿".split(/ /),
    b = {
      "︀": !0,
      "︁": !0,
      "︂": !0,
      "︃": !0,
      "︄": !0,
      "︅": !0,
      "︆": !0,
      "︇": !0,
      "︈": !0,
      "︉": !0,
      "︊": !0,
      "︋": !0,
      "︌": !0,
      "︍": !0,
      "︎": !0,
      "️": !0
    },
    w = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"],
    E = [];
  w.forEach(function(e) {
    w.forEach(function(t) {
      E.push(e + t)
    })
  });
  var S = function(e, t) {
      for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
      return e
    },
    N = function(e) {
      var t = {};
      for (var r in e) e.hasOwnProperty(r) && (t[e[r]] = r);
      return t
    },
    T = N(c),
    $ = S(S({}, l), c),
    C = {},
    k = y[0];
  _.keys(c).forEach(function(e) {
    c[e + k] && (C[e] = e, y.map(function(t) {
      C[e + t] = e
    }))
  });
  var A = {
    containsEmoji: _.memoize(function(e) {
      return g || (g = s()), g.test(e)
    }),
    normalizeEmoji: _.memoize(function(e) {
      return g || (g = s()), e ? e.replace(g, function(e, t) {
        if (b[t]) return "";
        var r = $[t];
        return T[r] || v
      }) : ""
    }),
    codeToEmoji: N($),
    emojiToHTML: _.memoize(function(e, t, r) {
      g || (g = s()), r = r || "small";
      var n = "small" === r ? "emoji" : "emojik";
      return e ? e.replace(g, function(e, r) {
        if (b[r]) return "";
        var o = m[r];
        if (o) return o;
        var i, a = $[r];
        if (a) {
          var s = T[a] || v,
            d = document.createElement("img");
          return d.alt = s, d.draggable = !1, d.className = h(n, "emoji" + a, t), d.src = f.ONE_BY_ONE_TRANS_GIF, d.outerHTML
        }
        return i = v, m[r] = i
      }) : ""
    }, function(e, t, r) {
      return "t:" + (e || "") + "c:" + (t || "") + "s:" + (r || "small")
    }),
    NodeToEmoji: function(e) {
      for (var t = [""], r = 0, n = e.firstChild; null !== n;) {
        if (1 === n.nodeType) switch (n.tagName) {
          case "P":
          case "PRE":
          case "DIV":
            t.push(""), r++;
            break;
          case "IMG":
            t[r] += n.getAttribute("alt");
            break;
          case "BR":
            t[r] += "\n"
        } else 3 === n.nodeType && (t[r] += n.nodeValue);
        if (n.hasChildNodes()) n = n.firstChild;
        else {
          for (; null === n.nextSibling;) {
            if (n = n.parentNode, n === e) return t.join("\n");
            switch (n.tagName) {
              case "P":
              case "PRE":
              case "DIV":
                t.push(""), r++
            }
          }
          n = n.nextSibling
        }
      }
      return t.join("\n")
    },
    emojiMap: $,
    skinToneEmojis: C,
    skinToneVariations: y
  };
  e.exports = A
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(28),
    i = r(166),
    a = r(170),
    s = r(106),
    d = r(43),
    u = r(82),
    c = r(159),
    l = c.HotKeys,
    f = {
      X: {
        LEFT: "left",
        RIGHT: "right"
      },
      Y: {
        TOP: "top",
        BOTTOM: "bottom"
      }
    },
    h = {
      DROPDOWN: "dropdown",
      DROPDOWN_MENU: "dropdown_menu",
      MENU: "menu",
      PICKER: "picker",
      EMOJI_PICKER: "emoji_picker"
    },
    p = n.createClass({
      displayName: "Menu",
      mixins: [s],
      propTypes: {
        children: n.PropTypes.node.isRequired,
        origin: n.PropTypes.shape({
          x: n.PropTypes.number,
          y: n.PropTypes.number
        }),
        type: n.PropTypes.oneOf(_.values(h)).isRequired,
        direction: n.PropTypes.shape({
          x: n.PropTypes.oneOf(_.values(f.X)),
          y: n.PropTypes.oneOf(_.values(f.Y))
        }).isRequired,
        flipOnRTL: n.PropTypes.bool,
        classes: n.PropTypes.string,
        onDefault: n.PropTypes.func
      },
      statics: {
        Direction: f,
        Type: h
      },
      getDefaultProps: function() {
        return {
          type: h.DROPDOWN,
          direction: {
            x: f.X.RIGHT,
            y: f.Y.BOTTOM
          }
        }
      },
      getInitialState: function() {
        return {
          hasKeyboard: !_.contains([h.MENU, h.EMOJI_PICKER], this.props.type),
          showShortcuts: !1,
          keyboard: !1,
          selected: void 0
        }
      },
      componentDidMount: function() {
        this.state.hasKeyboard && o.findDOMNode(this).focus()
      },
      onMouseMove: function(e) {
        o.findDOMNode(this).focus(), this.setState({
          keyboard: !1
        })
      },
      getStyle: function() {
        var e = this.props,
          t = {},
          r = e.direction.x,
          n = e.direction.y;
        this.props.flipOnRTL && l10n.isRTL() && (r = r === f.X.LEFT ? f.X.RIGHT : f.X.LEFT);
        var o = r === f.X.RIGHT ? f.X.LEFT : f.X.RIGHT,
          a = n === f.Y.TOP ? f.Y.BOTTOM : f.Y.TOP;
        return t[i.prefix("transformOrigin")] = a + " " + o, e.origin ? (r === f.X.RIGHT ? t.left = e.origin.x : t.right = window.innerWidth - e.origin.x, n === f.Y.BOTTOM ? t.top = e.origin.y : t.bottom = window.innerHeight - e.origin.y, _.merge(t, e.style)) : _.merge(t, e.style)
      },
      onKeyDown: function(e) {
        e.metaKey && this.setState({
          showShortcuts: !0
        })
      },
      onKeyUp: function(e) {
        this.state.showShortcuts && !e.metaKey && this.setState({
          showShortcuts: !1
        })
      },
      up: function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = _.toArray(this.props.children),
          r = a.ring(_.indexOf(t, this.state.selected) - 1, t),
          n = t[r];
        o.findDOMNode(this.refs.list).children[r].focus(), this.setState({
          keyboard: !0,
          selected: n
        })
      },
      down: function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = _.toArray(this.props.children),
          r = a.ring(_.indexOf(t, this.state.selected) + 1, t),
          n = t[r];
        o.findDOMNode(this.refs.list).children[r].focus(), this.setState({
          keyboard: !0,
          selected: n
        })
      },
      close: function(e) {
        e.preventDefault(), u.pop()
      },
      "default": function(e) {
        this.props.onDefault && (l.flashFocus = Date.now(), u.pop(u.MENU), this.props.onDefault(e))
      },
      render: function() {
        var e = this.props,
          t = d(e.classes, {
            dropdown: e.type === h.DROPDOWN,
            "dropdown dropdown-right": e.type === h.DROPDOWN_MENU,
            "menu menu-icons": e.type === h.MENU,
            "dropdown-picker k context-menu": e.type === h.PICKER,
            "dropdown dropdown-emoji": e.type === h.EMOJI_PICKER,
            inverse: (e.type === h.PICKER || e.type === h.EMOJI_PICKER) && e.direction.x === f.X.LEFT,
            "inverse-vertical": e.type === h.EMOJI_PICKER && e.direction.y === f.Y.TOP,
            "shortcut-active": this.state.showShortcuts
          }),
          r = this.state.hasKeyboard ? n.createElement("ul", {
            ref: "list"
          }, e.children) : e.children,
          o = _.contains([h.PICKER, h.EMOJI_PICKER], e.type) ? n.createElement("div", {
            className: "nib"
          }) : null;
        if (this.state.hasKeyboard) {
          var i = {
            up: this.up,
            down: this.down,
            enter: this["default"]
          };
          return i[l10n.LR("left", "right")] = this.close, i[l10n.LR("right", "left")] = this["default"], n.createElement(l, {
            handlers: i,
            className: t,
            style: this.getStyle(),
            onMouseMove: this.state.keyboard ? this.onMouseMove : null
          }, r, o)
        }
        return n.createElement("div", {
          className: t,
          style: this.getStyle()
        }, r, o)
      }
    });
  e.exports = p
}, , function(e, t, r) {
  "use strict";
  var n = r(447)(!0);
  r(189)(String, "String", function(e) {
    this._t = String(e), this._i = 0
  }, function() {
    var e, t = this._t,
      r = this._i;
    return r >= t.length ? {
      value: void 0,
      done: !0
    } : (e = n(t, r), this._i += e.length, {
      value: e,
      done: !1
    })
  })
}, function(e, t) {
  "use strict";
  var r = [].slice,
    n = {},
    o = ["first", "last", "partition", "contains", "toArray", "invoke", "pluck", "filter", "any"];
  _.each(o, function(e) {
    if (!_[e]) throw new Error("attempt to reference non-existant _ method: " + e);
    n[e] = function() {
      var t = r.call(arguments);
      return t.unshift(this.models), _[e].apply(_, t)
    }
  });
  var i = ["groupBy", "countBy", "sortBy", "indexBy"];
  _.each(i, function(e) {
    if (!_[e]) throw new Error("attempt to reference non-existant _ method: " + e);
    n[e] = function(t, r) {
      var n = _.isFunction(t) ? t : function(e) {
        return e.get ? e.get(t) : e[t]
      };
      return _[e](this.models, n, r)
    }
  }), n.where = function(e, t) {
    return _.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
      var r;
      for (var n in e)
        if (r = t.get ? t.get(n) : t[n], e[n] !== r) return !1;
      return !0
    })
  }, n.findWhere = function(e) {
    return this.where(e, !0)
  }, e.exports = n
}, function(e, t, r) {
  "use strict";
  var n = r(62),
    o = n.extend({
      Collection: "Status",
      props: {
        id: "string",
        status: "string"
      },
      session: {
        stale: ["boolean", !1, !0]
      }
    });
  e.exports = o
}, function(e, t) {
  "use strict";
  e.exports = _.memoize(function(e) {
    return CryptoJS.MD5(e).toString(CryptoJS.enc.Base64)
  })
}, function(e, t, r) {
  var n = r(173),
    o = r(23)("iterator"),
    i = r(66);
  e.exports = r(19).getIteratorMethod = function(e) {
    return void 0 != e ? e[o] || e["@@iterator"] || i[n(e)] : void 0
  }
}, function(e, t, r) {
  r(449);
  var n = r(66);
  n.NodeList = n.HTMLCollection = n.Array
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(6),
    s = r(7),
    d = r(1),
    u = r(35),
    c = r(62),
    l = r(83),
    f = r(21),
    h = r(61),
    p = r(22),
    g = r(164),
    _ = r(8),
    m = c.extend({
      Collection: "ProfilePicThumb",
      props: {
        id: "string",
        tag: "string",
        raw: "string"
      },
      session: {
        stale: ["boolean", !1, !0]
      },
      derived: {
        img: {
          deps: ["tag", "raw", "stale"],
          fn: function() {
            if (this.raw) return "data:image/jpeg;base64," + this.raw;
            if (!this.tag && this.stale) return null;
            if (this.tag) return h.build(s.PP_URL, {
              t: "s",
              u: this.id,
              i: this.tag
            })
          }
        },
        imgFull: {
          deps: ["tag", "raw", "stale"],
          fn: function() {
            if ((this.raw || !this.tag) && this.stale) return null;
            if (!this.raw && this.tag) return h.build(s.PP_URL, {
              t: "l",
              u: this.id,
              i: this.tag
            })
          }
        }
      },
      canSet: function() {
        return p.isGroup(this.id) && l.supportsFeature(l.F.GROUP_SET_PIC) ? !0 : !(!p.isUser(this.id) || this.id !== Store.Conn.me || !l.supportsFeature(l.F.SET_PROFILE_PIC))
      },
      setPicture: function(e, t) {
        if (!this.canSet()) return i["default"].reject(new f.ActionError);
        var r = u.sendSetPicture(this.id, e, t),
          n = this.id === Store.Conn.me ? l10n.t("action_profile_setting") : l10n.t("action_group_icon_setting"),
          o = r.bind(this)["catch"](function(e) {
            throw d.error("models:ProfilePicThumb:setPicture dropped")(e), this.id === Store.Conn.me ? l10n.t("action_profile_set_failed") : l10n.t("action_group_icon_set_failed")
          }).then(function(e) {
            if (200 === e.status) return this.id === Store.Conn.me ? l10n.t("action_profile_set") : l10n.t("action_group_icon_set");
            if (e.status >= 400) throw this.id === Store.Conn.me ? l10n.t("action_profile_set_failed") : l10n.t("action_group_icon_set_failed")
          });
        return _.openToast(a.createElement(g, {
          id: g.genId(),
          pendingText: n,
          actionText: o,
          retry: this.setPicture.bind(this, e, t)
        })), r.bind(this).then(function(e) {
          200 !== e.status || e._duplicate || (this.tag = e.tag)
        })
      },
      canDelete: function() {
        return p.isGroup(this.id) && l.supportsFeature(l.F.GROUP_SET_PIC) && this.tag ? !0 : !!(p.isUser(this.id) && this.id === Store.Conn.me && l.supportsFeature(l.F.SET_PROFILE_PIC) && this.tag)
      },
      deletePicture: function() {
        if (!this.canDelete()) return i["default"].reject(new f.ActionError);
        var e = u.deletePicture(this.id),
          t = this.id === Store.Conn.me ? l10n.t("action_profile_removing") : l10n.t("action_group_icon_removing"),
          r = e.bind(this)["catch"](function(e) {
            throw d.error("models:ProfilePicThumb:deletePicture dropped")(e), this.id === Store.Conn.me ? l10n.t("action_profile_remove_failed") : l10n.t("action_group_icon_remove_failed")
          }).then(function(e) {
            if (200 === e.status) return this.id === Store.Conn.me ? l10n.t("action_profile_removed") : l10n.t("action_group_icon_removed");
            if (e.status >= 400) throw this.id === Store.Conn.me ? l10n.t("action_profile_remove_failed") : l10n.t("action_group_icon_remove_failed")
          });
        return _.openToast(a.createElement(g, {
          id: g.genId(),
          pendingText: t,
          actionText: r,
          retry: this.deletePicture.bind(this)
        })), e.bind(this).then(function(e) {
          200 !== e.status || e._duplicate || (this.tag = void 0)
        })
      }
    });
  e.exports = m
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return "string" == typeof e ? e : CryptoJS.lib.WordArray.create(new Uint8Array(e))
  }

  function o(e, t) {
    return d.decode(e.toString(CryptoJS.enc.Base64), !!t)
  }

  function i(e) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? new Uint8Array(u) : arguments[1],
      r = arguments[2];
    return o(CryptoJS.HmacSHA256(n(e), n(t)), r)
  }

  function a(e, t, r, i) {
    if (0 > r || r > 255 * u) return null;
    var a = n(e),
      s = n(t),
      d = Math.ceil(r / u),
      c = new Array(d + 1);
    c[0] = "";
    for (var l = new Uint8Array(1), f = 0; d > f; f++) {
      l[0] = f + 1;
      var h = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, a);
      h.update(c[f]), h.update(s), h.update(n(l)), c[f + 1] = h.finalize()
    }
    for (var p = new Uint8Array(r), f = 0, g = 0; d > f; f++)
      for (var _ = o(c[f + 1]), m = 0; u > m && r > g; m++, g++) p[g] = _[m];
    return i ? Array.prototype.slice.call(p) : p
  }

  function s(e, t, r, n, o) {
    return a(i(e, t), r, n, o)
  }
  var d = r(172),
    u = 32;
  e.exports = {
    extract: i,
    expand: a,
    extractAndExpand: s
  }
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(81),
    i = n(o),
    a = r(167),
    s = n(a),
    d = r(168),
    u = n(d),
    c = r(418),
    l = n(c),
    f = r(416),
    h = n(f),
    p = r(417),
    g = n(p),
    m = r(1),
    v = r(174),
    y = r(7),
    b = r(356),
    w = r(402),
    E = r(61),
    S = r(8),
    N = function(e) {
      function t() {
        var e;
        (0, s["default"])(this, t);
        for (var r = arguments.length, n = Array(r), o = 0; r > o; o++) n[o] = arguments[o];
        return (0, l["default"])(this, (e = (0, i["default"])(t)).call.apply(e, [this].concat(n)))
      }
      return (0, g["default"])(t, e), (0, u["default"])(t, [{
        key: "setTitleAndIcon",
        value: function(e) {
          switch (e) {
            case -1:
            case 0:
              document.title = l10n.t("whatsapp_web");
              break;
            default:
              document.title = "(" + l10n.n(e) + ") " + l10n.t("whatsapp_web")
          }
          this.setIcon(e)
        }
      }, {
        key: "setIcon",
        value: function(e) {
          var t;
          t = -1 === e ? "favicon-error2" : 0 === e ? "favicon" : 10 > e ? "f0" + e : 100 > e ? "f" + e : "f00";
          var r = "/img/favicon/1x/" + t + ".png",
            n = "/img/favicon/2x/" + t + ".png",
            o = {
              low: {
                "default": r
              },
              high: {
                "default": n
              },
              onSet: function(e) {
                var t = document.getElementById("favicon");
                t || (t = document.createElement("link"), t.id = "favicon", t.rel = "shortcut icon", document.head.appendChild(t)), t.href = e, t.type = "image/png"
              }
            };
          v.loadAsset(o, t).then(function() {
            m.log("Favicon updated: " + t)()
          })
        }
      }, {
        key: "showNotification",
        value: function(e, r, n, o, a, s) {
          var d, u = this;
          try {
            d = new window.Notification(b.normalizeEmoji(n), {
              body: b.normalizeEmoji(o),
              tag: s ? r : e,
              icon: E.relToAbs(a),
              dir: "auto",
              lang: l10n.lng(),
              silent: !0
            })
          } catch (c) {
            window.Notification = void 0
          }
          if (!d) return void m.log("notificationManager:showDesktopNotification: could not create Notification")();
          (0, h["default"])((0, i["default"])(t.prototype), "showNotification", this).call(this, e, r, d);
          var l = function f() {
            window.removeEventListener("unload", f), u.closeNotification(r)
          };
          d.onclick = function() {
            window.focus(), Store.Chat.find(e).then(function(e) {
              S.openChat(e, void 0, !0)
            }), l()
          }, d.onclose = l, d.onshow = function() {
            _.delay(l, s ? y.CALL_NOTIFICATION_TIMEOUT : y.NOTIFICATION_TIMEOUT)
          }, _.delay(l, s ? y.CALL_NOTIFICATION_TIMEOUT : 5 * y.NOTIFICATION_TIMEOUT), window.addEventListener("unload", l)
        }
      }]), t
    }(w);
  e.exports = new N
}, function(e, t, r) {
  var n = r(66),
    o = r(23)("iterator"),
    i = Array.prototype;
  e.exports = function(e) {
    return void 0 !== e && (n.Array === e || i[o] === e)
  }
}, function(e, t, r) {
  var n = r(48);
  e.exports = function(e, t, r, o) {
    try {
      return o ? t(n(r)[0], r[1]) : t(r)
    } catch (i) {
      var a = e["return"];
      throw void 0 !== a && n(a.call(e)), i
    }
  }
}, function(e, t, r) {
  var n = r(23)("iterator"),
    o = !1;
  try {
    var i = [7][n]();
    i["return"] = function() {
      o = !0
    }, Array.from(i, function() {
      throw 2
    })
  } catch (a) {}
  e.exports = function(e, t) {
    if (!t && !o) return !1;
    var r = !1;
    try {
      var i = [7],
        a = i[n]();
      a.next = function() {
        r = !0
      }, i[n] = function() {
        return a
      }, e(i)
    } catch (s) {}
    return r
  }
}, function(e, t, r) {
  var n = r(192),
    o = Math.min;
  e.exports = function(e) {
    return e > 0 ? o(n(e), 9007199254740991) : 0
  }
}, , function(e, t, r) {
  var n, o;
  (function(e) {
    /**
     * @license Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
     * Released under the Apache License, Version 2.0
     * Derived from goog.math.Long from the Closure Library
     * see: https://github.com/dcodeIO/Long.js for details
     */
    ! function(i) {
      "use strict";
      var a = function(e, t, r) {
          e && "object" == typeof e && (t = e.high, r = e.unsigned, e = e.low), this.low = 0 | e, this.high = 0 | t, this.unsigned = !!r
        },
        s = {},
        d = {};
      a.fromInt = function(e, t) {
        var r, n;
        return t ? (e >>>= 0, e >= 0 && 256 > e && (n = d[e]) ? n : (r = new a(e, 0 > (0 | e) ? -1 : 0, !0), e >= 0 && 256 > e && (d[e] = r), r)) : (e = 0 | e, e >= -128 && 128 > e && (n = s[e]) ? n : (r = new a(e, 0 > e ? -1 : 0, !1), e >= -128 && 128 > e && (s[e] = r), r))
      }, a.fromNumber = function(e, t) {
        return t = !!t, isNaN(e) || !isFinite(e) ? a.ZERO : !t && -f >= e ? a.MIN_SIGNED_VALUE : t && 0 >= e ? a.MIN_UNSIGNED_VALUE : !t && e + 1 >= f ? a.MAX_SIGNED_VALUE : t && e >= l ? a.MAX_UNSIGNED_VALUE : 0 > e ? a.fromNumber(-e, !1).negate() : new a(e % c | 0, e / c | 0, t)
      }, a.fromBits = function(e, t, r) {
        return new a(e, t, r)
      }, a.from28Bits = function(e, t, r, n) {
        return a.fromBits(e | t << 28, t >>> 4 | r << 24, n)
      }, a.fromString = function(e, t, r) {
        if (0 == e.length) throw new Error("number format error: empty string");
        if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return a.ZERO;
        if ("number" == typeof t && (r = t, t = !1), r = r || 10, 2 > r || r > 36) throw new Error("radix out of range: " + r);
        if ("-" == e.charAt(0)) return a.fromString(e.substring(1), t, r).negate();
        if (e.indexOf("-") >= 0) throw new Error('number format error: interior "-" character: ' + e);
        for (var n = a.fromNumber(Math.pow(r, 8)), o = a.ZERO, i = 0; i < e.length; i += 8) {
          var s = Math.min(8, e.length - i),
            d = parseInt(e.substring(i, i + s), r);
          if (8 > s) {
            var u = a.fromNumber(Math.pow(r, s));
            o = o.multiply(u).add(a.fromNumber(d))
          } else o = o.multiply(n), o = o.add(a.fromNumber(d))
        }
        return o.unsigned = t, o
      };
      var u = 65536,
        c = u * u,
        l = c * c,
        f = l / 2,
        h = a.fromInt(1 << 24);
      a.ZERO = a.fromInt(0), a.UZERO = a.fromInt(0, !0), a.ONE = a.fromInt(1), a.UONE = a.fromInt(1, !0), a.NEG_ONE = a.fromInt(-1), a.MAX_SIGNED_VALUE = a.fromBits(-1, 2147483647, !1), a.MAX_UNSIGNED_VALUE = a.fromBits(-1, -1, !0), a.MAX_VALUE = a.MAX_SIGNED_VALUE, a.MIN_SIGNED_VALUE = a.fromBits(0, -2147483648, !1), a.MIN_UNSIGNED_VALUE = a.fromBits(0, 0, !0), a.MIN_VALUE = a.MIN_SIGNED_VALUE, a.prototype.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
      }, a.prototype.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * c + (this.low >>> 0) : this.high * c + (this.low >>> 0)
      }, a.prototype.toString = function(e) {
        if (e = e || 10, 2 > e || e > 36) throw new Error("radix out of range: " + e);
        if (this.isZero()) return "0";
        var t;
        if (this.isNegative()) {
          if (this.equals(a.MIN_SIGNED_VALUE)) {
            var r = a.fromNumber(e),
              n = this.div(r);
            return t = n.multiply(r).subtract(this), n.toString(e) + t.toInt().toString(e)
          }
          return "-" + this.negate().toString(e)
        }
        var o = a.fromNumber(Math.pow(e, 6));
        t = this;
        for (var i = "";;) {
          var s = t.div(o),
            d = t.subtract(s.multiply(o)).toInt(),
            u = d.toString(e);
          if (t = s, t.isZero()) return u + i;
          for (; u.length < 6;) u = "0" + u;
          i = "" + u + i
        }
      }, a.prototype.getHighBits = function() {
        return this.high
      }, a.prototype.getHighBitsUnsigned = function() {
        return this.high >>> 0
      }, a.prototype.getLowBits = function() {
        return this.low
      }, a.prototype.getLowBitsUnsigned = function() {
        return this.low >>> 0
      }, a.prototype.getNumBitsAbs = function() {
        if (this.isNegative()) return this.equals(a.MIN_SIGNED_VALUE) ? 64 : this.negate().getNumBitsAbs();
        for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--);
        return 0 != this.high ? t + 33 : t + 1
      }, a.prototype.isZero = function() {
        return 0 == this.high && 0 == this.low
      }, a.prototype.isNegative = function() {
        return !this.unsigned && this.high < 0
      }, a.prototype.isOdd = function() {
        return 1 == (1 & this.low)
      }, a.prototype.isEven = function() {
        return 0 == (1 & this.low)
      }, a.prototype.equals = function(e) {
        return this.unsigned != e.unsigned && this.high >>> 31 != e.high >>> 31 ? !1 : this.high == e.high && this.low == e.low
      }, a.prototype.notEquals = function(e) {
        return !this.equals(e)
      }, a.prototype.lessThan = function(e) {
        return this.compare(e) < 0
      }, a.prototype.lessThanOrEqual = function(e) {
        return this.compare(e) <= 0
      }, a.prototype.greaterThan = function(e) {
        return this.compare(e) > 0
      }, a.prototype.greaterThanOrEqual = function(e) {
        return this.compare(e) >= 0
      }, a.prototype.compare = function(e) {
        if (this.equals(e)) return 0;
        var t = this.isNegative(),
          r = e.isNegative();
        return t && !r ? -1 : !t && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high == this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.subtract(e).isNegative() ? -1 : 1
      }, a.prototype.negate = function() {
        return !this.unsigned && this.equals(a.MIN_SIGNED_VALUE) ? a.MIN_SIGNED_VALUE : this.not().add(a.ONE)
      }, a.prototype.add = function(e) {
        var t = this.high >>> 16,
          r = 65535 & this.high,
          n = this.low >>> 16,
          o = 65535 & this.low,
          i = e.high >>> 16,
          s = 65535 & e.high,
          d = e.low >>> 16,
          u = 65535 & e.low,
          c = 0,
          l = 0,
          f = 0,
          h = 0;
        return h += o + u, f += h >>> 16, h &= 65535, f += n + d, l += f >>> 16, f &= 65535, l += r + s, c += l >>> 16, l &= 65535, c += t + i, c &= 65535, a.fromBits(f << 16 | h, c << 16 | l, this.unsigned)
      }, a.prototype.subtract = function(e) {
        return this.add(e.negate())
      }, a.prototype.multiply = function(e) {
        if (this.isZero()) return a.ZERO;
        if (e.isZero()) return a.ZERO;
        if (this.equals(a.MIN_VALUE)) return e.isOdd() ? a.MIN_VALUE : a.ZERO;
        if (e.equals(a.MIN_VALUE)) return this.isOdd() ? a.MIN_VALUE : a.ZERO;
        if (this.isNegative()) return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
        if (e.isNegative()) return this.multiply(e.negate()).negate();
        if (this.lessThan(h) && e.lessThan(h)) return a.fromNumber(this.toNumber() * e.toNumber(), this.unsigned);
        var t = this.high >>> 16,
          r = 65535 & this.high,
          n = this.low >>> 16,
          o = 65535 & this.low,
          i = e.high >>> 16,
          s = 65535 & e.high,
          d = e.low >>> 16,
          u = 65535 & e.low,
          c = 0,
          l = 0,
          f = 0,
          p = 0;
        return p += o * u, f += p >>> 16, p &= 65535, f += n * u, l += f >>> 16, f &= 65535, f += o * d, l += f >>> 16, f &= 65535, l += r * u, c += l >>> 16, l &= 65535, l += n * d, c += l >>> 16, l &= 65535, l += o * s, c += l >>> 16, l &= 65535, c += t * u + r * d + n * s + o * i, c &= 65535, a.fromBits(f << 16 | p, c << 16 | l, this.unsigned)
      }, a.prototype.div = function(e) {
        if (e.isZero()) throw new Error("division by zero");
        if (this.isZero()) return this.unsigned ? a.UZERO : a.ZERO;
        var t, r, n;
        if (this.equals(a.MIN_SIGNED_VALUE)) {
          if (e.equals(a.ONE) || e.equals(a.NEG_ONE)) return a.MIN_SIGNED_VALUE;
          if (e.equals(a.MIN_SIGNED_VALUE)) return a.ONE;
          var o = this.shiftRight(1);
          return t = o.div(e).shiftLeft(1), t.equals(a.ZERO) ? e.isNegative() ? a.ONE : a.NEG_ONE : (r = this.subtract(e.multiply(t)), n = t.add(r.div(e)))
        }
        if (e.equals(a.MIN_SIGNED_VALUE)) return this.unsigned ? a.UZERO : a.ZERO;
        if (this.isNegative()) return e.isNegative() ? this.negate().div(e.negate()) : this.negate().div(e).negate();
        if (e.isNegative()) return this.div(e.negate()).negate();
        for (n = a.ZERO, r = this; r.greaterThanOrEqual(e);) {
          t = Math.max(1, Math.floor(r.toNumber() / e.toNumber()));
          for (var i = Math.ceil(Math.log(t) / Math.LN2), s = 48 >= i ? 1 : Math.pow(2, i - 48), d = a.fromNumber(t, this.unsigned), u = d.multiply(e); u.isNegative() || u.greaterThan(r);) t -= s, d = a.fromNumber(t, this.unsigned), u = d.multiply(e);
          d.isZero() && (d = a.ONE), n = n.add(d), r = r.subtract(u)
        }
        return n
      }, a.prototype.modulo = function(e) {
        return this.subtract(this.div(e).multiply(e))
      }, a.prototype.not = function() {
        return a.fromBits(~this.low, ~this.high, this.unsigned)
      }, a.prototype.and = function(e) {
        return a.fromBits(this.low & e.low, this.high & e.high, this.unsigned)
      }, a.prototype.or = function(e) {
        return a.fromBits(this.low | e.low, this.high | e.high, this.unsigned)
      }, a.prototype.xor = function(e) {
        return a.fromBits(this.low ^ e.low, this.high ^ e.high, this.unsigned)
      }, a.prototype.shiftLeft = function(e) {
        if (e &= 63, 0 == e) return this;
        var t = this.low;
        if (32 > e) {
          var r = this.high;
          return a.fromBits(t << e, r << e | t >>> 32 - e, this.unsigned)
        }
        return a.fromBits(0, t << e - 32, this.unsigned)
      }, a.prototype.shiftRight = function(e) {
        if (e &= 63, 0 == e) return this;
        var t = this.high;
        if (32 > e) {
          var r = this.low;
          return a.fromBits(r >>> e | t << 32 - e, t >> e, this.unsigned)
        }
        return a.fromBits(t >> e - 32, t >= 0 ? 0 : -1, this.unsigned)
      }, a.prototype.shiftRightUnsigned = function(e) {
        if (e &= 63, 0 == e) return this;
        var t = this.high;
        if (32 > e) {
          var r = this.low;
          return a.fromBits(r >>> e | t << 32 - e, t >>> e, this.unsigned)
        }
        return 32 == e ? a.fromBits(t, 0, this.unsigned) : a.fromBits(t >>> e - 32, 0, this.unsigned)
      }, a.prototype.toSigned = function() {
        var e = this.clone();
        return e.unsigned = !1, e
      }, a.prototype.toUnsigned = function() {
        var e = this.clone();
        return e.unsigned = !0, e
      }, a.prototype.clone = function() {
        return new a(this.low, this.high, this.unsigned)
      }, "undefined" != typeof e && e.exports ? e.exports = a : r(628).amd ? (n = [], o = function() {
        return a
      }.apply(t, n), !(void 0 !== o && (e.exports = o))) : (i.dcodeIO || (i.dcodeIO = {}), i.dcodeIO.Long = a)
    }(this)
  }).call(t, r(60)(e))
}, function(e, t, r) {
  function n(e) {
    return r(o(e))
  }

  function o(e) {
    var t = i[e];
    if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
    return t
  }
  var i = {
    "./af/translation.json": 631,
    "./ak/translation.json": 632,
    "./ar/translation.json": 633,
    "./az/translation.json": 634,
    "./be/translation.json": 635,
    "./bg/translation.json": 636,
    "./bn/translation.json": 637,
    "./bs/translation.json": 638,
    "./ca/translation.json": 639,
    "./cs/translation.json": 640,
    "./da/translation.json": 641,
    "./de/translation.json": 642,
    "./el/translation.json": 643,
    "./en/translation.json": 644,
    "./es/translation.json": 645,
    "./et/translation.json": 646,
    "./eu/translation.json": 647,
    "./fa/translation.json": 648,
    "./fi/translation.json": 649,
    "./fil/translation.json": 650,
    "./fr/translation.json": 651,
    "./gl/translation.json": 652,
    "./gu/translation.json": 653,
    "./ha/translation.json": 654,
    "./he/translation.json": 655,
    "./hi/translation.json": 656,
    "./hr/translation.json": 657,
    "./hu/translation.json": 658,
    "./id/translation.json": 659,
    "./is/translation.json": 660,
    "./it/translation.json": 661,
    "./ja/translation.json": 662,
    "./ka/translation.json": 663,
    "./kk/translation.json": 664,
    "./km/translation.json": 665,
    "./kn/translation.json": 666,
    "./ko/translation.json": 667,
    "./ky/translation.json": 668,
    "./lo/translation.json": 669,
    "./lt/translation.json": 670,
    "./lv/translation.json": 671,
    "./mk/translation.json": 672,
    "./ml/translation.json": 673,
    "./mr/translation.json": 674,
    "./ms/translation.json": 675,
    "./my/translation.json": 676,
    "./nb/translation.json": 677,
    "./ne/translation.json": 678,
    "./nl/translation.json": 679,
    "./nn/translation.json": 680,
    "./pa/translation.json": 681,
    "./pl/translation.json": 682,
    "./ps/translation.json": 683,
    "./pt-BR/translation.json": 684,
    "./pt-ZZ/translation.json": 685,
    "./pt/translation.json": 686,
    "./ro/translation.json": 687,
    "./ru/translation.json": 688,
    "./si/translation.json": 689,
    "./sk/translation.json": 690,
    "./sl/translation.json": 691,
    "./sq/translation.json": 692,
    "./sr/translation.json": 693,
    "./sv/translation.json": 694,
    "./sw/translation.json": 695,
    "./ta/translation.json": 696,
    "./te/translation.json": 697,
    "./th/translation.json": 698,
    "./tr/translation.json": 699,
    "./uk/translation.json": 700,
    "./ur/translation.json": 701,
    "./uz/translation.json": 702,
    "./vi/translation.json": 703,
    "./zh-CN/translation.json": 704,
    "./zh-TW/translation.json": 705,
    "./zu/translation.json": 706
  };
  n.keys = function() {
    return Object.keys(i)
  }, n.resolve = o, e.exports = n, n.id = 374
}, , , function(e, t, r) {
  "use strict";
  var n = r(1),
    o = r(55),
    i = r(9),
    a = {
      getKeys: function() {
        var e = o.get().encKey.toString(CryptoJS.enc.Base64),
          t = o.get().macKey.toString(CryptoJS.enc.Base64);
        return {
          enc: CryptoJS.enc.Base64.parse(e),
          mac: CryptoJS.enc.Base64.parse(t)
        }
      },
      encrypt: function(e) {
        var t = CryptoJS.lib.WordArray.create(e),
          r = new Uint32Array(4),
          n = this.getKeys();
        window.crypto.getRandomValues(r);
        var o = CryptoJS.AES.encrypt(t, n.enc, {
            iv: CryptoJS.lib.WordArray.create(r),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }),
          a = o.iv.concat(o.ciphertext),
          s = CryptoJS.HmacSHA256(a, n.mac),
          d = s.concat(a);
        return i.fromBase64(d.toString(CryptoJS.enc.Base64)).toBuffer()
      },
      decrypt: function(e) {
        var t = i.wrap(e),
          r = t.slice(t.offset, t.offset + 32).toBase64(),
          o = t.slice(t.offset + 32).toBuffer(),
          a = this.getKeys(),
          s = CryptoJS.lib.WordArray.create(o),
          d = CryptoJS.HmacSHA256(s, a.mac).toString(CryptoJS.enc.Base64);
        if (r !== d) throw n.error("bp:01:decrypt hmac dont match " + r + " " + d)(), new Error("hmac mismatch");
        var u = t.slice(t.offset + 32, t.offset + 48).toBuffer(),
          c = t.slice(t.offset + 48).toBuffer(),
          l = CryptoJS.AES.decrypt({
            ciphertext: CryptoJS.lib.WordArray.create(c),
            salt: void 0
          }, a.enc, {
            iv: CryptoJS.lib.WordArray.create(u),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });
        return i.fromBase64(l.toString(CryptoJS.enc.Base64)).toBuffer()
      }
    };
  e.exports = a
}, function(e, t) {
  "use strict";
  var r = {
    singleByte: [void 0, void 0, void 0, "200", "400", "404", "500", "501", "502", "action", "add", "after", "archive", "author", "available", "battery", "before", "body", "broadcast", "chat", "clear", "code", "composing", "contacts", "count", "create", "debug", "delete", "demote", "duplicate", "encoding", "error", "false", "filehash", "from", "g.us", "group", "groups_v2", "height", "id", "image", "in", "index", "invis", "item", "jid", "kind", "last", "leave", "live", "log", "media", "message", "mimetype", "missing", "modify", "name", "notification", "notify", "out", "owner", "participant", "paused", "picture", "played", "presence", "preview", "promote", "query", "raw", "read", "receipt", "received", "recipient", "recording", "relay", "remove", "response", "resume", "retry", "s.whatsapp.net", "seconds", "set", "size", "status", "subject", "subscribe", "t", "text", "to", "true", "type", "unarchive", "unavailable", "url", "user", "value", "web", "width", "mute", "read_only", "admin", "creator", "short", "update", "powersave"],
    doubleByte: []
  };
  e.exports = r
}, function(e, t, r) {
  "use strict";

  function n(e) {
    var t = !1,
      r = o.wrap(e, void 0, t);
    this.readByte = function() {
      return r.readUint8()
    }, this.readInt16 = function() {
      return r.readUint16()
    }, this.readInt20 = function() {
      var e = 15 & r.readUint8(),
        t = r.readUint8(),
        n = r.readUint8();
      return (e << 16) + (t << 8) + n
    }, this.readString = function(e) {
      return r.readString(e, o.METRICS_BYTES)
    }, this.readBytes = function(e) {
      var t = r.copy(r.offset, r.offset + e);
      return r.offset += e, t
    }, this.debugInfo = function() {
      return "offset: " + r.offset + " byte: " + r.readUint8(r.offset)
    }
  }
  var o = r(9);
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e, t) {
    if (!e) return "undefined";
    var r = o(e[1], t),
      n = i(e[2], t);
    return "<" + e[0] + r + (n ? ">\n" + n + "\n</" + e[0] + ">" : "/>")
  }

  function o(e, t) {
    if (e) {
      var r = "";
      for (var n in e) {
        var o = "string" == typeof e[n] ? t ? "..." : '"' + e[n] + '"' : e[n];
        r += " " + n + "=" + o
      }
      return r
    }
    return ""
  }

  function i(e, t) {
    return a.isByteBuffer(e) ? "<<bin:" + e.limit + ">>" : "string" == typeof e ? t ? "<<string:" + e.length + ">>" : e : _.isArray(e) ? e.map(_.partial(n, _, t)).join("\n") : void 0
  }
  var a = r(9),
    s = {
      tag: function(e) {
        return e && e[0]
      },
      attr: function(e, t) {
        return t && t[1] ? t[1][e] : void 0
      },
      attrs: function(e) {
        return e[1]
      },
      child: function d(e, t) {
        var r = t[2];
        if (_.isArray(r))
          for (var n = r.length, o = 0; n > o; o++) {
            var d = r[o];
            if (_.isArray(d) && d[0] === e) return d
          }
      },
      children: function(e) {
        return e && e[2]
      },
      dataStr: function(e) {
        if (!e) return "";
        var t = e[2];
        return "string" == typeof t ? t : a.isByteBuffer(t) ? t.readString(t.limit, a.METRICS_BYTES, 0).string : void 0
      },
      toString: n
    };
  e.exports = s
}, function(e, t, r) {
  "use strict";

  function n() {
    function e(e) {
      r++, n.push(e)
    }
    var t = !1,
      r = 0,
      n = [];
    this.pushInt16 = function(t) {
      if ("number" != typeof t) throw new Error("invalid int16");
      e((65280 & t) >> 8), e((255 & t) >> 0)
    }, this.pushInt20 = function(t) {
      if ("number" != typeof t) throw new Error("invalid int20");
      e((983040 & t) >> 16), e((65280 & t) >> 8), e((255 & t) >> 0)
    }, this.pushByte = function(t) {
      if ("number" != typeof t || 0 > t || t > 255) throw new Error("invalid byte value: " + t);
      e(t)
    }, this.pushBytes = function(e) {
      if (!o.isByteBuffer(e)) throw new Error("invalid byte buffer");
      r += e.limit, n.push(e)
    }, this.pushString = function(e) {
      if ("string" != typeof e) throw new Error("invalid string");
      r += o.calculateUTF8Bytes(e), n.push(e)
    }, this.toBuffer = function() {
      for (var e = new o(r, t), i = n.length, a = 0; i > a; a++) {
        var s = n[a];
        "string" == typeof s ? e.writeString(s) : o.isByteBuffer(s) ? (s.reset(), e.append(s)) : e.writeByte(s)
      }
      return e.reset(), e.toBuffer(!0)
    }
  }
  var o = r(9);
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e) {
    var t = e.singleByte,
      r = e.doubleByte;
    this.readNode = function(e) {
      var t = e.readByte(),
        r = this.readListSize(e, t);
      if (t = e.readByte(), t === o.STREAM_END) throw new Error("unexpected stream end " + e.debugInfo());
      var n = this.readString(e, t);
      if (0 === r || !n) throw new Error("invalid node. 0 list or empty tag" + e.debugInfo());
      var i = r - 2 + r % 2 >> 1,
        a = this.readAttributes(e, i);
      if (r % 2 === 1) return [n, a, void 0];
      var s;
      if (t = e.readByte(), this.isListTag(t)) s = this.readList(e, t);
      else if (t === o.BINARY_8) {
        var d = e.readByte();
        s = e.readBytes(d)
      } else if (t === o.BINARY_20) {
        var u = e.readInt20();
        s = e.readBytes(u)
      } else s = this.readString(t);
      return [n, a, s]
    }, this.isListTag = function(e) {
      return e === o.LIST_EMPTY || e === o.LIST_8 || e === o.LIST_16
    }, this.readListSize = function(e, t) {
      if (t === o.LIST_EMPTY) return 0;
      if (t === o.LIST_8) return e.readByte();
      if (t === o.LIST_16) return e.readInt16();
      throw new Error("invalid list size " + e.debugInfo())
    }, this.readString = function(e, t) {
      if (-1 === t) throw new Error("invalid start token readString" + e.debugInfo());
      if (t > 2 && 236 > t) {
        var r = this.getToken(t);
        return "s.whatsapp.net" === r && (r = "c.us"), r
      }
      switch (t) {
        case o.DICTIONARY_0:
        case o.DICTIONARY_1:
        case o.DICTIONARY_2:
        case o.DICTIONARY_3:
          var n = e.readByte();
          return this.getTokenDouble(t - o.DICTIONARY_0, n);
        case o.LIST_EMPTY:
          return;
        case o.BINARY_8:
          var i = e.readByte();
          return e.readString(i);
        case o.BINARY_20:
          var a = e.readInt20();
          return e.readString(a);
        case o.JID_PAIR:
          var s = this.readString(e, e.readByte()),
            d = this.readString(e, e.readByte());
          if ("undefined" != typeof s && "undefined" != typeof d) return s + "@" + d;
          if ("undefined" != typeof d) return d;
          throw new Error("invalid jid " + s + "," + d + " " + e.debugInfo());
        default:
          throw new Error("invalid string " + e.debugInfo())
      }
    }, this.getToken = function(e) {
      var r;
      if (e >= 0 && e < t.length && (r = t[e]), "undefined" == typeof r) throw new Error("invalid token " + e);
      return r
    }, this.getTokenDouble = function(e, t) {
      var n, o = 256 * e + t;
      if (o >= 0 && o < r.length && (n = r[o]), "undefined" == typeof n) throw new Error("invalid double byte token " + e + " " + t);
      return n
    }, this.readAttributes = function(e, t) {
      for (var r, n, o = t ? {} : void 0, i = 0; t > i; i++) r = this.readString(e, e.readByte()), n = this.readString(e, e.readByte()), o[r] = n;
      return o
    }, this.readList = function(e, t) {
      for (var r = [], n = this.readListSize(e, t), o = 0; n > o; o++) r.push(this.readNode(e));
      return r
    }
  }
  var o = r(175);
  e.exports = n
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e) {
    var t, r = {};
    for (t = 0; t < e.singleByte.length; t++) e.singleByte[t] && (r[e.singleByte[t]] = t);
    for (t = 0; t < e.doubleByte.length; t++) e.doubleByte[t] && (r[e.doubleByte[t]] = t + d.SINGLE_BYTE_MAX);
    this.writeNode = function(e, t) {
      if (t) {
        if (3 !== t.length) throw new Error("invalid node");
        var r = t[1] ? 2 * (0, a["default"])(t[1]).filter(function(e) {
          return !!t[1][e]
        }).length : 0;
        this.writeListStart(e, 1 + r + (t[2] ? 1 : 0)), this.writeString(e, t[0]), this.writeAttributes(e, t[1]), this.writeChildren(e, t[2])
      }
    }, this.writeString = function(e, t) {
      if ("string" != typeof t) throw new Error("invalid string");
      var n, o, i = r[t];
      if ("undefined" == typeof i) {
        var a = t.indexOf("@");
        if (1 > a) this.writeStringRaw(e, t);
        else {
          var s = t.substring(0, a),
            u = t.substring(a + 1);
          this.writeJid(e, s, u)
        }
      } else {
        if (i < d.SINGLE_BYTE_MAX) this.writeToken(e, i);
        else {
          var c = i - d.SINGLE_BYTE_MAX,
            l = c >> 8;
          switch (o = c % 256, l) {
            case 0:
              n = d.DICTIONARY_0;
              break;
            case 1:
              n = d.DICTIONARY_1;
              break;
            case 2:
              n = d.DICTIONARY_2;
              break;
            case 3:
              n = d.DICTIONARY_3;
              break;
            default:
              throw new Error("double byte dictionary token out of range: " + t + " " + i)
          }
        }
        this.writeToken(e, n), this.writeToken(e, o)
      }
    }, this.writeStringRaw = function(e, t) {
      var r = s.calculateUTF8Bytes(t);
      r >= 256 ? (e.pushByte(d.BINARY_20), e.pushInt20(r)) : (e.pushByte(d.BINARY_8), e.pushByte(r)), e.pushString(t)
    }, this.writeJid = function(e, t, r) {
      e.pushByte(d.JID_PAIR), t ? this.writeString(e, t) : this.writeToken(e, d.LIST_EMPTY), "c.us" === r && (r = "s.whatsapp.net"), this.writeString(e, r)
    }, this.writeToken = function(e, t) {
      if (245 > t) e.pushByte(t);
      else if (500 >= t) throw new Error("invalid token")
    }, this.writeAttributes = function(e, t) {
      if (t)
        for (var r in t) t[r] && (this.writeString(e, r), this.writeString(e, t[r]))
    }, this.writeChildren = function(e, t) {
      var r;
      if (t)
        if ("string" == typeof t) this.writeString(e, t);
        else if (s.isByteBuffer(t)) r = t.limit, r >= 256 ? (e.pushByte(d.BINARY_20), e.pushInt20(r)) : (e.pushByte(d.BINARY_8), e.pushByte(r)), e.pushBytes(t);
      else {
        if (!_.isArray(t)) throw new Error("invalid children");
        r = t.length, this.writeListStart(e, r);
        for (var n = 0; r > n; n++) this.writeNode(e, t[n])
      }
    }, this.writeListStart = function(e, t) {
      0 === t ? e.pushByte(d.LIST_EMPTY) : 256 > t ? (e.pushByte(d.LIST_8), e.pushByte(t)) : (e.pushByte(d.LIST_16), e.pushInt16(t))
    }
  }
  var i = r(68),
    a = n(i),
    s = r(9),
    d = r(175);
  e.exports = o
}, function(e, t) {
  "use strict";
  var r = {
    singleByte: [void 0, void 0, void 0, "200", "400", "404", "500", "501", "502", "action", "add", "after", "archive", "author", "available", "battery", "before", "body", "broadcast", "chat", "clear", "code", "composing", "contacts", "count", "create", "debug", "delete", "demote", "duplicate", "encoding", "error", "false", "filehash", "from", "g.us", "group", "groups_v2", "height", "id", "image", "in", "index", "invis", "item", "jid", "kind", "last", "leave", "live", "log", "media", "message", "mimetype", "missing", "modify", "name", "notification", "notify", "out", "owner", "participant", "paused", "picture", "played", "presence", "preview", "promote", "query", "raw", "read", "receipt", "received", "recipient", "recording", "relay", "remove", "response", "resume", "retry", "s.whatsapp.net", "seconds", "set", "size", "status", "subject", "subscribe", "t", "text", "to", "true", "type", "unarchive", "unavailable", "url", "user", "value", "web", "width", "mute", "read_only", "admin", "creator", "short", "update", "powersave"],
    doubleByte: [],
    nibbleEncode: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      "-": 10,
      ".": 11,
      "\x00": 15
    },
    nibbleDecode: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "-",
      11: ".",
      15: "\x00"
    }
  };
  e.exports = r
}, function(e, t) {
  "use strict";
  var r = {
    singleByte: [void 0, void 0, void 0, "200", "400", "404", "500", "501", "502", "action", "add", "after", "archive", "author", "available", "battery", "before", "body", "broadcast", "chat", "clear", "code", "composing", "contacts", "count", "create", "debug", "delete", "demote", "duplicate", "encoding", "error", "false", "filehash", "from", "g.us", "group", "groups_v2", "height", "id", "image", "in", "index", "invis", "item", "jid", "kind", "last", "leave", "live", "log", "media", "message", "mimetype", "missing", "modify", "name", "notification", "notify", "out", "owner", "participant", "paused", "picture", "played", "presence", "preview", "promote", "query", "raw", "read", "receipt", "received", "recipient", "recording", "relay", "remove", "response", "resume", "retry", "s.whatsapp.net", "seconds", "set", "size", "status", "subject", "subscribe", "t", "text", "to", "true", "type", "unarchive", "unavailable", "url", "user", "value", "web", "width", "mute", "read_only", "admin", "creator", "short", "update", "powersave", "checksum", "epoch", "block", "previous", "409", "replaced", "reason", "spam", "modify_tag"],
    doubleByte: [],
    nibbleEncode: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      "-": 10,
      ".": 11,
      "\x00": 15
    },
    nibbleDecode: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "-",
      11: ".",
      15: "\x00"
    }
  };
  e.exports = r
}, function(e, t) {
  "use strict";
  var r = {
    singleByte: [void 0, void 0, void 0, "200", "400", "404", "500", "501", "502", "action", "add", "after", "archive", "author", "available", "battery", "before", "body", "broadcast", "chat", "clear", "code", "composing", "contacts", "count", "create", "debug", "delete", "demote", "duplicate", "encoding", "error", "false", "filehash", "from", "g.us", "group", "groups_v2", "height", "id", "image", "in", "index", "invis", "item", "jid", "kind", "last", "leave", "live", "log", "media", "message", "mimetype", "missing", "modify", "name", "notification", "notify", "out", "owner", "participant", "paused", "picture", "played", "presence", "preview", "promote", "query", "raw", "read", "receipt", "received", "recipient", "recording", "relay", "remove", "response", "resume", "retry", "s.whatsapp.net", "seconds", "set", "size", "status", "subject", "subscribe", "t", "text", "to", "true", "type", "unarchive", "unavailable", "url", "user", "value", "web", "width", "mute", "read_only", "admin", "creator", "short", "update", "powersave", "checksum", "epoch", "block", "previous", "409", "replaced", "reason", "spam", "modify_tag", "message_info", "delivery", "emoji", "title", "description", "canonical-url", "matched-text", "star", "unstar"],
    doubleByte: [],
    nibbleEncode: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      "-": 10,
      ".": 11,
      "\x00": 15
    },
    nibbleDecode: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "-",
      11: ".",
      15: "\x00"
    }
  };
  e.exports = r
}, function(e, t) {
  "use strict";
  var r = {
    singleByte: [void 0, void 0, void 0, "200", "400", "404", "500", "501", "502", "action", "add", "after", "archive", "author", "available", "battery", "before", "body", "broadcast", "chat", "clear", "code", "composing", "contacts", "count", "create", "debug", "delete", "demote", "duplicate", "encoding", "error", "false", "filehash", "from", "g.us", "group", "groups_v2", "height", "id", "image", "in", "index", "invis", "item", "jid", "kind", "last", "leave", "live", "log", "media", "message", "mimetype", "missing", "modify", "name", "notification", "notify", "out", "owner", "participant", "paused", "picture", "played", "presence", "preview", "promote", "query", "raw", "read", "receipt", "received", "recipient", "recording", "relay", "remove", "response", "resume", "retry", "s.whatsapp.net", "seconds", "set", "size", "status", "subject", "subscribe", "t", "text", "to", "true", "type", "unarchive", "unavailable", "url", "user", "value", "web", "width", "mute", "read_only", "admin", "creator", "short", "update", "powersave", "checksum", "epoch", "block", "previous", "409", "replaced", "reason", "spam", "modify_tag", "message_info", "delivery", "emoji", "title", "description", "canonical-url", "matched-text", "star", "unstar", "media_key"],
    doubleByte: [],
    nibbleEncode: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      "-": 10,
      ".": 11,
      "\x00": 15
    },
    nibbleDecode: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "-",
      11: ".",
      15: "\x00"
    }
  };
  e.exports = r
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(13),
    i = r(54),
    a = r(367),
    s = n.createClass({
      displayName: "Conflict",
      componentWillMount: function() {
        a.setTitleAndIcon(-1)
      },
      render: function() {
        return n.createElement(i, {
          body: l10n.t("phone_has_another_active_webclient_session"),
          cancelLabel: l10n.t("menuitem_logout"),
          onCancel: o.logout.bind(o),
          defaultLabel: l10n.t("button_use_here"),
          onDefault: o.takeover.bind(o)
        })
      }
    });
  e.exports = s
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(28),
    i = r(84),
    a = r(82),
    s = r(163),
    d = r(357),
    u = r(107),
    c = {
      menu: null,
      origin: {
        x: 0,
        y: 0
      },
      anchor: null,
      event: null,
      menuDirection: {
        x: d.Direction.X.RIGHT,
        y: d.Direction.Y.BOTTOM
      },
      originPosition: {
        x: d.Direction.X.LEFT,
        y: d.Direction.Y.BOTTOM
      },
      originOffset: {
        x: 0,
        y: 0
      },
      onOpen: _.noop,
      onClose: _.noop,
      onDefault: _.noop,
      classes: null
    },
    l = {
      MENU: "menu",
      TOOLTIP: "tooltip"
    },
    f = n.createClass({
      displayName: "ContextMenuManager",
      mixins: [i, s],
      propTypes: {
        type: n.PropTypes.oneOf(_.values(l)).isRequired
      },
      getDefaultProps: function() {
        return {
          type: l.MENU
        }
      },
      getInitialState: function() {
        return c
      },
      componentWillMount: function() {
        var e = this.props.type === l.MENU ? "open_context_menu" : "open_tooltip";
        this.regCmd(e, this.open)
      },
      open: function(e, t) {
        this.state.menu && a.pop(this.props.type), t = _.merge(_.clone(c, !0), t), t.event && (t.origin = {
          x: t.event.clientX,
          y: t.event.clientY
        }, t.originOffset = {
          x: 10,
          y: 10
        }, t.event.stopPropagation()), t.key = Math.random(), t.menu = e, this.replaceState(t, function() {
          this.setDirection()
        }), this.uimPush(this, this.props.type, {
          popable: !0,
          parent: t.parent
        })
      },
      uimClose: function() {
        _.isFunction(this.state.onClose) && this.state.onClose(), this.setState(c)
      },
      setDirection: function() {
        var e = o.findDOMNode(this.refs.menu);
        if (!e) return null;
        var t = e.clientWidth,
          r = e.clientHeight,
          n = window.innerWidth,
          i = window.innerHeight,
          a = _.clone(this.state.menuDirection),
          s = _.clone(this.state.origin),
          u = s.x,
          c = s.x,
          l = s.y,
          f = s.y;
        if (this.state.anchor) {
          var h = this.state.anchor,
            p = h.getBoundingClientRect();
          u = p.left, c = p.right, l = p.top, f = p.bottom
        }
        var g = a.x;
        g === d.Direction.X.RIGHT && u + t > n && c - t > 0 ? g = d.Direction.X.LEFT : g === d.Direction.X.LEFT && 0 > c - t && n > u + t && (g = d.Direction.X.RIGHT);
        var m = a.y;
        m === d.Direction.Y.BOTTOM && f + r > i && l - r > 0 ? m = d.Direction.Y.TOP : m === d.Direction.Y.TOP && 0 > l - r && i > f + r && (m = d.Direction.Y.BOTTOM);
        var v = g === d.Direction.X.RIGHT ? u : c,
          y = m === d.Direction.Y.TOP ? l : f;
        this.setState({
          menuDirection: {
            x: g,
            y: m
          },
          origin: {
            x: v,
            y: y
          }
        })
      },
      render: function() {
        var e;
        if (this.state.menu) {
          var t = {
            x: this.state.origin.x + this.state.originOffset.x,
            y: this.state.origin.y + this.state.originOffset.y
          };
          e = n.createElement(d, {
            origin: t,
            ref: "menu",
            onDefault: this.state.onDefault,
            classes: this.state.classes,
            type: this.state.type,
            key: "key-" + this.state.key,
            direction: this.state.menuDirection
          }, this.state.menu)
        }
        var r = this.state.type === d.Type.PICKER ? "dropdown-picker" : "dropdown";
        return n.createElement(u, {
          transitionName: r
        }, e)
      }
    });
  e.exports = f
}, function(e, t, r) {
  "use strict";

  function n(e) {
    this.regex = new RegExp("^" + e[0] + "$"), this.formatString = e[1], this.leadins = _.map(e[2], function(e) {
      return new RegExp("^(?:" + e + ")")
    })
  }

  function o(e) {
    var t = s[e];
    return t ? u[e] = {
      lengths: t[0],
      formats: t[1].map(function(e) {
        return new n(e)
      })
    } : null
  }

  function i(e) {
    var t = e.match(d);
    return t ? t[0] : e.length >= 3 ? e.substring(0, 3) : e
  }

  function a(e) {
    var t = i(e);
    if (!t) return e;
    var r = e.substring(t.length),
      n = u[t] || o(t);
    if (!n) return "+" + t + " " + r;
    for (var a = n.formats, s = 0; s < a.length; s++) {
      var d = a[s].testAndFormat(r);
      if (d) return "+" + t + " " + d
    }
    return "+" + t + " " + r
  }
  var s = r(497),
    d = /^(1|2[07]|3[0-469]|4[013-9]|5[1-8]|6[0-6]|7|8[1246]|9[0-58])/,
    u = {};
  n.prototype = {
    testAndFormat: function(e) {
      return this.regex.test(e) && this.checkLeadins(e) && e.replace(this.regex, this.formatString)
    },
    checkLeadins: function(e) {
      return 0 === this.leadins.length || _.any(this.leadins, function(t) {
        return t.test(e)
      })
    }
  }, e.exports = {
    findCC: i,
    format: a
  }
}, function(e, t) {
  "use strict";
  var r = {
    CAPABILITY_URL: "https://web.whatsapp.com/browsers.html",
    PP_URL: "https://dyn.web.whatsapp.com/pp",
    LOGOUT_URL: "https://dyn.web.whatsapp.com/logout",
    STATUS_URL: "https://web.whatsapp.com/status.json",
    WAM_URL: "https://dyn.web.whatsapp.com/wam",
    COOKIE_DOMAIN: ".web.whatsapp.com",
    PP_TOK: "/pp",
    PP_REF: "/pp",
    UPLOAD_TO_CLB: 1,
    FLAVOR_TAGS: !1,
    WAM_ROTATE_INTERVAL: 3600,
    SOCKETS: ["wss://w1.web.whatsapp.com/ws", "wss://w2.web.whatsapp.com/ws", "wss://w3.web.whatsapp.com/ws", "wss://w4.web.whatsapp.com/ws", "wss://w5.web.whatsapp.com/ws", "wss://w6.web.whatsapp.com/ws", "wss://w7.web.whatsapp.com/ws", "wss://w8.web.whatsapp.com/ws"]
  };
  e.exports = r
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(81),
    s = n(a),
    d = function() {
      window.Promise = r(3)["default"] = r(342), r(334), window.moment = r(0), window._ = r(348), window.Velocity = r(349), r(350), window.WebFont = r(351), window.CryptoJS = r(20), r(345), r(156), r(344), r(343), r(341);
      var e = window.performance.now();
      r(338), window.applicationCache && r(337), r(340), ["getSelection", "open", "focus"].forEach(function(e) {
        var t = (0, s["default"])(window)[e];
        _.isFunction(t) && window[e] !== t && (window[e] = t)
      }), window.Store = {
        Conn: r(169),
        Contact: r(336),
        Stream: r(63),
        Wap: r(35)
      };
      var t = r(44),
        n = r(10);
      window.Debug || (window.Debug = {}), window.Debug.uploadLogs = n.upload.bind(n), t.isGecko || WebFont.load({
        google: {
          families: ["Open Sans:400,600", "Roboto:300,400,500"]
        }
      }), window.l10n = r(339), l10n.init(r(15).getLangPref());
      var o = r(1);
      window.onerror = function(e, t, r, i, a) {
        var s = void 0;
        return s = t && "number" == typeof r ? " (" + t + ":" + r + ":" + i + ")" : t ? " (" + t + ")" : "", o.error("exe:onerror" + s + " " + e)(a), "Script error." !== e || a ? (a instanceof Error && a.stack ? (o.errorVerbose("exe:unhandled error: " + a.stack)(), n.upload(null)) : (o.error("exe:unhandled error: " + (e || "Given: " + a))(), n.upload(null)), !1) : (t && n.upload("script-error"), !1)
      }, i["default"].onPossiblyUnhandledRejection(function(e, t) {
        o.error("exe:unhandled rejection: " + e)(), e instanceof Error && e.stack ? (o.errorVerbose(e.stack)(), n.upload(null)) : n.upload("unhandled-rejection")
      });
      var a = r(335),
        d = r(7);
      window.Debug.VERSION = d.VERSION_STR;
      var u = r(16);
      window.onbeforeunload = function(e) {
        return u.isDownloading() ? void u.clearDownloading() : (o.log("webclient close/reload triggered")(), o.log("latest hash: " + d.LATEST_HASH)(), o.log("version: " + d.VERSION_STR)(), u.promptUnloadGuards > 0 ? void 0 : a.hasPending() ? l10n.t("confirm_closing_webclient") : void 0)
      }, window.addEventListener("dragover", function(e) {
        e.preventDefault()
      }), window.addEventListener("drop", function(e) {
        e.preventDefault()
      });
      var c = r(28),
        l = r(6);
      c.render(l.createElement(a, null), document.getElementById("app"));
      try {
        r(103).PageLoad.set({
          webcExeStart: 0 | e,
          webcExeDone: 0 | window.performance.now()
        })
      } catch (f) {}
    };
  window.Exe = d, r(104)
}, , function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(28),
    i = r(84),
    a = r(82),
    s = r(163),
    d = r(170),
    u = r(159),
    c = u.HotKeys,
    l = r(107),
    f = {
      MEDIA: "media",
      MAIN: "main"
    },
    h = n.createClass({
      displayName: "ModalManager",
      mixins: [i, s],
      propTypes: {
        type: n.PropTypes.oneOf(_.values(f)).isRequired
      },
      statics: {
        DEFAULT_TRANSITION: "modal"
      },
      getInitialState: function() {
        return {
          flow: null
        }
      },
      componentWillMount: function() {
        this.props.type === f.MAIN ? (this.regCmd("open_modal", this.openFlow), this.regCmd("close_modal", this.closeFlow)) : (this.regCmd("open_modal_media", this.openFlow), this.regCmd("close_modal_media", this.closeFlow))
      },
      openFlow: function(e, t, r, n) {
        this.uimPush(this, this.props.type === f.MAIN ? a.MODAL : a.MODAL_MEDIA, {
          escapable: !n,
          parent: r,
          maintainFocus: !0
        }), this.setState({
          flow: e,
          transition: t
        }, this.focus)
      },
      focus: function() {
        var e = o.findDOMNode(this);
        e.contains(document.activeElement) || e.focus()
      },
      closeFlow: function() {
        this.uimPop(this.props.type === f.MAIN ? a.MODAL : a.MODAL_MEDIA)
      },
      uimClose: function() {
        this.setState({
          flow: null,
          transition: this.state.transition
        })
      },
      uimFocus: function() {
        this.focus()
      },
      onKeyPress: function(e) {
        if (!e.metaKey && !e.ctrlKey) {
          var t = o.findDOMNode(this);
          if (t === document.activeElement) {
            var r = _.toArray(t.querySelectorAll("input[data-tab]"));
            if (r.length) {
              var n = _.first(r);
              c.flashFocus = Date.now(), n.restoreFocus ? n.restoreFocus() : n.focus()
            }
          }
        }
      },
      onRotateFocus: function(e) {
        var t = 1;
        e && (e.stopPropagation(), e.preventDefault(), t = e.shiftKey ? -1 : 1, c.flashFocus = Date.now());
        var r = _.toArray(o.findDOMNode(this).querySelectorAll("[data-tab]"));
        if (r.length) {
          r = _.sortBy(r, function(e) {
            return parseInt(e.getAttribute("data-tab"), 10) || 0
          });
          var n = 0,
            i = document.activeElement;
          i && (n = d.ring(_.findIndex(r, function(e) {
            return e.contains(i)
          }) + t, r));
          var a = r[n];
          c.flashFocus = Date.now(), a.restoreFocus ? a.restoreFocus() : a.focus()
        }
      },
      render: function() {
        var e, t, r = this.state.transition;
        r = _.isBoolean(r) && !r ? void 0 : r || h.DEFAULT_TRANSITION, this.state.flow && (r ? t = this.state.flow : e = this.state.flow);
        var o = {
          tab: this.onRotateFocus,
          "shift+tab": this.onRotateFocus
        };
        return n.createElement(c, {
          handlers: o,
          onKeyPress: this.onKeyPress
        }, e, n.createElement(l, {
          transitionName: r
        }, t))
      }
    });
  e.exports = h
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(54),
    i = n.createClass({
      displayName: "Offline",
      render: function() {
        return n.createElement(o, {
          title: l10n.t("computer_not_connected"),
          body: l10n.t("make_sure_computer_active_internet_connection")
        })
      }
    });
  e.exports = i
}, function(e, t, r) {
  "use strict";

  function n() {
    window.open("https://www.whatsapp.com/faq/web/28080002#proxies", "_blank")
  }
  var o = r(6),
    i = r(54),
    a = o.createClass({
      displayName: "Proxied",
      render: function() {
        return o.createElement(i, {
          title: l10n.t("cant_load_whatsapp"),
          body: l10n.t("computer_behind_proxy"),
          defaultLabel: l10n.t("learn_more"),
          onDefault: n
        })
      }
    });
  e.exports = a
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(6),
    s = r(28),
    d = r(13),
    u = r(15),
    c = r(105),
    l = r(35),
    f = r(160),
    h = r(7),
    p = r(8),
    g = r(352),
    m = r(117),
    v = r(39),
    y = r(55),
    b = r(16),
    w = r(43),
    E = r(107),
    S = r(372),
    N = a.createClass({
      displayName: "QRCode",
      mixins: [c],
      getInitialState: function() {
        return {
          rememberMe: u.getRememberMe(),
          expired: d.state === d.STATE.UNPAIRED_IDLE,
          offline: !m.online,
          refValid: d.state === d.STATE.UNPAIRED
        }
      },
      componentDidMount: function() {
        this.addObserver(d, "change:state change:online", this.onStateChange)
      },
      onStateChange: function() {
        this.setState({
          offline: !m.online,
          expired: d.state === d.STATE.UNPAIRED_IDLE,
          refValid: d.state === d.STATE.UNPAIRED
        })
      },
      onQRExpiry: function() {
        this.setState({
          ref: void 0
        }), d.poke()
      },
      onRememberMeChange: function(e) {
        d.isIncognito || l.setRememberMe(e.target.checked)["catch"](_.noop), u.setRememberMe(e.target.checked), this.setState({
          rememberMe: u.getRememberMe()
        })
      },
      render: function() {
        var e = void 0;
        e = this.state.offline ? a.createElement(T, null, a.createElement("button", {
          className: "qr-button",
          key: "expiry"
        }, a.createElement("div", {
          className: "icon icon-connection-l-light"
        }), l10n.t("check_internet_connection"))) : this.state.expired ? a.createElement(T, null, a.createElement("button", {
          className: "qr-button",
          key: "expiry",
          onClick: this.onQRExpiry
        }, a.createElement("div", {
          className: "qr-container"
        }, a.createElement("div", {
          className: "icon icon-refresh-l-light"
        }), l10n.t("click_to_reload_qr_code")))) : this.state.refValid ? a.createElement(T, null) : a.createElement("div", {
          className: "qrcode"
        }, a.createElement(f, null));
        var t = this.state.rememberMe ? null : a.createElement("div", {
          className: "remember-me-tip"
        }, l10n.t("if_unchecked_you_will_be_logged_out_afterawhile"));
        return a.createElement("div", {
          id: "wrapper"
        }, a.createElement("div", {
          id: "window"
        }, a.createElement("div", {
          className: "entry-main"
        }, e, a.createElement("div", {
          className: "entry-text"
        }, a.createElement("div", {
          className: "entry-title"
        }, l10n.t("whatsapp_web")), a.createElement("div", {
          className: "entry-subtitle"
        }, l10n.t("scan_code_with_phone_to_login")), a.createElement("div", {
          className: "entry-controls"
        }, a.createElement("div", {
          className: "toggle"
        }, a.createElement(E, {
          transitionName: "fade_sifo"
        }, t), a.createElement("label", null, a.createElement("input", {
          type: "checkbox",
          name: "rememberMe",
          checked: this.state.rememberMe,
          onChange: this.onRememberMeChange
        }), l10n.t("menuitem_keep_me_signed_in"))), a.createElement("div", {
          className: "hint"
        }, l10n.t("reduce_data_usage_connect_phone_to_wifi"))))), a.createElement("div", {
          id: "platforms"
        }, a.createElement("ul", {
          className: "list entry-platforms"
        }, a.createElement($, {
          platform: "android",
          path: l10n.t("android_login_path"),
          name: l10n.t("android")
        }), a.createElement($, {
          platform: "iphone",
          path: l10n.t("iphone_login_path"),
          name: l10n.t("iphone")
        }), a.createElement($, {
          platform: "wp",
          path: l10n.t("windows_phone_login_path"),
          name: l10n.t("windows_phone")
        }), a.createElement($, {
          platform: "bb",
          path: l10n.t("blackberry_login_path"),
          name: l10n.t("blackberry")
        }), a.createElement($, {
          platform: "bb10",
          path: l10n.t("bb10_login_path"),
          name: l10n.t("bb10")
        }), a.createElement($, {
          platform: "s60",
          path: l10n.t("nokia_symbian_s60_login_path"),
          name: l10n.t("nokia_symbian_s60")
        }), a.createElement($, {
          platform: "s40",
          path: l10n.t("nokia_s40_login_path"),
          name: l10n.t("nokia_s40")
        })))))
      }
    }),
    T = a.createClass({
      displayName: "QR",
      mixins: [c],
      propTypes: {
        children: a.PropTypes.element
      },
      getInitialState: function() {
        return {
          disableCursor: !1
        }
      },
      componentDidMount: function() {
        this.addObserverAndRun(Store.Conn, "change:ref", this.genQR)
      },
      genQR: function() {
        var e = this.getData();
        if (e) {
          var t = s.findDOMNode(this);
          this.qr ? this.qr.makeCode(e) : this.qr = new S(t, {
            text: e,
            colorDark: "#122e31",
            width: h.QR_EDGE,
            height: h.QR_EDGE,
            correctLevel: S.CorrectLevel.L
          }), t.removeAttribute("title"), t.setAttribute("data-ref", e)
        }
      },
      getData: function() {
        if (!Store.Conn.connected) {
          var e = Store.Conn.ref,
            t = y.getOrGenerate(),
            r = b.id();
          return e + "," + t + "," + r
        }
      },
      copy: function() {
        var e = window.getSelection();
        e.selectAllChildren(document.getElementById("qr-code-copy")), document.execCommand("copy"), p.closeModal()
      },
      onMouseMove: function(e) {
        var t = this;
        this.state.disableCursor && this.setState({
          disableCursor: !1
        }), this.disableCursorPromise && this.disableCursorPromise.cancel(), this.disableCursorPromise = v.delay(1e3).cancellable().then(function(e) {
          t.isMounted() && t.setState({
            disableCursor: !0
          })
        })["finally"](function() {
          t.isMounted() && (t.disableCursorPromise = void 0)
        })["catch"](i["default"].CancellationError, _.noop)
      },
      onMouseLeave: function(e) {
        this.disableCursorPromise && this.disableCursorPromise.cancel()
      },
      onContextMenu: function(e) {
        e.stopPropagation(), e.preventDefault(), p.openModal(a.createElement(g, {
          onOK: this.copy,
          okText: "Copy to Clibboard"
        }, a.createElement("span", {
          id: "qr-code-copy"
        }, this.state.data)))
      },
      render: function() {
        var e = this.props.children,
          t = w("qrcode", {
            idle: !!e
          }),
          r = {};
        this.state.disableCursor && !e && (r.cursor = "pointer");
        var n = null;
        return a.createElement("div", {
          className: t,
          onContextMenu: n,
          style: r,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave
        }, a.createElement(E, {
          transitionName: "scale"
        }, e), a.createElement("span", {
          className: "icon icon-logo"
        }))
      }
    }),
    $ = a.createClass({
      displayName: "LoginPlatform",
      propTypes: {
        platform: a.PropTypes.oneOf(["android", "iphone", "bb", "wp", "bb10", "s60", "s40"]).isRequired,
        name: a.PropTypes.string.isRequired,
        path: a.PropTypes.string.isRequired
      },
      render: function() {
        var e = "icon icon-platform icon-platform-" + this.props.platform;
        return a.createElement("li", {
          className: "list-item entry-platform"
        }, a.createElement("span", {
          className: e,
          title: this.props.name
        }), a.createElement("div", null, a.createElement("div", {
          className: "entry-platform-title"
        }, this.props.name), a.createElement("div", {
          className: "entry-platform-text"
        }, this.props.path)))
      }
    });
  e.exports = N
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e, t) {
    return c["default"].any(t).cancellable().then(function() {
      e.forceTimeout()
    })["finally"](function() {
      t.forEach(function(e) {
        e.cancel()
      })
    })["catch"](c["default"].CancellationError, _.noop)
  }

  function i() {
    return y.waitForEvent(window, "online").then(function() {
      return c["default"].delay(E)
    })
  }

  function a(e) {
    var t, r, n = e.data;
    if (n instanceof ArrayBuffer) {
      for (var o, i = [], a = h.wrap(n); 44 !== (o = a.readByte());) i.push(o);
      t = String.fromCharCode.apply(String, i), r = a
    } else {
      var s = n.indexOf(",");
      t = n.slice(0, s), r = n.slice(s + 1), r = r ? JSON.parse(r) : r
    }
    return {
      tag: t,
      data: r
    }
  }
  var s, d, u = r(3),
    c = n(u),
    l = r(7),
    f = r(49),
    h = r(9),
    p = r(117),
    g = r(8),
    m = r(1),
    v = r(10),
    y = r(29),
    b = r(181),
    w = r(111),
    E = 100,
    S = 3e5,
    N = 6e3,
    T = 2,
    $ = .2,
    C = b.FIBONACCI(8e3, 4e3, 3e5),
    k = f.extend({
      props: {
        active: {
          type: "boolean",
          "default": !0
        },
        socket: "object",
        sockets: "object",
        attempts: {
          type: "number",
          "default": 0
        },
        startId: {
          type: "number",
          "default": 0
        },
        controller: "object",
        retryTimestamp: "number",
        tsListener: "function",
        onerror: "function",
        _resolve: "function",
        _reject: "function"
      },
      initialize: function() {
        var e = this;
        "undefined" == typeof s && (s = l.SOCKETS, d = Date.now() % s.length), this.sockets = [], new c["default"](function(t, r) {
          e._resolve = t, e._reject = r
        }).then(function(t) {
          m.log("SocketOpener set to socket " + t.id)(), e.set({
            active: !1,
            socket: t
          }), p.online = !0
        })["finally"](function() {
          e.stopListening(), m.log("SocketOpener closing socket opener")(), e.active = !1, _.forEach(e.sockets, function(e) {
            e.cancel()
          });
          var t = e.controller;
          t && (t.deactivate(), e.controller = null)
        })["catch"](c["default"].CancellationError, _.noop)["catch"](function(t) {
          return m.error("SocketOpener deadly error! " + t)(t), e.onerror ? void e.onerror(t) : c["default"].reject(t)
        }), this.tsListener = function(t) {
          e.retryTimestamp = t.ts
        }, this.listenTo(p, "change:online", this.onOnlineChange), this.onOnlineChange()
      },
      attemptOpen: function() {
        if (!this.active) return m.log("attemptOpen called while not active!")(), void v.upload("rogue-opener");
        var e = w.numSocketsAttempted,
          t = w.open({
            url: s[(e + d) % s.length],
            msgParser: a
          });
        this.attempts = this.sockets.push(t);
        var r = _.once(function() {
            p.checkOnline()
          }),
          n = _.delay(r, 6e3);
        t.then(this._resolve)["finally"](function() {
          return clearTimeout(n)
        })["catch"](c["default"].CancellationError, _.noop)["catch"](r)
      },
      poke: function() {
        this.controller && this.controller.forceTimeout()
      },
      onOnlineChange: function() {
        if (this.active) {
          var e = this.controller,
            t = p.online ? this.onlineController() : this.offlineController();
          e && (e.off("change:ts", this.tsListener), e.deactivate()), t.on("change:ts", this.tsListener), t.activate(), this.controller = t
        }
      },
      onlineController: function() {
        var e = this;
        return m.log("SocketOpener:onlineController activating")(), new b({
          waitAlgorithm: C,
          jitter: $,
          onActivated: function() {
            e.attemptOpen()
          },
          onTimeout: function() {
            return e.attemptOpen(), !0
          }
        })
      },
      offlineController: function() {
        var e = this;
        m.log("SocketOpener:offlineController activating")();
        var t = 0,
          r = void 0,
          n = function(e) {
            return r && r.cancel(), navigator.onLine ? t++ < T ? (m.log("SocketOpener:offline... quick poll")(), r = null, N) : (m.log("SocketOpener:offline... heuristic poll")(), r = o(e, [i(), y.waitForBBEvent(g, "js_halt_detected"), y.waitForBBEvent(Store.Stream, "change:available")]), S) : (m.log("SocketOpener:offline... wait for navigator")(), t = 0, r = o(e, [i()]), S)
          };
        return new b({
          waitAlgorithm: n,
          jitter: $,
          onActivated: function() {
            0 == e.pendingAttempts() && e.attemptOpen()
          },
          onDeactivated: function() {
            r && r.cancel()
          },
          onTimeout: function() {
            return e.attemptOpen(), !0
          }
        })
      },
      deactivate: function() {
        this._reject(new c["default"].CancellationError)
      },
      pendingAttempts: function() {
        return _.sum(this.sockets, function(e) {
          return e.isPending() ? 1 : 0
        })
      }
    });
  e.exports = k
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(160),
    i = r(13),
    a = r(63),
    s = r(158),
    d = r(105),
    u = r(84),
    c = r(54),
    l = 80,
    f = 5,
    h = (100 - l) / f,
    p = n.createClass({
      displayName: "Startup",
      mixins: [s, d, u],
      getInitialState: function() {
        return {
          retriable: !1,
          progress: l
        }
      },
      componentWillMount: function() {
        var e = this;
        this.addObserver(a, "change:displayInfo"), this.addObserver(i, "change:retryTimestamp", this.retried), this.regCmd("increment_progress", function() {
          var t = e.state.progress + h;
          e.setState({
            progress: t
          })
        })
      },
      retried: function() {
        this.clearSafeTimeout(this.timeout), delete this.timeout, this.clearSafeInterval(this.interval), delete this.interval, this.setState({
          retriable: !1
        }), this.startTimeout()
      },
      componentDidMount: function() {
        this.startTimeout();
        var e = document.getElementById("initial_startup");
        e && e.parentNode.removeChild(e)
      },
      startTimeout: function() {
        this.timeout = this.safeDelay(this.allowRetry, 3e3)
      },
      allowRetry: function() {
        this.setState({
          retriable: !0
        }), this.interval = this.safeInterval(this.forceUpdate, 1e3)
      },
      retry: function(e) {
        i.poke(), this.retried()
      },
      logout: function(e) {
        i.logout()
      },
      render: function() {
        var e, t, r, s, d, u, l = null;
        switch (a.displayInfo) {
          case a.INFO.OPENING:
            e = l10n.t("connecting_to_whatsapp"), t = l10n.t("make_sure_computer_active_internet_connection"), d = this.logout;
            break;
          case a.INFO.PAIRING:
          case a.INFO.TIMEOUT:
            e = l10n.t("trying_to_reach_phone");
            var f = window.open.bind(window, "http://www.whatsapp.com/faq/web/28080002", "_blank");
            t = n.createElement("span", null, l10n.t("make_sure_phone_active_internet_connection"), " ", n.createElement("span", {
              className: "action",
              onClick: f
            }, l10n.t("learn_more"))), d = this.logout;
            break;
          case a.INFO.SYNCING:
          case a.INFO.CONNECTING:
            return n.createElement("div", {
              id: "startup"
            }, n.createElement(o, {
              size: 50,
              stroke: 4
            }), l);
          default:
            return null
        }
        if (u = this.state.retriable)
          if (r = i.retryTimestamp - Date.now(), 1 > r) s = l10n.t("retrying");
          else if (6e4 > r) {
          var h = Math.ceil(r / 1e3);
          s = l10n.t("retrying_in_some_seconds", {
            number: h,
            _plural: h
          })
        } else s = l10n.t("retrying_in", {
          duration: moment.duration(r).humanize()
        });
        else s = l10n.t("retrying");
        return n.createElement(c, {
          title: e,
          body: s,
          tip: t,
          defaultLabel: l10n.t("retry_now"),
          onDefault: u ? this.retry : _.noop,
          cancelLabel: d ? l10n.t("menuitem_logout") : null,
          onCancel: d
        })
      }
    });
  e.exports = p
}, function(e, t) {
  "use strict";

  function r(e, t) {
    d[e] || (d[e] = []), d[e].push(t)
  }

  function n(e, t) {
    if (d[e]) {
      var r = d[e].indexOf(t); - 1 !== r && d[e].splice(r, 1)
    }
  }

  function o(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    d.all.forEach(function(e) {
      return e.apply(null, t)
    }), d[e] && d[e].forEach(function(e) {
      return e.apply(null, t)
    })
  }

  function i(e, t, r, n) {
    var o = [];
    if (self.MessageChannel) {
      var i = new MessageChannel;
      n || (n = s), i.port1.onmessage = n, o.push(i.port2)
    }
    e.postMessage({
      command: t,
      message: r
    }, o)
  }

  function a(e, t, r) {
    e.forEach(function(e) {
      return i(e, t, r)
    })
  }

  function s(e) {
    var t = e.data.command || "unknown";
    o(t, e, function(t) {
      e.ports && e.ports.length && e.ports.forEach(function(e) {
        return e.postMessage(t)
      })
    })
  }
  var d = {
      all: [],
      unknown: []
    },
    u = self.window ? self.navigator.serviceWorker : self;
  try {
    u.addEventListener("message", s)
  } catch (c) {}
  e.exports = {
    on: r,
    off: n,
    trigger: o,
    sendMessage: i,
    broadcast: a
  }
}, function(e, t, r) {
  "use strict";
  var n = r(6),
    o = r(13),
    i = r(54),
    a = n.createClass({
      displayName: "TOS",
      render: function() {
        return n.createElement(i, {
          body: l10n.t("web_terms_of_service_login_block"),
          cancelLabel: l10n.t("menuitem_logout"),
          onCancel: o.logout.bind(o, !0),
          defaultLabel: l10n.t("login"),
          onDefault: o.poke.bind(o)
        })
      }
    });
  e.exports = a
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(167),
    i = n(o),
    a = r(168),
    s = n(a),
    d = function() {
      function e() {
        (0, i["default"])(this, e), this.activeNotifications = {}
      }
      return (0, s["default"])(e, [{
        key: "showNotification",
        value: function(e, t, r) {
          this.activeNotifications[e] || (this.activeNotifications[e] = {});
          var n = this.activeNotifications[e][t];
          n && n.close && n.close(), this.activeNotifications[e][t] = r
        }
      }, {
        key: "closeNotification",
        value: function(e) {
          var t = _.findKey(this.activeNotifications, function(t) {
            return !!t[e]
          });
          if (t) {
            var r = this.activeNotifications[t][e];
            r.close && r.close(), delete this.activeNotifications[t][e], _.isEmpty(this.activeNotifications[t]) && delete this.activeNotifications[t]
          }
        }
      }, {
        key: "closeChatNotifications",
        value: function(e) {
          _.forEach(this.activeNotifications[e], function(e, t) {
            e && e.close && e.close()
          }), delete this.activeNotifications[e]
        }
      }, {
        key: "closeAllNotifications",
        value: function() {
          _.forEach(this.activeNotifications, function(e, t) {
            _.forEach(e, function(e, t) {
              e && e.close && e.close()
            })
          }), this.activeNotifications = {}
        }
      }]), e
    }();
  e.exports = d
}, function(e, t) {
  "use strict";
  e.exports = {
    setCookie: function(e, t) {
      var r = ["name", "value", "domain", "path", "secure", "session", "expirationDate"];
      e.session && delete e.expirationDate;
      var n = [];
      _.forEach(r, function(t) {
        var r = e[t];
        if (void 0 !== r && "value" !== t) switch (t) {
          case "expirationDate":
            var o = new Date(e.expirationDate);
            n.push("expires=" + o.toUTCString());
            break;
          case "secure":
            n.push("secure");
            break;
          case "name":
            var i = e.value || "";
            n.push(r + "=" + i);
            break;
          default:
            n.push(t + "=" + r)
        }
      }), document.cookie = n.join(";")
    }
  }
}, function(e, t) {
  "use strict";
  var r = {
      LOW: "low",
      HIGH: "high"
    },
    n = window.matchMedia("\n    only screen and (-webkit-min-device-pixel-ratio: 2),\n    only screen and (min-device-pixel-ratio: 2),\n    only screen and (min-resolution: 2dppx)\n"),
    o = {
      RES: r,
      currentRes: n.matches ? r.HIGH : r.LOW
    },
    i = function(e) {
      var t = e.matches ? r.HIGH : r.LOW;
      if (t !== o.currentRes) {
        o.currentRes = t;
        var n = document.createEvent("Event");
        n.initEvent("dpichange", !0, !0), window.dispatchEvent(n)
      }
    };
  n.addListener(i), e.exports = o
}, function(e, t) {
  "use strict";

  function r(e) {
    this.styleSheet = this.createStyleSheet(e), this.rules = {}
  }
  r.prototype.createStyleSheet = function(e) {
    e = e || _.uniqueId("dynamic-style-");
    var t = document.createElement("style");
    return t.id = e, t.type = "text/css", document.head.appendChild(t), t = t.sheet
  }, r.prototype.addRule = function(e, t) {
    var r = this.styleSheet.cssRules.length;
    return t = _.map(t, function(e, t) {
      return t + ": " + e + ";"
    }).join(" "), this.styleSheet.insertRule(e + " { " + t + " }", r), this.rules[e] = this.styleSheet.cssRules[r], this.rules[e]
  }, r.prototype.updateRule = function(e, t) {
    var r = this.rules[e];
    return _.forEach(t, function(e, t) {
      r.style[_.camelCase(t)] = e
    }), r
  }, r.prototype.setRule = function(e, t) {
    var r = this.rules[e];
    return r ? this.updateRule(e, t) : this.addRule(e, t)
  }, e.exports = r
}, function(e, t) {
  "use strict";
  e.exports = {
    "": "ordered0001",
    "": "ordered0003",
    "": "ordered0004",
    "": "ordered0005",
    "": "ordered0006",
    "": "ordered0007",
    "": "ordered0008",
    "": "ordered0009",
    "": "ordered0010",
    "": "ordered0011",
    "": "ordered0012",
    "": "ordered0013",
    "": "ordered0014",
    "": "ordered0015",
    "": "ordered0016",
    "": "ordered0017",
    "": "ordered0018",
    "": "ordered0019",
    "": "ordered0020",
    "": "ordered0021",
    "": "ordered0022",
    "": "ordered0023",
    "": "ordered0024",
    "": "ordered0025",
    "": "ordered0026",
    "": "ordered0027",
    "": "ordered0028",
    "": "ordered0030",
    "": "ordered0031",
    "": "ordered0032",
    "": "ordered0033",
    "": "ordered0037",
    "": "ordered0040",
    "": "ordered0044",
    "": "ordered0045",
    "": "ordered0046",
    "": "ordered0047",
    "": "ordered0048",
    "": "ordered0049",
    "": "ordered0050",
    "": "ordered0051",
    "": "ordered0052",
    "": "ordered0053",
    "": "ordered0054",
    "": "ordered0058",
    "": "ordered0059",
    "": "ordered0060",
    "": "ordered0061",
    "": "ordered0063",
    "": "ordered0078",
    "": "ordered0079",
    "": "ordered0080",
    "": "ordered0081",
    "": "ordered0082",
    "": "ordered0083",
    "": "ordered0084",
    "": "ordered0085",
    "": "ordered0086",
    "": "ordered0087",
    "": "ordered0088",
    "": "ordered0089",
    "": "ordered0090",
    "": "ordered0091",
    "": "ordered0092",
    "": "ordered0093",
    "": "ordered0094",
    "": "ordered0095",
    "": "ordered0096",
    "": "ordered0097",
    "": "ordered0099",
    "": "ordered0106",
    "": "ordered0107",
    "": "ordered0108",
    "": "ordered0109",
    "": "ordered0112",
    "": "ordered0113",
    "": "ordered0114",
    "": "ordered0115",
    "": "ordered0117",
    "": "ordered0121",
    "": "ordered0123",
    "": "ordered0126",
    "": "ordered0127",
    "": "ordered0129",
    "": "ordered0138",
    "": "ordered0139",
    "": "ordered0140",
    "": "ordered0141",
    "": "ordered0142",
    "": "ordered0143",
    "": "ordered0144",
    "": "ordered0150",
    "": "ordered0156",
    "": "ordered0168",
    "": "ordered0169",
    "": "ordered0170",
    "": "ordered0171",
    "": "ordered0174",
    "": "ordered0175",
    "": "ordered0176",
    "": "ordered0177",
    "": "ordered0178",
    "": "ordered0179",
    "": "ordered0180",
    "": "ordered0181",
    "": "ordered0182",
    "": "ordered0183",
    "": "ordered0184",
    "": "ordered0186",
    "": "ordered0187",
    "": "ordered0188",
    "": "ordered0189",
    "": "ordered0190",
    "": "ordered0191",
    "": "ordered0192",
    "": "ordered0193",
    "": "ordered0194",
    "": "ordered0195",
    "": "ordered0196",
    "": "ordered0197",
    "": "ordered0198",
    "": "ordered0199",
    "": "ordered0200",
    "": "ordered0201",
    "": "ordered0202",
    "": "ordered0203",
    "": "ordered0204",
    "": "ordered0205",
    "": "ordered0206",
    "": "ordered0207",
    "": "ordered0208",
    "": "ordered0209",
    "": "ordered0210",
    "": "ordered0211",
    "": "ordered0212",
    "": "ordered0213",
    "": "ordered0214",
    "": "ordered0215",
    "": "ordered0216",
    "": "ordered0217",
    "": "ordered0218",
    "": "ordered0219",
    "": "ordered0220",
    "": "ordered0221",
    "": "ordered0222",
    "": "ordered0269",
    "": "ordered0278",
    "": "ordered0289",
    "": "ordered0297",
    "": "ordered0299",
    "": "ordered0332",
    "": "ordered0336",
    "": "ordered0344",
    "": "ordered0412",
    "": "ordered0452",
    "": "ordered0470",
    "": "ordered0471",
    "": "ordered0472",
    "": "ordered0473",
    "": "ordered0474",
    "": "ordered0475",
    "": "ordered0476",
    "": "ordered0477",
    "": "ordered0478",
    "": "ordered0479",
    "": "ordered0480",
    "": "ordered0481",
    "": "ordered0482",
    "": "ordered0483",
    "": "ordered0484",
    "": "ordered0485",
    "": "ordered0486",
    "": "ordered0487",
    "": "ordered0488",
    "": "ordered0489",
    "": "ordered0490",
    "": "ordered0491",
    "": "ordered0492",
    "": "ordered0493",
    "": "ordered0494",
    "": "ordered0495",
    "": "ordered0496",
    "": "ordered0497",
    "": "ordered0498",
    "": "ordered0499",
    "": "ordered0500",
    "": "ordered0501",
    "": "ordered0502",
    "": "ordered0503",
    "": "ordered0504",
    "": "ordered0505",
    "": "ordered0506",
    "": "ordered0507",
    "": "ordered0508",
    "": "ordered0509",
    "": "ordered0510",
    "": "ordered0511",
    "": "ordered0512",
    "": "ordered0513",
    "": "ordered0514",
    "": "ordered0515",
    "": "ordered0516",
    "": "ordered0517",
    "": "ordered0531",
    "": "ordered0532",
    "": "ordered0533",
    "": "ordered0534",
    "": "ordered0535",
    "": "ordered0536",
    "": "ordered0538",
    "": "ordered0539",
    "": "ordered0540",
    "": "ordered0541",
    "": "ordered0542",
    "": "ordered0543",
    "": "ordered0544",
    "": "ordered0545",
    "": "ordered0546",
    "": "ordered0547",
    "": "ordered0548",
    "": "ordered0549",
    "": "ordered0550",
    "": "ordered0551",
    "": "ordered0552",
    "": "ordered0553",
    "": "ordered0554",
    "": "ordered0555",
    "": "ordered0556",
    "": "ordered0557",
    "": "ordered0558",
    "": "ordered0559",
    "": "ordered0560",
    "": "ordered0561",
    "": "ordered0562",
    "": "ordered0563",
    "": "ordered0564",
    "": "ordered0565",
    "": "ordered0566",
    "": "ordered0567",
    "": "ordered0568",
    "": "ordered0569",
    "": "ordered0570",
    "": "ordered0571",
    "": "ordered0572",
    "": "ordered0573",
    "": "ordered0574",
    "": "ordered0575",
    "": "ordered0576",
    "": "ordered0577",
    "": "ordered0578",
    "": "ordered0579",
    "": "ordered0580",
    "": "ordered0581",
    "": "ordered0582",
    "": "ordered0583",
    "": "ordered0584",
    "": "ordered0585",
    "": "ordered0586",
    "": "ordered0587",
    "": "ordered0588",
    "": "ordered0589",
    "": "ordered0590",
    "": "ordered0591",
    "": "ordered0592",
    "": "ordered0593",
    "": "ordered0594",
    "": "ordered0595",
    "": "ordered0596",
    "": "ordered0597",
    "": "ordered0598",
    "": "ordered0599",
    "": "ordered0600",
    "": "ordered0601",
    "": "ordered0602",
    "": "ordered0603",
    "": "ordered0604",
    "": "ordered0605",
    "": "ordered0606",
    "": "ordered0607",
    "": "ordered0611",
    "": "ordered0612",
    "": "ordered0613",
    "": "ordered0614",
    "": "ordered0615",
    "": "ordered0616",
    "": "ordered0622",
    "": "ordered0623",
    "": "ordered0624",
    "": "ordered0625",
    "": "ordered0626",
    "": "ordered0627",
    "": "ordered0628",
    "": "ordered0629",
    "": "ordered0630",
    "": "ordered0631",
    "": "ordered0632",
    "": "ordered0633",
    "": "ordered0634",
    "": "ordered0635",
    "": "ordered0643",
    "": "ordered0644",
    "": "ordered0645",
    "": "ordered0646",
    "": "ordered0647",
    "": "ordered0648",
    "": "ordered0649",
    "": "ordered0650",
    "": "ordered0651",
    "": "ordered0652",
    "": "ordered0653",
    "": "ordered0654",
    "": "ordered0655",
    "": "ordered0656",
    "": "ordered0657",
    "": "ordered0658",
    "": "ordered0659",
    "": "ordered0660",
    "": "ordered0661",
    "": "ordered0662",
    "": "ordered0663",
    "": "ordered0664",
    "": "ordered0665",
    "": "ordered0666",
    "": "ordered0667",
    "": "ordered0668",
    "": "ordered0669",
    "": "ordered0670",
    "": "ordered0671",
    "": "ordered0672",
    "": "ordered0673",
    "": "ordered0674",
    "": "ordered0675",
    "": "ordered0676",
    "": "ordered0677",
    "": "ordered0678",
    "": "ordered0684",
    "": "ordered0691",
    "": "ordered0692",
    "": "ordered0698",
    "": "ordered0699",
    "": "ordered0700",
    "": "ordered0732",
    "": "ordered0733",
    "": "ordered0734",
    "": "ordered0735",
    "": "ordered0736",
    "": "ordered0737",
    "": "ordered0738",
    "": "ordered0739",
    "": "ordered0740",
    "": "ordered0741",
    "": "ordered0742",
    "": "ordered0743",
    "": "ordered0744",
    "": "ordered0745",
    "": "ordered0746",
    "": "ordered0747",
    "": "ordered0748",
    "": "ordered0761",
    "": "ordered0762",
    "": "ordered0763",
    "": "ordered0764",
    "": "ordered0765",
    "": "ordered0766",
    "": "ordered0767",
    "": "ordered0768",
    "": "ordered0769",
    "": "ordered0770",
    "": "ordered0771",
    "": "ordered0772",
    "": "ordered0773",
    "": "ordered0774",
    "": "ordered0775",
    "": "ordered0776",
    "": "ordered0777",
    "": "ordered0778",
    "": "ordered0779",
    "": "ordered0780",
    "": "ordered0781",
    "": "ordered0782",
    "": "ordered0783",
    "": "ordered0784",
    "": "ordered0785",
    "": "ordered0786",
    "": "ordered0787",
    "": "ordered0788",
    "": "ordered0789",
    "": "ordered0790",
    "": "ordered0791",
    "": "ordered0792",
    "": "ordered0793",
    "": "ordered0794",
    "": "ordered0795",
    "": "ordered0796",
    "": "ordered0797",
    "": "ordered0798",
    "": "ordered0799",
    "": "ordered0800",
    "": "ordered0801",
    "": "ordered0802",
    "": "ordered0803",
    "": "ordered0804",
    "": "ordered0805",
    "": "ordered0806",
    "": "ordered0807",
    "": "ordered0808",
    "": "ordered0809",
    "": "ordered0810",
    "": "ordered0811",
    "": "ordered0812",
    "": "ordered0813",
    "": "ordered0814",
    "": "ordered0815",
    "": "ordered0816",
    "": "ordered0817",
    "": "ordered0818",
    "": "ordered0819",
    "": "ordered0820",
    "": "ordered0821",
    "": "ordered0822",
    "": "ordered0823",
    "": "ordered0825",
    "": "ordered0828",
    "": "ordered0834",
    "": "ordered0840",
    "": "ordered0841",
    "": "ordered0842",
    "": "ordered0848",
    "": "ordered0854",
    "": "ordered0860",
    "": "ordered0866",
    "": "ordered0872",
    "": "ordered0878",
    "": "ordered0884",
    "": "ordered0890",
    "": "ordered0896",
    "": "ordered0902",
    "": "ordered0908",
    "": "ordered0909",
    "": "ordered0910",
    "": "ordered0911",
    "": "ordered0912",
    "": "ordered0913",
    "": "ordered0914",
    "": "ordered0915",
    "": "ordered0916",
    "": "ordered0917",
    "": "ordered0918",
    "": "ordered0919",
    "": "ordered0920",
    "": "ordered0921",
    "": "ordered0922",
    "": "ordered0923",
    "": "ordered0924",
    "": "ordered0925",
    "": "ordered0926",
    "": "ordered0927",
    "": "ordered0928",
    "": "ordered0929",
    "": "ordered0935",
    "": "ordered0941",
    "": "ordered0947",
    "": "ordered0953",
    "": "ordered0968",
    "": "ordered0969",
    "": "ordered0970",
    "": "ordered0971",
    "": "ordered0977",
    "": "ordered0978",
    "": "ordered0984",
    "": "ordered0990",
    "": "ordered0996",
    "": "ordered1002",
    "": "ordered1008",
    "": "ordered1014",
    "": "ordered1020",
    "": "ordered1026",
    "": "ordered1032",
    "": "ordered1033",
    "": "ordered1034",
    "": "ordered1035",
    "": "ordered1041",
    "": "ordered1042",
    "": "ordered1043",
    "": "ordered1044",
    "": "ordered1045",
    "": "ordered1051",
    "": "ordered1057",
    "": "ordered1063",
    "": "ordered1064",
    "": "ordered1070",
    "": "ordered1076",
    "": "ordered1082",
    "": "ordered1083",
    "": "ordered1084",
    "": "ordered1085",
    "": "ordered1086",
    "": "ordered1087",
    "": "ordered1088",
    "": "ordered1089",
    "": "ordered1092",
    "": "ordered1093",
    "": "ordered1096",
    "": "ordered1097",
    "": "ordered1098",
    "": "ordered1099",
    "": "ordered1100",
    "": "ordered1101",
    "": "ordered1102",
    "": "ordered1103",
    "": "ordered1104",
    "": "ordered1105",
    "": "ordered1106",
    "": "ordered1107",
    "": "ordered1108",
    "": "ordered1109",
    "": "ordered1110",
    "": "ordered1111",
    "": "ordered1112",
    "": "ordered1113",
    "": "ordered1114",
    "": "ordered1115",
    "": "ordered1116",
    "": "ordered1117",
    "": "ordered1118",
    "": "ordered1119",
    "": "ordered1120",
    "": "ordered1126",
    "": "ordered1127",
    "": "ordered1128",
    "": "ordered1129",
    "": "ordered1130",
    "": "ordered1131",
    "": "ordered1132",
    "": "ordered1133",
    "": "ordered1134",
    "": "ordered1135",
    "": "ordered1136",
    "": "ordered1137",
    "": "ordered1138",
    "": "ordered1139",
    "": "ordered1140",
    "": "ordered1141",
    "": "ordered1142",
    "": "ordered1143",
    "": "ordered1144",
    "": "ordered1145",
    "": "ordered1146",
    "": "ordered1147",
    "": "ordered1148",
    "": "ordered1149",
    "": "ordered1150",
    "": "ordered1151",
    "": "ordered1152",
    "": "ordered1153",
    "": "ordered1154",
    "": "ordered1155",
    "": "ordered1156",
    "": "ordered1157",
    "": "ordered1158",
    "": "ordered1159",
    "": "ordered1160",
    "": "ordered1161",
    "": "ordered1162",
    "": "ordered1163",
    "": "ordered1164",
    "": "ordered1165",
    "": "ordered1166",
    "": "ordered1167",
    "": "ordered1168",
    "": "ordered1169",
    "": "ordered1170",
    "": "ordered1171",
    "": "ordered1172",
    "": "ordered1173",
    "": "ordered1174",
    "": "ordered1175",
    "": "ordered1176",
    "": "ordered1177",
    "": "ordered1178",
    "": "ordered1179",
    "": "ordered1180",
    "": "ordered1181",
    "": "ordered1182",
    "": "ordered1183",
    "": "ordered1184",
    "": "ordered1185",
    "": "ordered1186",
    "": "ordered1187",
    "": "ordered1188",
    "": "ordered1189",
    "": "ordered1190",
    "": "ordered1191",
    "": "ordered1192",
    "": "ordered1193",
    "": "ordered1194",
    "": "ordered1195",
    "": "ordered1196",
    "": "ordered1197",
    "": "ordered1198",
    "": "ordered1199",
    "": "ordered1200",
    "": "ordered1201",
    "": "ordered1202",
    "": "ordered1204",
    "": "ordered1205",
    "": "ordered1206",
    "": "ordered1207",
    "": "ordered1210",
    "": "ordered1211",
    "": "ordered1212",
    "": "ordered1213",
    "": "ordered1214",
    "": "ordered1215",
    "": "ordered1216",
    "": "ordered1217",
    "": "ordered1218",
    "": "ordered1219",
    "": "ordered1220",
    "": "ordered1221",
    "": "ordered1222",
    "": "ordered1223",
    "": "ordered1224",
    "": "ordered1225",
    "": "ordered1226",
    "": "ordered1227",
    "": "ordered1228",
    "": "ordered1229",
    "": "ordered1230",
    "": "ordered1231",
    "": "ordered1232",
    "": "ordered1233",
    "": "ordered1234",
    "": "ordered1235",
    "": "ordered1236",
    "": "ordered1237",
    "": "ordered1238",
    "": "ordered1239",
    "": "ordered1240",
    "": "ordered1241",
    "": "ordered1242",
    "": "ordered1243",
    "": "ordered1244",
    "": "ordered1245",
    "": "ordered1246",
    "": "ordered1247",
    "": "ordered1248",
    "": "ordered1249",
    "": "ordered1250",
    "": "ordered1251",
    "": "ordered1252",
    "": "ordered1253",
    "": "ordered1254",
    "": "ordered1255",
    "": "ordered1256",
    "": "ordered1257",
    "": "ordered1258",
    "": "ordered1259",
    "": "ordered1260",
    "": "ordered1261",
    "": "ordered1262",
    "": "ordered1263",
    "": "ordered1264",
    "": "ordered1265",
    "": "ordered1266",
    "": "ordered1267",
    "": "ordered1268",
    "": "ordered1269",
    "": "ordered1270",
    "": "ordered1271",
    "": "ordered1278",
    "": "ordered1279",
    "": "ordered1280",
    "": "ordered1281",
    "": "ordered1282",
    "": "ordered1283",
    "": "ordered1284",
    "": "ordered1285",
    "": "ordered1286",
    "": "ordered1287",
    "": "ordered1288",
    "": "ordered1289",
    "": "ordered1290",
    "": "ordered1291",
    "": "ordered1292",
    "": "ordered1293",
    "": "ordered1294",
    "": "ordered1295",
    "": "ordered1296",
    "": "ordered1297",
    "": "ordered1298",
    "": "ordered1299",
    "": "ordered1300",
    "": "ordered1301",
    "": "ordered1322",
    "": "ordered1328",
    "": "ordered1354",
    "": "ordered1355",
    "": "ordered1356",
    "": "ordered1357",
    "": "ordered1358",
    "": "ordered1359",
    "": "ordered1360",
    "": "ordered1361",
    "": "ordered1362",
    "": "ordered1363",
    "": "ordered1364",
    "": "ordered1365",
    "": "ordered1366",
    "": "ordered1367",
    "": "ordered1368",
    "": "ordered1369",
    "": "ordered1370",
    "": "ordered1371",
    "": "ordered1372",
    "": "ordered1373",
    "": "ordered1374",
    "": "ordered1375",
    "": "ordered1376",
    "": "ordered1377",
    "": "ordered1378",
    "": "ordered1379",
    "": "ordered1380",
    "": "ordered1381",
    "": "ordered1382",
    "": "ordered1383",
    "": "ordered1384",
    "": "ordered1385",
    "": "ordered1386",
    "": "ordered1387",
    "": "ordered1388",
    "": "ordered1389",
    "": "ordered1390",
    "": "ordered1391",
    "": "ordered1392",
    "": "ordered1393",
    "": "ordered1394",
    "": "ordered1395",
    "": "ordered1396",
    "": "ordered1397",
    "": "ordered1398",
    "": "ordered1399",
    "": "ordered1400",
    "": "ordered1401",
    "": "ordered1402",
    "": "ordered1403",
    "": "ordered1404",
    "": "ordered1405",
    "": "ordered1406",
    "": "ordered1407",
    "": "ordered1408",
    "": "ordered1409",
    "": "ordered1410",
    "": "ordered1411",
    "": "ordered1412",
    "": "ordered1413",
    "": "ordered1414",
    "": "ordered1415",
    "": "ordered1416",
    "": "ordered1417",
    "": "ordered1418",
    "": "ordered1419",
    "": "ordered1420",
    "": "ordered1421",
    "": "ordered1422",
    "": "ordered1423",
    "": "ordered1428",
    "": "ordered1434",
    "": "ordered1440",
    "": "ordered1446",
    "": "ordered1447",
    "": "ordered1448",
    "": "ordered1449",
    "": "ordered1455",
    "": "ordered1461",
    "": "ordered1467",
    "": "ordered1473",
    "": "ordered1479",
    "": "ordered1480",
    "": "ordered1481",
    "": "ordered1482",
    "": "ordered1483",
    "": "ordered1484",
    "": "ordered1485",
    "": "ordered1486",
    "": "ordered1487",
    "": "ordered1488",
    "": "ordered1489",
    "": "ordered1490",
    "": "ordered1491",
    "": "ordered1492",
    "": "ordered1493",
    "": "ordered1494",
    "": "ordered1495",
    "": "ordered1496",
    "": "ordered1497",
    "": "ordered1498",
    "": "ordered1499",
    "": "ordered1500",
    "": "ordered1501",
    "": "ordered1502",
    "": "ordered1503",
    "": "ordered1504",
    "": "ordered1505",
    "": "ordered1506",
    "": "ordered1507",
    "": "ordered1508",
    "": "ordered1509",
    "": "ordered1510",
    "": "ordered1511",
    "": "ordered1512",
    "": "ordered1513",
    "": "ordered1514",
    "": "ordered1520",
    "": "ordered1521",
    "": "ordered1522",
    "": "ordered1523",
    "": "ordered1524",
    "": "ordered1525",
    "": "ordered1526",
    "": "ordered1527",
    "": "ordered1528",
    "": "ordered1529",
    "": "ordered1530",
    "": "ordered1531",
    "": "ordered1532",
    "": "ordered1533",
    "": "ordered1534",
    "": "ordered1535",
    "": "ordered1536",
    "": "ordered1542",
    "": "ordered1548",
    "": "ordered1554",
    "": "ordered1555",
    "": "ordered1556",
    "": "ordered1557",
    "": "ordered1558",
    "": "ordered1559",
    "": "ordered1560",
    "": "ordered1561",
    "": "ordered1562",
    "": "ordered1563",
    "": "ordered1569",
    "": "ordered1570",
    "": "ordered1571",
    "": "ordered1572",
    "": "ordered1573"
  }
}, function(e, t) {
  "use strict";
  e.exports = {
    "#⃣": "ordered0001",
    "*⃣": "ordered0002",
    "0⃣": "ordered0003",
    "1⃣": "ordered0004",
    "2⃣": "ordered0005",
    "3⃣": "ordered0006",
    "4⃣": "ordered0007",
    "5⃣": "ordered0008",
    "6⃣": "ordered0009",
    "7⃣": "ordered0010",
    "8⃣": "ordered0011",
    "9⃣": "ordered0012",
    "©": "ordered0013",
    "®": "ordered0014",
    "‼": "ordered0015",
    "⁉": "ordered0016",
    "™": "ordered0017",
    "ℹ": "ordered0018",
    "↔": "ordered0019",
    "↕": "ordered0020",
    "↖": "ordered0021",
    "↗": "ordered0022",
    "↘": "ordered0023",
    "↙": "ordered0024",
    "↩": "ordered0025",
    "↪": "ordered0026",
    "⌚": "ordered0027",
    "⌛": "ordered0028",
    "⌨": "ordered0029",
    "⏩": "ordered0030",
    "⏪": "ordered0031",
    "⏫": "ordered0032",
    "⏬": "ordered0033",
    "⏭": "ordered0034",
    "⏮": "ordered0035",
    "⏯": "ordered0036",
    "⏰": "ordered0037",
    "⏱": "ordered0038",
    "⏲": "ordered0039",
    "⏳": "ordered0040",
    "⏸": "ordered0041",
    "⏹": "ordered0042",
    "⏺": "ordered0043",
    "Ⓜ": "ordered0044",
    "▪": "ordered0045",
    "▫": "ordered0046",
    "▶": "ordered0047",
    "◀": "ordered0048",
    "◻": "ordered0049",
    "◼": "ordered0050",
    "◽": "ordered0051",
    "◾": "ordered0052",
    "☀": "ordered0053",
    "☁": "ordered0054",
    "☂": "ordered0055",
    "☃": "ordered0056",
    "☄": "ordered0057",
    "☎": "ordered0058",
    "☑": "ordered0059",
    "☔": "ordered0060",
    "☕": "ordered0061",
    "☘": "ordered0062",
    "☝": "ordered0063",
    "☝🏻": "ordered0064",
    "☝🏼": "ordered0065",
    "☝🏽": "ordered0066",
    "☝🏾": "ordered0067",
    "☝🏿": "ordered0068",
    "☠": "ordered0069",
    "☢": "ordered0070",
    "☣": "ordered0071",
    "☦": "ordered0072",
    "☪": "ordered0073",
    "☮": "ordered0074",
    "☯": "ordered0075",
    "☸": "ordered0076",
    "☹": "ordered0077",
    "☺": "ordered0078",
    "♈": "ordered0079",
    "♉": "ordered0080",
    "♊": "ordered0081",
    "♋": "ordered0082",
    "♌": "ordered0083",
    "♍": "ordered0084",
    "♎": "ordered0085",
    "♏": "ordered0086",
    "♐": "ordered0087",
    "♑": "ordered0088",
    "♒": "ordered0089",
    "♓": "ordered0090",
    "♠": "ordered0091",
    "♣": "ordered0092",
    "♥": "ordered0093",
    "♦": "ordered0094",
    "♨": "ordered0095",
    "♻": "ordered0096",
    "♿": "ordered0097",
    "⚒": "ordered0098",
    "⚓": "ordered0099",
    "⚔": "ordered0100",
    "⚖": "ordered0101",
    "⚗": "ordered0102",
    "⚙": "ordered0103",
    "⚛": "ordered0104",
    "⚜": "ordered0105",
    "⚠": "ordered0106",
    "⚡": "ordered0107",
    "⚪": "ordered0108",
    "⚫": "ordered0109",
    "⚰": "ordered0110",
    "⚱": "ordered0111",
    "⚽": "ordered0112",
    "⚾": "ordered0113",
    "⛄": "ordered0114",
    "⛅": "ordered0115",
    "⛈": "ordered0116",
    "⛎": "ordered0117",
    "⛏": "ordered0118",
    "⛑": "ordered0119",
    "⛓": "ordered0120",
    "⛔": "ordered0121",
    "⛩": "ordered0122",
    "⛪": "ordered0123",
    "⛰": "ordered0124",
    "⛱": "ordered0125",
    "⛲": "ordered0126",
    "⛳": "ordered0127",
    "⛴": "ordered0128",
    "⛵": "ordered0129",
    "⛷": "ordered0130",
    "⛸": "ordered0131",
    "⛹": "ordered0132",
    "⛹🏻": "ordered0133",
    "⛹🏼": "ordered0134",
    "⛹🏽": "ordered0135",
    "⛹🏾": "ordered0136",
    "⛹🏿": "ordered0137",
    "⛺": "ordered0138",
    "⛽": "ordered0139",
    "✂": "ordered0140",
    "✅": "ordered0141",
    "✈": "ordered0142",
    "✉": "ordered0143",
    "✊": "ordered0144",
    "✊🏻": "ordered0145",
    "✊🏼": "ordered0146",
    "✊🏽": "ordered0147",
    "✊🏾": "ordered0148",
    "✊🏿": "ordered0149",
    "✋": "ordered0150",
    "✋🏻": "ordered0151",
    "✋🏼": "ordered0152",
    "✋🏽": "ordered0153",
    "✋🏾": "ordered0154",
    "✋🏿": "ordered0155",
    "✌": "ordered0156",
    "✌🏻": "ordered0157",
    "✌🏼": "ordered0158",
    "✌🏽": "ordered0159",
    "✌🏾": "ordered0160",
    "✌🏿": "ordered0161",
    "✍": "ordered0162",
    "✍🏻": "ordered0163",
    "✍🏼": "ordered0164",
    "✍🏽": "ordered0165",
    "✍🏾": "ordered0166",
    "✍🏿": "ordered0167",
    "✏": "ordered0168",
    "✒": "ordered0169",
    "✔": "ordered0170",
    "✖": "ordered0171",
    "✝": "ordered0172",
    "✡": "ordered0173",
    "✨": "ordered0174",
    "✳": "ordered0175",
    "✴": "ordered0176",
    "❄": "ordered0177",
    "❇": "ordered0178",
    "❌": "ordered0179",
    "❎": "ordered0180",
    "❓": "ordered0181",
    "❔": "ordered0182",
    "❕": "ordered0183",
    "❗": "ordered0184",
    "❣": "ordered0185",
    "❤": "ordered0186",
    "➕": "ordered0187",
    "➖": "ordered0188",
    "➗": "ordered0189",
    "➡": "ordered0190",
    "➰": "ordered0191",
    "➿": "ordered0192",
    "⤴": "ordered0193",
    "⤵": "ordered0194",
    "⬅": "ordered0195",
    "⬆": "ordered0196",
    "⬇": "ordered0197",
    "⬛": "ordered0198",
    "⬜": "ordered0199",
    "⭐": "ordered0200",
    "⭕": "ordered0201",
    "〰": "ordered0202",
    "〽": "ordered0203",
    "㊗": "ordered0204",
    "㊙": "ordered0205",
    "🀄": "ordered0206",
    "🃏": "ordered0207",
    "🅰": "ordered0208",
    "🅱": "ordered0209",
    "🅾": "ordered0210",
    "🅿": "ordered0211",
    "🆎": "ordered0212",
    "🆑": "ordered0213",
    "🆒": "ordered0214",
    "🆓": "ordered0215",
    "🆔": "ordered0216",
    "🆕": "ordered0217",
    "🆖": "ordered0218",
    "🆗": "ordered0219",
    "🆘": "ordered0220",
    "🆙": "ordered0221",
    "🆚": "ordered0222",
    "🇦🇩": "ordered0223",
    "🇦🇪": "ordered0224",
    "🇦🇫": "ordered0225",
    "🇦🇬": "ordered0226",
    "🇦🇮": "ordered0227",
    "🇦🇱": "ordered0228",
    "🇦🇲": "ordered0229",
    "🇦🇴": "ordered0230",
    "🇦🇶": "ordered0231",
    "🇦🇷": "ordered0232",
    "🇦🇸": "ordered0233",
    "🇦🇹": "ordered0234",
    "🇦🇺": "ordered0235",
    "🇦🇼": "ordered0236",
    "🇦🇽": "ordered0237",
    "🇦🇿": "ordered0238",
    "🇧🇦": "ordered0239",
    "🇧🇧": "ordered0240",
    "🇧🇩": "ordered0241",
    "🇧🇪": "ordered0242",
    "🇧🇫": "ordered0243",
    "🇧🇬": "ordered0244",
    "🇧🇭": "ordered0245",
    "🇧🇮": "ordered0246",
    "🇧🇯": "ordered0247",
    "🇧🇱": "ordered0248",
    "🇧🇲": "ordered0249",
    "🇧🇳": "ordered0250",
    "🇧🇴": "ordered0251",
    "🇧🇶": "ordered0252",
    "🇧🇷": "ordered0253",
    "🇧🇸": "ordered0254",
    "🇧🇹": "ordered0255",
    "🇧🇼": "ordered0256",
    "🇧🇾": "ordered0257",
    "🇧🇿": "ordered0258",
    "🇨🇦": "ordered0259",
    "🇨🇨": "ordered0260",
    "🇨🇩": "ordered0261",
    "🇨🇫": "ordered0262",
    "🇨🇬": "ordered0263",
    "🇨🇭": "ordered0264",
    "🇨🇮": "ordered0265",
    "🇨🇰": "ordered0266",
    "🇨🇱": "ordered0267",
    "🇨🇲": "ordered0268",
    "🇨🇳": "ordered0269",
    "🇨🇴": "ordered0270",
    "🇨🇷": "ordered0271",
    "🇨🇺": "ordered0272",
    "🇨🇻": "ordered0273",
    "🇨🇼": "ordered0274",
    "🇨🇽": "ordered0275",
    "🇨🇾": "ordered0276",
    "🇨🇿": "ordered0277",
    "🇩🇪": "ordered0278",
    "🇩🇯": "ordered0279",
    "🇩🇰": "ordered0280",
    "🇩🇲": "ordered0281",
    "🇩🇴": "ordered0282",
    "🇩🇿": "ordered0283",
    "🇪🇨": "ordered0284",
    "🇪🇪": "ordered0285",
    "🇪🇬": "ordered0286",
    "🇪🇭": "ordered0287",
    "🇪🇷": "ordered0288",
    "🇪🇸": "ordered0289",
    "🇪🇹": "ordered0290",
    "🇪🇺": "ordered0291",
    "🇫🇮": "ordered0292",
    "🇫🇯": "ordered0293",
    "🇫🇰": "ordered0294",
    "🇫🇲": "ordered0295",
    "🇫🇴": "ordered0296",
    "🇫🇷": "ordered0297",
    "🇬🇦": "ordered0298",
    "🇬🇧": "ordered0299",
    "🇬🇩": "ordered0300",
    "🇬🇪": "ordered0301",
    "🇬🇫": "ordered0302",
    "🇬🇬": "ordered0303",
    "🇬🇭": "ordered0304",
    "🇬🇮": "ordered0305",
    "🇬🇱": "ordered0306",
    "🇬🇲": "ordered0307",
    "🇬🇳": "ordered0308",
    "🇬🇵": "ordered0309",
    "🇬🇶": "ordered0310",
    "🇬🇷": "ordered0311",
    "🇬🇸": "ordered0312",
    "🇬🇹": "ordered0313",
    "🇬🇺": "ordered0314",
    "🇬🇼": "ordered0315",
    "🇬🇾": "ordered0316",
    "🇭🇰": "ordered0317",
    "🇭🇳": "ordered0318",
    "🇭🇷": "ordered0319",
    "🇭🇹": "ordered0320",
    "🇭🇺": "ordered0321",
    "🇮🇨": "ordered0322",
    "🇮🇩": "ordered0323",
    "🇮🇪": "ordered0324",
    "🇮🇱": "ordered0325",
    "🇮🇲": "ordered0326",
    "🇮🇳": "ordered0327",
    "🇮🇴": "ordered0328",
    "🇮🇶": "ordered0329",
    "🇮🇷": "ordered0330",
    "🇮🇸": "ordered0331",
    "🇮🇹": "ordered0332",
    "🇯🇪": "ordered0333",
    "🇯🇲": "ordered0334",
    "🇯🇴": "ordered0335",
    "🇯🇵": "ordered0336",
    "🇰🇪": "ordered0337",
    "🇰🇬": "ordered0338",
    "🇰🇭": "ordered0339",
    "🇰🇮": "ordered0340",
    "🇰🇲": "ordered0341",
    "🇰🇳": "ordered0342",
    "🇰🇵": "ordered0343",
    "🇰🇷": "ordered0344",
    "🇰🇼": "ordered0345",
    "🇰🇾": "ordered0346",
    "🇰🇿": "ordered0347",
    "🇱🇦": "ordered0348",
    "🇱🇧": "ordered0349",
    "🇱🇨": "ordered0350",
    "🇱🇮": "ordered0351",
    "🇱🇰": "ordered0352",
    "🇱🇷": "ordered0353",
    "🇱🇸": "ordered0354",
    "🇱🇹": "ordered0355",
    "🇱🇺": "ordered0356",
    "🇱🇻": "ordered0357",
    "🇱🇾": "ordered0358",
    "🇲🇦": "ordered0359",
    "🇲🇨": "ordered0360",
    "🇲🇩": "ordered0361",
    "🇲🇪": "ordered0362",
    "🇲🇬": "ordered0363",
    "🇲🇭": "ordered0364",
    "🇲🇰": "ordered0365",
    "🇲🇱": "ordered0366",
    "🇲🇲": "ordered0367",
    "🇲🇳": "ordered0368",
    "🇲🇴": "ordered0369",
    "🇲🇵": "ordered0370",
    "🇲🇶": "ordered0371",
    "🇲🇷": "ordered0372",
    "🇲🇸": "ordered0373",
    "🇲🇹": "ordered0374",
    "🇲🇺": "ordered0375",
    "🇲🇻": "ordered0376",
    "🇲🇼": "ordered0377",
    "🇲🇽": "ordered0378",
    "🇲🇾": "ordered0379",
    "🇲🇿": "ordered0380",
    "🇳🇦": "ordered0381",
    "🇳🇨": "ordered0382",
    "🇳🇪": "ordered0383",
    "🇳🇫": "ordered0384",
    "🇳🇬": "ordered0385",
    "🇳🇮": "ordered0386",
    "🇳🇱": "ordered0387",
    "🇳🇴": "ordered0388",
    "🇳🇵": "ordered0389",
    "🇳🇷": "ordered0390",
    "🇳🇺": "ordered0391",
    "🇳🇿": "ordered0392",
    "🇴🇲": "ordered0393",
    "🇵🇦": "ordered0394",
    "🇵🇪": "ordered0395",
    "🇵🇫": "ordered0396",
    "🇵🇬": "ordered0397",
    "🇵🇭": "ordered0398",
    "🇵🇰": "ordered0399",
    "🇵🇱": "ordered0400",
    "🇵🇲": "ordered0401",
    "🇵🇳": "ordered0402",
    "🇵🇷": "ordered0403",
    "🇵🇸": "ordered0404",
    "🇵🇹": "ordered0405",
    "🇵🇼": "ordered0406",
    "🇵🇾": "ordered0407",
    "🇶🇦": "ordered0408",
    "🇷🇪": "ordered0409",
    "🇷🇴": "ordered0410",
    "🇷🇸": "ordered0411",
    "🇷🇺": "ordered0412",
    "🇷🇼": "ordered0413",
    "🇸🇦": "ordered0414",
    "🇸🇧": "ordered0415",
    "🇸🇨": "ordered0416",
    "🇸🇩": "ordered0417",
    "🇸🇪": "ordered0418",
    "🇸🇬": "ordered0419",
    "🇸🇭": "ordered0420",
    "🇸🇮": "ordered0421",
    "🇸🇰": "ordered0422",
    "🇸🇱": "ordered0423",
    "🇸🇲": "ordered0424",
    "🇸🇳": "ordered0425",
    "🇸🇴": "ordered0426",
    "🇸🇷": "ordered0427",
    "🇸🇸": "ordered0428",
    "🇸🇹": "ordered0429",
    "🇸🇻": "ordered0430",
    "🇸🇽": "ordered0431",
    "🇸🇾": "ordered0432",
    "🇸🇿": "ordered0433",
    "🇹🇨": "ordered0434",
    "🇹🇩": "ordered0435",
    "🇹🇫": "ordered0436",
    "🇹🇬": "ordered0437",
    "🇹🇭": "ordered0438",
    "🇹🇯": "ordered0439",
    "🇹🇰": "ordered0440",
    "🇹🇱": "ordered0441",
    "🇹🇲": "ordered0442",
    "🇹🇳": "ordered0443",
    "🇹🇴": "ordered0444",
    "🇹🇷": "ordered0445",
    "🇹🇹": "ordered0446",
    "🇹🇻": "ordered0447",
    "🇹🇼": "ordered0448",
    "🇹🇿": "ordered0449",
    "🇺🇦": "ordered0450",
    "🇺🇬": "ordered0451",
    "🇺🇸": "ordered0452",
    "🇺🇾": "ordered0453",
    "🇺🇿": "ordered0454",
    "🇻🇦": "ordered0455",
    "🇻🇨": "ordered0456",
    "🇻🇪": "ordered0457",
    "🇻🇬": "ordered0458",
    "🇻🇮": "ordered0459",
    "🇻🇳": "ordered0460",
    "🇻🇺": "ordered0461",
    "🇼🇫": "ordered0462",
    "🇼🇸": "ordered0463",
    "🇽🇰": "ordered0464",
    "🇾🇪": "ordered0465",
    "🇾🇹": "ordered0466",
    "🇿🇦": "ordered0467",
    "🇿🇲": "ordered0468",
    "🇿🇼": "ordered0469",
    "🈁": "ordered0470",
    "🈂": "ordered0471",
    "🈚": "ordered0472",
    "🈯": "ordered0473",
    "🈲": "ordered0474",
    "🈳": "ordered0475",
    "🈴": "ordered0476",
    "🈵": "ordered0477",
    "🈶": "ordered0478",
    "🈷": "ordered0479",
    "🈸": "ordered0480",
    "🈹": "ordered0481",
    "🈺": "ordered0482",
    "🉐": "ordered0483",
    "🉑": "ordered0484",
    "🌀": "ordered0485",
    "🌁": "ordered0486",
    "🌂": "ordered0487",
    "🌃": "ordered0488",
    "🌄": "ordered0489",
    "🌅": "ordered0490",
    "🌆": "ordered0491",
    "🌇": "ordered0492",
    "🌈": "ordered0493",
    "🌉": "ordered0494",
    "🌊": "ordered0495",
    "🌋": "ordered0496",
    "🌌": "ordered0497",
    "🌍": "ordered0498",
    "🌎": "ordered0499",
    "🌏": "ordered0500",
    "🌐": "ordered0501",
    "🌑": "ordered0502",
    "🌒": "ordered0503",
    "🌓": "ordered0504",
    "🌔": "ordered0505",
    "🌕": "ordered0506",
    "🌖": "ordered0507",
    "🌗": "ordered0508",
    "🌘": "ordered0509",
    "🌙": "ordered0510",
    "🌚": "ordered0511",
    "🌛": "ordered0512",
    "🌜": "ordered0513",
    "🌝": "ordered0514",
    "🌞": "ordered0515",
    "🌟": "ordered0516",
    "🌠": "ordered0517",
    "🌡": "ordered0518",
    "🌤": "ordered0519",
    "🌥": "ordered0520",
    "🌦": "ordered0521",
    "🌧": "ordered0522",
    "🌨": "ordered0523",
    "🌩": "ordered0524",
    "🌪": "ordered0525",
    "🌫": "ordered0526",
    "🌬": "ordered0527",
    "🌭": "ordered0528",
    "🌮": "ordered0529",
    "🌯": "ordered0530",
    "🌰": "ordered0531",
    "🌱": "ordered0532",
    "🌲": "ordered0533",
    "🌳": "ordered0534",
    "🌴": "ordered0535",
    "🌵": "ordered0536",
    "🌶": "ordered0537",
    "🌷": "ordered0538",
    "🌸": "ordered0539",
    "🌹": "ordered0540",
    "🌺": "ordered0541",
    "🌻": "ordered0542",
    "🌼": "ordered0543",
    "🌽": "ordered0544",
    "🌾": "ordered0545",
    "🌿": "ordered0546",
    "🍀": "ordered0547",
    "🍁": "ordered0548",
    "🍂": "ordered0549",
    "🍃": "ordered0550",
    "🍄": "ordered0551",
    "🍅": "ordered0552",
    "🍆": "ordered0553",
    "🍇": "ordered0554",
    "🍈": "ordered0555",
    "🍉": "ordered0556",
    "🍊": "ordered0557",
    "🍋": "ordered0558",
    "🍌": "ordered0559",
    "🍍": "ordered0560",
    "🍎": "ordered0561",
    "🍏": "ordered0562",
    "🍐": "ordered0563",
    "🍑": "ordered0564",
    "🍒": "ordered0565",
    "🍓": "ordered0566",
    "🍔": "ordered0567",
    "🍕": "ordered0568",
    "🍖": "ordered0569",
    "🍗": "ordered0570",
    "🍘": "ordered0571",
    "🍙": "ordered0572",
    "🍚": "ordered0573",
    "🍛": "ordered0574",
    "🍜": "ordered0575",
    "🍝": "ordered0576",
    "🍞": "ordered0577",
    "🍟": "ordered0578",
    "🍠": "ordered0579",
    "🍡": "ordered0580",
    "🍢": "ordered0581",
    "🍣": "ordered0582",
    "🍤": "ordered0583",
    "🍥": "ordered0584",
    "🍦": "ordered0585",
    "🍧": "ordered0586",
    "🍨": "ordered0587",
    "🍩": "ordered0588",
    "🍪": "ordered0589",
    "🍫": "ordered0590",
    "🍬": "ordered0591",
    "🍭": "ordered0592",
    "🍮": "ordered0593",
    "🍯": "ordered0594",
    "🍰": "ordered0595",
    "🍱": "ordered0596",
    "🍲": "ordered0597",
    "🍳": "ordered0598",
    "🍴": "ordered0599",
    "🍵": "ordered0600",
    "🍶": "ordered0601",
    "🍷": "ordered0602",
    "🍸": "ordered0603",
    "🍹": "ordered0604",
    "🍺": "ordered0605",
    "🍻": "ordered0606",
    "🍼": "ordered0607",
    "🍽": "ordered0608",
    "🍾": "ordered0609",
    "🍿": "ordered0610",
    "🎀": "ordered0611",
    "🎁": "ordered0612",
    "🎂": "ordered0613",
    "🎃": "ordered0614",
    "🎄": "ordered0615",
    "🎅": "ordered0616",
    "🎅🏻": "ordered0617",
    "🎅🏼": "ordered0618",
    "🎅🏽": "ordered0619",
    "🎅🏾": "ordered0620",
    "🎅🏿": "ordered0621",
    "🎆": "ordered0622",
    "🎇": "ordered0623",
    "🎈": "ordered0624",
    "🎉": "ordered0625",
    "🎊": "ordered0626",
    "🎋": "ordered0627",
    "🎌": "ordered0628",
    "🎍": "ordered0629",
    "🎎": "ordered0630",
    "🎏": "ordered0631",
    "🎐": "ordered0632",
    "🎑": "ordered0633",
    "🎒": "ordered0634",
    "🎓": "ordered0635",
    "🎖": "ordered0636",
    "🎗": "ordered0637",
    "🎙": "ordered0638",
    "🎚": "ordered0639",
    "🎛": "ordered0640",
    "🎞": "ordered0641",
    "🎟": "ordered0642",
    "🎠": "ordered0643",
    "🎡": "ordered0644",
    "🎢": "ordered0645",
    "🎣": "ordered0646",
    "🎤": "ordered0647",
    "🎥": "ordered0648",
    "🎦": "ordered0649",
    "🎧": "ordered0650",
    "🎨": "ordered0651",
    "🎩": "ordered0652",
    "🎪": "ordered0653",
    "🎫": "ordered0654",
    "🎬": "ordered0655",
    "🎭": "ordered0656",
    "🎮": "ordered0657",
    "🎯": "ordered0658",
    "🎰": "ordered0659",
    "🎱": "ordered0660",
    "🎲": "ordered0661",
    "🎳": "ordered0662",
    "🎴": "ordered0663",
    "🎵": "ordered0664",
    "🎶": "ordered0665",
    "🎷": "ordered0666",
    "🎸": "ordered0667",
    "🎹": "ordered0668",
    "🎺": "ordered0669",
    "🎻": "ordered0670",
    "🎼": "ordered0671",
    "🎽": "ordered0672",
    "🎾": "ordered0673",
    "🎿": "ordered0674",
    "🏀": "ordered0675",
    "🏁": "ordered0676",
    "🏂": "ordered0677",
    "🏃": "ordered0678",
    "🏃🏻": "ordered0679",
    "🏃🏼": "ordered0680",
    "🏃🏽": "ordered0681",
    "🏃🏾": "ordered0682",
    "🏃🏿": "ordered0683",
    "🏄": "ordered0684",
    "🏄🏻": "ordered0685",
    "🏄🏼": "ordered0686",
    "🏄🏽": "ordered0687",
    "🏄🏾": "ordered0688",
    "🏄🏿": "ordered0689",
    "🏅": "ordered0690",
    "🏆": "ordered0691",
    "🏇": "ordered0692",
    "🏇🏻": "ordered0693",
    "🏇🏼": "ordered0694",
    "🏇🏽": "ordered0695",
    "🏇🏾": "ordered0696",
    "🏇🏿": "ordered0697",
    "🏈": "ordered0698",
    "🏉": "ordered0699",
    "🏊": "ordered0700",
    "🏊🏻": "ordered0701",
    "🏊🏼": "ordered0702",
    "🏊🏽": "ordered0703",
    "🏊🏾": "ordered0704",
    "🏊🏿": "ordered0705",
    "🏋": "ordered0706",
    "🏋🏻": "ordered0707",
    "🏋🏼": "ordered0708",
    "🏋🏽": "ordered0709",
    "🏋🏾": "ordered0710",
    "🏋🏿": "ordered0711",
    "🏌": "ordered0712",
    "🏍": "ordered0713",
    "🏎": "ordered0714",
    "🏏": "ordered0715",
    "🏐": "ordered0716",
    "🏑": "ordered0717",
    "🏒": "ordered0718",
    "🏓": "ordered0719",
    "🏔": "ordered0720",
    "🏕": "ordered0721",
    "🏖": "ordered0722",
    "🏗": "ordered0723",
    "🏘": "ordered0724",
    "🏙": "ordered0725",
    "🏚": "ordered0726",
    "🏛": "ordered0727",
    "🏜": "ordered0728",
    "🏝": "ordered0729",
    "🏞": "ordered0730",
    "🏟": "ordered0731",
    "🏠": "ordered0732",
    "🏡": "ordered0733",
    "🏢": "ordered0734",
    "🏣": "ordered0735",
    "🏤": "ordered0736",
    "🏥": "ordered0737",
    "🏦": "ordered0738",
    "🏧": "ordered0739",
    "🏨": "ordered0740",
    "🏩": "ordered0741",
    "🏪": "ordered0742",
    "🏫": "ordered0743",
    "🏬": "ordered0744",
    "🏭": "ordered0745",
    "🏮": "ordered0746",
    "🏯": "ordered0747",
    "🏰": "ordered0748",
    "🏳": "ordered0749",
    "🏴": "ordered0750",
    "🏵": "ordered0751",
    "🏷": "ordered0752",
    "🏸": "ordered0753",
    "🏹": "ordered0754",
    "🏺": "ordered0755",
    "🏻": "ordered0756",
    "🏼": "ordered0757",
    "🏽": "ordered0758",
    "🏾": "ordered0759",
    "🏿": "ordered0760",
    "🐀": "ordered0761",
    "🐁": "ordered0762",
    "🐂": "ordered0763",
    "🐃": "ordered0764",
    "🐄": "ordered0765",
    "🐅": "ordered0766",
    "🐆": "ordered0767",
    "🐇": "ordered0768",
    "🐈": "ordered0769",
    "🐉": "ordered0770",
    "🐊": "ordered0771",
    "🐋": "ordered0772",
    "🐌": "ordered0773",
    "🐍": "ordered0774",
    "🐎": "ordered0775",
    "🐏": "ordered0776",
    "🐐": "ordered0777",
    "🐑": "ordered0778",
    "🐒": "ordered0779",
    "🐓": "ordered0780",
    "🐔": "ordered0781",
    "🐕": "ordered0782",
    "🐖": "ordered0783",
    "🐗": "ordered0784",
    "🐘": "ordered0785",
    "🐙": "ordered0786",
    "🐚": "ordered0787",
    "🐛": "ordered0788",
    "🐜": "ordered0789",
    "🐝": "ordered0790",
    "🐞": "ordered0791",
    "🐟": "ordered0792",
    "🐠": "ordered0793",
    "🐡": "ordered0794",
    "🐢": "ordered0795",
    "🐣": "ordered0796",
    "🐤": "ordered0797",
    "🐥": "ordered0798",
    "🐦": "ordered0799",
    "🐧": "ordered0800",
    "🐨": "ordered0801",
    "🐩": "ordered0802",
    "🐪": "ordered0803",
    "🐫": "ordered0804",
    "🐬": "ordered0805",
    "🐭": "ordered0806",
    "🐮": "ordered0807",
    "🐯": "ordered0808",
    "🐰": "ordered0809",
    "🐱": "ordered0810",
    "🐲": "ordered0811",
    "🐳": "ordered0812",
    "🐴": "ordered0813",
    "🐵": "ordered0814",
    "🐶": "ordered0815",
    "🐷": "ordered0816",
    "🐸": "ordered0817",
    "🐹": "ordered0818",
    "🐺": "ordered0819",
    "🐻": "ordered0820",
    "🐼": "ordered0821",
    "🐽": "ordered0822",
    "🐾": "ordered0823",
    "🐿": "ordered0824",
    "👀": "ordered0825",
    "👁": "ordered0826",
    "👁‍🗨": "ordered0827",
    "👂": "ordered0828",
    "👂🏻": "ordered0829",
    "👂🏼": "ordered0830",
    "👂🏽": "ordered0831",
    "👂🏾": "ordered0832",
    "👂🏿": "ordered0833",
    "👃": "ordered0834",
    "👃🏻": "ordered0835",
    "👃🏼": "ordered0836",
    "👃🏽": "ordered0837",
    "👃🏾": "ordered0838",
    "👃🏿": "ordered0839",
    "👄": "ordered0840",
    "👅": "ordered0841",
    "👆": "ordered0842",
    "👆🏻": "ordered0843",
    "👆🏼": "ordered0844",
    "👆🏽": "ordered0845",
    "👆🏾": "ordered0846",
    "👆🏿": "ordered0847",
    "👇": "ordered0848",
    "👇🏻": "ordered0849",
    "👇🏼": "ordered0850",
    "👇🏽": "ordered0851",
    "👇🏾": "ordered0852",
    "👇🏿": "ordered0853",
    "👈": "ordered0854",
    "👈🏻": "ordered0855",
    "👈🏼": "ordered0856",
    "👈🏽": "ordered0857",
    "👈🏾": "ordered0858",
    "👈🏿": "ordered0859",
    "👉": "ordered0860",
    "👉🏻": "ordered0861",
    "👉🏼": "ordered0862",
    "👉🏽": "ordered0863",
    "👉🏾": "ordered0864",
    "👉🏿": "ordered0865",
    "👊": "ordered0866",
    "👊🏻": "ordered0867",
    "👊🏼": "ordered0868",
    "👊🏽": "ordered0869",
    "👊🏾": "ordered0870",
    "👊🏿": "ordered0871",
    "👋": "ordered0872",
    "👋🏻": "ordered0873",
    "👋🏼": "ordered0874",
    "👋🏽": "ordered0875",
    "👋🏾": "ordered0876",
    "👋🏿": "ordered0877",
    "👌": "ordered0878",
    "👌🏻": "ordered0879",
    "👌🏼": "ordered0880",
    "👌🏽": "ordered0881",
    "👌🏾": "ordered0882",
    "👌🏿": "ordered0883",
    "👍": "ordered0884",
    "👍🏻": "ordered0885",
    "👍🏼": "ordered0886",
    "👍🏽": "ordered0887",
    "👍🏾": "ordered0888",
    "👍🏿": "ordered0889",
    "👎": "ordered0890",
    "👎🏻": "ordered0891",
    "👎🏼": "ordered0892",
    "👎🏽": "ordered0893",
    "👎🏾": "ordered0894",
    "👎🏿": "ordered0895",
    "👏": "ordered0896",
    "👏🏻": "ordered0897",
    "👏🏼": "ordered0898",
    "👏🏽": "ordered0899",
    "👏🏾": "ordered0900",
    "👏🏿": "ordered0901",
    "👐": "ordered0902",
    "👐🏻": "ordered0903",
    "👐🏼": "ordered0904",
    "👐🏽": "ordered0905",
    "👐🏾": "ordered0906",
    "👐🏿": "ordered0907",
    "👑": "ordered0908",
    "👒": "ordered0909",
    "👓": "ordered0910",
    "👔": "ordered0911",
    "👕": "ordered0912",
    "👖": "ordered0913",
    "👗": "ordered0914",
    "👘": "ordered0915",
    "👙": "ordered0916",
    "👚": "ordered0917",
    "👛": "ordered0918",
    "👜": "ordered0919",
    "👝": "ordered0920",
    "👞": "ordered0921",
    "👟": "ordered0922",
    "👠": "ordered0923",
    "👡": "ordered0924",
    "👢": "ordered0925",
    "👣": "ordered0926",
    "👤": "ordered0927",
    "👥": "ordered0928",
    "👦": "ordered0929",
    "👦🏻": "ordered0930",
    "👦🏼": "ordered0931",
    "👦🏽": "ordered0932",
    "👦🏾": "ordered0933",
    "👦🏿": "ordered0934",
    "👧": "ordered0935",
    "👧🏻": "ordered0936",
    "👧🏼": "ordered0937",
    "👧🏽": "ordered0938",
    "👧🏾": "ordered0939",
    "👧🏿": "ordered0940",
    "👨": "ordered0941",
    "👨🏻": "ordered0942",
    "👨🏼": "ordered0943",
    "👨🏽": "ordered0944",
    "👨🏾": "ordered0945",
    "👨🏿": "ordered0946",
    "👩": "ordered0947",
    "👩🏻": "ordered0948",
    "👩🏼": "ordered0949",
    "👩🏽": "ordered0950",
    "👩🏾": "ordered0951",
    "👩🏿": "ordered0952",
    "👪": "ordered0953",
    "👨‍👨‍👦": "ordered0954",
    "👨‍👨‍👦‍👦": "ordered0955",
    "👨‍👨‍👧": "ordered0956",
    "👨‍👨‍👧‍👦": "ordered0957",
    "👨‍👨‍👧‍👧": "ordered0958",
    "👨‍👩‍👦‍👦": "ordered0959",
    "👨‍👩‍👧": "ordered0960",
    "👨‍👩‍👧‍👦": "ordered0961",
    "👨‍👩‍👧‍👧": "ordered0962",
    "👩‍👩‍👦": "ordered0963",
    "👩‍👩‍👦‍👦": "ordered0964",
    "👩‍👩‍👧": "ordered0965",
    "👩‍👩‍👧‍👦": "ordered0966",
    "👩‍👩‍👧‍👧": "ordered0967",
    "👫": "ordered0968",
    "👬": "ordered0969",
    "👭": "ordered0970",
    "👮": "ordered0971",
    "👮🏻": "ordered0972",
    "👮🏼": "ordered0973",
    "👮🏽": "ordered0974",
    "👮🏾": "ordered0975",
    "👮🏿": "ordered0976",
    "👯": "ordered0977",
    "👰": "ordered0978",
    "👰🏻": "ordered0979",
    "👰🏼": "ordered0980",
    "👰🏽": "ordered0981",
    "👰🏾": "ordered0982",
    "👰🏿": "ordered0983",
    "👱": "ordered0984",
    "👱🏻": "ordered0985",
    "👱🏼": "ordered0986",
    "👱🏽": "ordered0987",
    "👱🏾": "ordered0988",
    "👱🏿": "ordered0989",
    "👲": "ordered0990",
    "👲🏻": "ordered0991",
    "👲🏼": "ordered0992",
    "👲🏽": "ordered0993",
    "👲🏾": "ordered0994",
    "👲🏿": "ordered0995",
    "👳": "ordered0996",
    "👳🏻": "ordered0997",
    "👳🏼": "ordered0998",
    "👳🏽": "ordered0999",
    "👳🏾": "ordered1000",
    "👳🏿": "ordered1001",
    "👴": "ordered1002",
    "👴🏻": "ordered1003",
    "👴🏼": "ordered1004",
    "👴🏽": "ordered1005",
    "👴🏾": "ordered1006",
    "👴🏿": "ordered1007",
    "👵": "ordered1008",
    "👵🏻": "ordered1009",
    "👵🏼": "ordered1010",
    "👵🏽": "ordered1011",
    "👵🏾": "ordered1012",
    "👵🏿": "ordered1013",
    "👶": "ordered1014",
    "👶🏻": "ordered1015",
    "👶🏼": "ordered1016",
    "👶🏽": "ordered1017",
    "👶🏾": "ordered1018",
    "👶🏿": "ordered1019",
    "👷": "ordered1020",
    "👷🏻": "ordered1021",
    "👷🏼": "ordered1022",
    "👷🏽": "ordered1023",
    "👷🏾": "ordered1024",
    "👷🏿": "ordered1025",
    "👸": "ordered1026",
    "👸🏻": "ordered1027",
    "👸🏼": "ordered1028",
    "👸🏽": "ordered1029",
    "👸🏾": "ordered1030",
    "👸🏿": "ordered1031",
    "👹": "ordered1032",
    "👺": "ordered1033",
    "👻": "ordered1034",
    "👼": "ordered1035",
    "👼🏻": "ordered1036",
    "👼🏼": "ordered1037",
    "👼🏽": "ordered1038",
    "👼🏾": "ordered1039",
    "👼🏿": "ordered1040",
    "👽": "ordered1041",
    "👾": "ordered1042",
    "👿": "ordered1043",
    "💀": "ordered1044",
    "💁": "ordered1045",
    "💁🏻": "ordered1046",
    "💁🏼": "ordered1047",
    "💁🏽": "ordered1048",
    "💁🏾": "ordered1049",
    "💁🏿": "ordered1050",
    "💂": "ordered1051",
    "💂🏻": "ordered1052",
    "💂🏼": "ordered1053",
    "💂🏽": "ordered1054",
    "💂🏾": "ordered1055",
    "💂🏿": "ordered1056",
    "💃": "ordered1057",
    "💃🏻": "ordered1058",
    "💃🏼": "ordered1059",
    "💃🏽": "ordered1060",
    "💃🏾": "ordered1061",
    "💃🏿": "ordered1062",
    "💄": "ordered1063",
    "💅": "ordered1064",
    "💅🏻": "ordered1065",
    "💅🏼": "ordered1066",
    "💅🏽": "ordered1067",
    "💅🏾": "ordered1068",
    "💅🏿": "ordered1069",
    "💆": "ordered1070",
    "💆🏻": "ordered1071",
    "💆🏼": "ordered1072",
    "💆🏽": "ordered1073",
    "💆🏾": "ordered1074",
    "💆🏿": "ordered1075",
    "💇": "ordered1076",
    "💇🏻": "ordered1077",
    "💇🏼": "ordered1078",
    "💇🏽": "ordered1079",
    "💇🏾": "ordered1080",
    "💇🏿": "ordered1081",
    "💈": "ordered1082",
    "💉": "ordered1083",
    "💊": "ordered1084",
    "💋": "ordered1085",
    "💌": "ordered1086",
    "💍": "ordered1087",
    "💎": "ordered1088",
    "💏": "ordered1089",
    "👨‍❤️‍💋‍👨": "ordered1090",
    "👩‍❤️‍💋‍👩": "ordered1091",
    "💐": "ordered1092",
    "💑": "ordered1093",
    "👨‍❤️‍👨": "ordered1094",
    "👩‍❤️‍👩": "ordered1095",
    "💒": "ordered1096",
    "💓": "ordered1097",
    "💔": "ordered1098",
    "💕": "ordered1099",
    "💖": "ordered1100",
    "💗": "ordered1101",
    "💘": "ordered1102",
    "💙": "ordered1103",
    "💚": "ordered1104",
    "💛": "ordered1105",
    "💜": "ordered1106",
    "💝": "ordered1107",
    "💞": "ordered1108",
    "💟": "ordered1109",
    "💠": "ordered1110",
    "💡": "ordered1111",
    "💢": "ordered1112",
    "💣": "ordered1113",
    "💤": "ordered1114",
    "💥": "ordered1115",
    "💦": "ordered1116",
    "💧": "ordered1117",
    "💨": "ordered1118",
    "💩": "ordered1119",
    "💪": "ordered1120",
    "💪🏻": "ordered1121",
    "💪🏼": "ordered1122",
    "💪🏽": "ordered1123",
    "💪🏾": "ordered1124",
    "💪🏿": "ordered1125",
    "💫": "ordered1126",
    "💬": "ordered1127",
    "💭": "ordered1128",
    "💮": "ordered1129",
    "💯": "ordered1130",
    "💰": "ordered1131",
    "💱": "ordered1132",
    "💲": "ordered1133",
    "💳": "ordered1134",
    "💴": "ordered1135",
    "💵": "ordered1136",
    "💶": "ordered1137",
    "💷": "ordered1138",
    "💸": "ordered1139",
    "💹": "ordered1140",
    "💺": "ordered1141",
    "💻": "ordered1142",
    "💼": "ordered1143",
    "💽": "ordered1144",
    "💾": "ordered1145",
    "💿": "ordered1146",
    "📀": "ordered1147",
    "📁": "ordered1148",
    "📂": "ordered1149",
    "📃": "ordered1150",
    "📄": "ordered1151",
    "📅": "ordered1152",
    "📆": "ordered1153",
    "📇": "ordered1154",
    "📈": "ordered1155",
    "📉": "ordered1156",
    "📊": "ordered1157",
    "📋": "ordered1158",
    "📌": "ordered1159",
    "📍": "ordered1160",
    "📎": "ordered1161",
    "📏": "ordered1162",
    "📐": "ordered1163",
    "📑": "ordered1164",
    "📒": "ordered1165",
    "📓": "ordered1166",
    "📔": "ordered1167",
    "📕": "ordered1168",
    "📖": "ordered1169",
    "📗": "ordered1170",
    "📘": "ordered1171",
    "📙": "ordered1172",
    "📚": "ordered1173",
    "📛": "ordered1174",
    "📜": "ordered1175",
    "📝": "ordered1176",
    "📞": "ordered1177",
    "📟": "ordered1178",
    "📠": "ordered1179",
    "📡": "ordered1180",
    "📢": "ordered1181",
    "📣": "ordered1182",
    "📤": "ordered1183",
    "📥": "ordered1184",
    "📦": "ordered1185",
    "📧": "ordered1186",
    "📨": "ordered1187",
    "📩": "ordered1188",
    "📪": "ordered1189",
    "📫": "ordered1190",
    "📬": "ordered1191",
    "📭": "ordered1192",
    "📮": "ordered1193",
    "📯": "ordered1194",
    "📰": "ordered1195",
    "📱": "ordered1196",
    "📲": "ordered1197",
    "📳": "ordered1198",
    "📴": "ordered1199",
    "📵": "ordered1200",
    "📶": "ordered1201",
    "📷": "ordered1202",
    "📸": "ordered1203",
    "📹": "ordered1204",
    "📺": "ordered1205",
    "📻": "ordered1206",
    "📼": "ordered1207",
    "📽": "ordered1208",
    "📿": "ordered1209",
    "🔀": "ordered1210",
    "🔁": "ordered1211",
    "🔂": "ordered1212",
    "🔃": "ordered1213",
    "🔄": "ordered1214",
    "🔅": "ordered1215",
    "🔆": "ordered1216",
    "🔇": "ordered1217",
    "🔈": "ordered1218",
    "🔉": "ordered1219",
    "🔊": "ordered1220",
    "🔋": "ordered1221",
    "🔌": "ordered1222",
    "🔍": "ordered1223",
    "🔎": "ordered1224",
    "🔏": "ordered1225",
    "🔐": "ordered1226",
    "🔑": "ordered1227",
    "🔒": "ordered1228",
    "🔓": "ordered1229",
    "🔔": "ordered1230",
    "🔕": "ordered1231",
    "🔖": "ordered1232",
    "🔗": "ordered1233",
    "🔘": "ordered1234",
    "🔙": "ordered1235",
    "🔚": "ordered1236",
    "🔛": "ordered1237",
    "🔜": "ordered1238",
    "🔝": "ordered1239",
    "🔞": "ordered1240",
    "🔟": "ordered1241",
    "🔠": "ordered1242",
    "🔡": "ordered1243",
    "🔢": "ordered1244",
    "🔣": "ordered1245",
    "🔤": "ordered1246",
    "🔥": "ordered1247",
    "🔦": "ordered1248",
    "🔧": "ordered1249",
    "🔨": "ordered1250",
    "🔩": "ordered1251",
    "🔪": "ordered1252",
    "🔫": "ordered1253",
    "🔬": "ordered1254",
    "🔭": "ordered1255",
    "🔮": "ordered1256",
    "🔯": "ordered1257",
    "🔰": "ordered1258",
    "🔱": "ordered1259",
    "🔲": "ordered1260",
    "🔳": "ordered1261",
    "🔴": "ordered1262",
    "🔵": "ordered1263",
    "🔶": "ordered1264",
    "🔷": "ordered1265",
    "🔸": "ordered1266",
    "🔹": "ordered1267",
    "🔺": "ordered1268",
    "🔻": "ordered1269",
    "🔼": "ordered1270",
    "🔽": "ordered1271",
    "🕉": "ordered1272",
    "🕊": "ordered1273",
    "🕋": "ordered1274",
    "🕌": "ordered1275",
    "🕍": "ordered1276",
    "🕎": "ordered1277",
    "🕐": "ordered1278",
    "🕑": "ordered1279",
    "🕒": "ordered1280",
    "🕓": "ordered1281",
    "🕔": "ordered1282",
    "🕕": "ordered1283",
    "🕖": "ordered1284",
    "🕗": "ordered1285",
    "🕘": "ordered1286",
    "🕙": "ordered1287",
    "🕚": "ordered1288",
    "🕛": "ordered1289",
    "🕜": "ordered1290",
    "🕝": "ordered1291",
    "🕞": "ordered1292",
    "🕟": "ordered1293",
    "🕠": "ordered1294",
    "🕡": "ordered1295",
    "🕢": "ordered1296",
    "🕣": "ordered1297",
    "🕤": "ordered1298",
    "🕥": "ordered1299",
    "🕦": "ordered1300",
    "🕧": "ordered1301",
    "🕯": "ordered1302",
    "🕰": "ordered1303",
    "🕳": "ordered1304",
    "🕴": "ordered1305",
    "🕵": "ordered1306",
    "🕶": "ordered1307",
    "🕷": "ordered1308",
    "🕸": "ordered1309",
    "🕹": "ordered1310",
    "🖇": "ordered1311",
    "🖊": "ordered1312",
    "🖋": "ordered1313",
    "🖌": "ordered1314",
    "🖍": "ordered1315",
    "🖐": "ordered1316",
    "🖐🏻": "ordered1317",
    "🖐🏼": "ordered1318",
    "🖐🏽": "ordered1319",
    "🖐🏾": "ordered1320",
    "🖐🏿": "ordered1321",
    "🖕": "ordered1322",
    "🖕🏻": "ordered1323",
    "🖕🏼": "ordered1324",
    "🖕🏽": "ordered1325",
    "🖕🏾": "ordered1326",
    "🖕🏿": "ordered1327",
    "🖖": "ordered1328",
    "🖖🏻": "ordered1329",
    "🖖🏼": "ordered1330",
    "🖖🏽": "ordered1331",
    "🖖🏾": "ordered1332",
    "🖖🏿": "ordered1333",
    "🖥": "ordered1334",
    "🖨": "ordered1335",
    "🖱": "ordered1336",
    "🖲": "ordered1337",
    "🖼": "ordered1338",
    "🗂": "ordered1339",
    "🗃": "ordered1340",
    "🗄": "ordered1341",
    "🗑": "ordered1342",
    "🗒": "ordered1343",
    "🗓": "ordered1344",
    "🗜": "ordered1345",
    "🗝": "ordered1346",
    "🗞": "ordered1347",
    "🗡": "ordered1348",
    "🗣": "ordered1349",
    "🗨": "ordered1350",
    "🗯": "ordered1351",
    "🗳": "ordered1352",
    "🗺": "ordered1353",
    "🗻": "ordered1354",
    "🗼": "ordered1355",
    "🗽": "ordered1356",
    "🗾": "ordered1357",
    "🗿": "ordered1358",
    "😀": "ordered1359",
    "😁": "ordered1360",
    "😂": "ordered1361",
    "😃": "ordered1362",
    "😄": "ordered1363",
    "😅": "ordered1364",
    "😆": "ordered1365",
    "😇": "ordered1366",
    "😈": "ordered1367",
    "😉": "ordered1368",
    "😊": "ordered1369",
    "😋": "ordered1370",
    "😌": "ordered1371",
    "😍": "ordered1372",
    "😎": "ordered1373",
    "😏": "ordered1374",
    "😐": "ordered1375",
    "😑": "ordered1376",
    "😒": "ordered1377",
    "😓": "ordered1378",
    "😔": "ordered1379",
    "😕": "ordered1380",
    "😖": "ordered1381",
    "😗": "ordered1382",
    "😘": "ordered1383",
    "😙": "ordered1384",
    "😚": "ordered1385",
    "😛": "ordered1386",
    "😜": "ordered1387",
    "😝": "ordered1388",
    "😞": "ordered1389",
    "😟": "ordered1390",
    "😠": "ordered1391",
    "😡": "ordered1392",
    "😢": "ordered1393",
    "😣": "ordered1394",
    "😤": "ordered1395",
    "😥": "ordered1396",
    "😦": "ordered1397",
    "😧": "ordered1398",
    "😨": "ordered1399",
    "😩": "ordered1400",
    "😪": "ordered1401",
    "😫": "ordered1402",
    "😬": "ordered1403",
    "😭": "ordered1404",
    "😮": "ordered1405",
    "😯": "ordered1406",
    "😰": "ordered1407",
    "😱": "ordered1408",
    "😲": "ordered1409",
    "😳": "ordered1410",
    "😴": "ordered1411",
    "😵": "ordered1412",
    "😶": "ordered1413",
    "😷": "ordered1414",
    "😸": "ordered1415",
    "😹": "ordered1416",
    "😺": "ordered1417",
    "😻": "ordered1418",
    "😼": "ordered1419",
    "😽": "ordered1420",
    "😾": "ordered1421",
    "😿": "ordered1422",
    "🙀": "ordered1423",
    "🙁": "ordered1424",
    "🙂": "ordered1425",
    "🙃": "ordered1426",
    "🙄": "ordered1427",
    "🙅": "ordered1428",
    "🙅🏻": "ordered1429",
    "🙅🏼": "ordered1430",
    "🙅🏽": "ordered1431",
    "🙅🏾": "ordered1432",
    "🙅🏿": "ordered1433",
    "🙆": "ordered1434",
    "🙆🏻": "ordered1435",
    "🙆🏼": "ordered1436",
    "🙆🏽": "ordered1437",
    "🙆🏾": "ordered1438",
    "🙆🏿": "ordered1439",
    "🙇": "ordered1440",
    "🙇🏻": "ordered1441",
    "🙇🏼": "ordered1442",
    "🙇🏽": "ordered1443",
    "🙇🏾": "ordered1444",
    "🙇🏿": "ordered1445",
    "🙈": "ordered1446",
    "🙉": "ordered1447",
    "🙊": "ordered1448",
    "🙋": "ordered1449",
    "🙋🏻": "ordered1450",
    "🙋🏼": "ordered1451",
    "🙋🏽": "ordered1452",
    "🙋🏾": "ordered1453",
    "🙋🏿": "ordered1454",
    "🙌": "ordered1455",
    "🙌🏻": "ordered1456",
    "🙌🏼": "ordered1457",
    "🙌🏽": "ordered1458",
    "🙌🏾": "ordered1459",
    "🙌🏿": "ordered1460",
    "🙍": "ordered1461",
    "🙍🏻": "ordered1462",
    "🙍🏼": "ordered1463",
    "🙍🏽": "ordered1464",
    "🙍🏾": "ordered1465",
    "🙍🏿": "ordered1466",
    "🙎": "ordered1467",
    "🙎🏻": "ordered1468",
    "🙎🏼": "ordered1469",
    "🙎🏽": "ordered1470",
    "🙎🏾": "ordered1471",
    "🙎🏿": "ordered1472",
    "🙏": "ordered1473",
    "🙏🏻": "ordered1474",
    "🙏🏼": "ordered1475",
    "🙏🏽": "ordered1476",
    "🙏🏾": "ordered1477",
    "🙏🏿": "ordered1478",
    "🚀": "ordered1479",
    "🚁": "ordered1480",
    "🚂": "ordered1481",
    "🚃": "ordered1482",
    "🚄": "ordered1483",
    "🚅": "ordered1484",
    "🚆": "ordered1485",
    "🚇": "ordered1486",
    "🚈": "ordered1487",
    "🚉": "ordered1488",
    "🚊": "ordered1489",
    "🚋": "ordered1490",
    "🚌": "ordered1491",
    "🚍": "ordered1492",
    "🚎": "ordered1493",
    "🚏": "ordered1494",
    "🚐": "ordered1495",
    "🚑": "ordered1496",
    "🚒": "ordered1497",
    "🚓": "ordered1498",
    "🚔": "ordered1499",
    "🚕": "ordered1500",
    "🚖": "ordered1501",
    "🚗": "ordered1502",
    "🚘": "ordered1503",
    "🚙": "ordered1504",
    "🚚": "ordered1505",
    "🚛": "ordered1506",
    "🚜": "ordered1507",
    "🚝": "ordered1508",
    "🚞": "ordered1509",
    "🚟": "ordered1510",
    "🚠": "ordered1511",
    "🚡": "ordered1512",
    "🚢": "ordered1513",
    "🚣": "ordered1514",
    "🚣🏻": "ordered1515",
    "🚣🏼": "ordered1516",
    "🚣🏽": "ordered1517",
    "🚣🏾": "ordered1518",
    "🚣🏿": "ordered1519",
    "🚤": "ordered1520",
    "🚥": "ordered1521",
    "🚦": "ordered1522",
    "🚧": "ordered1523",
    "🚨": "ordered1524",
    "🚩": "ordered1525",
    "🚪": "ordered1526",
    "🚫": "ordered1527",
    "🚬": "ordered1528",
    "🚭": "ordered1529",
    "🚮": "ordered1530",
    "🚯": "ordered1531",
    "🚰": "ordered1532",
    "🚱": "ordered1533",
    "🚲": "ordered1534",
    "🚳": "ordered1535",
    "🚴": "ordered1536",
    "🚴🏻": "ordered1537",
    "🚴🏼": "ordered1538",
    "🚴🏽": "ordered1539",
    "🚴🏾": "ordered1540",
    "🚴🏿": "ordered1541",
    "🚵": "ordered1542",
    "🚵🏻": "ordered1543",
    "🚵🏼": "ordered1544",
    "🚵🏽": "ordered1545",
    "🚵🏾": "ordered1546",
    "🚵🏿": "ordered1547",
    "🚶": "ordered1548",
    "🚶🏻": "ordered1549",
    "🚶🏼": "ordered1550",
    "🚶🏽": "ordered1551",
    "🚶🏾": "ordered1552",
    "🚶🏿": "ordered1553",
    "🚷": "ordered1554",
    "🚸": "ordered1555",
    "🚹": "ordered1556",
    "🚺": "ordered1557",
    "🚻": "ordered1558",
    "🚼": "ordered1559",
    "🚽": "ordered1560",
    "🚾": "ordered1561",
    "🚿": "ordered1562",
    "🛀": "ordered1563",
    "🛀🏻": "ordered1564",
    "🛀🏼": "ordered1565",
    "🛀🏽": "ordered1566",
    "🛀🏾": "ordered1567",
    "🛀🏿": "ordered1568",
    "🛁": "ordered1569",
    "🛂": "ordered1570",
    "🛃": "ordered1571",
    "🛄": "ordered1572",
    "🛅": "ordered1573",
    "🛋": "ordered1574",
    "🛌": "ordered1575",
    "🛍": "ordered1576",
    "🛎": "ordered1577",
    "🛏": "ordered1578",
    "🛐": "ordered1579",
    "🛠": "ordered1580",
    "🛡": "ordered1581",
    "🛢": "ordered1582",
    "🛣": "ordered1583",
    "🛤": "ordered1584",
    "🛥": "ordered1585",
    "🛩": "ordered1586",
    "🛫": "ordered1587",
    "🛬": "ordered1588",
    "🛰": "ordered1589",
    "🛳": "ordered1590",
    "🤐": "ordered1591",
    "🤑": "ordered1592",
    "🤒": "ordered1593",
    "🤓": "ordered1594",
    "🤔": "ordered1595",
    "🤕": "ordered1596",
    "🤖": "ordered1597",
    "🤗": "ordered1598",
    "🤘": "ordered1599",
    "🤘🏻": "ordered1600",
    "🤘🏼": "ordered1601",
    "🤘🏽": "ordered1602",
    "🤘🏾": "ordered1603",
    "🤘🏿": "ordered1604",
    "🦀": "ordered1605",
    "🦁": "ordered1606",
    "🦂": "ordered1607",
    "🦃": "ordered1608",
    "🦄": "ordered1609",
    "🧀": "ordered1610",
    "🇽🇪": "ordered1611"
  }
}, function(e, t) {
  "use strict";
  e.exports = {
    ach: {
      name: "Acholi",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    af: {
      name: "Afrikaans",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ak: {
      name: "Akan",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    am: {
      name: "Amharic",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    an: {
      name: "Aragonese",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ar: {
      name: "Arabic",
      numbers: [0, 1, 2, 3, 11, 100],
      plurals: function(e) {
        return Number(0 === e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && 10 >= e % 100 ? 3 : e % 100 >= 11 ? 4 : 5)
      }
    },
    arn: {
      name: "Mapudungun",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    ast: {
      name: "Asturian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ay: {
      name: "Aymará",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    az: {
      name: "Azerbaijani",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    be: {
      name: "Belarusian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    bg: {
      name: "Bulgarian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    bn: {
      name: "Bengali",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    bo: {
      name: "Tibetan",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    br: {
      name: "Breton",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    bs: {
      name: "Bosnian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    ca: {
      name: "Catalan",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    cgg: {
      name: "Chiga",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    cs: {
      name: "Czech",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(1 == e ? 0 : e >= 2 && 4 >= e ? 1 : 2)
      }
    },
    csb: {
      name: "Kashubian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(1 == e ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    cy: {
      name: "Welsh",
      numbers: [1, 2, 3, 8],
      plurals: function(e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
      }
    },
    da: {
      name: "Danish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    de: {
      name: "German",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    dz: {
      name: "Dzongkha",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    el: {
      name: "Greek",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    en: {
      name: "English",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    eo: {
      name: "Esperanto",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    es: {
      name: "Spanish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    es_ar: {
      name: "Argentinean Spanish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    et: {
      name: "Estonian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    eu: {
      name: "Basque",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    fa: {
      name: "Persian",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    fi: {
      name: "Finnish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    fil: {
      name: "Filipino",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    fo: {
      name: "Faroese",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    fr: {
      name: "French",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    fur: {
      name: "Friulian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    fy: {
      name: "Frisian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ga: {
      name: "Irish",
      numbers: [1, 2, 3, 7, 11],
      plurals: function(e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 7 > e ? 2 : 11 > e ? 3 : 4)
      }
    },
    gd: {
      name: "Scottish Gaelic",
      numbers: [1, 2, 3, 20],
      plurals: function(e) {
        return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && 20 > e ? 2 : 3)
      }
    },
    gl: {
      name: "Galician",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    gu: {
      name: "Gujarati",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    gun: {
      name: "Gun",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    ha: {
      name: "Hausa",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    he: {
      name: "Hebrew",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    hi: {
      name: "Hindi",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    hr: {
      name: "Croatian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    hu: {
      name: "Hungarian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    hy: {
      name: "Armenian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ia: {
      name: "Interlingua",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    id: {
      name: "Indonesian",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    is: {
      name: "Icelandic",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e % 10 != 1 || e % 100 == 11)
      }
    },
    it: {
      name: "Italian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ja: {
      name: "Japanese",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    jbo: {
      name: "Lojban",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    jv: {
      name: "Javanese",
      numbers: [0, 1],
      plurals: function(e) {
        return Number(0 !== e)
      }
    },
    ka: {
      name: "Georgian",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    kk: {
      name: "Kazakh",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    km: {
      name: "Khmer",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    kn: {
      name: "Kannada",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ko: {
      name: "Korean",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    ku: {
      name: "Kurdish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    kw: {
      name: "Cornish",
      numbers: [1, 2, 3, 4],
      plurals: function(e) {
        return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
      }
    },
    ky: {
      name: "Kyrgyz",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    lb: {
      name: "Letzeburgesch",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ln: {
      name: "Lingala",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    lo: {
      name: "Lao",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    lt: {
      name: "Lithuanian",
      numbers: [1, 2, 10],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    lv: {
      name: "Latvian",
      numbers: [0, 1, 2],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
      }
    },
    mai: {
      name: "Maithili",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    mfe: {
      name: "Mauritian Creole",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    mg: {
      name: "Malagasy",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    mi: {
      name: "Maori",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    mk: {
      name: "Macedonian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 == e || e % 10 == 1 ? 0 : 1)
      }
    },
    ml: {
      name: "Malayalam",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    mn: {
      name: "Mongolian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    mnk: {
      name: "Mandinka",
      numbers: [0, 1, 2],
      plurals: function(e) {
        return Number(0 === e ? 0 : 1 == e ? 1 : 2)
      }
    },
    mr: {
      name: "Marathi",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ms: {
      name: "Malay",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    mt: {
      name: "Maltese",
      numbers: [1, 2, 11, 20],
      plurals: function(e) {
        return Number(1 == e ? 0 : 0 === e || e % 100 > 1 && 11 > e % 100 ? 1 : e % 100 > 10 && 20 > e % 100 ? 2 : 3)
      }
    },
    nah: {
      name: "Nahuatl",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    nap: {
      name: "Neapolitan",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    nb: {
      name: "Norwegian Bokmal",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ne: {
      name: "Nepali",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    nl: {
      name: "Dutch",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    nn: {
      name: "Norwegian Nynorsk",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    no: {
      name: "Norwegian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    nso: {
      name: "Northern Sotho",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    oc: {
      name: "Occitan",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    or: {
      name: "Oriya",
      numbers: [2, 1],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    pa: {
      name: "Punjabi",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    pap: {
      name: "Papiamento",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    pl: {
      name: "Polish",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(1 == e ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    pms: {
      name: "Piemontese",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ps: {
      name: "Pashto",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    pt: {
      name: "Portuguese",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    pt_br: {
      name: "Brazilian Portuguese",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    rm: {
      name: "Romansh",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ro: {
      name: "Romanian",
      numbers: [1, 2, 20],
      plurals: function(e) {
        return Number(1 == e ? 0 : 0 === e || e % 100 > 0 && 20 > e % 100 ? 1 : 2)
      }
    },
    ru: {
      name: "Russian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    sah: {
      name: "Yakut",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    sco: {
      name: "Scots",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    se: {
      name: "Northern Sami",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    si: {
      name: "Sinhala",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    sk: {
      name: "Slovak",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(1 == e ? 0 : e >= 2 && 4 >= e ? 1 : 2)
      }
    },
    sl: {
      name: "Slovenian",
      numbers: [5, 1, 2, 3],
      plurals: function(e) {
        return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
      }
    },
    so: {
      name: "Somali",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    son: {
      name: "Songhay",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    sq: {
      name: "Albanian",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    sr: {
      name: "Serbian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    su: {
      name: "Sundanese",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    sv: {
      name: "Swedish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    sw: {
      name: "Swahili",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    ta: {
      name: "Tamil",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    te: {
      name: "Telugu",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    tg: {
      name: "Tajik",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    th: {
      name: "Thai",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    ti: {
      name: "Tigrinya",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    tk: {
      name: "Turkmen",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    tr: {
      name: "Turkish",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    tt: {
      name: "Tatar",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    ug: {
      name: "Uyghur",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    uk: {
      name: "Ukrainian",
      numbers: [1, 2, 5],
      plurals: function(e) {
        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
      }
    },
    ur: {
      name: "Urdu",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    uz: {
      name: "Uzbek",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    vi: {
      name: "Vietnamese",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    wa: {
      name: "Walloon",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(e > 1)
      }
    },
    wo: {
      name: "Wolof",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    },
    yo: {
      name: "Yoruba",
      numbers: [1, 2],
      plurals: function(e) {
        return Number(1 != e)
      }
    },
    zh: {
      name: "Chinese",
      numbers: [1],
      plurals: function(e) {
        return 0
      }
    }
  }
}, function(e, t) {
  "use strict";
  var r = [.1, .82, .25, 1],
    n = [.69, 0, .79, .14],
    o = [.84, .07, .93, .46];
  Velocity.RegisterEffect("attach.Down", {
    defaultDuration: 300,
    calls: [
      [{
        opacity: [1, 0],
        translateY: ["0%", "-100%"],
        scaleX: [1, .3],
        scaleY: [1, .3]
      }, 1, {
        easing: [300, 22]
      }]
    ]
  }), Velocity.RegisterEffect("attach.Up", {
    defaultDuration: 200,
    easing: n,
    calls: [
      [{
        opacity: [0, 1],
        translateY: ["-150%", "0%"],
        scaleX: [.3, 1],
        scaleY: [.3, 1]
      }, 1, {
        easing: [.33, 0, .39, .91]
      }]
    ]
  }), Velocity.RegisterEffect("dropdown.Down", {
    defaultDuration: 200,
    easing: r,
    calls: [
      [{
        opacity: [1, 0],
        translateY: ["0%", "-15px"]
      }, 1, {
        easing: r
      }]
    ]
  });
  var i = {
    pop: {
      duration: 200,
      easing: o,
      enter: {
        props: {
          scaleX: [1, .5],
          scaleY: [1, .5],
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          scaleX: [.5, 1],
          scaleY: [.5, 1],
          opacity: [0, 1]
        }
      }
    },
    slide: {
      duration: 200,
      eaing: r,
      enter: {
        props: "slideDown"
      },
      leave: {
        props: "slideUp"
      }
    },
    scaleY: {
      duration: 200,
      easing: r,
      enter: {
        props: {
          scaleY: [1, 0],
          transformOrigin: "center"
        }
      },
      leave: {
        props: {
          scaleY: [0, 1],
          transformOrigin: "center"
        }
      }
    },
    scale: {
      duration: 500,
      easing: r,
      enter: {
        props: {
          scaleX: [1, 0],
          scaleY: [1, 0]
        }
      },
      leave: {
        props: {
          scaleX: [0, 1],
          scaleY: [0, 1]
        }
      }
    },
    fade: {
      duration: 200,
      easing: r,
      enter: {
        props: {
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          opacity: [0, 1]
        }
      }
    },
    "fade-fast": {
      easing: "ease",
      enter: {
        props: {
          opacity: [1, 0]
        },
        duration: 150
      },
      leave: {
        props: {
          opacity: [0, 1]
        },
        duration: 100
      }
    },
    fade_sifo: {
      enter: {
        props: {
          opacity: [1, 0]
        },
        duration: 250
      },
      leave: {
        props: {
          opacity: [0, 1]
        },
        duration: 100
      }
    },
    capture: {
      enter: {
        props: {
          opacity: [1, 0]
        },
        duration: 350
      },
      leave: [{
        selector: ".snapshot",
        props: "transition.bounceDownOut",
        duration: 700
      }, {
        selector: ".webcam",
        props: {
          opacity: [0, 1]
        },
        duration: 100,
        easing: "ease"
      }]
    },
    butterbar: {
      enter: {
        props: "slideDown",
        easing: r,
        duration: 700
      },
      leave: {
        props: "slideUp",
        easing: n,
        duration: 350
      }
    },
    modal: {
      enter: [{
        props: {
          opacity: [1, 0]
        },
        duration: 300,
        easing: "easeOut"
      }, {
        selector: ".popup",
        props: {
          scaleX: [1, 0],
          scaleY: [1, 0],
          opacity: [1, 1]
        },
        easing: [.19, .73, .28, 1],
        delay: 180,
        duration: 200
      }, {
        selector: ".popup",
        props: {
          opacity: [0, 0]
        },
        duration: 180
      }],
      leave: [{
        props: {
          opacity: [0, 1]
        },
        duration: 300,
        easing: n,
        delay: 100
      }, {
        selector: ".popup",
        props: {
          scaleX: [0, 1],
          scaleY: [0, 1]
        },
        easing: n,
        duration: 200
      }]
    },
    "modal-flow": {
      enter: [{
        selector: ".backdrop",
        props: {
          opacity: [1, 0]
        },
        duration: 300,
        easing: "easeOut"
      }, {
        selector: ".popup",
        props: {
          scaleX: [1, 0],
          scaleY: [1, 0],
          opacity: [1, 1]
        },
        easing: [.19, .73, .28, 1],
        delay: 180,
        duration: 200
      }, {
        selector: ".popup",
        props: {
          opacity: [0, 0]
        },
        duration: 180
      }],
      leave: [{
        selector: ".backdrop",
        props: {
          opacity: [0, 1]
        },
        duration: 300,
        easing: n,
        delay: 100
      }, {
        selector: ".popup",
        props: {
          scaleX: [0, 1],
          scaleY: [0, 1]
        },
        easing: n,
        duration: 200
      }]
    },
    "flow-transition-modal-push": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          opacity: [0, 1]
        }
      }
    },
    "flow-transition-modal-pop": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          opacity: [0, 1]
        }
      }
    },
    "flow-transition-drawer-push": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateX: ["0%", "100%"]
        }
      },
      leave: {
        props: {
          translateX: ["-100%", "0%"]
        }
      }
    },
    "flow-transition-drawer-pop": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateX: ["0%", "-100%"]
        }
      },
      leave: {
        props: {
          translateX: ["100%", "0%"]
        }
      }
    },
    "drawer-left": {
      enter: [{
        props: {
          translateX: ["0%", "-100%"]
        },
        duration: 300,
        easing: r
      }, {
        selector: ".drawer-title",
        props: {
          translateX: [0, -50],
          opacity: [1, 0]
        },
        duration: 500,
        easing: "easeOut"
      }],
      leave: [{
        props: {
          translateX: ["-100%", "0%"]
        },
        duration: 300,
        easing: n
      }]
    },
    "drawer-left-rtl": {
      enter: [{
        props: {
          translateX: ["0%", "100%"]
        },
        duration: 300,
        easing: r
      }, {
        selector: ".drawer-title",
        props: {
          translateX: [0, 50],
          opacity: [1, 0]
        },
        duration: 500,
        easing: "easeOut"
      }],
      leave: [{
        props: {
          translateX: ["100%", "0%"]
        },
        duration: 300,
        easing: n
      }]
    },
    dropdown: {
      duration: 300,
      easing: r,
      enter: [{
        selector: ".menu-item",
        props: "dropdown.Down",
        delay: 50,
        duration: 375,
        stagger: 25,
        drag: !0
      }, {
        props: {
          scale: [1, 0]
        }
      }, {
        props: {
          opacity: [1, 0]
        },
        duration: 100
      }],
      leave: {
        props: {
          scaleX: [0, 1],
          scaleY: [0, 1],
          opacity: [0, 1]
        }
      }
    },
    "dropdown-picker": {
      duration: 300,
      easing: r,
      enter: [{
        selector: ".menu-item",
        props: {
          opacity: [1, 0]
        },
        delay: 50,
        duration: 200
      }, {
        selector: ".nib",
        props: {
          opacity: [1, 0],
          rotateZ: ["45deg"],
          translateY: ["0%", "-100%"]
        }
      }, {
        props: {
          scale: [1, 0]
        }
      }, {
        props: {
          opacity: [1, 0]
        },
        duration: 100
      }],
      leave: [{
        selector: ".menu-item",
        props: {
          opacity: [1, 0]
        },
        duration: 100
      }, {
        selector: ".nib",
        props: {
          opacity: [1, 0]
        },
        duration: 150
      }, {
        props: {
          scaleX: [0, 1],
          scaleY: [0, 1],
          opacity: [0, 1]
        }
      }]
    },
    "profile-viewer": {
      duration: 500,
      easing: [.1, 1.03, .28, .99],
      leave: [{
        delay: 400,
        props: {
          opacity: [0, 1]
        }
      }, {
        selector: ".profile-viewer",
        props: {
          borderRadius: ["50%", "0%"]
        }
      }]
    },
    "media-viewer": {
      duration: 300,
      easing: [.1, 1.03, .28, .99],
      leave: {
        selector: ".media-viewer",
        props: {
          opacity: [0, 1]
        }
      }
    },
    menu: {
      enter: {
        selector: ".menu-icons-item",
        props: "attach.Down",
        duration: 700,
        stagger: 30,
        drag: !0
      },
      leave: {
        selector: ".menu-icons-item",
        props: "attach.Up",
        stagger: 30
      }
    },
    emoji: {
      duration: 300,
      easing: r,
      enter: {
        props: {
          height: [234, 0]
        }
      },
      leave: {
        props: {
          height: [0, 234]
        }
      }
    },
    ptt: {
      enter: [{
        selector: ".btn-border",
        easing: "easeInOut",
        props: {
          scaleX: [1, .5],
          scaleY: [1, .5],
          opacity: [1, 0]
        },
        duration: 250,
        delay: 100
      }, {
        selector: ".ptt-counter",
        easing: "easeInOut",
        props: {
          scaleX: [1, .8],
          scaleY: [1, .8],
          opacity: [1, 0]
        },
        duration: 250,
        delay: 100
      }, {
        props: {
          opacity: [1, 0]
        },
        duration: 150,
        easing: r
      }],
      leave: [{
        selector: ".btn-border",
        easing: r,
        props: {
          scaleX: [.5, 1],
          scaleY: [.5, 1],
          opacity: [0, 1]
        },
        duration: 250
      }, {
        selector: ".ptt-counter",
        easing: r,
        props: {
          scaleX: [.5, 1],
          scaleY: [.5, 1],
          opacity: [0, 1]
        },
        duration: 250
      }, {
        props: {
          opacity: [0, 1]
        },
        duration: 300,
        easing: r
      }]
    },
    "slide-left": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateX: ["0%", "100%"]
        }
      },
      leave: {
        props: {
          translateX: ["100%", "0%"]
        }
      }
    },
    "slide-left-rtl": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateX: ["0%", "-100%"]
        }
      },
      leave: {
        props: {
          translateX: ["-100%", "0%"]
        }
      }
    },
    "slide-forward": {
      duration: 200,
      easing: [.19, .93, .18, .99],
      enter: {
        props: {
          translateX: ["0%", "100%"]
        }
      },
      leave: {
        props: {
          translateX: ["-100%", "0%"]
        }
      }
    },
    "slide-back": {
      duration: 200,
      easing: [.19, .93, .18, .99],
      enter: {
        props: {
          translateX: ["0%", "-100%"]
        }
      },
      leave: {
        props: {
          translateX: ["100%", "0%"]
        }
      }
    },
    "media-slide-forward": {
      duration: 200,
      easing: [.19, .93, .18, .99],
      enter: [{
        selector: ".media-element-container",
        props: {
          translateX: ["0%", "100%"]
        }
      }, {
        selector: ".media-caption",
        props: {
          opacity: ["1", "0"],
          translateX: ["0%", "100%"]
        }
      }],
      leave: [{
        selector: ".media-element-container",
        props: {
          translateX: ["-100%", "0%"]
        }
      }, {
        selector: ".media-caption",
        props: {
          opacity: ["0", "1"],
          translateX: ["-100%", "0%"]
        }
      }]
    },
    "media-slide-back": {
      duration: 200,
      easing: [.19, .93, .18, .99],
      enter: [{
        selector: ".media-element-container",
        props: {
          translateX: ["0%", "-100%"]
        }
      }, {
        selector: ".media-caption",
        props: {
          opacity: ["1", "0"],
          translateX: ["0%", "-100%"]
        }
      }],
      leave: [{
        selector: ".media-element-container",
        props: {
          translateX: ["100%", "0%"]
        }
      }, {
        selector: ".media-caption",
        props: {
          opacity: ["0", "1"],
          translateX: ["100%", "0%"]
        }
      }]
    },
    "pop-fast": {
      duration: 75,
      easing: [.14, .62, .33, .9],
      enter: [{
        selector: ".js-context-icon",
        props: {
          translateX: ["0%", "100%"]
        }
      }, {
        props: {
          opacity: [1, .5]
        }
      }],
      leave: [{
        selector: ".js-context-icon",
        props: {
          translateX: ["100%", "0%"]
        }
      }, {
        props: {
          opacity: [0, 1]
        }
      }]
    },
    "pop-fast-chat": {
      duration: 75,
      easing: [.14, .62, .33, .9],
      enter: [{
        props: {
          width: ["20px", "5px"],
          opacity: [1, .5]
        }
      }],
      leave: [{
        props: {
          width: ["5px", "20px"],
          opacity: [0, 1]
        }
      }]
    },
    "toast-transition": {
      duration: 300,
      easing: r,
      cleanOnComplete: !0,
      enter: {
        props: {
          translateY: ["0%", "100%"],
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          opacity: [0, 1]
        }
      }
    },
    "slide-up-down": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateY: ["0%", "100%"]
        }
      },
      leave: {
        props: {
          translateY: ["100%", "0%"]
        }
      }
    },
    "slide-up": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateY: ["0%", "100%"]
        }
      },
      leave: {
        props: {
          translateY: ["100%", "0%"]
        }
      }
    },
    "slide-down": {
      duration: 300,
      easing: r,
      enter: {
        props: {
          translateY: ["0%", "100%"]
        }
      },
      leave: {
        props: {
          translateY: ["100%", "0%"]
        }
      }
    },
    none: {},
    btn: {
      duration: 300,
      easing: r,
      enter: {
        props: {
          scale: [1, 0],
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          scale: [0, 1],
          opacity: [0, 1]
        }
      }
    },
    pop_delay: {
      duration: 300,
      enter: [{
        props: "transition.expandIn",
        delay: 500,
        easing: r
      }, {
        props: {
          opacity: [0, 0]
        },
        duration: 500
      }],
      leave: {
        props: "transition.expandOut",
        easing: n
      }
    },
    "delay-leave": {
      duration: 1,
      enter: {
        props: {
          opacity: [1, 1]
        }
      },
      leave: {
        props: {
          opacity: [1, 1]
        },
        delay: 300
      }
    },
    "media-caption": {
      enter: [{
        props: {
          opacity: [0, 0],
          translateY: ["100%", "100%"]
        },
        duration: 200
      }, {
        props: {
          opacity: [1, 0],
          translateY: ["0%", "100%"]
        },
        easing: r,
        delay: 200,
        duration: 300
      }],
      leave: {
        props: {
          opacity: [0, 1]
        },
        easing: "ease",
        duration: 300
      }
    },
    "media-scale": {
      enter: [{
        selector: ".media-caption",
        props: {
          opacity: [0, 0],
          translateY: ["100%", "100%"]
        },
        duration: 200
      }, {
        selector: ".media-caption",
        props: {
          opacity: [1, 0],
          translateY: ["0%", "100%"]
        },
        easing: r,
        delay: 200,
        duration: 300
      }, {
        selector: ".media-element-container",
        props: {
          opacity: [0, 0]
        },
        duration: 200
      }, {
        selector: ".media-element-container",
        props: {
          opacity: [1, 0],
          scale: [1, .625],
          display: "flex"
        },
        delay: 200,
        duration: 300,
        easing: r
      }],
      leave: [{
        selector: ".media-caption",
        props: {
          opacity: [0, 1]
        },
        easing: "ease",
        duration: 300
      }, {
        selector: ".media-element-container",
        props: {
          opacity: [0, 1],
          scale: [.5, 1],
          display: "flex"
        },
        delay: 0,
        duration: 200,
        easing: n
      }]
    },
    "thumb-scale": {
      duration: 400,
      easing: r,
      enter: {
        props: "transition.expandIn"
      },
      leave: {
        props: "transition.expandOut"
      }
    },
    "default": {
      duration: 300,
      enter: {
        props: {
          opacity: [1, 0]
        }
      },
      leave: {
        props: {
          opacity: [0, 1]
        }
      }
    }
  };
  e.exports = i
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }
  var o = r(3),
    i = n(o),
    a = r(1),
    s = r(10),
    d = r(13),
    u = r(39),
    c = r(22),
    l = r(67),
    f = r(16),
    h = r(186),
    p = {
      BinaryProtocol: null,
      N: null,
      M: {
        DEBUG_LOG: 1,
        QUERY_RESUME: 2,
        QUERY_RECEIPT: 3,
        QUERY_MEDIA: 4,
        QUERY_CHAT: 5,
        QUERY_CONTACTS: 6,
        QUERY_MESSAGES: 7,
        PRESENCE: 8,
        PRESENCE_SUBSCRIBE: 9,
        GROUP: 10,
        READ: 11,
        CHAT: 12,
        RECEIVED: 13,
        PIC: 14,
        STATUS: 15,
        MESSAGE: 16,
        QUERY_ACTIONS: 17,
        BLOCK: 18,
        QUERY_GROUP: 19,
        QUERY_PREVIEW: 20,
        QUERY_EMOJI: 21,
        QUERY_MESSAGE_INFO: 22,
        SPAM: 23,
        QUERY_SEARCH: 24
      },
      epochCount: 0,
      epoch: 0,
      isRequestingDeviceUploadLogsMutex: 0,
      parseChat: function(e) {
        if ("chat" === this.N.tag(e)) {
          var t = this.N.attr("jid", e),
            r = parseInt(this.N.attr("t", e), 10) || void 0,
            n = this.N.attr("type", e),
            o = parseInt(this.N.attr("mute", e), 10) || void 0,
            i = parseInt(this.N.attr("before", e), 10) || void 0,
            a = "true" === this.N.attr("archive", e),
            s = "true" === this.N.attr("read_only", e),
            d = parseInt(this.N.attr("modify_tag", e), 10) || void 0,
            u = this.N.attr("name", e) || void 0,
            c = this.safeParseInt(e, "count"),
            l = "true" === this.N.attr("message", e),
            f = "true" === this.N.attr("star", e),
            h = "false" === this.N.attr("spam", e);
          "ahead" === n && (n = "clear");
          var p, g = this.N.children(e);
          if (_.isArray(g)) {
            p = [];
            var m, v, y = g.length;
            for (m = 0; y > m; m++)
              if (v = g[m], "item" === this.N.tag(v)) {
                var b = this.N.attr("index", v);
                b && p.push([b, "true" === this.N.attr("owner", v), this.N.attr("participant", v)])
              }
          }
          var w = {
              id: t,
              t: r,
              type: n,
              keys: p,
              before: i,
              archive: a,
              isReadOnly: s,
              unreadCount: c,
              muteExpiration: o,
              modifyTag: d,
              name: u,
              pendingMsgs: l,
              star: f,
              notSpam: h
            },
            E = [n && "delete" !== n && "clear" !== n && "archive" !== n && "unarchive" !== n && "mute" !== n && "star" !== n && "unstar" !== n && "spam" != n, !n && !t, a && n && "clear" !== n, "clear" !== n && i && i > 0, "clear" !== n && "star" !== n && "unstar" !== n && p && p.length > 0];
          return this.dropIfConditionMet(E, w)
        }
      },
      sendConversationOpWithKey: function(e, t, r, n) {
        var o = this;
        return new i["default"](function(i, a) {
          var s, u;
          switch (e) {
            case "clear":
              s = (!!n).toString();
              break;
            case "spam":
              u = (!!n).toString()
          }
          var c = o.actionNode("set", [
            ["chat", {
              type: e,
              jid: t,
              index: r ? r.id : void 0,
              owner: r ? r.fromMe.toString() : void 0,
              participant: r ? r.participant : void 0,
              star: "undefined" != typeof s ? s : void 0,
              spam: "undefined" != typeof u ? u : void 0
            }, void 0]
          ]);
          d.send({
            data: o.BinaryProtocol.write(c),
            clientCacheable: !0,
            onSend: o.wrap(i),
            onDrop: o.wrap(a),
            binaryOpts: {
              debugString: "action,chat," + [e, r, n].join(),
              debugObj: c,
              metric: o.M.CHAT,
              ackRequest: !0
            }
          })
        })
      },
      setSubProtocol: function(e) {
        e ? (this.BinaryProtocol = new l(e), this.N = this.BinaryProtocol.Node) : (a.error("Wap:setSubProtocol unknown " + e)(), s.upload("08_unknown_version", !0)["finally"](function() {
          return f.hardRefresh()
        }))
      },
      resyncMessages: function(e) {
        var t = this;
        return new u(function(r, n) {
          var o = function(e) {
              var n = [],
                o = t.BinaryProtocol.read(e),
                i = t.N.children(o);
              if (a.logColor("green", "bin-recv: response,resume", o)(), "response" === t.N.tag(o) && "resume" === t.N.attr("type", o) && _.isArray(i)) {
                var s, d = i.length;
                for (s = 0; d > s; s++) {
                  var u = t.parseChat(i[s]);
                  u && n.push(u)
                }
              }
              r({
                checksum: t.N.attr("checksum", o),
                data: n
              })
            },
            i = e.map(function(e) {
              var t = {
                jid: e.wid,
                index: e.id,
                owner: e.fromMe,
                participant: e.participant,
                archive: (!!e.archive).toString(),
                spam: (!e.notSpam).toString()
              };
              return e.mute && (t.mute = e.mute.toString()), e.active && (t.active = "true"), c.isGroup(e.wid) && (t.read_only = (!!e.isReadOnly).toString()), e.modifyTag && (t.modify_tag = e.modifyTag.toString()), e.unreadCount && (t.count = e.unreadCount.toString()), ["last", t, void 0]
            }),
            s = t.queryNode({
              type: "resume"
            }, i);
          d.sendEphemeral({
            data: t.BinaryProtocol.write(s),
            onSend: t.binWrap(o, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,resume",
              debugObj: s,
              metric: t.M.QUERY_RESUME,
              ackRequest: !1
            }
          })
        })
      },
      requestMediaReupload: function(e) {
        var t = this;
        return new i["default"](function(r, n) {
          var o = e.id,
            i = function(e) {
              var n, o = t.BinaryProtocol.read(e);
              if (a.logColor("green", "bin-recv: response,media", o)(), "response" === t.N.tag(o) && "media" === t.N.attr("type", o)) {
                var i = parseInt(t.N.attr("code", o)) || 400,
                  s = t.N.attr("url", o);
                i >= 500 && 502 !== i ? (a.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : 200 === i && s ? n = {
                  status: 200,
                  url: s,
                  mediaKey: t.N.attr("media_key", o)
                } : 200 !== i || s ? (a.error("wap:requestMediaReupload:error " + i)(), n = {
                  status: i
                }) : n = {
                  status: 400
                }
              } else a.error("wap:requestMediaReupload:malformed")(), n = {
                status: 400
              };
              r(n)
            },
            s = o,
            u = t.queryNode({
              type: "media",
              index: s.id,
              jid: s.remote,
              owner: s.fromMe.toString(),
              participant: s.participant
            }, void 0);
          d.sendEphemeral({
            data: t.BinaryProtocol.write(u),
            onSend: t.binWrap(i, r),
            onDrop: t.wrap(n),
            binaryOpts: {
              debugString: "query,media",
              debugObj: u,
              metric: t.M.QUERY_MEDIA,
              ackRequest: !1
            }
          })
        })
      },
      sendConversationUnseen: function(e, t) {
        return this.sendConversationSeen(e, t, -2)
      },
      sendConversationNotSpam: function(e) {
        return this.sendConversationOpWithKey("spam", e, void 0, !1)
      },
      msgFindQuery: function(e, t) {
        var r = this;
        return new i["default"](function(n, o) {
          var i, s = function(e) {
              var t = [],
                o = r.BinaryProtocol.read(e),
                i = r.N.children(o);
              if (a.logColor("green", "bin-recv: response,msg", o)(), "response" === r.N.tag(o) && ("message" === r.N.attr("type", o) || "star" === r.N.attr("type", o) || "search" === r.N.attr("type", o)) && _.isArray(i)) {
                var s, d = i.length;
                for (s = 0; d > s; s++) {
                  var u = r.parseMsg(i[s], "response");
                  u && t.push(u)
                }
              }
              n(t)
            },
            u = "";
          switch (e) {
            case "after":
              t.id || (e = "before");
            case "before":
              i = {
                type: "message",
                kind: e,
                jid: t.remote,
                count: t.count.toString(),
                index: t.id,
                owner: "undefined" == typeof t.fromMe ? void 0 : t.fromMe.toString(),
                participant: t.participant
              }, u = [t.toString(), t.count].join();
              break;
            case "search":
              i = {
                type: "search",
                search: t
              }, u = "search," + t;
              break;
            case "star":
              i = {
                type: "star"
              }, u = "starred"
          }
          var c = r.queryNode(i, void 0);
          d.sendEphemeral({
            data: r.BinaryProtocol.write(c),
            onSend: r.binWrap(s, n),
            onDrop: r.wrap(o),
            binaryOpts: {
              debugString: "query,message," + u,
              debugObj: c,
              metric: r.M.QUERY_SEARCH,
              ackRequest: !1
            }
          })
        })
      }
    };
  e.exports = _.defaults(p, h)
}, function(e, t, r) {
  "use strict";

  function n(e) {
    return e && e.__esModule ? e : {
      "default": e
    }
  }

  function o(e, t, r) {
    function n() {
      for (var e in c) this[e] = c[e]
    }

    function o(e) {
      this.all = new n, e && this.set(e), this._validate(), "function" == typeof r && r.apply(this, arguments)
    }

    function d() {}
    if ("string" != typeof e) throw new TypeError("TypeHash.define given bad name " + this.name);
    var c = {},
      f = [],
      h = {
        $className: {
          value: e
        },
        $requiredProps: {
          value: f
        },
        $defaultValues: {
          value: c
        }
      };
    for (var p in t) {
      var g = t[p];
      if ("string" != typeof g && "function" != typeof g || (g = {
          type: g
        }), !g || "object" !== ("undefined" == typeof g ? "undefined" : (0, l["default"])(g))) throw new Error(e + " specified with non-object " + g);
      c[p] = g["default"], g.required && f.push(p), h[p] = {
        enumerable: !0,
        get: a(p, g),
        set: s(p, g)
      }
    }
    if (r)
      if ("object" === ("undefined" == typeof r ? "undefined" : (0, l["default"])(r))) d.prototype = (0, u["default"])(i.prototype, r), o.prototype = (0, u["default"])(d.prototype, h);
      else if (r.prototype instanceof i) o.prototype = (0, u["default"])(r.prototype, h);
    else {
      var _ = i.prototype;
      for (var m in _) h[m] = _[m];
      o.prototype = (0, u["default"])(r.prototype, h)
    } else o.prototype = (0, u["default"])(i.prototype, h);
    return o
  }

  function i() {}

  function a(e, t) {
    return t.get || function() {
      return this.all[e]
    }
  }

  function s(e, t) {
    var r = t.type || "any",
      n = !!t.required,
      o = !!t.allowNull,
      i = t.set,
      a = !!t.get;
    return function(t) {
      if (a || t !== this.all[e]) {
        if (void 0 === t) {
          if (n) throw new TypeError(this.$className + "." + e + " may not be undefined")
        } else if (null === t) {
          if (!o) throw new TypeError(this.$className + "." + e + " may not be null")
        } else if ("function" == typeof r) {
          if (!r(t)) throw new TypeError(this.$className + "." + e + " type-validator fails " + t)
        } else if ("any" !== r && ("undefined" == typeof t ? "undefined" : (0, l["default"])(t)) !== r) throw new TypeError(this.$className + "." + e + " requires type " + r + ", got " + t);
        i && i.call(this, t), a || (this.all[e] = t)
      }
    }
  }
  var d = r(87),
    u = n(d),
    c = r(36),
    l = n(c);
  i.prototype = {
    set: function(e) {
      for (var t in e) this[t] = e[t]
    },
    _validate: function() {
      for (var e = this.$requiredProps, t = this.all, r = 0; r < e.length; r++) {
        var n = e[r];
        if (void 0 === t[n]) throw new TypeError(this.$className + "." + n + " is undefined")
      }
    }
  }, i.define = o, e.exports = i
}, function(e, t, r) {
  e.exports = {
    "default": r(420),
    __esModule: !0
  }
}, function(e, t, r) {
  e.exports = {
    "default": r(423),
    __esModule: !0
  }
}, function(e, t, r) {
  e.exports = {
    "default": r(426),
    __esModule: !0
  }
}, function(e, t, r) {
  e.exports = {
    "default": r(428),
    __esModule: !0
  }
}, , , , , function(e, t, r) {
  r(450), e.exports = r(19).Object.assign
}, function(e, t, r) {
  var n = r(11);
  e.exports = function(e, t) {
    return n.create(e, t)
  }
}, function(e, t, r) {
  var n = r(11);
  e.exports = function(e, t, r) {
    return n.setDesc(e, t, r)
  }
}, function(e, t, r) {
  var n = r(11);
  r(451), e.exports = function(e, t) {
    return n.getDesc(e, t)
  }
}, function(e, t, r) {
  r(452), e.exports = r(19).Object.getPrototypeOf
}, function(e, t, r) {
  r(453), e.exports = r(19).Object.keys
}, function(e, t, r) {
  r(454), e.exports = r(19).Object.setPrototypeOf
}, function(e, t, r) {
  r(194), r(359), r(364), r(455), e.exports = r(19).Promise
}, function(e, t, r) {
  r(456), r(194), e.exports = r(19).Symbol
}, function(e, t) {
  e.exports = function() {}
}, function(e, t, r) {
  var n = r(90),
    o = r(31).document,
    i = n(o) && n(o.createElement);
  e.exports = function(e) {
    return i ? o.createElement(e) : {}
  }
}, function(e, t, r) {
  var n = r(11);
  e.exports = function(e) {
    var t = n.getKeys(e),
      r = n.getSymbols;
    if (r)
      for (var o, i = r(e), a = n.isEnum, s = 0; i.length > s;) a.call(e, o = i[s++]) && t.push(o);
    return t
  }
}, function(e, t, r) {
  var n = r(65),
    o = r(369),
    i = r(368),
    a = r(48),
    s = r(371),
    d = r(363);
  e.exports = function(e, t, r, u) {
    var c, l, f, h = d(e),
      p = n(r, u, t ? 2 : 1),
      g = 0;
    if ("function" != typeof h) throw TypeError(e + " is not iterable!");
    if (i(h))
      for (c = s(e.length); c > g; g++) t ? p(a(l = e[g])[0], l[1]) : p(e[g]);
    else
      for (f = h.call(e); !(l = f.next()).done;) o(f, p, l.value, t)
  }
}, function(e, t, r) {
  var n = r(70),
    o = r(11).getNames,
    i = {}.toString,
    a = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
    s = function(e) {
      try {
        return o(e)
      } catch (t) {
        return a.slice()
      }
    };
  e.exports.get = function(e) {
    return a && "[object Window]" == i.call(e) ? s(e) : o(n(e))
  }
}, function(e, t, r) {
  e.exports = r(31).document && document.documentElement
}, function(e, t) {
  e.exports = function(e, t, r) {
    var n = void 0 === r;
    switch (t.length) {
      case 0:
        return n ? e() : e.call(r);
      case 1:
        return n ? e(t[0]) : e.call(r, t[0]);
      case 2:
        return n ? e(t[0], t[1]) : e.call(r, t[0], t[1]);
      case 3:
        return n ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);
      case 4:
        return n ? e(t[0], t[1], t[2], t[3]) : e.call(r, t[0], t[1], t[2], t[3])
    }
    return e.apply(r, t)
  }
}, function(e, t, r) {
  var n = r(69);
  e.exports = Array.isArray || function(e) {
    return "Array" == n(e)
  }
}, function(e, t, r) {
  "use strict";
  var n = r(11),
    o = r(125),
    i = r(91),
    a = {};
  r(122)(a, r(23)("iterator"), function() {
    return this
  }), e.exports = function(e, t, r) {
    e.prototype = n.create(a, {
      next: o(1, r)
    }), i(e, t + " Iterator")
  }
}, function(e, t) {
  e.exports = function(e, t) {
    return {
      value: t,
      done: !!e
    }
  }
}, function(e, t, r) {
  var n = r(11),
    o = r(70);
  e.exports = function(e, t) {
    for (var r, i = o(e), a = n.getKeys(i), s = a.length, d = 0; s > d;)
      if (i[r = a[d++]] === t) return r
  }
}, function(e, t, r) {
  var n, o, i, a = r(31),
    s = r(448).set,
    d = a.MutationObserver || a.WebKitMutationObserver,
    u = a.process,
    c = a.Promise,
    l = "process" == r(69)(u),
    f = function() {
      var e, t, r;
      for (l && (e = u.domain) && (u.domain = null, e.exit()); n;) t = n.domain, r = n.fn, t && t.enter(), r(), t && t.exit(), n = n.next;
      o = void 0, e && e.enter()
    };
  if (l) i = function() {
    u.nextTick(f)
  };
  else if (d) {
    var h = 1,
      p = document.createTextNode("");
    new d(f).observe(p, {
      characterData: !0
    }), i = function() {
      p.data = h = -h
    }
  } else i = c && c.resolve ? function() {
    c.resolve().then(f)
  } : function() {
    s.call(a, f)
  };
  e.exports = function(e) {
    var t = {
      fn: e,
      next: void 0,
      domain: l && u.domain
    };
    o && (o.next = t), n || (n = t, i()), o = t
  }
}, function(e, t, r) {
  var n = r(11),
    o = r(112),
    i = r(188);
  e.exports = r(89)(function() {
    var e = Object.assign,
      t = {},
      r = {},
      n = Symbol(),
      o = "abcdefghijklmnopqrst";
    return t[n] = 7, o.split("").forEach(function(e) {
      r[e] = e
    }), 7 != e({}, t)[n] || Object.keys(e({}, r)).join("") != o
  }) ? function(e, t) {
    for (var r = o(e), a = arguments, s = a.length, d = 1, u = n.getKeys, c = n.getSymbols, l = n.isEnum; s > d;)
      for (var f, h = i(a[d++]), p = c ? u(h).concat(c(h)) : u(h), g = p.length, _ = 0; g > _;) l.call(h, f = p[_++]) && (r[f] = h[f]);
    return r
  } : Object.assign
}, function(e, t, r) {
  var n = r(126);
  e.exports = function(e, t) {
    for (var r in t) n(e, r, t[r]);
    return e
  }
}, function(e, t) {
  e.exports = Object.is || function(e, t) {
    return e === t ? 0 !== e || 1 / e === 1 / t : e != e && t != t
  }
}, function(e, t, r) {
  "use strict";
  var n = r(19),
    o = r(11),
    i = r(88),
    a = r(23)("species");
  e.exports = function(e) {
    var t = n[e];
    i && t && !t[a] && o.setDesc(t, a, {
      configurable: !0,
      get: function() {
        return this
      }
    })
  }
}, function(e, t, r) {
  var n = r(48),
    o = r(119),
    i = r(23)("species");
  e.exports = function(e, t) {
    var r, a = n(e).constructor;
    return void 0 === a || void 0 == (r = n(a)[i]) ? t : o(r)
  }
}, function(e, t) {
  e.exports = function(e, t, r) {
    if (!(e instanceof t)) throw TypeError(r + ": use the 'new' operator!");
    return e
  }
}, function(e, t, r) {
  var n = r(192),
    o = r(120);
  e.exports = function(e) {
    return function(t, r) {
      var i, a, s = String(o(t)),
        d = n(r),
        u = s.length;
      return 0 > d || d >= u ? e ? "" : void 0 : (i = s.charCodeAt(d), 55296 > i || i > 56319 || d + 1 === u || (a = s.charCodeAt(d + 1)) < 56320 || a > 57343 ? e ? s.charAt(d) : i : e ? s.slice(d, d + 2) : (i - 55296 << 10) + (a - 56320) + 65536);
    }
  }
}, function(e, t, r) {
  var n, o, i, a = r(65),
    s = r(435),
    d = r(434),
    u = r(430),
    c = r(31),
    l = c.process,
    f = c.setImmediate,
    h = c.clearImmediate,
    p = c.MessageChannel,
    g = 0,
    _ = {},
    m = "onreadystatechange",
    v = function() {
      var e = +this;
      if (_.hasOwnProperty(e)) {
        var t = _[e];
        delete _[e], t()
      }
    },
    y = function(e) {
      v.call(e.data)
    };
  f && h || (f = function(e) {
    for (var t = [], r = 1; arguments.length > r;) t.push(arguments[r++]);
    return _[++g] = function() {
      s("function" == typeof e ? e : Function(e), t)
    }, n(g), g
  }, h = function(e) {
    delete _[e]
  }, "process" == r(69)(l) ? n = function(e) {
    l.nextTick(a(v, e, 1))
  } : p ? (o = new p, i = o.port2, o.port1.onmessage = y, n = a(i.postMessage, i, 1)) : c.addEventListener && "function" == typeof postMessage && !c.importScripts ? (n = function(e) {
    c.postMessage(e + "", "*")
  }, c.addEventListener("message", y, !1)) : n = m in u("script") ? function(e) {
    d.appendChild(u("script"))[m] = function() {
      d.removeChild(this), v.call(e)
    }
  } : function(e) {
    setTimeout(a(v, e, 1), 0)
  }), e.exports = {
    set: f,
    clear: h
  }
}, function(e, t, r) {
  "use strict";
  var n = r(429),
    o = r(438),
    i = r(66),
    a = r(70);
  e.exports = r(189)(Array, "Array", function(e, t) {
    this._t = a(e), this._i = 0, this._k = t
  }, function() {
    var e = this._t,
      t = this._k,
      r = this._i++;
    return !e || r >= e.length ? (this._t = void 0, o(1)) : "keys" == t ? o(0, r) : "values" == t ? o(0, e[r]) : o(0, [r, e[r]])
  }, "values"), i.Arguments = i.Array, n("keys"), n("values"), n("entries")
}, function(e, t, r) {
  var n = r(46);
  n(n.S + n.F, "Object", {
    assign: r(441)
  })
}, function(e, t, r) {
  var n = r(70);
  r(124)("getOwnPropertyDescriptor", function(e) {
    return function(t, r) {
      return e(n(t), r)
    }
  })
}, function(e, t, r) {
  var n = r(112);
  r(124)("getPrototypeOf", function(e) {
    return function(t) {
      return e(n(t))
    }
  })
}, function(e, t, r) {
  var n = r(112);
  r(124)("keys", function(e) {
    return function(t) {
      return e(n(t))
    }
  })
}, function(e, t, r) {
  var n = r(46);
  n(n.S, "Object", {
    setPrototypeOf: r(190).set
  })
}, function(e, t, r) {
  "use strict";
  var n, o = r(11),
    i = r(123),
    a = r(31),
    s = r(65),
    d = r(173),
    u = r(46),
    c = r(90),
    l = r(48),
    f = r(119),
    h = r(446),
    p = r(432),
    g = r(190).set,
    _ = r(443),
    m = r(23)("species"),
    v = r(445),
    y = r(440),
    b = "Promise",
    w = a.process,
    E = "process" == d(w),
    S = a[b],
    N = function(e) {
      var t = new S(function() {});
      return e && (t.constructor = Object), S.resolve(t) === t
    },
    T = function() {
      function e(t) {
        var r = new S(t);
        return g(r, e.prototype), r
      }
      var t = !1;
      try {
        if (t = S && S.resolve && N(), g(e, S), e.prototype = o.create(S.prototype, {
            constructor: {
              value: e
            }
          }), e.resolve(5).then(function() {}) instanceof e || (t = !1), t && r(88)) {
          var n = !1;
          S.resolve(o.setDesc({}, "then", {
            get: function() {
              n = !0
            }
          })), t = n
        }
      } catch (i) {
        t = !1
      }
      return t
    }(),
    $ = function(e, t) {
      return i && e === S && t === n ? !0 : _(e, t)
    },
    C = function(e) {
      var t = l(e)[m];
      return void 0 != t ? t : e
    },
    k = function(e) {
      var t;
      return c(e) && "function" == typeof(t = e.then) ? t : !1
    },
    A = function(e) {
      var t, r;
      this.promise = new e(function(e, n) {
        if (void 0 !== t || void 0 !== r) throw TypeError("Bad Promise constructor");
        t = e, r = n
      }), this.resolve = f(t), this.reject = f(r)
    },
    I = function(e) {
      try {
        e()
      } catch (t) {
        return {
          error: t
        }
      }
    },
    O = function(e, t) {
      if (!e.n) {
        e.n = !0;
        var r = e.c;
        y(function() {
          for (var n = e.v, o = 1 == e.s, i = 0, s = function(t) {
              var r, i, a = o ? t.ok : t.fail,
                s = t.resolve,
                d = t.reject;
              try {
                a ? (o || (e.h = !0), r = a === !0 ? n : a(n), r === t.promise ? d(TypeError("Promise-chain cycle")) : (i = k(r)) ? i.call(r, s, d) : s(r)) : d(n)
              } catch (u) {
                d(u)
              }
            }; r.length > i;) s(r[i++]);
          r.length = 0, e.n = !1, t && setTimeout(function() {
            var t, r, o = e.p;
            R(o) && (E ? w.emit("unhandledRejection", n, o) : (t = a.onunhandledrejection) ? t({
              promise: o,
              reason: n
            }) : (r = a.console) && r.error && r.error("Unhandled promise rejection", n)), e.a = void 0
          }, 1)
        })
      }
    },
    R = function(e) {
      var t, r = e._d,
        n = r.a || r.c,
        o = 0;
      if (r.h) return !1;
      for (; n.length > o;)
        if (t = n[o++], t.fail || !R(t.promise)) return !1;
      return !0
    },
    P = function(e) {
      var t = this;
      t.d || (t.d = !0, t = t.r || t, t.v = e, t.s = 2, t.a = t.c.slice(), O(t, !0))
    },
    M = function(e) {
      var t, r = this;
      if (!r.d) {
        r.d = !0, r = r.r || r;
        try {
          if (r.p === e) throw TypeError("Promise can't be resolved itself");
          (t = k(e)) ? y(function() {
            var n = {
              r: r,
              d: !1
            };
            try {
              t.call(e, s(M, n, 1), s(P, n, 1))
            } catch (o) {
              P.call(n, o)
            }
          }): (r.v = e, r.s = 1, O(r, !1))
        } catch (n) {
          P.call({
            r: r,
            d: !1
          }, n)
        }
      }
    };
  T || (S = function(e) {
    f(e);
    var t = this._d = {
      p: h(this, S, b),
      c: [],
      a: void 0,
      s: 0,
      d: !1,
      v: void 0,
      h: !1,
      n: !1
    };
    try {
      e(s(M, t, 1), s(P, t, 1))
    } catch (r) {
      P.call(t, r)
    }
  }, r(442)(S.prototype, {
    then: function(e, t) {
      var r = new A(v(this, S)),
        n = r.promise,
        o = this._d;
      return r.ok = "function" == typeof e ? e : !0, r.fail = "function" == typeof t && t, o.c.push(r), o.a && o.a.push(r), o.s && O(o, !1), n
    },
    "catch": function(e) {
      return this.then(void 0, e)
    }
  })), u(u.G + u.W + u.F * !T, {
    Promise: S
  }), r(91)(S, b), r(444)(b), n = r(19)[b], u(u.S + u.F * !T, b, {
    reject: function(e) {
      var t = new A(this),
        r = t.reject;
      return r(e), t.promise
    }
  }), u(u.S + u.F * (!T || N(!0)), b, {
    resolve: function(e) {
      if (e instanceof S && $(e.constructor, this)) return e;
      var t = new A(this),
        r = t.resolve;
      return r(e), t.promise
    }
  }), u(u.S + u.F * !(T && r(370)(function(e) {
    S.all(e)["catch"](function() {})
  })), b, {
    all: function(e) {
      var t = C(this),
        r = new A(t),
        n = r.resolve,
        i = r.reject,
        a = [],
        s = I(function() {
          p(e, !1, a.push, a);
          var r = a.length,
            s = Array(r);
          r ? o.each.call(a, function(e, o) {
            var a = !1;
            t.resolve(e).then(function(e) {
              a || (a = !0, s[o] = e, --r || n(s))
            }, i)
          }) : n(s)
        });
      return s && i(s.error), r.promise
    },
    race: function(e) {
      var t = C(this),
        r = new A(t),
        n = r.reject,
        o = I(function() {
          p(e, !1, function(e) {
            t.resolve(e).then(r.resolve, n)
          })
        });
      return o && n(o.error), r.promise
    }
  })
}, function(e, t, r) {
  "use strict";
  var n = r(11),
    o = r(31),
    i = r(121),
    a = r(88),
    s = r(46),
    d = r(126),
    u = r(89),
    c = r(191),
    l = r(91),
    f = r(193),
    h = r(23),
    p = r(439),
    g = r(433),
    _ = r(431),
    m = r(436),
    v = r(48),
    y = r(70),
    b = r(125),
    w = n.getDesc,
    E = n.setDesc,
    S = n.create,
    N = g.get,
    T = o.Symbol,
    $ = o.JSON,
    C = $ && $.stringify,
    k = !1,
    A = h("_hidden"),
    I = n.isEnum,
    O = c("symbol-registry"),
    R = c("symbols"),
    P = "function" == typeof T,
    M = Object.prototype,
    L = a && u(function() {
      return 7 != S(E({}, "a", {
        get: function() {
          return E(this, "a", {
            value: 7
          }).a
        }
      })).a
    }) ? function(e, t, r) {
      var n = w(M, t);
      n && delete M[t], E(e, t, r), n && e !== M && E(M, t, n)
    } : E,
    D = function(e) {
      var t = R[e] = S(T.prototype);
      return t._k = e, a && k && L(M, e, {
        configurable: !0,
        set: function(t) {
          i(this, A) && i(this[A], e) && (this[A][e] = !1), L(this, e, b(1, t))
        }
      }), t
    },
    x = function(e) {
      return "symbol" == typeof e
    },
    j = function(e, t, r) {
      return r && i(R, t) ? (r.enumerable ? (i(e, A) && e[A][t] && (e[A][t] = !1), r = S(r, {
        enumerable: b(0, !1)
      })) : (i(e, A) || E(e, A, b(1, {})), e[A][t] = !0), L(e, t, r)) : E(e, t, r)
    },
    U = function(e, t) {
      v(e);
      for (var r, n = _(t = y(t)), o = 0, i = n.length; i > o;) j(e, r = n[o++], t[r]);
      return e
    },
    B = function(e, t) {
      return void 0 === t ? S(e) : U(S(e), t)
    },
    F = function(e) {
      var t = I.call(this, e);
      return t || !i(this, e) || !i(R, e) || i(this, A) && this[A][e] ? t : !0
    },
    W = function(e, t) {
      var r = w(e = y(e), t);
      return !r || !i(R, t) || i(e, A) && e[A][t] || (r.enumerable = !0), r
    },
    Y = function(e) {
      for (var t, r = N(y(e)), n = [], o = 0; r.length > o;) i(R, t = r[o++]) || t == A || n.push(t);
      return n
    },
    G = function(e) {
      for (var t, r = N(y(e)), n = [], o = 0; r.length > o;) i(R, t = r[o++]) && n.push(R[t]);
      return n
    },
    q = function(e) {
      if (void 0 !== e && !x(e)) {
        for (var t, r, n = [e], o = 1, i = arguments; i.length > o;) n.push(i[o++]);
        return t = n[1], "function" == typeof t && (r = t), !r && m(t) || (t = function(e, t) {
          return r && (t = r.call(this, e, t)), x(t) ? void 0 : t
        }), n[1] = t, C.apply($, n)
      }
    },
    K = u(function() {
      var e = T();
      return "[null]" != C([e]) || "{}" != C({
        a: e
      }) || "{}" != C(Object(e))
    });
  P || (T = function() {
    if (x(this)) throw TypeError("Symbol is not a constructor");
    return D(f(arguments.length > 0 ? arguments[0] : void 0))
  }, d(T.prototype, "toString", function() {
    return this._k
  }), x = function(e) {
    return e instanceof T
  }, n.create = B, n.isEnum = F, n.getDesc = W, n.setDesc = j, n.setDescs = U, n.getNames = g.get = Y, n.getSymbols = G, a && !r(123) && d(M, "propertyIsEnumerable", F, !0));
  var H = {
    "for": function(e) {
      return i(O, e += "") ? O[e] : O[e] = T(e)
    },
    keyFor: function(e) {
      return p(O, e)
    },
    useSetter: function() {
      k = !0
    },
    useSimple: function() {
      k = !1
    }
  };
  n.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(e) {
    var t = h(e);
    H[e] = P ? t : D(t)
  }), k = !0, s(s.G + s.W, {
    Symbol: T
  }), s(s.S, "Symbol", H), s(s.S + s.F * !P, "Object", {
    create: B,
    defineProperty: j,
    defineProperties: U,
    getOwnPropertyDescriptor: W,
    getOwnPropertyNames: Y,
    getOwnPropertySymbols: G
  }), $ && s(s.S + s.F * (!P || K), "JSON", {
    stringify: q
  }), l(T, "Symbol"), l(Math, "Math", !0), l(o.JSON, "JSON", !0)
}, , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
  e.exports = r.p + "img/4caf7eaae50b9501fcb650e8f8e130e4.png"
}, function(e, t, r) {
  e.exports = r.p + "img/b9f46c1cdda2922d18d9a3329f9e63f2.webp"
}, function(e, t, r) {
  e.exports = r.p + "img/f734574f894b0185142f8cdf6b1c9718.jpg"
}, function(e, t, r) {
  e.exports = r.p + "img/7e74568d78f1448fcd64393bb481dd62.png"
}, function(e, t, r) {
  e.exports = r.p + "img/835e0489cae714e1315b7440f2dd0aee.webp"
}, function(e, t, r) {
  e.exports = r.p + "img/a87049f3f29c9548629aa327b18bfdaf.jpg"
}, function(e, t, r) {
  e.exports = r.p + "img/c7b6991aaa56b04b67f0ab451e26df68.webp"
}, function(e, t, r) {
  e.exports = r.p + "img/92b8a80d57227e2f342bd57ccf6382d8.png"
}, function(e, t, r) {
  e.exports = r.p + "img/bfb4ec026499f5b2d80e673a1a3a5bd7.png"
}, function(e, t, r) {
  e.exports = r.p + "img/9466a20e6d2921a21ac7ab82419be157.jpg"
}, function(e, t, r) {
  e.exports = r.p + "img/c98cc75f2aa905314d74375a975d2cf2.jpg"
}, , , , , function(e, t) {
  e.exports = {
    1: [
      [10],
      [
        ["(...)(....)", "$1-$2", []],
        ["(...)(...)(....)", "($1) $2-$3", []]
      ]
    ],
    7: [
      [10],
      [
        ["(...)(..)(..)", "$1-$2-$3", ["[1-79]"]],
        ["([3489]..)(...)(..)(..)", "$1 $2-$3-$4", ["[34689]"]],
        ["(7..)(...)(....)", "$1 $2 $3", ["7"]]
      ]
    ],
    20: [
      [9, 10],
      [
        ["(.)(.{7,8})", "$1 $2", ["[23]"]],
        ["(...)(...)(....)", "$1 $2 $3", ["1[012]|[89]00"]],
        ["(..)(.{6,7})", "$1 $2", ["1[35]|[4-6]|[89][2-9]"]]
      ]
    ],
    27: [
      [9],
      [
        ["(860)(...)(...)", "$1 $2 $3", ["860"]],
        ["(..)(...)(....)", "$1 $2 $3", ["[1-79]|8(?:[0-47]|6[1-9])"]],
        ["(..)(.{3,4})", "$1 $2", ["8[1-4]"]],
        ["(..)(...)(.{2,3})", "$1 $2 $3", ["8[1-4]"]]
      ]
    ],
    30: [
      [10],
      [
        ["([27].)(....)(....)", "$1 $2 $3", ["21|7"]],
        ["(...)(...)(....)", "$1 $2 $3", ["2[2-9]1|[689]"]],
        ["(2...)(.{6})", "$1 $2", ["2[2-9][02-9]"]]
      ]
    ],
    31: [
      [9],
      [
        ["([1-578].)(...)(....)", "$1 $2 $3", ["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"]],
        ["([1-5]..)(...)(...)", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"]],
        ["(6)(.{8})", "$1 $2", ["6[0-57-9]"]],
        ["(66)(.{7})", "$1 $2", ["66"]],
        ["(14)(.{3,4})", "$1 $2", ["14"]],
        ["([89]0.)(.{4,7})", "$1 $2", ["80|9"]]
      ]
    ],
    32: [
      [9],
      [
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["4[6-9]"]],
        ["(.)(...)(..)(..)", "$1 $2 $3 $4", ["[23]|4[23]|9[2-4]"]],
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["[156]|7[018]|8(?:0[1-9]|[1-79])"]],
        ["(...)(..)(...)", "$1 $2 $3", ["(?:80|9)0"]]
      ]
    ],
    33: [
      [9],
      [
        ["([1-79])(..)(..)(..)(..)", "$1 $2 $3 $4 $5", ["[1-79]"]],
        ["(1..)(...)", "$1 $2", ["11"]],
        ["(8..)(..)(..)(..)", "$1 $2 $3 $4", ["8"]]
      ]
    ],
    34: [
      [9],
      [
        ["([89]00)(...)(...)", "$1 $2 $3", ["[89]00"]],
        ["([5-9]..)(..)(..)(..)", "$1 $2 $3 $4", ["[568]|[79][0-8]"]]
      ]
    ],
    36: [
      [9],
      [
        ["(1)(...)(....)", "$1 $2 $3", ["1"]],
        ["(..)(...)(.{3,4})", "$1 $2 $3", ["[2-9]"]]
      ]
    ],
    39: [
      [9, 10],
      [
        ["(..)(.{3,4})(....)", "$1 $2 $3", ["0[26]|55"]],
        ["(0[26])(....)(.....)", "$1 $2 $3", ["0[26]"]],
        ["(0[26])(.{4,6})", "$1 $2", ["0[26]"]],
        ["(0..)(.{3,4})(....)", "$1 $2 $3", ["0[13-57-9][0159]"]],
        ["(...)(.{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[245])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],
        ["(0...)(...)(....)", "$1 $2 $3", ["0[13-57-9][2-46-8]"]],
        ["(0...)(.{2,6})", "$1 $2", ["0[13-57-9][2-46-8]"]],
        ["(...)(...)(.{3,4})", "$1 $2 $3", ["[13]|8(?:00|4[08]|9[59])", "[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],
        ["(....)(....)", "$1 $2", ["894", "894[5-9]"]],
        ["(...)(....)(....)", "$1 $2 $3", ["3"]]
      ]
    ],
    40: [
      [9],
      [
        ["(..)(...)(....)", "$1 $2 $3", ["[23]1"]],
        ["(21)(....)", "$1 $2", ["21"]],
        ["(...)(...)(...)", "$1 $2 $3", ["[23][3-7]|[7-9]"]],
        ["(2..)(...)", "$1 $2", ["2[3-6]"]]
      ]
    ],
    41: [
      [9],
      [
        ["([2-9].)(...)(..)(..)", "$1 $2 $3 $4", ["[2-7]|[89]1"]],
        ["([89]..)(...)(...)", "$1 $2 $3", ["8[047]|90"]],
        ["(...)(..)(...)(..)(..)", "$1 $2 $3 $4 $5", ["860"]]
      ]
    ],
    43: [
      [10, 11, 12, 13],
      [
        ["(116...)", "$1", ["116"]],
        ["(1)(.{3,12})", "$1 $2", ["1"]],
        ["(5.)(.{3,5})", "$1 $2", ["5[079]"]],
        ["(5.)(...)(.{3,4})", "$1 $2 $3", ["5[079]"]],
        ["(5.)(....)(.{4,7})", "$1 $2 $3", ["5[079]"]],
        ["(...)(.{3,10})", "$1 $2", ["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"]],
        ["(....)(.{3,9})", "$1 $2", ["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"]]
      ]
    ],
    44: [
      [10],
      [
        ["(..)(....)(....)", "$1 $2 $3", ["2|5[56]|7(?:0|6[013-9])", "2|5[56]|7(?:0|6(?:[013-9]|2[0-35-9]))"]],
        ["(...)(...)(....)", "$1 $2 $3", ["1(?:1|.1)|3|9[018]"]],
        ["(.....)(.{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:387|5(?:24|39)|697|768|946)", "1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"]],
        ["(1...)(.{5,6})", "$1 $2", ["1"]],
        ["(7...)(.{6})", "$1 $2", ["7(?:[1-5789]|62)", "7(?:[1-5789]|624)"]],
        ["(800)(....)", "$1 $2", ["800", "8001", "80011", "800111", "8001111"]],
        ["(845)(46)(4.)", "$1 $2 $3", ["845", "8454", "84546", "845464"]],
        ["(8..)(...)(....)", "$1 $2 $3", ["8(?:4[2-5]|7[0-3])"]],
        ["(80.)(...)(....)", "$1 $2 $3", ["80"]],
        ["([58]00)(.{6})", "$1 $2", ["[58]00"]]
      ]
    ],
    45: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    46: [
      [9],
      [
        ["(8)(.{2,3})(.{2,3})(..)", "$1 $2 $3 $4", ["8"]],
        ["([1-69].)(.{2,3})(..)(..)", "$1 $2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],
        ["([1-69].)(...)(..)", "$1 $2 $3", ["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"]],
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],
        ["(...)(.{2,3})(..)", "$1 $2 $3", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],
        ["(7.)(...)(..)(..)", "$1 $2 $3 $4", ["7"]],
        ["(77)(..)(..)", "$1 $2 $3", ["7"]],
        ["(20)(.{2,3})(..)", "$1 $2 $3", ["20"]],
        ["(9[034].)(..)(..)(...)", "$1 $2 $3 $4", ["9[034]"]],
        ["(9[034].)(....)", "$1 $2", ["9[034]"]]
      ]
    ],
    47: [
      [8],
      [
        ["([489]..)(..)(...)", "$1 $2 $3", ["[489]"]],
        ["([235-7].)(..)(..)(..)", "$1 $2 $3 $4", ["[235-7]"]]
      ]
    ],
    48: [
      [9],
      [
        ["(..)(...)(..)(..)", "$1 $2 $3 $4", ["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],
        ["(..)(.)(....)", "$1 $2 $3", ["[12]2"]],
        ["(...)(...)(...)", "$1 $2 $3", ["26|39|5[0137]|6[0469]|7[02389]|8[08]"]],
        ["(...)(..)(.{2,3})", "$1 $2 $3", ["64"]],
        ["(...)(...)", "$1 $2", ["64"]]
      ]
    ],
    49: [
      [7, 8, 9, 10, 11, 12],
      [
        ["(1..)(.{7,8})", "$1 $2", ["1[67]"]],
        ["(15...)(.{6})", "$1 $2", ["15[0568]"]],
        ["(1...)(.{7})", "$1 $2", ["15"]],
        ["(..)(.{3,11})", "$1 $2", ["3[02]|40|[68]9"]],
        ["(...)(.{3,11})", "$1 $2", ["2(?:.1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"]],
        ["(....)(.{2,11})", "$1 $2", ["[24-6]|[7-9](?:.[1-9]|[1-9].)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])", "[24-6]|[7-9](?:.[1-9]|[1-9].)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"]],
        ["(3....)(.{1,10})", "$1 $2", ["3"]],
        ["(800)(.{7,12})", "$1 $2", ["800"]],
        ["(177)(99)(.{7,8})", "$1 $2 $3", ["177", "1779", "17799"]],
        ["(...)(.)(.{4,10})", "$1 $2 $3", ["(?:18|90)0|137", "1(?:37|80)|900[1359]"]],
        ["(1..)(.{5,11})", "$1 $2", ["181"]],
        ["(18...)(.{6})", "$1 $2", ["185", "1850", "18500"]],
        ["(18..)(.{7})", "$1 $2", ["18[68]"]],
        ["(18.)(.{8})", "$1 $2", ["18[2-579]"]],
        ["(700)(....)(....)", "$1 $2 $3", ["700"]],
        ["(138)(....)", "$1 $2", ["138"]]
      ]
    ],
    51: [
      [9],
      [
        ["(1)(.{7})", "$1 $2", ["1"]],
        ["([4-8].)(.{6})", "$1 $2", ["[4-7]|8[2-4]"]],
        ["(...)(.....)", "$1 $2", ["80"]],
        ["(9..)(...)(...)", "$1 $2 $3", ["9"]]
      ]
    ],
    52: [
      [10, 11],
      [
        ["([358].)(....)(....)", "$1 $2 $3", ["33|55|81"]],
        ["(...)(...)(....)", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"]],
        ["(1)([358].)(....)(....)", "$1 $2 $3 $4", ["1(?:33|55|81)"]],
        ["(1)(...)(...)(....)", "$1 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]
      ]
    ],
    53: [
      [8],
      [
        ["(.)(.{6,7})", "$1 $2", ["7"]],
        ["(..)(.{4,6})", "$1 $2", ["[2-4]"]],
        ["(.)(.{7})", "$1 $2", ["5"]]
      ]
    ],
    54: [
      [10, 11],
      [
        ["([68]..)(...)(....)", "$1-$2-$3", ["[68]"]],
        ["(..)(....)", "$1-$2", ["[2-9]"]],
        ["(...)(....)", "$1-$2", ["[2-9]"]],
        ["(....)(....)", "$1-$2", ["[2-9]"]],
        ["(9)(11)(....)(....)", "$1 $2 $3-$4", ["911"]],
        ["(9)(...)(...)(....)", "$1 $2 $3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],
        ["(9)(....)(..)(....)", "$1 $2 $3-$4", ["9[23]"]],
        ["(11)(....)(....)", "$1 $2-$3", ["1"]],
        ["(...)(...)(....)", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"]],
        ["(....)(..)(....)", "$1 $2-$3", ["[23]"]],
        ["(...)", "$1", ["1[012]|911"]]
      ]
    ],
    55: [
      [10, 11],
      [
        ["(....)(....)", "$1-$2", ["[2-9](?:[1-9]|0[1-9])"]],
        ["(.....)(....)", "$1-$2", ["9(?:[1-9]|0[1-9])"]],
        ["(.{3,5})", "$1", ["1[125689]"]],
        ["(..)(.....)(....)", "$1 $2-$3", ["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"]],
        ["(..)(....)(....)", "$1 $2-$3", ["[1-9][1-9]"]],
        ["(....)(....)", "$1-$2", ["(?:300|40(?:0|20))"]],
        ["([3589]00)(.{2,3})(....)", "$1 $2 $3", ["[3589]00"]]
      ]
    ],
    56: [
      [9],
      [
        ["(.)(....)(....)", "$1 $2 $3", ["2[23]"]],
        ["(..)(...)(....)", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"]],
        ["(9)(....)(....)", "$1 $2 $3", ["9"]],
        ["(44)(...)(....)", "$1 $2 $3", ["44"]],
        ["([68]00)(...)(.{3,4})", "$1 $2 $3", ["60|8"]],
        ["(600)(...)(..)(...)", "$1 $2 $3 $4", ["60"]],
        ["(1230)(...)(....)", "$1 $2 $3", ["1"]],
        ["(.....)(....)", "$1 $2", ["219"]],
        ["(.{4,5})", "$1", ["[1-9]"]]
      ]
    ],
    57: [
      [10],
      [
        ["(.)(.{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"]],
        ["(...)(.{7})", "$1 $2", ["3"]],
        ["(1)(...)(.{7})", "$1 $2 $3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"]]
      ]
    ],
    58: [
      [10],
      [
        ["(...)(.{7})", "$1-$2", []]
      ]
    ],
    60: [
      [9, 10],
      [
        ["([4-79])(...)(....)", "$1-$2 $3", ["[4-79]"]],
        ["(3)(....)(....)", "$1-$2 $3", ["3"]],
        ["([18].)(...)(.{3,4})", "$1-$2 $3", ["1[02-46-9][1-9]|8"]],
        ["(1)([36-8]00)(..)(....)", "$1-$2-$3-$4", ["1[36-8]0"]],
        ["(11)(....)(....)", "$1-$2 $3", ["11"]],
        ["(15[49])(...)(....)", "$1-$2 $3", ["15"]]
      ]
    ],
    61: [
      [9],
      [
        ["([2378])(....)(....)", "$1 $2 $3", ["[2378]"]],
        ["(...)(...)(...)", "$1 $2 $3", ["[45]|14"]],
        ["(16)(...)(.{2,4})", "$1 $2 $3", ["16"]],
        ["(1[389]..)(...)(...)", "$1 $2 $3", ["1(?:[38]0|90)", "1(?:[38]00|90)"]],
        ["(180)(2...)", "$1 $2", ["180", "1802"]],
        ["(19.)(...)", "$1 $2", ["19[13]"]],
        ["(19..)(....)", "$1 $2", ["19[67]"]],
        ["(13)(..)(..)", "$1 $2 $3", ["13[1-9]"]]
      ]
    ],
    62: [
      [9, 10, 11, 12],
      [
        ["(..)(.{5,8})", "$1 $2", ["2[124]|[36]1"]],
        ["(...)(.{5,8})", "$1 $2", ["[4579]|2[035-9]|[36][02-9]"]],
        ["(8..)(.{3,4})(.{3,5})", "$1-$2-$3", ["8[1-35-9]"]],
        ["(1)(500)(...)", "$1 $2 $3", ["15"]],
        ["(177)(.{6,8})", "$1 $2", ["17"]],
        ["(800)(.{5,7})", "$1 $2", ["800"]],
        ["(804)(...)(....)", "$1 $2 $3", ["804"]],
        ["(80.)(.)(...)(...)", "$1 $2 $3 $4", ["80[79]"]]
      ]
    ],
    63: [
      [10],
      [
        ["(2)(...)(....)", "$1 $2 $3", ["2"]],
        ["(2)(.....)", "$1 $2", ["2"]],
        ["(....)(.{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"]],
        ["(.....)(....)", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"]],
        ["([3-8].)(...)(....)", "$1 $2 $3", ["[3-8]"]],
        ["(...)(...)(....)", "$1 $2 $3", ["81|9"]],
        ["(1800)(...)(....)", "$1 $2 $3", ["1"]],
        ["(1800)(.{1,2})(...)(....)", "$1 $2 $3 $4", ["1"]]
      ]
    ],
    64: [
      [8, 9, 10],
      [
        ["([34679])(...)(....)", "$1-$2 $3", ["[346]|7[2-57-9]|9[1-9]"]],
        ["(24099)(...)", "$1 $2", ["240", "2409", "24099"]],
        ["(..)(...)(...)", "$1 $2 $3", ["21"]],
        ["(..)(...)(.{3,5})", "$1 $2 $3", ["2(?:1[1-9]|[69]|7[0-35-9])|70|86"]],
        ["(2.)(.{3,4})(....)", "$1 $2 $3", ["2[028]"]],
        ["(...)(...)(.{3,4})", "$1 $2 $3", ["2(?:10|74)|5|[89]0"]]
      ]
    ],
    65: [
      [8],
      [
        ["([3689]...)(....)", "$1 $2", ["[369]|8[1-9]"]],
        ["(1[89]00)(...)(....)", "$1 $2 $3", ["1[89]"]],
        ["(7000)(....)(...)", "$1 $2 $3", ["70"]],
        ["(800)(...)(....)", "$1 $2 $3", ["80"]]
      ]
    ],
    66: [
      [9],
      [
        ["(2)(...)(....)", "$1 $2 $3", ["2"]],
        ["([13-9].)(...)(.{3,4})", "$1 $2 $3", ["14|[3-9]"]],
        ["(1[89]00)(...)(...)", "$1 $2 $3", ["1"]]
      ]
    ],
    81: [
      [10],
      [
        ["(...)(...)(...)", "$1-$2-$3", ["(?:12|57|99)0"]],
        ["(...)(...)(....)", "$1-$2-$3", ["800"]],
        ["(....)(....)", "$1-$2", ["0077"]],
        ["(....)(..)(.{3,4})", "$1-$2-$3", ["0077"]],
        ["(....)(..)(....)", "$1-$2-$3", ["0088"]],
        ["(....)(...)(.{3,4})", "$1-$2-$3", ["00(?:37|66)"]],
        ["(....)(....)(.{4,5})", "$1-$2-$3", ["00(?:37|66)"]],
        ["(....)(.....)(.{5,6})", "$1-$2-$3", ["00(?:37|66)"]],
        ["(....)(.{6})(.{6,7})", "$1-$2-$3", ["00(?:37|66)"]],
        ["(..)(....)(....)", "$1-$2-$3", ["[2579]0|80[1-9]"]],
        ["(....)(.)(....)", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"]],
        ["(...)(..)(....)", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"]],
        ["(..)(...)(....)", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"]],
        ["(...)(..)(....)", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"]],
        ["(.)(....)(....)", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"]],
        ["(..)(...)(....)", "$1-$2-$3", ["[2479][1-9]"]]
      ]
    ],
    82: [
      [9, 10],
      [
        ["(..)(....)(....)", "$1-$2-$3", ["1(?:0|1[19]|[69]9|5[458])|[57]0", "1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"]],
        ["(..)(.{3,4})(....)", "$1-$2-$3", ["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]", "1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"]],
        ["(...)(.)(....)", "$1-$2-$3", ["131", "1312"]],
        ["(...)(..)(....)", "$1-$2-$3", ["131", "131[13-9]"]],
        ["(...)(...)(....)", "$1-$2-$3", ["13[2-9]"]],
        ["(..)(..)(...)(....)", "$1-$2-$3-$4", ["30"]],
        ["(.)(.{3,4})(....)", "$1-$2-$3", ["2[1-9]"]],
        ["(.)(.{3,4})", "$1-$2", ["21[0-46-9]"]],
        ["(..)(.{3,4})", "$1-$2", ["[3-6][1-9]1", "[3-6][1-9]1(?:[0-46-9])"]],
        ["(....)(....)", "$1-$2", ["1(?:5[46-9]|6[04678]|8[0579])", "1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))"]]
      ]
    ],
    84: [
      [9, 10],
      [
        ["([17]99)(....)", "$1 $2", ["[17]99"]],
        ["([48])(....)(....)", "$1 $2 $3", ["[48]"]],
        ["([235-7].)(....)(...)", "$1 $2 $3", ["2[025-79]|3[0136-9]|5[2-9]|6[0-46-8]|7[02-79]"]],
        ["(80)(.....)", "$1 $2", ["80"]],
        ["(69.)(.{4,5})", "$1 $2", ["69"]],
        ["([235-7]..)(....)(...)", "$1 $2 $3", ["2[1348]|3[25]|5[01]|65|7[18]"]],
        ["(9.)(...)(..)(..)", "$1 $2 $3 $4", ["9"]],
        ["(1[2689].)(...)(....)", "$1 $2 $3", ["1(?:[26]|8[68]|99)"]],
        ["(1[89]00)(.{4,6})", "$1 $2", ["1[89]0"]]
      ]
    ],
    86: [
      [11],
      [
        ["(80..)(....)", "$1 $2", ["80[2678]"]],
        ["([48]00)(...)(....)", "$1 $2 $3", ["[48]00"]],
        ["(.{5,6})", "$1", ["100|95"]],
        ["(..)(.{5,6})", "$1 $2", ["(?:10|2.)[19]", "(?:10|2.)(?:10|9[56])", "(?:10|2.)(?:100|9[56])"]],
        ["(...)(.{5,6})", "$1 $2", ["[3-9]", "[3-9]..[19]", "[3-9]..(?:10|9[56])"]],
        ["(.{3,4})(....)", "$1 $2", ["[2-9]"]],
        ["(21)(....)(.{4,6})", "$1 $2 $3", ["21"]],
        ["([12].)(....)(....)", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"]],
        ["(...)(...)(....)", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7.|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"]],
        ["(...)(....)(....)", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"]],
        ["(...)(....)(....)", "$1 $2 $3", ["1[3-578]"]],
        ["(10800)(...)(....)", "$1 $2 $3", ["108", "1080", "10800"]],
        ["(...)(.{7,8})", "$1 $2", ["950"]]
      ]
    ],
    90: [
      [10],
      [
        ["(...)(...)(....)", "$1 $2 $3", ["[23]|4(?:[0-35-9]|4[0-35-9])"]],
        ["(...)(...)(....)", "$1 $2 $3", ["[589]"]],
        ["(444)(.)(...)", "$1 $2 $3", ["444"]]
      ]
    ],
    91: [
      [10],
      [
        ["(.....)(.....)", "$1 $2", ["7(?:[0257]|3[013-57-9]|4[0-389]|6[0-35-9]|8[0-79])|8(?:0[015689]|1[0-57-9]|2[2356-9]|3[0-57-9]|[45]|6[02457-9]|7[01-69]|8[0-24-9]|9[02-9])|9", "7(?:0|2(?:[0235679]|[14][017-9]|8[0-59]|9[389])|3(?:[058]|1[09]|31|48|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9])|7(?:0[2-9]|[1-79]|8[1-9])|8[0-79])|8(?:0(?:[01589]|6[67])|1(?:[02-57-9]|1[0135-9])|2(?:[236-9]|5[1-9])|3(?:[0357-9]|4[1-9])|[45]|6[02457-9]|7(?:07|[1-69])|8(?:[0-26-9]|44|5[2-9])|9(?:[035-9]|2[2-9]|4[0-8]))|9"]],
        ["(..)(....)(....)", "$1 $2 $3", ["11|2[02]|33|4[04]|79|80[2-46]"]],
        ["(...)(...)(....)", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[569][14]|7[1257]|8[1346]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)"]],
        ["(...)(...)(....)", "$1 $2 $3", ["7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)", "7(?:12|2[14]|3[134]|4[47]|5(?:1|5[2-6])|[67]1|88)"]],
        ["(...)(...)(....)", "$1 $2 $3", ["8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"]],
        ["(....)(...)(...)", "$1 $2 $3", ["1(?:[23579]|[468][1-9])|[2-8]"]],
        ["(1600)(..)(....)", "$1 $2 $3", ["160", "1600"]],
        ["(1800)(.{4,5})", "$1 $2", ["180", "1800"]],
        ["(18[06]0)(.{2,4})(....)", "$1 $2 $3", ["18[06]", "18[06]0"]],
        ["(140)(...)(....)", "$1 $2 $3", ["140"]],
        ["(....)(...)(...)(...)", "$1 $2 $3 $4", ["18[06]", "18(?:0[03]|6[12])"]]
      ]
    ],
    92: [
      [10],
      [
        ["(..)(111)(...)(...)", "$1 $2 $3 $4", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"]],
        ["(...)(111)(...)(...)", "$1 $2 $3 $4", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9]).1", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9]).11", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9]).111"]],
        ["(..)(.{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"]],
        ["(...)(.{6,7})", "$1 $2", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9]).[2-9]"]],
        ["(3..)(.{7})", "$1 $2", ["3"]],
        ["([15]...)(.{5,6})", "$1 $2", ["58[12]|1"]],
        ["(586..)(.....)", "$1 $2", ["586"]],
        ["([89]00)(...)(..)", "$1 $2 $3", ["[89]00"]]
      ]
    ],
    93: [
      [9],
      [
        ["([2-7].)(...)(....)", "$1 $2 $3", ["[2-7]"]]
      ]
    ],
    94: [
      [9],
      [
        ["(..)(.)(.{6})", "$1 $2 $3", ["[1-689]"]],
        ["(..)(...)(....)", "$1 $2 $3", ["7"]]
      ]
    ],
    95: [
      [8, 9, 10],
      [
        ["(.)(...)(.{3,4})", "$1 $2 $3", ["1|2[245]"]],
        ["(2)(....)(....)", "$1 $2 $3", ["251"]],
        ["(.)(..)(...)", "$1 $2 $3", ["16|2"]],
        ["(..)(...)(.{3,4})", "$1 $2 $3", ["67|81"]],
        ["(..)(..)(.{3,4})", "$1 $2 $3", ["[4-8]"]],
        ["(9)(...)(.{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"]],
        ["(9)([34]....)(....)", "$1 $2 $3", ["9(?:3[0-36]|4[0-57-9])"]],
        ["(9)(...)(...)(...)", "$1 $2 $3 $4", ["92[56]"]],
        ["(9)(...)(...)(..)", "$1 $2 $3 $4", ["93"]]
      ]
    ],
    98: [
      [10],
      [
        ["(21)(.{3,5})", "$1 $2", ["21"]],
        ["(..)(....)(....)", "$1 $2 $3", ["[1-8]"]],
        ["(...)(...)(.{3,4})", "$1 $2 $3", ["9"]],
        ["(...)(..)(.{2,3})", "$1 $2 $3", ["9"]],
        ["(...)(...)", "$1 $2", ["9"]]
      ]
    ],
    211: [
      [9],
      [
        ["(...)(...)(...)", "$1 $2 $3", []]
      ]
    ],
    212: [
      [9],
      [
        ["([56]..)(.{6})", "$1-$2", ["5(?:2[015-7]|3[0-4])|6"]],
        ["([58]...)(.....)", "$1-$2", ["5(?:2[2-489]|3[5-9])|892", "5(?:2(?:[2-48]|90)|3(?:[5-79]|80))|892"]],
        ["(5....)(....)", "$1-$2", ["5(?:29|38)", "5(?:29|38)[89]"]],
        ["(8[09])(.{7})", "$1-$2", ["8(?:0|9[013-9])"]]
      ]
    ],
    213: [
      [9],
      [
        ["([1-4].)(..)(..)(..)", "$1 $2 $3 $4", ["[1-4]"]],
        ["([5-8]..)(..)(..)(..)", "$1 $2 $3 $4", ["[5-8]"]],
        ["(9.)(...)(..)(..)", "$1 $2 $3 $4", ["9"]]
      ]
    ],
    216: [
      [8],
      [
        ["(..)(...)(...)", "$1 $2 $3", []]
      ]
    ],
    218: [
      [9],
      [
        ["([25679].)(.{7})", "$1-$2", []]
      ]
    ],
    220: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    221: [
      [9],
      [
        ["(..)(...)(..)(..)", "$1 $2 $3 $4", ["[379]"]],
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["8"]]
      ]
    ],
    222: [
      [8],
      [
        ["([2-48].)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    223: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["[246-9]"]],
        ["(....)", "$1", ["67|74"]]
      ]
    ],
    224: [
      [8, 9],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["3"]],
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["[67]"]]
      ]
    ],
    225: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    226: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    227: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["[289]|09"]],
        ["(08)(...)(...)", "$1 $2 $3", ["08"]]
      ]
    ],
    228: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    229: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    230: [
      [7, 8],
      [
        ["([2-46-9]..)(....)", "$1 $2", ["[2-46-9]"]],
        ["(5...)(....)", "$1 $2", ["5"]]
      ]
    ],
    231: [
      [7, 8, 9],
      [
        ["(2.)(...)(...)", "$1 $2 $3", ["2"]],
        ["(...)(...)(...)", "$1 $2 $3", ["[2579]"]],
        ["([4-6])(...)(...)", "$1 $2 $3", ["[4-6]"]],
        ["(..)(...)(....)", "$1 $2 $3", ["[38]"]]
      ]
    ],
    232: [
      [8],
      [
        ["(..)(.{6})", "$1 $2", []]
      ]
    ],
    233: [
      [9],
      [
        ["(..)(...)(....)", "$1 $2 $3", ["[235]"]],
        ["(...)(.....)", "$1 $2", ["8"]]
      ]
    ],
    234: [
      [10],
      [
        ["(...)(...)(.{3,4})", "$1 $2 $3", ["70|8[01]|90[23589]"]],
        ["(.)(...)(.{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"]],
        ["(..)(...)(.{2,3})", "$1 $2 $3", ["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"]],
        ["([78]00)(....)(.{4,5})", "$1 $2 $3", ["[78]00"]],
        ["([78]00)(.....)(.{5,6})", "$1 $2 $3", ["[78]00"]],
        ["(78)(..)(...)", "$1 $2 $3", ["78"]]
      ]
    ],
    235: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    236: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    237: [
      [8, 9],
      [
        ["([26])(..)(..)(..)(..)", "$1 $2 $3 $4 $5", ["[26]"]],
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["[23]|88"]],
        ["(800)(..)(...)", "$1 $2 $3", ["80"]]
      ]
    ],
    238: [
      [7],
      [
        ["(...)(..)(..)", "$1 $2 $3", []]
      ]
    ],
    239: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    240: [
      [9],
      [
        ["(...)(...)(...)", "$1 $2 $3", ["[235]"]],
        ["(...)(.{6})", "$1 $2", ["[89]"]]
      ]
    ],
    241: [
      [8],
      [
        ["(.)(..)(..)(..)", "$1 $2 $3 $4", ["[2-7]"]],
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["0"]]
      ]
    ],
    242: [
      [9],
      [
        ["(..)(...)(....)", "$1 $2 $3", ["[02]"]],
        ["(.)(....)(....)", "$1 $2 $3", ["8"]]
      ]
    ],
    243: [
      [9],
      [
        ["(..)(...)(....)", "$1 $2 $3", ["12"]],
        ["([89]..)(...)(...)", "$1 $2 $3", ["8[0-2459]|9"]],
        ["(..)(..)(...)", "$1 $2 $3", ["88"]],
        ["(..)(.....)", "$1 $2", ["[1-6]"]]
      ]
    ],
    244: [
      [9],
      [
        ["(...)(...)(...)", "$1 $2 $3", []]
      ]
    ],
    245: [
      [7, 9],
      [
        ["(...)(...)(...)", "$1 $2 $3", ["44|9[567]"]]
      ]
    ],
    246: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    247: [
      [4],
      []
    ],
    248: [
      [7],
      [
        ["(...)(...)", "$1 $2", ["8"]],
        ["(.)(...)(...)", "$1 $2 $3", ["[246]"]]
      ]
    ],
    249: [
      [9],
      [
        ["(..)(...)(....)", "$1 $2 $3", []]
      ]
    ],
    250: [
      [9],
      [
        ["(2..)(...)(...)", "$1 $2 $3", ["2"]],
        ["([7-9]..)(...)(...)", "$1 $2 $3", ["[7-9]"]],
        ["(0.)(..)(..)(..)", "$1 $2 $3 $4", ["0"]]
      ]
    ],
    251: [
      [9],
      [
        ["([1-59].)(...)(....)", "$1 $2 $3", []]
      ]
    ],
    252: [
      [8, 9],
      [
        ["(.)(.{6})", "$1 $2", ["2[0-79]|[13-5]"]],
        ["(.)(.{7})", "$1 $2", ["24|[67]"]],
        ["(..)(.{5,7})", "$1 $2", ["15|28|6[1-35-9]|799|9[2-9]"]],
        ["(90.)(...)(...)", "$1 $2 $3", ["90"]]
      ]
    ],
    253: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    254: [
      [9],
      [
        ["(..)(.{5,7})", "$1 $2", ["[24-6]"]],
        ["(...)(.{6})", "$1 $2", ["7"]],
        ["(...)(...)(.{3,4})", "$1 $2 $3", ["[89]"]]
      ]
    ],
    255: [
      [9],
      [
        ["([24].)(...)(....)", "$1 $2 $3", ["[24]"]],
        ["([67]..)(...)(...)", "$1 $2 $3", ["[67]"]],
        ["([89]..)(..)(....)", "$1 $2 $3", ["[89]"]]
      ]
    ],
    256: [
      [9],
      [
        ["(...)(.{6})", "$1 $2", ["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"]],
        ["(..)(.{7})", "$1 $2", ["3|4(?:[1-5]|6[0-36-9])"]],
        ["(2024)(.....)", "$1 $2", ["2024"]]
      ]
    ],
    257: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    258: [
      [9],
      [
        ["([28].)(...)(.{3,4})", "$1 $2 $3", ["2|8[2-7]"]],
        ["(80.)(...)(...)", "$1 $2 $3", ["80"]]
      ]
    ],
    260: [
      [9],
      [
        ["([29].)(.{7})", "$1 $2", ["[29]"]],
        ["(800)(...)(...)", "$1 $2 $3", ["8"]]
      ]
    ],
    261: [
      [9],
      [
        ["([23].)(..)(...)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    262: [
      [9],
      [
        ["([268]..)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    263: [
      [9, 10],
      [
        ["([49])(...)(.{2,4})", "$1 $2 $3", ["4|9[2-9]"]],
        ["(7.)(...)(.{3,4})", "$1 $2 $3", ["7"]],
        ["(86..)(...)(...)", "$1 $2 $3", ["86[24]"]],
        ["([2356]..)(.{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"]],
        ["(...)(...)(.{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|6[14]|7[35]|84)|329"]],
        ["([1-356].)(.{3,5})", "$1 $2", ["1[3-9]|2[0569]|3[0-69]|5[05689]|6[0-46-9]"]],
        ["([235].)(...)(.{3,4})", "$1 $2 $3", ["[23]9|54"]],
        ["([25]...)(.{3,5})", "$1 $2", ["(?:25|54)8", "258[23]|5483"]],
        ["(8...)(.{6})", "$1 $2", ["86"]],
        ["(80.)(...)(....)", "$1 $2 $3", ["80"]]
      ]
    ],
    264: [
      [9],
      [
        ["(8.)(...)(....)", "$1 $2 $3", ["8[1235]"]],
        ["(6.)(...)(.{3,4})", "$1 $2 $3", ["6"]],
        ["(88)(...)(...)", "$1 $2 $3", ["88"]],
        ["(870)(...)(...)", "$1 $2 $3", ["870"]]
      ]
    ],
    265: [
      [9],
      [
        ["(.)(...)(...)", "$1 $2 $3", ["1"]],
        ["(2..)(...)(...)", "$1 $2 $3", ["2"]],
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["[1789]"]]
      ]
    ],
    266: [
      [8],
      [
        ["(....)(....)", "$1 $2", []]
      ]
    ],
    267: [
      [8],
      [
        ["(...)(....)", "$1 $2", ["[2-6]"]],
        ["(7.)(...)(...)", "$1 $2 $3", ["7"]],
        ["(90)(.....)", "$1 $2", ["9"]]
      ]
    ],
    268: [
      [8],
      [
        ["(....)(....)", "$1 $2", ["[027]"]]
      ]
    ],
    269: [
      [7],
      [
        ["(...)(..)(..)", "$1 $2 $3", []]
      ]
    ],
    290: [
      [4, 5],
      []
    ],
    291: [
      [7],
      [
        ["(.)(...)(...)", "$1 $2 $3", []]
      ]
    ],
    297: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    298: [
      [6],
      [
        ["(.{6})", "$1", []]
      ]
    ],
    299: [
      [6],
      [
        ["(..)(..)(..)", "$1 $2 $3", []]
      ]
    ],
    350: [
      [8],
      [
        ["(...)(.....)", "$1 $2", ["2"]]
      ]
    ],
    351: [
      [9],
      [
        ["(2.)(...)(....)", "$1 $2 $3", ["2[12]"]],
        ["([2-46-9]..)(...)(...)", "$1 $2 $3", ["2[3-9]|[346-9]"]]
      ]
    ],
    352: [
      [9],
      [
        ["(..)(...)", "$1 $2", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"]],
        ["(..)(..)(..)", "$1 $2 $3", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"]],
        ["(..)(..)(...)", "$1 $2 $3", ["20"]],
        ["(..)(..)(..)(.{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]],
        ["(..)(..)(..)(...)", "$1 $2 $3 $4", ["20"]],
        ["(..)(..)(..)(..)(.{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]],
        ["(..)(..)(..)(.{1,4})", "$1 $2 $3 $4", ["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"]],
        ["(...)(..)(...)", "$1 $2 $3", ["70|80[01]|90[015]"]],
        ["(...)(...)(...)", "$1 $2 $3", ["6"]]
      ]
    ],
    353: [
      [9],
      [
        ["(1)(.{3,4})(....)", "$1 $2 $3", ["1"]],
        ["(..)(.....)", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"]],
        ["(...)(.....)", "$1 $2", ["40[24]|50[45]"]],
        ["(48)(....)(....)", "$1 $2 $3", ["48"]],
        ["(818)(...)(...)", "$1 $2 $3", ["81"]],
        ["(..)(...)(.{3,4})", "$1 $2 $3", ["[24-69]|7[14]"]],
        ["([78].)(.{3,4})(....)", "$1 $2 $3", ["76|8[35-9]"]],
        ["(700)(...)(...)", "$1 $2 $3", ["70"]],
        ["(....)(...)(...)", "$1 $2 $3", ["1(?:8[059]|5)", "1(?:8[059]0|5)"]]
      ]
    ],
    354: [
      [7, 8, 9],
      [
        ["(...)(....)", "$1 $2", ["[4-9]"]],
        ["(3..)(...)(...)", "$1 $2 $3", ["3"]]
      ]
    ],
    355: [
      [9],
      [
        ["(4)(...)(....)", "$1 $2 $3", ["4[0-6]"]],
        ["(6[6-9])(...)(....)", "$1 $2 $3", ["6"]],
        ["(..)(...)(...)", "$1 $2 $3", ["[2358][2-5]|4[7-9]"]],
        ["(...)(.{3,5})", "$1 $2", ["[235][16-9]|8[016-9]|[79]"]]
      ]
    ],
    356: [
      [8],
      [
        ["(....)(....)", "$1 $2", []]
      ]
    ],
    357: [
      [8],
      [
        ["(..)(.{6})", "$1 $2", []]
      ]
    ],
    358: [
      [6, 7, 8, 9, 10, 11],
      [
        ["(...)(.{3,7})", "$1 $2", ["(?:[1-3]00|[6-8]0)"]],
        ["(116...)", "$1", ["116"]],
        ["(..)(.{4,10})", "$1 $2", ["[14]|2[09]|50|7[135]"]],
        ["(.)(.{4,11})", "$1 $2", ["[25689][1-8]|3"]]
      ]
    ],
    359: [
      [9],
      [
        ["(2)(.....)", "$1 $2", ["29"]],
        ["(2)(...)(.{3,4})", "$1 $2 $3", ["2"]],
        ["(...)(....)", "$1 $2", ["43[124-7]|70[1-9]"]],
        ["(...)(...)(..)", "$1 $2 $3", ["43[124-7]|70[1-9]"]],
        ["(...)(..)(...)", "$1 $2 $3", ["[78]00"]],
        ["(...)(...)(...)", "$1 $2 $3", ["999"]],
        ["(..)(...)(.{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"]],
        ["(..)(...)(.{3,4})", "$1 $2 $3", ["48|8[7-9]|9[08]"]]
      ]
    ],
    370: [
      [8],
      [
        ["([34].)(.{6})", "$1 $2", ["37|4(?:1|5[45]|6[2-4])"]],
        ["([3-6]..)(.....)", "$1 $2", ["3[148]|4(?:[24]|6[09])|528|6"]],
        ["([7-9]..)(..)(...)", "$1 $2 $3", ["[7-9]"]],
        ["(5)(2..)(....)", "$1 $2 $3", ["52[0-79]"]]
      ]
    ],
    371: [
      [8],
      [
        ["([2689].)(...)(...)", "$1 $2 $3", []]
      ]
    ],
    372: [
      [7, 8],
      [
        ["([3-79]..)(....)", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],
        ["(70)(..)(....)", "$1 $2 $3", ["70"]],
        ["(8000)(...)(...)", "$1 $2 $3", ["800", "8000"]],
        ["([458]...)(.{3,4})", "$1 $2", ["40|5|8(?:00|[1-5])", "40|5|8(?:00[1-9]|[1-5])"]]
      ]
    ],
    373: [
      [8],
      [
        ["(..)(...)(...)", "$1 $2 $3", ["22|3"]],
        ["([25-7]..)(..)(...)", "$1 $2 $3", ["2[13-79]|[5-7]"]],
        ["([89]..)(.....)", "$1 $2", ["[89]"]]
      ]
    ],
    374: [
      [8],
      [
        ["(..)(.{6})", "$1 $2", ["1|47"]],
        ["(..)(.{6})", "$1 $2", ["4[139]|[5-7]|9[1-9]"]],
        ["(...)(.....)", "$1 $2", ["[23]"]],
        ["(...)(..)(...)", "$1 $2 $3", ["8|90"]]
      ]
    ],
    375: [
      [9],
      [
        ["(..)(...)(..)(..)", "$1 $2-$3-$4", ["17[0-3589]|2[4-9]|[34]", "17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"]],
        ["(...)(..)(..)(..)", "$1 $2-$3-$4", ["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])", "1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"]],
        ["(....)(..)(...)", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"]],
        ["([89]..)(...)(....)", "$1 $2 $3", ["8[01]|9"]],
        ["(82.)(....)(....)", "$1 $2 $3", ["82"]],
        ["(800)(...)", "$1 $2", ["800"]],
        ["(800)(..)(.{2,4})", "$1 $2 $3", ["800"]]
      ]
    ],
    376: [
      [6],
      [
        ["(...)(...)", "$1 $2", ["[346-9]"]],
        ["(180[02])(....)", "$1 $2", ["1"]]
      ]
    ],
    377: [
      [8, 9],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["9"]],
        ["(..)(...)(...)", "$1 $2 $3", ["4"]],
        ["(6)(..)(..)(..)(..)", "$1 $2 $3 $4 $5", ["6"]],
        ["(...)(...)(..)", "$1 $2 $3", ["8"]]
      ]
    ],
    378: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["[5-7]"]],
        ["(0549)(.{6})", "($1) $2", ["0"]],
        ["(.{6})", "(0549) $1", ["[89]"]]
      ]
    ],
    379: [
      [10],
      []
    ],
    380: [
      [9],
      [
        ["([3-9].)(...)(....)", "$1 $2 $3", ["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|73|9[1-9]", "[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|73|9[1-9]"]],
        ["([3-689]..)(...)(...)", "$1 $2 $3", ["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90", "3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"]],
        ["([3-6]...)(.....)", "$1 $2", ["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])", "3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"]]
      ]
    ],
    381: [
      [8, 9],
      [
        ["([23]..)(.{4,9})", "$1 $2", ["(?:2[389]|39)0"]],
        ["([1-3].)(.{5,10})", "$1 $2", ["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"]],
        ["(6.)(.{6,8})", "$1 $2", ["6"]],
        ["([89]..)(.{3,9})", "$1 $2", ["[89]"]],
        ["(7[26])(.{4,9})", "$1 $2", ["7[26]"]],
        ["(7[08].)(.{4,9})", "$1 $2", ["7[08]"]]
      ]
    ],
    382: [
      [8, 9],
      [
        ["(..)(...)(...)", "$1 $2 $3", ["[2-57-9]|6[036-9]", "[2-57-9]|6(?:[03689]|7(?:[0-8]|9[3-9]))"]],
        ["(67)(9)(...)(...)", "$1 $2 $3 $4", ["679", "679[0-2]"]]
      ]
    ],
    385: [
      [8, 9],
      [
        ["(1)(....)(...)", "$1 $2 $3", ["1"]],
        ["(6[09])(....)(...)", "$1 $2 $3", ["6[09]"]],
        ["([67]2)(...)(.{3,4})", "$1 $2 $3", ["[67]2"]],
        ["([2-5].)(...)(.{3,4})", "$1 $2 $3", ["[2-5]"]],
        ["(9.)(...)(.{3,4})", "$1 $2 $3", ["9"]],
        ["(9.)(....)(....)", "$1 $2 $3", ["9"]],
        ["(9.)(.{3,4})(...)(...)", "$1 $2 $3 $4", ["9"]],
        ["(..)(..)(.{2,3})", "$1 $2 $3", ["6[0145]|7"]],
        ["(..)(.{3,4})(...)", "$1 $2 $3", ["6[0145]|7"]],
        ["(80[01])(..)(.{2,3})", "$1 $2 $3", ["8"]],
        ["(80[01])(.{3,4})(...)", "$1 $2 $3", ["8"]]
      ]
    ],
    386: [
      [8],
      [
        ["(.)(...)(..)(..)", "$1 $2 $3 $4", ["[12]|3[24-8]|4[24-8]|5[2-8]|7[3-8]"]],
        ["([3-7].)(...)(...)", "$1 $2 $3", ["[37][01]|4[0139]|51|6"]],
        ["([89][09])(.{3,6})", "$1 $2", ["[89][09]"]],
        ["([58]..)(.....)", "$1 $2", ["59|8[1-3]"]]
      ]
    ],
    387: [
      [8, 9],
      [
        ["(..)(...)(...)", "$1 $2-$3", ["[3-5]"]],
        ["(..)(...)(...)", "$1 $2 $3", ["6[1-356]|[7-9]"]],
        ["(..)(..)(..)(...)", "$1 $2 $3 $4", ["6[047]"]]
      ]
    ],
    389: [
      [8],
      [
        ["(2)(...)(....)", "$1 $2 $3", ["2"]],
        ["([347].)(...)(...)", "$1 $2 $3", ["[347]"]],
        ["([58]..)(.)(..)(..)", "$1 $2 $3 $4", ["[58]"]]
      ]
    ],
    420: [
      [9],
      [
        ["([2-9]..)(...)(...)", "$1 $2 $3", ["[2-8]|9[015-7]"]],
        ["(96.)(...)(...)(...)", "$1 $2 $3 $4", ["96"]],
        ["(9.)(...)(...)(...)", "$1 $2 $3 $4", ["9[36]"]]
      ]
    ],
    421: [
      [9],
      [
        ["(2)(16)(.{3,4})", "$1 $2 $3", ["216"]],
        ["([3-5].)(16)(.{2,3})", "$1 $2 $3", ["[3-5]"]],
        ["(2)(...)(...)(..)", "$1/$2 $3 $4", ["2"]],
        ["([3-5].)(...)(..)(..)", "$1/$2 $3 $4", ["[3-5]"]],
        ["([689]..)(...)(...)", "$1 $2 $3", ["[689]"]],
        ["(9090)(...)", "$1 $2", ["9090"]]
      ]
    ],
    423: [
      [7],
      [
        ["(...)(..)(..)", "$1 $2 $3", ["[23789]"]],
        ["(...)(...)(...)", "$1 $2 $3", ["6[56]"]],
        ["(69)(7..)(....)", "$1 $2 $3", ["697"]]
      ]
    ],
    500: [
      [5],
      []
    ],
    501: [
      [7],
      [
        ["(...)(....)", "$1-$2", ["[2-8]"]],
        ["(0)(800)(....)(...)", "$1-$2-$3-$4", ["0"]]
      ]
    ],
    502: [
      [8],
      [
        ["(....)(....)", "$1 $2", ["[2-7]"]],
        ["(....)(...)(....)", "$1 $2 $3", ["1"]]
      ]
    ],
    503: [
      [8],
      [
        ["(....)(....)", "$1 $2", ["[267]"]],
        ["(...)(....)", "$1 $2", ["[89]"]],
        ["(...)(....)(....)", "$1 $2 $3", ["[89]"]]
      ]
    ],
    504: [
      [8],
      [
        ["(....)(....)", "$1-$2", []]
      ]
    ],
    505: [
      [8],
      [
        ["(....)(....)", "$1 $2", []]
      ]
    ],
    506: [
      [8],
      [
        ["(....)(....)", "$1 $2", ["[24-7]|8[3-9]"]],
        ["(...)(...)(....)", "$1-$2-$3", ["[89]0"]]
      ]
    ],
    507: [
      [8],
      [
        ["(...)(....)", "$1-$2", ["[1-57-9]"]],
        ["(....)(....)", "$1-$2", ["6"]]
      ]
    ],
    508: [
      [6],
      [
        ["([45].)(..)(..)", "$1 $2 $3", []]
      ]
    ],
    509: [
      [8],
      [
        ["(..)(..)(....)", "$1 $2 $3", []]
      ]
    ],
    590: [
      [9],
      [
        ["([56]90)(..)(....)", "$1 $2-$3", []]
      ]
    ],
    591: [
      [8],
      [
        ["([234])(.{7})", "$1 $2", ["[234]"]],
        ["([67].{7})", "$1", ["[67]"]]
      ]
    ],
    592: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    593: [
      [8, 9],
      [
        ["(.)(...)(....)", "$1-$2-$3", ["[247]|[356][2-8]"]],
        ["(..)(...)(....)", "$1 $2 $3", ["9"]],
        ["(1800)(...)(.{3,4})", "$1 $2 $3", ["1"]]
      ]
    ],
    594: [
      [9],
      [
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    595: [
      [9],
      [
        ["(..)(.{5,7})", "$1 $2", ["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"]],
        ["(...)(.{3,6})", "$1 $2", ["[2-9]0"]],
        ["(...)(.{6})", "$1 $2", ["9[1-9]"]],
        ["(..)(...)(....)", "$1 $2 $3", ["8700"]],
        ["(...)(.{4,6})", "$1 $2", ["[2-8][1-9]"]]
      ]
    ],
    596: [
      [9],
      [
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ],
    597: [
      [7],
      [
        ["(...)(...)", "$1-$2", ["[2-4]|5[2-58]"]],
        ["(..)(..)(..)", "$1-$2-$3", ["56"]],
        ["(...)(....)", "$1-$2", ["59|[6-8]"]]
      ]
    ],
    598: [
      [8],
      [
        ["(....)(....)", "$1 $2", ["[24]"]],
        ["(..)(...)(...)", "$1 $2 $3", ["9[1-9]"]],
        ["(...)(....)", "$1 $2", ["[89]0"]]
      ]
    ],
    599: [
      [7, 8],
      [
        ["(...)(....)", "$1 $2", ["[13-7]"]],
        ["(9)(...)(....)", "$1 $2 $3", ["9"]]
      ]
    ],
    670: [
      [8],
      [
        ["(...)(....)", "$1 $2", ["[2-489]"]],
        ["(....)(....)", "$1 $2", ["7"]]
      ]
    ],
    672: [
      [5, 6],
      [
        ["(..)(....)", "$1 $2", ["1"]],
        ["(.)(.....)", "$1 $2", ["3"]]
      ]
    ],
    673: [
      [7],
      [
        ["([2-578]..)(....)", "$1 $2", []]
      ]
    ],
    674: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    675: [
      [7, 8],
      [
        ["(...)(....)", "$1 $2", ["[13-689]|27"]],
        ["(....)(....)", "$1 $2", ["20|7"]]
      ]
    ],
    676: [
      [7],
      [
        ["(..)(...)", "$1-$2", ["[1-6]|7[0-4]|8[05]"]],
        ["(...)(....)", "$1 $2", ["7[5-9]|8[47-9]"]],
        ["(....)(...)", "$1 $2", ["0"]]
      ]
    ],
    677: [
      [7],
      [
        ["(..)(.....)", "$1 $2", ["[7-9]"]]
      ]
    ],
    678: [
      [7],
      [
        ["(...)(....)", "$1 $2", ["[579]"]]
      ]
    ],
    679: [
      [7],
      [
        ["(...)(....)", "$1 $2", ["[36-9]"]],
        ["(....)(...)(....)", "$1 $2 $3", ["0"]]
      ]
    ],
    680: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    681: [
      [6],
      [
        ["(..)(..)(..)", "$1 $2 $3", []]
      ]
    ],
    682: [
      [5],
      [
        ["(..)(...)", "$1 $2", []]
      ]
    ],
    683: [
      [4],
      []
    ],
    685: [
      [6, 7],
      [
        ["(8..)(.{3,4})", "$1 $2", ["8"]],
        ["(7.)(.....)", "$1 $2", ["7"]],
        ["(.....)", "$1", ["[2-6]"]]
      ]
    ],
    686: [
      [8],
      []
    ],
    687: [
      [6],
      [
        ["(..)(..)(..)", "$1.$2.$3", ["[2-46-9]|5[0-4]"]]
      ]
    ],
    688: [
      [6],
      []
    ],
    689: [
      [6, 8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["4[09]|8[79]"]],
        ["(..)(..)(..)", "$1 $2 $3", ["44"]]
      ]
    ],
    690: [
      [4, 5, 6, 7],
      []
    ],
    691: [
      [7],
      [
        ["(...)(....)", "$1 $2", []]
      ]
    ],
    692: [
      [7],
      [
        ["(...)(....)", "$1-$2", []]
      ]
    ],
    850: [
      [10],
      [
        ["(...)(...)(....)", "$1 $2 $3", ["1"]],
        ["(.)(...)(....)", "$1 $2 $3", ["2"]],
        ["(..)(...)(...)", "$1 $2 $3", ["8"]]
      ]
    ],
    852: [
      [8],
      [
        ["(....)(....)", "$1 $2", ["[235-7]|[89](?:0[1-9]|[1-9])"]],
        ["(800)(...)(...)", "$1 $2 $3", ["800"]],
        ["(900)(..)(...)(...)", "$1 $2 $3 $4", ["900"]],
        ["(900)(.{2,5})", "$1 $2", ["900"]]
      ]
    ],
    853: [
      [8],
      [
        ["([268]...)(....)", "$1 $2", []]
      ]
    ],
    855: [
      [8, 9],
      [
        ["(..)(...)(.{3,4})", "$1 $2 $3", ["1.[1-9]|[2-9]"]],
        ["(1[89]00)(...)(...)", "$1 $2 $3", ["1[89]0"]]
      ]
    ],
    856: [
      [10],
      [
        ["(20)(..)(...)(...)", "$1 $2 $3 $4", ["20"]],
        ["([2-8].)(...)(...)", "$1 $2 $3", ["2[13]|3[14]|[4-8]"]],
        ["(30)(..)(..)(...)", "$1 $2 $3 $4", ["30"]]
      ]
    ],
    880: [
      [10],
      [
        ["(2)(.{7,8})", "$1-$2", ["2"]],
        ["(..)(.{4,6})", "$1-$2", ["[3-79]1"]],
        ["(....)(.{3,6})", "$1-$2", ["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"]],
        ["(...)(.{3,7})", "$1-$2", ["[3-79][2-9]|8"]]
      ]
    ],
    886: [
      [9],
      [
        ["([2-8])(.{3,4})(....)", "$1 $2 $3", ["[2-6]|[78][1-9]"]],
        ["([89]..)(...)(...)", "$1 $2 $3", ["80|9"]],
        ["(70)(....)(....)", "$1 $2 $3", ["70"]]
      ]
    ],
    960: [
      [7],
      [
        ["(...)(....)", "$1-$2", ["[3467]|9(?:[1-9]|0[1-9])"]],
        ["(...)(...)(....)", "$1 $2 $3", ["900"]]
      ]
    ],
    961: [
      [7, 8],
      [
        ["(.)(...)(...)", "$1 $2 $3", ["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"]],
        ["([7-9].)(...)(...)", "$1 $2 $3", ["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]
      ]
    ],
    962: [
      [9],
      [
        ["(.)(...)(....)", "$1 $2 $3", ["[2356]|87"]],
        ["(7)(....)(....)", "$1 $2 $3", ["7[457-9]"]],
        ["(...)(.{5,6})", "$1 $2", ["70|8[0158]|9"]]
      ]
    ],
    963: [
      [9],
      [
        ["(..)(...)(.{3,4})", "$1 $2 $3", ["[1-5]"]],
        ["(9..)(...)(...)", "$1 $2 $3", ["9"]]
      ]
    ],
    964: [
      [10],
      [
        ["(1)(...)(....)", "$1 $2 $3", ["1"]],
        ["([2-6].)(...)(.{3,4})", "$1 $2 $3", ["[2-6]"]],
        ["(7..)(...)(....)", "$1 $2 $3", ["7"]]
      ]
    ],
    965: [
      [8],
      [
        ["(....)(.{3,4})", "$1 $2", ["[126]|9[04-9]|52[25]"]],
        ["(...)(.....)", "$1 $2", ["5[015]|92"]]
      ]
    ],
    966: [
      [9],
      [
        ["([1-467])(...)(....)", "$1 $2 $3", ["[1-467]"]],
        ["(1.)(...)(....)", "$1 $2 $3", ["1[1-467]"]],
        ["(5.)(...)(....)", "$1 $2 $3", ["5"]],
        ["(92..)(.....)", "$1 $2", ["92"]],
        ["(800)(...)(....)", "$1 $2 $3", ["80"]],
        ["(811)(...)(.{3,4})", "$1 $2 $3", ["81"]]
      ]
    ],
    967: [
      [9],
      [
        ["([1-7])(...)(.{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"]],
        ["(7..)(...)(...)", "$1 $2 $3", ["7[0137]"]]
      ]
    ],
    968: [
      [8],
      [
        ["(2.)(.{6})", "$1 $2", ["2"]],
        ["(9...)(....)", "$1 $2", ["9"]],
        ["([58]00)(.{4,6})", "$1 $2", ["[58]"]]
      ]
    ],
    970: [
      [9],
      [
        ["([2489])(2..)(....)", "$1 $2 $3", ["[2489]"]],
        ["(5[69].)(...)(...)", "$1 $2 $3", ["5"]],
        ["(1[78]00)(...)(...)", "$1 $2 $3", ["1[78]"]]
      ]
    ],
    971: [
      [9],
      [
        ["([2-4679])(...)(....)", "$1 $2 $3", ["[2-4679][2-8]"]],
        ["(5[0256])(...)(....)", "$1 $2 $3", ["5"]],
        ["([479]00)(.)(.....)", "$1 $2 $3", ["[479]0"]],
        ["([68]00)(.{2,9})", "$1 $2", ["60|8"]]
      ]
    ],
    972: [
      [9],
      [
        ["([2-489])(...)(....)", "$1-$2-$3", ["[2-489]"]],
        ["([57].)(...)(....)", "$1-$2-$3", ["[57]"]],
        ["(1)([7-9]..)(...)(...)", "$1-$2-$3-$4", ["1[7-9]"]],
        ["(1255)(...)", "$1-$2", ["125"]],
        ["(1200)(...)(...)", "$1-$2-$3", ["120"]],
        ["(1212)(..)(..)", "$1-$2-$3", ["121"]],
        ["(1599)(.{6})", "$1-$2", ["15"]],
        ["(....)", "*$1", ["[2-689]"]]
      ]
    ],
    973: [
      [8],
      [
        ["(....)(....)", "$1 $2", []]
      ]
    ],
    974: [
      [8],
      [
        ["([28]..)(....)", "$1 $2", ["[28]"]],
        ["([3-7]...)(....)", "$1 $2", ["[3-7]"]]
      ]
    ],
    975: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2 $3 $4", ["1|77"]],
        ["([2-8])(...)(...)", "$1 $2 $3", ["[2-68]|7[246]"]]
      ]
    ],
    976: [
      [8],
      [
        ["([12].)(..)(....)", "$1 $2 $3", ["[12]1"]],
        ["([12]2.)(.{5,6})", "$1 $2", ["[12]2[1-3]"]],
        ["([12]...)(.....)", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5].)2"]],
        ["(....)(....)", "$1 $2", ["[57-9]"]],
        ["([12]....)(.{4,5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5].)[4-9]"]]
      ]
    ],
    977: [
      [10],
      [
        ["(1)(.{7})", "$1-$2", ["1[2-6]"]],
        ["(..)(.{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-69]|7[15-9])"]],
        ["(9..)(.{7})", "$1-$2", ["9(?:6[013]|7[245]|8)"]]
      ]
    ],
    992: [
      [9],
      [
        ["([349]..)(..)(....)", "$1 $2 $3", ["[34]7|91[78]"]],
        ["([459].)(...)(....)", "$1 $2 $3", ["4[48]|5|9(?:1[59]|[0235-9])"]],
        ["(331700)(.)(..)", "$1 $2 $3", ["331", "3317", "33170", "331700"]],
        ["(....)(.)(....)", "$1 $2 $3", ["3[1-5]", "3(?:[1245]|3(?:[02-9]|1[0-589]))"]]
      ]
    ],
    993: [
      [8],
      [
        ["(..)(..)(..)(..)", "$1 $2-$3-$4", ["12"]],
        ["(..)(.{6})", "$1 $2", ["6"]],
        ["(...)(.)(..)(..)", "$1 $2-$3-$4", ["13|[2-5]"]]
      ]
    ],
    994: [
      [9],
      [
        ["(..)(...)(..)(..)", "$1 $2 $3 $4", ["(?:1[28]|2(?:[45]2|[0-36])|365)"]],
        ["(..)(...)(..)(..)", "$1 $2 $3 $4", ["[4-8]"]],
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["9"]]
      ]
    ],
    995: [
      [9],
      [
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["[348]"]],
        ["(...)(...)(...)", "$1 $2 $3", ["7"]],
        ["(...)(..)(..)(..)", "$1 $2 $3 $4", ["5"]]
      ]
    ],
    996: [
      [9],
      [
        ["(...)(...)(...)", "$1 $2 $3", ["[25-7]|31[25]"]],
        ["(....)(.....)", "$1 $2", ["3(?:1[36]|[2-9])"]],
        ["(...)(...)(.)(...)", "$1 $2 $3 $4", ["8"]]
      ]
    ],
    998: [
      [7, 8, 9],
      [
        ["([679].)(...)(..)(..)", "$1 $2 $3 $4", []]
      ]
    ]
  }
}, function(e, t) {
  e.exports = {
    ar: "ar",
    az: "az",
    bg: "bg",
    bn: "bn",
    ca: "ca",
    cs: "cs",
    da: "da",
    de: "de",
    el: "el",
    en: "en",
    es: "es",
    fa: "fa",
    fi: "fi",
    fil: "fil",
    fr: "fr",
    he: "he",
    hi: "hi",
    hr: "hr",
    hu: "hu",
    id: "id",
    it: "it",
    ja: "ja",
    kk: "kk",
    lt: "lt",
    lv: "lv",
    mk: "mk",
    ms: "ms",
    nb: "nb",
    nl: "nl",
    pl: "pl",
    pt: "pt",
    pt_br: "pt-BR",
    pt_zz: "pt-BR",
    ro: "ro",
    ru: "ru",
    sl: "sl",
    sq: "sq",
    sr: "sr",
    sv: "sv",
    sw: "sw",
    ta: "ta",
    th: "th",
    tr: "tr",
    uk: "uk",
    uz: "uz",
    vi: "vi",
    zh_cn: "zh-CN",
    zh_hk: "zh-TW",
    zh_sg: "zh-CN",
    zh_tw: "zh-TW"
  }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
  function n(e) {
    return r(o(e))
  }

  function o(e) {
    var t = i[e];
    if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
    return t
  }
  var i = {
    "./af": 224,
    "./af.js": 224,
    "./ar": 227,
    "./ar-ma": 225,
    "./ar-ma.js": 225,
    "./ar-sa": 226,
    "./ar-sa.js": 226,
    "./ar.js": 227,
    "./az": 228,
    "./az.js": 228,
    "./be": 229,
    "./be.js": 229,
    "./bg": 230,
    "./bg.js": 230,
    "./bn": 231,
    "./bn.js": 231,
    "./bo": 232,
    "./bo.js": 232,
    "./br": 233,
    "./br.js": 233,
    "./bs": 234,
    "./bs.js": 234,
    "./ca": 235,
    "./ca.js": 235,
    "./cs": 236,
    "./cs.js": 236,
    "./cv": 237,
    "./cv.js": 237,
    "./cy": 238,
    "./cy.js": 238,
    "./da": 239,
    "./da.js": 239,
    "./de": 241,
    "./de-at": 240,
    "./de-at.js": 240,
    "./de.js": 241,
    "./el": 242,
    "./el.js": 242,
    "./en-au": 243,
    "./en-au.js": 243,
    "./en-ca": 244,
    "./en-ca.js": 244,
    "./en-gb": 245,
    "./en-gb.js": 245,
    "./eo": 246,
    "./eo.js": 246,
    "./es": 247,
    "./es.js": 247,
    "./et": 248,
    "./et.js": 248,
    "./eu": 249,
    "./eu.js": 249,
    "./fa": 250,
    "./fa.js": 250,
    "./fi": 251,
    "./fi.js": 251,
    "./fo": 252,
    "./fo.js": 252,
    "./fr": 254,
    "./fr-ca": 253,
    "./fr-ca.js": 253,
    "./fr.js": 254,
    "./gl": 255,
    "./gl.js": 255,
    "./he": 256,
    "./he.js": 256,
    "./hi": 257,
    "./hi.js": 257,
    "./hr": 258,
    "./hr.js": 258,
    "./hu": 259,
    "./hu.js": 259,
    "./hy-am": 260,
    "./hy-am.js": 260,
    "./id": 261,
    "./id.js": 261,
    "./is": 262,
    "./is.js": 262,
    "./it": 263,
    "./it.js": 263,
    "./ja": 264,
    "./ja.js": 264,
    "./ka": 265,
    "./ka.js": 265,
    "./km": 266,
    "./km.js": 266,
    "./ko": 267,
    "./ko.js": 267,
    "./lb": 268,
    "./lb.js": 268,
    "./lt": 269,
    "./lt.js": 269,
    "./lv": 270,
    "./lv.js": 270,
    "./mk": 271,
    "./mk.js": 271,
    "./ml": 272,
    "./ml.js": 272,
    "./mr": 273,
    "./mr.js": 273,
    "./ms-my": 274,
    "./ms-my.js": 274,
    "./my": 275,
    "./my.js": 275,
    "./nb": 276,
    "./nb.js": 276,
    "./ne": 277,
    "./ne.js": 277,
    "./nl": 278,
    "./nl.js": 278,
    "./nn": 279,
    "./nn.js": 279,
    "./pl": 280,
    "./pl.js": 280,
    "./pt": 282,
    "./pt-br": 281,
    "./pt-br.js": 281,
    "./pt.js": 282,
    "./ro": 283,
    "./ro.js": 283,
    "./ru": 284,
    "./ru.js": 284,
    "./sk": 285,
    "./sk.js": 285,
    "./sl": 286,
    "./sl.js": 286,
    "./sq": 287,
    "./sq.js": 287,
    "./sr": 289,
    "./sr-cyrl": 288,
    "./sr-cyrl.js": 288,
    "./sr.js": 289,
    "./sv": 290,
    "./sv.js": 290,
    "./ta": 291,
    "./ta.js": 291,
    "./th": 292,
    "./th.js": 292,
    "./tl-ph": 293,
    "./tl-ph.js": 293,
    "./tr": 294,
    "./tr.js": 294,
    "./tzm": 296,
    "./tzm-latn": 295,
    "./tzm-latn.js": 295,
    "./tzm.js": 296,
    "./uk": 297,
    "./uk.js": 297,
    "./uz": 298,
    "./uz.js": 298,
    "./vi": 299,
    "./vi.js": 299,
    "./zh-cn": 300,
    "./zh-cn.js": 300,
    "./zh-tw": 301,
    "./zh-tw.js": 301
  };
  n.keys = function() {
    return Object.keys(i)
  }, n.resolve = o, e.exports = n, n.id = 561
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(80).then(function(t) {
        e(r(720))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(79).then(function(t) {
        e(r(721))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(78).then(function(t) {
        e(r(722))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(77).then(function(t) {
        e(r(723))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(76).then(function(t) {
        e(r(724))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(75).then(function(t) {
        e(r(725))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(74).then(function(t) {
        e(r(726))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(73).then(function(t) {
        e(r(727))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(72).then(function(t) {
        e(r(728))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(71).then(function(t) {
        e(r(729))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(70).then(function(t) {
        e(r(730))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(69).then(function(t) {
        e(r(731))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(68).then(function(t) {
        e(r(732))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      Promise.resolve().then(function(t) {
        e(r(204))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(67).then(function(t) {
        e(r(733))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(66).then(function(t) {
        e(r(734))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(65).then(function(t) {
        e(r(735))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(64).then(function(t) {
        e(r(736))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(63).then(function(t) {
        e(r(737))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(62).then(function(t) {
        e(r(738))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(61).then(function(t) {
        e(r(739))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(60).then(function(t) {
        e(r(740))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(59).then(function(t) {
        e(r(741))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(58).then(function(t) {
        e(r(742))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(57).then(function(t) {
        e(r(743))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(56).then(function(t) {
        e(r(744))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(55).then(function(t) {
        e(r(745))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(54).then(function(t) {
        e(r(746))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(53).then(function(t) {
        e(r(747))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(52).then(function(t) {
        e(r(748))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(51).then(function(t) {
        e(r(749))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(50).then(function(t) {
        e(r(750))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(49).then(function(t) {
        e(r(751))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(48).then(function(t) {
        e(r(752))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(47).then(function(t) {
        e(r(753))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(46).then(function(t) {
        e(r(754))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(45).then(function(t) {
        e(r(755))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(44).then(function(t) {
        e(r(756))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(43).then(function(t) {
        e(r(757))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(42).then(function(t) {
        e(r(758))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(41).then(function(t) {
        e(r(759))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(40).then(function(t) {
        e(r(760))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(39).then(function(t) {
        e(r(761))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(38).then(function(t) {
        e(r(762))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(37).then(function(t) {
        e(r(763))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(36).then(function(t) {
        e(r(764))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(35).then(function(t) {
        e(r(765))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(34).then(function(t) {
        e(r(766))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(33).then(function(t) {
        e(r(767))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(32).then(function(t) {
        e(r(768))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(31).then(function(t) {
        e(r(769))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(30).then(function(t) {
        e(r(770))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(29).then(function(t) {
        e(r(771))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(28).then(function(t) {
        e(r(772))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(27).then(function(t) {
        e(r(773))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(26).then(function(t) {
        e(r(774))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(25).then(function(t) {
        e(r(775))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(24).then(function(t) {
        e(r(776))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(23).then(function(t) {
        e(r(777))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(22).then(function(t) {
        e(r(778))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(21).then(function(t) {
        e(r(779))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(20).then(function(t) {
        e(r(780))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(19).then(function(t) {
        e(r(781))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(18).then(function(t) {
        e(r(782))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(17).then(function(t) {
        e(r(783))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(16).then(function(t) {
        e(r(784))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(15).then(function(t) {
        e(r(785))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(14).then(function(t) {
        e(r(786))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(13).then(function(t) {
        e(r(787))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(12).then(function(t) {
        e(r(788))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(11).then(function(t) {
        e(r(789))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(10).then(function(t) {
        e(r(790))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(9).then(function(t) {
        e(r(791))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(8).then(function(t) {
        e(r(792))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(7).then(function(t) {
        e(r(793))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}, function(e, t, r) {
  e.exports = function() {
    return new Promise(function(e, t) {
      r.e(6).then(function(t) {
        e(r(794))
      }.bind(null, r))["catch"](function(e) {
        r.oe(e)
      })["catch"](function() {
        t()
      })
    })
  }
}], [392]);