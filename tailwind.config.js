const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind")
const { join } = require("node:path")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
        ...createGlobPatternsForDependencies(__dirname),
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("@catppuccin/tailwindcss"), require("autoprefixer"), require("flowbite/plugin")],
}
