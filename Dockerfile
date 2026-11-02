FROM nginxinc/nginx-unprivileged:alpine

COPY --chown=nginx:nginx index.html style.css script.js /usr/share/nginx/html/

USER nginx

EXPOSE 8080