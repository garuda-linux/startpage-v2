{
  description = "Garuda Startpage ❄️";

  inputs = {
    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nixpkgs.url = "https://channels.nixos.org/nixos-unstable/nixexprs.tar.zst";
    systems.url = "github:nix-systems/default";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      nixpkgs,
      self,
      systems,
      treefmt-nix,
      ...
    }:
    let
      eachSystem = f: nixpkgs.lib.genAttrs (import systems) (system: f nixpkgs.legacyPackages.${system});
      treefmtConfig = {
        programs = {
          deadnix.enable = true;
          nixfmt.enable = true;
          shellcheck.enable = true;
          shfmt.enable = true;
          statix = {
            disabled-lints = [ "repeated_keys" ];
            enable = true;
          };
          yamlfmt = {
            enable = true;
            settings = {
              exclude = [
                "pnpm-lock.yaml"
              ];
              formatter.include_document_start = true;
            };
          };
        };
      };
      treefmtEval = eachSystem (pkgs: treefmt-nix.lib.evalModule pkgs treefmtConfig);
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          name = "startpage";
          packages = [
            pkgs.gitMinimal
            pkgs.nodejs_26
            pkgs.pnpm_12
          ];
          shellHook = self.checks.${pkgs.stdenv.hostPlatform.system}.pre-commit-check.shellHook + ''
            # WebStorm's fish integration fails on the exported name variable (nix-shell-env).
            unset name

            FLAKE_ROOT=$(${nixpkgs.lib.getExe pkgs.gitMinimal} rev-parse --show-toplevel)
            SYMLINK_SOURCE_PATH="${treefmtEval.${pkgs.stdenv.hostPlatform.system}.config.build.configFile}"
            SYMLINK_TARGET_PATH="$FLAKE_ROOT/.treefmt.toml"

            if [[ -e "$SYMLINK_TARGET_PATH" && ! -L "$SYMLINK_TARGET_PATH" ]]; then
              echo "treefmt-nix: Error: Target exists but is not a symlink."
              exit 1
            fi

            if [[ -L "$SYMLINK_TARGET_PATH" ]]; then
              if [[ "$(readlink "$SYMLINK_TARGET_PATH")" != "$SYMLINK_SOURCE_PATH" ]]; then
                echo "treefmt-nix: Removing existing symlink"
                unlink "$SYMLINK_TARGET_PATH"
              fi
            fi

            if [[ ! -L "$SYMLINK_TARGET_PATH" ]]; then
              nix-store --add-root "$SYMLINK_TARGET_PATH" --indirect --realise "$SYMLINK_SOURCE_PATH"
              echo "treefmt-nix: Created symlink successfully"
            fi
          '';
        };
      });

      formatter = eachSystem (pkgs: treefmtEval.${pkgs.stdenv.hostPlatform.system}.config.build.wrapper);

      checks = eachSystem (pkgs: {
        pre-commit-check = inputs.git-hooks.lib.${pkgs.stdenv.hostPlatform.system}.run {
          hooks = {
            commitizen.enable = true;
            # Eslint pulls ~1GB of nix derivations, let's reuse node_modules instead
            eslint = {
              description = "Run eslint";
              enable = true;
              entry = "${nixpkgs.lib.getExe pkgs.pnpm_12} lint";
              name = "eslint";
              pass_filenames = false;
            };
            flake-checker.enable = true;
            prettier.enable = true;
            treefmt = {
              enable = true;
              args = [
                "--config-file"
                ".treefmt.toml"
              ];
            };
            yamllint.enable = true;
          };
          package = pkgs.prek;
          src = ./.;
        };
      });
    };
}
