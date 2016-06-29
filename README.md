# ConCaVa GUI

> Graphical interface for managing ConCaVa metadata.

## Usage

```bash
git clone https://github.com/kukua/concava-gui.git
cd concava-gui

cp src/js/config.js.example src/js/config.js
# > Edit src/js/config.js

npm install
grunt build
npm start
# > Navigate to localhost:8080

# Developing
grunt watch
npm start

# Production
# > Edit port in docker-compose.yml
docker-compose up -d
```

## License

This software is licensed under the [MIT license](https://github.com/kukua/concava-gui/blob/master/LICENSE).

© 2016 Kukua BV
