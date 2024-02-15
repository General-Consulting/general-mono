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

      systems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin" ];
      imports = [
        inputs.flake-root.flakeModule
        inputs.treefmt-nix.flakeModule
        inputs.mission-control.flakeModule
      ];



      perSystem = { pkgs, system, self', config, inputs', lib, ... }: 

       let 
      nextUser = pkgs.runCommand "user" {} ''
        mkdir -p $out/etc
        echo "nextjs:x:1000:1000:nextjs:/home/nextjs:/bin/false" > $out/etc/passwd
        echo "nextjs:x:1000:" > $out/etc/group
        echo "nextjs:!:1::::::" > $out/etc/shadow
      '';

      dockerImage = pkgs.dockerTools.buildImage {
        name = "app";
        tag = "latest";
        copyToRoot = [
          # Uncomment the coreutils and bash if you want to be able to use a shell environment
          # inside the container.
          #pkgs.coreutils
          #pkgs.bash
          nextUser
          pkgs.nodejs-18_x
          pdf-app
        ];
        config = {
          Cmd = [ "node" "server.js" ];
          User = "nextjs:nextjs";
          Env = [ "NEXT_TELEMETRY_DISABLED=1" ];
          ExposedPorts = {
              "3000/tcp" = {};
          };
          WorkingDir = "/app";
        };
      };



        pdf-app = pkgs.buildNpmPackage {
          name = "dulcet23";

          buildInputs = with pkgs; [
            nodejs-18_x
          ];

          src = ./nextjs/dulcet23/.;

          npmDepsHash = "sha256-Pnv2GewP+z1dxY0c1Lj0T8vxrvL09EZMwryeGksro4M=";

          installPhase = ''
            mkdir -p $out
            cp -r .next/* $out
          '';
        };
        in 
      {


        
        packages = {
            pdf-app = pdf-app;
            dockerImage = dockerImage;
            default = pdf-app;
          };
    

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

          k8s = {
            description = "start minikube cluster";
            exec = "just cluster";
          };

          pdf = {
            description = "NextJS PDF Dev";
            exec = "just devjs";
          };

          dash = {
            description = "A Dashboard for the minikube cluster";
            exec = "just dashboard";
          };

          apply = {
            description = "Apply the kubernetes manifests";
            exec = "just k8sapply";
          };

          build = {
            description = "Use nix to build the PDF nextjs app";
            exec = "nix build";
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
