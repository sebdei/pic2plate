https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html#with-userapp-walkthrough-custom-events-list-functions

# Deploy AWS Lambda Function

`npm run deploy`

# Create AWS Lambda Function

`zip suggest-recipe/function.zip suggest-recipe/index.js`

`aws lambda create-function --function-name pic2plate-suggest-recipe --memory-size 256 --timeout 25 --zip-file fileb://suggest-recipe/function.zip --handler index.handler --runtime nodejs18.x --role arn:aws:iam::265131218627:role/lambda-ex`

# Start Local Development with AWS sam

`sam local start-api --host 0.0.0.0 --env-vars .env.json`
