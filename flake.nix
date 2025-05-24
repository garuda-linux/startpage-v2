{
  description = "Garuda Startpage ❄️";

  inputs = {
    devshell = {
      url = "github:numtide/devshell";
      flake = false;
    };
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    pre-commit-hooks = {
      url = "github:cachix/pre-commit-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    flake-parts,
    nixpkgs,
    pre-commit-hooks,
    self,
    ...
  } @ inp: let
    inputs = inp;
    perSystem = {
      pkgs,
      system,
      ...
    }: {
      apps.default = self.outputs.devShells.${system}.default.flakeApp;
      checks.pre-commit-check = pre-commit-hooks.lib.${system}.run {
        hooks = {
          alejandra-quiet = {
            description = "Run Alejandra in quiet mode";
            enable = true;
            entry = ''
              ${pkgs.alejandra}/bin/alejandra --quiet
            '';
            files = "\\.nix$";
            name = "alejandra";
          };
          commitizen.enable = true;
          # Eslint pulls ~1GB of nix derivations, let's reuse node_modules instead
          eslint = {
            description = "Run eslint";
            enable = true;
            entry = ''
              ${pkgs.corepack_latest}/bin/pnpm lint
            '';
            name = "eslint";
            pass_filenames = false;
          };
          flake-checker.enable = true;
          prettier.enable = true;
          yamllint.enable = true;
        };
        src = ./.;
      };

      # Handy devshell for working with this flake
      devShells = let
        # Import the devshell module as module rather than a flake input
        makeDevshell = import "${inp.devshell}/modules" pkgs;
        mkShell = config:
          (makeDevshell {
            configuration = {
              inherit config;
              imports = [];
            };
          })
          .shell;
      in rec {
        default = garuda-startpage;
        garuda-startpage = mkShell {
          commands = [
            {package = "corepack_latest";}
            {package = "nodejs_latest";}
            {package = "pre-commit";}
          ];
          devshell = {
            name = "startpage";
            startup.preCommitHooks.text = ''
              ${self.checks.${system}.pre-commit-check.shellHook}

              if [ ! -d node_modules ]; then
                ${pkgs.corepack_latest}/bin/pnpm install
              else
                outcome=$(${pkgs.corepack_latest}/bin/pnpm install)
                if  [[ !  "$outcome" =~ "Already up to date" ]]; then
                  echo "Dependencies have been updated"
                fi
              fi
            '';
          };
          env = [
            {
              name = "NIX_PATH";
              value = "${nixpkgs}";
            }
          ];
        };
      };

      # By default, alejandra is WAY to verbose
      formatter = pkgs.writeShellScriptBin "alejandra" ''
        exec ${pkgs.alejandra}/bin/alejandra --quiet "$@"
      '';
    };
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.pre-commit-hooks.flakeModule
      ];
      systems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];
      inherit perSystem;
    };
}
