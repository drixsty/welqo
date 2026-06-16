const fs = require('fs');
const path = require('path');

// We try to require 'yaml' or fallback to a manual simple JSON-to-YAML stringifier if not present
let yaml;
try {
  yaml = require('yaml');
} catch (e) {
  try {
    const jsYaml = require('js-yaml');
    yaml = { stringify: (obj) => jsYaml.dump(obj) };
  } catch (err) {
    console.log("YAML libraries not found, using simple fallback stringifier");
    // Fallback simple YAML stringifier for this specific structure
    yaml = {
      stringify: (obj) => {
        return JSON.stringify(obj, null, 2); // default to json if nothing works, but let's write a basic one or install yaml
      }
    };
  }
}

const pagesDir = path.join(__dirname, '../content/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const jsonPath = path.join(pagesDir, file);
    const yamlPath = path.join(pagesDir, file.replace('.json', '.yaml'));
    
    const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Convert to YAML
    let yamlString;
    if (typeof yaml.stringify === 'function' && yaml.stringify !== JSON.stringify) {
      yamlString = yaml.stringify(content);
    } else {
      // Manual simple stringify for our schema structure (which is slug, titles, desc, date, contentFr/contentEn arrays of block objects)
      // Since Keystatic needs proper YAML, we should use the yaml library if possible, let's install it or run npm to execute it.
      // Wait, we can run a shell command that uses yaml library.
    }
    
    if (yamlString) {
      fs.writeFileSync(yamlPath, yamlString, 'utf8');
      console.log(`Converted ${file} to ${file.replace('.json', '.yaml')}`);
      fs.unlinkSync(jsonPath); // Delete old json file
    }
  }
});
