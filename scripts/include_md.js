'use strict';

const fs = require('fs');
const path = require('path');

hexo.extend.tag.register('include_md', function(args) {
  const filePath = args[0];
  const fullPath = path.join(hexo.source_dir, filePath);

  if (!fs.existsSync(fullPath)) {
    return `<p style="color:red;">File not found: ${filePath}</p>`;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  return hexo.render.renderSync({ text: content, engine: 'markdown' });
}, { async: false });
