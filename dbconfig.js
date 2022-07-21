// const config = {
//   user: "sa",
//   password: "12345",
//   server: "DESKTOP-R6D3R5Q",
//   database: "sparta",
//   options: {
//     trustedconnections: true,
//     enableArithAbort: true,
//     instancename: "SQLEXPRESS",
//   },
//   port: 1433,
// };
const config = {
  user: "sa",
  password: "12345",
  database: "sparta",
  server: "DESKTOP-R6D3R5Q",
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    // encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

module.exports = config;
