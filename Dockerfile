FROM nginx:alpine

# Copy custom Nginx config on port 8080
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy website files to Nginx web root
COPY TokiProject/ /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
