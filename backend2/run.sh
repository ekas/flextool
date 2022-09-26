docker build -t flextool-backend .
docker run -d -t -p 5000:5000 --env-file .env flextool-backend