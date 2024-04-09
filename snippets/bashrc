export PATH=/usr/local/bin:$PATH
export EDITOR=vim

export HISTCONTROL=ignoredups:erasedups  # no duplicate entries
export HISTSIZE=100000                   # big big history
export HISTFILESIZE=100000               # big big history
shopt -s histappend                      # append to history, don't overwrite it

# Save and reload the history after each command finishes
export PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"

# Setting PATH for Python 3.5
# The original version is saved in .bash_profile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.5/bin:${PATH}"
export PATH

# git auto completion
if [ -f ~/.git-completion.bash ]; then
    . ~/.git-completion.bash
fi

# alias to compile C++ on mac
alias cpp='sudo clang++ -std=c++11 -stdlib=libc++'

# make a frog noise on mac
alias bing='afplay /System/Library/Sounds/Frog.aiff'

# open chrome
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

# git shortcuts
alias ck="git checkout"
alias log="git log -5"
alias whose_commit="git --no-pager show -s --format='%an <%ae>'"
alias what_files="git diff-tree --no-commit-id --name-only -r"
alias commit_time="git show -s --format=%ci"
alias git_latest="git fetch --all; git checkout master; git pull --rebase;"

export PATH=$PATH:.
# export PATH=$PATH:/usr/bin

export TEST_MODE=true

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Bash
export LSCOLORS=gxBxhxDxfxhxhxhxhxcxcx # dark background
alias ls='ls -laghFG'
alias ll='ls -laghFG'
alias l='ls -laghFG'
alias xcode='open -a xcode'
alias text='open -a TextEdit'
alias pre='open -a Preview'
alias cd..='cd ..'

# Common Mac programs
alias reload='source ~/.bash_profile'
alias xcode='open -a xcode'
alias mate='open -a TextMate'
alias sublime='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'
alias text='open -a TextEdit'
alias pre='open -a Preview'
alias pwdfailed='syslog -k Time ge -24h | egrep -e "sshd|ftpd|afp|vnc"'

# Grep
alias grep='grep -n'
export GREP_OPTIONS='--color=auto'
export GREP_COLOR='1;35;40'

export PS1="\[\033[32m\] \w \[\033[31m\]\`ruby -e \"print (%x{git branch 2> /dev/null}.split(%r{\n}).grep(/^\*/).first || '').gsub(/^\* (.+)$/, '(\1) ')\"\`\[\033[37m\]$\[\033[00m\]\n=>"
# export PS1="\[\033[38m\]\u\[\033[32m\] \w \[\033[31m\]\`ruby -e \"print (%x{git branch 2> /dev/null}.split(%r{\n}).grep(/^\*/).first $"

# Git
git config --global color.ui true
git config --global format.pretty oneline
git config --global core.autocrl input
git config --global core.fileMode true
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias push='git pull origin master && git push origin master'
alias pull='git pull origin master'
alias clone='git clone $1'

if [ -f $(brew --prefix)/etc/bash_completion ]; then
  . $(brew --prefix)/etc/bash_completion
fi

# Finder: show hiddeh files
defaults write com.apple.finder AppleShowAllFiles TRUE
# killall Finder

# Ruby Version Manager
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*


# Android
export ANDROID_SDK=/Applications/android-sdks/
export ANDROID_ROOT=$ANDROID_SDK
export ANDROID_HOME=$ANDROID_SDK

export ANDROID_NDK=/Applications/android-ndk-r8c
export NDK_ROOT=$ANDROID_NDK

export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools


_fab_completion() {
    COMPREPLY=()

    # Fab in the path?
    /usr/bin/which -s fab || return 0

    # Fabfile in this folder?
    [[ -e fabfile.py ]] || return 0

    local cur="${COMP_WORDS[COMP_CWORD]}"

    tasks=$(fab --shortlist)
    COMPREPLY=( $(compgen -W "${tasks}" -- ${cur}) )
}

complete -F _fab_completion fab

# MacPorts Installer addition on 2017-04-01_at_21:08:24: adding an appropriate PATH variable for use with MacPorts.
export PATH="/opt/local/bin:/opt/local/sbin:$PATH"
# Finished adapting your PATH environment variable for use with MacPorts.

