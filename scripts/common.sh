# Define colors
RED=$'\e[1;31m'
GREEN=$'\e[1;32m'
YELLOW=$'\e[1;33m'
BLUE=$'\e[1;34m'
PINK=$'\e[1;35m'
CYAN=$'\e[1;36m'
WHITE=$'\e[1;97m'
ORANGE=$'\e[1;91m'
PURPLE=$'\e[1;95m'
GRAY=$'\e[1;37m'
DARK_GREEN=$'\e[1;92m'
DARK_BLUE=$'\e[1;94m'
DARK_CYAN=$'\e[1;96m'
LIGHT_YELLOW=$'\e[1;93m'
LIGHT_BLUE=$'\e[1;94m'
LIGHT_CYAN=$'\e[1;96m'
LIGHT_PURPLE=$'\e[1;95m'
LIGHT_GRAY=$'\e[1;37m'
MAGENTA=$'\e[1;35m'
BROWN=$'\e[1;33m'
MAROON=$'\e[1;31m'         # Added maroon color
TEAL=$'\e[1;36m'           # Added teal color
OLIVE=$'\e[1;33m'          # Added olive color
NAVY=$'\e[1;34m'           # Added navy color
FUCHSIA=$'\e[1;35m'        # Added fuchsia color
AQUA=$'\e[1;36m'           # Added aqua color
COLOR_END=$'\e[0m'

declare -A confmap

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
PROJECT_DIR=$SCRIPTPATH

# Function to print text in all colors
# Function to print text in all colors
print_all_colors() {
    echo "${RED}This is red.${COLOR_END}"
    echo "${GREEN}This is green.${COLOR_END}"
    echo "${YELLOW}This is yellow.${COLOR_END}"
    echo "${BLUE}This is blue.${COLOR_END}"
    echo "${PINK}This is pink.${COLOR_END}"
    echo "${CYAN}This is cyan.${COLOR_END}"
    echo "${WHITE}This is white.${COLOR_END}"
    echo "${ORANGE}This is orange.${COLOR_END}"
    echo "${PURPLE}This is purple.${COLOR_END}"
    echo "${GRAY}This is gray.${COLOR_END}"
    echo "${DARK_GREEN}This is dark green.${COLOR_END}"
    echo "${DARK_BLUE}This is dark blue.${COLOR_END}"
    echo "${DARK_CYAN}This is dark cyan.${COLOR_END}"
    echo "${LIGHT_YELLOW}This is light yellow.${COLOR_END}"
    echo "${LIGHT_BLUE}This is light blue.${COLOR_END}"
    echo "${LIGHT_CYAN}This is light cyan.${COLOR_END}"
    echo "${LIGHT_PURPLE}This is light purple.${COLOR_END}"
    echo "${LIGHT_GRAY}This is light gray.${COLOR_END}"
    echo "${MAGENTA}This is magenta.${COLOR_END}"
    echo "${BROWN}This is brown.${COLOR_END}"
    echo "${MAROON}This is maroon.${COLOR_END}"
    echo "${TEAL}This is teal.${COLOR_END}"
    echo "${OLIVE}This is olive.${COLOR_END}"
    echo "${NAVY}This is navy.${COLOR_END}"
    echo "${FUCHSIA}This is fuchsia.${COLOR_END}"
    echo "${AQUA}This is aqua.${COLOR_END}"
}
function displayGreen() {
  echo -e $GREEN $1 $COLOR_END
}
function displayRed() {
  echo -e $RED $1 $COLOR_END
}
function displayCYAN() {
  echo -e $CYAN $1 $COLOR_END
}
function displayPINK() {
  echo -e $PINK $1 $COLOR_END
}
function displayYELLOW() {
  echo -e $YELLOW $1 $COLOR_END
}


# Function to draw rectangle border
draw_rectangle() {
    local length=$1
    for (( i = 0; i < length; i++ )); do
        echo -n "-"
    done
    echo ""
}