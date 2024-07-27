# Personal Blog Website

This project is a personal blog website built using Node.js. The website features a homepage displaying a list of blog posts, individual blog post pages, an About page, and a Contact page. The blog posts and styles are dynamically loaded.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [License](#license)

## Features

- Dynamic homepage displaying a list of blog posts.
- Individual blog post pages.
- Static About and Contact pages.
- Separate CSS files for styling the homepage and individual blog posts.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/theNewtonCode/Personal-Blog-Website.git
    cd personal-blog-website
    ```

2. Install the required dependencies:

    ```sh
    npm install
    ```

3. Create the necessary directories and files if they do not exist:

    ```sh
    mkdir -p Backend static
    touch Backend/blogs.txt static/index_css.txt static/post_css.txt static/about.html static/contact.html
    ```

4. Populate `Backend/blogs.txt` with your blog posts in JSON format:

    ```json
    {
        "post1": {
            "title": "My First Blog Post",
            "time": "2024-07-28",
            "content": "This is the content of my first blog post."
        }
    }
    ```

5. Add your CSS styles to `static/index_css.txt` and `static/post_css.txt`.

6. Add content to `static/about.html` and `static/contact.html`.

## Usage

1. Start the server:

    ```sh
    node server.js
    ```

2. Open your browser and navigate to `http://127.0.0.1:3000`.

## File Structure

- `Backend/`
  - `blogs.txt`: JSON file containing blog posts.
- `static/`
  - `index_css.txt`: CSS styles for the homepage.
  - `post_css.txt`: CSS styles for individual blog posts.
  - `about.html`: HTML content for the About page.
  - `contact.html`: HTML content for the Contact page.
- `server.js`: Main server file.

## License

This project is licensed under the MIT License.
