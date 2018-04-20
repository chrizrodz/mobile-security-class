const express = require('express');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

const app = express();
const port = process.env.PORT || 3001;

// Configuration to connect to database
const dbConfig = {
    user: "admin",
    password: "password",
    connectString: "localhost/ORCL" // Address/(SID or Service)
};

// Allows server to be used by the front end on local machine
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Retrieves list of users from the database
app.get('/api/Users', (req, res) => {
    // Gets database connection
    oracledb.getConnection(dbConfig,
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            // Executes SQL code through connection
            connection.execute(`SELECT * FROM USERS`,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var rows = [];

                    // Formats the returne data to be easily usable by the front-end
                    for (var i = 0; i < result.rows.length; i++) {
                        var obj = {};
                        for (var j = 0; j < result.metaData.length; j++) {
                            obj[result.metaData[j].name] = result.rows[i][j];
                        }
                        rows.push(obj);
                    }
                    res.send(rows);
                    doRelease(connection);
                });
        });
});

// Vulnerable version of saving a user that allows SQL injection
app.post('/api/Vulnerable', (req, res) => {
    oracledb.getConnection(dbConfig,
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                `BEGIN
                    INSERT INTO USERS (FIRST_NAME, LAST_NAME, ROLE) VALUES ('` + req.query.firstName + `', '` + req.query.lastName + `', 'User')
                END;`,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.send('Success');
                    doRelease(connection);
                });
        });
});

// Secure version of saving a user that SQL is not as easily injected into
app.post('/api/Secure', (req, res) => {
    oracledb.getConnection(dbConfig,
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                `INSERT INTO USERS (FIRST_NAME, LAST_NAME, ROLE) VALUES (:firstName, :lastName, 'User') `, {
                    firstName: req.query.firstName,
                    lastName: req.query.lastName
                },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.send('Success');
                    doRelease(connection);
                });
        });
});

// Tells server to listen for activity on given port
app.listen(port, () => console.log(`Listening on port ${port} `));

// Function to release the database connection so we are not creating more than 1 at a time.
function doRelease(connection) {
    connection.close(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}
