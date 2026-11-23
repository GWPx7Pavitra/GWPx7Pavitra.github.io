# How to publish a post

You can do all of this from github.com in the browser, no tools needed.

1. Open the `posts` folder and copy `_template.md` to a new file, for example `posts/my-first-post.md`. The file name becomes the link: `post.html?p=my-first-post`. Use lowercase letters, numbers and dashes only.
2. Fill in the top part:
   - `title`: the post title
   - `date`: `YYYY-MM-DD`
   - `summary`: one or two sentences, shown on the Writing page
   - `featured: true` puts it under "Start here" (up to 2 posts)
   - `draft: true` hides it from the Writing page while you work on it
3. Write the post below the second `---` in Markdown. `##` headings appear in the Contents menu.
4. Add the file name (without `.md`) to `posts/posts.json`, newest first:

   ```json
   [
     "my-first-post",
     "how-the-search-on-this-site-works"
   ]
   ```

5. Commit. The site updates in about a minute.

To preview a draft, open `https://gwpx7pavitra.github.io/post.html?p=my-first-post`. It shows a "Draft" label until you set `draft: false`.

Images: put them in the `posts` folder and use `![description](posts/image-name.png)`. An optional `cover: posts/image-name.png` line in the top part sets the picture on the Writing page.
