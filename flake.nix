{
  description = "Hacker Sundae Monorepo";

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

          shellHook = ''
            PS1='[\[\033[32m\]\w]\[\033[0m\]\n\[\033[1;36m\]DEV\[\033[1;33m\]-> \[\033[0m\]'
            echo 'General Consulting Dev Shell'
            alias gb='git branch'
            alias gco='git checkout'
            alias gs='git status'
            alias pull='git pull'
            alias push='git push'
          '';
        };

      });
}
