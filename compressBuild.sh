#!/bin/bash

FILE='IEE_AcademyRequestsAngular'
EXT='resource'
FOLDER='Salesforce/src/staticresources'
DIST_FOLDER='dist/iee-academy-course-picker'

# remove old zip file if it exists
if [ -f $FOLDER/$FILE.$EXT ]; then
   rm $FOLDER/$FILE.$EXT;
   echo -e "removed old version of $FILE.$EXT\n"
else
   echo -e "$FILE.$EXT does not exist\n"
fi

if [ ! -d "$FOLDER" ]; then
   mkdir -p $FOLDER;
fi

cd $DIST_FOLDER || exit

# compress new version
echo -e "Compressing files to $FILE.$EXT"
zip -r "../../$FOLDER/$FILE.$EXT" *

if [ ! -f "../../$FOLDER/$FILE.$EXT" ]; then
  >&2 echo -e "Failed to create resource"
else
  echo -e "\nFinished creating $FILE.$EXT\n"
fi
