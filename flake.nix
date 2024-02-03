{
  description = "General Consulting Mono Repo";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell.url = "github:numtide/devshell";
    mission-control.url = "github:Platonic-Systems/mission-control";
    flake-root.url = "github:srid/flake-root";

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };

  };

  outputs = { self, nixpkgs, flake-utils, devshell, flake-parts, mission-control, flake-root }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = nixpkgs.lib.systems.flakeExposed;
      imports = [
        inputs.flake-root.flakeModule
        inputs.mission-control.flakeModule
      ];

      perSystem = { pkgs, system, self', config, inputs', lib,... }: {
          mission-control.scripts = {
              hello = {
                  description = "say hi";
                  exec = "echo hi";
                };
                          fmt = {
            description = "Format the top-level Nix files";
            exec = "${lib.getExe pkgs.nixpkgs-fmt} ./*.nix";
            category = "Tools";
          };
            };
        devShells.default = pkgs.mkShell {

          inputsFrom = [ config.mission-control.devShell ];
          };
        };

      };
}
