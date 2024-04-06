# undownloadable

This is a proof of concept for methods you can use to prevent your images from being downloaded. While not foolproof, they can help prevent the average user from downloading your images by making it more difficult and frustrating to do so.

You can view the live demo [here](https://undownloadable.ptr.red/).

> [!CAUTION]
> This is a proof of concept and should not be used in production. It can significantly impact the performance and usability of your website, as well as increase the cost of hosting and serving the images. It can also be circumvented by determined users.

## Method 1: Use background images instead of `<img />` tags

Use a `div` with a background image instead of an `img` tag. This makes it more difficult to download the image, as the user would have to inspect the element and extract the image URL from the CSS.

> [!WARNING]
> This method can impact the accessibility of your images and hurt your website's SEO, as it makes it more difficult search engines to index the images.

## Method 2: Prevent right-clicking

This method uses JavaScript to prevent the user from right-clicking on the image. This makes it more difficult to download the image, as the user would have to use the browser's developer tools.

## Method 3: Prevent keyboard shortcuts from opening the dev tools

This method uses JavaScript to prevent the user from opening the browser's developer tools using keyboard shortcuts. This makes it more difficult for the user to inspect the element and extract the image URL.

## Method 4: Detect `Accept`, `User-Agent`, and `Referer` headers

This method uses server-side code to detect the `Accept`, `User-Agent`, and `Referer` headers of the request. If the request does not contain the expected headers, the server responds with a 403 Forbidden status code.

### `Accept` header:

The `Accept` header specifies the media types that the client can understand.

If the client does not specify that it can accept images, it is likely a bot or a script trying to download the image, and the server can respond with a 403 Forbidden status code.

If the `Accept` header contains `text/html`, `text/plain`, or `application/xhtml+xml`, it is likely a browser trying to display the image outside of the context of the website, and the server can respond with a 403 Forbidden status code.

### `User-Agent` header:

The `User-Agent` header specifies the client application making the request.

If the `User-Agent` header does not contain a string that matches the expected pattern of a browser user agent, it is likely a bot or a script trying to download the image, and the server can respond with a 403 Forbidden status code.

### `Referer` header:

The `Referer` header specifies the URL of the page that linked to the resource being requested.

If the `Referer` header does not contain the expected URL of the website, it is likely a bot or a script trying to download the image, and the server can respond with a 403 Forbidden status code.

> [!WARNING]
> This can prevent legitimate users from accessing the image if their browser does not send the expected headers. For example, some browsers do not send the `Referer` header for privacy reasons. This method should only be used if you are willing to accept the risk of blocking legitimate users. You should also be aware that this method can be circumvented by bots and scripts that send the expected headers. This method requires server-side code to detect the headers and respond with a 403 Forbidden status code or allow the request to proceed. This method can also increase the load on the server and consequently increase the cost of hosting and serving the images, as it has to check the headers for every request and possibly fetch the image from storage or a CDN to send it to the client, potentially doubling the bandwidth usage.

## Method 5: Detect if dev tools are open using [David Fong](https://github.com/david-fong)'s [`detect-devtools-via-debugger-heartstop`](https://github.com/david-fong/detect-devtools-via-debugger-heartstop)

Use JavaScript and a Web Worker to detect if the browser's developer tools are open by checking if the `debugger` statement is being executed. If the developer tools are open, the script will stop a Worker thread, which will cause a redirect to another page.

> [!WARNING]
> This method can be circumvented by disabling JavaScript, using a browser that does not support Web Workers, or using a browser extension that blocks the script. It can also impact the performance of the website, as it has to run a script in the background to check if the developer tools are open.

## Method 6: Split the image into multiple parts

Use an edge runtime function to dynamically split the image into multiple images each containing only part of the original image and transparency for the rest of the image. The images are then sent to the browser, so the browser can then overlay them to create the full image. This makes it more difficult to download the image, as the user would have to download all the parts and overlay them manually or write a script to do so.

> [!WARNING]
> This method can significantly increase the load time of the page, as the browser has to download multiple images and overlay them. It can also increase the execution time and bandwidth usage of the server, as it has to split the image and send multiple images to the browser. This could then increase the cost of caching the images on a CDN as multiple images have to be cached and served to the client. This method should only be used as a last resort, and only if you are willing to accept the performance and cost implications. Some browser may show lines where the images are overlaid, which can make the image look less appealing.

## Method 7: `blob:` URLs (not implemented)

Use a `blob:` URL to display the image. This makes it more difficult to download the image, as the user would have to extract the image data from the URL and save it to a file.
