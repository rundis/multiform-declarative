var config = module.exports;

config["Browser tests"] = {
  libs: ["external/underscore.js", "external/cull.js", "external/**.js"],
  sources: ["lib/**/*.js"],
  tests: ["test/**/*-test.js"],
  environment: "browser"
};
