{
  description = "General Consulting Mono Repo";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell.url = "github:numtide/devshell";
    mission-control.url = "github:General-Consulting/mission-control";
    flake-root.url = "github:srid/flake-root";

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };

    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, devshell, flake-parts, mission-control, flake-root, treefmt-nix, ... }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {

      systems = nixpkgs.lib.systems.flakeExposed;
      imports = [
        inputs.flake-root.flakeModule
        inputs.treefmt-nix.flakeModule
        inputs.mission-control.flakeModule
      ];



      perSystem = { pkgs, system, self', config, inputs', lib, ... }: {

        treefmt.config = {
          inherit (config.flake-root) projectRootFile;
          package = pkgs.treefmt;
          programs.nixpkgs-fmt.enable = true;
          programs.prettier.enable = true;
          programs.prettier.includes = [ "*.tsx" ];
        };

        mission-control.scripts = {
          fmt = {
            description = "format the whole repo";
            exec = "just fmt";
          };

          ks = {
            description = "start minikube cluster";
            exec = "just cluster";
          };

          npd = {
            description = "NextJS PDF Dev";
            exec = "just devjs";
          };

          kd = {
            description = "A Dashboard for the minikube cluster";
            exec = "just dashboard";
          };

          ka = {
            description = "Apply the kubernetes manifests";
            exec = "just k8sapply";
          };

        };

        devShells.default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            just
            config.treefmt.build.wrapper
            minikube
            nodejs
            yarn
            kustomize
          ];

          inputsFrom = [
            config.flake-root.devShell
            config.treefmt.build.devShell
            config.mission-control.devShell
          ];
        };
      };
    };
}
