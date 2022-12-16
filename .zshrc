# ~/.zshrc

eval "$(starship init zsh)"

colorscript random

alias ..='cd ..'
alias ...='cd ../..'
alias ls='ls --color=auto -t'
alias cls='clear'
alias rm='printf "\033[1;31m" && rm -rIv'
alias cp='printf "\033[1;32m" && cp -rv'
alias mv='printf "\033[1;34m" && mv -v'
alias mkdir='printf "\033[1;33m" && mkdir -v'
alias rmdir='printf "\033[1;35m" && rmdir -v'
alias l='ls -lh'
alias ll='ls -lah'
alias la='ls -a'
alias lm='ls -m'
alias lr='ls -R'
alias lg='ls -l --group-directories-first'
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
alias cg='cd Documents/Github'
alias cln='doas pacman -Rns $(pacman -Qtdq)'

# History
HISTSIZE=500
SAVEHIST=1000
HISTFILE=.cache/zsh_history

source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh


autoload -U compinit
zstyle ':completion:*' menu select
zmodload zsh/complist
compinit

_comp_options+=(globdots)autoload -Uz up-line-or-beginning-search down-line-or-beginning-search
zle -N up-line-or-beginning-search
zle -N down-line-or-beginning-search
