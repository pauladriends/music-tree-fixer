const { Command } = require("commander");
const program = new Command();
const packageJson = require("./package.json");
const dree = require("dree");

function scanArtists(directory) {
  let result = [];
  dree.scan(directory).children.forEach((itArtist) => {
    artist = {};
    artist.artist = itArtist.name;
    artist.tracks = [];
    itArtist.children.map((itTrack) => {
      track = {};
      track.fullname = itTrack.name;
      track = { ...splitTrack(track) };
      artist.tracks.push(track);
    });
    result.push(artist);
  });
  return result;
}

function splitTrack(trackFullname) {
  splittedTrack = trackFullname.split(" - ");
  return {
    artist: splittedTrack[0],
    name: splittedTrack[1],
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
    scanArtists(directory).forEach((item) => {
      console.log(`--------------${item.artist}--------------`);
      i = 0;
      item.tracks.forEach((track) => {
        console.log(`track ${i}: ${track.fullname}`);
        i++;
      });
    });
  });

program
  .command("tracks")
  .description(
    "Display the music tree from the Music Directory without any validation"
  )
  .argument("<directory>", "Your Music Directory to read")
  .action((directory) => {
    dree.scan(directory).children.forEach((itArtist) => {
      console.log(
        `${itArtist.name}`,
        itArtist.children.map((itTrack) => itTrack.name)
      );
    });
  });

program.parse();
