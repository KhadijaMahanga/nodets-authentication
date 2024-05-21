# Stage-1 & specify a name 'builder'
FROM  node:latest AS builder

# Create a directory  and go to the directory 
WORKDIR /app

# Copy the package.json file to the root of current directory (which is /app)
COPY package.json .

# Install the dependencies listed on the package.json
RUN npm install

# Copy other files to the app directory
COPY . .

# Build and optimize static file
RUN npm run build


# https://stackoverflow.com/questions/73964895/why-do-we-need-nginx-to-dockerize-react-apps
# Production Image we use nginx

# Use nginx as the production server
FROM nginx:latest AS prod

# Copy the static file to my Nginx web server directory to serve static contain
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Open the port for the nginx server
EXPOSE 3000
# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]


# No need for nginx for development

FROM builder AS dev

EXPOSE 3000

CMD ["npm", "start"]

