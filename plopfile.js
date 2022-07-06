module.exports = function (plop) {
  // create your generators here
  // Read more about templates at https://plopjs.com/
  plop.setGenerator("basic template", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        // You should always include a "destinationpath" prompt when using this extension
        // this extension will automatically answer this prompt for the user.
        // Which allows your plop file to be placed in the correct location
        type: "input",
        name: "destinationpath",
        message: "Template destination path",
      },
      {
        type: "input",
        name: "fileName",
        message: "file name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{destinationpath}}/{{fileName}}.js",
        templateFile: "plop-templates/exampleFile.hbs",
      },
    ],
  });
};
