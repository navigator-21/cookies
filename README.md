# cookies
This object is for working with cookies in JS environments.


The cookie object has three methods:

1. set (options = {}) - takes an object with 8 options:

        ---------------------------------------------------------------------------------------- 

	1). name: "name", - Cookie name (required parameter)

        -------------------------------------------------- --------------------------------------

        2). value: "value", - Cookie value (empty string by default)

        -------------------------------------------------- --------------------------------------

        3). maxage: 2592000, - Cookie lifetime, set in seconds <((60 * 60) * 24) * 30 = 30 days>, alternative to expires, defines the cookie expiration time in seconds from the 	current moment.

        -------------------------------------------------- --------------------------------------

        4). expires: {
            year: "xxxx", // year
            month: "xx", // month
            date: "xx", // day
            hours: "xx", // hours
            minutes: "xx", // minutes
            seconds: "xx", // seconds
          },
          - This is an object from a set of options that allow you to set the exact date and time of cookie deletion (optional parameter)

        -------------------------------------------------- --------------------------------------

        5). domain: "site.com" - the domain option allows us to allow access to cookies for subdomains.

        ----------------------------------------------------------------------------------------    

       	6). path: "/ mypath", URL-prefix of the path, cookies will be available for pages under this path. If a cookie is set with path: "/ admin", then it will be available on 		the pages "/ admin" and "/ admin / something", but not on the "/ home" or "/ adminpage" pages. By default, the root path: "/" is specified as the path so that 			our cookies are available on all pages of the site.
            
        -------------------------------------------------- --------------------------------------

        7). secure: true - Makes cookies available only when using HTTPS. (default false)

        -------------------------------------------------- --------------------------------------

        8). samesite: "strict || lax", // prevents the browser from sending cookies with requests from outside, helps prevent XSRF attacks. (Disabled by default)

        -------------------------------------------------- --------------------------------------
2. getAll () - Returns an array-like object with a collection of all the cookies on the site.

3. get (name) - Returns a value by the name of the cookie.

4. del (name) - Deletes cookies by name.




   Examples of using :

   Setting cookies by limiting the lifetime of the maxage option:

        const maxAge = (((60 * 60) * 24) * 30);
        cookies.set ({
            name: "catalog",
            value: "blocks",
            maxage: maxAge,
            path: "/ catalog",
            domain: "site.com",
            secure: true,
            samesite: "lax",
        });

    Setting a cookie with an exact date of deletion:

    
        cookies.set ({
            name: "catalog",
            value: "blocks",
            path: "/ catalog",
            domain: "site.com",
            secure: true,
            samesite: "lax",
            expires: {
                year: "2022", // year
                month: "10", // month
                date: "26", // day
                hours: "13", // hours
                minutes: "57", // minutes
                seconds: "10", // seconds
              },
        });


    Get cookies by name:

        console.log (cookies.get ("catalog"));

    Get an object with all cookies:

        console.log (cookies.getAll ());

    Delete cookies by name:
        cookies.del ("catalog");
        
