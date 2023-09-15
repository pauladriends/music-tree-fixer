const { Command } = require("commander");
const program = new Command();
const dree = require("dree");
const packageJson = require("./package.json");

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("tree")
  .description(
    "Display the music tree from the Music Directory without any validation"
  )
  .argument("<directory>", "Your Music Directory to read")
  .action((directory) => {
    dree.scan(directory).children.forEach((artist) => {
      console.log(
        `${artist.name}`,
        artist.children.map((music) => music.name)
      );
    });
  });

program.parse();
