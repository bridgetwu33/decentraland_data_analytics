#!/bin/bash
source common.sh

# Set the base URL
BASE_URL="http://localhost:8000/api/nft"

# Function to make curl requests
make_curl_request() {
    local ENDPOINT="$1"
    local DATA="$2"
    curl -X POST -H 'Content-Type: application/json' "$BASE_URL/$ENDPOINT" --data "$DATA"
    main
}
 
function process_all_marketplace_data() {
  displayGreen "---------- running process all marketplace data ------------"
    # Prepopulate the category input with "estate"
  CATEGORY="estate"

  # Validate and prompt for category input until a valid option is entered
  while true; do
    read -p "Enter Category (wearable/parcel/estate, default is estate): " user_input
    # Use the user input if it's not empty, otherwise, use the prepopulated "estate"
    CATEGORY=${user_input:-$CATEGORY}
    case "$CATEGORY" in
      wearable|parcel|estate)
        break # Exit loop if input is valid
        ;;
      *)
        echo "Invalid category. Please enter a valid option (wearable, parcel, or estate)."
        ;;
    esac
  done
   make_curl_request "processAllMarketplaceDatas" "{\"category\": \"$CATEGORY\"}"
}
function prepare_process_data() {
  displayGreen "---------- running prepare process data Date Format  YYYYMMDD (20240305)------------"
  read -p "Enter From Date: " FROM_DATE
  read -p "Enter To Date: " TO_DATE
  read -p "Include From Date (true/false): " INCLUDE_FROM_DATE
  make_curl_request "prepareProcessData" "{\"from\": \"$FROM_DATE\", \"to\": \"$TO_DATE\", \"includeFromDate\": $INCLUDE_FROM_DATE}"
  main
}

function run_selected_day() {
  displayGreen "---------- run selected dat ------------"
  # Prompt for user input
  read -p "Enter Selected Date: " SELECTED_DATE

  # Prepopulate the category input with "estate"
  CATEGORY="estate"

  # Validate and prompt for category input until a valid option is entered
  while true; do
    read -p "Enter Category (wearable/parcel/estate, default is estate): " user_input
    # Use the user input if it's not empty, otherwise, use the prepopulated "estate"
    CATEGORY=${user_input:-$CATEGORY}
    case "$CATEGORY" in
      wearable|parcel|estate)
        break # Exit loop if input is valid
        ;;
      *)
        echo "Invalid category. Please enter a valid option (wearable, parcel, or estate)."
        ;;
    esac
  done
  read -p "Enter Page Size: " PAGESIZE
  # Make curl request with provided data
  make_curl_request "processMarketplaceByDate" "{\"category\": \"$CATEGORY\", \"day\": \"$SELECTED_DATE\",\"pageSize\": \"$PAGESIZE\",\"pageNumber\": 1, \"maxSize\": 500}"
  main
}

function main() {

    if [ -z "$NON_INTERACTIVE" ]; then
	    flagmain=true
        echo ""
	    echo -e $YELLOW'Please enter a choice: \n\n' \
	     $GRAY'1) Prepare Process Data \n' \
         $GRAY'2) Run Selected Day \n' \
         $GRAY'3) Process All Marketplace Data \n' \
	     $RED'*) Enter any other key to Exit'
        echo ""
	    printf $WHITE'choice (1-n): '$COLOR_END

	    read choice
    fi

    case $choice in
        1)
            prepare_process_data;;
        2)
            run_selected_day;;
        3)
            process_all_marketplace_data;;                                 
        *)
            echo "Exit"	;;
    esac
}
SHOW_MENU=1
if [[ $# -gt 0 ]]; then
    SHOW_MENU=0
fi

main $@