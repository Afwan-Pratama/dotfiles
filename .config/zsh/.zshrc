# ~/.zshrc

# XDG Environment
export XDG_DATA_HOME=$HOME/.local/share
export XDG_CONFIG_HOME=$HOME/.config
export XDG_STATE_HOME=$HOME/.local/state
export XDG_CACHE_HOME=$HOME/.cache
export PATH=$HOME/.local/bin:$PATH
export PATH=$HOME/.bun/bin:$PATH

# Regular Environment
export ANDROID_HOME="$XDG_DATA_HOME"/android
export BAT_THEME="Catppuccin-mocha"
export CARGO_HOME="$XDG_DATA_HOME"/cargo
export CUDA_CACHE_PATH="$XDG_CACHE_HOME"/nv
export GNUPGHOME="$XDG_DATA_HOME"/gnupg
export GOPATH="$XDG_DATA_HOME"/go
export GTK2_RC_FILES="$XDG_CONFIG_HOME"/gtk-2.0/gtkrc
export PARALLEL_HOME="$XDG_CONFIG_HOME"/parallel
export LESSHISTFILE="$XDG_CACHE_HOME"/less/history
export RUSTUP_HOME="$XDG_DATA_HOME"/rustup
export WINEPREFIX="$XDG_DATA_HOME"/wine
export PNPM_HOME="/home/xenom/.local/share/pnpm"
case ":$PATH:" in
    *":$PNPM_HOME:"*) ;;
    *) export PATH="$PNPM_HOME:$PATH" ;;
esac


alias svn="svn --config-dir $XDG_CONFIG_HOME/subversion"
alias ..='cd ..'
alias ...='cd ../..'
alias ls='ls --color=auto -t'
alias cls='clear'
alias rm='printf "\033[1;31m" && rm -rIf'
alias cp='printf "\033[1;32m" && cp -rv'
alias mv='printf "\033[1;34m" && mv -v'
alias mkdir='printf "\033[1;33m" && mkdir -v'
alias rmdir='printf "\033[1;35m" && rmdir -v'
alias l='eza --icons -l -L=1'
alias ll='eza --icons -l -L=1 -a'
alias la='eza --icons -L=1 -a'
alias gcl='git clone --depth 1'
alias gi='git init'
alias ga='git add'
alias gc='git commit -m'
alias gp='git push origin'
alias gpl='git pull'
alias gsw='git switch'
alias gco='git checkout'
alias v='nvim'
alias co='cd Documents/Explore'
alias cg='cd Documents/Git'
alias cln='doas pacman -Rns $(pacman -Qtdq)'

# History
HISTSIZE=500
SAVEHIST=1000
HISTFILE=.cache/zsh_history

eval "$(starship init zsh)"
uwufetch

# Load plugin
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh

autoload -U compinit
zstyle ':completion:*' menu select
zmodload zsh/complist
compinit -d "$XDG_CACHE_HOME"/zsh/zcompdump-"$ZSH_VERSION"

_comp_options+=(globdots)autoload -Uz up-line-or-beginning-search down-line-or-beginning-search
zle -N up-line-or-beginning-search
zle -N down-line-or-beginning-search

# bun completions
[ -s "/home/xenom/.bun/_bun" ] && source "/home/xenom/.bun/_bun"
