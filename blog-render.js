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

const renderedPostsMetadata = [];

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

  const timestamps = [];
  const gitLog = spawnSync('git', ['log', '--follow', '--pretty=%cI', '--', `blog/${file}`], {
    encoding : 'utf8'
  });

  for (const datetime of gitLog.stdout.split('\n')) {
    if (datetime === "") continue;
    timestamps.push(datetime);
  }

  timestamps.sort();

  // Save metadata, use later in Angular service
  const metadata = {
    document: {
      title: document.getDocumentTitle(),
      description: document.getAttribute('description', 'Empty'),
      category: document.getAttribute('category', 'Exercise'),
      slug: document.getAttribute('doc' + 'name')
    },
    authors: document.getAuthors().map(author => {
      return {
        name: author.getName(),
        initials: author.getInitials()
      }
    }),
    timestamps: timestamps
  };

  renderedPostsMetadata.push(metadata);
});

renderedPostsMetadata.sort((a, b) => a.timestamps[0] > b.timestamps[0] ? 1 : -1);

fs.writeFileSync(RENDERED_JSON, JSON.stringify({posts: renderedPostsMetadata}, null, 2));
fs.writeFileSync(ROUTES_TXT, renderedPostsMetadata.map(post => `/blog/${post.document.slug}`).join('\n'));
