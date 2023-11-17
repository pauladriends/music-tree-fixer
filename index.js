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
      const { splittedArtist, splittedName } = splitTrack(itTrack.name);
      track = {
        fullname: itTrack.name,
        artist: splittedArtist,
        name: splittedName,
      };
      artist.tracks.push(track);
    });
    result.push(artist);
  });
  return result;
}

function splitTrack(trackFullname) {
  splittedTrack = trackFullname.split(" - ");
  return {
    splittedArtist: splittedTrack[0],
    splittedName: splittedTrack[1],
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
    scanArtists(directory).forEach((itArtist) => {
      console.log(`--------------${itArtist.artist}--------------`);
      i = 0;
      itArtist.tracks.forEach((itTrack) => {
        console.log(` + track ${i}: ${itTrack.fullname}`);
        console.log(`    - artist: ${itTrack.artist}`);
        console.log(`    - name: ${itTrack.name}`);
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
