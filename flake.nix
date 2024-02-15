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
        inputs.devshell.flakeModule
      ];



      perSystem = { pkgs, system, self', config, inputs', lib, ... }: 

       let 
      nextUser = pkgs.runCommand "user" {} ''
        mkdir -p $out/etc
        echo "nextjs:x:1000:1000:nextjs:/home/nextjs:/bin/false" > $out/etc/passwd
        echo "nextjs:x:1000:" > $out/etc/group
        echo "nextjs:!:1::::::" > $out/etc/shadow
      '';

        pdf-app = pkgs.buildNpmPackage {
          name = "dulcet23";

          buildInputs = with pkgs; [
            nodejs-18_x
          ];

          src = ./nextjs/dulcet23/.;

          npmDepsHash = "sha256-Pnv2GewP+z1dxY0c1Lj0T8vxrvL09EZMwryeGksro4M=";

          installPhase = ''
            mkdir -p $out/app/.next
            cp -r public $out/app
            cp -r .next/standalone/* $out/app
            cp -r .next/server $out/app/.next
            cp -r .next/BUILD_ID $out/app/.next
            cp -r .next/*manifest.json $out/app/.next
            cp -r .next/static $out/app/.next/static
          '';
        };
      dockerImagePdf = pkgs.dockerTools.buildImage {
        name = "generalconsulting/pdf-app";
        tag = "latest";
        copyToRoot = [
          # Uncomment coreutils and bash to use a shell environment inside the container.
          pkgs.coreutils
          pkgs.bash
          pkgs.busybox
          nextUser
          pkgs.nodejs-18_x
          pdf-app
        ];
        config = {
          Cmd = [ "node" "server.js"];
          User = "nextjs:nextjs";
          Env = [ "NEXT_TELEMETRY_DISABLED=1" ];
          ExposedPorts = {
              "3000/tcp" = {};
          };
          WorkingDir = "/app";
        };
      };

        in 
      {


        
        packages = {
            pdf-app = pdf-app;
            dockerImagePdf = dockerImagePdf;
            default = pdf-app;
          };
    

        treefmt.config = {
          inherit (config.flake-root) projectRootFile;
          package = pkgs.treefmt;
          programs.nixpkgs-fmt.enable = true;
          programs.prettier.enable = true;
          programs.prettier.includes = [ "*.tsx" ];
        };

        
        devshells.default = {
          packages = with pkgs; [
            just
            config.treefmt.build.wrapper
            minikube
            nodejs
            yarn
            kustomize
            cargo
          ];

        commands = [
         {
            name = "fmt";
            help = "format the whole repo";
            command = "just fmt";
         }

          {
            name = "k8s";
            help = "start minikube cluster";
            command = "just cluster";
          }

          {
            name = "pdf";
            help = "NextJS PDF Dev";
            command = "just devjs";
          }

          {
            name = "dash";
            help = "A Dashboard for the minikube cluster";
            command = "just dashboard";
          }

          {
            name = "apply";
            help = "Apply the kubernetes manifests";
            command = "just k8sapply";
          }

          {
            name = "build-pdf";
            help = "Use nix to build the PDF nextjs app";
            command = "nix build";
          }
          {
            name = "docker-build-pdf" ;
            help = "Use nix to build a docker image for the pdf-app";
            command = "nix build .#dockerImagePdf && docker load < ./result";
          }

        ];



        };
      };
    };
}
