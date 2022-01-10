const Asciidoctor = require('asciidoctor');
const highlightJsExt = require('asciidoctor-highlight.js');
const spawnSync = require('child_process').spawnSync;
const fs = require('fs');
const asciidoctor = Asciidoctor();
const BLOG_PATH = 'blog';
const RENDERED_PATH = 'src/assets/blog';
const RENDERED_JSON = RENDERED_PATH + '/blog.json';
const ROUTES_TXT = 'prerender-routes.txt';

highlightJsExt.register(asciidoctor.Extensions);

const renderedPosts = [];

fs.readdirSync(BLOG_PATH).forEach(file => {
  if (!file.endsWith('.adoc')) return;
  console.info(`Rendering file: ${file}`);

  // Render adoc
  const document = asciidoctor.convertFile(`${BLOG_PATH}/${file}`, {
    to_dir: RENDERED_PATH,
    mkdirs: true,
    standalone: false,
    attributes: {
      'source-highlighter': 'highlightjs-ext'
    }
  });

  const modificationTimestamps = [];
  const gitLog = spawnSync('git', ['log', '--pretty=%cI', '--', `blog/${file}`], {
    encoding : 'utf8'
  });

  for (const datetime of gitLog.stdout.split('\n')) {
    if (datetime === "") continue;
    modificationTimestamps.push(new Date(datetime));
  }

  modificationTimestamps.sort();
  modificationTimestamps.reverse();

  // Save metadata, use later in Angular service
  const { doctitle: title, description, category } = document.getAttributes();
  renderedPosts.push({
    filename: file.replace('.adoc', '.html'),
    title,
    description,
    category,
    modificationTimestamps
  });
});

fs.writeFileSync(RENDERED_JSON, JSON.stringify({posts: renderedPosts}));
fs.writeFileSync(ROUTES_TXT, renderedPosts.map(post => `/blog/${post.filename.replace('.html', '')}`).join('\n'));
