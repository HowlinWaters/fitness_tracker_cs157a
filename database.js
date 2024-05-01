import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const dbconnection = mysql.createPool({
    host:process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//gets all users
export async function getUsers(){
    const [result] = await dbconnection.query("SELECT * FROM User")
    return result
}

export async function getUser(id){
    const [result] = await dbconnection.query(`
    SELECT *
    FROM User
    WHERE UserID = ?`
    , [id])
    return result[0]
}

export async function createUser(Username, Password, FName, LName, DOB, Weight, Height, Email, Avatar){
    const [result] = await dbconnection.query(`
    INSERT INTO User (Username, Password, FName, LName, DOB, Weight, Height, Email, Avatar)
    VALUES(?,?,?,?,?,?,?,?,?)
    `, [Username, Password, FName, LName, DOB, Weight, Height, Email, Avatar])
    const id = result.insertId
    return getUser(id)
}
