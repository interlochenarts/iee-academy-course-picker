#!/bin/bash

FILE='IEE_AcademyRequestsAngular'
EXT='resource'
FOLDER='Salesforce/src/staticresources'

# remove old zip file if it exists
if [ -f $FOLDER/$FILE.$EXT ]; then
   rm $FOLDER/$FILE.$EXT;
   echo -e "removed old version of $FILE.$EXT\n"
else
   echo -e "$FILE.$EXT does not exist\n"
fi

cd dist

# compress new version
echo -e "Compressing files to $FILE.$EXT"
zip -r "../$FOLDER/$FILE.$EXT" *

echo -e "\nFinished creating $FILE.$EXT\n"
