# XDG Environment
export XDG_DATA_HOME=$HOME/.local/share
export XDG_CONFIG_HOME=$HOME/.config
export XDG_STATE_HOME=$HOME/.local/state
export XDG_CACHE_HOME=$HOME/.cache

export CARGO_HOME="$XDG_DATA_HOME"/cargo
export CUDA_CACHE_PATH="$XDG_CACHE_HOME"/nv
export GNUPGHOME="$XDG_DATA_HOME"/gnupg
export GOPATH="$XDG_DATA_HOME"/go
export PATH="$HOME/.local/bin:$PATH"

export TAURI_SIGNING_PRIVATE_KEY="$HOME/.tauri/tobacco-app.key"

export EDITOR=nvim

alias cln='sudo pacman -Rns $(pacman -Qtdq)'

alias v='nvim'

alias cd='z'

alias sudo='sudo-rs'

alias ls='eza --icons=always $eza_params '
alias l='eza --git-ignore --icons=always $eza_params'
alias ll='eza --all --header --icons=always --long $eza_params'
alias llm='eza --all --header --long --icons=always --sort=modified $eza_params'
alias la='eza -lbhHigUmuSa --icons=always'
alias lx='eza -lbhHigUmuSa@ --icons=always'
alias lt='eza --tree $eza_params --icons=always'
alias tree='eza --tree $eza_params --icons=always'

alias ..='z ..'
alias ...='z ../..'
alias cls='clear'
alias cat='bat'
alias fd='fd -Lu'
alias rm='printf "\033[1;31m" && rm -rIf'
alias cp='printf "\033[1;32m" && cp -rv'
alias mv='printf "\033[1;34m" && mv -v'
alias mkdir='printf "\033[1;33m" && mkdir -pv'
alias rmdir='printf "\033[1;35m" && rmdir -v'

eval "$(zoxide init zsh)"
eval "$(starship init zsh)"

# History
HISTSIZE=500
SAVEHIST=1000
HISTFILE=.cache/zsh_history

# Load plugin
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh

# bun completions
[ -s "/home/xenom/.bun/_bun" ] && source "/home/xenom/.bun/_bun"

swiftfetch
