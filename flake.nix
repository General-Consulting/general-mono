{
  description = "General Consulting Mono Repo";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell.url = "github:numtide/devshell";

  };

  outputs = { self, nixpkgs, flake-utils, devshell }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
            inherit system;
            overlays = [ devshell.overlays.default];
          };
      in
      {

        devShell = pkgs.devshell.mkShell {
          imports = [ (pkgs.devshell.importTOML ./devshell.toml) ];
          motd =  ''
        {202}🔨 Welcome to {reset} {bold}{32}General Consulting Development{reset}{202} Environment{reset}
        $(type -p menu &>/dev/null && menu)
      '';
        };

      });
}
