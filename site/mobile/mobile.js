/* 手机版：骨架与逐屏滚动。所有文案来自 window.SITE_CONTENT。 */
(function () {
  var C = window.SITE_CONTENT;
  var app = document.getElementById("app");
  var observer = null;
  var cleanups = [];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function list(tag, cls, items, itemCls) {
    var ul = el(tag, cls);
    items.forEach(function (t, i) {
      var li = el("li", itemCls, t);
      li.style.setProperty("--i", i);
      ul.appendChild(li);
    });
    return ul;
  }

  var body = {
    hero: function (s, box) {
      var a = el("a", "btn", s.cta.label);
      a.href = "#" + s.cta.target;
      box.appendChild(a);
    },
    pain: function (s, box) { box.appendChild(list("ul", "points", s.points, "point")); },
    flow: function (s, box) { box.appendChild(list("ol", "steps", s.steps, "step")); },
    interview: function (s, box) { box.appendChild(list("ul", "cards", s.cards, "card")); },
    tracker: function (s, box) { box.appendChild(list("ol", "states", s.states, "state")); },
    install: function (s, box) {
      var row = el("div", "cmd");
      row.appendChild(el("code", null, C.install.command));
      var btn = el("button", "btn", s.copyLabel);
      btn.type = "button";
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(C.install.command).then(function () {
          btn.textContent = s.copiedLabel;
          setTimeout(function () { btn.textContent = s.copyLabel; }, 1500);
        });
      });
      row.appendChild(btn);
      box.appendChild(row);
      var a = el("a", "link", C.install.zipUrl);
      a.href = C.install.zipUrl;
      box.appendChild(a);
    },
    changelog: function (s, box) {
      box.appendChild(el("p", "ver", "v" + C.version));
      var log = el("div", "log");
      s.changelog.forEach(function (e) {
        var d = el("div", "log-item");
        d.appendChild(el("h3", null, "v" + e.version + " · " + e.date));
        d.appendChild(list("ul", null, e.items));
        log.appendChild(d);
      });
      box.appendChild(log);
      var img = el("img", "qr");
      img.src = s.qrcode;
      img.alt = "交流群二维码";
      img.width = 160;
      box.appendChild(img);
    },
  };

  function render() {
    var main = el("main", "m-main");
    C.screens.forEach(function (s, idx) {
      var sec = el("section", "screen");
      sec.id = s.id;
      sec.dataset.index = idx;
      var box = el("div", "screen-inner");
      box.appendChild(el(idx === 0 ? "h1" : "h2", "title", s.title));
      box.appendChild(el("p", "subtitle", s.subtitle));
      if (body[s.id]) body[s.id](s, box);
      sec.appendChild(box);
      main.appendChild(sec);
    });
    app.appendChild(main);
  }

  function observe() {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        e.target.classList.toggle("active", e.isIntersecting);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll(".screen").forEach(function (s) { observer.observe(s); });
  }

  render();
  observe();

  window.__site = {
    destroy: function () {
      if (observer) observer.disconnect();
      cleanups.forEach(function (f) { f(); });
    },
  };
})();
