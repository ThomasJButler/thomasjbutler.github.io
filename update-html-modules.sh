#!/bin/bash

# Update HTML files to use ES modules
for file in projects.html services.html contact.html codepen.html sitemap.html; do
    echo "Updating $file..."
    
    # Replace CSS and script tags with module import
    sed -i '' '/<link rel="stylesheet" href="src\/css\/global.css">/,/<script.*ScrollMagic.*animation.gsap/c\
    <!-- CSS and libraries loaded via JavaScript module -->\
    <script type="module" src="/src/js/main-page.js"></script>' "$file"
    
    # Replace scripts.js at the end
    sed -i '' 's/<script src="src\/js\/scripts.js"><\/script>/<!-- Scripts loaded via main-page.js module -->/' "$file"
done

# Special case for landingpage.html (if it has different structure)
if [ -f "landingpage.html" ]; then
    echo "Updating landingpage.html..."
    sed -i '' '/<link rel="stylesheet" href="src\/css\/global.css">/,/<script.*gsap/c\
    <!-- CSS and libraries loaded via JavaScript module -->\
    <script type="module" src="/src/js/main-page.js"></script>' "landingpage.html"
fi

echo "All HTML files updated!"