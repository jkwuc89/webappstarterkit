import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev"

// Our HTTP server port
const port = 3000;
const app = express();

// Create an instance of the webpack compiler
const compiler = webpack(config);

// Tell Express to use the web app configured inside the webpack config
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get("/", function(request, response) {
    // __dirname = current directory from which we are running
    response.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function(error) {
    if (error) {
        console.log(error);
    } else {
        open("http://localhost:" + port);
    }
});
