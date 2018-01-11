import boto3

# Initialize S3 client
# second argument is the location of AWS server
s3 = boto3.client('s3', 'us-west-2')

# To create a file, and upload its contents in S3.
s3.put_object(Body=password, Bucket=<S3_bucket_name>, Key=<file_name>)


# To read contents of a file saved in an S3 bucket
file_contents = s3_client.get_object(Bucket=<S3_bucket_name>, Key=<file_name>)['Body'].read()
