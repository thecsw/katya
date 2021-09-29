window.onload = () => {
        const url = "https://katya.sandyuraz.com:32000/api";
        const sourceAddInput = document.querySelector("#source_add_input");
        const sourceAdd = document.querySelector("#source_add");
        const sourceTriggerInput = document.querySelector(
                "#source_trigger_input"
        );
        const sourceTrigger = document.querySelector("#source_trigger");
        const findInput = document.querySelector("#find_input");
        const find = document.querySelector("#find");
        const login = document.querySelector("#login");
        const report = document.querySelector("#report");
        const dashboard = document.querySelector("#dashboard");
        const welcome = document.querySelector("#welcome");
        report.style.display = "none";
        // cookie helpers
        const getCookie = (what) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${what}=`);
                if (parts.length === 2) return parts.pop().split(";").shift();
        };

        // Check if cookie exists, and if it does, check whether they're valid
        const basicAuthToken = getCookie("user");
        console.log("Cookie:", basicAuthToken);
        if (basicAuthToken !== "" && typeof basicAuthToken !== "undefined") {
                makePost(
                        (path = url + "/auth"),
                        (data = {}),
                        (auth = basicAuthToken)
                ).then((data) => {
                        // auth succeeded
                        if (data[0] === 200) {
                                const username = atob(
                                        basicAuthToken.split("Basic ")[1]
                                ).split(":")[0];
                                dashboard.style.display = "block";
                                welcome.innerHTML = `Welcome back, <b>${username}</b>`;
                                login.style.display = "none";
                        }
                });
        } else {
                // if cookie not found or doesn't check out against the auth, stop
                // executing all javascript
                dashboard.style.display = "none";
                login.style.display = "block";
                return;
        }

        async function makePost(path = "", data = {}, auth = "") {
                const response = await fetch(path, {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "include",
                        headers: {
                                "Content-Type": "application/json",
                                Authorization: auth.toString(),
                                Accept: "*/*",
                                "Accept-Encoding": "gzip, deflate, br",
                                Connection: "keep-alive",
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify(data),
                });
                json = await response.json();
                return [response.status, json];
        }

        async function makeGet(path = "", auth = "") {
                const response = await fetch(path, {
                        method: "GET",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "include",
                        headers: {
                                "Content-Type": "application/json",
                                Authorization: auth.toString(),
                                Accept: "*/*",
                                "Accept-Encoding": "gzip, deflate, br",
                                Connection: "keep-alive",
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                });
                respBlob = await response.text();
                return [response.status, respBlob];
        }

        const reportRequest = (toShow, className) => {
                report.innerHTML = toShow;
                report.className = className;
                report.style.display = "block";
                setTimeout(() => {
                        report.style.display = "none";
                }, 1500);
        };

        sourceAdd.addEventListener("click", (_e) => {
                makePost(
                        (path = url + "/source"),
                        (data = {
                                link: sourceAddInput.value,
                        }),
                        (auth = basicAuthToken)
                ).then((data) => {
                        // auth succeeded
                        if (data[0] === 200) {
                                reportRequest(
                                        "Added the source!",
                                        "isa_success"
                                );
                                return;
                        }
                });
                makePost(
                        (path = url + "/allocate"),
                        (data = {
                                link: sourceAddInput.value,
                                only_subpaths: true,
                        }),
                        (auth = basicAuthToken)
                ).then((data) => {
                        // auth succeeded
                        if (data[0] === 200) {
                                reportRequest(
                                        "Allocated a crawler",
                                        "isa_success"
                                );
                                return;
                        }
                });
        });

        sourceTrigger.addEventListener("click", (_e) => {
                makePost(
                        (path = url + "/trigger"),
                        (data = {
                                link: sourceTriggerInput.value,
                        }),
                        (auth = basicAuthToken)
                ).then((data) => {
                        // auth succeeded
                        if (data[0] === 200) {
                                reportRequest(
                                        "Triggered a crawl!",
                                        "isa_success"
                                );
                                return;
                        }
                });
        });

        find.addEventListener("click", (_e) => {
                makeGet(
                        (path =
                                url +
                                "/find?query=" +
                                findInput.value +
                                "&csv=1"),
                        (auth = basicAuthToken)
                ).then((data) => {
                        // auth succeeded
                        if (data[0] === 200) {
                                console.log(data[1]);
                                a = document.createElement("a");
                                a.textContent = "download";
                                a.download = `katya-${findInput.value}.csv`;
                                a.href =
                                        "data:text/csv;charset=utf-8,\uFEFF" +
                                        escape(data[1]);
                                document.body.appendChild(a);
                                // window.open(
                                //         "data:text/csv;charset=utf-8," +
                                //                 escape(data[1])
                                // );
                                reportRequest("Found!", "isa_success");
                                return;
                        }
                });
        });
};
