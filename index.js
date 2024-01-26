const { Command } = require("commander");
const program = new Command();
const packageJson = require("./package.json");
const dree = require("dree");
const validators = require("./validators.js");

console.log(require("./validators.js"));

function scanArtists(directory) {
  let result = [];
  dree.scan(directory).children.forEach((itArtist) => {
    artist = {};
    artist.artist = itArtist.name;
    artist.tracks = [];
    itArtist.children.map((itTrack) => {
      const {
        splittedArtist,
        splittedName,
        splittedOption1,
        splittedOption2,
        splittedExt,
      } = splitTrack(itTrack.name);
      track = {
        artistFolder: itArtist.name,
        fullname: itTrack.name,
        artist: splittedArtist,
        name: splittedName,
        option1: splittedOption1,
        option2: splittedOption2,
        ext: splittedExt,
      };
      artist.tracks.push(track);
    });
    result.push(artist);
  });
  return result;
}

function splitTrack(trackFullname) {
  splittedTrack = trackFullname.split(".")[0].split(" - ");
  return {
    splittedArtist: splittedTrack[0],
    splittedName: splittedTrack[1],
    splittedOption1: splittedTrack[2],
    splittedOption2: splittedTrack[3],
    splittedExt: trackFullname.split(".")[1],
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
      console.log(`\n--------------${itArtist.artist}--------------`);
      i = 0;
      itArtist.tracks.forEach((itTrack) => {
        console.log(` + track ${i}: ${itTrack.fullname}`);
        if (itTrack.artist) console.log(`    - artist: ${itTrack.artist}`);
        if (itTrack.name) console.log(`    - name: ${itTrack.name}`);
        if (itTrack.option1) console.log(`    - option1: ${itTrack.option1}`);
        if (itTrack.option2) console.log(`    - option2: ${itTrack.option2}`);
        if (itTrack.ext) console.log(`    - ext: ${itTrack.ext}`);
        validators.forEach((validator) => {
          if (!validator.controller(itTrack)) validator.errors.push(itTrack);
        });
        i++;
      });
    });

    validators.forEach((validator) => {
      console.log(`nb ${validator.name}: ${validator.errors.length}`);
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
