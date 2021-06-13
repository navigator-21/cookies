// JavaScript source code
window.cookies = {
    error: {
        msgCookieEnabled: "Error! The use of cookies is prohibited! Change your web browser settings.",
        msgName: "Error! You must pass the {name: 'xxxx'} object to the set () method of the cookie name.",
        msgAge: "Warnings! The object passed to the set () method is missing cookie lifetime settings. This will cause the cookie to be deleted when the browser is closed.",
    },
    set: function (options = {}) {
        if (navigator.cookieEnabled) {
            let updatedCookie = "";
            if (typeof options.name != "undefined" && options.name.length > 0) { //name
                updatedCookie += options.name + "=" + encodeURIComponent((typeof options.value != "undefined") ? options.value : "");
            } else {
                console.error(this.error.msgName);
                return false;
            }
            if (typeof options.maxage != "undefined") {//max-age 
                if (typeof options.maxage == "number") {  
                    if (options.maxage.toString().length > 0) {
                        updatedCookie += ";max-age=" + options.maxage;
                    }
                } else if (typeof options.maxage == "string") {
                    if (options.maxage.length > 0) {
                        updatedCookie += ";max-age=" + options.maxage;
                    }
                }
            } else {
                if (typeof options.expires == "undefined") {
                    console.warn(this.error.msgAge);
                }
            }

            if (typeof options.expires != "undefined") { //expires
                let time = new Date();
                if (typeof options.expires.date != "undefined" && options.expires.date.length > 0)
                    time.setDate(options.expires.date);
                if (typeof options.expires.month != "undefined" && options.expires.month.length > 0)
                    time.setMonth(options.expires.month);
                if (typeof options.expires.year != "undefined" && options.expires.year.length == 4)
                    time.setFullYear(options.expires.year);
                if (typeof options.expires.hours != "undefined" && options.expires.hours.length > 0)
                    time.setHours(options.expires.hours);
                if (typeof options.expires.minutes != "undefined" && options.expires.minutes.length > 0)
                    time.setMinutes(options.expires.minutes);
                if (typeof options.expires.seconds != "undefined" && options.expires.seconds.length > 0)
                    time.setSeconds(options.expires.seconds);
                updatedCookie += ";expires=" + time.toUTCString();
            }
            if (typeof options.domain != "undefined" && options.domain.length > 0) { //domain
                updatedCookie += ";domain=" + options.domain;
            }
            if (typeof options.path != "undefined" && options.path.length > 0) { //path
                updatedCookie += ";path=" + options.path;
            } else {
                updatedCookie += ";path=/";
            }
            if (typeof options.samesite != "undefined" && options.samesite.length > 0) { //samesite
                if (options.samesite == "strict" || options.samesite == "lax") {
                    updatedCookie += ";samesite=" + options.samesite;
                }
            }
            if (typeof options.secure != "undefined" && options.secure === true) { //secure                    
                updatedCookie += ";secure";
            }
            document.cookie = updatedCookie;
        } else {
            console.error(this.error.msgCookieEnabled);
        }
    },
    getAll: function () {
        if (navigator.cookieEnabled) {
            if (document.cookie != "") {
                let arr1 = [],
                    arr2 = [];
                let obj = {};
                let cookieStr = document.cookie;
                if (cookieStr.indexOf("; ") != -1) {
                    arr1 = cookieStr.split("; ");
                    for (let i = 0, c = arr1.length; i < c; i++) {
                        arr2 = arr1[i].split("=");
                        obj[arr2[0]] = decodeURIComponent(arr2[1]);
                    }
                } else {
                    arr2 = cookieStr.split("=");
                    obj[arr2[0]] = decodeURIComponent(arr2[1]);
                }
                return obj;
            }
        } else {
            console.error(this.error.msgCookieEnabled);
        }
    },
    get: function (name) {
        if (navigator.cookieEnabled) {
            if (document.cookie != "") {                
                return this.getAll()[name];
            }
        } else {
            console.error(this.error.msgCookieEnabled);
        }
    },
    delete: function (name) {
        if (navigator.cookieEnabled) {
            this.set({
                name: name,
                value: "",
                maxage: -1,
            });
        } else {
            console.error(this.error.msgCookieEnabled);
        }
    }
}