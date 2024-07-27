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
} else if (req.method === 'GET' && pathname !== '/' && pathname !== '/about.html' && pathname !== '/contact.html') {
    const blogName = pathname.slice(1);
    fs.readFile(blogsFilePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }
        const StyleFilePath = path.join(__dirname, 'static/post_css.txt');
        let addstyles = "";
        addstyles = fs.readFileSync(StyleFilePath).toString();
        const blogs = JSON.parse(data);
        const blog = blogs[blogName];

        if (blog) {
            const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${blog.title}</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                <style>
                ${addstyles}</style>
                    <header>
                        <h1>${blog.title}</h1>
                        <nav>
                            <a href="/">Home</a>
                            <a href="/about.html">About</a>
                            <a href="/contact.html">Contact</a>
                        </nav>
                    </header>
                    <main>
                        <article>
                            <p>Published on ${blog.time}</p>
                            <p>${blog.content}</p>
                            <p><a href="/">Back to Home</a></p>
                        </article>
                    </main>
                    <footer>
                        <p>&copy; 2024 Personal Blog | theNewtonCode. All rights reserved.</p>
                    </footer>
                </body>
                </html>
            `;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Blog Post Not Found</h1>');
        }
    });
} 
else if(req.method === 'GET' && pathname === '/about.html'){
    const aboutFile = path.join(__dirname, 'static/about.html');
    fs.readFile(aboutFile, (err, data)=>{
        if(err){
            res.writeHead(500), {'Content-Type':'text/plain'}
            res.end('Some internal server error');
            return;
        }
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
}
else if(req.method === 'GET' && pathname === '/contact.html'){
    const aboutFile = path.join(__dirname, 'static/contact.html');
    fs.readFile(aboutFile, (err, data)=>{
        if(err){
            res.writeHead(500), {'Content-Type':'text/plain'}
            res.end('Some internal server error');
            return;
        }
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
}
else{
    res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not Found');
}
});



//serving
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});




