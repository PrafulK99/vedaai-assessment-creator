const fs = require('fs');
let data = fs.readFileSync('frontend/app/page.tsx', 'utf8');

const prefixColor = ['secondary-fixed', 'primary-fixed', 'tertiary-fixed-dim', 'outline-variant', 'on-secondary-fixed', 'on-surface-variant', 'on-error-container', 'surface-container-low', 'surface-container-lowest', 'surface-tint', 'secondary-fixed-dim', 'on-tertiary-fixed', 'on-secondary', 'on-background', 'surface-container-high', 'surface', 'error', 'tertiary-fixed', 'primary-container', 'inverse-primary', 'on-surface', 'primary', 'secondary', 'secondary-container', 'on-primary-fixed', 'background', 'surface-bright', 'tertiary', 'surface-dim', 'on-tertiary', 'error-container', 'surface-container-highest', 'on-tertiary-fixed-variant', 'inverse-surface', 'outline', 'on-tertiary-container', 'surface-variant', 'inverse-on-surface', 'on-primary', 'tertiary-container', 'surface-container', 'primary-fixed-dim', 'on-secondary-container', 'on-error', 'on-primary-fixed-variant', 'on-secondary-fixed-variant', 'on-primary-container'];

const prefixSpacing = ['gutter', 'container-max', 'base', 'margin-desktop', 'margin-mobile'];
const prefixText = ['label-md', 'headline-lg-mobile', 'display-lg', 'label-sm', 'headline-lg', 'headline-md', 'body-lg', 'body-md'];

prefixColor.forEach(c => {
    // using regex literal avoids escaping issues
    const regex = new RegExp(`\\b(bg|text|border|shadow|from|to|fill|stroke)-(${c})\\b`, 'g');
    data = data.replace(regex, '$1-ld-$2');
});

prefixSpacing.forEach(s => {
    const regex = new RegExp(`\\b(p|m|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr|gap|w|h|max-w)-(${s})\\b`, 'g');
    data = data.replace(regex, '$1-ld-$2');
});

prefixText.forEach(t => {
    const regex = new RegExp(`\\b(text|font)-(${t})\\b`, 'g');
    data = data.replace(regex, '$1-ld-$2');
});

// some fixes
data = data.replace(/bg-ld-primary-container\/10/g, 'bg-ld-primary-container/10');
data = data.replace(/bg-ld-surface-container\/80/g, 'bg-ld-surface-container/80');

fs.writeFileSync('frontend/app/page.tsx', data);
console.log('Fixed prefixes in page.tsx');
