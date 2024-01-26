const validators = [
  {
    name: "ARTIST_FOLDER_EQUALS_TO_ARTIST_TRACK",
    errors: [],
    controller: controlArtistFolderEqualsToArtistTrack,
  },
  {
    name: "TRACK_CONTAINS_NAME_AND_ARTIST",
    errors: [],
    controller: controlTrackContainsNameAndArtist,
  },
  {
    name: "EXTENSION_IS_MP3",
    errors: [],
    controller: controlExtensionIsMP3,
  },
  {
    name: "FULLNAME_CONTAINS_TOO_MUCH_HYPHENS",
    errors: [],
    controller: controlFullnameContainsNotTooMuchHyhens,
  },
  {
    name: "OPTIONS_ARE_ALLOWED",
    errors: [],
    controller: controlOptionsAreAllowed,
  },
];

function controlTrackContainsNameAndArtist(track) {
  return track.name && track.artist;
}

function controlArtistFolderEqualsToArtistTrack(track) {
  return track.artistFolder === track.artist;
}

function controlFullnameContainsNotTooMuchHyhens(track) {
  return track.fullname.split(" - ").length < 5;
}

function controlExtensionIsMP3(track) {
  return track.ext === "mp3" || track.ext === "MP3";
}

function controlOptionsAreAllowed(track) {
  optionAllowed = ["feat", "mix", "remaster", "live", "soundtrack"];
  isOk = true;
  if (track.option1) {
    option = track.option1.split(" ");
    isOk = optionAllowed.includes(option[0]);
  }
  if (isOk && track.option2) {
    option = track.option2.split(" ");
    isOk = optionAllowed.includes(option[0]);
  }
  return isOk;
}

module.exports = validators;
