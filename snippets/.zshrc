export PATH=/usr/local/bin:$PATH
export EDITOR=vim

# git auto completion
if [ -f ~/.git-completion.bash ]; then
    . ~/.git-completion.bash
fi

# Git
git config --global color.ui true
git config --global format.pretty oneline
git config --global core.autocrl input
git config --global core.fileMode true
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# setting PROMPT
setopt prompt_subst
autoload -Uz vcs_info
zstyle ':vcs_info:*' actionformats \
    '%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{3}|%F{1}%a%F{5}]%f '
zstyle ':vcs_info:*' formats       \
    '%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{5}]%f '
zstyle ':vcs_info:(sv[nk]|bzr):*' branchformat '%b%F{1}:%F{3}%r'

zstyle ':vcs_info:*' enable git cvs svn

vcs_info_wrapper() {
  vcs_info
  if [ -n "$vcs_info_msg_0_" ]; then
    echo "%{$fg[grey]%}${vcs_info_msg_0_}%{$reset_color%}$del"
  fi
}
RPROMPT=$'$(vcs_info_wrapper)'
PS1=$'%(?..%B%K{red}[%?]%K{def}%b )%(1j.%b%K{yel}%F{bla}%jJ%F{def}%K{def} .)%F{red}%~ \n%F{mag}%(!.#.>) %F{def} %b'

# virtualenv
alias venv="source /Users/bismillah/Desktop/eveninghobby/venv/bin/activate"

# git
alias gs="git status -s"
alias ga="git add ."
alias gc="git commit"
alias gp="git push"
alias gpr="git pull --rebase"

# django
alias rs="python manage.py runserver"
alias sp="python manage.py shell_plus --ipython"
alias mm="python manage.py makemigrations"
alias m="python manage.py migrate"

# git shortcuts
alias ck="git checkout"
alias log="git log -5"
alias whose_commit="git --no-pager show -s --format='%an <%ae>'"
alias what_files="git diff-tree --no-commit-id --name-only -r"
alias commit_time="git show -s --format=%ci"
alias git_latest="git fetch --all; git checkout master; git pull --rebase;"
alias gpf="git push --force"

# ls
alias ls='ls -laghFG'
alias ll='ls -laghFG'
alias l='ls -laghFG'
alias text='open -a TextEdit'
alias pre='open -a Preview'
alias cd..='cd ..'

# zsh
alias reload='source ~/.zshrc'
alias zsh="vim ~/.zshrc"

# Common Mac programs
alias text='open -a TextEdit'
alias pre='open -a Preview'
alias pwdfailed='syslog -k Time ge -24h | egrep -e "sshd|ftpd|afp|vnc"'
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

# git alias
alias push='git pull origin master && git push origin master'
alias pull='git pull origin master'
alias clone='git clone $1'

alias python='ipython'

# grep
alias grep='grep -n'

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm use 20.11.1
cd /Users/bismillah/Desktop/eveninghobby
venv
