import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'

app.use(express.static('client/build'));

app.get("/*", function(req, res) {
  res.sendFile(path.join(client/build, "index.html"));
});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);