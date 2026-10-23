/* 电脑版与手机版共用的渲染逻辑：所有文案来自 SITE_CONTENT，版式差异由各自的 css 与 opts 决定。 */
(function () {
  var C = window.SITE_CONTENT;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function hl(parent, str) {
    str.split("**").forEach(function (p, i) {
      if (!p) return;
      var n = i % 2 ? el("mark", null, p) : document.createTextNode(p);
      parent.appendChild(n);
    });
  }
  function copyBtn(cmd, label, done) {
    var b = el("button", "copy", label);
    b.type = "button";
    b.addEventListener("click", function () {
      navigator.clipboard.writeText(cmd).then(function () {
        b.textContent = done;
        setTimeout(function () { b.textContent = label; }, 1500);
      });
    });
    return b;
  }
  function cmdBox(cmd) {
    var box = el("div", "cmd");
    box.appendChild(el("code", null, cmd));
    box.appendChild(copyBtn(cmd, C.install.copyLabel, C.install.copiedLabel));
    return box;
  }
  function docIcon(name, cls) {
    var d = el("div", "doc " + (cls || ""));
    d.appendChild(el("span", "doc-w", "W"));
    d.appendChild(el("span", "doc-n", name));
    return d;
  }

  /* ---------- 首页各幕 ---------- */
  function scenePain() {
    var p = C.pain, s = el("section", "scene pain");
    s.dataset.scene = "pain";
    var w = window_(p.inboxTitle);
    w.classList.add("inbox");
    var head = el("div", "ib-head");
    head.appendChild(el("b", null, p.inboxTitle));
    head.appendChild(el("span", "ib-count", p.unread));
    w.appendChild(head);
    var list = el("ul", "ib-list");
    p.mails.forEach(function (m, i) {
      var li = el("li", "mail");
      li.style.setProperty("--i", i);
      li.appendChild(el("i", "ib-dot"));
      var main = el("div", "ib-main");
      var top = el("div", "ib-top");
      top.appendChild(el("span", "ib-from", m.from));
      top.appendChild(el("span", "ib-time", m.time));
      main.appendChild(top);
      var sub = el("div", "ib-sub");
      sub.appendChild(el("span", "ib-tag " + m.kind, m.tag));
      sub.appendChild(el("span", "ib-subj", m.subject));
      main.appendChild(sub);
      li.appendChild(main);
      list.appendChild(li);
    });
    w.appendChild(list);
    s.appendChild(w);
    s.appendChild(el("p", "narr", p.narration));
    return s;
  }

  function window_(title) {
    var w = el("div", "win");
    var bar = el("div", "win-bar");
    ["r", "y", "g"].forEach(function (c) { bar.appendChild(el("i", c)); });
    bar.appendChild(el("span", "win-t", title));
    w.appendChild(bar);
    return w;
  }

  function sceneAgent() {
    var a = C.agent, s = el("section", "scene agent");
    s.dataset.scene = "agent";
    var w = window_(a.appName);
    w.classList.add("cd");
    var side = el("aside", "cd-side");
    side.appendChild(el("div", "cd-new", "+ " + a.newChat));
    a.recents.forEach(function (r, i) { side.appendChild(el("div", "cd-rec" + (i ? "" : " on"), r)); });
    var body = el("div", "win-body cd-main");
    var user = el("div", "msg user");
    user.dataset.type = a.prompt;
    user.appendChild(el("span", "typed"));
    body.appendChild(user);
    var think = el("div", "cd-think");
    think.appendChild(el("span", "cd-spark", "✻"));
    think.appendChild(el("span", null, a.thinking));
    for (var i = 0; i < 3; i++) think.appendChild(el("b", "dot"));
    body.appendChild(think);
    a.tools.forEach(function (t, i) {
      var tl = el("div", "cd-tool");
      tl.style.setProperty("--i", i);
      tl.appendChild(el("span", "cd-ok", "✓"));
      tl.appendChild(el("b", null, t.verb));
      tl.appendChild(el("code", null, t.target));
      body.appendChild(tl);
    });
    body.appendChild(el("p", "cd-reply", a.reply));
    var tree = el("ul", "tree");
    a.tree.forEach(function (n, i) {
      var li = el("li", n.dir ? "dir" : "file", (n.dir ? "▸ " : "  ") + n.name);
      li.style.setProperty("--i", i);
      tree.appendChild(li);
    });
    body.appendChild(tree);
    var input = el("div", "cd-input");
    input.appendChild(el("span", "cd-ph", a.placeholder));
    var bar = el("div", "cd-ibar");
    bar.appendChild(el("span", "cd-chip", "⚡ " + a.skill));
    bar.appendChild(el("span", "cd-model", a.model + " ▾"));
    bar.appendChild(el("span", "cd-send", "↑"));
    input.appendChild(bar);
    body.appendChild(input);
    var wrap = el("div", "cd-wrap");
    wrap.appendChild(side);
    wrap.appendChild(body);
    w.appendChild(wrap);
    s.appendChild(w);
    var n = el("div", "narr");
    n.appendChild(el("p", null, a.narration1));
    n.appendChild(el("p", "sub", a.narration2));
    s.appendChild(n);
    return s;
  }

  function sceneGenerate() {
    var g = C.generate, s = el("section", "scene gen");
    s.dataset.scene = "gen";
    var split = el("div", "split");
    function pane(title, lines, cls) {
      var p = el("div", "pane " + cls);
      p.appendChild(el("div", "pane-t", title));
      lines.forEach(function (l, i) {
        var line = el("p", "ln");
        line.style.setProperty("--i", i);
        hl(line, l);
        p.appendChild(line);
      });
      return p;
    }
    split.appendChild(pane(g.jdTitle, g.jdLines, "jd"));
    split.appendChild(el("div", "arrow", "→"));
    split.appendChild(pane(g.resumeTitle, g.resumeLines, "rs"));
    s.appendChild(split);
    var cards = el("div", "previews");
    g.previews.forEach(function (pv, i) {
      var c = el("div", "pv");
      c.style.setProperty("--i", i);
      c.appendChild(el("div", "pv-t", pv.file));
      pv.body.forEach(function (b) { c.appendChild(el("p", null, b)); });
      cards.appendChild(c);
    });
    s.appendChild(cards);
    var words = el("div", "words ok");
    g.words.forEach(function (w, i) {
      var e = el("span", "word", w);
      e.style.setProperty("--i", i);
      words.appendChild(e);
    });
    s.appendChild(words);
    s.appendChild(el("p", "narr", g.narration));
    return s;
  }

  function scenePack() {
    var k = C.pack, s = el("section", "scene pack");
    s.dataset.scene = "pack";
    var w = window_(C.agent.appName);
    var body = el("div", "win-body");
    body.appendChild(el("div", "msg ai", k.reply));
    var ol = el("ol", "todo");
    k.steps.forEach(function (t, i) {
      var li = el("li", null, t);
      li.style.setProperty("--i", i);
      ol.appendChild(li);
    });
    body.appendChild(ol);
    w.appendChild(body);
    s.appendChild(w);
    s.appendChild(el("div", "toast", "✓ " + k.toast));
    s.appendChild(el("p", "narr", k.narration));
    return s;
  }

  function sceneBrand() {
    var b = C.brand, s = el("section", "scene brand");
    s.dataset.scene = "brand";
    s.appendChild(el("h1", "name", b.name));
    s.appendChild(el("p", "tag", b.tagline));
    s.appendChild(el("p", "narr", b.narration));
    var a = el("a", "btn", b.cta);
    a.href = "#/guide";
    s.appendChild(a);
    s.appendChild(cmdBox(C.install.command));
    var z = el("a", "ziplink", C.install.zipUrl);
    z.href = C.install.zipUrl;
    s.appendChild(z);
    return s;
  }

  function viewHome() {
    var v = el("div", "view home");
    v.appendChild(scenePain());
    v.appendChild(sceneAgent());
    v.appendChild(sceneGenerate());
    v.appendChild(scenePack());
    v.appendChild(sceneBrand());
    return v;
  }

  /* ---------- 使用指南 ---------- */
  function viewGuide() {
    var g = C.guide, v = el("div", "view guide page");
    v.appendChild(el("h1", "page-t", g.title));
    v.appendChild(el("p", "page-s", g.intro));
    g.sections.forEach(function (sec) {
      var box = el("section", "g-sec");
      box.appendChild(el("h2", null, sec.h));
      (sec.p || []).forEach(function (t) { box.appendChild(el("p", null, t)); });
      if (sec.code) {
        var pre = el("pre", "code");
        pre.appendChild(el("code", null, sec.code));
        pre.appendChild(copyBtn(sec.code, C.install.copyLabel, C.install.copiedLabel));
        box.appendChild(pre);
      }
      if (sec.steps) {
        var ol = el("ol", "g-steps");
        sec.steps.forEach(function (st, i) {
          var li = el("li");
          li.style.setProperty("--i", i);
          li.appendChild(el("b", null, st[0]));
          li.appendChild(el("span", null, st[1]));
          ol.appendChild(li);
        });
        box.appendChild(ol);
      }
      v.appendChild(box);
    });
    var com = el("section", "g-sec community");
    com.appendChild(el("p", null, g.community.text));
    var img = el("img", "qr");
    img.src = g.community.qrcode;
    img.alt = "交流群二维码";
    img.width = 160;
    com.appendChild(img);
    v.appendChild(com);
    return v;
  }

  /* ---------- 更新日志 ---------- */
  function viewChangelog() {
    var scr = C.screens.filter(function (s) { return s.id === "changelog"; })[0];
    var v = el("div", "view changelog page");
    v.appendChild(el("h1", "page-t", scr.title));
    v.appendChild(el("p", "page-s", scr.subtitle + " 当前版本 v" + C.version));
    var log = el("div", "log");
    scr.changelog.forEach(function (e, i) {
      var d = el("div", "log-item");
      d.style.setProperty("--i", i);
      d.appendChild(el("h3", null, "v" + e.version + " · " + e.date));
      var ul = el("ul");
      e.items.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      d.appendChild(ul);
      log.appendChild(d);
    });
    v.appendChild(log);
    return v;
  }

  /* ---------- 动画 ---------- */
  function typeInto(node, timers) {
    var text = node.dataset.type, target = node.querySelector(".typed"), i = 0;
    if (node.dataset.done) return;
    node.dataset.done = "1";
    function step() {
      target.textContent = text.slice(0, ++i);
      if (i < text.length) timers.push(setTimeout(step, 70));
    }
    step();
  }

  function mount(app, opts) {
    var timers = [], observer = null, scrollFn = null;
    var header = el("header", "topbar");
    var brand = el("a", "brand", C.brand.name);
    brand.href = "#/";
    header.appendChild(brand);
    var nav = el("nav", "nav");
    var links = {};
    C.nav.forEach(function (n) {
      var a = el("a", null, n.label);
      a.href = n.hash;
      links[n.id] = a;
      nav.appendChild(a);
    });
    var gh = el("a", "gh", "GitHub");
    gh.href = "https://github.com/" + C.repo;
    gh.target = "_blank";
    gh.rel = "noopener";
    nav.appendChild(gh);
    header.appendChild(nav);
    var strip = el("div", "strip");
    strip.appendChild(el("span", null, "v" + C.version + " 已发布 · "));
    var sa = el("a", null, "查看更新日志");
    sa.href = "#/changelog";
    strip.appendChild(sa);
    var main = el("main", "main");
    app.appendChild(strip);
    app.appendChild(header);
    app.appendChild(main);

    function observeScenes() {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            var u = e.target.querySelector(".msg.user");
            if (u) typeInto(u, timers);
          }
        });
      }, { threshold: opts.threshold });
      main.querySelectorAll(".scene, .g-sec, .log-item").forEach(function (n) { observer.observe(n); });
    }

    function route() {
      var h = location.hash.replace(/^#\/?/, "");
      var id = h === "guide" ? "guide" : h === "changelog" ? "changelog" : "home";
      main.innerHTML = "";
      timers.forEach(clearTimeout);
      timers = [];
      main.appendChild(id === "guide" ? viewGuide() : id === "changelog" ? viewChangelog() : viewHome());
      Object.keys(links).forEach(function (k) { links[k].classList.toggle("on", k === id); });
      document.documentElement.dataset.view = id;
      window.scrollTo(0, 0);
      observeScenes();
    }

    window.addEventListener("hashchange", route);
    route();

    return {
      destroy: function () {
        window.removeEventListener("hashchange", route);
        if (observer) observer.disconnect();
        timers.forEach(clearTimeout);
        delete document.documentElement.dataset.view;
      },
    };
  }

  window.SiteCommon = { mount: mount };
})();
