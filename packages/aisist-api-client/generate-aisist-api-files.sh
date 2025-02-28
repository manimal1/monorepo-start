#!/bin/bash

# Save the original value of NODE_TLS_REJECT_UNAUTHORIZED
ORIGINAL_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED

# Temporarily bypass certificate validation (only use if encountering SSL errors)
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Set preferred version of openapi-generator-cli
openapi-generator-cli version-manager set 7.9.0

# Step 1: Download the swagger.json file from the API docs URL
SWAGGER_URL="http://localhost:4000/swagger/json"
OUTPUT_DIR="./swagger"
OUTPUT_FILE="${OUTPUT_DIR}/aisist-swagger.json"
API_NAME="aisist"

# Create the output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Download the JSON file
curl -o $OUTPUT_FILE $SWAGGER_URL

# Step 2: Check if the file was downloaded successfully
if [[ ! -f $OUTPUT_FILE ]]; then
  echo "Failed to download swagger.json from ${SWAGGER_URL}"
  exit 1
fi

echo "Downloaded swagger.json from ${SWAGGER_URL} to ${OUTPUT_FILE}"

# Step 3: Generate TypeScript files using openapi-generator
GENERATOR_OUTPUT_DIR="packages/aisist-api-client/src"

# Run the openapi-generator command
openapi-generator-cli generate -i $OUTPUT_FILE -g typescript-axios -o $GENERATOR_OUTPUT_DIR

# Check if the command was successful
if [[ $? -ne 0 ]]; then
  echo "Failed to generate TypeScript files using openapi-generator"
  exit 1
fi

echo "TypeScript files have been successfully generated in ${GENERATOR_OUTPUT_DIR}"

# Step 4: Remove unnecessary files and folder
UNNECESSARY_DIR="${GENERATOR_OUTPUT_DIR}/.openapi-generator"
UNNECESSARY_FILES=(
  "${GENERATOR_OUTPUT_DIR}/.gitignore"
  "${GENERATOR_OUTPUT_DIR}/.npmignore"
  "${GENERATOR_OUTPUT_DIR}/.openapi-generator-ignore"
  "${GENERATOR_OUTPUT_DIR}/git_push.sh"
)

# Remove the unnecessary directory that was generated
rm -rf $UNNECESSARY_DIR

# Remove the unnecessary files that were generated
for FILE in "${UNNECESSARY_FILES[@]}"; do
  rm -f $FILE
done

echo "Removed unnecessary files and folder from ${GENERATOR_OUTPUT_DIR}"

# Step 5: Clean up - delete the swagger JSON file and its folder
rm -rf $OUTPUT_DIR

# Check if the directory was successfully deleted
if [[ -d $OUTPUT_DIR ]]; then
  echo "Failed to delete ${OUTPUT_DIR}"
  exit 1
fi

echo "Cleaned up: deleted ${OUTPUT_DIR} and its contents"