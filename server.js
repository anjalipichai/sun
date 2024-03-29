function getDesign(url, path) {
  const https = require("https");

  https
    .get(url, resp => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        require("fs").writeFile(path, data, function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });

        //console.log(JSON.parse(data).explanation);
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
}
//getDesign("https://sunpickai.carrd.co/","t")
//getDesign("https://www.instagram.com/kanyewestt_official/?hl=en","kanye")

function render(action, elements) {
  if (typeof window !== "undefined") {
    window.lib = {
      actives: ["home"],
      color: 0,
      drops: [],
      dragdrop: [],
      history: [],
      URLS: [],
      id: 0,
      dd: 0,
      code: 0
    };
    lib.cookie = function(e) {
      var cookieArr = document.cookie.split(";");
      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (e == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      return null;
    };
    lib.menu = function(event) {
      lib.history.push({ e: event, t: Date.now() });

      if (typeof event === "string" || event instanceof String) {
        var e = event;
      } else {
        try {
          var e = JSON.parse(event.data);
          if (e.type == "redirect") {
            window.location = data.url;
          }
          if (e.type == "error") {
            document.getElementById("modal-content").innerHTML = e.data;
            document.getElementById("modal").style.display = "block";
          }
          if (e.type == "analytics") {
            e = JSON.parse(e.data);
            document.getElementById("modal-content").innerHTML =
              "<p>Total Page Views:" +
              e.length +
              "</p> <br> <p>time:TIME / Iplocation:LOCATION</p><br>" +
              e;
            document.getElementById("modal").style.display = "block";
          }
          if (e.type == "message") {
            var modal = document.getElementById("results");
            var Btn = document.getElementById("myBtn");
            Btn.click();
          }
          if (e.type == "result") {
            document.getElementById("modal-content").innerText = data.data;
            document.getElementById("modal").style.display = "block";
          }
        } catch (e) {}

        if (event.target) {
          event.preventDefault();
          function Path(e) {
            var path = [];
            while (e) {
              path.push(e.className);
              if (e.tagName === "HTML") {
                return path;
              }
              e = e.parentElement;
            }
          }

          if (event.target.id == "modal") {
            document.getElementById("modal").style.display = "none";
          }
          if (Path(event.target)) {
            if (
              Path(event.target)
                .join(" ")
                .indexOf("uform") == -1
            ) {
              if (
                document.getElementById("pagebody").dataset.editor == "edit"
              ) {
                for (var active of lib.actives) {
                  if (active) {
                    document.getElementById(active).classList.remove("focused");
                    lib.actives = [];
                  }
                }
                document
                  .getElementById(event.target.id)
                  .classList.add("focused");
                lib.actives.push(event.target.id);
                var e = event.target.nodeName;
              }
            } else {
              if (window.location.href == "https://code.fastur.com/code") {
              } else {
                e = event.target.dataset.action;
                if (event.target.dataset.type == "add") {
                  lib.click = event.target.dataset.action;
                  e = "add";
                }
              }
            }
          }
          if (!(Object.prototype.toString.call(e) === "[object String]")) {
            event.stopPropagation();
            var e = event.target.value || event.target.innerText;
            if (event.target.id == "uin") {
              if (window.location.href == "https://code.fastur.com/code") {
                var e = "editor";
              } else var e = "uin";
            }
          }
        }
      }

      var data = [];
      if (e == "checkout") {
        if (subscribeEmail.value) {
          stripe
            .redirectToCheckout({
              items: [{ plan: "plan_FjwWbksv94sxQ8", quantity: 1 }],
              successUrl: "http://ab.fastur.com/#success",
              cancelUrl: "http://ab.fastur.com/#canceled",
              customerEmail: document.getElementById("subscribeEmail").value
            })
            .then(function(result) {
              if (result.error) {
                console.log("ran2");
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                var displayError = document.getElementById("element002");
                displayError.innerHTML = result.error.message;
              }
            });
        } else {
          var displayError = document.getElementById("element002");
          displayError.innerHTML = "please enter an email";
          subscribeEmail.style.outline = "2px solid red";
        }
      }

      if (e == "uin") {
        var data = [
          {
            type: "add",
            text: "text",
            link: "base",
            action1: "text",
            action2: "button",
            action3: "image"
          },
          {
            type: "add",
            text: "form",
            link: "form",
            action1: "form",
            action2: "stripeform",
            action3: "download"
          },
          {
            action1: "analytics",
            action2: "mic",
            action3: "camera",
            link: "media"
          },
          {
            action1: "undo",
            action2: "redo",
            action3: "download",
            link: "history"
          },
          {
            action1: "duplicate",
            action2: "deletesite",
            action3: "publish",
            link: "save"
          }
        ];
      }
      if (e == "editormenu") {
        var fa = localStorage.getItem("fasturaccount");
        if (fa.indexOf("isGuest") !== -1) {
          var data = [
            {
              tag: "div",
              secondarytag: "form",
              secondaryp: " action='/' method='post'",
              element: "element",
              name: "login",
              animation: "inner inactive",
              display: "block",
              color: "white",
              background: "",
              align: "center",
              padding: "1em",
              id: "login",
              type: "form",
              link: "form",
              items: [
                {
                  name: "login",
                  type: "form",
                  tag: "input",
                  formtype: "hidden",
                  br: true,
                  ishidden: "login",
                  value: "login",
                  class: "blank",
                  id: "login-type"
                },
                {
                  name: "email",
                  type: "form",
                  br: true,
                  tag: "input",
                  formtype: "text",
                  class: "blank",
                  placeholder: "email",
                  id: "login-email"
                },
                {
                  name: "name",
                  type: "form",
                  br: true,
                  tag: "input",
                  formtype: "password",
                  class: "blank",
                  placeholder: "password",
                  id: "login-password"
                },
                {
                  name: "login",
                  br: true,
                  tag: "input",
                  value: "login",
                  class: "element",
                  type: "form",
                  ishidden: "login",
                  formtype: "submit",
                  id: "login-submit"
                }
              ]
            }
          ];
        } else {
          if (window.location.href == "https://code.fastur.com/code") {
            var data = [
              { text: "server", link: "" },
              { text: "data", link: "data" },
              { text: "sites", link: "sites" }
            ];
          }
        }
      }
      if (e == "editorpublish") {
        var fa = localStorage.getItem("fasturaccount");
        if (fa.indexOf("isGuest") !== -1) {
          var data = [
            { id: "li-email", text: "email", link: "input" },
            { id: "li-password", text: "password", link: "password" },
            { text: "login", link: "" }
          ];
        } else {
          var code = window.CM.getValue();
          window.servered = 1;
          var payload = JSON.stringify({
            type: "commit",
            query: code,
            modifier: window.commitpath
          });
          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: payload
          }).then(function(response) {
            var decoder = new TextDecoder();
            var reader = response.body.getReader();
            reader.read().then(function processResult(result) {
              if (result.done) return;
              var result = decoder.decode(result.value, {
                stream: true
              });
              if (result.indexOf("html") !== -1) {
                if (window.parent.iframetwoname) {
                  window.parent.iframetwoname.location.reload();
                }
              } else {
                if (typeof result !== "object") {
                  var result = JSON.parse(result);
                }
                if (result.type == "restartapp") {
                  document.getElementById("uin").placeholder = "...";
                  if (window.parent.iframetwoname) {
                    window.parent.iframetwoname.location.reload();
                  }
                }
              }
            });
          });
        }
      }
      if (e == "data") {
        fetch("/data", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            window.CM.setValue(j);
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });

            window.commitpath = "data";
          });
      }
      if (e == "sites") {
        fetch("/sites", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            window.CM.setValue(j);
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });

            window.commitpath = "sites";
          });
      }
      if (e == "editor") {
        fetch("/editor", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            window.CM.setValue(j);
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });
            window.commitpath = "editor";
          });
      }
      if (e == "readme") {
        fetch("/readme", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            window.CM.setValue(j);
            window.commitpath = "readme";
          });
      }
      if (e == "server") {
        fetch("/api", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            window.CM.setValue(j);
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });

            window.commitpath = "server";
          });
      }
      if (e == "action") {
        //show form to control puppeteer
      }
      if (e == "code") {
        function inIframe() {
          try {
            return window.self !== window.top;
          } catch (e) {
            return true;
          }
        }
        if (inIframe()) {
          if (lib.code == 1) {
            window.parent.iframeoneid.width = 0;
            window.parent.iframeoneid.style.width = 0;

            window.parent.iframetwoid.width = "100%";
            window.parent.iframetwoid.style.width = "100%";
            lib.code = 0;
          } else {
            window.parent.iframeoneid.width = "50%";
            window.parent.iframeoneid.style.width = "50%";

            window.parent.iframetwoid.width = "50%";
            window.parent.iframetwoid.style.width = "50%";
            lib.code = 1;
          }
        } else {
          window.location = "https://code.fastur.com/code";
        }
      }
      if (e == "login") {
        var email = document.getElementById("login-email").value;
        var password = document.getElementById("login-password").value;

        var payload = JSON.stringify({
          type: "login",
          email: email,
          password: password,
          uuid: lib.cookie("fastur"),
          time: Date.now()
        });
        fetch("/", {
          method: "post",
          mode: "no-cors",
          body: payload
        }).then(function(response) {
          var decoder = new TextDecoder();
          var reader = response.body.getReader();
          reader.read().then(function processResult(result) {
            if (result.done) return;
            var result = decoder.decode(result.value, {
              stream: true
            });
            localStorage.fasturaccount = JSON.stringify(result);
            try {
              var result = JSON.parse(result);
            } catch (e) {}
            if (result.type == "success") {
              lib.menu("editormenu");
            }
            if (result.type == "failure") {
              console.log("login failed");
              lib.menu("editormenu");
            }
          });
        });
      }
      if (e == "publish") {
        lib.menu("add");
        if (localStorage.getItem("fasturaccount")) {
          var input = document.getElementById("uin");
          var site = JSON.stringify(lib.value);
          var fa = localStorage.getItem("fasturaccount");
          if (fa.indexOf("isGuest") !== -1) {
            lib.menu("editormenu");
          } else {
            var siteid = window.location.href.split("edit?")[1];
            if (siteid && siteid !== "912120bfa38218625d3e8505996f7860") {
              var label = {
                type: "publish",
                query: siteid,
                site: site,
                cookie: lib.cookie("fastur")
              };
              fetch("/", {
                method: "post",
                mode: "no-cors",
                body: JSON.stringify(label)
              }).then(function(response) {
                var decoder = new TextDecoder();
                var reader = response.body.getReader();
                reader.read().then(function processResult(result) {
                  if (result.done) return;
                  var result = decoder.decode(result.value, {
                    stream: true
                  });
                  console.log(result);

                  localStorage.fasturaccount = result;
                  result = JSON.parse(result);
                  if (result.type == "success") {
                    document.getElementById("modal").style.display = "block";
                    var modal = document.getElementById("modal-content");
                    modal.innerHTML = result.data;
                    var Btn = document.getElementById("myBtn");
                    Btn.click();
                  }
                  if (result.type == "failure") {
                    document.getElementById("modal").style.display = "block";
                    var modal = document.getElementById("modal-content");
                    modal.innerHTML = result.data;
                    var Btn = document.getElementById("myBtn");
                    Btn.click();
                  }
                });
              });
              document.getElementById("modal-content").innerHTML =
                "<a href='https://" +
                uin.value +
                ".fastur.com'>" +
                uin.value +
                ".fastur.com" +
                "</a>";
            } else {
              if (input.value.indexOf(".") !== -1) {
                function test_name(x) {
                  if (
                    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
                      x
                    )
                  ) {
                    var label = {
                      type: "publish",
                      query: input.value,
                      site: site,
                      cookie: lib.cookie
                    };

                    fetch("/", {
                      method: "post",
                      mode: "no-cors",
                      body: JSON.stringify(label)
                    }).then(function(response) {
                      var decoder = new TextDecoder();
                      var reader = response.body.getReader();
                      reader.read().then(function processResult(result) {
                        if (result.done) return;
                        var result = decoder.decode(result.value, {
                          stream: true
                        });

                        console.log(result);

                        localStorage.fasturaccount = result;

                        result = JSON.parse(result);
                        if (result.type == "success") {
                          //should be publish response

                          var modal = document.getElementById("modal-content");
                          modal.innerHTML = "ALMOST";
                          var Btn = document.getElementById("myBtn");
                          Btn.click();
                        }
                        if (result.type == "failure") {
                          var modal = document.getElementById("modal-content");
                          modal.innerHTML = result.reason;
                          var Btn = document.getElementById("myBtn");
                          Btn.click();
                        }
                      });
                    });

                    document.getElementById("modal-content").innerHTML =
                      " <a href='https://" +
                      uin.value +
                      ".fastur.com' target='_blank'>https://" +
                      uin.value +
                      ".fastur.com</a>";
                  } else {
                    document.getElementById("modal-content").innerText =
                      "Must be a complete domain name; example.com.";
                  }
                }
                test_name(input.value);
                document.getElementById("modal").style.display = "block";
              } else {
                function test_subname(x) {
                  if (/^[aA-zZ0-9-]+$/g.test(x)) {
                    var label = {
                      type: "publish",
                      query: input.value,
                      modifier: "subdomain",
                      site: site,
                      cookie: lib.cookie("fastur")
                    };
                    fetch("/", {
                      method: "post",
                      mode: "no-cors",
                      body: JSON.stringify(label)
                    }).then(function(response) {
                      var decoder = new TextDecoder();
                      var reader = response.body.getReader();
                      reader.read().then(function processResult(result) {
                        if (result.done) return;
                        var result = decoder.decode(result.value, {
                          stream: true
                        });

                        console.log(result);

                        localStorage.fasturaccount = result;
                        result = JSON.parse(result);

                        if (result.type == "success") {
                          //should be publish response

                          var modal = document.getElementById("modal-content");
                          modal.innerHTML = result;
                          var Btn = document.getElementById("myBtn");
                          Btn.click();
                        }
                        if (result.type == "failure") {
                          var modal = document.getElementById("modal-content");
                          modal.innerHTML = result.reason;
                          var Btn = document.getElementById("myBtn");
                          Btn.click();
                        }
                      });
                    });
                    document.getElementById("modal-content").innerHTML =
                      " <a href='https://" +
                      uin.value +
                      ".fastur.com' target='_blank'>https://" +
                      uin.value +
                      ".fastur.com</a>";
                  } else {
                    document.getElementById("modal-content").innerText =
                      "lowercase letters, numbers and hyphens only.";
                  }
                }
                test_subname(input.value);
                document.getElementById("modal").style.display = "block";
              }
            }
          }
        }
      }

      if (e == "add") {
        try {
          var elements = JSON.parse(lib.value);
        } catch (e) {
          var elements = lib.value;
        }

        if (lib.click) {
          console.log("click!");
          var json = [
            {
              href: "#home",
              id: "home2",
              name: "home",
              type: "button",
              tag: "a",
              ishidden: "home",
              value: "home",
              class: "element",
              id: "home-button",
              css: ""
            },
            {
              name: "Email",
              placeholder: "Email",
              href: "",
              formtype: "text",
              class: " ",
              id: "subscribeEmail2",
              buttonclass: "element",
              buttonid: "checkout-button-plan_FjwWbksv94sxQ8",
              buttonname: "Subscribe + Pay",
              tag: "input",
              type: "StripeSimple"
            },
            {
              name: "FASTUR",
              href: "",
              class: "maintext",
              id: "maintext2",
              tag: "p",
              type: "text"
            },
            {
              href: "#dashboard",
              id: "start-button",
              name: "Get Started",
              tag: "a",
              size: "",
              hover: "pink",
              ishidden: "",
              textcolor: "white",
              background: "#0069ed",
              type: "button",
              class: "element"
            },
            {
              name: "New Site",
              href: "/edit?blank",
              class: "image",
              src: "https://source.unsplash.com/600x400/?work",
              id: "New-Site2",
              type: "image",
              tag: "img"
            },
            {
              text: "<p id='text-01'>text<p>",
              link: "<a id='link-01' href='#'>Link</a>",
              image:
                "<img id='image-01' class='image' src='https://source.unsplash.com/600x400/?love'></img>",
              form:
                "<form action='/' method='post' draggable='true' id='form-01' class=''><input id='01-type' name='01'' class='blank' type='hidden' value='01' style='01' placeholder='undefined'><br><input id='01-email' name='email'' class='blank' type='text' value='' style='undefined' placeholder='email'><br><input id='01-password' name='name'' class='blank' type='password' value='' style='undefined' placeholder='password'><br><input id='01-submit' name='01'' class='element' type='submit' value='submit' style='01' placeholder='undefined'><br></form>",
              canvas:
                "<canvas id='canvas-01' width='200' height='100' style='border:1px solid #000000;'></canvas>"
            }
          ];
          var item = json.find(obj => {
            return obj.type === lib.click;
          });
          var element = [
            {
              tag: "div",
              display: "block;",
              element: "element",
              name: "buttons",
              caps: "true",
              align: "center",
              animation: " active",
              id: "buttons"
            }
          ];
          element[0].items = [item];
          elements.push(element);
          var id = lib.actives[0] || "home";
          document
            .getElementById(id)
            .insertAdjacentHTML("afterbegin", render("client", element));
        }
        if (lib.color) {
          console.log("color!");
          var incoming = lib.color;
          var id = lib.actives[0];
          for (var i in elements) {
            if (elements[i].id == id) {
              console.log("FOUND " + id);
              elements[i].background = incoming;
            }
            var items = elements[i].items;
            for (var item in items) {
              if (items[item].id == id) {
                items[item].background = incoming;
              }
            }
          }
        }
        if (lib.typed) {
          console.log("typed!");

          var latest = [];
          for (var elem in lib.typed) {
            var id = lib.typed[elem].id;
            var time = lib.typed[elem].time;
            if (latest[id]) {
              if (latest[id].time < time) {
                latest[id] = lib.typed[elem];
              }
            } else {
              latest[id] = lib.typed[elem];
            }
          }
          for (var i in latest) {
            var incoming = latest[i].value;
            var id = latest[i].id;
            for (var el in elements) {
              var items = elements[el].items;
              for (var item in items) {
                if (items[item].id == id) {
                  items[item].name = incoming;
                }
              }
            }
          }
        }
        if (lib.drop) {
          console.log("drop!");
          var el = document.getElementById(lib.draggedid);
          var el2 = document.getElementById(lib.drop);
          if (el.dataset.type == "add") {
            el.style.opacity = "1";
          }
          if (el == el2) {
            el.style.opacity = "1";
          }
          el.parentNode.removeChild(el);
          el2.insertAdjacentHTML("afterend", lib.draggedhtml);

          //remove
          console.log("removing");
          var id = lib.draggedid;
          var removeIndex = elements
            .map(function(item) {
              return item.id;
            })
            .indexOf(id);
          if (removeIndex) {
            lib.hold = elements[removeIndex];
          }
          console.log(lib.hold);
          ~removeIndex && elements.splice(removeIndex, 1);

          var el = [];
          for (var element in elements) {
            var items = elements[element].items;
            if (elements[element].id !== id) {
              var it = [];
              for (var item in items) {
                if (items[item].id !== id) {
                  it.push(items[item]);
                } else {
                  lib.hold = items[item];
                }
              }
              elements[element].items = it;
              el.push(elements[element]);
            }
          }
          console.log(lib.hold);

          //add
          var id = lib.drop;

          var addIndex = el
            .map(function(item) {
              return item.id;
            })
            .indexOf(id);
          if (addIndex) {
            el[addIndex + 1] = lib.holde;
          }
          console.log(el);
          var el2 = [];
          for (var element in el) {
            var items = el[element].items;
            if (el[element].id !== id) {
              var it = [];
              for (var item in items) {
                if (items[item].id !== id) {
                  it.push(items[item]);
                } else {
                  it.push(items[item]);
                  it.push(lib.hold);
                }
              }
              el[element].items = it;
              el2.push(el[element]);
            }
          }
          console.log(el2);

          lib.drop = null;
        }

        lib.value = JSON.stringify(elements);
        lib.control();
      }
      if (e == "remove") {
        try {
          var elements = JSON.parse(lib.value);
        } catch (e) {
          var elements = lib.value;
        }
        document.getElementById(lib.actives[0]).remove();
        var id = lib.actives[0];

        var removeIndex = elements
          .map(function(item) {
            return item.id;
          })
          .indexOf(id);
        ~removeIndex && elements.splice(removeIndex, 1);

        var el = [];
        for (var element in elements) {
          var items = elements[element].items;
          if (elements[element].id !== id) {
            var it = [];
            for (var item in items) {
              if (items[item].id !== id) {
                it.push(items[item]);
              }
            }
            elements[element].items = it;
            el.push(elements[element]);
          }
        }
        lib.value = JSON.stringify(el);
        lib.actives = [];
      }

      if (e == "deletesite") {
        document.getElementById("modal-content").innerHTML =
          "Are you sure you want to delete this site? <br> <a class='element' onclick='lib.deletesite();' href='#'>YES</a>";
        document.getElementById("modal").style.display = "block";

        fetch("/", {
          method: "post",
          mode: "no-cors",
          body: JSON.stringify({
            type: "commit",
            query: code,
            modifier: window.commitpath
          })
        }).then(function(response) {
          var decoder = new TextDecoder();
          var reader = response.body.getReader();
          reader.read().then(function processResult(result) {
            if (result.done) return;
            var result = decoder.decode(result.value, {
              stream: true
            });

            if (result.indexOf("html") !== -1) {
              parent.iframetwoname.location.reload();
            } else {
              if (typeof result !== "object") {
                var result = JSON.parse(result);
              }

              if (result.type == "restartapp") {
                parent.iframetwoname.location.reload();
              }
            }
          });
        });
      }
      if (e == "download") {
        //var hmtl = render(elements)
      }
      if (e == "puppet") {
        fetch("/", {
          method: "post",
          mode: "no-cors",
          body: JSON.stringify({
            type: "menu",
            query: e,
            site: window.location.href.split("edit?")[1],
            site: "null",
            cookie: lib.cookie("fastur")
          })
        }).then(function(response) {
          var decoder = new TextDecoder();
          var reader = response.body.getReader();
          reader.read().then(function processResult(result) {
            if (result.done) return;
            var result = decoder.decode(result.value, {
              stream: true
            });

            try {
              result = JSON.parse(result);
            } catch (e) {}

            var modal = document.getElementById("modal-content");
            modal.innerHTML = result;
            console.log(result[0]);
            document.getElementById("modal").style.display = "block";
          });
        });
      }
      if (e == "analytics") {
        fetch("/", {
          method: "post",
          mode: "no-cors",
          body: JSON.stringify({
            type: "menu",
            query: e,
            site: window.location.href.split("edit?")[1],
            site: "null",
            cookie: lib.cookie("fastur")
          })
        }).then(function(response) {
          var decoder = new TextDecoder();
          var reader = response.body.getReader();
          reader.read().then(function processResult(result) {
            if (result.done) return;
            var result = decoder.decode(result.value, {
              stream: true
            });

            try {
              result = JSON.parse(result);
            } catch (e) {}

            var modal = document.getElementById("modal-content");
            modal.innerHTML = result;
            console.log(result[0]);
            document.getElementById("modal").style.display = "block";
          });
        });
      }
      if (e == "exit") {
        window.parent.iframetwoname.location.reload();
        window.location.href = "/#dashboard";
      }

      if (e == "video_background") {
        function video_backgrounds(media) {
          for (var i = 0; i < media.length; i++) {
            (function(i) {
              setTimeout(function() {
                var q = media[i];
                document.getElementById("uin").innerHTML = q;
                fetch(
                  "https://firebasestorage.googleapis.com/v0/b/project-7052131960941452854.appspot.com/o/" +
                    q +
                    ".mp4"
                )
                  .then(function(response) {
                    return response.json();
                  })
                  .then(function(data) {
                    var x =
                      "https://firebasestorage.googleapis.com/v0/b/project-7052131960941452854.appspot.com/o/" +
                      data.name +
                      "?alt=media&token=" +
                      data.downloadTokens;
                    change_video(x);
                  });
              }, 6000 * i);
            })(i);
          }
        }
        video_backgrounds();
      }
      if (e == "video") {
        function video() {
          var video = document.querySelector("video"),
            canvas;

          var img =
            document.querySelector("img") || document.createElement("img");
          var context;
          var width = video.offsetWidth;
          var height = video.offsetHeight;

          canvas = canvas || document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, width, height);

          canvas.toBlob(function(blob) {
            var reader = new FileReader();

            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              var base64data = reader.result.split(",")[1];
              annotate(base64data);
            };

            var img = document.createElement("img"),
              url = URL.createObjectURL(blob);

            img.onload = function() {
              URL.revokeObjectURL(url);
            };

            img.src = url;

            var posts = document.getElementById("image").appendChild(img);

            var uploadTask = storageRef
              .child("images/" + blob.name)
              .put(blob)
              .then(function(snapshot) {
                var url = snapshot.metadata.downloadURLs[0];
              })
              .catch(function(error) {
                console.error("Upload failed:", error);
              });
          });
          var video = document.getElementById("video01");
          var sources = video.getElementsByTagName("video");
          sources[0].src = string;

          document.getElementById("video").addEventListener("click", target);
          function target() {
            //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
            //https://cdn.glitch.com/412c4803-c1a3-49a4-aeae-c706ddbaba4b%2Fm6-site-planning-guide.pdf?1513539752093
            function load(agent) {
              var price = Math.floor(Math.random() * 10000 + 1);
              var name = agent.name.toLowerCase();
              var first_name = name.split(" ")[0];
              var last_name = name.split(" ")[1];
              var first_initial = first_name.split("")[0];
              agent.email = first_initial + last_name + "@bosleyrealestate.com";
              agent.site = first_initial + last_name + ".fastur.com";

              document.getElementById("stdout").innerHTML =
                agent.title +
                "<br>" +
                agent.office +
                "<br>" +
                agent.email +
                "<br>" +
                agent.site +
                "<br>" +
                agent.phone +
                "<br>" +
                "<a onclick='return subscribe(" +
                price +
                "00);' >Subscribe for just <mark id='mark'>$" +
                price +
                " / year</mark></a></p> ";
              var time_limit = new Date("Dec 28, 2017 24:00:00").getTime();
              var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = time_limit - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                  (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                  (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("major").innerHTML =
                  days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
                if (distance < 0) {
                  clearInterval(x);
                  document.getElementById("major").innerHTML = "EXPIRED";
                }
              }, 1000);
            }
            var agents = JSON.parse();
            var real = Math.floor(Math.random() * 10 + 1);
            load(agents[real]);
          }
          function subscribe(amount) {
            StripeCheckout.configure({
              key: "pk_live_mdufsEUxVMK742qsZEJz4keg",
              image:
                "https://s3.amazonaws.com/stripe-uploads/acct_15mFAPBHEFYVkz22merchant-icon-1463599844790-pilot.png",
              locale: "auto",
              token: function(token) {
                var data = new FormData();
                data.append("json", JSON.stringify(token));

                fetch("/", {
                  method: "post",
                  mode: "no-cors",
                  body: data
                }).then(function(response) {});
              }
            }).open({
              name: "Untitled",
              description: "Security",
              currency: "usd",
              amount: amount
            });
          }
        }
        video();
      }
      if (e == "camera") {
        var data = [
          { text: "stop", link: "" },
          { text: "camera", link: "video" }
        ];
        function camera() {
          /*  document.getElementById("modal-content").innerHTML = "<video width='640' height='480' controls> <source src='movie.mp4' type='video/mp4'> Your browser does not support the video tag. </video>"; 
        document.getElementById("modal").style.display = "block";*/

          navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
          if (navigator.getUserMedia) {
            navigator.getUserMedia(
              { audio: false, video: true },
              function(stream) {
                window.localStream = stream;
                var video = document.querySelector("video");

                video.srcObject = localStream;

                video.onloadedmetadata = function(e) {
                  video.play();
                };

                //start recording logic

                // Optional frames per second argument.
                var stream = video.captureStream(25);
                var recordedChunks = [];

                console.log(stream);
                var options = { mimeType: "video/webm; codecs=vp9" };
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = handleDataAvailable;
                mediaRecorder.start();

                function handleDataAvailable(event) {
                  console.log("data-available");
                  if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                    console.log(recordedChunks);
                    download();
                  } else {
                    // ...
                  }
                }
                function download() {
                  var blob = new Blob(recordedChunks, {
                    type: "video/webm"
                  });

                  var payload = JSON.stringify({
                    type: "commit",
                    modifier: "media",
                    data: JSON.stringify(recordedChunks)
                  });
                  fetch("/", {
                    method: "post",
                    mode: "no-cors",
                    body: payload
                  }).then(function(response) {
                    var decoder = new TextDecoder();
                    var reader = response.body.getReader();
                    reader.read().then(function processResult(result) {
                      if (result.done) return;
                      var result = decoder.decode(result.value, {
                        stream: true
                      });

                      try {
                        var result = JSON.parse(result);
                      } catch (e) {}
                      if (result.type == "success") {
                        console.log(result);
                      }
                    });
                  });

                  //post download to server // add to sites.user.json

                  /*var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);*/
                }

                // demo: to download after 9sec
                setTimeout(event => {
                  console.log("stopping");
                  mediaRecorder.stop();
                }, 9000);
              },
              function(err) {
                console.log("The following error occurred: " + err.name);
              }
            );
          } else {
            console.log("getUserMedia not supported");
          }
        }
        camera();
        //stream.getTracks().forEach(track => track.stop())
      }
      if (e == "still") {
      }
      if (e == "stop") {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
        lib.menu("uin");
      }
      if (e == "voice") {
        function mic() {
          var recognition = new webkitSpeechRecognition();
          recognition.onstart = function(event) {};
          recognition.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              var transcript = event.results[i][0].transcript;
              document.getElementById("uin").value = transcript;
              lib.menu(transcript);
            }
          };
          recognition.onend = function() {
            recognition.start();
          };
          recognition.start();
        }
        mic();
        function talk(query, background) {
          var q = "Login and create your own voice assistant";
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(q));
          var q = query;
          var background = background;
          Translate(q, "en", get_response);
          function Translate(q, background, callback) {
            var translate_request = new Request(
              "https://www.googleapis.com/language/translate/v2?q=" +
                q +
                "&target=" +
                background +
                "&key=AIzaSyANwnpMb4fXsGDdMeFIHkQRvetxYoMsAGw",
              {
                method: "get"
              }
            );
            fetch(translate_request).then(function(response) {
              var decoder = new TextDecoder();
              var reader = response.body.getReader();
              reader.read().then(function processResult(result) {
                if (result.done) return;
                var result = decoder.decode(result.value, {
                  stream: true
                });
                var Result = JSON.parse(result);
                console.log(Result);
                var translated_Text =
                  Result.data.translations[0].translatedText;
                var detected_Source_Language =
                  Result.data.translations[0].detectedSourceLanguage;
                callback(translated_Text, detected_Source_Language, background);
                return reader.read().then(processResult);
              });
            });
          }
          function get_response(q, detected_Source_Language, callback) {
            var intent_request = new Request(
              "https://api.api.ai/v1/query?v=20150910",
              {
                method: "POST",
                mode: "cors",
                redirect: "follow",
                headers: {
                  Authorization: "Bearer 21f6a5778d484870ad46be4d34ac2eeb",
                  "content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                  q: q,
                  lang: "en",
                  sessionId: "44628d21-d7a4-47d5-b1c6-a7f851be65fv"
                })
              }
            );
            fetch(intent_request).then(function(response) {
              Respond(response);
            });

            function Respond(response) {
              var decoder = new TextDecoder();
              var reader = response.body.getReader();
              reader.read().then(function processResult(result) {
                if (result.done) return;
                var result = decoder.decode(result.value, {
                  stream: true
                });
                var Result = JSON.parse(result);
                var string = JSON.stringify(Result);

                var speech = Result.result.fulfillment.speech;
                Translate(speech, detected_Source_Language, print_to_user);
                return reader.read().then(processResult);
              });
            }
          }
          function print_to_user(
            translated_Text,
            detected_Source_Language,
            background
          ) {
            document.getElementById("Response").innerHTML = translated_Text;
            console.log(translated_Text);
            var msg = new SpeechSynthesisUtterance(translated_Text);
            msg.lang = background;
            window.speechSynthesis.speak(msg);
            msg.onend = function(event) {
              Speech_Recognition();
            };
          }
        }
        talk();
      }
      if (e == "upload") {
        function file_select() {
          var file = document.createElement("input");
          file.type = "file";
          file.name = "file";
          file.id = "file";
          file.className = "file";
          file.setAttribute("style", "width:180px");
          file.setAttribute("multiple", "");
          file.click();
        }
        file_select();

        let photo = document.getElementById("file").files[0];
        let formData = new FormData();

        formData.append("photo", photo);
        fetch("/upload/image", {
          method: "POST",
          body: { type: "upload", body: formData }
        });
      }
      if (e == "annotate") {
        function annotate(image_uri) {
          image_uri = image_uri;

          function Respond(response) {
            var decoder = new TextDecoder();
            var reader = response.body.getReader();
            reader.read().then(function processResult(result) {
              if (result.done) return;
              var result = decoder.decode(result.value, {
                stream: true
              });
              document.getElementById("minor").innerHTML = result;

              return reader.read().then(processResult);
            });
          }
          fetch(
            "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAg-bBM8onXc5vWvaZ1VG82YslRYFmvgyA",
            {
              method: "POST",
              body: JSON.stringify({
                requests: [
                  {
                    image: {
                      content: image_uri
                    },
                    features: [
                      {
                        type: "FACE_DETECTION",
                        type: "LABEL_DETECTION",
                        type: "LANDMARK_DETECTION",
                        type: "LOGO_DETECTION",
                        type: "LABEL_DETECTION",
                        type: "TEXT_DETECTION",
                        type: "DOCUMENT_TEXT_DETECTION",
                        type: "SAFE_SEARCH_DETECTION",
                        type: "IMAGE_PROPERTIES",
                        type: "CROP_HINTS",
                        type: "WEB_DETECTION"
                      }
                    ]
                  }
                ]
              })
            }
          ).then(function(response) {
            Respond(response);
          });
        }
        annotate();
      }
      if (e == "location") {
        function location() {
          navigator.geolocation.getCurrentPosition(function(position) {
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                position.coords.latitude +
                "," +
                position.coords.longitude +
                "2&key=AIzaSyAdH8CrbylVjj7LU-CmLCYABoWyEuHssho"
            )
              .then(function(response) {
                return response.json();
              })
              .then(function(myJson) {
                alert(JSON.stringify(myJson));
              });
          });
        }
        location();
      }
      if (e == "time") {
        var data = new Date();
        var date = data.toDateString();
        var time = data.toTimeString();
        var result = date + time;
        var data = [{ text: result, link: "" }];
      }

      if (e == "color") {
        var data = [{ text: "Color Selector", link: "color" }];
      }
      if (e == "DIV") {
        var data = [
          { text: "", link: "color" },
          { text: "section-break", link: "input" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "P") {
        var data = [
          { text: "", link: "color" },
          { text: "font", link: "input" },
          { text: "align", link: "align" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "H5") {
        var data = [
          { text: "", link: "color" },
          { text: "font", link: "input" },
          { text: "align", link: "align" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "IMG") {
        var data = [
          { text: "", link: "color" },
          { text: "height", text2: "width", link: "dimension" },
          { text: "upload", link: "" },
          { text: "source", link: "" },
          { text: "onClick", link: "input" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "SPAN") {
        var data = [
          { text: "", link: "color" },
          { text: "rounding", link: "input" },
          { text: "onClick", link: "input" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "INPUT") {
        var data = [
          { text: "source", link: "" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "FORM") {
        var form = document.getElementById(lib.actives[0]);
        var data = [
          { text: "Form Type", link: "" },
          { text: "Product Name", link: "input" },
          { text: "Product ID", link: "input" },
          { text: "Price", link: "input" },
          { text: "Stripe Key", link: "input", value: form.dataset.stripe },
          { text: "Stripe Secret", link: "input" },
          { text: "onSubmit", link: "input" },
          { text: "onSuccess Invoice?", link: "input" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "HR") {
        var data = [
          { text: "HREF", link: "" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }
      if (e == "VIDEO") {
        console.log("take still");
      }
      if (e == "BODY") {
        var data = [
          { text: "", link: "color" },
          { text: "width", link: "dimension" },
          { text: "Google Analytics ID", link: "input" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];

        function ga() {
          (function(i, s, o, g, r, a, m) {
            i["GoogleAnalyticsObject"] = r;
            (i[r] =
              i[r] ||
              function() {
                (i[r].q = i[r].q || []).push(arguments);
              }),
              (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
          })(
            window,
            document,
            "script",
            "https://www.google-analytics.com/analytics.js",
            "ga"
          );
          ga("create", '"+gaid+"', "auto");
          ga("send", "pageview");
        }
      }
      if (e == "HTML") {
        var data = [
          { text: "color", link: "color" },
          { text: "url", link: "input" },
          { text: "none", link: "" },
          {
            action1: "duplicate",
            action2: "remove",
            action3: "add",
            text: "",
            link: "save"
          }
        ];
      }

      if (e == "") {
      } else {
        var uform = document.getElementById("uform-ul");
        uform.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
          var li = document.createElement("li");
          li.id = data[i].id || data[i].text;
          li.className = "uform-li";
          if (data[i].link == "video") {
            var li = document.createElement("div");
            li.id = data[i].text;
            li.className = "uform-li";
            li.innerHTML =
              "<video data-action='still' width='200' height='140' controls> <source src='movie.mp4' type='video/mp4'>?</video>";
          } else if (data[i].link == "form") {
            li.innerHTML = render("client", data);
          } else if (data[i].link == "input") {
            li.innerHTML =
              "<input  id='" +
              data[i].text +
              "' placeholder='" +
              data[i].text +
              "' value='" +
              (data[i].value || "") +
              "' >";
          } else if (data[i].link == "color") {
            li.innerHTML =
              "<label id='color-label' ></label> <br><br> <div id='color-picker'> <canvas id='color-block' height='150' width='150'></canvas> <canvas id='color-strip' height='150' width='30'></canvas> </div>";
            lib.cc = 1;
          } else if (data[i].link == "align") {
            li.innerHTML =
              "<div class='container'><a class='align-left' draggable='true' data-action='" +
              data[i].action +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 511.63 511.631' style='enable-background:new 0 0 511.63 511.631;' xml:space='preserve'> <g> <g> <path d='M18.274,237.548h438.542c4.949,0,9.229-1.812,12.847-5.429c3.614-3.612,5.421-7.898,5.421-12.845v-36.547 c0-4.952-1.807-9.231-5.421-12.847c-3.617-3.617-7.897-5.424-12.847-5.424H18.274c-4.952,0-9.233,1.807-12.851,5.424 C1.809,173.495,0,177.778,0,182.727v36.547c0,4.947,1.809,9.233,5.424,12.845C9.044,235.736,13.326,237.548,18.274,237.548z'/> <path d='M18.274,127.909h328.897c4.948,0,9.236-1.809,12.854-5.424c3.613-3.617,5.424-7.898,5.424-12.847V73.091 c0-4.948-1.811-9.229-5.424-12.85c-3.617-3.612-7.905-5.424-12.854-5.424H18.274c-4.952,0-9.233,1.812-12.851,5.424 C1.809,63.858,0,68.143,0,73.091v36.547c0,4.948,1.809,9.229,5.424,12.847C9.044,126.1,13.326,127.909,18.274,127.909z'/> <path d='M506.206,389.147c-3.617-3.617-7.905-5.427-12.85-5.427H18.274c-4.952,0-9.233,1.81-12.851,5.427 C1.809,392.762,0,397.046,0,401.994v36.546c0,4.948,1.809,9.232,5.424,12.854c3.621,3.61,7.904,5.421,12.851,5.421h475.082 c4.944,0,9.232-1.811,12.85-5.421c3.614-3.621,5.425-7.905,5.425-12.854v-36.546C511.63,397.046,509.82,392.762,506.206,389.147z'/> <path d='M18.274,347.179h365.449c4.948,0,9.233-1.811,12.847-5.428c3.617-3.614,5.428-7.898,5.428-12.847v-36.542 c0-4.945-1.811-9.233-5.428-12.847c-3.613-3.617-7.898-5.428-12.847-5.428H18.274c-4.952,0-9.233,1.811-12.851,5.428 C1.809,283.129,0,287.417,0,292.362v36.545c0,4.948,1.809,9.236,5.424,12.847C9.044,345.371,13.326,347.179,18.274,347.179z'/> </g></g> </svg>" +
              "</a><a class='align-center' draggable='true' data-action='" +
              data[i].action +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 511.63 511.631' style='enable-background:new 0 0 511.63 511.631;' xml:space='preserve'> <g> <g> <path d='M493.356,274.088H18.274c-4.952,0-9.233,1.811-12.851,5.428C1.809,283.129,0,287.417,0,292.362v36.545 c0,4.948,1.809,9.236,5.424,12.847c3.621,3.617,7.904,5.432,12.851,5.432h475.082c4.944,0,9.232-1.814,12.85-5.432 c3.614-3.61,5.425-7.898,5.425-12.847v-36.545c0-4.945-1.811-9.233-5.425-12.847C502.588,275.895,498.3,274.088,493.356,274.088z'/> <path d='M493.356,383.721H18.274c-4.952,0-9.233,1.81-12.851,5.427C1.809,392.762,0,397.046,0,401.994v36.546 c0,4.948,1.809,9.232,5.424,12.854c3.621,3.61,7.904,5.421,12.851,5.421h475.082c4.944,0,9.232-1.811,12.85-5.421 c3.614-3.621,5.425-7.905,5.425-12.854v-36.546c0-4.948-1.811-9.232-5.425-12.847C502.588,385.53,498.3,383.721,493.356,383.721z'/> <path d='M506.206,60.241c-3.617-3.612-7.905-5.424-12.85-5.424H18.274c-4.952,0-9.233,1.812-12.851,5.424 C1.809,63.858,0,68.143,0,73.091v36.547c0,4.948,1.809,9.229,5.424,12.847c3.621,3.616,7.904,5.424,12.851,5.424h475.082 c4.944,0,9.232-1.809,12.85-5.424c3.614-3.617,5.425-7.898,5.425-12.847V73.091C511.63,68.143,509.82,63.861,506.206,60.241z'/> <path d='M493.356,164.456H18.274c-4.952,0-9.233,1.807-12.851,5.424C1.809,173.495,0,177.778,0,182.727v36.547 c0,4.947,1.809,9.233,5.424,12.845c3.621,3.617,7.904,5.429,12.851,5.429h475.082c4.944,0,9.232-1.812,12.85-5.429 c3.614-3.612,5.425-7.898,5.425-12.845v-36.547c0-4.952-1.811-9.231-5.425-12.847C502.588,166.263,498.3,164.456,493.356,164.456z '/> </g> </g> </svg>" +
              "</a><a class='align-right' draggable='true' data-action='" +
              data[i].action +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 511.63 511.631' style='enable-background:new 0 0 511.63 511.631;' xml:space='preserve'> <g> <g> <path d='M493.356,383.721H18.274c-4.952,0-9.233,1.81-12.851,5.427C1.809,392.762,0,397.046,0,401.994v36.546 c0,4.948,1.809,9.232,5.424,12.854c3.621,3.61,7.904,5.421,12.851,5.421h475.082c4.944,0,9.232-1.811,12.85-5.421 c3.614-3.621,5.425-7.905,5.425-12.854v-36.546c0-4.948-1.811-9.232-5.425-12.847C502.588,385.53,498.3,383.721,493.356,383.721z'/> <path d='M493.356,274.088H127.91c-4.952,0-9.233,1.811-12.85,5.428c-3.618,3.613-5.424,7.901-5.424,12.847v36.545 c0,4.948,1.807,9.236,5.424,12.847c3.62,3.617,7.901,5.432,12.85,5.432h365.446c4.944,0,9.232-1.814,12.85-5.432 c3.614-3.61,5.425-7.898,5.425-12.847v-36.545c0-4.945-1.811-9.233-5.425-12.847C502.588,275.895,498.3,274.088,493.356,274.088z'/> <path d='M493.356,164.456H54.821c-4.952,0-9.235,1.807-12.85,5.424c-3.617,3.615-5.424,7.898-5.424,12.847v36.547 c0,4.947,1.807,9.233,5.424,12.845c3.619,3.617,7.898,5.429,12.85,5.429h438.535c4.944,0,9.232-1.812,12.85-5.429 c3.614-3.612,5.425-7.898,5.425-12.845v-36.547c0-4.952-1.811-9.231-5.425-12.847C502.588,166.263,498.3,164.456,493.356,164.456z '/> <path d='M506.206,60.241c-3.617-3.612-7.905-5.424-12.85-5.424H164.457c-4.952,0-9.235,1.812-12.85,5.424 c-3.617,3.617-5.426,7.902-5.426,12.85v36.547c0,4.948,1.809,9.229,5.426,12.847c3.619,3.616,7.901,5.424,12.85,5.424h328.899 c4.944,0,9.232-1.809,12.85-5.424c3.614-3.617,5.425-7.898,5.425-12.847V73.091C511.63,68.143,509.82,63.861,506.206,60.241z'/> </g> </g> </svg>" +
              "</a> </div>";
          } else if (data[i].link == "history") {
            li.innerHTML =
              "<div class='container'><a class='align-left' draggable='true' data-action='" +
              data[i].action1 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' height='15pt' viewBox='0 0 512 512.00241' width='15pt'><path d='m256 .00390625c-62.675781 0-123.605469 23.08203175-171.09375 62.26953175l-57.597656-57.597657c-4.585938-4.566406-11.457032-5.933593-17.429688-3.457031-5.972656 2.472656-9.878906 8.296875-9.878906 14.785156v138.664063c0 8.832031 7.167969 16 16 16h138.667969c6.484375 0 12.308593-3.902344 14.785156-9.875 2.472656-5.972657 1.109375-12.84375-3.480469-17.429688l-50.75-50.773437c39.445313-31.425782 89.363282-49.921875 140.777344-49.921875 117.632812 0 213.335938 95.703125 213.335938 213.335937 0 117.628906-95.703126 213.332032-213.335938 213.332032-56.9375 0-110.503906-22.207032-150.804688-62.527344-8.339843-8.34375-21.824218-8.34375-30.164062 0-8.34375 8.339844-8.34375 21.824218 0 30.164062 48.363281 48.382813 112.640625 75.03125 180.96875 75.03125 141.164062 0 256-114.839844 256-256 0-141.164062-114.835938-255.99999975-256-255.99999975zm0 0'/></svg>" +
              "</a><a class='align-center' draggable='true' data-action='" +
              data[i].action2 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' height='15pt' viewBox='0 0 512 512' width='15pt'><path d='m502.121094 1.214844c-5.972656-2.453125-12.863282-1.109375-17.429688 3.476562l-57.597656 57.601563c-47.488281-39.210938-108.417969-62.292969-171.09375-62.292969-141.164062 0-256 114.835938-256 256s114.835938 256 256 256c68.332031 0 132.609375-26.644531 180.96875-75.03125 8.34375-8.339844 8.34375-21.820312 0-30.164062-8.339844-8.339844-21.820312-8.339844-30.164062 0-40.296876 40.320312-93.867188 62.527343-150.804688 62.527343-117.632812 0-213.332031-95.699219-213.332031-213.332031s95.699219-213.332031 213.332031-213.332031c51.414062 0 101.332031 18.496093 140.777344 49.917969l-50.75 50.773437c-4.585938 4.585937-5.929688 11.457031-3.476563 17.429687 2.472657 5.972657 8.296875 9.878907 14.78125 9.878907h138.667969c8.832031 0 16-7.167969 16-16v-138.667969c0-6.484375-3.902344-12.308594-9.878906-14.785156zm0 0'/></svg>" +
              "</a><a class='align-right' draggable='true' data-action='" +
              data[i].action3 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-56 0 512 512' height='20px' width='20px'><path d='m395.980469 112.582031-108.023438-108.023437c-2.960937-2.960938-6.949219-4.558594-11.019531-4.558594h-156.339844c-8.597656 0-15.578125 6.980469-15.578125 15.578125v89.445313h-89.441406c-8.597656 0-15.578125 6.976562-15.578125 15.578124v375.820313c0 8.597656 6.980469 15.578125 15.578125 15.578125h264.359375c8.601562 0 15.582031-6.980469 15.582031-15.578125v-89.445313h89.441407c8.597656 0 15.578124-6.976562 15.578124-15.578124v-267.796876c0-3.960937-1.523437-7.984374-4.558593-11.019531zm-26.597657 263.238281h-73.863281v-147.195312c0-4.035156-1.570312-8.03125-4.5625-11.023438l-108.019531-108.019531c-2.933594-2.9375-6.914062-4.5625-11.019531-4.5625h-35.738281v-73.863281h125.179687v92.445312c0 8.597657 6.980469 15.578126 15.578125  15.578126h92.445312zm-105.023437 105.023438h-233.203125v-344.664062h125.179688v92.445312c0 8.597656 6.980468 15.578125 15.582031 15.578125h92.441406zm-76.863281-322.636719 54.835937 54.835938h-54.835937zm159.855468-50.183593h-54.835937v-54.835938c6.855469 6.851562 49.367187 49.367188 54.835937 54.835938zm0 0'/></svg>" +
              "</a> </div>";
          } else if (data[i].link == "base") {
            li.innerHTML =
              "<div class='container'><a class='align-left' draggable='true' data-action='" +
              data[i].action1 +
              "' data-type='" +
              data[i].type +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='enable-background:new 0 0 340.111 340.111;' viewBox='0 0 340.111 340.111' width='20px' height='20px' y='0px' x='0px' id='Layer_1' version='1.1'> <g> <polygon style='fill:#333E48;' points='340.111,76.316 340.111,65.175 292.206,65.175 292.206,76.316 310.588,76.316    310.588,263.794 292.206,263.794 292.206,274.935 340.111,274.935 340.111,263.794 321.729,263.794 321.729,76.316  '/> <g> <path style='fill:#1E252B;' d='M2.067,229.59l56.068-126.615c3.909-8.731,11.03-14.018,20.684-14.018h2.068    c9.648,0,16.544,5.286,20.449,14.018l56.07,126.615c1.149,2.528,1.84,4.825,1.84,7.124c0,9.421-7.354,17.004-16.776,17.004    c-8.272,0-13.788-4.825-17.004-12.18l-10.799-25.275H43.891l-11.26,26.426c-2.988,6.893-8.961,11.029-16.315,11.029    C7.121,253.718,0,246.365,0,237.173C0,234.645,0.918,232.118,2.067,229.59z M101.568,185.011l-22.291-53.082l-22.289,53.082    H101.568z'/> <path style='fill:#1E252B;' d='M176.011,216.951v-0.46c0-26.885,20.452-39.294,49.635-39.294c12.41,0,21.373,2.068,30.105,5.056    v-2.068c0-14.478-8.963-22.519-26.427-22.519c-9.651,0-17.464,1.378-24.128,3.447c-2.067,0.689-3.447,0.918-5.058,0.918    c-8.04,0-14.474-6.204-14.474-14.246c0-6.205,3.905-11.49,9.419-13.559c11.03-4.136,22.981-6.434,39.296-6.434    c19.071,0,32.86,5.055,41.593,13.787c9.191,9.191,13.327,22.75,13.327,39.295v56.068c0,9.423-7.583,16.775-17.005,16.775    c-10.111,0-16.774-7.123-16.774-14.477v-0.23c-8.502,9.421-20.224,15.625-37.226,15.625    C195.083,254.637,176.011,241.311,176.011,216.951z M256.208,208.908v-6.204c-5.974-2.757-13.787-4.596-22.289-4.596    c-14.938,0-24.128,5.975-24.128,17.004v0.46c0,9.422,7.813,14.936,19.072,14.936C245.178,230.509,256.208,221.548,256.208,208.908    z'/> </g> </g> </svg>" +
              "</a><a class='align-center' draggable='true' data-action='" +
              data[i].action2 +
              "' data-type='" +
              data[i].type +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 512.092 512.092'  width='20px' height='20px' style='enable-background:new 0 0 512.092 512.092;' xml:space='preserve'> <g> <g> <path d='M312.453,199.601c-6.066-6.102-12.792-11.511-20.053-16.128c-19.232-12.315-41.59-18.859-64.427-18.859    c-31.697-0.059-62.106,12.535-84.48,34.987L34.949,308.23c-22.336,22.379-34.89,52.7-34.91,84.318    c-0.042,65.98,53.41,119.501,119.39,119.543c31.648,0.11,62.029-12.424,84.395-34.816l89.6-89.6    c1.628-1.614,2.537-3.816,2.524-6.108c-0.027-4.713-3.87-8.511-8.583-8.484h-3.413c-18.72,0.066-37.273-3.529-54.613-10.581    c-3.195-1.315-6.867-0.573-9.301,1.877l-64.427,64.512c-20.006,20.006-52.442,20.006-72.448,0    c-20.006-20.006-20.006-52.442,0-72.448l108.971-108.885c19.99-19.965,52.373-19.965,72.363,0    c13.472,12.679,34.486,12.679,47.957,0c5.796-5.801,9.31-13.495,9.899-21.675C322.976,216.108,319.371,206.535,312.453,199.601z'/> </g> </g> <g> <g> <path d='M477.061,34.993c-46.657-46.657-122.303-46.657-168.96,0l-89.515,89.429c-2.458,2.47-3.167,6.185-1.792,9.387    c1.359,3.211,4.535,5.272,8.021,5.205h3.157c18.698-0.034,37.221,3.589,54.528,10.667c3.195,1.315,6.867,0.573,9.301-1.877    l64.256-64.171c20.006-20.006,52.442-20.006,72.448,0c20.006,20.006,20.006,52.442,0,72.448l-80.043,79.957l-0.683,0.768    l-27.989,27.819c-19.99,19.965-52.373,19.965-72.363,0c-13.472-12.679-34.486-12.679-47.957,0    c-5.833,5.845-9.35,13.606-9.899,21.845c-0.624,9.775,2.981,19.348,9.899,26.283c9.877,9.919,21.433,18.008,34.133,23.893    c1.792,0.853,3.584,1.536,5.376,2.304c1.792,0.768,3.669,1.365,5.461,2.048c1.792,0.683,3.669,1.28,5.461,1.792l5.035,1.365    c3.413,0.853,6.827,1.536,10.325,2.133c4.214,0.626,8.458,1.025,12.715,1.195h5.973h0.512l5.12-0.597    c1.877-0.085,3.84-0.512,6.059-0.512h2.901l5.888-0.853l2.731-0.512l4.949-1.024h0.939c20.961-5.265,40.101-16.118,55.381-31.403    l108.629-108.629C523.718,157.296,523.718,81.65,477.061,34.993z'/> </g> </g> </svg>" +
              "</a><a class='align-right' draggable='true' data-action='" +
              data[i].action3 +
              "' data-id='" +
              data[i].id +
              "' data-type='" +
              data[i].type +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 58 58'  width='20px' height='20px' style='enable-background:new 0 0 58 58;' xml:space='preserve'> <g> <path d='M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M56,50H2V8h54V50z'/> <path d='M16,28.138c3.071,0,5.569-2.498,5.569-5.568C21.569,19.498,19.071,17,16,17s-5.569,2.498-5.569,5.569   C10.431,25.64,12.929,28.138,16,28.138z M16,19c1.968,0,3.569,1.602,3.569,3.569S17.968,26.138,16,26.138s-3.569-1.601-3.569-3.568   S14.032,19,16,19z'/> <path d='M7,46c0.234,0,0.47-0.082,0.66-0.249l16.313-14.362l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414   l-4.807-4.807l9.181-10.054l11.261,10.323c0.407,0.373,1.04,0.345,1.413-0.062c0.373-0.407,0.346-1.04-0.062-1.413l-12-11   c-0.196-0.179-0.457-0.268-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743   c-0.374-0.373-0.972-0.392-1.368-0.044L6.339,44.249c-0.415,0.365-0.455,0.997-0.09,1.412C6.447,45.886,6.723,46,7,46z'/> </g> </svg>" +
              "</a> </div>";
          } else if (data[i].link == "save") {
            li.innerHTML =
              "<div class='container'><a class='align-left' draggable='true' data-action='" +
              data[i].action1 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' height='15pt' viewBox='0 0 512 512' width='15pt'><path d='m409.785156 278.5-153.785156 153.785156-153.785156-153.785156 28.285156-28.285156 105.5 105.5v-355.714844h40v355.714844l105.5-105.5zm102.214844 193.5h-512v40h512zm0 0'/></svg>" +
              "</a><a class='align-center' draggable='true' data-action='" +
              data[i].action2 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 408.483 408.483' style='enable-background:new 0 0 408.483 408.483;' xml:space='preserve'> <g> <g> <path d='M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z'/> <path d='M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z'/> </g> </g> </svg>" +
              "</a><a class='align-right' draggable='true' data-action='" +
              data[i].action3 +
              "' data-id='" +
              data[i].id +
              "' pointer-events='none' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' width='20px' height='20px' x='0px' y='0px' viewBox='0 0 49 49' style='enable-background:new 0 0 49 49;' xml:space='preserve'> <g> <rect x='27.5' y='5' width='6' height='10'/> <path d='M39.914,0H0.5v49h48V8.586L39.914,0z M10.5,2h26v16h-26V2z M39.5,47h-31V26h31V47z'/> <path d='M13.5,32h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,32,13.5,32z'/> <path d='M13.5,36h10c0.553,0,1-0.447,1-1s-0.447-1-1-1h-10c-0.553,0-1,0.447-1,1S12.947,36,13.5,36z'/> <path d='M26.5,36c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71c-0.37-0.37-1.04-0.37-1.41,0 c-0.19,0.189-0.3,0.439-0.3,0.71c0,0.27,0.109,0.52,0.29,0.71C25.979,35.89,26.229,36,26.5,36z'/> </g> </svg>" +
              "</a> </div>";
          } else if (data[i].link == "form") {
            li.innerHTML =
              "<div class='dimension'><a class='align-left' draggable='true' data-action='" +
              data[i].action1 +
              "' data-type='" +
              data[i].type +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='30' height='30' viewBox='0 0 16 16'> <path fill='#444444' d='M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z'/> <path fill='#444444' d='M2 6h1v4h-1v-4z'/> </svg>" +
              "</a><a class='align-center' draggable='true' data-action='" +
              data[i].action2 +
              "' data-type='" +
              data[i].type +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 512 512' width='30px' height='30px'><title>Card</title><g id='_Group_' data-name=' Group '><path d='M484,359v16.12a30,30,0,0,1-30,30H58a30,30,0,0,1-30-30V359H484Z' style='fill:#00efd1'/><polygon points='484 300.65 484 359 28.6 359 28 359 28 300.65 28.6 300.65 484 300.65' style='fill:#00acea'/><path d='M484,136.88V300.65H28V136.88a30,30,0,0,1,30-30H454A30,30,0,0,1,484,136.88Z' style='fill:#00efd1'/><path d='M393.04,171.31c15.3,0,27.71,13.19,27.71,29.47s-12.41,29.48-27.71,29.48a27.3,27.3,0,0,1-23.19-13.35,31.041,31.041,0,0,0,0-32.26A27.31,27.31,0,0,1,393.04,171.31Z' style='fill:#fedb41'/><ellipse cx='369.85' cy='200.78' rx='4.52' ry='16.13' style='fill:#fedb41'/><path d='M346.66,171.31a27.31,27.31,0,0,1,23.19,13.34,31.041,31.041,0,0,0,0,32.26,27.3,27.3,0,0,1-23.19,13.35c-15.31,0-27.71-13.2-27.71-29.48S331.35,171.31,346.66,171.31Z' style='fill:#f4b844'/><rect x='82.82' y='181.56' width='106.01' height='38.45' style='fill:#00acea'/></g></svg>" +
              "</a></div>";
          } else if (data[i].link == "dimension") {
            li.innerHTML =
              "<div class='dimension'><input  id='inputheight' placeholder='" +
              data[i].text +
              "' ><input  id='inputwidth' placeholder='" +
              data[i].text2 +
              "' ><input id='heightrange' type='range' class='meter' value='50' min='0' max='100' ><input id='widthrange' type='range' class='meter' value='50' min='0' max='100' ></div>";
            lib.dd = 1;
          } else if (data[i].link == "media") {
            li.innerHTML =
              "<div class='container'><a class='align-left' draggable='true' data-action='" +
              data[i].action1 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 47.001 47.001' style='enable-background:new 0 0 47.001 47.001;' xml:space='preserve'> <g> <g> <path d='M41.188,9.372c0-0.837-0.85-1.081-1.512-1.229v2.434C40.414,10.527,41.188,10.181,41.188,9.372z'/> <path d='M38.938,4.185C38.102,4.209,37.56,4.702,37.56,5.23c0,0.615,0.458,0.971,1.379,1.155L38.938,4.185L38.938,4.185z'/> <path d='M39.283,14.867c4.1,0,7.434-3.335,7.434-7.433S43.382,0,39.283,0c-4.101,0-7.436,3.335-7.436,7.434     C31.847,11.532,35.182,14.867,39.283,14.867z M36.014,5.512c0-1.67,1.389-2.533,2.925-2.581V2.277     c0-0.211,0.159-0.419,0.367-0.419c0.21,0,0.37,0.208,0.37,0.419v0.654c0.957,0.025,2.926,0.626,2.926,1.833     c0,0.479-0.358,0.761-0.775,0.761c-0.801,0-0.788-1.315-2.15-1.34v2.336c1.624,0.344,3.06,0.824,3.06,2.717     c0,1.646-1.229,2.483-3.06,2.594v0.76c0,0.21-0.16,0.419-0.37,0.419c-0.208,0-0.367-0.209-0.367-0.419v-0.76     c-2.077-0.051-3.109-1.292-3.109-2.264c0-0.49,0.296-0.774,0.761-0.774c1.377,0,0.307,1.696,2.349,1.783v-2.57     C37.118,7.675,36.014,6.877,36.014,5.512z'/> <path d='M9.355,33.113H2.946c-1.18,0-2.136,0.957-2.136,2.137v9.613C0.811,46.045,1.768,47,2.946,47h6.409     c1.18,0,2.136-0.955,2.136-2.137V35.25C11.492,34.07,10.536,33.113,9.355,33.113z'/> <path d='M25.919,25.637H19.51c-1.18,0-2.136,0.957-2.136,2.137v17.091c0,1.182,0.957,2.137,2.136,2.137h6.409     c1.18,0,2.137-0.955,2.137-2.137V27.771C28.056,26.594,27.1,25.637,25.919,25.637z'/> <path d='M42.486,17.091h-6.408c-1.181,0-2.137,0.957-2.137,2.136v25.636c0,1.182,0.957,2.137,2.137,2.137h6.408     c1.181,0,2.137-0.955,2.137-2.137V19.228C44.624,18.048,43.667,17.091,42.486,17.091z'/> <path d='M29.675,10.972L24.37,9.863c-0.406-0.084-0.824,0.073-1.073,0.404c-0.249,0.332-0.283,0.777-0.088,1.144l1.176,2.211     L0.863,25.755c-0.524,0.271-0.73,0.916-0.459,1.438c0.19,0.367,0.563,0.578,0.95,0.578c0.165,0,0.332-0.037,0.489-0.119     l23.544-12.145l1.079,2.028c0.186,0.35,0.549,0.567,0.943,0.567c0.018,0,0.035-0.001,0.054-0.002     c0.414-0.021,0.779-0.279,0.935-0.663l2.049-5.018c0.12-0.294,0.104-0.625-0.046-0.905C30.25,11.237,29.985,11.038,29.675,10.972     z'/> </g> </g> </svg>" +
              "</a><a class='align-center' draggable='true' data-action='" +
              data[i].action2 +
              "' data-id='" +
              data[i].id +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 475.085 475.085' style='enable-background:new 0 0 475.085 475.085;' xml:space='preserve'> <g> <g> <path d='M237.541,328.897c25.128,0,46.632-8.946,64.523-26.83c17.888-17.884,26.833-39.399,26.833-64.525V91.365    c0-25.126-8.938-46.632-26.833-64.525C284.173,8.951,262.669,0,237.541,0c-25.125,0-46.632,8.951-64.524,26.84    c-17.893,17.89-26.838,39.399-26.838,64.525v146.177c0,25.125,8.949,46.641,26.838,64.525    C190.906,319.951,212.416,328.897,237.541,328.897z'/> <path d='M396.563,188.15c-3.606-3.617-7.898-5.426-12.847-5.426c-4.944,0-9.226,1.809-12.847,5.426    c-3.613,3.616-5.421,7.898-5.421,12.845v36.547c0,35.214-12.518,65.333-37.548,90.362c-25.022,25.03-55.145,37.545-90.36,37.545    c-35.214,0-65.334-12.515-90.365-37.545c-25.028-25.022-37.541-55.147-37.541-90.362v-36.547c0-4.947-1.809-9.229-5.424-12.845    c-3.617-3.617-7.895-5.426-12.847-5.426c-4.952,0-9.235,1.809-12.85,5.426c-3.618,3.616-5.426,7.898-5.426,12.845v36.547    c0,42.065,14.04,78.659,42.112,109.776c28.073,31.118,62.762,48.961,104.068,53.526v37.691h-73.089    c-4.949,0-9.231,1.811-12.847,5.428c-3.617,3.614-5.426,7.898-5.426,12.847c0,4.941,1.809,9.233,5.426,12.847    c3.616,3.614,7.898,5.428,12.847,5.428h182.719c4.948,0,9.236-1.813,12.847-5.428c3.621-3.613,5.431-7.905,5.431-12.847    c0-4.948-1.81-9.232-5.431-12.847c-3.61-3.617-7.898-5.428-12.847-5.428h-73.08v-37.691    c41.299-4.565,75.985-22.408,104.061-53.526c28.076-31.117,42.12-67.711,42.12-109.776v-36.547    C401.998,196.049,400.185,191.77,396.563,188.15z'/> </g> </g> </svg>" +
              "</a><a class='align-right' draggable='true' data-action='" +
              data[i].action3 +
              "' data-id='" +
              data[i].id +
              "' pointer-events='none' href='" +
              (data[i].link || "#") +
              "'>" +
              "<svg xmlns='http://www.w3.org/2000/svg'  xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 60 60' style='enable-background:new 0 0 60 60;' xml:space='preserve' width='20px' height='20px'> <g> <path d='M55.201,15.5h-8.524l-4-10H17.323l-4,10H12v-5H6v5H4.799C2.152,15.5,0,17.652,0,20.299v29.368   C0,52.332,2.168,54.5,4.833,54.5h50.334c2.665,0,4.833-2.168,4.833-4.833V20.299C60,17.652,57.848,15.5,55.201,15.5z M8,12.5h2v3H8   V12.5z M58,49.667c0,1.563-1.271,2.833-2.833,2.833H4.833C3.271,52.5,2,51.229,2,49.667V20.299C2,18.756,3.256,17.5,4.799,17.5H6h6   h2.677l4-10h22.646l4,10h9.878c1.543,0,2.799,1.256,2.799,2.799V49.667z'/> <path d='M30,14.5c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S39.925,14.5,30,14.5z M30,48.5c-8.822,0-16-7.178-16-16   s7.178-16,16-16s16,7.178,16,16S38.822,48.5,30,48.5z'/> <path d='M30,20.5c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S36.617,20.5,30,20.5z M30,42.5c-5.514,0-10-4.486-10-10   s4.486-10,10-10s10,4.486,10,10S35.514,42.5,30,42.5z'/> <path d='M52,19.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S54.206,19.5,52,19.5z M52,25.5c-1.103,0-2-0.897-2-2s0.897-2,2-2   s2,0.897,2,2S53.103,25.5,52,25.5z'/> </g> </svg>" +
              "</a> </div>";
          } else {
            li.innerHTML =
              "<a id='id+" +
              data[i].text +
              "' draggable='true' data-action='" +
              data[i].text +
              "' data-type='" +
              data[i].type +
              "' href='" +
              (data[i].link || "#") +
              "'>" +
              data[i].text +
              "</a>";
          }

          li.onclick = lib.menu;
          uform.appendChild(li);

          if (lib.form == 1) {
            var form = document.getElementById(lib.actives[0]);
            console.log(form);
            console.log(form.dataset.stripe);
          }
          if (lib.cc == 1) {
            var colorBlock = document.getElementById("color-block");
            var ctx1 = colorBlock.getContext("2d");
            var width1 = colorBlock.width;
            var height1 = colorBlock.height;

            var colorStrip = document.getElementById("color-strip");
            var ctx2 = colorStrip.getContext("2d");
            var width2 = colorStrip.width;
            var height2 = colorStrip.height;

            var colorLabel = document.getElementById("color-label");
            colorLabel.style.background = "red";

            var x = 0;
            var y = 0;
            var drag = false;
            var rgbaColor = "rgba(255,0,0,1)";

            ctx1.rect(0, 0, width1, height1);
            fillGradient();

            ctx2.rect(0, 0, width2, height2);
            var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
            grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
            grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
            grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
            grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
            grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
            grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
            grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
            ctx2.fillStyle = grd1;
            ctx2.fill();

            function click(e) {
              x = e.offsetX;
              y = e.offsetY;
              var imageData = ctx2.getImageData(x, y, 1, 1).data;
              rgbaColor =
                "rgba(" +
                imageData[0] +
                "," +
                imageData[1] +
                "," +
                imageData[2] +
                ",1)";
              lib.selected = rgbaColor;
              fillGradient();
            }

            function fillGradient() {
              ctx1.fillStyle = rgbaColor;
              ctx1.fillRect(0, 0, width1, height1);

              var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
              grdWhite.addColorStop(0, "rgba(255,255,255,1)");
              grdWhite.addColorStop(1, "rgba(255,255,255,0)");
              ctx1.fillStyle = grdWhite;
              ctx1.fillRect(0, 0, width1, height1);

              var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
              grdBlack.addColorStop(0, "rgba(0,0,0,0)");
              grdBlack.addColorStop(1, "rgba(0,0,0,1)");
              ctx1.fillStyle = grdBlack;
              ctx1.fillRect(0, 0, width1, height1);
            }

            function mousedown(e) {
              drag = true;
              changeColor(e);
            }

            function mousemove(e) {
              if (drag) {
                changeColor(e);
              }
            }

            function mouseup(e) {
              drag = false;
            }

            function changeColor(e) {
              x = e.offsetX;
              y = e.offsetY;
              var imageData = ctx1.getImageData(x, y, 1, 1).data;
              rgbaColor =
                "rgba(" +
                imageData[0] +
                "," +
                imageData[1] +
                "," +
                imageData[2] +
                ",1)";
              function RGBAToHexA(r, g, b, a) {
                r = r.toString(16);
                g = g.toString(16);
                b = b.toString(16);
                a = Math.round(a * 255).toString(16);

                if (r.length == 1) r = "0" + r;
                if (g.length == 1) g = "0" + g;
                if (b.length == 1) b = "0" + b;
                if (a.length == 1) a = "0" + a;

                return "#" + r + g + b + a;
              }
              rgbaColor = RGBAToHexA(
                imageData[0],
                imageData[1],
                imageData[2],
                1
              );

              if (lib.actives[0] == "pagebody") {
                var body = document.getElementsByTagName("body")[0];
                body.style.backgroundImage = "none";
              }

              colorLabel.style.backgroundColor = rgbaColor;
              lib.color = rgbaColor;
              document.getElementById("uin").value = rgbaColor;

              var el = document.getElementById(lib.actives[0]);
              el.style.backgroundColor = rgbaColor;
            }

            colorStrip.addEventListener("click", click, false);

            colorBlock.addEventListener("mousedown", mousedown, false);
            colorBlock.addEventListener("mouseup", mouseup, false);
            colorBlock.addEventListener("mousemove", mousemove, false);

            lib.cc = 0;
          }
          if (lib.dd == 1) {
            var a = document.getElementById("heightrange");
            a.addEventListener("input", run);
            function run() {
              document.getElementById("inputheight").value = a.value;
            }
            var b = document.getElementById("widthrange");
            b.addEventListener("input", run2);
            function run2() {
              document.getElementById("inputwidth").value = b.value;
            }
            lib.dd = 0;
          }

          document.getElementById("uform").appendChild(uform);
        }
      }
    };
    lib.control = function(e) {
      window.onhashchange = function() {
        console.log("update page");
        var hash = window.location.hash.split("#")[1];
        var target = document.getElementById(hash);
        if (target) {
          if (hash == lib.actives[0]) {
          } else {
            for (var active of lib.actives) {
              if (active) {
                var activated = document.getElementById(active);

                activated.classList.replace("active", "inactive");
                setTimeout(function() {
                  activated.style.display = "none";
                }, 350);
                lib.actives = [];
              }
            }

            var target = document.getElementById(hash);
            target.style.display = "";
            setTimeout(function() {
              target.classList.replace("inactive", "active");
            }, 750);
            lib.actives.push(target.id);
          }
        }

        /*  hashUpdate(window.location.hash.split('#')[1]) */
      };

      var input = document.getElementById("uin");
      input.placeholder = "ready";
      input.addEventListener("keyup", function(e) {
        if (e.key === "Enter") {
          lib.menu(e.target.value);
          var phone = document.getElementsByClassName("phone-container");
          var tablet = document.getElementsByClassName("tablet-container");
          //phone[0].style.display = "none";
          //tablet[0].style.display = "none";
          var desktop = document.getElementsByClassName("device desktop");

          var payload = JSON.stringify({
            type: "menu",
            query: e.target.value,
            modifier: window.commitpath
          });

          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: payload
          }).then(function(response) {
            var decoder = new TextDecoder();
            var reader = response.body.getReader();
            reader.read().then(function processResult(result) {
              if (result.done) return;
              var result = decoder.decode(result.value, {
                stream: true
              });
              console.log(result);
              //var object = JSON.parse(result);

              if (result.indexOf("html") !== -1) {
                if (window.parent.iframetwoname) {
                  window.parent.iframetwoname.location.reload();
                }
              } else {
                if (typeof result !== "object") {
                  var result = JSON.parse(result);
                }
                console.log(result);
                if (result.type == "show") {
                  document.getElementById("desktopimage").src =
                    "https://code.fastur.com/assets/" + result.q + ".gif";

                  document.getElementById("tabletimage").src =
                    "https://code.fastur.com/assets/gif.gif";

                  document.getElementById("phoneimage").src =
                    "https://code.fastur.com/assets/" + result.q + ".";
                  document.getElementById(
                    "maintext"
                  ).innerText = JSON.stringify(result.data);
                }
                //
                if (result.type === "restartapp") {
                  document.getElementById("uin").placeholder = "...";
                  if (window.parent.iframetwoname) {
                    window.parent.iframetwoname.location.reload();
                  }
                }
              }
            });
          });
        }
      });

      document.getElementsByTagName("HTML")[0].setAttribute("id", "page");

      document.addEventListener(
        "touchmove",
        function(event) {
          event.preventDefault();
        },
        false
      );
      document.addEventListener("touchstart", lib.touch, true);
      document.addEventListener("touchmove", lib.touch, true);
      document.addEventListener("touchend", lib.touch, true);
      document.addEventListener("touchcancel", lib.touch, true);
      if (pagebody.dataset.editor !== "edit") {
        var input = document.getElementById("uin");
        input.placeholder = "questions & feedback";
        window.setTimeout(function() {
          document.getElementById("uin").focus();
        }, 0);

        [].forEach.call(document.querySelectorAll("a"), function(el) {
          el.addEventListener("click", function() {
            var target = document.getElementById(event.target.innerText);
            if (target) {
              if (event.target.innerText == lib.actives[0]) {
              } else {
                for (var active of lib.actives) {
                  if (active) {
                    var activated = document.getElementById(active);

                    activated.classList.replace("active", "inactive");
                    setTimeout(function() {
                      activated.style.display = "none";
                    }, 350);
                    lib.actives = [];
                  }
                }

                var target = document.getElementById(event.target.innerText);
                target.style.display = "";
                setTimeout(function() {
                  target.classList.replace("inactive", "active");
                }, 750);
                lib.actives.push(target.id);
              }
            }

            var loginpage = document.getElementById("login");
            if (loginpage) {
              document
                .getElementById("login")
                .addEventListener("submit", login, false);
            }
            var registerpage = document.getElementById("register");
            if (registerpage) {
              document
                .getElementById("register")
                .addEventListener("submit", register, false);
            }

            function login(e) {
              e.preventDefault();
              {
                var type = document.getElementById("login-type").value;
                var email = document.getElementById("login-email").value;
                var password = document.getElementById("login-password").value;
                var label = {
                  type: type,
                  email: email,
                  password: password,
                  uuid: lib.cookie("fastur"),
                  time: Date.now()
                };
                fetch("/", {
                  method: "post",
                  mode: "no-cors",
                  body: JSON.stringify(label)
                }).then(function(response) {
                  var decoder = new TextDecoder();
                  var reader = response.body.getReader();
                  reader.read().then(function processResult(result) {
                    if (result.done) return;
                    var result = decoder.decode(result.value, {
                      stream: true
                    });
                    localStorage.fasturaccount = JSON.stringify(result);
                    result = JSON.parse(result);
                    if (result.type == "success") {
                      var loginButton = document.getElementById("login-button");
                      loginButton.innerText = "logout";
                      loginButton.href = "/logout";
                      loginButton.addEventListener(
                        "click",
                        function() {
                          localStorage.clear();
                        },
                        false
                      );
                      var registerButton = document.getElementById(
                        "register-button"
                      );
                      registerButton.innerText = "account";
                      registerButton.href = "#account";
                      var data = JSON.parse(result.data);
                      for (var i = 0; i < data.length; i++) {
                        var dashboard = document.getElementById("dashboard");

                        var item =
                          "<a href='/edit?" +
                            data[i].uid +
                            "' class='element'>" +
                            data[i].subname +
                            "<img id='simple' class='item right' width='100px' height='' src='" +
                            ("assets/" + data[i].screenshot + ".png") ||
                          "https://source.unsplash.com/600x400/?work" +
                            "'></a>";
                        dashboard.insertAdjacentHTML("beforeend", item);
                      }

                      var login = document.getElementById("login");
                      if (login.classList.contains("active")) {
                        login.classList.replace("active", "inactive");
                        setTimeout(function() {
                          login.style.display = "none";
                        }, 350);
                      }
                      var targeted = document.getElementById("dashboard");
                      if (targeted.classList.contains("inactive")) {
                        targeted.style.display = "";
                        setTimeout(function() {
                          targeted.classList.replace("inactive", "active");
                        }, 750);
                      }
                    }
                    if (result.type == "failure") {
                      console.log(result);
                      var modal = document.getElementById("modal-content");
                      modal.innerHTML = result.reason;
                      modal.style.display = "block";
                    }
                  });
                });
              }
            }
            function logout(e) {
              document.cookie =
                "fastur=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            }
            function register(e) {
              e.preventDefault();
              {
                var type = document.getElementById("register-type").value;
                var name = document.getElementById("register-name").value;
                var email = document.getElementById("register-email").value;
                var password = document.getElementById("register-password")
                  .value;
                var label = {
                  type: type,
                  name: name,
                  email: email,
                  password: password,
                  time: Date.now()
                };
                fetch("/", {
                  method: "post",
                  mode: "no-cors",
                  body: JSON.stringify(label)
                }).then(function(response) {
                  var decoder = new TextDecoder();
                  var reader = response.body.getReader();
                  reader.read().then(function processResult(result) {
                    if (result.done) return;
                    var result = decoder.decode(result.value, {
                      stream: true
                    });
                    console.log(result);
                    //var Result = JSON.parse(result)
                  });
                });
              }
            }
          });
        });
      } else {
        var targets = document.querySelectorAll("*");
        for (var target of targets) {
          target.addEventListener("dragstart", lib.dragStart, false);
          target.addEventListener("dragover", lib.dragOver, false);
          target.addEventListener("drop", lib.dragDrop, false);
          target.addEventListener("mousemove", function(e) {
            var position = e.pageX + " " + e.pageY + " " + new Date().getTime();
            document.getElementById("uin").placeholder = position;
          });
          target.addEventListener("click", function(e) {
            e.preventDefault();
            lib.menu(e);
          });
        }

        var contents = document.querySelectorAll("[contenteditable=true]");
        [].forEach.call(contents, function(content) {
          content.addEventListener("focus", function() {
            content.setAttribute("data-in", content.innerHTML);
          });
          content.addEventListener("blur", function() {
            if (content.getAttribute("data-in") !== content.innerHTML) {
              var a = lib.typed || [];
              a.push({
                id: content.id,
                time: Date.now(),
                value: content.innerHTML
              });
              lib.typed = a;
            }
          });
        });
      }
    };
    lib.touch = function(e) {
      //e.preventDefault()
      if (e.type == "touchmove") {
        var obj = document.getElementById(e.target.id);
        if (e.targetTouches.length == 1) {
          var touch = e.targetTouches[0];
          // Place element where the finger is
          obj.style.left = touch.pageX + "px";
          obj.style.top = touch.pageY + "px";
        }
      }
      for (var drop of drops) {
        if (drop) {
          document.getElementById(drop).classList.remove("hovered");
          drops = [];
        }
      }
      drops.push(e.target.id);
      e.target.classList.add("hovered");
    };
    lib.dragStart = function(e) {
      lib.draggedhtml = e.srcElement.outerHTML;
      e.target.style.opacity = "0.2";
      lib.draggedid = e.target.id;
      e.stopPropagation();
    };
    lib.dragOver = function(e) {
      e.stopPropagation();
      e.preventDefault();
      function Path(e) {
        var path = [];
        while (e) {
          path.push(e.className);
          if (e.tagName === "HTML") {
            return path;
          }
          e = e.parentElement;
        }
      }

      if (Path(e.target)) {
        if (
          Path(e.target)
            .join(" ")
            .indexOf("uform") !== -1
        ) {
        } else {
          for (var drop of lib.drops) {
            if (drop) {
              document.getElementById(drop).classList.remove("hovered");
              lib.drops = [];
            }
          }
          lib.drops.push(e.target.id);
          e.target.classList.add("hovered");
        }
      }
    };
    lib.dragDrop = function(e) {
      console.log(e);
      for (var drop of lib.drops) {
        if (drop) {
          document.getElementById(drop).classList.remove("hovered");
          drops = [];
        }
      }
      lib.drop = e.target.id;
      if (lib.draggedid) {
        lib.menu("add");
      }
      e.stopPropagation();
      e.preventDefault();
    };
    lib.loadDB = function(e) {
      if (window.location.href.split("edit?")[1]) {
        var id = window.location.href.split("edit?")[1];
        fetch("/assets/" + id + ".json", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            lib.value = JSON.parse(j);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        var array = [
          {
            type: "dashdata",
            cookie: lib.cookie("fastur"),
            time: Date.now()
          },
          {
            type: "news",
            cookie: lib.cookie("fastur"),
            time: Date.now()
          }
        ];
        fetch("/", {
          method: "post",
          mode: "no-cors",
          body: JSON.stringify(array[0])
        }).then(function(response) {
          var decoder = new TextDecoder();
          var reader = response.body.getReader();
          reader.read().then(function processResult(result) {
            if (result.done) return;
            var result = decoder.decode(result.value, {
              stream: true
            });
            localStorage.fasturaccount = result;
            result = JSON.parse(result);
            if (result.type == "success") {
              var loginButton = document.getElementById("login-button");
              if (loginButton) {
                loginButton.innerText = "logout";
                loginButton.href = "/logout";
                loginButton.addEventListener(
                  "click",
                  function() {
                    localStorage.clear();
                  },
                  false
                );
              }
              var registerButton = document.getElementById("register-button");
              if (registerButton) {
                registerButton.innerText = "account";
                registerButton.href = "#account";
              }

              var data = JSON.parse(result.data);
              for (var i = 0; i < data.length; i++) {
                var dashboard = document.getElementById("dashboard");
                var item =
                  "<div class='half'><div class='item left'><a href='edit?" +
                  data[i].uid +
                  "' class='element'>" +
                  data[i].subname +
                  "</a></div><div class='item right'><img id='simple' class='item right' width='50%' height=''  src='https://code.fastur.com/assets/" +
                  data[i].subname +
                  ".png'></div></div>";
                if (dashboard) {
                  dashboard.insertAdjacentHTML("beforeend", item);
                }
              }

              var plans = data.stripe;
              console.log(plans);
              //var stripe = Stripe(plans);
            }
            if (result.type == "failure") {
              var modal = document.getElementById("modal-content");
              modal.innerHTML = result.reason;
              var Btn = document.getElementById("myBtn");
              Btn.click();
            }
          });
        });
      }
      if (!lib.value) {
        var elements = [
          {
            type: "site",
            title: "X",
            description: "a production ready template for building the web",
            tag: "div",
            element: "element",
            name: "main",
            display: "none;",
            container: "container",
            id: "home",
            class: "main",
            color: "white",
            gaid: "UA-110802733-3",
            align: "center",
            colWidth: "30",
            colNum: "1",
            colSpace: "0",
            background:
              " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
            urlbg: "url('${background}');",
            items: [
              {
                name: "FASTUR",
                href: "",
                class: "maintext",
                id: "html",
                background: "yellow",
                tag: "p",
                type: "html"
              },
              {
                name: "New Site",
                href: "/edit?blank",
                class: "image",
                background: "white",
                src: "https://source.unsplash.com/400x250/?work",
                id: "pagebody",
                width: "90%",
                type: "body",
                tag: "img"
              }
            ]
          },
          {
            tag: "div",
            element: "element",
            name: "uform",
            align: "center",
            display: "block",
            container: "container",
            id: "uform",
            class: "uform",
            items: [
              {
                id: "uin",
                tag: "input",
                class: "input",
                type: "button"
              },
              {
                href: "#uform",
                id: "myBtn",
                name: "uform",
                tag: "a",
                class: "element",
                ishidden: "display:none;",
                type: "special"
              },
              {
                id: "uform-ul",
                name: "",
                edit: "false",
                tag: "ul",
                class: "input",
                type: "special"
              }
            ]
          }
        ];
        try {
          var elements = JSON.parse(elements);
        } catch (e) {}
        lib.value = elements;
      }
    };
    lib.loadDB();

    if (window.location.href == "https://code.fastur.com/code") {
      uin.addEventListener("focus", function(e) {
        lib.menu("editormenu");
      });

      window.changes = 0;
      window.onload = function(event) {
        fetch("/api", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            var CM = CodeMirror(document.body, {
              value: j,
              mode: "javascript",
              lineNumbers: true,
              matchBrackets: true,
              theme: "darcula",
              lineWrapping: true,
              extraKeys: {
                "Ctrl-Q": function(cm) {
                  cm.foldCode(cm.getCursor());
                }
              },
              foldGutter: true,
              gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
              highlightSelectionMatches: true
            });
            window.commitpath = "server";
            window.CM = CM;
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });
            editor.on("change", function(cm, change) {
              window.changes = 1;
            });
          })
          .catch(error => {
            console.log(error);
          });
      };
      setInterval(function() {
        if (window.changes == 1) {
          lib.menu("editorpublish");
          window.changes = 0;
        }

        if (window.parent.iframetwoname) {
          var a = window.parent.iframetwoname.document.body.innerHTML.indexOf(
            "502 Bad Gateway"
          );
        }

        if (a == 13) {
          window.parent.iframetwoname.location.reload();
        }
      }, 3000);
    } else {
      lib.control();
    }
    //console.clear()
  }

  var body = "";
  var t = "";
  var d = "";
  var num = 0;
  var cssd = "";
  for (var element in elements) {
    var b = elements[element];
    var data = "";
    var form = "";
    var _break;
    var items = b.items;
    var gaid = b.gaid;
    var br = "";
    num = num + 1;

    if (action == "edit") {
      b.display = "block";
      b.isdrag = "true";
      b._break =
        "<div id='break-" +
        b.id +
        "' draggable='true' class='strike'> <span id='break-" +
        b.id +
        "'>#" +
        b.id +
        "</span> </div>";
    }
    if (action == "edit" && b.animation == "inner inactive") {
      b.animation = "inner active";
    }
    if (b.class == "inner inactive") {
      b.animation = "inner active";
    }
    if (num == 1 && action == "edit") {
      b.display = "block";
      b.isdrag = "false";
      b._break = "";
    }
    if (num == elements.length) {
      b._break = "";
      //b.display = "none";
    }

    for (var item in items) {
      var c = items[item];
      var text = "";
      var btn = "";
      var inp = "";
      var image = "";
      if (num !== 1 && action == "edit" && c.tag == "a") {
        c.tag = "span";
        c.edit = "true";
      }
      if (
        action == "edit" &&
        (c.tag == "p" || "h1" || "h1" || "h3" || "h4" || "h5")
      ) {
        c.edit = "true";
        c.drag = "true";
      }

      if (action == "edit") {
        c.top = "0";
      }

      if (c.type == "form" && c.br == true) {
        br = "<br>";
      }
      if (c.type == "body") {
        cssd += ` 
@media only screen and(max-width: 400px) {
      body { 
  overscroll-behavior: none;

          background-color: ${c.mobile};
      }
  }
   
  @media only screen and (min-width: 401px) and (max-width: 960px) {
      body {
  overscroll-behavior: none;

          background-color: ${c.tablet};
      } 
  }    

  @media only screen and (min-width: 961px) { 
      body { 
  overscroll-behavior: none;

          background-color: ${c.desktop}; 
      }
  }  


  body {  
	  overflow-y:hidden
   	  touch-action: none;
  	  overscroll-behavior: none;
      min-width: $ {
          (colWidth+colSpace) * colNum
      }
      px;
      font-family: Arial,
      Helvetica,
      sans-serif;
      margin-top: var (--space);
      margin: auto;
      top: 25px;
      right: 0;
      bottom: 0; 
      left: 0;
  width: ${c.width};
      border-radius: 3px; 
      opacity:1;
      animation: fadein 1s;
      background-image: ${c.background};
	  /* height: 25%; width: 75%; parallax effect */ 
	  background-attachment: fixed;
      background-position: center; 
      background-size:  100% 100%;
  }


  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  }  



      .strike {
          display: block;
          text-align: center;
          overflow: hidden;
          white-space: nowrap; 
      }

      .strike > span {
          position: relative;
          display: inline-block;
      }

      .strike > span:before,
      .strike > span:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 9999px;
          height: 1px;
          background: red;
      }

      .strike > span:before {
          right: 100%;
          margin-right: 15px;
      }

      .strike > span:after {
          left: 100%;
          margin-left: 15px;
      }

  `;
      }
      if (c.type == "html") {
        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

  `;
      }
      if (c.type == "image") {
        image +=
          "<" +
          c.tag +
          "  id='" +
          c.id +
          "' class='" +
          c.class +
          "' width='" +
          c.width +
          "' height='" +
          c.height +
          "'   src='" +
          c.src +
          "'></" +
          c.tag +
          ">";
        cssd += ` 

  #${c.id} {  
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor}; 
    border-radius: 5px;
    opacity: 0.8;
  }    

  `;
      }
      if (c.type == "imaged") {
        image +=
          "<div class='device-collection'> <div class='phone-container'> <div class='device phone'> <img  id='phoneimage' src='" +
          c.src +
          "'> </div> </div> <div class='tablet-container'> <div class='device tablet'> <img id='tabletimage' src='" +
          c.src +
          "'> </div> </div> <div class='device desktop'> <img  id='desktopimage' src='" +
          c.src +
          "'> </div> </div>";
        cssd += ` 

  #${c.id} {  
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor}; 
  } 
.device {
  border-radius: 20px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  box-shadow: inset 0 4px 7px 1px #fff,
    inset 0 -5px 20px rgba(173, 186, 204, .25),
    0 2px 6px rgba(0, 21, 64, .14),
    0 10px 20px rgba(0, 21, 64, .05);
}

.device img {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .24);
}

.device::before,
.device::after {
  content: "";
  display: block;
  position: absolute;
  background: #fff;
  box-shadow: inset 0 4px 7px 1px #fff,
    inset 0 -5px 20px rgba(173, 186, 204, .25),
    0 2px 6px rgba(0, 21, 64, .14),
    0 10px 20px rgba(0, 21, 64, .05);
}

.phone {
  padding: 12% 3%;
}

.phone.landscape {
  padding: 1.75% 8%;
}

.tablet {
  padding: 8% 2%;
}

.tablet.landscape {
  padding: 1.12% 6%;
}

.laptop {
  margin-left: 12%;
  margin-right: 12%;
  margin-bottom: 2.5%;
  border-radius: 1vw;
  padding: 1.35%;
}

.desktop {
  margin-bottom: 11%;
  border-radius: 1vw;
  padding: 1.5%;
}

// Phone button
.phone::after {
  border-radius: 50%;
  margin: 0 auto 2%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 10%;
  height: 0;
  padding-top: 10%;
  box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, .12);
}

.phone.landscape::after {
  margin: auto 0;
  left: calc(100% - 7%);
  top: 0;
  bottom: 0;
  width: 6%;
  padding-top: 6%;
}

// Phone speaker
.phone::before {
  border-radius: 50px;
  margin: 5.5% auto 0;
  left: 0;
  right: 0;
  top: 0;
  width: 20%;
  height: 1%;
  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, .12);
}

.phone.landscape::before {
  margin: auto 0 auto 4.5%;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1%;
  height: 20%;
}

// Tablet button
.tablet::after {
  border-radius: 50%;
  margin: 0 auto 2%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 6%;
  height: 0;
  padding-top: 6%;
  box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, .12);
}

.tablet.landscape::after {
  margin: auto 0;
  left: calc(100% - 5.25%);
  top: 0;
  bottom: 0;
  width: 4.5%;
  padding-top: 4.5%;
}

// Tablet camera
.tablet::before {
  border-radius: 50%;
  margin: 3.5% auto 0;
  left: 0;
  right: 0;
  top: 0;
  width: 2.25%;
  height: 0;
  padding-top: 2.25%;
  background: #eee;
  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, .12);
}

.tablet.landscape::before {
  margin: auto 0 auto 2.5%;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1.75%;
  padding-top: 1.75%
}

// Bottom of laptop
.laptop::after {
  border-radius: 4px 4px 48px 48px;
  left: -15%;
  bottom: -4%;
  width: 130%;
  height: 7%;
}

// Desktop arm
.desktop::before {
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -18%;
  width: 20%;
  height: 20%;
  background: #fafafa;
  z-index: -1;
}

// Bottom of desktop stand
.desktop::after {
  border-radius: 4px 4px 24px 24px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -19.5%;
  width: 34%;
  height: 2%;
}

// Phone, tablet, and desktop together
.device-collection {
  width: 100%;
  position: relative;
}

.device-collection::after {
  content: "";
  display: block;
  padding-top: 62.75%;
}

.device-collection .phone-container,
.device-collection .tablet-container,
.device-collection .desktop {
  position: absolute;
  bottom: 0;
}

.device-collection .phone,
.device-collection .tablet {
  margin: 0;
}

.device-collection .phone-container {
  left: 0;
  max-width: 15%;
  z-index: 2;
}

.device-collection .tablet-container {
  right: 0;
  max-width: 30%;
  z-index: 1;
}

.device-collection .desktop {
  left: 0;
  right: 0;
  margin: 0 5% 10.25%;
}
 
@media (max-width: 800px) {
  .device-collection .device {
    border-radius: 1vw;
  }
}


// Page layout
body {
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

.device-collection {
  max-width: 100%;
  margin: 40px;
}

/* General layout and typography stuff */
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400");

* {
  box-sizing: border-box;
  position: relative;
  transition: all .3s ease
}

html {
  font-size: 16px
}

body {
  font-family: Open Sans, Verdana, sans-serif;
  color: rgba(0, 0, 0, .87);
  font-weight: 400;
  line-height: 1.45
}

body,
header {
  background: #fafafa
}

header {
  padding: 40px;
  min-height: 200px;
  text-align: center;
  color: rgba(0, 0, 0, .87)
}

header > * {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto
}

header>:last-child {
  margin-bottom: 0
}

h1 {
  margin-bottom: 0.5em;
  font-weight: inherit;
  line-height: 1.2;
  color: #1c5b72;
  font-size: 2.618em
}

@media (min-width:800px) {
  h1 {
    font-size: 4.236em;
    font-weight: 300
  }
}

p {
  margin-bottom: 1.3em;
  line-height: 1.618
}

@media (min-width:800px) {
  p {
    font-size: 1.3em
  }
}

a {
  color: #e03616;
  text-decoration: none
}`;
      }
      if (c.type == "imagelink") {
        image +=
          "<div class='half'><div class='item left'><" +
          c.tag +
          " href='" +
          c.href +
          "' class='element'>Edit " +
          c.name +
          "</" +
          c.tag +
          "></div><div class='item right'><img  id='" +
          c.id +
          "' class='" +
          c.class +
          "' width='" +
          c.width +
          "' height='" +
          c.height +
          "' src='" +
          c.src +
          "'></img></div></div>";
        cssd += `  

  #${c.id} {  
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  }     
  `;
      }
      if (c.type == "input") {
        inp +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "' contenteditable='" +
          c.edit +
          "'  type='" +
          c.formtype +
          "' style='" +
          c.ishidden +
          "' placeholder='" +
          c.placeholder +
          "' " +
          (c.disabled || "") +
          "></" +
          c.tag +
          ">";
        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

  `;
      }
      if (c.type == "StripeSimple") {
        inp +=
          "<br><form draggable='" +
          c.drag +
          "' data-stripe='" +
          c.stripe +
          "'  id='form-" +
          c.id +
          "'><" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "' contenteditable='" +
          c.edit +
          "'  type='" +
          c.formtype +
          "' style='" +
          c.ishidden +
          "' placeholder='" +
          c.placeholder +
          "' " +
          (c.disabled || "") +
          "> <br> <p id='" +
          c.buttonid +
          "' class='" +
          c.buttonclass +
          "' contenteditable='" +
          c.edit +
          "' style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.buttonname || "") +
          "</p>" +
          "</form>";

        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  }  `;
      }
      if (c.type == "button") {
        btn +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "' contenteditable='" +
          c.edit +
          "' autocomplete='" +
          (c.ac || "off") +
          "' style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";

        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
      border-radius: 2.5px;
      display: inline-block;
      border: none;
      margin: 10px;
      text-decoration: none;
      font-family: sans-serif;
      font-size: 1rem;
      cursor: pointer;
      transition: background 250ms ease-in-out, transform 150ms ease;
      appearance: none;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      outline: 1px solid #0069ed;
  } 

  #${c.id}:hover {
  background-color:  ${c.hover};  
  }
  
  #${c.id}:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
  }

  #${c.id}:active {
      transform: scale(0.99);
  }`;
      }
      if (c.type == "table") {
        btn +=
          "<div class='table'> <ul> <li class='li1'> <div class='top' > <p>Pro 10</p> </div> <div class='bottom'> <p>1 Site</p> <p>Analytics</p> <p> Stripe Payments </p> <p>Custom Domains</p> <a href='" +
          c.href +
          "' class='" +
          c.class +
          "' >" +
          c.a +
          " </a> </div>  </li> <li class='li2'> <div class='top'> <p>Pro 30</p> </div> <div c 'bottom'> <p>3 Sites</p>  <p>Analytics</p> <p>Stripe Payments</p> <p>Custom Domains</p> <a  href='" +
          c.href1 +
          "' class='" +
          c.class +
          "'  >" +
          c.a1 +
          " </a> </div> </li> <li class='li3'> <div class='top purple '> <p>Pro 100</p></div> <div class='bottom'> <p>50 Sites</p> <p>Analytics</p> <p>Stripe Payments</p> <p>Custom Domains</p> <a  href='" +
          c.href2 +
          "' class='" +
          c.class +
          "'  >" +
          c.a2 +
          " </a> </div> </li>  </ul> </div>";
        cssd += ` 
 
.payform {   
width: 100%; 
}  
 
.row { 
display: block;
width: 100%;
}

  .${c.class} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
      border-radius: 2.5px;
      display: inline-block;
      border: none;
      margin: 10px;
      text-decoration: none;
      font-family: sans-serif;
      font-size: 1rem;
      cursor: pointer;
      transition: background 250ms ease-in-out, transform 150ms ease;
      appearance: none;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      outline: 1px solid #0069ed;
  } 

 .${c.class}:hover {
  background-color:  ${c.hover};  
  }
  
  .${c.class}:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
  }

  .${c.class}:active {
      transform: scale(0.99);
  }   

  .table ul li:hover {
  background-color:  ${c.hover};  
      outline: 3px solid #0069ed;
padding:3px;

  }
  .table ul li:active { 
  background-color: blue;  
      outline: 3px solid red;

  }

.table { 
  background-color: ;  
  height:325px;
  width:100%;  
}  
  .table ul li {
  float:left; 
  width: 32%;
  text-align:center; 
  border-left:1px solid #DDDCD8;  
    list-style-type: none;
}

.top { 
  background-color: ghostwhite;
  height:70px;
} 
 
.bottom {
margin-top:30px;
  p {
     font-size:13px;
     font-family: 'Droid Serif', sans-serif;
     padding:5px;
    span {
     font-weight:bold; 
    }
  }
} 
  `;
      }
      if (c.type == "modal") {
        btn +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "'  style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";
        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 


  .modal {display: none; position: fixed; z-index: 1000; width: 100%; height: 100%; overflow: scroll; margin: auto; padding: 10px; top: 0px; left: 0px;}

  .modal-content { display:inline-block; background-color: #fdfdfd; list-style-type: none; opacity: .85; cursor: pointer; padding: 10px;  margin-top: 15em; border-radius:10px; }

  `;
      }
      if (c.type == "special") {
        btn +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "'  style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";

        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

#uform-ul {   
    list-style-type: none;
    opacity: .85;
    cursor: pointer;
    padding: 0; 
    margin: 0;
  }

  #uform-ul li a { 
    background-color: #fdfdfd;  
    padding: 5px; 
    text-decoration: none;  
    color: black;  
    display: block; 
  }
  #uform-ul li a:hover {
    background-color: #3d3d3d;  
    padding: 5px; 
    text-decoration: none;  
    color: white;  
    display: block; 
  }

  .uform { 
      position: fixed;
      right: 0;
      top: ${c.top};    
      padding: 25px;
   z-index: 10; 
  }  

  `;
      }
      if (c.type == "text") {
        text +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "' draggable='" +
          c.drag +
          "' contenteditable='" +
          c.edit +
          "' style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";

        cssd += ` 
  #${c.id} { 
    text-align: ${c.align}; 
	background-color:${c.background}; 
	color:${c.textcolor};
	height:${c.height};  
    font-size: ${c.size}; 
    display: ${c.display};
    font-family: ${c.family}; 
    font-weight: ${c.weight};
  }

  `;
      }
      if (c.type == "form") {
        form +=
          "<" +
          (c.tag || "div") +
          " id='" +
          c.id +
          "' name=" +
          c.name +
          "'  class='" +
          c.class +
          "' type='" +
          c.formtype +
          "' value='" +
          (c.value || "") +
          "'  style='" +
          c.ishidden +
          "' placeholder='" +
          c.placeholder +
          "'>" +
          br;

        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

  `;
      } else {
        data += image || btn || inp || text;
      }
    }

    function CSS(b) {
      var str = "";

      str += ` 

  span[draggable=true]:hover {
      outline: 1px dashed blue;
  }
  div[draggable=true]:hover {
      outline: 1px dashed blue;
  } 
  .fill { 
    cursor: pointer;
  }
  .droptarget {
    background-color: #f4f4f4;
    border-style: dashed;
   }
  .hold {
    border: 4px green solid;
  }
  .hovered {
    border-bottom: 4px green solid;

  }
  .focused {
    border:2px solid red;

  }
  .invisible {
    display: none;
  }

  [contenteditable]:focus {
      outline: 0px solid transparent;
  } 
  input {
      display: inline-block;
      box-sizing: border-box;
      outline: none;
      border: 1px solid lightgray;
      border-radius: 3px;
      padding: 10px 10px 10px 10px;
      transition: all 0.1s ease-out;
      opacity: .85;
      margin: 5px;
  }

  textarea {
      width: 50%;
      min-width: 50px; 
      border: none;
      opacity: .5;
      overflow: auto;
      outline: none;
      -webkit-box-sizing: none;
      -moz-box-sizing: none;
      box-sizing: none;
      border-radius: 20px;
      margin-top: 10px;
  } 
  div {
      padding-top: 5px;
      padding-right: 5px;
      padding-bottom: 5px;
      padding-left: 5px;
      transition: all 0.5s linear;
  }  
  p {
      padding: 5px; 
	  margin: 5px; 
      transition: all 0.5s linear;
  }  

  .inner {
      overflow: auto;
      background: #ffffff3d;
      border-radius: 10px;
      margin: 15px;
      text-decoration: none;
  }

  @-webkit-keyframes sk-scaleout {
      0% {
          -webkit-transform: scale(0)
      }
      100% {
          -webkit-transform: scale(1.0);
          opacity: 0;
      }
  }
  @keyframes sk-scaleout {
      0% {
          -webkit-transform: scale(0);
          transform: scale(0);
      }
      100% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
          opacity: 0;
      }
  }
  @keyframes fade {
      0% {
          opacity: 0;
      }
      66% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }
  .fade {
      transition: opacity 0.7s linear;
  }
  .inactive {
      opacity: 0;
  }
  .active { 
      opacity: 1;
  }
 
#color-label {
  margin-left: 1px;
  position: absolute;
  height: 30px;
  width: 50px;
}  
#color-picker-no {
  background-color: white; 
  border: solid 1px #ccc;
}
canvas:hover {
  cursor: crosshair;
}
.container { 
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* fraction*/
}
.dimension {
  display: grid;
  grid-template-columns: 1fr 1fr; /* fraction*/ 
}

.dimension input {
width: 80px;    
padding: 5px 5px 5px 5px;

}
a {
  position: relative;
}
a::after {
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} 
a > svg {
  pointer-events: none;
}     
  `;
      return str;
    }
    function cssgen(b) {
      cssd += ` 
  #${b.id} {   
	text-align: ${b.align};
	background-color:${b.background};
    outline: ${b.outline};
    draggable: ${b.isdrag};
  } 

  `;
    }
    cssgen(b);

    if (num == 1) {
      t = "<title>" + b.title + "</title>";
      d = "<meta name='description' content='" + b.description + "'>";
      var css = CSS(b);
    }

    var isform = "";
    if (b.secondarytag == "form") {
      if (action == "edit") {
        b.drag = "true";
      }

      isform +=
        "<" +
        (b.secondarytag || "div") +
        " " +
        (b.secondaryp || "") +
        " draggable='" +
        b.drag +
        "'  id='form-" +
        b.id +
        "' >" +
        (form || "") +
        "</" +
        (b.secondarytag || "div") +
        ">";
    }
    if (b.id == "uform") {
      b.isdrag = "";
    }

    body +=
      (b._break || "") +
      "<" +
      b.tag +
      " id='" +
      b.id +
      "' style=' display:" +
      b.display +
      "' class='" +
      (b.class || b.animation) +
      "' data-action='1'>" +
      (isform || "") +
      (data || "") +
      "</" +
      (b.tag || "") +
      ">";
  }
  if (action == "client") {
    var standard = body;
  } else {
    var standard =
      "<!DOCTYPE html id='page'><head>" +
      t +
      d +
      "<style>" +
      css +
      cssd +
      "</style><link type='image/png' rel='shortcut icon' href='assets/ico.png'></head><body id='pagebody' data-editor='" +
      action +
      "'>" +
      body +
      "</body><script src='https://js.stripe.com/v3'></script><script src='https://code.fastur.com/api2'></script><script>render()</script></html>";
  }
  return standard;
}

function movie(dream) {
  var q = "19 21 2 18 15 21 20 9 14 5";

  function saveImage() {
    var http = require("http"),
      Stream = require("stream").Transform,
      fs = require("fs");

    var url =
      "http://cdn.glitch.com/95cf7373-1dad-4956-a5c0-a8f8cbaad244%2Fsun.jpg";

    http
      .request(url, function(response) {
        var data = new Stream();

        response.on("data", function(chunk) {
          data.push(chunk);
        });

        response.on("end", function() {
          fs.writeFileSync("sun.png", data.read());
          console.log("finished");
          console.log("finished");
        });
      })
      .end();
  }
  //saveImage()

  function ForEachPage($) {}
  //ForEachPage

  async function puppet(url, input, q, waitFor, links) {
    const fs = require("fs");
    const puppeteer = require("puppeteer");
    const path = require("path");
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.type(input, q);

      page.keyboard.press("Enter");
      await page.waitForSelector(waitFor);

      function getText(linkText) {
        linkText = linkText.replace(/\r\n|\r/g, "\n");
        linkText = linkText.replace(/\ +/g, " ");

        // Replace &nbsp; with a space
        var nbspPattern = new RegExp(String.fromCharCode(160), "g");
        return linkText.replace(nbspPattern, " ");
      }

      var Links = [];
      if (links) {
        const links = await page.$$("div.r");
        for (var i = 0; i < links.length; i++) {
          let valueHandle = await links[i].getProperty("innerText");
          let linkText = await valueHandle.jsonValue();
          const text = getText(linkText);
          console.log(linkText);
          Links.push(linkText);
          if (q == text) {
            console.log("Found " + text);
            await links[i].click();
          }
        }
      }
      var data = require("fs").readFileSync("sun.json", "utf8");
      var json = JSON.parse(data);

      var result = JSON.parse(data).find(obj => {
        return obj.query === dream;
      });

      if (result) {
      } else {
        json.push({
          links: Links,
          time: Date.now()
        });
        require("fs").writeFileSync("sun.json", JSON.stringify(json));
      }

      await page.setViewport({
        width: 800,
        height: 1000
      });
      await page.screenshot({
        path: path.join(__dirname, "./public/" + q + ".png")
      });
      await browser.close();
    } catch (error) {
      console.log(error);
    }
    console.log("Puppet finished!");
  }
  //puppet("https://google.com","input.gLFyf.gsfi","dream","div#resultStats","links")
  //puppet(url,"input.gLFyf.gsfi",q,"div#resultStats") 

  function allLanguageList($) {}
  allLanguageList()

  function translate($) {}
  translate()

  function run(a) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    function cap(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    var https = require("https");
    https.get(
      {
        host: "en.wikipedia.org",
        port: 443,
        path: "/wiki/" + a
      },
      function(response) {
        var body = "";
        response.on("data", function(data) {
          body += data;
        });
        response.on("end", function() {
          function filterLinks(links) {
            const filtered = [];
            const ignoredWords = [
              "/",
              "disambiguation",
              "doi",
              "Article",
              "Wikipedia indefinitely semi-protected pages",
              "Wikidata",
              "Wikipedia",
              "Certification Table Entry"
            ];
            const ignoredLinks = [
              "Special:Search",
              "Help:",
              "Wikipedia:Verifiability"
            ];
            for (let i = 0; i < links.length; ++i) {
              const text = links[i].title;
              const link = links[i].href;
              // removes lots of strange articles
              if (text.length < 2) {
                continue;
              }
              // get rid of all numbers (for now)
              if (text.match(/\d+/g) !== null) {
                continue;
              }
              // avoid things like User:This_Person
              if (text.match(/\w:\w/g) !== null) {
                continue;
              }
              if (link.match(/\w:\w/g) !== null) {
                continue;
              }
              let skip = false;
              // skip all ignored text and links
              for (let j = 0; j < ignoredWords.length; j++) {
                if (text.includes(ignoredWords[j])) {
                  skip = true;
                }
              }
              for (let j = 0; j < ignoredLinks.length; j++) {
                if (link.includes(ignoredLinks[j])) {
                  skip = true;
                }
              }
              if (skip) {
                continue;
              }
              // make sure they aren't weird editor notes
              if (links[i].outerHTML.includes("<i")) {
                continue;
              }
              // make sure href leads to wikipedia page
              if (!link.includes("/wiki/")) {
                continue;
              }
              // lastly, make sure item doesn't exist already
              for (let j = 0; j < filtered.length; j++) {
                if (text === filtered[j].text) {
                  skip = true;
                  break;
                }
              }
              if (skip) {
                continue;
              }

              let item = { text: text, href: link };
              filtered.push(item);
            }
            console.log("number of articles: ", filtered.length);
            return filtered;
          }
          let filtered = [];
          const dom = new JSDOM(body);
          let all = dom.window.document.querySelectorAll("p");
          var page = "";
          for (var entry in all) {
            page += all[entry].textContent;
          }

          function count(sentence) {
            function numerate(a) {
              var result = "";
              for (var i in a) {
                var b = a[i].toLowerCase().charCodeAt(0) - 96;
                result += b;
                result += " ";
              }
              return result;
            }

            var list = sentence.split(" ");
            var words = {};
            for (var i = 0; i < list.length; i++) {
              var word = list[i];

              if (words.hasOwnProperty(word)) {
                var one = words[word].count + 1;
                words[word] = {
                  count: one,
                  word: word,
                  index: numerate(word)
                };
              } else {
                words[word] = {
                  count: 1,
                  word: word,
                  index: numerate(word)
                };
              }
            }
            return words;
          }

          var count = count(page);

          var percentage = count / page.length;

          var values = Object.values(count);

          var sort_by = function(field, reverse, primer) {
            var key = primer
              ? function(x) {
                  return primer(x[field]);
                }
              : function(x) {
                  return x[field];
                };
            reverse = !reverse ? 1 : -1;
            return function(a, b) {
              return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
            };
          };
          values.sort(sort_by("count", true, parseInt));

          var data = require("fs").readFileSync("sun.json", "utf8");
          var json = JSON.parse(data);

          var result = JSON.parse(data).find(obj => {
            return obj.query === a;
          });

          if (result) {
          } else {
            json.push({
              query: a,
              string: page,
              counts: values,
              time: Date.now()
            });
            require("fs").writeFileSync("sun.json", JSON.stringify(json));
          }
        });
      }
    );
  }
  run("Abcdefghijklmnopqrstuvwxyz");

  function resize() {
    const sharp = require("sharp");

    let inputFile = "sun.jpg";
    let outputFile = "Sun.jpg";

    sharp(inputFile)
      .resize({ width: 1040 })
      .toFile(outputFile)
      .then(function(newFileInfo) {
        console.log("Success");
      })
      .catch(function(err) {
        console.log("Error occured");
      });
  }
  //resize()

  function gif(a, b) {
    const GIFEncoder = require("gifencoder");
    const { createCanvas } = require("canvas");
    const fs = require("fs");

    const encoder = new GIFEncoder(600, 800);
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream(a + ".gif"));

    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(500); // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.

    // use node-canvas
    const canvas = createCanvas(320, 240);
    const ctx = canvas.getContext("2d");
    function getColor() {
      //var url = process.env.PROJECT_DOMAIN + '.glitch.me'
      //mirror public/query.png or q-query.png

      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    /*white rectangle
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 320, 240);
  encoder.addFrame(ctx);*/

    function encode(amount) {
      for (var y = 0; y < amount; y++) {
        for (let i = 0; i < 12; i++) {
          for (let j = 0; j < 12; j++) {
            ctx.fillStyle = getColor();
            ctx.fillRect(j * 25, i * 25, 25, 25);
          }
        }
        encoder.addFrame(ctx);
      }
    }
    encode(b);

    encoder.finish();
    console.log("Gif Generator finished");
  }
  gif('sun',26);

  function extractFrames(image) {
    var gifFrames = require("gif-frames");
    var fs = require("fs");
    gifFrames(
      { url: image, frames: "0-26", outputType: "png", cumulative: true },
      function(err, frameData) {
        if (err) {
          throw err;
        }
        frameData.forEach(function(frame) {
          frame
            .getImage()
            .pipe(
              fs.createWriteStream("public/sun" + frame.frameIndex + ".png")
            );
        });
      }
    );
  }
  //extractFrames('sun.gif')

  function pixel(image, amount) {
    for (var y = 0; y < amount; y++) {
      var image = "public/" + image + y + ".png";

      function imageSize(image) {
        var sizeOf = require("image-size");
        var dimensions = sizeOf(image);
        return { width: dimensions.width, height: dimensions.height };
      }
      var size = imageSize(image);
      var width = size.width;
      var height = size.height;

      require("get-pixels")(image, function(err, pixels) {
        if (err) {
          console.log(err);
          return;
        }
        function get_pixels(x, y, pixels) {
          var out = [];
          var pointer =
            pixels.offset + pixels.stride[0] * x + pixels.stride[1] * y;
          for (var i = 0; i < 4; i++) {
            out.push(pixels.data[pointer + pixels.stride[2] * i]);
          }
          return out;
        }

        var pixelarray = [];
        for (var y = 0; y < width; y++) {
          for (var x = 0; x < height; x++) {
            var pixel = get_pixels(x, y, pixels);
            pixelarray.push(pixel);
          }
        }

        console.log(pixelarray);
      });
    }
  }
  //pixel('sun',26);

  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  //wait(1000);

  var url = process.env.PROJECT_DOMAIN + ".glitch.me";
  var url = ".glitch.me";
  function twitter_post($) {
    var Twitter = require("twitter");
    var client = new Twitter({
      consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
      consumer_secret: "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
      access_token_key: "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
      access_token_secret: "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
    });
    client.post(
      "statuses/update",
      {
        status: $
      },
      function(err, t, r) {
        if (!err) {
          console.log("r" + t + r);
        }
      }
    );
    console.log("Menu sent");
  }
  //twitter_post(url)

  var url = process.env.PROJECT_DOMAIN + ".glitch.me";
  function twitter_get($) {
    var Twitter = require("twitter");
    var client = new Twitter({
      consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
      consumer_secret: "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
      access_token_key: "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
      access_token_secret: "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
    });
    client.get(
      "search/tweets",
      {
        q: $
      },
      function(err, t, r) {
        var date = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        /*
      var arr = [].push({
        name: t.statuses[0].user.screen_name,
        date: t.statuses[0].created_at,
        text: t.statuses[0].text,
        url: t.statuses[0].user.url
      });*/
      }
    );
    console.log("message sent");
  }
  //twitter_get(url)

  function twitter_gif_post() {
    var bufferLength,
      filePath,
      finished,
      fs,
      oauthCredentials,
      offset,
      request,
      segment_index,
      theBuffer;

    request = require("request");
    fs = require("fs");
    filePath = "/thevideo.mp4";
    bufferLength = 1000000;
    theBuffer = new Buffer(bufferLength);
    offset = 0;
    segment_index = 0;
    finished = 0;
    oauthCredentials = {
      consumer_key: "",
      consumer_secret: "",
      token: "",
      token_secret: ""
    };

    fs.stat(filePath, function(err, stats) {
      var formData, normalAppendCallback, options;

      formData = {
        command: "INIT",
        media_type: "video/mp4",
        total_bytes: stats.size
      };
      options = {
        url: "https://upload.twitter.com/1.1/media/upload.json",
        oauth: oauthCredentials,
        formData: formData
      };

      normalAppendCallback = function(media_id) {
        return function(err, response, body) {
          finished++;
          if (finished === segment_index) {
            options.formData = {
              command: "FINALIZE",
              media_id: media_id
            };
            request.post(options, function(err, response, body) {
              console.log("FINALIZED", response.statusCode, body);

              delete options.formData;

              //Note: This is not working as expected yet.
              options.qs = {
                command: "STATUS",
                media_id: media_id
              };
              request.get(options, function(err, response, body) {
                console.log("STATUS: ", response.statusCode, body);
              });
            });
          }
        };
      };

      request.post(options, function(err, response, body) {
        var media_id;
        media_id = JSON.parse(body).media_id_string;

        fs.open(filePath, "r", function(err, fd) {
          var bytesRead, data;

          while (offset < stats.size) {
            bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
            data =
              bytesRead < bufferLength
                ? theBuffer.slice(0, bytesRead)
                : theBuffer;
            options.formData = {
              command: "APPEND",
              media_id: media_id,
              segment_index: segment_index,
              media_data: data.toString("base64")
            };
            request.post(options, normalAppendCallback(media_id));
            offset += bufferLength;
            segment_index++;
          }
        });
      });
    });
  }
  //twitter_gif_post()

  function shell($) {
    require("child_process").execSync($, (err, stdout, stderr) => {
      require("fs").writeFileSync("bash.json", screenstring);
    });
  }
  //shell(q)
}
//movie()

function library() {
    var elements = [
      {
        type: "site",
        title: "X",
        description: "a production ready template for building the web",
        tag: "div",
        element: "element",
        name: "main",
        display: "none;",
        container: "container",
        id: "main",
        class: "main",
        color: "white",
        gaid: "UA-110802733-3",
        align: "center",
        colWidth: "30",
        colNum: "1",
        colSpace: "0",
        background:
          " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
        urlbg: "url('${background}');",
        items: [
          {
            name: "FASTUR",
            href: "",
            class: "maintext",
            id: "html",
            background: "yellow",
            tag: "p",
            type: "html"
          },
          {
            name: "New Site",
            href: "/edit?blank",
            class: "image",
            background: "lightblue",
            src: "https://source.unsplash.com/400x250/?work",
            id: "pagebody",
            width: "90%",
            type: "body",
            tag: "img"
          }
        ]
      },
      {
        tag: "div",
        display: "display:block;",
        element: "element",
        name: "buttons",
        caps: "true",
        align: "center",
        animation: " active",
        id: "buttons",
        items: [
          {
            href: "#home",
            id: "home-button",
            name: "home",
            type: "button",
            tag: "a",
            background: "",
            hover: "pink",
            textcolor: "white",
            ishidden: "home",
            value: "home",
            class: "element",
            css: ""
          },
          {
            href: "#login",
            id: "login-button",
            name: "login",
            type: "button",
            tag: "a",
            background: "",
            hover: "pink",
            textcolor: "white",
            ishidden: "home",
            value: "home",
            class: "element",
            css: ""
          },
          {
            href: "#register",
            id: "register-button",
            name: "register",
            tag: "a",
            hover: "pink",
            ishidden: "",
            type: "button",
            textcolor: "white",
            class: "element",
            placeholder: "register"
          },
          {
            href: "#dashboard",
            id: "dashboard-button",
            name: "dashboard",
            tag: "a",
            hover: "pink",
            ishidden: "",
            type: "button",
            textcolor: "white",
            class: "element",
            placeholder: "dashboard"
          },
          {
            href: "#blog",
            id: "blog-button",
            name: "blog",
            tag: "a",
            hover: "pink",
            ishidden: "",
            textcolor: "white",
            type: "button",
            class: "element",
            placeholder: "blog"
          }
        ]
      },
      {
        tag: "div",
        secondarytag: "div",
        element: "element",
        name: "home",
        display: "block;",
        animation: "inner active",
        container: "container",
        caps: "true",
        href: "#home",
        color: "white",
        padding: "1em",
        align: "center",
        type: "page",
        id: "home",
        items: [
          {
            name: "build anything",
            href: "",
            color: "white",
            background: "none",
            opacity: ".5",
            back: "white",
            align: "center",
            display: "block",
            family: "calibri",
            size: "2.5em",
            weight: "bold",
            height: "30px",
            textcolor: "white",
            class: "maintext",
            id: "maintext",
            tag: "p",
            type: "text"
          },
          {
            href: "#dashboard",
            id: "start-button",
            name: "Get Started",
            tag: "a",
            size: "",
            hover: "pink",
            ishidden: "",
            textcolor: "white",
            background: "#0069ed",
            type: "button",
            class: "element"
          },
          {
            name: "devices",
            href: "",
            class: "image",
            background: "pink",
            src: "sun.gif",
            id: "New-Site",
            type: "imaged",
            tag: "img"
          },
          {
            title: "Commerce",
            name: "browser automation & JSON API",
            href: "Select",
            class: "tabled",
            background: "lightblue",
            hover: "pink",
            textcolor: "white",
            id: "pricing-table",
            src: "assets/blank.fastur.com.png",
            a: "Select",
            a1: "Select",
            a2: "Select",
            href1: "Select",
            href2: "Select",
            width: "5%",
            height: "",
            tag: "table",
            type: "table"
          }
        ]
      },
      {
        tag: "div",
        secondarytag: "div",
        element: "element",
        name: "blog",
        display: "none",
        animation: "inner active",
        container: "container",
        caps: "true",
        href: "#blog",
        color: "white",
        padding: "1em",
        align: "center",
        type: "page",
        id: "blog",
        items: [
          {
            name:
              "<b>Business Plan</b> <br>As a company we instigate faith. <br><br> <b>Problem:</b> Drag and drop site builders like Shopify, require a Screen, keyboard and mouse(pad) for operation, This makes them unavailable within mobile, voice, or gaming environments. <br> <br><b>Solution:</b> Use natural language as input. Offer an expert system. <br> <br>Our expert is C. C was taught about the world through the prism of God's eyes. <br><br><b>Market Size:<b> The current size of all internet companies combined.</b><br><br><b>Competition</b>: weak<br><br><br>To Do</b>: learn how to code, learn how to generate gifs",
            href: "",
            class: "subtext",
            id: "",
            tag: "p",
            type: "text"
          }
        ]
      },
      {
        tag: "div",
        secondarytag: "form",
        secondaryp: " action='/' method='post'",
        element: "element",
        name: "login",
        animation: "inner inactive",
        display: "none",
        container: "container",
        caps: "true",
        href: "#login",
        color: "white",
        background: "",
        align: "center",
        padding: "1em",
        id: "login",
        type: "form",
        link: "register",
        title: "Login",
        items: [
          {
            name: "login",
            type: "form",
            tag: "input",
            formtype: "hidden",
            br: true,
            ishidden: "login",
            value: "login",
            class: "blank",
            id: "login-type"
          },
          {
            name: "email",
            type: "form",
            br: true,
            tag: "input",
            formtype: "text",
            class: "blank",
            placeholder: "email",
            id: "login-email"
          },
          {
            name: "name",
            type: "form",
            br: true,
            tag: "input",
            formtype: "password",
            class: "blank",
            placeholder: "password",
            id: "login-password"
          },
          {
            name: "login",
            br: true,
            tag: "input",
            value: "login",
            class: "element",
            type: "form",
            ishidden: "login",
            formtype: "submit",
            id: "login-submit"
          }
        ]
      },
      {
        tag: "div",
        secondarytag: "form",
        element: "element",
        name: "register",
        container: "container",
        animation: "inner inactive",
        display: "none",
        caps: "true",
        href: "#register",
        align: "center",
        color: "white",
        background: "",
        padding: "1em",
        id: "register",
        title: "Register",
        items: [
          {
            name: "register",
            type: "form",
            tag: "input",
            formtype: "hidden",
            br: true,
            ishidden: "register",
            value: "register",
            class: "blank",
            id: "register-type"
          },
          {
            name: "name",
            ishidden: "",
            class: "blank",
            br: true,
            type: "form",
            tag: "input",
            formtype: "text",
            placeholder: "name",
            id: "register-name"
          },
          {
            name: "email",
            ishidden: "",
            class: "blank",
            tag: "input",
            br: true,
            type: "form",
            formtype: "email",
            placeholder: "email",
            id: "register-email"
          },
          {
            name: "password",
            ishidden: "",
            br: true,
            type: "form",
            tag: "input",
            formtype: "password",
            placeholder: "password",
            id: "register-password"
          },
          {
            name: "register",
            type: "form",
            class: "element",
            tag: "input",
            br: true,
            value: "register",
            formtype: "submit",
            ishidden: "register",
            id: "register-submit"
          }
        ]
      },
      {
        tag: "div",
        element: "element",
        name: "account",
        container: "container",
        animation: "inner inactive",
        display: "none",
        caps: "true",
        href: "#account",
        title: "account",
        description: "manage your sites and account",
        color: "white",
        align: "center",
        background: "",
        padding: "1em",
        id: "account",
        items: [
          {
            href: "#curernt",
            id: "current-button",
            name: "You are currently on FREE Plan with a balance of $0.00",
            type: "button",
            tag: "a",
            background: "#ffffff",
            hover: "cyan",
            textcolor: "black",
            ishidden: "home",
            value: "home",
            class: "element",
            css: ""
          },
          {
            href: "#upgrade",
            id: "upgrade-button",
            name: "Upgrade Plan",
            type: "button",
            tag: "a",
            background: "#0069ed",
            hover: "cyan",
            textcolor: "white",
            ishidden: "home",
            value: "home",
            class: "element",
            css: ""
          },
          {
            href: "#Funds",
            id: "Fundse-button",
            name: "Add Funds",
            type: "button",
            tag: "a",
            background: "#0069ed",
            hover: "cyan",
            textcolor: "white",
            ishidden: "home",
            value: "home",
            class: "element",
            css: ""
          },
          {
            href: "#payout",
            id: "payout-button",
            name: "Request Payout",
            type: "button",
            tag: "a",
            background: "#0069ed",
            hover: "cyan",
            textcolor: "white",
            ishidden: "home",
            value: "home",
            class: "element",
            css: ""
          }
        ]
      },
      {
        tag: "div",
        element: "element",
        name: "dashboard",
        container: "container",
        animation: "inner inactive",
        display: "none",
        caps: "true",
        href: "#dashboard",
        title: "dashboard",
        description: "manage your sites and account",
        color: "white",
        align: "center",
        background: "",
        padding: "1em",
        id: "dashboard",
        items: [
          {
            name: "",
            href: "/edit?912120bfa38218625d3e8505996f7860",
            class: "item right",
            src: "sun.gif",
            id: "New-Site",
            width: "50%",
            height: "",
            type: "link",
            tag: "a"
          },
          {
            href:
              "https://code.fastur.com/edit?234b9ca1a4091e84da53ebb861f12805",
            id: "blank-button",
            name: "Start with blank site",
            type: "button",
            tag: "a",
            size: "6",
            opacity: ".5",
            background: "",
            hover: "cyan",
            textcolor: "white",
            ishidden: "Blank Site",
            value: "Blank Site",
            class: "",
            css: ""
          },
          {
            name: "Theme 1",
            edit: "https://template1.fastur.com",
            href:
              "https://code.fastur.com/edit?cb02b5ed659b2fa4a7fcb2a869f04a7d",
            class: "item right",
            width: "50%",
            src: "sun.gif",
            id: "New-Site",
            type: "imagelink",
            tag: "a"
          }
        ]
      },
      {
        tag: "div",
        element: "element",
        name: "terms",
        display: "none",
        animation: "inner inactive",
        container: "container",
        caps: "true",
        href: "#terms",
        color: "white",
        padding: "1em",
        type: "page",
        id: "terms",
        align: "left",
        items: [
          {
            name:
              "TERMS AND CONDITIONS<br><br>Welcome to Fastur. Fastur Inc. makes Fastur available to the public. This Agreement ('Agreement') is entered between Fastur, Inc. (Company) and you (Customer). <br><br>1.\tSAAS SERVICES AND SUPPORT<br><br>1.1\tSubject to the terms of this Agreement, Company will use commercially reasonable efforts to provide Customer the Services As part of the registration process, Customer will identify an administrative user name and password for Customer's Company account.  Company reserves the right to refuse registration of, or cancel passwords it deems inappropriate.<br><br>1.2\tSubject to the terms hereof, Company will provide Customer with reasonable technical support services in accordance with the Company's standard practices.<br><br>2.\tRESTRICTIONS AND RESPONSIBILITIES<br><br>2.1\tCustomer will not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Services or any software, documentation or data related to the Services ('Software'); modify, translate, or create derivative works based on the Services or any Software (except to the extent expressly permitted by Company or authorized within the Services); use the Services or any Software for timesharing or service bureau purposes or otherwise for the benefit of a third; or remove any proprietary notices or labels. <br><br> 2.2\tCustomer represents, covenants, and warrants that Customer will use the Services only in compliance with Company's standard published policies then in effect (the 'Policy') and all applicable laws and regulations.  [Customer hereby agrees to indemnify and hold harmless Company against any damages, losses, liabilities, settlements and expenses (including without limitation costs and attorneys' fees) in connection with any claim or action that arises from an alleged violation of the foregoing or otherwise from Customer's use of Services. <br><br>2.3\tCustomer shall be responsible for obtaining and maintaining any equipment and ancillary services needed to connect to, access or otherwise use the Services, including, without limitation, modems, hardware, servers, software, operating systems, networking, web servers and the like (collectively, 'Equipment').  Customer shall also be responsible for maintaining the security of the Equipment, Customer account, passwords (including but not limited to administrative and user passwords) and files, and for all uses of Customer account or the Equipment with or without Customer's knowledge or consent.<br><br>3.\tCONFIDENTIALITY; PROPRIETARY RIGHTS<br><br>3.1\tEach party (the 'Receiving Party') understands that the other party (the 'Disclosing Party') has disclosed or may disclose business, technical or financial information relating to the Disclosing Party's business (hereinafter referred to as 'Proprietary Information' of the Disclosing Party).  Proprietary Information of Company includes non-public information regarding features, functionality and performance of the Service.  Proprietary Information of Customer includes non-public data provided by Customer to Company to enable the provision of the Services ('Customer Data'). The Receiving Party agrees: (i) to take reasonable precautions to protect such Proprietary Information, and (ii) not to use (except in performance of the Services or as otherwise permitted herein) or divulge to any third person any such Proprietary Information.  The Disclosing Party agrees that the foregoing shall not apply with respect to any information after five (5) years following the disclosure thereof or any information that the Receiving Party can document (a) is or becomes generally available to the public, or (b) was in its possession or known by it prior to receipt from the Disclosing Party, or (c) was rightfully disclosed to it without restriction by a third party, or (d) was independently developed without use of any Proprietary Information of the Disclosing Party or (e) is required to be disclosed by law.  <br><br>3.2\tCompany shall own and retain all right, title and interest in and to (a) the Services and Software, all improvements, enhancements or modifications thereto, (b) any software, applications, inventions or other technology developed in connection with Implementation Services or support, and (c) all intellectual property rights related to any of the foregoing.  <br><br>   3.3\tNotwithstanding anything to the contrary, Company shall have the right to collect and analyze data and other information relating to the provision, use and performance of various aspects of the Services and related systems and technologies (including, without limitation, information concerning Customer Data and data derived therefrom), and  Company will be free (during and after the term hereof) to (i) use such information and data to improve and enhance the Services and for other development, diagnostic and corrective purposes in connection with the Services and other Company offerings, and (ii) disclose such data solely in aggregate or other de-identified form in connection with its business. No rights or licenses are granted except as expressly set forth herein. <br><br> 4.\tPAYMENT OF FEES. <br><br>4.1\tCustomer will pay Company the then applicable fees for the Services and Implementation Services in accordance with the terms therein (the 'Fees').  If Customer's use of the Services exceeds the Service Capacity set forth on the Order Form or otherwise requires the payment of additional fees (per the terms of this Agreement), Customer shall be billed for such usage and Customer agrees to pay the additional fees in the manner provided herein.  Company reserves the right to change the Fees or applicable charges and to institute new charges and Fees at the end of the Initial Service Term or then current renewal term, upon thirty (30) days prior notice to Customer (which may be sent by email). If Customer believes that Company has billed Customer incorrectly, Customer must contact Company no later than 60 days after the closing date on the first billing statement in which the error or problem appeared, in order to receive an adjustment or credit.<br><br>4.2\tCompany may choose to bill through an invoice, in which case, full payment for invoices issued in any given month must be received by Company thirty (30) days after the mailing date of the invoice.  Unpaid amounts are subject to a finance charge of 1.5% per month on any outstanding balance, or the maximum permitted by law, whichever is lower, plus all expenses of collection and may result in immediate termination of Service. Customer shall be responsible for all taxes associated with Services other than U.S. taxes based on Company's net income.<br><br>  5.\tTERM AND TERMINATION<br><br>5.1\tSubject to earlier termination as provided below, this Agreement is for the Initial Service Term and shall be automatically renewed for additional periods of the same duration as the Initial Service Term (collectively, the 'Term'), unless either party requests termination at least thirty (30) days prior to the end of the then-current term.<br><br>5.2\tIn addition to any other remedies it may have, either party may also terminate this Agreement upon thirty (30) days' notice (or without notice in the case of nonpayment), if the other party materially breaches any of the terms or conditions of this Agreement.  Customer will pay in full for the Services up to and including the last day on which the Services are provided.  All sections of this Agreement which by their nature should survive termination will survive termination, including, without limitation, accrued rights to payment, confidentiality obligations, warranty disclaimers, and limitations of liability.<br><br> 6.\tWARRANTY AND DISCLAIMER<br><br>Company shall use reasonable efforts consistent with prevailing industry standards to maintain the Services in a manner which minimizes errors and interruptions in the Services and shall perform the Implementation Services in a professional and workmanlike manner.  Services may be temporarily unavailable for scheduled maintenance or for unscheduled emergency maintenance, either by Company or by third-party providers, or because of other causes beyond Company's reasonable control, but Company shall use reasonable efforts to provide advance notice by e-mail of any scheduled service disruption.  HOWEVER, COMPANY DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR FREE; NOR DOES IT MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES.  EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION, THE SERVICES AND IMPLEMENTATION SERVICES ARE PROVIDED 'AS IS' AND COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.<br><br>7.\tINDEMNITY <br><br>Company shall hold Customer harmless from liability to third parties resulting from infringement by the Service of any United States patent or any copyright or misappropriation of any trade secret, provided Company is promptly notified of any and all threats, claims and proceedings related thereto and given reasonable assistance and the opportunity to assume sole control over defense and settlement; Company will not be responsible for any settlement it does not approve in writing.  The foregoing obligations do not apply with respect to portions or components of the Service (i) not supplied by Company, (ii) made in whole or in part in accordance with Customer specifications, (iii) that are modified after delivery by Company, (iv) combined with other products, processes or materials where the alleged infringement relates to such combination, (v) where Customer continues allegedly infringing activity after being notified thereof or after being informed of modifications that would have avoided the alleged infringement, or (vi) where CustomerÃ¢â‚¬â„¢s use of the Service is not strictly in accordance with this Agreement.  If, due to a claim of infringement, the Services are held by a court of competent jurisdiction to be or are believed by Company to be infringing, Company may, at its option and expense (a) replace or modify the Service to be non-infringing provided that such modification or replacement contains substantially similar features and functionality, (b) obtain for Customer a license to continue using the Service, or (c) if neither of the foregoing is commercially practicable, terminate this Agreement and Customer's rights hereunder and provide Customer a refund of any prepaid, unused fees for the Service.  <br><br>8.\tLIMITATION OF LIABILITY<br><br> NOTWITHSTANDING ANYTHING TO THE CONTRARY, EXCEPT FOR BODILY INJURY OF A PERSON, COMPANY AND ITS SUPPLIERS (INCLUDING BUT NOT LIMITED TO ALL EQUIPMENT AND TECHNOLOGY SUPPLIERS), OFFICERS, AFFILIATES, REPRESENTATIVES, CONTRACTORS AND EMPLOYEES SHALL NOT BE RESPONSIBLE OR LIABLE WITH RESPECT TO ANY SUBJECT MATTER OF THIS AGREEMENT OR TERMS AND CONDITIONS RELATED THERETO UNDER ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY OR OTHER THEORY: (A) FOR ERROR OR INTERRUPTION OF USE OR FOR LOSS OR INACCURACY OR CORRUPTION OF DATA OR COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY OR LOSS OF BUSINESS; (B) FOR ANY INDIRECT, EXEMPLARY, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES; (C) FOR ANY MATTER BEYOND COMPANYÃ¢â‚¬â„¢S REASONABLE CONTROL; OR (D) FOR ANY AMOUNTS THAT, TOGETHER WITH AMOUNTS ASSOCIATED WITH ALL OTHER CLAIMS, EXCEED THE FEES PAID BY CUSTOMER TO COMPANY FOR THE SERVICES UNDER THIS AGREEMENT IN THE 12 MONTHS PRIOR TO THE ACT THAT GAVE RISE TO THE LIABILITY, IN EACH CASE, WHETHER OR NOT COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. <br><br>9.\tMISCELLANEOUS<br><br>If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that this Agreement will otherwise remain in full force and effect and enforceable.  This Agreement is not assignable, transferable or sublicensable by Customer except with Company's prior written consent.  Company may transfer and assign any of its rights and obligations under this Agreement without consent.  This Agreement is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements, communications and other understandings relating to the subject matter of this Agreement, and that all waivers and modifications must be in a writing signed by both parties, except as otherwise provided herein.  No agency, partnership, joint venture, or employment is created as a result of this Agreement and Customer does not have any authority of any kind to bind Company in any respect whatsoever.  In any action or proceeding to enforce rights under this Agreement, the prevailing party will be entitled to recover costs and attorneys' fees.  All notices under this Agreement will be in writing and will be deemed to have been duly given when received, if personally delivered; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; the day after it is sent, if sent for next day delivery by recognized overnight delivery service; and upon receipt, if sent by certified or registered mail, return receipt requested.  This Agreement shall be governed by the laws of the State of [California] without regard to its conflict of laws provisions.",
            href: "",
            class: "subtext",
            id: "",
            tag: "p",
            type: "text"
          }
        ]
      },
      {
        tag: "div",
        display: "display:block;",
        element: "element",
        name: "buttons",
        caps: "true",
        align: "center",
        animation: " active",
        id: "buttons",
        items: [
          {
            href: "#terms",
            id: "terms-button",
            name: "Terms",
            type: "button",
            tag: "a",
            size: "6",
            opacity: ".5",
            background: "",
            hover: "pink",
            textcolor: "white",
            ishidden: "terms",
            value: "terms",
            class: "element",
            css: ""
          }
        ]
      },
      {
        tag: "div",
        element: "element",
        name: "uform",
        align: "center",
        display: "block",
        container: "container",
        id: "uform",
        class: "uform",
        items: [
          {
            id: "uin",
            tag: "input",
            class: "input",
            type: "button"
          },
          {
            href: "#uform",
            id: "myBtn",
            name: "uform",
            tag: "a",
            class: "element",
            ishidden: "display:none;",
            type: "button"
          },
          {
            id: "uform-ul",
            name: "",
            edit: "false",
            tag: "ul",
            class: "input",
            top: "calc( 100vh - 90px )",
            type: "special"
          }
        ]
      },
      {
        tag: "div",
        align: "center",
        id: "modal",
        display: "none",
        class: "modal",
        items: [
          {
            href: "#X",
            name:
              "Use the form on the top right to build your site. You can also talk to me.",
            tag: "a",
            type: "modal",
            display: "none;",
            id: "modal-content",
            class: "modal-content",
            css: ""
          }
        ],
        _break: ""
      }
    ];
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (var y = 0; y < alphabet.length; y++) {
      movie(alphabet[y]);
      movie("list of all banks");
      movie("http://sunpickai.carrd.com ");
      movie("https://www.youtube.com/user/lexfridman");
      movie("female presidency");
      movie("patent authentic neural network");
    }

    // where your node app starts
    const express = require("express");
    const app = express();
    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // we've started you off with Express,
    // but feel free to use whatever libs or frameworks you'd like through `package.json`.

    // http://expressjs.com/en/starter/static-files.html
    app.use(express.static("public"));

    // http://expressjs.com/en/starter/basic-routing.html
    app.get("/", function(request, response) {
      //JSON.stringify({ type: "show", q:q, data: data })
      //response.sendFile(__dirname + "/views/index.html");
      
      var kanye = require("fs").readFileSync("kanye");
      var data = require("fs").readFileSync("t");
      //response.end(data);

      var html = render("false", elements);
      response.end(html);
    });

    app.get("/assets*", function(request, response) {
      if (
        require("fs").existsSync(
          __dirname + "/assets/" + request.url.split("/")[2]
        )
      ) {
        var img =
          require("fs").readFileSync(
            __dirname + "/assets/" + request.url.split("/")[2]
          ) || null; // Do something
      } else {
        var wanted = request.path;
        var img = require("fs").readFileSync(
          __dirname + "/public/" + wanted.split("/")[2]
        );
      }
      if (request.url.split("/")[2] == "data.json") {
        response.end("not allowed");
      }
      response.writeHead(200, {
        "Content-Type": request.url.split("/")[2].split(".")[1]
      });
      response.end(img, "binary");
    });

    app.get("/a", function(request, response) {
      response.sendFile(__dirname + "/sun.json");
    });

    app.get("/sun.gif", function(request, response) {
      response.sendFile(__dirname + "/sun.gif");
    });

    app.post("/", function(request, response) {
      const body = request.body;
      console.log(body);
      response.end("?");
    });

    // receives client data, edits, and returns to client
    app.post("/editDream", function(request, response) {
      const dream = request.body.dream;
      console.log(dream);
      function cap(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }

      async function puppet(url, input, q, waitFor, links) {
        global.puppetState = 1;

        const fs = require("fs");
        const puppeteer = require("puppeteer");
        const path = require("path");
        try {
          const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
          });
          const page = await browser.newPage();
          await page.goto(url);
          await page.type(input, q);

          await page.screenshot({
            path: path.join(__dirname, "./public/" + q + ".png")
          });

          page.keyboard.press("Enter");

          await page.waitForSelector(waitFor);

          function getText(linkText) {
            linkText = linkText.replace(/\r\n|\r/g, "\n");
            linkText = linkText.replace(/\ +/g, " ");

            // Replace &nbsp; with a space
            var nbspPattern = new RegExp(String.fromCharCode(160), "g");
            return linkText.replace(nbspPattern, " ");
          }

          if (links) {
            const links = await page.$$("div.r");
            for (var i = 0; i < links.length; i++) {
              let valueHandle = await links[i].getProperty("innerText");
              let linkText = await valueHandle.jsonValue();
              const text = getText(linkText);
              console.log(linkText);

              if (q == text) {
                console.log("Found " + text);
                await links[i].click();
              }
            }
          }

          await page.setViewport({
            width: 800,
            height: 1000
          });

          await browser.close();
        } catch (error) {
          console.log(error);
        }

        console.log("Puppet finished!");
        global.puppetState = 0;
      }
      puppet(
        "https://google.com",
        "input.gLFyf.gsfi",
        dream,
        "div#resultStats",
        "links"
      );

      //common pixel neighbourhoods
      function pixel(image, amount) {
        for (var y = 0; y < amount; y++) {
          var image = "./public/" + image + ".png";
          function imageSize(image) {
            var sizeOf = require("image-size");
            var dimensions = sizeOf(image);
            return { width: dimensions.width, height: dimensions.height };
          }
          var size = imageSize(image);
          var width = size.width;
          var height = size.height;

          require("get-pixels")(image, function(err, pixels) {
            if (err) {
              console.log(err);
              return;
            }

            function get_pixels(x, y, pixels) {
              var out = [];
              var pointer =
                pixels.offset + pixels.stride[0] * x + pixels.stride[1] * y;
              for (var i = 0; i < 4; i++) {
                out.push(pixels.data[pointer + pixels.stride[2] * i]);
              }
              return out;
            }

            var pixelarray = [];
            for (var y = 0; y < width; y++) {
              for (var x = 0; x < height; x++) {
                var pixel = get_pixels(x, y, pixels);
                pixelarray.push(pixel);
              }
            }

            console.log(pixelarray);
            global.current = pixelarray;
            global.currentD = size;
          });
        }
      }

      setInterval(function() {
        if (global.puppetState === 0) {
          pixel(dream, 1);
        }
      }, 50);

      function gif(a, b) {
        const GIFEncoder = require("gifencoder");
        const { createCanvas } = require("canvas");
        const fs = require("fs");

        var current = global.current;
        var currentD = global.currentD;

        const encoder = new GIFEncoder(currentD.width, currentD.height);
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(fs.createWriteStream(a + ".gif"));

        encoder.start();
        encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
        encoder.setDelay(500); // frame delay in ms
        encoder.setQuality(10); // image quality. 10 is default.

        // use node-canvas
        const canvas = createCanvas(320, 240);
        const ctx = canvas.getContext("2d");
        function getColor() {
          //var url = process.env.PROJECT_DOMAIN + '.glitch.me'
          //mirror

          var letters = "0123456789ABCDEF";
          var color = "#";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        /*white rectangle
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 320, 240);
  encoder.addFrame(ctx);*/

        function encode(amount) {
          for (var y = 0; y < amount; y++) {
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < 12; j++) {
                ctx.fillStyle = getColor();
                ctx.fillRect(j * 25, i * 25, 25, 25);
              }
            }
            encoder.addFrame(ctx);
          }
        }
        encode(b);

        encoder.finish();
        console.log("Gif Generator finished");
      }
      gif("sun", 26);

      response.send({ dream: dream });
    });

    // listen for requests :)
    const listener = app.listen(process.env.PORT, function() {
      //console.log("Your app is listening on port " + listener.address().port);
    });
  }
library();
