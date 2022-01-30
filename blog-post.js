const fs = require('fs');
const readline = require('readline');
const slugify = require('slugify');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BLOG_PATH = 'blog';


rl.question('Title: ', title => {
  const slug = slugify(title);

  fs.writeFileSync(`${BLOG_PATH}/${slug}.adoc`,
    ':description: Empty\n' +
    ':category: Exercise\n' +
    '\n' +
    `== ${title}\n` +
    '\n' +
    'Post content goes here...');

  console.info(`Created ${BLOG_PATH}/${slug}.adoc`);

  rl.close();
});

rl.on('close', () => process.exit(0));
