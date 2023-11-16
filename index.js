const { Command } = require("commander");
const program = new Command();
const packageJson = require("./package.json");
const dree = require("dree");

function scanArtist(directory) {
  let scanResult = [];
  dree.scan(directory).children.forEach((artist) => {
    item = {};
    item.artist = artist.name;
    item.tracks = [];
    artist.children.map((track) => {
      track = {};
      track.fullname = track.name;
      item.tracks.push(track);
    });
    scanResult.push(item);
  });
  return scanResult;
}

function splitTrack(trackFullname) {
  splittedTrack = trackFullname.split(" - ");
  return {
    artist: splittedTrack[0],
    name: splitTrack[1],
  };
}

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("scan")
  .description("List all anomalies")
  .argument("<directory>", "Your Music Directory to read")
  .action((directory) => {
    scanArtist(directory).forEach((artist) => {
      console.log(
        `${artist.name}`,
        artist.children.map((music) => music.name)
      );
  });

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
