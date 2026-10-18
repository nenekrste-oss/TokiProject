FROM nginx:alpine

# Copy website files to Nginx web root
COPY TokiProject/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
