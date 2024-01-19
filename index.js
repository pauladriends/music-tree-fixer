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
      const {
        splittedArtist,
        splittedName,
        splittedOption1,
        splittedOption2,
        splittedExt,
      } = splitTrack(itTrack.name);
      track = {
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

function controlContainsNameAndArtist(track) {
  return track.name && track.artist;
}

function controlArtistFolderEqualsToArtistTrack(artistFolder, artistTrack) {
  return artistFolder === artistTrack;
}

function controlContainsNotTooMuchHyhens(trackFullname) {
  return trackFullname.split(" - ").length < 5;
}

function controlExtensionIsMP3(ext) {
  return ext === "mp3" || ext === "MP3";
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
        if (!controlContainsNameAndArtist(itTrack))
          console.log("track does not have a name and/or artist");
        if (
          !controlArtistFolderEqualsToArtistTrack(
            itArtist.artist,
            itTrack.artist
          )
        )
          console.log(
            "artist folder name does not equals to artist track name"
          );
        if (!controlContainsNotTooMuchHyhens(itTrack.fullname))
          console.log("track contains too much option");
        if (!controlExtensionIsMP3(itTrack.ext))
          console.log("track does not have ext or is not equal to mp3");
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
