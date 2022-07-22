const config = require("./dbconfig");
const sql = require("mssql");

// Get data from employee table
async function getDatas() {
  try {
    // let pool = await sql.connect(config);
    // let employees = await pool.request.query("select * from employee");
    await sql.connect(config);
    let employees = await sql.query("select * from employee");

    return employees.recordsets;
  } catch (err) {
    console.log(err);
  }
}

// Get data from employee table with particular emp_id
async function getData(e_id) {
  try {
    let pool = await sql.connect(config);
    let employee = await pool
      .request()
      .input("input_parameter", sql.Int, e_id)
      .query("SELECT * from employee where e_id = @input_parameter");
    return employee.recordset;
  } catch (err) {
    console.log(err);
  }
}

// Add employee data
async function addData(data) {
  try {
    // console.log(".........", data);
    let pool = await sql.connect(config);
    let insertData = await pool
      .request()
      .input("e_id", sql.Int, data.e_id)
      .input("e_name", sql.NVarChar, data.e_name)
      .input("e_salary", sql.Int, data.e_salary)
      .input("e_age", sql.Int, data.e_age)
      .input("e_gender", sql.NVarChar, data.e_gender)
      .input("e_dept", sql.NVarChar, data.e_dept)
      // .execute(insertData);  // we have to make stored procedure
      .query(
        "insert into employee (e_id, e_name, e_salary, e_age, e_gender, e_dept) values (@e_id, @e_name, @e_salary, @e_age, @e_gender, @e_dept)"
      );
    // console.log("**********", insertData);
    // return insertData.recordset;
  } catch (err) {
    console.log(err);
  }
}

// update data
// update UserList set username=@username,pwd=@pwd,email=@email where id=@id'
async function updateData(req) {
  try {
    let updatedata = { ...req.body };
    let pool = await sql.connect(config);
    let insertUpdateData = await pool
      .request()
      .input("e_id", sql.Int, updatedata.e_id)
      .input("e_name", sql.NVarChar, updatedata.e_name)
      .input("e_salary", sql.Int, updatedata.e_salary)
      .input("e_age", sql.Int, updatedata.e_age)
      .input("e_gender", sql.NVarChar, updatedata.e_gender)
      .input("e_dept", sql.NVarChar, updatedata.e_dept)
      .query(
        "update employee set e_id = @e_id, e_name = @e_name, e_salary = @e_salary, e_age = @e_age, e_gender = @e_gender, e_dept = @e_dept where e_id = @e_id"
      );
    // return insertUpdateData.recordset;
  } catch (err) {
    console.log(err);
  }
}

// delete data with id
// .query('delete from UserList where id=@id', function (err, result) {
async function deleteData(e_id) {
  try {
    let pool = await sql.connect(config);
    let deletedata = await pool
      .request()
      .input("e_id", sql.Int, e_id)
      .query("delete from employee where e_id = @e_id");
    return deletedata.recordset;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getDatas: getDatas,
  getData: getData,
  addData: addData,
  updateData: updateData,
  deleteData: deleteData,
};
