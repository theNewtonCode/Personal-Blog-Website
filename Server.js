const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

// Path to the blogs file
const blogsFilePath = path.join(__dirname, 'Backend/blogs.txt');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET' && pathname === '/') {
        fs.readFile(blogsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            const indexStyleFilePath = path.join(__dirname, 'static/index_css.txt');
            let addstyles = "";
addstyles = fs.readFileSync(indexStyleFilePath).toString();

            const blogs = JSON.parse(data);
            let html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>theNewtonCode Blogs</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                                   <style>
                    ${addstyles}
                    </style>
                    <header>
                        <h1>Welcome to My Personal Blog</h1>
                        <nav>
                            <a href="/">Home</a>
                            <a href="/about.html">About</a>
                            <a href="/contact.html">Contact</a>
                        </nav>
                    </header>

                    <main>
                        <section class="blog-posts">
            `;

            for (const blog in blogs) {
                html += `
                    <article>
                        <h2><a href="/${blog}">${blogs[blog].title}</a></h2>
                        <p>Published on ${blogs[blog].time}</p>
                        <p>${blogs[blog].content.substring(0, 100)}... <a href="/${blog}">Read more</a></p>
                    </article>
                `;
            }

            html += `
                        </section>
                    </main>
                    <footer>
                        <p>&copy; 2024 Personal Blog | theNewtonCode. All rights reserved.</p>
                    </footer>
                </body>
                </html>
            `;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    // Serve individual blog posts
    } 
});


//serving on localhost
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});




